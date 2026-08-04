# Leitura obrigatoria - SuperSites

Antes de qualquer tarefa tecnica relevante, leia:

- `D:\Projetos\supersites\AGENTS.md`
- `D:\Projetos\supersites\docs\OPERATING_CONTEXT.md`
- `D:\Projetos\supersites\docs\RUNBOOKS\SPRINT_EXECUTION.md`
- o roadmap ativo indicado em `D:\Projetos\supersites\docs\STATUS.md`
- as notas do site ou area afetada em `D:\Projetos\supersites\docs\SITES\`

Quando a tarefa envolver seguranca, dados, billing, AdSense, SEO tecnico, deploy, provider externo, VPS, analytics, juridico, metricas ou fechamento de fase, consulte primeiro:

- `D:\Projetos\supersites\docs\RUNBOOKS\RISK_BASED_REFERENCE_INDEX.md`

Use o indice para abrir somente as referencias exigidas pelo risco. Nao leia documentos longos por rotina.

## Regras de repositorio

- Trabalhar no clone oficial `D:\Projetos\supersites` e verificar `git status` antes de editar.
- Nao criar clone paralelo, copia do projeto, checkout alternativo ou `git worktree` sem autorizacao explicita do owner.
- Preservar alteracoes locais existentes e nao reverter trabalho do owner.
- Usar os scripts e padroes ja existentes no repositorio.
- Nunca usar projeto de referencia como destino de alteracao.

## Regras operacionais

- Enquanto o projeto nao for divulgado, `opentshost.com/supersites` e `mywebtools.top` sao producao tecnica interna de desenvolvimento, com risco publico relaxado.
- Executar a etapa ativa inteira; depois fazer validacao local proporcional, commit objetivo, push e deploy especifico dos alvos HostGator afetados.
- Nao fazer commit, push ou deploy por sprint individual, salvo pedido do owner ou divisao previamente acordada.
- `Quality Gate`, `Deploy Dry Run`, crawler, Lighthouse, screenshots, Playwright e smokes amplos entram somente quando o owner pedir, quando o objetivo for QA/fechamento ou quando o risco justificar.
- A funcionalidade gratuita deve resolver a necessidade basica sem cadastro obrigatorio.
- AdSense e a monetizacao primaria; anuncios nunca podem prejudicar o fluxo util, induzir clique ou cobrir controles e resultados.

## Segredos e acoes humanas

- Segredos reais ficam somente em `docs/credentials/credentials.local.md` ou em cofre/secret manager. Esse arquivo local nunca deve ser versionado.
- Nunca registrar token, senha, chave, cookie, PIN, dado bancario ou credencial em codigo, log, artefato ou documentacao versionada.
- Identidade, KYC, impostos, banco, PIN, aceite juridico, compra nao autorizada, CAPTCHA e acoes irreversiveis exigem `HUMAN_ACTION_REQUIRED`.
- Submissao de revisao a provider externo, ativacao real de anuncios, mudanca de consentimento/CMP e ad serving devem respeitar o gate humano documentado.

## AdSense - estado atual

- Fonte operacional: `docs/ADSENSE_PLAYBOOK.md` e `docs/RUNBOOKS/ADSENSE_GO_LIVE_READINESS.md`.
- Roadmap corretivo ativo: `docs/ROADMAP_FASE_26_CORRECAO_ADSENSE_BAIXO_VALOR.md`.
- Em 2026-07-27, o AdSense devolveu `mywebtools.top` com `Conteudo de baixo valor`.
- O `ads.txt` publico esta presente e valido; o painel ainda mostrava `Nao encontrado` na ultima atualizacao observada, portanto e necessario aguardar novo rastreamento.
- Nao marcar o problema como corrigido nem pedir nova revisao antes de concluir, publicar e validar a Fase 26.

## Antes de encerrar

- Revisar o diff e executar `git diff --check`.
- Rodar os testes/builds focados indicados pelo risco da mudanca.
- Atualizar somente os documentos afetados pela entrega.
- Atualizar `STATUS.md` e `METRICS.md` apenas em marco, release relevante, mudanca operacional, fechamento de etapa/fase ou quando o owner pedir.
- Informar mudancas, validacoes, riscos restantes, commit, push, deploy e rollback aplicavel.
