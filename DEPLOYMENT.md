# Deploying Deno + SvelteKit to Azure Container Apps

This guide documents the changes made from the initial commit to deploy this Deno + SvelteKit application to Azure Container Apps using Docker.

## What Changed

### 1. package.json

**Initial commit:**
```json
{
  "scripts": {
    "dev": "deno run -A npm:vite & deno run server:start",
    "server:start": "deno run -A --watch ./api/main.ts",
    "build": "deno run -A npm:vite build",
    "serve": "deno run build && deno run server:start"
  }
}
```

**Current (for Docker deployment):**
```json
{
  "scripts": {
    "dev": "deno run -A npm:vite",
    "build": "deno run -A npm:vite build",
    "preview": "deno run -A npm:vite preview"
  },
  "dependencies": {
    "@deno/svelte-adapter": "^0.1.0"
  }
}
```

**Changes:**
- Added `@deno/svelte-adapter` dependency for Docker/Deno Deploy compatibility
- Simplified dev script (removed API server background process)
- Removed custom `server:start` and `serve` scripts
- Added `preview` script for testing production builds

### 2. svelte.config.js

**Initial commit:**
```js
import adapter from '@sveltejs/adapter-auto';
```

**Current:**
```js
import adapter from "@deno/svelte-adapter";
```

**Changes:**
- Replaced `@sveltejs/adapter-auto` with `@deno/svelte-adapter`
- This adapter generates `.deno-deploy/server.ts` for deployment

### 3. Dockerfile (new file)

```dockerfile
# Use official Deno image
FROM denoland/deno:latest

# Set working directory
WORKDIR /app

# Copy dependency files
COPY deno.json package.json deno.lock* ./

# Install dependencies
RUN deno install

# Copy application code
COPY . .

# Build the SvelteKit app
RUN deno run -A npm:vite build

# Expose port
ENV PORT=8000
EXPOSE 8000

# Start the Deno server
CMD ["deno", "run", "-A", ".deno-deploy/server.ts"]
```

**Key points:**
- Uses latest Deno image for lockfile compatibility
- Separates dependency installation for better Docker layer caching
- Builds the app during Docker build
- Runs the Deno adapter's generated server on port 8000

### 4. .dockerignore (new file)

```
node_modules
.svelte-kit
build
.git
.github
.vscode
*.log
.env
.DS_Store
Thumbs.db
```

**Critical for Azure deployment on Windows** - excludes `node_modules` which contains Deno symlinks that break Azure CLI's upload process.

## Deployment Steps

### Local Testing

```bash
# Build Docker image
docker build --tag deno-sveltekit-tutorial .

# Run container
docker run -p 8000:8000 deno-sveltekit-tutorial

# Visit http://localhost:8000
```

### Deploy to Azure Container Apps

```bash
# Clean up node_modules (Windows only - prevents Azure CLI symlink errors)
rm -rf node_modules

# Deploy
az containerapp up \
  --resource-group deno-sveltekit-tutorial-rg \
  --name deno-sveltekit-tutorial \
  --ingress external \
  --target-port 8000 \
  --source .
```

This creates:
- Resource group
- Container Apps environment
- Azure Container Registry
- Builds and deploys your container

## Key Differences from Initial Setup

1. **No separate API server** - The initial setup ran a separate Deno API server alongside Vite. The current setup uses SvelteKit's built-in API routes.

2. **Different adapter** - Changed from `adapter-auto` to `@deno/svelte-adapter` which outputs a Deno-compatible server.

3. **Container-based deployment** - Initial setup was for local development. Current setup deploys to Azure Container Apps via Docker.

4. **Port 8000** - The Deno adapter defaults to port 8000 (not 8080).

## Troubleshooting

**Azure CLI fails with `FileNotFoundError` on Windows:**
- Remove `node_modules` before deployment: `rm -rf node_modules`

**Container starts but connection resets:**
- Ensure using port 8000 (Deno adapter default)
- Verify CMD points to `.deno-deploy/server.ts`

**Build fails with lockfile version error:**
- Use `denoland/deno:latest` to match your local Deno version
