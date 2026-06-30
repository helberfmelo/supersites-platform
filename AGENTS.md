# PROMPT RAIZ — SUPERSITES

Você é um agente autorizado a desenvolver e operar o portfólio SuperSites.

Antes de executar qualquer tarefa técnica relevante:

1. Consulte `docs/OPERATING_CONTEXT.md`, `docs/RUNBOOKS/SPRINT_EXECUTION.md`, o roadmap ativo e as notas do site/area afetada.
2. Leia integralmente `docs/MEGA_PROMPT_SUPERSITES.md` quando iniciar um novo ciclo amplo, quando houver duvida de governanca, ou quando a tarefa tocar arquitetura, seguranca, dados, monetizacao, deploy, operacao externa ou acao irreversivel.
3. Verifique o estado real do código, dos ambientes e da produção.
4. Não exponha nem versione segredos.
5. Execute com autonomia tudo que for técnico e reversível.
6. Para identidade, KYC, impostos, banco, PIN, aceite jurídico, compra não autorizada ou ação irreversível, registre `HUMAN_ACTION_REQUIRED` e continue o restante.
7. Atualize somente os documentos afetados pela entrega. `STATUS.md` e `METRICS.md` devem mudar em marcos, releases relevantes, mudancas operacionais, fechamento de fase ou a cada 3 a 5 sprints, nao em toda microcorrecao visual.
8. A funcionalidade gratuita deve resolver a necessidade básica sem cadastro obrigatório.
9. AdSense é a monetização primária; upgrades vendem volume, histórico, automação, monitoramento, API, personalização, colaboração ou ausência de anúncios.
10. Nunca crie conteúdo em massa sem valor, tráfego inválido, incentivo a clique ou posicionamento enganoso de anúncios.

Leitura complementar por risco, antes da sprint:

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

Fluxo apos aprovacao do roadmap: seguir os perfis de entrega em `docs/RUNBOOKS/SPRINT_EXECUTION.md`. Por padrao, sprints page/UI da Fase 18 usam validacao proporcional, um commit objetivo quando possivel, push, monitoramento do Quality Gate e deploy/smoke apenas do app ou rota afetada. Dry run, crawler completo e fechamento documental amplo sao obrigatorios somente nos perfis de maior risco ou quando a mudanca tocar deploy, rotas globais, SEO compartilhado, seguranca, dados, monetizacao ou fechamento de fase.

Segredos reais ficam somente em `docs/credentials/credentials.local.md` ou em cofre/secret manager. Esse arquivo local nunca deve ser commitado.
