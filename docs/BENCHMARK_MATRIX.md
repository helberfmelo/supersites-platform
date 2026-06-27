# Benchmark Matrix

Data-base: 2026-06-27

This matrix turns `docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`, the available screenshots in `docs/benchmarks/` and the real roadmap state into an executable refinement backlog. Benchmarks are references for product reasoning only. Do not copy brand, layout, text, code, assets, icons, screenshots, legal policies or commercial claims.

## Screenshot inventory

| File | Related site | Observed useful pattern |
|---|---|---|
| `docs/benchmarks/screenshots/whatsmydns_dns_propagation.png` | NetProbe Atlas | DNS propagation above the fold, global resolver table, simple map, educational depth and rich related-tool footer |
| `docs/benchmarks/screenshots/whatismyip_com_br.png` | NetProbe Atlas | Extremely direct IP answer and low-friction lookup, but with ad-density and dated UI risks to avoid |
| `docs/benchmarks/screenshots/whatismyipaddress_pt_meu_ip.png` | NetProbe Atlas | IP answer card, map, privacy/security CTAs and tool grid, but with aggressive monetization patterns to avoid |

## Portfolio matrix

| Site | Benchmark references | Current code state | Main learning | Fase 7 sprint | P0 refinement |
|---|---|---|---|---:|---|
| SuperSites Hub | ProductHunt, AlternativeTo, SaaSHub, ThereIsAnAIForThat, GA4, AdSense, Search Console, Stripe, Plausible, Metabase, Grafana | Public Hub live; control-plane live; benchmark dashboard not yet modeled | Catalog must feel like an operational portfolio, not a link farm | 7.2 | Add benchmark, SEO/AIO, monetization and opportunity readiness views |
| NetProbe Atlas | whatsmydns, whatismyipaddress, whatismyip.com.br, DNSChecker, IntoDNS, MxToolbox | Public NetProbe live with bounded API for IP/DNS/RDAP/SSL/propagation/port/reachability | Lead with instant answer, then technical depth and related tools | 7.3 | Refine DNS propagation and What is my IP with richer layered results |
| CalcHarbor | Calculator.net, Omni Calculator, CalculatorSoup, UnitConverters | Local/CI Nuxt SSG; public placeholder | Simple calculator first, formula and explanation immediately after | 7.4 | Standard result cards, formulas, examples, related calculators and finance disclaimers |
| DevUtility Lab | CodeBeautify, Regex101-style tools, JSON formatters, diff utilities | Local/CI Nuxt SSG; public placeholder | Split editor, fast local processing and clear error feedback win | 7.5 | Editor/workbench layout, examples, copy/download states and privacy cues |
| TimeNexus | timeanddate, Time.is, World Time Buddy, 24timezones | Local/CI Nuxt SSG; public placeholder | Direct time answer plus planner/timeline depth | 7.6 | Timezone converter and meeting planner UX, city/fuso pages plan and related tools |
| QRRoute | TinyURL, ME-QR, QR Code Generator, UTM/link tools | Local/CI Nuxt SSG plus gated redirect foundation; public placeholder | Real-time preview and clear static vs dynamic explanation | 7.7 | Tabs by QR type, preview/download polish, UTM preview and gated dynamic upsell |
| InvoiceCraft | Invoice Generator, OnlineInvoices, FreeInvoiceBuilder, Billdu, Zoho, Wave | Local/CI Nuxt SSG with local PDF; public placeholder | Editor and document preview must be the product, no signup for basic PDF | 7.8 | Form/preview ergonomics, local autosave plan, templates plan and legal/tax disclaimers |
| MailHealth | MxToolbox, Mail-Tester, EasyDMARC, dmarcian, Google Admin Toolbox, MailGenius | Local/CI Nuxt SSG plus bounded DNS/SMTP endpoints; public placeholder | Score/checklist first, raw records and fixes second | 7.9 | Domain health summary, issue severity, fix builders and monitor CTA |
| SitePulse Lab | DownForEveryoneOrJustMe, GTmetrix, PageSpeed Insights, SecurityHeaders, SSL Labs, BuiltWith | Local/CI Nuxt SSG plus bounded probe endpoint; public placeholder | Emergency answer first, report details and recommendations after | 7.10 | Status answer, redirect/header/robots/sitemap tabs and safe monitor CTA |
| PixelBatch | remove.bg, iLoveIMG, TinyPNG, Squoosh, Photopea, ResizePixel | Local/CI Nuxt SSG browser processing; public placeholder | Dropzone plus before/after preview and privacy clarity | 7.11 | Dropzone queue, before/after metrics, ecommerce presets and batch upsell |
| DocShift | iLovePDF, Smallpdf, Sejda, PDF24, Online2PDF, Adobe online tools | Local/CI Nuxt SSG browser PDF processing; public placeholder | Tool grid and dominant upload flow with strong related tools | 7.12 | PDF task grid, dropzone states, related tools and retention/privacy messaging |

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
