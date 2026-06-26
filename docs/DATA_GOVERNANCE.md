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

## NetProbe Atlas

- IP exibido em `what-is-my-ip`, resultado DNS, propagation, port checker e reachability sao tratados como resposta transitoria da ferramenta.
- O endpoint `/api/v1/netprobe/ip` nao deve persistir o IP completo fora de logs tecnicos operacionais inevitaveis da plataforma.
- O endpoint `/api/v1/netprobe/dns` pode usar cache tecnico de curta duracao por hostname/tipo normalizado, sem associar resultado a usuario autenticado ou identificador pessoal.
- Os endpoints `/api/v1/netprobe/propagation`, `/api/v1/netprobe/port` e `/api/v1/netprobe/reachability` podem usar cache tecnico curto por hostname/tipo/porta normalizados, sem associar resultado a usuario autenticado ou identificador pessoal.
- Hostname, IP consultado e registros retornados nao devem ser enviados para analytics, GA4, GTM, AdSense ou data layer.
- Erros de validacao/SSRF devem expor mensagens controladas, sem revelar detalhes internos de rede ou resolver.
- RDAP resume apenas fatos publicos de dominio, registrar, status, datas, nameservers e notices/remarks; contatos pessoais e vCards devem ser omitidos.
- SSL resume apenas facts tecnicos do certificado servido e enderecos publicos checados; certificado bruto e alvo digitado nao devem ser enviados a analytics.
- Port checker e reachability podem exibir enderecos publicos checados, status e latencia aproximada como resultado transitorio; alvo digitado, porta escolhida e latencia nao devem ser enviados a analytics.

## Analytics sem PII

- O contrato versionado fica em `packages/analytics`.
- Eventos permitidos passam por allowlist antes de armazenamento.
- Chaves como e-mail, telefone, documento, senha, token, chave API, cartao, banco, IP, nome e endereco sao descartadas.
- Valores string com e-mail, IP, tokens longos ou numeros longos sao redigidos.
- URLs armazenadas para analytics nao carregam query string nem fragmento.
- Identificadores anonimos e de sessao sao armazenados apenas como hash no control plane.

## Direitos do titular

Implementar exportacao, exclusao e retificacao antes de contas pagas em producao.
