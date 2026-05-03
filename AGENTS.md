# Agent Guidelines

This file provides essential guidance to AI coding assistants working in this codebase.

> **Note:** `CLAUDE.md` is a symlink to `AGENTS.md` — editing either one changes both.

## Project

**vonshlovens** is a personal blog. Its purpose is simple: share what I know. If it lands right, it also proves that knowledge and shows taste — so treat craft as part of the product, not polish applied after the fact. Writing quality, typography, layout rhythm, load behavior, and the code itself are all on-stage.

The repo carries two stacks:

- **Blog** (`src/`, `static/`, `Dockerfile`, `railway.toml`) — SvelteKit 5 (runes) on Bun, deployed to Railway via Docker. The reader-facing site.
- **notes-api** (`notes/`) — self-hosted sync target for the Obsidian vault and read source for the blog. Postgres (pgvector) + Garage S3 + Rust+Axum API + Caddy on a Tailscale-only VPS. Lives entirely under `notes/`; the blog reaches it over the tailnet via the Railway tailscale-bridge service. Stack-specific ADRs in `notes/docs/adr/`. The VPS is reachable as `ssh notes` from the operator's laptop.

See `specs/` for cross-cutting designs (both stacks), and `docs/` for repo-wide design notes, ADRs, and in-flight plans.

## Specifications

**IMPORTANT:** Before implementing any feature, consult the specifications in `specs/README.md`.

- **Assume NOT implemented.** Many specs describe planned features that may not yet exist in the codebase.
- **Check the codebase first.** Before concluding something is or isn't implemented, search the actual code. Specs describe intent; code describes reality.
- **Use specs as guidance.** When implementing a feature, follow the design patterns, types, and architecture defined in the relevant spec.

## Skills

Several recurring patterns live as project skills under `.claude/skills/` so they don't bloat this file. Load them when their triggers match:

- **`/svelte5-gotchas`** — runes vs Svelte 4, `<svelte:component>` deprecation, `{@const}` placement, `.svelte.ts` requirement, Melt builder init order. Load when editing `.svelte` / `.svelte.ts` files.
- **`/drizzle-schema-changes`** — four-layer update checklist (DB → API Zod → form Zod → form defaults), generate→migrate workflow, why `db:push` hangs. Load when touching Drizzle schemas, Zod validators, or running migrations.
- **`/file <task idea>`** — research-driven beads issue creation (consults specs and code first).
- **`/tackle [bd-id]`** — autonomous implementation of a beads issue (claim, scope, code, commit, push).

## SvelteKit Patterns

### Background jobs with frontend polling

When a server function creates a job record that the frontend polls, return the `jobId` immediately and run the work as fire-and-forget. Never `await` the full pipeline — the frontend will see 0% → 100% with no intermediate progress.

```typescript
// WRONG — blocks until done
await runAllStages(job.id);
return job.id;

// RIGHT — return immediately, run in background
(async () => {
  try {
    await runStage1(job.id);
    await runStage2(job.id);
  } catch (error) {
    await markJobFailed(job.id, error.message);
  }
})();
return job.id;
```

### Debugging SSR 500s

The browser shows a generic "Internal Error". The real error is in the dev server terminal. To test the load function independently of SSR rendering, hit the `__data.json` endpoint:

```bash
curl -s http://localhost:5173/some/page/__data.json | python3 -m json.tool
```

If `__data.json` succeeds but the page 500s, the error is in Svelte component rendering, not the data loader.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7f3aed41 -->
## Beads & Session Completion

This project uses **bd (beads)** for issue tracking. The SessionStart hook loads the full command reference automatically; run `bd prime` to reload it mid-session.

### Storage (overrides default bd guidance)

- Storage is a **shared Dolt SQL server hosted on Railway**, reached over Tailscale at `railway-dolt:3306`.
- **Writes are live.** Every `bd create/update/close` hits the remote server immediately. Other machines/agents see changes instantly.
- **Do NOT run `bd dolt push` or `bd dolt pull`.** The DB is already remote — there is no separate sync step.
- `BD_DOLT_AUTO_PUSH=false` and `backup.enabled: false` are intentional. Do not re-enable.
- "auto-push disabled" messaging does **not** mean local-only — it means pushing would be redundant (and was previously misconfigured against a git URL).
- Connection uses env vars in `~/.bashrc` (`BEADS_DOLT_SERVER_MODE=1` + host/port/user/password). If `bd` fails to connect, the tailnet or env vars are the issue — not local data.

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists.
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files.

### Session close protocol

Work is NOT complete until `git push` succeeds.

1. File issues for any remaining follow-up work (`bd create`).
2. Run quality gates (tests, linters, builds) if code changed.
3. Close finished issues (`bd close <id>`). bd writes are already live on Railway — **no `bd dolt push` needed**.
4. Push code:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. Verify all changes committed AND pushed before handing off. If push fails, resolve and retry — never stop with work stranded locally.
<!-- END BEADS INTEGRATION -->
