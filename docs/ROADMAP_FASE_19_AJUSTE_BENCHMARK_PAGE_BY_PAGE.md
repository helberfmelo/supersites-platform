# Fase 19 - Roadmap proposto de ajuste benchmark page-by-page

Data-base: 2026-07-01

Status: implementacao local concluida em 2026-07-01; aguardando commit, push, Quality Gate, publicacao e revalidacao live solicitada pelo owner. Nao executar AdSense real, checkout, pagamento, afiliado, doacao real, provider externo, OCR/IA externa, upload server-side, DNS/root mapping ou acao irreversivel sem gate humano.

## Fontes consultadas

- `AGENTS.md`
- `docs/OPERATING_CONTEXT.md`
- `docs/RUNBOOKS/SPRINT_EXECUTION.md`
- `docs/RUNBOOKS/RISK_BASED_REFERENCE_INDEX.md`
- `docs/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE.md`
- `docs/PHASE18_BENCHMARK_GRADE_ACCEPTANCE.md`
- `docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`
- `docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK_V2.md`
- `docs/BENCHMARK_MATRIX.md`
- `docs/PHASE_18_BENCHMARK_REFINEMENT_REPORT.md`
- `docs/SITES/*/BENCHMARK_NOTES.md`
- Sitemaps publicos de `https://opentshost.com/supersites/` e dos 10 apps.
- Amostras live por HTTP das homes, paginas de catalogo e rotas criticas.

## Limites desta auditoria

Nao foram executados screenshots, Playwright, Lighthouse, PageSpeed, GTmetrix, smokes publicos, deploy dry-run ou builds amplos, conforme orientacao operacional atual.

Foi tentada uma varredura textual leve de todas as rotas dos sitemaps, sem browser visual, mas ela excedeu 240s e nao gerou artefato final. O roadmap abaixo usa: sitemaps publicos, amostras live diretas, leitura de codigo e documentos de benchmark. A auditoria automatizada 100% deve ficar como etapa opcional de QA/pre-divulgacao.

## Atualizacao live de 2026-07-01

Revalidacao feita sob as restricoes atuais do projeto: sem screenshots, Playwright, Lighthouse, crawler pesado, smoke publico, deploy dry-run ou build amplo.

Achados confirmados no ambiente `https://opentshost.com/supersites/`:

- O Hub raiz ja abre como finder pratico de ferramentas, com busca, categorias e links diretos para ferramentas gratuitas. Ainda assim, o catalogo dos 10 sites deve continuar secundario e sem linguagem operacional.
- As paginas de catalogo `/supersites/en/sites/<site>` ainda mostram sinais internos como `Foundation`, `Planned`, `Launch order`, `Temporary public URL`, `Quality check`, ads/billing/external analytics disabled e rollback/quality checks. Essas paginas devem virar landings publicas por tarefa, nao fichas internas de rollout.
- As homes dos apps estao mais proximas do benchmark do que as paginas de catalogo, porque ja colocam workbench, formulario, editor, dropzone ou relatorio no topo. Mesmo assim, varias ainda exibem frases de desenvolvimento na primeira dobra, como `Workflow checks ready`, `No accounts or storage`, `Commercial redirects planned`, `Payments and taxes planned`, `Monitoring planned`, `No server upload backend active`, `billing`, `ads`, `planned` e `inactive`.
- NetProbe home esta mais proxima do esperado, mas `What is my IP` ainda aparece com botao `Run IP check` em vez de resultado automatico como default seguro, e `DNS Propagation` ainda nao se comporta visualmente como uma referencia do tipo whatsmydns.net: precisa priorizar lista de resolvers/localidades/bandeiras/status e mapa antes de metodologia/guia.
- TimeNexus ainda mostra horarios estaticos de 2026-06-26 no painel principal; a primeira dobra precisa hidratar a hora atual do visitante ou deixar claro que se trata de exemplo editavel.
- As mudancas locais ja existentes na etapa 19 reduzem parte dos problemas de copy/logica, mas a avaliacao live considera a publicacao atual. Antes de fechar a etapa, reconciliar fonte, build publicado e rotas raiz.

## Veredito

Nao esta satisfatorio ainda para a meta "usualmente e visualmente parecido com os concorrentes mais acessados".

O Hub e as paginas de catalogo localizadas ja estao mais proximos do padrao correto: ferramenta primeiro, busca, categorias e links profundos. O problema principal esta nas homes dos apps e em varias paginas de ferramentas, que ainda deixam aparecer linguagem de desenvolvimento, status operacional ou metodologia cedo demais.

Exemplos live observados:

