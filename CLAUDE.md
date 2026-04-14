# CLAUDE.md

## Project Overview

Bun + SvelteKit full-stack web application. Uses SvelteKit 5 with svelte-adapter-bun for deployment on Railway via Docker.

## Development Commands

```bash
bun run dev       # Dev server on http://localhost:5173
bun run build     # Production build (outputs to /build)
bun run preview   # Preview production build
bun run check     # Type checking with svelte-check
```

## Architecture

### Stack
- **Runtime:** Bun
- **Framework:** SvelteKit 5 (Svelte 5 runes mode)
- **Adapter:** svelte-adapter-bun
- **Language:** TypeScript (strict mode)

### SvelteKit Routing
- `+page.svelte` — UI components
- `+page.ts` — Load functions (server + client)
- `+server.ts` — API endpoints (server only)
- `+layout.svelte` — Shared layouts
- `[param]/` — Dynamic route segments

## Deployment

### Railway
Configured via `railway.toml` + multi-stage `Dockerfile`:
1. Build stage: `oven/bun:1` — installs deps, runs `bun run build`
2. Production stage: `oven/bun:1-slim` — runs `bun ./build` on port 3000

```bash
# Deploy via Railway CLI
railway up
```

### Docker (local)
```bash
docker build -t vonshlovens .
docker run -p 3000:3000 vonshlovens
```

## Testing

No testing framework configured yet. Type checking via `bun run check`.
