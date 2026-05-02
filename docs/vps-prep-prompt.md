# VPS Prep Prompt — for Claude Code on the notes VPS

> One-shot briefing for a Claude Code instance running on the Hostinger VPS that
> will host notes-api. Paste the prompt below into `claude` on the VPS.

## Install Claude Code on the VPS

```bash
# Recommended — installs to /usr/local/bin, no Node required
curl -fsSL https://claude.ai/install.sh | bash

# Or via npm (needs Node 20+):
npm install -g @anthropic-ai/claude-code
```

Then run `claude` and authenticate.

## Prompt

You're Claude Code running on a Hostinger VPS (Ubuntu 24.04.3 LTS, 8 GB RAM, 2 cores, 96 GB disk, Tailscale IP `100.65.47.66`, current hostname `supa`). It will host the **notes-api** stack (Postgres + Garage S3 + Rust+Axum API + SvelteKit admin + Caddy on Tailscale-only) once the operator finishes writing the code on his laptop. You are NOT deploying that code in this session — the laptop is still authoring it. Your job is just to prep the box.

**Current state:**
- Full Supabase stack runs in `/root/supabase/` (17 containers, ~3.5 GB RAM). Operator does NOT need this — nuke it, including volumes.
- Two stray Postgres 18 containers `pg_dev1` and `pg_dev2` outside the Supabase compose — also disposable.
- `supabase-caddy` already exited, so 80/443 are free.
- Docker + docker compose plugin already installed.
- Tailscale already up.

**Scope — do these, in order:**

1. Tear down all Supabase containers + volumes: find the compose file under `/root/supabase/`, `docker compose down -v`. Confirm no `supabase-*` containers remain.
2. Remove `pg_dev1` and `pg_dev2`: `docker rm -fv pg_dev1 pg_dev2`. Remove their volumes too if separately named.
3. Reclaim disk: `docker image prune -a -f && docker volume prune -f`. Report disk recovered.
4. Verify clean state: `docker ps -a` empty, `ss -tlnp` shows only SSH (22) + tailscaled listeners. RAM should drop substantially.
5. Add the operator's laptop SSH pubkey to `/root/.ssh/authorized_keys` so the laptop can SSH in non-interactively. **Ask the operator to paste it before you write the file.** Set perms 700 on `.ssh`, 600 on `authorized_keys`.
6. Rename the Tailscale hostname `supa` → `notes`: `tailscale set --hostname=notes`. Confirm `tailscale status | head -1` shows the new name. (This will not drop the SSH session.)
7. Verify prereqs: `apt-get update && apt-get install -y git curl jq ca-certificates` (most already present), `docker compose version`, `tailscale version`.
8. Create empty deploy dir owned by root: `mkdir -p /opt/vonshlovens`. (Operator will clone into it later via deploy key.)

**Out of scope — don't do these:**
- Don't clone the repo. The laptop is writing the code; nothing to clone yet.
- Don't `docker compose up` anything new.
- Don't run migrations or bootstrap Garage.
- Don't touch Tailscale auth state, just the hostname.
- Don't reboot.
- Don't install bd / beads / anything outside the prereq list above.

**When done, report:**
- Containers running (should be 0)
- Disk free (`df -h /`)
- RAM available (`free -h`)
- New tailscale hostname line
- Confirmation that `/root/.ssh/authorized_keys` contains the laptop key

If anything in the box's state surprises you (unexpected compose stack, mounts, etc.), stop and ask the operator before destroying it.

## Getting the laptop pubkey (run on the laptop, not the VPS)

```bash
cat ~/.ssh/id_ed25519.pub 2>/dev/null || cat ~/.ssh/id_rsa.pub
# If neither exists:
ssh-keygen -t ed25519 -C "laptop" && cat ~/.ssh/id_ed25519.pub
```
