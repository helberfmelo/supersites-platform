# ADR 0029 - Executive reports export contract

Date: 2026-06-27
Status: Accepted

## Context

Sprint 6.6 adds weekly and monthly executive reports in the control plane. The reports must be useful before real GA4, Search Console, AdSense, billing or external AI data imports are active, while still avoiding misleading status summaries, PII leakage and invented causality.

## Decision

Create `@supersites/executive-reports` as a local deterministic contract for report items, data-status summaries and CSV export shape. Every item carries a section, source, evidence references and one explicit `data_status`: `finalized`, `estimated`, `delayed` or `unavailable`. Report-level causality remains `not_inferred`; causal language blocks export readiness until a future manual evidence contract exists.

Persist report readiness in the control plane through `executive_reports` and `executive_report_items`, seeded only from local docs/runbooks/CI/public-smoke evidence. Expose `/admin/reports`, detail, print view and CSV download behind the existing `dashboard.view` permission. CSV exports include item-level data status and causality status.

## Consequences

Operators can review and export portfolio reports without enabling provider imports, email delivery, scheduled report jobs, external analytics, billing, ads, AI prompts or production workers. Future automated weekly/monthly report generation, provider data ingestion, emailed reports, revenue figures, causal attribution or scheduled workers require data-governance review, provider gates, retention rules and human approval where applicable.
