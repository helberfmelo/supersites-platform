# ADR 0012 - Analytics Event Contract

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 1.6 starts product analytics before any external GA4, AdSense or billing integration exists. The platform needs a shared event vocabulary for the public catalog and future tools, but the project rules forbid sending PII to analytics, logs or observability.

The first useful event is `outbound_site_click`, because the public catalog already links to each temporary HostGator site path. Future utility sites will need tool lifecycle events such as `tool_viewed`, `tool_started` and `tool_completed`.

## Decision

Create `@supersites/analytics` as the source-first TypeScript package for:

- versioned event names;
- client/server event shapes;
- data layer payloads;
- path and URL sanitization;
- PII-key filtering and value redaction.

Mirror the same event whitelist and sanitization rules in the Laravel control plane:

- `POST /api/v1/analytics/events` accepts only allowed event names and stores sanitized internal events;
- anonymous/session identifiers are hashed before storage;
- `analytics_events` stores event facts without raw PII;
- `metric_snapshots` stores internal aggregates with source/status metadata;
- `GET /api/v1/metric-snapshots` is authenticated and requires `dashboard.view`.

The Nuxt catalog only pushes events to `window.supersitesAnalyticsEvents` and `window.dataLayer` for now. No external analytics provider is activated until consent, GA4/GTM setup and human-gated account decisions are ready.

## Consequences

- All future sites should import `@supersites/analytics` instead of inventing event names.
- Data layer payloads are available for later GTM/GA4 integration without changing public UI code.
- Internal ingestion can be tested locally without depending on Google APIs or AdSense approval.
- The contract is intentionally conservative; richer dimensions require explicit allowlist updates and tests.
