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
