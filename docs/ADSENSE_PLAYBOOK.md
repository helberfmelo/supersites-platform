# AdSense Playbook

## Politica base

AdSense e a monetizacao primaria, mas nenhum site deve ser submetido antes de cumprir o gate de qualidade.

## Gate por site

- Ferramentas principais funcionando.
- Funcionalidade gratuita completa sem cadastro.
- Conteudo original e util nos idiomas lancados.
- About, contato, privacidade, cookies, termos e metodologia.
- Sitemap, robots, canonical, hreflang e schema validos.
- Sem paginas vazias ou quebradas.
- Layout sem incentivo a clique e sem clique acidental.
- Core Web Vitals aceitaveis.
- CMP/consentimento configurado onde exigido.
- Monitoramento, backups e rollback.

## NetProbe Atlas checklist

- Status page publica: `/en/status` e rotas localizadas prerenderizadas.
- Static artifact: validar com `scripts/build-netprobe-hostgator-artifact.ps1`.
- Public smoke: validar com `scripts/smoke-netprobe-public.ps1` somente apos deploy real.
- API gate: `GET /ip` e `POST /dns` precisam responder JSON publico antes de considerar as ferramentas utilizaveis.
- Sprint 2.8 corretiva adiciona o deploy publico do control-plane/API com smoke de `/health`, `/ip` e `/dns`; nao submeter NetProbe ao AdSense nem publicar placements enquanto esse deploy e o smoke NetProbe final nao estiverem verdes.

## CalcHarbor checklist

- Sprint 3.1 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto aos campos ou resultados de calculo de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.

## DevUtility Lab checklist

- Sprint 3.2 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto a editores, inputs, botoes de copia, resultados, blocos de codigo ou areas de erro de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.

## TimeNexus checklist

- Sprint 3.3 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto a inputs de data, horario, unidade, porcentagem, botoes de copia ou resultados de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.

## QRRoute checklist

- Sprint 4.1 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto a inputs de URL, barcode, vCard, Wi-Fi, botoes de gerar/copiar, SVG preview ou resultados de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.
- QR dinamico, short links e scan analytics exigem abuse controls e termos antes de qualquer pagina monetizada.

## InvoiceCraft checklist

- Sprint 4.2 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto a campos de documento, dados de cliente, linhas de item, valores, botoes de download PDF, erros ou preview de documento de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.
- Pagamentos, recorrencia, clientes/produtos salvos, impostos oficiais e numeracao fiscal exigem gates humanos/tecnicos antes de qualquer pagina monetizada.

## MailHealth checklist

- Sprint 4.3 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto a campos de dominio, selector DKIM, headers brutos, botoes de executar, erros ou resultados de DNS/SMTP/DNSBL de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.
- Monitoramento, alertas, relatorios DMARC, lote, API paga, white-label e DNSBL/provider policy exigem gates humanos/tecnicos antes de qualquer pagina monetizada.

## SitePulse Lab checklist

- Sprint 4.4 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto a campos de URL, botoes de executar, erros, redirect chain, headers, robots, sitemap, TTFB ou resultados de probe de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.
- Uptime, incidentes, status page, alertas, historico, multi-regiao, API paga e provider policy exigem gates humanos/tecnicos antes de qualquer pagina monetizada.

## PixelBatch checklist

- Sprint 5.1 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto a upload/input de arquivo, controles de qualidade/dimensao, progresso, preview de imagem, erros ou botoes de download de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.
- Batch, API, arquivos maiores, alta resolucao e IA exigem upload validation, sandbox, retencao, antiabuso e gates humanos/tecnicos antes de qualquer pagina monetizada.

## DocShift checklist

- Sprint 5.2 entrega apenas MVP local/CI e placeholder publico.
- Antes de AdSense, criar deploy HostGator especifico, smoke publico, rollback testavel e status page.
- Validar Core Web Vitals, ausencia de overflow, sitemap/canonical/hreflang/schema e paginas legais em todos os idiomas publicados.
- Nao posicionar anuncios junto a upload/input de PDF, texto colado, page ranges, metadados, watermark, preview de PDF, erros ou botoes de download de modo que incentive clique acidental.
- Nao submeter ao AdSense enquanto a URL publica ainda servir placeholder.
- Batch, API, arquivos maiores, OCR, historico e conversoes server-side exigem upload validation, sandbox, retencao, antiabuso e gates humanos/tecnicos antes de qualquer pagina monetizada.

## Placements

