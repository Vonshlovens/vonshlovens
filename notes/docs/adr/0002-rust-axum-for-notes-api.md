# ADR 0002: Rust + Axum + sqlx for notes-api

- Date: 2026-04-27
- Status: Accepted

## Context

The notes-api is a long-running, multi-tenant-ish (multi-device) service that holds the canonical store for personal knowledge. It needs to be reliable, low-overhead, and pleasant to evolve over years — not just months. Candidate stacks: SvelteKit endpoints in the blog (Bun); a standalone Bun + Hono service; Go with `chi` or `gin` (matching the original `obsync-pg`); Rust with Axum.

## Decision

Rust + Axum, with `sqlx` for Postgres and `aws-sdk-s3` (or `rusoto` if `aws-sdk-s3` proves heavy) for Garage. Migrations via `sqlx-cli` from plain SQL files.

## Consequences

**Good:**
- `sqlx` gives compile-time-checked SQL against the live schema — most DB-shape bugs become build errors.
- Tokio's concurrency model fits the workload (lots of small I/O-bound operations: reads, writes, S3 PUTs, embedding calls).
- Small static binary, easy to drop into a docker-compose service.
- Strong type guarantees around the CAS protocol and error model — the kind of thing where one wrong type at a boundary corrupts a vault.
- Long-term maintenance: Rust APIs from 2021 still build today with minor changes; the same can't be said of every JS framework.

**Bad:**
- Slower iteration than TypeScript/SvelteKit, especially early on.
- Adds Rust to the operator's build toolchain (cargo, rustup).
- The blog's frontmatter parser is in TypeScript; the API needs an equivalent in Rust. Some logic duplication unless we wrap the parser as a CLI shared by both.

## Alternatives considered

- **SvelteKit endpoints in the blog.** Rejected — couples sync uptime to blog deploys, and Bun's runtime is less battle-tested for long-lived services. Also conflicts with ADR 0001's "deploy independently."
- **Bun + Hono.** Lower friction but same coupling concerns and weaker type safety at the SQL boundary.
- **Go with chi/gin.** Matches the original `obsync-pg`. Reasonable choice. Rejected on preference and on `sqlx`'s compile-time SQL checking having no Go equivalent of equivalent quality (`sqlc` is close but operates differently).
- **SeaORM instead of sqlx.** Heavier; adds entity types we don't need for a service that's mostly thin CRUD over well-shaped tables.
