# Notes Data Model

> Status: **Aspirational**
> Last updated: 2026-04-27

Postgres schema owned by the Rust notes-api service. See [`notes.md`](notes.md) for context.

## Database

- Engine: **Postgres 18** (image `pgvector/pgvector:pg18` in the docker-compose).
- Extensions: `pgcrypto` (UUIDs), `vector` (pgvector embeddings).
- Single schema (`public`); single-vault assumption.
- Migrations: **`sqlx-cli`** with plain SQL files in `notes/api/migrations/`.

## Tables

### `notes`

The canonical record for every markdown file in the vault.

```sql
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Vault identity
    path TEXT UNIQUE NOT NULL,            -- relative path from vault root, including '.md'
    filename TEXT NOT NULL,               -- basename without extension

    -- Routing fields (parsed from frontmatter)
    slug TEXT,                            -- derived from filename if absent
    type TEXT,                            -- open enum: 'article', 'note', or anything else
    publish BOOLEAN NOT NULL DEFAULT FALSE,

    -- Content
    title TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    aliases TEXT[] NOT NULL DEFAULT '{}',
    body TEXT NOT NULL,                   -- markdown without frontmatter
    raw_content TEXT NOT NULL,            -- original file bytes
    frontmatter JSONB NOT NULL DEFAULT '{}',  -- everything not pulled into typed columns
    outgoing_links TEXT[] NOT NULL DEFAULT '{}',

    -- Authoring timestamps (best-effort — fall back to file stat)
    created_at TIMESTAMPTZ,
    modified_at TIMESTAMPTZ,

    -- Sync metadata
    content_hash TEXT NOT NULL,           -- SHA256 hex of raw_content
    file_size_bytes BIGINT NOT NULL,
    revision BIGINT NOT NULL,             -- monotonic, server-assigned; bumped on every accepted change
    synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Embeddings (populated lazily by background job)
    embedding vector(1536),               -- OpenAI text-embedding-3-small dim
    embedded_at TIMESTAMPTZ,
    embedded_hash TEXT,                   -- content_hash at the time embedding was computed

    -- Soft delete
    deleted_at TIMESTAMPTZ
);
```

**Indexes:**

```sql
-- Unique slug per (type) for live published rows only.
-- Drafts and deleted rows can share slugs without colliding.
CREATE UNIQUE INDEX notes_type_slug_uniq
    ON notes (type, slug)
    WHERE publish = TRUE AND deleted_at IS NULL;

CREATE INDEX notes_tags         ON notes USING GIN (tags);
CREATE INDEX notes_frontmatter  ON notes USING GIN (frontmatter);
CREATE INDEX notes_modified     ON notes (modified_at DESC);
CREATE INDEX notes_revision     ON notes (revision);
CREATE INDEX notes_publish_live ON notes (type, publish) WHERE deleted_at IS NULL;

-- pgvector ANN; cosine distance with IVFFLAT (use HNSW once we hit pg18 + vector >= 0.7).
CREATE INDEX notes_embedding ON notes
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

### `change_log`

Append-only feed of every accepted mutation. Drives the plugin's pull cursor.

```sql
CREATE TABLE change_log (
    revision BIGSERIAL PRIMARY KEY,
    op TEXT NOT NULL CHECK (op IN ('upsert', 'delete')),
    resource TEXT NOT NULL CHECK (resource IN ('note', 'attachment')),
    path TEXT NOT NULL,
    content_hash TEXT,                    -- NULL on delete
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX change_log_path ON change_log (path);
```

The `revision` column is a `BIGSERIAL`. The same value is mirrored into `notes.revision` (and `attachments_metadata.revision`) when a row is upserted, so a client that knows the latest revision per path can pull only what it lacks. The plugin polls `GET /v1/sync/changes?since=<rev>` to advance.

### `attachments_metadata`

Metadata only; binary blobs live in Garage. See [`notes-storage.md`](notes-storage.md).

```sql
CREATE TABLE attachments_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path TEXT UNIQUE NOT NULL,            -- vault-relative path
    filename TEXT NOT NULL,
    extension TEXT,
    mime_type TEXT,
    file_size_bytes BIGINT NOT NULL,
    content_hash TEXT NOT NULL,           -- SHA256 hex; doubles as the Garage object key prefix
    object_key TEXT NOT NULL,             -- 'attachments/{sha256}/{filename}'

    revision BIGINT NOT NULL,
    synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX attachments_hash ON attachments_metadata (content_hash);
CREATE INDEX attachments_revision ON attachments_metadata (revision);
```

When the same content is uploaded under multiple paths (e.g. a duplicated image), the row is logical (per path), but the Garage object is shared by hash. Soft-delete is per path; the API runs a periodic GC pass that removes Garage objects no live row references.

### `device_state` (optional, future)

Tracks each plugin device's last-seen revision so the API can serve compact change feeds and detect long-offline clients. Not required for MVP — the plugin can store its cursor locally — but cheap to add when needed.

```sql
-- Future:
CREATE TABLE device_state (
    device_id UUID PRIMARY KEY,
    label TEXT,                           -- "Eric's MacBook"
    last_seen_revision BIGINT NOT NULL,
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Soft-delete semantics

- `DELETE` operations from the plugin set `deleted_at = NOW()` and append a `delete` row to `change_log`. The note row stays.
- This lets the API serve "you missed a delete" to other devices via the change cursor.
- A nightly job hard-deletes rows where `deleted_at < NOW() - INTERVAL '90 days'` and runs Garage GC for orphaned objects.
- "Undelete" is a server-side op that sets `deleted_at = NULL` and bumps revision (intended for the admin UI).

## Embedding lifecycle

- `embedding` is `NULL` on first insert.
- A background tokio task watches for rows where `embedded_hash IS NULL OR embedded_hash != content_hash`, batches them, calls the embedding provider, writes back `embedding`, `embedded_at`, `embedded_hash`.
- Out of MVP scope; the column lands in the initial migration so we don't need a follow-up one.

## Migration strategy

- One SQL file per migration in `notes/api/migrations/NNNN_description.sql`.
- `sqlx-cli` runs them at API boot in dev; in production we run `sqlx migrate run` from a one-shot container before the API container starts.
- The first migration creates `pgcrypto`, `vector`, `notes`, `attachments_metadata`, `change_log` together — they're a single tightly-coupled unit.
- Never edit a migration after it's been applied to a live DB. Add a new one.

## What's deliberately not here

- **No `vault_` prefix** — there's one vault.
- **No per-vault schema isolation** — same reason.
- **No separate body store** — the markdown body fits comfortably in `TEXT`. Postgres' TOAST handles compression.
- **No full-text-search GIN index** yet — defer until the admin's search needs it; pgvector + tag filtering carries us a long way.
