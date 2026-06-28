# Benchmark-Grade Refinement Sprints

Data-base: 2026-06-28

## Numbering decision

`docs/ROADMAP.md` records Fase 8 - Public Rollout e Production Visibility as completed through Sprint 8.6. The live public state after Sprint 8.6 is 12 published Nuxt/Laravel surfaces under `/supersites/...`, with zero public placeholder apps remaining.

The live benchmark audit in `docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK.md` estimates the portfolio at 62/100 overall: useful as an MVP structure, but still below benchmark-grade in visual similarity, task-first UX, localization, trust/legal depth and AdSense readiness.

This block is therefore mapped as Fase 9 - Benchmark-Grade Refinement.

## Baseline

| Area | Baseline |
|---|---:|
| Overall live audit score | 62/100 |
| Benchmark similarity | 58/100 |
| Task-first UX | 55/100 |
| Multilingual quality | 45/100 |
| AdSense readiness | 52/100 |
| Trust/legal | 50/100 |
| Public live surfaces | 12 |
| Public placeholder apps | 0 |
| Real ads, billing, checkout, donations, affiliates or external analytics | 0 |
| Full live crawl after Sprint 9.11 | 876 routes, 1752 desktop/mobile checks, 875 internal links, 0 broken links, 0 overflow, 0 console/page errors, 872 missing JSON-LD checks |

## Symbolic to real sprint mapping

| Symbolic sprint | Real sprint | Scope | Primary acceptance |
|---|---:|---|---|
| BGR-ROADMAP-LABELS | Sprint 9.1 | Convert the live audit into the Fase 9 roadmap and add phase/sprint labels to manual deploy workflows | Roadmap, status, metrics and manual deploy workflows identify Fase/Sprint; no product UI change |
| BGR-CRAWLER-BASELINE | Sprint 9.2 | Playwright crawler, screenshots, Lighthouse-style baseline and SEO technical audit | Every live surface/locale/tool has crawl evidence, screenshots, console/link/canonical/hreflang/sitemap/schema checks and recorded gaps |
| BGR-I18N-COPY-P0 | Sprint 9.3 | Global localization, accent correction and public copy cleanup | Non-EN routes have no accidental English fallback; public pages avoid internal MVP/gated/deploy-smoke wording |
| BGR-TRUST-SUPPORT | Sprint 9.4 | Legal/trust/methodology/contact/cookies depth and inert support block foundation | Legal pages become complete product documents pending human legal review; support/donation UI stays config-gated with no real payment link |
| BGR-NETPROBE-P0 | Sprint 9.5 | NetProbe DNS propagation and What is my IP benchmark UX | Result above the fold, record tabs, resolver/locality table, world grid/map, IP panel, related tools, privacy CTA and honest coverage disclosure |
| BGR-QRROUTE-P0 | Sprint 9.6 | QRRoute tool-first generator | QR/barcode/UTM/vCard/Wi-Fi tabs, dominant preview, copy/download controls, local privacy cues and dynamic/paid paths gated |
| BGR-DOCSHIFT-P0 | Sprint 9.7 | DocShift PDF grid and dropzone workflow | Dense PDF tool grid, dominant per-tool dropzone, preview/status/download states, related PDF tools and browser-side trust copy |
| BGR-PIXELBATCH-P0 | Sprint 9.8 | PixelBatch visual image workflow | Drag-and-drop, before/after preview, size savings, format/quality controls, use-case presets and no upload backend |
| BGR-INVOICECRAFT-P0 | Sprint 9.9 | InvoiceCraft editor-first workflow | Editable invoice/quote/receipt above the fold, document preview, item rows, currency/locale controls and tax disclaimers |
| BGR-MAILHEALTH-REPORT | Sprint 9.10 | MailHealth unified domain health report | Single domain check, 0-100 score, SPF/DKIM/DMARC/MX/blacklist/SMTP/header checklist and provider-neutral fix guidance |
| BGR-SITEPULSE-REPORT | Sprint 9.11 | SitePulse visual status/performance report | Online/down/redirecting/slow answer, score, redirects, headers, robots, sitemap, TTFB, recommendations and corrected branding |
| BGR-CALCHARBOR-DENSITY | Sprint 9.12 | CalcHarbor calculator hub depth | Workbench-first home/detail pages with scenario comparison, tables/charts, localized copy, related calculators and no value persistence |
| BGR-TIMENEXUS-DENSITY | Sprint 9.13 | TimeNexus world clock and planning depth | Current time panel, city/world clock, meeting planner and three curated city/timezone group pages visible before catalog cards |
| BGR-DEVUTILITY-WORKBENCH | Sprint 9.14 | DevUtility Lab premium workbench density | Split editor/result panes, examples, tree/error views, copy/download/clear states, dense category navigation and privacy cues |
| BGR-HUB-SEO-AIO | Sprint 9.15 | SuperSites Hub, rich footers, related tools and SEO/AIO clusters | Hub feels public-product grade; top tools/screenshots/related links/content clusters are localized and broad JSON-LD schema coverage improves without low-value mass pages |
| BGR-PERF-ADSENSE-CLOSURE | Sprint 9.16 | Performance, AdSense-safe layout, production rollout and closure | Final full crawler shows no broken links/overflow and materially reduced schema gaps; consent/ad/support spaces are safe and inert; deploy/smoke/run IDs close the phase |

