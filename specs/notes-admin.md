# Notes Admin App

> Status: **Aspirational**
> Last updated: 2026-04-27

A SvelteKit app that lets the operator (you) browse, search, and inspect every note in the store — drafts and deletes included. Lives at `notes/admin/`. Runs in the same docker-compose stack as the Rust API and is reached via Caddy on the Tailnet.

## Goals

- See every note in the store, including drafts and soft-deleted rows.
- Browse the link/backlink graph without opening the blog.
- Search across titles, tags, body, and (eventually) embeddings.
- Resolve sync conflicts that didn't get fixed in Obsidian.
- Provide a "preview" view that renders a draft the way the blog would.

## Non-goals

- **Editing notes.** The vault is upstream; the admin is read-mostly. The only writes are operator actions (`undelete`, `force-republish`, `re-run embedding`) that are explicit, logged, and clearly not "edit the body."
- **Public-facing.** The admin sits behind Tailscale identity; there's no login screen because there's no public access.

## Auth

- Caddy strips and re-injects the `Tailscale-User-Login` header on every request to the admin app.
- The SvelteKit `+layout.server.ts` reads that header in `event.request.headers` and stuffs it into `locals.user`.
- Missing header → 403. (Should never happen in practice; Caddy enforces upstream.)
- A small allow-list of Tailscale logins lives in `NOTES_ADMIN_ALLOWED_USERS` env (comma-separated). For now it's just one user.
- The admin's API calls to `/api/v1/admin/*` re-pass the Tailscale identity header so the Rust API can authorize the same way.

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Dashboard: counts (notes, drafts, deletes, untyped), pending conflicts, sync health, last embedding run. |
| `/notes` | Paginated table of all notes with filters (status, type, tag, has-conflict, has-embedding). |
| `/notes/:id` | Single note view: rendered body, raw_content toggle, frontmatter, tags, outgoing links, backlinks, attachments, history. |
| `/notes/:id/preview` | Renders the note exactly as the blog would (route-aware: `article` → blog's article layout, `note` → blog's note layout). |
| `/search` | Free-text search; once embeddings exist, surfaces semantic results alongside lexical. |
| `/tags` | Tag → count grid; clicking drills into `/notes?tag=...`. |
| `/conflicts` | List of paths with active conflicts (notes whose latest revision was rejected on push). |
| `/graph` | (later) Force-directed link graph. |

## Components

- Built on the same Tailwind v4 + bits-ui stack as the blog (per [`stack.md`](stack.md)) so visual language stays consistent.
- A `NotePreview` component renders markdown with the same pipeline the blog uses (so wikilink resolution, tag rendering, image rewriting all work identically). Probably a shared workspace package later — not premature now.

## Data flow

- All reads go through `/api/v1/admin/*` (with the operator's Tailscale identity).
- The blog's preview rendering can later be extracted into a shared `notes/render/` package so admin and blog don't drift; for now, copy the relevant render helpers and audit drift manually.
- No data is fetched at render time on the client; SvelteKit `+page.server.ts` is the only network hop and the client gets serialized props.

## What lands later

- Embedding inspection: cosine-similarity heatmap or "show me notes near this one."
- A "publish queue" — see what's marked `publish: true` since the last blog deploy, easy "republish blog" button (probably a Railway redeploy webhook).
- Bulk operations (re-embed N notes, retag, etc.).
- Share links: signed URL to a draft preview.

## Why a separate app

- Lives in the **same docker-compose**, talks to the API on `localhost`, no extra deploy footprint.
- Different auth profile (Tailscale identity, not bearer token) — easier to enforce as a separate SvelteKit project than as a route group inside the blog.
- The blog and the admin diverge in look and feel (admin is dense data; blog is reading experience) — sharing a SvelteKit project would mean fighting that.
- Easier to iterate without redeploying the blog every time the admin gets a new feature.
