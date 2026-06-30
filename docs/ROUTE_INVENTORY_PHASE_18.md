# Phase 18 Route Inventory And Baseline

Date: 2026-06-29

Sprint: Phase 18.0 baseline for benchmark-driven public UX refinement

Operator: Codex

## Scope Read Before Changes

- `docs/MEGA_PROMPT_SUPERSITES.md`
- `docs/OPERATING_CONTEXT.md`
- `docs/STATUS.md`
- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `docs/SECURITY.md`
- `docs/DATA_GOVERNANCE.md`
- `docs/SEO_AIO_PLAYBOOK.md`
- `docs/ADSENSE_PLAYBOOK.md`
- `docs/ANALYTICS.md`
- `docs/BILLING.md`
- `docs/METRICS.md`
- `docs/HUMAN_ACTION_REQUIRED.md`
- `docs/RUNBOOKS/SPRINT_EXECUTION.md`
- `docs/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE.md`
- Existing ADR index from `docs/ADR/`

## Repository And CI State

- Branch: `main`
- Remote tracking: `origin/main`
- User-provided untracked roadmap file: `docs/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE.md`
- Latest relevant GitHub Actions before edits:
  - Quality Gate `28380290216`: success on `2026-06-29T14:41:15Z`
  - Public Watchdog `28379669654`: success on `2026-06-29T14:31:45Z`
  - Deploy Dry Run `28379416758`: success on `2026-06-29T14:27:54Z`

## Baseline Runs

Full crawler was attempted first as required by Sprint 18.0, but did not finish inside the local command window:

- `pnpm benchmark:crawl`: timed out after about 4 minutes and left partial artifacts under `artifacts/benchmark-crawl/2026-06-29T19-24-33-369Z`
- `pnpm exec node scripts/benchmark-crawl.mjs --mode=full --write-docs --sprint=18.0 --symbolic-sprint=PHASE18-BASELINE`: timed out after about 15 minutes and left partial artifacts under `artifacts/benchmark-crawl/2026-06-29T19-28-53-886Z`

Quick crawler completed successfully:

- Command: `pnpm benchmark:crawl:quick`
- Run id: `2026-06-29T19-44-36-078Z`
- Artifact: `artifacts/benchmark-crawl/2026-06-29T19-44-36-078Z/baseline.md`
- Screenshot folder: `artifacts/benchmark-crawl/2026-06-29T19-44-36-078Z/screenshots`

Post-change quick crawler also completed successfully:

- Command: `pnpm benchmark:crawl:quick`
- Run id: `2026-06-29T20-08-13-569Z`
- Artifact: `artifacts/benchmark-crawl/2026-06-29T20-08-13-569Z/baseline.md`
- Screenshot folder: `artifacts/benchmark-crawl/2026-06-29T20-08-13-569Z/screenshots`

## Quick Baseline Summary

| Metric | Value |
| --- | ---: |
| Routes crawled | 95 |
| Viewport checks | 190 |
| Page failures or browser errors | 0 |
| Recorded gaps | 0 |
| Console errors | 0 |
| Missing title/meta/canonical | 0 |
| Hreflang gaps | 0 |
| Missing JSON-LD schema | 0 |
| Horizontal overflow | 0 |
| Internal broken links | 0 |
| Median load proxy | 90 ms |
| P75 load proxy | 103 ms |
| P75 CLS proxy | 0 |

Post-change quick baseline kept the same 95 routes, 190 viewport checks and 0 recorded gaps. Performance proxies were still healthy, with P75 load at 410 ms, P75 LCP at 324 ms and P75 CLS at 0.

Robots and sitemap checks returned HTTP 200 for the Hub and all 10 product sites. Sitemap loc counts in the completed quick report:

| Surface | Sitemap loc count |
| --- | ---: |
| supersite | 96 |
| netprobe-atlas | 81 |
| calcharbor | 66 |
| devutility-lab | 91 |
| timenexus | 96 |
| qrroute | 76 |
| invoicecraft | 61 |
| mailhealth | 81 |
| sitepulse-lab | 81 |
| pixelbatch | 76 |
| docshift | 86 |

## Public Findings Logged For Phase 18

