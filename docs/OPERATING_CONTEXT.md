# Operating Context

Fonte da verdade operacional complementar ao `MEGA_PROMPT_SUPERSITES.md`.

## Diretrizes recebidas em 2026-06-26

- Dominio transitorio do catalogo: `opentshost.com`.
- Hospedagem atual: HostGator/cPanel da conta `opents62`.
- URL de cPanel: registrada apenas no inventario local de credenciais.
- Pasta principal remota desejada: `/home1/opents62/public_html/supersites/`.
- URL publica desejada do catalogo: `https://opentshost.com/`.
- Enquanto os dominios definitivos nao forem definidos, cada site deve ser publicado em subpasta do dominio transitorio.
- Folders remotos de site devem ficar sob `/home1/opents62/public_html/supersites/`.
- O mapeamento publico desejado para cada site e `https://opentshost.com/<pasta_do_site>`.
- Risco tecnico a validar: em HostGator, a raiz publica do dominio principal costuma ser `/home1/opents62/public_html`; para servir arquivos fisicos em `/public_html/supersites/` pela raiz do dominio, sera necessario rewrite, alias, symlink controlado ou ajuste de document root se disponivel.
- Nenhuma credencial deve ser versionada.
- Credenciais uteis recebidas por chat ou encontradas em documentos devem ficar no inventario local ignorado pelo Git.
- Nao alterar projetos de referencia localmente ou em producao.

## Projetos de referencia auditados em modo leitura

- `D:\Projetos\lumora`
- `D:\Projetos\legalchurch`
- `D:\Projetos\provadorvirtual_v2`
- `D:\Projetos\bigshop`
- `D:\Projetos\bigshopv4`
- `D:\Projetos\marcahora_novo`
- `D:\Projetos\bigshop360`

Padroes aproveitados:

- Sprint sempre inicia com leitura obrigatoria, status real e plano de validacao.
- Secrets reais ficam em arquivo local ignorado, GitHub Secrets, cPanel seguro ou cofre.
- Deploy em HostGator exige cuidado com subdiretorio, `APP_URL`, `ASSET_URL`, base path e migrations.
- Publicacao por FTP/SSH deve preservar `.env`, evitar wipe remoto total e executar smoke pos-deploy.
- Commits pequenos, push e monitoramento de deploy sao obrigatorios quando uma sprint for aprovada para execucao.

## Politica de execucao externa

Antes da aprovacao formal do roadmap, executar apenas trabalho local reversivel neste projeto. Nao criar bancos HostGator, crons remotos, repositorios GitHub remotos, DNS, AdSense, Google Cloud, billing ou deploy produtivo.

Depois da aprovacao do roadmap, a execucao deve seguir `docs/RUNBOOKS/SPRINT_EXECUTION.md`.

## HUMAN_ACTION_REQUIRED permanente

Registrar em `docs/HUMAN_ACTION_REQUIRED.md` quando houver:

- compra ou registro de dominio;
- identidade, KYC, impostos, conta bancaria ou PIN;
- aceite juridico em nome do proprietario;
- decisao irreversivel de negocio;
- escolha final de beneficiario legal AdSense;
- criacao/alteracao de perfil de pagamentos;
- mudanca DNS com risco de interromper e-mail/producao sem rollback claro.

