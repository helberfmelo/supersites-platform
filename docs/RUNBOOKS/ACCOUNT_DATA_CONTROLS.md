# Account Data Controls

Data-base: 2026-06-29

## Escopo

A Sprint 14.1 cria controles autenticados de conta para preparar upgrades pagos sem ativar cobranca real:

- `/admin/account` mostra dados basicos do usuario autenticado, papeis globais/site-scoped, permissoes e pedidos recentes.
- `POST /admin/account/export` baixa um JSON sanitizado da propria conta.
- `POST /admin/account/delete-request` registra pedido de exclusao com status `human_required`.
- `POST /api/v1/account/export` retorna o mesmo contrato sanitizado para clientes autenticados.
- `POST /api/v1/account/delete-request` registra pedido de exclusao via API quando o usuario reconhece que a revisao e manual.

## Contrato de exportacao

O contrato `AccountDataExporter::CONTRACT_VERSION` inclui:

- metadados de exportacao e versao;
- dados basicos da conta (`id`, nome, e-mail, timestamps e verificacao);
- papeis e escopo RBAC global ou por site;
- permissoes resolvidas;
- ultimos pedidos de privacidade;
- limites atuais explicitando que signup publico, exclusao automatica e checkout continuam desligados.

O export nao deve incluir senha, `remember_token`, secrets, tokens de provider, dados bancarios, documentos fiscais, payloads de billing, IPs ou dados de ferramentas.

## Exclusao

Pedidos de exclusao ficam em `user_account_privacy_requests` com:

- `request_type=delete`;
- `status=human_required`;
- `requested_at`;
- metadados minimos do canal.

Nenhuma conta, papel, auditoria, monitor, assinatura, invoice ou dado operacional e apagado automaticamente nesta sprint.

## Revisao humana obrigatoria

Antes de ativar contas pagas em producao, definir e aprovar:

- politica final de privacidade, termos, retencao e exclusao;
- escopo de dados exportaveis por produto;
- processo de verificacao de identidade quando aplicavel;
- SLA de atendimento de pedidos;
- tratamento de auditoria, invoices, logs, chargebacks e obrigacoes fiscais;
- roteiro de backup/restore e retencao legal.

## Validacao

Checklist tecnico para cada mudanca neste fluxo:

1. Rodar testes de API/admin que comprovem export sanitizado e exclusao manual.
2. Confirmar que o usuario permanece existente apos pedido de exclusao.
3. Confirmar audit log para visualizacao, export e pedido de exclusao.
4. Rodar `validate:secrets` e `git diff --check`.
5. Registrar qualquer nova acao irreversivel em `docs/HUMAN_ACTION_REQUIRED.md`.

## Ativacoes proibidas nesta fase

- Signup publico.
- Exclusao automatica.
- Checkout, cobranca, assinatura, refund, dunning ou imposto automatico.
- Webhook real de billing.
- Provider externo ou secret novo.
- Importacao de dados reais de GA4, Search Console, AdSense ou billing.
