# ADR 0006 - Local stack scaffold

Status: Accepted

## Context

Sprint 0.3 creates the first runnable application skeletons after repository governance was established.

The root prompt requires Laravel 13, Nuxt 4, Vue 3, TypeScript, MySQL 8.4, Redis, Docker Compose and GitHub Actions. Local audits on 2026-06-26 confirmed Node 24, pnpm 11, PHP 8.5 and Composer 2.9 are available on the workstation. Registry/package checks confirmed Nuxt 4.4.8, Vue 3.5.39 and Laravel 13 packages are available.

## Decision

Use:

- `pnpm@11.9.0` as the Node workspace package manager.
- Nuxt `4.4.8` for `apps/supersite`.
- Vue `3.5.39` and TypeScript `6.0.3`.
- Laravel `13.x` for `apps/control-plane`.
- `predis/predis` `^3.0` so local Redis works without requiring the PHP Redis extension.
- MySQL Docker on `127.0.0.1:3317`, Redis Docker on `127.0.0.1:6381` and Mailpit on `127.0.0.1:1035/8035`.

The Laravel health endpoint can run in two modes:

1. App-only mode for CI and fast tests.
2. Connection-check mode for local smoke against Docker MySQL and Redis.

## Consequences

- CI can test the skeleton without external services.
- Local smoke still validates Docker database and Redis connectivity.
- Nuxt and Laravel are both present early, but product functionality remains intentionally minimal until Sprint 1.1+.
- HostGator production remains untouched in this sprint.
