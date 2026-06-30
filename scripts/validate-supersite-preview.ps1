param(
    [int] $Port = 3101
)

$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$appPath = Join-Path $repoRoot 'apps/supersite'
$serverPath = Join-Path $appPath '.output/server/index.mjs'

if (-not (Test-Path $serverPath)) {
    throw "Nuxt server build not found at $serverPath. Run pnpm --filter @supersites/supersite build first."
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
    $homeHtml = (Invoke-PreviewRequest -Uri "$baseUrl/en" -RequiredContent 'SuperSites' -Attempts 40 -TimeoutSec 3).Content

    $requiredHtml = @(
        'name="viewport"',
        'rel="canonical"',
        'hreflang="pt-BR"',
        'application/ld+json',
        'Find the right web tool in seconds.',
        'Free tools ready to use',
        'No account required',
        'Explore focused tool suites',
        'Support the free network',
        '/supersites/netprobe-atlas/en/tools/what-is-my-ip',
        'Choose by workflow',
        'NetProbe Atlas'
    )

    foreach ($needle in $requiredHtml) {
        if ($homeHtml -notmatch [regex]::Escape($needle)) {
            throw "Preview HTML is missing required marker: $needle"
        }
    }

    $forbiddenHomeHtml = @(
        'A curated operating network',
        'Top public tools',
        'Free tools first',
        '10 utility sites live',
        'Upgrade path',
        'Available</span>',
        'Preview</span>',
        'tool tracks',
        'quality checks',
        'billing disabled',
        'ads planned'
    )

    foreach ($needle in $forbiddenHomeHtml) {
        if ($homeHtml -match [regex]::Escape($needle)) {
            throw "Preview HTML contains public operational marker that must stay off the Hub home: $needle"
        }
    }

    $assetMatch = [regex]::Match($homeHtml, 'src="/((?:supersites/)?_nuxt/[^"]+\.js)"')
    if (-not $assetMatch.Success) {
        throw 'Could not find Nuxt JavaScript asset in preview HTML.'
    }

    $assetPath = $assetMatch.Groups[1].Value
    $assetResponse = Invoke-PreviewRequest -Uri "$baseUrl/$assetPath"
    if ($assetResponse.StatusCode -ne 200) {
        throw "Nuxt JavaScript asset did not return HTTP 200: $assetPath"
    }

    $detail = Invoke-PreviewRequest -Uri "$baseUrl/en/sites/netprobe-atlas" -RequiredContent 'Network diagnostics you can start now.'
    if ($detail.StatusCode -ne 200 -or $detail.Content -notmatch 'Network diagnostics you can start now.') {
        throw 'NetProbe Atlas detail page smoke failed.'
    }

    $calcHarborDetail = Invoke-PreviewRequest -Uri "$baseUrl/en/sites/calcharbor" -RequiredContent 'Find the right calculator before the spreadsheet.'
    if ($calcHarborDetail.StatusCode -ne 200 -or $calcHarborDetail.Content -notmatch 'Find the right calculator before the spreadsheet.') {
        throw 'CalcHarbor detail page smoke failed.'
    }

    $devUtilityDetail = Invoke-PreviewRequest -Uri "$baseUrl/en/sites/devutility-lab" -RequiredContent 'Format, inspect and compare code snippets locally.'
    if ($devUtilityDetail.StatusCode -ne 200 -or $devUtilityDetail.Content -notmatch 'Format, inspect and compare code snippets locally.') {
        throw 'DevUtility Lab detail page smoke failed.'
    }

    $timeNexusDetail = Invoke-PreviewRequest -Uri "$baseUrl/en/sites/timenexus" -RequiredContent 'Plan time across cities, dates and calendars.'
    if ($timeNexusDetail.StatusCode -ne 200 -or $timeNexusDetail.Content -notmatch 'Plan time across cities, dates and calendars.') {
        throw 'TimeNexus detail page smoke failed.'
    }

    $qrRouteDetail = Invoke-PreviewRequest -Uri "$baseUrl/en/sites/qrroute" -RequiredContent 'Generate a QR code or campaign asset with a live preview.'
    if ($qrRouteDetail.StatusCode -ne 200 -or $qrRouteDetail.Content -notmatch 'Generate a QR code or campaign asset with a live preview.') {
        throw 'QRRoute detail page smoke failed.'
    }

    $invoiceCraftDetail = Invoke-PreviewRequest -Uri "$baseUrl/en/sites/invoicecraft" -RequiredContent 'Create a client document and download a local PDF.'
    if ($invoiceCraftDetail.StatusCode -ne 200 -or $invoiceCraftDetail.Content -notmatch 'Create a client document and download a local PDF.') {
        throw 'InvoiceCraft detail page smoke failed.'
    }

    $mailHealthDetail = Invoke-PreviewRequest -Uri "$baseUrl/en/sites/mailhealth" -RequiredContent 'Domain health report'
    if ($mailHealthDetail.StatusCode -ne 200 -or $mailHealthDetail.Content -notmatch 'Domain health report') {
        throw 'MailHealth detail page smoke failed.'
    }

    $sitePulseDetail = Invoke-PreviewRequest -Uri "$baseUrl/en/sites/sitepulse-lab" -RequiredContent 'Website status report'
    if ($sitePulseDetail.StatusCode -ne 200 -or $sitePulseDetail.Content -notmatch 'Website status report') {
        throw 'SitePulse Lab detail page smoke failed.'
    }

    $legal = Invoke-PreviewRequest -Uri "$baseUrl/en/privacy" -RequiredContent 'Data categories'
    if ($legal.StatusCode -ne 200 -or $legal.Content -notmatch 'Privacy Policy') {
        throw 'Privacy page smoke failed.'
    }

    $cookies = Invoke-PreviewRequest -Uri "$baseUrl/en/cookies" -RequiredContent 'Cookie categories'
    if ($cookies.StatusCode -ne 200 -or $cookies.Content -notmatch 'Cookie Policy' -or $cookies.Content -notmatch '#consent-preferences') {
        throw 'Cookie Policy page smoke failed.'
    }

    $terms = Invoke-PreviewRequest -Uri "$baseUrl/en/terms" -RequiredContent 'Permitted use'
    if ($terms.StatusCode -ne 200 -or $terms.Content -notmatch 'Terms of Use' -or $terms.Content -notmatch 'Future paid services') {
        throw 'Terms of Use page smoke failed.'
    }

    $methodology = Invoke-PreviewRequest -Uri "$baseUrl/en/methodology" -RequiredContent 'Network and DNS'
    if ($methodology.StatusCode -ne 200 -or $methodology.Content -notmatch 'Methodology' -or $methodology.Content -notmatch 'Email deliverability') {
        throw 'Methodology page smoke failed.'
    }

    $sitemap = Invoke-PreviewRequest -Uri "$baseUrl/sitemap.xml" -RequiredContent '<urlset'
    if ($sitemap.Content -notmatch '/en/privacy' -or $sitemap.Content -notmatch '/de/editorial-policy') {
        throw 'Sitemap smoke failed.'
    }

    Write-Host "SuperSites preview smoke passed on $baseUrl."
    Write-Host "Validated asset: /$assetPath"
} finally {
    if ($process -and -not $process.HasExited) {
        $process.Kill($true)
        $process.WaitForExit()
    }

    Stop-WindowsPreviewProcesses -Path $serverPath
}
