# SuperSites

Portfolio monorepo for the SuperSites hub, control plane and the first ten utility sites.

Mandatory reading before any sprint:

1. `AGENTS.md`
2. `docs/MEGA_PROMPT_SUPERSITES.md`
3. `docs/OPERATING_CONTEXT.md`
4. `docs/STATUS.md`
5. `docs/ROADMAP.md`
6. `docs/ARCHITECTURE.md`
7. `docs/SECURITY.md`
8. `docs/DATA_GOVERNANCE.md`
9. `docs/ADSENSE_PLAYBOOK.md`
10. `docs/SEO_AIO_PLAYBOOK.md`
11. Current ADRs in `docs/ADR/`
12. `docs/METRICS.md`

The project is intentionally starting as a monorepo. Deployments, databases, environments, secrets and rollback plans remain independent per app/site.

## Bootstrap validation

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-no-secrets.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-structure.ps1
```

The first GitHub Actions gate runs the same safety checks. Application lint, tests, build and deploy checks will be added as the Laravel/Nuxt skeletons are created.
