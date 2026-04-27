# Notes Plugin

> Status: **Aspirational**
> Last updated: 2026-04-27

Obsidian plugin that watches the local vault and syncs to notes-api. Lives at `notes/plugin/`. Ports the existing TypeScript implementation from [`obsync-pg-plugin`](https://github.com/Vonshlovens/obsync-pg-plugin), simplified by removing direct Postgres access in favor of HTTP.

## Goals

- Real-time push: edits show up in notes-api within ~2 seconds (debounced).
- Multi-device pull: any device picks up changes another device made.
- Safe conflicts: never silently overwrite a remote edit; surface a sidecar file.
- Trivial install: drop into `.obsidian/plugins/`, no node_modules vendoring.

## What changes from the old plugin

| Concern | Old (`obsync-pg-plugin`) | New |
| --- | --- | --- |
| Storage backend | Direct `pg` driver from inside Obsidian | HTTPS to notes-api |
| Vendored deps | `pg` + ~10 transitive packages copied to vault | Pure `fetch` — bundle is single `main.js` |
| Conflict resolution | Mtime comparison with `periodicPull` | Server revision + CAS (409 → sidecar file) |
| Pull cursor | Re-fetch all rows every 30s | `GET /v1/sync/changes?since=<rev>` |
| State | JSON in plugin data | Same (JSON for now); SQLite later if vault grows past ~5k notes |

The parser, hasher, debouncer, and watcher modules port over with minimal change. The database module is replaced by an HTTP client; the sync engine collapses around the new push/pull flows.

## Module map

```
notes/plugin/
├── manifest.json
├── package.json
├── esbuild.config.mjs
├── src/
│   ├── main.ts                 ← Plugin lifecycle, command palette, settings tab
│   ├── settings.ts             ← Settings types + tab UI (bearer token, API URL, debounce, ignore patterns)
│   ├── lib/
│   │   ├── api-client.ts       ← Typed fetch wrapper around /v1/sync/*
│   │   ├── parser.ts           ← Frontmatter, wikilinks, inline tags (port from old)
│   │   ├── hasher.ts           ← SHA256 (port from old)
│   │   ├── watcher.ts          ← Subscribes to vault events
│   │   ├── debouncer.ts        ← Coalesces rapid edits (port from old)
│   │   ├── sync-engine.ts      ← Orchestrates push, pull, conflict
│   │   ├── state.ts            ← Local revision cursor + per-file hash store
│   │   └── conflict.ts         ← Writes Note (conflict ...).md sidecars
│   ├── components/             ← Svelte components for status panel + settings (port from old)
│   └── views/
│       └── StatusView.ts       ← Right-side panel
```

## Lifecycle

1. **Load**: read settings, restore state cursor, register vault event listeners, register commands.
2. **Connect** (if configured): hit `GET /v1/sync/manifest` to verify auth and get the current revision frontier.
3. **Initial reconcile**: compare local files against the manifest; push anything that's out of sync; pull anything missing locally.
4. **Run**: file events feed the debouncer → push; a 30 s timer pulls `since=<cursor>`.
5. **Unload**: flush pending pushes, persist state cursor.

## Push flow

1. Vault event (`create`, `modify`, `delete`, `rename`) → debouncer keyed on path.
2. After `debounce_ms` (default 2000), the engine reads the file, computes hash, compares against last-pushed hash in local state.
3. If unchanged: skip.
4. If changed:
   - Build the note record (parser fills frontmatter / outgoing_links / inline tags).
   - `PUT /v1/sync/notes` with `expected_revision = state.lastSeenRevision[path]` (or `null` for new files).
   - On `200`: store the new revision in local state.
   - On `409`: write `<basename> (conflict YYYY-MM-DD HH-mm from-<deviceLabel>).md` as a sidecar containing the **server's** version, raise an Obsidian Notice. Local file is untouched.
   - On other errors: enqueue retry with exponential backoff (max 3 attempts).

Renames are decomposed into `delete oldPath` + `upsert newPath` against the API; the server accepts both as separate change_log entries.

## Pull flow

Every 30 s (configurable; mirror of push debounce):

1. `GET /v1/sync/changes?since=<state.cursor>&limit=200`.
2. For each entry in order:
   - **upsert**: read local file (if present). If `local_hash == change.previous_hash` (i.e. local is in sync with what server had before this change), overwrite local with the new `raw_content`. Else write the incoming version as a `.conflict` sidecar.
   - **delete**: if local file's hash matches the last-known synced hash, delete locally. Else move local to `<basename> (conflict-deleted-on-server YYYY-MM-DD).md`.
3. Advance `state.cursor` to the largest revision processed.

Local pulls do **not** re-emit vault events that would trigger another push (the engine flips an internal `applyingRemote` flag while writing).

## Conflict UX

When a CAS conflict happens on push:
- A sidecar file `<basename> (conflict YYYY-MM-DD HH-mm from-<deviceLabel>).md` lands next to the original.
- An Obsidian Notice surfaces ("Conflict on `path`. Saved server version as `<sidecar>`. Open it to merge.")
- The status panel keeps a list of unresolved conflicts; clicking one opens the sidecar.
- The user merges manually and saves; the resulting edit triggers a normal push (which now matches the server's latest revision).

No automatic merge attempts. Plain text is too easy to mess up.

## Settings

| Setting | Default | Notes |
| --- | --- | --- |
| API URL | (empty) | e.g. `https://notes.tail-XXXXX.ts.net/api/v1` |
| Sync token | (empty) | Bearer token; matches `NOTES_API_SYNC_TOKEN` server-side |
| Device label | hostname | Used in conflict sidecar filenames |
| Debounce ms | 2000 | Time after last edit before push |
| Pull interval s | 30 | Set to 0 to disable periodic pull |
| Max attachment MB | 25 | Files larger than this are skipped + logged |
| Ignore patterns | `.obsidian/**`, `.trash/**`, `.git/**`, `**/.DS_Store` | Globs |
| Auto-sync on edit | true | Master switch for the watcher |
| Sync on startup | true | Run reconcile after connect |

Hidden setting: `state.cursor` lives in plugin data, not exposed in UI but visible in the status panel for debugging.

## Local state

`plugin data.json` (Obsidian-managed):

```json
{
  "settings": { ... },
  "syncState": {
    "deviceId": "uuid",
    "cursor": 4218,
    "files": {
      "writing/foo.md": {
        "contentHash": "sha256:...",
        "revision": 4216,
        "lastPushedAt": "2026-04-27T11:23:00Z"
      }
    }
  }
}
```

A `deviceId` is generated on first run and never rotated — used in conflict sidecar filenames so it's clear which device wrote what. SQLite migration path: same shape, swap JSON for a `state.db` next to plugin data.

## Build and release

- Build: `bun run build` → `main.js` (bundled, no node_modules required at runtime).
- Release: `bun run release` produces a zip with `main.js`, `manifest.json`, `styles.css` ready to drop into `.obsidian/plugins/notes-vonshlovens/`.
- Versioning matches the API version it speaks: plugin `1.x.y` only talks to API `/v1`. A `2.x.y` plugin would track `/v2`.
- The plugin checks API version on connect (`GET /v1/health` returns `{ version: "v1" }`) and refuses to run if mismatched, surfacing a clear error.

## Backwards-compatibility break

The new plugin **cannot read databases written by the old `obsync-pg-plugin`**. The migration path is one-time: stand up the new stack, run `obsync-pg pull` (the old Go daemon) one last time to get a clean local vault, point the new plugin at the new API, let it do an initial reconcile. The old DB is then archived.
