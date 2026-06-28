# AUDITORIA LIVE — SUPERSITES VS BENCHMARK FRONTEND/UX/SEO

**Projeto:** `D:\Projetos\supersites`  
**URL auditada:** `https://opentshost.com/supersites/`  
**Documento-base:** `D:\Projetos\supersites\docs\BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`  
**Prints de benchmark:** `D:\Projetos\supersites\docs\benchmarks`  
**Data da auditoria:** 2026-06-27  
**Objetivo:** avaliar se as páginas públicas e ferramentas implementadas estão satisfatórias para cumprir o benchmark definido, principalmente em similaridade funcional/visual com referências validadas de alto tráfego, sem copiar marca, texto, código ou assets.

---

## 0A. Atualizacao final full apos Sprint 9.16

**Data:** 2026-06-28
**URL:** `https://opentshost.com/supersites/`
**Run Playwright:** `2026-06-28T20-51-53-722Z`
**Artefatos locais:** `artifacts/benchmark-crawl/2026-06-28T20-51-53-722Z`
**Baseline versionado:** `docs/benchmarks/our-sites/latest-baseline.md`

Depois dos refinamentos de densidade visual, workbenches task-first, Hub discovery, schema uniforme, metadata publica e gate AdSense-safe, o crawler full final navegou Hub, 10 sites, homes localizadas, ferramentas/calculadoras, paginas legais/editoriais/status e links internos descobertos. O resultado tecnico final para a Fase 9 ficou sem gaps registrados pelo crawler.

| Sinal live | Resultado |
|---|---:|
| Rotas navegadas | 876 |
| Checks desktop/mobile | 1752 |
| Links internos quebrados | 0 |
| Page/browser/console errors | 0 |
| Horizontal overflow | 0 |
| Robots/sitemaps com falha | 0 |
| Missing title/meta/canonical/hreflang | 0 |
| Missing JSON-LD schema | 0 |
| Total de gaps registrados | 0 |
| P75 load proxy | 97 ms |
| P75 LCP proxy | 100 ms |
| P75 CLS proxy | 0 |

### Veredito final da Fase 9

A producao publica esta tecnicamente fechada para o objetivo da Fase 9: os 10 sites e o Hub estao publicados com workbenches ou experiencias task-first, rotas localizadas, schema/canonical/hreflang/sitemap/robots consistentes, smokes publicos verdes e zero gaps no crawler final. O resultado nao ativa monetizacao real: AdSense, GTM/GA4, checkout, billing, pagamentos, doacoes, afiliados, workers recorrentes, APIs pagas, `ads.txt`, publisher id real e direct-root mapping continuam bloqueados por gates futuros.

Riscos remanescentes fora da Fase 9: validacao Lighthouse/PageSpeed/GTmetrix oficial quando a ferramenta/provider for aprovado, revisao juridica/legal humana, revisao AdSense real, branch protection, monitoramento operacional recorrente e decisao de mapeamento direto da raiz/dominios definitivos.

## 0B. Atualizacao live full apos Sprint 9.11

**Data:** 2026-06-28
**URL:** `https://opentshost.com/supersites/`
**Run Playwright:** `2026-06-28T16-11-17-070Z`
**Artefatos locais:** `artifacts/benchmark-crawl/2026-06-28T16-11-17-070Z`
**Baseline versionado:** `docs/benchmarks/our-sites/latest-baseline.md`

Foi executado crawl full em producao cobrindo Hub, os 10 sites, todas as homes localizadas, paginas de ferramenta/calculadora, paginas legais/editoriais/status e links internos descobertos. O crawl navegou 876 rotas, realizou 1752 checks desktop/mobile e checou 875 links internos unicos.

| Sinal live | Resultado |
|---|---:|
| Rotas navegadas | 876 |
| Checks desktop/mobile | 1752 |
| Screenshots gerados | 1752 |
| Links internos checados | 875 |
| Links internos quebrados | 0 |
| Page/browser/console errors | 0 |
| Horizontal overflow | 0 |
| Robots/sitemaps com falha | 0 |
| Missing title/meta/canonical/hreflang | 0 |
| Missing JSON-LD schema | 872 checks |
| Titulos acima de 70 caracteres | 26 checks |
| Meta descriptions acima de 170 caracteres | 6 checks |
| P75 load proxy | 108 ms |
| P75 CLS proxy | 0 |

### Veredito atualizado

A producao publica esta estavel e navegavel, mas ainda nao esta integralmente benchmark-grade. As Sprints 9.5 a 9.11 melhoraram substancialmente NetProbe Atlas, QRRoute, DocShift, PixelBatch, InvoiceCraft, MailHealth e SitePulse Lab com workbenches task-first e smokes live. As lacunas restantes se concentram em quatro frentes:

