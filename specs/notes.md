# Notes Pipeline

> Status: **Aspirational**
> Last updated: 2026-04-28

End-to-end flow of how notes authored in Obsidian reach the public blog and the personal admin browser. This spec is the entry point — narrower concerns are split out and linked below.

## Goals

- Obsidian is the authoring surface; notes-api is the canonical store.
- Multi-device editing works: any device with the plugin can push or pull, with safe conflict handling.
- The vonshlovens blog reads notes as data (not files); rendering happens at request time so layout, links, and image URLs can change without re-syncing.
- The same store later powers semantic queries (pgvector) and a personal admin UI.

## Non-goals

- Bidirectional editing from the website (the blog is read-only against the store).
- Multi-vault support (one vault → one notes-api stack; multi-vault is a separate service).
- Replacing Obsidian itself for editing — only its sync layer.

## Architecture

```
                                   ┌──────────────────────────────┐
                                   │ vonshlovens.com (Railway)    │
                                   │   SvelteKit blog             │
                                   └──────────────┬───────────────┘
                                                  │  GET /v1/notes (read, public-published only)
                                                  │  via tailscale-railway-bridge
                                                  ▼
        ┌─────────── notes-api stack (VPS on Tailnet) ────────────┐
        │                                                          │
        │   Caddy  (Tailscale Serve, TLS terminated by tailscaled) │
        │     ├── /          → SvelteKit admin (notes browser)     │
        │     ├── /api/v1/*  → Rust + Axum                         │
        │     │                  │                                 │
        │     │                  ├── Postgres 18 + pgvector        │
        │     │                  └── Garage (S3-compatible)        │
        │     └── /attach/*  → Garage (signed URLs or proxy)       │
        │                                                          │
        └────────────────────────▲─────────────────────────────────┘
                                 │  PUT /v1/sync/*  (Tailnet only, bearer token)
                                 │
                          Obsidian plugin (one device per Tailnet member)
```

The blog and the admin app are independent SvelteKit projects; they consume the same Rust API but at different scopes (public-published vs. all rows).

## Frontmatter contract

The plugin parses YAML frontmatter and stores known fields in dedicated columns; everything else lands in a `frontmatter` JSONB column.

| Field | Type | Required | Behavior |
| --- | --- | --- | --- |
| `publish` | bool | no (defaults `false`) | Only `true` rows surface on the public blog. |
| `slug` | string | no | URL slug. Derived from filename (kebab-case, `.md` stripped) when omitted. Authoring fallback exists so most posts only need `publish: true` to go live. |
| `type` | string | no | Open enum. Two well-known values drive default routes: `article` → `/writing/{slug}`, `note` → `/notes/{slug}`. Other values are stored but unrouted until a route is built. |
| `title` | string | no | Falls back to filename. |
| `tags` | string[] | no | Merged with inline `#tags` extracted from the body. Lowercased and deduplicated. |
| `aliases` | string[] | no | Reserved for future redirect support. |
| `created`, `modified` | date | no | Falls back to file stat. |
| anything else | any | no | Preserved verbatim in the `frontmatter` JSONB column. |

Validation lives in the API, not the plugin. The plugin pushes everything; the server is responsible for rejecting malformed input.

## Publish gating

- All notes are synced to the store regardless of `publish`. The plugin doesn't pre-filter — it doesn't know what publishing means.
- The blog's read endpoint (`GET /v1/notes`) only returns rows where `publish = true AND deleted_at IS NULL`.
- The admin UI (auth'd by Tailscale identity) sees everything, including drafts and soft-deleted rows.
- Future: signed preview URLs (`/preview/{type}/{slug}?token=...`) for sharing drafts without auth.

## Slug derivation

Order of resolution:
1. If frontmatter has a non-empty `slug:`, use it verbatim.
2. Else slugify the filename: lowercase, strip `.md`, replace whitespace and `_` with `-`, strip non-`[a-z0-9-]`, collapse repeated `-`.
3. The API enforces uniqueness on `(type, slug)` for published rows. Conflicts return `409` and the plugin surfaces a notice.

Folder hierarchy is **not** part of the slug. A note at `2024/blog/foo.md` with no explicit slug becomes `/writing/foo`. If you want path-aware slugs, set `slug:` explicitly.

## Wikilinks and backlinks

- The plugin extracts outgoing links at sync time and stores the *target string exactly as authored* (e.g. `Folder/Note`, `Note Title`, `Note Title#section`). No resolution happens at sync.
- The blog and admin both resolve targets at render time:
  1. If a published note has matching `slug`, link to `/{type}s/{slug}`.
  2. Else if a published note has matching `filename` (basename minus `.md`), link to its slug.
  3. Else fall back to plain text styled as a "broken link."
- Backlinks are computed at query time from `outgoing_links`. The API exposes `GET /v1/notes/:slug/backlinks` which returns all published notes whose `outgoing_links` resolve to this note.

This keeps the store descriptive: renaming slugs or changing publish state never requires re-sync.

## Attachments and image rendering

- Plugin uploads non-markdown files to the API; API stores blob in Garage at `attachments/{sha256}/{filename}` and metadata in Postgres.
- Markdown bodies retain Obsidian's authoring syntax (`![[image.png]]`); URL rewriting happens at render time.
- See [`notes-storage.md`](notes-storage.md) for object layout, signed URL strategy, and rewriting rules.

## Blog ↔ notes-api integration

- The blog's `+page.server.ts` load functions call `notes-api` over HTTPS through the Railway↔Tailnet bridge. The base URL is read from the `NOTES_API_BASE` env var (Railway project variable; see [`deployment.md`](deployment.md)).
- Endpoints used:
  - `GET /v1/notes?type=article&limit=...` — list page
  - `GET /v1/notes/:type/:slug` — single page (with body, tags, frontmatter, resolved attachment URLs)
  - `GET /v1/notes/:type/:slug/backlinks` — sidebar
- Reads are anonymous and only return published, non-deleted rows; no token required.
- SvelteKit caches at the load-function layer; `Cache-Control` headers on the API control browser caching of attachments.
- If `NOTES_API_BASE` is unset, the blog falls back to a build-time fixture so dev iteration works without the bridge. See [`deployment.md`](deployment.md#reaching-notes-api) for the full Railway configuration.

The current hardcoded `src/lib/content/hello-world.ts` fixture in the blog is replaced by these calls once the API is live. The `/writing/[slug]` route already exists (per `routing.md`); only the loader changes.

## Reference

| Concern | Spec |
| --- | --- |
| Postgres tables, indexes, pgvector | [`notes-data-model.md`](notes-data-model.md) |
| HTTP API surface, auth, CAS | [`notes-sync-api.md`](notes-sync-api.md) |
| Obsidian plugin internals | [`notes-plugin.md`](notes-plugin.md) |
| Admin/notes-browser app | [`notes-admin.md`](notes-admin.md) |
| Garage / attachments | [`notes-storage.md`](notes-storage.md) |
| Docker-compose, Caddy, deploy | [`notes-api-deployment.md`](notes-api-deployment.md) |
| Architectural decisions | `notes/docs/adr/` |
