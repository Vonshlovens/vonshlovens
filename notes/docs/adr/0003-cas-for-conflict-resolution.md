# ADR 0003: Compare-and-swap for sync conflicts

- Date: 2026-04-27
- Status: Accepted

## Context

The notes-api is the canonical store for a multi-device Obsidian vault. Two devices can edit the same note while either or both are offline; on reconnection, the plugin must reconcile without silently losing edits. The previous plugin (`obsync-pg-plugin`) used file mtime comparison to decide who wins, which is racy across devices, susceptible to clock skew, and silently overwrites the loser.

## Decision

Every mutating endpoint requires `expected_revision`. The server stores a monotonic per-row `revision` (and an append-only `change_log`). On mismatch, the server returns `409 Conflict` with the current row; the plugin writes the server's version as a `Note (conflict YYYY-MM-DD HH-mm from-<device>).md` sidecar and surfaces a Notice. No automatic merge.

## Consequences

**Good:**
- Edits cannot be silently overwritten — by construction.
- The `change_log` doubles as the pull cursor (`since=<rev>`), so we get incremental pull "for free."
- Operator sees conflicts as files in the vault, which is the right place: Obsidian is the merge UI.
- Reasoning about the protocol is easy: every push either succeeds or produces a sidecar.

**Bad:**
- Conflict UX is manual. For very rapid back-and-forth between two devices, the operator may see multiple sidecars. (In practice this is rare for solo use.)
- A buggy plugin that doesn't track revisions correctly will produce conflict files even when no real conflict exists. Mitigation: extensive plugin tests + the manifest endpoint for recovery.
- Adds a `revision BIGINT` column to every synced table.

## Alternatives considered

- **Last-write-wins by mtime.** What the old plugin does. Simpler. Loses edits when an older device pushes after a newer one (clock skew, offline catch-up). Rejected.
- **Three-way merge in the plugin.** Tried this in spirit in some prototypes; markdown is too easy to corrupt with naive line-based merges, and we'd need conflict-marker handling that Obsidian users wouldn't recognize. Rejected as YAGNI for personal use.
- **CRDTs (Yjs/Automerge).** Strong correctness story but a heavyweight commitment for files-on-disk that Obsidian itself manages as opaque blobs. Operator wants Obsidian to remain the editor; CRDT semantics would require swapping out the editor or accepting drift. Rejected.
