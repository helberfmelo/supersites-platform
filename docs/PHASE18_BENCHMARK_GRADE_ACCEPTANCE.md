# Phase 18 Benchmark-Grade Acceptance

Data-base: 2026-06-30

Este checklist passa a ser obrigatorio para cada sprint publica da Fase 18.

## Regra de bloqueio

Uma pagina publica nao pode ser marcada como benchmark-grade quando a primeira dobra ainda parece roadmap, catalogo operacional, status interno, release note, painel de monetizacao ou documentacao tecnica.

Benchmark-grade exige que a primeira tela entregue uma intencao pratica:

- ferramenta, busca, editor, input, upload, mapa/lista ou resultado acima da dobra;
- H1 direto sobre a tarefa do usuario;
- CTA ou acao primaria visivel sem cadastro;
- linguagem publica natural no idioma da rota;
- metodologia, privacidade, limites, suporte e monetizacao somente depois do valor util.

Atalhos, links uteis ou rodape rico abaixo de uma abertura institucional nao bastam. Se a primeira dobra ainda comunica portfolio, roadmap, rollout, disponibilidade interna ou monetizacao, a pagina deve voltar para correcao visual antes de commit.

## Linguagem proibida na superficie principal

Nao renderizar no topo publico:

- `Public API live`
- `ads planned`
- `billing disabled`
- `external analytics inactive`
- `release checks`
- `rollback`
- `human review required`
- `worker planned`
- `deploy smoke`
- `production checks`
- `launch order`
- `quality checks`
- status de rollout, disponibilidade interna, preview comercial ou caminho pago como destaque de home.

Esses itens pertencem a docs, admin, runbooks ou readiness autenticado.

## Aceite visual obrigatorio

Antes de commit em uma sprint publica:

- capturar desktop e mobile da rota alterada;
- verificar manualmente os screenshots;
- confirmar que nao ha overflow horizontal;
- confirmar que a primeira dobra resolve uma intencao pratica;
- confirmar que blocos de ads/doacao/suporte aparecem abaixo do valor entregue e continuam inertes;
- confirmar que a rota localizada nao exibe ingles residual indevido;
- atualizar `docs/SITES/<site>/BENCHMARK_NOTES.md` com o before/after de produto;
- atualizar `docs/SITES/<site>/FRONTEND_REFINEMENT_PLAN.md` com o criterio fechado ou pendente.

## Cadencia e rotas

- A rota canonica da sprint deve ser validada diretamente, com screenshots e smoke no path publico real.
- Paginas de catalogo do Hub, como `/supersites/en/sites/<site>`, devem funcionar como landing publica de descoberta para a familia de ferramentas, nao como ficha interna de produto.
- Links de CTA e rodape precisam apontar para subpaginas/ferramentas publicas reais do site quando existirem; evitar linkar apenas para a home do app se o benchmark espera navegacao profunda.
- Cada sprint deve fechar o ciclo objetivo: implementar, validar, commit/push, monitorar deploy HostGator, rodar smoke publico e so entao iniciar a proxima sprint.
- Se a rota do Hub/catalogo divulgar links profundos para um app estatico, o app tambem deve ser validado na producao real. Se qualquer link retornar release antiga, 404 ou 500, publicar o app estatico no mesmo ciclo e repetir smoke publico agregado e crawler benchmark antes de fechar a sprint.

## Regra especifica do Hub

O Hub publico deve abrir como finder de ferramentas, nao como catalogo de rollout.

Permitido na primeira experiencia:

- busca de ferramenta;
- filtros por categoria;
- atalhos diretos para ferramentas gratuitas;
- sinais publicos de uso, como sem cadastro obrigatorio e resposta gratuita primeiro.

Nao permitido como destaque da home:

- cards grandes de status de produto;
- badges `Available`/`Preview`/`Disponivel`/`Previa`;
- contadores de frentes, idiomas ou status de monetizacao;
- `free value`, `upgrade path`, `billing`, `ads`, `rollout`, `quality`, `release`.

O catalogo dos 10 sites pode existir, mas deve ser secundario, compacto e orientado a navegacao por tarefa.