## Sprint 9.2 execution evidence

Sprint 9.2 delivered the local benchmark crawler baseline without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs or recurring production workers.

## Sprint 9.12 execution evidence

Sprint 9.12 delivered CalcHarbor calculator density in production. Feature commit `97c92f0`, Quality Gate `28329239451`, Deploy Dry Run `28329239457` and deploy `28329341280` passed under display title `Fase 9 Sprint 9.12 - Deploy Static App HostGator - calcharbor - deploy`.

Production release: `97c92f099ff741220280593c9d96eec34c9e3729-28329341280-1`; public asset: `https://opentshost.com/supersites/calcharbor/_nuxt/CjP6XAFu.js`.

Public smokes passed for CalcHarbor, aggregate Hub/control-plane/API and live UX. Live UX smoke confirmed `$512.91` result rendering, scenario rows, detail-page snapshot, mobile PT-BR localization, no horizontal overflow, empty `localStorage`/`sessionStorage`, zero app analytics events and zero console errors.

## Sprint 9.13 execution evidence

Sprint 9.13 delivered TimeNexus world clock and planning density locally without activating saved presets, history, widgets, paid APIs, real ads, checkout, billing, donations, affiliates, external analytics or recurring production workers.

| Evidence | Value |
|---|---|
| TimeNexus home behavior | `TimeNexusPlanner` opens before the catalog with current time panel, source zone, city group, duration, UTC instant, business-hour fit and nearby slots |
| Curated SEO/AIO pages | 3 world-clock groups x 5 locales = 15 route variants; no open-ended city-page generation |
| Routes added | `/world-clock/americas-europe`, `/world-clock/global-product`, `/world-clock/apac-europe` |
| Local frontend validation | Passed: `pnpm test:timenexus` (10 tests), `pnpm build:timenexus`, `pnpm validate:timenexus-preview`, `pnpm test:e2e:timenexus` |
| Local preview asset | `/_nuxt/BFWW5Bb9.js` |
| Visual QA | Screenshots captured at `artifacts/playwright-timenexus-planner/sprint-9-13-timenexus-desktop.png` and `artifacts/playwright-timenexus-planner/sprint-9-13-timenexus-world-clock-mobile.png` |
| Public copy coverage | `pnpm validate:public-copy` passed across 891 HTML files |
| Local final gates | Passed: `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check` |
| Remote CI/deploy status | Pending feature commit, push, Quality Gate, Deploy Dry Run, HostGator deploy and public smokes |

