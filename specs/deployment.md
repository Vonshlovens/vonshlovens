# Deployment

## Target
Railway, via `railway.toml` + multi-stage `Dockerfile`.

## Build pipeline
1. **Build stage** (`oven/bun:1`): copy `package.json` + `bun.lock`, install deps, copy the rest, `bun run build`.
2. **Runtime stage** (`oven/bun:1-slim`): copy `/app/build` and `package.json`, `CMD ["bun", "./build"]` on port `3000`.

## Environment
- `PORT=3000` is set in the Dockerfile.
- Runtime secrets live in Railway project variables — never committed, never baked into the image.

## Local
```bash
docker build -t vonshlovens .
docker run -p 3000:3000 vonshlovens
```

## Deploy
```bash
railway up
```

## Branch policy
- `main` is the deployed branch.
- `main-old` on `origin` holds the pre-rewrite history as a safety net; don't delete without a replacement backup.
