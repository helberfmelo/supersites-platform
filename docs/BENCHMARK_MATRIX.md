# Benchmark Matrix

Data-base: 2026-06-27

This matrix turns `docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`, the available screenshots in `docs/benchmarks/`, the live audit in `docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK.md` and the real roadmap state into an executable refinement backlog. Benchmarks are references for product reasoning only. Do not copy brand, layout, text, code, assets, icons, screenshots, legal policies or commercial claims.

## Live audit baseline

| Area | Score | Fase 9 implication |
|---|---:|---|
| Overall portfolio | 62/100 | Treat current state as solid MVP structure, not benchmark-grade completion |
| Benchmark similarity | 58/100 | Prioritize task-first layouts, visual results, denser tool surfaces and richer related-tool footers |
| Task-first UX | 55/100 | Move primary controls/results above the fold for each tool category |
| Multilingual quality | 45/100 | Correct locale fallbacks, accents and public copy before AdSense or SEO scale |
| AdSense readiness | 52/100 | Improve content depth, legal/trust pages and safe inert placements before any ad request |
| Trust/legal | 50/100 | Expand legal/contact/methodology/editorial pages and keep final legal acceptance human-gated |

## Crawler baseline after Sprint 9.2

Sprint 9.2 added a Playwright benchmark crawler for the live portfolio and stored the first quick baseline in `docs/benchmarks/our-sites/latest-baseline.md`.

| Signal | Result |
|---|---|
| Quick crawl coverage | 95 routes across Hub, NetProbe Atlas and 9 product apps |
| Viewport checks | 190 desktop/mobile checks |
| Internal broken links | 0 |
| Horizontal overflow | 0 |
| Missing JSON-LD schema gaps | 138, mainly non-rich/legal/content surfaces |
| Robots/sitemap fetch gaps | 11, caused by production `robots.txt` returning HTTP 500 before redeploy |
| Hub public status gap | `/supersites/en/status` returned HTTP 500 before redeploy |
| Local remediation prepared | Static `robots.txt` files and Hub status content added to artifacts |

## Screenshot inventory

| File | Related site | Observed useful pattern |
|---|---|---|
| `docs/benchmarks/screenshots/whatsmydns_dns_propagation.png` | NetProbe Atlas | DNS propagation above the fold, global resolver table, simple map, educational depth and rich related-tool footer |
| `docs/benchmarks/screenshots/whatismyip_com_br.png` | NetProbe Atlas | Extremely direct IP answer and low-friction lookup, but with ad-density and dated UI risks to avoid |
| `docs/benchmarks/screenshots/whatismyipaddress_pt_meu_ip.png` | NetProbe Atlas | IP answer card, map, privacy/security CTAs and tool grid, but with aggressive monetization patterns to avoid |

## Portfolio matrix

| Site | Benchmark references | Current code state | Main learning | Fase 9 sprint | P0 refinement |
|---|---|---|---|---:|---|
| SuperSites Hub | ProductHunt, AlternativeTo, SaaSHub, ThereIsAnAIForThat, GA4, AdSense, Search Console, Stripe, Plausible, Metabase, Grafana | Public Hub and control-plane live; benchmark dashboard exists internally | Catalog must feel like a public product portfolio, not an internal inventory | 9.15 | Add visual catalogue depth, screenshots/top tools, rich links and public-grade copy |
| NetProbe Atlas | whatsmydns, whatismyipaddress, whatismyip.com.br, DNSChecker, IntoDNS, MxToolbox | Public NetProbe live with bounded API for IP/DNS/RDAP/SSL/propagation/port/reachability | Lead with instant answer, then technical depth and related tools | 9.5 | Rebuild DNS propagation and What is my IP around visual result panels |
| CalcHarbor | Calculator.net, Omni Calculator, CalculatorSoup, UnitConverters | Public Nuxt SSG live at `/supersites/calcharbor/` | Simple calculator first, formula and explanation immediately after | 9.12 | Expand calculator density, locale defaults, tables/charts and related calculators |
| DevUtility Lab | CodeBeautify, Regex101-style tools, JSON formatters, diff utilities | Public Nuxt SSG live at `/supersites/devutility-lab/` | Split editor, fast local processing and clear error feedback win | 9.14 | Mature into a developer workbench with dense navigation and richer states |
| TimeNexus | timeanddate, Time.is, World Time Buddy, 24timezones | Public Nuxt SSG live at `/supersites/timenexus/` | Direct time answer plus planner/timeline depth | 9.13 | Add world clock, meeting planner, timeline and city/timezone SEO pages |
| QRRoute | TinyURL, ME-QR, QR Code Generator, UTM/link tools | Public Nuxt SSG live at `/supersites/qrroute/` plus gated redirect foundation | Real-time preview and clear static vs dynamic explanation | 9.6 | Tool-first QR/barcode/UTM/vCard/Wi-Fi generator above the fold |
| InvoiceCraft | Invoice Generator, OnlineInvoices, FreeInvoiceBuilder, Billdu, Zoho, Wave | Public Nuxt SSG live at `/supersites/invoicecraft/` with local PDF | Editor and document preview must be the product, no signup for basic PDF | 9.9 | Make the editor/preview the first screen and keep tax/legal limits explicit |
| MailHealth | MxToolbox, Mail-Tester, EasyDMARC, dmarcian, Google Admin Toolbox, MailGenius | Public Nuxt SSG live at `/supersites/mailhealth/` plus bounded DNS/SMTP endpoints | Score/checklist first, raw records and fixes second | 9.10 | Create a unified domain health report with score and fix guidance |
| SitePulse Lab | DownForEveryoneOrJustMe, GTmetrix, PageSpeed Insights, SecurityHeaders, SSL Labs, BuiltWith | Public Nuxt SSG live at `/supersites/sitepulse-lab/` plus bounded probe endpoint | Emergency answer first, report details and recommendations after | 9.11 | Create visual online/down/slow score report and fix branding issues |
| PixelBatch | remove.bg, iLoveIMG, TinyPNG, Squoosh, Photopea, ResizePixel | Public Nuxt SSG live at `/supersites/pixelbatch/` with browser processing | Dropzone plus before/after preview and privacy clarity | 9.8 | Dominant drag-and-drop image workflow with before/after metrics |
| DocShift | iLovePDF, Smallpdf, Sejda, PDF24, Online2PDF, Adobe online tools | Public Nuxt SSG live at `/supersites/docshift/`; Sprint 9.7 production workbench adds dense tabs, dominant dropzone/preview/download and related PDF tools | Tool grid and dominant upload flow with strong related tools | 9.7 | Dense PDF tool grid and dominant per-tool dropzone/results workflow |

## Acceptance dimensions

| Dimension | Required evidence |
|---|---|
| Benchmark readiness | Notes and screenshots mapped without copying proprietary elements |
| SEO readiness | Localized title, H1, meta description, canonical, hreflang, sitemap and useful content plan |
| AIO/GEO readiness | Direct answers, methodology, FAQ, glossary/examples and evidence-driven recommendations |
| AdSense readiness | Safe placeholder plan, content-depth plan, no accidental-click placement and no real ad request |
| Monetization readiness | Upgrade, donation and affiliate structure gated; no real checkout/link/webhook |
| Frontend quality | Desktop/mobile usability, no overflow, predictable states and performance-safe components |
| Dashboard integration | Benchmark/opportunity items modeled for the control plane without provider imports |