| Evidence | Value |
|---|---|
| Crawler script | `scripts/benchmark-crawl.mjs` |
| Commands | `pnpm benchmark:crawl:quick`, `pnpm benchmark:crawl` |
| Published baseline doc | `docs/benchmarks/our-sites/latest-baseline.md` |
| Primary artifact run id | `2026-06-28T00-42-36-813Z` |
| Validation artifact run id | `2026-06-28T00-56-38-742Z` |
| Post-deploy published baseline run id | `2026-06-28T04-46-52-491Z` |
| Quick crawl coverage | 95 routes, 190 viewport checks |
| Initial recorded gaps | 166 total; 0 internal broken links; 0 horizontal overflow; 11 robots/sitemap fetch gaps |
| Post-deploy recorded gaps | 142 total; 0 failures/browser errors; 0 console errors; 0 internal broken links; 0 horizontal overflow; 0 robots/sitemap fetch gaps |
| Production gaps found before deploy | Hub `/en/status` and `/robots.txt` returned HTTP 500 before deploy |
| Production remediation | Hub `/status` content and static `robots.txt` files published for Hub, NetProbe and 9 product apps |
| Remote CI/deploy status | Completed after public repository visibility mitigation; Quality Gate `28308340947`, Hub deploy `28309009196`, NetProbe deploy `28311031901` and nine static app deploys passed |

## Sprint 9.3 execution evidence

Sprint 9.3 delivered the public-copy and localization gate to production without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs or recurring production workers.

| Evidence | Value |
|---|---|
| Shared sanitizer | `sanitizePublicCopy` in `@supersites/i18n` |
| Public copy validator | `scripts/validate-public-copy.mjs` |
| Commands | `pnpm validate:public-copy`, plus tests/builds/previews/Playwright for all 11 Nuxt frontends |
| Generated HTML scanned locally | 876 files |
| CI gate | `Public copy gate` in `.github/workflows/quality-gate.yml` |
| Scope sanitized | Hub home/detail/legal/status plus NetProbe Atlas, CalcHarbor, DevUtility Lab, TimeNexus, QRRoute, InvoiceCraft, MailHealth, SitePulse Lab, PixelBatch and DocShift copy/pages/tools |
| Internal terms blocked in public HTML | `MVP`, `gated`, `gate`, `deploy smoke`, `rollback validation`, `placeholder`, `HUMAN_ACTION_REQUIRED` and site-specific stale markers |
| Feature/correction commits | `9b5a1e0` and `b940561` |
| Remote CI status | Quality Gate `28313347776` passed; correction Quality Gate `28314301032` passed; Deploy Dry Run `28313347789` and correction Deploy Dry Run `28314301019` passed |
| Production deploy status | Final Fase 9/Sprint 9.3 deploys passed: CalcHarbor `28314385617`, DevUtility Lab `28314386140`, TimeNexus `28314386658`, QRRoute `28314387259`, InvoiceCraft `28314387879`, MailHealth `28314388290`, SitePulse Lab `28314388782`, PixelBatch `28314389339`, DocShift `28314389887`, NetProbe `28314390452`, Hub `28314390962` |
| Public smoke status | Hub aggregate, control-plane/API, NetProbe, nine static app smokes and 16-page live localized-copy smoke passed |

## Sprint 9.4 execution evidence

Sprint 9.4 delivered localized trust/legal/support depth in production without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs or recurring production workers.

