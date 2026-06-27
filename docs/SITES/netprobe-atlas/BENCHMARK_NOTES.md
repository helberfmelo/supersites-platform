# NetProbe Atlas Benchmark Notes

Data-base: 2026-06-27

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
