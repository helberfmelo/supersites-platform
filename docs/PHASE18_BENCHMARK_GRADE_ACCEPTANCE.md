# Phase 18 Benchmark-Grade Acceptance

Data-base: 2026-06-30

Este checklist define o aceite visual da Fase 18. Por padrao, sprints page/UI usam o perfil P1 de `docs/RUNBOOKS/SPRINT_EXECUTION.md`: validar a rota afetada com profundidade, sem exigir crawler completo, dry run ou fechamento documental amplo em toda microentrega.

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

## Aceite visual obrigatorio para P1

Antes de commit em uma sprint publica page/UI:

- capturar desktop e mobile da rota alterada;
- verificar manualmente os screenshots;
- confirmar que nao ha overflow horizontal;
- confirmar que a primeira dobra resolve uma intencao pratica;
- confirmar que blocos de ads/doacao/suporte aparecem abaixo do valor entregue e continuam inertes;
- confirmar que a rota localizada nao exibe ingles residual indevido;
- atualizar notas do site ou roadmap ativo somente quando houver criterio novo, decisao de produto, pendencia real ou fechamento de lote.

Apos deploy HostGator, a mesma rota deve ser revalidada em producao quando a entrega foi publicada. Screenshot local nao substitui smoke live quando a entrega pretende corrigir percepcao visual benchmark-grade.

## Cadencia e rotas

- A rota canonica da sprint deve ser validada diretamente, com screenshots e smoke no path publico real.
- Paginas de catalogo do Hub, como `/supersites/en/sites/<site>`, devem funcionar como landing publica de descoberta para a familia de ferramentas, nao como ficha interna de produto.
- Links de CTA e rodape precisam apontar para subpaginas/ferramentas publicas reais do site quando existirem; evitar linkar apenas para a home do app se o benchmark espera navegacao profunda.
- Cada sprint deve fechar o ciclo objetivo definido pelo perfil de entrega: implementar, validar, commit/push, monitorar Quality Gate e, quando houver publicacao, monitorar deploy HostGator e smoke publico da rota/app afetado.
- O ciclo deve ser enxuto: usar commits objetivos, evitar fragmentacao burocratica e registrar evidencia detalhada apenas quando houver fechamento de lote/fase ou risco que justifique.
- Se a rota do Hub/catalogo divulgar links profundos para um app estatico, o app tambem deve ser validado na producao real. Se qualquer link retornar release antiga, 404 ou 500, publicar o app estatico no mesmo ciclo e repetir o smoke publico dos links afetados antes de fechar a sprint. Crawler benchmark so entra se a correcao mexer em navegacao, rotas globais ou geracao de SEO.
- Rotas profundas adicionadas por uma sprint precisam ser checadas em producao nos idiomas principais alterados. Nao fechar a sprint enquanto houver 404/500, asset stale ou release antiga servindo conteudo incoerente com o Hub.
- Campos tecnicos de rota e SEO nao podem ser tratados como copy visivel. `path`, `href`, `slug`, `url`, `canonical`, `hreflang`, `locale`, `timeZone` e chaves equivalentes devem permanecer estaveis, sem acentuacao ou traducao; apenas labels, titulos e descricoes devem receber localizacao natural.

## Quando usar crawler ou dry run

- Crawler benchmark quick/full: usar em mudanca de shell global, navegacao, rodape global, sitemap, canonical/hreflang, i18n compartilhado, rota gerada em massa, regressao suspeita ou fechamento de lote/fase.
- Deploy Dry Run: usar quando scripts/workflows de deploy, manifestos, artefatos, base path, secrets, primeiro deploy de app ou rollback mudarem.
- Para copy/layout de uma rota isolada com deploy estavel, usar build/testes do app afetado, screenshots desktop/mobile e smoke publico da rota publicada.

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
