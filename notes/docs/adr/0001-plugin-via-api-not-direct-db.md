# ADR 0001: Plugin syncs via HTTP API, not direct Postgres

- Date: 2026-04-27
- Status: Accepted

## Context

The previous Obsidian plugin (`obsync-pg-plugin`) used the `pg` driver from inside Obsidian to write directly to Postgres. This required vendoring `pg` and ~10 transitive node modules into `.obsidian/plugins/obsync-pg/node_modules/`, since Obsidian's plugin runtime doesn't bundle native deps. It also put database credentials inside an Obsidian plugin (a hostile environment for secrets), gave the plugin an attack surface equivalent to a DBA, and made schema changes risky to roll out (every device needs a plugin update).

## Decision

The plugin no longer talks to Postgres. It talks to a Rust + Axum HTTP service (`notes-api`) over HTTPS. The API owns Postgres credentials, schema, and validation.

## Consequences

**Good:**
- Plugin bundle is a single `main.js` — no `node_modules/` to vendor.
- Plugin holds only a bearer token (or, later, a Tailscale identity), not DB creds.
- Schema can change without a plugin update as long as the API contract is stable.
- The API can enforce CAS, rate limits, and validation that an honest-but-buggy client can't bypass.
- Same API will later serve the blog, the admin app, and any future MCP/CLI clients.

**Bad:**
- New service to operate (the Rust API).
- Higher latency than direct DB writes (one extra hop via Caddy).
- Sync correctness now depends on the API being available; offline edits queue in the plugin debouncer.

## Alternatives considered

- **Plugin → Postgres directly.** What the old plugin did. Rejected for the reasons in *Context*.
- **Plugin → SvelteKit endpoints in the blog.** Tied the sync layer to the blog's deploy and would mix two very different workloads on the same Railway service. Rejected after deciding notes-api should deploy independently.
- **Plugin → object storage directly + DB sync job.** Splits the write path; conflict handling becomes much harder.
