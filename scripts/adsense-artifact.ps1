$script:AdSenseSnippetMarker = "pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
$script:ExternalAdsOrAnalyticsMarkerPattern = "(?i)adsbygoogle|pagead2\.googlesyndication\.com|googletagmanager|google-analytics|doubleclick|ca-pub-\d+"

function Get-AdSenseClientFromEnvironment {
    $client = if ($null -eq $env:SUPERSITES_ADSENSE_CLIENT) { "" } else { $env:SUPERSITES_ADSENSE_CLIENT.Trim() }
    if (-not $client) {
        return ""
    }

    if ($client -notmatch "^ca-pub-\d+$") {
        throw "SUPERSITES_ADSENSE_CLIENT must match ca-pub-<digits>."
    }

    return $client
}

function Add-AdSenseSnippetToArtifact {
    param(
        [string]$Root,
        [string]$Client
    )

    if (-not $Client) {
        return 0
    }

    $snippet = "<script async src=""https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=$Client"" crossorigin=""anonymous""></script>"
    $htmlFiles = Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "*.html"
    $updated = 0

    foreach ($file in $htmlFiles) {
        $content = Get-Content -Raw -LiteralPath $file.FullName
        if ($content -match [regex]::Escape($script:AdSenseSnippetMarker)) {
            continue
        }

        if ($content -notmatch "(?i)</head>") {
            throw "Cannot insert AdSense snippet because '</head>' was not found in '$($file.FullName)'."
        }

        $updatedContent = [regex]::Replace($content, "(?i)</head>", "$snippet</head>", 1)
        Set-Content -LiteralPath $file.FullName -Value $updatedContent -Encoding UTF8
        $updated++
    }

    return $updated
}

function Remove-AllowedAdSenseSnippet {
    param(
        [string]$Content,
        [string]$Client
    )

    if (-not $Client) {
        return $Content
    }

    $snippet = "<script async src=""https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=$Client"" crossorigin=""anonymous""></script>"
    return $Content -replace [regex]::Escape($snippet), ""
}

function Assert-NoDisallowedExternalAdsOrAnalyticsMarkers {
    param(
        [string]$Content,
        [string]$Context
    )

    $client = Get-AdSenseClientFromEnvironment
    $contentToValidate = Remove-AllowedAdSenseSnippet -Content $Content -Client $client

    if ($contentToValidate -match $script:ExternalAdsOrAnalyticsMarkerPattern) {
        $allowedLabel = if ($client) { " except the approved AdSense snippet for $client" } else { "" }
        throw "$Context contains an external ads or analytics integration marker$allowedLabel."
    }
}
