# Sprint Execution Runbook

Data-base: 2026-06-30

Este runbook define como executar sprints do SuperSites sem transformar toda alteracao em um lancamento pesado. A regra principal e validacao proporcional ao risco.

## Conceitos

- `Quality Gate`: workflow de CI apos o push. Ele valida estrutura, segredos, builds/testes afetados e checks path-aware antes de considerar o commit confiavel.
- `Deploy Dry Run`: ensaio de empacotamento/deploy que gera plano ou artefato auditavel sem trocar producao. Ele serve para mudancas de deploy, manifesto, base path, scripts, secrets ou primeiro deploy de um app.
- `Smoke publico`: checagem curta da URL real depois do deploy para confirmar HTTP, conteudo essencial, asset principal e ausencia de rota stale.

## Perfis de entrega

### P0 - Incidente ou hotfix critico

Uso: producao quebrada, deploy falhou, seguranca, rota publica 500/404 critica.

- Ler apenas contexto necessario para mitigar o problema.
- Corrigir com o menor diff reversivel.
- Validar o caso quebrado e o smoke minimo relacionado.
- Commit/push direto; monitorar CI/deploy ate o estado final.
- Registrar causa/acao em `docs/STATUS.md` somente se houver impacto publico, rollback, incidente ou risco residual.

### P1 - Page/UI sprint

Uso padrao da Fase 18 para pagina, copy, layout, rodape, catalogo, ferramenta client-side ou refinamento visual sem alterar contrato de API, deploy ou dados.

- Ler `AGENTS.md`, `docs/OPERATING_CONTEXT.md`, este runbook, a secao ativa do roadmap e as notas do site/rota afetada.
- Implementar a sprint completa antes de handoffs intermediarios.
- Validar com o menor conjunto significativo:
  - testes/build do app afetado;
  - screenshot ou browser check desktop/mobile da rota afetada quando houver UI;
  - smoke local ou preview do app afetado;
  - `git diff --check`;
  - estrutura/segredos quando o diff tocar arquivos publicos, scripts, CI ou docs sensiveis.
- Preferir um unico commit objetivo com codigo, testes e docs estritamente afetados.
- Push e monitoramento do `Quality Gate` quando a sprint for para publicacao.
- Deploy/smoke publico somente do app/rota afetada quando a entrega precisa aparecer em producao.
- Nao rodar crawler benchmark completo, dry run de deploy, todos os packages ou fechamento documental amplo por padrao.

### P2 - App/API behavior

Uso: endpoint, contrato compartilhado, i18n/SEO compartilhado, analytics local, helpers comuns, pacote usado por mais de um app.

- Ler os docs tecnicos diretamente relacionados: arquitetura, seguranca, dados, SEO/AIO, analytics ou AdSense conforme o escopo.
- Validar testes unitarios/integracao do modulo afetado e build dos consumidores relevantes.
- Rodar smokes de rotas que exercitam o contrato alterado.
- Commit unico quando possivel; commit corretivo separado apenas se CI/deploy revelar defeito concreto.

### P3 - Release, deploy, provider, seguranca ou dados

Uso: workflow GitHub Actions, scripts de deploy, HostGator/VPS, manifestos, migrations, filas, backups, secrets, billing, AdSense real, analytics externo, operacao remota ou acao com risco de producao.

- Ler os playbooks obrigatorios do tema afetado antes da mutacao.
- Executar `Deploy Dry Run` quando deploy, empacotamento, manifestos, base path, secrets ou primeiro deploy de app forem alterados.
- Validar rollback/smoke publico quando houver publicacao.
- Atualizar `docs/STATUS.md`, `docs/METRICS.md`, `docs/HUMAN_ACTION_REQUIRED.md` ou ADR somente se o estado operacional, risco, decisao ou pendencia humana mudou.

### P4 - Fechamento de fase ou auditoria benchmark

Uso: marco de fase, pre-AdSense, grande revisao SEO/i18n, mudanca de navegacao global, fechamento de lote de paginas ou auditoria solicitada.

- Rodar crawler benchmark quick/full conforme o objetivo.
- Capturar evidencias desktop/mobile das rotas representativas ou obrigatorias.
- Atualizar roadmap, status, metricas, notas dos sites e criterios pendentes.
- Fazer commit documental de fechamento apenas quando houver volume suficiente para justificar separacao do commit de implementacao.

## Cadencia padrao

1. Escolher o perfil de entrega antes de editar.
2. Checar `git status`.
3. Implementar a sprint inteira em passos reversiveis.
4. Validar pelo perfil escolhido.
5. Commit objetivo.
6. Push.
7. Monitorar `Quality Gate`.
8. Deploy e smoke publico somente quando o perfil ou o pedido do dono exigir publicacao.
9. Atualizar docs apenas quando comportamento, operacao, risco, criterio de aceite ou roadmap realmente mudou.
10. Seguir para a proxima sprint depois que CI/deploy/smoke obrigatorios do perfil estiverem verdes.

## Regras para Fase 18

- O perfil padrao e P1.
- Crawler benchmark quick/full nao e obrigatorio por pagina. Use quando houver mudanca de shell global, navegacao, rotas, sitemap/hreflang/canonical, i18n compartilhado, rodape global, regressao suspeita ou fechamento de lote/fase.
- `Deploy Dry Run` nao e obrigatorio para copy/layout estatico quando o workflow de deploy ja esta estavel. Use quando o pacote/deploy mudou.
- Screenshots desktop/mobile devem cobrir a rota alterada; nao precisam cobrir todas as 95 rotas do catalogo.
- Se o Hub criar deep links para app estatico, validar esses links publicos. Publicar o app no mesmo ciclo apenas se a producao estiver antiga, 404, 500 ou incoerente.
- Commits devem ser curtos e objetivos. Evitar commit de implementacao + commit de docs quando um unico commit representa bem a sprint.
- Detalhes longos de evidencias ficam em artefatos ou notas de fechamento de lote, nao em toda microcorrecao.

## Stop conditions

- Deploy falhou.
- Smoke publico obrigatorio falhou.
- Risco de seguranca ou vazamento de segredo.
- Risco de perda de dados.
- Propriedade de producao ou rollback incertos.
- Acao humana irreversivel bloqueando o objetivo.
