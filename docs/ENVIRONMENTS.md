# Environments

## Local

- Windows workspace: `D:\Projetos\supersites`.
- MySQL CLI detectado.
- Docker CLI detectado.
- GitHub CLI detectado.

## Staging

A definir apos Sprint 0.5. Deve usar secrets separados, banco separado e dominio/subpath separado.

## Production transitoria

- Host: `opentshost.com`.
- Base remota desejada: `/home1/opents62/public_html/supersites/`.
- Catalogo desejado: `https://opentshost.com/`.
- Sites temporarios desejados: `https://opentshost.com/<site-folder>`.
- Fallback tecnico a validar: `https://opentshost.com/supersites/<site-folder>`.
- Status em 2026-06-26: fallback tecnico `/supersites/...` provisionado com placeholders `noindex` e HTTP 200; paths diretos `/<site-folder>` ainda retornam 404 e precisam de rewrite/alias/symlink controlado.

## Production runtime VPS

Referencia: `infra/environments/production/vps/README.md`.

- VPS HostGator descoberta nos documentos do BigShop360.
- IP publico: `129.121.37.220`.
- SSH: porta `22022`.
- SSH local validado com `$HOME/.ssh/id_ed25519_vps_hostgator`.
- DNS validado: `api.bigshophost.com -> 129.121.37.220`.
- Redis SuperSites provisionado como `supersites-redis.service`.
- Redis local na VPS: `127.0.0.1:6381`.
- Portas Redis publicas `6379`, `6380` e `6381` fechadas/filtradas em 2026-06-26.
- Usar para Redis, filas, workers e monitoramento do SuperSites, com layout proprio e sem alterar diretorios do BigShop360.
- Workers/crons ainda dependem de codigo executavel e filas definidas.

## Remote folders planejados

Status em 2026-06-26: pastas provisionadas na HostGator.

| App | Remote folder |
|---|---|
| Catalogo | `/home1/opents62/public_html/supersites/` |
| Control plane | `/home1/opents62/public_html/supersites/control-plane/` |
| NetProbe Atlas | `/home1/opents62/public_html/supersites/netprobe-atlas/` |
| CalcHarbor | `/home1/opents62/public_html/supersites/calcharbor/` |
| DevUtility Lab | `/home1/opents62/public_html/supersites/devutility-lab/` |
| TimeNexus | `/home1/opents62/public_html/supersites/timenexus/` |
| QRRoute | `/home1/opents62/public_html/supersites/qrroute/` |
| InvoiceCraft | `/home1/opents62/public_html/supersites/invoicecraft/` |
| MailHealth | `/home1/opents62/public_html/supersites/mailhealth/` |
| SitePulse Lab | `/home1/opents62/public_html/supersites/sitepulse-lab/` |
| PixelBatch | `/home1/opents62/public_html/supersites/pixelbatch/` |
| DocShift | `/home1/opents62/public_html/supersites/docshift/` |
