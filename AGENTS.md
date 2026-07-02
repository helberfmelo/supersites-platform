# PROMPT RAIZ — SUPERSITES

Você é um agente autorizado a desenvolver e operar o portfólio SuperSites.

Antes de executar qualquer tarefa técnica relevante:

1. Consulte `docs/OPERATING_CONTEXT.md`, `docs/RUNBOOKS/SPRINT_EXECUTION.md`, o roadmap ativo e as notas do site/area afetada.
2. Consulte docs adicionais por risco usando `docs/RUNBOOKS/RISK_BASED_REFERENCE_INDEX.md`; nao leia documentos longos por rotina.
3. Verifique o estado real do código e dos ambientes afetados. Enquanto o projeto nao for divulgado publicamente, trate `opentshost.com/supersites` como producao interna de desenvolvimento, com risco publico relaxado.
4. Não exponha nem versione segredos.
5. Execute com autonomia tudo que for técnico e reversível.
6. Para identidade, KYC, impostos, banco, PIN, aceite jurídico, compra não autorizada ou ação irreversível, registre `HUMAN_ACTION_REQUIRED` e continue o restante.
7. Atualize somente os documentos afetados pela entrega. `STATUS.md` e `METRICS.md` devem mudar em marcos, releases relevantes, mudancas operacionais, fechamento de etapa/fase ou quando o dono pedir, nao em toda microcorrecao visual.
8. A funcionalidade gratuita deve resolver a necessidade básica sem cadastro obrigatório.
9. AdSense é a monetização primária; upgrades vendem volume, histórico, automação, monitoramento, API, personalização, colaboração ou ausência de anúncios.
10. Nunca crie conteúdo em massa sem valor, tráfego inválido, incentivo a clique ou posicionamento enganoso de anúncios.

Fluxo apos aprovacao do roadmap: seguir `docs/RUNBOOKS/SPRINT_EXECUTION.md`. Por padrao, execute uma etapa completa com todas as sprints planejadas nela; somente depois faca validacao local minima, commit objetivo, push e, quando houver alvo HostGator afetado por implementacao ou correcao, acione o deploy especifico desse alvo. Nao fazer commit/push/deploy por sprint individual, salvo se o dono pedir ou se ele avisar que a etapa e grande demais para esse fluxo. Quality Gate e Deploy Dry Run nao rodam por push: ficam manuais ou para PR/release/fechamento quando o dono pedir ou o risco justificar. Validacoes profundas de codigo, telas, screenshots, crawler, Lighthouse, Playwright, dry run, smokes publicos e Quality Gate ficam desativadas por padrao e entram somente quando o dono pedir, quando houver segredo/dados/acao irreversivel, quando houver risco tecnico relevante, ou quando o proprio objetivo da etapa for validacao/QA/fechamento.

Segredos reais ficam somente em `docs/credentials/credentials.local.md` ou em cofre/secret manager. Esse arquivo local nunca deve ser commitado.
