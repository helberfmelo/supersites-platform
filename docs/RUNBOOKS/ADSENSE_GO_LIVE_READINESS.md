# AdSense Go-Live Readiness

Data-base: 2026-06-29

## Objetivo

Preparar a ativacao AdSense sem executar nenhuma acao de provider automaticamente. Este runbook cobre somente leitura autenticada, checklist de conta, preview de `ads.txt` e readiness por site.

## Superficie tecnica

- Endpoint autenticado: `GET /api/v1/adsense/go-live-readiness`.
- Permissao exigida: `dashboard.view`.
- Contrato: `2026-06-29.15.1`.
- Servico: `App\Support\AdSense\AdSenseGoLiveReadiness`.
- Dashboard: painel `AdSense readiness` mostra go-live readiness, preview de `ads.txt`, sites prontos para revisao humana e submissao automatica desligada.
- Pacote compartilhado: `@supersites/ads` exporta `buildGoogleAdsTxtLine`.

## Estados fail-closed

- `provider_activation=false`.
- `side_effects=none`.
- `public_file_published=false`.
- `automatic_submission_enabled=false`.
- `automatic_ad_serving_enabled=false`.
- `preview_line=null` enquanto a conta publisher nao estiver pronta ou o publisher id for invalido.

## Checklist antes de publicar ads.txt

1. Beneficiario legal aprovado.
2. Conta AdSense existente/nova validada e sem duplicidade.
3. Termos aceitos por pessoa autorizada.
4. Perfil fiscal completo.
5. Perfil de pagamento completo.
6. Banco verificado.
7. PIN postal verificado quando solicitado.
8. `publisher_id` real no formato `ca-pub-0000000000000000` cadastrado fora do repositorio.
9. Decisao humana explicita para publicar `ads.txt`.

## Checklist por site antes de pedir revisao

1. Dominio definitivo aprovado.
2. Deploy publico e smoke atual passando.
3. Conteudo/tool free value aprovado.
4. Politicas, privacidade, cookies, contato e metodologia revisados.
5. CMP/consentimento pronto para regioes aplicaveis.
6. `ads.txt` publicado com o publisher aprovado.
7. Review de placement e densidade aprovado.
8. Sem linguagem interna, placeholder, incentivo a clique ou proximidade indevida de controles.

## Proibido nesta fase sem gate humano

- Criar/aceitar conta AdSense.
- Publicar `ads.txt` publico.
- Submeter sites automaticamente.
- Habilitar Management API.
- Inserir snippet AdSense ou Auto Ads.
- Ativar manual ads, requests, impressoes, cliques ou receita.
- Versionar secrets, tokens, documentos fiscais, dados bancarios ou PIN.
