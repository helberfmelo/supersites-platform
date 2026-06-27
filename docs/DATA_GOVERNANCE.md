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

- Snippets e entradas de ferramentas dev sao processados no navegador, preferencialmente em Web Worker, no MVP da Sprint 3.2.
- JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes nao devem ser enviados para backend, analytics, logs, GA4, GTM, AdSense ou data layer.
- O app nao salva historico, workspaces, lote, arquivos, contas, `localStorage` ou `sessionStorage` nesta sprint.
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

## Analytics sem PII

- O contrato versionado fica em `packages/analytics`.
- Eventos permitidos passam por allowlist antes de armazenamento.
- Chaves como e-mail, telefone, documento, senha, token, chave API, cartao, banco, IP, nome e endereco sao descartadas.
- Valores string com e-mail, IP, tokens longos ou numeros longos sao redigidos.
- URLs armazenadas para analytics nao carregam query string nem fragmento.
- Identificadores anonimos e de sessao sao armazenados apenas como hash no control plane.

## Direitos do titular

Implementar exportacao, exclusao e retificacao antes de contas pagas em producao.
