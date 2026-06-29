# Billing

## Decisao inicial

Criar camada de billing desacoplada de provedor. Stripe, Mercado Pago e Paddle serao avaliados conforme conta, pais, custos, impostos e KYC.

## Recursos obrigatorios

- Produtos, planos e precos.
- Assinaturas, trials, creditos e uso medido.
- Coupons, add-ons e entitlements.
- Checkout hospedado ou componentes oficiais.
- Webhooks assinados e idempotentes.
- Invoices, refunds, chargebacks e dunning.
- Auditoria e limites por plano.

## NetProbe preview

A Sprint 2.6 criou apenas quotas internas `free_preview` para monitores NetProbe, sem checkout, cobranca, assinatura, entitlement pago ou provedor externo ativo.

Antes de vender monitores reais, implementar billing/entitlements, termos, cancelamento, exportacao/exclusao de conta e gates humanos de KYC/impostos/conta bancaria.

Sprint 2.8 publica somente a API publica necessaria para consultas gratuitas do NetProbe. O deploy nao ativa checkout, entitlement pago, cobranca, webhook externo ou planos comerciais.

## DevUtility Lab preview

A Sprint 3.2 criou apenas ferramentas gratuitas client-side, sem checkout, cobranca, assinatura, entitlement pago, provedor externo ativo, historico privado, workspaces, lote, arquivos maiores ou API.

Antes de vender historico privado, workspaces, processamento em lote, arquivos maiores ou API, implementar billing/entitlements, termos, matriz de dados, retencao, exportacao/exclusao de conta e gates humanos de KYC/impostos/conta bancaria.

## TimeNexus preview

A Sprint 3.3 criou apenas ferramentas gratuitas client-side, sem checkout, cobranca, assinatura, entitlement pago, provedor externo ativo, widgets, API, presets ou historico.

Antes de vender widgets, API, presets ou historico, implementar billing/entitlements, termos, matriz de dados, retencao, exportacao/exclusao de conta e gates humanos de KYC/impostos/conta bancaria.

## QRRoute preview

A Sprint 4.1 criou apenas ferramentas gratuitas client-side e fundacao testada de redirect service, sem checkout, cobranca, assinatura, entitlement pago, provedor externo ativo, QR dinamico publico, short links publicos, scan analytics, dominios proprios, lote ou API comercial.

Antes de vender QR dinamico, short links, analytics, dominio proprio, lotes, equipes ou API, implementar billing/entitlements, termos, matriz de dados, retencao, exportacao/exclusao de conta, workflow antiabuso e gates humanos de KYC/impostos/conta bancaria.

## InvoiceCraft preview

A Sprint 4.2 criou apenas builders gratuitos client-side para fatura, orcamento e recibo com PDF local, sem checkout, cobranca, assinatura, entitlement pago, provedor externo ativo, clientes/produtos salvos, recorrencia, branding, equipe, historico ou pagamentos.

Antes de vender clientes/produtos salvos, recorrencia, branding, equipes, pagamentos, historico ou API, implementar billing/entitlements, termos, matriz de dados, retencao, exportacao/exclusao de conta e gates humanos de KYC/impostos/conta bancaria. Impostos oficiais e numeracao fiscal exigem `HUMAN_ACTION_REQUIRED`.

## MailHealth preview

A Sprint 4.3 criou apenas checks gratuitos de SPF, DKIM, DMARC, MX, blacklist, SMTP e headers, sem checkout, cobranca, assinatura, entitlement pago, provedor externo ativo, monitoramento recorrente, alertas, relatorios DMARC, lote, API paga, white-label ou historico salvo.

Antes de vender monitoramento, alertas, relatorios DMARC, lote, API, white-label, equipes ou historico, implementar billing/entitlements, termos, matriz de dados, retencao, exportacao/exclusao de conta, provider-policy review para DNSBL/SMTP e gates humanos de KYC/impostos/conta bancaria.

## SitePulse Lab preview

