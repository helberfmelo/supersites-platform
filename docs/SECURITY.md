# Security

## Regras permanentes

- Nunca versionar segredos.
- Nunca expor segredo em logs, docs publicas, issues, screenshots ou output de CI.
- Aplicar OWASP Top 10 e boas praticas ASVS.
- Todo endpoint externo deve ter rate limit, validacao e logs estruturados.
- Ferramentas que acessam URL, DNS, SMTP, porta, arquivo, redirect ou certificado exigem revisao antiabuso.

## Antiabuso por categoria

- NetProbe/MailHealth/SitePulse: bloquear SSRF, loopback, redes privadas, metadata endpoints, ranges reservados e varreduras amplas.
- PixelBatch/DocShift: validar tipo/tamanho, limpar temporarios, isolar processamento server-side e usar antivirus/sandbox quando aplicavel.
- QRRoute: prevenir phishing, malware, open redirect e abuso de short links.
- InvoiceCraft: processar documentos no navegador, limitar tamanho/itens/valores, nao persistir dados de cliente e bloquear claims fiscais/pagamentos ate revisao humana.
- DevUtility: processar conteudo no navegador/Web Worker quando possivel, limitar snippets, nao persistir storage local e nao enviar conteudo sensivel do usuario para analytics ou logs.
- TimeNexus: processar datas, fusos e conversoes no navegador/Web Worker quando possivel, nao persistir entradas pessoais e nao enviar valores ou resultados para analytics ou logs.

## Secrets

- Inventario local: `docs/credentials/credentials.local.md`.
- Arquivos versionados: apenas placeholders e nomes de secrets.
- GitHub Actions: secrets por environment/site.
- Producao: cPanel/secret manager/cofre conforme disponibilidade.

## Control plane admin

- Admin MVP usa sessao Laravel, CSRF e throttle no POST de login.
- Rotas `/admin` exigem autenticacao e middleware `permission` baseado nos slugs RBAC.
- Acoes de login, dashboard e cadastro/edicao de sites geram `audit_logs`.
- Contas seed locais existem apenas para desenvolvimento; producao deve ter credenciais reais em fluxo seguro e 2FA antes de go-live.

## Analytics e PII

- Eventos analytics usam allowlist versionada em `@supersites/analytics`.
- O endpoint publico `/api/v1/analytics/events` descarta chaves sensiveis, redige valores com e-mail/IP/token/numero longo e remove query/hash de URLs.
- Identificadores anonimos e de sessao sao hasheados antes de persistencia.
- Nenhum provedor externo de analytics deve ser ativado antes de consentimento, GA4/GTM e gates humanos/tecnicos aplicaveis.

## Google analytics/search gates

- GA4, GTM e Search Console falham fechados por contrato enquanto producao, aprovacao humana, consentimento, ids, flag de tags e verificacao de propriedade nao estiverem completos.
- Measurement ids, container ids e property ids podem ser configuracao operacional, mas tokens OAuth, service-account keys e verification secrets nunca devem ser versionados nem exibidos no painel.
- Search Console ownership verification e acesso Google exigem `HUMAN_ACTION_REQUIRED`.
- Eventos enviados a Google devem usar apenas nomes padronizados e parametros allowlisted; entradas de ferramenta, dominios consultados, arquivos, headers, documentos, IPs e PII continuam proibidos.

## Consentimento e ads placeholders

- A CMP da Sprint 6.1 grava apenas escolhas booleanas de preferencias, analytics e ads no navegador usando `supersites.consent.v1`.
- Comandos Consent Mode sao enviados somente para `window.dataLayer` local enquanto GA4/GTM nao estiverem aprovados; nenhum provedor externo e carregado.
- `@supersites/ads` separa placeholder reservado de request real; `shouldRequestAd` permanece falso enquanto feature flag, delivery gate, consentimento aplicavel, conta e deploy nao estiverem aprovados.
- Ads sao bloqueados em admin, login, checkout, conta, erro, paginas legais, superficies de ferramenta, uploads, resultados de arquivo e qualquer slot perto demais de controles interativos.
- Slots nao devem ser inseridos junto a botoes, inputs, previews, resultados, downloads ou mensagens de erro que possam induzir clique acidental.

