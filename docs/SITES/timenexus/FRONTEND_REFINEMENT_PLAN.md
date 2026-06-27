# TimeNexus Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make time/date tools immediate for casual users and precise enough for scheduling-heavy users.

## P0

- Refine timezone converter with clear source/target locations and immediate converted time.
- Add meeting planner/timeline pattern using lightweight UI.
- Improve date difference, business days and timestamp result summaries.
- Add related tools below each result.

## P1

- Add example presets for common workflows.
- Add DST warning states where the browser/runtime can support them reliably.

## P2

- Plan widgets, embeds, presets and API as gated paid backlog.

## Impact expected

Higher utility for repeated scheduling searches and better upgrade fit for widgets/API.

## Technical risk

Medium because timezone/DST behavior needs careful fixtures.

## AdSense/compliance risk

Low to medium; keep placements away from controls and results.

## Tests needed

- Timezone/date fixtures.
- TimeNexus build, preview and Playwright.
- No analytics values from dates/zones/results.

## Acceptance metrics

- Converted result is obvious above the fold.
- DST/locale limitations are visible.
- Related tools present per page.

## Dashboard backlog

- Timezone fixture coverage.
- Meeting planner readiness.
- Widget/API upsell readiness.
