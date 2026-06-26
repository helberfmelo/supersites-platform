# Data Governance

## Principios

- Minimizar coleta.
- Processar no navegador quando possivel.
- Nao enviar PII para GA4, AdSense, logs ou ferramentas de observabilidade.
- Nao usar dados do usuario para treinamento sem opt-in explicito.
- Manter matriz por site/tipo de dado antes do lancamento.

## Retencao inicial

| Dado | Padrao inicial |
|---|---|
| IP de visitante | Nao armazenar completo salvo seguranca operacional com retencao curta |
| Entradas de ferramentas dev | Nao armazenar |
| Arquivos enviados | Temporario; apagar automaticamente |
| Historico pago | Manter enquanto conta ativa e conforme termos |
| Logs tecnicos | Sanitizados e com retencao definida |
| Eventos analytics | Sem PII e com consentimento quando exigido |

## Direitos do titular

Implementar exportacao, exclusao e retificacao antes de contas pagas em producao.

