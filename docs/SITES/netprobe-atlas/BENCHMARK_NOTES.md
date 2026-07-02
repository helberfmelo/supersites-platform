# NetProbe Atlas Benchmark Notes

Data-base: 2026-06-30

## References

- `https://www.whatsmydns.net/`
- `https://whatismyip.com.br/`
- `https://whatismyipaddress.com/pt/meu-ip`
- DNSChecker, IntoDNS, MxToolbox, Whois and SSL Labs as secondary references.

## Screenshots available

- `docs/benchmarks/screenshots/whatsmydns_dns_propagation.png`
- `docs/benchmarks/screenshots/whatismyip_com_br.png`
- `docs/benchmarks/screenshots/whatismyipaddress_pt_meu_ip.png`

## Useful patterns to learn

- DNS propagation should lead with domain, record type, expected value and one clear action.
- Results need a simple summary before global technical details.
- Resolver/location table is a proven information architecture for propagation.
- Map should be lightweight and secondary, not a render-blocking dependency.
- IP lookup should show IPv4/IPv6, ISP/ASN, approximate location and reverse DNS in clear cards.
- Footer/internal linking around DNS/IP tools creates strong topical coverage.

## Do not copy

- whatsmydns layout, icons, map art, footer text or color identity.
- whatismyip ad density and dated UI.
- whatismyipaddress VPN/fear-based funnel copy or proprietary assets.

## Opportunities

- Use the existing bounded NetProbe API but refine the UI around result interpretation.
- Add expected-value matching to DNS propagation UI.
- Add copy/share/export affordances where no PII or raw target leaks into analytics.

## Sprint 7.3 implementation notes

- What is my IP now shows immediate answer cards, a privacy interpretation block and local-only safe summary copy.
- DNS propagation now supports an optional expected value, match/coverage summary cards, distinct values, resolver table and lightweight resolver view.
- Related tools and gated upgrade CTA appear after the useful result path; no ads, billing, donation payment, affiliate link or provider is active.
- Playwright now covers IP summary cards, propagation expected-value matching and analytics redaction of raw targets/results.

## Sprint 9.5 implementation notes

- DNS Propagation now uses visual record-type tabs and a cleaner domain example (`example.com`) so the type selection is not duplicated inside the hostname field.
- The diagnostic workbench places input and result closer together on desktop, with responsive tabs on mobile.
- The resolver area now labels the bounded coverage map/grid, resolver/locality table and distinct values more explicitly, while keeping the no-worldwide-claim disclosure.
- What is my IP now has a larger visual IP panel before the summary cards, plus a privacy CTA and related checks.
- No endpoint, resolver network, analytics payload, storage, worker, billing, ad or payment behavior changed.

## Phase 18 Sprint 18.3 catalog landing notes

- The Hub catalog route `/supersites/en/sites/netprobe-atlas` now behaves as a public network/DNS/IP landing instead of a generic product-status detail page.
- The first fold leads with `Network diagnostics you can start now.`, direct IP/DNS CTAs and a quick-start panel, without rollout status, public URL, launch order, quality check, deploy or monetization language.
- Seven direct cards route to What is my IP, DNS Propagation, DNS Lookup, RDAP Domain Lookup, SSL Certificate Checker, Port Checker and Ping/Traceroute.
- The page explains results at three depths: general users, technical teams and ongoing monitoring, then provides DNS Tools, IP Tools, Domain Tools, SSL Tools and Guides deep-link groups.
- Local evidence: `artifacts/netprobe-catalog-qa/netprobe-catalog-desktop.png` and `artifacts/netprobe-catalog-qa/netprobe-catalog-mobile-pt-br.png` were reviewed; Playwright checked desktop EN/mobile PT-BR, overflow and blocked public terms.
- Production deploy `28422499578` published release `36b11f54ef984e6c6098da971cd5df3248cc1b0e-28422499578-1`, asset `https://opentshost.com/supersites/_nuxt/BhQl-Uh-.js`; public smoke, AdSense-safe validation, crawler quick `2026-06-30T05-37-05-797Z` and live route screenshots passed.

## Phase 18 Sprint 18.21 home notes

- The NetProbe app home `/supersites/netprobe-atlas/en/` now opens as a practical network diagnostics hub rather than a product/status page.
- The first fold leads with `Check IP, DNS and domain signals in seconds.`, a universal target input (`Enter a domain, hostname or IP`) and direct paths to What is my IP, DNS Lookup and DNS Propagation.
- Seven quick cards route to What is my IP, DNS Lookup, DNS Propagation, RDAP Domain Lookup, SSL Certificate Checker, Port Checker and Ping/Traceroute.
- Public status/upgrade language was removed from the home surface, including launch status, API/release checks, advertising readiness, upgrade path and free-results-first wording.
- The footer uses text-column topical menus for DNS Tools, DNS Guides, DNS Lookup by type, IP Tools, Domain Tools and SSL Tools. Keep this footer link-oriented, not button-heavy.
- The support block is community/inert only. Do not activate donation payments, provider widgets, checkout, PIX, PayPal, Stripe or affiliate links without the human gates documented in the monetization playbooks.
- The universal input does not append the typed target to a shareable URL and must keep analytics free of raw IP/domain/host values.
- Operational correction: deploy `28474757009` failed only because the smoke marker was stale after intentional copy change. Commit `8441814` updated `scripts/smoke-netprobe-public.ps1` to assert the new H1 and block internal terms; final deploy `28475475506` passed with release `8441814e224be60ef9baa7b81dc8e32be2c35311-28475475506-1` and asset `DjMxIF8r.js`.
- Evidence: local screenshots `artifacts/netprobe-home-qa/netprobe-home-en-desktop.png` and `artifacts/netprobe-home-qa/netprobe-home-pt-br-mobile.png`; live screenshots `artifacts/netprobe-home-live-qa/netprobe-home-live-en-desktop.png` and `artifacts/netprobe-home-live-qa/netprobe-home-live-pt-br-mobile.png`; crawler quick live `2026-06-30T21-07-05-749Z` with 95 routes, 190 viewport checks and 0 gaps.

