# BENCHMARK E PROMPT DE REFINAMENTO FRONTEND — SUPERSITES

**Arquivo canônico:** `supersites/docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`
**Projeto:** `supersites-platform`
**Documento relacionado:** `supersites/docs/MEGA_PROMPT_SUPERSITES.md`
**Data-base:** 2026-06-27
**Público-alvo:** agentes Codex/GPT com autonomia de desenvolvimento, integração, configuração, deploy e documentação.

---

## 1. Missão do agente

Você é o agente responsável por **benchmark, refinamento de frontend, UX, SEO, AIO/GEO, performance e monetização** dos 10 sites do projeto Supersites.

Leia primeiro:

1. `supersites/AGENTS.md`
2. `supersites/docs/MEGA_PROMPT_SUPERSITES.md`
3. Este documento

Este documento **não substitui** o mega prompt principal. Ele complementa o projeto com benchmark visual, funcional e estratégico.

O objetivo é simples:

> Estudar os sites líderes já validados, entender como eles entregam valor, refinar nossos 10 sites para capturar tráfego orgânico, monetizar com AdSense e converter upgrades pagos sem copiar marca, layout, texto, código, assets ou identidade visual de terceiros.

---

## 2. Resultado esperado

Para cada site do projeto, entregue:

1. Benchmark documentado dos principais concorrentes/referências.
2. Print desktop e mobile dos benchmarks.
3. Print desktop e mobile do nosso site antes e depois.
4. Matriz comparativa de funcionalidades, layout, conteúdo, SEO, monetização e oportunidades.
5. PRs implementando melhorias de baixo risco.
6. Issues/tarefas para melhorias que exigem decisão, custo, API externa, infraestrutura ou compra de serviço.
7. Registro das recomendações no dashboard administrativo do Supersite.
8. Relatório executivo por site e consolidado.

Arquivos mínimos a criar/atualizar:

```txt
supersites/docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md
supersites/docs/BENCHMARK_MATRIX.md
supersites/docs/SITES/<site>/BENCHMARK_NOTES.md
supersites/docs/SITES/<site>/FRONTEND_REFINEMENT_PLAN.md
supersites/docs/SITES/<site>/SEO_AIO_REFINEMENT_PLAN.md
supersites/docs/SITES/<site>/MONETIZATION_REFINEMENT_PLAN.md
```

---

## 3. Regra-mãe: aprender, não copiar

Use os benchmarks para extrair padrões validados. Não copie:

- Marca.
- Nome.
- Logotipo.
- Paleta visual identificável.
- Layout 1:1.
- Texto.
- Imagens.
- Ícones proprietários.
- Código.
- Estrutura HTML específica.
- Claims comerciais.
- Política de privacidade ou termos.

O que deve ser copiado é apenas o **raciocínio de produto**:

- Qual problema aparece acima da dobra.
- Como o usuário executa a ferramenta.
- Como o resultado é mostrado.
- Como a página educa o usuário.
- Como o site conecta uma ferramenta com outras relacionadas.
- Onde monetiza com anúncio, doação, afiliado ou upgrade.
- Como organiza navegação, rodapé, conteúdo e CTAs.

O visual final dos nossos sites deve ser **premium, técnico, limpo, rápido e confiável**, com identidade própria.

---

## 4. Diretriz de experiência: simples primeiro, técnico depois

Todos os sites devem seguir a mesma lógica de UX:

```txt
1. Entregar a resposta principal imediatamente.
2. Explicar em linguagem simples o que o resultado significa.
3. Mostrar detalhes técnicos em camadas expansíveis.
4. Mostrar o que fazer em seguida.
5. Sugerir ferramentas relacionadas.
6. Mostrar conteúdo educacional original.
7. Só então empurrar upgrade, afiliado, newsletter ou doação.
```

Aplicar esse padrão em todas as ferramentas:

| Camada | Conteúdo |
|---|---|
| **Resumo rápido** | status, número, resposta principal, botão copiar, badge de sucesso/erro/atenção |
| **Explicação leiga** | “o que isso significa”, “está correto?”, “devo me preocupar?” |
| **Detalhe técnico** | registros, headers, traces, logs, JSON, tabela, metadados |
| **Correção** | passo a passo para resolver o problema |
| **Próximas ações** | monitorar, testar outro registro, exportar relatório, salvar histórico, criar alerta |
| **Conteúdo SEO/AIO** | guia original, FAQ, exemplos, glossário, links internos |

---

## 5. Multilíngue, AdSense e SEO internacional

Criar sites multilíngues **não é problema** para AdSense, desde que as páginas monetizadas estejam em idiomas suportados pelo Google Publisher Products/AdSense.

Regras obrigatórias:

1. Cada idioma precisa ter URL própria.
2. Usar `hreflang` corretamente.
3. Usar `x-default` quando aplicável.
4. Não usar apenas cookie, sessão ou browser language para trocar idioma.
5. Não redirecionar automaticamente de forma agressiva impedindo o usuário de acessar outra versão.
6. Não monetizar com AdSense páginas em idiomas não suportados.
7. Não publicar tradução automática sem revisão mínima de qualidade.
8. Cada idioma precisa ter título, descrição, conteúdo, FAQ e schema localizados.
9. O seletor de idioma precisa ser visível e rastreável.
10. Canonicals devem apontar para a própria URL da versão linguística, não sempre para inglês.

Estrutura recomendada:

```txt
/en/tool-name
/pt-br/nome-da-ferramenta
/es/nombre-de-herramienta
/fr/nom-outil
/de/tool-name-de
```

Manter no dashboard do Supersite um relatório por idioma:

- Indexação.
- Pageviews.
- RPM.
- Receita AdSense.
- CTR orgânico.
- Impressões no Search Console.
- Conversões pagas.
- Traduções incompletas.
- Páginas com baixa qualidade.
- Páginas com risco de conteúdo fino.

Fontes oficiais para validar durante a implementação:

- https://support.google.com/adsense/answer/9727
- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- https://developers.google.com/search/docs/specialty/international/localized-versions

---

## 6. AdSense, anúncios, doação e monetização

AdSense é a monetização primária inicial. Upgrade pago, afiliados, APIs, créditos e monitoramento são monetizações secundárias ou evolutivas.

### 6.1. Posição de anúncios

Nunca inserir anúncios:

- Colados no botão principal da ferramenta.
- Entre o input e o botão de submit.
- Dentro de tabela de resultado de forma que pareça resultado.
- Acima da resposta principal se isso prejudicar a experiência.
- Em posição que gere clique acidental.
- Sem reservar espaço, causando CLS.

Layout seguro padrão:

```txt
H1 + descrição curta
Ferramenta principal
Resultado principal
Bloco de interpretação
Ad slot 1
Detalhes técnicos
Ferramentas relacionadas
Ad slot 2
Guia/FAQ/base de conhecimento
Doação/suporte
Rodapé completo
```

Reservar dimensões fixas para todos os ad slots para não quebrar Core Web Vitals.

Fontes oficiais para validar:

