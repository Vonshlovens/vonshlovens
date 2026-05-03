# Notes API Deployment

> Status: **Partly implemented** — `notes/` scaffolding is in (compose, Caddyfile,
> garage.toml, bootstrap-garage.sh, Rust API skeleton with healthchecks). The
> stack has not yet been brought up on the production VPS. Build-on-VPS is the
> v1 deploy story documented below; **bd issue von-62h** proposes replacing it
> with GHCR-based CI/CD before we accumulate operational scar tissue.
> Last updated: 2026-05-02

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
    image: dxflrs/garage:v2.3.0
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

## Workflow

The git repo is the deployment unit. Clone it onto the VPS, build inside Docker, update with `git pull && docker compose up -d --build`. No registry, no `scp`, no CI in v1.

### Source of truth

| Tracked in git | Created on the VPS, never committed |
| --- | --- |
| `notes/docker-compose.yml` | `notes/.env` |
| `notes/Caddyfile` | `notes/secrets/pg_password` |
| `notes/garage.toml` | Tailscale node identity (`/var/lib/tailscale/`) |
| `notes/api/` (Dockerfile, source, migrations) | |
| `notes/admin/` (Dockerfile, source) | |
| `notes/scripts/*.sh` | |
| `notes/.env.example` (placeholder values) | |

The Rust API and SvelteKit admin **build on the VPS inside Docker**. Cargo cache mounts in `notes/api/Dockerfile` keep incremental rebuilds in the 30–60 s range:

```dockerfile
# syntax=docker/dockerfile:1.7
FROM rust:1-slim AS build
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY migrations ./migrations
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/app/target \
    cargo build --release && cp target/release/notes-api /notes-api

FROM debian:bookworm-slim AS runtime
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=build /notes-api /usr/local/bin/notes-api
CMD ["notes-api"]
```

Cold builds on a 2–4 GB VPS take 3–8 min; that's acceptable for a personal stack. See [When this stops being right](#when-this-stops-being-right).

### First-time provisioning

```bash
# 0. Prereqs: docker, docker compose, a non-root user in the docker group.

# 1a. Linux hostname. Most cloud images ship with a generic name
#     (`srv1131999`, `ubuntu-docker`, etc.). Rename the kernel hostname so
#     `uname -n`, the shell prompt, and logs all read `notes`.
sudo hostnamectl set-hostname notes
# /etc/hosts may have stale 127.0.1.1 entries from prior re-provisionings;
# clean it down to one `127.0.1.1 notes` line. cloud-init typically does
# NOT actively manage /etc/hosts on standard cloud images (the warnings
# inside the file come from unused distro template files), so a manual
# edit is durable across reboots.

# 1b. Tailscale at the host (one-time; uses a pre-auth key).
#     If the host is already on the tailnet under a different name, use
#     `sudo tailscale set --hostname=notes` instead — it's a hot rename
#     that doesn't drop the active SSH session.
sudo tailscale up --hostname=notes --ssh

# 2. Get the repo on the box. Use a read-only deploy key, NOT a personal SSH key
#    or a PAT. Generate the key on the VPS, register the public half in GitHub
#    repo settings → Deploy keys (read-only).
sudo mkdir -p /opt/vonshlovens && sudo chown "$USER" /opt/vonshlovens
git clone git@github.com:Vonshlovens/vonshlovens.git /opt/vonshlovens
cd /opt/vonshlovens/notes

# 3. Secrets — never tracked.
cp .env.example .env
$EDITOR .env                                  # NOTES_API_SYNC_TOKEN, NOTES_ADMIN_ALLOWED_USERS, etc.
mkdir -p secrets
openssl rand -base64 32 > secrets/pg_password
chmod 600 secrets/pg_password

# 4. Bring up data services first.
docker compose up -d postgres garage

# 5. Bootstrap Garage. Prints GARAGE_ACCESS_KEY / GARAGE_SECRET_KEY for paste into .env.
./scripts/bootstrap-garage.sh

# 6. Bring up the rest. The API embeds migrations via sqlx::migrate!() and
#    runs them in a tokio task at boot — see ADR 0007. The container will
#    answer /healthz immediately and /readyz once migrations finish; a
#    failed migration leaves /readyz at 503 (visible in `docker compose logs api`).
docker compose up -d

# 8. Verify.
curl -fsS https://notes.<tailnet>.ts.net/api/v1/healthz
docker compose ps
```

Bootstrap is idempotent — re-running each step should be a no-op.

### Steady-state update loop

