# TimeNexus Sprint Plan

Data-base: 2026-06-28

## Real sprint

- Symbol: BR-TIMENEXUS.
- Real number: Sprint 7.6.
- Must run after: Sprint 7.5.

## Current state

- Nuxt SSG app exists with seven browser-side time/date/unit tools and five locales.
- Public URL is live under `/supersites/timenexus/`.
- Sprint 9.13 adds a task-first world clock and meeting planner above the catalog plus three curated world-clock group pages across five locales.

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

- Completed in Sprint 7.6.
- Added direct-answer panels, timezone/timestamp timeline, related tools, UTC/DST/calendar limit copy and gated upgrade/support panels.
- Local validation passed: unit tests, build, preview smoke, Playwright, structure, secrets, deploy dry-run, ci:changes and diff check.
- Feature commit `64b883d`, Quality Gate `28287972198`, Deploy Dry Run `28287972209` and public smokes for Hub/control-plane/NetProbe passed.
- Sprint 9.13 local validation passed with `TimeNexusPlanner`, 15 curated world-clock route variants, `pnpm test:timenexus` (10 tests), build, preview smoke asset `/_nuxt/BFWW5Bb9.js`, Playwright, visual smoke, package gates, `validate:public-copy` across 891 HTML files, structure, secrets, deploy dry-run, ci:changes and diff check.
- Sprint 9.13 production closeout passed: feature commit `e74a9d9`, Quality Gate `28330255418`, Deploy Dry Run `28330255414`, HostGator deploy `28330387022`, release `e74a9d934f68ebd16806e4f826b8ab6b089a3c18-28330387022-1`, asset `https://opentshost.com/supersites/timenexus/_nuxt/DSDvC2kq.js`, public smokes and live UX smoke.

## Gates

- No public API/widget deployment.
- No persistent history/presets.
- No analytics values from user dates, zones or results.
- No mass city/timezone pages; only three curated group pages were added to avoid thin content.

## Sprint 13.2 product depth

- Status: concluded on `main`, with remote CI/public-smoke closure and no real static app deploy triggered.
- Added 8 curated city/timezone pages: `new-york`, `sao-paulo`, `london`, `berlin`, `san-francisco`, `tokyo`, `singapore` and `sydney`.
- Added 40 localized city page variants across EN/PT-BR/ES/FR/DE, with canonical, hreflang, sitemap inclusion, `WebPage`/`Place` JSON-LD, visible business-day timeline and 09:00 local overlap snapshot.
- Added the `Curated city clocks` home section so city pages are internally linked instead of sitemap-only.
- Validation passed locally: `pnpm test:timenexus` (11 tests), `pnpm build:timenexus` (137 configured prerender routes / 273 generated artifacts including payloads), `pnpm validate:timenexus-preview` (asset `/_nuxt/AoDGD3Ez.js`), `pnpm test:e2e:timenexus`, `pnpm validate:public-copy` (951 HTML files), `pnpm validate:adsense-safe-public`, structure/secrets/deploy-dry-run/ci/diff gates.
- Remote closure passed: feature commit `6abcda5`, Quality Gate `28354017920`, Deploy Dry Run `28354017921`, aggregate/TimeNexus/NetProbe/control-plane public smokes against the current production baseline, current TimeNexus public asset `https://opentshost.com/supersites/timenexus/_nuxt/BAXbawo1.js`.
- No all-IANA timezone generation, external calendar provider, public widget/API, saved history, persistent storage, worker, cron, checkout, billing, ads, donation, affiliate or external analytics was activated.

## Sprints 18.44-18.52 page-by-page refinement

- Status: implemented locally as the TimeNexus Tools stage.
- Home now includes a task directory for World Clock, Time Zones, Calendar, Calculators and Timers plus footer groups for cities, time zones, dates, calendars and converters.
- Tool pages now auto-run their examples into a direct answer panel; timezone conversion has source/target zone selects, timeline and copy/link actions.
- Timestamp, percentage and unit converters update while typing; timestamp results expose Unix seconds, Unix milliseconds, ISO, UTC, local and selected-zone cards with copy actions.
- Date Difference gained exclusive/inclusive modes and compact timeline facts; Business Days gained include/exclude endpoint modes plus the holiday-calendar notice; Age Calculator shows total days, next birthday and days until.
- Unit Converter groups modes by Length, Weight and Temperature.
- Public copy removed top-level `No accounts or storage`, billing and ads-inactive language; paid depth remains framed as future widgets/API/presets/collaboration.
- Local validation passed: `pnpm test:timenexus`, `pnpm build:timenexus`, `pnpm validate:timenexus-preview` and `pnpm test:e2e:timenexus` after the remote Quality Gate exposed stale selectors.
- No external calendar provider, persistent history, widget/API, checkout, billing, ad serving, donation, affiliate, external analytics, worker/cron or deploy was activated.
