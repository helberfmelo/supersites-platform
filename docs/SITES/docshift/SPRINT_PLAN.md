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