- https://support.google.com/adsense/answer/10025624
- https://support.google.com/adsense/answer/13554116
- https://support.google.com/adsense/answer/9727

### 6.2. Doação

Adicionar em todos os sites um bloco discreto de doação:

- “Support this free tool”.
- Botão PayPal/Stripe/Buy Me a Coffee, conforme definido no projeto.
- Exibir depois de entregar valor, preferencialmente perto do rodapé ou após conteúdo educacional.
- Não pedir clique em anúncio.
- Não sugerir que doação melhora resultado técnico.

Inspiração validada: `whatsmydns.net` possui bloco “Support Me” e botão de doação no rodapé.

### 6.3. Upgrade pago

O gratuito precisa resolver a intenção principal. O pago vende conveniência e operação:

- Histórico.
- Monitoramento.
- Alertas.
- Exportação.
- Processamento em lote.
- API.
- Relatórios.
- White-label.
- Sem anúncios.
- Limites maiores.
- Equipe/clientes.

Não bloquear o resultado básico atrás de cadastro.

---

## 7. Performance obrigatória

Meta mínima:

| Métrica | Meta |
|---|---:|
| PageSpeed mobile | 90+ |
| PageSpeed desktop | 95+ |
| GTmetrix | A |
| LCP | < 2,5s |
| INP | < 200ms |
| CLS | < 0,1 |
| TTFB cacheado | < 300ms quando tecnicamente possível |
| JS inicial | mínimo absoluto |
| Imagens | WebP/AVIF, lazy load, dimensões declaradas |
| Ads | slots reservados, carregamento lazy quando possível |

Fontes oficiais:

- https://web.dev/articles/vitals
- https://developers.google.com/search/docs/appearance/core-web-vitals
- https://pagespeed.web.dev/
- https://gtmetrix.com/

Não sacrificar performance por animação, mapa pesado, gráficos desnecessários ou bibliotecas grandes.

---

## 8. Procedimento de benchmark para o agente

Para cada benchmark listado neste documento:

1. Acesse a URL principal.
2. Capture screenshot desktop.
3. Capture screenshot mobile.
4. Execute uma consulta real, quando possível.
5. Observe:
   - H1.
   - Hero.
   - Tool panel.
   - Formulário/input.
   - Estado de carregamento.
   - Resultado.
   - Erros.
   - Call-to-action.
   - Ads.
   - Doação.
   - Conteúdo educacional.
   - FAQ.
   - Rodapé.
   - Ferramentas relacionadas.
   - Multilíngue.
   - Monetização paga.
6. Documente padrões úteis em `docs/SITES/<site>/BENCHMARK_NOTES.md`.
7. Não copie texto ou layout 1:1.
8. Transforme padrões úteis em componentes próprios.
9. Implemente melhorias de baixo risco em branch específica.
10. Rode testes, Lighthouse e auditoria de links/schema/hreflang.
11. Registre mudanças e oportunidades no dashboard do Supersite.

Branch sugerida:

```txt
benchmark/frontend-refinement-<site-slug>
```

---

## 9. Benchmarks globais mais relevantes

Dados de tráfego abaixo são estimativas públicas de ferramentas como Semrush/Similarweb/Exploding Topics, usadas apenas como **ordem de grandeza**. Antes de tomar decisão comercial final, validar novamente em Semrush, Similarweb, Ahrefs, Google Trends e Search Console próprio.

| Benchmark | URL | Site nosso relacionado | Visitas/mês estimadas | Pageviews/mês estimados | O que valida |
|---|---|---|---:|---:|---|
| iLovePDF | https://www.ilovepdf.com/ | DocShift | 238,21M | 1,17B | Suíte de ferramentas com home em grid, tool pages simples e forte cross-linking |
| TinyURL | https://tinyurl.com/ | QRRoute | 91,44M | 148M | Link utility em escala, monetização por plano/branding/analytics |
| remove.bg | https://www.remove.bg/ | PixelBatch | 69,69M | 194M | Upload instantâneo, resultado visual rápido, crédito/API/upsell |
| Calculator.net | https://www.calculator.net/ | CalcHarbor | 58,22M | 182M | SEO programático com calculadoras simples e conteúdo explicativo |
| timeanddate | https://www.timeanddate.com/ | TimeNexus | 49,68M | 132M | Hub global de tempo/data com autoridade temática e profundidade de conteúdo |
| iLoveIMG | https://www.iloveimg.com/ | PixelBatch | 39,64M | validar | Grid de ferramentas de imagem e processamento rápido |
| Smallpdf | https://smallpdf.com/ | DocShift | 34,67M | 128M | Freemium de PDF com UX premium e upsell claro |
| whatismyipaddress | https://whatismyipaddress.com/ | NetProbe Atlas | 33,87M | 77M | IP lookup com cards, mapa, ferramentas relacionadas, VPN/afiliados |
| ME-QR | https://me-qr.com/ | QRRoute | 32,22M | 71M | QR freemium multilíngue com tipos de QR e analytics |
| Sejda | https://www.sejda.com/ | DocShift | 20,58M | validar | PDF web/desktop, limites gratuitos e plano pago |
| Time.is | https://time.is/ | TimeNexus | 20,65M | 42M | Resposta instantânea, página extremamente direta |
| Omni Calculator | https://www.omnicalculator.com/ | CalcHarbor | 16,28M | 24M | Calculadoras interativas com explicação guiada |
| DownDetector | https://downdetector.com/ | SitePulse Lab | 15M | 34M | Status/outage intelligence e dados agregados |
| CalculatorSoup | https://www.calculatorsoup.com/ | CalcHarbor | 10,5M | 22M | Fórmulas, passo a passo e muitas calculadoras de cauda longa |
| World Time Buddy | https://www.worldtimebuddy.com/ | TimeNexus | 9M | 16M | Comparação de fusos com timeline visual |
| QR Code Generator | https://www.qr-code-generator.com/ | QRRoute | 8,59M | validar | QR estático gratuito e QR dinâmico pago |
| Whois.com | https://www.whois.com/whois/ | NetProbe Atlas | 8,35M | 24,8M | Consulta de domínio integrada com venda de domínios/hosting |
| DNSChecker | https://dnschecker.org/ | NetProbe Atlas | 7,77M | 22,1M | Cluster DNS/IP com várias ferramentas relacionadas |
| 24timezones | https://24timezones.com/ | TimeNexus | 7,28M | validar | Relógio mundial e mapas/fusos |
| UnitConverters | https://www.unitconverters.net/ | TimeNexus/CalcHarbor | 6,88M | validar | Conversores simples com SEO de cauda longa |
| DownForEveryoneOrJustMe | https://downforeveryoneorjustme.com/ | SitePulse Lab | 5,7M | validar | Resposta rápida para “site está fora do ar?” |
| TinyPNG | https://tinypng.com/ | PixelBatch | 5,37M | validar | Compressão visual simples e API paga |
| Online2PDF | https://online2pdf.com/ | DocShift | 4,34M | validar | Conversão PDF orientada por tarefa |
| MxToolbox | https://mxtoolbox.com/ | MailHealth/NetProbe | 4,12M | validar | Diagnóstico técnico B2B e monitoramento pago |
| BuiltWith | https://builtwith.com/ | SitePulse Lab | 4,1M | validar | Tech detection como ferramenta grátis + dados B2B |
| CodeBeautify | https://codebeautify.org/ | DevUtility Lab | 2,63M | 5,5M | Grande suíte de ferramentas dev com SEO de cauda longa |
| Invoice Generator | https://invoice-generator.com/ | InvoiceCraft | 2,03M | 10,7M | Editor gratuito sem cadastro, alto engajamento e intenção comercial |
| GTmetrix | https://gtmetrix.com/ | SitePulse Lab | 1,31M | 5,9M | Relatório técnico premium e monitoramento pago |
| Mail-Tester | https://www.mail-tester.com/ | MailHealth | 698K | 3,3M | Score simples de entregabilidade com detalhes técnicos |
| SSL Labs | https://www.ssllabs.com/ssltest/ | SitePulse/NetProbe | 485K | 7,2M | Relatórios técnicos profundos e alto engajamento |
| IntoDNS | https://intodns.com/ | NetProbe Atlas | 469K | 1,3M | Diagnóstico DNS detalhado em uma página |
| EasyDMARC | https://easydmarc.com/ | MailHealth | 407K | validar | Educação + ferramentas + SaaS de DMARC |
| Redirect Checker | https://www.redirect-checker.org/ | NetProbe/SitePulse | 345K | 1,6M | Ferramenta específica com alto engajamento |

