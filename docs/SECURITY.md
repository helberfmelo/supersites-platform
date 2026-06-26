# Security

## Regras permanentes

- Nunca versionar segredos.
- Nunca expor segredo em logs, docs publicas, issues, screenshots ou output de CI.
- Aplicar OWASP Top 10 e boas praticas ASVS.
- Todo endpoint externo deve ter rate limit, validacao e logs estruturados.
- Ferramentas que acessam URL, DNS, SMTP, porta, arquivo, redirect ou certificado exigem revisao antiabuso.

## Antiabuso por categoria

- NetProbe/MailHealth/SitePulse: bloquear SSRF, loopback, redes privadas, metadata endpoints, ranges reservados e varreduras amplas.
- PixelBatch/DocShift: validar tipo/tamanho, limpar temporarios, isolar processamento server-side e usar antivirus/sandbox quando aplicavel.
- QRRoute: prevenir phishing, malware, open redirect e abuso de short links.
- DevUtility: nao enviar conteudo sensivel do usuario para analytics ou logs.

## Secrets

- Inventario local: `docs/credentials/credentials.local.md`.
- Arquivos versionados: apenas placeholders e nomes de secrets.
- GitHub Actions: secrets por environment/site.
- Producao: cPanel/secret manager/cofre conforme disponibilidade.

## Redis/VPS

- Redis de producao inicial roda na VPS como `supersites-redis.service`.
- Redis deve permanecer autenticado e restrito a `127.0.0.1:6381`.
- Portas Redis publicas (`6379`, `6380`, `6381`) devem continuar fechadas/filtradas.
- Validar com `scripts/validate-vps-runtime.ps1` apos mudancas de runtime ou deploy que dependa de Redis.

## Validacao minima por sprint

- Busca por padroes de segredo antes de commit.
- Testes de autorizacao/RBAC quando backend/admin mudar.
- Testes de SSRF/rate limit quando ferramenta de rede mudar.
- Smoke em producao apos deploy.
