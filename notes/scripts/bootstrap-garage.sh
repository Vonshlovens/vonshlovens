#!/usr/bin/env bash
# bootstrap-garage.sh — first-run setup of the single-node Garage cluster.
# Idempotent: re-running each step should be a safe no-op.
#
# Run from notes/ after `docker compose up -d postgres garage`. The script
# prints the access/secret keys at the end; paste them into notes/api/.env.

set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
    echo "ERROR: notes/.env not found. Copy notes/.env.example and fill it in first." >&2
    exit 1
fi

# Helper: run garage CLI inside the running container.
g() { docker compose exec -T garage /garage "$@"; }

echo "Waiting for garage to come up..."
for _ in $(seq 1 60); do
    if g status >/dev/null 2>&1; then
        break
    fi
    sleep 1
done
g status >/dev/null 2>&1 || { echo "ERROR: garage didn't come up in 60s" >&2; exit 1; }

NODE_ID=$(g node id -q | cut -d@ -f1)
echo "Local garage node: $NODE_ID"

# Layout: assign 50G to local node in zone dc1, then apply.
if g layout show 2>/dev/null | grep -qE '^==== CURRENT CLUSTER LAYOUT ====' && \
   g layout show 2>/dev/null | grep -qE 'zone +dc1'; then
    echo "Layout already applied, skipping."
else
    echo "Assigning layout (50G in zone dc1) and applying..."
    g layout assign "$NODE_ID" -z dc1 -c 50G
    g layout apply --version 1
fi

# Bucket
if g bucket list 2>/dev/null | awk '{print $1}' | grep -qx notes; then
    echo "Bucket 'notes' exists, skipping."
else
    echo "Creating bucket 'notes'..."
    g bucket create notes
fi

# Key
if g key list 2>/dev/null | awk '{print $2}' | grep -qx notes-api; then
    echo "Key 'notes-api' exists, reusing."
else
    echo "Creating key 'notes-api'..."
    g key create notes-api >/dev/null
fi

# Permissions (idempotent — same flags re-applied is a no-op)
g bucket allow --read --write --owner notes --key notes-api >/dev/null

KEY_INFO=$(g key info notes-api --show-secret)
ACCESS=$(echo "$KEY_INFO" | awk -F': *' '/Key ID:/ {print $2; exit}')
SECRET=$(echo "$KEY_INFO" | awk -F': *' '/Secret key:/ {print $2; exit}')

if [ -z "$ACCESS" ] || [ -z "$SECRET" ]; then
    echo "ERROR: failed to parse access/secret from 'garage key info'." >&2
    echo "Raw output:" >&2
    echo "$KEY_INFO" >&2
    exit 1
fi

cat <<EOF

=========================================================
Garage bootstrap complete. Paste these into notes/api/.env:

GARAGE_ACCESS_KEY=$ACCESS
GARAGE_SECRET_KEY=$SECRET

=========================================================
EOF
