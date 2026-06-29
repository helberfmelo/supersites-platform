# DocShift Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-DOCSHIFT.
- Real number: Sprint 7.12.
- Must run after: Sprint 7.11.

## Current state

- Nuxt SSG app exists with eight browser-side PDF/document tools and five locales.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- PDF task-grid/dropzone/result UX refinement.
- SEO/AIO document education.
- Inert OCR/batch/API/support/ads structure.

## Validation

- `pnpm test:docshift`
- `pnpm build:docshift`
- `pnpm validate:docshift-preview`
- `pnpm test:e2e:docshift`
- Standard structure/secrets/dry-run/ci/diff gates.

## Execution notes

- Local implementation completed in Sprint 7.12 with `Local MVP` badges, dropzone/file state, workflow steps, workflow snapshot, privacy checklist, related document tools and server/OCR/batch/API/history gated panels.
- Targeted validation passed locally: `pnpm test:docshift`, `pnpm build:docshift`, `pnpm validate:docshift-preview` and `pnpm test:e2e:docshift`.
- Playwright screenshots were inspected under `artifacts/playwright-docshift-report/data/` with no incoherent overlap or horizontal overflow observed.
- Remote Quality Gate `28290860646`, Deploy Dry Run `28290860642` and public Hub/control-plane/NetProbe smokes passed after feature commit `d0ac775`.
- DocShift remains public placeholder until app-specific deploy, smoke and rollback gates exist.

## Gates

- No server-side uploads, OCR provider, batch worker, checkout, ad serving or API.
- No analytics values from files, text, page ranges, metadata or PDF bytes.

## Benchmark-grade sprint

- Symbol: BGR-DOCSHIFT-P0.
- Real number: Sprint 9.7.
- Status: completed in production; feature commit, remote CI, deploy and public smoke passed.

## Sprint 9.7 execution notes

- `DocShiftWorkbench` now powers the home and all localized tool pages with dense PDF tabs, dominant dropzone/text input, preview/download, workflow snapshot, privacy checklist, planned server workflow panel and related PDF tools.
- The home opens with PDF Merge above the catalog, while tool pages keep canonical/hreflang/schema, guide sections, FAQ and review links around the shared workbench.
- Local validation passed: `pnpm test:docshift`, `pnpm build:docshift`, `pnpm validate:docshift-preview`, `pnpm test:e2e:docshift`, `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes` and `git diff --check`.
- Playwright screenshots in `artifacts/playwright-docshift-report/data/` were inspected for home desktop, Text to PDF mobile and privacy mobile.
- Remote closure passed: commit `1c20e80`, Quality Gate `28317815474`, Deploy Dry Run `28317815479`, DocShift Fase 9/Sprint 9.7 deploy `28317896866`, release `1c20e80830ab8cbca6cfb9742d01b5698e917bab-28317896866-1` and public asset `https://opentshost.com/supersites/docshift/_nuxt/AWgMi3M5.js`.
- Public smokes passed for DocShift, the aggregate Hub, control-plane/API and live production UX across desktop workbench, Text-to-PDF preview/download and PT-BR mobile layout.
- No upload endpoint, storage, OCR, batch worker, paid API, checkout, billing, ad serving, donation link, affiliate link, external analytics or production worker was activated.

## Sprint 13.5 provider planning notes

- Symbol: DEPTH-PIXEL-DOC.
- Added localized `Advanced document workflow review` sections to the home and tool pages for OCR/table extraction, Office/image conversion and batch/API.
- Each workflow states the free path today, data touched if enabled and the required gate before any upload/provider activation.
- Created `docs/RUNBOOKS/FILE_PROVIDER_DATA_MATRIX.md` and updated governance/human gates for OCR providers, conversion providers, upload queues, API jobs, retention/deletion, sandbox/antivirus and billing entitlement.
- Local validation passed: `pnpm test:docshift` with 10 tests, `pnpm build:docshift`, `pnpm validate:docshift-preview`, `pnpm test:e2e:docshift`, public-copy, AdSense-safe, structure, secrets, deploy dry-run, ci changes and diff check.
- No upload API, OCR, conversion provider, server queue, persistent storage, paid API, checkout, billing, ad serving, donation link, affiliate link, external analytics, worker or cron was activated.