A Sprint 4.4 criou apenas checks gratuitos pontuais de status, redirects, headers, robots, sitemap, TTFB e snapshot de performance, sem checkout, cobranca, assinatura, entitlement pago, provedor externo ativo, uptime recorrente, incidentes, status page, alertas, historico, multi-regiao ou API paga.

Antes de vender uptime, incidentes, status page, alertas, historico, multi-regiao, API, white-label, equipes ou branding, implementar billing/entitlements, termos, matriz de dados, retencao, exportacao/exclusao de conta, antiabuso, provider-policy review e gates humanos de KYC/impostos/conta bancaria.

## PixelBatch preview

A Sprint 5.1 criou apenas ferramentas gratuitas client-side para imagem unica, sem checkout, cobranca, assinatura, entitlement pago, provedor externo ativo, batch, pastas, API, integracoes, alta resolucao, IA, historico salvo ou upload endpoint.

Antes de vender batch, pastas, arquivos maiores, presets salvos, API, integracoes, alta resolucao, AI/background removal, equipes ou historico, implementar billing/entitlements, termos, matriz de dados, quotas, upload validation, sandbox/antivirus quando aplicavel, retencao/limpeza, exportacao/exclusao de conta, provider review e gates humanos de KYC/impostos/conta bancaria.

## DocShift preview

A Sprint 5.2 criou apenas ferramentas gratuitas client-side para PDF pequeno e conversao simples, sem checkout, cobranca, assinatura, entitlement pago, provedor externo ativo, batch, arquivos maiores, OCR, API, equipes, historico salvo ou upload endpoint.

Antes de vender lote, arquivos maiores, OCR, conversoes DOCX/imagem, API, equipes, branding, historico ou automacoes, implementar billing/entitlements, termos, matriz de dados, quotas, upload validation, sandbox/antivirus quando aplicavel, retencao/limpeza, exportacao/exclusao de conta, provider review e gates humanos de KYC/impostos/conta bancaria.

## AdSense account readiness

A Sprint 6.3 prepara apenas monetizacao por ads como readiness operacional, sem checkout, cobranca, assinatura, billing provider, conta AdSense ativa, pagamento, imposto, banco, PIN, site review ou receita real.

Qualquer receita AdSense futura exige beneficiario legal, fiscal, perfil de pagamentos, banco, PIN quando solicitado, termos aceitos, conta publisher aprovada, sites revisados, politicas, consentimento e documentacao de moeda/impostos antes de aparecer em relatorios ou entitlement comercial.

## Billing foundation

A Sprint 6.4 cria a fundacao de billing sem ativar cobranca real:

- `@supersites/billing` cobre Stripe, Mercado Pago e Paddle como identificadores de provider, com gates fail-closed para checkout e webhooks.
- `billing_providers` registra readiness operacional de conta, KYC, termos, impostos, perfil de pagamento, API key, webhook secret e endpoint aprovado.
- `billing_plans` e `billing_entitlements` seedam somente planos locais `free-preview` para os sites publicos, sem provider price id, checkout ou upgrade pago.
- `billing_webhook_events` define ledger de idempotencia e hash de payload para webhook dry-run; webhooks reais continuam desligados.

Antes de vender qualquer upgrade, ainda faltam conta provider aprovada, KYC, impostos, perfil de pagamentos, termos/cancelamento/reembolso, secrets em cofre, checkout hospedado oficial, assinatura de webhook, replay protection, matriz de dados, exportacao/exclusao e smoke/rollback especificos.

## Paid account controls

A Sprint 14.1 cria somente a fundacao autenticada de conta antes de upgrades pagos:

- usuarios autenticados podem baixar export sanitizado da propria conta;
- usuarios autenticados podem registrar pedido de exclusao com status `human_required`;
- RBAC global/site-scoped aparece no export e no painel de conta;
- auditoria registra visualizacao, exportacao e pedido de exclusao.

Isto nao ativa signup publico, checkout, assinatura, cobranca, entitlement pago, provider SDK, webhook real, invoice, refund, dunning, imposto automatico, payment link, portal de cliente ou exclusao automatica.