## AdSense account gates

- A Sprint 6.3 registra apenas readiness de conta publisher e revisao por site; nenhuma conta, OAuth token, refresh token, Management API call, `ads.txt`, snippet AdSense ou request real e criado.
- `publisher_id` real so pode entrar como configuracao operacional aprovada; dados fiscais, bancarios, documentos, PIN, emails Google e aceite de termos nunca devem ser versionados ou expostos no painel.
- `adsense_accounts` e `adsense_site_reviews` devem permanecer fail-closed: `management_api_enabled=false`, `placements_enabled=false`, `auto_ads_enabled=false` e `ad_serving_enabled=false` ate todos os gates humanos/tecnicos passarem.
- Submeter site ao AdSense, ativar Auto Ads/manual ads ou habilitar Management API exige revisao de politicas, consentimento aplicavel, smoke publico, dominio definitivo e `HUMAN_ACTION_REQUIRED`.

## Billing gates

- A Sprint 6.4 registra apenas readiness de billing; nenhuma conta provider, API key, webhook secret, checkout endpoint, payment link, assinatura, cobranca, refund, dunning ou entitlement pago e criado.
- `@supersites/billing` falha fechado enquanto KYC, termos, impostos, perfil de pagamentos, aceite juridico, configuracao de secrets e endpoint de webhook aprovado nao estiverem completos.
- Cartoes, dados bancarios, documentos fiscais, tokens de provider, webhook secrets e payloads brutos de pagamento nunca devem ser versionados, exibidos no painel ou armazenados no repositorio.
- Webhooks futuros exigem assinatura verificada, janela anti-replay, idempotencia por provider/event id e persistencia de hash do payload em vez de payload bruto.
- Ativar checkout, webhooks reais, impostos automaticos, invoices, refunds, chargebacks ou dunning exige `HUMAN_ACTION_REQUIRED`, termos, politica de cancelamento/reembolso, secrets em cofre e smoke/rollback especificos.

## Account data controls

- A Sprint 14.1 registra apenas exportacao e pedido de exclusao autenticados; nao cria signup publico, checkout, cobranca, assinatura, provider, webhook real ou secret novo.
- Rotas admin usam sessao Laravel, CSRF e autenticacao existente; rotas API usam Sanctum.
- Exports de conta devem ser sanitizados e nunca incluir senha, `remember_token`, tokens, secrets, dados bancarios/fiscais, payload bruto de provider, IPs ou inputs de ferramenta.
- Pedidos de exclusao ficam `human_required`; nenhuma exclusao automatica deve rodar antes de politica legal/retencao aprovada, processo de verificacao e plano de backup/rollback.
- Acoes de visualizacao, exportacao e pedido de exclusao devem gerar audit log sem payload sensivel.

## Entitlement quota controls

- A Sprint 14.2 usa entitlements locais de plano para quotas, sem ativar checkout ou plano pago real.
- O plano usado para enforcement inicial deve ser `free-preview` e `checkout_enabled=false`.
- Respostas de API podem expor limites e origem da quota, mas nao devem expor provider ids reais, secrets, dados de pagamento, documentos, e-mails de terceiros ou payloads de billing.
- Quando o entitlement especifico nao existir, o fallback configurado deve ser declarado como `config_fallback`.
- Alterar limite local e reversivel; ativar provider, price id, checkout, uso medido comercial ou upgrade por pagamento exige `HUMAN_ACTION_REQUIRED`.

## AI growth gates

- A Sprint 6.5 registra apenas recomendacoes e anomalias locais; nenhuma API key, SDK, token, prompt externo, resposta de provider, worker recorrente ou automacao de growth e criado.
- `@supersites/ai-growth` deve falhar fechado quando recomendacao nao tiver evidencia, impacto, esforco, confianca e risco.
- PII, secrets, tokens, OAuth, payloads brutos de ferramentas, arquivos, dados de cliente, dados financeiros e query strings reais nao devem entrar em `ai_growth_audits`, `ai_growth_recommendations` ou `ai_growth_anomalies`.
- Anomalias devem declarar `causalityStatus=not_inferred` ate haver evidencia suficiente e revisao humana; nao inventar causalidade.
- Ativar provider externo de IA, enviar prompts com dados operacionais, publicar conteudo, mudar SEO, alterar ads/AdSense, billing, checkout, Search Console ou configuracao de provider exige `HUMAN_ACTION_REQUIRED`, revisao legal/dados/custos, secrets em cofre e smoke/rollback especificos.

