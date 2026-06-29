# AUDITORIA LIVE — SUPERSITES VS BENCHMARK FRONTEND/UX

**Arquivo:** `supersites/docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK_V2.md`
**URL auditada:** `https://opentshost.com/supersites/`
**Referência interna:** `supersites/docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`
**Screenshots de referência:** `supersites/docs/benchmarks`
**Objetivo:** avaliar se o Supersite e os 10 sites estão suficientemente alinhados com os benchmarks líderes em experiência, estrutura, conteúdo, monetização e aparência funcional.

---

## 1. Veredito executivo

**Status:** parcialmente satisfatório como MVP avançado; ainda insuficiente como benchmark-grade para AdSense/SEO em escala.

A implementação evoluiu bem. Agora há páginas públicas para o hub, 10 sites, páginas por ferramenta, rotas multilíngues e várias ferramentas com fluxo gratuito explícito. A arquitetura segue a tese principal: ferramenta gratuita antes de cadastro, monetização por AdSense/upgrade depois.

O problema é que os sites ainda parecem uma plataforma em fase de lançamento técnico, não produtos públicos maduros no padrão mental dos concorrentes mais acessados.

Os maiores bloqueios são:

1. **Localização incompleta:** várias páginas PT-BR ainda misturam inglês, termos internos e falta de acentuação.
2. **NetProbe Atlas ainda não está no padrão de `whatsmydns.net` para DNS propagation nem no padrão de `whatismyipaddress.com` para IP lookup.**
3. **Mensagens internas aparecem demais ao usuário:** “ads planned”, “billing disabled”, “release check”, “public API live”, “workers planned”. Isso deve ir para status/admin, não para a UX principal.
4. **Falta densidade de cluster SEO e rodapé vertical:** benchmarks líderes criam ecossistemas de ferramentas relacionadas, guias e links profundos.
5. **Falta camada visual de resultado:** os resultados precisam virar cards, tabelas, mapas, scores, badges, copy buttons, download/export e “next action”.
6. **Doação, AdSense placeholder e upsell público ainda estão tímidos/inativos.** Inatividade é correta para compliance, mas a estrutura visual final precisa estar pronta.
7. **Admin dashboard não é auditável pela URL pública.** Deve ser validado separadamente em ambiente autenticado.

**Score geral atual:** **68/100**.

Interpretação:

- 0–50: placeholder/MVP fraco
- 51–70: MVP funcional, ainda sem benchmark parity
- 71–85: produto publicável após refinamento
- 86–100: benchmark-grade

---

## 2. Escopo auditado

### Auditados via navegação pública

- `https://opentshost.com/supersites/`
- páginas institucionais públicas: About, Contact, Privacy, Cookies, Terms, Methodology, Editorial, Status
- páginas públicas dos 10 sites
- páginas principais de ferramentas de cada site
- amostras PT-BR para validação multilíngue
- benchmarks externos principais citados no documento e no briefing do projeto

### Limites da auditoria

Esta auditoria foi feita por navegação pública e leitura das páginas. Não substitui:

- crawler Playwright real percorrendo 100% dos links internos;
- screenshots desktop/mobile dos nossos sites;
- pixel-diff visual contra benchmarks;
- Lighthouse/PageSpeed/GTmetrix real;
- execução completa dos formulários em browser;
- teste de upload/download de arquivos;
- auditoria do dashboard administrativo autenticado;
- validação de AdSense/GA4/Search Console reais;
- validação jurídica de páginas legais.

**Ação obrigatória para Codex:** executar crawler automatizado, screenshots, Lighthouse, testes de formulários e relatório técnico após aplicar as recomendações.

---

## 3. Score consolidado

