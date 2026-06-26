# ADR 0011 - Control Plane Blade MVP

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 1.5 needs a usable authenticated control plane quickly: dashboard, site inventory management, deploy visibility, incident/task visibility and audit trail.

The target architecture allows Vue/Inertia for admin surfaces when it simplifies the product, but the current control plane has only the Laravel skeleton and no established front-end admin design system. Adding Inertia now would increase setup and validation surface before the first dashboard workflows exist.

## Decision

Build the first control plane MVP with server-rendered Laravel Blade views:

- session login/logout with request throttling;
- custom `permission` middleware backed by existing RBAC slugs;
- `/admin` dashboard with portfolio, deployment, incident, task and audit snapshots;
- `/admin/sites` inventory plus create/edit flows for portfolio site records;
- audit logging for login, dashboard views and site create/update actions.

Keep the UI quiet, dense and operational. Defer Vue/Inertia until admin workflows need richer client interaction.

## Consequences

- The dashboard is useful immediately and covered by Laravel feature tests.
- The control plane avoids a second front-end stack while the data model is still settling.
- Later Vue/Inertia migration remains possible because routes, permissions and data contracts are explicit.
- Visual validation still matters; use browser/Playwright smoke for key admin screens before release.