| Evidence | Value |
|---|---|
| Shared helper | `buildTrustPageCopy` in `@supersites/i18n` |
| Public surfaces wired | Hub, NetProbe Atlas, CalcHarbor, DevUtility Lab, TimeNexus, QRRoute, InvoiceCraft, MailHealth, SitePulse Lab, PixelBatch and DocShift |
| Pages enriched per surface | About, Contact, Privacy, Cookies, Terms, Methodology, Editorial Policy and Status |
| Locale coverage | EN, PT-BR, ES, FR and DE |
| Generated page variants | 440 trust/legal page variants across 11 public surfaces |
| Support/donation state | Informational and inert; no payment link, checkout, wallet, webhook, provider SDK or real account |
| Human gates updated | `docs/HUMAN_ACTION_REQUIRED.md` now tracks real support/donation activation separately from general donations |
| Public copy/payment URL gate | `scripts/validate-public-copy.mjs` checks visible internal terms plus payment/support URLs in `href`/`src` |
| Generated HTML scanned locally | 876 files |
| Local validation | Passed: `pnpm typecheck:packages`, `pnpm test:packages`, tests/builds/previews/Playwright for 11 Nuxt frontends, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check` |
| Feature commit | `99c0262` (`feat: add trust support copy foundation`) |
| Remote CI | Quality Gate `28315424809` passed; Deploy Dry Run `28315424825` passed |
| Production deploys | Hub `28315507670`; NetProbe `28315508804`; CalcHarbor `28315509929`; DevUtility Lab `28315511100`; TimeNexus `28315512640`; QRRoute `28315514298`; InvoiceCraft `28315516442`; MailHealth `28315518113`; SitePulse Lab `28315519943`; PixelBatch `28315521494`; DocShift `28315523056`; all labeled Fase 9/Sprint 9.4 and passed |
| Public smokes | Hub aggregate, control-plane/API, NetProbe/API, nine static app smokes and 165 localized `privacy`/`contact`/`status` trust/legal checks passed |

## Sprint 9.5 execution evidence

Sprint 9.5 delivered the NetProbe DNS/IP benchmark UX to production without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs, multi-region probes or recurring production workers.

| Evidence | Value |
|---|---|
| NetProbe pages refined | `/tools/what-is-my-ip` and `/tools/dns-propagation` |
| DNS propagation controls | Visual record-type tabs for A, AAAA, CNAME, MX, TXT and NS; domain example cleaned to `example.com` |
| DNS propagation result structure | Summary cards, copy-safe action, coverage disclosure, resolver coverage map/grid, resolver/locality table and distinct values |
| IP lookup result structure | Visual IP panel, version/source/public-range chips, summary cards, safe copy action and interpretation block |
| Privacy/trust additions | Inline privacy CTA and related checks; analytics remains limited to route/tool metadata and excludes IP, hostname, record, result and raw error values |
| Local frontend validation | Passed: `pnpm test:netprobe`, `pnpm build:netprobe`, `pnpm validate:netprobe-preview`, `pnpm test:e2e:netprobe` |
| Local preview asset | `/_nuxt/CdSZd5rf.js` |
| Visual QA | Desktop/mobile screenshots captured from the production build at `artifacts/frontend/sprint-9-5-netprobe-dns-desktop.png` and `artifacts/frontend/sprint-9-5-netprobe-dns-mobile.png` |
| Broad validation | Passed: `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check` |
| Feature commit | `3fe3732` (`feat: refine netprobe benchmark workflow`) |
| Remote CI | Quality Gate `28316321439` passed; Deploy Dry Run `28316321508` passed |
| Production deploy | NetProbe HostGator run `28316402512` passed with Fase 9/Sprint 9.5 label; release `3fe373267c7d6086348ce42bb3aad9ac825d8396-28316402512-1` |
| Public smokes | NetProbe/API, control-plane/API, Hub aggregate, nine static app assets, MailHealth/SitePulse APIs and live DNS/IP UX smoke passed |
| Final public asset | `https://opentshost.com/supersites/netprobe-atlas/_nuxt/CgziFN9n.js` |

## Sprint 9.6 execution evidence

Sprint 9.6 delivered the QRRoute tool-first generator to production without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs, public short links, custom domains, dynamic QR editing or recurring production workers.

| Evidence | Value |
|---|---|
| QRRoute pages refined | Home `/en` plus all localized `/tools/<slug>` pages |
| Generator structure | Shared `QRRouteWorkbench` with QR/barcode/UTM/vCard/Wi-Fi/preview tabs, local input form, dominant SVG preview, payload summary, output panel and inert dynamic upgrade panel |
| Home above-fold behavior | Static QR generator opens before the catalog; users can create/download/copy a QR without signup |
| Tool-page behavior | Each detail page opens the same workbench with its tool selected, preserving related tools, guide, FAQ and schema |
| Privacy/trust additions | Inline privacy strip and preview disclosure; analytics remains limited to safe route/tool metadata and excludes URLs, Wi-Fi secrets, vCards, barcode values and generated payloads |
| Local frontend validation | Passed: `pnpm test:qrroute`, `pnpm build:qrroute`, `pnpm validate:qrroute-preview`, `pnpm test:e2e:qrroute` |
| Local preview asset | `/_nuxt/BtAiHTGx.js` |
| Visual QA | Desktop/mobile screenshots captured by Playwright in `artifacts/playwright-qrroute-report/data/` |
| Broad validation | Passed: `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check` |
| Feature commit | `a6562c3` (`feat: refine qrroute benchmark generator`) |
| Remote CI | Quality Gate `28317041432` passed; Deploy Dry Run `28317041430` passed |
| Production deploy | QRRoute Static App HostGator run `28317125920` passed with Fase 9/Sprint 9.6 label; release `a6562c308416f693dd2a9bd15294a72f6a7f319b-28317125920-1` |
| Public smokes | QRRoute static app, Hub aggregate, control-plane/API and live QRRoute home/UTM UX smoke passed |
| Final public asset | `https://opentshost.com/supersites/qrroute/_nuxt/COqZLQg5.js` |

