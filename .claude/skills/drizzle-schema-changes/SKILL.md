---
name: drizzle-schema-changes
description: Safe workflow for adding/modifying Drizzle schema columns and running migrations. Load when editing anything under `src/lib/db/schema/`, touching Zod validators (`CreateXSchema`/`UpdateXSchema`) for those tables, editing client-side form schemas, or running drizzle-kit migration commands. Explains why new columns silently fail to persist (Zod strips them) and why `db:push` hangs agents.
---

# Drizzle Schema Changes

## Adding a new column — update ALL four layers

When adding a column to a Drizzle schema, update **all** Zod validation schemas that touch that table — not just the DB schema. Fields missing from Zod schemas are silently stripped during `.parse()`, so the API will accept the request but never persist the new value.

Checklist:

1. **`src/lib/db/schema/`** — the Drizzle table definition (the DB column itself)
2. **API-level Zod schemas** (`CreateModelSchema`, `UpdateModelSchema`, etc.) — wherever route handlers parse input
3. **Client-side form validation schemas**
4. **Frontend form** `defaultFormData` and `openEditDialog` mappings

Missing any one = silent data loss.

## Migration workflow

Drizzle Kit via Bun:

```bash
bun run drizzle-kit generate   # Generate migration from schema changes
bun run drizzle-kit migrate    # Apply pending migrations
bun run drizzle-kit studio     # Open Drizzle Studio GUI
```

(Or whatever the project's `package.json` scripts wrap these as — check first.)

**Correct workflow for schema changes:**

1. Edit the Drizzle schema file(s) in `src/lib/db/schema/`
2. `drizzle-kit generate` — creates a new SQL migration file (non-interactive)
3. `drizzle-kit migrate` — applies pending migrations (non-interactive)
4. Update the Zod/form layers (see checklist above)

## NEVER do these

- **`drizzle-kit push`** — requires interactive terminal input (rename confirmations, truncate prompts) that AI agents cannot answer. It will hang indefinitely.
- **Manual SQL** on the database (`ALTER TABLE`, `INSERT`, `DROP`, etc.). Always use Drizzle schema changes + migrations. The only exception is fixing a broken Drizzle migration file itself.
