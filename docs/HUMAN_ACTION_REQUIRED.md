# HUMAN_ACTION_REQUIRED

Data-base: 2026-07-04

## Pendencias atuais

| Item | Motivo | Quando desbloqueia |
|---|---|---|
| Registrar dominios definitivos adicionais | Compra/decisao de marca e dominio por marca/site alem do dominio inicial aprovado | Antes do lancamento independente de cada site fora de `mywebtools.top` |
| Validar marca dos nomes de trabalho | Risco comercial/juridico | Antes de registrar dominio ou publicar marca definitiva |
| Informacoes fiscais AdSense adicionais, se solicitadas | A UI do AdSense em 2026-07-04 informou que pagamentos ja tem as informacoes necessarias, mas formularios fiscais adicionais podem ser exigidos pelo Google antes do primeiro pagamento | Quando Google solicitar ou antes de receber pagamentos |
| PIN postal AdSense | Verificacao fisica | Quando Google solicitar |
| Validar/ajustar CMP por regiao | A CMP do Google foi criada com tres opcoes, mas revisao juridica/local, TCF detalhado e ajustes por regiao continuam decisao humana | Antes de escala publica ampla ou mudanca de consentimento/ads por regiao |
| Ativar ad serving real | Requests reais de ads, Auto Ads/manual placements e receitas dependem de aprovacao do Google e decisao operacional separada | Depois de site aprovado no AdSense, validacao de politicas/consentimento e decisao humana por site |
| PageSpeed API ou Google performance provider | API key, termos, quota, billing/conta Google e definicao de retencao/uso de dados | Antes de usar PageSpeed Insights API, CrUX API ou qualquer provider Google externo para medicao automatizada |
| GTmetrix manual/API performance audit | Conta/API/provider externo, termos, quota/custo e decisao sobre retencao/uso de dados de URLs publicas | Antes de tratar GTmetrix A como evidencia final de pre-divulgacao, automacao recorrente ou relatorio externo |
| Google 2FA, telefone, codigo temporario ou CAPTCHA | Verificacao de login/identidade pode ser exigida pelo Google | Quando solicitado durante setup; CAPTCHA deve ser resolvido manualmente pelo owner |
| Ativar tags/imports Google por site | GA4/GTM/Search Console existem, mas carregar tags GA4/GTM ou importar dados envia dados a provider externo | Depois de consentimento/CMP, matriz de dados, secrets em cofre, smokes e decisao humana por site |
| Billing, cartao, teste pago ou Google Cloud billing | Compra, cobranca ou forma de pagamento nao autorizada para pagar | Se o Google bloquear setup gratuito sem forma de pagamento |
| Contas Stripe/Mercado Pago/Paddle | KYC, impostos, termos e confirmacao de modo/conta de producao | Antes de billing real |
| Ativar Stripe para servicos ou planos pagos | O owner aprovou somente doacao pontual via Stripe em 2026-07-02. Servicos personalizados, planos pagos, assinatura, customer portal, invoices, refunds, dunning, revenue import e entitlements pagos ainda exigem produto/preco oficial, politica de cancelamento/reembolso, smokes de provider, decisao de oferta e aprovacao por canal | Antes de publicar checkout de servico, plano pago, assinatura, invoice, refund, customer portal ou entitlement pago via Stripe |
| Ativar Pagar.me para doacoes, servicos ou planos pagos | O owner forneceu credenciais para inventario local, mas conta, KYC, impostos, termos, perfil de recebimento, politica de reembolso/cancelamento, secrets em cofre, webhooks, testes de sandbox/provider e aprovacao por canal ainda precisam ser concluidos | Antes de publicar qualquer link de pagamento, botao de doacao real, checkout, widget, QR/PIX, cobranca, assinatura, webhook live, invoice, refund ou entitlement pago via Pagar.me |
| Ativar checkout/webhooks de billing | Contas provider, KYC, impostos, perfil de pagamentos, aceite juridico, API/webhook secrets, politica de cancelamento/reembolso e endpoint publico assinado | Antes de checkout, webhooks reais, assinatura, cobranca, refund, dunning ou entitlement pago |
| Ativar go-live de provider de billing por plano | A Sprint 15.3 criou apenas readiness autenticado; checkout sessions, SDKs, payment links, webhooks live, price ids oficiais e revenue import continuam bloqueados | Depois de KYC, impostos, perfil de pagamentos, termos, secrets em cofre, price ids oficiais, smokes de sandbox/provider, rollback e aprovacao humana por provider/plano |
| Politicas finais de conta paga, retencao e exclusao | Termos, privacidade, retencao legal, backup, verificacao de identidade, SLA, tratamento de auditoria/invoices e processo de exclusao/retificacao exigem revisao juridica e operacional | Antes de signup publico, conta paga, exclusao automatica, portal de cliente, historico pago ou atendimento final de direitos do titular |
| Planos pagos e uso medido por quota | Precificacao, impostos, termos, provider price ids, matriz de dados de uso medido, retencao, exportacao/exclusao, antifraude, suporte e revisao de fairness/compliance exigem aprovacao humana | Antes de vender limites maiores, registrar uso comercial, sincronizar entitlements por pagamento ou liberar upgrade automatico |
| Provider externo de IA ou automacao de growth | Termos, custo, base legal, matriz de dados, secrets, revisao de conteudo/SEO/ads/billing e risco de mutacao irreversivel | Antes de chamadas externas de IA, prompts com dados operacionais, publicacao automatica, mudancas SEO/ads/billing, Search Console import ou mutation em provider |
| Relatorios executivos automatizados ou com dados reais de provider | A Sprint 16.4 criou apenas reporting readiness autenticado; importacao GA4/Search Console/AdSense/billing, envio recorrente, destinatarios externos, revenue reporting e causalidade exigem matriz de dados, retencao, termos, secrets e revisao humana | Antes de agendar/envio automatico, importar providers, incluir receita real, enviar a destinatarios externos ou publicar qualquer atribuicao causal |
| Ativar ingestao real do growth loop | A Sprint 16.1 criou apenas readiness local; GA4, Search Console, AdSense e billing imports exigem acesso, tokens em cofre, quotas, matriz de dados, retencao, retry/backoff, smoke/rollback e aprovacao por fonte/site | Antes de qualquer chamada API, worker, cron, importacao recorrente, snapshot real de provider ou uso de dados reais em priorizacao/relatorios |
| Usar dados reais em priorizacao, causalidade ou automacao de growth | A Sprint 16.2 cria apenas snapshot autenticado de prioridade; usar dados reais, declarar antes/depois, criar PR automatico ou aplicar mudancas exige contrato de causalidade, matriz de dados, revisao de privacidade, politicas e aprovacao humana | Antes de qualquer priorizacao baseada em provider real, claim causal, branch/PR automatico, auto-merge, publicacao ou execucao de recomendacao |
| Ativar automacao real de growth via branch/PR | A Sprint 16.3 cria apenas readiness autenticado e fila `pr_review_only`; branch automatico, PR automatico, auto-merge, publicacao, mutacao SEO/ads/billing ou execucao de recomendacao seguem desativados | Depois de politica de review, required checks verdes, rollback, ownership, matriz de dados quando houver provider real e aprovacao humana explicita |
| Doacoes reais por canais nao Stripe | PayPal, PIX, Buy Me a Coffee, Pagar.me, carteiras, QR e outros canais continuam exigindo conta, KYC, impostos, termos, botao/link real, eventual webhook e aprovacao humana por canal | Antes de publicar qualquer link, QR, carteira ou botao de doacao real fora da doacao pontual Stripe aprovada |
| Ativar bloco real de suporte/doacao fora do Stripe aprovado | A aprovacao de 2026-07-02 cobre somente o CTA global de doacao pontual via Stripe hosted Checkout. Afiliados, PIX, Pagar.me, PayPal, widgets externos, promessas de beneficio pago, reconhecimento publico e outros canais exigem aprovacao humana separada | Antes de trocar o bloco por QR/PIX, carteira, widget externo, afiliado, provider adicional ou beneficio comercial |
| Links de afiliado reais | Relacao comercial, termos, divulgacao clara, politica de privacidade, compliance de AdSense/SEO e aprovacao humana | Antes de inserir qualquer link, parametro ou script de afiliado real |
| Ativar go-live de suporte/doacao/afiliado por canal | A Sprint 15.4 criou apenas readiness autenticado; public links, payment widgets, QR/PIX, afiliados rastreaveis e webhooks continuam bloqueados | Depois de KYC, impostos, termos, disclosure localizado, privacidade, compliance AdSense/SEO, URLs/secrets em cofre, smokes e aprovacao humana por canal |
| Politicas juridicas finais | Aceite juridico | Antes do go-live publico com coleta de dados/ads |
| Revisao legal/editorial multilingue benchmark-grade | Conteudo juridico, metodologia, contato, suporte, politicas por idioma e claims publicos exigem revisao humana/editorial antes de AdSense, escala SEO ou monetizacao real | Antes de tratar legal/trust/localizacao como finais para AdSense, afiliados, doacoes reais, billing ou escala internacional |
| Validar Privacy Policy final por jurisdicao | A pagina publica da Sprint 18.15 descreve o estado atual de coleta, cookies, analytics, ads, retencao e direitos, mas revisao juridica/local por jurisdicao ainda depende de decisao humana | Antes de tratar a politica como documento juridico final, ativar coleta ampliada, anuncios reais, contas pagas, billing, afiliados, doacoes reais ou escala internacional |
| Validar Cookie Policy e CMP por regiao | A pagina publica da Sprint 18.16 descreve o estado atual de armazenamento essencial, preferencias, analytics e publicidade inerte, mas a validade juridica por jurisdicao e qualquer CMP/TCF certificada dependem de decisao humana | Antes de ativar cookies nao essenciais em escala, requests reais de ads, tags externas, CMP certificada, analytics externo, `ads.txt`, AdSense, billing, afiliados, doacoes reais ou escala internacional |
| Validar Terms of Use final por jurisdicao | A pagina publica da Sprint 18.17 descreve uso permitido, abuso, limites, resultados informativos, servicos pagos futuros, reembolsos quando aplicavel e responsabilidade, mas validade contratual por jurisdicao depende de revisao juridica humana | Antes de tratar termos como contrato juridico final, ativar contas pagas, checkout, billing, pagamentos, refunds, API paga, monitoramento pago, uploads pagos, afiliados, doacoes reais, SLA ou escala internacional |
| Confirmar caixa publica `contact@opentshost.com` e triagem por assunto | Em 2026-07-19, MX e conectividade TLS em SMTP 465/IMAP 993 passaram no diagnostico tecnico sem credenciais. Existencia autenticada da mailbox, aliases, entrega real, responsavel por resposta, politica de retencao e tratamento de seguranca/legal ainda dependem de conta e operacao humana | Antes de prometer SLA, fluxo juridico final, recebimento de anexos sensiveis ou atendimento operacional em escala |
| Mudanca DNS sem rollback claro | Risco de indisponibilidade | Antes de apontar dominios definitivos |
| CalcHarbor temas financeiros regulados | Calculadoras fiscais, juridicas, de credito/underwriting, investimento personalizado, imposto por jurisdicao ou conselho financeiro exigem revisao legal/editorial e metodologia aprovada | Antes de adicionar calculadoras ou claims regulados alem de planejamento generico com disclaimer |
| InvoiceCraft fiscal/tax templates | Impostos, numeracao fiscal, campos obrigatorios e validade de documento dependem de jurisdicao e aceite juridico/fiscal | Antes de ativar nota/fatura fiscal oficial, calculo automatico de impostos, numeracao fiscal, pagamentos ou recorrencia |
| MailHealth DNSBL/provider policy | Uso de DNSBLs, reputacao, limites comerciais e termos de provedores exigem revisao juridica/comercial antes de operar volume, lote, API ou white-label | Antes de ativar monitoramento pago, relatorios recorrentes, lote, API publica paga ou verificacoes DNSBL amplas |
| PixelBatch/DocShift file AI/OCR/upload providers | Background removal, OCR, table extraction, Office conversion, large file queues, upload API, provider SDKs and account-backed file storage require provider terms, cost approval, legal/privacy review, retention/deletion policy, sandbox/antivirus strategy and billing entitlement gates | Before activating any server-side file upload, AI/OCR provider, conversion provider, batch queue, paid file API or persistent file history |
| Billing webhook real | Stripe/Mercado Pago/Paddle ou outro provider exigem conta aprovada, KYC, impostos, termos, segredo de webhook em cofre, fixtures oficiais, rollback e matriz de dados antes de processar eventos reais | Antes de trocar `dry_run` por processamento real de assinatura, invoice, entitlement, pagamento, refund, dunning ou impostos |
| Monitores pagos reais | NetProbe/MailHealth/SitePulse recorrentes exigem runtime worker validado, backup/restore, politicas de alerta, termos, retencao/exportacao/exclusao, antiabuso, provider-policy review, billing aprovado e smokes de producao | Antes de persistir monitores pagos de MailHealth/SitePulse, ativar alertas reais, historico pago, status page, DMARC recorrente, multi-regiao ou uso medido comercial |

