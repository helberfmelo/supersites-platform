# ROADMAP FASE 24 - Monetizacao de suporte, doacoes e billing real

Data-base: 2026-07-02

## Contexto

O SuperSites ja tem:

- ferramentas gratuitas publicas em Hub e 10 sites;
- blocos de apoio e placeholders de monetizacao inertes;
- camada de readiness para billing, AdSense, suporte/doacao e afiliados;
- entitlements locais `free-preview`;
- webhooks de billing somente em dry-run;
- gates humanos para KYC, impostos, banco, termos, doacao real, checkout e afiliados.

O SuperSites ainda nao tem:

- doacao real publicada;
- botao de doacao real em todas as paginas;
- provider Pagar.me integrado ao contrato de billing;
- checkout real, payment link, assinatura, invoice, refund, customer portal ou entitlement pago por pagamento;
- provedor global/multimoeda definido;
- politica final de servicos personalizados, cancelamento, reembolso, impostos e atendimento.

As credenciais Pagar.me fornecidas pelo owner foram registradas somente no inventario local ignorado `docs/credentials/credentials.local.md`. Segredos reais nao devem aparecer neste roadmap nem em qualquer doc versionado.
As credenciais Stripe live fornecidas pelo owner em 2026-07-02 tambem foram registradas no inventario local ignorado e preparadas como secrets de ambiente, mas checkout, webhooks live, revenue import, doacao real e entitlements pagos continuam desligados por flags.

## Decisao operacional proposta

Usar dois trilhos:

1. **Apoio/doacao simples**: botao discreto em todas as paginas, longe de controles/resultados, apontando para uma superficie hospedada de pagamento quando houver aprovacao humana.
2. **Servicos personalizados e upgrades pagos**: fluxo de contato/orcamento primeiro, depois checkout hospedado oficial por provider aprovado. SuperSites nao coleta cartao.

Pagar.me pode ser o primeiro provider para BRL/Brasil e possivelmente cartao internacional quando a conta/acquirer permitirem. Para vender "de qualquer lugar do mundo" de forma robusta, manter Stripe/Paddle como candidatos globais, especialmente para multimoeda, VAT/GST, tax handling, assinatura internacional e Merchant of Record.
Stripe passa a ser o candidato tecnico prioritario para checkout global hospedado, desde que conta live, KYC, impostos, produtos/precos, webhook signing secret, politicas publicas e aprovacao humana estejam concluidos.

## HUMAN_ACTION_REQUIRED antes de go-live

- Confirmar beneficiario legal, KYC, impostos, termos Pagar.me e perfil de recebimento.
- Confirmar se a conta Pagar.me pode vender internacionalmente, moedas aceitas, antifraude, 3DS, chargebacks, reservas e limites.
- Definir politica publica de doacao, servicos personalizados, cancelamento, reembolso, chargeback e suporte.
- Definir se doacao e sem recompensa, apoio com reconhecimento, servico sob demanda ou plano pago com entitlement.
- Aprovar provider por canal: Pagar.me, Stripe, Paddle, Mercado Pago ou combinacao.
- Guardar secrets em cofre/ambiente e configurar rotacao.
- Aprovar publicacao de qualquer URL real, widget, QR/PIX, checkout, payment link ou webhook live.

## Etapa 24.1 - Inventario e decisao de provider

Objetivo: transformar Pagar.me de credencial local em candidato governado sem ativar cobranca.

Sprints:

1. Adicionar `pagarme` ao contrato `@supersites/billing` como provider suportado, ainda fail-closed.
2. Atualizar seeders/readiness do control-plane para mostrar Pagar.me junto de Stripe/Mercado Pago/Paddle.
3. Adicionar campos de readiness especificos: conta, KYC, termos, impostos, payout, API key, webhook secret, checkout/payment-link status, moeda/pais e sandbox/provider smoke.
4. Adicionar testes garantindo que `pagarme` aparece como provider suportado, mas `should_create_checkout_session=false` e `should_process_live_webhooks=false`.
5. Documentar env names/secret names sem valor real.

Aceite:

- Pagar.me aparece no dashboard/readiness sem checkout ativo.
- Nenhum link de pagamento real e publicado.
- `validate:secrets` passa e nenhum segredo e versionado.

## Etapa 24.2 - Botao de apoio em todas as paginas

Objetivo: ter uma experiencia consistente de apoio em todas as rotas sem ativar pagamento real ainda.

Sprints:

1. Criar componente compartilhado `SupportDonationCta` com estados `inactive`, `ready-disabled`, `live`.
2. Inserir o CTA no shell/footer de Hub e dos 10 apps para cobrir home, catalogo, ferramenta, trust/legal e subpaginas geradas.
3. Em ferramentas, posicionar abaixo do resultado/conteudo util e nunca junto a input, botao principal, download, erro ou preview.
4. Localizar EN/PT-BR/ES/FR/DE com copy simples: apoio opcional, ferramenta gratuita primeiro, sem prometer beneficio pago.
5. No estado inerte, manter link para contato/correcao ou explicar que a doacao ainda nao esta ativa.
6. Quando houver destino real aprovado, configurar URL por ambiente/cofre e nunca hardcodear no repo.

Aceite:

- Todas as paginas renderizam o CTA de apoio ou uma variante equivalente no footer.
- Estado default nao tem `href` para provider real.
- Public copy gate continua bloqueando PayPal/Stripe/Pagar.me/payment links reais sem gate.