1. **CalcHarbor, TimeNexus e DevUtility Lab ainda parecem catalogos antes de ferramentas.** A home live desses tres sites ainda abre com hero + filtros/cards, sem um workbench dominante acima da dobra no padrao Calculator.net/Omni, timeanddate/World Time Buddy e CodeBeautify/Regex101.
2. **Hub publico ainda parece inventario textual.** Falta portfolio visual com top tools, screenshots/preview blocks, agrupamentos por intencao, links ricos e evidencias de producao que parecam produto final.
3. **SEO/schema esta incompleto em massa.** O crawl nao encontrou JSON-LD em 872 checks, principalmente homes, paginas legais/status e surfaces de catalogo. As paginas de ferramenta com schema existem em alguns apps, mas a cobertura nao e uniforme.
4. **Percepcao premium ainda sofre com copy operacional e consent banner.** Exemplos visiveis incluem mensagens como "No server upload backend active", "Advertising not active", "Production IP and DNS checks are live..." e o banner de privacidade cobrindo cards do Hub na primeira dobra. A informacao de gates continua correta, mas deve aparecer como linguagem de produto ou em paginas institucionais, nao como status interno dominante.

### Avaliacao atual por superficie

| Superficie | Estado live apos 9.11 | Gap principal | Sprint de correcao |
|---|---|---|---|
| SuperSites Hub | Estavel, 0 links quebrados, mas visual de catalogo textual | Visual catalog premium, top tools, schema, consent menos intrusivo | 9.15 / 9.16 |
| NetProbe Atlas | Workbench DNS/IP publicado e tecnicamente estavel | Schema nas rotas nao-tool, copy operacional residual e enriquecimento de footer | 9.15 / 9.16 |
| CalcHarbor | Live ainda catalog-first com 4 calculadoras | Workbench de cenarios, tabelas/graficos, densidade e copy publica madura | 9.12 |
| DevUtility Lab | Live ainda catalog-first | Editor/output split, exemplos, erros, copy/download e navegacao densa | 9.14 |
| TimeNexus | Live ainda catalog-first | Relogio/planner acima da dobra, world clock, meeting timeline e paginas SEO de cidades/fusos | 9.13 |
| QRRoute | Workbench local publicado e satisfatorio como MVP benchmark | Hero alto, schema nao uniforme e copy de gates a suavizar | 9.15 / 9.16 |
| InvoiceCraft | Editor/preview/download local publicado e visualmente forte | Schema, templates e copy de impostos/planos a lapidar sem ativar pagamentos | 9.15 / 9.16 |
| MailHealth | Relatorio unificado publicado e alinhado ao benchmark | Schema nao-tool, provider guidance mais rico e copy de monitoramento | 9.15 / 9.16 |
| SitePulse Lab | Relatorio visual publicado e alinhado ao benchmark | Mobile ainda coloca acao abaixo da dobra apos hero/status | 9.15 / 9.16 |
| PixelBatch | Workbench imagem publicado e funcionalmente forte | Copy "backend active" e schema nao-tool | 9.15 / 9.16 |
| DocShift | Workbench PDF publicado e funcionalmente forte | Copy "backend active" e schema nao-tool | 9.15 / 9.16 |

### Roadmap executivo derivado

O roadmap nao cria uma fase paralela. Ele reforca as sprints restantes da Fase 9:

1. **Sprint 9.12 - CalcHarbor density:** publicar workbench de cenarios, tabelas/graficos leves, resultados auditaveis e copy publica sem linguagem de MVP.
2. **Sprint 9.13 - TimeNexus planner:** publicar world clock/planner/timeline acima da dobra e pages SEO de fuso/cidade com valor real.
3. **Sprint 9.14 - DevUtility workbench:** publicar editor tecnico split com exemplos, validacao visual, copy/download/clear e estados de erro.
4. **Sprint 9.15 - Hub/SEO/AIO/rich footers:** transformar Hub/footers em navegacao visual e adicionar schema/copy/content clusters sem conteudo raso.
5. **Sprint 9.16 - Performance/AdSense-safe closure:** reduzir banner intrusivo, validar Core Web Vitals proxies/Lighthouse quando disponivel, reservar espacos inertes seguros e fechar deploy/smokes finais.

---

## 1. Veredito executivo

**Resultado geral: parcialmente satisfatório para MVP, ainda não satisfatório para benchmark-grade, SEO agressivo e AdSense-ready.**

A plataforma já tem uma base consistente: catálogo dos 10 sites, páginas públicas por produto, rotas multilíngues, ferramentas gratuitas com limites, upsell descrito, legal pages e mensagens de gate para AdSense/billing. Isso atende bem a uma fase inicial de arquitetura e validação.

O que ainda não está bom o suficiente: os sites ainda parecem mais uma coleção padronizada de MVPs do que ferramentas líderes de nicho. Os benchmarks de maior tráfego são muito mais **task-first**: colocam a ferramenta e o resultado visual acima da dobra, usam tabelas, mapas, previews, grades densas, hubs de links, explicações profundas, donation/support e CTAs comerciais com maturidade.

**Score consolidado estimado:** 62/100.

