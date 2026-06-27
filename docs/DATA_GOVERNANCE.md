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

## Analytics sem PII

- O contrato versionado fica em `packages/analytics`.
- Eventos permitidos passam por allowlist antes de armazenamento.
- Chaves como e-mail, telefone, documento, senha, token, chave API, cartao, banco, IP, nome e endereco sao descartadas.
- Valores string com e-mail, IP, tokens longos ou numeros longos sao redigidos.
- URLs armazenadas para analytics nao carregam query string nem fragmento.
- Identificadores anonimos e de sessao sao armazenados apenas como hash no control plane.

## Direitos do titular

Implementar exportacao, exclusao e retificacao antes de contas pagas em producao.
