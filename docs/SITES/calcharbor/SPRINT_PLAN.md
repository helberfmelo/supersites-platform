# CalcHarbor Sprint Plan

Data-base: 2026-06-29

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

- Status: concluded in production.
- Added `CalcHarborWorkbench` above the catalogue so the home opens with a scenario planner, tabs for all four calculators, editable inputs, live primary result, supporting metrics, scenario bars and scenario table.
- Added shared `buildCalculatorScenarioRows` helper and scenario snapshots on detail pages so lower/base/higher comparisons reuse the exact calculator formulas.
- Matured public copy away from catalog/MVP wording: browser-side labels, operating principles and workflow checks are visible without implying real billing, ads or saved scenarios.
- Validation passed locally: `pnpm test:calcharbor`, `pnpm build:calcharbor`, `pnpm validate:calcharbor-preview`, `pnpm test:e2e:calcharbor`, package gates, public-copy/structure/secrets/dry-run/ci/diff gates and dedicated visual screenshots.
- Remote closure passed: feature commit `97c92f0`, Quality Gate `28329239451`, Deploy Dry Run `28329239457`, deploy `28329341280`, release `97c92f099ff741220280593c9d96eec34c9e3729-28329341280-1`, public asset `https://opentshost.com/supersites/calcharbor/_nuxt/CjP6XAFu.js`.
- Public smokes passed for CalcHarbor, aggregate Hub/control-plane/API and live UX desktop/mobile; live smoke confirmed `$512.91`, scenario rows, detail snapshot, PT-BR mobile localization, empty storage, 0 app analytics events, 0 console errors and no overflow.
- No saved scenarios, exports, widgets, API, checkout, billing, ads, donation, external analytics, tax/legal automation or persistent storage was activated.

## Sprint 13.1 product depth

- Status: concluded locally, pending remote CI/public-smoke closure.
- Added four curated calculators: `compound-interest`, `savings-goal`, `cash-runway` and `discount-price`, bringing CalcHarbor from 4 to 8 calculators.
- Added localized currency/default handling: EN uses `USD`, PT-BR uses `BRL`, ES/FR/DE use `EUR`; input prefixes, examples, calculation memory, result formatting and JSON-LD `priceCurrency` now follow locale.
- Added five-language content sections and FAQ coverage for the new calculators without creating tax/legal/credit-advice automation.
- Validation passed locally: `pnpm test:calcharbor` (12 tests), `pnpm build:calcharbor` (173 prerendered routes), `pnpm validate:calcharbor-preview`, `pnpm test:e2e:calcharbor`, `pnpm validate:public-copy` (911 HTML files), `pnpm validate:adsense-safe-public`, structure/secrets/deploy-dry-run/ci/diff gates.
- No checkout, billing, ads, donation, affiliate, external analytics, persistent storage, paid API, worker, provider integration or fiscal/legal automation was activated.
