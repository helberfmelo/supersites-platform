# PixelBatch Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make browser-side image compression, resize, crop, convert, metadata removal and presets feel visual, trustworthy and fast.

## P0

- Improve dropzone and file state flow.
- Add before/after preview and simple savings/result summary.
- Add clear download/reset actions.
- Add privacy note that images remain in the browser.
- Add related image tools and ecommerce preset entry points.

## P1

- Add queue UI planning for future batch without enabling server upload.
- Add mobile memory guard messaging.

## P2

- Prepare batch, high resolution, background removal, API and integrations as gated paid backlog.

## Impact expected

Higher completion and trust for image tasks, stronger fit for ecommerce users.

## Technical risk

Medium due to browser memory, Canvas support and mobile preview behavior.

## AdSense/compliance risk

Medium; ads/support must stay away from upload, preview, progress and download controls.

## Tests needed

- PixelBatch unit tests/build.
- Worker and Canvas smoke.
- Preview smoke and Playwright.
- No analytics from file names, dimensions, pixels or settings.

## Acceptance metrics

- Image remains local.
- Object URLs are revoked.
- Preview/download states do not overflow mobile.

## Dashboard backlog

- Browser memory readiness.
- Ecommerce preset readiness.
- Batch/API/AI gate.

## Sprint 7.11 execution notes

- P0 completed locally with dropzone, selected-file state, before/after preview, workflow steps, download/reset controls, privacy checklist and related image tools.
- P1 queue planning is represented as gated batch queue messaging without enabling server upload.
- Mobile and desktop screenshots from the Playwright report were inspected with no incoherent overlap or text overflow.

## Sprint 9.8 result

- Added shared `PixelBatchWorkbench` with tabs for all 6 tools, large drag/drop target, use-case preset chips, format/quality/dimension controls and stronger preview/download framing.
- Home now exposes the working compressor flow above the catalog; tool pages reuse the same workbench with the route tool selected.
- Visual QA inspected home desktop, compressor mobile and privacy mobile screenshots from the production build with no incoherent overlap or horizontal overflow.

## Sprint 18.11 catalog result

- The SuperSites catalog route `/supersites/<locale>/sites/pixelbatch` now opens as a benchmark-grade image landing instead of a generic site card: practical H1, dominant dropzone, local-preview plan, workflow shortcuts, searchable tool cards and contextual footer links.
- The public copy highlights browser-side privacy with `Your image stays in this browser` / `Sua imagem fica neste navegador` and removes `No server upload backend active` from the public top surface.
- Validation closed with 23 Hub unit tests, 24 Hub Playwright tests, generated HTML route checks, 12 live EN/PT-BR deep links, public smoke, AdSense-safe smoke, benchmark crawler `2026-06-30T12-54-57-039Z` with 0 gaps, and live desktop/mobile screenshots reviewed.

## Phase 18.80-18.86 execution notes

- The app-level workbench now keeps the dominant dropzone and result preview as the primary experience while the home adds a richer footer of image tools.
- Result cards now expose original size, actual output size, reduction percentage, output format, quality, worker state and metadata handling where relevant.
- Image Resizer has a maintain-proportion checkbox, Image Cropper exposes the required centered presets, Image Converter warns about AVIF browser support, and Social Preset Generator can render all preset outputs locally with individual downloads.
- Public top copy was cleaned from local MVP/backend status language while preserving the browser-only privacy promise and account-workflow boundaries.
- Validation stayed scoped to the affected app: PixelBatch unit test, build, preview smoke, public-copy, secrets and diff check.
