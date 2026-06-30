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

## Sprint 7.12 result

- Implemented dominant dropzone/file-state messaging for PDF and text flows.
- Added workflow steps before processing and workflow snapshot after processing.
- Added privacy checklist, related document tools and server/OCR/batch gated panel on every localized tool page.
- Removed public internal Sprint 5.2 labels from app surfaces and replaced them with user-facing local MVP language.
- Validated with Vitest, Nuxt build, preview smoke, Playwright PDF generation/rotation/download and screenshot inspection.

## Sprint 9.7 result

- Created `DocShiftWorkbench` as the shared task-first PDF surface for home and tool pages.
- Added dense PDF tool tabs, above-fold dropzone/text input, preview/download states, workflow snapshot, privacy checklist, planned server workflow panel and related document links.
- Refactored tool pages to keep SEO/guide/FAQ/schema around the shared workbench instead of duplicating processing logic.
- Validated home desktop, Text to PDF mobile and privacy mobile screenshots from the production build with no incoherent overlap or horizontal overflow.
- Free PDF output remains usable without signup; no upload endpoint, storage, OCR, batch worker, account, ads, billing or external analytics was added.

## Sprint 18.12 catalog result

- Converted the SuperSites catalog route for DocShift into a PDF-suite landing instead of a generic product card.
- Added a dominant browser-side PDF dropzone, visible workflow shortcuts, eight published PDF tool cards, search/category filters and a contextual PDF footer with real deep links.
- Removed top-level internal upload/backend language from the public catalog route and kept privacy/limits below the user-facing tool value.
- Validated local and live desktop/mobile screenshots, 16 EN/PT-BR deep links, public copy, AdSense-safe layout, Playwright and benchmark crawler with 0 gaps.
- No server upload, OCR, batch worker, persistent storage, account, ads, billing, donation, affiliate or external analytics was enabled.

## Dashboard backlog

- PDF privacy readiness.
- OCR/batch gate.
- Related-tool chaining readiness.
