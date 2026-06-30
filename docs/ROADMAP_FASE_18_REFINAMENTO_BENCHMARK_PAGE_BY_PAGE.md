# PROMPT OPERACIONAL — FASE 18: REFINAMENTO BENCHMARK-GRADE PÁGINA POR PÁGINA

**Projeto:** `D:\Projetos\supersites`
**Fase anterior concluída/mapeada:** Fase 17
**Próxima fase obrigatória:** Fase 18
**Objetivo:** transformar os sites de MVP público em páginas mais próximas dos benchmarks líderes, sem copiar marca, layout 1:1, texto, código, imagens ou identidade visual.

Use este documento como prompt complementar para o Codex. Execute uma sprint por vez, corrigindo uma página ou template de página por vez, com commit, push, CI, dry-run, deploy HostGator monitorado, smoke público e registro documental ao fim de cada sprint.

Quando uma sprint do Hub/catalogo criar ou destacar links profundos para ferramentas de um app estático, validar esses links na produção real antes de fechar. Se o app em produção estiver stale, com 404 ou 500, publicar também o app estático no mesmo ciclo e repetir smoke público agregado e crawler benchmark antes de seguir para a próxima sprint.

---

## 1. Contexto para o Codex

Você é Codex no projeto `D:\Projetos\supersites`.

O desenvolvimento está avançado, mas a superfície pública ainda parece muito “produto em desenvolvimento”. O objetivo agora é fazer os sites parecerem produtos finais, úteis e premium, alinhados com padrões já validados por sites concorrentes de alto tráfego.

Os 10 sites precisam continuar multilíngues, SEO-first, AIO/GEO-ready, rápidos, responsivos, AdSense-safe e com o gratuito resolvendo a necessidade básica sem cadastro.

**Última fase informada pelo owner:** Fase 17.
**Continue com a Fase 18. Não renumerar fases anteriores. Não pular sprints pendentes já mapeadas se existirem. Se houver divergência no roadmap local, preservar o histórico e anexar esta fase como a próxima etapa sequencial após a Fase 17.**

---

## 2. Arquivos que devem ser lidos antes de executar

Antes de qualquer alteração:

1. Leia integralmente `AGENTS.md`.
2. Leia integralmente:
   - `docs/MEGA_PROMPT_SUPERSITES.md`
   - `docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`
   - todos os arquivos e prints em `docs/benchmarks`
   - `docs/OPERATING_CONTEXT.md`
   - `docs/STATUS.md`
   - `docs/ROADMAP.md`
   - `docs/ARCHITECTURE.md`
   - `docs/SECURITY.md`
   - `docs/DATA_GOVERNANCE.md`
   - `docs/SEO_AIO_PLAYBOOK.md`
   - `docs/ADSENSE_PLAYBOOK.md`
   - `docs/ANALYTICS.md`
   - `docs/BILLING.md`
   - `docs/METRICS.md`
   - `docs/HUMAN_ACTION_REQUIRED.md`
   - `docs/RUNBOOKS/SPRINT_EXECUTION.md`
   - `docs/RUNBOOKS/CI_CD.md`
   - `docs/RUNBOOKS/LOCAL_DEVELOPMENT.md`
   - todos os ADRs em `docs/ADR`
3. Se existirem, leia também:
   - `docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK.md`
   - `docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK_V2.md`
   - `docs/PROMPT_COMPLEMENTAR_BENCHMARK_EVOLUCAO_CONTINUACAO.md`
4. Verifique estado real de git, branch, código, ambientes, CI recente, deploy e superfície pública.
5. Nunca exponha ou versiona segredos.
6. Execute com autonomia tudo que for técnico, reversível e coberto por testes.
7. Para KYC, impostos, banco, aceite jurídico, compra, ativação real de AdSense, ativação real de checkout, doação real, afiliado real, webhook externo real ou qualquer ação irreversível, registre `HUMAN_ACTION_REQUIRED` e continue o restante.

---

## 3. Benchmarks obrigatórios a estudar durante a Fase 18

Acesse, tire prints desktop/mobile quando possível, navegue e entenda os padrões dos benchmarks. Não copie. Extraia o raciocínio de produto.

### NetProbe Atlas

- `https://www.whatsmydns.net/`
- `https://whatismyipaddress.com/pt/meu-ip`
- `https://whatismyip.com.br/`
- `https://dnschecker.org/`
- `https://mxtoolbox.com/`
- `https://www.ssllabs.com/ssltest/`
- `https://intodns.com/`
- `https://www.redirect-checker.org/`

### CalcHarbor

- `https://www.calculator.net/`
- `https://www.omnicalculator.com/`
- `https://www.calculatorsoup.com/`

### DevUtility Lab

- `https://codebeautify.org/`
- `https://regex101.com/`
- `https://jwt.io/`
- `https://crontab.guru/`

### TimeNexus

- `https://www.timeanddate.com/`
- `https://www.worldtimebuddy.com/`
- `https://time.is/`
- `https://24timezones.com/`

### QRRoute

- `https://www.qr-code-generator.com/`
- `https://me-qr.com/`
- `https://tinyurl.com/`
- `https://bitly.com/`

### InvoiceCraft

- `https://invoice-generator.com/`
- `https://www.invoicesimple.com/invoice-generator`
- `https://waveapps.com/invoice-generator`

### MailHealth

- `https://mxtoolbox.com/`
- `https://www.mail-tester.com/`
- `https://easydmarc.com/tools`
- `https://dmarcian.com/domain-checker/`

### SitePulse Lab

- `https://downforeveryoneorjustme.com/`
- `https://gtmetrix.com/`
- `https://pagespeed.web.dev/`
- `https://securityheaders.com/`
- `https://builtwith.com/`

### PixelBatch

- `https://tinypng.com/`
- `https://www.iloveimg.com/`
- `https://www.remove.bg/`
- `https://squoosh.app/`

### DocShift

- `https://www.ilovepdf.com/`
- `https://smallpdf.com/`
- `https://www.sejda.com/`
- `https://online2pdf.com/`

---

## 4. Diagnóstico atual resumido

A superfície pública está funcional como MVP, mas ainda não está benchmark-grade.

Problemas recorrentes encontrados:

1. Conteúdo de desenvolvimento aparece para usuário final.
2. Muitos textos informam estado interno: `ads planned`, `billing disabled`, `external analytics inactive`, `release checks`, `rollback`, `production recovery`, `sprint`, `planned`, `quality checks`, `worker planned`, `public API live`.
3. Algumas páginas têm blocos de metodologia, privacidade e limites altos demais na página ou lateralmente, ocupando espaço que deveria ser da ferramenta e do resultado.
4. Páginas de ferramentas deveriam entregar a resposta acima da dobra.
5. “What is my IP” não deve exigir botão: deve mostrar IP automaticamente ao carregar.
6. DNS Propagation precisa se aproximar de `whatsmydns.net`: input, tipos de registro, expected value, lista de servidores com cidade/país/bandeira/status e mapa global.
7. Localização PT-BR/ES/FR/DE está incompleta. Há inglês residual e traduções sem acento ou com estrutura artificial.
8. Rodapés estão fracos. Benchmarks líderes usam rodapé como cluster SEO e navegação profunda.
9. Doação ainda não aparece como bloco de suporte público controlado.
10. Espaços AdSense ainda precisam ser preparados de forma segura, sem ativar anúncio real.
11. Tool pages ainda parecem documentação técnica; precisam parecer produtos de uso imediato.

---

## 5. Regra principal de UX para todas as páginas

Toda página de ferramenta deve seguir esta hierarquia:

```txt
1. H1 claro e direto.
2. Uma frase curta explicando a utilidade.
3. Ferramenta funcional acima da dobra.
4. Resultado principal visível imediatamente após a ferramenta.
5. Botões práticos: copiar, baixar, limpar, compartilhar, testar novamente.
6. Explicação simples do resultado.
7. Detalhes técnicos em abas, accordions ou cards abaixo.
8. Próximas ações e ferramentas relacionadas.
9. Bloco de upgrade discreto.
10. Slot AdSense reservado, sem anúncio real até gate.
11. Guia/FAQ/base de conhecimento.
12. Bloco de doação/suporte.
13. Rodapé SEO rico.
```

A parte superior da página não deve ser usada para metodologia, status interno, roadmap, release notes, qualidade de deploy, billing desativado ou aviso longo de desenvolvimento.

---

## 6. Conteúdo que deve sair da área pública principal

Remover ou mover para docs/admin/status técnico, nunca como destaque de usuário final:

```txt
Public API live
Production IP and DNS checks are live
release check
release recovery check
launch checks
rollback
billing disabled
ads are not active yet
external analytics inactive
worker planned
commercial features planned
monitoring planned
server workflow planned
no upload backend active
no accounts or storage
free free version
client-side free version
sprint
quality check
Temporary public URL
Launch order
Human legal review remains required before final public launch
```