| Critério | Score | Diagnóstico |
|---|---:|---|
| Cobertura dos 10 sites | 82 | Os 10 sites existem e estão navegáveis. |
| Escopo funcional gratuito | 70 | A proposta gratuita existe, mas várias páginas ainda exibem estado de MVP/placeholder. |
| Similaridade funcional com benchmarks | 58 | Falta densidade visual, resultado acima da dobra, mapas/tabelas/previews reais e hubs fortes. |
| UX task-first | 55 | Muito texto de produto antes da experiência utilitária completa. |
| Conteúdo educativo/SEO | 68 | Há guias/FAQ/review em algumas ferramentas, mas ainda falta profundidade e cauda longa. |
| Multilingual | 45 | Rotas existem, mas há mistura de inglês em PT-BR/ES e ausência de acentos. Isso é P0. |
| AdSense readiness | 52 | Estrutura está correta, mas legal/content/localização ainda não estão prontos para aprovação. |
| Performance potencial | 78 | Stack leve e processamento local favorecem Core Web Vitals; precisa validação Lighthouse/GTmetrix. |
| Upsell pago | 61 | Upgrade paths estão claros, mas ainda não há UX comercial suficiente nas páginas públicas. |
| Confiança/legal | 50 | Páginas legais existem, mas são placeholders curtos e pedem revisão humana. |

---

## 2. Escopo verificado

Foram avaliados:

- Supersite Hub/catalog.
- Páginas públicas dos 10 sites.
- Principais páginas de ferramentas e builders acessíveis.
- Rotas PT-BR em sites com maior risco de falha de localização.
- Páginas institucionais do Supersite: About, Contact, Privacy, Cookies, Terms, Methodology e Editorial.
- Benchmarks principais citados no documento de refinamento.

**Limitação técnica da auditoria:** a avaliação foi feita por navegação pública e leitura do HTML/render textual disponível. Ela não substitui um crawler Playwright com screenshots desktop/mobile, Lighthouse, clique em todos os estados JS, upload real de arquivos, geração de PDF/QR/imagem, verificação de `hreflang`, sitemap, canonical e console errors. O Codex deve executar essa etapa automaticamente como P0.

---

## 3. Principais acertos já implementados

1. **Os 10 sites estão publicados em estrutura única.** O catálogo lista NetProbe Atlas, CalcHarbor, DevUtility Lab, TimeNexus, QRRoute, InvoiceCraft, MailHealth, SitePulse Lab, PixelBatch e DocShift.
2. **Existe posicionamento claro por site.** Cada página define valor gratuito, caminho de upgrade e status de anúncios/billing.
3. **Há rotas multilíngues iniciais.** EN, PT-BR, ES, FR e DE aparecem nos seletores de idioma.
4. **A regra de valor gratuito foi respeitada conceitualmente.** O usuário deve conseguir resolver a necessidade básica sem cadastro obrigatório.
5. **O projeto está seguro para estágio.** AdSense, billing, analytics externo, workers pesados e planos pagos estão explicitamente bloqueados por gates.
6. **Vários sites já têm bom escopo de ferramentas.** NetProbe, DevUtility, SitePulse, PixelBatch e DocShift já cobrem clusters úteis.
7. **Há preocupação correta com privacidade.** DevUtility, PixelBatch, DocShift, InvoiceCraft e TimeNexus priorizam processamento local/browser-side.
8. **Há base para upsell.** Monitoramento, histórico, API, lote, exportações, equipes, white-label e alertas estão corretamente posicionados como valor pago.

---

## 4. Falhas críticas P0

### 4.1 Localização multilíngue incompleta

Há páginas PT-BR e ES com hero traduzido, mas cards, títulos, descrições, resultados gratuitos e upgrades continuam em inglês. Exemplos detectados:

- QRRoute PT-BR: “Static QR Code Generator”, “Create a scannable static QR code...” e upgrade em inglês.
- PixelBatch PT-BR: “Image Compressor”, “Compress a PNG...” e upgrade em inglês.
- DocShift PT-BR: “PDF Merge”, “Combine up to five small PDFs...” e upgrade em inglês.

Também há ausência recorrente de acentos: “estatico”, “operacao”, “criacao”, “ingles”, “portugues”, “nao”, “util”, etc.

**Impacto:** reduz confiança, prejudica SEO internacional, aumenta risco de reprovação/baixa qualidade para AdSense e quebra o objetivo de sites premium multilíngues.

**Correção obrigatória:** tradução completa por idioma, acentuação correta, revisão humana/IA especializada, glossary por site, testes snapshot por locale e bloqueio de release quando houver strings fallback em inglês fora da rota EN.

---

### 4.2 As páginas ainda não são “benchmark-grade” visualmente

Os benchmarks líderes são diretos e densos:

- `whatsmydns.net`: input + record tabs + lista de servidores globais + mapa + status por país + conteúdo educativo + donation + footer rico.
- `whatismyipaddress.com`: IP imediato + IPv4/IPv6 + ISP/cidade/região/país + mapa + CTA de privacidade/VPN + ferramentas relacionadas.
- `Calculator.net`: hub massivo de calculadoras por categoria.
- `CodeBeautify`: lista densa de ferramentas populares, recentes e categorias técnicas.
- `TimeAndDate`: hubs globais de tempo, mapas, relógios, calendários, clima, sol/lua e calculadoras.
- `iLovePDF`: grid denso de ferramentas com categorias e promessa simples de uso.
- `Invoice Generator`: editor de fatura imediatamente editável, com linhas, impostos, desconto, frete, moeda e botão de download.
- `remove.bg`: upload/ação central, promessa simples, casos de uso e fluxo visual.

