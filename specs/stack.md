# Stack

## Runtime & framework
- **Runtime:** Bun (image `oven/bun:1` for build, `oven/bun:1-slim` for runtime).
- **Framework:** SvelteKit 5 with Svelte 5 runes mode.
- **Adapter:** `svelte-adapter-bun` — emits a Bun-native server into `/build`.
- **Language:** TypeScript, strict mode.

## Dev workflow
- `bun run dev` — Vite dev server on `http://localhost:5173`.
- `bun run build` — production build to `/build`.
- `bun run preview` — preview the built output.
- `bun run check` — `svelte-check` against `tsconfig.json`.

## Testing
No framework wired up yet. Type checking via `bun run check` is the current floor.
