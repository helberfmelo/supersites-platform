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
