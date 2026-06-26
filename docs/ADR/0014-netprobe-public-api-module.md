# ADR 0014 - NetProbe Public API Module

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 2.2 needs public IP and DNS lookup APIs before NetProbe Atlas has a separate deployable Laravel application. The repository already contains a Laravel control plane with API routing, tests, cache configuration and CI coverage.

Creating a second Laravel app now would duplicate bootstrap, environment, CI and deployment work before the product API contract is stable.

## Decision

Implement the first NetProbe public lookup API as a bounded module inside `apps/control-plane` under `/api/v1/netprobe/*`.

The module must:

- expose only public unauthenticated lookup endpoints needed by the current sprint;
- use a dedicated `netprobe-public` rate limiter;
- keep DNS resolving behind a replaceable service so SSRF/private-range tests are deterministic;
- cache public DNS answers with short TTLs using the configured Laravel cache store;
- avoid storing visitor IPs or raw lookup inputs in analytics or audit logs;
- remain separable later if NetProbe needs its own Laravel runtime.

## Consequences

- Sprint 2.2 can ship a tested Laravel API without creating another app skeleton.
- The control plane temporarily hosts a public product API, so routing, rate limits and logging must stay explicit.
- A future split into a site-specific backend must preserve the `/api/v1/netprobe` response contracts or provide a migration path.
