# Fase 18 - Roadmap Ativo Compacto

Arquivo compacto de leitura obrigatoria. O roteiro completo e historico foi preservado em `docs/archive/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE_FULL_2026-06-30.md`.

## Objetivo

Transformar paginas MVP em superficies benchmark-grade: ferramenta/acao principal acima da dobra, linguagem publica natural, valor gratuito sem cadastro e detalhes tecnicos/metodologia abaixo do valor util.

## Cadencia atual

- Executar por etapa, nao por sprint individual.
- Fazer todas as sprints da etapa ativa.
- Depois rodar validacao minima, commit objetivo, push e Quality Gate.
- Deploy/monitoramento somente quando a etapa exigir publicacao ou quando o owner pedir.
- Validacoes profundas ficam sob demanda: screenshots, Playwright, crawler, Lighthouse, dry-run, smokes publicos e relatorios longos.

## Estado da Fase 18

Concluido ate:

- Hub principal e catalogos dos 10 sites.
- Paginas institucionais do Hub: About, Contact, Privacy, Cookies, Terms, Methodology, Editorial Policy e Public Status.
- NetProbe home.
- NetProbe What is my IP.

Proxima etapa ativa:

- **Etapa NetProbe Tools**
- Sprints: **18.23 a 18.28**
- Escopo: DNS Propagation, DNS Lookup, RDAP, SSL Certificate, Port Checker, Ping/Traceroute.

## Sprints da proxima etapa

### Sprint 18.23 - NetProbe DNS Propagation

- Redesenhar como checker task-first.
- Input, record type, expected value e resultado acima da dobra.
- Suportar visualmente `A`, `AAAA`, `CNAME`, `MX`, `NS`, `PTR`, `SOA`, `SRV`, `TXT`, `CAA`.
- Lista/mapa preparados para probes reais.
- Nao simular probes globais falsos.
- Se multi-regiao real nao existir, deixar cobertura clara e metodologia abaixo.
- Rodape DNS rico, donation block inerte e slot AdSense reservado sem anuncio real.

### Sprint 18.24 - NetProbe DNS Lookup

- Input e tabs de record type acima da dobra.
- Resultado em tabela clara com type, name, value, TTL e source/resolver.
- Acoes: copiar, exportar JSON, checar propagacao, checar registros de e-mail.
- Metodologia abaixo e rodape DNS rico.

### Sprint 18.25 - NetProbe RDAP Domain Lookup

- Resultado em cards para dominio, registrar, datas, status, nameservers, DNSSEC e redaction notice.
- Evitar bloco tecnico dominante no topo.
- Privacidade/limites abaixo do resultado.

### Sprint 18.26 - NetProbe SSL Certificate Checker

- Mostrar emissor, validade, SANs, chain summary e alertas claros.
- Separar interpretacao simples de detalhes tecnicos.
- Nao prometer auditoria equivalente a SSL Labs se nao existir.

### Sprint 18.27 - NetProbe Port Checker

- Input host/porta e resultado direto acima da dobra.
- Explicar porta aberta/fechada/filtrada de forma simples.
- Manter limites antiabuso e portas permitidas.

### Sprint 18.28 - NetProbe Ping and Traceroute

- UI preparada para reachability real disponivel.
- Declarar recursos indisponiveis sem vender traceroute/ping mundial falso.
- Priorizar resultado util e alternativa segura quando ICMP/traceroute nao estiverem ativos.

## Regras de produto

- Primeira dobra deve resolver uma intencao pratica.
- Remover linguagem interna: release, rollback, deploy smoke, ads planned, billing disabled, worker planned, human review, launch order e quality checks.
- Metodologia, privacidade, limites, ads, donation e upgrades ficam abaixo do resultado.
- PT-BR/ES/FR/DE devem ter linguagem natural e sem ingles residual indevido.
- Campos tecnicos de rota (`path`, `href`, `slug`, `url`, `canonical`, `hreflang`, `locale`, time zones) nao devem ser traduzidos/acentuados.

## Referencias

- Roadmap completo/historico: `docs/archive/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE_FULL_2026-06-30.md`
- Aceite benchmark: `docs/PHASE18_BENCHMARK_GRADE_ACCEPTANCE.md`
- Cadencia operacional: `docs/RUNBOOKS/SPRINT_EXECUTION.md`
