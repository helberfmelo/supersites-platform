# Fase 28 — Expansao e higiene editorial

Data-base: 2026-08-04

## Objetivo

Remover linguagem de processo interno das superficies publicas e ampliar o centro de guias com conteudo util, original, rastreavel e conectado a ferramentas reais. A expansao continua curada: novos temas entram por necessidade concreta, nao por volume de paginas.

## Plano executado

### Sprint 28.1 — Auditoria de linguagem publica

- Examinar Hub, indice e artigos por termos autorreferenciais como contrato editorial, revisao humana, roadmap, fase, gate e aprovacao AdSense.
- Manter nas politicas somente explicacoes de privacidade/publicidade necessarias ao visitante.
- Substituir o painel interno do indice por orientacao pratica de escolha por problema.

### Sprint 28.2 — Novos conteudos

- Redirects HTTP e headers de seguranca.
- Diagnostico de JSON, Base64 e JWT sem exposicao de segredos.
- Checklist de campanhas com QR code.
- Otimizacao de imagens e PDFs para a web.
- Publicar os quatro temas em EN/PT-BR, com cinco secoes, checklist, limitacoes, quatro FAQs, fontes responsaveis e ferramentas relacionadas.

### Sprint 28.3 — Descoberta e prevencao

- Incluir as novas rotas automaticamente na home, indice, links relacionados e sitemap do Hub.
- Ampliar o validador AdSense para os 16 artigos e bloquear linguagem interna no HTML gerado.
- Validar todas as fontes e ferramentas relacionadas por HTTP.
- Nao alterar `ads.txt`: o arquivo autoriza o publisher e nao recebe URLs editoriais.

### Sprint 28.4 — Qualidade e release

- Executar testes, geracao estatica, build, validadores de conteudo/copy/AdSense/estrutura/segredos, preview e Playwright desktop/mobile.
- Publicar o Hub no alvo `mywebtools.top` e validar indice, artigos, sitemap, robots e ads.txt em producao.

## Criterios de pronto

1. Nenhuma linguagem de processo interno aparece no indice ou nos artigos.
2. O catalogo possui oito temas e 16 artigos localizados substanciais.
3. Cada novo artigo possui fontes acessiveis, ferramentas publicadas, schema, canonical e alternates apenas para traducoes reais.
4. Home, rodape, indice e sitemap descobrem as novas rotas.
5. QA local e validacao publica passam sem anuncios reais ou alteracao indevida de `ads.txt`.