| Área | Score | Status | Comentário direto |
|---|---:|---|---|
| Hub público / catálogo | 74 | Bom MVP | Lista os 10 sites, mas ainda falta visual de catálogo premium, ranking, screenshots, top tools e prova de uso. |
| Estrutura dos 10 sites | 82 | Forte | Todos têm homepage, categorias, ferramentas e upgrade path. |
| Ferramenta gratuita acima da dobra | 72 | Aceitável | Muitas páginas já abrem com ferramenta, mas algumas ainda exibem muito status interno. |
| Similaridade funcional com benchmarks | 66 | Parcial | A direção está correta; NetProbe, DocShift e PixelBatch ainda precisam ficar mais próximos dos líderes. |
| Similaridade visual com benchmarks | 58 | Fraca/média | Layout aparenta premium/MVP, mas não reproduz suficientemente os padrões mentais dos líderes. |
| SEO/AIO conteúdo | 70 | Bom começo | Há guias, FAQ e review date; falta profundidade e clusters internos por vertical. |
| Multilíngue | 48 | Bloqueador | Traduções incompletas, inglês residual e acentos faltando. |
| AdSense readiness | 56 | Não pronto | Estrutura existe, mas conteúdo/localização/legal/UX ainda não estão em nível seguro. |
| Upgrade paid readiness | 62 | Parcial | Upgrade path claro, mas sem painel comercial auditável na superfície pública. |
| Performance potencial | 78 | Bom | A abordagem browser-side/local favorece performance, mas precisa Lighthouse real. |
| Confiança/legal | 58 | Parcial | Páginas existem, mas são curtas e ainda com “human review required”. |

---

## 4. Benchmark de referência — padrões validados

### 4.1. NetProbe Atlas

Referências:

- `https://www.whatsmydns.net/`
- `https://whatismyip.com.br/`
- `https://whatismyipaddress.com/pt/meu-ip`
- `https://dnschecker.org/`
- `https://mxtoolbox.com/`
- `https://www.whois.com/whois/`
- `https://www.ssllabs.com/ssltest/`

Padrões validados:

- ferramenta no topo, sem distração;
- resposta técnica em tabela/lista;
- status visual forte por localização/servidor;
- mapa quando houver geografia/IP/DNS propagation;
- vários tipos de registro acessíveis;
- explicação longa abaixo;
- menu/rodapé rico com ferramentas relacionadas;
- doação discreta;
- anúncios depois da entrega de valor;
- CTA de VPN/privacidade/monitoramento quando fizer sentido.

### 4.2. CalcHarbor

Referências:

- `https://www.calculator.net/`
- `https://www.omnicalculator.com/`
- `https://www.calculatorsoup.com/`
- `https://www.bankrate.com/calculators/`
- `https://www.nerdwallet.com/calculators`

Padrões validados:

- centenas de calculadoras de cauda longa;
- formulário simples;
- resultado imediato;
- fórmula e passo a passo;
- conteúdo educativo;
- disclaimers financeiros;
- páginas relacionadas e categorias densas.

### 4.3. DevUtility Lab

Referências:

- `https://codebeautify.org/`
- `https://jsonformatter.org/`
- `https://regex101.com/`
- `https://jwt.io/`
- `https://gchq.github.io/CyberChef/`

Padrões validados:

- editores lado a lado;
- botões copiar, limpar, baixar, exemplo;
- tabs de resultado;
- erros destacados;
- navegação densa;
- tolerância a UI técnica.

### 4.4. TimeNexus

Referências:

- `https://www.timeanddate.com/`
- `https://time.is/`
- `https://www.worldtimebuddy.com/`
- `https://24timezones.com/`

Padrões validados:

- resposta instantânea;
- cidades populares;
- timeline visual;
- meeting planner;
- páginas por cidade/fuso;
- calendário e conteúdo aprofundado.

### 4.5. QRRoute

Referências:

- `https://www.qr-code-generator.com/`
- `https://me-qr.com/`
- `https://tinyurl.com/`
- `https://bitly.com/`

Padrões validados:

- QR preview grande;
- tipos de QR claros;
- download simples;
- diferença entre estático e dinâmico;
- analytics/short links/custom domain como upsell;
- abuso/phishing tratado com cuidado.

### 4.6. InvoiceCraft

Referências:

- `https://invoice-generator.com/`
- `https://www.invoicesimple.com/`
- `https://www.zoho.com/invoice/free-invoice-generator.html`

Padrões validados:

- editor de invoice direto no topo;
- preview visual do documento;
- download PDF sem cadastro;
- campos comerciais completos;
- salvar clientes/produtos/recorrência/branding como upsell.

### 4.7. MailHealth

Referências:

