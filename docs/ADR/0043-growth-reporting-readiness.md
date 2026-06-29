# ADR 0043 - Growth reporting readiness

## Status

Accepted on 2026-06-29.

## Context

Phase 16 closes the continuous growth loop with weekly/monthly reporting, but real
provider imports, recurring delivery, external recipients, revenue reporting and
causal attribution remain gated by data governance, legal/terms review, vault
secrets, retention policy and human approval.

The platform already has seeded executive reports and item-level evidence. It
needs an authenticated reporting readiness view that can summarize before/after
review candidates and data status without scheduling or sending anything.

## Decision

Add a growth reporting readiness contract for Sprint 16.4.

- `@supersites/executive-reports` exports `growthReportingContractVersion` and
  `resolveGrowthReportingGate`.
- The control-plane exposes `GET /api/v1/growth/reporting-readiness` behind
  authentication and `dashboard.view`.
- `GrowthReportingReadiness` reads existing `executive_reports`,
  `executive_report_items` and `growth_provider_ingestions`.
- Reports can be marked `review_ready` only when they are export-ready,
  evidence-backed and keep `causality_status=not_inferred`.
- Every snapshot reports `side_effects=none`, recurring delivery disabled,
  external recipient delivery disabled, provider import disabled, revenue
  reporting disabled and causal inference disabled.

## Consequences

Operators can review weekly/monthly growth reporting, data status and
before/after-ready items without sending email, starting a scheduler, importing
provider data, consuming revenue records or making causal claims.

Real scheduled reports, external recipients, provider-backed revenue/traffic
imports, before/after claims and causal attribution require explicit human
approval, a data-governance matrix, retention/export/delete policy, green CI and
deployment smoke/rollback controls.
