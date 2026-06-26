# ADR 0016 - NetProbe Static Launch Gate

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 2.7 needs a public launch path for NetProbe Atlas at `https://opentshost.com/supersites/netprobe-atlas/`.

The app frontend is a Nuxt static/SSR build with tool pages, localized content and browser calls to the NetProbe API. The public lookup API still lives inside `apps/control-plane` by ADR 0014, and the existing production HostGator state keeps `control-plane` and `netprobe-atlas` as bootstrap placeholders. A static deploy that points browsers at `127.0.0.1` or at an unhealthy public API would make the tool appear clickable while failing for users.

## Decision

Create a NetProbe-specific HostGator static release path with these rules:

- Build NetProbe with `NUXT_APP_BASE_URL=/supersites/netprobe-atlas/`.
- Build NetProbe with an explicit HTTPS `NUXT_PUBLIC_NETPROBE_API_BASE_URL`.
- Validate the generated artifact for required pages, sitemap, canonical URLs, asset paths, no `noindex`, no ad/analytics integrations, no sensitive filenames and no localhost API references.
- Publish into a versioned `_netprobe-releases/<release-id>` directory under the existing remote app folder.
- Switch traffic only through the managed `.htaccess` inside `/supersites/netprobe-atlas/`.
- Preserve the remote bootstrap placeholder, `.env` files and user-managed folders.
- Require public API smoke (`GET /ip` and `POST /dns`) before a deploy action uploads or switches the release.
- Keep rollback actions available for a previous release or for returning to the bootstrap placeholder.

## Consequences

- NetProbe can be packaged and released independently from the SuperSites Hub.
- The public launch gate now fails closed when the control-plane API is not deployed or unhealthy.
- Static content can be validated without activating AdSense, GTM, GA4 or paid monitor delivery.
- A future control-plane/API deployment sprint must provide its own packaging, preservation, smoke, backup and rollback before NetProbe can be considered publicly usable.
