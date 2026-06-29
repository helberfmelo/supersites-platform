# ADR 0035 - Paid monitor preview foundation

## Status

Accepted on 2026-06-29.

## Context

Phase 14 needs an authenticated upgrade preview for recurring monitoring across NetProbe, MailHealth and SitePulse without turning on paid checkout, workers, real alert delivery, history retention or customer billing. NetProbe already has a persisted monitor MVP, but MailHealth and SitePulse should not receive persistent monitor tables or recurring jobs until operational gates are complete.

## Decision

Add authenticated monitor preview endpoints at `/api/v1/monitoring/previews` behind `operations.manage`.

The preview catalog exposes NetProbe Atlas, MailHealth and SitePulse Lab plans, monitor types, local entitlement quotas and explicit disabled states for checkout, workers and alert delivery. The preview creation endpoint validates a target, normalizes hostname/URL shape, enforces entitlement quota, returns a target hash and records only an audit hash. It does not persist MailHealth/SitePulse monitors, queue jobs, send alerts or create billing usage.

`monitor-types` entitlements now cover:

- NetProbe Atlas: `dns`, `ssl`, `domain`
- MailHealth: `dns`, `blacklist`, `smtp`
- SitePulse Lab: `status`, `headers`, `robots`, `sitemap`

## Consequences

- Users with operations permission can inspect upgrade behavior without activating recurring monitoring.
- Free public one-shot tools remain available without signup.
- Real paid monitoring still requires worker/runtime, backup/restore, alert policy, terms, retention, billing provider and smoke/rollback gates.
- Audit logs store target hashes only; raw targets are returned in the immediate authenticated response but are not persisted by preview.
