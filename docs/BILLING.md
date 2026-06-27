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
- `billing_webhook_events` define ledger futuro de idempotencia e hash de payload, mas nenhum endpoint publico de webhook foi criado.

Antes de vender qualquer upgrade, ainda faltam conta provider aprovada, KYC, impostos, perfil de pagamentos, termos/cancelamento/reembolso, secrets em cofre, checkout hospedado oficial, assinatura de webhook, replay protection, matriz de dados, exportacao/exclusao e smoke/rollback especificos.

## AI growth monetization recommendations

A Sprint 6.5 pode priorizar pendencias de monetizacao e billing readiness somente com evidencia, impacto, esforco, confianca e risco. O motor nao ativa checkout, payment link, webhook, SDK, provider config, impostos, plano pago, entitlement pago, receita, invoice, refund, dunning ou qualquer mutation em provedor.

Recomendacoes que dependam de KYC, impostos, banco, perfil de pagamentos, aceite juridico, secrets, endpoint publico, politica de cancelamento/reembolso ou cobranca real devem permanecer `human_required`.

## Executive report billing data

A Sprint 6.6 pode exportar somente readiness operacional e estados locais de billing. Itens de billing em relatorios devem marcar dados reais de provider como `delayed` ou `unavailable` enquanto checkout, webhooks, invoices, settlement, taxes, refunds, dunning e revenue imports estiverem desligados.

Relatorios executivos nao ativam checkout, payment links, webhooks, SDK, provider config, impostos, plano pago, entitlement pago, receita, invoice, refund, dunning, e-mail recorrente ou cobranca real.

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
