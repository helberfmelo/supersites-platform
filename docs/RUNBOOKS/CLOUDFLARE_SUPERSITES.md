# Cloudflare SuperSites

Data-base: 2026-07-02

## Segredos

Credenciais reais ficam somente em `docs/credentials/credentials.local.md`, secao `Cloudflare / SuperSites account`, ou em secret manager. Nao versionar token, chaves R2, account credentials ou exemplos com valores reais.

## Conta verificada

- Conta: SuperSites.
- Dominio operacional verificado: `opentshost.com`.
- Token: ativo pelo endpoint account-scoped `/accounts/{account_id}/tokens/verify`.
- O endpoint `/user/tokens/verify` respondeu `401` para este token account-scoped, mas as chamadas autenticadas da conta funcionaram.
- Introspeccao do token: 2 politicas `allow`, 186 permission group names unicos.

## Acessos testados

Chamadas feitas em 2026-07-02, sem mutacao:

- Account read: OK.
- Zone read para `opentshost.com`: OK.
- DNS records read: OK.
- Zone rulesets read: OK.
- R2 buckets pela Cloudflare API: OK.
- R2 S3 `ListBuckets` com credenciais S3-compatible: OK.
- Workers scripts list: OK, nenhum script existente.
- Workers KV namespaces list: OK, nenhum namespace existente.
- Pages projects list: OK, nenhum projeto existente.
- D1 databases list: OK, nenhum banco existente.
- Queues list: OK, nenhuma queue existente.

Areas de permissao observadas por introspeccao: Account, Zone/DNS, Cache Purge, Cache Settings, Rulesets, R2, Workers, KV, Pages, D1, Queues, SSL, Analytics, Images, Stream, Turnstile e Access.

## Uso recomendado

- DNS e cache: ler zona `opentshost.com`, auditar registros, e futuramente automatizar purge pos-deploy se os hosts estiverem atras da Cloudflare.
- R2: assets publicos versionados e artefatos publicos aprovados. Nao armazenar segredos, payload transacional ou dados sensiveis.
- Workers: utilidades leves de borda, headers, redirects ou pequenas APIs sem desviar o SuperSites para uma plataforma paralela.
- KV/D1/Queues: usar apenas quando houver produto claro, como cache pequeno, filas de tarefas leves ou estado operacional de baixa criticidade.
- Turnstile: pode ser avaliado para formularios publicos se abuso virar problema.

## Implementacoes de valor para o portfolio

Prioridade recomendada:

1. Purge Cloudflare por deploy HostGator: apos deploy especifico, limpar apenas URLs/prefixos do app alterado quando `opentshost.com` estiver passando por cache Cloudflare.
2. Auditoria DNS operacional: painel/rotina read-only para confirmar registros esperados de `opentshost.com`, CNAMEs, TXT, MX e status de proxy.
3. R2 para assets publicos: armazenar mapas, imagens otimizadas, exports publicos e artefatos versionados que nao tenham dados sensiveis.
4. Turnstile nos formularios de contato/correcao: ativar somente se abuso aparecer, mantendo a tarefa gratuita simples.
5. Worker de headers/redirects/cache helper: pequenas regras de borda para canonical, seguranca e cache, sem duplicar a aplicacao do HostGator.
6. Cache/API edge para respostas publicas estaveis: cachear endpoints de catalogo/metadata que nao contem alvo digitado pelo usuario.
7. Queues/KV para tarefas leves: fila de correcoes, pequenos locks, counters anonimos e caches de configuracao.
8. D1 apenas para estado pequeno e edge-native aprovado; dados principais seguem no control-plane atual.
9. Zaraz/Analytics somente com governanca de privacidade; nao registrar dominios/IPs consultados nas ferramentas.

Nao usar Cloudflare Free como promessa de DNS propagation por todos os colos. Workers e DoH ajudam em utilidades de borda, mas nao substituem uma rede distribuida de probes com localidade escolhida por servidor.

## Cuidado operacional

O token atual e amplo. Para automacao rotineira, criar tokens menores por funcao:

- `SUPERSITES_CLOUDFLARE_DNS_READ` para auditoria.
- `SUPERSITES_CLOUDFLARE_CACHE_PURGE` para deploy.
- `SUPERSITES_CLOUDFLARE_R2_WRITE` para publicacao de assets.

Evite usar o token amplo em workflows permanentes salvo durante bootstrap controlado.

## NetProbe DNS Propagation

Cloudflare 1.1.1.1 DNS-over-HTTPS nao exige autenticacao e pode ser usado como baseline futuro, mas nao fornece por si so fanout forcado por todas as cidades a partir de uma unica requisicao. A implementacao ativa de propagacao regional continua usando Google Public DNS JSON API com `edns_client_subnet`, sem credencial, para obter 24 respostas regionais reais.
