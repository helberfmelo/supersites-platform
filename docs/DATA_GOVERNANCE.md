# Data Governance

## Principios

- Minimizar coleta.
- Processar no navegador quando possivel.
- Nao enviar PII para GA4, AdSense, logs ou ferramentas de observabilidade.
- Nao usar dados do usuario para treinamento sem opt-in explicito.
- Manter matriz por site/tipo de dado antes do lancamento.

## Retencao inicial

| Dado | Padrao inicial |
|---|---|
| IP de visitante | Nao armazenar completo salvo seguranca operacional com retencao curta |
| Entradas de ferramentas dev | Nao armazenar |
| Campos de faturas/orcamentos/recibos | Nao armazenar no MVP gratuito |
| Arquivos enviados | Temporario; apagar automaticamente |
| Historico pago | Manter enquanto conta ativa e conforme termos |
| Logs tecnicos | Sanitizados e com retencao definida |
| Eventos analytics | Sem PII e com consentimento quando exigido |

## NetProbe Atlas

- IP exibido em `what-is-my-ip`, resultado DNS, propagation, port checker e reachability sao tratados como resposta transitoria da ferramenta.
- O endpoint `/api/v1/netprobe/ip` nao deve persistir o IP completo fora de logs tecnicos operacionais inevitaveis da plataforma.
- O endpoint `/api/v1/netprobe/dns` pode usar cache tecnico de curta duracao por hostname/tipo normalizado, sem associar resultado a usuario autenticado ou identificador pessoal.
- Os endpoints `/api/v1/netprobe/propagation`, `/api/v1/netprobe/port` e `/api/v1/netprobe/reachability` podem usar cache tecnico curto por hostname/tipo/porta normalizados, sem associar resultado a usuario autenticado ou identificador pessoal.
- Hostname, IP consultado e registros retornados nao devem ser enviados para analytics, GA4, GTM, AdSense ou data layer.
- Erros de validacao/SSRF devem expor mensagens controladas, sem revelar detalhes internos de rede ou resolver.
- RDAP resume apenas fatos publicos de dominio, registrar, status, datas, nameservers e notices/remarks; contatos pessoais e vCards devem ser omitidos.
- SSL resume apenas facts tecnicos do certificado servido e enderecos publicos checados; certificado bruto e alvo digitado nao devem ser enviados a analytics.
- Port checker e reachability podem exibir enderecos publicos checados, status e latencia aproximada como resultado transitorio; alvo digitado, porta escolhida e latencia nao devem ser enviados a analytics.
- Monitores pagos/preview de DNS, SSL e dominio armazenam target normalizado, configuracao, historico de checks e alertas como dado operacional da conta.
- Historico de checks deve guardar apenas resumo tecnico limitado, status, timestamps, duracao e erro controlado; payload bruto de certificados/RDAP/DNS nao deve ser persistido sem necessidade.
- Destinos de alertas devem ser armazenados em `net_probe_alerts` apenas como hash; o valor bruto fica na configuracao do monitor enquanto a conta estiver ativa e conforme termos futuros.
- Auditoria de criacao/execucao manual de monitores deve registrar hash do alvo, nao o alvo bruto.
- Smokes de deploy publico do NetProbe devem usar somente alvos controlados como `example.com`; dados enviados por usuarios reais nao devem ser reutilizados para validacao operacional.
- Smokes de deploy publico do control-plane/API devem usar apenas `/health`, IP observado da propria requisicao e DNS de `example.com`; nao usar entradas reais de usuarios para validar deploy.

## CalcHarbor