## Growth priority gates

- A Sprint 16.2 expõe apenas priorizacao autenticada por evidencia local e readiness de provider; nenhuma importacao, worker, cron, external AI, branch/PR automatico ou auto-merge e ativado.
- `GET /api/v1/growth/priorities` exige autenticacao e `dashboard.view`.
- A priorizacao nao deve armazenar PII, queries reais, URLs com identificador, payloads de provider, dados de cliente, receita individual, impressao/clique individual, invoices, prompts externos, tokens ou segredos.
- `causality_status` deve permanecer `not_inferred`; antes/depois, impacto financeiro, ranking ou atribuicao causal exigem revisao humana e evidencia especifica.
- Mesmo com `data_status=finalized` em fonte futura, `automatic_prioritization_enabled`, `automatic_pr_creation_enabled`, `should_auto_apply` e `should_create_pr` devem continuar falsos ate um gate separado de automacao.

## Growth automation gates

- A Sprint 16.3 expoe apenas readiness autenticado de automacao segura; nenhuma branch, PR, merge, publish, provider import, external AI ou mutacao de producao e criada.
- `GET /api/v1/growth/automation-readiness` exige autenticacao e `dashboard.view`.
- Apenas recomendacoes com evidencia, sem gate humano e `risk_score <= 2` podem aparecer como `pr_review_only`; isso nao autoriza execucao automatica.
- Todos os snapshots mantem `side_effects=none`, `should_create_branch=false`, `should_open_pull_request=false`, `should_auto_merge=false` e `should_publish=false`.

## Executive report gates

- A Sprint 6.6 registra apenas relatorios executivos locais; nenhum provider import, envio de e-mail, worker recorrente, webhook de relatorio ou automacao externa e criado.
- Rotas `/admin/reports`, detalhe, print e CSV exigem autenticacao e `dashboard.view`.
- CSV/print usam apenas dados operacionais agregados e evidencias documentais; PII, segredos, tokens, provider payloads, dados de cliente, cartao, banco, input bruto de ferramenta e receita individual sao proibidos.
- `causality_status` deve continuar `not_inferred` ate existir revisao manual com evidencia especifica; exports nao devem transformar correlacao em causa.
- Ativar envio recorrente, provider imports, report webhooks ou compartilhamento externo exige nova revisao de seguranca, retencao, secrets e gates humanos/tecnicos aplicaveis.

## Benchmark refinement gates

- A Sprint 7.2 registra apenas readiness e oportunidades locais; nenhum provider import, crawler externo recorrente, worker, automacao de IA, ad serving, checkout, doacao ou afiliado real e criado.
- Rotas `/admin/benchmark-refinement` exigem autenticacao e `dashboard.view`, seguindo o mesmo RBAC do dashboard operacional.
- `benchmark_site_readiness` e `benchmark_opportunities` nao devem armazenar PII, segredos, inputs de ferramentas, payloads de arquivos, tokens, dados de cliente, receita individual ou provider payloads.
- Itens dependentes de AdSense, billing, doacoes, afiliados, KYC, impostos, banco, aceite juridico, dominios ou provider externo devem ficar `human_required`.
- Publicar scores de benchmark como claims externos, ativar automacao de recomendacao ou conectar provedores exige nova revisao de seguranca, data governance, smoke e rollback.

## DevUtility Lab client-side tools

- Ferramentas do DevUtility Lab rodam no navegador com Web Worker quando suportado e fallback local sem chamadas de rede.
- Snippets sao limitados a 200 KB no MVP para evitar travamento de UI e abuso por payload excessivo.
- JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes nao devem ser enviados a backend, logs, analytics ou data layer.
- O app nao deve persistir input ou resultado em `localStorage`, `sessionStorage`, IndexedDB ou cookies; downloads de resultado sao arquivos locais iniciados pelo usuario.
- Textos da UI devem orientar o usuario a nao colar segredos quando isso for evitavel; ainda assim a seguranca assume que entradas podem conter tokens ou chaves e minimiza coleta.

