# SitePulse Lab Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-SITEPULSE.
- Real number: Sprint 7.10.
- Must run after: Sprint 7.9.

## Current state

- Nuxt SSG app exists with seven web diagnostic tools and five locales.
- Control-plane has one bounded web probe endpoint.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- Status answer and technical-tab UX refinement.
- SEO/AIO troubleshooting content.
- Inert uptime/support/ads structure.

## Validation

- `pnpm test:sitepulse`
- `pnpm build:sitepulse`
- `pnpm validate:sitepulse-preview`
- `pnpm test:e2e:sitepulse`
- Backend tests if probe endpoint changes.
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No recurring uptime, alert delivery, status page generation or multi-region probes.
- No scanner behavior beyond bounded HTTP diagnostics.
- No analytics values from target URLs, headers, timings or results.
