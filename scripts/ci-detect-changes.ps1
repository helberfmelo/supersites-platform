param(
    [string]$BaseSha = $env:BASE_SHA,
    [string]$HeadSha = $env:HEAD_SHA
)

$ErrorActionPreference = "Stop"

function ConvertTo-CiBool {
    param([bool]$Value)
    if ($Value) { return "true" }
    return "false"
}

function Write-GitHubOutput {
    param(
        [string]$Name,
        [string]$Value
    )

    if ($env:GITHUB_OUTPUT) {
        Add-Content -LiteralPath $env:GITHUB_OUTPUT -Value "$Name=$Value"
    }
}

function Test-ZeroSha {
    param([string]$Sha)
    return -not $Sha -or $Sha -match "^0+$"
}

$head = if ($HeadSha) { $HeadSha } else { (git rev-parse HEAD).Trim() }
$base = $BaseSha
$runAll = $false

if (Test-ZeroSha $base) {
    $runAll = $true
    $changedFiles = git ls-files
} else {
    git cat-file -e "$base^{commit}" 2>$null
    if ($LASTEXITCODE -ne 0) {
        $runAll = $true
        $changedFiles = git ls-files
    } else {
        $changedFiles = git diff --name-only $base $head
    }
}

$changedFiles = @($changedFiles | Where-Object { $_ })

if ($changedFiles.Count -eq 0) {
    $changedFiles = @()
}

$frontendPatterns = @(
    "^apps/supersite/",
    "^packages/",
    "^package\.json$",
    "^pnpm-lock\.yaml$",
    "^pnpm-workspace\.yaml$"
)

$backendPatterns = @(
    "^apps/control-plane/",
    "^packages/",
    "^composer\.json$",
    "^composer\.lock$"
)

$deploymentPatterns = @(
    "^\.github/workflows/",
    "^infra/",
    "^scripts/"
)

$docsPatterns = @(
    "^docs/",
    "^AGENTS\.md$",
    "^README\.md$"
)

function Test-AnyMatch {
    param(
        [string[]]$Files,
        [string[]]$Patterns
    )

    foreach ($file in $Files) {
        foreach ($pattern in $Patterns) {
            if ($file -match $pattern) {
                return $true
            }
        }
    }

    return $false
}

function Test-AllMatch {
    param(
        [string[]]$Files,
        [string[]]$Patterns
    )

    if ($Files.Count -eq 0) {
        return $false
    }

    foreach ($file in $Files) {
        $matched = $false
        foreach ($pattern in $Patterns) {
            if ($file -match $pattern) {
                $matched = $true
                break
            }
        }

        if (-not $matched) {
            return $false
        }
    }

    return $true
}

$frontend = $runAll -or (Test-AnyMatch -Files $changedFiles -Patterns $frontendPatterns)
$backend = $runAll -or (Test-AnyMatch -Files $changedFiles -Patterns $backendPatterns)
$deployment = $runAll -or (Test-AnyMatch -Files $changedFiles -Patterns $deploymentPatterns)
$docsOnly = (-not $runAll) -and (Test-AllMatch -Files $changedFiles -Patterns $docsPatterns)

Write-GitHubOutput -Name "run_all" -Value (ConvertTo-CiBool $runAll)
Write-GitHubOutput -Name "frontend_supersite" -Value (ConvertTo-CiBool $frontend)
Write-GitHubOutput -Name "backend_control_plane" -Value (ConvertTo-CiBool $backend)
Write-GitHubOutput -Name "deployment" -Value (ConvertTo-CiBool $deployment)
Write-GitHubOutput -Name "docs_only" -Value (ConvertTo-CiBool $docsOnly)

$summary = [ordered]@{
    base = $base
    head = $head
    runAll = $runAll
    frontendSupersite = $frontend
    backendControlPlane = $backend
    deployment = $deployment
    docsOnly = $docsOnly
    changedFiles = $changedFiles
}

$summary | ConvertTo-Json -Depth 4
