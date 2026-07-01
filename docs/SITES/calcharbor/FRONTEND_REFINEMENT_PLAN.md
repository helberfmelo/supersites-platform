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
- Completed in production in Phase 18 Sprint 18.4: the Hub catalog route for CalcHarbor opens as a calculator finder with search, category filters, featured high-value calculators and links only to existing public calculator routes; Hub deploy `28424159062` and CalcHarbor static app deploy `28424625903` passed.
- Completed locally in Phase 18 Sprints 18.29-18.33: CalcHarbor app home now has search, popular calculators, category directory, all-calculators grid and footer links; Loan, Break-even, Gross Margin and ROI pages have richer benchmark-grade result/action panels.
- Phase 18 gate for this site under the current stage cadence: do not close CalcHarbor catalog or tool work while the first fold reads as launch/status/product-sheet copy. Run screenshots, Playwright, crawler, public smokes or deploy only when the owner requests them, the stage is QA/pre-disclosure/closure, or a high-risk condition requires them.

## P1

- Expand calculator count only when each new formula has tests, localized examples and useful original content.
- Add examples that reset the calculator to known safe sample values.

## P2

- Prepare saved scenarios and exports as repeat-work paid backlog.

## Impact expected

Better user trust, longer engagement and stronger SEO content for calculator pages.

## Technical risk

Low to medium; calculator formulas must remain covered by tests.

## AdSense/compliance risk

Medium where finance/tax/labor interpretation appears. Keep disclaimers and avoid advice claims.

## Tests needed

- Calculator unit tests.
- CalcHarbor build and public-copy validation for tool-page changes.
- Preview smoke, Playwright and screenshots only when explicitly requested or when the active stage is QA/pre-disclosure/closure.
- Regression for no analytics values from user inputs/results.
- Hub catalog route regression for `/supersites/<locale>/sites/calcharbor`, including search/filter behavior, deep links and blocked internal terms.

## Acceptance metrics

- Result and formula visible without confusing scrolling in local preview.
- No numeric input/result sent to analytics in unit/E2E regression.
- Related calculator links present on each tool page.
- The Hub catalog route links to real calculators and keeps future calculator ideas non-linked until each page has tested formula, localized copy and useful original content.
- After changing catalog deep links, run the static app public smoke or a direct URL check for every exposed calculator before closing the sprint.

## Dashboard backlog

- Calculator formula completeness.
- Finance disclaimer coverage.
- Export/scenario upsell readiness.