- Hub raiz atual esta melhor e abre como finder de ferramentas, mas ainda precisa manter o catalogo de sites como area secundaria.
- NetProbe app home atual esta melhor, mas DNS Propagation ainda nao parece um `whatsmydns.net` moderno: falta matriz visual global completa, mapa dominante, bandeiras/cidade/pais por servidor e tipos PTR/SOA/SRV/CAA.
- What is my IP ja autoexecuta na rota canonica, mas precisa garantir isso em todas as variantes e manter enrichment/mapa/resultados acima de metodologia.
- CalcHarbor app home ainda mostra "Workflow checks ready", "Ads" e "release checks".
- DevUtility Lab app home ainda mostra "billing", "ads" e "planned".
- TimeNexus app home ainda mostra "No accounts or storage", "billing", "ads" e "inactive"; tambem exibe horarios estaticos de uma data passada quando deveria hidratar o horario atual.
- QRRoute app home ainda mostra "Commercial redirects planned", "billing" e "ads".
- InvoiceCraft app home ainda mostra "Payments and taxes planned", "local free version" e "billing".
- MailHealth e SitePulse app homes ainda mostram "Monitoring planned" e "billing".
- PixelBatch e DocShift app homes ainda mostram "No server upload backend active", "billing", "ads", "planned" e "inactive".

Esses termos podem ser verdadeiros operacionalmente, mas nao pertencem ao topo da experiencia publica. Devem ir para status, metodologia, docs ou admin.

## Execucao local de 2026-07-01

Implementado no codigo-fonte:

- Hub/catalogo: remocao de badges e detalhes operacionais das paginas publicas de sites; copy do catalogo convertida para linguagem de produto e tarefa.
- NetProbe Atlas: DNS Propagation ampliado para `A`, `AAAA`, `CNAME`, `MX`, `NS`, `PTR`, `SOA`, `SRV`, `TXT` e `CAA`; matriz de resolvedores com localidade, bandeira, status, TTL, valores e mapa; `What is my IP` mantido com resultado automatico ao acessar.
- Apps dos 10 sites: termos de desenvolvimento e status interno removidos da primeira dobra; blocos de metodologia/explicacao movidos para abaixo das areas praticas quando apareciam como coluna lateral dominante.
- TimeNexus: exemplos de data/hora passaram a usar a referencia atual do visitante/geracao, removendo data fixa de 2026-06-26.
- Backend Control Plane: resolver DNS e testes ajustados para os tipos extras de propagacao, incluindo PTR/SRV/CAA.

Validacoes locais executadas:

- `pnpm test`
- `pnpm test:netprobe`
- `pnpm test:mailhealth`
- `pnpm test:timenexus`
- `php artisan test --filter=NetProbeApiTest`
- `pnpm build`
- `pnpm build:netprobe`
- `pnpm build:timenexus`
- `pnpm build:mailhealth`
- `pnpm build:sitepulse`
- `pnpm build:pixelbatch`
- `pnpm build:docshift`
- `pnpm build:qrroute`
- `pnpm build:invoicecraft`
- `pnpm build:devutility`
- `pnpm build:calcharbor`
- `pnpm validate:public-copy`
- `pnpm validate:adsense-safe-public`
- `pnpm validate:secrets`
- `git diff --check`

Resultado local: aprovado. Avisos remanescentes conhecidos dos builds Nuxt/Nitro: sourcemap do `nuxt:module-preload-polyfill`, import externo virtual de cache-driver Nitro e deprecacao `DEP0155` de exports com barra final. Nao bloqueiam esta etapa.

## Inventario publico de rotas

Sitemaps publicos em 2026-07-01:

| Superficie | Rotas totais | Rotas EN canonicas relevantes |
|---|---:|---:|
| Hub SuperSites | 96 | 19 |
| NetProbe Atlas | 81 | 16 |
| CalcHarbor | 86 | 17 |
| DevUtility Lab | 91 | 18 |
| TimeNexus | 136 | 27 |
| QRRoute | 76 | 15 |
| InvoiceCraft | 61 | 12 |
| MailHealth | 81 | 16 |
| SitePulse Lab | 81 | 16 |
| PixelBatch | 76 | 15 |
| DocShift | 86 | 17 |
| Total | 951 | 188 |

Regra de execucao: cada etapa abaixo corrige a rota canonica EN e replica a mesma qualidade para PT-BR, ES, FR e DE. Quando uma pagina for templateada por ferramenta, manter a execucao como uma pagina por vez no commit de etapa, mesmo que reutilize o mesmo componente.

## Criterios globais de aceite por pagina