## Resolvido em 2026-06-26

| Item | Resultado |
|---|---|
| Acesso SSH direto a VPS HostGator | Validado via chave local `$HOME/.ssh/id_ed25519_vps_hostgator` para `root@129.121.37.220:22022`. |
| Aprovar compartilhamento da VPS BigShop360 | Aprovado pelo usuario ao autorizar continuidade; Sprint 0.4b provisionou apenas recursos SuperSites isolados e nao alterou paths/servicos do BigShop360. |

## Resolvido em 2026-06-28

| Item | Resultado |
|---|---|
| GitHub Actions bloqueado por billing/spending-limit em repo privado | O usuario autorizou tornar o repositorio publico caso o bloqueio fosse limite de GitHub em repositorio privado. `helberfmelo/supersites-platform` foi alterado para `PUBLIC`; reruns de Quality Gate e Deploy Dry Run voltaram a iniciar jobs. Se o repositorio voltar a privado ou workflows pagos forem exigidos, billing/spending-limit volta a ser uma pendencia humana. |
| Branch protection bloqueada por repo privado | A causa original de plano privado foi removida ao tornar o repositorio publico. A configuracao efetiva de branch protection/ruleset em `main` deve ser tratada como tarefa tecnica separada, com cuidado para nao bloquear deploys de recuperacao. |