---

# 10. Supersite — catálogo e dashboard central

## 10.1. Objetivo

O Supersite é o **hub público e administrativo** de todo o portfólio.

Ele precisa ter:

1. Página pública de catálogo dos 10 sites.
2. Página pública por site com descrição, ferramentas, idioma, status e links.
3. Dashboard administrativo unificado.
4. Comparativo entre sites.
5. Relatórios de tráfego, monetização, SEO, AIO, produto e comercial.
6. Sistema de insights de IA com recomendações acionáveis.
7. Roadmap e backlog por site.
8. Registro de experimentos e resultado antes/depois.

## 10.2. Benchmarks para catálogo

Acessar e estudar:

- https://www.producthunt.com/
- https://alternativeto.net/
- https://www.saashub.com/
- https://theresanaiforthat.com/
- https://www.similarweb.com/top-websites/
- https://trends.google.com/

O que aprender:

- Cards compactos.
- Categorias.
- Filtros.
- Busca.
- Tags.
- Badges.
- “Featured tools”.
- Ranking de popularidade.
- Coleções.
- Página individual por produto.
- Blocos “alternativas” e “relacionados”.
- Sinais de confiança.

Não transformar o Supersite em blog genérico. Ele deve ser um **catálogo operacional com dados reais**.

## 10.3. Benchmarks para dashboard administrativo

Acessar e estudar:

- Google Analytics 4
- Google AdSense
- Google Search Console
- Cloudflare Analytics
- Stripe Dashboard
- Plausible Analytics
- Umami Analytics
- PostHog
- Metabase
- Grafana

O que aprender:

- KPI cards no topo.
- Comparação período atual vs anterior.
- Drilldown por site, idioma, página, ferramenta e país.
- Alertas de queda de tráfego/receita.
- Gráficos simples e legíveis.
- Filtros persistentes.
- Relatórios exportáveis.
- Tabela de páginas vencedoras/perdedoras.
- Painel de oportunidades.
- Log de ações executadas por IA/agente.

## 10.4. KPIs obrigatórios do Supersite

| Área | KPIs |
|---|---|
| Tráfego | usuários, sessões, pageviews, pages/session, bounce/engagement, países, devices, browsers |
| SEO | impressões, cliques, CTR, posição média, páginas indexadas, páginas com erro, sitemap, hreflang |
| AdSense | receita, RPM, CTR, impressões, viewability, políticas, blocos com baixo rendimento |
| Comercial | leads, trials, clientes, MRR, ARR, churn, LTV, ARPU, inadimplência, reembolsos |
| Produto | ferramentas usadas, consultas, erros, tempo médio de resposta, limites, API calls |
| Performance | LCP, INP, CLS, TTFB, PageSpeed, GTmetrix, erros JS, uptime |
| Conteúdo | páginas sem conteúdo suficiente, FAQs faltantes, traduções pendentes, oportunidade AIO |
| IA | recomendações, ações executadas, PRs abertos, PRs aprovados, impacto medido |

---

# 11. Site 1 — NetProbe Atlas

**Nicho:** IP, DNS, RDAP, domínio, SSL, redirects, headers e diagnóstico técnico de rede.
**Prioridade:** máxima. Este é o primeiro site da lista e deve receber refinamento antes dos demais.

## 11.1. Benchmarks obrigatórios

### 11.1.1. whatsmydns.net

URL:

```txt
https://www.whatsmydns.net/
```

Screenshots fornecidos no projeto:

```txt
supersites/docs/benchmarks/screenshots/whatsmydns_dns_propagation.png
```

O que foi encontrado:

- Ferramenta principal de propagação DNS acima da dobra.
- Campo para domínio.
- Seletor de tipo de registro: A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT, CAA.
- Campo de valor esperado.
- Botão de busca direto.
- Lista de servidores/locais globais.
- Status visual por local, com sucesso/erro.
- Mapa mundial com marcadores de locais.
- Alternância entre visão de mapa e lista.
- Texto educacional longo explicando DNS propagation, DNS lookup, TTL, cache, tipos de servidores e tipos de registros.
- Bloco de doação “Support Me”.
- Rodapé com muitas ferramentas relacionadas.
- Rodapé cria cluster SEO interno muito forte.
- Site é simples, leve e objetivo.
- Visual é técnico e antigo, mas validado por uso real.

Itens de rodapé relevantes para replicar como arquitetura de informação própria:

```txt
DNS Tools
- DNS Checker
- DNS Lookup
- Reverse DNS Lookup
- What's My IP Address?

DNS Guides
- DNS Security
- Flush DNS
- Hosts File

DNS Lookup
- A Record Lookup
- AAAA Record Lookup
- CAA Record Lookup
- CNAME Record Lookup
- MX Record Lookup
- NS Record Lookup
- PTR Record Lookup
- SOA Record Lookup
- SRV Record Lookup
- TXT Record Lookup

Articles & Blog
- DNS Articles
- Development Blog

DNS Servers
- Global DNS Servers
- Australian DNS Servers
- France DNS Servers
- New Zealand DNS Servers
- United Kingdom DNS Servers
- United States DNS Servers

Browser Extension
- Chrome

Social Media
Contact
Legal
Privacy Policy
```

O que implementar no NetProbe Atlas:

1. Página principal de DNS propagation com experiência equivalente ou superior.
2. Input principal:
   - domínio;
   - tipo de registro;
   - valor esperado opcional;
   - botão buscar;
   - exemplos clicáveis.