- Inputs financeiros e empresariais digitados nas calculadoras sao processados no navegador no MVP da Sprint 3.1.
- Valores de emprestimo, taxas, prazos, margem, custo fixo, receita, investimento, lucro e resultados calculados nao devem ser enviados para backend, analytics, logs, GA4, GTM, AdSense ou data layer.
- O app nao salva cenarios, historico, exportacoes ou contas nesta sprint.
- Eventos locais permitidos devem conter apenas `tool_slug` e metadados de UI sem valores de negocio.
- Futuras funcionalidades pagas de cenarios salvos, API, widgets ou colaboracao exigem matriz de dados, retencao, exportacao/exclusao e termos antes de ativacao.

## DevUtility Lab

- Snippets e entradas de ferramentas dev sao processados no navegador, preferencialmente em Web Worker, dentro do workbench gratuito.
- JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes nao devem ser enviados para backend, analytics, logs, GA4, GTM, AdSense ou data layer.
- O app nao salva historico, workspaces, lote, arquivos, contas, `localStorage` ou `sessionStorage`; copiar/baixar resultado gera apenas arquivo local iniciado pelo usuario.
- Eventos locais permitidos devem conter apenas `tool_slug`, rota, locale e metadados de UI sem conteudo do usuario.
- Futuras funcionalidades pagas de historico privado, workspaces, processamento em lote, arquivos maiores ou API exigem matriz de dados, retencao, exportacao/exclusao, termos e controles de segredo antes de ativacao.

## TimeNexus

- Entradas de fusos, datas, dias uteis, timestamps, idade, porcentagem e unidades sao processadas no navegador, preferencialmente em Web Worker, no MVP da Sprint 3.3.
- Datas, horarios, zonas, data de nascimento, data de referencia, valores numericos, unidades e resultados nao devem ser enviados para backend, analytics, logs, GA4, GTM, AdSense ou data layer.
- O app nao salva presets, historico, widgets, contas, `localStorage` ou `sessionStorage` nesta sprint.
- Eventos locais permitidos devem conter apenas `tool_slug`, rota, locale e metadados de UI sem valores do usuario.
- Futuras funcionalidades pagas de widgets, API, presets ou historico exigem matriz de dados, retencao, exportacao/exclusao, termos e controles de privacidade antes de ativacao.

## QRRoute

- Entradas de QR estatico, barcode, UTM, vCard, Wi-Fi e preview sao processadas no navegador no MVP da Sprint 4.1.
- URLs, query strings, parametros UTM, contatos, telefones, e-mails, websites, Wi-Fi SSID/passwords, payloads gerados e previews nao devem ser enviados para backend, logs, GA4, GTM, AdSense ou data layer.
- O app nao salva historico, short links, dominios, lotes, contas, `localStorage` ou `sessionStorage` nesta sprint.
- Eventos locais permitidos devem conter apenas `tool_slug`, rota, locale e metadados de UI sem payload do usuario.
- A fundacao de redirect service no control-plane armazena somente dados de links dinamicos futuros quando criados por fluxo autenticado/gated; Sprint 4.1 testa `destination_hash`, status, expiracao e contagem agregada, mas nao ativa criacao publica.
- Futuras funcionalidades pagas de QR dinamico, short links, scan/click analytics, dominio proprio, lote ou API exigem matriz de dados, retencao, exportacao/exclusao, termos, workflow antiabuso e controles de privacidade antes de ativacao.

## InvoiceCraft

- Campos de emissor, cliente, documento, itens, valores, ajustes/impostos manuais, termos e notas sao processados no navegador no MVP da Sprint 4.2.
- PDFs sao gerados localmente via import dinamico de `jspdf`; o PDF e os campos usados para cria-lo nao devem ser enviados para backend, analytics, logs, GA4, GTM, AdSense ou data layer.
- O app nao salva clientes, produtos, faturas, recibos, orcamentos, historico, contas, `localStorage` ou `sessionStorage` nesta sprint.
- Eventos locais permitidos devem conter apenas `tool_slug`, rota, locale e metadados de UI sem dados de documento.
- Linhas manuais de imposto/ajuste sao apenas formatacao; templates fiscais, numeracao oficial, calculo automatico de impostos, pagamentos ou recorrencia exigem `HUMAN_ACTION_REQUIRED`, matriz de dados, retencao, exportacao/exclusao, termos e controles de privacidade antes de ativacao.