- `https://mxtoolbox.com/`
- `https://www.mail-tester.com/`
- `https://easydmarc.com/tools`
- `https://dmarcian.com/`

Padrões validados:

- health score simples;
- checks SPF/DKIM/DMARC/MX/blacklist;
- explicações de correção;
- monitoramento e relatórios como upgrade.

### 4.8. SitePulse Lab

Referências:

- `https://gtmetrix.com/`
- `https://downforeveryoneorjustme.com/`
- `https://downdetector.com/`
- `https://www.redirect-checker.org/`
- `https://securityheaders.com/`

Padrões validados:

- resultado “up/down/slow” imediato;
- score visual;
- headers e redirects em tabela;
- waterfall/performance snapshot;
- histórico/status page/alertas como upsell.

### 4.9. PixelBatch

Referências:

- `https://www.remove.bg/`
- `https://tinypng.com/`
- `https://www.iloveimg.com/`
- `https://squoosh.app/`

Padrões validados:

- dropzone grande;
- antes/depois;
- tamanho original vs final;
- download claro;
- lote/API/alta resolução/IA como upsell.

### 4.10. DocShift

Referências:

- `https://www.ilovepdf.com/`
- `https://smallpdf.com/`
- `https://www.sejda.com/`
- `https://online2pdf.com/`

Padrões validados:

- grid amplo de ferramentas;
- dropzone dominante;
- workflow por tarefa;
- limite gratuito transparente;
- batch/OCR/API/desktop/equipe como upsell.

---

## 5. Avaliação por site

## 5.1. Supersite Hub

**Status:** bom como catálogo inicial; insuficiente como catálogo benchmark-grade e dashboard público/administrativo.

### Pontos fortes

- Lista os 10 sites.
- Mostra free value, upgrade path, launch order e idiomas.
- Tem páginas institucionais.
- Organiza os sites por workflow.
- Mantém AdSense/paid upgrades atrás de gates.

### Gaps

- Ainda parece inventário operacional, não catálogo premium.
- Falta screenshot/card visual real por site.
- Falta top tools com dados reais de uso.
- Falta ranking por tráfego, conversão, status e maturidade.
- Falta destaque “most used”, “new”, “beta”, “recommended”.
- Dashboard administrativo completo não é auditável pela URL pública.

### Melhorias prioritárias

- Criar homepage com blocos: Top tools, Most used, Recently improved, By problem, By role, By site.
- Adicionar screenshots reais por site.
- Criar páginas públicas com descrição mais comercial e menos operacional.
- Dashboard admin precisa ser testado com login separado.
- Criar página interna para status de gates; não exibir linguagem de deploy no catálogo principal.

**Score:** 74/100.

---

## 5.2. NetProbe Atlas

**Status:** funcionalmente promissor; não benchmark-grade ainda.

### Pontos fortes

- 7 checks: IP, DNS, RDAP, SSL, DNS propagation, port checker, ping/traceroute.
- Ferramentas têm rotas próprias.
- Há metodologia, limites, FAQ e links relacionados.
- Há preocupação correta com antiabuso e alvos públicos.

### Gaps críticos contra benchmarks

#### DNS propagation

Benchmark `whatsmydns.net` entrega:

- tipos A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT, CAA;
- valor esperado;
- lista de países/servidores;
- mapa global;
- status visual por local;
- conteúdo educativo profundo;
- doação;
- rodapé com cluster DNS muito forte.

NetProbe entrega hoje:

- formulário com domínio, tipo e valor esperado;
- tipos A, AAAA, CNAME, MX, TXT e NS;
- resultado controlado;
- aviso de que não é worldwide propagation checker.

Conclusão: tecnicamente honesto, mas abaixo do benchmark. O produto precisa parecer e funcionar como um global checker, mesmo que comece com “beta resolver matrix”.

#### What is my IP

Benchmarks `whatismyip.com.br` e `whatismyipaddress.com` entregam:

- IP visível imediatamente;
- IPv4/IPv6;
- reverse;
- navegador/plataforma;
- proxy/VPN;
- país/cidade;
- mapa;
- CTA de privacidade/VPN;
- ferramentas relacionadas.

