# Specs Index

Specifications for this project — both current behavior and aspirational direction. Before implementing changes, scan this table and read any spec whose scope overlaps your task.

| Spec | Scope | Status |
| --- | --- | --- |
| [stack.md](stack.md) | Runtime, framework, build, and deployment stack | Current |
| [routing.md](routing.md) | SvelteKit routing conventions used in this repo | Current |
| [design.md](design.md) | Design system — palette, typography, motion, components | Aspirational |
| [security.md](security.md) | Security posture, headers, container hardening, secrets | Aspirational |
| [deployment.md](deployment.md) | Railway + Docker deployment pipeline (the blog) | Current |
| [notes.md](notes.md) | Notes pipeline overview — Obsidian → notes-api → blog | Aspirational |
| [notes-data-model.md](notes-data-model.md) | Postgres schema, change_log, pgvector | Aspirational |
| [notes-sync-api.md](notes-sync-api.md) | Rust API contract, auth, CAS protocol | Aspirational |
| [notes-plugin.md](notes-plugin.md) | Obsidian plugin internals and conflict UX | Aspirational |
| [notes-admin.md](notes-admin.md) | SvelteKit admin / notes-browser app | Aspirational |
| [notes-storage.md](notes-storage.md) | Garage object storage layout and attachment flow | Aspirational |
| [notes-api-deployment.md](notes-api-deployment.md) | docker-compose, Caddy, Tailscale Serve | Aspirational |

## Conventions

- **Current** — describes how the project works today; changes must keep the spec accurate.
- **Aspirational** — describes where we want to go; use as a target when touching related code.
- One spec per concern. If a new area of the system emerges, add a row here and a file alongside.
