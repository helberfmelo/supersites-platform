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

## Segurança

- Nao armazenar cartao.
- Segredos em cofre/secret manager.
- Webhooks com assinatura e replay protection.

## HUMAN_ACTION_REQUIRED

- KYC, impostos, conta bancaria, perfil de pagamentos e aceite juridico.

