# Notes Sync API

> Status: **Aspirational**
> Last updated: 2026-04-27

HTTP contract for the Rust + Axum service in `notes/api/`. See [`notes.md`](notes.md) for context and [`notes-data-model.md`](notes-data-model.md) for the schema this exposes.

## Base URL and versioning

- Mounted at `/api/v1` behind Caddy. The version segment is part of the URL (`/api/v1/sync/notes`); breaking changes ship under `/api/v2` and run side-by-side until clients migrate.
- All requests and responses are JSON unless explicitly noted (attachments use `multipart/form-data` for uploads and stream binary on download).

## Auth

The API has two authentication layers, applied independently:

1. **Network**: Caddy listens on the Tailscale interface only via `tsnet` / Tailscale Serve. Anything off-Tailnet can't reach the service. Public exposure is a deliberate future change (see [`notes-api-deployment.md`](notes-api-deployment.md)).
2. **Application**: per-endpoint policy.

| Endpoint group | Application auth |
| --- | --- |
| `POST/PUT/DELETE /v1/sync/*` | **Bearer token** (single shared secret in plugin settings). Future: replace with Tailscale identity header (`Tailscale-User-Login`) and OAuth for non-Tailnet clients. |
| `GET /v1/sync/manifest`, `GET /v1/sync/changes` | Bearer token (same as writes). |
| `GET /v1/notes`, `GET /v1/notes/:type/:slug`, `GET /v1/notes/:type/:slug/backlinks` | Anonymous. Returns only `publish=true AND deleted_at IS NULL`. |
| `GET /v1/admin/*` | Tailscale identity header set by Caddy. The admin app is the only consumer. |

The bearer token comes from `NOTES_API_SYNC_TOKEN` env. Rotated by editing the env and restarting; plugin clients update the token in settings.

## Endpoint surface

### Sync (plugin → API)

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v1/sync/manifest` | Full list of `(path, content_hash, revision)` for every live row. Used on first connect / large-gap recovery. |
| `GET` | `/v1/sync/changes?since={rev}&limit={n}` | Ordered change-log entries with revision > `since`, with full note bodies inlined for upserts. Drives incremental pull. |
| `PUT` | `/v1/sync/notes` | Upsert a note. Body: full note record + `expected_revision` for CAS. |
| `DELETE` | `/v1/sync/notes` | Soft-delete a note. Body: `{path, expected_revision}`. |
| `PUT` | `/v1/sync/attachments` | Upsert an attachment. `multipart/form-data` with metadata fields and binary blob. |
| `DELETE` | `/v1/sync/attachments` | Soft-delete an attachment. Body: `{path, expected_revision}`. |

### Public read (blog → API)

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v1/notes` | List of published notes. Query params: `type`, `tag`, `limit`, `cursor`. |
| `GET` | `/v1/notes/:type/:slug` | Single published note (body, frontmatter, resolved attachment URLs). |
| `GET` | `/v1/notes/:type/:slug/backlinks` | Live published notes whose `outgoing_links` resolve to `:slug`. |
| `GET` | `/v1/tags` | Tag → count for published notes. |

### Admin read (admin UI → API)

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v1/admin/notes` | All notes including drafts and soft-deleted. Filter params for status. |
| `GET` | `/v1/admin/notes/:id` | Single note by UUID; returns full row including raw_content. |
| `POST` | `/v1/admin/notes/:id/undelete` | Clear `deleted_at`, bump revision, append change_log. |
| `GET` | `/v1/admin/search?q=...` | Full-text + semantic (when embeddings exist). |

## Payloads

### Note record

The same shape is used by `PUT /v1/sync/notes` (request) and inlined in `GET /v1/sync/changes` (response).

```json
{
  "path": "writing/some-essay.md",
  "filename": "some-essay",
  "slug": "some-essay",
  "type": "article",
  "publish": true,
  "title": "Some Essay",
  "tags": ["essay", "tools"],
  "aliases": [],
  "body": "...",
  "raw_content": "---\ntitle: ...\n---\n...",
  "frontmatter": { "extra_field": "value" },
  "outgoing_links": ["other-note", "Books/Eat the Frog"],
  "created_at": "2026-04-01T10:00:00Z",
  "modified_at": "2026-04-27T11:23:00Z",
  "content_hash": "sha256:9f86d...",
  "file_size_bytes": 4321,
  "expected_revision": 4218
}
```

`expected_revision` is `null` for first-create; `0` is also accepted as "I expect no row to exist."

### Attachment upload

`multipart/form-data` with parts:
- `metadata` (JSON): `{path, filename, extension, mime_type, file_size_bytes, content_hash, expected_revision}`
- `data` (binary): the file bytes

Server computes its own SHA256 and rejects with `400` if it disagrees with `content_hash` in metadata.

## CAS protocol

All mutating endpoints take `expected_revision`. The server enforces:

```
if existing_row.revision != expected_revision:
    return 409 Conflict with { current: <full server row>, expected: <int> }
else:
    bump revision, append change_log, return 200 with new revision
```

If `expected_revision` is `null`:
- and no row exists at `path`: insert and return.
- and a row already exists: return `409` (treat null as "I expect this to be a fresh insert").

The plugin handles `409` by:
1. Persisting the server's row to disk as `Note (conflict 2026-04-27 13-42 from-laptop).md` next to the original.
2. Surfacing an Obsidian notice with a link to the conflict file.
3. Not retrying automatically — the user resolves and saves a normal edit, which triggers a fresh push.

## Cursor/pagination protocol

- `GET /v1/sync/changes?since=<rev>&limit=<n>` returns `{ changes: [...], next_cursor: <int|null> }`.
- The plugin advances `since` to the largest `revision` it received; `null` means caught up.
- Public `GET /v1/notes` paginates by `(modified_at DESC, id)` cursor; details in implementation.

## Error model

Every error response is JSON with a stable shape:

```json
{
  "error": {
    "code": "REVISION_CONFLICT",
    "message": "Server revision is 4220, expected 4218",
    "details": { "current_revision": 4220, "expected_revision": 4218 }
  }
}
```

Codes:
- `BAD_REQUEST` (400) — schema/validation failures.
- `UNAUTHORIZED` (401) — missing/invalid bearer token.
- `FORBIDDEN` (403) — public endpoint hit with no `publish=true`, or admin endpoint without identity.
- `NOT_FOUND` (404) — slug or path doesn't exist (or isn't visible at this auth level).
- `REVISION_CONFLICT` (409) — CAS mismatch; body includes the current server row.
- `PAYLOAD_TOO_LARGE` (413) — attachment over the configured cap (default 25 MB).
- `INTERNAL` (500) — unexpected; surfaces as a Notice in the plugin and logs to the API.

## Rate limits

Out of MVP scope. The plugin is the only write client; flood control is a per-device concern (debouncer + batch on push). When public read access opens up later, IP-based limits go on the public endpoints.

## Observability

- Structured JSON logs via `tracing` to stdout; Caddy adds a request ID per inbound request.
- A `/healthz` endpoint returns `200 OK` once Postgres and Garage are both reachable; used by docker-compose health checks.
- A `/readyz` endpoint returns `200` only after migrations are applied.

## What's not in v1

Recorded for clarity, not commitment:
- `POST /v1/admin/notes/:id` direct edits — would break the "vault is upstream" rule.
- Webhook delivery on changes (e.g., to trigger a blog rebuild) — the blog reads at request time, so not needed yet.
- Public bulk export (RSS, OPML, JSON dump) — punt until something needs it.
