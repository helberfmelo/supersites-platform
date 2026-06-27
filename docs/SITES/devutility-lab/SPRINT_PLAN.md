# DevUtility Lab Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-DEVUTILITY.
- Real number: Sprint 7.5.
- Must run after: Sprint 7.4.

## Current state

- Nuxt SSG app exists with nine browser-side developer tools and five locales.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.
- Sprint 7.5 implementation is locally validated; remote CI/dry-run and closing docs are pending until push.

## Scope

- Workbench/editor UX refinement.
- Error and example state refinement.
- SEO/AIO content and inert monetization/support structure.

## Implemented in Sprint 7.5

- Tool pages now use a split local workbench with input metrics, example preset, clear empty/running/success/error states and result copy/download actions.
- Each tool has original example guidance and common-error explanation.
- Related tools and inert gated upgrade panels are visible after the free utility context.
- Public labels were adjusted away from internal sprint wording on primary product surfaces.
- Analytics remains sanitized to tool lifecycle events with `tool_slug`; snippets and results are not stored, logged or sent to product APIs.

## Validation

- `pnpm test:devutility`
- `pnpm build:devutility`
- `pnpm validate:devutility-preview`
- `pnpm test:e2e:devutility`
- Standard structure/secrets/dry-run/ci/diff gates.

Local Sprint 7.5 validation passed with all commands above plus `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes` and `git diff --check`.

## Gates

- No server storage of snippets.
- No workspaces/history/API/billing/ad serving.
- No analytics values from snippets or results.
