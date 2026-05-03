# ADR 0006: Pin Garage to v2.3.0 (over v1.x)

- Date: 2026-05-02
- Status: Accepted

## Context

[ADR 0004](0004-garage-for-attachments.md) chose Garage as the attachment store but didn't pin a major version. The notes-storage and deployment specs were drafted against `dxflrs/garage:v1.0.1` because v1 was current at spec time. v2 has since shipped with breaking config changes and improved single-node ergonomics.

## Decision

Pin `dxflrs/garage:v2.3.0` in `notes/docker-compose.yml`. Use the v2 configuration shape in `notes/garage.toml`:

- `replication_factor = 1` (was `replication_mode = "none"`)
- Default `consistency_mode = "consistent"`
- Secrets (`rpc_secret`, `admin_token`, `metrics_token`) supplied via env vars (`GARAGE_RPC_SECRET`, `GARAGE_ADMIN_TOKEN`, `GARAGE_METRICS_TOKEN`) so the TOML file is committable.

## Consequences

**Good:**
- v2 is the current stable line; we're not picking up a deprecated config dialect on day one.
- Env-based secrets keep `garage.toml` in git without leaking values, which simplifies the deploy story.
- `consistency_mode` becomes a future-tunable knob if we ever scale past one node.

**Bad:**
- v1 → v2 upgrade docs in the wider Garage community are still thin; if we ever need to migrate an existing v1 cluster (we don't), we're on our own.
- Two specs (`notes-storage.md`, `notes-api-deployment.md`) carried v1 examples and need follow-up edits.

## Alternatives considered

- **Stay on v1.0.1 as the spec suggests.** Rejected — v1 is a maintenance branch only, and we have no v1 install to preserve. Starting on v2 today saves a forced upgrade later.
- **Track `latest`.** Rejected — pinned tags are operationally sane for a personal stack; we want intentional upgrades, not surprise breakage on `docker compose pull`.