## TimeNexus client-side tools

- Ferramentas do TimeNexus rodam no navegador com Web Worker quando suportado e fallback local sem chamadas de rede.
- Fusos, datas, horarios, timestamps, idade, porcentagem, unidades, valores numericos e resultados nao devem ser enviados a backend, logs, analytics ou data layer.
- O app nao deve persistir input ou resultado em `localStorage`, `sessionStorage`, IndexedDB ou cookies nesta sprint.
- Respostas diretas, timelines, exemplos, relacionados e paineis de upgrade/support da Sprint 7.6 devem permanecer componentes locais sem API, checkout, widget publico, link de pagamento ou storage.
- Regras de fuso e calendario devem declarar limitacoes de precisao, diferencas de locale e dependencia do runtime do navegador.

## QRRoute client-side tools and redirects

- Ferramentas do QRRoute rodam no navegador com payloads locais e preview SVG, sem chamadas de API para criar QR estatico, barcode, UTM, vCard, Wi-Fi ou preview.
- URLs, parametros UTM, Wi-Fi passwords, dados de vCard, payloads e resultados nao devem ser enviados a backend, logs, analytics ou data layer.
- O app nao deve persistir input ou resultado em `localStorage`, `sessionStorage`, IndexedDB ou cookies nesta sprint.
- Tabs de tipo, resumo de payload, download SVG, copy payload, related tools e paineis de upgrade/static-vs-dynamic da Sprint 7.7 devem permanecer locais e sem checkout, ad serving, short-link publico, API paga ou storage.
- URL mode deve bloquear schemes nao HTTP(S), hostnames locais/privados, IPs privados/reservados, fragmentos, credenciais embutidas e payloads grandes.
- O redirect service preparado em `/api/v1/qrroute/r/{code}` deve usar `QrRouteDestinationGuard`, rate limit `qrroute-redirect`, links ativos/expiracao, `Referrer-Policy: no-referrer` e `X-Robots-Tag: noindex, nofollow`.
- Criacao publica de short links, scan analytics, dominios proprios, lotes e API permanecem desativados ate haver auth, billing/entitlements, workflow antiabuso, retencao, monitoramento e gates de deploy.

## InvoiceCraft client-side documents

- Ferramentas do InvoiceCraft rodam no navegador com preview de documento e PDF local, sem chamadas de API para criar fatura, orcamento ou recibo.
- Emissor, cliente, enderecos, e-mails, itens, valores, numeros de documento, termos, notas, impostos/ajustes manuais e PDF gerado nao devem ser enviados a backend, logs, analytics ou data layer.
- O app nao deve persistir input ou resultado em `localStorage`, `sessionStorage`, IndexedDB ou cookies.
- Sprint 7.8 adiciona tabs de template, document snapshot, copy de resumo textual, related documents e upsell gated apenas no cliente; esses controles nao ativam storage, checkout, pagamento, webhook, conta ou template fiscal oficial.
- O MVP limita quantidade de linhas, tamanho de texto, moedas permitidas e ranges numericos para reduzir abuso e travamento de UI.
- Templates fiscais oficiais, numeracao fiscal, calculo automatico de impostos, cobranca, recorrencia e pagamentos exigem `HUMAN_ACTION_REQUIRED`, termos, billing/entitlements, antiabuso e validacao juridica antes de ativacao.

## MailHealth email diagnostics