## Sprint 9.7 execution evidence

Sprint 9.7 delivered the DocShift PDF workbench to production without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs, server-side upload, OCR, batch processing, document history or recurring production workers.

| Evidence | Value |
|---|---|
| DocShift pages refined | Home `/en` plus all localized `/tools/<slug>` pages |
| Workbench structure | Shared `DocShiftWorkbench` with 8 PDF task tabs, dominant dropzone/text input, preview/download panel, workflow snapshot, privacy checklist, planned server workflow panel and related PDF tools |
| Home above-fold behavior | PDF Merge workbench opens before search/catalog; users can start a local PDF workflow without signup |
| Tool-page behavior | Each detail page reuses the same workbench with the route tool selected, preserving breadcrumb, hero, guide, FAQ and schema |
| Privacy/trust additions | Browser-only trust badge, file-safety copy and storage-free checklist; analytics remains limited to sanitized route/tool metadata and excludes filenames, text, pages, metadata and generated bytes |
| Local frontend validation | Passed: `pnpm test:docshift`, `pnpm build:docshift`, `pnpm validate:docshift-preview`, `pnpm test:e2e:docshift` |
| Local preview asset | `/_nuxt/B2X-2IPM.js` |
| Visual QA | Desktop/mobile screenshots captured by Playwright in `artifacts/playwright-docshift-report/data/` |
| Broad validation | Passed: `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check` |
| Remote CI | Passed: feature commit `1c20e80`, Quality Gate `28317815474`, Deploy Dry Run `28317815479` |
| Production deploy | Passed: Fase 9/Sprint 9.7 DocShift static app deploy `28317896866`, release `1c20e80830ab8cbca6cfb9742d01b5698e917bab-28317896866-1` |
| Public smoke | Passed: DocShift app asset `https://opentshost.com/supersites/docshift/_nuxt/AWgMi3M5.js`, aggregate Hub smoke, control-plane smoke and live workbench/Text-to-PDF/mobile UX smoke |

## Sprint 9.8 execution evidence

Sprint 9.8 delivered the PixelBatch image workbench to production without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs, server-side upload, AI providers, batch processing, saved files or recurring production workers.

| Evidence | Value |
|---|---|
| PixelBatch pages refined | Home `/en` plus all localized `/tools/<slug>` pages |
| Workbench structure | Shared `PixelBatchWorkbench` with 6 image task tabs, drag-and-drop, dominant dropzone, use-case presets, preview/download panel, before/after comparison, size savings, workflow snapshot, privacy checklist and related image tools |
| Home above-fold behavior | Image Compressor workbench opens before search/catalog; users can start a local image workflow without signup |
| Tool-page behavior | Each detail page reuses the same workbench with the route tool selected, preserving breadcrumb, hero, guide, FAQ and schema |
| Privacy/trust additions | Browser-only/no-upload/one-image safeguards, storage-free checklist and file-safety copy; analytics remains limited to sanitized route/tool metadata and excludes file names, pixels, dimensions, metadata and output settings |
| Local frontend validation | Passed: `pnpm test:pixelbatch`, `pnpm build:pixelbatch`, `pnpm validate:pixelbatch-preview`, `pnpm test:e2e:pixelbatch` |
| Local preview asset | `/_nuxt/BdbU2zyR.js` |
| Visual QA | Desktop/mobile screenshots captured by Playwright in `artifacts/playwright-pixelbatch-report/data/` |
| Broad validation | Passed: `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check` |
| Remote CI | Passed: feature commit `9ce7df7`, Quality Gate `28318467331`, Deploy Dry Run `28318467334` |
| Production deploy | Passed: Fase 9/Sprint 9.8 PixelBatch static app deploy `28318554712`, release `9ce7df79eda8d034520d92d9df9a878e84df5c80-28318554712-1` |
| Public smoke | Passed: PixelBatch app asset `https://opentshost.com/supersites/pixelbatch/_nuxt/CITr2M7k.js`, aggregate Hub smoke, control-plane smoke and live workbench/image-compressor/mobile UX smoke |

