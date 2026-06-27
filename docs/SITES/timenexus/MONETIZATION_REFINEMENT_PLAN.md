# TimeNexus Monetization Refinement Plan

Data-base: 2026-06-27

## References

- Time widget/API products.
- Scheduling and meeting planner upsells.

## P0

- Add gated CTAs for widgets, embeds, presets, history and API.
- Add support/donation placeholder after useful content.
- Keep ad placeholders away from date/time inputs and result panels.

## P1

- Define future free vs paid widget/API limits.
- Add dashboard opportunity for team scheduling workflows.

## P2

- Billing and API keys only after provider and data-governance gates.

## Impact expected

Clear upgrade story for repeated embedding/scheduling use without hurting free conversions.

## Technical risk

Low for inert CTAs; medium for future widgets/API.

## AdSense/compliance risk

Low to medium; interactive controls need separation.

## Tests needed

- Placement and no-provider smoke.
- Analytics payload checks.

## Acceptance metrics

- Free conversion works without signup.
- No active checkout/ad/donation payment.

## Dashboard backlog

- Widget readiness.
- API readiness.
- Team scheduling opportunity.