NetProbe hoje ainda parece página de documentação com botão “Run IP check” e status técnico. Falta painel visual instantâneo.

### Melhorias P0

- Criar painel “Your public IP” acima da dobra.
- Mostrar IPv4, IPv6, ASN, ISP, reverse DNS, país/cidade aproximada, proxy/VPN/hosting quando disponível.
- Adicionar mapa quando houver geolocalização aproximada.
- DNS propagation: tabela por resolver/local + mapa + status badges.
- Completar tipos PTR, SOA, SRV e CAA no propagation.
- Criar footer NetProbe rico: DNS Tools, DNS Lookup by record, IP Tools, Domain Tools, SSL Tools, Guides, Servers.
- Adicionar bloco de doação após guia.
- Remover mensagens internas de release/AdSense da UX principal.

**Score:** 64/100.

---

## 5.3. CalcHarbor

**Status:** um dos mais maduros do lote.

### Pontos fortes

- Calculadora real acima da dobra.
- Resultado visível, cenário menor/base/maior e fórmula.
- Disclaimers adequados.
- Explicação, FAQ e relacionados nas tool pages.

### Gaps

- Ainda há poucas calculadoras para competir com Calculator.net/Omni/CalculatorSoup.
- PT-BR sem acentos em vários pontos.
- Moeda padrão em PT-BR ainda aparece como USD no exemplo; para PT-BR deve priorizar BRL ou permitir detecção clara.
- Falta grade densa de categorias e calculadoras long-tail.
- Falta conteúdo localizado: exemplos brasileiros, disclaimers locais e unidades/moedas por idioma.

### Melhorias P0/P1

- Corrigir tradução/acento.
- Expandir catálogo para 25–50 calculadoras iniciais.
- Criar categorias: Finance, Business, Salary, Taxes, Marketplace, Marketing, Operations.
- Usar BRL em PT-BR, EUR em FR/DE/ES quando adequado, USD em EN global.
- Criar tabela “how this compares” e export preview como upsell visual.

**Score:** 78/100.

---

## 5.4. DevUtility Lab

**Status:** estruturalmente bom; precisa ficar mais “tooling power-user”.

### Pontos fortes

- Tem 9 ferramentas úteis.
- Processamento local declarado.
- Workbench com input, modo, resultado, exemplos e navegação densa.
- Boa aderência ao nicho dev.

### Gaps

- Tool pages ainda não têm a densidade visual de CodeBeautify, regex101, CyberChef ou jwt.io.
- Resultado aparece como “ready for local run”; precisa exibir outputs mais concretos no exemplo inicial.
- Falta layout de editor lado a lado em páginas individuais.
- Falta botões copy/download/clear/minify/format mais visíveis.
- PT-BR mistura muito inglês: “Paste a small structured snippet”, “Characters”, “Mode”, “Private history”, etc.

### Melhorias

- Editor split view: input à esquerda, output à direita.
- Tabs: formatted/raw/tree/errors/minified.
- Toolbar fixa: Example, Format, Minify, Copy, Download, Clear.
- JSON schema/validation hints.
- Corrigir localização.
- Criar footer denso de ferramentas dev.

**Score:** 72/100.

---

## 5.5. TimeNexus

**Status:** bom MVP; ainda distante de timeanddate/worldtimebuddy em profundidade.

### Pontos fortes

- World clock/meeting planner já aparece na home.
- Ferramentas de fuso, datas, dias úteis, timestamp, idade, percentual e unidades.
- Lógica browser-side boa para performance.

### Gaps

- Falta timeline visual horizontal estilo World Time Buddy.
- Falta páginas por cidade/fuso.
- Falta calendário/feriados por país.
- PT-BR sem acentos em vários termos.
- Termos como “Anchor”, nomes de cidades e partes do resultado ficam em inglês.

### Melhorias

- Criar timeline visual comparativa.
- Criar páginas SEO por cidade/fuso: `/pt-br/fuso-horario/sao-paulo`, `/en/time-zone/new-york` etc.
- Adicionar feriados regionais como upgrade/API ou feature futura.
- Melhorar locale por país/idioma.

**Score:** 76/100.

---

## 5.6. QRRoute

**Status:** bom começo; não está no padrão visual de QR leaders.

