# ADR 0017 - Control Plane Public API Deploy

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 2.7 created the NetProbe Atlas static launch gate, but the real public deploy stayed blocked because `https://opentshost.com/supersites/control-plane/api/v1/netprobe/ip` returned HTTP 500 from the bootstrap HostGator state.

The NetProbe frontend cannot be useful publicly until the Laravel API answers healthy JSON for IP and DNS. The control plane is a Laravel application, not a static site, so the HostGator release strategy needs to preserve `.env`, avoid exposing source files, keep rollback available and avoid automatic migrations during the first public API deploy.

## Decision

Deploy the control-plane/API to HostGator as a versioned Laravel release under:

```text
/home1/opents62/public_html/supersites/control-plane/_control-plane-releases/<release-id>/
```

The deploy script:

- builds a local no-secret ZIP with Composer `--no-dev --classmap-authoritative`;
- validates the artifact for required Laravel files, NetProbe API routes, no `.env`, no credential-like file names and no dev dependencies;
- uploads the ZIP into a new release directory and extracts it remotely with cPanel `Fileman::fileop` `op=extract`;
- moves the temporary ZIP to cPanel trash after extraction;
- writes each release `.env` from GitHub environment secrets or ignored local inputs;
- creates the base remote `.env` only if missing and otherwise preserves it;
- protects `_control-plane-releases` with a managed `.htaccess` deny rule;
- switches the public app through a managed `/supersites/control-plane/index.php` front controller and `.htaccess`;
- runs public smoke against `/health`, `/api/v1/netprobe/ip` and `/api/v1/netprobe/dns` using `example.com`;
- supports rollback to a previous release id or to the bootstrap placeholder.

The release does not run database migrations automatically. Public NetProbe IP/DNS endpoints must operate with file cache, file sessions and sync queue until the production worker/runtime plan is completed.

## Consequences

- NetProbe public launch can proceed only after the control-plane/API deploy smoke is green.
- Secrets stay outside artifacts and Git; release `.env` values come from GitHub environment secrets or ignored local inventory.
- Direct source-code downloads from release directories are blocked by Apache rules.
- A future API split can still extract NetProbe from the control plane if it preserves the `/api/v1/netprobe` contract and release gates.
- If a migration-backed endpoint is published later, its deploy must add an explicit migration/backup gate before traffic switch.
