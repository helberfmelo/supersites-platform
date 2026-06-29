# Scripts

Automation scripts. Scripts must not contain real credentials.

- `ci-detect-changes.ps1`: classifies changed paths for path-aware GitHub Actions jobs.
- `prepare-deploy-dry-run.ps1`: validates `infra/deployment/apps.json` and creates a non-mutating deploy plan artifact.
- `plan-hostgator-root-mapping.ps1`: creates a non-mutating root mapping dry-run with public HTTP probes, a proposed root bridge and optional cPanel `.htaccess` metadata inspection when secrets are available in the environment.
- `plan-hostgator-release-retention.ps1`: creates a non-mutating release retention dry-run for HostGator release folders and can list cPanel release directories when secrets are available in the environment.
- `run-vps-backup-restore-drill.ps1`: creates a SuperSites-scoped Redis data backup on the VPS, extracts it into a temporary restore-test folder, compares manifests, removes only the restore extraction and writes local drill artifacts without printing credentials.
- `build-supersite-hostgator-artifact.ps1`: builds the Nuxt catalog with `/supersites/` as `NUXT_APP_BASE_URL` and validates the static artifact for HostGator.
- `validate-supersite-static-artifact.ps1`: checks the generated static catalog for subdirectory-safe assets, required pages, sitemap entries and forbidden ads/analytics markers.
- `publish-supersite-hostgator.ps1`: publishes the static catalog to a versioned HostGator release, switches the managed `.htaccess`, and supports rollback.
- `smoke-supersite-public.ps1`: validates the public HostGator catalog, Nuxt assets, localized pages and preserved site placeholders.
- `static-app-hostgator.config.ps1`: app ids, package names, API URLs and smoke markers for generic static app deploys.
- `build-static-app-hostgator-artifact.ps1`: builds any supported non-NetProbe Nuxt SSG app with `/supersites/<app>/` as `NUXT_APP_BASE_URL` and validates the artifact.
- `validate-static-app-artifact.ps1`: checks generic static app artifacts for required pages, sitemap, base-path assets, noindex, forbidden ads/analytics markers, sensitive file names and public API URLs where applicable.
- `publish-static-app-hostgator.ps1`: publishes supported static apps into versioned HostGator release directories, switches only the app `.htaccess`, and supports release/placeholder rollback.
- `smoke-static-app-public.ps1`: validates a deployed static app by `app_id`, including home/page markers, `_nuxt` assets and MailHealth/SitePulse API probes when applicable.
- `sync-github-environments.ps1`: creates GitHub environments, variables and available secrets from ignored local inventory without printing secret values.
- `validate-supersite-preview.ps1`: starts the built Nuxt catalog from `apps/supersite`, validates SSR markers and verifies `_nuxt` assets return HTTP 200.
- `validate-vps-runtime.ps1`: validates SSH access, `supersites-redis.service`, authenticated Redis `PING`, local-only Redis bind and public Redis port exposure for the HostGator VPS.

Playwright visual smoke lives in `tests/e2e/supersite.spec.ts` and writes ignored local reports under `artifacts/playwright-report`.
