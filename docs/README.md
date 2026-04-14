# Docs Index

Free-form documentation that doesn't belong in `specs/`. Specs describe *what the system is or should be*; docs capture *everything else* — design explorations, historical context, one-off plans.

## Tree

```
docs/
├── AGENTS.md              # this file
├── adr/                   # Architecture Decision Records — one file per decision, numbered
├── archive/               # Superseded docs kept for historical context; never edit in place
├── design/                # Design explorations: mocks, UX notes, visual direction
└── development-plans/     # Scoped plans for upcoming work — delete or archive once shipped
```

## Conventions

- **Filenames:** `kebab-case.md`. ADRs use `NNNN-short-title.md` (e.g. `0001-adopt-sveltekit.md`).
- **Dates:** include an ISO date (`YYYY-MM-DD`) in the frontmatter or first line of every doc so stale material is easy to spot.
- **Archive, don't delete.** When a doc is superseded, move it under `archive/` with a one-line pointer to the replacement.
- **Specs vs docs:** if a doc starts describing how the system *should* behave as a rule, promote it to `specs/` and register it in `specs/AGENTS.md`.

## When to add a folder
Only when a category accumulates more than a handful of files and doesn't fit above. Add it to the tree here at the same time.