Substituições públicas aceitáveis:

| Texto interno atual | Substituir por |
|---|---|
| `Ads and paid upgrades remain planned` | Não exibir na área principal. Colocar upgrade discreto: “Need monitoring, history or API? Join the waitlist.” |
| `Commercial features planned` | “Advanced workflow” abaixo do resultado, sem tom de roadmap técnico. |
| `No upload backend active` | “Your file stays in this browser.” |
| `Client-side free version` | “Free browser tool.” |
| `Public API live` | Não exibir. O usuário não precisa saber. |
| `Human legal review remains required` | Remover do público. Registrar em `HUMAN_ACTION_REQUIRED.md`. |
| `Temporary public URL` | Remover. Isso é interno. |
| `Launch order #` | Remover das páginas públicas. |
| `free free version` | Corrigir para “free version” ou tradução natural. |

---

## 7. Metodologia, privacidade e limites

Não remover conteúdo útil. Reposicionar.

### Nova regra

- Topo: ferramenta e resultado.
- Meio: interpretação, próximos passos e ferramentas relacionadas.
- Baixo: metodologia, limites, privacidade e FAQ.
- Lateral direita: só usar se for realmente útil, como resumo do resultado, não como metodologia fixa.
- Mobile: ferramenta, resultado, interpretação, depois detalhes.

### Componentes recomendados

- `HowThisWorksAccordion`
- `MethodologyDisclosure`
- `PrivacyBoundaryNote`
- `LimitsAndSafetyNote`
- `TechnicalDetailsTabs`
- `RelatedToolsGrid`
- `DonationBlock`
- `ReservedAdSlot`
- `VerticalSeoFooter`

---

## 8. Regras de internacionalização

Cada sprint de página deve aplicar a alteração em todas as rotas equivalentes:

```txt
/en/...
/pt-br/...
/es/...
/fr/...
/de/...
```

Tarefas obrigatórias por sprint:

1. Corrigir inglês residual.
2. Corrigir acentos em PT-BR: `obrigatório`, `páginas`, `inglês`, `português`, `operação`, `cópia`, `saída`, `segurança`, `estático`, `dinâmico`, `domínio`, `histórico`, `integrações`, `validação`, `retenção`, `exclusão` etc.
3. Evitar traduções híbridas como `Workflow gratuito`, `Preview`, `Storage`, `Batch folders`, `Short links`, `Billing`, salvo quando o termo técnico for intencional e comum.
4. Validar `hreflang`, `canonical`, sitemap e títulos/descriptions por idioma.
5. Se uma tradução não estiver boa, marcar `noindex` temporário e registrar tarefa, mas não deixar página ruim indexável.

---

## 9. Padrão de validação por sprint

Para cada sprint:

1. Ler docs obrigatórios.
2. Acessar a página atual local e, se possível, produção.
3. Acessar os benchmarks correspondentes.
4. Tirar screenshots desktop/mobile antes e depois.
5. Implementar a página alvo, sem alterar escopo fora da sprint salvo componentes compartilhados necessários.
6. Rodar:
   - testes unitários relevantes;
   - testes de frontend;
   - Playwright/smoke da rota alterada;
   - crawler de links da página;
   - validação de idioma;
   - validação de metadata/canonical/hreflang;
   - `validate:structure`;
   - `validate:secrets`;
   - `deploy:dry-run`;
   - `ci:changes`;
   - `git diff --check`.
7. Atualizar documentação:
   - `docs/STATUS.md`
   - `docs/ROADMAP.md`
   - `docs/METRICS.md`
   - `docs/SITES/<site>/FRONTEND_REFINEMENT_PLAN.md`
   - `docs/SITES/<site>/BENCHMARK_NOTES.md`
   - `docs/HUMAN_ACTION_REQUIRED.md`, se houver bloqueio humano.
8. Commitar a sprint.
9. Pushar.
10. Monitorar Quality Gate e Deploy Dry Run.
11. Registrar IDs dos runs e smoke results em `docs/STATUS.md`.
12. Fazer commit documental de fechamento quando necessário.
13. Só então seguir para a próxima sprint.

### 9.1. Gate adicional criado após correção do Hub

Depois da auditoria visual da Sprint 18.2, fica obrigatório consultar `docs/PHASE18_BENCHMARK_GRADE_ACCEPTANCE.md` antes de marcar qualquer página pública como benchmark-grade.

Motivo: uma página pode passar em links, footer, i18n e testes técnicos e ainda assim falhar como produto público se a primeira dobra continuar parecendo catálogo operacional, status de rollout ou documentação de desenvolvimento.

Regra operacional:

1. Screenshot desktop/mobile precisa mostrar uma intenção prática resolvida acima da dobra.
2. A página não pode depender de badges de status, monetização, rollout, qualidade ou readiness para explicar valor ao usuário.
3. O benchmark da sprint deve ser traduzido em comportamento de produto próprio, não apenas em novas seções adicionadas.
4. O smoke/Playwright da rota alterada deve conter pelo menos uma asserção contra regressão de linguagem interna quando a página já tiver histórico de falha desse tipo.

---

# 10. FASE 18 — ROADMAP DE REFINAMENTO PÁGINA POR PÁGINA

## Sprint 18.0 — Inventário real de rotas e baseline visual

**Objetivo:** mapear 100% das páginas reais antes de refinar.

**Codex deve:**

1. Rodar crawler local/produção a partir de `https://opentshost.com/supersites/`.
2. Listar todas as URLs internas por site, idioma, tool page, legal page e catálogo.
3. Comparar com sitemap e rotas do código.
4. Salvar em `docs/ROUTE_INVENTORY_PHASE_18.md`.
5. Capturar screenshots desktop/mobile das páginas principais e das tool pages.
6. Registrar páginas com:
   - inglês residual;
   - texto interno/de desenvolvimento;
   - metodologia acima da dobra;
   - tool sem resultado imediato;
   - ausência de CTA prático;
   - ausência de footer rico;
   - problemas de responsividade;
   - links quebrados;
   - console errors.

**Aceite:** inventário completo, screenshots, matriz de problemas e lista final de sprints confirmada.

---

## Sprint 18.1 — Componentes globais de refinamento

**Objetivo:** criar base visual e estrutural para que as próximas páginas sejam rápidas de ajustar.

**Codex deve criar/refinar:**

1. `ToolFirstHero`: H1, descrição curta e formulário/ferramenta acima da dobra.
2. `InstantResultPanel`: resultado principal com status visual, copy button, refresh, download/export quando aplicável.
3. `TechnicalDetailsTabs`: abas `Summary`, `Details`, `Raw`, `Fix`, `History/Upgrade` quando aplicável.
4. `MethodologyDisclosure`: accordion abaixo do resultado, nunca lateral dominante.
5. `RelatedToolsGrid`: grid de ferramentas relacionadas por intenção.
6. `VerticalSeoFooter`: rodapé rico por site, baseado no cluster do nicho.
7. `DonationBlock`: bloco discreto, pós-valor entregue.
8. `ReservedAdSlot`: espaço reservado com dimensões fixas e sem request real até gate.
9. `BenchmarkShell`: variações de layout para `tool page`, `hub page`, `document editor`, `map/list`, `developer split editor`, `image before/after`, `calculator`.
10. `InternalStatusStrip`: componente restrito a admin/status técnico. Não usar em páginas públicas principais.

**Aceite:** componentes prontos, sem ativar AdSense real, sem billing real, sem doação real, com snapshots visuais e testes.

---

# 11. Supersite Hub e páginas institucionais

## Sprint 18.2 — Página `/supersites/` — Hub principal

**Problema atual:** parece catálogo técnico do projeto, com termos como `launch order`, `ads prepared`, `upgrade paths` e foco em estado interno.

**Codex deve:**

1. Transformar em portal público premium de ferramentas úteis.
2. Trocar narrativa de “rede operacional em lançamento” para “free online tools for everyday technical, business and document workflows”.
3. Manter cards dos 10 sites, mas com foco em uso, não roadmap.
4. Criar seção `Popular free tools` com CTAs diretos para:
   - What is my IP;
   - DNS Propagation;
   - Loan Payment;
   - JSON Formatter;
   - Time Zone Converter;
   - Static QR;
   - Invoice Builder;
   - SPF Checker;
   - Website Status;
   - Image Compressor;
   - PDF Merge.
5. Remover `launch order`, `ads prepared`, `planned`, `quality checks` do público.
6. Criar footer com clusters: Diagnostics, Calculators, Developer Tools, Time, QR/Links, Documents, Email, Website, Images, Legal.
7. Adicionar bloco de doação genérico no fim.
8. Adicionar slots de anúncio reservados abaixo de valor útil, sem request real.
9. Aplicar em todos os idiomas.