### Pontos fortes

- Static QR, barcode, UTM, vCard, Wi-Fi e preview.
- Preview local e segurança de payload.
- Upgrade path correto para QR dinâmico, short links, analytics e custom domain.

### Gaps

- Preview precisa ser mais dominante visualmente.
- PT-BR mistura inglês em labels e cards: “Static QR”, “Safe URL”, “Plain text”, “Optional label”, “Dynamic QR”.
- Falta bloco visual comparando QR estático vs dinâmico.
- Falta modelos de uso: restaurante, evento, Wi-Fi, cartão, campanha, embalagem.
- Falta donation block e ad slots finais.

### Melhorias

- Landing/tool acima da dobra: input à esquerda, QR grande à direita.
- Download PNG/SVG/PDF explícito.
- Cards de tipos de QR com ícones.
- Explicação curta: “static cannot be edited after printing”.
- QR dynamic waitlist/upgrade visual.
- Corrigir localização.

**Score:** 71/100.

---

## 5.7. InvoiceCraft

**Status:** funcionalmente bem alinhado ao benchmark de invoice generator; localização ainda bloqueia.

### Pontos fortes

- Editor de invoice/quote/receipt no topo.
- Preview e PDF local planejado/implementado.
- Campos principais de documento, moeda, datas, itens, desconto, frete, imposto manual.
- Upgrade path muito claro.

### Gaps

- PT-BR ainda tem inglês em campos e textos: “Fill issuer...”, “Clean document”, “Due on receipt...”, “Generated locally...”, “Saved clients...”.
- Falta preview visual real do documento na auditoria textual; precisa screenshot/browser test.
- Falta templates visuais.
- Falta distinção por país: fatura simples vs nota fiscal oficial no Brasil.

### Melhorias

- Corrigir localização.
- Criar layout de documento mais visual/premium.
- Adicionar templates: simple, professional, compact, service, product.
- Adicionar campos opcionais: logo, payment instructions, bank/PIX placeholder depois de legal review.
- Criar disclaimer local para não prometer nota fiscal.

**Score:** 73/100.

---

## 5.8. MailHealth

**Status:** boa base B2B; precisa relatório visual mais forte.

### Pontos fortes

- SPF, DKIM, DMARC, MX, blacklist, SMTP e headers.
- Health score unificado planejado.
- Explicações e limites técnicos.
- Upgrade path natural para monitoramento, alertas, DMARC reports e API.

### Gaps

- Resultado precisa virar score visual com cards pass/warn/fail.
- Benchmark MxToolbox/Mail-Tester é mais direto: domínio/email -> score -> problemas -> correções.
- PT-BR tem acentos faltando e termos híbridos.
- Falta builder seguro para SPF/DMARC/DKIM como conteúdo/upgrade futuro.

### Melhorias

- Relatório: score 0–100, status geral, DNS auth, reputation, transport, headers.
- Criar “Fix this” por problema.
- Criar exports/print report como upgrade placeholder.
- Criar páginas individuais profundas para SPF/DKIM/DMARC.

**Score:** 75/100.

---

## 5.9. SitePulse Lab

**Status:** bom MVP; precisa mais visual e mais próximo de GTmetrix/DownForEveryone.

### Pontos fortes

- Status, redirects, headers, robots, sitemap, TTFB e snapshot.
- Pulse score e report cards.
- Antiabuso e limites claros.
- Upgrade path correto para uptime, status page, histórico e multi-região.

### Gaps

- Resultado inicial ainda mostra muitos placeholders “--” e “Waiting/Ready”.
- Precisa resposta imediata estilo: “This site is up/down/redirecting/slow”.
- Falta waterfall/headers table/redirect chain visual.
- PT-BR mistura termos técnicos em inglês e falta acentos.

### Melhorias

- Criar report visual com cards: Availability, Redirects, Headers, Crawlability, Performance.
- Criar status hero: Online / Redirecting / Slow / Down.
- TTFB com escala visual.
- Tabela de headers e redirect hops.
- Adicionar baseline export/print as upgrade lead.

**Score:** 74/100.

---

## 5.10. PixelBatch

**Status:** funcional, mas ainda aquém de TinyPNG/iLoveIMG/remove.bg em impacto visual.

