# Google Provider Go-Live Readiness

Data-base: 2026-06-29

## Objetivo

Preparar GA4, GTM e Search Console sem criar propriedades, inserir tags, publicar tokens de verificacao, chamar APIs Google ou importar dados externos.

## Superficie tecnica

- Endpoint autenticado: `GET /api/v1/google/go-live-readiness`.
- Permissao exigida: `dashboard.view`.
- Contrato: `2026-06-29.15.2`.
- Servico: `App\Support\Google\GoogleProviderGoLiveReadiness`.
- Dashboard: painel `Google integrations` mostra sites prontos para ativacao humana, GA4/GTM carregando 0 e Search Console importando 0.
- Pacote compartilhado: `@supersites/analytics` normaliza GA4 Measurement IDs e GTM Container IDs.

## Estados fail-closed

- `provider_activation=false`.
- `side_effects=none`.
- `automatic_tag_injection_enabled=false`.
- `automatic_data_import_enabled=false`.
- `should_load_ga4=false`.
- `should_load_gtm=false`.
- `should_import_search_console=false`.

## Checklist antes de ativar tags

1. Acesso Google aprovado por pessoa autorizada.
2. Termos Google aceitos.
3. Dominio definitivo escolhido e aprovado.
4. Propriedade GA4 criada no escopo correto.
5. Measurement ID GA4 no formato `G-...` validado.
6. Container GTM no formato `GTM-...` validado, se GTM for usado.
7. Consentimento/CMP e Consent Mode aprovados para regioes aplicaveis.
8. Eventos permitidos revisados sem PII, query strings, IP, e-mail, arquivos ou payloads de ferramenta.
9. Smokes publicos e `validate:adsense-safe-public` passando antes de qualquer script externo.

## Checklist antes de importar Search Console

1. Propriedade de dominio ou URL-prefix definida.
2. Verificacao de propriedade concluida no Google.
3. Matriz de dados define fonte, campos, retencao, quotas, retry/backoff e responsavel.
4. Secrets/tokens ficam em cofre, nunca no repositorio.
5. Relatorios marcam dados como `finalized`, `estimated`, `delayed` ou `unavailable`.
6. Nenhuma causalidade automatica e inferida.

## Proibido nesta fase sem gate humano

- Criar propriedades GA4 ou containers GTM.
- Inserir snippet GA4/GTM em paginas publicas.
- Publicar meta tag ou arquivo de verificacao Search Console.
- Importar dados Search Console, GA4, GTM ou PageSpeed API.
- Enviar PII, query string, IP, arquivo, conteudo de ferramenta ou identificador pessoal para Google.
- Versionar OAuth tokens, service-account keys, API keys ou verification tokens.
