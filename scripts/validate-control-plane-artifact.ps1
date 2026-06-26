param(
    [string]$ArtifactPath = "artifacts/control-plane-hostgator/release",
    [string]$ZipPath = "artifacts/control-plane-hostgator/control-plane-hostgator.zip",
    [string]$PublicBaseUrl = "https://opentshost.com/supersites/control-plane/",
    [string]$ReleaseId = ""
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$artifactFullPath = Resolve-Path (Join-Path $repoRoot $ArtifactPath)
$zipFullPath = Join-Path $repoRoot $ZipPath

if (-not (Test-Path -LiteralPath $artifactFullPath -PathType Container)) {
    throw "Control-plane artifact directory not found: $ArtifactPath"
}

if (-not (Test-Path -LiteralPath $zipFullPath -PathType Leaf)) {
    throw "Control-plane artifact zip not found: $ZipPath"
}

$requiredFiles = @(
    "artisan",
    "composer.json",
    "composer.lock",
    "bootstrap/app.php",
    "config/app.php",
    "public/index.php",
    "public/.htaccess",
    "routes/api.php",
    "vendor/autoload.php"
)

foreach ($file in $requiredFiles) {
    $fullPath = Join-Path $artifactFullPath $file
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
        throw "Control-plane artifact is missing required file: $file"
    }
}

$requiredDirectories = @(
    "app",
    "bootstrap/cache",
    "config",
    "database",
    "public",
    "routes",
    "storage",
    "storage/framework/cache",
    "storage/framework/cache/data",
    "storage/framework/sessions",
    "storage/framework/views",
    "storage/logs",
    "vendor"
)

foreach ($directory in $requiredDirectories) {
    $fullPath = Join-Path $artifactFullPath $directory
    if (-not (Test-Path -LiteralPath $fullPath -PathType Container)) {
        throw "Control-plane artifact is missing required directory: $directory"
    }
}

$files = Get-ChildItem -LiteralPath $artifactFullPath -Recurse -Force -File
$relativeFiles = $files | ForEach-Object {
    $_.FullName.Substring($artifactFullPath.Path.Length).TrimStart("\", "/") -replace "\\", "/"
}

$disallowedFiles = $relativeFiles | Where-Object {
    $_ -match "(^|/)\.env(?:\..*)?$" -or
    $_ -match "(^|/)\.phpunit\.result\.cache$" -or
    $_ -match "\.(?:pem|key|p12|pfx)$"
}

if ($disallowedFiles) {
    throw "Control-plane artifact contains disallowed sensitive/test files: $($disallowedFiles -join ', ')"
}

$disallowedDirectories = @(
    "node_modules",
    "tests",
    "vendor/fakerphp",
    "vendor/mockery",
    "vendor/nunomaduro/collision",
    "vendor/phpunit",
    "vendor/sebastian",
    "vendor/theseer",
    "vendor/phar-io"
)

foreach ($directory in $disallowedDirectories) {
    if (Test-Path -LiteralPath (Join-Path $artifactFullPath $directory)) {
        throw "Control-plane artifact contains dev-only directory: $directory"
    }
}

$apiRoutes = Get-Content -Raw -LiteralPath (Join-Path $artifactFullPath "routes/api.php")
foreach ($needle in @("netprobe", "ClientIpController", "DnsLookupController")) {
    if ($apiRoutes -notmatch [regex]::Escape($needle)) {
        throw "Control-plane API routes do not contain expected NetProbe marker: $needle"
    }
}

$publicIndex = Get-Content -Raw -LiteralPath (Join-Path $artifactFullPath "public/index.php")
if ($publicIndex -notmatch "vendor/autoload.php") {
    throw "Control-plane public/index.php does not load Composer autoload."
}

$artifactTextFiles = $files | Where-Object {
    $_.Extension -in @(".php", ".json", ".md", ".txt", ".xml", ".yml", ".yaml", ".ini", ".htaccess")
}

$forbiddenMarkers = @(
    "SUPERSITES_CPANEL_PASSWORD",
    "SuperSites bootstrap placeholder"
)

foreach ($file in $artifactTextFiles) {
    $content = Get-Content -Raw -LiteralPath $file.FullName
    foreach ($marker in $forbiddenMarkers) {
        if ($content -match [regex]::Escape($marker)) {
            $relativePath = $file.FullName.Substring($artifactFullPath.Path.Length).TrimStart("\", "/") -replace "\\", "/"
            throw "Control-plane artifact contains forbidden marker '$marker' in $relativePath"
        }
    }
}

$zipInfo = Get-Item -LiteralPath $zipFullPath
if ($zipInfo.Length -le 0) {
    throw "Control-plane artifact zip is empty."
}

$totalBytes = ($files | Measure-Object Length -Sum).Sum
$basePath = ([Uri]$PublicBaseUrl).AbsolutePath.TrimEnd("/")
if (-not $basePath) {
    $basePath = "/"
}

Write-Host "Control-plane artifact validation passed: $($files.Count) files, $totalBytes bytes, zip $($zipInfo.Length) bytes, base path '$basePath'."
if ($ReleaseId) {
    Write-Host "Control-plane release candidate: $ReleaseId"
}
