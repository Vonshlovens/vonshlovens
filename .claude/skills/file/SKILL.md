---
name: file
description: Create a well-researched beads issue — consult specs and existing code before writing, so the issue has grounded context, real file references, and concrete acceptance criteria.
argument-hint: "[task idea]"
---

# File a Beads Issue

Add a well-researched issue to beads. Before writing anything, investigate the relevant specs and codebase so the issue has accurate context, real file paths, and actionable acceptance criteria.

This is a **collaborative** skill — it is fine (expected, even) to ask the user clarifying questions during research. Unlike `/tackle`, which runs autonomously, `/file` produces a high-quality issue that a future agent or the user can pick up without re-deriving context from scratch.

## Input

The user provides a task idea as the argument or describes it in conversation. It may be vague — your job is to flesh it out.

## Process

### 1. Survey beads state

```bash
bd stats                    # Open/closed/blocked counts
bd search "<keywords>"      # Avoid duplicates
bd list --status=open       # Scan recent work for overlap
```

Look for:
- An existing issue covering this work → propose updating it instead of creating a duplicate
- Adjacent in-flight issues that this one should depend on or block
- Conventions (title style, priority distribution)

### 2. Consult specifications

Read `specs/README.md` to find relevant specs, then read those specs. You need to know:
- Whether the work is already specced out, and what the spec says about approach
- Related systems, data models, constraints
- Architecture decisions that apply

**Treat specs as "planned, not necessarily built"** (per `AGENTS.md`). If the spec describes something, search the code to confirm current state before writing the issue.

### 3. Explore related code

Search the codebase for files the task will touch or depend on:
- Identify concrete file paths to reference in the description
- Check whether anything is partially built already
- Confirm current behavior vs. what the issue proposes changing

### 4. Draft the issue

Compose four fields — each is a separate `bd` flag. Keep them focused:

- **title** — Short imperative summary. Aim for <70 chars.
- **description** — What needs to happen and **why**. The motivation, the current vs. desired state, and concrete file paths. This is the main body.
- **design** — Technical approach and decisions informed by the spec/code you just read. Data model, call sites, migration strategy, anything a future agent shouldn't have to re-derive. Skip if the work is trivial.
- **acceptance** — Bulleted list of observable completion criteria. "User can X", "endpoint returns Y", "test Z passes". This is what `/tackle` will check itself against.
- **notes** — Supplementary context: spec links, related issue IDs, edge cases, open questions. Optional.

Embed file paths as `src/foo/bar.ts:123` style so they're clickable.

### 5. Decide type and priority

- **type**: `task` (default) | `bug` (regression or broken behavior) | `feature` (user-visible new capability)
- **priority** (numeric, NOT "high"/"low"):
  - `0` — critical, drop-everything (broken prod, data loss)
  - `1` — high, needed soon
  - `2` — medium (default)
  - `3` — low, nice-to-have
  - `4` — backlog, someday

If priority isn't obvious from the conversation, ask the user.

### 6. Consider splitting into dependent issues

Beads has no first-class "subtasks" — larger work is modeled as **separate issues with dependencies**. If the work is genuinely multi-phase (schema → API → frontend → tests), file them as separate issues and chain them:

```bash
bd dep add <child-id> <parent-id>   # child depends on parent
```

A future `/tackle` run will only surface unblocked issues, so this sequences the work naturally. For single-phase work, one issue with bulleted acceptance criteria is fine.

### 7. Create the issue

```bash
bd create \
  --title="..." \
  --description="..." \
  --design="..." \
  --acceptance="..." \
  --notes="..." \
  --type=task \
  --priority=2
```

Fields with multi-line content: use `$'...\n...'` bash quoting or a heredoc-backed variable. Omit `--design` or `--notes` if empty — don't pass empty strings.

Add `--validate` if you want the CLI to check required sections before accepting.

### 8. Wire up dependencies (if you split in step 6)

```bash
bd dep add <child-id> <parent-id>
```

### 9. Confirm

Tell the user:
- The bd ID and title
- Type, priority, and any dependencies created
- Which specs and code files were referenced
- A one-line summary of what the research revealed (e.g., "schema already has the column, only the API and form need changes")

## Rules

- **Never skip the research steps.** The value of this skill is that issues are grounded in actual spec/code knowledge, not guesses. If you're writing the issue without reading specs or code, you're doing it wrong.
- **Ask when it matters.** Priority, scope boundaries, and ambiguous requirements are worth one clarifying question. Don't ask about things you can resolve by reading the code.
- **Don't duplicate existing issues.** If a similar issue exists, tell the user and suggest updating it instead.
- **Keep descriptions actionable.** Focus on what to build and how, not abstract goals.
- **Use relative paths** in references (e.g., `specs/stack.md`, not absolute paths).
- **Storage is live remote Dolt** — `bd create` writes immediately to Railway. Do NOT run `bd dolt push` afterward.