## Phase 18 Sprint 18.22 What is my IP notes

- The IP page now opens with the observed public IP automatically loaded; there is no mandatory run button in the first task path.
- The first fold focuses on the practical answer: IP, IPv4/IPv6, public-range status, last checked time, refresh, copy and details.
- The details section covers ISP/ASN, reverse DNS, approximate location, proxy/VPN/Tor/data center, browser, platform, user agent and approximate map. Fields that need a trusted enrichment provider are marked unavailable instead of being guessed.
- Methodology, privacy and limits moved below the useful result as a disclosure, keeping the benchmark-grade mental model: answer first, technical context after.
- No affiliate VPN CTA, payment link, ad request, provider script, analytics payload with IP, geolocation provider or external monetization was activated.
- Evidence: implementation commit `ae30bda`; deploy `28478351303`; release `ae30bda4f77c00f95ae8393b3911b1e409097071-28478351303-1`; asset `CIQKG5SX.js`; live screenshots `artifacts/netprobe-ip-live-qa/netprobe-ip-live-en-desktop.png` and `artifacts/netprobe-ip-live-qa/netprobe-ip-live-pt-br-mobile-details.png`; crawler quick live `2026-06-30T22-12-55-566Z` with 95 routes, 190 viewport checks and 0 gaps.

## Phase 18 Sprints 18.23-18.28 NetProbe Tools notes

- DNS Propagation now keeps the checker task-first with domain, record type, optional expected value, match status, distinct values, different/no-answer/error counts, checked scope and checked-at metadata before methodology.
- DNS Lookup now uses answer-first cards and a table for type, name, value, TTL and resolver/source, plus safe copy/export actions and direct links to propagation and email-record checks.
- RDAP now leads with domain, registrar, expiration and status cards, then dates, nameservers, DNSSEC and a redaction notice instead of a dominant raw technical block.
- SSL now separates simple certificate status, issuer, expiration window, SANs, chain count and public warnings without presenting itself as an SSL Labs equivalent.
- Port Checker now provides common-port chips, a direct open/closed/filtered style summary and the antiabuse boundary that the public endpoint only allows 80, 443, 587 and 993.
- Ping/Traceroute now reflects the bounded TCP 443 reachability endpoint honestly. ICMP and traceroute remain unavailable, and no hop list or worldwide path is fabricated.
- DNS/footer navigation, related checks, support links and the sponsor reserve are richer but inert. No ad request, payment provider, checkout, affiliate, external probe worker, multi-region network or raw target analytics was activated.
- Local evidence for this stage: `pnpm test:netprobe`, `pnpm build:netprobe`, `pnpm validate:public-copy` and `git diff --check`.

## Phase 19 NetProbe DNS Propagation correction

- DNS Propagation is the primary NetProbe Atlas tool in home ordering, universal CTA routing, quick cards and DNS footer order; What is my IP is second, then DNS Lookup and the remaining diagnostics.
- The DNS Propagation tool route now follows the whatsmydns mental model with a compact domain/type/expected-value search bar, record-type shortcuts, resolver/locality rows with city, country, flag/status, returned values and TTL, plus a larger map beside the list on desktop and stacked below on mobile.
- Methodology, regional-coverage disclosure, support, sponsor reserve and related links stay below the practical checker/result path. No external map asset, paid resolver network, real ad request, donation provider, checkout, payment, affiliate or raw-target analytics was activated.
- Follow-up correction: the public API now requests the configured 24 regional DNS-over-HTTPS snapshots, so the UI can populate the WhatsMyDNS-style list and map from real per-location responses. Shareable DNS propagation URLs use the hash pattern `#A/example.com` and auto-run on load.

## Regional DNS propagation implementation

- The control-plane propagation endpoint now has a `NetProbePropagationResolver` contract and a `GoogleEcsNetProbePropagationResolver` implementation.
- The public result matrix requests 24 configured localities with Google Public DNS JSON API and `edns_client_subnet` hints, so list rows and map markers are populated from real DNS-over-HTTPS responses instead of duplicated local results.
- This is a practical regional propagation check, not a claim that NetProbe operates a physical resolver in each city. Exact WhatsMyDNS-style server ownership remains a future distributed-probe/provider decision.
- The result can differ from WhatsMyDNS for the same domain because WhatsMyDNS checks its own server/locality network, while NetProbe checks Google Public DNS with ECS hints for the configured localities.
- Cloudflare account materials were found in `D:\Projetos\bigshopv4`, but this sprint did not need Cloudflare credentials or mutate Cloudflare. Cloudflare remains useful for DNS hosting/proxy/cache/R2/Workers later; Cloudflare DoH can provide a baseline resolver but does not provide all-city fanout by itself.
