# Google Accounts

## Objetivo

Registrar contas, funcoes e responsabilidades sem segredos.

## Estrutura alvo

- Google Workspace para comunicacao humana e administrativa.
- Projetos Google Cloud separados para desenvolvimento e producao.
- GA4, GTM e Search Console por dominio/site.
- Uma unica conta AdSense por beneficiario legal/publisher.

## Eventos padronizados

- `tool_viewed`
- `tool_started`
- `tool_completed`
- `tool_failed`
- `result_copied`
- `file_uploaded`
- `file_processed`
- `file_downloaded`
- `monitor_created`
- `signup_started`
- `signup_completed`
- `upgrade_viewed`
- `checkout_started`
- `purchase_completed`
- `subscription_cancelled`
- `outbound_site_click`

## PII

Nunca enviar email, telefone, documento, nome completo, IP completo, conteudo de arquivo ou entrada de ferramenta para analytics.

## Sprint 6.2 foundation

- `@supersites/analytics` define o contrato Google, nomes GA4 compativeis e parametros allowlisted.
- `google_integrations` registra readiness por site no control-plane, sem tokens ou segredos.
- Todas as propriedades/containers/verificacoes ficam em estado `human_required` ou `not_configured` ate aprovacao.
- Nenhum script GA4/GTM, Search Console import, cookie de terceiro ou evento externo foi ativado.

## Sprint 6.3 AdSense foundation

- `@supersites/ads` define readiness de conta AdSense, publisher id, Management API e revisao por site.
- `adsense_accounts` registra somente `primary-publisher` sem publisher id real, tokens, dados fiscais, banco, PIN ou emails Google.
- `adsense_site_reviews` registra sites publicos como `not_submitted`, com `placements_enabled=false`, `auto_ads_enabled=false` e `ad_serving_enabled=false`.
- Nenhum site foi adicionado ao AdSense, nenhum `ads.txt` real foi publicado e nenhuma API/snippet/request de anuncio foi ativado.

## Sprint 12.3 readiness check

- `pnpm measure:google-ready` gera evidencia local em `artifacts/google-readiness/` sem chamar APIs Google ou AdSense.
- O check valida contratos fail-closed, seeders sem IDs reais, ausencia de snippets publicos ativos, ausencia de `ads.txt` placeholder e pendencias humanas.
- O run `2026-06-29T05-47-31Z` passou com 18 checks, 0 falhas e ativacao 0 para GA4, GTM, Search Console, AdSense e PageSpeed API.

## 2026-07-03 setup operacional

- A credencial da conta Google SuperSites foi registrada somente no inventario local ignorado `docs/credentials/credentials.local.md`.
- O owner confirmou em 2026-07-03 que e pessoa autorizada a aceitar termos Google/Analytics/GTM/Search Console/AdSense pela SuperSites e autorizou o setup assistido desses aceites.
- O dominio aprovado para o setup de go-live e `https://mywebtools.top/`, com deploy HostGator em `/home1/opents62/mywebtools.top`.
- O pacote sensivel de apoio ao preenchimento fica somente em `docs/credentials/google-platform-setup.local.md`, ignorado pelo Git.
- `pnpm ops:google-platform-setup-packet` gera um pacote local em `artifacts/google-platform-setup/` com nomes sugeridos para GA4, GTM, Search Console e AdSense.
- O pacote nao faz login, nao chama APIs Google, nao cria propriedades/containers, nao verifica dominio, nao publica token e nao ativa tag ou anuncio por si so.
- A criacao assistida das plataformas Google pode prosseguir com a conta autorizada e o dominio `mywebtools.top`, desde que Measurement IDs, GTM IDs, tokens de verificacao, publisher IDs, OAuth tokens e qualquer segredo fiquem somente em cofre/ambiente ou inventario local ignorado.
- Billing, cartao, forma de pagamento, Google Cloud billing, teste pago, banco, impostos, PIN postal e pagamento continuam bloqueados para pausa humana. O fluxo deve tentar pular quando a plataforma permitir.

## 2026-07-03 plataformas criadas

- GA4, Google Tag Manager, Search Console e AdSense foram criados/configurados assistidamente com a conta Google autorizada para a SuperSites.
- IDs de GA4, GTM, Search Console e AdSense ficam no inventario local ignorado `docs/credentials/google-platform-setup.local.md` ou em cofre/ambiente, nao em docs versionados.
- Search Console foi verificado para `https://mywebtools.top/` por arquivo HTML publicado no dominio.
- O site `mywebtools.top` foi adicionado ao AdSense, teve propriedade verificada, `ads.txt` real publicado e revisao solicitada. O status do site ficou em preparacao/revisao do Google.
- A CMP do Google foi configurada no AdSense com tres opcoes de consentimento para regioes aplicaveis.
- O snippet de revisao AdSense esta publicado em `mywebtools.top` e apps filhos. GA4/GTM tags publicas e imports de Search Console/GA4/AdSense seguem desativados ate decisao operacional separada.
- PageSpeed API, Google Cloud billing, cartao, teste pago, pagamentos, banco, impostos e PIN postal nao foram configurados.

## Pendencias humanas

Ver `docs/HUMAN_ACTION_REQUIRED.md`.
