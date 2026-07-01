# DevUtility Lab Benchmark Notes

Data-base: 2026-06-27

## References

- CodeBeautify
- JSON formatters and validators
- Regex testing tools
- Diff tools and developer utility suites listed in the benchmark prompt

## Screenshots available

- DevUtility Playwright report screenshots are available under `artifacts/playwright-devutility-report/data/` after Sprint 7.5 local validation.
- Inspected screenshots covered home desktop, workbench mobile and privacy mobile.

## Useful patterns to learn

- Split input/output editor layout reduces friction for developers.
- Examples and one-click sample loading help first-time users.
- Clear syntax/validation errors are as important as successful output.
- Copy, download and share actions must be obvious but not noisy.
- Privacy messaging matters because developers paste tokens and secrets.

## Do not copy

- Editor styling, tool taxonomy, sample text, validation messages or code from third-party tools.

## Opportunities

- Create a consistent workbench pattern across JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp and hash tools.
- Improve error and empty states.
- Strengthen local-processing trust cues.

## Sprint 7.5 notes

- Implemented a reusable split workbench pattern with input metrics, example preset, result states, copy/download controls and privacy cue.
- Added common-error guidance and related tools on every tool page.
- Kept benchmark learning at the pattern level; no third-party copy, assets, code, layout or legal text were reused.

## Sprint 9.14 notes

- Moved the benchmark pattern from tool pages into the home first fold with a dense technical workbench before the catalog.
- Added category rail, mode selector, sample data, result metrics, tree/error views, copy/download/clear and session-only recents.
- Local and live visual QA screenshots are in `artifacts/playwright-devutility-workbench/` and cover desktop EN plus mobile PT-BR.
- The implementation remains browser-side and pattern-derived only; no third-party copy, code, assets or exact competitor layout was reused.

## Sprint 18.5 notes

- Converted the Hub catalog route `/supersites/en/sites/devutility-lab` from generic product detail into a developer workbench landing.
- The first fold now opens with a practical developer-tool promise, JSON Formatter CTA, search, category filters and short privacy cue.
- Added dense navigation to the 9 existing public DevUtility tools: JSON Formatter, Base64, JWT, Regex, Text Diff, Cron, UUID, Timestamp and Hash.
- Added local shortcut groups and footer clusters inspired by developer utility directories, without copying third-party taxonomy, text, styling or assets.
- Local evidence before deploy is in `artifacts/devutility-catalog-qa/`; desktop EN and mobile PT-BR screenshots were reviewed with 0 horizontal overflow.

## Phase 18 / Sprints 18.34-18.43 notes

- Applied benchmark patterns to the real DevUtility app home and all 9 tool pages, focusing on dense navigation, split editor/result flow, clear actions and local-processing trust cues.
- Structured Data Formatter now has JSON/XML/YAML/CSV mode tabs, Format/Minify/Validate actions and raw/tree/table output views.
- Base64, JWT, Regex, Diff, Cron, UUID, Timestamp and Hash pages now show the domain-specific result panels expected by developer utility benchmarks instead of only a generic text output.
- The work stayed pattern-derived: no third-party copy, code, assets, sample text, validation messages or exact layout were reused.
