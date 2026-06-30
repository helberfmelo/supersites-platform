# NetProbe Atlas Benchmark Notes

Data-base: 2026-06-28

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