- Primeira dobra entrega uma acao pratica: input, upload, editor, mapa/lista, calculadora ou resultado.
- H1 direto sobre a tarefa do usuario.
- Resultado gratuito completo sem cadastro obrigatorio.
- Resultado em card, tabela, score, mapa, preview ou documento visual, com copiar/exportar/download quando util.
- Metodologia, privacidade, limites, antiabuso, status tecnico, AdSense, doacao e upgrade ficam abaixo do valor util.
- Remover do topo publico: `launch`, `release checks`, `rollback`, `deploy`, `billing`, `ads planned`, `Advertising not active`, `planned`, `inactive`, `worker`, `Public API live`, `local free version`, `no server upload backend active`, `human review`, `tax/legal review` como destaque.
- Manter warnings necessarios em linguagem publica: "payments are not collected here", "files stay in this browser", "this is not legal/tax advice", "advanced account workflows are separate".
- PT-BR, ES, FR e DE sem ingles residual indevido e com acentos reais.
- Ad slots e support/donation permanecem inertes e abaixo do resultado.
- Footer de cada site com links textuais profundos por tarefa.
- `canonical`, `hreflang`, sitemap, title, description e schema preservados.
- Validacao padrao da etapa: `git status`, revisao de diff e `git diff --check`; teste/build focado apenas se a mudanca tocar logica/import/template de risco.

## Etapa 19.0 - Reconciliar producao, fonte e rotas raiz

Objetivo: garantir que `/supersites/<app>/` e `/supersites/<app>/<locale>/` renderizem a mesma experiencia publica atual, sem copia operacional antiga.

Sprints:

- 19.0.1 - Mapear source vs live por app: comparar home raiz, home EN e rotas publicadas.
- 19.0.2 - Decidir por app se a raiz deve renderizar EN, redirecionar para EN ou usar shell localizado sem duplicar copia antiga.
- 19.0.3 - Remover das homes raiz os blocos antigos de status operacional.
- 19.0.4 - Ajustar scripts de smoke/preview que ainda esperem marcadores antigos.
- 19.0.5 - Validacao minima e registro de rotas que exigem deploy posterior.

Paginas:

- `/supersites/`
- `/supersites/<locale>`
- `/supersites/netprobe-atlas/` e `/supersites/netprobe-atlas/<locale>/`
- `/supersites/calcharbor/` e `/supersites/calcharbor/<locale>/`
- `/supersites/devutility-lab/` e `/supersites/devutility-lab/<locale>/`
- `/supersites/timenexus/` e `/supersites/timenexus/<locale>/`
- `/supersites/qrroute/` e `/supersites/qrroute/<locale>/`
- `/supersites/invoicecraft/` e `/supersites/invoicecraft/<locale>/`
- `/supersites/mailhealth/` e `/supersites/mailhealth/<locale>/`
- `/supersites/sitepulse-lab/` e `/supersites/sitepulse-lab/<locale>/`
- `/supersites/pixelbatch/` e `/supersites/pixelbatch/<locale>/`
- `/supersites/docshift/` e `/supersites/docshift/<locale>/`

## Etapa 19.1 - Hub SuperSites

### 19.1.1 - Home do Hub

Rotas: `/supersites/`, `/supersites/<locale>`.

Alterar:

- Manter finder como primeira experiencia: busca, categorias e cards diretos de ferramentas.
- Reduzir qualquer bloco que pareca inventario de portfolio, rollout, status ou monetizacao.
- Site directory dos 10 sites deve ficar abaixo dos atalhos praticos e parecer navegacao secundaria.
- Remover ou rebaixar termos de catalogo interno como "free value", "upgrade path", "launch order", "quality checks" quando aparecerem em qualquer variante.
- Mostrar links diretos para ferramentas de maior intencao: What is my IP, DNS Propagation, PDF Merge, Image Compressor, JSON Formatter, Static QR, Invoice Builder, SPF Checker, Website Status, Time Zone Converter, Loan Payment.
- Footer deve continuar textual, leve e com links profundos.

### 19.1.2 - Catalogos dos 10 sites no Hub

Rotas:

- `/supersites/<locale>/sites/netprobe-atlas`
- `/supersites/<locale>/sites/calcharbor`
- `/supersites/<locale>/sites/devutility-lab`
- `/supersites/<locale>/sites/timenexus`
- `/supersites/<locale>/sites/qrroute`
- `/supersites/<locale>/sites/invoicecraft`
- `/supersites/<locale>/sites/mailhealth`
- `/supersites/<locale>/sites/sitepulse-lab`
- `/supersites/<locale>/sites/pixelbatch`
- `/supersites/<locale>/sites/docshift`

Alterar:

- Confirmar que cada catalogo abre como landing de tarefa, nao ficha interna de produto.
- Garantir CTA primario para a ferramenta carro-chefe real.
- Manter cards de ferramentas reais acima de metodologia/status.
- Onde aparecer `ads`, `planned` ou termos de monetizacao por causa de componentes compartilhados, trocar por linguagem publica ou mover para secao inferior.
- Em NetProbe catalogo, destacar DNS Propagation e What is my IP como caminhos principais.
- Em TimeNexus catalogo, horario atual deve hidratar no cliente, nunca parecer data fixa de build.
- Em Invoice/Pixel/DocShift catalogos, preview/dropzone deve ter mais peso que texto de privacidade.

