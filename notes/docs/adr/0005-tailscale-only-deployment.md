# ADR 0005: Tailscale-only deployment for notes-api

- Date: 2026-04-27
- Status: Accepted

## Context

The notes-api stack holds the operator's personal knowledge — drafts, half-formed ideas, private notes that never reach the public blog. Public exposure requires real auth, real abuse mitigation, and real attention to ops. None of that is interesting yet, and the operator's devices are all on a Tailnet anyway.

## Decision

The stack is **reachable only on the Tailnet** for the foreseeable future. Caddy listens on the Tailscale interface (`tsnet` / Tailscale Serve, which provisions TLS automatically). The blog on Railway reaches it via the existing `tailscale-railway-bridge`. Plugin clients run on devices that are members of the Tailnet.

Application-layer auth still applies (bearer token on `/v1/sync/*`, Tailscale identity on `/v1/admin/*`), so a compromised Tailnet member can't quietly write everything — defense in depth.

## Consequences

**Good:**
- No public DNS, ACME, or DDoS exposure to manage.
- Tailscale handles TLS; one less moving part.
- Operator identity (`Tailscale-User-Login`) gives the admin UI a free authentication source — no login screen.
- Trivial to rotate access by removing a device from the Tailnet.

**Bad:**
- Friends and the wider internet can't read the API directly (they read the blog, which is on Railway and proxies for them).
- A future MCP/CLI use case for "let other people query my knowledge with their AI agent" requires opening a public face. The API's auth model already supports a pluggable scheme (bearer → Tailscale identity → OAuth), so the upgrade is a reverse-proxy and an auth handler, not a redesign.
- New devices need a Tailscale enrollment step before the plugin works.

## Alternatives considered

- **Public HTTPS with bearer token from day one.** More flexible. Rejected as YAGNI for a personal vault and a step backward in security posture.
- **Cloudflare Tunnel.** Comparable to Tailscale for this use case. Rejected because the operator already runs Tailscale and the Railway↔Tailnet bridge.
- **VPN (WireGuard) without Tailscale.** Loses the identity headers and the zero-config TLS that make Tailscale Serve attractive. Rejected.
