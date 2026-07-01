# Roadmap Fase 21 - Polimento publico final

Data: 2026-07-01

## Objetivo

Remover a ultima camada de texto com cara de bastidor que apareceu durante a auditoria publica final, mantendo os blocos seguros para monetizacao futura sem expor detalhes de pagamento, provider, impostos, status interno ou ausencia tecnica de anuncio.

## Sprint 21.1 - Copia publica de suporte e anuncios

- Trocar placeholders de anuncio dos 10 sites de "reserved/no ad loaded" para linguagem publica neutra de publicidade separada do resultado gratuito.
- Trocar blocos de apoio dos 10 sites de "payments ready/no payment widget/no ad request" para orientacao publica: salvar, compartilhar e enviar correcoes.
- Trocar suporte do QRRoute de provider/impostos/under review para mensagem publica de builder gratuito disponivel.

## Sprint 21.2 - Status publico do Hub

- Remover mencao a registros internos protegidos da pagina publica de status.
- Manter foco em disponibilidade, incidentes, manutencao e contato para visitantes.

## Validacao

- Buscar termos residuais: `payments are ready`, `payment widget`, `Reserved ad space`, `No ad is loaded`, `Owner-approved`, `under review`, `provider and tax`, `internal records`.
- Rodar validacoes enxutas de copia publica, testes dos apps afetados quando existirem e smokes publicos apos deploy.