**Benchmarks:** home do Calculator.net, timeanddate, CodeBeautify e iLovePDF.

---

## Sprint 18.3 — Página de catálogo NetProbe Atlas

**Rota canônica:** `/supersites/en/sites/netprobe-atlas`

**Codex deve:**

1. Remover `Temporary public URL`, `Launch order`, `Quality check` e textos de deploy.
2. Transformar em landing pública de rede/DNS/IP.
3. Colocar cards diretos para `What is my IP`, `DNS Propagation`, `DNS Lookup`, `RDAP`, `SSL`, `Port Checker`, `Ping/Traceroute`.
4. Explicar em 3 níveis: leigo, técnico, monitoramento futuro.
5. Footer com DNS Tools, IP Tools, Domain Tools, SSL Tools, Guides.

---

## Sprint 18.4 — Página de catálogo CalcHarbor

**Codex deve:**

1. Remover `Temporary public URL`, `Launch order`, `Quality check`.
2. Criar landing de calculadoras com busca, categorias e cards.
3. Inspirar-se no volume visual do Calculator.net: categorias densas, mas com UI premium.
4. Destacar loan, break-even, margin e ROI.
5. Preparar área para futuras calculadoras sem publicar thin pages.

---

## Sprint 18.5 — Página de catálogo DevUtility Lab

**Codex deve:**

1. Remover linguagem de roadmap.
2. Criar landing tipo workbench dev.
3. Destacar `JSON Formatter`, `Base64`, `JWT`, `Regex`, `Diff`, `Cron`, `UUID`, `Timestamp`, `Hash`.
4. Inspirar-se no CodeBeautify: navegação densa, favoritos/recentes locais e busca.
5. Reforçar privacidade de forma curta, não como bloco dominante.

---

## Sprint 18.6 — Página de catálogo TimeNexus

**Codex deve:**

1. Criar landing focada em tempo atual, fusos, meeting planner e datas.
2. Inspirar-se em timeanddate: navegação por World Clock, Time Zones, Calendar, Calculators.
3. Mostrar relógio atual automaticamente.
4. Remover linguagem interna.

**Status:** concluída em produção em 2026-06-30. A rota de catálogo TimeNexus virou landing pública task-first com relógio atual automático, atalhos para world clock, fusos, datas e calculadoras, busca/filtros, links profundos reais e rodapé contextual. Commits `0e29572` e `485fb27`; Hub deploy final `28430723674`; TimeNexus static app deploy `28429491292`; smoke público, AdSense-safe, 32 deep links EN/PT-BR, crawler quick e visual live desktop/mobile passaram.

**Regra aprendida:** páginas de catálogo com links profundos não podem ser fechadas apenas pelo deploy do Hub. Validar as rotas reais do app em produção e publicar o app estático no mesmo ciclo se a release pública estiver stale, 404 ou 500.

---

## Sprint 18.7 — Página de catálogo QRRoute

**Codex deve:**

1. Criar landing com QR preview visual imediatamente.
2. Destacar QR estático, Wi-Fi, vCard, UTM e barcode.
3. Remover `commercial redirects planned` e similares.
4. Explicar QR estático vs dinâmico abaixo, como upsell discreto.

**Status:** concluída em produção em 2026-06-30. A rota de catálogo QRRoute virou landing pública task-first com prévia estática visível acima da dobra, CTAs para gerador QR, navegação por tipo de ativo, busca/filtros, cards para QR estático, barcode, UTM, vCard, Wi-Fi e preview lab, nota estático/dinâmico abaixo do valor e rodapé contextual com deep links reais. Commit `ffe1ecf`; Quality Gate `28432484601`; Deploy Dry Run `28432484446`; Hub deploy `28432708930`; release `/supersites/` `ffe1ecf9f0c2cf092f62a068af14f6802401c75a-28432708930-1`; smoke público, AdSense-safe, QRRoute static app smoke, 12 deep links EN/PT-BR, crawler quick e visual live desktop/mobile passaram.

**Regra aprendida reforçada:** a entrega de catálogo deve usar link profundo real e validar produção live antes do fechamento. Se os links já estão 200 e o app está coerente, não publicar app estático desnecessariamente; se estiver stale/404/500, publicar no mesmo ciclo.

---

## Sprint 18.8 — Página de catálogo InvoiceCraft

**Codex deve:**

1. Criar landing/editor público parecido em lógica com Invoice Generator: ferramenta primeiro.
2. Evitar parecer documentação.
3. Remover `tax/legal review` do topo; mover para nota discreta no fim e registrar pendência jurídica em docs.
4. Destacar invoice, quote e receipt.

**Status:** concluída em produção em 2026-06-30. A rota de catálogo InvoiceCraft virou landing pública task-first para fatura, orçamento e recibo, com prévia de documento acima da dobra, CTAs para gerador de fatura, navegação por fluxo, busca/filtros, cards para invoice/quote/receipt, nota fiscal/legal discreta abaixo do valor e rodapé contextual com deep links reais. Commit `de22452`; Quality Gate `28434459664`; Deploy Dry Run `28434459665`; Hub deploy `28434690625`; release `/supersites/` `de22452861a113981ebb373da06764c017df020d-28434690625-1`; smoke público, AdSense-safe, InvoiceCraft static app smoke, 6 deep links EN/PT-BR, crawler quick e visual live desktop/mobile passaram.

**Regra aprendida reforçada:** catálogos de documento devem abrir por ação/prévia, não por explicação institucional. Restrições fiscal/legal/pagamento ficam em nota discreta abaixo do valor e nunca como destaque de topo.

---

## Sprint 18.9 — Página de catálogo MailHealth

**Codex deve:**

1. Criar landing com `Domain health report` e score visual.
2. Destacar SPF, DKIM, DMARC, MX, blacklist, SMTP, headers.
3. Inspirar-se em MxToolbox: input simples por domínio + menu de checks.
4. Remover linguagem de workers, billing e roadmap do topo.

**Status:** concluída em produção em 2026-06-30. A rota de catálogo MailHealth virou landing pública task-first com relatório visual de saúde de domínio, score, sinais SPF/DKIM/DMARC/MX, atalhos por fluxo, cards para os 7 checks reais, busca/filtros, limites/privacidade abaixo do valor e rodapé contextual com deep links. Commit de implementação `384a9bf`; correção i18n `681734b`; Quality Gates `28436591226` e `28438120880`; Deploy Dry Runs `28436591227` e `28438120905`; deploy final Hub `28438325239`; release `/supersites/` `681734b85cabc8defa91c54cef4b0c14f0ea3584-28438325239-1`; smoke público, AdSense-safe, MailHealth static app smoke, 14 deep links EN/PT-BR, crawler quick e visual live desktop/mobile passaram.

**Regra aprendida reforçada:** catálogos localizados devem validar acentos e texto natural em browser antes do fechamento. Não aceitar transliteração ASCII em PT-BR/ES/FR/DE; o smoke visual deve confirmar H1 localizado, ausência de termos internos, ausência de overflow e screenshot sem banners sobrepondo conteúdo.

---

## Sprint 18.10 — Página de catálogo SitePulse Lab

**Codex deve:**

1. Criar landing com input `Is this website up?` e relatório visual.
2. Inspirar-se em DownForEveryoneOrJustMe para resposta simples e GTmetrix para detalhes técnicos.
3. Destacar status, redirect, headers, robots, sitemap, TTFB, snapshot.
4. Remover `monitoring planned` do topo.

**Status:** concluída em produção em 2026-06-30. A rota de catálogo SitePulse Lab virou landing pública task-first com relatório visual de status acima da dobra, score de exemplo, sinais de disponibilidade, redirect, headers e timing, atalhos por workflow, cards para os 7 checks reais, busca/filtros, limites/privacidade abaixo do valor útil e rodapé contextual com deep links. Commit `10765e7`; Quality Gate `28440535346`; Deploy Dry Run `28440535344`; deploy reversível do Hub `28440771101`; release `/supersites/` `10765e70ece762bb0eaf84ea4e8a39a3fbe1a57f-28440771101-1`; smoke público, AdSense-safe, SitePulse static app smoke, 14 deep links EN/PT-BR, crawler quick `2026-06-30T11-35-54-823Z` e visual live desktop/mobile passaram.

**Correção pós-watchdog:** concluída em 2026-06-30. O `Public Watchdog` encontrou link acentuado indevidamente para TimeNexus (`são-paulo`) gerado por sanitização linguística aplicada a campos técnicos. O commit `f1cf0c8` preserva `path`, `href`, `slug`, `url` e campos técnicos equivalentes em `sanitizePublicCopy`; Quality Gate `28442797278`, Deploy Dry Run `28442797012`, deploy Hub `28443060889`, crawler quick `2026-06-30T12-15-12-355Z` e `Public Watchdog` `28443668162` passaram. A release ativa passou a ser `f1cf0c8797df387b24048e5575447bbd440d01b9-28443060889-1`.