Antes de vender qualquer upgrade, ainda faltam entitlements/quotas por plano, termos finais, politica de privacidade/retencao/exclusao, processo de verificacao quando aplicavel, KYC, impostos, conta bancaria, perfil de pagamentos, secrets em cofre e smoke/rollback de billing.

## Entitlement quota controls

A Sprint 14.2 cria enforcement de quota por entitlement local, ainda sem cobranca real:

- `monitor-slots` limita monitores para planos `free-preview` de NetProbe, MailHealth e SitePulse.
- `monitor-types` limita tipos de monitor de NetProbe, MailHealth e SitePulse.
- `PlanEntitlementResolver` consulta `billing_entitlements` e declara fallback configurado quando o seed local nao existe.
- O endpoint de monitores NetProbe bloqueia criacao acima do limite antes de gravar dados.
- O dashboard de billing exibe limites resumidos por plano local.

Isto nao ativa plano pago, checkout, assinatura, provider price id, provider SDK, webhook real, uso medido comercial, invoice, refund, dunning, imposto automatico, portal de cliente ou secret novo.

Antes de vender limites maiores, ainda faltam provider aprovado, KYC, impostos, termos/cancelamento/reembolso, secrets em cofre, assinatura de webhook, matriz de dados de uso medido, exportacao/exclusao e smoke/rollback especificos.

## Webhook dry-run foundation

A Sprint 14.3 cria somente o receiver de webhook assinado em modo dry-run:

- `POST /api/v1/billing/webhooks/{provider}` aceita `stripe`, `mercado_pago` e `paddle`.
- A assinatura usa `X-Supersites-Webhook-Timestamp` e `X-Supersites-Webhook-Signature` no formato `sha256=<hmac>`.
- O dry-run fica desligado por padrao e exige `BILLING_WEBHOOK_DRY_RUN_ENABLED=true` e segredo de teste via ambiente/cofre.
- Eventos aceitos gravam apenas provider, id externo, tipo, idempotency key, status de assinatura, status `dry_run`, hash do payload e timestamps.
- Replay com mesmo payload e event id e idempotente; replay com hash diferente e rejeitado.

Isto nao ativa provider real, SDK, checkout, assinatura, pagamento, invoice, refund, dunning, imposto automatico, customer portal, alteracao de entitlement, revenue import, webhook real ou secret versionado.

Antes de processar webhooks reais, ainda faltam provider aprovado, secrets em cofre, fixtures oficiais de assinatura por provedor, replay/rollback operacional, matriz de dados de payload, termos/cancelamento/reembolso, KYC, impostos e smoke especifico de provider.

## Paid monitor preview

A Sprint 14.4 cria preview autenticado de monitores para NetProbe, MailHealth e SitePulse, ainda sem monetizacao real:

- `GET /api/v1/monitoring/previews` mostra catalogo, quotas, tipos permitidos e estados desligados.
- `POST /api/v1/monitoring/previews` valida target, tipo e quota e retorna simulacao `preview_only`.
- `monitor-types` passa a cobrir `dns/ssl/domain` para NetProbe, `dns/blacklist/smtp` para MailHealth e `status/headers/robots/sitemap` para SitePulse.
- O preview retorna `persisted=false`, `queued=false`, `worker_enabled=false`, `alert_delivery_enabled=false` e `checkout_enabled=false`.
- Auditoria grava somente hash do target.

Isto nao ativa checkout, plano pago, assinatura, worker recorrente, historico pago, alertas reais, status page, DMARC recorrente, invoice, uso medido comercial, provider SDK, webhook real ou billing provider.

Antes de vender monitores, ainda faltam runtime/worker, backup/restore, politica de alerta, termos, retencao/exportacao/exclusao, provider-policy review, antiabuso, billing real e smokes de producao.

## Billing provider go-live readiness

A Sprint 15.3 cria somente readiness autenticado para go-live de Stripe, Mercado Pago e Paddle:

