# SuperSites Benchmark Crawler Baseline

Data-base: 2026-06-28

Sprint: Fase 9 / Sprint 9.2 - BGR-CRAWLER-BASELINE

Run id: `2026-06-28T00-42-36-813Z`

Mode: `quick`

Base URL: `https://opentshost.com`

Artifacts: `D:/Projetos/supersites/artifacts/benchmark-crawl/2026-06-28T00-42-36-813Z`

This is a Playwright technical baseline for the public SuperSites portfolio. It is not an official Lighthouse, PageSpeed or GTmetrix report. Performance values are browser timing proxies captured from the public transitional HostGator URLs.

No login, paid endpoint, external analytics provider, ad request, checkout, donation link, worker, cron or user-provided payload was activated.

## Summary

| Metric | Value |
| --- | --- |
| Routes crawled | 95 |
| Viewport checks | 190 |
| Page failures or browser errors | 4 |
| Total recorded gaps | 166 |
| Console errors | 4 |
| Missing title | 0 |
| Missing meta description | 4 |
| Missing canonical | 4 |
| Low or incomplete hreflang | 4 |
| Missing JSON-LD schema | 138 |
| Noindex pages | 0 |
| Horizontal overflow | 0 |
| Internal broken links | 0 |
| Robots/sitemap fetch gaps | 11 |
| Median TTFB proxy | 55 ms |
| P75 TTFB proxy | 60 ms |
| Median load proxy | 117 ms |
| P75 load proxy | 132 ms |
| Median LCP proxy | 112 ms |
| P75 LCP proxy | 124 ms |
| P75 CLS proxy | 0 |

## Surface Summary

| Surface | Checks | Failures | Gaps | Hreflang gaps | Schema gaps | Overflow | Median load ms |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SuperSites Hub | 50 | 4 | 74 | 4 | 50 | 0 | 113 |
| CalcHarbor | 14 | 0 | 10 | 0 | 10 | 0 | 117 |
| DevUtility Lab | 14 | 0 | 10 | 0 | 10 | 0 | 106 |
| DocShift | 14 | 0 | 10 | 0 | 10 | 0 | 115 |
| InvoiceCraft | 14 | 0 | 10 | 0 | 10 | 0 | 128 |
| MailHealth | 14 | 0 | 6 | 0 | 6 | 0 | 131 |
| NetProbe Atlas | 14 | 0 | 6 | 0 | 6 | 0 | 113 |
| PixelBatch | 14 | 0 | 14 | 0 | 10 | 0 | 125 |
| QRRoute | 14 | 0 | 10 | 0 | 10 | 0 | 125 |
| SitePulse Lab | 14 | 0 | 6 | 0 | 6 | 0 | 110 |
| TimeNexus | 14 | 0 | 10 | 0 | 10 | 0 | 112 |

## Robots And Sitemaps

| Surface | Kind | Status | HTTP | Sitemap refs / loc count |
| --- | --- | --- | --- | --- |
| supersite | robots | gap | 500 | no |
| supersite | sitemap | ok | 200 | 91 |
| netprobe-atlas | robots | gap | 500 | no |
| netprobe-atlas | sitemap | ok | 200 | 81 |
| calcharbor | robots | gap | 500 | no |
| calcharbor | sitemap | ok | 200 | 66 |
| devutility-lab | robots | gap | 500 | no |
| devutility-lab | sitemap | ok | 200 | 91 |
| timenexus | robots | gap | 500 | no |
| timenexus | sitemap | ok | 200 | 81 |
| qrroute | robots | gap | 500 | no |
| qrroute | sitemap | ok | 200 | 76 |
| invoicecraft | robots | gap | 500 | no |
| invoicecraft | sitemap | ok | 200 | 61 |
| mailhealth | robots | gap | 500 | no |
| mailhealth | sitemap | ok | 200 | 81 |
| sitepulse-lab | robots | gap | 500 | no |
| sitepulse-lab | sitemap | ok | 200 | 81 |
| pixelbatch | robots | gap | 500 | no |
| pixelbatch | sitemap | ok | 200 | 76 |
| docshift | robots | gap | 500 | no |
| docshift | sitemap | ok | 200 | 86 |

## Top Recorded Gaps

| Surface | Viewport | Path | Gap |
| --- | --- | --- | --- |
| SuperSites Hub | desktop | `/supersites/` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/en/status` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/pt-br` | Missing JSON-LD schema |
| CalcHarbor | desktop | `/supersites/calcharbor/pt-br/status` | Missing JSON-LD schema |
| DevUtility Lab | desktop | `/supersites/devutility-lab/` | Missing JSON-LD schema |
| DevUtility Lab | desktop | `/supersites/devutility-lab/en` | Missing JSON-LD schema |
| DevUtility Lab | desktop | `/supersites/devutility-lab/en/status` | Missing JSON-LD schema |
| DevUtility Lab | desktop | `/supersites/devutility-lab/pt-br` | Missing JSON-LD schema |
| DevUtility Lab | desktop | `/supersites/devutility-lab/pt-br/status` | Missing JSON-LD schema |
| DocShift | desktop | `/supersites/docshift/` | Missing JSON-LD schema |
| DocShift | desktop | `/supersites/docshift/en` | Missing JSON-LD schema |
| DocShift | desktop | `/supersites/docshift/en/status` | Missing JSON-LD schema |
| DocShift | desktop | `/supersites/docshift/pt-br` | Missing JSON-LD schema |
| DocShift | desktop | `/supersites/docshift/pt-br/status` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/calcharbor` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/devutility-lab` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/docshift` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/invoicecraft` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/mailhealth` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/netprobe-atlas` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/pixelbatch` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/qrroute` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/sitepulse-lab` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/sites/timenexus` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/status` | HTTP status 500 |
| SuperSites Hub | desktop | `/supersites/en/status` | Missing meta description |
| SuperSites Hub | desktop | `/supersites/en/status` | Missing canonical |
| SuperSites Hub | desktop | `/supersites/en/status` | Low hreflang count (0) |
| SuperSites Hub | desktop | `/supersites/en/status` | Missing x-default hreflang |
| SuperSites Hub | desktop | `/supersites/en/status` | Missing JSON-LD schema |
| SuperSites Hub | desktop | `/supersites/en/status` | 1 console error(s) |
| InvoiceCraft | desktop | `/supersites/invoicecraft/` | Missing JSON-LD schema |
| InvoiceCraft | desktop | `/supersites/invoicecraft/en` | Missing JSON-LD schema |
| InvoiceCraft | desktop | `/supersites/invoicecraft/en/status` | Missing JSON-LD schema |
| InvoiceCraft | desktop | `/supersites/invoicecraft/pt-br` | Missing JSON-LD schema |
| InvoiceCraft | desktop | `/supersites/invoicecraft/pt-br/status` | Missing JSON-LD schema |
| MailHealth | desktop | `/supersites/mailhealth/` | Missing JSON-LD schema |

## Broken Internal Links

No broken same-origin internal links were detected in the crawled pages.

## Notes

- Screenshots are written under `D:/Projetos/supersites/artifacts/benchmark-crawl/2026-06-28T00-42-36-813Z/screenshots` and are intentionally not versioned because `artifacts/` is ignored.
- Full mode covers all locales, all tool/calculator pages and localized content/status pages. Quick mode samples EN/PT-BR plus the first tool per product for fast validation.
- Lighthouse/PageSpeed/GTmetrix integration remains a later gate; this sprint records deterministic browser timing proxies and SEO metadata checks.
- Legal review, AdSense approval, billing, donation, affiliate, KYC, tax, bank and irreversible provider actions remain human-gated.
