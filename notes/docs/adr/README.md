# Notes ADRs

Architectural Decision Records scoped to the notes-api ecosystem (the Rust API, plugin, admin app, storage, and deploy stack under `notes/`). Repo-wide ADRs live in `/docs/adr/`.

| # | Title | Status |
| --- | --- | --- |
| [0001](0001-plugin-via-api-not-direct-db.md) | Plugin syncs via HTTP API, not direct Postgres | Accepted |
| [0002](0002-rust-axum-for-notes-api.md) | Rust + Axum + sqlx for notes-api | Accepted |
| [0003](0003-cas-for-conflict-resolution.md) | Compare-and-swap for sync conflicts | Accepted |
| [0004](0004-garage-for-attachments.md) | Garage for attachment storage | Accepted |
| [0005](0005-tailscale-only-deployment.md) | Tailscale-only deployment for notes-api | Accepted |
| [0006](0006-garage-v2.md) | Pin Garage to v2.3.0 (over v1.x) | Accepted |
| [0007](0007-migrations-on-boot.md) | Run sqlx migrations on API boot, not as a pre-boot one-shot | Accepted |

## Conventions

- Filename: `NNNN-short-kebab.md`.
- Each record is short. Lead with **Context**, **Decision**, **Consequences**, **Alternatives considered** in that order.
- ADRs are immutable once Accepted. To change a decision, write a new ADR that supersedes the old one and update both records' Status fields.
