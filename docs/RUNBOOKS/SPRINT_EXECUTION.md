# Sprint Execution Runbook

## Before sprint

1. Read mandatory docs listed in `AGENTS.md`.
2. Check `git status`.
3. Check current environment/production state affected by the sprint.
4. Define objective, affected files/systems, risks and validation.
5. Confirm no human-gated action is required; if required, update `docs/HUMAN_ACTION_REQUIRED.md`.

## During sprint

1. Implement in small reversible steps.
2. Keep docs, tests and status updated with the change.
3. Never edit projects of reference.
4. Never log or commit secrets.

## Validation

1. Run narrow tests first.
2. Run build/lint/typecheck when applicable.
3. Run browser/visual checks for frontend work.
4. Run smoke checks for deploy or production-impacting work.
5. Run secret scan before commit.
6. When VPS runtime changes, run `scripts/validate-vps-runtime.ps1`.
7. When deployment files change, run `scripts/prepare-deploy-dry-run.ps1`.

## Commit, push and deploy

Only after validation:

1. Commit with a clear title.
2. Push.
3. Monitor CI/deploy to final status.
4. Validate public URL or production smoke.
5. Update `docs/STATUS.md`.
6. Read mandatory docs before starting next sprint.

## Sprint cadence for page-by-page execution

- These cadence rules are mandatory for Phase 18 and the following benchmark page-by-page cycles after the roadmap is approved.
- Execute one sprint at a time as a closed loop: implement, validate, commit, push, monitor HostGator deploy, run public smoke, then move to the next sprint.
- Keep commits and pushes objective. Group related code, tests and documentation for the sprint instead of fragmenting the same fix across unnecessary commits.
- Prefer one implementation commit and one short documentation closeout commit per sprint. Add extra corrective commits only when CI, deploy, live visual QA or public smoke exposes a concrete defect.
- Do not split an approved sprint into repeated handoffs for planning, partial checks or visual guesses. Once the mandatory context is read, finish the sprint loop unless a stop condition below is hit.
- Keep chat updates concise during the loop. Put detailed evidence, run ids, assets, screenshots and crawler reports in the closing docs instead of turning the delivery into many fragmented status handoffs.
- Do not start the next sprint while the current sprint has failing CI, failing deploy, failing public smoke or unresolved benchmark-grade visual acceptance.
- When smoke markers fail because public copy intentionally changed, update the smoke marker in the same correction and redeploy before continuing.
- When a Hub/catalog sprint exposes deep links into a static app, validate those public app routes before closing the sprint. If production still points to a stale app release, deploy that static app in the same sprint cycle, rerun the aggregate public smoke and rerun the benchmark crawler before continuing.
- Keep route-like fields (`path`, `href`, `slug`, `url`, `canonical`, `locale`, time zone ids and equivalent technical keys) outside natural-language accent/sanitization rewrites. Visible labels may be localized; route fields must remain byte-stable and must be checked in generated/public HTML when i18n code changes.
- For benchmark-grade UI changes, do not close the sprint with only local screenshots. Capture or inspect the live production route after the HostGator switch, including desktop and mobile, and fix visible layout issues such as wrapping, overflow, stale copy or benchmark-incoherent navigation before documentation closeout.
- Keep progress updates concise while deploys run. Record detailed evidence in docs/status after the sprint is objectively green, not as fragmented handoffs between small subtasks.
- When the project owner corrects cadence, commit strategy, deploy monitoring or acceptance expectations, register the process rule in this runbook, `docs/OPERATING_CONTEXT.md`, the active roadmap or the relevant site notes during sprint closeout before starting the next sprint.
- Close the sprint with documentation in the same cycle: update roadmap/status/metrics and site notes after the live validation is green, then commit/push that closeout before reading mandatory docs for the next sprint.

## Stop conditions

- Failed deploy.
- Failed production smoke.
- Security risk.
- Data-loss risk.
- Unclear production ownership.
- Human-gated action blocking the sprint.
