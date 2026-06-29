param(
    [int] $Port = 3111
)

$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$appPath = Join-Path $repoRoot 'apps/netprobe-atlas'
$serverPath = Join-Path $appPath '.output/server/index.mjs'

if (-not (Test-Path $serverPath)) {
    throw "Nuxt server build not found at $serverPath. Run pnpm --filter @supersites/netprobe-atlas build first."
}

$serverPath = (Resolve-Path $serverPath).Path

function Stop-WindowsPreviewProcesses {
    param(
        [string] $Path,
        [int] $ExceptProcessId = 0
    )

    if (-not ($IsWindows -or $PSVersionTable.PSEdition -eq 'Desktop')) {
        return
    }

    $pathPattern = [regex]::Escape($Path)
    $slashPattern = [regex]::Escape(($Path -replace '\\', '/'))

    Get-CimInstance Win32_Process |
        Where-Object {
            $_.ProcessId -ne $ExceptProcessId -and
            $_.Name -match '^node(\.exe)?$' -and
            ($_.CommandLine -match $pathPattern -or $_.CommandLine -match $slashPattern)
        } |
        ForEach-Object {
            Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
        }
}

function Invoke-PreviewRequest {
    param(
        [string] $Uri,
        [string] $RequiredContent = '',
        [int] $Attempts = 10,
        [int] $TimeoutSec = 15
    )

    $lastError = $null

    for ($i = 0; $i -lt $Attempts; $i++) {
        try {
            $response = Invoke-WebRequest -Uri $Uri -UseBasicParsing -TimeoutSec $TimeoutSec
            if ($response.StatusCode -eq 200 -and (-not $RequiredContent -or $response.Content -match [regex]::Escape($RequiredContent))) {
                return $response
            }

            $lastError = "HTTP $($response.StatusCode) did not include required content."
        } catch {
            $lastError = $_.Exception.Message
        }

        Start-Sleep -Milliseconds 500
    }

    throw "Preview request failed for $Uri after $Attempts attempts. Last error: $lastError"
}

$node = (Get-Command node -ErrorAction Stop).Source
Stop-WindowsPreviewProcesses -Path $serverPath

$processInfo = [System.Diagnostics.ProcessStartInfo]::new()
$processInfo.FileName = $node
$processInfo.WorkingDirectory = $appPath
$processInfo.RedirectStandardOutput = $true
$processInfo.RedirectStandardError = $true
$processInfo.UseShellExecute = $false
$processInfo.Arguments = "`"$serverPath`""
$processInfo.Environment['HOST'] = '127.0.0.1'
$processInfo.Environment['PORT'] = "$Port"

$process = [System.Diagnostics.Process]::Start($processInfo)

try {
    $baseUrl = "http://127.0.0.1:$Port"
    $homeHtml = (Invoke-PreviewRequest -Uri "$baseUrl/en" -RequiredContent 'NetProbe Atlas' -Attempts 40 -TimeoutSec 3).Content

    $requiredHtml = @(
        'name="viewport"',
        'rel="canonical"',
        'hreflang="en"',
        'hreflang="pt-BR"',
        'DNS Lookup',
        'The free answer is complete',
        'Free results first'
    )

    foreach ($needle in $requiredHtml) {
        if ($homeHtml -notmatch [regex]::Escape($needle)) {
            throw "Preview HTML is missing required marker: $needle"
        }
    }

    $assetMatch = [regex]::Match($homeHtml, 'src="/(_nuxt/[^"]+\.js)"')
    if (-not $assetMatch.Success) {
        throw 'Could not find Nuxt JavaScript asset in preview HTML.'
    }

    $assetPath = $assetMatch.Groups[1].Value
    $assetResponse = Invoke-PreviewRequest -Uri "$baseUrl/$assetPath"
    if ($assetResponse.StatusCode -ne 200) {
        throw "Nuxt JavaScript asset did not return HTTP 200: $assetPath"
    }

    $tool = Invoke-PreviewRequest -Uri "$baseUrl/en/tools/dns-lookup" -RequiredContent 'How to interpret the result'
    if ($tool.StatusCode -ne 200 -or $tool.Content -notmatch 'DNS Lookup' -or $tool.Content -notmatch 'FAQPage') {
        throw 'DNS tool page smoke failed.'
    }

    $localizedTool = Invoke-PreviewRequest -Uri "$baseUrl/pt-br/tools/dns-lookup" -RequiredContent 'Consulta DNS'
    if ($localizedTool.StatusCode -ne 200 -or $localizedTool.Content -notmatch 'Como interpretar o resultado') {
        throw 'Localized DNS tool page smoke failed.'
    }

    $legal = Invoke-PreviewRequest -Uri "$baseUrl/en/privacy" -RequiredContent 'Data minimization'
    if ($legal.StatusCode -ne 200 -or $legal.Content -notmatch 'Privacy Policy') {
        throw 'Privacy page smoke failed.'
    }

    $sitemap = Invoke-PreviewRequest -Uri "$baseUrl/sitemap.xml" -RequiredContent '<urlset'
    if ($sitemap.Content -notmatch '/en/privacy' -or $sitemap.Content -notmatch '/pt-br/privacy' -or $sitemap.Content -notmatch '/de/tools/ssl-certificate-checker') {
        throw 'Sitemap smoke failed.'
    }

    Write-Host "NetProbe Atlas preview smoke passed on $baseUrl."
    Write-Host "Validated asset: /$assetPath"
} finally {
    if ($process -and -not $process.HasExited) {
        $process.Kill($true)
        $process.WaitForExit()
    }

    Stop-WindowsPreviewProcesses -Path $serverPath
}