### 19.1.3 - Paginas institucionais do Hub

Rotas:

- `/supersites/<locale>/about`
- `/supersites/<locale>/contact`
- `/supersites/<locale>/privacy`
- `/supersites/<locale>/cookies`
- `/supersites/<locale>/terms`
- `/supersites/<locale>/methodology`
- `/supersites/<locale>/editorial-policy`
- `/supersites/<locale>/status`

Alterar:

- Manter linguagem de usuario final e remover qualquer retorno de "human review", "roadmap", "release", "billing disabled" ou "ads planned".
- Public Status deve falar de disponibilidade para visitante, nao deploy.
- Methodology deve explicar como interpretar resultados, nao como a plataforma e operada.
- Contact deve mostrar canais claros, sem prometer formulario/backoffice inexistente.

## Etapa 19.2 - NetProbe Atlas

Benchmark principal: `whatsmydns.net`, `dnschecker.org`, `whatismyipaddress.com`, `whatismyip.com.br`, MxToolbox, Whois e SSL Labs.

### 19.2.1 - NetProbe Home

Rotas: `/supersites/netprobe-atlas/`, `/supersites/netprobe-atlas/<locale>/`.

Alterar:

- Primeira dobra: input universal para dominio/IP/host, CTAs para IP, DNS Lookup e DNS Propagation.
- Nada de "Advertising not active", "API live", release ou launch.
- Mostrar cards de ferramentas como escolhas de diagnostico, nao como status de produto.
- Footer NetProbe rico: DNS Tools, DNS Lookup by record, IP Tools, Domain Tools, SSL Tools, Guides, Servers.

### 19.2.2 - What is my IP

Rotas: `/supersites/netprobe-atlas/<locale>/tools/what-is-my-ip`.

Alterar:

- Autoexecutar no carregamento; nenhum botao deve ser necessario para mostrar o IP.
- Primeira dobra: IP observado, IPv4/IPv6, public/private range, horario da consulta, copiar, refresh e detalhes.
- Enrichment: ASN, ISP, reverse DNS, pais/cidade aproximada, proxy/VPN/Tor/datacenter, navegador, plataforma e user-agent quando disponiveis por fonte confiavel.
- Mapa aproximado abaixo do resumo quando houver localizacao; se nao houver, mostrar estado "location not available" sem inventar.
- Privacidade, limites, metodologia e analytics devem ficar abaixo do resultado.
- Remover qualquer CTA de VPN/afiliado real; se houver bloco de privacidade, manter educativo e sem provider.

### 19.2.3 - DNS Propagation

Rotas: `/supersites/netprobe-atlas/<locale>/tools/dns-propagation`.

Alterar:

- Inspirar no padrao mental do `whatsmydns.net`, sem copiar identidade visual.
- Primeira dobra: dominio, tipo de registro, valor esperado opcional e botao de consulta.
- Tipos: A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT e CAA.
- Resultado: status consolidado, porcentagem de match, valores distintos, erros, sem resposta e timestamp.
- Desktop: lista de resolvers/localidades com cidade, pais, bandeira, resolver, valor retornado, TTL e badge propagou/nao propagou; mapa global maior ao lado ou acima conforme melhor leitura.
- Mobile: resumo, filtros, lista compacta por localidade e mapa abaixo/colapsavel.
- Manter honestidade: se a cobertura for matriz controlada, chamar de "controlled resolver snapshot" abaixo do resultado, nao como desculpa no topo.
- Mover "Methodology" e limites para accordion abaixo de resultado, nao coluna lateral dominante.
- Adicionar links internos: DNS Lookup, MX/SPF/DMARC, Reverse DNS, What is my IP, SSL.

### 19.2.4 - DNS Lookup

Rotas: `/supersites/netprobe-atlas/<locale>/tools/dns-lookup`.

Alterar:

- Resultado em tabela clara: tipo, nome, valor, TTL, resolver/source.
- Tabs ou chips por A, AAAA, CNAME, MX, TXT, NS, SOA, CAA.
- Copiar registro e exportar resumo abaixo do resultado.
- Explicacao curta "what this means" antes de raw details.
- Links para DNS Propagation e ferramentas de e-mail.

### 19.2.5 - RDAP Domain Lookup

Rotas: `/supersites/netprobe-atlas/<locale>/tools/rdap-domain-lookup`.

Alterar:

- Cards: registrar, status, datas importantes, nameservers, DNSSEC/redaction.
- Raw RDAP e limitacoes somente abaixo.
- CTA natural: monitorar expiracao como upgrade futuro, sem "planned" no topo.

### 19.2.6 - SSL Certificate Checker

