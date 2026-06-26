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
- Bloqueio atual em 2026-06-26: a URL candidata da API no HostGator responde HTTP 500; nao submeter NetProbe ao AdSense nem publicar placements enquanto esse gate estiver vermelho.

## Placements

- Usar componente compartilhado de ads com espaco reservado.
- Comecar com poucos placements manuais.
- Nao exibir ads em admin, login, checkout, area paga, erro, upload/progresso ou resultado sem contexto suficiente.
- Auto Ads somente como experimento controlado.

## HUMAN_ACTION_REQUIRED

- Beneficiario legal.
- Conta AdSense existente ou nova.
- Aceites, identidade, fiscal, banco e PIN postal.
