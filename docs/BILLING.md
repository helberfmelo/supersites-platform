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

## Segurança

- Nao armazenar cartao.
- Segredos em cofre/secret manager.
- Webhooks com assinatura e replay protection.

## HUMAN_ACTION_REQUIRED

- KYC, impostos, conta bancaria, perfil de pagamentos e aceite juridico.
