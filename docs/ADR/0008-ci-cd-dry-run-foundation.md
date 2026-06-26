# ADR 0008 - CI/CD dry-run foundation

Status: Accepted

## Context

Sprint 0.5 starts the deployment foundation. The platform already has a private GitHub repository, a quality gate, HostGator placeholders and an isolated VPS Redis runtime.

Real application deployment is still risky because the catalog and control plane are skeletal, direct root URL mapping is unresolved, rollback scripts are not implemented and remote `.env` preservation rules are not automated yet.

The user instructed that obstacles should be worked around and execution should continue.

## Decision

Create a CI/CD foundation that is useful now without publishing application code prematurely:

1. Keep `Quality Gate` as the required safety workflow, but split it into path-aware jobs.
2. Always run repository safety checks.
3. Run Nuxt and Laravel app checks only when their paths, shared packages or deployment files change.
4. Add a separate `Deploy Dry Run` workflow that generates a deploy plan artifact and does not mutate production.
5. Store deploy topology in `infra/deployment/apps.json`.
6. Add a secret/environment synchronization script that writes only to GitHub environments and never prints secret values.
7. Keep real deploy disabled until artifact packaging, remote preservation, smoke and rollback are implemented.

## Consequences

- CI is faster for documentation-only changes while still enforcing repository safety.
- Deployment topology becomes versioned and reviewable.
- The deploy workflow can be monitored without risking remote files.
- Missing branch protection remains a GitHub plan limitation, but monitored CI runs continue to provide operational safety.
- Real deploy needs another sprint before application files are uploaded to HostGator.