- Usar componente compartilhado de ads com espaco reservado.
- Comecar com poucos placements manuais.
- Nao exibir ads em admin, login, checkout, area paga, erro, upload/progresso ou resultado sem contexto suficiente.
- Auto Ads somente como experimento controlado.
- Sprint 6.1 implementa somente CMP local e placeholders inertes via `@supersites/ads`; `shouldRequestAd` deve permanecer falso ate feature flag, delivery gate, consentimento aplicavel, conta AdSense, CMP/TCF quando exigida e deploy especifico estarem aprovados.
- Legal pages, tool inputs/actions/previews/results, file upload/result, conta, checkout, login, admin e erro devem continuar sem placeholders nem ads reais.
- Cada novo placement deve passar por review de densidade e distancia de controles interativos para evitar clique acidental e CLS.

## Public safety gate

- Sprint 9.16 adiciona `pnpm validate:adsense-safe-public` como gate publico antes de qualquer submissao ou ativacao real de ads.
- O gate usa Playwright contra paginas publicas e deve falhar se houver requests/DOM de AdSense, GTM/GA4, pagamentos, doacoes ou afiliados enquanto a monetizacao real estiver desligada.
- Estados permitidos continuam apenas inertes (`blocked-consent` ou `delivery-disabled`), sem foco, sem iframe/script, com reserva visual minima e `pointer-events: none`.
- O gate nao substitui aprovacao humana, conta AdSense, `ads.txt`, publisher id real, CMP/TCF quando aplicavel, revisao legal, Core Web Vitals e smokes pos-deploy.

## Account readiness foundation

- Sprint 6.3 adiciona somente readiness de conta publisher e revisao por site.
- Manter uma unica conta por beneficiario legal/publisher; checagem de conta existente/duplicada e criacao/uso da conta exigem acao humana.
- `adsense_accounts` usa `primary-publisher` sem `publisher_id` real ate aprovacao. Fiscal, banco, PIN, aceite e acesso Google ficam fora do repositorio.
- `adsense_site_reviews` registra todos os sites publicos como `not_submitted`; sites em placeholder ou sem dominio definitivo nao devem ser enviados para revisao.
- `ads.txt` so pode ser publicado apos publisher id real aprovado; nao criar `ads.txt` falso ou placeholder monetizavel.
- AdSense Management API fica `not_configured` e `management_api_enabled=false` ate OAuth/escopos/quotas serem aprovados.
- Auto Ads, manual ads, impressoes, cliques, receita e requests externos seguem desligados.

## AI growth readiness

- O motor de growth pode priorizar pendencias de qualidade, conteudo, consentimento, ads e readiness AdSense somente com evidencia, impacto, esforco, confianca e risco.
- O motor nao pode submeter sites ao AdSense, habilitar Management API, publicar `ads.txt`, inserir snippets, ativar Auto Ads/manual ads, mudar placements ou inferir receita/causalidade sem evidencia.
- Qualquer recomendacao que dependa de conta, beneficiario legal, fiscal, banco, PIN, publisher id, dominio definitivo, politicas ou request real de ads deve permanecer `human_required`.

## Executive reports

- Relatorios executivos podem listar apenas readiness AdSense local e status de gates.
- Impressoes, cliques, CTR, RPM, receita, requests, `publisher_id`, site submission e Management API devem aparecer como `unavailable` enquanto anuncios reais e API estiverem desligados.
- Relatorios nao devem inferir causalidade de trafego/receita nem sugerir que ads estao ativos antes dos gates humanos, tecnicos e de politica.

## Benchmark refinement

- A Sprint 7.2 pode listar readiness AdSense e oportunidades de placement apenas como scores estimados e evidencia local.
- `benchmark_site_readiness.adsense_score` nao e aprovacao AdSense, nao e site submission e nao indica serving ativo.
- `benchmark_opportunities` deve manter conta AdSense, `publisher_id`, `ads.txt`, site review, Auto Ads, snippets, Management API, receita e requests reais como `human_required` ou `unavailable` ate os gates completos.
- O Hub publico nao deve exibir claims de receita, RPM, CTR, viewability ou aprovacao AdSense.

## HUMAN_ACTION_REQUIRED

- Beneficiario legal.
- Conta AdSense existente ou nova.
- Aceites, identidade, fiscal, banco e PIN postal.
- Se regioes TCF forem atendidas com ads reais, escolher/configurar CMP certificada e aceitar termos aplicaveis antes de qualquer request.
