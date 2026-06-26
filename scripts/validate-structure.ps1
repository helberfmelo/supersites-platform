$ErrorActionPreference = "Stop"

$requiredPaths = @(
    "AGENTS.md",
    "README.md",
    ".gitignore",
    ".github/workflows/quality-gate.yml",
    ".github/workflows/deploy-dry-run.yml",
    "package.json",
    "pnpm-workspace.yaml",
    "pnpm-lock.yaml",
    "docs/MEGA_PROMPT_SUPERSITES.md",
    "docs/OPERATING_CONTEXT.md",
    "docs/STATUS.md",
    "docs/ROADMAP.md",
    "docs/ARCHITECTURE.md",
    "docs/SECURITY.md",
    "docs/DATA_GOVERNANCE.md",
    "docs/SEO_AIO_PLAYBOOK.md",
    "docs/ADSENSE_PLAYBOOK.md",
    "docs/ANALYTICS.md",
    "docs/BILLING.md",
    "docs/METRICS.md",
    "docs/HUMAN_ACTION_REQUIRED.md",
    "docs/ADR/0008-ci-cd-dry-run-foundation.md",
    "docs/RUNBOOKS/CI_CD.md",
    "docs/RUNBOOKS/SPRINT_EXECUTION.md",
    "docs/RUNBOOKS/VPS_RUNTIME.md",
    "docs/ADR/0007-vps-runtime-isolation.md",
    "apps/supersite",
    "apps/supersite/package.json",
    "apps/supersite/nuxt.config.ts",
    "apps/supersite/app/app.vue",
    "apps/supersite/app/components/CatalogHome.vue",
    "apps/supersite/app/components/LanguageNav.vue",
    "apps/supersite/app/data/copy.ts",
    "apps/supersite/app/data/locales.ts",
    "apps/supersite/app/data/routes.ts",
    "apps/supersite/app/data/sites.ts",
    "apps/supersite/app/pages/index.vue",
    "apps/supersite/app/pages/[locale]/index.vue",
    "apps/supersite/app/pages/[locale]/sites/[slug].vue",
    "apps/supersite/tests/catalog.test.ts",
    "apps/control-plane",
    "apps/control-plane/artisan",
    "apps/control-plane/composer.json",
    "apps/control-plane/composer.lock",
    "apps/control-plane/routes/web.php",
    "apps/control-plane/tests/Feature/HealthTest.php",
    "apps/netprobe-atlas",
    "apps/calcharbor",
    "apps/devutility-lab",
    "apps/timenexus",
    "apps/qrroute",
    "apps/invoicecraft",
    "apps/mailhealth",
    "apps/sitepulse-lab",
    "apps/pixelbatch",
    "apps/docshift",
    "packages/ui",
    "packages/seo",
    "packages/i18n",
    "packages/analytics",
    "packages/ads",
    "packages/consent",
    "packages/auth",
    "packages/billing",
    "packages/cms",
    "packages/ai-growth",
    "packages/security",
    "packages/testing",
    "infra/docker/compose.local.yml",
    "infra/deployment/apps.json",
    "infra/deployment/README.md",
    "infra/environments/local/databases.md",
    "infra/environments/production/hostgator/README.md",
    "infra/environments/production/vps/README.md",
    "scripts/hostgator-bootstrap.ps1",
    "scripts/ci-detect-changes.ps1",
    "scripts/prepare-deploy-dry-run.ps1",
    "scripts/sync-github-environments.ps1",
    "scripts/validate-hostgator-bootstrap.ps1",
    "scripts/validate-supersite-preview.ps1",
    "scripts/validate-vps-runtime.ps1"
)

$missing = @()
foreach ($path in $requiredPaths) {
    if (-not (Test-Path -LiteralPath $path)) {
        $missing += $path
    }
}

if ($missing.Count -gt 0) {
    $missing | ForEach-Object { Write-Error "Missing required path: $_" }
    throw "Required repository structure is incomplete."
}

$adrCount = (Get-ChildItem -Path "docs/ADR" -Filter "*.md" -File | Measure-Object).Count
if ($adrCount -lt 8) {
    throw "Expected at least 8 ADR files, found $adrCount."
}

Write-Host "Required repository structure is present."