### Pontos fortes

- Dropzone local.
- Compress, resize, crop, convert, metadata, presets.
- Browser-only e no-upload muito claro.
- Limite de 10 MB declarado.

### Gaps

- PT-BR com inglês residual pesado: “Choose one public-safe image file”, “Start with a PNG...”, “Tune quality”, “Download locally”.
- Precisa before/after visual mais forte.
- Falta métrica original vs final: tamanho, redução %, dimensões, formato.
- Falta presets por marketplace/social.
- Remoção de fundo está apenas como futuro/IA; benchmark remove.bg tem demanda enorme.

### Melhorias

- Dropzone grande com preview antes/depois.
- Tabela de output: original size, output size, saved %, dimensions, format.
- Export buttons claros.
- Social/marketplace presets com nomes regionais.
- Backlog para background remover como produto pago/crédito.

**Score:** 70/100.

---

## 5.11. DocShift

**Status:** boa arquitetura browser-side; ainda precisa ficar mais próximo de iLovePDF/Smallpdf.

### Pontos fortes

- 8 ferramentas PDF.
- Local/browser-only bem explicado.
- Workflow de merge com limite transparente.
- Upgrade path correto para batch, OCR, API, teams.

### Gaps

- PT-BR mistura inglês em várias áreas: “Select PDFs in the order you want”, “Choose PDFs in order”, “Validate locally”, “Download one output”, “Batch folders”.
- Falta grid visual grande tipo iLovePDF.
- Falta dropzone dominante por ferramenta.
- Falta CTA claro de baixar após processar.
- Falta tutorial visual por operação.

### Melhorias

- Home DocShift com grid amplo: Merge, Split, Compress, Rotate, Watermark, Unlock/Protect, Page Numbers, Metadata, OCR future.
- Tool page com dropzone principal e passos simples.
- Antes de conteúdo longo, mostrar “1 upload / 2 reorder / 3 download”.
- Corrigir localização.
- Criar conteúdo educativo por ferramenta.

**Score:** 72/100.

---

## 6. Problemas transversais P0

## 6.1. Localização incompleta

Bloqueador para AdSense/SEO internacional.

Problemas encontrados:

- inglês residual em PT-BR;
- falta de acentuação: “matematica”, “pagina”, “portugues”, “sessao”, “nao”, “util”, “operacao”;
- termos internos: “billing”, “ads”, “launch checks”, “release”, “workflow”;
- misturas como “Verificação gratuito”, “O versão gratuita gratuito”.

### Ação

Criar sprint de localization QA:

```txt
- varrer todos os JSON/YAML/messages por locale;
- proibir fallback inglês em rotas localizadas, exceto termos técnicos justificados;
- corrigir acentos;
- revisar plural/gênero;
- rodar crawler que detecta strings inglesas em /pt-br, /es, /fr, /de;
- não indexar página localizada incompleta;
- criar lista de exceções permitidas por idioma.
```

## 6.2. Linguagem interna exposta

Trocar:

| Atual | Público recomendado |
|---|---|
| Ads not active | Free version. Ads may appear after launch review. |
| Billing disabled | Paid workflows are planned. |
| Release checks | Quality checks. |
| Workers planned | Advanced monitoring planned. |
| External analytics inactive | Privacy-first analytics planned. |
| Public API live | Live check. |

Ideal: remover da área principal e mover para `/status`, tool methodology ou admin.

## 6.3. Doação ausente/inativa

Benchmark `whatsmydns.net` usa doação no footer. Incluir em todos:

- bloco após guia/FAQ;
- texto: “Support this free tool”;
- CTA inativo/placeholder até revisão legal;
- nunca associar doação a resultado melhor;
- registrar gate em HUMAN_ACTION_REQUIRED.

## 6.4. AdSense layout ainda não final

A estrutura precisa reservar slots:

```txt
H1 + descrição curta
Ferramenta
Resultado
Interpretação curta
Ad slot 1 reservado
Detalhes técnicos
Ferramentas relacionadas
Ad slot 2 reservado
Guia/FAQ
Doação
Rodapé rico
```

Sem anúncio real até aprovação.

## 6.5. Rodapés verticais fracos

