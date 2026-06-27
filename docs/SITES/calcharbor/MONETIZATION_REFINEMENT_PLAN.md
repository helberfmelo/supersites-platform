# CalcHarbor Monetization Refinement Plan

Data-base: 2026-06-27

## References

- Calculator freemium/export patterns.
- AdSense-safe educational calculator layouts.

## P0

- Add gated upgrade CTAs for saved scenarios, PDF/Excel export, widgets and API.
- Keep ad placeholders away from input fields, result cards and formula steps.
- Add support/donation placeholder only after the result and educational content.

## P1

- Define free vs paid limits for scenario history without blocking one-off calculation.
- Add dashboard opportunity for calculators with natural export demand.

## P2

- Implement billing only after provider gates and legal/tax review.

## Impact expected

Monetization paths become clear without hurting the free calculator promise.

## Technical risk

Low for inert CTAs; higher if export/history features are introduced.

## AdSense/compliance risk

Medium because calculator fields/results are interactive. Ads need clear separation.

## Tests needed

- Placement smoke in Playwright.
- Verify no checkout/ad script/donation payment link is active.

## Acceptance metrics

- Free calculation complete without signup.
- Real ad serving and checkout remain `0`.
- Finance disclaimers visible where applicable.

## Dashboard backlog

- Scenario export readiness.
- Widget/API readiness.
- Finance compliance gate.
