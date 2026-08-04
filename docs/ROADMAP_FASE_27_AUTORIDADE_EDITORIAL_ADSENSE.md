# Fase 27 — Autoridade editorial e nova revisão AdSense

Data-base: 2026-08-04

Status: concluida e publicada. Nova revisao do AdSense solicitada em 2026-08-04.

## Objetivo

Corrigir o risco de `conteúdo de baixo valor` com conteúdo original, útil e verificável, integrado às ferramentas públicas. A fase adota um centro de guias perenes em vez de um blog de volume: poucas páginas, profundidade real, fontes primárias, revisão editorial e caminhos claros para executar a tarefa nas ferramentas do portfólio.

## Evidência que orienta a fase

- O AdSense informou `Conteúdo de baixo valor` para `mywebtools.top`.
- A Fase 26 corrigiu a descoberta técnica do portfólio: o sitemap raiz passou a indexar o Hub e os dez aplicativos.
- Calculator.net combina resposta gratuita com fórmulas e explicações; timeanddate organiza artigos por assunto e os conecta a serviços; MxToolbox transforma diagnóstico técnico em orientação de correção; iLovePDF usa guias de tarefa, conclusões rápidas e links para ferramentas relacionadas.
- O padrão comum é ação primeiro, explicação depois, exemplos e próximos passos — não publicação em massa.

## Escopo aprovado

### Sprint 27.1 — Benchmark e contrato editorial

- Consolidar padrões dos benchmarks sem copiar texto, marca ou layout.
- Definir requisitos obrigatórios: autoria institucional, data de revisão, resumo, checklist, limitações, FAQ, fontes primárias e ferramentas relacionadas.
- Publicar inicialmente em inglês e português, os idiomas que podem receber revisão editorial consistente nesta fase.

### Sprint 27.2 — Arquitetura de guias

- Criar landing editorial rastreável em `/en/guides` e `/pt-br/guides`.
- Criar rotas estáticas, canonical, alternates apenas para traduções reais, schema `Article`, `FAQPage` e `BreadcrumbList`.
- Incluir os guias no sitemap do Hub, na home e no rodapé.

### Sprint 27.3 — Conteúdo central

- Diagnóstico de propagação DNS.
- SPF, DKIM e DMARC sem interromper e-mail legítimo.
- Checklist técnico antes de publicar um site.
- Processamento privado de imagens e PDFs no navegador.

### Sprint 27.4 — Gate de qualidade

- Testar conteúdo, rotas, schema, links, fontes, datas e reciprocidade linguística.
- Gerar o Hub e validar HTML estático.
- Executar QA desktop/mobile e crawler público após o deploy.
- Confirmar sitemap, robots, ads.txt, ausência de páginas quebradas e ausência de anúncios ativados antes da aprovação.

### Sprint 27.5 — Release e decisão AdSense

- Fazer um único commit objetivo, push e deploy HostGator do Hub.
- Validar a produção.
- Pedir nova revisão somente se todos os gates anteriores estiverem verdes. Autenticação adicional, CAPTCHA, PIN, identidade ou aceite jurídico permanecem `HUMAN_ACTION_REQUIRED`.

## Critério de pronto

1. O conteúdo não depende de cadastro e resolve uma necessidade concreta.
2. Cada guia tem conteúdo original, fontes primárias, data de revisão, limites, FAQ e links úteis.
3. Nenhum idioma inexistente é anunciado por `hreflang`.
4. Todas as rotas retornam 200, aparecem no sitemap e são alcançáveis por navegação interna.
5. Testes, build, QA responsivo, validações AdSense/SEO e smoke público passam.
6. A solicitação de revisão só é enviada depois da comprovação em produção.

## Fechamento

- Implementacao publicada no commit `18a085f` e na release HostGator `18a085f4e040-20260804052758` de `mywebtools.top`.
- Biblioteca entregue com 2 indices e 8 artigos substanciais em EN/PT-BR, todos ligados a ferramentas gratuitas reais.
- Validacao local: 36 testes, geracao estatica de 226 rotas, build, validadores de conteudo AdSense/copy/estrutura/segredos, smoke de preview e 42 testes Playwright aprovados.
- Validacao publica: 10/10 novas rotas HTTP 200; artigos entre 875 e 1.086 palavras; canonical, hreflang real e schemas presentes; 966 URLs unicas nos 11 sitemaps; 0 falhas confirmadas; `robots.txt` e `ads.txt` HTTP 200.
- Apos os gates verdes, o painel recebeu a confirmacao de correcoes e o pedido de revisao. O estado final observado foi `Em breve, seu site estara pronto para exibir anuncios` e `Muito bem! Voce concluiu todas as etapas`.
- Ad serving continua desativado. A aprovacao final e o prazo de analise permanecem sob decisao do Google.