## MailHealth

- Dominios, selectors, hosts MX/SMTP, DNSBL probes e resultados de SPF, DKIM, DMARC, MX, blacklist e SMTP sao respostas transitorias da ferramenta no MVP da Sprint 4.3.
- Headers brutos colados no `header-analyzer` sao processados no navegador e nao devem ser enviados a backend, analytics, logs, GA4, GTM, AdSense, data layer, `localStorage` ou `sessionStorage`.
- Endpoints publicos MailHealth podem usar cache tecnico curto por dominio/check/selector/porta normalizados, sem associar resultado a usuario autenticado ou identificador pessoal.
- Respostas DNS/SMTP podem exibir fatos tecnicos necessarios para o usuario, mas nao devem ser enviadas a analytics.
- DNSBL e SMTP usam alvos derivados de dominios publicos e devem bloquear ranges privados/reservados antes de qualquer consulta ou conexao.
- Futuros recursos pagos de monitoramento, alertas, relatorios DMARC, lote, API, white-label, historico e equipes exigem matriz de dados, retencao, exportacao/exclusao, termos, provider-policy review e consentimento aplicavel antes de ativacao.

## SitePulse Lab

- URLs alvo, redirect targets, headers, robots, sitemap, status, tempos, warnings e resultados de probe sao respostas transitorias da ferramenta no MVP da Sprint 4.4.
- Endpoints publicos SitePulse podem usar cache tecnico curto por URL normalizada e checks solicitados, sem associar resultado a usuario autenticado ou identificador pessoal.
- Respostas podem exibir fatos tecnicos necessarios para o usuario, mas nao devem ser enviadas a analytics, GA4, GTM, AdSense ou data layer.
- O app nao salva historico de testes, uptime, incidentes, status page, alertas, targets, contas, `localStorage` ou `sessionStorage` nesta sprint.
- Probes devem bloquear ranges privados/reservados, portas nao web e redirects inseguros antes de qualquer chamada subsequente.
- Futuros recursos pagos de uptime, incidentes, status page, alertas, historico, multi-regiao, API, white-label e equipes exigem matriz de dados, retencao, exportacao/exclusao, termos, antiabuso, provider-policy review e consentimento aplicavel antes de ativacao.

## PixelBatch

- Imagens selecionadas, pixels renderizados, nomes de arquivo, dimensoes, metadados e blobs gerados ficam somente na sessao do navegador no MVP da Sprint 5.1.
- O app nao usa API de upload, backend de arquivo, `localStorage`, `sessionStorage`, IndexedDB ou cookies para inputs/outputs do PixelBatch.
- Object URLs devem ser revogados apos preview/processamento/download para reduzir retencao em memoria.
- Eventos locais permitidos devem conter apenas `tool_slug`, rota e locale; nunca parametros de arquivo, dimensoes, metadados, qualidade, formato escolhido, tamanho de saida ou conteudo de imagem.
- Processamento server-side futuro para batch, API, alta resolucao ou IA exige matriz de dados propria com finalidade, base legal, armazenamento, retencao curta, limpeza automatica, exportacao/exclusao, criptografia, sandbox e antivirus quando aplicavel.

## DocShift

- PDFs selecionados, texto colado, nomes de arquivo, page ranges, metadados e blobs/PDFs gerados ficam somente na sessao do navegador no MVP da Sprint 5.2.
- O app nao usa API de upload, backend de arquivo, `localStorage`, `sessionStorage`, IndexedDB ou cookies para inputs/outputs do DocShift.
- Object URLs devem ser revogados apos preview/processamento/download para reduzir retencao em memoria.
- Eventos locais permitidos devem conter apenas `tool_slug`, rota e locale; nunca nome de arquivo, texto de paginas, texto colado, metadados, page count, page range, tamanho de saida ou conteudo do PDF.
- Processamento server-side futuro para lote, arquivos maiores, OCR, conversoes, historico ou API exige matriz de dados propria com finalidade, base legal, armazenamento, retencao curta, limpeza automatica, exportacao/exclusao, criptografia, sandbox e antivirus quando aplicavel.

