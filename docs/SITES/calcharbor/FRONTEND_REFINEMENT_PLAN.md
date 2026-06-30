# CalcHarbor Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make each calculator feel immediate, precise and explainable while keeping all inputs and results browser-side.

## P0

- Completed locally in Sprint 7.4: consistent calculator hero/work area with compact inputs and immediate result.
- Completed locally in Sprint 7.4: formula and calculation memory block for each MVP calculator.
- Completed locally in Sprint 7.4: interpretation states for good/warning/needs-review outcomes where meaningful.
- Completed locally in Sprint 7.4: related calculator grid below the result.
- Completed locally in Sprint 9.12: home now opens with a scenario workbench instead of only search/cards.
- Completed locally in Sprint 9.12: detail pages include a scenario snapshot table and bar comparison next to the result/memory stack.
- Completed locally in Sprint 9.12: desktop/mobile screenshots confirm no overflow and a more benchmark-like calculator surface.
- Completed locally in Phase 18 Sprint 18.4: the Hub catalog route for CalcHarbor opens as a calculator finder with search, category filters, featured high-value calculators and links only to existing public calculator routes.
- Phase 18 gate for this site: do not close any CalcHarbor catalog or tool page sprint while the first fold reads as launch/status/product-sheet copy; screenshots desktop/mobile, route-specific smoke and negative assertions against internal terms are mandatory before commit/push/deploy.

## P1

- Expand calculator count only when each new formula has tests, localized examples and useful original content.
- Add examples that reset the calculator to known safe sample values.

## P2

- Prepare saved scenarios and exports as gated paid backlog.

## Impact expected

Better user trust, longer engagement and stronger SEO content for calculator pages.

## Technical risk

Low to medium; calculator formulas must remain covered by tests.

## AdSense/compliance risk

Medium where finance/tax/labor interpretation appears. Keep disclaimers and avoid advice claims.

## Tests needed

- Calculator unit tests.
- CalcHarbor build, preview smoke and Playwright.
- Regression for no analytics values from user inputs/results.
- Hub catalog route regression for `/supersites/<locale>/sites/calcharbor`, including search/filter behavior, deep links and blocked internal terms.

## Acceptance metrics

- Result and formula visible without confusing scrolling in local preview.
- No numeric input/result sent to analytics in unit/E2E regression.
- Related calculator links present on each tool page.
- The Hub catalog route links to real calculators and keeps future calculator ideas non-linked until each page has tested formula, localized copy and useful original content.

## Dashboard backlog

- Calculator formula completeness.
- Finance disclaimer coverage.
- Export/scenario upsell readiness.
