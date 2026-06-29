# Support Monetization Go-Live Readiness

Data-base: 2026-06-29

## Objetivo

Preparar suporte/doacao e afiliados para revisao humana sem publicar link real, QR/PIX, widget, script, webhook, afiliado rastreavel ou pagamento.

## Superficie tecnica

- Endpoint autenticado: `GET /api/v1/monetization/support/go-live-readiness`.
- Permissao exigida: `dashboard.view`.
- Contrato: `2026-06-29.15.4`.
- Tabela local: `support_monetization_channels`.
- Seeder: `SupportMonetizationReadinessSeeder`.
- Servico: `App\Support\Monetization\SupportMonetizationGoLiveReadiness`.
- Dashboard: painel `Support monetization` mostra canais prontos para ativacao humana, donation payments 0, affiliate links 0, public links 0 e widgets 0.
- Pacote compartilhado: `@supersites/ads` normaliza canais `donation`/`affiliate` e sanitiza URLs futuras sem credenciais, query string ou fragmento.

## Estados fail-closed

- `provider_activation=false`.
- `side_effects=none`.
- `public_links_enabled=0`.
- `real_donation_payments_enabled=0`.
- `real_affiliate_links_enabled=0`.
- `widgets_loaded=0`.
- `webhooks_enabled=0`.
- `automatic_publication_enabled=false`.
- `should_publish_link=false`.
- `should_load_widget=false`.
- `should_enable_webhook=false`.
- `should_track_affiliate=false`.

## Checklist antes de doacao real

1. Beneficiario/conta aprovados.
2. KYC, impostos, termos e dados bancarios aprovados.
3. Provedor definido e aceito pelo playbook de privacidade/seguranca.
4. Copy publica revisada em EN/PT-BR/ES/FR/DE.
5. Politica de reembolso/cancelamento quando aplicavel.
6. QR/PIX ou link somente em cofre/configuracao aprovada, nunca versionado.
7. Smokes publicos provando que o link aparece longe de ferramentas, downloads, erros e CTAs sensiveis.

## Checklist antes de afiliado real

1. Relacao comercial e termos do programa aprovados.
2. Disclosure claro e localizado antes do link.
3. Atributos `rel="sponsored nofollow"` e rotulagem editorial aprovados.
4. Politica AdSense/SEO revisada para evitar posicionamento enganoso ou incentivo a clique.
5. URL de afiliado ou parametros ficam fora do repositorio e sem dados pessoais.
6. Analytics nao coleta target completo, query string, parametros de afiliado ou identidade do usuario.

## Proibido nesta fase sem gate humano

- Publicar link PayPal, Stripe, PIX, Mercado Pago, Buy Me a Coffee, Ko-fi, carteira ou checkout.
- Publicar link/parametro/script/widget de afiliado real.
- Inserir QR/PIX ou carteira em HTML gerado.
- Ativar webhook de doacao, revenue import, tracking de afiliado ou provider SDK.
- Versionar URLs reais de afiliado, payment links, wallet ids, tokens ou credenciais.
