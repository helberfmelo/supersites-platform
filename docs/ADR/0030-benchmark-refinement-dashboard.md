# ADR 0030 - Benchmark refinement dashboard

Date: 2026-06-27
Status: Accepted

## Context

Phase 7 turns the benchmark prompt, screenshots and per-site refinement plans into an executable growth backlog. The control plane already tracks Google, AdSense, billing, AI growth and executive reports as local readiness data, but benchmark readiness and per-site opportunities were still only documented in markdown.

The dashboard must help operators prioritize frontend, SEO/AIO, monetization and AdSense-readiness work without implying that GA4, Search Console, AdSense, billing, donations, affiliates or external AI are active.

## Decision

Add benchmark refinement storage to the Laravel control plane:

- `benchmark_site_readiness` records estimated benchmark, SEO/AIO, AdSense, monetization, frontend, performance and overall scores per public surface.
- `benchmark_opportunities` records the per-site opportunity backlog with priority, impact, effort, confidence, risk, data status, evidence and human-gate status.
- Both tables store only local evidence references, planning scores and operational flags.
- `external_provider_active`, `real_ads_enabled`, `real_billing_enabled` and `automation_enabled` remain false in the Sprint 7.2 seed data.
- `/admin/benchmark-refinement` uses the existing `dashboard.view` permission and records audit logs on view.
- The public Hub can show compact non-provider catalog signals, but it must not expose internal score claims as real traffic, revenue or provider metrics.

## Consequences

Operators can review benchmark readiness and backlog directly in the control plane before each technical refinement sprint. The data remains estimated and evidence-backed until real measurements are available.

Future provider imports, automated recommendations, public score publication, donation links, affiliate links, AdSense serving, checkout, paid entitlements or external AI still require the existing human gates, data-governance review and deploy/smoke/rollback controls.
