# Growth Automation Readiness Runbook

## Scope

Sprint 16.3 adds an authenticated, fail-closed readiness view for low-risk
growth work that may be reviewed by an operator for a future pull request.

Endpoint:

- `GET /api/v1/growth/automation-readiness`

Access:

- authenticated user
- `dashboard.view`

## Contract

Contract version:

- `GrowthAutomationReadiness::CONTRACT_VERSION` `2026-06-29.16.3`
- `@supersites/ai-growth growthAutomationContractVersion`

Status values:

- `pr_review_only`: evidence-backed, non-human-gated and `risk_score <= 2`
- `human_required`: blocked by an explicit human gate
- `blocked`: missing evidence, blocked source status, missing risk score, risk
  above the low-risk threshold or external AI review required

The snapshot always reports:

- `side_effects=none`
- `provider_activation=false`
- `automatic_branch_creation_enabled=false`
- `automatic_pr_creation_enabled=false`
- `auto_merge_enabled=false`
- `direct_publish_enabled=false`
- `branches_created=0`
- `pull_requests_opened=0`
- `auto_merges_executed=0`
- `publications_executed=0`
- `should_create_branch=false`
- `should_open_pull_request=false`
- `should_auto_merge=false`
- `should_publish=false`

## Operating Rules

Use this endpoint only as an operator queue. It does not authorize automated
execution.

Before any real branch/PR automation:

- provider/data source gates must be approved when real provider data is used;
- the recommendation must remain evidence-backed and low risk;
- CI, deploy dry-run and public smokes must be green;
- review ownership and rollback must be explicit;
- `docs/HUMAN_ACTION_REQUIRED.md` must show the gate as resolved.

Never use this readiness view to:

- create a branch automatically;
- open a pull request automatically;
- auto-merge;
- publish public content;
- mutate SEO, ads, billing, donation, affiliate or provider settings;
- call external AI;
- import provider data.

## Validation

Focused:

```powershell
pnpm --filter @supersites/ai-growth test
php artisan test --filter=GrowthAutomationReadinessTest
```

Governed sprint:

```powershell
pnpm test:packages
pnpm typecheck:packages
php artisan test
composer validate --strict
pnpm measure:admin-audit
pnpm deploy:build-control-plane-hostgator
pnpm validate:structure
pnpm validate:secrets
pnpm deploy:dry-run
pnpm ci:changes
git diff --check
pnpm validate:adsense-safe-public
```
