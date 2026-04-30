---
name: tackle
description: Autonomously implement a reasonable scope of a beads issue — claim it, research, scope, code, update specs, close (or leave in_progress with notes), commit, and push.
argument-hint: "<bd-id>"
---

# Tackle a Beads Issue

Implement a **reasonable scope** of a beads issue autonomously: claim it, scope what's feasible this session, write the code, update specs where relevant, close or mark partial, commit, and push.

This skill is designed to run **without user interaction** — it's the implementation half of the `/file` → `/tackle` pair, and is the workhorse of the ralph loop.

## Usage

- `/tackle von-123` — tackle a specific issue
- `/tackle` — pick top unblocked issue from `bd ready`, preferring `in_progress` first, then P0/P1, then P2+

## Process

### 1. Read the issue

```bash
bd show <id>
```

Extract: title, description, design, acceptance criteria, notes, blockers, current status.

- If status is `closed`: report and stop. Do nothing.
- If status is `in_progress`: read the `notes` field for any prior hand-off context, then continue from where the previous agent left off.
- If status is `open`: proceed.

If no ID was passed, run `bd ready` and pick the top candidate using the priority rule above.

### 2. Claim it

```bash
bd update <id> --claim
```

This marks the issue `in_progress` and assigns it to you. Writes are live on Railway, so other agents will see the claim immediately.

### 3. Research

- Read every file referenced in the description, design, acceptance, and notes.
- Read any specs in `specs/` mentioned by the issue.
- Grep for related code if the issue doesn't paint a complete picture.
- Understand the current state before changing anything.

**Treat specs as intent, not reality.** Confirm what's actually built before assuming a spec matches the code.

### 4. Scope the work

**CRITICAL**: aim to finish coding by ~60% context usage (~200k tokens). You need headroom for debugging, spec updates, and commit. This means:

- **Small** (single-file, single-function change): do the whole thing.
- **Medium** (multi-file, related changes): pick a coherent, committable subset — e.g., schema + API without the UI, or backend without tests.
- **Large** (cross-cutting, multi-phase): pick the **single most foundational chunk** and stop there.

**How to choose scope:**
1. Foundational work first (things others depend on).
2. Pick a scope that results in a **coherent, committable unit** — don't leave half-written functions.
3. Walk the acceptance criteria in order and tackle as many as comfortably fit.
4. When in doubt, do less. A clean partial beats a rushed complete.

State your scoping decision in chat before coding — e.g., "This issue has 5 acceptance criteria. I'll tackle criteria 1–2 (schema + API) and leave the form wiring for a follow-up." This becomes part of the commit message too.

### 5. Implement the scoped work

- Edit/create the necessary source files. Follow existing patterns and conventions.
- Keep changes minimal and focused — don't refactor surrounding code.
- Load project skills when their triggers match (e.g., `/svelte5-gotchas` for `.svelte` edits, `/drizzle-schema-changes` for schema work).
- **If an acceptance criterion is unclear or needs user input**, skip it — don't guess, don't ask. Mark it in step 7 for the user to unblock.
- **If the entire issue needs user input** and nothing can be done autonomously, skip to step 7.

### 6. Update specs

If the implementation changes behavior described in a `specs/` doc, **update the spec**. Only touch directly affected specs.

### 7. Update beads

Pick one:

- **Complete** (all acceptance criteria met for the full issue):
  ```bash
  bd close <id>
  ```
  Add `--reason="..."` if the outcome meaningfully differs from the title.

- **Partial** (you scoped down, some criteria done, others remain):
  ```bash
  bd update <id> --notes="Done: <criteria>. Remaining: <criteria>. Hand-off: <any context the next agent needs>."
  ```
  Leave the issue `in_progress`. If new follow-up work emerged, file it with `bd create` and link via `bd dep add`.

- **Blocked on user input**:
  ```bash
  bd update <id> --notes="⚠️ Needs input: <specific question>. Blocked because <reason>."
  bd human <id>   # flag for human decision
  ```
  Leave `in_progress`. Commit any partial work before stopping.

- **Blocked on another issue** you just discovered:
  ```bash
  bd dep add <id> <blocker-id>
  bd update <id> --notes="Blocked on <blocker-id>: <reason>."
  ```

### 8. Commit

Stage changed source files, spec updates, and any other modified docs. **Commit even if the only code change was notes on the issue itself** — partial progress deserves a record.

```bash
git add <files>
git commit -m "$(cat <<'EOF'
<Imperative summary> (<bd-id>)

<Optional: 1–2 lines on what was scoped in and what was left for later.>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Use the bd ID (e.g., `von-123`) in the subject line so git log cross-references the tracker.

### 9. Push

```bash
git pull --rebase
git push
git status   # should say "up to date with origin"
```

**Work is NOT complete until pushed.** If push fails, resolve (rebase conflict, hook failure) and retry — never stop with work stranded locally. Do NOT run `bd dolt push`; beads storage is already live remote.

### 10. Report

- What was implemented (brief summary)
- Files modified
- What was skipped and why (if any)
- bd status after (`closed`, or `in_progress` with hand-off notes)
- Commit hash and push confirmation

## Rules

- **Be autonomous.** Never stop mid-task to ask the user questions. If something is unclear, skip it, note it on the issue, and keep moving on what you *can* do.
- **Always read the issue and related code first.** Don't guess at what needs to change.
- **Scope conservatively.** 3 criteria done well beats 8 done poorly. You can `/tackle` the same issue again in a new session.
- **Always push.** The session-close protocol in `AGENTS.md` requires it.
- **No `bd dolt push` / `bd dolt pull`** — storage is a live remote Dolt server on Railway.
- **No `bd edit`** — it opens `$EDITOR` and blocks the agent. Use `--title`/`--description`/`--notes`/`--design` flags on `bd update` instead.
- **If already closed**, mention it and do nothing.
- **One issue at a time.** If the user passes multiple IDs, tackle them sequentially in separate runs — don't bundle.
