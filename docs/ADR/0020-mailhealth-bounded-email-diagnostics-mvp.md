# ADR 0020 - MailHealth bounded email diagnostics MVP

Date: 2026-06-27

## Status

Accepted

## Context

Sprint 4.3 starts MailHealth, a workflow-paid product for email authentication and deliverability diagnostics. The free MVP must solve the basic need without mandatory signup: SPF, DKIM, DMARC, MX, blacklist, SMTP and header analysis.

Some checks require DNS, DNSBL or SMTP network access. These features carry abuse, SSRF, provider-policy and privacy risk, while paid monitoring, alerts, DMARC report ingestion, batches, API and white-label features still lack billing, entitlements, account retention rules and production worker gates.

## Decision

Build MailHealth Sprint 4.3 as:

- a Nuxt SSG/browser app in `apps/mailhealth` with seven localized tools;
- browser-only raw header analysis, with no backend call and no browser storage;
- bounded public control-plane API endpoints under `/api/v1/mailhealth/*` for DNS, DNSBL sample and SMTP checks;
- a dedicated `mailhealth-public` rate limiter;
- reuse of the existing `NetProbeHostGuard`, DNS resolver and TCP probe contracts;
- cache TTLs, public-host validation, private/reserved range blocking, small DNSBL zone/address limits and SMTP TCP-only probing;
- analytics limited to tool lifecycle metadata and `tool_slug`, never domains, selectors, headers, mail hosts or results.

No production worker, cron, account, billing, alert delivery, DMARC report ingestion, external analytics, AdSense placement or real MailHealth traffic switch is activated in Sprint 4.3.

## Consequences

The free MVP is useful locally/CI while keeping network access bounded and testable. The control-plane temporarily hosts MailHealth public probes, similar to the earlier NetProbe module pattern, until a separate backend is justified.

Before real public launch or paid workflow activation, MailHealth still needs app-specific HostGator artifact validation, public smoke, rollback, provider-policy review for DNSBL usage, account/billing/entitlement gates, retention/export/deletion rules, monitoring, alert delivery controls and legal review.
