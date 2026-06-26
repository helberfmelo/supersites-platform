param(
    [string]$ManifestPath = "infra/deployment/apps.json",
    [string]$SourcePath = "apps/control-plane",
    [string]$ArtifactPath = "artifacts/control-plane-hostgator/release",
    [string]$ZipPath = "artifacts/control-plane-hostgator/control-plane-hostgator.zip",
    [string]$ReleaseId = "",
    [string]$PublicBaseUrl = "https://opentshost.com/supersites/control-plane/"
)

$ErrorActionPreference = "Stop"

function Assert-UnderPath {
    param(
        [string]$Path,
        [string]$ExpectedParent
    )

    $resolved = [IO.Path]::GetFullPath($Path)
    $parent = [IO.Path]::GetFullPath($ExpectedParent).TrimEnd([IO.Path]::DirectorySeparatorChar, [IO.Path]::AltDirectorySeparatorChar)
    if (-not $resolved.StartsWith($parent, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to operate outside expected path. Path: $resolved Parent: $parent"
    }
}

function Convert-ToRelativePath {
    param(
        [string]$BasePath,
        [string]$FullPath
    )

    return $FullPath.Substring($BasePath.TrimEnd("\", "/").Length).TrimStart("\", "/") -replace "\\", "/"
}

function Should-SkipArtifactPath {
    param(
        [IO.FileSystemInfo]$Item,
        [string]$RelativePath
    )

    $topSegment = ($RelativePath -split "/")[0]
    if ($topSegment -in @("vendor", "node_modules", "tests")) {
        return $true
    }

    if ($Item.PSIsContainer) {
        return $false
    }

    if ($Item.Name -in @(".env", ".env.example", ".phpunit.result.cache", "phpunit.xml", "package.json", "package-lock.json", "vite.config.js", "README.md")) {
        return $true
    }

    if ($RelativePath -match "^storage/(?:logs|framework/(?:cache/data|sessions|views))/" -and $Item.Name -ne ".gitignore") {
        return $true
    }

    if ($RelativePath -eq "database/database.sqlite") {
        return $true
    }

    return $false
}

function Copy-ArtifactTree {
    param(
        [string]$SourceRoot,
        [string]$DestinationRoot
    )

    $sourceRootFull = (Resolve-Path -LiteralPath $SourceRoot).Path
    $items = Get-ChildItem -LiteralPath $sourceRootFull -Force -Recurse

    foreach ($item in $items) {
        $relativePath = Convert-ToRelativePath -BasePath $sourceRootFull -FullPath $item.FullName
        if (Should-SkipArtifactPath -Item $item -RelativePath $relativePath) {
            continue
        }

        $destination = Join-Path $DestinationRoot $relativePath
        if ($item.PSIsContainer) {
            New-Item -ItemType Directory -Force -Path $destination | Out-Null
            continue
        }

        New-Item -ItemType Directory -Force -Path (Split-Path $destination -Parent) | Out-Null
        Copy-Item -LiteralPath $item.FullName -Destination $destination -Force
    }
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$manifestFullPath = Join-Path $repoRoot $ManifestPath
if (-not (Test-Path -LiteralPath $manifestFullPath)) {
    throw "Deployment manifest not found: $ManifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $manifestFullPath | ConvertFrom-Json
$app = $manifest.apps | Where-Object { $_.id -eq "control-plane" } | Select-Object -First 1
if (-not $app) {
    throw "Deployment manifest does not contain the control-plane app."
}

$sourceFullPath = Resolve-Path (Join-Path $repoRoot $SourcePath)
$artifactRoot = Join-Path $repoRoot "artifacts/control-plane-hostgator"
$artifactFullPath = Join-Path $repoRoot $ArtifactPath
$zipFullPath = Join-Path $repoRoot $ZipPath

Assert-UnderPath -Path $artifactRoot -ExpectedParent (Join-Path $repoRoot "artifacts")
Assert-UnderPath -Path $artifactFullPath -ExpectedParent $artifactRoot
Assert-UnderPath -Path $zipFullPath -ExpectedParent $artifactRoot

if (Test-Path -LiteralPath $artifactRoot) {
    Remove-Item -LiteralPath $artifactRoot -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $artifactFullPath | Out-Null

Copy-ArtifactTree -SourceRoot $sourceFullPath -DestinationRoot $artifactFullPath

$runtimeDirectories = @(
    "bootstrap/cache",
    "storage/app/private",
    "storage/app/public",
    "storage/framework/cache/data",
    "storage/framework/sessions",
    "storage/framework/views",
    "storage/logs"
)

foreach ($directory in $runtimeDirectories) {
    New-Item -ItemType Directory -Force -Path (Join-Path $artifactFullPath $directory) | Out-Null
}

$composerCommand = Get-Command composer -ErrorAction Stop
Push-Location $artifactFullPath
try {
    & $composerCommand.Source install --no-dev --no-interaction --prefer-dist --no-progress --classmap-authoritative
    if ($LASTEXITCODE -ne 0) {
        throw "composer install --no-dev failed for control-plane artifact."
    }
}
finally {
    Pop-Location
}

$metadata = [ordered]@{
    schemaVersion = 1
    appId = "control-plane"
    releaseId = $ReleaseId
    createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    gitSha = (git rev-parse HEAD).Trim()
    publicBaseUrl = $PublicBaseUrl.TrimEnd("/")
    sourcePath = $SourcePath
    preservation = @(
        "Artifact excludes .env and credential files.",
        "Production .env is managed remotely and must be preserved across releases.",
        "Deploy switches only the managed .htaccess file in /supersites/control-plane/.",
        "Database migrations are not run automatically by this static/API release script."
    )
}

$metadata | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $artifactFullPath "control-plane-release.json") -Encoding UTF8

New-Item -ItemType Directory -Force -Path (Split-Path $zipFullPath -Parent) | Out-Null
if (Test-Path -LiteralPath $zipFullPath) {
    Remove-Item -LiteralPath $zipFullPath -Force
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($artifactFullPath, $zipFullPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)

& (Join-Path $repoRoot "scripts/validate-control-plane-artifact.ps1") `
    -ArtifactPath $ArtifactPath `
    -ZipPath $ZipPath `
    -PublicBaseUrl $PublicBaseUrl `
    -ReleaseId $ReleaseId

Write-Host "Control-plane HostGator artifact ready at $artifactFullPath"
Write-Host "Control-plane HostGator zip ready at $zipFullPath"