## Sprint 9.9 execution evidence

Sprint 9.9 delivered the InvoiceCraft editor-first workflow to production without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs, payment links, official fiscal numbering, jurisdictional tax automation, saved clients/products, recurrence, teams or recurring production workers.

| Evidence | Value |
|---|---|
| InvoiceCraft pages refined | Home `/en` plus all localized `/tools/<slug>` pages |
| Workbench structure | Shared `InvoiceCraftWorkbench` with invoice/quote/receipt tabs, editable item rows, currency/locale controls, discount, shipping/freight, manual tax/adjustment, snapshot, local PDF, copy summary and related documents |
| Home above-fold behavior | Invoice Builder workbench opens before search/catalog; users can edit a complete document and export a PDF without signup |
| Tool-page behavior | Each detail page reuses the same workbench with the route tool selected, preserving breadcrumb, hero, guide, FAQ, canonical, hreflang and schema |
| Privacy/trust additions | Browser-session-only messaging, no-storage checks, sanitized analytics limited to route/tool metadata and explicit tax/legal review copy |
| Local frontend validation | Passed: `pnpm test:invoicecraft`, `pnpm build:invoicecraft`, `pnpm validate:invoicecraft-preview`, `pnpm test:e2e:invoicecraft` |
| Local preview asset | `/_nuxt/DV3VL-kb.js` |
| Visual QA | Desktop/mobile screenshots captured by Playwright in `artifacts/playwright-invoicecraft-report/data/` |
| Remote CI | Passed: feature commit `a57083b`, Quality Gate `28319167672`, Deploy Dry Run `28319167671` |
| Production deploy | Passed: Fase 9/Sprint 9.9 InvoiceCraft static app deploy `28319247622`, release `a57083b70a60a34b3fc66394a86d27a0c810db52-28319247622-1` |
| Public smoke | Passed: InvoiceCraft app asset `https://opentshost.com/supersites/invoicecraft/_nuxt/CAuTAoAj.js`, aggregate Hub smoke, control-plane smoke and live workbench/invoice-builder/mobile UX smoke |

## Sprint 9.10 execution evidence

Sprint 9.10 delivered the MailHealth unified domain report to production without activating recurring monitoring, alert delivery, DMARC ingestion, batches, paid API, white-label, real ads, checkout, billing, donations, affiliates, external analytics or production workers.

| Evidence | Value |
|---|---|
| MailHealth pages refined | Home `/en` plus localized home variants through shared component rendering |
| Report structure | `MailHealthReportWorkbench` with domain, DKIM selector, SMTP port, optional local headers, unified score, per-check cards, guidance and safeguards |
| Checks included | SPF, DKIM, DMARC, MX, blacklist sample, SMTP TCP reachability and local header analysis |
| API/security boundary | Reuses existing bounded/rate-limited DNS, DNSBL and SMTP endpoints; headers remain browser-side and no SMTP message is sent |
| Analytics boundary | `domain-report` emits only sanitized route/tool metadata; no domain, selector, headers, records, probes or result values |
| Local frontend validation | Passed: `pnpm test:mailhealth`, `pnpm build:mailhealth`, `pnpm validate:mailhealth-preview`, `pnpm test:e2e:mailhealth` |
| Local preview asset | `/_nuxt/BsCQ7iof.js` |
| Visual QA | Desktop/mobile screenshots captured by Playwright in `artifacts/playwright-mailhealth-report/data/` |
| Local final gates | Passed: `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check` |
| Remote CI | Passed: feature commit `55721b1`, Quality Gate `28319796608`, Deploy Dry Run `28319796624` |
| Production deploy | Passed: Fase 9/Sprint 9.10 static app deploy `28319881701`, release `55721b1aa2d0e020f73c3823d580427a48708ab4-28319881701-1` |
| Public smokes | Passed: MailHealth static app/API asset `https://opentshost.com/supersites/mailhealth/_nuxt/fseKxIDq.js`, Hub aggregate, control-plane/API and live MailHealth report/mobile UX smoke |