- Ferramentas da Sprint 4.3 cobrem SPF, DKIM, DMARC, MX, blacklist, SMTP e headers.
- Headers brutos sao analisados no navegador; nao devem ser enviados a backend, logs, analytics, data layer ou storage local.
- Endpoints publicos `/api/v1/mailhealth/dns`, `/api/v1/mailhealth/blacklist` e `/api/v1/mailhealth/smtp` usam rate limit dedicado `mailhealth-public`.
- DNS e SMTP reutilizam validacao de hostname publico, bloqueio de URL/path/porta em input, bloqueio de suffix local/privado e rejeicao de IP privado/reservado.
- DKIM aceita apenas selector como label curto; nao aceitar selector com ponto, URL, path ou espaco.
- Blacklist consulta somente pequena allowlist DNSBL e no maximo poucos enderecos IPv4 publicos derivados de dominio/MX; nao executar varredura ampla de IPs.
- SMTP deve usar apenas portas permitidas `25`, `465` e `587`, derivar o host de MX publico, testar no maximo um endereco e executar somente TCP connect com timeout curto.
- SMTP nao deve enviar EHLO, STARTTLS, AUTH, RCPT, DATA, mensagem, destinatario ou credencial.
- Analytics de MailHealth nao deve incluir dominio, selector, host MX/SMTP, IP, header, Message-ID, endereco de email, resultado DNSBL/SMTP ou texto de erro bruto.
- Score, checklist, severidade, fix guidance, related checks e builders planejados da Sprint 7.9 devem permanecer derivados do resultado em memoria e nao podem ativar criacao de registros DNS, relay/open-relay tests, envio SMTP, storage, alerta, API paga ou checkout.
- Monitoramento recorrente, alertas, relatorios DMARC, lote, API paga e white-label exigem auth, billing/entitlements, retencao, termos, antiabuso, provider-policy review e gates de deploy antes de ativacao.

## SitePulse web diagnostics

- Ferramentas da Sprint 4.4 cobrem status, redirects, headers, robots, sitemap, TTFB e snapshot pontual.
- Endpoint publico `/api/v1/sitepulse/probe` usa rate limit dedicado `sitepulse-public`, timeout curto, cache curto e redirect chain limitado.
- Inputs devem aceitar apenas URL HTTP/HTTPS, sem credenciais, fragmento, portas nao web, IP privado/reservado, hostname local ou resolucao A/AAAA privada/reservada.
- Cada redirect deve ser normalizado e revalidado antes de nova requisicao; loops, excesso de saltos e targets bloqueados devem encerrar o probe com warning/failure seguro.
- Robots e sitemap devem ser requisitados apenas em caminhos same-origin padrao, com limite de bytes e sem crawling de URLs internas.
- O probe nao deve executar metodos mutantes, enviar cookies do usuario, seguir formularios, testar portas arbitrarias, varrer paths ou manter sessao.
- Analytics de SitePulse nao deve incluir URL alvo, host, path, query, headers, redirect targets, status code, latencia, body sample, robots, sitemap ou erro bruto.
- Score, checklist, abas de detalhe, recomendacoes e related pages da Sprint 7.10 devem permanecer derivados do resultado em memoria e nao podem ativar crawling, probes recorrentes, storage, alertas, status page, API paga ou checkout.
- Uptime recorrente, incidentes, status page, alertas, historico, multi-regiao, API paga e white-label exigem auth, billing/entitlements, retencao, termos, antiabuso, provider-policy review e gates de deploy antes de ativacao.

## PixelBatch browser image processing

- Ferramentas da Sprint 5.1 cobrem compressao, resize, crop, conversao, remocao de metadados e presets sociais no navegador.
- O MVP aceita apenas PNG, JPEG, WebP e AVIF quando suportado pelo navegador, com limite gratuito de 10 MB, dimensoes maximas e pixel count maximo.
- O worker deve validar tipo, tamanho, dimensoes e parametros de saida antes do Canvas processar a imagem.
- Object URLs devem ser revogados apos uso; inputs e outputs nao devem ser gravados em `localStorage`, `sessionStorage`, IndexedDB, cookies, backend, logs ou analytics.
- A remocao de metadados e uma reencode limpo via Canvas; nao prometer redacao forense ou remocao de dados invisiveis fora do suporte do navegador.
- Analytics de PixelBatch nao deve incluir nome do arquivo, dimensoes, formato escolhido, qualidade, tamanho de blob, metadados, pixels, erro tecnico com nome de arquivo ou conteudo de imagem.
- Dropzone, before/after preview, workflow snapshot, privacy checklist, related tools e batch queue gated da Sprint 7.11 devem permanecer derivados de arquivo local em memoria e nao podem ativar upload server-side, batch worker, AI provider, API paga ou checkout.
- Batch, pastas, arquivos maiores, API, integracoes, alta resolucao e IA exigem auth, billing/entitlements, quotas, upload validation, sandbox, antivirus quando aplicavel, retencao/limpeza de temporarios, provider review e gates de deploy antes de ativacao.

