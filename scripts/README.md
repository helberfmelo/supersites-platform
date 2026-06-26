# Scripts

Automation scripts. Scripts must not contain real credentials.

- `ci-detect-changes.ps1`: classifies changed paths for path-aware GitHub Actions jobs.
- `prepare-deploy-dry-run.ps1`: validates `infra/deployment/apps.json` and creates a non-mutating deploy plan artifact.
- `build-supersite-hostgator-artifact.ps1`: builds the Nuxt catalog with `/supersites/` as `NUXT_APP_BASE_URL` and validates the static artifact for HostGator.
- `validate-supersite-static-artifact.ps1`: checks the generated static catalog for subdirectory-safe assets, required pages, sitemap entries and forbidden ads/analytics markers.
- `publish-supersite-hostgator.ps1`: publishes the static catalog to a versioned HostGator release, switches the managed `.htaccess`, and supports rollback.
- `smoke-supersite-public.ps1`: validates the public HostGator catalog, Nuxt assets, localized pages and preserved site placeholders.
- `sync-github-environments.ps1`: creates GitHub environments, variables and available secrets from ignored local inventory without printing secret values.
- `validate-supersite-preview.ps1`: starts the built Nuxt catalog from `apps/supersite`, validates SSR markers and verifies `_nuxt` assets return HTTP 200.
- `validate-vps-runtime.ps1`: validates SSH access, `supersites-redis.service`, authenticated Redis `PING`, local-only Redis bind and public Redis port exposure for the HostGator VPS.

Playwright visual smoke lives in `tests/e2e/supersite.spec.ts` and writes ignored local reports under `artifacts/playwright-report`.
