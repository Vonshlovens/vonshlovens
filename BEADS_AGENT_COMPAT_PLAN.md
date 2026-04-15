# Beads Agent Compatibility Plan

Long-term plan for making my shared-server beads setup legible to coding
agents without per-project manual overrides.

## Context

I run a single Dolt SQL server on Railway (reached via Tailscale at
`railway-dolt:3306`) as the source of truth for all my beads projects.
Every `bd` write goes live to the remote server. There is no local DB,
no push/pull step, no git-based sync.

This is a **valid but non-default** topology. `bd`'s built-in messaging
and auto-generated agent sections assume the embedded/owned-server model
where `bd dolt push` is a real sync step. That mismatch causes agents to:

- Think writes are local-only and need pushing
- Run `bd dolt push` (which used to fail against a git URL before I
  removed the bogus remote)
- Misread "auto-push disabled" as "isolated workspace"

## Short-term (done / in place)

- Env vars in `~/.bashrc`: `BEADS_DOLT_SERVER_MODE=1`, host/port/user/password
- `BD_DOLT_AUTO_PUSH=false`
- `.beads/config.yaml` → `backup.enabled: false` in each project
- `AGENTS.md` in each project has a top-of-file override explaining the
  setup (before the auto-generated BEADS INTEGRATION block)
- Bogus Dolt `origin` remote removed from each project's DB
- Stale local Dolt servers/dirs removed from each project

## Medium-term (to do on new projects)

When setting up beads in a new repo:

1. `bd init --prefix <name>` (env vars already route it to Railway)
2. Immediately:
   - `bd dolt remote remove origin` (if present)
   - Edit `.beads/config.yaml` → `backup: enabled: false`
   - Append the "Beads Storage — READ THIS FIRST" block to `AGENTS.md`
     and `CLAUDE.md` (copy from cwl-api or vonshlovens)
3. Optionally: `bd config set custom.storage "<railway-dolt description>"`
   as a secondary agent hint

Consider turning this into a one-shot script:
`~/eric/scripts/bd-init-shared.sh <prefix>` that does all three.

## Long-term (upstream improvements to request)

File these as GitHub issues on `steveyegge/beads`:

1. **`bd status` / `bd info` should print the active storage topology.**
   Something like:

   ```
   Storage: external Dolt server at railway-dolt:3306 (live, shared)
   Database: cwl
   Auto-push: off (not needed — writes are live to remote)
   ```

   Currently no output reflects "you are connected to a remote server."

2. **Auto-generated `AGENTS.md` section should branch on storage mode.**
   The current minimal profile tells agents to `bd dolt push` at session
   end — correct for embedded mode, wrong for external server mode.
   Templates at `internal/templates/agents/defaults/` should detect
   external server mode and emit different guidance (or at least a
   "not applicable in server mode" note).

3. **`bd doctor --agent` should surface topology explicitly.**
   ZFC-compliant output currently doesn't clarify remote vs local to
   an agent reading it on session start.

4. **A project-level "storage description" config key.** Something like
   `meta.storage-description` that `bd status` prints and that shows up
   in `bd prime` / `bd quickstart` output. Gives users a clean way to
   document non-default setups without relying on external AGENTS.md.

5. **Rename or rescope `auto-push`.** The term reads as "local-by-default,
   optional remote." In server mode it's inverted. Candidate clearer
   names: `dolt.mirror-push`, `dolt.secondary-remote-push`. At minimum,
   docs at `docs/CONFIG.md` should call out that auto-push is a no-op
   (not a regression) in external server mode.

## References

- Current setup recap: `~/eric/vonshlovens/AGENTS.md` (top section)
- Upstream repo: https://github.com/steveyegge/beads
- Relevant source files:
  - `cmd/bd/dolt_autopush.go` (auto-push logic)
  - `internal/doltserver/servermode.go` (mode resolution)
  - `internal/templates/agents/defaults/` (agent md templates)
  - `docs/CONFIG.md` (config docs)
