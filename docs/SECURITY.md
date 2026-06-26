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

## Control plane admin

- Admin MVP usa sessao Laravel, CSRF e throttle no POST de login.
- Rotas `/admin` exigem autenticacao e middleware `permission` baseado nos slugs RBAC.
- Acoes de login, dashboard e cadastro/edicao de sites geram `audit_logs`.
- Contas seed locais existem apenas para desenvolvimento; producao deve ter credenciais reais em fluxo seguro e 2FA antes de go-live.

## Analytics e PII

- Eventos analytics usam allowlist versionada em `@supersites/analytics`.
- O endpoint publico `/api/v1/analytics/events` descarta chaves sensiveis, redige valores com e-mail/IP/token/numero longo e remove query/hash de URLs.
- Identificadores anonimos e de sessao sao hasheados antes de persistencia.
- Nenhum provedor externo de analytics deve ser ativado antes de consentimento, GA4/GTM e gates humanos/tecnicos aplicaveis.

## NetProbe public API

- `GET /api/v1/netprobe/ip` nao deve persistir o IP completo do visitante; a resposta informa a politica de retencao.
- `POST /api/v1/netprobe/dns` aceita apenas hostnames normalizados e tipos DNS permitidos.
- URLs, portas, caminhos, query strings, hostnames locais/reservados e aliases como `localhost`/`.local` devem ser rejeitados antes de resolver DNS.
- Respostas A/AAAA que apontem para IP privado, loopback, metadata ou ranges reservados devem bloquear o resultado completo.
- Endpoints publicos NetProbe usam rate limit dedicado `netprobe-public` e cache TTL por lookup para reduzir abuso e custo.
- Analytics de ferramentas NetProbe nao deve incluir hostname, IP consultado, query DNS ou valor bruto inserido pelo usuario.
- RDAP deve retornar apenas fatos de dominio e registrar; contato pessoal, entidades de registrant/admin/tech e vCards nao devem ser expostos na resposta resumida.
- SSL deve resolver e validar A/AAAA publico antes de conectar, limitar o probe a `443`, usar timeout curto e declarar limitacoes de cadeia/validacao.
- Propagation deve usar apenas snapshots DNS controlados; a versao inicial usa o resolver local e nao executa probes multirregiao externos.
- Port checker deve aceitar somente a allowlist `80/443/587/993`, validar A/AAAA publico antes de conectar, limitar a quantidade de enderecos testados e usar timeout curto.
- Reachability deve manter ICMP e traceroute desabilitados no request web; ate haver workers controlados, apenas TCP 443 limitado pode ser executado.

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
