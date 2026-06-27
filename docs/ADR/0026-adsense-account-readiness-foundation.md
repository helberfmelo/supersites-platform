# ADR 0026 - AdSense account readiness foundation

Data: 2026-06-27

## Status

Accepted

## Context

A Sprint 6.3 precisa preparar a integracao AdSense sem criar conta, aceitar termos, cadastrar dados fiscais/bancarios, publicar `ads.txt`, adicionar sites para revisao, habilitar AdSense Management API ou carregar anuncios reais. A documentacao oficial exige controle humano de conta publisher, revisao individual de sites e conformidade com politicas de trafego/conteudo antes de monetizacao.

## Decision

- `@supersites/ads` passa a expor um contrato versionado de readiness AdSense para publisher account, publisher id, Management API e site review.
- O contrato falha fechado ate beneficiario legal, checagem de conta duplicada, aceite de termos, fiscal, perfil de pagamento, banco, PIN, publisher id, dominio definitivo, smoke publico, qualidade de conteudo, paginas legais, consentimento, `ads.txt`, policy review e feature flag estarem aprovados.
- O control plane ganha `adsense_accounts` e `adsense_site_reviews` para registrar readiness operacional sem tokens, OAuth secrets, dados bancarios, dados fiscais, emails de usuarios Google ou identificadores de visitantes.
- O seeder cria apenas um registro `primary-publisher` e reviews por site publico com `ad_serving_enabled=false`, `auto_ads_enabled=false`, `placements_enabled=false` e `site_review_status=not_submitted`.
- O dashboard admin mostra a prontidao AdSense e os sites ainda bloqueados para revisao/veiculacao.
- Submissao automatica de sites, snippets AdSense, Auto Ads, `ads.txt` real, Management API, anuncios, impressoes, cliques e receita permanecem desativados.

## Consequences

- A plataforma passa a ter inventario auditavel para a futura conta AdSense e revisoes por site.
- A unica fonte de verdade tecnica para ativar anuncios continua sendo a combinacao de gates humanos, dados operacionais e deploy/smoke especificos.
- Qualquer criacao/uso de conta AdSense, aceite legal, fiscal, banco, PIN, publisher id real, site submission ou API OAuth deve ser tratada como `HUMAN_ACTION_REQUIRED`.
- O trabalho futuro de placements reais pode consultar readiness sem precisar persistir dados sensiveis.