Nos nossos sites, a estrutura ainda se parece mais com cards de roadmap/MVP. Falta transformar cada página em uma experiência utilitária madura.

---

### 4.3 Muito texto de status interno aparece no público

Exemplos públicos recorrentes:

- “No ads active”
- “Monitoring gated”
- “Commercial redirects gated”
- “No file backend active”
- “Production IP and DNS checks are live on HTTPS after deploy smoke and rollback validation; ads and paid upgrades remain gated.”

Isso é aceitável para staging, mas ruim para tráfego orgânico real. Usuário final não deve sentir que está usando uma área de teste.

**Correção:** trocar linguagem interna por linguagem de produto:

- “Free version”
- “Advanced monitoring coming soon”
- “Batch processing planned”
- “Ads reserved for launch review” somente em ambiente interno, não público.

---

### 4.4 Legal pages e confiança ainda são placeholders

As páginas About, Contact, Privacy, Cookies, Terms, Methodology e Editorial existem, mas são curtas e ainda não aparentam documentos finais. Para AdSense e monetização, isso precisa virar conteúdo real, completo, consistente por idioma e com contato operacional.

**Correção:** finalizar legal pages com revisão humana, endereço de contato, política de dados por site/ferramenta, cookies/consentimento, limites de uso, política editorial, abuso, remoção e suporte.

---

### 4.5 Faltam donation/support blocks

O benchmark `whatsmydns.net` usa botão de doação e explica que a contribuição ajuda a pagar hosting e manter o serviço. Esse padrão é adequado para os nossos sites, especialmente enquanto upgrades pagos e AdSense ainda estão bloqueados.

**Correção:** adicionar bloco de apoio/doação após o resultado e antes do conteúdo longo, com posicionamento discreto e sem atrapalhar AdSense.

---

## 5. Avaliação por site

## 5.1 SuperSites Hub / Catálogo

**Status:** satisfatório como catálogo MVP; insuficiente como hub estratégico final.

**O que está bom:**

- Lista os 10 sites.
- Mostra categoria, valor gratuito, upgrade path e launch order.
- Explica princípios de operação.
- Informa que anúncios aguardam gates.

**Lacunas:**

- Não parece ainda um catálogo premium de produtos; parece inventário interno.
- Não há screenshots, previews vivos, “top tools”, status de produção por site, métricas públicas, changelog, roadmap visível ou recomendações de uso.
- O dashboard administrativo completo não é auditável publicamente. Se existe, precisa estar protegido; se não existe, é backlog crítico.

**Recomendação:**

- Criar versão pública do catálogo com cards mais visuais, top 3 ferramentas de cada site, highlights, screenshots, badges de idioma e link para guias.
- Criar/validar dashboard admin separado com métricas por site, monetização, SEO, tráfego, PageSpeed, AdSense status, conversões, backlog de IA e relatórios.

**Score:** 70/100.

---

## 5.2 NetProbe Atlas

**Status:** o mais importante para refinar primeiro. Parcialmente satisfatório tecnicamente, não satisfatório como benchmark visual de DNS/IP.

**Benchmarks principais:**

- `https://www.whatsmydns.net/`
- `https://dnschecker.org/`
- `https://whatismyipaddress.com/pt/meu-ip`
- `https://whatismyip.com.br/`
- `https://mxtoolbox.com/`
- `https://www.ssllabs.com/ssltest/`

**O que está bom:**

- 7 checks disponíveis: IP, DNS, RDAP, SSL, propagação, porta e reachability.
- Há explicação clara de limites e metodologia.
- O projeto evita prometer propagação global antes de ter workers multi-região.
- Conteúdo educativo e FAQ aparecem nas ferramentas.

**Lacunas críticas:**

- DNS Propagation ainda não entrega a experiência validada de `whatsmydns.net`: lista global de resolvers, países, mapa, status por localidade, porcentagem de convergência, detalhes por servidor e record types avançados.
- A página “What is my IP” não está no padrão dos líderes: falta card visual imediato com IPv4/IPv6, reverse DNS, ISP, ASN, cidade/região/país, proxy/VPN, mapa aproximado, browser/platform e CTA de privacidade.
- O rodapé é pobre comparado ao benchmark. Precisa de cluster grande: DNS tools, DNS lookup por tipo, DNS guides, DNS servers por país, browser extension, social, contato e legal.
- A página de propagação ainda suporta menos tipos do que o benchmark principal. Faltam PTR, SOA, SRV e CAA na experiência de propagação.

**Correções P0/P1:**

P0:

- Criar UI de DNS Propagation com tabela de locais mesmo que alguns retornem “not available yet”. Não mentir cobertura global.
- Criar mapa/world grid com estados: propagated, mismatch, timeout, not checked.
- Mostrar “resolver scope” claramente: `Single region`, `Controlled resolvers`, `Global workers coming soon`.
- Transformar “What is my IP” em painel visual com IP grande, IPv4/IPv6, reverse, ISP/ASN, proxy/VPN unknown, browser/platform e geolocation aproximada.
- Adicionar donation block.

