# SitePulse Lab Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-SITEPULSE.
- Real number: Sprint 7.10.
- Must run after: Sprint 7.9.

## Current state

- Nuxt SSG app exists with seven web diagnostic tools and five locales.
- Control-plane has one bounded web probe endpoint.
- Public URL is live at `https://opentshost.com/supersites/sitepulse-lab/` with app-specific deploy, smoke and rollback flow available.

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

## Sprint 7.10 local execution

- Implemented score card, signal checklist, result tabs, recommendations, related pages and monitoring workflow gated panels.
- No probe endpoint, storage, alert, status page, uptime worker, billing, ad serving or analytics contract changed.
- Local validation passed: `pnpm test:sitepulse`, `pnpm build:sitepulse`, `pnpm validate:sitepulse-preview` and `pnpm test:e2e:sitepulse`.
- Playwright screenshots were inspected for home desktop, status mobile and security headers mobile.

## Sprint 9.11 local execution

- Added `SitePulseReportWorkbench` to the home as a visual one-shot report with URL input, state, score, HTTP/redirect/TTFB/cache metadata and report cards for availability, redirects, security headers, crawlability and performance.
- Reused the existing bounded `/api/v1/sitepulse/probe` endpoint with `checks: ['performance']`; no backend, storage, recurring worker or alert delivery changed.
- Analytics remains sanitized through `visual-report`, with no target URL, result, status, headers or timing values.
- Local validation passed: `pnpm test:sitepulse`, `php artisan test --filter=SitePulseProbeApiTest`, `pnpm build:sitepulse`, `pnpm validate:sitepulse-preview`, `pnpm test:e2e:sitepulse`, package gates, public-copy gate, structure, secrets, dry-run, ci:changes and diff check.
- No recurring uptime, incidents, public status page, alerts, history, multi-region probes, checkout, billing, ad serving, external analytics, paid API or worker/cron was activated.
