# Architecture

## Decisao base

SuperSites inicia como monorepo privado com deploy, banco, ambiente, secrets e rollback independentes por app/site.

Stack alvo:

- Backend/APIs: PHP 8.3+ e Laravel 13.
- Frontend publico: Nuxt 4, Vue 3, TypeScript, SSR/SSG.
- Admin/control plane: Vue 3/TypeScript, Inertia quando simplificar.
- Banco: MySQL 8.4 LTS alvo; compatibilidade HostGator deve ser verificada antes de usar collations ou recursos especificos.
- Cache/filas/rate limit: Redis.
- CI/CD: GitHub Actions.
- Hospedagem transitoria: HostGator/opentshost.com.
- CDN/WAF futuro: Cloudflare ou equivalente aprovado.

## Redis em producao

Redis e obrigatorio para a plataforma completa: cache, filas, rate limit, locks, workers de monitoramento e jobs de IA/metricas.

O HostGator/cPanel transitorio `opentshost.com` nao deve ser tratado como runtime Redis. Redis, workers e processos longos devem rodar no outro servidor HostGator VPS/VPN ou em Redis gerenciado. O catalogo publico pode iniciar em modo sem Redis se for SSG/estatico ou usar fallback simples sem filas.

## Estrutura local

- `apps/supersite`: catalogo publico.
- `apps/control-plane`: administracao e metricas.
- `apps/<site>`: apps independentes de cada produto.
- `packages/*`: bibliotecas compartilhadas.
- `infra/*`: ambientes, deploy, cron, monitoring, backups.
- `docs/*`: fontes da verdade.

## Sites e pastas

| App | Pasta | Papel |
|---|---|---|
| SuperSites Hub | `supersite` | Catalogo publico |
| Control Plane | `control-plane` | Admin central |
| NetProbe Atlas | `netprobe-atlas` | IP, DNS, dominio, SSL |
| CalcHarbor | `calcharbor` | Calculadoras |
| DevUtility Lab | `devutility-lab` | Ferramentas dev |
| TimeNexus | `timenexus` | Tempo/data/unidades |
| QRRoute | `qrroute` | QR, UTM, links |
| InvoiceCraft | `invoicecraft` | Faturas e recibos |
| MailHealth | `mailhealth` | Email auth e entregabilidade |
| SitePulse Lab | `sitepulse-lab` | Uptime/performance/headers |
| PixelBatch | `pixelbatch` | Imagem |
| DocShift | `docshift` | PDF/documentos |

## Regra de renderizacao

Paginas indexaveis devem renderizar titulo, conteudo essencial, links, canonicals, hreflang e dados estruturados no HTML inicial.

## Fronteiras

- Ferramentas client-side ficam no navegador sempre que isso reduz custo e melhora privacidade.
- Backend entra para rede, persistencia, billing, filas, seguranca, monitoramento ou processamento pesado.
- Conteudo de usuario de ferramentas dev, imagem e documento nao deve ser logado.
- Microservico fora de Laravel exige benchmark ou biblioteca especifica.