P1:

- Workers multi-região.
- Histórico/monitoramento pago.
- Footer rico com cluster completo de DNS/IP/SSL/RDAP.
- Páginas individuais para A, AAAA, CAA, CNAME, MX, NS, PTR, SOA, SRV e TXT lookup.

**Score:** 58/100.

---

## 5.3 CalcHarbor

**Status:** satisfatório como MVP; precisa escala e localização para competir com Calculator.net/Omni.

**Benchmarks principais:**

- `https://www.calculator.net/`
- `https://www.omnicalculator.com/`
- `https://www.calculatorsoup.com/`

**O que está bom:**

- Calculadoras rodam no browser.
- Fórmulas estão visíveis.
- A resposta gratuita é entregue sem cadastro.
- Loan, break-even, gross margin e ROI estão coerentes com monetização futura.

**Lacunas:**

- Só 4 calculadoras. Benchmark líder opera como hub com centenas/milhares de calculadoras e categorias.
- Páginas PT-BR ainda têm problemas de acento e alguns termos em inglês.
- Moeda padrão/localização precisam seguir locale. PT-BR não deveria priorizar USD/US$ por padrão.
- Falta visual mais parecido com calculadoras líderes: formulário compacto, resultado lateral, tabela de amortização, gráfico simples e exemplos.

**Correções:**

- Adicionar cluster de 20 calculadoras prioritárias: juros compostos, salário líquido, margem, markup, comissão marketplace, Simples Nacional, financiamento, custo funcionário, CAC/LTV, ponto de equilíbrio, desconto, parcelamento, ROI, ROAS, inflação, correção, regra de 3, porcentagem, conversor de taxa e capital de giro.
- Implementar tabelas e gráficos leves.
- Localizar moeda, separador decimal, idioma, exemplos e FAQ por país.

**Score:** 72/100.

---

## 5.4 DevUtility Lab

**Status:** bom MVP, mas ainda precisa virar workbench técnico premium.

**Benchmarks principais:**

- `https://codebeautify.org/`
- `https://jsonformatter.org/`
- `https://regex101.com/`
- `https://jwt.io/`
- `https://crontab.guru/`
- `https://www.diffchecker.com/`

**O que está bom:**

- 9 ferramentas úteis.
- Processamento local por padrão.
- Sem storage/logging de snippets.
- Privacidade e upgrade path estão bem definidos.

**Lacunas:**

- As páginas precisam parecer ferramenta de developer, não página institucional.
- Falta editor grande acima da dobra, split panes, toolbar, copiar/baixar, limpar, exemplos, validação em tempo real, modo compacto e atalhos.
- Falta navegação densa por categorias e “recently used/favorites” como nos benchmarks.

**Correções:**

- Criar layout padrão de workbench: input grande à esquerda, output à direita, options bar acima, errors/warnings abaixo.
- JSON formatter deve ter tree view, minify, validate, sample, copy.
- Regex deve ter matches, groups, flags, explanation e exemplos.
- JWT deve sinalizar “decode only, no verification” com clareza.

**Score:** 68/100.

---

## 5.5 TimeNexus

**Status:** funcional em escopo, fraco para benchmark visual e estratégico.

**Benchmarks principais:**

- `https://www.timeanddate.com/`
- `https://time.is/`
- `https://www.worldtimebuddy.com/`
- `https://24timezones.com/`

**O que está bom:**

- 7 ferramentas úteis.
- Conversões rodam localmente.
- Upgrade path faz sentido: widgets, API, presets, histórico.

**Lacunas:**

- Falta “current time”/world clock como elemento central.
- Falta visual de timeline para timezone converter.
- Falta meeting planner, city pages, mapa, relógios e hubs de países/cidades.
- Falta profundidade de calendário/feriados por região.

**Correções:**

- Home deve abrir com relógio atual, timezone local detectado e busca de cidade.
- Criar World Clock com cards de cidades.
- Criar Time Zone Converter visual com timeline horizontal.
- Criar Meeting Planner.
- Criar páginas SEO para cidades/fusos prioritários.

**Score:** 56/100.

---

## 5.6 QRRoute

**Status:** escopo correto, UX visual ainda fraca e localização incompleta.

**Benchmarks principais:**

- `https://www.qr-code-generator.com/`
- `https://www.qrcode-monkey.com/`
- `https://www.me-qr.com/`
- `https://bitly.com/`
- `https://tinyurl.com/`

**O que está bom:**

- Ferramentas certas: QR estático, barcode, UTM, vCard, Wi-Fi, preview.
- Separação correta entre gratuito estático e pago dinâmico.
- Abuse/commercial redirects estão bloqueados.

**Lacunas:**

- PT-BR tem cards em inglês.
- Falta preview visual dominante do QR acima da dobra.
- Falta fluxo por tipos de QR: URL, text, email, phone, SMS, Wi-Fi, vCard, app, social.
- Falta design/download: SVG, PNG, tamanho, margem, cor, logo, error correction.
- Falta explicação forte de QR estático vs dinâmico e analytics.