## Etapa 24.3 - Doacao real hospedada

Objetivo: publicar doacao pontual com minimo risco, sem conta de usuario e sem armazenar pagamento no SuperSites.

Sprints:

1. Escolher provider/canal aprovado: Pagar.me payment link/checkout hospedado para BRL ou provider global alternativo.
2. Definir valores sugeridos por moeda e politica de recibo/reembolso.
3. Configurar link hospedado fora do repo; armazenar apenas secret/env/config operacional.
4. Adicionar feature flag por ambiente e por site.
5. Atualizar `SupportMonetizationGoLiveReadiness` para permitir `should_publish_link=true` somente quando todos os gates estiverem prontos.
6. Adicionar smoke especifico que valida presenca do link somente quando flag live estiver ativa e longe de areas sensiveis.

Aceite:

- Doacao real so aparece apos aprovacao humana explicita.
- SuperSites nao recebe dados de cartao.
- Link pode ser desligado por flag/rollback sem deploy complexo.

## Etapa 24.4 - Servicos personalizados

Objetivo: permitir venda consultiva sem prometer automacao que ainda nao existe.

Sprints:

1. Criar pagina/fluxo "Servicos personalizados" no Hub com formulario ou mailto estruturado primeiro.
2. Definir ofertas iniciais: setup DNS/email, auditoria de site, automacao leve, processamento em lote assistido, relatorios sob demanda.
3. Criar processo manual: contato -> escopo -> proposta -> link de pagamento hospedado -> entrega -> suporte.
4. Adicionar modelo de ordem no control-plane sem processar cartao: status, site, descricao, valor, moeda, provider, link externo sanitizado, data e notas internas.
5. Implementar geracao manual/admin de payment link somente depois de provider aprovado; antes disso, registrar `human_required`.

Aceite:

- Usuario consegue solicitar servico sem pagamento imediato.
- Pagamento real nao nasce automaticamente do formulario publico.
- Dados coletados tem matriz de dados, retencao e politica aprovadas.

## Etapa 24.5 - Upgrades pagos self-service

Objetivo: ativar planos pagos somente quando o produto tiver valor claro e entitlements prontos.

Sprints:

1. Priorizar produtos com maior valor pago: NetProbe, MailHealth e SitePulse para monitoramento/historico/alertas/API; PixelBatch/DocShift para lote/API/arquivos maiores; QRRoute para QR dinamico/analytics/dominio.
2. Definir planos, precos, moedas, quotas, trial, cancelamento e reembolso.
3. Associar provider price ids oficiais por provider e ambiente.
4. Implementar checkout hospedado oficial por provider, sem coleta de cartao no SuperSites.
5. Implementar webhooks live assinados/idempotentes por provider, com ledger, replay protection e rollback.
6. Sincronizar entitlements pagos somente apos evento verificado.

Aceite:

- Plano pago nunca desbloqueia recurso sem pagamento verificado.
- Webhook nao armazena payload bruto sensivel.
- Exportacao/exclusao de conta cobre dados de plano, uso e historico.

## Etapa 24.6 - Go-live global

Objetivo: decidir se Pagar.me basta ou se sera necessario provider global paralelo.

Sprints:

1. Validar oficialmente na conta Pagar.me: paises/cartoes aceitos, moedas, settlement, antifraude, chargeback, 3DS e limites.
2. Comparar Stripe/Paddle para vendas internacionais, impostos, assinatura, MoR, cartoes, carteiras digitais e moedas locais.
3. Definir matriz: Brasil/BRL via Pagar.me, global via Stripe/Paddle, ou provider unico se a conta suportar.
4. Atualizar termos, privacidade, cookies/analytics, suporte e fiscal conforme o provider escolhido.
5. Fazer sandbox/provider smokes e rollback antes de qualquer producao real.

Aceite:

- Ha decisao documentada de provider por pais/moeda/produto.
- Checkout publico so aparece onde o provider e politicas suportam.
- Relatorios de revenue continuam `unavailable` ate importacao real aprovada.

## Lacunas para o objetivo completo do projeto

Produto:

- Ainda falta ativar monetizacao real: AdSense, doacoes, afiliados e billing continuam em readiness.
- Falta decidir dominios definitivos e root mapping.
- Falta revisar juridicamente privacy/cookies/terms por jurisdicao antes de escala internacional.
- Falta validar mailbox publica e triagem de contato.

Operacao:

- Branch protection/rulesets, backup/restore e retencao de releases ainda sao trilhas operacionais antes de escala.
- Workers/crons/monitoramento recorrente pagos precisam backup, alert policy, antiabuso, retencao e billing.
- Growth loop ainda nao usa providers reais de analytics/search/ads/billing.

Monetizacao:

- Botao de apoio deve virar componente/shared shell cobrindo todas as paginas.
- Pagar.me precisa virar provider suportado no contrato interno.
- Checkout real, webhooks live, tax/refund/cancelamento e entitlements pagos ainda nao estao ativos.
- Para venda global, Pagar.me deve ser validado, mas provavelmente precisara coexistir com Stripe/Paddle ou outro provider global.

Qualidade publica:

- Crawler final ja fechou 0 gaps em fases anteriores, mas a validacao visual/produto do owner continua sendo o gate pratico.
- Antes de divulgacao publica ampla, executar QA/pre-divulgacao completo sob pedido: crawl, screenshots, Playwright, Lighthouse/PageSpeed, smokes publicos e revisao de copy/legal.