Cada site precisa rodapé próprio com clusters profundos:

- Tools
- Guides
- Popular checks
- Related categories
- API/Upgrade
- Browser extension/app quando fizer sentido
- Status
- Contact
- Legal

NetProbe deve ser o primeiro a receber esse rodapé por causa do exemplo `whatsmydns.net`.

---

## 7. Priorização objetiva

## P0 — antes de AdSense/escala SEO

1. Corrigir localização PT-BR/ES/FR/DE e eliminar fallback inglês não intencional.
2. Remover linguagem interna das áreas principais públicas.
3. NetProbe: redesenhar DNS Propagation e What Is My IP contra benchmarks.
4. Criar donation block padrão, ainda gated.
5. Criar ad-slot layout reservado e seguro.
6. Criar rodapé vertical rico por site.
7. Rodar crawler Playwright 100% de links internos.
8. Rodar Lighthouse/PageSpeed/GTmetrix e corrigir CWV.
9. Validar formulários e downloads em browser real.
10. Expandir páginas legais e contato antes de monetização.

## P1 — refinamento de produto

1. CalcHarbor: ampliar catálogo de calculadoras.
2. DevUtility: split editor, output tabs e toolbar.
3. TimeNexus: timeline visual e páginas por cidade/fuso.
4. QRRoute: QR preview dominante e templates.
5. InvoiceCraft: preview visual premium e templates.
6. MailHealth: score report pass/warn/fail.
7. SitePulse: status hero + tabela de headers/redirects.
8. PixelBatch: before/after + métricas de compressão.
9. DocShift: grid iLovePDF-like e dropzone por ferramenta.

## P2 — crescimento e monetização

1. AdSense submit após qualidade/idioma/legal.
2. Afiliados seletivos: VPN, hosting, domínio, e-mail, PDF, design.
3. Upgrades: monitoramento, histórico, API, batch, templates, branding.
4. Email capture/newsletter em áreas educativas.
5. A/B tests de tool-first hero, ad placement, donation e upsell.

---

## 8. Critérios de aceite por página

Uma página só deve ser considerada pronta para benchmark refinement quando cumprir:

- [ ] H1 com intenção clara.
- [ ] Ferramenta acima da dobra.
- [ ] Resultado grátis completo sem cadastro.
- [ ] Resultado em card/tabela/score com botão copiar/exportar quando útil.
- [ ] Explicação simples do resultado.
- [ ] Detalhe técnico em camada própria.
- [ ] Próximas ações/correção.
- [ ] Ferramentas relacionadas.
- [ ] Conteúdo educativo original.
- [ ] FAQ.
- [ ] Review date.
- [ ] Methodology/limits.
- [ ] Footer vertical rico.
- [ ] Donation block gated.
- [ ] Ad slots reservados sem CLS.
- [ ] Nenhum termo interno de deploy/billing visível no fluxo principal.
- [ ] Tradução 100% localizada na rota.
- [ ] `canonical` e `hreflang` corretos.
- [ ] Sem links quebrados.
- [ ] Sem erro console.
- [ ] Lighthouse mobile >= 90 em performance/SEO/accessibility/best practices sempre que tecnicamente possível.

---

## 9. Prompt operacional para Codex