- `GET /api/v1/billing/go-live-readiness` fica atras de auth e `dashboard.view`.
- `BillingProviderGoLiveReadiness` valida registros de provider, KYC, impostos, termos, perfil de pagamentos, API key, webhook secret, endpoint, flags de checkout/webhook e mapeamentos de plano pago.
- O dashboard mostra providers e planos pagos prontos para ativacao humana.
- `@supersites/billing` normaliza provider price references para futuras associacoes de preco.

Isto nao ativa checkout, payment link, provider SDK, assinatura, cobranca, invoice, refund, dunning, imposto automatico, customer portal, webhook live, revenue import, alteracao de entitlement por pagamento, secret real ou cobranca real.

Antes de go-live real, ainda faltam conta provider aprovada, KYC, impostos, perfil de pagamentos, aceite juridico, politicas de cancelamento/reembolso/chargeback, price ids oficiais, secrets em cofre, fixtures oficiais de assinatura, smokes de sandbox/provider, rollback, matriz de dados e aprovacao humana por provider/plano.

## AI growth monetization recommendations

A Sprint 6.5 pode priorizar pendencias de monetizacao e billing readiness somente com evidencia, impacto, esforco, confianca e risco. O motor nao ativa checkout, payment link, webhook, SDK, provider config, impostos, plano pago, entitlement pago, receita, invoice, refund, dunning ou qualquer mutation em provedor.

Recomendacoes que dependam de KYC, impostos, banco, perfil de pagamentos, aceite juridico, secrets, endpoint publico, politica de cancelamento/reembolso ou cobranca real devem permanecer `human_required`.

## Executive report billing data

A Sprint 6.6 pode exportar somente readiness operacional e estados locais de billing. Itens de billing em relatorios devem marcar dados reais de provider como `delayed` ou `unavailable` enquanto checkout, webhooks, invoices, settlement, taxes, refunds, dunning e revenue imports estiverem desligados.

Relatorios executivos nao ativam checkout, payment links, webhooks, SDK, provider config, impostos, plano pago, entitlement pago, receita, invoice, refund, dunning, e-mail recorrente ou cobranca real.

Sprint 16.4 adiciona reporting readiness apenas para revisao. Mesmo se `growth_provider_ingestions` indicar dado provider futuro como `finalized`, `should_import_provider_data=false`, `revenue_reporting_enabled=false`, `should_send_email=false` e `should_infer_causality=false` continuam obrigatorios ate billing real, matriz de dados, retencao, cofre e aprovacao humana estarem completos.

## Provider/Growth readiness smoke

A Sprint 17.1 adiciona `pnpm ops:provider-growth-readiness-smoke` para validar em teste que billing go-live, support monetization e growth reporting continuam fail-closed em conjunto.

O smoke nao cria checkout, payment link, provider SDK, webhook real, assinatura, invoice, cobranca, revenue import, entitlement por pagamento, doacao, afiliado ou secret. Qualquer ativacao real continua dependente de KYC, impostos, termos, cofre, matriz de dados, smokes especificos e aprovacao humana.

## Benchmark monetization backlog

A Sprint 7.2 pode registrar oportunidades de monetizacao, doacao, afiliados e upgrade pago somente como backlog local evidenciado.

`benchmark_opportunities` deve manter itens dependentes de KYC, impostos, banco, aceite juridico, provider account, payment link, link de doacao real, afiliado real, checkout, webhook, plano pago ou entitlement pago como `human_required`.

O dashboard de benchmark nao ativa checkout, SDK, payment link, webhook, doacao, afiliado, cobranca, receita, plano pago, entitlement pago, imposto, invoice, refund ou dunning.

## Segurança

- Nao armazenar cartao.
- Segredos em cofre/secret manager.
- Webhooks com assinatura e replay protection.

## HUMAN_ACTION_REQUIRED

- KYC, impostos, conta bancaria, perfil de pagamentos e aceite juridico.
