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

## Segurança

- Nao armazenar cartao.
- Segredos em cofre/secret manager.
- Webhooks com assinatura e replay protection.

## HUMAN_ACTION_REQUIRED

- KYC, impostos, conta bancaria, perfil de pagamentos e aceite juridico.
