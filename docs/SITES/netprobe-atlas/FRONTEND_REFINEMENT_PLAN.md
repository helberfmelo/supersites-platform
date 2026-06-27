# NetProbe Atlas Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make DNS propagation and What is my IP feel like premium, fast, layered diagnostic tools while preserving the existing antiabuse and PII-minimization rules.

## P0

- Refine DNS propagation hero with hostname, record type and expected value.
- Add summary cards: propagated percentage, distinct values, checked locations and last checked timestamp.
- Present location/resolver results in a responsive table with clear statuses.
- Add lightweight map/fallback after result, not before the answer.
- Refine What is my IP with IPv4/IPv6, reverse DNS, ISP/ASN and approximate location cards.
- Add related tools and support/donation placeholder after the useful result and educational content.

## P1

- Add CSV/JSON export for safe result summaries.
- Add shareable local URL state without logging targets to analytics.
- Add richer troubleshooting accordions.

## P2

- Prepare multi-region resolver architecture docs and admin backlog; do not activate probes without runtime gates.

## Impact expected

Higher perceived trust, better organic fit for DNS/IP queries and stronger upgrade path for monitoring.

## Technical risk

Medium because live API-backed forms and Playwright fixtures must remain stable.

## AdSense/compliance risk

Medium if ad/support blocks get too close to inputs or results. Keep placements after interpretation/content.

## Tests needed

- NetProbe unit tests/build.
- Preview smoke and Playwright desktop/mobile.
- Backend tests if API shape changes.
- Public NetProbe smoke after push because NetProbe is live.

## Acceptance metrics

- Result appears above the fold after action.
- No raw hostname/IP in analytics.
- No map dependency blocks initial render.
- Existing public IP/DNS smokes keep passing.

## Dashboard backlog

- DNS propagation benchmark readiness.
- IP lookup benchmark readiness.
- Multi-region probe gap.
- Monitoring upsell readiness.
