# ROADMAP FASE 22 - Fechamento Crawl Zero Gaps

## Contexto

A auditoria live completa de fechamento da Fase 21 em `https://opentshost.com/supersites/` percorreu 876 rotas e 1752 checks desktop/mobile. Nao houve links internos quebrados, falhas de robots/sitemap, overflow horizontal, canonical/hreflang/schema ausente, imagens sem alt ou botoes sem nome. Restaram 28 gaps:

- TimeNexus `timestamp-converter` em 5 idiomas e 2 viewports: erro de console `Hydration completed but contains mismatches.`
- Hub: meta descriptions acima de 170 caracteres em rotas legais localizadas especificas.
- NetProbe Atlas FR home: `<title>` acima de 70 caracteres.

## Objetivo

Zerar os gaps restantes do crawler benchmark live sem alterar contratos de API, provider externo, dados, pagamentos, AdSense real ou checkout.

## Etapa 22.1 - TimeNexus timestamp hydration

1. Remover valor baseado em `Date.now()` da renderizacao SSR do exemplo lateral do `timestamp-converter`.
2. Manter a execucao pratica da ferramenta no cliente, com valor atual preenchido apos montagem.
3. Validar a rota localmente e depois em producao com console sem erro de hidratacao.

## Etapa 22.2 - SEO residual Hub e NetProbe

1. Aplicar limite compartilhado de SEO ao `<title>` e `meta description` das paginas legais do Hub.
2. Aplicar limite compartilhado ao `<title>` da home localizada do NetProbe Atlas.
3. Preservar o texto visivel das paginas; o ajuste e apenas de metadados.

## Etapa 22.3 - Publicacao e auditoria final

1. Rodar validacoes focadas nos pacotes afetados.
2. Fazer commit objetivo e publicar apenas Hub, NetProbe Atlas e TimeNexus.
3. Reexecutar o crawler benchmark live completo com `--fail-on-critical`.
4. Encerrar somente com zero gaps ou abrir nova fase de correcao se o crawler ainda encontrar divergencia real.
