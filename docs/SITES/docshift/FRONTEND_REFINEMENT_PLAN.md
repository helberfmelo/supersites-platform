# DocShift Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make browser-side PDF merge, split, rotate, compress/rewrite, watermark, page numbers, metadata cleaner and text-to-PDF workflows feel clear and reliable.

## P0

- Improve home/task grid and per-tool dropzone.
- Add file validation, progress, success and error states.
- Add clear result/download/reset actions.
- Add related PDF tools after result.
- Keep privacy/retention note visible near upload.

## P1

- Add task chaining plan such as compress after merge or add page numbers after merge.
- Add mobile limits and file-size guidance.

## P2

- Prepare OCR, batch, larger files, API, workspaces and teams as gated paid backlog.

## Impact expected

Higher completion on PDF tasks and stronger future conversion for volume/OCR use.

## Technical risk

Medium due to browser PDF memory, object URL lifecycle and mobile file handling.

## AdSense/compliance risk

Medium; ads/support must stay away from uploads, progress, previews and download actions.

## Tests needed

- DocShift unit tests/build.
- Worker validation and PDF rendering smoke.
- Preview smoke and Playwright.
- No analytics from file names, page ranges, metadata or text.

## Acceptance metrics

- PDF remains local.
- Download works after processing.
- No mobile overflow around file list and controls.

## Dashboard backlog

- PDF privacy readiness.
- OCR/batch gate.
- Related-tool chaining readiness.
