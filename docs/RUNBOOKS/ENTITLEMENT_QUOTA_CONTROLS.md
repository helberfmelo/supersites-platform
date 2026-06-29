# Entitlement Quota Controls

Data-base: 2026-06-29

## Escopo

A Sprint 14.2 conecta quotas tecnicas a entitlements locais de billing sem ativar checkout real.

Fontes atuais:

- `billing_plans.slug=free-preview`
- `billing_entitlements.code=monitor-slots`
- `billing_entitlements.code=monitor-types` para NetProbe
- fallback configurado em `config/netprobe.php` quando o plano local nao foi seedado

## Fluxo NetProbe

1. O endpoint autenticado `/api/v1/netprobe/monitors` identifica o site `netprobe-atlas`.
2. `PlanEntitlementResolver` busca o plano `free-preview` com `checkout_enabled=false`.
3. O limite de monitores vem de `monitor-slots`.
4. Tipos permitidos vêm de `monitor-types` ou do fallback `netprobe.quotas.free_preview.allowed_types`.
5. A criacao falha antes de gravar monitor quando o uso atual atinge o limite.
6. A resposta retorna metadados de quota: `billing_plan`, `quota_source`, `max_monitors`, `remaining_monitors`, `allowed_types` e `checkout_enabled`.

## Como alterar limites locais

Alterar somente dados locais ou seeders versionados, mantendo:

- `checkout_enabled=false`;
- `billing_provider_id=null` para `free-preview`;
- `amount_minor=0`;
- `provider_price_reference=null`;
- sem provider SDK ou secrets.

Exemplo de limite permitido em seeder:

```php
$this->upsertEntitlement($plan, 'monitor-slots', 'integer', integerValue: 3);
```

## Validacao

Checklist por sprint:

1. Testar `@supersites/billing` para decisao de quota.
2. Testar API de monitores com quota vinda de `billing_entitlements`.
3. Testar fallback quando billing seed nao existir.
4. Rodar audit admin se o dashboard de billing mudou.
5. Rodar `validate:secrets`, `deploy:dry-run`, `ci:changes` e `git diff --check`.

## Bloqueios

Continuam proibidos nesta fase:

- checkout ou portal de cliente;
- plano pago real;
- provider price id real;
- webhook real;
- cobrança, invoice, refund, dunning ou imposto automatico;
- secrets de provider;
- upgrade automático baseado em pagamento.