```txt
Você é Codex no projeto D:\Projetos\supersites.

Objetivo desta etapa:
Executar benchmark-driven refinement dos 10 sites e do Supersite Hub, mantendo a numeração real de fase/sprint já existente no ROADMAP/STATUS. Não invente Sprint 5, Fase 5 ou qualquer numeração fixa. Descubra a próxima numeração disponível nos docs atuais e continue a partir dela.

Antes de qualquer alteração:
1. Leia integralmente AGENTS.md.
2. Leia integralmente docs/MEGA_PROMPT_SUPERSITES.md.
3. Leia integralmente docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md.
4. Leia integralmente docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK_V2.md.
5. Leia os prints em docs/benchmarks.
6. Leia STATUS, ROADMAP, ARCHITECTURE, SEO_AIO_PLAYBOOK, ADSENSE_PLAYBOOK, ANALYTICS, BILLING, METRICS, HUMAN_ACTION_REQUIRED, RUNBOOKS e ADRs.
7. Verifique git, CI, deploy, ambiente público e produção real.
8. Não exponha nem versione segredos.
9. Não ative anúncios reais, billing real, checkout, webhooks externos, analytics externo, API paga, afiliados ou doações sem gates humanos.

Primeiro trabalho obrigatório:
1. Rode crawler Playwright em https://opentshost.com/supersites/.
2. Percorra 100% dos links internos sob /supersites/.
3. Gere screenshots desktop/mobile de cada página relevante.
4. Execute Lighthouse para home, cada site e páginas principais de ferramentas.
5. Gere relatório de links quebrados, console errors, status HTTP, canonical, hreflang, title, description, headings e idioma.
6. Detecte strings em inglês nas rotas /pt-br, /es, /fr, /de, exceto lista técnica permitida.
7. Atualize docs com evidências.

Depois, implemente sprints sequenciais, usando a próxima numeração real do roadmap:

BR-LOCALIZATION:
- Corrigir localização e acentos em todos os idiomas.
- Remover fallback inglês indevido.
- Criar teste/crawler de strings misturadas por idioma.

BR-PUBLIC-LANGUAGE:
- Remover linguagem interna de launch/deploy/billing/ads das áreas principais.
- Mover status técnico para páginas de status/methodology/admin.

BR-NETPROBE:
- Redesenhar What Is My IP com painel visual imediato, IPv4/IPv6, ISP/ASN, reverse, proxy/VPN, mapa e ferramentas relacionadas.
- Redesenhar DNS Propagation com matriz de locais/resolvedores, status badges, mapa, tipos A/AAAA/CNAME/MX/NS/PTR/SOA/SRV/TXT/CAA, valor esperado, guia profundo e rodapé DNS rico.

BR-MONETIZATION-SAFE-LAYOUT:
- Criar ad slots reservados e seguros, sem requisições reais.
- Criar donation block gated e padronizado.
- Criar footer vertical rico por site.

BR-SITE-REFINEMENTS:
- CalcHarbor: mais calculadoras, currency/locale e grid denso.
- DevUtility: editor split, tabs, toolbar, output concreto.
- TimeNexus: timeline visual e city/timezone pages.
- QRRoute: QR preview dominante, templates e estático vs dinâmico.
- InvoiceCraft: preview visual premium e templates.
- MailHealth: health score pass/warn/fail e correções.
- SitePulse: status hero, redirect table, headers table e TTFB visual.
- PixelBatch: before/after e métricas original/output.
- DocShift: grid tipo suíte, dropzone dominante e fluxo de três passos.

Para cada sprint:
1. Implementar código.
2. Rodar testes, build, lint, typecheck, Playwright, crawler, Lighthouse aplicável, validate:structure, validate:secrets, deploy dry-run e git diff --check.
3. Atualizar STATUS, ROADMAP, METRICS e docs afetados.
4. Commitar.
5. Pushar.
6. Monitorar GitHub Actions e Deploy Dry Run.
7. Registrar evidências e IDs de runs.
8. Fazer commit documental de fechamento.

Critério de conclusão:
- Score geral mínimo 80/100 na próxima auditoria.
- NetProbe mínimo 82/100.
- Multilíngue mínimo 90/100.
- Nenhuma rota pública com inglês residual indevido.
- Ferramenta grátis acima da dobra em todas as tool pages.
- Rodapé vertical rico em todos os sites.
- Ad slots reservados sem CLS.
- Donation block gated em todos os sites.
- Sem linguagem interna exposta no fluxo principal.
```

---

## 10. Conclusão

A base está certa. O desenvolvimento saiu do placeholder e entrou em MVP funcional. Porém, para cumprir a ambição do benchmark — capturar tráfego orgânico, parecer familiar ao usuário dos líderes e preparar AdSense — ainda falta uma rodada pesada de refinamento.

A próxima etapa não deve criar mais sites. Deve transformar os sites atuais em produtos públicos mais maduros:

```txt
tool-first + result-first + localized + benchmark-familiar + fast + AdSense-safe + upgrade-ready
```

Prioridade absoluta: **NetProbe + localização + linguagem pública + rodapés + donation/ad slots seguros.**
