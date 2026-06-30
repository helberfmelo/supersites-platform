# SuperSites Hub Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Refine the Hub and control-plane surfaces so operators can scan portfolio quality, benchmark readiness, SEO/AIO gaps and monetization gates quickly.

## P0

- Improve catalog cards with site value, status, language coverage, tool count and primary action. Done in Sprint 7.2.
- Add admin benchmark readiness overview per site. Done in Sprint 7.2.
- Add admin opportunity backlog with priority, impact, effort, confidence, risk and gate status. Done in Sprint 7.2.
- Add a visual Hub discovery block with top public tools, preview frames and workflow clusters before catalog filters. Done in production in Sprint 9.15.
- Add direct localized shortcuts to high-intent free tools above the catalog, aligned to benchmark utility directories. Done in production in Phase 18 Sprint 18.2.
- Reduce consent-banner intrusion on the first fold while preserving local/fail-closed consent behavior. Done in production in Sprint 9.15.
- Keep the Blade admin dense, utilitarian and consistent with the current control-plane style.

## P1

- Add filters for category, status, public deploy state, AdSense readiness and benchmark readiness.
- Add per-site detail pages for benchmark findings.
- Add CSV export for backlog items.
- Add richer footer navigation grouped by product vertical. Done in production in Sprint 9.15 and expanded in production in Phase 18 Sprint 18.2.

## P2

- Add before/after comparison fields once technical refinement sprints ship.
- Add richer charts only when data volume justifies them.

## Impact expected

Higher operator clarity and faster prioritization before activating public deploys, ads or billing.

## Technical risk

Medium if new control-plane tables/routes are added; low if the sprint only reuses existing seeded data.

## AdSense/compliance risk

Low if the dashboard stays internal and Hub public placeholders remain inert.

## Tests needed

- Laravel admin feature tests for auth/RBAC/views.
- Hub unit/build/preview/Playwright if public catalog UI changes.
- Structure, secrets, dry-run, change detection and diff checks.

## Acceptance metrics

- Benchmark readiness appears for all 11 public surfaces.
- No provider metrics are shown as real while imports are disabled.
- Admin pages fit desktop and mobile/tablet widths without overlap.
- Hub home exposes a task/discovery path before catalog controls on desktop and mobile.
- Hub home exposes direct links for at least 10 high-intent free tools without requiring signup, checkout or payment-provider activation.

## Dashboard backlog

- `benchmark_readiness_by_site`
- `seo_aio_readiness_by_site`
- `adsense_readiness_by_site`
- `monetization_readiness_by_site`
- `growth_opportunities`