Rotas: `/supersites/netprobe-atlas/<locale>/tools/ssl-certificate-checker`.

Alterar:

- Cards: valid/expiring/expired, issuer, subject, SANs, validade, chain count.
- Aviso honesto: nao e SSL Labs completo.
- Tabela de SAN/chain abaixo; metodologia e limites depois.

### 19.2.7 - Port Checker

Rotas: `/supersites/netprobe-atlas/<locale>/tools/port-checker`.

Alterar:

- Chips de portas comuns permitidas e input host.
- Resultado open/closed/timeout/blocked com explicacao simples.
- Allowlist e antiabuso abaixo, nao como primeira mensagem.

### 19.2.8 - Ping and Traceroute

Rotas: `/supersites/netprobe-atlas/<locale>/tools/ping-traceroute`.

Alterar:

- Renomear se necessario para nao prometer traceroute real quando so ha TCP reachability.
- Resultado principal: TCP 443 reachable/timeout, latencia e interpretacao.
- ICMP/traceroute indisponivel deve aparecer como limite tecnico abaixo, nao como falha do produto.

## Etapa 19.3 - CalcHarbor

Benchmark principal: Calculator.net, Omni Calculator, CalculatorSoup, Bankrate, NerdWallet.

### 19.3.1 - CalcHarbor Home

Rotas: `/supersites/calcharbor/`, `/supersites/calcharbor/<locale>/`.

Alterar:

- Remover "Workflow checks ready", "Ads", "release checks" do topo.
- Primeira dobra: calculadora selecionada com resultado vivo, formula curta e cenario.
- Moeda por locale: BRL para PT-BR, EUR para FR/DE/ES quando adequado, USD para EN global.
- Grid denso de categorias e calculadoras reais abaixo.
- Conteudo educativo, metodologia, ads/support e upgrade somente depois.

### 19.3.2 - Calculadoras

Rotas:

- `/calculators/loan-payment`
- `/calculators/compound-interest`
- `/calculators/savings-goal`
- `/calculators/break-even-point`
- `/calculators/gross-margin`
- `/calculators/cash-runway`
- `/calculators/discount-price`
- `/calculators/roi`

Alterar em todas:

- H1 com intencao exata.
- Resultado acima da dobra.
- Formula visivel apos o resultado, nao antes.
- Passo a passo expansivel.
- Tabela ou grafico leve quando acrescentar valor.
- Botao copiar resumo e download/export inerte ou local quando ja suportado.
- FAQ, exemplos e calculadoras relacionadas abaixo.

Ajustes por pagina:

- Loan Payment: pagamento mensal, total pago, juros totais, resumo de amortizacao.
- Compound Interest: valor final, juros ganhos, contribuicoes e serie temporal.
- Savings Goal: aporte mensal necessario, data estimada e lacuna para meta.
- Break-even Point: unidades, receita de equilibrio e grafico de lucro/prejuizo.
- Gross Margin: margem, markup, lucro bruto e cenarios de custo.
- Cash Runway: meses restantes, data estimada de fim e ajustes possiveis.
- Discount Price: preco final, economia e impacto em margem.
- ROI: retorno liquido, ROI percentual, nao anualizado e cenarios conservador/base/agressivo.

## Etapa 19.4 - DevUtility Lab

Benchmark principal: CodeBeautify, JSONFormatter, regex101, jwt.io, CyberChef.

### 19.4.1 - DevUtility Home

Rotas: `/supersites/devutility-lab/`, `/supersites/devutility-lab/<locale>/`.

Alterar:

- Remover "billing", "ads" e "planned" do topo.
- Primeira dobra: workbench real com input/editor, output/editor e toolbar.
- Nao mostrar "Ready for local run" como resultado principal; carregar exemplo com output concreto.
- Busca e categorias densas, mas abaixo do workbench.
- Privacidade deve aparecer como cue curta, nao como bloco dominante.

### 19.4.2 - Ferramentas DevUtility

Rotas:

- `/tools/structured-data-formatter`
- `/tools/base64-converter`
- `/tools/jwt-inspector`
- `/tools/regex-tester`
- `/tools/text-diff`
- `/tools/cron-helper`
- `/tools/uuid-generator`
- `/tools/timestamp-converter`
- `/tools/hash-generator`

Alterar em todas:

- Layout split input/output em desktop; empilhado em mobile.
- Toolbar: exemplo, limpar, copiar, baixar quando util.
- Erros destacados e uteis.
- Output concreto no exemplo inicial.
- Local-processing cue curta perto da ferramenta.
- Guia, FAQ, metodologia e upgrade abaixo.

Ajustes por pagina:

