# HUMAN_ACTION_REQUIRED

Data-base: 2026-06-26

## Pendencias atuais

| Item | Motivo | Quando desbloqueia |
|---|---|---|
| Registrar dominios definitivos | Compra/decisao de marca e dominio | Antes do lancamento independente de cada site |
| Validar marca dos nomes de trabalho | Risco comercial/juridico | Antes de registrar dominio ou publicar marca definitiva |
| Escolher beneficiario legal AdSense | Identidade, fiscal e conta publisher | Antes de criar/submeter sites ao AdSense |
| Informacoes fiscais/bancarias AdSense | Dados legais e banco | Antes de receber pagamentos |
| PIN postal AdSense | Verificacao fisica | Quando Google solicitar |
| Contas Stripe/Mercado Pago/Paddle | KYC, impostos e termos | Antes de billing real |
| Politicas juridicas finais | Aceite juridico | Antes do go-live publico com coleta de dados/ads |
| Mudanca DNS sem rollback claro | Risco de indisponibilidade | Antes de apontar dominios definitivos |
| Acesso SSH direto a VPS candidata | Chave privada da VPS esta em secrets do GitHub BigShop360 e nao e recuperavel por CLI; chaves locais atuais nao autenticam | Antes de provisionar Redis/filas/workers diretamente a partir desta workstation |
| Aprovar compartilhamento da VPS BigShop360 | Risco operacional para projeto ja em producao | Antes de criar usuarios, portas, Redis ou servicos SuperSites nessa VPS |
| Branch protection no GitHub privado | GitHub retornou HTTP 403 informando que branch protection em repositorio privado exige GitHub Pro ou repositorio publico | Antes de exigir status checks protegidos em `main` |

## Nao bloqueia agora

- Criar estrutura local.
- Criar docs.
- Preparar scripts.
- Construir apps localmente.
- Deploy transitorio em `opentshost.com` apos aprovacao do roadmap e validação tecnica.
- Continuar commits/pushes com quality gate ativo mesmo sem branch protection automatica, ate a pendencia de plano GitHub ser resolvida.