## Consentimento e ads

- A CMP local da Sprint 6.1 grava apenas versao, timestamp e escolhas booleanas de `preferences`, `analytics` e `ads` em `localStorage`.
- Consent Mode local usa eventos `supersites_consent_default` e `supersites_consent_update` no `window.dataLayer`; enquanto GA4/GTM nao estiverem aprovados, esses eventos nao saem do navegador.
- O estado TCF e tratado como gate operacional. Na ausencia de CMP certificada em regioes TCF, a fundacao falha fechada e nao permite request real de ads.
- Placeholders de ads registram apenas metadados de slot, pagina sem query/hash, formato e status de policy; nao devem conter identificadores de usuario, PII, input de ferramenta ou resultado.
- Nenhum request AdSense, cookie de terceiro, perfil de publicidade, leilao, impressao ou clique e criado nesta sprint.

## Google integrations

- A Sprint 6.2 cria apenas metadados de readiness em `google_integrations`.
- Campos permitidos: site, status de acesso, status GA4/GTM/Search Console, ids de propriedade/container/measurement quando aprovados, flags de tags/importacao e allowlist de eventos.
- Campos proibidos: OAuth refresh/access token, service-account key, verification token secreto, email de usuario, telefone, documento, IP, identificador de visitante, payload de ferramenta ou conteudo de arquivo.
- Eventos destinados a Google usam a mesma sanitizacao do contrato interno e uma allowlist adicional de parametros; propriedades arbitrarias nao saem para provider externo.
- Search Console import deve ficar desligado ate haver verificacao de propriedade, base legal/consentimento aplicavel, quota definida, retry/backoff e registro de origem/atraso dos dados.

## AdSense readiness

- A Sprint 6.3 cria apenas metadados operacionais em `adsense_accounts` e `adsense_site_reviews`.
- Campos permitidos: label do publisher, publisher id quando aprovado, status de beneficiario/conta/termos/fiscal/pagamento/banco/PIN/API, site, URL publica sem query/hash, status de dominio, revisao, `ads.txt`, qualidade, consentimento, policy, smoke e flags de veiculacao.
- Campos proibidos: dados fiscais, dados bancarios, documentos, PIN, OAuth token, refresh token, service-account key, email Google, IP, identificador de visitante, conteudo de ferramenta, arquivo, query string, cookie de terceiro, impressao, clique ou receita individual.
- AdSense Management API, site submission, Auto Ads, manual ads, `ads.txt` real e coleta de receita permanecem desligados ate gates humanos/tecnicos e matriz de dados especifica.

## Billing readiness

- A Sprint 6.4 cria apenas metadados operacionais em `billing_providers`, `billing_plans`, `billing_entitlements` e `billing_webhook_events`.
- Campos permitidos: provider, status de conta/KYC/termos/impostos/perfil de pagamento/API/webhook/checkout, site, slug de plano, moeda, valor em minor units, intervalo, status, entitlements nao sensiveis e hash/id tecnico de evento futuro.
- Campos proibidos: cartao, dados bancarios, documentos fiscais, CPF/CNPJ ou equivalentes, endereco de cobranca, e-mail de cliente, token de provider, API key, webhook secret, payload bruto de webhook, IP, identificador de visitante, conteudo de ferramenta ou arquivo.
- Webhooks reais, historico de assinatura, invoices, refunds, chargebacks, taxes e entitlements pagos permanecem desligados ate matriz de dados, termos, retencao, exportacao/exclusao, idempotencia e assinatura verificada estarem implementados.

