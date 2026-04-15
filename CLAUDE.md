# Agent Guidelines

This file provides essential guidance to AI coding assistants working in this codebase.

> **Note:** `CLAUDE.md` is a symlink to `AGENTS.md` — editing either one changes both.

## Project

**vonshlovens** is a personal blog. Its purpose is simple: share what I know. If it lands right, it also proves that knowledge and shows taste — so treat craft as part of the product, not polish applied after the fact. Writing quality, typography, layout rhythm, load behavior, and the code itself are all on-stage.

Stack is SvelteKit 5 (runes) on Bun, deployed to Railway via Docker. See `specs/` for details and `docs/` for design notes, ADRs, and in-flight plans.

## Specifications

**IMPORTANT:** Before implementing any feature, consult the specifications in `specs/README.md`.

- **Assume NOT implemented.** Many specs describe planned features that may not yet exist in the codebase.
- **Check the codebase first.** Before concluding something is or isn't implemented, search the actual code. Specs describe intent; code describes reality.
- **Use specs as guidance.** When implementing a feature, follow the design patterns, types, and architecture defined in the relevant spec.

## Svelte 5 Gotchas

### `<svelte:component>` is deprecated

In runes mode, components are dynamic by default. Use the component directly:

```svelte
<!-- WRONG — triggers deprecation warning -->
<svelte:component this={pipeline.icon} class="h-4 w-4" />

<!-- RIGHT — components are already dynamic in Svelte 5 -->
<pipeline.icon class="h-4 w-4" />
```

### `{@const}` placement is restricted

`{@const}` can only be an immediate child of `{#if}`, `{:else}`, `{#each}`, `{:then}`, `{:catch}`, `{#snippet}`, `<svelte:fragment>`, `<svelte:boundary>`, or `<Component>`. It **cannot** be placed inside plain HTML elements.

```svelte
<!-- WRONG — @const inside <button> -->
<button>
  {@const Icon = item.icon}
  <Icon />
</button>

<!-- RIGHT — use @const inside the {#each} block, before the element -->
{#each items as item}
  {@const Icon = item.icon}
  <button><Icon /></button>
{/each}

<!-- ALSO RIGHT — just reference the property directly -->
<button><item.icon class="h-4 w-4" /></button>
```

### Runes require `.svelte.ts` file extension

`$state`, `$derived`, `$effect`, and other runes are **compiler transforms** — they only work in `.svelte` and `.svelte.ts` files. Plain `.ts` files are not processed by the Svelte compiler, so runes are literally `undefined` at runtime.

Any utility or store that uses runes **must** have a `.svelte.ts` extension:

```
src/lib/utils/page-snapshot.ts        ❌  ReferenceError: $state is not defined
src/lib/utils/page-snapshot.svelte.ts ✅
```

This is the most common cause of `$state is not defined` 500 errors in production.

### Melt builders must be created at component init time

Melt builders (e.g., `Tree`, `Select`, `Tabs`) use `$effect` internally. Creating them inside an async callback runs outside Svelte's component context and throws `effect_orphan`. Always create builders synchronously at the top level of `<script>`, using getter functions for reactive data.

```typescript
// WRONG — async callback is outside component context
onMount(async () => {
  const data = await fetch(...);
  tree = new Tree({ items: data.items }); // 💥 effect_orphan
});

// RIGHT — create at component init, use getter for reactivity
let items = $state([]);
const tree = new Tree({ items: () => items });

onMount(async () => {
  const data = await fetch(...);
  items = data.items;
  tree.expandAll();
});
```

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

## Schema Changes (Drizzle + Zod)

When adding a new column to a Drizzle schema, update **all** Zod validation schemas that touch that table — not just the DB definition. Fields missing from Zod schemas are silently stripped during `.parse()`, so the API accepts the request but never persists the new value. Check:

- DB schema (Drizzle table definition)
- API-level Zod schemas (create/update)
- Client-side form validation schemas
- Frontend form defaults and edit dialog mappings

## Database Migrations

Never use interactive migration commands (e.g., `db:push`) — they require terminal input that AI agents cannot answer and will hang indefinitely. Use the generate → migrate workflow:

1. Edit the schema file(s)
2. Generate a migration (non-interactive)
3. Apply the migration (non-interactive)

**Never modify the database with raw SQL.** Always go through schema changes + migrations. The only exception is fixing a broken migration itself.

## Beads Storage — READ THIS FIRST (overrides the auto-generated section below)

- Storage is a **shared Dolt SQL server hosted on Railway**, reached over Tailscale at `railway-dolt:3306`.
- **Writes are live.** Every `bd create/update/close` hits the remote server immediately. Other machines/agents see changes instantly.
- **Do NOT run `bd dolt push` or `bd dolt pull`.** There is no separate sync step — the DB is remote already.
- `BD_DOLT_AUTO_PUSH=false` and `backup.enabled: false` are intentional. Do not re-enable.
- If you see "auto-push disabled" or similar messaging, that does **not** mean local-only. The opposite: the DB is remote and live; pushing would be redundant (and was misconfigured previously against a git URL).
- Connection is via env vars in `~/.bashrc` (`BEADS_DOLT_SERVER_MODE=1` + host/port/user/password). If `bd` complains about connection, the tailnet or env vars are the issue — not local data.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
