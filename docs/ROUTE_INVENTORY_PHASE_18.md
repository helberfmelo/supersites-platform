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

## Human Action Required

No identity, KYC, tax, bank, PIN, legal acceptance, purchase, real AdSense, real donation, checkout, external analytics, provider import or irreversible production action was executed in this baseline.