- Hub public copy exposed internal rollout/monetization language such as launch order, production evidence and ad/paid-upgrade readiness.
- NetProbe tool pages exposed implementation/status copy such as public API, deploy validation, billing, workers and upgrade planning language.
- What is my IP required a manual button click before showing the answer.
- NetProbe diagnostic pages kept methodology too high in the first tool row; the benchmark pattern puts result and action first, then methodology and limits below.
- DNS Propagation remains honest about limited resolver scope and must not claim worldwide propagation until real regional probes exist.
- Existing quick crawler validated metadata/link/overflow health, but does not replace the full Phase 18 crawl, Lighthouse or page-by-page visual QA.

## Release Smoke Follow-up

- Initial post-push Quality Gate `28399921848` failed in the Hub and NetProbe preview smoke steps after build, tests, typecheck, repository safety and public-copy validation had passed.
- Root cause: preview/public smoke scripts still asserted old internal public markers (`Launch desk`, `Quality check`, `Advertising not active`, `Launch Status`) that were intentionally removed from the public surface.
- Remediation: smoke scripts now assert the new benchmark-facing markers (`Free tools first`, `Review notes`, `Free results first`, `Public Status`) while keeping ads/analytics/noindex/asset checks intact.
- Local follow-up validation passed with `pwsh` for `scripts/validate-supersite-preview.ps1`, `scripts/validate-netprobe-preview.ps1` and `scripts/validate-netprobe-static-artifact.ps1` using the local artifact runtime API marker.

## Production Release Follow-up

- Feature commit: `179b104` (`feat: start phase 18 benchmark refinement`).
- Smoke-marker fix commit: `7777c6a` (`ci: align phase 18 smoke markers`).
- Replacement remote Quality Gate `28400509988` passed after smoke-marker alignment.
- Replacement remote Deploy Dry Run `28400510010` passed.
- Hub release: `deploy-supersite-hostgator.yml` run `28400789120` passed, publishing `/supersites/` release `7777c6a15caf3c724d3bee668f4cfc969dbc0971-28400789120-1`; root redirect stayed disabled and asset `https://opentshost.com/supersites/_nuxt/DqEUNszz.js` was validated.
- NetProbe release: `deploy-netprobe-hostgator.yml` run `28401266330` passed, publishing `/supersites/netprobe-atlas/` release `7777c6a15caf3c724d3bee668f4cfc969dbc0971-28401266330-1`; API preflight passed and asset `https://opentshost.com/supersites/netprobe-atlas/_nuxt/BXFoZbwf.js` was validated.
- Post-deploy public smokes passed for Hub/apps/APIs and NetProbe/API using `pnpm deploy:smoke-supersite-public` and `pnpm deploy:smoke-netprobe-public`.
- Live browser validation for `https://opentshost.com/supersites/netprobe-atlas/en/tools/what-is-my-ip` confirmed automatic IP rendering, canonical URL, no mobile horizontal overflow and no blocked internal public phrases.

## Sprint 18.2 Hub Follow-up

- The next page-by-page slice targeted the public Hub home at `/supersites/`.
- The home now includes 11 localized direct tool shortcuts for high-intent free tasks: public IP, DNS propagation, loan payment, JSON formatting, timezone conversion, static QR, invoice builder, SPF check, website status, image compression and PDF merge.
- Footer navigation now exposes nine vertical clusters plus legal/editorial links, reducing reliance on product-only discovery.
- The support block remains informational and inert, with 0 public payment links or provider widgets.
- Local checks passed for Hub unit tests, Hub Playwright, Hub build, Hub preview smoke, Hub HostGator artifact, public copy, AdSense-safe public pages, packages, typechecks, structure, secrets, deploy dry-run, ci:changes and diff check.
- Remote checks passed with commit `2719229`, Quality Gate `28414743413`, Deploy Dry Run `28414743406` and Hub deploy `28414876705`.
- The Hub deploy published release `2719229cf6e1e36c29f5f6f7bd4d153bfcbdb978-28414876705-1`, validated asset `https://opentshost.com/supersites/_nuxt/C46NIGfN.js`, kept root redirect disabled and completed with 211 files/2663150 bytes.
- Post-deploy public smoke, AdSense-safe validation and quick crawler `2026-06-30T02-00-09-977Z` passed with 95 routes, 190 viewport checks and 0 gaps.
- Live browser validation for `https://opentshost.com/supersites/en/?phase18=28414876705` confirmed popular tool links, support copy, no desktop/mobile overflow and no blocked audit phrases.

## Human Action Required

No identity, KYC, tax, bank, PIN, legal acceptance, purchase, real AdSense, real donation, checkout, external analytics, provider import or irreversible production action was executed in this baseline. The only production mutations were reversible Hub and NetProbe HostGator releases after green gates.