3. Resultado em duas visões:
   - lista/tabela por local;
   - mapa mundial leve, carregado após resultado ou em lazy load.
4. Cada local precisa mostrar:
   - país;
   - cidade ou região;
   - provedor/resolver;
   - IP/valor retornado;
   - status: match, mismatch, timeout, erro, sem registro;
   - tempo de resposta;
   - timestamp.
5. Resumo acima da lista:
   - porcentagem propagada;
   - total de resolvers testados;
   - registros distintos encontrados;
   - TTL quando disponível;
   - status geral.
6. Explicação simples:
   - “Seu DNS já propagou?”
   - “O que fazer se alguns locais ainda mostram o valor antigo?”
7. Detalhes técnicos expansíveis.
8. Botões:
   - copiar resultado;
   - compartilhar URL;
   - exportar JSON/CSV;
   - testar outro registro;
   - monitorar esse registro.
9. Upsell:
   - monitoramento de DNS;
   - alerta de mudança;
   - histórico;
   - relatórios;
   - API;
   - white-label para agências.
10. Conteúdo educacional original abaixo do resultado.
11. Bloco de doação perto do rodapé.
12. Rodapé rico com todas as ferramentas relacionadas.

Atenção técnica:

- Se ainda não existirem resolvers reais em vários países, não mentir. Usar o texto “resolver vantage points” ou “global resolver checks” apenas quando tecnicamente verdadeiro.
- Se for usado provedor terceiro, documentar fonte e limitações.
- Não prometer “propagação global real” se o backend consulta apenas poucos DNS públicos.

### 11.1.2. DNSChecker

URL:

```txt
https://dnschecker.org/
```

O que estudar:

- Organização como suíte de ferramentas DNS/IP.
- Páginas individuais por tipo de registro.
- SEO de cauda longa.
- Distribuição de links internos.
- Padrão de resultado técnico.
- Como usa anúncios sem bloquear a ferramenta.

O que implementar:

- Criar páginas próprias para cada tipo de lookup.
- Criar hub `/dns-tools`.
- Criar páginas de guias DNS.
- Criar links internos bidirecionais entre ferramentas e artigos.

### 11.1.3. whatismyipaddress.com

URL:

```txt
https://whatismyipaddress.com/pt/meu-ip
```

Screenshot fornecido:

```txt
supersites/docs/benchmarks/screenshots/whatismyipaddress_pt_meu_ip.png
```

O que foi encontrado:

- Página multilíngue em português.
- Mostra IPv4 e IPv6.
- Mostra ISP, cidade, região e país.
- Exibe mapa.
- CTA forte para ocultar IP.
- Menus para VPN, ferramentas, segurança e aprendizado.
- Cards segmentados por preocupação do usuário: segurança, privacidade e acesso.
- Bloco “conforme visto em”.
- Grade de ferramentas relacionadas.
- Links para muitos idiomas.
- Monetização por ads e afiliados de VPN.

O que implementar no NetProbe Atlas:

- Página `/what-is-my-ip` e versões traduzidas.
- Card principal com IPv4/IPv6.
- ISP, ASN, cidade, região, país, timezone e reverse DNS.
- Indicador proxy/VPN/Tor quando houver fonte confiável.
- Mapa leve e opcional.
- CTA afiliado ou próprio: VPN, privacidade, blacklist, monitoramento.
- Cards de intenção:
  - Segurança.
  - Privacidade.
  - Diagnóstico.
  - Performance.
- Ferramentas relacionadas:
  - IP lookup.
  - Reverse DNS.
  - Blacklist check.
  - DNS leak test.
  - Headers check.
  - SSL check.

### 11.1.4. whatismyip.com.br

URL:

```txt
https://whatismyip.com.br/
```

Screenshot fornecido:

```txt
supersites/docs/benchmarks/screenshots/whatismyip_com_br.png
```

O que foi encontrado:

- Página extremamente simples.
- Resultado direto:
  - IP;
  - reverso;
  - navegador;
  - plataforma;
  - proxy;
  - país;
  - cidade.
- Input para consultar domínio/IP.
- Menu mínimo.
- Tradução inglês/português.
- Ads visíveis.

O que aprender:

- Para intenção “qual é meu IP?”, velocidade e clareza valem muito.
- Não esconder resposta atrás de explicação.
- A versão premium do nosso frontend precisa manter essa objetividade, mas com visual melhor.

### 11.1.5. Outros benchmarks NetProbe

Acessar e estudar:

```txt
https://www.whois.com/whois/
https://mxtoolbox.com/
https://intodns.com/
https://www.ssllabs.com/ssltest/
https://www.redirect-checker.org/
https://www.nslookup.io/
https://www.yougetsignal.com/tools/open-ports/
https://www.hardenize.com/
```

O que extrair:

- Whois.com: consulta de domínio com venda de domínio/hospedagem.
- MxToolbox: barra de busca universal para vários diagnósticos e monitoramento pago.
- IntoDNS: relatório técnico de saúde DNS com status por categoria.
- SSL Labs: profundidade técnica e notas/grades.
- Redirect Checker: fluxo simples para redirect chain.
- NSLookup.io: UI moderna para DNS lookup.
- YouGetSignal: ferramentas pequenas de rede, simples e diretas.
- Hardenize: relatório premium de segurança e configuração.

## 11.2. Padrão visual recomendado

NetProbe Atlas deve parecer:

- técnico;
- confiável;
- premium;
- rápido;
- limpo;
- sem aparência de clone antigo;
- mais organizado que whatsmydns;
- mais completo que whatismyip.com.br;
- menos poluído que portais cheios de ads.

Componentes-chave:

```txt
Hero compacto
Tool card dominante
Result summary card
Technical tabs
Global result table
Map lazy-loaded
Related tools strip
Knowledge base article
FAQ
Donation module
Ad slots reservados
Footer mega-menu
```

---

# 12. Site 2 — CalcHarbor

**Nicho:** calculadoras financeiras, empresariais e operacionais.

## 12.1. Benchmarks obrigatórios

Acessar:

```txt
https://www.calculator.net/
https://www.omnicalculator.com/
https://www.calculatorsoup.com/
https://www.inchcalculator.com/
https://www.unitconverters.net/
https://www.bankrate.com/calculators/
https://www.nerdwallet.com/calculators
```

## 12.2. O que foi encontrado nos líderes

### Calculator.net

- Visual simples.
- Muitos links internos.
- Categorias claras.
- Calculadoras com formulário direto.
- Conteúdo explicativo abaixo.
- SEO forte em milhares de intenções.
- Baixo custo operacional.
- Pouca fricção.

### Omni Calculator

- UX mais moderna.
- Calculadoras interativas.
- Explicações contextuais.
- Campos dinâmicos.
- Bom para inspiração de interface, não para copiar layout.

### CalculatorSoup

- Forte em fórmula e passo a passo.
- Bom para usuários que querem entender o cálculo.
- Páginas longas e úteis.

### Bankrate/NerdWallet

- Bons exemplos de monetização financeira e lead-gen.
- Muito conteúdo de suporte.
- Cuidado: não copiar tom de aconselhamento financeiro sem revisão e disclaimers.