**Correções:**

- Refazer hero como gerador: tabs de tipo + form + preview QR à direita + download/copiar.
- Adicionar cards de casos de uso: cardápio, embalagem, evento, etiqueta, cartão de visita, campanha.
- Adicionar donation e upsell claro para QR dinâmico.
- Corrigir localização total.

**Score:** 60/100.

---

## 5.7 InvoiceCraft

**Status:** promissor, mas precisa parecer editor real imediatamente.

**Benchmarks principais:**

- `https://invoice-generator.com/`
- `https://freeinvoicebuilder.com/`
- `https://www.zoho.com/invoice/free-invoice-generator.html`
- `https://www.waveapps.com/invoice-generator`

**O que está bom:**

- Invoice, quote e receipt builders existem.
- PDF local e dados locais são bons para confiança.
- Upgrade path está correto: clientes, produtos, recorrência, branding, pagamentos.

**Lacunas:**

- Benchmark líder abre direto em formulário/editor de fatura; a nossa página pública ainda é mais cards/listagem.
- Falta preview forte do documento com item rows, moeda, impostos, desconto, frete, subtotal, total e botão download acima da dobra.
- Falta seleção de moeda/localização por país.
- Falta templates visuais e branding preview.

**Correções:**

- Home deve já ser o invoice editor, com tabs para quote/receipt.
- Adicionar linhas de item editáveis, logo, datas, termos, notas, moeda, impostos, descontos, shipping e download PDF.
- Legal: deixar claro que não é nota fiscal/fiscal invoice.

**Score:** 64/100.

---

## 5.8 MailHealth

**Status:** bom mapa de produto; precisa virar diagnóstico unificado com score.

**Benchmarks principais:**

- `https://mxtoolbox.com/`
- `https://www.mail-tester.com/`
- `https://easydmarc.com/tools/`
- `https://dmarcian.com/`
- `https://toolbox.googleapps.com/apps/dig/`

**O que está bom:**

- Ferramentas corretas: SPF, DKIM, DMARC, MX, blacklist, SMTP, headers.
- Limites antiabuso e PII estão bem pensados.
- Upsell natural para monitoramento, alertas, DMARC reports, API e white-label.

**Lacunas:**

- Falta uma busca única de domínio que gere “Email Health Report”.
- Falta score visual: DNS OK, SPF OK, DKIM unknown, DMARC warning, blacklist risk, SMTP reachable.
- Falta orientação direta de correção por provedor.
- Falta tabela de MX/blacklists parecida com benchmark.

**Correções:**

- Criar painel “Check your email domain health” com score 0–100.
- Gerar checklist com status colorido e próximos passos.
- Páginas individuais continuam, mas a home precisa vender o diagnóstico completo.

**Score:** 63/100.

---

## 5.9 SitePulse Lab

**Status:** bom MVP de checks, mas visual ainda genérico.

**Benchmarks principais:**

- `https://downforeveryoneorjustme.com/`
- `https://www.isitdownrightnow.com/`
- `https://gtmetrix.com/`
- `https://tools.pingdom.com/`
- `https://pagespeed.web.dev/`
- `https://securityheaders.com/`
- `https://builtwith.com/`

**O que está bom:**

- 7 checks corretos: status, redirects, headers, robots, sitemap, TTFB e performance snapshot.
- Limites anti-SSRF e probes bounded estão corretos.
- Upsell para uptime, incidentes, status page e multi-região é forte.

**Lacunas:**

- O logotipo/prefixo aparece como “MH SitePulse Lab”, indicando provável reaproveitamento indevido de marca interna.
- Falta resposta brutalmente simples: “Está online?” com status grande.
- Falta relatório visual com score, waterfall simplificado, headers pass/fail, redirect chain e quick fixes.
- Falta comparação clara com benchmarks de performance.

**Correções:**

- Corrigir prefixo/logo.
- Criar hero com input URL e resultado tipo: Online/Down/Redirecting/Slow.
- Criar report card por categoria: availability, redirects, security headers, crawlability, performance.
- Adicionar histórico pago e status page CTA.

**Score:** 64/100.

---

## 5.10 PixelBatch

**Status:** escopo correto, mas UX precisa virar ferramenta visual de imagem.

**Benchmarks principais:**

- `https://www.remove.bg/`
- `https://www.iloveimg.com/`
- `https://tinypng.com/`
- `https://squoosh.app/`
- `https://www.photopea.com/`

**O que está bom:**

- Ferramentas certas: compress, resize, crop, convert, metadata removal e social presets.
- Processamento local é excelente para privacidade e custo.
- Upsell de batch/API/presets é coerente.

**Lacunas:**

- PT-BR tem cards em inglês.
- Falta drag-and-drop gigante acima da dobra.
- Falta preview antes/depois, tamanho original vs final, economia percentual, qualidade, formato e download.
- Falta visual mais e-commerce: marketplace presets, fundo branco, social/OG sizes, packshot workflow.

**Correções:**

