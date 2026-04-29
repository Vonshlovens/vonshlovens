# Deployment

## Target
Railway, via `railway.toml` + multi-stage `Dockerfile`.

## Build pipeline
1. **Build stage** (`oven/bun:1`): copy `package.json` + `bun.lock`, install deps, copy the rest, `bun run build`.
2. **Runtime stage** (`oven/bun:1-slim`): copy `/app/build` and `package.json`, `CMD ["bun", "./build"]` on port `3000`.

## Environment
- `PORT=3000` is set in the Dockerfile.
- Runtime secrets live in Railway project variables — never committed, never baked into the image.
- `NOTES_API_BASE` points the blog at notes-api (see [Reaching notes-api](#reaching-notes-api)).

## Reaching notes-api

> Status: **Aspirational** (lights up once notes-api is live; see [`notes-api-deployment.md`](notes-api-deployment.md)).

The blog reads notes from notes-api at `https://notes.<tailnet>.ts.net/api/v1`, which is **only reachable on the operator's Tailnet** (per `notes/docs/adr/0005-tailscale-only-deployment.md`). Railway containers aren't on the Tailnet by default, so a sidecar service bridges the two.

### Bridge

A separate Railway service runs **[`tailscale-railway-bridge`](https://github.com/Vonshlovens/tailscale-railway-bridge)**. It joins the Tailnet via a pre-auth key and exposes a proxy that the blog dials through. See that repo for its own README and operational details.

### Required Railway configuration

| Service | Variable | Value | Notes |
| --- | --- | --- | --- |
| `tailscale-railway-bridge` | `TS_AUTHKEY` | Tailscale pre-auth key | Rotated per Tailscale's expiration policy. |
| `tailscale-railway-bridge` | `TS_HOSTNAME` | e.g. `vonshlovens-bridge` | Identifies the node in the admin UI. |
| `vonshlovens` (blog) | `NOTES_API_BASE` | `https://notes.<tailnet>.ts.net/api/v1` | Read by `+page.server.ts` load functions. |
| `vonshlovens` (blog) | `HTTPS_PROXY` / `HTTP_PROXY` | per the bridge repo's contract | Routes outbound traffic through the bridge. |

### Fallback behavior

If `NOTES_API_BASE` is unset (e.g. local dev without the bridge), the blog falls back to a build-time fixture so dev iteration works without standing up the full stack. If the env var is set but the bridge or notes-api is unreachable at request time, the blog should serve a clear "Notes are temporarily unavailable" banner rather than 500-ing the whole route. Both fallbacks land with the blog-wiring work in `von-cnj`.

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