## Sprint 9.11 execution evidence

Sprint 9.11 delivered the SitePulse visual report locally without activating recurring uptime monitoring, incident tracking, public status pages, alert delivery, history storage, multi-region probes, paid APIs, real ads, checkout, billing, donations, affiliates, external analytics or production workers.

| Evidence | Value |
|---|---|
| SitePulse pages refined | Home `/en` plus localized home variants through shared component rendering |
| Report structure | `SitePulseReportWorkbench` with URL input, visual state, score, HTTP/redirect/TTFB/cache metadata, report cards, safeguards and inert monitoring path |
| Checks included | Availability, redirects, security headers, crawlability and performance snapshot via the existing bounded probe |
| API/security boundary | Reuses `/api/v1/sitepulse/probe` with `checks: ['performance']`; SSRF guard, rate limits, cache and timeout behavior remain unchanged |
| Analytics boundary | `visual-report` emits only sanitized route/tool metadata; no target URL, domain, status, headers, TTFB, recommendations or probe results |
| Localization/public copy | Public badge copy changed from internal/local wording to one-shot check copy; operating principles are localized in PT-BR/ES/FR/DE |
| Local frontend validation | Passed: `pnpm test:sitepulse`, `pnpm build:sitepulse`, `pnpm validate:sitepulse-preview`, `pnpm test:e2e:sitepulse` |
| Backend bounded tests | Passed: `php artisan test --filter=SitePulseProbeApiTest` |
| Local preview asset | `/_nuxt/BSPAO78o.js` |
| Visual QA | Desktop/mobile screenshots captured by Playwright in `artifacts/playwright-sitepulse-report/data/` |
| Local final gates | Passed: `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check` |
| Remote CI | Passed: feature commit `761d3f0`, Quality Gate `28320680554`, Deploy Dry Run `28320680557` |
| Production deploy | Passed: Fase 9/Sprint 9.11 SitePulse static app deploy `28320771689`, release `761d3f0e54f09839ba8b5ff9d7a39bc5d176b11d-28320771689-1` |
| Public smokes | Passed: SitePulse app/API asset `https://opentshost.com/supersites/sitepulse-lab/_nuxt/C9Q51oa7.js`, aggregate Hub smoke, control-plane smoke and live SitePulse report/mobile UX smoke |

## Per-sprint execution rules

Each Sprint 9.x must:

1. Reread mandatory docs from `AGENTS.md`, the live audit and this sprint map.
2. Check git, CI, production public state and gates before editing.
3. Keep free functionality useful without signup.
4. Avoid copying benchmark brands, text, code, proprietary layout, assets or legal policies.
5. Keep real ads, checkout, billing, donations, affiliates, external analytics, paid APIs and production workers disabled unless a later explicit gate is approved.
6. Treat legal review, taxes, payment accounts, AdSense approval, KYC, bank data, PINs, domain purchase and real donation/affiliate activation as `HUMAN_ACTION_REQUIRED`.
7. Run targeted tests first, then build/preview/Playwright for affected frontends.
8. Run `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` and `git diff --check`.
9. Update docs/status/metrics and affected site docs in the same delivery.
10. Commit, push, monitor Quality Gate and Deploy Dry Run, then run public smokes for affected live surfaces.

## Phase 9 acceptance

Fase 9 is complete only when:

- Each public page has a useful action above the fold and a visual, copiable, interpretable result when applicable.
- EN, PT-BR, ES, FR and DE routes are internally consistent and free of accidental English fallback outside EN.
- Internal staging language is absent from public product copy.
- Legal/trust pages are complete enough for production review, with unresolved legal acceptance still tracked as human-gated.
- Technical SEO/AIO checks pass for canonical, hreflang, title, description, sitemap, robots and schema.
- Mobile and desktop screenshots show no incoherent overlap or overflow.
- AdSense-safe spaces remain inert and avoid accidental-click placement.
- Support/donation blocks are configurable and inert until human approval activates a real provider/link.
- Public smokes pass after production deploys and run IDs are recorded in `docs/STATUS.md`.
