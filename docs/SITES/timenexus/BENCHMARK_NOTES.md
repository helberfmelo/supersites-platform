# TimeNexus Benchmark Notes

Data-base: 2026-06-28

## References

- timeanddate
- Time.is
- World Time Buddy
- 24timezones
- UnitConverters for conversion simplicity

## Screenshots available

- No TimeNexus-specific screenshots are present yet.

## Useful patterns to learn

- Users need a direct time/date answer first.
- Meeting planners benefit from a visual comparison timeline.
- Evergreen city/time-zone pages can be useful only if accurate and maintained.
- DST and business-day explanations reduce ambiguity.

## Do not copy

- Time-zone map assets, timeline layouts, city pages, text or branded visual systems.

## Opportunities

- Refine timezone converter and meeting planner as flagship flows.
- Add stronger educational content for UTC, DST, timestamps and business days.
- Plan city/fuso expansion carefully to avoid thin pages.

## Sprint 9.13 update

- Home now opens with a browser-side world clock and meeting planner before the catalog.
- Three curated comparison pages were added for `americas-europe`, `global-product` and `apac-europe`, each across the five public locales.
- The city/timezone SEO expansion remains deliberately small and maintained; broad programmatic city pages stay out of scope until quality and maintenance gates exist.
- Production deploy passed as Fase 9/Sprint 9.13 with run `28330387022`; live desktop/mobile UX smoke screenshots were captured under `artifacts/playwright-timenexus-planner/`.

## Sprint 18.6 catalog update

- The Hub catalog page now behaves like a public time-tools landing rather than an internal product card.
- Benchmark patterns applied: current time visible immediately, world-clock/time-zone/date-calculator navigation, dense but readable cards, and methodology/support content kept below the practical entry points.
- Production validation included final live desktop/mobile screenshots, no horizontal overflow, no clock wrapping, and 32 checked deep links for EN/PT-BR after the TimeNexus static app was redeployed.

## Sprints 18.44-18.52 tool update

- Applied benchmark patterns inside the TimeNexus app itself: answer-first tool pages, visible world-clock/time-zone/calendar/calculator/timer grouping, copyable result cards and methodology below the working result.
- The timezone page now uses source/target zone controls and a visual timeline; timestamp, percentage and unit pages recalculate while typing.
- Date, business-day and age tools expose the practical headline result first, with inclusive/exclusive, endpoint and next-birthday details close to the output.
- Kept broad timezone/city expansion, external calendars, saved presets/history, widgets/API, checkout, billing, ads and external analytics out of scope.
