param(
    [string]$Path = "."
)

$ErrorActionPreference = "Stop"

$patterns = @(
    "sk_(live|test)_[A-Za-z0-9]{20,}",
    "gh[pousr]_[A-Za-z0-9_]{20,}",
    "BEGIN (OPENSSH|RSA|EC) PRIVATE KEY",
    "(?i)(password|senha|api[_-]?key|secret|token)\s*[:=]\s*['""]?(?!\$|<|\{|\[|your_|change_|example|placeholder|env:|SUPERSITES_)[A-Za-z0-9+/=._!@#%&*()\-]{16,}"
)

$exclude = @(
    "/docs/credentials/",
    "/.git/",
    "/node_modules/",
    "/vendor/",
    "/.nuxt/",
    "/.output/",
    "/dist/",
    "/build/",
    "/coverage/",
    "/artifacts/"
)

$files = Get-ChildItem -Path $Path -Recurse -File -Force | Where-Object {
    $full = "/" + $_.FullName.Replace("\", "/")
    -not ($exclude | Where-Object { $full -like "*$_*" })
}

$findings = @()
foreach ($file in $files) {
    foreach ($pattern in $patterns) {
        $matches = Select-String -Path $file.FullName -Pattern $pattern -CaseSensitive:$false -ErrorAction SilentlyContinue
        foreach ($match in $matches) {
            $findings += [pscustomobject]@{
                File = $file.FullName
                Line = $match.LineNumber
                Pattern = $pattern
            }
        }
    }
}

if ($findings.Count -gt 0) {
    $findings | Format-Table -AutoSize
    throw "Potential secrets found outside ignored credential paths."
}

Write-Host "No obvious secrets found outside ignored credential paths."
