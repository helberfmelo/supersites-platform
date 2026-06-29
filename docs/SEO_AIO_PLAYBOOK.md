# SEO and AIO Playbook

## Regra central

Cada pagina de ferramenta deve resolver a consulta principal e conter conteudo original suficiente para AdSense, busca tradicional e respostas por IA.

## Estrutura minima de pagina

- Ferramenta ou resposta no inicio.
- Explicacao objetiva.
- Como interpretar o resultado.
- Exemplos.
- Erros comuns.
- Como corrigir.
- Metodologia e limitacoes.
- FAQ util.
- Ferramentas relacionadas.
- Data de revisao.
- Referencias quando necessario.

## Tecnico

- SSR/SSG.
- Canonical proprio por idioma.
- Hreflang reciproco e `x-default`.
- Sitemap por idioma.
- Dados estruturados verdadeiros.
- Noindex para resultados unicos, parametros infinitos e areas pessoais.
- Sem paginas programaticas em massa sem valor.

## AIO/GEO

- Respostas diretas e verificaveis.
- Tabelas e exemplos quando ajudam.
- Metodologia publica.
- Autoria/revisao e data.
- Nao inventar dados, causalidade ou fontes.

## AI growth engine

- Recomendacoes de SEO/AIO devem ter evidencia verificavel, impacto, esforco, confianca e risco antes de entrar no backlog.
- Nao gerar paginas, paragrafos ou FAQs em massa sem valor novo; o motor pode priorizar trabalho, mas nao publicar conteudo automaticamente.
- Nao inventar fontes, datas, rankings, causalidade, impacto financeiro ou conclusoes de busca sem evidencia registrada.
- Alteracoes em Search Console, tags, sitemaps publicos, ads, billing ou provider externo exigem gates tecnicos/humanos antes de execucao.

## Growth priority readiness

- A Sprint 16.2 pode ranquear backlog por impacto, esforco, confianca e risco usando evidencias locais.
- Dados reais de GA4/Search Console/AdSense/billing continuam indisponiveis ate os gates de ingestao, cofre, retencao e aprovacao humana.
- Mesmo quando houver dados reais, priorizacao nao pode publicar conteudo, alterar SEO, criar paginas, declarar antes/depois ou inferir causalidade sem revisao humana e evidencia aprovada.

## Growth automation readiness

- A Sprint 16.3 pode marcar trabalho tecnico/local de baixo risco como `pr_review_only`.
- `pr_review_only` nao autoriza criacao programatica de paginas, conteudo em massa, alteracao de canonical/hreflang/sitemap, copy publica, claims de ranking ou deploy.
- Qualquer mudanca SEO/AIO gerada a partir dessa fila exige revisao humana, evidencia da pagina, testes verdes e os gates de deploy normais.

## Growth reporting readiness

- A Sprint 16.4 pode resumir relatorios semanais/mensais e itens before/after-ready para revisao do operador.
- Relatorios com `before_after_items` nao podem declarar ranking, trafego, receita, melhoria ou causa sem evidencia manual aprovada.
- Export, print ou dashboard de reporting nao autorizam publicacao de paginas, alteracao SEO/AIO, claim de Search Console, snippet, sitemap ou canonical.