## 12.3. O que implementar

Para cada calculadora:

1. H1 com intenção exata.
2. Formulário enxuto.
3. Resultado instantâneo.
4. Moeda/locale automático conforme idioma/região.
5. Fórmula visível.
6. Passo a passo expansível.
7. Tabela quando útil.
8. Gráfico leve apenas se acrescentar valor.
9. Exemplos prontos.
10. Erros comuns.
11. FAQ.
12. Calculadoras relacionadas.
13. Schema adequado.
14. Disclaimer quando for financeiro, tributário, trabalhista ou jurídico.

Priorizar calculadoras com alta intenção comercial:

```txt
Compound interest
Loan payment
Mortgage
Business margin
Markup
ROI
CAC
LTV
Break-even point
Employee cost
Salary net/gross
Marketplace fee
Credit card installment
Working capital
Simple interest
Currency/unit conversion
```

Upgrade futuro:

- salvar cenários;
- comparar cenários;
- exportar PDF/Excel;
- relatórios empresariais;
- templates;
- API;
- sem anúncios.

---

# 13. Site 3 — DevUtility Lab

**Nicho:** ferramentas para desenvolvedores.

## 13.1. Benchmarks obrigatórios

Acessar:

```txt
https://codebeautify.org/
https://jsonformatter.org/
https://jsonlint.com/
https://jsonviewer.stack.hu/
https://regex101.com/
https://regexr.com/
https://jwt.io/
https://gchq.github.io/CyberChef/
https://onlinetexttools.com/
```

## 13.2. O que foi encontrado nos líderes

- Suítes com muitas ferramentas pequenas.
- Páginas por ferramenta com SEO específico.
- Editores lado a lado.
- Botões copiar, limpar, baixar e exemplo.
- Processamento local quando possível.
- Erros de validação visíveis.
- Resultado em tabs: formatted, tree, raw, minified.
- Interface densa, mas produtiva.
- Público técnico tolera UI mais funcional e menos “marketing”.

## 13.3. O que implementar

Ferramentas prioritárias:

```txt
JSON formatter
JSON validator
JSON minifier
XML formatter
YAML formatter
CSV to JSON
JSON to CSV
Base64 encode/decode
URL encode/decode
JWT decoder
Hash generator
UUID generator
Regex tester
Diff checker
Cron expression builder
Unix timestamp converter
SQL formatter
HTML entity encode/decode
Lorem/mock data generator
```

Padrão de UI:

```txt
Top tool search
Left input editor
Right output editor
Toolbar: paste, sample, clear, copy, download
Validation panel
Privacy note: processed locally when true
Related tools
Technical guide
FAQ
```

Regras:

- Não enviar secrets para backend quando o processamento puder ser local.
- Avisar claramente quando algo é processado no servidor.
- Nunca logar conteúdo sensível de usuário sem consentimento explícito.
- Ter keyboard shortcuts.
- Ter modo dark/light.

Upgrade:

- workspaces;
- snippets salvos;
- histórico privado;
- processamento em lote;
- API;
- team vault;
- sem anúncios.

---

# 14. Site 4 — TimeNexus

**Nicho:** tempo, fuso horário, calendário, data, dias úteis e conversores.

## 14.1. Benchmarks obrigatórios

Acessar:

```txt
https://www.timeanddate.com/
https://time.is/
https://www.worldtimebuddy.com/
https://24timezones.com/
https://everytimezone.com/
https://www.unitconverters.net/
```

## 14.2. O que foi encontrado nos líderes

### timeanddate

- Hub global com altíssima autoridade.
- Conteúdo profundo por cidade, país, calendário, fases da lua, feriados e calculadoras.
- Muitas páginas indexáveis.
- Ferramentas simples + conteúdo informativo.

### time.is

- Resposta extremamente rápida e direta.
- Ideal para “que horas são”.
- Baixo atrito.

### World Time Buddy

- Excelente comparação visual de fusos.
- Foco em agendamento.
- Timeline horizontal muito clara.

## 14.3. O que implementar

Ferramentas prioritárias:

```txt
Current time by city
Time zone converter
Meeting planner
Date duration calculator
Business days calculator
Holiday calendar
Week number calculator
Unix timestamp converter
Countdown
Age calculator
Sunrise/sunset
Time difference
Unit converters
```

Padrão de UI:

- Resultado imediato no topo.
- Busca por cidade/timezone.
- Cards por cidades favoritas.
- Timeline visual para reuniões.
- Calendário leve.
- Conteúdo de apoio por país/cidade.
- URLs indexáveis por cidade e ferramenta.

Upgrade:

- agendas salvas;
- equipes globais;
- links de reunião;
- widgets embed;
- API de feriados;
- exportação ICS;
- sem anúncios.

---

# 15. Site 5 — QRRoute

**Nicho:** QR code, barcode, UTM, links e rastreamento.

## 15.1. Benchmarks obrigatórios

Acessar:

```txt
https://me-qr.com/
https://www.qr-code-generator.com/
https://www.qrcode-monkey.com/
https://tinyurl.com/
https://bitly.com/
https://shorturl.at/
https://qrfy.com/
https://www.short.io/
```

## 15.2. O que foi encontrado nos líderes

- QR estático gratuito para aquisição.
- QR dinâmico como upgrade pago.
- Analytics como monetização principal.
- Tipos de QR por caso de uso:
  - URL;
  - texto;
  - Wi-Fi;
  - WhatsApp;
  - e-mail;
  - vCard;
  - PDF;
  - app;
  - localização;
  - evento.
- Customização visual.
- Download rápido.
- Gestão de links e redirecionamentos.
- Domínio customizado pago.

## 15.3. O que implementar

Gratuito:

- QR estático sem cadastro.
- Download PNG/SVG.
- UTM builder.
- Link shortener básico com limites.
- Barcode generator básico.

Pago:

- QR dinâmico.
- Editar destino depois de criado.
- Analytics.
- Domínio personalizado.
- Campanhas.
- Bulk QR.
- Pastas/projetos.
- Equipes.
- API.
- White-label.
- Sem anúncios.

UI recomendada:

```txt
Tabs por tipo de QR
Preview em tempo real
Painel de customização
Botões de download claros
Alerta de QR estático vs dinâmico
Bloco educacional sobre quando usar cada tipo
Ferramentas relacionadas: UTM, short link, barcode
```

Regras de segurança:

- Implementar anti-spam.
- Verificar abuso/phishing em links curtos.
- Ter página de denúncia.
- Ter rate limits.
- Ter blacklist interna.

---

# 16. Site 6 — InvoiceCraft

**Nicho:** invoices, quotes, receipts e documentos comerciais simples.

## 16.1. Benchmarks obrigatórios

Acessar:

```txt
https://invoice-generator.com/
https://www.onlineinvoices.com/
https://freeinvoicebuilder.com/
https://www.billdu.com/
https://www.zoho.com/invoice/free-invoice-generator.html
https://www.waveapps.com/invoice-generator
```

