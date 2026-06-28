# CalcHarbor Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-CALCHARBOR.
- Real number: Sprint 7.4.
- Must run after: Sprint 7.3.

## Current state

- Nuxt SSG app exists with four calculators and five locales.
- Sprint 7.4 local implementation adds live browser-side result cards, calculation memory, interpretation states, related calculators and inert workflow-upgrade CTAs.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- Calculator result/formula UX refinement.
- SEO/AIO educational content and internal linking.
- Inert monetization/support structure.

## Validation

- `pnpm test:calcharbor`
- `pnpm build:calcharbor`
- `pnpm validate:calcharbor-preview`
- `pnpm test:e2e:calcharbor`
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No real public deploy switch.
- No financial/tax advice claims.
- No checkout, ads, donation payment or analytics values from calculator inputs/results.

## Sprint 7.4 local result

- Implemented, committed and validated in CI.
- Feature commit: `17774eb feat: refine calcharbor benchmark ux`.
- Quality Gate `28286999292`, Deploy Dry Run `28286999285` and public Hub/control-plane/NetProbe smokes passed.
- `pnpm --filter @supersites/calcharbor test`, build, preview smoke, Playwright and final gates passed locally.
- Public deploy remains gated.

## Sprint 9.12 benchmark-grade density

- Status: local implementation validated; remote CI/deploy pending.
- Added `CalcHarborWorkbench` above the catalogue so the home opens with a scenario planner, tabs for all four calculators, editable inputs, live primary result, supporting metrics, scenario bars and scenario table.
- Added shared `buildCalculatorScenarioRows` helper and scenario snapshots on detail pages so lower/base/higher comparisons reuse the exact calculator formulas.
- Matured public copy away from catalog/MVP wording: browser-side labels, operating principles and workflow checks are visible without implying real billing, ads or saved scenarios.
- Validation passed locally: `pnpm test:calcharbor`, `pnpm build:calcharbor`, `pnpm validate:calcharbor-preview`, `pnpm test:e2e:calcharbor`, package gates, public-copy/structure/secrets/dry-run/ci/diff gates and dedicated visual screenshots.
- No saved scenarios, exports, widgets, API, checkout, billing, ads, donation, external analytics, tax/legal automation or persistent storage was activated.
