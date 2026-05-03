# ADR 0007: Run sqlx migrations on API boot, not as a pre-boot one-shot

- Date: 2026-05-02
- Status: Accepted

## Context

`specs/notes-api-deployment.md` (drafted before the API existed) assumed the operational pattern: `docker compose run --rm api sqlx migrate run` as a one-shot job, then `docker compose up -d api` separately. That pattern requires shipping `sqlx-cli` inside the runtime image (or a separate migrate image) and adds an extra step to every deploy.

When standing up the skeleton, we needed to pick a migration strategy. The competing forces:

- **Skeleton simplicity** wants migrations to run automatically.
- **Operational safety** wants a failed migration to be loud and not crash-loop the API container.
- **Image discipline** wants to avoid shipping a Rust toolchain or `sqlx-cli` to production just for migrations.

## Decision

Embed migrations into the binary at compile time via `sqlx::migrate!("./migrations")` and run them in a tokio task spawned at boot. The task:

- Acquires the same Postgres pool the request handlers use.
- On success: sets `AppState.migrated = true`. `/api/v1/readyz` returns `200`.
- On failure: logs the error and leaves `migrated = false`. `/api/v1/readyz` returns `503` indefinitely. The API process keeps running (so logs and `/healthz` stay available) but is not "ready" to serve traffic.

The runtime image is a slim `debian:bookworm-slim` with the binary plus `ca-certificates` and `curl` (for the docker healthcheck). No `sqlx-cli`.

## Consequences

**Good:**
- One-step deploy: `docker compose up -d` brings up everything, migrations and all.
- Migrations are version-locked to the binary by construction — no chance of running a newer migration with an older binary or vice versa.
- The runtime image stays small (no Rust toolchain, no `sqlx-cli`).
- Failed migrations are visible to the orchestrator via `/readyz` and to the operator via structured logs, without crash-looping the container.

**Bad:**
- A bad migration leaves the API process running but un-ready, which is a slightly weirder failure mode than "container exits 1." Mitigated by `/readyz` semantics and log alerting (when we have alerting).
- Long-running migrations delay readiness. For our schema this is sub-second; if we ever ship a 10-minute migration, revisit.
- Concurrent boots of multiple API replicas would race on migrations. Not a concern today (single replica per box) but tracked as a constraint.

## Alternatives considered

- **`sqlx-cli` one-shot before `docker compose up -d api`** (the original spec). Rejected — extra image weight or a separate migrate image, plus an extra deploy step for marginal benefit.
- **Crash-loop on migration failure** (omit the spawn; bubble error up to `main`). Rejected — silent crash loops are worse for operator UX than a `/readyz: 503`.
- **Run migrations synchronously before `axum::serve`.** Rejected for the same reason; also delays `/healthz` availability and makes "is the API running?" ambiguous during the migration window.

## Supersedes

Sections of `specs/notes-api-deployment.md` describing `docker compose run --rm api sqlx migrate run`. The spec has been edited to reflect the new pattern.
