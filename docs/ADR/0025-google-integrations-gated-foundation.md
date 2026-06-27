# ADR 0025 - Google integrations gated foundation

Date: 2026-06-27

## Status

Accepted.

## Context

Sprint 6.2 requires readiness for GA4, Google Tag Manager and Search Console
without activating external analytics before human access, domain verification,
consent and production configuration exist. The portfolio also needs one
standard event vocabulary across sites and a control-plane view of which sites
are still blocked.

## Decision

- Keep the Google provider contract in `@supersites/analytics`, next to the
  existing PII-safe event contract.
- Add an explicit Google gate that fails closed unless the environment is
  production, human approval is recorded, analytics consent exists, tag delivery
  is enabled, GA4/GTM ids are configured and Search Console ownership is
  verified.
- Export GA4-compatible event names and a narrow provider parameter allowlist.
  Arbitrary event properties are not forwarded to Google even after the gate
  opens.
- Store per-site Google readiness metadata in `google_integrations`, including
  status fields, configured ids and allowed event names. The table stores no
  OAuth tokens, service-account keys or verification secrets.
- Seed all current sites as `human_required`/`not_configured`, with tags and
  imports disabled.
- Surface the readiness state in the control-plane dashboard for operators.

## Consequences

- No GA4, GTM or Search Console script/API import is activated by this sprint.
- Google account access, property/container creation and ownership verification
  remain `HUMAN_ACTION_REQUIRED`.
- Future activation can reuse the existing event contract and readiness table
  instead of introducing provider-specific event names in each app.