- Structured Data: JSON/XML/YAML/CSV, format/minify/validate, raw/tree/table/errors.
- Base64: encode/decode, UTF-8 claro, erro de base64 invalido.
- JWT: header/payload, signature-present, aviso de que nao verifica assinatura.
- Regex: flags, matches, grupos capturados e highlight.
- Text Diff: esquerda/direita e diff lado a lado/linha.
- Cron: descricao humana, proximas execucoes e timezone.
- UUID: quantidade, copiar um/copiar todos.
- Timestamp: seconds/ms/ISO/local, copiar formatos.
- Hash: SHA-256/SHA-1, aviso de que hash nao e armazenamento seguro de senha.

## Etapa 19.5 - TimeNexus

Benchmark principal: timeanddate, Time.is, World Time Buddy, 24timezones.

### 19.5.1 - TimeNexus Home

Rotas: `/supersites/timenexus/`, `/supersites/timenexus/<locale>/`.

Alterar:

- Remover "No accounts or storage", "billing", "ads" e "inactive" do topo.
- Horarios e datas devem hidratar no cliente e refletir o momento atual; nao renderizar data fixa de build como resultado principal.
- Primeira dobra: hora atual, cidades favoritas e meeting planner/timeline.
- Timeline visual estilo comparacao de fusos, com design proprio.
- Metodologia, DST e limites abaixo.

### 19.5.2 - Ferramentas TimeNexus

Rotas:

- `/tools/timezone-converter`
- `/tools/date-difference`
- `/tools/business-days`
- `/tools/timestamp-converter`
- `/tools/age-calculator`
- `/tools/percentage-calculator`
- `/tools/unit-converter`

Alterar:

- Resultado recalculado ao editar.
- Cards de resposta clara antes da explicacao.
- Copiar resultado.
- Exemplos localizados.
- Para datas/dias uteis, explicar inclusivo/exclusivo e fins de semana.
- Para timezone, timeline comparativa e indicadores de horario comercial.

### 19.5.3 - World Clock e cidades

Rotas:

- `/world-clock/americas-europe`
- `/world-clock/global-product`
- `/world-clock/apac-europe`
- `/world-clock/cities/new-york`
- `/world-clock/cities/sao-paulo`
- `/world-clock/cities/london`
- `/world-clock/cities/berlin`
- `/world-clock/cities/san-francisco`
- `/world-clock/cities/tokyo`
- `/world-clock/cities/singapore`
- `/world-clock/cities/sydney`

Alterar:

- Hora atual real acima da dobra.
- Cards de cidade com offset, abreviacao, dia local e horario comercial.
- Timeline comparativa em grupos.
- Conteudo de cidade/fuso somente se original e util; evitar pagina fina.
- Mobile: tabela/timeline sem overflow.

## Etapa 19.6 - QRRoute

Benchmark principal: QR Code Generator, ME-QR, TinyURL, Bitly.

### 19.6.1 - QRRoute Home

Rotas: `/supersites/qrroute/`, `/supersites/qrroute/<locale>/`.

Alterar:

- Remover "Commercial redirects planned", "billing", "ads" e "planned" do topo.
- Primeira dobra: tabs de tipo, input/configuracao a esquerda e preview grande a direita.
- Downloads explicitos PNG, SVG e PDF quando tecnicamente disponiveis; se PDF nao existir, planejar como backlog abaixo.
- Diferenca static vs dynamic em bloco abaixo do preview, nao como aviso principal de produto inacabado.
- Templates de uso: restaurante, evento, Wi-Fi, cartao, campanha, embalagem.

### 19.6.2 - Ferramentas QRRoute

Rotas:

- `/tools/static-qr-code`
- `/tools/barcode-generator`
- `/tools/utm-builder`
- `/tools/vcard-qr`
- `/tools/wifi-qr`
- `/tools/preview-lab`

Alterar:

- Static QR: preview dominante, payload claro, safe URL, copiar e download.
- Barcode: preview grande, padroes suportados e limites de caracteres.
- UTM: URL final, parametros, QR opcional e copiar.
- vCard: campos comuns, preview e aviso de privacidade.
- Wi-Fi: SSID/security/password, aviso para nao publicar segredo sensivel.
- Preview Lab: inspecionar payload e explicar risco/uso sem prometer deteccao total de phishing.

## Etapa 19.7 - InvoiceCraft

Benchmark principal: Invoice Generator, Invoice Simple, Zoho free invoice generator.

### 19.7.1 - InvoiceCraft Home

Rotas: `/supersites/invoicecraft/`, `/supersites/invoicecraft/<locale>/`.

Alterar:

- Remover "Payments and taxes planned", "billing", "local free version" e "tax/legal review" do topo.
- Primeira dobra: editor e preview de documento.
- Preview deve parecer documento real, nao apenas snapshot textual.
- Templates: simple, professional, compact, service, product.
- Disclaimer fiscal/local abaixo do download, com linguagem publica e sem gate interno.

### 19.7.2 - Builders

Rotas:

