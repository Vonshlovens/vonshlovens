# Notes API Deployment

> Status: **Aspirational**
> Last updated: 2026-04-27

How the notes-api stack is built, deployed, and operated. The blog's deployment is unchanged and lives in [`deployment.md`](deployment.md); this spec covers only the notes-api world.

## Target

- **Host**: a VPS on the operator's Tailnet (~100 GB disk, sufficient RAM for Postgres + Garage + API + admin).
- **Network exposure**: **Tailscale-only** for the foreseeable future. Caddy listens on the Tailscale interface via `tsnet` / Tailscale Serve; the public internet never reaches it.
- **Hostname**: `notes.<tailnet-name>.ts.net` (Tailscale provides TLS automatically — no Let's Encrypt, no DNS to manage).
- **Operator access**: Tailscale SSH for shell, Tailscale identity headers for the admin app.

The blog (on Railway) reaches notes-api via the existing `tailscale-railway-bridge` service, which runs `tailscaled` in userspace and exposes a SOCKS5 / HTTP proxy that Railway services can dial out through.

## docker-compose stack

`notes/docker-compose.yml`:

```yaml
services:
  caddy:
    image: caddy:2
    restart: unless-stopped
    network_mode: host             # so caddy can bind to the Tailscale interface
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data
      - caddy-config:/config
    depends_on: [api, admin]

  postgres:
    image: pgvector/pgvector:pg18
    restart: unless-stopped
    environment:
      POSTGRES_DB: notes
      POSTGRES_USER: notes
      POSTGRES_PASSWORD_FILE: /run/secrets/pg_password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    secrets: [pg_password]
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "notes", "-d", "notes"]
      interval: 5s
      retries: 12

  garage:
    image: dxflrs/garage:v1.0.1
    restart: unless-stopped
    volumes:
      - garage-data:/var/lib/garage/data
      - garage-meta:/var/lib/garage/meta
      - ./garage.toml:/etc/garage.toml:ro

  api:
    build: ./api
    restart: unless-stopped
    environment:
      DATABASE_URL: postgres://notes@postgres:5432/notes
      GARAGE_ENDPOINT: http://garage:3900
      GARAGE_BUCKET: notes
      RUST_LOG: info,sqlx=warn
    env_file: ./api/.env           # NOTES_API_SYNC_TOKEN, GARAGE_ACCESS_KEY, GARAGE_SECRET_KEY
    depends_on:
      postgres:
        condition: service_healthy
      garage:
        condition: service_started

  admin:
    build: ./admin
    restart: unless-stopped
    environment:
      NOTES_API_BASE: http://api:3000/api/v1
      NOTES_ADMIN_ALLOWED_USERS: ${NOTES_ADMIN_ALLOWED_USERS}

volumes:
  postgres-data:
  garage-data:
  garage-meta:
  caddy-data:
  caddy-config:

secrets:
  pg_password:
    file: ./secrets/pg_password
```

The stack is **internal**: only Caddy is published, and only on the Tailscale interface.

## Caddyfile

```caddy
notes.<tailnet-name>.ts.net {
  # Caddy + Tailscale Serve handle TLS; no need for tls directive.

  handle /api/v1/sync/* {
    reverse_proxy api:3000
  }

  handle /api/v1/admin/* {
    # Caddy injects Tailscale identity from the underlying tailscaled.
    request_header X-Tailscale-User-Login {http.request.header.Tailscale-User-Login}
    reverse_proxy api:3000
  }

  handle /api/v1/* {
    # Public read endpoints; still Tailnet-only at the network layer.
    reverse_proxy api:3000
  }

  handle /attach/* {
    uri strip_prefix /attach
    header Cache-Control "public, max-age=31536000, immutable"
    reverse_proxy garage:3900
  }

  handle {
    request_header X-Tailscale-User-Login {http.request.header.Tailscale-User-Login}
    reverse_proxy admin:3000
  }
}
```

`tsnet` is set up at the host level (`tailscale up --hostname=notes`); Caddy with `network_mode: host` then binds to the Tailscale-assigned IP/hostname. Alternative: run `caddy-tailscale` plugin for native integration — defer until vanilla works.

## Environment variables

| Var | Where | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | api | Postgres DSN |
| `GARAGE_ENDPOINT` / `GARAGE_BUCKET` | api | S3 endpoint and bucket |
| `GARAGE_ACCESS_KEY` / `GARAGE_SECRET_KEY` | api | S3 credentials (from bootstrap) |
| `NOTES_API_SYNC_TOKEN` | api | Bearer token for `/v1/sync/*` |
| `NOTES_API_MAX_ATTACH_MB` | api | Defaults 25 |
| `NOTES_API_EMBED_PROVIDER` | api | (later) `openai` / `voyage` / off |
| `NOTES_API_EMBED_API_KEY` | api | (later) provider key |
| `NOTES_ADMIN_ALLOWED_USERS` | admin | Comma-separated Tailscale logins |

Secrets that should not be in env: Postgres password (docker secret file). Everything else is operator-friendly enough to live in `.env` files in the repo (gitignored).

## Bootstrap

First-run sequence on a fresh VPS:

1. `tailscale up --hostname=notes` (one-time; uses pre-auth key).
2. `docker compose up -d postgres garage` — bring up data services.
3. `notes/scripts/bootstrap-garage.sh` — creates the cluster layout, the `notes` bucket, and an access key pair. Outputs `GARAGE_ACCESS_KEY` / `GARAGE_SECRET_KEY` to stdout for paste into `.env`.
4. `docker compose run --rm api sqlx migrate run` — apply migrations.
5. `docker compose up -d` — bring up everything else.
6. Verify: `curl https://notes.<tailnet-name>.ts.net/api/v1/healthz` returns `200`.

The bootstrap is idempotent — running it twice should be a no-op.

## Backups

- **Postgres**: nightly `pg_dump` to a Garage object at `backups/postgres/{YYYY-MM-DD}.sql.gz`. Kept 30 days locally + (optional) replicated to a separate Backblaze B2 / R2 bucket weekly. Implemented as a one-shot container on a cron timer (or `ofelia` sidecar).
- **Garage**: data is the backup, but a weekly tarball of `garage-meta` to the same backup bucket guards against metadata corruption. Garage objects are content-addressed, so re-uploading from a fresh Postgres + Garage + the operator's vault would recreate everything.
- **Restore drill**: documented checklist in `notes/docs/restore-drill.md` (TODO once stack is live). Quarterly run.

## Health and observability

- `api:/healthz` and `api:/readyz` drive container health.
- Caddy logs are JSON; aggregated into the API's log volume for easy grep.
- A `/v1/admin/stats` endpoint surfaces: row counts, change_log size, embedding queue depth, Garage bucket usage. The admin dashboard renders this.
- No external metrics shipper in MVP. If something breaks, `docker compose logs` is the first stop.

## Updates

- **API**: `git pull && docker compose build api && docker compose up -d api`. Migrations run via the migrate sidecar, not on container start (so a failed migration doesn't loop-crash).
- **Postgres major version bumps**: planned events; require dump-and-restore. Stay on Postgres 18 until pgvector pushes us to bump.
- **Garage**: minor versions in-place; check release notes for each upgrade.
- **Caddy**: bump in compose file; restart container.
- **Admin / blog**: SvelteKit apps don't share a deploy pipeline; admin is `docker compose up -d admin`, blog is unchanged on Railway.

## Disaster scenarios

| Scenario | Recovery |
| --- | --- |
| VPS dies | Reprovision, restore Postgres from latest dump, re-bootstrap Garage, run plugin reconcile from any device — vault is canonical source. |
| Postgres corruption | Restore from latest dump; reconcile from plugin will re-push anything since the dump. |
| Garage corruption | Vault has every attachment locally; plugin reconciles re-uploads everything. |
| Tailnet outage | Stack still runs; just unreachable. Vault edits queue locally in plugin debouncer; flush on reconnect. |
| Lost vault (catastrophic) | `obsync-pg pull`-equivalent in the new plugin: hit `GET /v1/sync/manifest`, then `GET /v1/sync/changes?since=0`, write everything back to disk. |

The vault-on-disk and the database are mirrors; either can be rebuilt from the other. The operator should not lose both at the same time.
