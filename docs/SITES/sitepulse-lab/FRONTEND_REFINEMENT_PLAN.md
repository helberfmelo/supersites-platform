# SitePulse Lab Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make one-off site diagnostics answer quickly and then provide progressive technical detail for redirects, headers, robots, sitemap, TTFB and performance snapshot.

## P0

- Add top status result: online/offline/slow/error with timestamp.
- Add tabs for redirects, headers, robots, sitemap and timing details.
- Add recommendations with severity and safe scope.
- Add related tools and monitor-this-site CTA after diagnosis.

## P1

- Add lightweight performance summary without calling external PageSpeed APIs.
- Add example targets for local/demo mode.

## P2

- Prepare uptime, incidents, status pages, alerts, history, multi-region and API as gated paid backlog.

## Impact expected

Better high-intent emergency utility and clearer monitoring upgrade path.

## Technical risk

Medium if probe API or response shape changes.

## AdSense/compliance risk

Medium; ads/support must stay away from URL input, results and diagnostics.

## Tests needed

- SitePulse unit tests/build.
- Backend bounded probe tests if endpoint changes.
- Preview smoke and Playwright.

## Acceptance metrics

- One-off result is visible and useful.
- No target URL/result in analytics.
- No scanner behavior beyond bounded diagnostics.

## Dashboard backlog

- Status answer UX readiness.
- Uptime monitor gate.
- Multi-region probe gate.

## Sprint 7.10 execution notes

- P0 completed locally with score card, signal checklist, Overview/Findings/Technical details tabs, recommendation cards, related pages and gated monitoring workflow.
- The route keeps the existing bounded probe response shape and derives UI state from in-memory result data.
- Mobile and desktop screenshots from the Playwright report were inspected with no incoherent overlap or text overflow.

## Sprint 9.11 execution notes

- Home now opens with a task-first visual report workbench before the catalog, matching the emergency status-check intent more closely.
- The report exposes `online`, `down`, `redirecting`, `slow` and ready states, a numeric score, compact metadata and cards for availability, redirects, security headers, crawlability and performance.
- Empty/loading/success/error states, localized principle copy and public one-shot badges were validated in unit/E2E/Playwright smoke.
- Desktop and mobile screenshots of the production build were captured under `artifacts/playwright-sitepulse-report/data/`; no console errors, storage use or horizontal overflow were observed.

## Sprint 18.10 execution notes

- The Hub catalog route now opens as a SitePulse-specific public landing instead of a generic product profile.
- The first fold presents a practical website status report, sample score and direct CTA before methodology, limits or privacy text.
- The route links to the 7 real SitePulse checks: status, redirects, security headers, robots.txt, sitemap, TTFB and performance snapshot.
- Local and live desktop/mobile QA, public copy validation, AdSense-safe validation, SitePulse static app smoke and EN/PT-BR deep-link checks passed before documentation closeout.
- No recurring uptime, alert, status page, multi-region probe, paid API, provider, billing, ad serving or irreversible action was activated.

## Phase 18.72-18.79 execution notes

- Home and tool pages now answer first with a usable one-shot diagnosis, then progressively reveal metadata, findings and technical evidence.
- The result detail tab now includes redirect timeline metadata, security header cards, robots/sitemap crawlability signals, sitemap sample URLs, technology clues and TTFB/performance cards.
- Copy-report and check-again actions were added to the result overview so the free flow is useful without account creation.
- Public copy now frames monitoring, history, status pages and multi-region probes as account workflows below the free result rather than top-of-page roadmap copy.
- Local validation focused on the affected surface: SitePulse unit test/build/preview, control-plane API test, public-copy, secrets and diff check.
