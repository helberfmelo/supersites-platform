# Benchmark-Grade Refinement Sprints

Data-base: 2026-06-27

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
