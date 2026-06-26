# ADR 0010 - Control Plane API Foundation

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 1.4 starts the Laravel control plane that will coordinate portfolio sites, operational state, deploy visibility, audit trails and future paid features. The first API surface must be small, testable and compatible with both local SQLite tests and the MySQL target used by Docker/HostGator.

The platform also needs role-based access control without forcing per-site tenancy decisions too early.

## Decision

Use Laravel models and migrations as the initial control plane source of truth:

- `sites` stores the portfolio inventory and transitional URLs.
- `roles`, `permissions`, `permission_role` and `role_user` implement RBAC.
- `role_user.site_id` is nullable so roles can be global or scoped to one site.
- `audit_logs` stores ULID audit events for API actions without logging secrets or tool payloads.
- `/api/v1/me` returns the current user, roles and effective permission slugs.
- `/api/v1/sites` returns the ordered portfolio site list and records an audit event.

Authentication remains Laravel's default guard for now. Token/session strategy for the admin UI can be decided when Sprint 1.5 builds the authenticated interface.

## Consequences

- The API has a stable base for the control plane MVP without adding a separate authorization package yet.
- Site-scoped roles are possible through the nullable pivot column, while global operator/owner roles remain simple.
- Audit logging starts early and can later be expanded to deployments, billing and incidents.
- SQLite remains the fast local/CI default for feature tests; MySQL Docker remains the integration target for local stack smoke.
- Any future RBAC package migration must preserve the public permission slugs and audit history.