**Regra aprendida reforçada:** para as próximas etapas, o fechamento da sprint só ocorre depois de implementar a página inteira, validar localmente, commit/push objetivo, monitorar CI/deploy HostGator, rodar smoke público, validar deep links reais e revisar visual live desktop/mobile. O detalhe técnico deve ficar no fechamento documental; não fragmentar uma mesma sprint em handoffs ou commits parciais quando não houver falha concreta.

**Regra técnica aprendida:** copy visível pode ser localizada e acentuada; campos técnicos de navegação, canonical, href, path, slug, url, locale e time zone não podem ser reescritos por saneamento linguístico. Sempre que i18n tocar rotas, validar o HTML publicado e o crawler com links internos antes da próxima sprint.

---

## Sprint 18.11 — Página de catálogo PixelBatch

**Codex deve:**

1. Criar landing com dropzone grande e promessa clara.
2. Inspirar-se em TinyPNG/iLoveIMG/Squoosh: arquivo primeiro, preview depois.
3. Remover `No server upload backend active` do topo; usar “Your image stays in this browser”.
4. Destacar compress, resize, crop, convert, metadata, social presets.

**Status em 2026-06-30:** concluida em producao.

- A rota `/supersites/en/sites/pixelbatch` deixou de usar ficha generica e passou a abrir como landing de imagem: H1 pratico, CTA para compressor, dropzone dominante, plano de preview local, workflows e cards para compressor, resizer, cropper, converter, metadata remover e social presets.
- A copy `pixelBatchCatalogCopy` cobre EN/PT-BR/ES/FR/DE, substitui linguagem interna por privacidade publica (`Your image stays in this browser` / `Sua imagem fica neste navegador`) e preserva deep links tecnicos reais para `/supersites/pixelbatch/<locale>/tools/...`.
- Ciclo executado: validacao local completa, commit objetivo `8ba0bf3`, push, Quality Gate `28445103010`, Deploy Dry Run `28445103023`, deploy HostGator `28445345367`, smoke publico, checagem de 12 deep links EN/PT-BR, crawler quick `2026-06-30T12-54-57-039Z` com 95 rotas/190 checks/0 gaps e visual live desktop/mobile revisado.

---

## Sprint 18.12 — Página de catálogo DocShift

**Codex deve:**

1. Criar landing tipo iLovePDF: grid grande de ferramentas PDF e dropzone dominante.
2. Remover `No server upload backend active` do topo.
3. Destacar merge, split, rotate, compress, watermark, page numbers, metadata, text-to-PDF.
4. Criar footer PDF Tools rico.

**Status em 2026-06-30:** concluida em producao.

- A rota `/supersites/en/sites/docshift` deixou de usar ficha generica e passou a abrir como landing publica PDF: H1 pratico, CTA para merge, dropzone dominante, promessa de processamento no navegador, snapshot de workflow, atalhos por fluxo, grid completo de 8 ferramentas PDF e busca/filtros.
- A copy `docShiftCatalogCopy` cobre EN/PT-BR/ES/FR/DE, substitui `No server upload backend active` por privacidade publica (`Files stay in this browser for supported free tasks` / `Os arquivos ficam neste navegador nas tarefas gratuitas compativeis`) e preserva deep links tecnicos reais para `/supersites/docshift/<locale>/tools/...`.
- Ciclo executado: validacao local completa, commit objetivo `8761a93`, push, Quality Gate `28447920100`, Deploy Dry Run `28447920167`, deploy HostGator `28448208431`, smoke publico, checagem de 16 deep links EN/PT-BR, crawler quick `2026-06-30T13-41-51-582Z` com 95 rotas/190 checks/0 gaps e visual live desktop/mobile revisado.

---

## Sprint 18.13 — Página About

**Codex deve:**

1. Remover `Human legal review remains required before final public launch` da área pública.
2. Transformar em página institucional real: missão, como funciona, privacidade, contato, correções, idiomas.
3. Manter pendências jurídicas somente em `HUMAN_ACTION_REQUIRED.md`.

**Status em 2026-06-30:** concluida em producao.

- A rota About do Hub deixou de expor `Human legal review remains required`, `Public review`, `revisao publica` e equivalentes. O painel publico das paginas institucionais agora usa copy de cuidado/correcao de pagina, e o helper compartilhado de trust/i18n nao transforma mais `HUMAN_ACTION_REQUIRED` em `human review` publico.
- O About virou pagina institucional localizada em EN/PT-BR/ES/FR/DE, com seis secoes reais: missao, como a rede funciona, privacidade por padrao, contato/correcoes, idiomas e crescimento responsavel. A rota About do Hub usa essa copy curada diretamente, sem acrescentar blocos genericos de pendencia legal.
- Ciclo executado: validacao local completa, commit objetivo `398ef0c`, push, Quality Gate `28451195092`, Deploy Dry Run `28451195046`, deploy HostGator `28451482856`, smoke publico, checagem das 5 rotas About, crawler quick `2026-06-30T14-32-30-580Z` com 95 rotas/190 checks/0 gaps e visual live desktop/mobile revisado.
- Regra registrada para proximas etapas: correcoes operacionais do usuario sobre cadencia, commits/pushes, monitoramento e documentacao devem entrar no fechamento documental da sprint e nas docs de leitura obrigatoria quando alterarem o modo de execucao.

---

## Sprint 18.14 — Página Contact

**Codex deve:**

1. Criar página de contato final, com canais por assunto.
2. Incluir abuso/segurança, correção editorial, suporte, parceria e legal.
3. Não exibir mensagens de desenvolvimento.
4. Validar formulário ou mailto conforme arquitetura atual.

**Status em 2026-06-30:** concluida em producao.

- A rota Contact do Hub agora e uma pagina publica localizada em EN/PT-BR/ES/FR/DE com canais por assunto: suporte de produto, seguranca/abuso, correcao editorial, privacidade e parceria/legal. A pagina usa links `mailto:` com assunto predefinido porque nao ha backend de formulario publico nesta arquitetura.
- A pagina removeu linguagem de lancamento/status de mailbox/formulario inacabado e manteve orientacoes praticas sobre o que enviar sem expor processo interno. A pendencia humana para confirmar `contact@opentshost.com` e triagem por assunto foi registrada em `docs/HUMAN_ACTION_REQUIRED.md`, nao na superficie publica.
- Ciclo executado: validacao local completa, commit objetivo `8cef11c`, push, Quality Gate `28454308318`, Deploy Dry Run `28454307004`, deploy HostGator `28454599720`, smoke publico, validacao browser das 5 rotas Contact com links decodificados para `mailto:contact@opentshost.com`, AdSense-safe, crawler quick live `2026-06-30T15-17-02-999Z` com 95 rotas/190 checks/0 gaps e visual live desktop/mobile revisado.

---

## Sprint 18.15 — Privacy Policy

**Codex deve:**

1. Transformar em texto público completo, limpo e localizado.
2. Remover `human review`, `should`, `plans to`, linguagem condicional e interna.
3. Se revisão jurídica ainda não estiver aprovada, registrar pendência em docs e manter a página pública como política clara de estado atual.
4. Citar categorias de dados, finalidades, retenção, direitos, contato e cookies.

**Status em 2026-06-30:** concluida em producao.

- A Privacy Policy do Hub agora e uma pagina publica completa e localizada em EN/PT-BR/ES/FR/DE, com categorias de dados, entradas de ferramentas, analytics/publicidade, cookies/preferencias, retencao/seguranca e direitos/contato.
- A pagina removeu linguagem condicional/interna (`should`, `plans to`, `human review`, linguagem de launch/release e equivalentes localizados). A pendencia juridica fica registrada em `docs/HUMAN_ACTION_REQUIRED.md`, nao na superficie publica.
- O helper legal preserva a copy curada de Privacy, evitando que texto generico de trust volte a publicar linguagem interna ou condicional.
- Ciclo executado: validacao local completa, commit objetivo `7f3c8fc`, push, Quality Gate `28459132391`, Deploy Dry Run `28459132411`, deploy HostGator `28459409612`, smoke publico, validacao live das 5 rotas Privacy, AdSense-safe, crawler quick live `2026-06-30T16-31-39-885Z` com 95 rotas/190 checks/0 gaps e visual live desktop/mobile revisado.
- Correcao de processo registrada: quando a copy publica muda de forma intencional, marcadores de smoke/preview precisam ser atualizados no mesmo ciclo antes de deploy/fechamento; nesta sprint o marcador antigo `Data minimization` foi trocado por `Data categories`.

---

## Sprint 18.16 — Cookie Policy

