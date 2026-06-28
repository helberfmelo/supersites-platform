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
- Sprint 9.13 local acceptance: home workbench is above catalog; world-clock group page opens with the selected group; desktop/mobile visual smoke shows no overflow, no console errors, no storage and no analytics events.

## Dashboard backlog

- Timezone fixture coverage.
- Meeting planner readiness.
- Widget/API upsell readiness.

## Sprint 9.13 execution

- Implemented `TimeNexusPlanner` with current time panel, city group selector, source zone, duration, UTC instant, business-hour status and nearby slots.
- Added curated world-clock group pages for Americas + Europe, Global product team and APAC + Europe.
- Validation passed locally with unit tests, build, preview smoke, Playwright, visual screenshots and standard platform gates.
- Production deploy and live UX smoke passed in run `28330387022`, with screenshots `sprint-9-13-timenexus-live-desktop.png` and `sprint-9-13-timenexus-live-world-clock-mobile.png`.
