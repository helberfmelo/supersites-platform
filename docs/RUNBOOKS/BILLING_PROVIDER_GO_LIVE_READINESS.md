# Billing Provider Go-Live Readiness

Data-base: 2026-06-29

## Objetivo

Preparar Stripe, Mercado Pago e Paddle para revisao humana sem criar checkout, carregar SDK, processar webhook real, importar receita ou ativar cobranca.

## Superficie tecnica

- Endpoint autenticado: `GET /api/v1/billing/go-live-readiness`.
- Permissao exigida: `dashboard.view`.
- Contrato: `2026-06-29.15.3`.
- Servico: `App\Support\Billing\BillingProviderGoLiveReadiness`.
- Dashboard: painel `Billing readiness` mostra providers prontos para ativacao humana, planos pagos prontos, checkout sessions 0, webhooks live 0 e revenue import 0.
- Pacote compartilhado: `@supersites/billing` normaliza provider price references.

## Estados fail-closed

- `provider_activation=false`.
- `side_effects=none`.
- `checkout_sessions_enabled=0`.
- `live_webhooks_enabled=0`.
- `provider_sdk_loaded=0`.
- `revenue_import_enabled=0`.
- `automatic_checkout_enabled=false`.
- `automatic_webhook_processing_enabled=false`.
- `should_create_checkout_session=false`.
- `should_process_live_webhooks=false`.
- `should_import_revenue=false`.

## Checklist antes de checkout real

1. Conta do provider aprovada por pessoa autorizada.
2. KYC, impostos, perfil de pagamentos e termos aceitos.
3. Politicas de preco, trial, cancelamento, reembolso, chargeback e suporte aprovadas.
4. Plano pago com valor, moeda, intervalo, provider e price reference oficiais validados.
5. API keys e webhook secrets em cofre/secret manager, nunca no repositorio.
6. Checkout hospedado oficial configurado com dominios definitivos.
7. Smokes especificos de sandbox/provider documentados.
8. Rollback para desativar checkout e esconder CTAs de pagamento.

## Checklist antes de webhook live

1. Provider aprovado e checkout real liberado.
2. Secret live em cofre e rotacao documentada.
3. Fixtures oficiais por provider validando assinatura e replay.
4. Matriz de dados do payload aprovada, sem armazenar payload bruto desnecessario.
5. Idempotencia, replay protection, reconciliacao e rollback testados.
6. Entitlements pagos sincronizados somente depois de evento verificado.

## Proibido nesta fase sem gate humano

- Criar checkout session, payment link, assinatura, invoice, refund, dunning ou customer portal.
- Carregar SDK Stripe/Mercado Pago/Paddle em superficie publica.
- Processar webhooks reais ou alterar entitlements por pagamento.
- Importar revenue, settlement, impostos, chargebacks ou dados bancarios.
- Versionar API keys, webhook secrets, tokens, price ids privados ou credenciais.
