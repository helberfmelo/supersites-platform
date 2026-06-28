# PixelBatch Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-PIXELBATCH.
- Real number: Sprint 7.11.
- Must run after: Sprint 7.10.

## Current state

- Nuxt SSG app exists with six browser-side image tools and five locales.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- Dropzone/preview/result UX refinement.
- SEO/AIO image education.
- Inert batch/API/AI/support/ads structure.

## Validation

- `pnpm test:pixelbatch`
- `pnpm build:pixelbatch`
- `pnpm validate:pixelbatch-preview`
- `pnpm test:e2e:pixelbatch`
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No server-side uploads, AI provider, batch worker, checkout, ad serving or API.
- No analytics values from files, dimensions, pixels, metadata or output settings.

## Sprint 7.11 local execution

- Implemented dropzone state, original preview, before/after output preview, workflow steps, workflow snapshot, privacy checklist, related image tools and batch queue gated panels.
- No upload endpoint, storage, server-side image processing, batch worker, AI provider, checkout, billing, ad serving or analytics contract changed.
- Local validation passed: `pnpm test:pixelbatch`, `pnpm build:pixelbatch`, `pnpm validate:pixelbatch-preview` and `pnpm test:e2e:pixelbatch`.
- Playwright screenshots were inspected for home desktop, compressor mobile and privacy mobile.

## Benchmark-grade sprint

- Symbol: BGR-PIXELBATCH-P0.
- Real number: Sprint 9.8.
- Status: local validation complete; feature commit, remote CI, deploy and public smoke pending.

## Sprint 9.8 execution notes

- `PixelBatchWorkbench` now powers the home and all localized tool pages with dense image tabs, drag-and-drop, dominant dropzone, use-case presets, format/quality/dimension controls, before/after preview, output savings, workflow snapshot, privacy checklist, batch/API/AI planned panels and related image tools.
- The home opens with Image Compressor above the catalog, while tool pages keep canonical/hreflang/schema, guide sections, FAQ and review links around the shared workbench.
- Local validation passed: `pnpm test:pixelbatch`, `pnpm build:pixelbatch`, `pnpm validate:pixelbatch-preview`, `pnpm test:e2e:pixelbatch`, `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes` and `git diff --check`.
- Playwright screenshots in `artifacts/playwright-pixelbatch-report/data/` were inspected for home desktop, compressor mobile and privacy mobile.
- No upload endpoint, storage, batch worker, paid API, AI/background-removal provider, checkout, billing, ad serving, donation link, affiliate link, external analytics or production worker was activated.
