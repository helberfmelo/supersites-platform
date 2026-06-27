# DevUtility Lab Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-DEVUTILITY.
- Real number: Sprint 7.5.
- Must run after: Sprint 7.4.

## Current state

- Nuxt SSG app exists with nine browser-side developer tools and five locales.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- Workbench/editor UX refinement.
- Error and example state refinement.
- SEO/AIO content and inert monetization/support structure.

## Validation

- `pnpm test:devutility`
- `pnpm build:devutility`
- `pnpm validate:devutility-preview`
- `pnpm test:e2e:devutility`
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No server storage of snippets.
- No workspaces/history/API/billing/ad serving.
- No analytics values from snippets or results.
