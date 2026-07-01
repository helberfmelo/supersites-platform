# NetProbe Atlas Frontend Refinement Plan

Data-base: 2026-06-30

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
- Transform the NetProbe app home into a benchmark-grade diagnostic hub with universal target input, seven direct tool cards, support block below the free value path, no public status/upgrade/internal language and DNS/IP/domain/SSL footer columns. Done in production in Phase 18 Sprint 18.21 with deploy `28475475506`, release `8441814e224be60ef9baa7b81dc8e32be2c35311-28475475506-1` and live desktop/mobile home smoke.
- Convert What is my IP into an automatic answer page: auto-run on load, no mandatory run button, visible IP above the fold, refresh/copy/details actions, enriched-but-honest detail cards, methodology below the result and no raw IP analytics. Done in production in Phase 18 Sprint 18.22 with deploy `28478351303`, release `ae30bda4f77c00f95ae8393b3911b1e409097071-28478351303-1` and live desktop/mobile IP smoke.
- Convert the remaining NetProbe tools into answer-first public utilities: DNS Propagation, DNS Lookup, RDAP, SSL Certificate Checker, Port Checker and Ping/Traceroute now have summary cards, safe copy/export paths, related checks, richer DNS/footer navigation, an inert sponsor reserve and a support block after useful results. Done in Phase 18 Sprints 18.23 to 18.28 without API contract changes, worldwide-probe simulation, arbitrary port scanning, ICMP/traceroute invention, real ads, checkout or provider activation.

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

- NetProbe unit tests/build for scoped UI changes.
- Public-copy and diff checks when public copy, disclaimers or generated HTML change.
- Backend tests if API shape changes.
- Preview smoke, Playwright desktop/mobile, crawler, Lighthouse and public NetProbe smoke only when explicitly requested, when the stage is QA/pre-disclosure/closure, or when the stage requires publication.

## Acceptance metrics

- Result appears above the fold after action.
- No raw hostname/IP in analytics.
- No map dependency blocks initial render.
- Existing public IP/DNS smokes keep passing.
- DNS propagation mobile input keeps the domain example separate from record type tabs.
- Hub catalog route `/supersites/<locale>/sites/netprobe-atlas` opens as a practical landing, not a status/product sheet, and includes direct paths for IP, DNS propagation, DNS lookup, RDAP, SSL, port and ping/traceroute.
- NetProbe app home `/supersites/netprobe-atlas/<locale>/` opens with practical diagnostic input/results navigation above the fold, not launch status, methodology or upgrade/status language.
- NetProbe What is my IP `/supersites/netprobe-atlas/<locale>/tools/what-is-my-ip` opens with a live IP result above the fold, not a mandatory run button or public API/status language.
- The remaining NetProbe tool routes keep the first task/result path practical: DNS Propagation, DNS Lookup, RDAP, SSL, Port Checker and Ping/Traceroute show the answer before methodology and never claim unavailable global DNS, ICMP, traceroute or arbitrary-port coverage.
- DNS type controls stay aligned to endpoint allowlists: DNS Lookup supports A/AAAA/CNAME/MX/TXT/NS/SOA/CAA, DNS Propagation supports A/AAAA/CNAME/MX/TXT/NS, and unavailable PTR/SRV or propagation SOA/CAA choices are visibly disabled.
- Smoke/preview markers must follow intentional public copy changes in the same sprint; stale markers such as `Network facts` cannot block a benchmark-grade copy update after deploy.
- Footer navigation should remain text-column topical menus with hover emphasis, not button grids or product-status chips.

## Dashboard backlog

- DNS propagation benchmark readiness.
- IP lookup benchmark readiness.
- Multi-region probe gap.
- Monitoring upsell readiness.
