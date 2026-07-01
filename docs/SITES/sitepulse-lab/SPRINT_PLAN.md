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

## Sprint 9.11 production closure

- Feature commit `761d3f0`, Quality Gate `28320680554`, Deploy Dry Run `28320680557` and HostGator deploy `28320771689` passed.
- Production release `761d3f0e54f09839ba8b5ff9d7a39bc5d176b11d-28320771689-1` is live with asset `https://opentshost.com/supersites/sitepulse-lab/_nuxt/C9Q51oa7.js`.
- Public smokes passed for SitePulse app/API, Hub aggregate and control-plane/API; live UX smoke ran a real `example.com` report and PT-BR mobile localization check.

## Sprint 13.4 local execution

- Added a result-detail layer for tool pages with redirect path, header matrix, technology clues, performance sample and bounded probe notes.
- Reused only the existing bounded `/api/v1/sitepulse/probe` payload; no backend endpoint, crawling mode, storage, recurring worker, alert delivery, history or status page changed.
- Localized dynamic titles and labels in EN/PT-BR/ES/FR/DE so technical result cards do not regress into English-only UI on localized routes.
- Analytics remains sanitized; target URL, headers, timings, response status and result values are not emitted.
- Local validation passed: `pnpm test:sitepulse`, `pnpm build:sitepulse`, `pnpm validate:sitepulse-preview`, `pnpm test:e2e:sitepulse`, `pnpm validate:public-copy`, `pnpm validate:adsense-safe-public`, structure, secrets, dry-run, ci:changes and diff check.
- No recurring uptime, incidents, public status page, alerts, history, multi-region probes, checkout, billing, ad serving, external analytics, paid API, provider integration or worker/cron was activated.

## Sprint 13.4 remote closure

- Feature commit `53809f3`, Quality Gate `28355948547` and Deploy Dry Run `28355948542` passed.
- Public smokes passed for SitePulse app/API, Hub aggregate, NetProbe and control-plane/API, validating the current production baseline with asset `https://opentshost.com/supersites/sitepulse-lab/_nuxt/lkcC6TkC.js`.
- No real static deploy was triggered in this sprint.

## Phase 18.72-18.79 local execution

- Completed the SitePulse benchmark refinement stage across the home report and all seven tool pages: status, redirects, security headers, robots.txt, sitemap, TTFB and performance snapshot.
- The home now leads with `Check if a website is up`, point-in-time states (`online`, `down`, `redirecting`, `slow`) and grouped GTmetrix-like evidence cards without activating external Lighthouse/PageSpeed/GTmetrix measurement.
- Tool results now expose HTTP code, page state, final URL, TTFB, copy-report/check-again actions, redirect cross-domain and loop warnings, a six-header security matrix including `Permissions-Policy`, robots/sitemap crawlability cards, sitemap sample URLs and TTFB rating.
- The control-plane probe payload now includes redirect hop errors and treats `Permissions-Policy` as part of the baseline header matrix; no new endpoint, broad crawl, storage, recurring worker, alert delivery, checkout, ad serving or provider integration was activated.
- Public copy was cleaned away from internal roadmap terms while preserving one-shot privacy and account-workflow boundaries.
- Minimal validation passed: `pnpm test:sitepulse`, `php artisan test --filter=SitePulseProbeApiTest`, `pnpm build:sitepulse`, `pnpm validate:sitepulse-preview`, `pnpm validate:public-copy`, `pnpm validate:secrets` and `git diff --check`.
