# ADR 0013 - HostGator static release switch

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 1.7 publishes the SuperSites Hub catalog to the transitional HostGator domain. The safe remote base is `/home1/opents62/public_html/supersites`, while direct root mapping remains sensitive because the primary domain serves `/home1/opents62/public_html`.

The Nuxt catalog is static/prerendered enough for the transitional launch, but it must be built with `/supersites/` as its base path so `_nuxt` assets, payloads and internal links resolve under the fallback URL family.

The deploy must preserve remote `.env` files and existing site placeholder folders, avoid destructive remote cleanup, run public smoke checks and provide a testable rollback path.

## Decision

Publish the catalog as versioned static releases under:

```text
/home1/opents62/public_html/supersites/_supersites-releases/<release-id>/
```

The active release is selected by a managed `.htaccess` file inside `/supersites/`. The rewrite rules:

- serve `/supersites/` from the selected release;
- serve non-physical localized routes such as `/supersites/en` from the selected release;
- serve `/supersites/_nuxt/...` and payload files from the selected release;
- leave existing physical placeholder folders such as `/supersites/netprobe-atlas/` untouched.

Root domain redirection from `https://opentshost.com/` to `/supersites/` is optional and guarded by the deploy script. It must not overwrite an unmanaged root `.htaccess` unless explicitly forced after review.

Rollback is performed by switching the managed `.htaccess` to a previous release id, or by disabling rewrites to return `/supersites/` to the bootstrap placeholder.

## Consequences

- Deploys do not delete or overwrite remote `.env` files, placeholders or user-managed folders.
- Old releases remain available for rollback until a later retention cleanup sprint.
- The first public catalog URL remains the safe fallback `https://opentshost.com/supersites/`.
- Direct site folders continue to point to placeholders until each site is implemented and launched.
- The strategy adds a small Apache rewrite dependency that must be covered by public smoke after every deploy.