**Codex deve:**

1. Criar política pública de cookies/consentimento.
2. Remover linguagem de lançamento.
3. Explicar cookies essenciais, analytics, ads e preferências.
4. Criar link visível para gerenciar preferências quando o CMP estiver pronto.

**Status em 2026-06-30:** concluida em producao.

- A Cookie Policy do Hub agora e uma pagina publica completa e localizada em EN/PT-BR/ES/FR/DE, com seis secoes por idioma: categorias de cookies, armazenamento necessario, preferencias locais, analytics, publicidade e gerenciamento de preferencias.
- A pagina removeu linguagem de lancamento/status/condicional como `plans to`, `should`, `human review`, release/rollout e equivalentes localizados. A pendencia juridica/CMP regional fica registrada em `docs/HUMAN_ACTION_REQUIRED.md`, nao na superficie publica.
- O link `#consent-preferences` abre o painel local de preferencias da CMP sem carregar provider externo, tag real, request de anuncio, AdSense, GA4/GTM, billing, doacao ou afiliado.
- Ciclo executado: validacao local completa, commit objetivo `d032777`, push, Quality Gate `28462440900`, Deploy Dry Run `28462440678`, deploy HostGator `28462709911`, release `d032777ff1fe25949bef5071f294c8c08a481705-28462709911-1`, asset Hub `BR8uvxHm.js`, smoke publico, AdSense-safe, validacao live das 5 rotas Cookies, screenshots live desktop/mobile e crawler quick live `2026-06-30T17-24-32-421Z` com 95 rotas/190 checks/0 gaps.
- Observacao operacional: o crawler pre-commit `2026-06-30T17-01-20-093Z` registrou um 500 transitorio de recurso em `/supersites/en/sites/calcharbor`; rerun `2026-06-30T17-07-38-985Z` passou com 0 gaps antes do commit, e o crawler live final tambem passou.

---

## Sprint 18.17 — Terms of Use

**Codex deve:**

1. Remover linguagem interna.
2. Tornar termos públicos completos: uso permitido, abuso, limites, informações, pagamentos futuros, reembolsos quando aplicável, responsabilidade.
3. Registrar qualquer lacuna jurídica em `HUMAN_ACTION_REQUIRED.md`.

- A Terms of Use do Hub agora e uma pagina publica completa e localizada em EN/PT-BR/ES/FR/DE, com seis secoes por idioma: uso permitido, abuso/atividade proibida, limites das ferramentas, informacoes/resultados, servicos pagos futuros e responsabilidade/contato.
- A pagina removeu linguagem interna/condicional como `catalog phase`, `launched`, `plans to`, `should`, `must`, human/legal review, rollout/release e equivalentes localizados. A lacuna juridica fica registrada em `docs/HUMAN_ACTION_REQUIRED.md`, nao na superficie publica.
- Ciclo executado: validacao local completa, commit objetivo `2543c6c`, push, Quality Gate `28464595639`, Deploy Dry Run `28464595563`, deploy HostGator `28464837909`, release `2543c6cc49dccb328016f180e5c08286b803dc90-28464837909-1`, asset Hub `CuqcMwZ9.js`, smoke publico, AdSense-safe, validacao live das 5 rotas Terms, screenshots live desktop/mobile limpos e crawler quick live `2026-06-30T18-03-26-594Z` com 95 rotas/190 checks/0 gaps.

---

## Sprint 18.18 — Methodology

**Codex deve:**

1. Fazer página pública útil sobre como os resultados são calculados.
2. Não usar como status de lançamento.
3. Criar seções por família: rede, calculadoras, documentos, imagem, e-mail, website.
4. Linkar das tool pages apenas abaixo do resultado.

**Fechamento em 2026-06-30:**

- A pagina Methodology do Hub agora e publica, util e localizada em EN/PT-BR/ES/FR/DE, com seis familias de resultado: rede/DNS, calculadoras, documentos/PDF, imagens, entregabilidade de e-mail e checagens de website.
- A copy publica deixou de funcionar como status de lancamento e bloqueia linguagem de roadmap, rollout, readiness, review humano/legal, quality/release checks, rollback, AdSense, billing, ads planned, `should`/`must` e equivalentes localizados. A pagina usa copy curada direta para evitar fallback generico com linguagem interna.
- Ciclo executado: validacao local completa, commit objetivo `015d585`, push, Quality Gate `28466903460`, Deploy Dry Run `28466903611`, deploy HostGator `28467173864`, release `015d58557ccb0215a0ecfb604ce626d02ea95051-28467173864-1`, asset Hub `C_jWVPgU.js`, smoke publico, AdSense-safe, validacao live das 5 rotas Methodology, screenshots live desktop/mobile limpos e crawler quick live `2026-06-30T18-44-31-515Z` com 95 rotas/190 checks/0 gaps.

---

## Sprint 18.19 — Editorial Policy

**Codex deve:**

1. Criar política editorial pública, sem linguagem interna.
2. Explicar revisão, correções, traduções, fontes, exemplos, qualidade e atualização.
3. Criar processo de solicitação de correção.

**Fechamento em 2026-06-30:**

- A pagina Editorial Policy do Hub agora e publica, localizada em EN/PT-BR/ES/FR/DE e organizada em seis secoes: conteudo util, revisao/atualizacoes, correcoes, traducoes, fontes/exemplos e padroes de qualidade.
- O processo publico de correcao usa link `mailto:` para `contact@opentshost.com` com assunto de correcao editorial, mantendo pedidos juridicos, provider, KYC, monetizacao e operacao fora da superficie principal.
- A copy curada passa direto pelo helper legal para evitar fallback generico com linguagem interna. O gate de public copy e os testes cobrem ausencia de termos como release, rollback, billing, ads, quality checks e human review.
- Ciclo executado: validacao local completa, commit objetivo `e4eb998`, push, Quality Gate `28469279752`, Deploy Dry Run `28469279691`, deploy HostGator `28469514798`, release `e4eb99834a4bc587478f7463d877e224e73055f9-28469514798-1`, asset Hub `Vib1iYtU.js`, smoke publico, AdSense-safe, validacao live das 5 rotas Editorial Policy, screenshots live desktop/mobile limpos e crawler quick live `2026-06-30T19-22-35-242Z` com 95 rotas/190 checks/0 gaps.

---

## Sprint 18.20 — Public Status

**Codex deve:**

1. Manter página de status pública, mas remover informações de monetização/billing/dry-run/rollback que não interessam ao usuário.
2. Mostrar somente disponibilidade, incidentes conhecidos, manutenção, links úteis e contato.
3. Mover status técnico detalhado para admin/docs.

---

# 12. NetProbe Atlas

## Sprint 18.21 — NetProbe home

**Codex deve:**

1. Transformar a home em hub de diagnóstico de rede.
2. Topo com busca/input universal: `Enter a domain, hostname or IP`.
3. Cards rápidos para IP, DNS, propagation, RDAP, SSL, port, ping.
4. Remover `Advertising not active`, `API live`, `release checks`.
5. Criar footer inspirado no whatsmydns: DNS Tools, DNS Guides, DNS Lookup by type, IP Tools, Domain Tools, SSL Tools.
6. Adicionar donation block.

---

## Sprint 18.22 — NetProbe: What is my IP

**Rota:** `/supersites/netprobe-atlas/en/tools/what-is-my-ip`

**Problema atual:** exige botão e mostra texto de desenvolvimento no resultado.

**Codex deve:**

1. Executar a consulta automaticamente no carregamento da página.
2. Remover botão obrigatório `Run IP check`; manter apenas `Refresh`, `Copy IP`, `Show details`.
3. Topo acima da dobra:
   - `Your public IP is ...`
   - IPv4/IPv6 detectado;
   - botão copiar;
   - status de privacidade;
   - timestamp.
4. Painel secundário:
   - ISP/ASN;
   - cidade/região/país quando disponível;
   - reverse DNS;
   - proxy/VPN/Tor/data center quando houver fonte legítima;
   - browser/platform/user agent resumido;
   - mapa aproximado quando geolocalização estiver disponível.
5. Não prometer localização exata.
6. Criar CTA discreto para VPN/privacidade como futuro afiliado, sem ativar afiliado real.
7. Mover metodologia para accordion inferior.
8. Inspirar-se em `whatismyipaddress.com/pt/meu-ip` e `whatismyip.com.br`.

---

## Sprint 18.23 — NetProbe: DNS Propagation

**Rota:** `/supersites/netprobe-atlas/en/tools/dns-propagation`

**Problema atual:** não parece um propagation checker global e declara no meio da página que ainda não é worldwide checker.

**Codex deve:**

