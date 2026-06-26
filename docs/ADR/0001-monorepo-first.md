# ADR 0001 - Monorepo first

Status: Accepted

## Context

The root prompt recommends one private monorepo because the hub, control plane and ten sites share design system, SEO, i18n, analytics, ads, consent, auth, billing, CMS, security and testing.

The user also asked for private repositories for SuperSites and each site according to the execution plan.

## Decision

Start with one private repository: `supersites-platform`.

Do not create one repository per site at bootstrap. Extract a site later only if it has independent team, technology, compliance, release cadence or business need.

## Consequences

- Faster shared foundation.
- Lower duplicated CI/CD and dependency work.
- Per-site deployment, database, secrets and rollback still remain separate.
- Future extraction remains possible and should get a new ADR.

