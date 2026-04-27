# ADR 0004: Garage for attachment storage

- Date: 2026-04-27
- Status: Accepted

## Context

The vault contains binary attachments — images embedded with `![[image.png]]`, PDFs, occasionally audio. The old plugin stored these as `BYTEA` in Postgres, capped at 50 MB. That works but bloats Postgres backups, makes streaming awkward, and ties blob serving to the API request lifecycle. We want them in object storage.

## Decision

**Garage** (open source S3-compatible store) running in the same docker-compose as the API. Bucket `notes`; object keys are content-addressed: `attachments/{sha256}/{filename}`. Postgres holds metadata only (path, hash, mime, object_key, soft-delete state).

## Consequences

**Good:**
- Postgres stays lean — schema, indexes, and rows are all small. Backups are fast and meaningful.
- Content-addressed URLs are immutable; aggressive caching is safe.
- Garage runs as a single static binary alongside the API; no extra infra to manage and nothing leaves the Tailnet.
- Open-source and FOSS-aligned (Minio is no longer fully open source as of 2025).
- API can switch to a different S3-compatible backend (R2, B2, AWS S3) by changing env without touching code.

**Bad:**
- One more service in the stack — more bytes on disk, more uptime to manage.
- Garage cluster bootstrap is one-time but non-trivial; we capture it in `notes/scripts/bootstrap-garage.sh` so it's reproducible.
- 100 GB VPS budget is shared with Postgres and OS; we need a soft cap (~70 GB) and a usage indicator in the admin UI.

## Alternatives considered

- **Cloudflare R2.** Free for personal-blog scale, zero egress. Rejected on operator preference for self-hosted on the VPS already paid for; kept as the Plan B if Garage maintenance becomes a problem.
- **Minio.** Was the obvious pick before its license shift in 2025. Rejected for FOSS alignment.
- **Postgres BYTEA (status quo from `obsync-pg`).** Rejected — bloats backups, awkward streaming, blob lifecycle tangled with row lifecycle.
- **Local filesystem volume on the VPS.** Simple but loses S3 API compatibility, makes future migration to remote storage harder, and offers nothing Garage doesn't.