1. Redesenhar como a página prioritária do NetProbe.
2. Layout desktop:
   - topo com input `Domain name`;
   - tabs/toggle para tipos `A`, `AAAA`, `CNAME`, `MX`, `NS`, `PTR`, `SOA`, `SRV`, `TXT`, `CAA`;
   - campo `Expected value`;
   - botão `Check propagation`;
   - coluna de resultados com servidor, cidade, país, bandeira, status e resposta;
   - mapa global maior com markers por servidor;
   - resumo: `% propagated`, `matched`, `different`, `no answer`, `errors`, `checked at`.
3. Layout mobile:
   - tool no topo;
   - tabs `List` e `Map`;
   - lista primeiro por usabilidade;
   - mapa colapsável.
4. Implementar apenas servidores reais. Não simular cidade, país ou status.
5. Se multi-região real ainda não existir, criar worker/probe architecture com documentação técnica; se infra bloquear, registrar `HUMAN_ACTION_REQUIRED`, mas ainda refatorar UI para receber dados reais.
6. Cada servidor deve ter:
   - país;
   - cidade/região;
   - provider/resolver;
   - record value;
   - TTL;
   - status icon;
   - latency;
   - error quando houver.
7. Adicionar mapa com lat/lng real de probes/resolvers.
8. Adicionar botão `Copy results`, `Share report`, `Check another record`.
9. Remover do topo “this is not worldwide” e transformar em nota de metodologia no fim: “Coverage depends on active probes listed above.”
10. Criar rodapé DNS completo como o whatsmydns:
    - DNS Checker;
    - DNS Lookup;
    - Reverse DNS Lookup;
    - What is My IP;
    - DNS Security;
    - Flush DNS;
    - Hosts File;
    - A/AAAA/CAA/CNAME/MX/NS/PTR/SOA/SRV/TXT lookup;
    - DNS Servers by country;
    - Browser Extension placeholder se houver roadmap.
11. Adicionar donation block pós-guia.
12. Não ativar AdSense real; reservar slot após o resultado e antes do guia.

---

## Sprint 18.24 — NetProbe: DNS Lookup

**Codex deve:**

1. Reorganizar para input e record tabs acima da dobra.
2. Mostrar resultado em tabela clara: type, name, value, TTL, resolver/source, copied status.
3. Criar chips para tipos A, AAAA, CNAME, MX, TXT, NS, SOA, CAA, PTR, SRV.
4. Adicionar `Copy all`, `Export JSON`, `Check propagation`, `Check email records`.
5. Mover metodologia para baixo.
6. Footer DNS rico.

---

## Sprint 18.25 — NetProbe: RDAP Domain Lookup

**Codex deve:**

1. Transformar resultado em cards:
   - domain;
   - registrar;
   - registration date;
   - updated date;
   - expiration date;
   - status;
   - nameservers;
   - DNSSEC quando disponível;
   - redaction notice.
2. Não prometer dados pessoais de proprietário.
3. Adicionar `Copy summary`, `Monitor expiration`, `Check DNS`, `Check SSL`.
4. Mover metodologia e limitações para baixo.

---

## Sprint 18.26 — NetProbe: SSL Certificate Checker

**Codex deve:**

1. Mostrar status imediato: valid/expiring/expired/mismatch/unreachable.
2. Cards: issuer, subject, SANs, valid from/to, days left, chain, protocol hints.
3. Barra visual de expiração.
4. CTA `Monitor certificate expiry` abaixo do resultado.
5. Relacionar com SitePulse security headers.

---

## Sprint 18.27 — NetProbe: Port Checker

**Codex deve:**

1. Mostrar input simples `host + port` e quick chips `80`, `443`, `587`, `993`.
2. Resultado visual: open/closed/timeout/refused, latency e resolved IP.
3. Explicar que não é scanner.
4. Mover antiabuse e limites para baixo.

---

## Sprint 18.28 — NetProbe: Ping and Traceroute

**Codex deve:**

1. Mostrar status visual de alcance: reachable/unreachable/partial.
2. Separar ping-like reachability e traceroute limitations.
3. Se ICMP/traceroute real não existir, não prometer; rotular como TCP reachability.
4. Mostrar hops somente se reais.
5. Adicionar próximos checks: port, DNS, SitePulse.

---

# 13. CalcHarbor

## Sprint 18.29 — CalcHarbor home

**Codex deve:**

1. Criar hub denso de calculadoras, inspirado em Calculator.net, mas visual premium.
2. Topo com busca de calculadora.
3. Categorias: Finance, Business, Marketing, Commerce, Time/Date, Units.
4. Remover `Workflow checks ready`, `ads/checkout inactive`.
5. Adicionar “popular calculators” e “all calculators”.
6. Preparar footer com calculadoras por categoria.

---

## Sprint 18.30 — Loan Payment Calculator

**Codex deve:**

1. Melhorar visual de calculadora com input à esquerda e resultado à direita em desktop.
2. Resultado principal grande: monthly payment.
3. Tabela de amortização resumida opcional.
4. Gráfico simples de principal vs interest.
5. Fórmula abaixo, não como destaque excessivo no topo.
6. Remover `commercial features planned`.
7. Adicionar `Copy result`, `Download summary`, `Compare scenarios`.

---

## Sprint 18.31 — Break-even Point Calculator

**Codex deve:**

1. Resultado principal: break-even units e revenue.
2. Gráfico de linha ou área mostrando prejuízo/lucro por volume.
3. Tabela de cenários.
4. Explicação leiga antes da fórmula técnica.
5. CTA para salvar/exportar como upgrade futuro abaixo.

---

## Sprint 18.32 — Gross Margin Calculator

**Codex deve:**

1. Resultado principal: gross margin % e gross profit.
2. Mostrar diferença entre margin e markup visualmente.
3. Adicionar cenário com aumento/redução de custo.
4. Corrigir copy e localização.

---

## Sprint 18.33 — ROI Calculator

**Codex deve:**

1. Resultado principal: ROI % e net return.
2. Adicionar tempo/período opcional ou nota clara se não anualiza.
3. Cenário conservador/base/agressivo.
4. Export summary e related calculators.

---

# 14. DevUtility Lab

## Sprint 18.34 — DevUtility home

**Codex deve:**

1. Refazer como developer workbench.
2. Inspirar-se em CodeBeautify: navegação densa, popular tools, recent tools, search.
3. Remover `No storage or logging`, `planned`, `billing`, `ads` do topo.
4. Manter privacidade com selo curto: “Runs locally when possible”.
5. Footer com Developer Tools, Formatters, Encoders, Validators, Generators, Security.

---

## Sprint 18.35 — Structured Data Formatter

**Codex deve:**

1. Layout split editor: input à esquerda, output à direita.
2. Abas JSON/XML/YAML/CSV no topo do editor.
3. Botões: Format, Minify, Validate, Copy, Download, Clear.
4. Mostrar erro inline.
5. Output com tree/table/raw tabs.
6. Remover linguagem comercial do topo.

---

## Sprint 18.36 — Base64 Converter

**Codex deve:**

1. Layout input/output lado a lado.
2. Botões Encode, Decode, Swap, Copy.
3. Mostrar byte length e UTF-8 validation.
4. Privacy note discreta abaixo.

---

## Sprint 18.37 — JWT Inspector

**Codex deve:**

1. Campo de token grande.
2. Separar header, payload e signature em cards.
3. Destacar que decode não é verify.
4. Mostrar claims comuns: exp, iat, iss, aud, sub quando houver.
5. Não armazenar token.

---

## Sprint 18.38 — Regex Tester

**Codex deve:**

1. Inspirar-se em Regex101 sem copiar: pattern, flags, test string, matches.
2. Destacar grupos, contagem e índices.
3. Worker/timeouts para evitar regex pesada.
4. Add `Copy pattern` e exemplos.

---

## Sprint 18.39 — Text Diff

**Codex deve:**

1. Dois inputs lado a lado.
2. Resultado diff com added/removed/unchanged.
3. Modo unified/split.
4. Copy/download diff.

---

## Sprint 18.40 — Cron Helper

**Codex deve:**

1. Campo cron e tradução humana imediata.
2. Listar próximas execuções.
3. Explicar timezone/UTC.
4. Exemplos comuns.

---

## Sprint 18.41 — UUID Generator

**Codex deve:**

1. Gerar imediatamente no carregamento.
2. Botões Generate, Copy all, Download.
3. Quantidade configurável com limite.
4. Opções v4 e futuras versões apenas se implementadas corretamente.

---

## Sprint 18.42 — Timestamp Converter

**Codex deve:**

1. Detectar timestamp atual automaticamente.
2. Inputs para seconds/ms/ISO.
3. Resultado UTC, local, selected timezone.
4. Copy buttons por formato.

---

## Sprint 18.43 — Hash Generator

**Codex deve:**

1. Input local, algorithms MD5/SHA-1/SHA-256/SHA-512 conforme suporte.
2. Aviso claro que MD5/SHA-1 não são recomendados para segurança.
3. Output com copiar individual.