## 16.2. O que foi encontrado nos líderes

### Invoice Generator

- Editor direto no navegador.
- Documento aparece como preview editável.
- Não exige cadastro para gerar uma invoice básica.
- Campos de item, quantidade, preço, imposto, desconto e total.
- Alto engajamento: usuário passa tempo preenchendo.
- Monetização natural por recorrência, clientes salvos e pagamentos.

### OnlineInvoices/Billdu/Wave/Zoho

- Mais orientados a gestão de negócio.
- Mais recursos pagos.
- Bons padrões de templates e fluxo comercial.

## 16.3. O que implementar

Gratuito:

- Gerador de invoice.
- Gerador de quote/orçamento.
- Gerador de receipt/recibo.
- Download PDF.
- Moeda e idioma por locale.
- Numeração manual.
- Campos customizáveis básicos.

Pago:

- clientes salvos;
- produtos/serviços salvos;
- recorrência;
- envio por e-mail;
- pagamentos online;
- assinatura/logo;
- templates premium;
- histórico;
- relatórios;
- multiempresa;
- impostos configuráveis;
- API.

UI recomendada:

```txt
Formulário lateral + preview do documento
Auto-save local
CTA: download gratuito
CTA secundário: salvar e acompanhar pagamentos
Templates por tipo de documento
FAQ fiscal genérico por país, sem aconselhamento jurídico específico
```

Regras:

- Não afirmar conformidade fiscal de um país sem validação jurídica.
- Incluir disclaimers.
- Localizar termos comerciais por idioma/região.

---

# 17. Site 7 — MailHealth

**Nicho:** entregabilidade, DNS de e-mail, SPF, DKIM, DMARC, MX, blacklist e reputação.

## 17.1. Benchmarks obrigatórios

Acessar:

```txt
https://mxtoolbox.com/
https://www.mail-tester.com/
https://easydmarc.com/tools
https://dmarcian.com/dmarc-inspector/
https://toolbox.googleapps.com/apps/dig/
https://www.mailgenius.com/
```

## 17.2. O que foi encontrado nos líderes

### MxToolbox

- Barra universal para várias consultas.
- Diagnóstico técnico com tabelas e status.
- Forte monetização por monitoramento.
- Ferramenta gratuita gera entrada para produto pago.

### Mail-Tester

- Experiência simples: enviar e-mail para endereço temporário e receber score.
- Score visual de entregabilidade.
- Explicações técnicas detalhadas.

### EasyDMARC/dmarcian

- Forte conteúdo educacional.
- Ferramentas gratuitas de entrada.
- SaaS de monitoramento DMARC.

## 17.3. O que implementar

Ferramentas gratuitas:

```txt
MX lookup
SPF checker
SPF generator
DKIM checker
DMARC checker
DMARC generator
Blacklist checker
SMTP checker
Email header analyzer
Disposable email detector
Email syntax validator
Mail score basic
```

Relatório combinado por domínio:

```txt
Overall health score
MX status
SPF status
DKIM status
DMARC status
Blacklist status
Warnings
Critical issues
Recommended fixes
Raw records
Copy/paste fixes
```

Gratuito precisa responder:

- “Meu domínio está configurado corretamente para enviar e-mail?”
- “O que está errado?”
- “Como corrigir?”

Pago:

- monitoramento;
- alertas;
- relatório DMARC;
- histórico;
- múltiplos domínios;
- relatórios para clientes;
- white-label para agências;
- API;
- suporte prioritário.

UI recomendada:

- Score simples no topo.
- Checklist visual.
- Tabela técnica abaixo.
- “Fix this” por problema.
- CTA de monitoramento após diagnóstico.

---

# 18. Site 8 — SitePulse Lab

**Nicho:** uptime, performance, status, headers, redirects, Core Web Vitals, SSL e tecnologias.

## 18.1. Benchmarks obrigatórios

Acessar:

```txt
https://downforeveryoneorjustme.com/
https://www.isitdownrightnow.com/
https://downdetector.com/
https://gtmetrix.com/
https://tools.pingdom.com/
https://pagespeed.web.dev/
https://www.ssllabs.com/ssltest/
https://builtwith.com/
https://securityheaders.com/
```

## 18.2. O que foi encontrado nos líderes

### DownForEveryoneOrJustMe / IsItDownRightNow

- Uma pergunta simples.
- Um input.
- Uma resposta imediata.
- Muito bom para tráfego de emergência.

### GTmetrix / PageSpeed Insights

- Relatórios técnicos detalhados.
- Grades/scores.
- Recomendações acionáveis.
- Comparação histórica como recurso pago.

### BuiltWith

- Ferramenta grátis revela stack.
- Monetização real está em dados B2B e leads.

### SSL Labs / SecurityHeaders

- Relatórios técnicos profundos.
- Score/grade fácil de entender.
- Detalhes técnicos para usuários avançados.

## 18.3. O que implementar

Ferramentas gratuitas:

```txt
Is site down?
HTTP status checker
Redirect chain checker
Headers checker
Security headers checker
SSL checker
TTFB checker
Basic performance test
Robots.txt checker
Sitemap checker
Technology detector
Port checker
```

Fluxo principal:

```txt
URL input
Immediate status
Simple result: online/offline/slow/error
Technical details tabs
Recommendations
Related tools
Monitor this site CTA
```

Pago:

- uptime monitoring;
- alertas;
- status page;
- histórico;
- múltiplas regiões;
- frequência maior;
- relatórios;
- equipe;
- API.

Regras:

- Se usar PageSpeed API, respeitar limites.
- Não fazer testes pesados por padrão em toda visita.
- Cachear resultados públicos quando fizer sentido.
- Proteger contra abuso de scan.

---

# 19. Site 9 — PixelBatch

**Nicho:** processamento de imagens, compressão, redimensionamento, conversão, fundo e batch.

## 19.1. Benchmarks obrigatórios

Acessar:

```txt
https://www.remove.bg/
https://www.iloveimg.com/
https://tinypng.com/
https://squoosh.app/
https://www.photopea.com/
https://www.resizepixel.com/
https://www.compress2go.com/
https://www.erase.bg/
```

## 19.2. O que foi encontrado nos líderes

### remove.bg

- Upload grande e direto.
- Resultado visual antes/depois.
- Free preview.
- Alta resolução por crédito/API.
- Foco extremo em uma tarefa principal.

### iLoveIMG

- Grid de ferramentas.
- Ferramentas relacionadas fortes.
- UX parecida com iLovePDF.

### TinyPNG

- Interface memorável e simples.
- Drag and drop.
- Compressão em lote.
- API paga.

### Squoosh

- Processamento local no navegador.
- Comparação antes/depois.
- Controles avançados.

## 19.3. O que implementar

Ferramentas gratuitas:

```txt
Compress image
Resize image
Convert image
Crop image
WebP converter
AVIF converter
Remove EXIF
Batch rename basic
Background remover preview, if infrastructure allows
```

Foco específico para e-commerce:

```txt
Marketplace image presets
White background
Square crop
SKU rename
Compress catalog
Export ZIP
```

