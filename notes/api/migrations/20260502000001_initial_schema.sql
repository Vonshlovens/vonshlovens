-- Initial notes-api schema. Single migration; the four objects below are a
-- tightly-coupled unit and ship together. Per specs/notes-data-model.md.
--
-- Forward-only. Never edit after applying — write a new migration to evolve.

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    path TEXT UNIQUE NOT NULL,
    filename TEXT NOT NULL,

    slug TEXT,
    type TEXT,
    publish BOOLEAN NOT NULL DEFAULT FALSE,

    title TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    aliases TEXT[] NOT NULL DEFAULT '{}',
    body TEXT NOT NULL,
    raw_content TEXT NOT NULL,
    frontmatter JSONB NOT NULL DEFAULT '{}',
    outgoing_links TEXT[] NOT NULL DEFAULT '{}',

    created_at TIMESTAMPTZ,
    modified_at TIMESTAMPTZ,

    content_hash TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    revision BIGINT NOT NULL,
    synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    embedding vector(1536),
    embedded_at TIMESTAMPTZ,
    embedded_hash TEXT,

    deleted_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX notes_type_slug_uniq
    ON notes (type, slug)
    WHERE publish = TRUE AND deleted_at IS NULL;

CREATE INDEX notes_tags         ON notes USING GIN (tags);
CREATE INDEX notes_frontmatter  ON notes USING GIN (frontmatter);
CREATE INDEX notes_modified     ON notes (modified_at DESC);
CREATE INDEX notes_revision     ON notes (revision);
CREATE INDEX notes_publish_live ON notes (type, publish) WHERE deleted_at IS NULL;

CREATE INDEX notes_embedding ON notes
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE TABLE change_log (
    revision BIGSERIAL PRIMARY KEY,
    op TEXT NOT NULL CHECK (op IN ('upsert', 'delete')),
    resource TEXT NOT NULL CHECK (resource IN ('note', 'attachment')),
    path TEXT NOT NULL,
    content_hash TEXT,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX change_log_path ON change_log (path);

CREATE TABLE attachments_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path TEXT UNIQUE NOT NULL,
    filename TEXT NOT NULL,
    extension TEXT,
    mime_type TEXT,
    file_size_bytes BIGINT NOT NULL,
    content_hash TEXT NOT NULL,
    object_key TEXT NOT NULL,

    revision BIGINT NOT NULL,
    synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX attachments_hash      ON attachments_metadata (content_hash);
CREATE INDEX attachments_revision  ON attachments_metadata (revision);