## Resolvido em 2026-07-02

| Item | Resultado |
|---|---|
| Ativar doacao pontual via Stripe hosted Checkout | Aprovado explicitamente pelo owner para o CTA global `Doar/Donate`. Escopo liberado: criar Checkout Session no control-plane, redirecionar para Stripe hosted Checkout, receber webhook assinado e registrar ledger local limitado. Escopo ainda bloqueado: planos pagos, servicos personalizados, assinatura, customer portal, invoices, refunds, dunning, revenue import, entitlements pagos e canais nao Stripe. |

## Resolvido ou autorizado em 2026-07-03

| Item | Resultado |
|---|---|
| Dominio inicial de go-live | O owner aprovou `mywebtools.top` e a pasta HostGator `/home1/opents62/mywebtools.top` para o deploy do projeto. |
| Beneficiario/legal owner para setup Google | O owner confirmou autorizacao para aceitar termos Google/Analytics/GTM/Search Console/AdSense pela SuperSites e informou que o fluxo deve usar conta de pessoa fisica autorizada. Dados pessoais ficam somente em inventario local ignorado. |
| Criar plataformas Google gratuitas | O owner autorizou setup assistido de GA4, GTM, Search Console e AdSense, incluindo aceites juridicos desses produtos. Continuam bloqueados pagamentos finais, billing, cartao, teste pago, Google Cloud billing, impostos e PIN postal. |
| Plataformas Google iniciais criadas | GA4, GTM, Search Console e AdSense foram criados/configurados para `mywebtools.top`; Search Console foi verificado; AdSense teve propriedade verificada, `ads.txt` real publicado, revisao solicitada e CMP do Google com tres opcoes salva. |
| Configurar dados bancarios AdSense para recebimento | O owner autorizou em 2026-07-03 o uso dos dados bancarios registrados somente no inventario local ignorado para deixar pagamentos AdSense configurados. Limite operacional: nao finalizar pagamento manual, compra, cobranca, billing pago, cartao, teste pago ou Google Cloud billing. |
| Contestacao da conta Google SuperSites | Apos bloqueio/desativacao da conta Google, o owner concluiu a contestacao em 2026-07-03; em 2026-07-04 a UI da Conta Google e do AdSense voltou a ficar acessivel. |

## Resolvido ou observado em 2026-07-04

| Item | Resultado |
|---|---|
| Acesso da conta Google SuperSites restaurado | A UI da Conta Google voltou a abrir para a conta usada no setup, e a UI do AdSense voltou a ficar acessivel. |
| Informacoes de pagamento AdSense recebidas | A tela inicial do AdSense exibiu `Pagamentos: Ja temos suas informacoes`. Dados sensiveis continuam somente no inventario local ignorado; nenhum pagamento manual, payout, cartao, compra, billing pago ou Google Cloud billing foi finalizado. |
| Etapas iniciais AdSense completas | A tela inicial do AdSense exibiu `Muito bem! Voce concluiu todas as etapas` e `Em breve, seu site estara pronto para exibir anuncios`; isso ainda nao significa aprovacao final nem serving ativo. |

## Nao bloqueia agora

- Criar estrutura local.
- Criar docs.
- Preparar scripts.
- Construir apps localmente.
- Deploy transitorio em `opentshost.com` apos aprovacao do roadmap e validação tecnica.
- Continuar commits/pushes com `Quality Gate` path-aware e monitoramento manual mesmo sem branch protection automatica, ate configurar ruleset/branch protection publico de forma controlada.