Pago:

- lote grande;
- alta resolução;
- remoção de fundo completa;
- presets salvos;
- API;
- integração Shopify/WooCommerce;
- webhooks;
- sem anúncios.

UI recomendada:

- Dropzone dominante.
- Preview antes/depois.
- Fila de arquivos.
- Tabela com tamanho original/final/economia.
- Download individual e download ZIP.
- Nota clara de privacidade e retenção.

Performance:

- Processar no navegador quando possível.
- Não subir arquivo para backend sem necessidade.
- Usar Web Workers/WASM quando viável.
- Cuidar de memória em mobile.

---

# 20. Site 10 — DocShift

**Nicho:** PDF, documentos, conversão, OCR e extração.

## 20.1. Benchmarks obrigatórios

Acessar:

```txt
https://www.ilovepdf.com/
https://smallpdf.com/
https://www.sejda.com/
https://tools.pdf24.org/
https://online2pdf.com/
https://www.freepdfconvert.com/
https://www.pdfescape.com/
https://www.adobe.com/acrobat/online.html
```

## 20.2. O que foi encontrado nos líderes

### iLovePDF

- Home com grid de ferramentas.
- Tool pages muito diretas.
- Drag and drop acima da dobra.
- Cross-sell entre ferramentas.
- Premium/Business/API.
- Alto volume e alto engajamento.

### Smallpdf

- Visual premium.
- Forte UX.
- Limites gratuitos.
- Conta/assinatura para uso intenso.

### Sejda/PDF24/Online2PDF

- Grande variedade de ferramentas.
- Boa cauda longa.
- Alguns têm aparência mais utilitária, mas entregam valor.

## 20.3. O que implementar

Ferramentas gratuitas iniciais:

```txt
Merge PDF
Split PDF
Compress PDF
PDF to Word basic
PDF to JPG
JPG to PDF
Rotate PDF
Extract pages
Protect PDF
Unlock PDF, only when legal/technically appropriate
Add page numbers
Watermark
```

Evolução com maior valor:

```txt
OCR
Extract tables
PDF to Excel
Invoice/receipt extraction
Contract summary
Document to structured JSON
Batch processing
API
```

Pago:

- arquivos maiores;
- lote;
- OCR;
- armazenamento;
- histórico;
- API;
- sem anúncios;
- equipes;
- integrações.

UI recomendada:

```txt
Home grid de ferramentas
Tool page com dropzone dominante
Explicação curta acima
Resultado claro
Related tools
Conteúdo educativo abaixo
FAQ
Ad slots reservados
Upgrade após uso gratuito
```

Regras:

- Política clara de retenção/exclusão de arquivos.
- Não reter arquivos desnecessariamente.
- Isolar processamento.
- Limitar tamanho para proteger infraestrutura.
- Avisar quando arquivo contém dados sensíveis.

---

# 21. Backlog prioritário de refinamento

## P0 — Fazer agora

1. NetProbe Atlas:
   - Página DNS propagation inspirada no padrão whatsmydns, com UI própria e premium.
   - Lista global + mapa lazy-loaded.
   - Valor esperado.
   - Status consolidado.
   - Conteúdo educacional original.
   - Rodapé rico de ferramentas DNS/IP.
   - Doação.
   - Ad slots reservados.
2. NetProbe Atlas:
   - Página “What is my IP” com duas versões de UX combinadas:
     - simplicidade de whatismyip.com.br;
     - organização, mapa, cards e monetização de whatismyipaddress.com.
3. Supersite:
   - Registrar benchmarking no dashboard.
   - Criar páginas de catálogo por site.
   - Criar KPI cards mínimos.
4. Todos os sites:
   - Garantir URLs por idioma.
   - Garantir `hreflang`.
   - Garantir `canonical` correto.
   - Garantir sitemap por idioma.
   - Garantir schema básico.
   - Garantir política de privacidade, termos, contato e consentimento.
5. Todos os sites:
   - Inserir módulo de doação discreto.
   - Inserir placeholders de AdSense com dimensões fixas.
   - Não ativar anúncios em páginas incompletas ou de conteúdo fino.

## P1 — Próxima etapa

1. Criar `BENCHMARK_NOTES.md` por site.
2. Criar matriz comparativa visual por site.
3. Criar componente padrão de tool page:
   - `ToolHero`
   - `ToolInputCard`
   - `ToolResultSummary`
   - `ToolTechnicalDetails`
   - `ToolRelatedGrid`
   - `ToolKnowledgeBase`
   - `ToolFaq`
   - `DonationBlock`
   - `AdSlot`
4. Criar footer mega-menu por site.
5. Criar busca de ferramentas dentro de cada site.
6. Criar estrutura de conteúdo educacional abaixo de cada ferramenta.

## P2 — Monetização evolutiva

1. Ativar upgrades pagos nos sites com melhor fit:
   - NetProbe Atlas.
   - MailHealth.
   - SitePulse Lab.
   - QRRoute.
   - InvoiceCraft.
   - PixelBatch.
   - DocShift.
2. Implementar planos, clientes, pagamentos, limites e histórico.
3. Criar relatórios comerciais por site.
4. Criar API paga quando a ferramenta demonstrar demanda.

---

# 22. Matriz de refinamento por site

| Site | Carro-chefe grátis | Benchmark principal | Refinamento frontend prioritário | Upgrade mais natural |
|---|---|---|---|---|
| NetProbe Atlas | DNS propagation / IP lookup | whatsmydns + whatismyipaddress | Resultado por camadas, mapa/lista, footer rico | Monitoramento, API, alertas |
| CalcHarbor | Calculadoras financeiras | Calculator.net + Omni | Resultado imediato + fórmula + passo a passo | Cenários salvos, exportação, sem ads |
| DevUtility Lab | JSON/Regex/JWT tools | CodeBeautify + Regex101 | Editor split, processamento local, copiar/baixar | Workspaces, API, histórico |
| TimeNexus | Timezone converter | timeanddate + WorldTimeBuddy | Timeline visual, páginas por cidade | Meeting tools, API, widgets |
| QRRoute | QR estático/UTM/link | QR Code Generator + ME-QR | Preview em tempo real, tabs por tipo | QR dinâmico, analytics, domínio |
| InvoiceCraft | Invoice PDF | Invoice Generator | Editor + preview, autosave | Clientes, recorrência, pagamentos |
| MailHealth | SPF/DMARC/MX check | MxToolbox + Mail-Tester | Score + checklist + correções | Monitoramento, relatórios, API |
| SitePulse Lab | Is site down / headers | GTmetrix + DownForEveryone | Status simples + relatório técnico | Uptime, status page, alertas |
| PixelBatch | Compress/resize image | remove.bg + TinyPNG | Dropzone, fila, antes/depois | Batch, alta resolução, API |
| DocShift | PDF merge/compress | iLovePDF + Smallpdf | Grid + dropzone dominante | OCR, batch, arquivos grandes |

---

# 23. Checklist de aceite por página de ferramenta

