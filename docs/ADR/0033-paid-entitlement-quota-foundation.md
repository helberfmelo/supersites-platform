# ADR 0033 - Paid Entitlement Quota Foundation

Data: 2026-06-29

## Status

Accepted.

## Contexto

A Fase 14 precisa preparar upgrades pagos sem ativar checkout, provider externo, secrets reais ou cobranca. O control-plane ja possuia `billing_plans` e `billing_entitlements`, mas o primeiro enforcement de quota dos monitores NetProbe ainda lia somente `config('netprobe.quotas.free_preview')`.

## Decisao

Usar `billing_entitlements` como fonte local preferencial para limites de plano `free-preview`, mantendo fallback explicito para configuracao quando o seed de billing nao existir.

Na Sprint 14.2:

- o seeder de billing adiciona `monitor-slots` para NetProbe, MailHealth e SitePulse;
- o seeder adiciona `monitor-types` especifico para NetProbe;
- `PlanEntitlementResolver` resolve a quota de monitores a partir do plano local `free-preview`;
- os endpoints autenticados de monitores NetProbe reportam `billing_plan`, `quota_source`, `max_monitors`, `remaining_monitors`, `allowed_types` e `checkout_enabled`;
- `@supersites/billing` passa a expor uma decisao deterministica de quota.

## Consequencias

- Quotas ficam editaveis por plano local sem checkout real.
- Ambientes sem seed de billing continuam funcionais via fallback configurado e declarado.
- O endpoint continua bloqueando excesso de monitores antes de criar dados operacionais.
- Nao ha provider SDK, checkout, assinatura, invoice, webhook real, entitlement pago, cobranca ou segredo novo.

## Gates

Planos pagos reais, upgrade comercial, uso medido, portal do cliente e webhooks dependem de `HUMAN_ACTION_REQUIRED`, KYC, impostos, conta bancaria, termos, secrets em cofre, politicas de retencao/exclusao e smoke/rollback especificos.
