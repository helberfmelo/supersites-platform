# TimeNexus Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-TIMENEXUS.
- Real number: Sprint 7.6.
- Must run after: Sprint 7.5.

## Current state

- Nuxt SSG app exists with seven browser-side time/date/unit tools and five locales.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- Timezone/date UX refinement.
- Meeting planner/timeline pattern.
- SEO/AIO content and inert monetization/support structure.

## Validation

- `pnpm test:timenexus`
- `pnpm build:timenexus`
- `pnpm validate:timenexus-preview`
- `pnpm test:e2e:timenexus`
- Standard structure/secrets/dry-run/ci/diff gates.

## Execution status

- Implemented locally in Sprint 7.6.
- Added direct-answer panels, timezone/timestamp timeline, related tools, UTC/DST/calendar limit copy and gated upgrade/support panels.
- Local validation passed: unit tests, build, preview smoke, Playwright, structure, secrets, deploy dry-run, ci:changes and diff check.
- Feature push, remote Quality Gate, Deploy Dry Run, public smokes and docs-only closing commit remain to be recorded.

## Gates

- No public API/widget deployment.
- No persistent history/presets.
- No analytics values from user dates, zones or results.
