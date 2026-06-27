# NetProbe Atlas Monetization Refinement Plan

Data-base: 2026-06-27

## References

- whatsmydns support/donation placement.
- MxToolbox and monitoring upsell patterns.
- Existing NetProbe monitor MVP and AdSense readiness docs.

## P0

- Add inert support/donation placement after useful result and educational content.
- Add gated upgrade CTAs for DNS/SSL/domain monitoring, history, alerts, reports and API.
- Keep ad placeholders away from inputs, buttons, result tables, copy/export controls and error states.

## P1

- Add plan/feature comparison copy that clearly says billing is not active yet.
- Add dashboard readiness item for multi-region probes and monitor worker gates.

## P2

- Add account/billing UX only after provider gates open.

## Impact expected

Clear paid path for operators and users without reducing free diagnostic value.

## Technical risk

Low for inert CTAs; medium if account/billing surfaces are introduced later.

## AdSense/compliance risk

Medium because DNS/IP tools are interactive. Ads must remain separated by content blocks.

## Tests needed

- Playwright placement checks.
- Verify no AdSense script or checkout link is loaded.
- Secret scan.

## Acceptance metrics

- Real ad requests remain `0`.
- Checkout and billing remain disabled.
- Free DNS/IP result remains complete without signup.

## Dashboard backlog

- Monitoring upsell readiness.
- AdSense placement safety.
- Donation provider gate.
- API plan gate.