- `/tools/invoice-builder`
- `/tools/quote-builder`
- `/tools/receipt-builder`

Alterar:

- Formulario lateral + preview.
- Download PDF gratuito e claro.
- Campos: issuer, client, items, quantity, unit price, discount, freight/shipping, manual adjustment/tax label, dates, terms, notes.
- Locale/currency por idioma.
- Invoice: due date e total due.
- Quote: valid-until, acceptance text e label de estimativa.
- Receipt: paid date, paid status e payment reference manual.
- PT-BR: deixar claro que nao e nota fiscal oficial.

## Etapa 19.8 - MailHealth

Benchmark principal: MxToolbox, Mail-Tester, EasyDMARC, dmarcian.

### 19.8.1 - MailHealth Home

Rotas: `/supersites/mailhealth/`, `/supersites/mailhealth/<locale>/`.

Alterar:

- Remover "Monitoring planned", "billing" e "local free version" do topo.
- Primeira dobra: dominio/email input e health score visual.
- Resultado: overall score, auth, DNS, reputation, SMTP, headers.
- Problemas com severity pass/warn/fail e "Fix this".
- Raw records e metodologia abaixo.

### 19.8.2 - Checks MailHealth

Rotas:

- `/tools/spf-checker`
- `/tools/dkim-checker`
- `/tools/dmarc-checker`
- `/tools/mx-checker`
- `/tools/blacklist-check`
- `/tools/smtp-check`
- `/tools/header-analyzer`

Alterar:

- SPF: registro, mecanismos arriscados, duplicate SPF, lookup count e fix.
- DKIM: selector, key presence, version, tamanho quando disponivel; nao expor chave bruta como destaque.
- DMARC: policy, pct, rua/ruf, alinhamento e recomendacao.
- MX: hosts, prioridade, resolucao publica e problemas.
- Blacklist: amostra limitada, status por lista, explicacao de limites.
- SMTP: TCP reachability sem envio de mensagem, portas permitidas.
- Header Analyzer: parse local, Authentication-Results, SPF/DKIM/DMARC pass/fail, sem envio ao backend.

## Etapa 19.9 - SitePulse Lab

Benchmark principal: DownForEveryoneOrJustMe, GTmetrix, PageSpeed Insights, SecurityHeaders, Redirect Checker.

### 19.9.1 - SitePulse Home

Rotas: `/supersites/sitepulse-lab/`, `/supersites/sitepulse-lab/<locale>/`.

Alterar:

- Remover "Monitoring planned" e "billing" do topo.
- Nao deixar `--`, "Waiting" ou "Ready" dominar primeira dobra.
- Primeira dobra: URL input e status hero apos acao: Online, Redirecting, Slow, Down ou Error.
- Cards: Availability, Redirects, Headers, Crawlability, Performance.
- Upgrade/monitoramento abaixo do relatorio.

### 19.9.2 - Checks SitePulse

Rotas:

- `/tools/status-checker`
- `/tools/redirect-chain`
- `/tools/security-headers`
- `/tools/robots-checker`
- `/tools/sitemap-validator`
- `/tools/ttfb-check`
- `/tools/performance-snapshot`

Alterar:

- Status: HTTP class, timing, final URL e interpretacao.
- Redirect Chain: hop table, cross-host, loops e slow hops.
- Security Headers: present/missing, severity e fix.
- Robots: directives, sitemap hints e parse status.
- Sitemap: XML validity, URL count, same-origin notes.
- TTFB: escala visual e faixa de interpretacao.
- Performance Snapshot: sinal leve, sem prometer PageSpeed completo.

## Etapa 19.10 - PixelBatch

Benchmark principal: remove.bg, TinyPNG, iLoveIMG, Squoosh.

### 19.10.1 - PixelBatch Home

Rotas: `/supersites/pixelbatch/`, `/supersites/pixelbatch/<locale>/`.

Alterar:

- Remover "No server upload backend active", "billing", "ads", "planned", "inactive" e "local free version" do topo.
- Primeira dobra: dropzone dominante, tipo de tarefa e preview antes/depois.
- Mostrar metricas: tamanho original, tamanho final, economia %, dimensoes, formato.
- Presets de marketplace/social com nomes uteis.
- Background remover deve ser backlog/upgrade abaixo, nao promessa central sem infraestrutura.

### 19.10.2 - Ferramentas PixelBatch

Rotas:

- `/tools/image-compressor`
- `/tools/image-resizer`
- `/tools/image-cropper`
- `/tools/image-converter`
- `/tools/metadata-remover`
- `/tools/social-preset-generator`

Alterar:

- Compressor: quality, formato, before/after, savings.
- Resizer: width/height, aspect lock, target presets.
- Cropper: area, ratio presets, preview.
- Converter: input/output formats e compatibilidade do browser.
- Metadata Remover: explicar re-encode e limites.
- Social Preset: tamanhos por plataforma, export local, sem prometer publicacao.

