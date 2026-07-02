# ROADMAP FASE 23 - Polimento benchmark das paginas de confianca

## Contexto

A auditoria live anterior fechou gaps tecnicos de crawler, mas a revisao visual do owner mostrou que paginas de confianca ainda pareciam notas operacionais: paineis de revisao/status na primeira dobra, sidebars grandes de paginas relacionadas e textos como superficie publica, status de revisao, builder funcional, AdSense review e metodologia antes do uso pratico.

As rotas afetadas sao o Hub e os 10 sites em paginas como `about`, `contact`, `privacy`, `cookies`, `terms`, `methodology`, `editorial-policy` e `status`.

## Objetivo

Fazer as paginas institucionais/trust parecerem paginas finais de usuario, com linguagem natural, sem conteudo de bastidor e sem ocupar a primeira dobra com status, metodologia ou checklist operacional.

## Etapa 23.1 - Copy publica compartilhada

1. Substituir o fallback `buildTrustPageCopy` por textos user-facing por produto.
2. Remover termos de bastidor: superficie publica, status de revisao, public path, AdSense review, builder funcional, checkout/provider como destaque e linguagem de readiness.
3. Garantir que paginas localizadas nao recebam ingles residual como marcador de rota.
4. Manter privacidade, limites, contato e status como informacoes publicas discretas e uteis.

## Etapa 23.2 - Chrome das paginas de confianca

1. Remover paineis de revisao/status do topo das paginas institucionais do Hub.
2. Remover paineis equivalentes do topo das paginas institucionais dos 10 apps.
3. Mover links relacionados para uma faixa inferior discreta, depois do conteudo principal.
4. Evitar sidebars com "Metodologia", "Páginas relacionadas" ou "Guia e limites" ao lado do conteudo principal.

## Etapa 23.3 - Textos de shell usados em apoio

1. Trocar frases de qualidade de conteudo por mensagens praticas de uso, sem referencia a revisao, AdSense ou maturidade da pagina.
2. Preservar avisos de privacidade e limites quando ajudam o usuario a entender o resultado.

## Etapa 23.4 - Validacao e publicacao

1. Rodar testes focados do pacote i18n e checks de copy publica.
2. Construir as superficies afetadas quando necessario para gerar HTML atualizado.
3. Validar rotas exemplares em producao apos deploy: Hub About, NetProbe About e InvoiceCraft About/Methodology em PT-BR.
4. Se a revisao ainda encontrar linguagem operacional ou primeira dobra com blocos indevidos, abrir novo roadmap e repetir o ciclo.

## Fechamento local

Implementado localmente:

- `buildTrustPageCopy` agora gera copy publica por produto, sem expor path publico, superficie publica, status de revisao ou marcador de rota.
- As paginas institucionais/trust do Hub e dos 10 apps nao exibem mais paineis de revisao/status na primeira dobra.
- Links relacionados foram movidos para uma faixa inferior discreta depois do conteudo principal.
- Textos auxiliares de ferramenta deixaram de usar linguagem de checklist como "builder funcional", "ferramenta funcional", "antes de AdSense" e "review date".

Validacao local concluida:

- `pnpm --filter @supersites/i18n test`
- `pnpm --filter @supersites/supersite test`
- `pnpm build` equivalente para Hub e os 10 apps afetados
- Rebuild do grupo de apps com template simples apos ajuste de links relacionados
- `pnpm validate:public-copy`
- `pnpm validate:adsense-safe-public`
- `git diff --check`
- Checagem Playwright local focada em Hub About, NetProbe About, InvoiceCraft About e InvoiceCraft Methodology em PT-BR, confirmando ausencia de `status-panel`/`network-panel` e sidebar superior.

## Fechamento live - 2026-07-02

O feedback visual do owner mostrou que a entrega anterior ainda permitia linguagem de bastidor em paginas publicas. O ciclo foi reaberto e publicado em commits incrementais:

- `b5d9c0e` removeu linguagem restante de revisao/ativacao em PixelBatch, DocShift, InvoiceCraft e Hub, alem de alinhar os E2E de PixelBatch/DocShift aos novos titulos publicos.
- `f11acfc` removeu os ultimos textos visiveis encontrados no crawl live: `before launch` no catalogo QRRoute do Hub e `advanced workflow review` no Metadata Cleaner do DocShift.

Validacao e publicacao:

- Quality Gate `28567648288` e Deploy Dry Run `28567648295` passaram para `b5d9c0e`.
- Deploys HostGator Sprint 23.4 passaram para Hub, CalcHarbor, DevUtility Lab, TimeNexus, QRRoute, InvoiceCraft, PixelBatch e DocShift.
- Quality Gate `28568714517` e Deploy Dry Run `28568714532` passaram para `f11acfc`.
- Deploys HostGator Sprint 23.5 passaram para Hub e DocShift.
- Crawl Playwright live final em `https://opentshost.com/supersites/` visitou 986 URLs internas e retornou 0 falhas para termos de bastidor monitorados, HTTP >= 400, corpo vazio, sidebars/painéis indevidos em trust pages e painéis de status no topo de tool pages.
- Checks direcionados confirmaram: Hub About, NetProbe About, InvoiceCraft About e Methodology sem painel lateral/topo; What is my IP carrega o IP automaticamente sem botao de executar; DNS Propagation preserva mapa/lista de resolvedores; DocShift Metadata Cleaner e catalogo QRRoute sem textos de revisao/lancamento.