## DocShift browser document processing

- Ferramentas da Sprint 5.2 cobrem merge, split, rotate, compress/rewrite, watermark, page numbers, metadata cleaner e text-to-pdf no navegador.
- O MVP aceita apenas PDF para ferramentas de documento, com limite gratuito de 5 arquivos, 12 MB totais, selecao de paginas limitada e texto de entrada limitado a 12.000 caracteres.
- O worker deve validar tipo, extensao, tamanho, contagem de arquivos, page ranges, rotacao, watermark e metadados antes de `pdf-lib` gerar a saida.
- Object URLs devem ser revogados apos uso; inputs e outputs nao devem ser gravados em `localStorage`, `sessionStorage`, IndexedDB, cookies, backend, logs ou analytics.
- Metadata cleaner e compress/rewrite nao devem prometer redacao forense, OCR, downsampling de imagens ou remocao garantida de conteudo invisivel fora do suporte do `pdf-lib`.
- Analytics de DocShift nao deve incluir nome do arquivo, texto colado, texto de paginas, metadados, page count, selecao de paginas, tamanho de blob/PDF, bytes gerados ou erro tecnico com detalhes do documento.
- Dropzone, file state, workflow snapshot, privacy checklist, related tools e server/OCR/batch gated da Sprint 7.12 devem permanecer derivados de arquivo/texto local em memoria e nao podem ativar upload server-side, OCR provider, batch worker, API paga, checkout, historico ou conta.
- Batch, arquivos maiores, OCR, conversoes DOCX/imagem, API, historico e equipes exigem auth, billing/entitlements, quotas, upload validation, sandbox, antivirus quando aplicavel, retencao/limpeza de temporarios, exportacao/exclusao, provider review e gates de deploy antes de ativacao.

## NetProbe public API

- `GET /api/v1/netprobe/ip` nao deve persistir o IP completo do visitante; a resposta informa a politica de retencao.
- `POST /api/v1/netprobe/dns` aceita apenas hostnames normalizados e tipos DNS permitidos.
- URLs, portas, caminhos, query strings, hostnames locais/reservados e aliases como `localhost`/`.local` devem ser rejeitados antes de resolver DNS.
- Respostas A/AAAA que apontem para IP privado, loopback, metadata ou ranges reservados devem bloquear o resultado completo.
- Endpoints publicos NetProbe usam rate limit dedicado `netprobe-public` e cache TTL por lookup para reduzir abuso e custo.
- Analytics de ferramentas NetProbe nao deve incluir hostname, IP consultado, query DNS ou valor bruto inserido pelo usuario.
- RDAP deve retornar apenas fatos de dominio e registrar; contato pessoal, entidades de registrant/admin/tech e vCards nao devem ser expostos na resposta resumida.
- SSL deve resolver e validar A/AAAA publico antes de conectar, limitar o probe a `443`, usar timeout curto e declarar limitacoes de cadeia/validacao.
- Propagation deve usar apenas snapshots DNS controlados; a versao inicial usa o resolver local e nao executa probes multirregiao externos.
- Port checker deve aceitar somente a allowlist `80/443/587/993`, validar A/AAAA publico antes de conectar, limitar a quantidade de enderecos testados e usar timeout curto.
- Reachability deve manter ICMP e traceroute desabilitados no request web; ate haver workers controlados, apenas TCP 443 limitado pode ser executado.
- A API autenticada de monitores `/api/v1/netprobe/monitors` exige permissao `operations.manage` enquanto nao houver auth/billing de clientes.
- Targets de monitores sao dados operacionais de conta e nao devem ir para analytics ou logs publicos; auditoria deve usar hash do alvo.
- Alertas de webhook exigem URL HTTPS, host publico e resolucao A/AAAA publica antes de qualquer entrega; entrega externa fica desativada por padrao via config.
- Alertas por e-mail/webhook devem armazenar apenas hash do destino em `net_probe_alerts`.
- Artefatos publicos do NetProbe nao podem conter `localhost:8013`, `127.0.0.1:8013` ou URL local para `/api/v1/netprobe`; a API publica deve ser HTTPS e validada por smoke antes de troca de release.
- O workflow de deploy estatico do NetProbe deve preservar `.env`, placeholder remoto e pastas manuais, publicando apenas em release versionado e trocando o `.htaccess` gerenciado do app.

