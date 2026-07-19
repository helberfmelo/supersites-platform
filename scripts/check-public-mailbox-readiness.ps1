[CmdletBinding()]
param(
    [string]$Domain = 'opentshost.com',
    [string]$MailHost = 'mail.opentshost.com',
    [int]$TimeoutMilliseconds = 5000
)

$ErrorActionPreference = 'Stop'

function Test-TcpPort {
    param([string]$HostName, [int]$Port, [int]$Timeout)

    $client = [System.Net.Sockets.TcpClient]::new()
    try {
        $task = $client.ConnectAsync($HostName, $Port)
        if (-not $task.Wait($Timeout)) { return $false }
        return $client.Connected
    }
    catch { return $false }
    finally { $client.Dispose() }
}

$mxRecords = @(Resolve-DnsName -Name $Domain -Type MX -ErrorAction Stop |
    Where-Object { $_.Type -eq 'MX' } |
    Select-Object NameExchange, Preference)

$checks = @(
    [pscustomobject]@{ name = 'mx_record'; passed = ($mxRecords.Count -gt 0); detail = (($mxRecords.NameExchange -join ', ').TrimEnd('.')) },
    [pscustomobject]@{ name = 'smtp_tls_465'; passed = (Test-TcpPort -HostName $MailHost -Port 465 -Timeout $TimeoutMilliseconds); detail = "$MailHost`:465" },
    [pscustomobject]@{ name = 'imap_tls_993'; passed = (Test-TcpPort -HostName $MailHost -Port 993 -Timeout $TimeoutMilliseconds); detail = "$MailHost`:993" }
)

$result = [pscustomobject]@{
    checked_at = (Get-Date).ToUniversalTime().ToString('o')
    domain = $Domain
    mail_host = $MailHost
    ready = -not ($checks.passed -contains $false)
    checks = $checks
    human_confirmation_required = @(
        'Authenticate the mailbox without sharing credentials.',
        'Confirm inbound and outbound delivery with a harmless test message.',
        'Assign triage ownership, retention and sensitive-attachment handling.'
    )
}

$result | ConvertTo-Json -Depth 5
if (-not $result.ready) { exit 1 }