Uma página só está pronta para publicação e AdSense quando cumprir:

```txt
[ ] A ferramenta gratuita entrega o resultado básico sem cadastro.
[ ] Existe H1 único e claro.
[ ] Existe title e meta description localizados.
[ ] Existe URL localizada e limpa.
[ ] Existe canonical correto.
[ ] Existe hreflang para versões existentes.
[ ] Existe schema aplicável.
[ ] Existe conteúdo original abaixo da ferramenta.
[ ] Existe FAQ original.
[ ] Existe seção de ferramentas relacionadas.
[ ] Existe estado de erro útil.
[ ] Existe estado de loading.
[ ] Existe botão copiar/exportar quando útil.
[ ] Existe ad slot reservado sem causar CLS.
[ ] Existe política de privacidade acessível.
[ ] Existe contato acessível.
[ ] Existe bloco de doação discreto.
[ ] Não há texto copiado de benchmark.
[ ] Não há imagem ou ícone proprietário copiado.
[ ] Mobile funciona perfeitamente.
[ ] Teclado e leitores de tela conseguem usar o fluxo principal.
[ ] PageSpeed mobile >= 90 ou existe issue justificada.
[ ] LCP < 2,5s, INP < 200ms, CLS < 0,1 ou existe issue justificada.
[ ] Logs não armazenam dados sensíveis indevidamente.
[ ] A página aparece no sitemap correto.
[ ] A página está conectada ao dashboard do Supersite.
```

---

# 24. Prompts operacionais para agentes

## 24.1. Prompt para benchmark de um site

```txt
Você é o agente Codex responsável pelo benchmark do site <SITE_NAME> no projeto supersites-platform.

Leia:
- supersites/AGENTS.md
- supersites/docs/MEGA_PROMPT_SUPERSITES.md
- supersites/docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md

Tarefa:
1. Acesse todos os benchmarks listados para <SITE_NAME>.
2. Capture screenshots desktop e mobile.
3. Execute pelo menos uma consulta real em cada benchmark quando possível.
4. Documente em docs/SITES/<site>/BENCHMARK_NOTES.md:
   - URL analisada;
   - o que entrega;
   - como entrega;
   - layout acima da dobra;
   - padrão de resultado;
   - conteúdo educacional;
   - links internos;
   - monetização;
   - pontos fortes;
   - pontos fracos;
   - oportunidades para nosso site.
5. Não copie texto, layout, código ou assets.
6. Crie um plano objetivo em docs/SITES/<site>/FRONTEND_REFINEMENT_PLAN.md.
7. Implemente melhorias seguras em branch benchmark/frontend-refinement-<site-slug>.
8. Rode testes, lint e Lighthouse.
9. Atualize o dashboard Supersite com as recomendações e status.
```

## 24.2. Prompt para refinar NetProbe Atlas primeiro

```txt
Você é o agente Codex responsável por refinar o NetProbe Atlas.

Contexto:
O NetProbe Atlas é o primeiro site do portfólio e o benchmark prioritário é whatsmydns.net para DNS propagation, combinado com whatismyipaddress.com e whatismyip.com.br para IP lookup.

Tarefa P0:
1. Criar/refinar a página de DNS propagation.
2. Implementar input com domínio, tipo de registro e valor esperado opcional.
3. Implementar resultado com resumo, lista por local, status, valor retornado e tempo de resposta.
4. Implementar mapa mundial lazy-loaded, sem prejudicar performance.
5. Implementar conteúdo original explicando DNS propagation, TTL, cache, tipos de registro e troubleshooting.
6. Implementar footer rico com ferramentas DNS/IP relacionadas.
7. Implementar bloco de doação discreto.
8. Implementar ad slots reservados sem causar CLS.
9. Implementar CTA pago para monitorar o registro.
10. Criar/refinar página What is my IP com IPv4, IPv6, ISP, ASN, reverse DNS, país, cidade, mapa e ferramentas relacionadas.
11. Garantir multilíngue com URLs próprias, hreflang e sitemap.
12. Rodar PageSpeed/Lighthouse e corrigir regressões.
13. Documentar antes/depois em docs/SITES/netprobe-atlas/.
14. Registrar insights no dashboard administrativo do Supersite.

Não copiar layout, texto, ícones ou identidade dos benchmarks.
O resultado precisa ser premium, rápido, limpo e mais organizado que os benchmarks.
```

## 24.3. Prompt para auditoria de AdSense e UX

```txt
Você é o agente Codex responsável por auditar AdSense, UX e políticas de monetização do projeto supersites-platform.

Tarefa:
1. Verifique todas as páginas públicas dos 10 sites.
2. Identifique páginas com conteúdo fino, ferramenta incompleta, tradução ruim ou baixa utilidade.
3. Marque essas páginas como NÃO prontas para AdSense no dashboard.
4. Valide que anúncios não estão próximos de botões, inputs ou resultados clicáveis.
5. Valide que todos os ad slots têm espaço reservado para evitar CLS.
6. Valide CMP para EEA/UK/Suíça antes de tráfego monetizado nessas regiões.
7. Valide que idiomas não suportados pelo AdSense não recebem ad code.
8. Verifique páginas de privacidade, termos, contato e consentimento.
9. Gere relatório executivo com riscos e correções.
10. Implemente correções simples por PR.
```

## 24.4. Prompt para auditoria SEO/AIO/GEO

```txt
Você é o agente Codex responsável por SEO, AIO/GEO e crescimento orgânico do projeto supersites-platform.

Tarefa:
1. Para cada site e idioma, audite title, meta description, H1, headings, schema, canonical, hreflang, sitemap e robots.
2. Compare a estrutura de conteúdo com os benchmarks listados.
3. Identifique páginas que precisam de guia, FAQ, exemplos, glossário ou ferramentas relacionadas.
4. Gere oportunidades de conteúdo por cluster e por intenção de busca.
5. Crie relatório executivo para o dashboard do Supersite.
6. Implemente automaticamente melhorias de baixo risco:
   - meta tags faltantes;
   - FAQ schema quando já houver FAQ real;
   - links internos;
   - headings quebrados;
   - alt text;
   - sitemap;
   - hreflang inconsistente.
7. Não gerar conteúdo em massa sem revisão quando o tema for financeiro, jurídico, fiscal, privacidade, segurança ou saúde.
8. Medir impacto antes/depois.
```

---

# 25. Decisão estratégica final

O padrão vencedor para nossos sites é:

```txt
Ferramenta grátis real
+ resposta imediata
+ visual premium
+ conteúdo educativo original
+ SEO/AIO multilíngue
+ AdSense bem posicionado
+ doação discreta
+ cross-linking entre ferramentas
+ upgrade pago operacional
+ dashboard central de inteligência
```

A prioridade não é fazer sites bonitos por vaidade. A prioridade é criar ativos de tráfego e receita.

Benchmark não é briefing visual. Benchmark é prova de mercado.

O agente deve usar os benchmarks para elevar a execução, mas a entrega final precisa ser própria, melhor organizada, mais rápida, mais confiável e mais preparada para escala.
