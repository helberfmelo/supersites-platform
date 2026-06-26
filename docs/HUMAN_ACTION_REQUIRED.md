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
| Branch protection no GitHub privado | GitHub retornou HTTP 403 informando que branch protection em repositorio privado exige GitHub Pro ou repositorio publico | Antes de exigir status checks protegidos em `main` |

## Resolvido em 2026-06-26

| Item | Resultado |
|---|---|
| Acesso SSH direto a VPS HostGator | Validado via chave local `$HOME/.ssh/id_ed25519_vps_hostgator` para `root@129.121.37.220:22022`. |
| Aprovar compartilhamento da VPS BigShop360 | Aprovado pelo usuario ao autorizar continuidade; Sprint 0.4b provisionou apenas recursos SuperSites isolados e nao alterou paths/servicos do BigShop360. |

## Nao bloqueia agora

- Criar estrutura local.
- Criar docs.
- Preparar scripts.
- Construir apps localmente.
- Deploy transitorio em `opentshost.com` apos aprovacao do roadmap e validação tecnica.
- Continuar commits/pushes com `Quality Gate` path-aware e monitoramento manual mesmo sem branch protection automatica, ate a pendencia de plano GitHub ser resolvida.