- Criar homepage tool-first com upload zone e previews.
- Criar tabela de arquivo/processamento para lote futuro.
- Adicionar “use cases”: e-commerce, social media, blog, marketplace, performance web.
- Corrigir localização total.

**Score:** 60/100.

---

## 5.11 DocShift

**Status:** bom escopo de ferramentas, mas precisa competir visualmente com iLovePDF/Smallpdf.

**Benchmarks principais:**

- `https://www.ilovepdf.com/`
- `https://smallpdf.com/`
- `https://tools.pdf24.org/`
- `https://www.sejda.com/`
- `https://www.adobe.com/acrobat/online.html`

**O que está bom:**

- 8 ferramentas: merge, split, rotate, compress, watermark, page numbers, metadata e text-to-PDF.
- Processamento local é diferencial de privacidade.
- Upgrade path está certo: lote, OCR, API, equipes, arquivos maiores.

**Lacunas:**

- PT-BR e ES têm títulos/descritivos de cards em inglês.
- Falta visual de grid premium tipo iLovePDF, com ícones claros, categorias e CTA direto.
- As páginas de ferramenta precisam abrir com dropzone dominante e ação clara.
- Falta cross-linking forte entre ferramentas PDF.
- Falta trust layer: “files stay in browser”, limites, segurança, qualidade de saída, suporte a tamanho.

**Correções:**

- Home: grid denso de ferramentas com ícones grandes e categorias.
- Tool page: dropzone + action options + preview/status + download.
- Criar páginas SEO para cada workflow e combinações: merge PDF online, compress PDF, split PDF, rotate PDF etc.
- Corrigir localização total.

**Score:** 61/100.

---

## 6. Backlog prioritário

## P0 — antes de qualquer AdSense real ou escala SEO

1. Corrigir localização completa em PT-BR, ES, FR e DE; bloquear fallback indevido para inglês.
2. Corrigir acentuação e idioma natural por locale.
3. Remover linguagem pública de “MVP/gated/deploy smoke/rollback validation” e substituir por linguagem de produto.
4. Finalizar legal pages reais: Privacy, Terms, Cookies, Contact, Methodology, Editorial.
5. Implementar donation/support block global, controlado por config por site.
6. Refatorar NetProbe DNS Propagation para lista/mapa/status por localidade, mesmo que com disclosure de cobertura limitada.
7. Refatorar páginas “What is my IP”, QRRoute, PixelBatch, DocShift e InvoiceCraft para ferramenta acima da dobra.
8. Rodar crawler Playwright completo: cada site, cada tool, cada locale, desktop/mobile, screenshot, console errors, links quebrados.
9. Rodar Lighthouse/PageSpeed/GTmetrix dry-run e registrar no dashboard/admin docs.
10. Validar `hreflang`, `canonical`, sitemap e robots.

## P1 — refinamento de conversão/SEO

1. Criar rodapés ricos por vertical com ferramentas relacionadas, guias e páginas de cauda longa.
2. Criar páginas por tipo de registro DNS e por ferramenta específica.
3. Criar hubs por categoria: calculators, developer tools, time tools, PDF tools, image tools.
4. Criar templates visuais de resultado com score/pass/fail.
5. Criar blocos de “next steps” e “fix this issue” em cada ferramenta técnica.
6. Criar content clusters e FAQs profundas por site.
7. Adicionar upgrade CTAs sem bloquear resultado gratuito.
8. Preparar espaços de AdSense sem ad request até gates.

## P2 — crescimento e monetização

1. Workers multi-região para NetProbe/SitePulse/MailHealth.
2. Monitoramento pago, alertas, histórico e API.
3. Contas/assinaturas para sites com workflow pago.
4. Afiliados relevantes por vertical: VPN, hosting, domain, email deliverability, PDF/image, invoicing.
5. Browser extension para NetProbe/DevUtility.
6. Widgets embeddable para CalcHarbor/TimeNexus/QRRoute.

---

## 7. Prompt operacional complementar para Codex

