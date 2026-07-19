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

- checkout real para planos pagos/servicos personalizados, payment link manual, assinatura, invoice, refund, customer portal ou entitlement pago por pagamento;
- provedor global/multimoeda definido;
- politica final de servicos personalizados, cancelamento, reembolso, impostos e atendimento.

As credenciais Pagar.me fornecidas pelo owner foram registradas somente no inventario local ignorado `docs/credentials/credentials.local.md`. Segredos reais nao devem aparecer neste roadmap nem em qualquer doc versionado.
As credenciais Stripe live fornecidas pelo owner em 2026-07-02 tambem foram registradas no inventario local ignorado e preparadas como secrets de ambiente. Apos aprovacao explicita posterior, doacao pontual e webhooks Stripe podem ser ligados; revenue import, servicos personalizados, planos pagos e entitlements pagos continuam desligados por flags.

Status em 2026-07-02: a fundacao de Checkout hospedado Stripe foi implementada no Control Plane para doacao, plano pago e servico personalizado. Apos aprovacao explicita do owner, somente doacao pontual via Stripe Checkout passa para go-live controlado; planos pagos, servicos personalizados, assinatura, portal de cliente, invoices, refunds, revenue import e entitlements pagos permanecem fail-closed.

Decisao em 2026-07-03: o owner autorizou usar Stripe em vez de Pagar.me como trilho principal. Pagar.me deixa de ser prioridade de go-live e fica apenas como candidato futuro/fallback BRL/Brasil caso haja uma decisao especifica posterior.

## Decisao operacional proposta

Usar dois trilhos:

1. **Apoio/doacao simples**: botao discreto em todas as paginas, longe de controles/resultados, apontando para uma superficie hospedada de pagamento quando houver aprovacao humana.
2. **Servicos personalizados e upgrades pagos**: fluxo de contato/orcamento primeiro, depois checkout hospedado oficial por provider aprovado. SuperSites nao coleta cartao.

Stripe e o candidato tecnico prioritario para checkout global hospedado, desde que conta live, KYC, impostos, produtos/precos, webhook signing secret, politicas publicas e aprovacao humana estejam concluidos. Pagar.me pode ser retomado futuramente apenas como canal BRL/Brasil se a conta/acquirer, termos, antifraude, PIX/cartao, chargebacks, reservas e limites forem validados.

## HUMAN_ACTION_REQUIRED antes de go-live

- Confirmar beneficiario legal, KYC, impostos, termos Stripe e perfil de recebimento para qualquer canal alem da doacao pontual ja aprovada.
- Definir politica publica de doacao, servicos personalizados, cancelamento, reembolso, chargeback e suporte.
- Definir se doacao e sem recompensa, apoio com reconhecimento, servico sob demanda ou plano pago com entitlement.
- Aprovar provider por canal: Stripe como padrao; Paddle/Mercado Pago/Pagar.me somente se uma decisao posterior exigir.
- Guardar secrets em cofre/ambiente e configurar rotacao.
- Aprovar publicacao de qualquer URL real, widget, QR/PIX, checkout, payment link ou webhook live.

## Etapa 24.1 - Decisao de provider

Objetivo: decidir o provider principal de go-live sem ativar novas cobrancas.

Status em 2026-07-03: concluida como decisao operacional. Stripe e o provider principal para doacao pontual ja aprovada e para futuros planos/servicos quando cada canal tiver produto/preco oficial, politicas publicas, KYC/impostos/termos, smokes de provider, rollback e aprovacao humana. Pagar.me foi removido do trilho ativo e fica apenas como candidato futuro.

Sprints:

1. Registrar decisao Stripe-first.
2. Manter Pagar.me fora do contrato ativo ate haver aprovacao especifica.
3. Manter planos pagos, servicos personalizados, assinaturas, invoices, refunds, customer portal, revenue import e entitlements pagos fail-closed.
4. Documentar que qualquer provider alternativo futuro precisa passar por KYC, termos, impostos, secrets em cofre, webhooks, smokes e aprovacao por canal.

Aceite:

- Stripe segue como provider principal ja governado para doacao pontual.
- Nenhum novo link de pagamento real e publicado.
- `validate:secrets` passa e nenhum segredo e versionado.

## Etapa 24.2 - Botao de apoio em todas as paginas

Objetivo: ter uma experiencia consistente de apoio em todas as rotas sem ativar pagamento real ainda.

Status em 2026-07-02: implementado como CTA visual fail-closed em Hub e nos 10 sites. O botao dourado com icone aparece no header e no footer legal/shell das paginas; os blocos de apoio existentes tambem exibem o CTA. O estado default nao tem `href` para provider real nem cria checkout, e mostra apenas uma mensagem curta ao clique enquanto doacoes reais seguem bloqueadas por `HUMAN_ACTION_REQUIRED`.

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