## Control plane public deploy

- Artefatos Laravel do control-plane nao podem conter `.env`, arquivos de chave, senhas cPanel, placeholders `noindex` ou dependencias dev de teste.
- O ZIP de deploy deve ser extraido em release versionado e removido/lixeira apos extracao para evitar download de codigo-fonte.
- `_control-plane-releases` deve permanecer protegido por `.htaccess` deny; o trafego publico deve passar pelo front controller gerenciado em `/supersites/control-plane/index.php`.
- O front controller gerenciado deve usar o handler cPanel `ea-php84___lsphp` e fazer bootstrap direto do Laravel do release ativo; releases antigos continuam protegidos por deny.
- `.env` remoto deve vir somente de GitHub environment secrets ou inventario local ignorado. O deploy deve preservar `.env` existente e nunca imprimir valores.
- O smoke publico do control-plane deve rejeitar HTML, placeholder, `noindex` e `Internal Server Error` nos endpoints JSON.
- Diagnostico temporario do deploy (`enable_diagnostics`) deve permanecer desativado por padrao, retornar apenas campos sanitizados e ser seguido por deploy/rollback sem diagnostico.
- Migrações e crons nao devem rodar automaticamente no primeiro deploy publico da API; qualquer migracao futura exige backup/rollback explicito antes do switch.

## Redis/VPS

- Redis de producao inicial roda na VPS como `supersites-redis.service`.
- Redis deve permanecer autenticado e restrito a `127.0.0.1:6381`.
- Portas Redis publicas (`6379`, `6380`, `6381`) devem continuar fechadas/filtradas.
- Validar com `scripts/validate-vps-runtime.ps1` apos mudancas de runtime ou deploy que dependa de Redis.

## Validacao minima por sprint

- Busca por padroes de segredo antes de commit.
- Testes de autorizacao/RBAC quando backend/admin mudar.
- Testes de SSRF/rate limit quando ferramenta de rede mudar.
- Smoke em producao apos deploy.

## Billing webhook dry-run

- O endpoint `/api/v1/billing/webhooks/{provider}` aceita somente providers allowlisted e usa throttle publico dedicado pela rota.
- O receiver exige timestamp, assinatura `sha256=<hmac>` e janela de replay configurada; eventos stale, sem assinatura ou com HMAC invalido sao rejeitados.
- O segredo de dry-run vem de ambiente e fica vazio por padrao; nenhum secret real de Stripe, Mercado Pago, Paddle ou outro provider pode ser versionado.
- A idempotencia e feita por provider + event id + hash de payload; hash divergente para o mesmo evento retorna conflito e gera auditoria.
- Eventos aceitos ficam `dry_run` e nao disparam alteracao de plano, checkout, entitlement, invoice, pagamento, refund, dunning, imposto ou chamada a provider.

## Paid monitor preview

- `/api/v1/monitoring/previews` exige autenticacao e permissao `operations.manage`.
- Targets hostname usam `NetProbeHostGuard`; URLs de SitePulse aceitam apenas HTTP/HTTPS, bloqueiam credenciais, fragmentos, query strings e portas nao web.
- O preview nao executa probe de rede, nao agenda jobs e nao envia alertas; ele apenas valida shape, quota e entitlement.
- Auditoria grava hash do target, sem target bruto, headers, query string, resultado tecnico ou destino de alerta.
- Worker recorrente, multi-regiao, alertas reais, DMARC recorrente, status page e billing medido continuam bloqueados ate gates operacionais e humanos.

## Growth reporting readiness

- `/api/v1/growth/reporting-readiness` exige autenticacao e permissao `dashboard.view`.
- O endpoint retorna apenas metadados agregados de relatorios executivos e status de ingestao; nao retorna provider payload, token, query, invoice, click id, customer id, PII ou segredo.
- Auditoria registra somente versao do contrato, contagens agregadas, provider activation falso e `causality_status`.
- Envio recorrente, e-mail externo, provider import, revenue reporting e causalidade ficam bloqueados ate matriz de dados, revisao humana, cofre e smokes especificos.
