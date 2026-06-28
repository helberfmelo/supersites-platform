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

## Acceptance metrics

- Result and formula visible without confusing scrolling in local preview.
- No numeric input/result sent to analytics in unit/E2E regression.
- Related calculator links present on each tool page.

## Dashboard backlog

- Calculator formula completeness.
- Finance disclaimer coverage.
- Export/scenario upsell readiness.
