# notes-api stack

Self-hosted notes-api: Postgres (pgvector) + Garage S3 + Rust+Axum API + Caddy
on a Tailscale-only VPS. The vault sync target for the Obsidian plugin and the
read source for the public blog.

Authoritative specs live under [`../specs/`](../specs/):

- [`notes.md`](../specs/notes.md) — overview
- [`notes-data-model.md`](../specs/notes-data-model.md) — Postgres schema
- [`notes-sync-api.md`](../specs/notes-sync-api.md) — HTTP contract
- [`notes-storage.md`](../specs/notes-storage.md) — Garage layout
- [`notes-api-deployment.md`](../specs/notes-api-deployment.md) — VPS topology and ops

## Layout

```
notes/
├── api/                   # Rust + Axum service
│   ├── src/
│   ├── migrations/        # sqlx-cli SQL migrations
│   ├── Cargo.toml
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── Caddyfile
├── garage.toml
├── scripts/
│   └── bootstrap-garage.sh
└── .env.example
```

## First-time setup

See [`../specs/notes-api-deployment.md`](../specs/notes-api-deployment.md) for
the canonical sequence. In short:

```bash
cp .env.example .env && $EDITOR .env
cp api/.env.example api/.env && $EDITOR api/.env
mkdir -p secrets && openssl rand -base64 32 > secrets/pg_password && chmod 600 secrets/pg_password

docker compose up -d postgres garage
./scripts/bootstrap-garage.sh        # prints GARAGE_ACCESS_KEY / GARAGE_SECRET_KEY → paste into api/.env
docker compose up -d                 # API runs migrations on boot
curl -fsS https://${TAILNET_HOSTNAME}.${TAILNET_DOMAIN}/api/v1/healthz
```
