# DevUtility Lab Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-DEVUTILITY.
- Real number: Sprint 7.5.
- Must run after: Sprint 7.4.

## Current state

- Nuxt SSG app exists with nine browser-side developer tools and five locales.
- Public URL is deployed under `/supersites/devutility-lab/`.
- Sprint 7.5 implemented tool-page workbench refinement; Sprint 9.14 implemented and deployed home workbench density.
- Phase 18 sprints 18.34-18.43 refined the current app surface locally as a dense developer workbench and tool-specific editor suite.

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

## Implemented in Phase 18 / Sprints 18.34-18.43

- Home now adds benchmark-style dense navigation with popular tools, task shortcuts, search/category filters, session-only recent tools and footer groups for Developer Tools, Formatters, Encoders, Validators, Generators and Security.
- Public top copy now uses the short trust cue `Runs locally when possible` and removes old top-surface language about storage/logging status, planned features, billing and ads.
- Structured Data Formatter now exposes JSON/XML/YAML/CSV tabs, Format/Minify/Validate/Clear actions and raw/tree/table output views.
- Base64, JWT, Regex, Text Diff, Cron, UUID, Timestamp and Hash pages now have tool-specific controls/results: encode/decode/swap, JWT header/payload/signature cards, match counts/groups/indexes, unified/split diff, next UTC cron runs, UUID quantity with auto-generation, current timestamp/timezone cards and SHA-1/SHA-256/SHA-512 hash modes.
- UUID generation is limited to 1-50 v4 values per run; MD5 is not offered because the browser Web Crypto surface does not support it.
- Validation passed locally with `pnpm test:devutility`, `pnpm build:devutility`, `pnpm validate:devutility-preview`, `pnpm validate:public-copy` and `git diff --check`.

## Validation

- `pnpm test:devutility`
- `pnpm build:devutility`
- `pnpm validate:devutility-preview`
- `pnpm test:e2e:devutility`
- Standard structure/secrets/dry-run/ci/diff gates.

Local Sprint 7.5 validation passed with all commands above plus `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes` and `git diff --check`.

Remote Sprint 7.5 validation passed: Quality Gate `28287478977`, Deploy Dry Run `28287478989` and public smokes for Hub/control-plane/NetProbe.

Sprint 9.14 validation passed: `pnpm test:devutility`, `pnpm build:devutility`, `pnpm validate:devutility-preview`, `pnpm test:e2e:devutility`, visual smoke screenshots, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes`, `git diff --check`, Quality Gate `28331265610`, Deploy Dry Run `28331265593`, deploy `28331371180` and public/live smokes.

## Gates

- No server storage of snippets.
- No workspaces, saved history, API automation, checkout, billing or ad serving.
- No analytics values from snippets or results.
