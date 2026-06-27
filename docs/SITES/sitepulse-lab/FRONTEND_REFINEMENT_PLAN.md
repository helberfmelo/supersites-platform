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
