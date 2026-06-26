# ADR 0002 - HostGator transitional deploy

Status: Proposed

## Context

The temporary public domain is `opentshost.com`.

The desired remote base is `/home1/opents62/public_html/supersites/`, while the desired public URLs are the root catalog `https://opentshost.com/` and site folders such as `https://opentshost.com/netprobe-atlas`.

On shared HostGator, the primary domain commonly serves `/home1/opents62/public_html`.

## Decision

Use HostGator as the transitional production target, but validate the URL mapping before publishing:

1. Store app files under `/public_html/supersites/`.
2. Configure root rewrite/alias/symlink or a small root front controller only after confirming the safest cPanel-supported method.
3. Keep fallback URLs under `/supersites/<site>` if root mapping is not safe.

## Consequences

- Avoids unexpected overwrite of existing `public_html` content.
- Makes the mapping ambiguity explicit before deploy.
- Requires a bootstrap sprint before public launch.

