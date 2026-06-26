# ADR 0005 - Repository quality gate

Status: Accepted

## Context

Sprint 0.2 needs a private GitHub repository, first commit, push and monitorable validation before application code exists.

The repository already has governance docs, local Docker files and environment scripts, but no Laravel, Nuxt or package manifests yet.

## Decision

Create a minimal GitHub Actions quality gate on `main` and pull requests.

The bootstrap gate validates:

1. No obvious secrets are committed outside ignored credential paths.
2. Mandatory repository structure exists.

Application-specific lint, typecheck, tests, build, deploy and smoke checks will be added when the Laravel/Nuxt skeletons exist.

## Consequences

- The first push is monitorable without inventing fake app tests.
- Secret hygiene is enforced from the first commit.
- Branch protection can require `Quality Gate / Repository safety` after the first successful run, if GitHub plan/API permissions allow it. The first attempt on 2026-06-26 returned HTTP 403 because private branch protection requires GitHub Pro or a public repository on the current account.
- The gate remains intentionally small until real app code exists.
