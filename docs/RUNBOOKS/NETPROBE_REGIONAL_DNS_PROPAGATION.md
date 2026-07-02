# NetProbe Regional DNS Propagation

Data-base: 2026-07-02

## Objetivo

DNS Propagation deve preencher a lista e o mapa com respostas reais por localidade, sem copiar o resultado do resolver local para todos os pontos.

## Implementacao atual

- Endpoint: `POST /api/v1/netprobe/propagation`.
- Backend: `apps/control-plane`.
- Contrato: `App\Support\NetProbe\NetProbePropagationResolver`.
- Provider padrao: `GoogleEcsNetProbePropagationResolver`.
- Fonte externa: Google Public DNS JSON API, sem credencial.
- Sinal regional: `edns_client_subnet` por localidade configurada em `config/netprobe.php`.
- Cache padrao: `NETPROBE_PROPAGATION_CACHE_TTL_SECONDS=120`.
- Timeout padrao por localidade: `NETPROBE_PROPAGATION_GOOGLE_ECS_TIMEOUT_SECONDS=3`.
- Verificacao TLS padrao: `NETPROBE_PROPAGATION_GOOGLE_ECS_VERIFY_TLS=true`.
- Limite padrao: `NETPROBE_PROPAGATION_GOOGLE_ECS_MAX_LOCATIONS=24`.

## Limites honestos

- As linhas sao consultas reais de DNS-over-HTTPS com hint regional ECS.
- Isto nao significa que o NetProbe possui um servidor fisico em cada cidade.
- Para paridade operacional total com redes como WhatsMyDNS, seria necessario contratar/operar uma rede distribuida de probes ou um provider de medicoes globais aprovado.
- Se o provider regional falhar, o endpoint degrada para o resolver local controlado com aviso no `meta.warnings`.
- Em desenvolvimento Windows, erro `unable to get local issuer certificate` indica CA local do PHP/cURL ausente. Corrija `curl.cainfo`/CA bundle; use `NETPROBE_PROPAGATION_GOOGLE_ECS_VERIFY_TLS=false` somente para diagnostico local temporario.

## Cloudflare

Consulta local inicial em `D:\Projetos` encontrou credenciais/contratos Cloudflare no BigShopV4, principalmente em:

- `D:\Projetos\bigshopv4\docs\credenciais.local.md`
- `D:\Projetos\bigshopv4\backend\config\external_accounts.php`
- `D:\Projetos\bigshopv4\docs\04_AMBIENTE_LOCAL_E_CREDENCIAIS.md`

Em 2026-07-02, o dono forneceu credenciais novas da conta Cloudflare SuperSites. Os valores reais ficam somente em `docs/credentials/credentials.local.md`; o resumo operacional sem segredo esta em `docs/RUNBOOKS/CLOUDFLARE_SUPERSITES.md`.

Esta entrega de DNS Propagation nao usa credenciais Cloudflare e nao fez mutacao na conta Cloudflare.

Uso recomendado para SuperSites, quando aprovado:

- DNS/proxy/cache para `opentshost.com` e subdominios.
- R2 para assets publicos versionados, nunca segredos ou payload transacional.
- Purge/cache por deploy quando os hosts estiverem atras da Cloudflare.
- Worker simples para edge utilities, desde que a funcionalidade nao dependa de escolher manualmente todos os colos a partir de uma unica requisicao.

Cloudflare 1.1.1.1 DNS-over-HTTPS nao exige autenticacao e pode ser usado como baseline futuro, mas nao resolve sozinho a necessidade de consulta forçada em todas as cidades.

## Fontes oficiais consultadas

- Google Public DNS JSON API: https://developers.google.com/speed/public-dns/docs/doh/json
- Google Public DNS DoH: https://developers.google.com/speed/public-dns/docs/doh
- Cloudflare DNS-over-HTTPS: https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/
- Cloudflare DoH JSON: https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/
