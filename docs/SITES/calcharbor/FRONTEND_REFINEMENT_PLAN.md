# CalcHarbor Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make each calculator feel immediate, precise and explainable while keeping all inputs and results browser-side.

## P0

- Add consistent calculator hero/work area with compact inputs and immediate result.
- Add formula and calculation memory block for each MVP calculator.
- Add interpretation states for good/warning/needs-review outcomes where meaningful.
- Add related calculator grid below the result.

## P1

- Add lightweight charts/tables only where they clarify a financial scenario.
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

- Result and formula visible without confusing scrolling.
- No numeric input/result sent to analytics.
- Related calculator links present on each tool page.

## Dashboard backlog

- Calculator formula completeness.
- Finance disclaimer coverage.
- Export/scenario upsell readiness.