---

# 15. TimeNexus

## Sprint 18.44 — TimeNexus home

**Codex deve:**

1. Mostrar hora atual imediatamente.
2. Inspirar-se em timeanddate: seções World Clock, Time Zones, Calendar, Calculators, Timers.
3. Remover `No accounts or storage`, `billing`, `ads inactive`.
4. Criar footer com cidades, fusos, datas, calendários e conversores.

---

## Sprint 18.45 — World Clock Americas + Europe

**Codex deve:**

1. Melhorar visual com cards de cidades e timeline horizontal.
2. Mostrar business hours com cor/badge.
3. Mobile: lista vertical de cidades com horário grande.
4. Adicionar city group switcher.

---

## Sprint 18.46 — Time Zone Converter

**Codex deve:**

1. Resultado direto acima do formulário quando exemplo carregado.
2. Inputs mais simples: from city/time, to city.
3. Timeline visual.
4. Adicionar copy/share link.
5. Mover metodologia abaixo.

---

## Sprint 18.47 — Timestamp Converter

**Codex deve:**

1. Mostrar timestamp atual automaticamente.
2. Converter enquanto digita.
3. Cards: Unix seconds, Unix ms, ISO, UTC, local, selected zone.
4. Botões copiar.

---

## Sprint 18.48 — Date Difference

**Codex deve:**

1. Resultado principal: days/weeks/months.
2. Mostrar inclusivo vs exclusivo.
3. Adicionar calendário visual pequeno ou timeline.

---

## Sprint 18.49 — Business Days

**Codex deve:**

1. Resultado principal: business days e weekend days.
2. Adicionar opção de incluir/excluir start/end.
3. Adicionar aviso sobre feriados regionais abaixo.
4. Futuro upgrade: holiday calendars.

---

## Sprint 18.50 — Age Calculator

**Codex deve:**

1. Resultado principal: years, months, days.
2. Mostrar total days e next birthday/days until.
3. Corrigir localização.

---

## Sprint 18.51 — Percentage Calculator

**Codex deve:**

1. Modos: percent of, percent change, add/subtract percent.
2. Resultado instantâneo.
3. Fórmula abaixo.

---

## Sprint 18.52 — Unit Converter

**Codex deve:**

1. Converter enquanto digita.
2. Categorias: length, weight, temperature.
3. Cards de resultados comuns.
4. Footer de conversores.

---

# 16. QRRoute

## Sprint 18.53 — QRRoute home

**Codex deve:**

1. QR preview ao vivo acima da dobra.
2. Remover `Commercial redirects planned`, `billing`, `ads inactive` do topo.
3. Abas de tipos de QR claras.
4. Footer com QR Tools, Barcode Tools, UTM Tools, Guides.
5. Bloco de doação.

---

## Sprint 18.54 — Static QR Code Generator

**Codex deve:**

1. Preview em tempo real sem exigir botão quando possível.
2. Botões: Download SVG, Download PNG, Copy payload, Print.
3. Tipos: URL, text, email, phone.
4. Validação de URL segura.
5. Explicar estático vs dinâmico abaixo.
6. Corrigir PT-BR: `Safe URL`, `Plain text`, `Optional label` etc.

---

## Sprint 18.55 — Barcode Generator

**Codex deve:**

1. Preview real de barcode.
2. Download SVG/PNG.
3. Labels e tamanho.
4. Validar caracteres.

---

## Sprint 18.56 — UTM Builder

**Codex deve:**

1. Campos individuais para source, medium, campaign, term, content.
2. URL final copyable.
3. QR preview do link final.
4. Presets de campanha.

---

## Sprint 18.57 — vCard QR Builder

**Codex deve:**

1. Campos estruturados: name, org, phone, email, website.
2. Preview vCard e QR.
3. Download QR e copy vCard.
4. Privacidade abaixo, não dominante.

---

## Sprint 18.58 — Wi-Fi QR Builder

**Codex deve:**

1. Campos SSID, password, encryption, hidden.
2. Botão show/hide password.
3. QR preview e download.
4. Aviso de privacidade discreto.

---

## Sprint 18.59 — QR Preview Lab

**Codex deve:**

1. Ferramenta para colar payload e validar estrutura.
2. Mostrar QR, scheme, tamanho, risco, destino.
3. Explicar limites de QR impresso.

---

# 17. InvoiceCraft

## Sprint 18.60 — InvoiceCraft home

**Codex deve:**

1. Home deve ser editor/document studio imediatamente, não catálogo textual.
2. Inspirar-se em Invoice Generator: editor acima da dobra, download claro.
3. Remover `Payments and taxes planned` do topo.
4. Nota fiscal/imposto apenas como disclaimer no fim e docs humanos.

---

## Sprint 18.61 — Invoice Builder

**Codex deve:**

1. Layout documento real: editor à esquerda, preview do documento à direita.
2. Botão `Download PDF` sempre visível após cálculo.
3. Campos: issuer, client, number, issue date, due date, currency, items, tax/discount/shipping, notes, terms.
4. Adicionar logo upload local opcional se já seguro; se não, backlog.
5. Remover alertas técnicos do topo.

---

## Sprint 18.62 — Quote Builder

**Codex deve:**

1. Mesmo editor, mas linguagem de orçamento/proposta.
2. Campo `Valid until` destacado.
3. Preview com título Quote/Estimate.
4. CTA para converter em invoice como upgrade futuro.

---

## Sprint 18.63 — Receipt Builder

**Codex deve:**

1. Mesmo editor, mas com `Paid date` e status paid.
2. Preview de recibo limpo.
3. Nota: não processa pagamento; apenas gera recibo.
4. Mover limites para baixo.

---

# 18. MailHealth

## Sprint 18.64 — MailHealth home

**Codex deve:**

1. Input de domínio único acima da dobra.
2. Score geral de email health.
3. Cards SPF, DKIM, DMARC, MX, blacklist, SMTP, headers.
4. Inspirar-se em MxToolbox e Mail-Tester: score simples, detalhes técnicos abaixo.
5. Remover `Monitoring planned`, `billing`, `API planned` do topo.

---

## Sprint 18.65 — SPF Checker

**Codex deve:**

1. Resultado visual: found/missing/multiple/risky.
2. Mostrar record bruto, mecanismos, lookup count, all mechanism.
3. Fix guidance com texto copiável.
4. Mover record builder planned para bloco futuro discreto ou remover.

---

## Sprint 18.66 — DKIM Checker

**Codex deve:**

1. Campos domain + selector claros.
2. Resultado: record found, key type, version, key present, warnings.
3. Explicar onde encontrar selector.
4. Não expor raw key em analytics/logs.

---

## Sprint 18.67 — DMARC Checker

**Codex deve:**

1. Resultado: policy, pct, rua, ruf, alignment, enforcement level.
2. Visual progress: none -> quarantine -> reject.
3. Fix guidance e exemplo de record.
4. Deixar claro que report ingestion é upgrade futuro, abaixo.

---

## Sprint 18.68 — MX Checker

**Codex deve:**

1. Tabela MX por prioridade.
2. Validar A/AAAA público dos hosts.
3. Status visual de inbound readiness.
4. Próximos checks: SMTP e SPF.

---

## Sprint 18.69 — Blacklist Check

**Codex deve:**

1. Mostrar quais IPs foram checados e quais listas.
2. Separar listed/unlisted/error/rate-limited.
3. Não prometer deliverability total.
4. Próximo passo claro se listado.

---

## Sprint 18.70 — SMTP Check

**Codex deve:**

1. Resultado: reachable/refused/timeout por MX e porta.
2. Sem enviar email.
3. Mostrar latência e porta.
4. Limites abaixo.

---

## Sprint 18.71 — Header Analyzer

**Codex deve:**

1. Área de paste grande.
2. Parse local imediato.
3. Cards SPF/DKIM/DMARC/alignment.
4. Highlight de Authentication-Results.
5. Não enviar header para API.

---

# 19. SitePulse Lab

## Sprint 18.72 — SitePulse home

**Codex deve:**

1. Input `Check if a website is up` acima da dobra.
2. Resultado simples: online/down/redirecting/slow.
3. Detalhes GTmetrix-like abaixo.
4. Remover `Monitoring planned` do topo.

---

## Sprint 18.73 — HTTP Status Checker

**Codex deve:**

1. Resultado principal: HTTP code, online/down, final URL, TTFB.
2. Botões copy report e check again.
3. Explicação leiga do código.

---

## Sprint 18.74 — Redirect Chain Checker

**Codex deve:**

1. Timeline de hops.
2. Mostrar code, URL, latency, cross-domain, loop warning.
3. SEO guidance abaixo.

---

## Sprint 18.75 — Security Headers Checker