```bash
cd /opt/vonshlovens
git fetch && git log --oneline HEAD..origin/main    # peek at incoming
git pull --ff-only

cd notes

# Rebuild only what changed (Postgres / Garage / Caddy almost never change).
# Migrations are embedded in the binary and run in a tokio task at boot;
# the new container will be /healthz-up immediately and /readyz-up once
# migrations finish (or stuck at /readyz: 503 if they fail — check logs).
docker compose up -d --build api admin

# Verify.
docker compose logs -f --tail=50 api
curl -fsS https://notes.<tailnet>.ts.net/api/v1/healthz
```

Wrap in `notes/scripts/deploy.sh` so it's one command. Run from the VPS shell or from the laptop:

```bash
tailscale ssh notes -- "cd /opt/vonshlovens && bash notes/scripts/deploy.sh"
```

### Rollback

When a deploy goes bad:

```bash
cd /opt/vonshlovens
git log --oneline -10
git checkout <good-sha>
cd notes
docker compose up -d --build api admin
```

Volumes (Postgres, Garage) are untouched — data survives the rollback. Once verified:

- **Code bug only** → fix on `main`, `git checkout main && git pull`, redeploy.
- **Bad migration shipped** → write a *new* forward-only migration to undo the damage. Don't roll a migration back; that road ends in a corrupted schema.

The discipline that keeps rollback cheap: **migrations are always backward-compatible with the previous API version** for at least one deploy cycle. Add columns with defaults; don't drop columns in the same release that stops writing them.

### Per-service upgrades

| Service | How |
| --- | --- |
| API / admin | Steady-state loop above. |
| Postgres major bump (e.g., 18 → 19) | Planned event: dump, re-deploy with new image, restore. Stay on 18 until pgvector forces a bump. |
| Garage minor | Drop-in: bump tag in compose, `docker compose up -d garage`. |
| Garage major | Read release notes; may require cluster maintenance steps. |
| Caddy | Bump tag in compose, `docker compose up -d caddy`. |
| Tailscale on host | `tailscale update` from the VPS shell (independent of the stack). |

### Cron / unattended ops

```cron
# Nightly Postgres dump → Garage backups bucket (see Backups section).
0 3 * * *  cd /opt/vonshlovens/notes && docker compose run --rm api notes-api backup-db

# Weekly garage-meta tarball → backups bucket.
0 4 * * 0  cd /opt/vonshlovens/notes && bash scripts/backup-garage-meta.sh
```

### When this stops being right

Move to "build images in CI, push to GHCR, VPS pulls" when at least one is true:

- Rust rebuilds on the VPS become annoyingly slow (compile times eating evenings).
- A staging environment is added and identical artifacts must run in both.
- Someone else starts contributing and the build env on the VPS becomes a snowflake.

For solo on a single VPS, the simpler loop is the right amount of process.

## Backups

- **Postgres**: nightly `pg_dump` to a Garage object at `backups/postgres/{YYYY-MM-DD}.sql.gz`. Kept 30 days locally + (optional) replicated to a separate Backblaze B2 / R2 bucket weekly. Implemented as a one-shot container on a cron timer (or `ofelia` sidecar).
- **Garage**: data is the backup, but a weekly tarball of `garage-meta` to the same backup bucket guards against metadata corruption. Garage objects are content-addressed, so re-uploading from a fresh Postgres + Garage + the operator's vault would recreate everything.
- **Restore drill**: documented checklist in `notes/docs/restore-drill.md` (TODO once stack is live). Quarterly run.

## Health and observability

- `api:/healthz` and `api:/readyz` drive container health.
- Caddy logs are JSON; aggregated into the API's log volume for easy grep.
- A `/v1/admin/stats` endpoint surfaces: row counts, change_log size, embedding queue depth, Garage bucket usage. The admin dashboard renders this.
- No external metrics shipper in MVP. If something breaks, `docker compose logs` is the first stop.

## Disaster scenarios

| Scenario | Recovery |
| --- | --- |
| VPS dies | Reprovision, restore Postgres from latest dump, re-bootstrap Garage, run plugin reconcile from any device — vault is canonical source. |
| Postgres corruption | Restore from latest dump; reconcile from plugin will re-push anything since the dump. |
| Garage corruption | Vault has every attachment locally; plugin reconciles re-uploads everything. |
| Tailnet outage | Stack still runs; just unreachable. Vault edits queue locally in plugin debouncer; flush on reconnect. |
| Lost vault (catastrophic) | `obsync-pg pull`-equivalent in the new plugin: hit `GET /v1/sync/manifest`, then `GET /v1/sync/changes?since=0`, write everything back to disk. |

The vault-on-disk and the database are mirrors; either can be rebuilt from the other. The operator should not lose both at the same time.
