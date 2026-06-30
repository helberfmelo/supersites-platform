# NetProbe Atlas Frontend Refinement Plan

Data-base: 2026-06-28

## Objective

Make DNS propagation and What is my IP feel like premium, fast, layered diagnostic tools while preserving the existing antiabuse and PII-minimization rules.

## P0

- Refine DNS propagation hero with hostname, record type and expected value. Done in Sprint 7.3 with optional expected-value comparison.
- Add summary cards: propagated percentage, distinct values, checked locations and last checked timestamp. Done in Sprint 7.3 with match, values, scope and TTL cards.
- Present location/resolver results in a responsive table with clear statuses. Done in Sprint 7.3.
- Add lightweight map/fallback after result, not before the answer. Done in Sprint 7.3 with a dependency-free resolver view.
- Refine What is my IP with IPv4/IPv6, reverse DNS, ISP/ASN and approximate location cards. Partially done in Sprint 7.3 with visible address, protocol, source, checked time and privacy context; richer ISP/ASN/location remains gated by provider/data-source review.
- Add related tools and support/donation placeholder after the useful result and educational content. Done in Sprint 7.3 as related tools plus gated upgrade CTA; real donation remains human-gated.
- Add benchmark-grade DNS/IP chrome: task-first diagnostic workbench, record-type tabs, visual IP panel, privacy CTA and honest resolver coverage disclosure. Done and deployed in Sprint 9.5 without API contract changes, external analytics, multi-region probes or real monetization.
- Transform the Hub catalog route for NetProbe into a public network/DNS/IP landing with direct tool cards, three-level explanation and DNS/IP/domain/SSL/guide deep links. Done in production in Phase 18 Sprint 18.3 with deploy `28422499578`, release `36b11f54ef984e6c6098da971cd5df3248cc1b0e-28422499578-1` and live desktop/mobile route smoke.

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
- Public NetProbe/API smoke and live DNS/IP UX smoke after the Sprint 9.5 deploy because the app is live in production.

## Acceptance metrics

- Result appears above the fold after action.
- No raw hostname/IP in analytics.
- No map dependency blocks initial render.
- Existing public IP/DNS smokes keep passing.
- DNS propagation mobile input keeps the domain example separate from record type tabs.
- Hub catalog route `/supersites/<locale>/sites/netprobe-atlas` opens as a practical landing, not a status/product sheet, and includes direct paths for IP, DNS propagation, DNS lookup, RDAP, SSL, port and ping/traceroute.

## Dashboard backlog

- DNS propagation benchmark readiness.
- IP lookup benchmark readiness.
- Multi-region probe gap.
- Monitoring upsell readiness.
