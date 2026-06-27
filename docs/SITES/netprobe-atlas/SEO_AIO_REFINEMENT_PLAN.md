# NetProbe Atlas SEO/AIO Refinement Plan

Data-base: 2026-06-27

## References

- whatsmydns educational DNS propagation content structure.
- DNSChecker/IntoDNS topical clustering.
- Search guidance in `docs/SEO_AIO_PLAYBOOK.md`.

## P0

- Add direct answer blocks for DNS propagation and IP lookup.
- Expand original methodology for resolver scope, TTL, cache, expected-value matching and limitations.
- Add FAQ and troubleshooting around mismatch, timeout, NXDOMAIN and stale DNS.
- Strengthen internal links between DNS lookup, propagation, SSL, RDAP, port and reachability pages.

## P1

- Add glossary snippets for A, AAAA, CNAME, MX, TXT, NS, SOA, CAA, PTR and SRV.
- Add localized examples for five initial languages.

## P2

- Plan future regional resolver pages only after real probe coverage exists.

## Impact expected

Better SEO/AIO coverage for high-intent DNS/IP searches without creating fake global coverage.

## Technical risk

Low for content/metadata; medium for route or sitemap changes.

## AdSense/compliance risk

Low if content remains original and tools work without signup.

## Tests needed

- HTML SSR/SSG metadata checks.
- Sitemap/canonical/hreflang smoke.
- Schema validation where applicable.

## Acceptance metrics

- Each refined page has direct answer, methodology, FAQ and related tools.
- No claims of global propagation beyond actual resolver coverage.
- No invented source, ranking or causal claim.

## Dashboard backlog

- Pages missing troubleshooting blocks.
- Record-type glossary completeness.
- DNS internal-link coverage.
