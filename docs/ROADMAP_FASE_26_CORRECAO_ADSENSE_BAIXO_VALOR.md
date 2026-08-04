# ROADMAP FASE 26 - Correcao AdSense: conteudo de baixo valor

Data-base: 2026-08-04

Status: em execucao.

## Retorno confirmado do provider

O painel do Google AdSense informou para `mywebtools.top`:

- status `Requer atencao`;
- detalhe `Conteudo de baixo valor`;
- ultima atualizacao em 2026-07-27 16:20 GMT-3;
- propriedade do site verificada;
- `ads.txt` exibido como `Nao encontrado` no snapshot do painel.

A verificacao publica de 2026-08-04 confirmou que o `ads.txt` do root responde HTTP 200 com uma unica linha valida. O painel depende de novo rastreamento para refletir esse estado.

## Diagnostico tecnico

O dominio definitivo ja publica o Hub e os 10 apps de ferramentas, com canonicals corretos e sitemaps individuais validos. Entretanto, o sitemap do root lista somente as 101 URLs do Hub e nao referencia os sitemaps dos apps, que somam centenas de paginas de ferramentas funcionais e conteudo original.

Essa lacuna reduz a descoberta direta da parte mais util do dominio submetido e e compativel com o retorno de baixo valor. A correcao deve priorizar descoberta, navegacao e evidencia de utilidade existente; nao deve criar conteudo em massa, paginas artificiais ou texto superficial.

## Etapa 26.1 - Inventario e leitura obrigatoria

- criar `docs/leitura_obrigatoria.md` como indice operacional compacto;
- registrar o retorno real do AdSense sem expor identificadores sensiveis;
- validar root, canonicals, robots, sitemap, subapps e `ads.txt` publicos.

## Etapa 26.2 - Descoberta unificada

- transformar `/sitemap.xml` do Hub em sitemap index;
- preservar as URLs do Hub em `/sitemap-hub.xml`;
- referenciar os 10 sitemaps de apps no mesmo dominio;
- manter `robots.txt` apontando para `/sitemap.xml`;
- testar escaping XML e rotas de prerender.

## Etapa 26.3 - Validacao local

- testes focados de `@supersites/seo` e Hub;
- build focado do Hub;
- validacao do artefato `mywebtools.top` com sitemap index, sitemap do Hub, canonicals e ausencia de referencias legadas;
- `validate:secrets` e `git diff --check`.

## Etapa 26.4 - Release

- commit e push objetivos da fase;
- publicar o Hub pelo manifesto `infra/deployment/apps.mywebtools.json`;
- validar em producao tecnica `/sitemap.xml`, `/sitemap-hub.xml`, sitemaps filhos, `robots.txt` e `ads.txt`;
- manter ad serving e Auto Ads desligados.

## Etapa 26.5 - Nova revisao AdSense

Status: `HUMAN_ACTION_REQUIRED` apos a publicacao e a validacao tecnica.

- aguardar o root e o `ads.txt` serem rastreados novamente;
- revisar no painel se a deteccao de `ads.txt` mudou;
- somente entao confirmar que os problemas foram corrigidos e pedir nova revisao;
- nao ativar Auto Ads ou placements reais junto com o pedido de revisao.

## Criterios de aceite

1. O root sitemap e um indice XML valido.
2. O indice referencia o Hub e os 10 apps no dominio definitivo.
3. Cada sitemap referenciado responde HTTP 200 e usa canonical de `mywebtools.top`.
4. O Hub continua com suas 101 URLs indexaveis em sitemap proprio.
5. O `ads.txt` publico continua valido sem expor o identificador em documentacao ou logs.
6. Nenhum anuncio real, Auto Ads, novo provider, pagina em massa ou submissao de revisao e ativado pela etapa tecnica.
