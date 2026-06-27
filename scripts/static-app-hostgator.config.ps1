$script:StaticHostgatorAppIds = @(
    "calcharbor",
    "devutility-lab",
    "timenexus",
    "qrroute",
    "invoicecraft",
    "mailhealth",
    "sitepulse-lab",
    "pixelbatch",
    "docshift"
)

function Normalize-StaticBasePath {
    param(
        [string]$Value,
        [switch]$TrailingSlash
    )

    $normalized = if ($null -eq $Value) { "/" } else { $Value.Trim() }
    if (-not $normalized -or $normalized -eq "/") {
        return "/"
    }

    $normalized = "/" + $normalized.Trim("/")
    if ($TrailingSlash) {
        return "$normalized/"
    }

    return $normalized
}

function Convert-RouteToArtifactFile {
    param([string]$RoutePath)

    $normalized = $RoutePath.Trim("/")
    if (-not $normalized) {
        return "index.html"
    }

    if ($normalized -match "\.[A-Za-z0-9]+$") {
        return $normalized
    }

    return "$normalized/index.html"
}

function Get-StaticHostgatorLaunchAppIds {
    return $script:StaticHostgatorAppIds
}

function Get-StaticHostgatorAppConfig {
    param([string]$AppId)

    $configs = @{
        "calcharbor" = [ordered]@{
            AppId = "calcharbor"
            DisplayName = "CalcHarbor"
            PackageName = "@supersites/calcharbor"
            ReleaseFolder = "_static-releases"
            ApiEnvName = ""
            ApiBaseUrl = ""
            HomeMarker = "CalcHarbor"
            RequiredFiles = @("index.html", "en/index.html", "en/calculators/loan-payment/index.html", "pt-br/calculators/roi/index.html", "sitemap.xml")
            RequiredMarkers = @("CalcHarbor", "Loan payment", "ROI")
            SmokePages = @(
                @{ Path = "en"; Marker = "CalcHarbor" },
                @{ Path = "en/calculators/loan-payment"; Marker = "Loan" },
                @{ Path = "pt-br/calculators/roi"; Marker = "ROI" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
        "devutility-lab" = [ordered]@{
            AppId = "devutility-lab"
            DisplayName = "DevUtility Lab"
            PackageName = "@supersites/devutility-lab"
            ReleaseFolder = "_static-releases"
            ApiEnvName = ""
            ApiBaseUrl = ""
            HomeMarker = "DevUtility Lab"
            RequiredFiles = @("index.html", "en/index.html", "en/tools/jwt-inspector/index.html", "pt-br/tools/timestamp-converter/index.html", "sitemap.xml")
            RequiredMarkers = @("DevUtility Lab", "JWT", "Timestamp")
            SmokePages = @(
                @{ Path = "en"; Marker = "DevUtility Lab" },
                @{ Path = "en/tools/jwt-inspector"; Marker = "JWT" },
                @{ Path = "pt-br/tools/timestamp-converter"; Marker = "Timestamp" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
        "timenexus" = [ordered]@{
            AppId = "timenexus"
            DisplayName = "TimeNexus"
            PackageName = "@supersites/timenexus"
            ReleaseFolder = "_static-releases"
            ApiEnvName = ""
            ApiBaseUrl = ""
            HomeMarker = "TimeNexus"
            RequiredFiles = @("index.html", "en/index.html", "en/tools/timezone-converter/index.html", "pt-br/tools/timestamp-converter/index.html", "sitemap.xml")
            RequiredMarkers = @("TimeNexus", "Timezone", "Timestamp")
            SmokePages = @(
                @{ Path = "en"; Marker = "TimeNexus" },
                @{ Path = "en/tools/timezone-converter"; Marker = "Timezone" },
                @{ Path = "pt-br/tools/timestamp-converter"; Marker = "Timestamp" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
        "qrroute" = [ordered]@{
            AppId = "qrroute"
            DisplayName = "QRRoute"
            PackageName = "@supersites/qrroute"
            ReleaseFolder = "_static-releases"
            ApiEnvName = ""
            ApiBaseUrl = ""
            HomeMarker = "QRRoute"
            RequiredFiles = @("index.html", "en/index.html", "en/tools/static-qr-code/index.html", "pt-br/tools/utm-builder/index.html", "sitemap.xml")
            RequiredMarkers = @("QRRoute", "Static QR", "UTM")
            SmokePages = @(
                @{ Path = "en"; Marker = "QRRoute" },
                @{ Path = "en/tools/static-qr-code"; Marker = "Static QR" },
                @{ Path = "pt-br/tools/utm-builder"; Marker = "UTM" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
        "invoicecraft" = [ordered]@{
            AppId = "invoicecraft"
            DisplayName = "InvoiceCraft"
            PackageName = "@supersites/invoicecraft"
            ReleaseFolder = "_static-releases"
            ApiEnvName = ""
            ApiBaseUrl = ""
            HomeMarker = "InvoiceCraft"
            RequiredFiles = @("index.html", "en/index.html", "en/tools/invoice-builder/index.html", "pt-br/tools/receipt-builder/index.html", "sitemap.xml")
            RequiredMarkers = @("InvoiceCraft", "Invoice", "Receipt")
            SmokePages = @(
                @{ Path = "en"; Marker = "InvoiceCraft" },
                @{ Path = "en/tools/invoice-builder"; Marker = "Invoice" },
                @{ Path = "pt-br/tools/receipt-builder"; Marker = "Receipt" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
        "mailhealth" = [ordered]@{
            AppId = "mailhealth"
            DisplayName = "MailHealth"
            PackageName = "@supersites/mailhealth"
            ReleaseFolder = "_static-releases"
            ApiEnvName = "NUXT_PUBLIC_MAILHEALTH_API_BASE_URL"
            ApiBaseUrl = "https://opentshost.com/supersites/control-plane/api/v1/mailhealth"
            ApiSmokePath = "dns"
            ApiSmokeBody = '{"domain":"example.com","check":"spf"}'
            ApiSmokeMarker = '"data"'
            HomeMarker = "MailHealth"
            RequiredFiles = @("index.html", "en/index.html", "en/tools/spf-checker/index.html", "pt-br/tools/dmarc-checker/index.html", "sitemap.xml")
            RequiredMarkers = @("MailHealth", "SPF", "DMARC")
            SmokePages = @(
                @{ Path = "en"; Marker = "MailHealth" },
                @{ Path = "en/tools/spf-checker"; Marker = "SPF" },
                @{ Path = "pt-br/tools/dmarc-checker"; Marker = "DMARC" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
        "sitepulse-lab" = [ordered]@{
            AppId = "sitepulse-lab"
            DisplayName = "SitePulse Lab"
            PackageName = "@supersites/sitepulse-lab"
            ReleaseFolder = "_static-releases"
            ApiEnvName = "NUXT_PUBLIC_SITEPULSE_API_BASE_URL"
            ApiBaseUrl = "https://opentshost.com/supersites/control-plane/api/v1/sitepulse"
            ApiSmokePath = "probe"
            ApiSmokeBody = '{"url":"https://example.com","checks":["status"]}'
            ApiSmokeMarker = '"data"'
            HomeMarker = "SitePulse Lab"
            RequiredFiles = @("index.html", "en/index.html", "en/tools/status-checker/index.html", "pt-br/tools/redirect-chain/index.html", "sitemap.xml")
            RequiredMarkers = @("SitePulse Lab", "Status", "Redirect")
            SmokePages = @(
                @{ Path = "en"; Marker = "SitePulse Lab" },
                @{ Path = "en/tools/status-checker"; Marker = "Status" },
                @{ Path = "pt-br/tools/redirect-chain"; Marker = "Redirect" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
        "pixelbatch" = [ordered]@{
            AppId = "pixelbatch"
            DisplayName = "PixelBatch"
            PackageName = "@supersites/pixelbatch"
            ReleaseFolder = "_static-releases"
            ApiEnvName = ""
            ApiBaseUrl = ""
            HomeMarker = "PixelBatch"
            RequiredFiles = @("index.html", "en/index.html", "en/tools/image-compressor/index.html", "pt-br/tools/metadata-remover/index.html", "sitemap.xml")
            RequiredMarkers = @("PixelBatch", "Compress", "Metadata")
            SmokePages = @(
                @{ Path = "en"; Marker = "PixelBatch" },
                @{ Path = "en/tools/image-compressor"; Marker = "Compress" },
                @{ Path = "pt-br/tools/metadata-remover"; Marker = "Metadata" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
        "docshift" = [ordered]@{
            AppId = "docshift"
            DisplayName = "DocShift"
            PackageName = "@supersites/docshift"
            ReleaseFolder = "_static-releases"
            ApiEnvName = ""
            ApiBaseUrl = ""
            HomeMarker = "DocShift"
            RequiredFiles = @("index.html", "en/index.html", "en/tools/pdf-merge/index.html", "pt-br/tools/text-to-pdf/index.html", "sitemap.xml")
            RequiredMarkers = @("DocShift", "Merge", "Text")
            SmokePages = @(
                @{ Path = "en"; Marker = "DocShift" },
                @{ Path = "en/tools/pdf-merge"; Marker = "Merge" },
                @{ Path = "pt-br/tools/text-to-pdf"; Marker = "Text" },
                @{ Path = "sitemap.xml"; Marker = "<urlset" }
            )
        }
    }

    if (-not $configs.ContainsKey($AppId)) {
        throw "Unsupported static HostGator app id '$AppId'. Supported ids: $($script:StaticHostgatorAppIds -join ', ')"
    }

    return [pscustomobject]$configs[$AppId]
}
