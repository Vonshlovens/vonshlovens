# Routing

SvelteKit file-based routing under `src/routes/`.

| File | Role |
| --- | --- |
| `+page.svelte` | UI for a route |
| `+page.ts` | Load function (runs on server and client) |
| `+page.server.ts` | Server-only load + form actions |
| `+server.ts` | API endpoint (server only) |
| `+layout.svelte` | Shared layout wrapping nested routes |
| `[param]/` | Dynamic segment |
| `(group)/` | Route group (no URL effect) |

## Conventions
- Prefer `+page.server.ts` over `+server.ts` when the data is page-specific; reserve `+server.ts` for genuine JSON/binary APIs.
- Keep load functions thin — delegate to helpers in `src/lib/`.
- `src/lib/` is aliased to `$lib`; import shared code from there, not via relative paths that escape `src/routes/`.
