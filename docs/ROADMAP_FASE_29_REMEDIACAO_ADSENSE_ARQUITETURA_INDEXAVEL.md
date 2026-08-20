# Fase 29 — Remediação AdSense por arquitetura indexável

Data-base: 2026-08-20

Status: em execução.

## Objetivo

Corrigir o sinal agregado de baixo valor do domínio `mywebtools.top` sem criar páginas em massa. A fase reduz o conjunto enviado a buscadores e ao fluxo de revisão para páginas que entregam uma ferramenta funcional, conteúdo editorial substancial ou uma superfície central de confiança.

## Evidência observada

- A revisão anterior retornou `Conteúdo de baixo valor`; as Fases 26–28 corrigiram descoberta e adicionaram 16 artigos, mas mantiveram todas as páginas auxiliares dos apps indexáveis.
- Em 2026-08-20, os 11 sitemaps públicos respondiam HTTP 200 e listavam 974 URLs.
- Os dez apps filhos publicavam exatamente 40 páginas auxiliares cada: oito tipos (`about`, `contact`, `privacy`, `cookies`, `terms`, `methodology`, `editorial-policy` e `status`) em cinco idiomas.
- Essas 400 páginas tinham aproximadamente 100–160 palavras em grande parte dos apps, não possuíam `noindex` e representavam 41% de todo o inventário enviado ao Google.
- O TimeNexus ainda listava 15 landings programáticas de grupos de relógio mundial com 270–337 palavras e conteúdo muito semelhante, apesar de a ferramenta principal e as páginas de cidade já resolverem a tarefa.
- `robots.txt`, TLS, sitemap raiz, `ads.txt` e respostas para `Googlebot`, `AdsBot-Google` e `Mediapartners-Google` estavam acessíveis. Portanto, a causa não é indisponibilidade básica do domínio.
- O build de revisão injetava o snippet do AdSense em todo HTML, inclusive nas páginas deliberadamente auxiliares.

## Leitura das políticas oficiais

- O AdSense exige conteúdo próprio, único, relevante, navegação clara e boa experiência; o site inteiro é revisado, não apenas a home: <https://support.google.com/adsense/answer/7299563> e <https://support.google.com/adsense/answer/7584263>.
- O inventário não pode ser composto por telas sem conteúdo editorial do publisher ou com conteúdo de baixo valor: <https://support.google.com/adsense/answer/10502938>.
- Quando o site não tem conteúdo único suficiente ou boa experiência, o Google orienta corrigir isso antes de pedir nova revisão: <https://support.google.com/adsense/answer/12176698>.
- Sitemaps devem conter as URLs canônicas que realmente se deseja ver nos resultados de busca: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>.
- `noindex` é o controle granular recomendado para manter uma página acessível sem oferecê-la aos resultados de busca: <https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag>.
- Conteúdo em escala, traduções ou variações que pouco acrescentam ao usuário elevam risco de abuso de conteúdo escalado ou doorway pages: <https://developers.google.com/search/docs/essentials/spam-policies>.

## Decisão de arquitetura

### Manter indexável

- Hub e páginas localizadas principais.
- Biblioteca editorial EN/PT-BR.
- Detalhes de produto do Hub.
- Homes localizadas dos dez apps.
- Ferramentas e calculadoras funcionais.
- Páginas de cidade do TimeNexus, que entregam relógio, fuso e planejamento específico.
- Páginas centrais de confiança do Hub.

### Manter acessível, mas retirar do índice

- As 400 páginas auxiliares duplicadas por app e idioma.
- As 15 landings de grupos do TimeNexus, que repetem o mesmo planejador com presets.

Essas páginas continuam públicas para transparência, navegação e suporte. Elas recebem `robots=noindex, follow` e `AdsBot-Google=noindex`, saem dos sitemaps e não recebem o snippet de revisão AdSense no artefato.

## Plano de execução

### Etapa 29.1 — Curadoria do índice

- separar rotas prerenderizadas de rotas elegíveis ao sitemap em todos os apps;
- excluir páginas auxiliares dos dez sitemaps;
- excluir os grupos programáticos rasos do TimeNexus;
- preservar URLs e links existentes para não quebrar navegação ou transparência.

### Etapa 29.2 — Controles de crawler e AdSense

- adicionar `robots=noindex, follow` e `AdsBot-Google=noindex` às páginas excluídas;
- fazer a injeção do snippet de revisão ignorar qualquer HTML com `noindex`;
- manter `robots.txt` permitindo o crawl, porque o crawler precisa ler a meta de exclusão;
- manter o `ads.txt` real e o snippet somente nas páginas elegíveis.

### Etapa 29.3 — Gate preventivo

- adicionar validador de artefato para conferir:
  - sitemap sem páginas excluídas;
  - HTML excluído ainda prerenderizado e acessível;
  - metas `robots` e `AdsBot-Google` presentes;
  - nenhuma URL `noindex` dentro do sitemap;
  - exatamente um H1 e pelo menos 300 palavras visíveis como proxy conservador para o conjunto indexável dos apps.

O limite de palavras é um gate interno de higiene, não uma regra declarada pelo Google. Ferramentas funcionais são avaliadas também pela utilidade, não só pelo texto.

### Etapa 29.4 — Validação e release

- testes dos dez apps;
- builds estáticos dos dez apps;
- gate de arquitetura indexável;
- validadores de conteúdo público, AdSense-safe, estrutura e segredos;
- QA desktop/mobile em rotas representativas;
- build de artefatos HostGator com o publisher configurado localmente;
- deploy dos dez apps pelo manifesto `apps.mywebtools.json`;
- smoke público e recrawl dos 11 sitemaps.

### Etapa 29.5 — Nova revisão

Solicitar revisão apenas quando produção comprovar:

1. 559 URLs únicas no conjunto agregado, em vez de 974;
2. 415 páginas acessíveis com `noindex` e ausentes dos sitemaps;
3. zero página `noindex` com snippet do AdSense;
4. `ads.txt`, home, guias, ferramentas e sitemaps em HTTP 200;
5. nenhum erro crítico de build, teste, console, navegação ou responsividade;
6. motivo atual confirmado na tela do AdSense e confirmação de correções marcada somente depois dessas evidências.

## Riscos e rollback

- A remoção do sitemap não remove imediatamente URLs já conhecidas; `noindex` precisa ser rastreado. Não bloquear essas páginas no `robots.txt`.
- Search Console pode levar dias ou semanas para refletir o inventário menor.
- Se uma ferramenta útil ficar fora do sitemap por engano, restaurar a release anterior do app específico e corrigir o gate antes de nova publicação.
- A revisão AdSense não é garantida: tráfego real, reputação, tempo de maturação e avaliação manual/automática continuam fora do controle do código.

## Resultado esperado

O domínio deixa de parecer uma rede de centenas de páginas auxiliares traduzidas e passa a apresentar ao Google um conjunto menor e coerente: ferramentas funcionais, páginas localizadas principais, guias profundos e confiança centralizada.