Status em 2026-07-02: aprovado pelo owner e implementado para Stripe hosted Checkout. O CTA publico chama o control-plane, permite valor editavel com defaults por idioma/moeda (USD 20, BRL 100, EUR 20), cria uma Checkout Session no servidor e redireciona para `checkout.stripe.com`. Cartao e dados de pagamento ficam na Stripe. `success_url` e `cancel_url` usam retorno interno limpo, sem `session_id`, para evitar bloqueio de ModSecurity e reduzir dados em URL. O webhook live foi criado e o signing secret foi guardado somente em ambiente/cofre; o ledger local registra sessoes e eventos por ids/hashes. Nenhum plano pago, servico personalizado ou entitlement e ativado.

Sprints:

1. Usar Stripe hosted Checkout como canal aprovado para doacao pontual.
2. Definir defaults por moeda, limites aceitos pelo servidor e politica de recibo/reembolso.
3. Configurar link hospedado fora do repo; armazenar apenas secret/env/config operacional.
4. Adicionar feature flag por ambiente e por site.
5. Atualizar `SupportMonetizationGoLiveReadiness` para permitir `should_publish_link=true` somente quando todos os gates estiverem prontos.
6. Adicionar smoke especifico que valida presenca do link somente quando flag live estiver ativa e longe de areas sensiveis.

Aceite:

- Doacao real aparece somente apos aprovacao humana explicita registrada em 2026-07-02.
- SuperSites nao recebe dados de cartao.
- Link/checkout pode ser desligado por flags, rollback de frontend ou `php artisan billing:activate-stripe-donations --disable`.

## Etapa 24.4 - Servicos personalizados

Objetivo: permitir venda consultiva sem prometer automacao que ainda nao existe.

Status em 2026-07-19: concluida a camada tecnica independente de provider. O Hub oferece solicitacao localizada por `mailto:` nos cinco idiomas e o Control Plane registra o ciclo manual da ordem sem armazenar contato do solicitante. O painel tambem exibe conciliacao limitada das Checkout Sessions de doacao. Checkout de servico, payment link, planos, invoices, refunds e entitlements permanecem bloqueados ate decisao comercial/juridica e aprovacao humana.

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

Status tecnico: endpoint Stripe criado e testado para plano pago quando `billing_plans.provider_price_reference` tiver Stripe Price oficial e todos os gates do provider estiverem prontos. A mutacao de entitlement por pagamento ainda nao esta ativa.

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

1. Validar oficialmente na conta Stripe: paises/cartoes aceitos, moedas, settlement, antifraude, chargeback, 3DS e limites.
2. Comparar Paddle apenas se for necessario Merchant of Record, impostos internacionais ou assinaturas globais com complexidade fiscal maior.
3. Definir matriz: Stripe unico por padrao; Paddle/Mercado Pago/Pagar.me somente se alguma oferta/pais/moeda exigir.
4. Atualizar termos, privacidade, cookies/analytics, suporte e fiscal conforme o provider escolhido.
5. Fazer sandbox/provider smokes e rollback antes de qualquer producao real.

Aceite:

- Ha decisao documentada de provider por pais/moeda/produto.
- Checkout publico so aparece onde o provider e politicas suportam.
- Relatorios de revenue continuam `unavailable` ate importacao real aprovada.

## Lacunas para o objetivo completo do projeto

Produto:

- AdSense segue em analise; afiliados, planos e billing de servicos continuam em readiness. A doacao pontual Stripe ja esta ativa no escopo aprovado.
- Falta decidir dominios definitivos e root mapping.
- Falta revisar juridicamente privacy/cookies/terms por jurisdicao antes de escala internacional.
- MX e portas TLS da mailbox publica foram validados tecnicamente; autenticacao, entrega real e triagem continuam como acao humana.

Operacao:

- Branch protection/rulesets, backup/restore e retencao de releases ainda sao trilhas operacionais antes de escala.
- Workers/crons/monitoramento recorrente pagos precisam backup, alert policy, antiabuso, retencao e billing.
- Growth loop ainda nao usa providers reais de analytics/search/ads/billing.

Monetizacao:

- O botao de apoio ja cobre as 11 superficies publicas e a conciliacao limitada esta visivel no Control Plane.
- Pagar.me nao e mais requisito de go-live; Stripe e o trilho principal e Pagar.me fica backlog opcional.
- Checkout e webhook de doacao pontual Stripe estao ativos; checkout de servico/plano, tax/refund/cancelamento e entitlements pagos ainda nao estao ativos.
- Para venda global, Stripe deve ser validado como trilho padrao; Paddle fica como comparativo futuro se MoR/tax internacional exigir.

Qualidade publica:

- Crawler final ja fechou 0 gaps em fases anteriores, mas a validacao visual/produto do owner continua sendo o gate pratico.
- Antes de divulgacao publica ampla, executar QA/pre-divulgacao completo sob pedido: crawl, screenshots, Playwright, Lighthouse/PageSpeed, smokes publicos e revisao de copy/legal.
