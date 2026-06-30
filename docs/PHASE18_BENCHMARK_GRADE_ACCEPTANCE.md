# Phase 18 Benchmark-Grade Acceptance

Data-base: 2026-06-30

Este checklist define o que significa benchmark-grade na Fase 18. Ele nao obriga validacao visual profunda em toda entrega. Enquanto o projeto nao for divulgado publicamente, o fluxo padrao e implementar a etapa completa, fazer validacao minima e deixar a validacao visual/produto para o dono do projeto, salvo pedido explicito de QA.

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

## Criterios visuais de benchmark

Uma pagina deve buscar estes criterios:

- confirmar que nao ha overflow horizontal;
- confirmar que a primeira dobra resolve uma intencao pratica;
- confirmar que blocos de ads/doacao/suporte aparecem abaixo do valor entregue e continuam inertes;
- confirmar que a rota localizada nao exibe ingles residual indevido;
- atualizar notas do site ou roadmap ativo somente quando houver criterio novo, decisao de produto, pendencia real ou fechamento de lote.

Screenshots, validacao live, Playwright e revisao visual profunda so devem ser feitos quando o dono pedir, quando a etapa for de QA/fechamento/pre-divulgacao ou quando o proprio objetivo da etapa for validar a superficie.

## Cadencia e rotas

- A rota canonica da etapa deve ser implementada de forma direta e orientada a uso pratico.
- Paginas de catalogo do Hub, como `/supersites/en/sites/<site>`, devem funcionar como landing publica de descoberta para a familia de ferramentas, nao como ficha interna de produto.
- Links de CTA e rodape precisam apontar para subpaginas/ferramentas publicas reais do site quando existirem; evitar linkar apenas para a home do app se o benchmark espera navegacao profunda.
- A etapa deve seguir a cadencia de `docs/RUNBOOKS/SPRINT_EXECUTION.md`: implementar todas as sprints da etapa, validacao minima, commit/push e Quality Gate.
- Evidencia detalhada, smoke publico, validacao live e crawler entram somente quando o dono pedir, quando a etapa for publicada com objetivo de QA ou quando houver risco de rotas/deploy/SEO global.
- Se a rota do Hub/catalogo divulgar links profundos para um app estatico, o ideal e manter links reais e estaveis, mas a checagem profunda de producao fica sob demanda ou para etapa de QA/pre-divulgacao.
- Campos tecnicos de rota e SEO nao podem ser tratados como copy visivel. `path`, `href`, `slug`, `url`, `canonical`, `hreflang`, `locale`, `timeZone` e chaves equivalentes devem permanecer estaveis, sem acentuacao ou traducao; apenas labels, titulos e descricoes devem receber localizacao natural.

## Quando usar crawler ou dry run

- Crawler benchmark quick/full: usar somente quando o dono pedir, em QA/pre-divulgacao/fechamento, ou em mudanca ampla de shell global, navegacao, sitemap, canonical/hreflang, i18n compartilhado ou rota gerada em massa.
- Deploy Dry Run: usar somente quando o dono pedir ou quando scripts/workflows de deploy, manifestos, artefatos, base path, secrets, primeiro deploy de app ou rollback mudarem.
- Para copy/layout de uma rota isolada, a validacao padrao e minima; o dono validara o visual depois.

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
