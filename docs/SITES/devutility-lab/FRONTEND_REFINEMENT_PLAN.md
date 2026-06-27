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

- Prepare workspaces, snippets, history, teams and API as gated paid backlog.

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

## Dashboard backlog

- Local-processing coverage.
- Tool state completeness.
- Workspaces/API upgrade readiness.
