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
- Benchmark dashboard is implemented locally in Sprint 7.2 and awaits feature commit/CI/public smoke closure.

## Scope

- Public catalog refinement with compact tool/language/gated monetization signals.
- Admin benchmark/growth readiness views via `/admin/benchmark-refinement`.
- Local evidence-backed KPIs in `benchmark_site_readiness` and `benchmark_opportunities`.
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
