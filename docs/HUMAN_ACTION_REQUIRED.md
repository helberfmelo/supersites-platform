# HUMAN_ACTION_REQUIRED

Data-base: 2026-06-29

## Pendencias atuais

| Item | Motivo | Quando desbloqueia |
|---|---|---|
| Registrar dominios definitivos | Compra/decisao de marca e dominio | Antes do lancamento independente de cada site |
| Validar marca dos nomes de trabalho | Risco comercial/juridico | Antes de registrar dominio ou publicar marca definitiva |
| Escolher beneficiario legal AdSense | Identidade, fiscal e conta publisher | Antes de criar/submeter sites ao AdSense |
| Criar/reutilizar conta AdSense e aceitar termos | Conta publisher, aceite legal e checagem de conta duplicada | Antes de configurar publisher id, adicionar sites, ativar Management API ou publicar `ads.txt` |
| Informacoes fiscais/bancarias AdSense | Dados legais e banco | Antes de receber pagamentos |
| PIN postal AdSense | Verificacao fisica | Quando Google solicitar |
| CMP certificada/TCF para ads reais | Escolha de fornecedor, termos, configuracao legal e compliance regional | Antes de carregar requests reais de ads em regioes que exijam CMP/TCF |
| Publicar `ads.txt` e submeter sites ao AdSense | A Sprint 15.1 criou apenas preview autenticado; publicacao de arquivo publico, revisao por site e ad serving sao acoes de provider/monetizacao | Depois de conta aprovada, publisher id real validado, dominios definitivos, politicas/consentimento/smokes prontos e decisao humana por site |
| PageSpeed API ou Google performance provider | API key, termos, quota, billing/conta Google e definicao de retencao/uso de dados | Antes de usar PageSpeed Insights API, CrUX API ou qualquer provider Google externo para medicao automatizada |
| Acessos Google, GA4, GTM e Search Console | Conta Google, criacao de propriedades/containers, verificacao de dominio e aceite de termos | Antes de carregar tags GA4/GTM ou importar dados Search Console |
| Ativar tags/imports Google por site | A Sprint 15.2 criou apenas readiness autenticado; carregar scripts GA4/GTM ou importar Search Console envia dados a provider externo | Depois de acesso Google, dominio verificado, consentimento/CMP, matriz de dados, secrets em cofre, smokes e decisao humana por site |
| Contas Stripe/Mercado Pago/Paddle | KYC, impostos e termos | Antes de billing real |
| Ativar checkout/webhooks de billing | Contas provider, KYC, impostos, perfil de pagamentos, aceite juridico, API/webhook secrets, politica de cancelamento/reembolso e endpoint publico assinado | Antes de checkout, webhooks reais, assinatura, cobranca, refund, dunning ou entitlement pago |
| Ativar go-live de provider de billing por plano | A Sprint 15.3 criou apenas readiness autenticado; checkout sessions, SDKs, payment links, webhooks live, price ids oficiais e revenue import continuam bloqueados | Depois de KYC, impostos, perfil de pagamentos, termos, secrets em cofre, price ids oficiais, smokes de sandbox/provider, rollback e aprovacao humana por provider/plano |
| Politicas finais de conta paga, retencao e exclusao | Termos, privacidade, retencao legal, backup, verificacao de identidade, SLA, tratamento de auditoria/invoices e processo de exclusao/retificacao exigem revisao juridica e operacional | Antes de signup publico, conta paga, exclusao automatica, portal de cliente, historico pago ou atendimento final de direitos do titular |
| Planos pagos e uso medido por quota | Precificacao, impostos, termos, provider price ids, matriz de dados de uso medido, retencao, exportacao/exclusao, antifraude, suporte e revisao de fairness/compliance exigem aprovacao humana | Antes de vender limites maiores, registrar uso comercial, sincronizar entitlements por pagamento ou liberar upgrade automatico |
| Provider externo de IA ou automacao de growth | Termos, custo, base legal, matriz de dados, secrets, revisao de conteudo/SEO/ads/billing e risco de mutacao irreversivel | Antes de chamadas externas de IA, prompts com dados operacionais, publicacao automatica, mudancas SEO/ads/billing, Search Console import ou mutation em provider |
| Relatorios executivos automatizados ou com dados reais de provider | A Sprint 16.4 criou apenas reporting readiness autenticado; importacao GA4/Search Console/AdSense/billing, envio recorrente, destinatarios externos, revenue reporting e causalidade exigem matriz de dados, retencao, termos, secrets e revisao humana | Antes de agendar/envio automatico, importar providers, incluir receita real, enviar a destinatarios externos ou publicar qualquer atribuicao causal |
| Ativar ingestao real do growth loop | A Sprint 16.1 criou apenas readiness local; GA4, Search Console, AdSense e billing imports exigem acesso, tokens em cofre, quotas, matriz de dados, retencao, retry/backoff, smoke/rollback e aprovacao por fonte/site | Antes de qualquer chamada API, worker, cron, importacao recorrente, snapshot real de provider ou uso de dados reais em priorizacao/relatorios |
| Usar dados reais em priorizacao, causalidade ou automacao de growth | A Sprint 16.2 cria apenas snapshot autenticado de prioridade; usar dados reais, declarar antes/depois, criar PR automatico ou aplicar mudancas exige contrato de causalidade, matriz de dados, revisao de privacidade, politicas e aprovacao humana | Antes de qualquer priorizacao baseada em provider real, claim causal, branch/PR automatico, auto-merge, publicacao ou execucao de recomendacao |
| Ativar automacao real de growth via branch/PR | A Sprint 16.3 cria apenas readiness autenticado e fila `pr_review_only`; branch automatico, PR automatico, auto-merge, publicacao, mutacao SEO/ads/billing ou execucao de recomendacao seguem desativados | Depois de politica de review, required checks verdes, rollback, ownership, matriz de dados quando houver provider real e aprovacao humana explicita |
| Doacoes reais | PayPal/Stripe/PIX/Buy Me a Coffee, KYC, impostos, termos, conta bancaria, botao/link real e eventual webhook exigem aprovacao humana | Antes de publicar qualquer link ou botao de doacao que aceite pagamento real |
| Ativar bloco real de suporte/doacao nos sites | A Sprint 9.4 deixou o bloco de apoio apenas informativo e inerte; beneficiario, provedor, KYC, impostos, termos, atendimento, privacidade, cancelamento/reembolso quando aplicavel e copy publica exigem aprovacao humana | Antes de trocar o bloco inerte por link, botao, QR/PIX, checkout, carteira, webhook, widget ou provider real |
| Links de afiliado reais | Relacao comercial, termos, divulgacao clara, politica de privacidade, compliance de AdSense/SEO e aprovacao humana | Antes de inserir qualquer link, parametro ou script de afiliado real |
| Ativar go-live de suporte/doacao/afiliado por canal | A Sprint 15.4 criou apenas readiness autenticado; public links, payment widgets, QR/PIX, afiliados rastreaveis e webhooks continuam bloqueados | Depois de KYC, impostos, termos, disclosure localizado, privacidade, compliance AdSense/SEO, URLs/secrets em cofre, smokes e aprovacao humana por canal |
| Politicas juridicas finais | Aceite juridico | Antes do go-live publico com coleta de dados/ads |
| Revisao legal/editorial multilingue benchmark-grade | Conteudo juridico, metodologia, contato, suporte, politicas por idioma e claims publicos exigem revisao humana/editorial antes de AdSense, escala SEO ou monetizacao real | Antes de tratar legal/trust/localizacao como finais para AdSense, afiliados, doacoes reais, billing ou escala internacional |
| Validar Privacy Policy final por jurisdicao | A pagina publica da Sprint 18.15 descreve o estado atual de coleta, cookies, analytics, ads, retencao e direitos, mas revisao juridica/local por jurisdicao ainda depende de decisao humana | Antes de tratar a politica como documento juridico final, ativar coleta ampliada, anuncios reais, contas pagas, billing, afiliados, doacoes reais ou escala internacional |
| Confirmar caixa publica `contact@opentshost.com` e triagem por assunto | Criacao/validacao de mailbox, aliases, entrega, responsavel por resposta, politica de retencao e tratamento de seguranca/legal dependem de conta e operacao humana | Antes de prometer SLA, fluxo juridico final, recebimento de anexos sensiveis ou atendimento operacional em escala |
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

## Nao bloqueia agora

- Criar estrutura local.
- Criar docs.
- Preparar scripts.
- Construir apps localmente.
- Deploy transitorio em `opentshost.com` apos aprovacao do roadmap e validação tecnica.
- Continuar commits/pushes com `Quality Gate` path-aware e monitoramento manual mesmo sem branch protection automatica, ate configurar ruleset/branch protection publico de forma controlada.