**Codex deve:**

1. Score visual.
2. Cards para HSTS, CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options.
3. Mostrar header presente/ausente e recomendação.

---

## Sprint 18.76 — Robots.txt Checker

**Codex deve:**

1. Mostrar fetch status e conteúdo resumido.
2. Destacar sitemap hints e disallow gerais.
3. Não fazer crawl amplo.

---

## Sprint 18.77 — Sitemap Validator

**Codex deve:**

1. Mostrar status XML, URL count, size, errors.
2. Amostra de URLs.
3. Próximo passo para SEO.

---

## Sprint 18.78 — TTFB Checker

**Codex deve:**

1. Resultado principal: TTFB ms com badge good/needs work/slow.
2. Explicar que é amostra única.
3. CTA para monitoramento futuro abaixo.

---

## Sprint 18.79 — Performance Snapshot

**Codex deve:**

1. Relatório visual com status, redirects, headers, byte size, TTFB.
2. Score geral.
3. Não prometer Lighthouse se não executar Lighthouse real.
4. Relacionar com PageSpeed/GTmetrix como benchmarks, não como dados próprios.

---

# 20. PixelBatch

## Sprint 18.80 — PixelBatch home

**Codex deve:**

1. Dropzone grande acima da dobra.
2. Inspirar-se em TinyPNG/iLoveIMG/Squoosh.
3. Remover `No server upload backend active` do topo.
4. Mostrar “Your image stays in this browser” como badge curto.
5. Footer image tools rico.

---

## Sprint 18.81 — Image Compressor

**Codex deve:**

1. Dropzone dominante.
2. Preview antes/depois.
3. Resultado: original size, output size, reduction %, format, quality.
4. Download claro.
5. Corrigir PT-BR e inglês residual.

---

## Sprint 18.82 — Image Resizer

**Codex deve:**

1. Campos width/height, maintain aspect ratio.
2. Presets web/store/social.
3. Preview e download.

---

## Sprint 18.83 — Image Cropper

**Codex deve:**

1. UI de crop real se viável.
2. Presets square, portrait, landscape, OG, marketplace.
3. Preview e download.
4. Se crop manual não for viável nesta sprint, implementar centered crop com UI honesta e backlog para crop manual.

---

## Sprint 18.84 — Image Converter

**Codex deve:**

1. Input file, output format, quality quando aplicável.
2. Preview e download.
3. Aviso quando AVIF não suportado pelo navegador.

---

## Sprint 18.85 — Metadata Remover

**Codex deve:**

1. Explicar claramente que re-encode via Canvas remove metadados comuns.
2. Mostrar antes/depois quando possível.
3. Download da cópia limpa.

---

## Sprint 18.86 — Social Preset Generator

**Codex deve:**

1. Presets: square, story, OG, marketplace.
2. Gerar múltiplos outputs se localmente viável.
3. Download individual ou zip se seguro.

---

# 21. DocShift

## Sprint 18.87 — DocShift home

**Codex deve:**

1. Inspirar-se em iLovePDF: grid de ferramentas PDF grande e direto.
2. Dropzone para tarefa principal.
3. Remover `No server upload backend active` do topo.
4. Mostrar “Files stay in this browser for supported free tasks”.
5. Footer PDF tools rico.

---

## Sprint 18.88 — PDF Merge

**Codex deve:**

1. Dropzone dominante.
2. Lista de PDFs em ordem com drag/reorder se viável.
3. Botão merge/download claro.
4. Progress state.
5. Corrigir textos PT-BR ainda em inglês.

---

## Sprint 18.89 — PDF Split

**Codex deve:**

1. Upload/dropzone.
2. Campo de page ranges.
3. Preview de páginas se viável.
4. Download output.

---

## Sprint 18.90 — PDF Rotate

**Codex deve:**

1. Upload/dropzone.
2. Escolher all pages ou range.
3. Botões 90/180/270.
4. Download output.

---

## Sprint 18.91 — PDF Compressor

**Codex deve:**

1. Upload/dropzone.
2. Mostrar size before/after.
3. Explicar limites de compressão local.
4. Download output.

---

## Sprint 18.92 — PDF Watermark

**Codex deve:**

1. Upload/dropzone.
2. Campo texto, posição, opacidade, tamanho.
3. Preview se viável.
4. Download output.

---

## Sprint 18.93 — PDF Page Numbers

**Codex deve:**

1. Upload/dropzone.
2. Opções: position, start number, format.
3. Download output.

---

## Sprint 18.94 — PDF Metadata Cleaner

**Codex deve:**

1. Upload/dropzone.
2. Mostrar title/author quando acessível.
3. Permitir limpar/substituir metadados básicos.
4. Download output.

---

## Sprint 18.95 — Text to PDF

**Codex deve:**

1. Editor de texto grande.
2. Opções simples: title, page size, font size.
3. Preview/download.
4. Limites claros abaixo.

---

# 22. Fechamento transversal da Fase 18

## Sprint 18.96 — QA multilíngue completa

**Codex deve:**

1. Rodar crawler em todos os idiomas.
2. Detectar inglês residual fora de termos técnicos aceitos.
3. Corrigir acentos e gramática.
4. Validar `hreflang`, `canonical`, sitemap, title, description e schema.
5. Registrar páginas que devem ficar `noindex` até tradução final.

---

## Sprint 18.97 — AdSense-safe placeholders e doação

**Codex deve:**

1. Inserir slots reservados AdSense-safe após resultado e conteúdo, nunca entre input e botão.
2. Não ativar anúncio real.
3. Adicionar donation block em todos os sites após entrega de valor.
4. Não ativar pagamento real sem gate humano.
5. Atualizar `ADSENSE_PLAYBOOK.md` e `HUMAN_ACTION_REQUIRED.md`.

---

## Sprint 18.98 — Performance, acessibilidade e visual QA

**Codex deve:**

1. Rodar Lighthouse/PageSpeed quando possível.
2. Rodar GTmetrix manual ou registrar tarefa humana/API se indisponível.
3. Metas:
   - PageSpeed mobile 90+
   - PageSpeed desktop 95+
   - LCP <= 2.5s
   - INP <= 200ms
   - CLS <= 0.1
   - GTmetrix A quando testado.
4. Corrigir imagens, JS excessivo, layout shift, hydration, fonts, lazy loading e CSS crítico.
5. Validar responsividade 360px, 768px, 1024px, 1440px.

---

## Sprint 18.99 — Dashboard, relatórios e encerramento da Fase 18

**Codex deve:**

1. Atualizar dashboard/admin do Supersite com KPIs de refinamento:
   - páginas auditadas;
   - páginas benchmark-grade;
   - páginas com inglês residual;
   - páginas com conteúdo interno removido;
   - páginas com ad slots preparados;
   - páginas com donation block preparado;
   - Lighthouse scores;
   - Core Web Vitals estimados;
   - problemas P0/P1/P2 restantes.
2. Criar relatório final:
   - `docs/PHASE_18_BENCHMARK_REFINEMENT_REPORT.md`
3. Atualizar:
   - `docs/STATUS.md`
   - `docs/ROADMAP.md`
   - `docs/METRICS.md`
   - `docs/HUMAN_ACTION_REQUIRED.md`
4. Commit final docs-only.
5. Push.
6. Monitorar CI Quality Gate docs-only.

---

# 23. Critérios finais de aceite da Fase 18

A Fase 18 só estará concluída quando:

1. Todas as rotas públicas tiverem ferramenta/ação principal acima da dobra.
2. What Is My IP mostrar IP automaticamente ao abrir.
3. DNS Propagation tiver UI de lista + mapa e suporte visual para servidores/probes reais.
4. Nenhuma página pública principal exibir linguagem de desenvolvimento.
5. Metodologia/limites/privacidade estiverem abaixo ou colapsados, não dominando a primeira tela.
6. PT-BR, ES, FR e DE não tiverem inglês residual indevido.
7. Rodapés por site forem ricos e úteis para SEO.
8. Donation block estiver preparado em todos os sites, sem ativar pagamento real sem gate.
9. AdSense placeholders estiverem preparados com CLS controlado, sem ativar anúncios reais.
10. Cada página tiver related tools e conteúdo útil suficiente para AdSense/SEO.
11. Lighthouse/performance estiver dentro das metas ou com bloqueios documentados.
12. Dashboard admin refletir status de benchmark readiness por site e página.
13. Roadmap, status, métricas e human actions estiverem atualizados.
14. Cada sprint tiver commit, push, CI/dry-run e smoke registrados.

---

# 24. Regra de ouro

Não faça mais páginas parecerem roadmap. Faça parecerem ferramentas finais.

A intenção do usuário deve ser resolvida imediatamente. O técnico vem depois. O comercial vem depois do valor entregue. O SEO vem com utilidade real, não com texto inflado.
