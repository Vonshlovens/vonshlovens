# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Deno + SvelteKit full-stack web application demonstrating a dinosaur encyclopedia with 3000+ entries. The application uses SvelteKit's file-based routing with server-side rendering, TypeScript strict mode, and the Deno SvelteKit Adapter for deployment.

## Development Commands

All commands use Deno with full permissions (-A flag) to run Vite:

```bash
# Development server with hot reload (runs on http://localhost:5173)
deno run dev

# Production build (outputs to /build and generates .deno-deploy/server.ts)
deno run build

# Preview production build locally
deno run preview
```

Note: Run `deno install` first if dependencies are not yet installed.

## Architecture

### SvelteKit File-Based Routing

The application uses SvelteKit 5's routing conventions where files in `src/routes/` map to URLs:

- **`+page.svelte`**: UI components that render the page
- **`+page.ts`**: Load functions that fetch data before rendering (runs on server and client)
- **`+server.js/ts`**: API endpoints (only runs on server)
- **`+layout.svelte`**: Shared layouts wrapping child routes
- **`[param]/`**: Dynamic route segments (e.g., `/[dinosaur]/+page.svelte` matches `/tyrannosaurus`)

### Data Flow Pattern

```
HTTP Request → +page.ts loader → fetch /api/dinosaurs → +server.ts handler → data.json → JSON response → +page.svelte rendering
```

Key points:
- All dinosaur data lives in `src/routes/api/data.json` (3000+ entries)
- API routes (`+server.ts` files) serve as the data layer
- Page loaders (`+page.ts`) fetch from API routes
- Components use Svelte 5 runes (e.g., `const { data } = $props()`)

### Route Structure

```
/                              → src/routes/+page.svelte (dinosaur list)
/health                        → src/routes/health/+page.svelte (health dashboard)
/template                      → src/routes/template/+page.svelte (component testing)
/api/dinosaurs                 → src/routes/api/dinosaurs/+server.js (GET all)
/api/dinosaurs/[id]            → src/routes/api/dinosaurs/[id]/+server.ts (GET one)
/[dinosaur]                    → src/routes/[dinosaur]/+page.svelte (detail page)
```

### Layout Structure

The application uses a shared layout ([src/routes/+layout.svelte](src/routes/+layout.svelte)) with:

- Sticky navigation header with brand and page links
- Active route indicator with gradient underline
- Responsive design with backdrop blur effects
- Links: Home, Template, Health

## Key Configuration Details

### Deno Adapter

This project uses `@deno/svelte-adapter` instead of `adapter-auto`. When you run `deno run build`, it:
1. Builds the SvelteKit app to `/build`
2. Generates `.deno-deploy/server.ts` (the entry point for production)
3. This server file is what runs in Docker/deployment environments

### Important Files

- **`deno.json`**: Deno configuration with JSR imports (@oak/oak, @tajpouria/cors) and "sloppy-imports" unstable feature
- **`svelte.config.js`**: Uses `@deno/svelte-adapter` (NOT `adapter-auto`)
- **`tsconfig.json`**: Strict mode enabled with `checkJs: true`
- **`.npmrc`**: Sets `engine-strict=true` for dependency enforcement

### Docker Deployment

The Dockerfile uses a two-stage copy pattern for better layer caching:
1. Copy `deno.json`, `package.json`, `deno.lock*` → `deno install`
2. Copy all source → `deno run -A npm:vite build`
3. Run `.deno-deploy/server.ts` on port 8000

**Critical**: The `.dockerignore` excludes `node_modules` because Deno creates symlinks that break Azure CLI uploads on Windows.

### Docker Compose Development

For local development with Docker Compose:

```bash
docker-compose up
```

- Mounts `src/` and `static/` for hot-reloading during development
- Runs on port 8000
- Excludes `.deno-deploy` and `node_modules` from volume mounts
- Environment: `NODE_ENV=production`, `PORT=8000`

## Architectural Decision

The initial commit had a separate Deno API server (`api/main.ts`) running alongside Vite. This was replaced with SvelteKit's built-in API routes (`+server.ts` files) for simpler architecture and deployment. See `DEPLOYMENT.md` for the full evolution.

## Data Model

All dinosaur entries in `src/routes/api/data.json` follow this structure:

```json
{
  "name": "Dinosaur Name",
  "description": "Description text"
}
```

The API handlers search this JSON file by name when serving individual dinosaur requests.

## UI Patterns

### Mouse-Tracking Gradient Effects

The application features interactive button gradients that follow the mouse cursor:

- **Home page**: Dinosaur buttons use CSS custom properties (`--mouse-x`, `--mouse-y`) to create radial gradients that track cursor position
- **Health page**: Category cards use similar radial gradient hover effects with red/neon theme (`#ff0844` to `#ff6b6b`)
- **Implementation**: JavaScript updates CSS variables on `mousemove` events, creating smooth gradient transitions

### Theme & Styling

- Dark theme with semi-transparent header (`rgba(15, 23, 42, 0.95)` with backdrop blur)
- Gradient text and underlines for navigation
- Consistent hover animations: `translateY(-2px)` lift effect
- Backdrop blur effects on cards: `blur(10px)`

## Testing

No testing framework is currently configured. The project includes `svelte-check` for component type checking, which can be run via: `deno run -A npm:svelte-check`

## Deployment

See `DEPLOYMENT.md` for detailed instructions. Quick reference:

```bash
# Build and test Docker image locally
docker build --tag vonshlovens .
docker run -p 8000:8000 vonshlovens

# Deploy to Azure Container Apps (from non-Windows or after rm -rf node_modules)
az containerapp up \
  --resource-group vonshlovens-rg \
  --name vonshlovens \
  --ingress external \
  --target-port 8000 \
  --source .
```

The project also has a GitHub Actions workflow (`.github/workflows/vonshlovens-AutoDeployTrigger-*.yml`) for automatic deployment to Azure Container Apps on push to main branch.
