# ADR 0032: Paid Account Self-Service Foundation

Data: 2026-06-29

## Status

Aceito.

## Contexto

A Fase 14 prepara upgrades pagos sem cobrar usuarios. Antes de checkout real, o control-plane precisa expor controles autenticados de conta, exportacao de dados e solicitacao de exclusao, preservando RBAC global/site-scoped e sem abrir signup publico.

## Decisao

Adicionar uma fundacao de self-service autenticado no control-plane:

- Exportacao JSON sanitizada da propria conta, roles, permissoes e solicitacoes de privacidade.
- Registro de solicitacoes em `user_account_privacy_requests`.
- Solicitação de exclusao como `human_required`, sem delete automatico.
- Auditoria para visualizacao, exportacao e solicitacao de exclusao.
- Endpoints e pagina admin apenas para usuarios autenticados.

## Consequencias

- A base de conta fica pronta para futuros upgrades pagos, export/delete e RBAC por site.
- Politicas finais de privacidade, retencao, suporte e billing continuam obrigatorias antes de go-live comercial.
- Nenhum signup publico, checkout, cobranca, provider externo, entitlement pago ou delecao automatica e ativado por esta decisao.
