# ADR 0023 - DocShift browser document MVP

Data: 2026-06-27

## Status

Aceita.

## Contexto

A Sprint 5.2 da Fase 5 precisa entregar processamento basico de documentos sem cadastro obrigatorio e sem ativar upload server-side, storage, billing, anuncios, analytics externo ou workers de producao.

PDFs podem conter nomes de arquivo, texto, metadados e dados sensiveis. O MVP gratuito deve resolver necessidades basicas de merge, split, rotate, compress, watermark, page numbers, metadata e conversao simples, mas deve minimizar coleta e manter recursos pagos de lote, arquivos maiores, OCR, historico, equipes e API atras de gates tecnicos/comerciais.

## Decisao

DocShift sera um app Nuxt SSG em `apps/docshift`, com 8 ferramentas gratuitas:

- `pdf-merge`
- `pdf-split`
- `pdf-rotate`
- `pdf-compressor`
- `pdf-watermark`
- `page-numbers`
- `metadata-cleaner`
- `text-to-pdf`

O processamento do MVP roda no navegador:

- Web Worker valida contagem, tipo, tamanho, selecao de paginas e tamanho de texto.
- `pdf-lib` roda por import dinamico no cliente para gerar o PDF final.
- Object URLs sao usados para preview/download e revogados ao limpar a tela ou desmontar o componente.
- O limite gratuito inicial e 5 PDFs, 12 MB totais, ate 400 paginas declaradas e 12.000 caracteres para texto.
- Analytics local permite apenas eventos sanitizados por `tool_slug`, rota e locale.

O manifesto de deploy conhece o output SSG para dry-run, mas o trafego publico real continua bloqueado ate existirem artifact gate, smoke publico e rollback especificos do DocShift.

## Consequencias

- O MVP entrega valor gratuito sem cadastro e sem upload endpoint.
- `compress` e `metadata-cleaner` declaram limites: compressao e rewrite estrutural, nao OCR/downsampling server-side ou redacao forense.
- Nomes de arquivo aparecem somente no navegador para gerar nome de download; nao entram em analytics, logs ou backend.
- Recursos pagos de OCR, batch, API, historico, equipes e arquivos maiores exigem sandbox, antivirus quando aplicavel, quotas, auth/billing, retencao/limpeza, exportacao/exclusao e termos antes de ativacao.
- Deploy real do DocShift permanece placeholder-only ate haver gates proprios de HostGator.
