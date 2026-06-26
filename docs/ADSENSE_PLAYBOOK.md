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

## Placements

- Usar componente compartilhado de ads com espaco reservado.
- Comecar com poucos placements manuais.
- Nao exibir ads em admin, login, checkout, area paga, erro, upload/progresso ou resultado sem contexto suficiente.
- Auto Ads somente como experimento controlado.

## HUMAN_ACTION_REQUIRED

- Beneficiario legal.
- Conta AdSense existente ou nova.
- Aceites, identidade, fiscal, banco e PIN postal.
