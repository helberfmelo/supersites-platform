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

## Commit, push and deploy

Only after validation:

1. Commit with a clear title.
2. Push.
3. Monitor CI/deploy to final status.
4. Validate public URL or production smoke.
5. Update `docs/STATUS.md`.
6. Read mandatory docs before starting next sprint.

## Stop conditions

- Failed deploy.
- Failed production smoke.
- Security risk.
- Data-loss risk.
- Unclear production ownership.
- Human-gated action blocking the sprint.

