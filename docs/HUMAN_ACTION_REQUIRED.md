# HUMAN_ACTION_REQUIRED

Data-base: 2026-06-27

## Pendencias atuais

| Item | Motivo | Quando desbloqueia |
|---|---|---|
| Registrar dominios definitivos | Compra/decisao de marca e dominio | Antes do lancamento independente de cada site |
| Validar marca dos nomes de trabalho | Risco comercial/juridico | Antes de registrar dominio ou publicar marca definitiva |
| Escolher beneficiario legal AdSense | Identidade, fiscal e conta publisher | Antes de criar/submeter sites ao AdSense |
| Criar/reutilizar conta AdSense e aceitar termos | Conta publisher, aceite legal e checagem de conta duplicada | Antes de configurar publisher id, adicionar sites, ativar Management API ou publicar `ads.txt` |
| Informacoes fiscais/bancarias AdSense | Dados legais e banco | Antes de receber pagamentos |
| PIN postal AdSense | Verificacao fisica | Quando Google solicitar |
| CMP certificada/TCF para ads reais | Escolha de fornecedor, termos, configuracao legal e compliance regional | Antes de carregar requests reais de ads em regioes que exijam CMP/TCF |
| Acessos Google, GA4, GTM e Search Console | Conta Google, criacao de propriedades/containers, verificacao de dominio e aceite de termos | Antes de carregar tags GA4/GTM ou importar dados Search Console |
| Contas Stripe/Mercado Pago/Paddle | KYC, impostos e termos | Antes de billing real |
| Ativar checkout/webhooks de billing | Contas provider, KYC, impostos, perfil de pagamentos, aceite juridico, API/webhook secrets, politica de cancelamento/reembolso e endpoint publico assinado | Antes de checkout, webhooks reais, assinatura, cobranca, refund, dunning ou entitlement pago |
| Provider externo de IA ou automacao de growth | Termos, custo, base legal, matriz de dados, secrets, revisao de conteudo/SEO/ads/billing e risco de mutacao irreversivel | Antes de chamadas externas de IA, prompts com dados operacionais, publicacao automatica, mudancas SEO/ads/billing, Search Console import ou mutation em provider |
| Relatorios executivos automatizados ou com dados reais de provider | Importacao GA4/Search Console/AdSense/billing, envio recorrente, destinatarios externos, revenue reporting e causalidade exigem matriz de dados, retencao, termos, secrets e revisao humana | Antes de agendar/envio automatico, importar providers, incluir receita real ou publicar qualquer atribuicao causal |
| Politicas juridicas finais | Aceite juridico | Antes do go-live publico com coleta de dados/ads |
| Mudanca DNS sem rollback claro | Risco de indisponibilidade | Antes de apontar dominios definitivos |
| Branch protection no GitHub privado | GitHub retornou HTTP 403 informando que branch protection em repositorio privado exige GitHub Pro ou repositorio publico | Antes de exigir status checks protegidos em `main` |
| InvoiceCraft fiscal/tax templates | Impostos, numeracao fiscal, campos obrigatorios e validade de documento dependem de jurisdicao e aceite juridico/fiscal | Antes de ativar nota/fatura fiscal oficial, calculo automatico de impostos, numeracao fiscal, pagamentos ou recorrencia |
| MailHealth DNSBL/provider policy | Uso de DNSBLs, reputacao, limites comerciais e termos de provedores exigem revisao juridica/comercial antes de operar volume, lote, API ou white-label | Antes de ativar monitoramento pago, relatorios recorrentes, lote, API publica paga ou verificacoes DNSBL amplas |

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
