# ADR 0015 - NetProbe Monitoring MVP

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 2.6 starts the paid-value layer for NetProbe Atlas: DNS, SSL and domain monitors, history, alerts, quotas and an initial API.

The public lookup API still runs inside `apps/control-plane` by ADR 0014. There is no production billing account, customer portal, separate NetProbe backend deploy, or approved outbound webhook worker runtime yet. The VPS Redis runtime exists, but backup/restore and production worker deploy gates are still pending.

## Decision

Implement the monitoring MVP inside `apps/control-plane` as a bounded module:

- `net_probe_monitors` stores authenticated monitor definitions and normalized targets.
- `net_probe_monitor_checks` stores point-in-time check history and bounded response summaries.
- `net_probe_alerts` stores alert attempts with hashed destinations and delivery status.
- Authenticated API endpoints under `/api/v1/netprobe/monitors` are protected by `operations.manage` until customer auth/billing exists.
- `netprobe:dispatch-due-monitors` is scheduled every five minutes and dispatches `RunNetProbeMonitorCheck` jobs to the `netprobe-monitors` queue.
- The job uses retry/backoff metadata and delegates check execution to reusable DNS/RDAP/SSL services.
- Email alerts are queueable for local/dev delivery through the configured mailer.
- Webhook alerts are implemented behind an explicit `NETPROBE_ALERT_WEBHOOK_ENABLED` gate and require public HTTPS host validation before outbound delivery.
- A `free_preview` quota in config limits monitor creation until real billing/entitlements are implemented.

## Consequences

- The upgrade value is testable locally without activating billing, AdSense or external integrations.
- Monitor targets become account-scoped operational data and must not be sent to analytics, GA4, GTM or AdSense.
- Production worker rollout still requires deploy packaging, queue runtime, backup/restore and smoke gates.
- A future NetProbe-specific backend can extract this module if it preserves monitor/check/alert semantics and the API contract.
