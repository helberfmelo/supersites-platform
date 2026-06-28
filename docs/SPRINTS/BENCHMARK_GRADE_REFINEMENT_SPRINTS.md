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
| BGR-CALCHARBOR-DENSITY | Sprint 9.12 | CalcHarbor calculator hub depth | Expanded calculator catalogue, localized currency/number defaults, tables/charts where useful, related calculators and disclaimers |
| BGR-TIMENEXUS-DENSITY | Sprint 9.13 | TimeNexus world clock and planning depth | Current time panel, city/world clock, timeline converter, meeting planner and priority city/timezone SEO pages |
| BGR-DEVUTILITY-WORKBENCH | Sprint 9.14 | DevUtility Lab premium workbench density | Split editor/result panes, examples, tree/error views, copy/download/clear states, dense category navigation and privacy cues |
| BGR-HUB-SEO-AIO | Sprint 9.15 | SuperSites Hub, rich footers, related tools and SEO/AIO clusters | Hub feels public-product grade; top tools/screenshots/related links/content clusters are localized and non-deceptive |
| BGR-PERF-ADSENSE-CLOSURE | Sprint 9.16 | Performance, AdSense-safe layout, production rollout and closure | Lighthouse/PageSpeed targets or exceptions recorded; ad/support spaces are safe and inert; deploy/smoke/run IDs close the phase |

## Sprint 9.2 execution evidence

Sprint 9.2 delivered the local benchmark crawler baseline without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs or recurring production workers.

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

Sprint 9.6 delivered the QRRoute tool-first generator locally without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs, public short links, custom domains, dynamic QR editing or recurring production workers.

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

Sprint 9.7 delivered the DocShift PDF workbench locally without activating real ads, checkout, billing, donations, affiliates, external analytics, paid APIs, server-side upload, OCR, batch processing, document history or recurring production workers.

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
| Remote CI | Pending feature commit and push |
| Production deploy | Pending Fase 9/Sprint 9.7 static app deploy after Quality Gate and Deploy Dry Run pass |

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
