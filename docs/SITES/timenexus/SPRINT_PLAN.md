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

## Gates

- No public API/widget deployment.
- No persistent history/presets.
- No analytics values from user dates, zones or results.
