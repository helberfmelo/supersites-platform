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
- DevUtility: processar conteudo no navegador/Web Worker quando possivel, limitar snippets, nao persistir storage local e nao enviar conteudo sensivel do usuario para analytics ou logs.
- TimeNexus: processar datas, fusos e conversoes no navegador/Web Worker quando possivel, nao persistir entradas pessoais e nao enviar valores ou resultados para analytics ou logs.

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

## DevUtility Lab client-side tools

- Ferramentas da Sprint 3.2 rodam no navegador com Web Worker quando suportado e fallback local sem chamadas de rede.
- Snippets sao limitados a 200 KB no MVP para evitar travamento de UI e abuso por payload excessivo.
- JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes nao devem ser enviados a backend, logs, analytics ou data layer.
- O app nao deve persistir input ou resultado em `localStorage`, `sessionStorage`, IndexedDB ou cookies nesta sprint.
- Textos da UI devem orientar o usuario a nao colar segredos quando isso for evitavel; ainda assim a seguranca assume que entradas podem conter tokens ou chaves e minimiza coleta.

## TimeNexus client-side tools

- Ferramentas da Sprint 3.3 rodam no navegador com Web Worker quando suportado e fallback local sem chamadas de rede.
- Fusos, datas, horarios, timestamps, idade, porcentagem, unidades, valores numericos e resultados nao devem ser enviados a backend, logs, analytics ou data layer.
- O app nao deve persistir input ou resultado em `localStorage`, `sessionStorage`, IndexedDB ou cookies nesta sprint.
- Regras de fuso e calendario devem declarar limitacoes de precisao, diferencas de locale e dependencia do runtime do navegador.

## QRRoute client-side tools and redirects

- Ferramentas da Sprint 4.1 rodam no navegador com payloads locais e preview SVG, sem chamadas de API para criar QR estatico, barcode, UTM, vCard, Wi-Fi ou preview.
- URLs, parametros UTM, Wi-Fi passwords, dados de vCard, payloads e resultados nao devem ser enviados a backend, logs, analytics ou data layer.
- O app nao deve persistir input ou resultado em `localStorage`, `sessionStorage`, IndexedDB ou cookies nesta sprint.
- URL mode deve bloquear schemes nao HTTP(S), hostnames locais/privados, IPs privados/reservados, fragmentos, credenciais embutidas e payloads grandes.
- O redirect service preparado em `/api/v1/qrroute/r/{code}` deve usar `QrRouteDestinationGuard`, rate limit `qrroute-redirect`, links ativos/expiracao, `Referrer-Policy: no-referrer` e `X-Robots-Tag: noindex, nofollow`.
- Criacao publica de short links, scan analytics, dominios proprios, lotes e API permanecem desativados ate haver auth, billing/entitlements, workflow antiabuso, retencao, monitoramento e gates de deploy.

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
- A API autenticada de monitores `/api/v1/netprobe/monitors` exige permissao `operations.manage` enquanto nao houver auth/billing de clientes.
- Targets de monitores sao dados operacionais de conta e nao devem ir para analytics ou logs publicos; auditoria deve usar hash do alvo.
- Alertas de webhook exigem URL HTTPS, host publico e resolucao A/AAAA publica antes de qualquer entrega; entrega externa fica desativada por padrao via config.
- Alertas por e-mail/webhook devem armazenar apenas hash do destino em `net_probe_alerts`.
- Artefatos publicos do NetProbe nao podem conter `localhost:8013`, `127.0.0.1:8013` ou URL local para `/api/v1/netprobe`; a API publica deve ser HTTPS e validada por smoke antes de troca de release.
- O workflow de deploy estatico do NetProbe deve preservar `.env`, placeholder remoto e pastas manuais, publicando apenas em release versionado e trocando o `.htaccess` gerenciado do app.

## Control plane public deploy

- Artefatos Laravel do control-plane nao podem conter `.env`, arquivos de chave, senhas cPanel, placeholders `noindex` ou dependencias dev de teste.
- O ZIP de deploy deve ser extraido em release versionado e removido/lixeira apos extracao para evitar download de codigo-fonte.
- `_control-plane-releases` deve permanecer protegido por `.htaccess` deny; o trafego publico deve passar pelo front controller gerenciado em `/supersites/control-plane/index.php`.
- O front controller gerenciado deve usar o handler cPanel `ea-php84___lsphp` e fazer bootstrap direto do Laravel do release ativo; releases antigos continuam protegidos por deny.
- `.env` remoto deve vir somente de GitHub environment secrets ou inventario local ignorado. O deploy deve preservar `.env` existente e nunca imprimir valores.
- O smoke publico do control-plane deve rejeitar HTML, placeholder, `noindex` e `Internal Server Error` nos endpoints JSON.
- Diagnostico temporario do deploy (`enable_diagnostics`) deve permanecer desativado por padrao, retornar apenas campos sanitizados e ser seguido por deploy/rollback sem diagnostico.
- Migrações e crons nao devem rodar automaticamente no primeiro deploy publico da API; qualquer migracao futura exige backup/rollback explicito antes do switch.

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