```txt
Você é Codex no projeto D:\Projetos\supersites.

Objetivo desta conversa:
Executar uma etapa de auditoria, refinamento e evolução benchmark-driven dos 10 sites e do Supersite Hub, sem assumir número fixo de fase ou sprint. Mantenha a numeração real a partir da última fase/sprint já mapeada em ROADMAP.md, STATUS.md e docs/SPRINTS.

Antes de implementar:
1. Leia integralmente AGENTS.md.
2. Leia integralmente docs/MEGA_PROMPT_SUPERSITES.md.
3. Leia integralmente docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md.
4. Leia este relatório: docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK.md.
5. Acesse os prints em docs/benchmarks.
6. Leia ROADMAP.md, STATUS.md, METRICS.md, ARCHITECTURE.md, SEO_AIO_PLAYBOOK.md, ADSENSE_PLAYBOOK.md, ANALYTICS.md, BILLING.md, HUMAN_ACTION_REQUIRED.md e todos os ADRs.
7. Verifique git, CI, produção pública e estado real das sprints já existentes.
8. Não pule sprints pendentes. Encaixe esta etapa no ponto correto do roadmap.

Missão:
Refinar os sites para ficarem funcionalmente e visualmente alinhados aos benchmarks líderes, sem copiar marca, texto, código, assets, layout 1:1 ou identidade visual.

Obrigatório:
1. Criar/atualizar documentos:
   - docs/BENCHMARK_MATRIX.md
   - docs/SITES/<site>/BENCHMARK_NOTES.md
   - docs/SITES/<site>/FRONTEND_REFINEMENT_PLAN.md
   - docs/SITES/<site>/SEO_AIO_REFINEMENT_PLAN.md
   - docs/SITES/<site>/MONETIZATION_REFINEMENT_PLAN.md
   - docs/ROADMAP.md
   - docs/STATUS.md
   - docs/METRICS.md
2. Rodar crawler Playwright em:
   - Supersite Hub.
   - Todos os 10 sites.
   - Todas as ferramentas.
   - Todas as rotas EN, PT-BR, ES, FR e DE.
   - Desktop e mobile.
3. Gerar screenshots before/after em docs/benchmarks/our-sites.
4. Validar links quebrados, console errors, HTML, canonical, hreflang, sitemap, robots, meta title, meta description e schema.
5. Rodar Lighthouse/PageSpeed local e registrar LCP, INP/TBT proxy, CLS, performance, accessibility, best practices e SEO.
6. Corrigir P0s automaticamente quando forem técnicos e reversíveis.
7. Registrar HUMAN_ACTION_REQUIRED para legal review, AdSense approval, billing real, KYC, conta bancária, compra, API paga, PIN, impostos e qualquer ação irreversível.

P0 obrigatório:
- Corrigir localização completa e acentuação em PT-BR, ES, FR e DE.
- Remover linguagem pública de MVP/gated/deploy smoke/rollback validation.
- Finalizar ou marcar legal pages com bloqueio de produção se revisão humana faltar.
- Adicionar donation/support block configurável por site.
- Refatorar NetProbe DNS Propagation para UX inspirada em whatsmydns.net: lista de localidades, mapa/status, record type tabs, resultado por resolver, conteúdo educativo e footer rico, sem prometer cobertura global antes dos workers.
- Refatorar What is my IP para painel visual com IPv4/IPv6, reverse, ISP/ASN, país/cidade/região aproximados, proxy/VPN status, browser/platform, mapa e privacy CTA.
- Refatorar QRRoute, PixelBatch, DocShift e InvoiceCraft para ferramenta/preview acima da dobra.
- Corrigir prefixos/logos incorretos, incluindo SitePulse exibindo prefixo de MailHealth se confirmado.

Fluxo por sprint real:
1. Atualizar roadmap/sprints com esta etapa na numeração correta.
2. Implementar uma entrega por vez.
3. Rodar testes, build, Playwright, validate:structure, validate:secrets, ci:changes, git diff --check e deploy dry-run.
4. Atualizar docs/status/métricas.
5. Commitar, pushar e monitorar GitHub Actions.
6. Registrar run IDs, smokes e screenshots.
7. Só depois seguir para a próxima entrega.

Não ativar anúncios reais, billing real, analytics externo, conta paga, webhook público ou API paga sem gates e aprovação explícita.
```

---

## 8. Critério de aceite para considerar a etapa concluída

Uma página só passa quando:

- O usuário entende a ferramenta em até 5 segundos.
- A ação principal está acima da dobra.
- O resultado gratuito resolve a necessidade básica sem cadastro.
- O resultado é visual, copiável e interpretável.
- Existe conteúdo educativo suficiente abaixo da ferramenta.
- Existem ferramentas relacionadas e links internos fortes.
- O idioma da rota está 100% consistente.
- Há `canonical`, `hreflang`, title, description e schema corretos.
- Há espaço de monetização seguro, sem clique acidental.
- Há donation/support block se configurado.
- A página passa em mobile.
- Lighthouse/Pagespeed atinge metas acordadas ou registra exceção justificada.
- Não há linguagem interna de staging/MVP em produção pública.
- Legal, privacy e contact estão adequados para o mercado alvo.

---

## 9. Conclusão

A base está sólida para continuar, mas ainda não deve ser tratada como frontend final. A próxima etapa precisa ser menos “criar mais MVP” e mais “transformar cada site em uma ferramenta líder de nicho”.

A prioridade absoluta é NetProbe Atlas, porque é o site #1 da estratégia e a comparação com `whatsmydns.net`, `whatismyipaddress.com` e `whatismyip.com.br` deixa lacunas óbvias: faltam mapa/lista global de DNS, painel visual de IP, footer rico, donation e experiência de resultado imediatamente útil.

Depois de NetProbe, a sequência recomendada é:

1. Localização global dos 10 sites.
2. Tool-first UI para QRRoute, PixelBatch, DocShift e InvoiceCraft.
3. Hubs densos e rodapés ricos por vertical.
4. Conteúdo SEO/AIO profundo por ferramenta.
5. Dashboard admin com métricas e backlog de IA.
6. Preparação de AdSense somente após legal, qualidade, performance e conteúdo.