## Etapa 19.11 - DocShift

Benchmark principal: iLovePDF, Smallpdf, Sejda, PDF24, Online2PDF.

### 19.11.1 - DocShift Home

Rotas: `/supersites/docshift/`, `/supersites/docshift/<locale>/`.

Alterar:

- Remover "No server upload backend active", "billing", "ads", "planned" e "local free version" do topo.
- Primeira dobra: grid de ferramentas PDF e dropzone dominante para fluxo selecionado.
- Fluxo claro: 1 upload, 2 configurar/reordenar, 3 baixar.
- CTA de download deve ser claro depois do processamento.
- Politica de arquivo/retencao abaixo do dropzone, sem dominar.

### 19.11.2 - Ferramentas DocShift

Rotas:

- `/tools/pdf-merge`
- `/tools/pdf-split`
- `/tools/pdf-rotate`
- `/tools/pdf-compressor`
- `/tools/pdf-watermark`
- `/tools/page-numbers`
- `/tools/metadata-cleaner`
- `/tools/text-to-pdf`

Alterar:

- PDF Merge: ordenacao visual, paginas/arquivos, download unico.
- PDF Split: selecao de paginas/ranges e preview de saida.
- PDF Rotate: paginas e graus de rotacao.
- PDF Compressor: nivel de compressao e tamanho antes/depois quando possivel.
- PDF Watermark: texto, posicao, opacidade e preview.
- Page Numbers: posicao, formato e inicio.
- Metadata Cleaner: quais metadados sao removidos e limites.
- Text to PDF: editor simples, preview, download.

## Etapa 19.12 - Rodapes, suporte, AdSense-safe e doacao gated

Alterar em todos os sites:

- Footer textual por clusters profundos, com links reais e leves.
- Ad slots reservados somente apos resultado/interpretação e conteudo util; nunca entre input e acao.
- Copy do placeholder nao deve parecer status interno. Preferir "Reserved space" e "No ad is loaded here" em secoes inferiores.
- Donation/support block discreto apos guia/FAQ, sem link real de pagamento ate gate humano.
- Nenhuma sugestao de clicar em anuncio.

## Etapa 19.13 - Localization QA leve

Alterar:

- Corrigir ingles residual em PT-BR/ES/FR/DE, exceto termos tecnicos justificados.
- Corrigir acentos em PT-BR e idiomas europeus.
- Verificar genero/plural em strings compartilhadas.
- Substituir labels hibridas: "Local free version", "Run tool", "Ready", "Waiting", "Builder", "Workflow", quando a rota localizada exigir traducao natural.
- Nao traduzir campos tecnicos de rota, slug, canonical, hreflang, timezone ids, JSON keys ou valores de protocolo.

## Etapa 19.14 - QA opcional de pre-divulgacao

Executar somente se o owner pedir ou quando esta fase for usada como fechamento/pre-divulgacao.

Sprints:

- 19.14.1 - Crawler textual/links em 951 rotas.
- 19.14.2 - Screenshots desktop/mobile de paginas principais e amostra de tools.
- 19.14.3 - Playwright focado em fluxos principais de cada app.
- 19.14.4 - Lighthouse publico em Hub, 10 homes e paginas carro-chefe.
- 19.14.5 - Relatorio final com gaps, scores e evidencias.

## Ordem recomendada de execucao

1. F19.0 - Reconciliar producao/fonte/rotas raiz.
2. F19.2.2 e F19.2.3 - NetProbe IP e DNS Propagation.
3. F19.3 a F19.11 - uma home de app por vez, depois suas ferramentas.
4. F19.1 - Hub, se alguma alteracao de links/estrutura dos apps exigir ajuste.
5. F19.12 - Rodapes e monetizacao inerte.
6. F19.13 - Localization QA leve.
7. F19.14 - QA opcional quando o owner pedir.

## Observacoes para Codex ao executar

- Antes de cada etapa, reler `docs/OPERATING_CONTEXT.md`, `docs/RUNBOOKS/SPRINT_EXECUTION.md`, este roadmap e `docs/SITES/<site>/BENCHMARK_NOTES.md`.
- Executar uma etapa completa com suas sprints e so entao fazer commit objetivo, push e Quality Gate quando o owner aprovar a execucao.
- Nao atualizar `STATUS.md` ou `METRICS.md` em microcorrecao visual; atualizar apenas em fechamento de etapa/fase ou quando o owner pedir.
- Se a etapa tocar pagamento, doacao real, AdSense real, provider externo, storage/upload server-side, OCR/IA externa, DNS/root mapping, legal acceptance, KYC, impostos ou banco, registrar `HUMAN_ACTION_REQUIRED` e continuar o restante reversivel.
