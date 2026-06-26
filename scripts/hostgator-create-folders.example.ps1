param(
    [string]$RemoteBase = "/home1/opents62/public_html/supersites"
)

Write-Host "Example only. Sprint 0.4 automation now lives in scripts/hostgator-bootstrap.ps1."
Write-Host "Remote base: $RemoteBase"
Write-Host @"
mkdir -p "$RemoteBase" \
  "$RemoteBase/control-plane" \
  "$RemoteBase/netprobe-atlas" \
  "$RemoteBase/calcharbor" \
  "$RemoteBase/devutility-lab" \
  "$RemoteBase/timenexus" \
  "$RemoteBase/qrroute" \
  "$RemoteBase/invoicecraft" \
  "$RemoteBase/mailhealth" \
  "$RemoteBase/sitepulse-lab" \
  "$RemoteBase/pixelbatch" \
  "$RemoteBase/docshift"
"@
