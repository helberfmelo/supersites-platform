# SuperSites Dashboard Refinement Plan

Data-base: 2026-06-27

## Objective

Evolve the public Hub and the Laravel control plane into the benchmark, SEO/AIO, monetization and growth command center for the portfolio. Sprint 7.2 must remain compatible with the existing Blade admin and fail-closed integration contracts.

## References to learn from

| Reference family | What to learn | What to avoid |
|---|---|---|
| Product discovery catalogs | Compact cards, categories, filters, trust signals and related products | Link-farm pages or copied category language |
| GA4/Search Console/AdSense dashboards | KPI cards, period comparisons, drilldowns and status summaries | Provider data claims while imports are disabled |
| Plausible/Umami/PostHog | Simple product analytics and event clarity | Collecting PII or arbitrary event payloads |
| Stripe/Metabase/Grafana | Dense operational tables, exports, alerts and trend context | Billing/revenue claims before provider gates open |

## Current state

- Public Hub is live at `https://opentshost.com/supersites/`.
- Control-plane/API is live at `https://opentshost.com/supersites/control-plane/`.
- Admin already has readiness areas for Google integrations, AdSense, billing, AI growth and executive reports.
- Benchmark readiness and per-site refinement backlog are now modeled locally in the admin by Sprint 7.2.

## Sprint 7.2 P0

- Add a benchmark-readiness overview per site. Done in `benchmark_site_readiness`.
- Add SEO/AIO readiness fields based on current static evidence, not provider imports. Done as estimated local scores.
- Add AdSense readiness summary that reuses the fail-closed account/site review contract. Done as score/backlog only; serving remains disabled.
- Add monetization readiness summary for upgrades, donation placeholders and affiliate slots with all real activation gated. Done as `human_required` opportunities.
- Add opportunity backlog table with site, category, impact, effort, confidence, risk and status. Done in `benchmark_opportunities`.
- Add evidence references back to docs and benchmark assets. Done via JSON evidence references.
- Add public catalog refinements that make site value, status, languages and tools easier to scan. Done with compact card signals.

## P1

- Add per-site benchmark detail pages in the admin.
- Add filters for site, phase, priority, category and human gate.
- Add export for benchmark backlog CSV.
- Add report sections that can feed the existing executive report model without provider imports.

## P2

- Add post-refinement before/after fields after technical sprints ship.
- Add automated local checks for missing FAQ/schema/related tools where the static app structure allows it.
- Add provider-backed metrics only after GA4/Search Console/AdSense/billing gates are explicitly opened.

## Dashboard metrics to surface

| Metric | Initial source | Data status |
|---|---|---|
| Benchmark readiness score | Docs and checklist evidence | Estimated |
| SEO readiness score | Static route/content checks | Estimated |
| AdSense readiness score | Existing `adsense_site_reviews` + content checklist | Estimated |
| Monetization readiness score | Billing/ads/docs gates | Estimated |
| Frontend quality score | Local tests, preview smoke and Playwright | Finalized per sprint |
| Core Web Vitals readiness | Local Lighthouse/PageSpeed proxy until public deploy | Estimated/unavailable |
| Educational content coverage | Static content inventory | Estimated |
| Related tools coverage | Static route/content inventory | Estimated |
| Growth tasks open/closed | Control-plane backlog | Finalized local |

## Security and data rules

- No provider import in Sprint 7.2.
- No PII, raw tool inputs, query strings, customer data, payment data, prompts, tokens or secrets in benchmark tables.
- Audit dashboard views/exports when new admin routes are added.
- Keep routes behind existing RBAC permissions unless a narrower permission is introduced with tests.

## Validation plan

- Laravel migrations/tests if new tables are added.
- Admin feature tests for RBAC and views.
- Package tests/typechecks if shared contracts are added.
- Hub frontend tests/build/preview/Playwright if public catalog UI changes.
- `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` and `git diff --check`.
