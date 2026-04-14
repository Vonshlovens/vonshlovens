# Security

Status: **aspirational** — the app is a near-empty scaffold today. These are the guardrails to put in place as real functionality lands.

## HTTP security headers
Add a `src/hooks.server.ts` `handle` that sets, at minimum:
- `Content-Security-Policy` — start strict (`default-src 'self'`), relax per need.
- `Strict-Transport-Security` — `max-age=31536000; includeSubDomains` once the domain is HTTPS-only.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `X-Frame-Options: DENY` (or CSP `frame-ancestors`).
- `Permissions-Policy` — deny sensors/camera/mic by default.

Railway's proxy can layer some of these, but owning them in-app keeps the contract explicit.

## Container hardening
- **Drop root.** `oven/bun:1-slim` provides a `bun` user; add `USER bun` to the runtime stage.
- **No install fallback.** Replace `bun install --frozen-lockfile || bun install` with the frozen form only — the fallback silently regenerates the lockfile and weakens supply-chain guarantees.
- Keep the runtime image minimal (no dev deps, no source beyond `/build`).

## Secrets
- Store in Railway project variables; access via `$env/dynamic/private` or `$env/static/private` in SvelteKit.
- Never read secrets from `$env/*/public` — those ship to the client.
- `.gitignore` already excludes `.env*`; keep it that way.

## Request handling (when endpoints exist)
- Keep SvelteKit's built-in CSRF origin check enabled (it is by default for form actions).
- Validate all input at the boundary — prefer a schema lib (zod/valibot) over hand-rolled checks.
- Rate-limit anything that hits a database, external API, or costs money. Railway doesn't provide this out of the box.
- Guard outbound `fetch` calls against SSRF: allowlist hosts, reject private IP ranges for user-supplied URLs.

## Dependencies
- `bun.lock` is committed; updates go through PRs.
- Run `bun audit` periodically, and wire Dependabot or Renovate once the dep surface grows.

## Auth (future)
- Session cookies must be `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict` where UX allows).
- Prefer a vetted library over hand-rolled auth; document the choice in an ADR.
