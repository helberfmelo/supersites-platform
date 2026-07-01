# DevUtility Lab Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Turn the developer tools into a fast local workbench with clear input/output, examples, errors and copy/download actions.

## P0

- Add split editor pattern where useful.
- Add example presets and reset controls.
- Improve validation messages and empty/loading/success states.
- Add copy/download affordances with keyboard-accessible controls.
- Keep privacy cue visible near the tool surface.

## P1

- Add tool grouping and related-tool navigation.
- Add mode toggles where tools have format/validate/minify variants.

## P2

- Prepare saved runs, workspaces, teams, larger files and API automation as later product depth.

## Impact expected

Better task completion and stronger trust for sensitive developer workflows.

## Technical risk

Medium because editor-like UI can bloat bundles or create mobile overflow.

## AdSense/compliance risk

Medium; ad/support blocks must not sit near editors, errors or copy buttons.

## Tests needed

- DevUtility unit tests/build.
- Preview smoke and Playwright desktop/mobile.
- Check no snippets/results enter analytics or browser storage.

## Acceptance metrics

- Editors do not overflow on mobile.
- Errors are actionable and do not echo secrets unnecessarily.
- Copy/download states are stable.

## Sprint 7.5 implementation status

- P0 implemented locally: split input/output workbench, example preset/reset, empty/running/success/error states, copy/download actions and privacy cue near the editor.
- P1 partially implemented locally: related tools are shown per tool page using the existing catalog taxonomy.
- P2 remains gated: workspaces, snippets, private history, teams, API, larger files and billing are not active.
- Playwright desktop/mobile screenshots were inspected under `artifacts/playwright-devutility-report/data/`; no incoherent overlap or horizontal overflow was observed.

## Sprint 9.14 benchmark-grade status

- Home catalog-first gap addressed in production: `DevUtilityWorkbench` now appears before search/catalog with dense category rail and a selected tool ready to run.
- The home workbench includes editor/result split, example preset, reset/clear/run, output/tree/error views, copy/download controls and a full-tool-page link.
- Recent tools are session-only in memory; no snippet, result, recent list or payload is persisted or sent to analytics/API from the home workbench.
- Local validation, Quality Gate, Deploy Dry Run, labeled HostGator deploy and public/live smokes passed; screenshots are in `artifacts/playwright-devutility-workbench/`.

## Phase 18 / Sprints 18.34-18.43 status

- Home density was expanded beyond the existing workbench with popular tools, task shortcuts, search/category filters and footer groups for Developer Tools, Formatters, Encoders, Validators, Generators and Security.
- Tool detail pages now have specialized editor controls instead of one generic run form: structured-data actions and output views, Base64 encode/decode/swap, JWT decoded cards, regex match table, split/unified diff, cron UTC runs, UUID quantity, timestamp timezone cards and hash algorithm tabs.
- Copy was cleaned on primary surfaces: the visible trust cue is `Runs locally when possible`; top panels no longer use old storage/logging status, planned-feature, billing or ads language.
- The tool engine now supports UUID quantity limits and SHA-512 hashing; MD5 remains intentionally unavailable because Web Crypto does not support it.
- Local validation passed with DevUtility unit tests, DevUtility build, DevUtility preview smoke, public-copy and `git diff --check`. Local Playwright/screenshots were not run because this was not a QA/pre-disclosure/visual-closure stage.

## Sprint 18.5 catalog route status

- Hub catalog route P0 addressed locally: `/supersites/en/sites/devutility-lab` now behaves like a developer workbench directory instead of a product sheet.
- It includes task-first H1, JSON Formatter primary CTA, search, category filters, pinned local shortcuts, all-tools grid and deep footer links to existing DevUtility tool pages.
- Acceptance gates added: unit copy contract, Playwright desktop EN/mobile PT-BR, preview smoke marker and public smoke marker for the canonical catalog route.
- Local validation passed with 17 Hub unit tests, 12 Hub Playwright tests, Hub build/preview, public-copy, AdSense-safe, package tests/typechecks, structure, secrets, deploy dry-run, CI change detection, HostGator artifact build and visual screenshots in `artifacts/devutility-catalog-qa/`.

## Dashboard backlog

- Local-processing coverage.
- Tool state completeness.
- Saved runs/workspaces/API readiness.
