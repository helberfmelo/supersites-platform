# SuperSites Hub Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-SUPERSITE.
- Real number: Sprint 7.2.
- Must run after: Sprint 7.1 docs-only benchmark planning.

## Current state

- Public Hub live at `https://opentshost.com/supersites/`.
- Control-plane/API live at `https://opentshost.com/supersites/control-plane/`.
- Admin already includes site inventory, readiness foundations, AI growth and executive reports.
- Benchmark dashboard is planned, not implemented.

## Scope

- Public catalog refinement.
- Admin benchmark/growth readiness views.
- Local evidence-backed KPIs.
- No external provider activation.

## Validation

- Laravel admin tests if control-plane changes.
- Hub frontend tests/build/preview/Playwright if catalog changes.
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes`
- `git diff --check`
- Public smokes for Hub/control-plane after push.

## Gates

- No GA4/GTM/Search Console imports.
- No AdSense serving.
- No checkout, donation payment, affiliate link or billing webhook.
- No provider AI or automated publication.
