# SuperSites Benchmark Crawler Baseline

Data-base: 2026-06-28

Sprint: Fase 9 / Sprint 9.12 pre-implementation live audit - BGR-LIVE-AUDIT-FULL

Run id: `2026-06-28T16-11-17-070Z`

Mode: `full`

Base URL: `https://opentshost.com`

Artifacts: `D:/Projetos/supersites/artifacts/benchmark-crawl/2026-06-28T16-11-17-070Z`

This is a Playwright technical baseline for the public SuperSites portfolio after Sprint 9.11 production rollout and before Sprint 9.12 implementation. It is not an official Lighthouse, PageSpeed or GTmetrix report. Performance values are browser timing proxies captured from the public transitional HostGator URLs.

No login, paid endpoint, external analytics provider, ad request, checkout, donation link, worker, cron or user-provided payload was activated.

## Summary

| Metric | Value |
| --- | --- |
| Routes crawled | 876 |
| Viewport checks | 1752 |
| Page failures or browser errors | 0 |
| Total recorded gaps | 904 |
| Console errors | 0 |
| Missing title | 0 |
| Missing meta description | 0 |
| Missing canonical | 0 |
| Low or incomplete hreflang | 0 |
| Missing JSON-LD schema | 872 |
| Noindex pages | 0 |
| Horizontal overflow | 0 |
| Internal broken links | 0 |
| Robots/sitemap fetch gaps | 0 |
| Median TTFB proxy | 47 ms |
| P75 TTFB proxy | 55 ms |
| Median load proxy | 96 ms |
| P75 load proxy | 108 ms |
| Median LCP proxy | 100 ms |
| P75 LCP proxy | 112 ms |
| P75 CLS proxy | 0 |

## Surface Summary

| Surface | Checks | Failures | Gaps | Hreflang gaps | Schema gaps | Overflow | Median load ms |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SuperSites Hub | 192 | 0 | 200 | 0 | 192 | 0 | 91 |
| CalcHarbor | 132 | 0 | 92 | 0 | 92 | 0 | 103 |
| DevUtility Lab | 182 | 0 | 94 | 0 | 92 | 0 | 100 |
| DocShift | 172 | 0 | 96 | 0 | 92 | 0 | 97 |
| InvoiceCraft | 122 | 0 | 94 | 0 | 92 | 0 | 97 |
| MailHealth | 162 | 0 | 16 | 0 | 12 | 0 | 97 |
| NetProbe Atlas | 162 | 0 | 12 | 0 | 12 | 0 | 91 |
| PixelBatch | 152 | 0 | 102 | 0 | 92 | 0 | 98 |
| QRRoute | 152 | 0 | 94 | 0 | 92 | 0 | 94 |
| SitePulse Lab | 162 | 0 | 12 | 0 | 12 | 0 | 93 |
| TimeNexus | 162 | 0 | 92 | 0 | 92 | 0 | 95 |

## Robots And Sitemaps

| Surface | Kind | Status | HTTP | Sitemap refs / loc count |
| --- | --- | --- | --- | --- |
| supersite | robots | ok | 200 | yes |
| supersite | sitemap | ok | 200 | 96 |
| netprobe-atlas | robots | ok | 200 | yes |
| netprobe-atlas | sitemap | ok | 200 | 81 |
| calcharbor | robots | ok | 200 | yes |
| calcharbor | sitemap | ok | 200 | 66 |
| devutility-lab | robots | ok | 200 | yes |
| devutility-lab | sitemap | ok | 200 | 91 |
| timenexus | robots | ok | 200 | yes |
| timenexus | sitemap | ok | 200 | 81 |
| qrroute | robots | ok | 200 | yes |
| qrroute | sitemap | ok | 200 | 76 |
| invoicecraft | robots | ok | 200 | yes |
| invoicecraft | sitemap | ok | 200 | 61 |
| mailhealth | robots | ok | 200 | yes |
| mailhealth | sitemap | ok | 200 | 81 |
| sitepulse-lab | robots | ok | 200 | yes |
| sitepulse-lab | sitemap | ok | 200 | 81 |
| pixelbatch | robots | ok | 200 | yes |
| pixelbatch | sitemap | ok | 200 | 76 |
| docshift | robots | ok | 200 | yes |
| docshift | sitemap | ok | 200 | 86 |

## Top Recorded Gaps

| Surface | Viewport | Path | Gap |
| --- | --- | --- | --- |
| SuperSites Hub | desktop | `/supersites/` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de/about` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de/contact` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de/cookies` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de/editorial-policy` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de/methodology` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de/privacy` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de/status` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/de/terms` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/about` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/contact` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/cookies` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/editorial-policy` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/methodology` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/privacy` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/status` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/terms` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es/about` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es/contact` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es/cookies` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es/editorial-policy` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es/methodology` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es/privacy` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es/status` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/es/terms` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr/about` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr/contact` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr/cookies` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr/editorial-policy` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr/methodology` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr/privacy` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr/status` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/fr/terms` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/pt-br` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/pt-br/about` | Missing JSON-LD schema |

## Broken Internal Links

No broken same-origin internal links were detected in the crawled pages.

## Notes

- Screenshots are written under `D:/Projetos/supersites/artifacts/benchmark-crawl/2026-06-28T16-11-17-070Z/screenshots` and are intentionally not versioned because `artifacts/` is ignored.
- Full mode covers all locales, all tool/calculator pages and localized content/status pages. Quick mode samples EN/PT-BR plus the first tool per product for fast validation.
- Lighthouse/PageSpeed/GTmetrix integration remains a later gate; this sprint records deterministic browser timing proxies and SEO metadata checks.
- Legal review, AdSense approval, billing, donation, affiliate, KYC, tax, bank and irreversible provider actions remain human-gated.