## AI growth readiness

- A Sprint 6.5 cria apenas metadados operacionais em `ai_growth_audits`, `ai_growth_recommendations` e `ai_growth_anomalies`.
- Campos permitidos: tipo/status/origem de auditoria, referencias de evidencia, categoria, site, titulo, resumo sanitizado, impacto, esforco, confianca, risco, score de prioridade, status de gate, metrica de anomalia, baseline, valor observado, limiar e timestamp.
- Campos proibidos: PII, e-mail, telefone, documento, IP, query string real, input bruto de ferramenta, arquivo, prompt, resposta de provider, token, OAuth secret, API key, cookie, payload de webhook, dados de cliente, receita individual, cartao ou dados bancarios.
- Anomalias nao devem inferir causalidade sem evidencia; `causalityStatus` permanece `not_inferred` por padrao.
- Provider externo de IA, prompts com dados operacionais, automacao de conteudo, SEO, ads, billing, Search Console ou provider-side mutation permanecem desligados ate matriz de dados, base legal, termos, custo, retencao e aprovacao humana.

## Executive reports

- A Sprint 6.6 cria apenas relatorios operacionais locais em `executive_reports` e `executive_report_items`.
- Campos permitidos: periodo, tipo semanal/mensal, status, fonte, resumo de data status, `causality_status`, secao, site opcional, label de metrica, valor operacional agregado, unidade, evidencia documental e notas sanitizadas.
- Cada item deve marcar `data_status` como `finalized`, `estimated`, `delayed` ou `unavailable`; relatorios exportados devem preservar esse campo.
- Campos proibidos: PII, e-mail, telefone, documento, IP, query string real, input bruto de ferramenta, arquivo, prompt, resposta de provider, token, OAuth secret, API key, cookie, payload de webhook, dados de cliente, cartao, dados bancarios, receita individual ou payload bruto de GA4/Search Console/AdSense/billing.
- `causality_status` permanece `not_inferred`; conclusoes causais exigem contrato futuro de revisao manual e evidencia explicita antes de qualquer export.
- Envio automatico de relatorios, ingestao de providers, agenda recorrente, worker, e-mail externo e snapshots reais de receita/trafego permanecem desligados ate matriz de dados, retencao, exportacao/exclusao e gates humanos/tecnicos.

## Benchmark refinement

- A Sprint 7.2 cria apenas readiness e backlog local em `benchmark_site_readiness` e `benchmark_opportunities`.
- Campos permitidos: site, categoria, titulo, resumo, scores de readiness, prioridade, impacto, esforco, confianca, risco, status, `data_status`, referencias de evidencia documental e flags de gate.
- Campos proibidos: PII, e-mail, IP, query string real, input bruto de ferramenta, arquivo, prompt externo, resposta de provider, token, segredo, dado de cliente, receita individual, payload bruto de GA4/Search Console/AdSense/billing, link de doacao real ou URL de afiliado real.
- Scores da Sprint 7.2 sao estimados a partir de docs, screenshots, testes e CI; provider imports e metricas reais devem permanecer `unavailable` ate gates futuros.
- Oportunidades com AdSense, billing, doacoes, afiliados, impostos, KYC, conta, banco, termos ou provider externo devem permanecer `human_required`.

## Analytics sem PII

- O contrato versionado fica em `packages/analytics`.
- Eventos permitidos passam por allowlist antes de armazenamento.
- Chaves como e-mail, telefone, documento, senha, token, chave API, cartao, banco, IP, nome e endereco sao descartadas.
- Valores string com e-mail, IP, tokens longos ou numeros longos sao redigidos.
- URLs armazenadas para analytics nao carregam query string nem fragmento.
- Identificadores anonimos e de sessao sao armazenados apenas como hash no control plane.

## Direitos do titular

Implementar exportacao, exclusao e retificacao antes de contas pagas em producao.
