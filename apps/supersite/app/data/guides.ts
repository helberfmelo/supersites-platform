import type { LocaleCode } from './locales'
import { localizedPath } from './locales'
import { expandedGuideCatalog } from './guide-expansion'

export const guideLocales = ['en', 'pt-br'] as const
export type GuideLocale = (typeof guideLocales)[number]

export interface GuideLink {
  label: string
  href: string
  note: string
}

export interface GuideSource extends GuideLink {
  publisher: string
}

export interface GuideSection {
  heading: string
  paragraphs: string[]
  checklist?: string[]
}

export interface GuideFaq {
  question: string
  answer: string
}

export interface LocalizedGuide {
  title: string
  description: string
  eyebrow: string
  summary: string
  takeaways: string[]
  sections: GuideSection[]
  faq: GuideFaq[]
  sources: GuideSource[]
  relatedTools: GuideLink[]
}

export interface Guide {
  slug: string
  category: 'network' | 'email' | 'web' | 'privacy'
  reviewedAt: string
  readingMinutes: number
  localized: Record<GuideLocale, LocalizedGuide>
}

export const guideLandingCopy: Record<GuideLocale, {
  title: string
  description: string
  eyebrow: string
  intro: string
  cardCta: string
  reviewedLabel: string
  readingLabel: string
}> = {
  en: {
    title: 'Practical guides for safer web work',
    description: 'Original, source-backed guides that turn DNS, email, website and file-processing checks into practical decisions.',
    eyebrow: 'SuperSites guides',
    intro: 'Start with the task, understand what the result means, then use the linked free tools to verify your own case. Every guide states its limits, sources and review date.',
    cardCta: 'Read the guide',
    reviewedLabel: 'Reviewed',
    readingLabel: 'min read',
  },
  'pt-br': {
    title: 'Guias práticos para trabalhar melhor na web',
    description: 'Guias originais e baseados em fontes que transformam verificações de DNS, e-mail, sites e arquivos em decisões práticas.',
    eyebrow: 'Guias SuperSites',
    intro: 'Comece pela tarefa, entenda o que o resultado significa e use as ferramentas gratuitas relacionadas para verificar o seu caso. Todo guia informa limites, fontes e data de revisão.',
    cardCta: 'Ler o guia',
    reviewedLabel: 'Revisado em',
    readingLabel: 'min de leitura',
  },
}

const tools = {
  dnsPropagation: 'https://opentshost.com/supersites/netprobe-atlas/en/tools/dns-propagation',
  dnsLookup: 'https://opentshost.com/supersites/netprobe-atlas/en/tools/dns-lookup',
  spf: 'https://opentshost.com/supersites/mailhealth/en/tools/spf-checker',
  dkim: 'https://opentshost.com/supersites/mailhealth/en/tools/dkim-checker',
  dmarc: 'https://opentshost.com/supersites/mailhealth/en/tools/dmarc-checker',
  status: 'https://opentshost.com/supersites/sitepulse-lab/en/tools/status-checker',
  redirects: 'https://opentshost.com/supersites/sitepulse-lab/en/tools/redirect-chain',
  headers: 'https://opentshost.com/supersites/sitepulse-lab/en/tools/security-headers',
  robots: 'https://opentshost.com/supersites/sitepulse-lab/en/tools/robots-checker',
  sitemap: 'https://opentshost.com/supersites/sitepulse-lab/en/tools/sitemap-validator',
  imageCompressor: 'https://opentshost.com/supersites/pixelbatch/en/tools/image-compressor',
  imageMetadata: 'https://opentshost.com/supersites/pixelbatch/en/tools/metadata-remover',
  pdfMerge: 'https://opentshost.com/supersites/docshift/en/tools/pdf-merge',
  pdfMetadata: 'https://opentshost.com/supersites/docshift/en/tools/metadata-cleaner',
}

export const guideCatalog: Guide[] = [
  {
    slug: 'dns-propagation-troubleshooting',
    category: 'network',
    reviewedAt: '2026-08-04',
    readingMinutes: 9,
    localized: {
      en: {
        title: 'DNS propagation troubleshooting: a decision-first workflow',
        description: 'Learn how to separate a real DNS change from cache, delegation and local resolver problems without repeatedly changing records.',
        eyebrow: 'DNS and domains',
        summary: 'A DNS change is not proven by one successful lookup. The useful question is whether authoritative servers publish the intended value, recursive resolvers are converging, and the application behind the record is ready. This workflow checks those layers in order so you do not create a second problem while trying to fix the first.',
        takeaways: [
          'Record the old value, new value, record type and expected TTL before editing DNS.',
          'Check authoritative nameservers before interpreting global resolver results.',
          'Treat mixed answers during the TTL window as evidence, not automatically as failure.',
          'Verify CNAME chains, DNSSEC and application readiness when the final value looks correct.',
          'Avoid repeated edits: each change restarts the investigation and may extend inconsistency.',
        ],
        sections: [
          {
            heading: '1. Define the exact change',
            paragraphs: [
              'Write down the hostname, record type, previous value, intended value, TTL and the moment the change was saved. “The domain is broken” is too broad: the apex A record, a www CNAME, MX routing and a TXT verification record follow different paths and may fail independently.',
              'Confirm that you edited the active DNS zone. The registrar may show one DNS editor while the domain delegates to nameservers operated elsewhere. A correct record in an inactive zone will never be returned publicly.',
            ],
            checklist: ['Hostname and record type are exact', 'Active authoritative nameservers are known', 'Old and intended values are recorded', 'Change time and TTL are recorded'],
          },
          {
            heading: '2. Ask the authoritative servers first',
            paragraphs: [
              'Authoritative nameservers are the source for the zone. Query more than one of them. If they disagree, the issue is zone publication or nameserver synchronization—not ordinary propagation. If they all return the old value, wait for the provider to publish the change or review the zone you edited.',
              'Also inspect the response code. NXDOMAIN means the queried name does not exist; NOERROR with no requested answer can indicate an empty response, delegation detail or a record type that is not present. A timeout is a reachability problem and should not be read as proof that the record is missing.',
            ],
          },
          {
            heading: '3. Compare recursive resolvers with the TTL in mind',
            paragraphs: [
              'Recursive resolvers cache answers to reduce latency and load. A resolver that cached the old answer shortly before your edit may keep it until the remaining TTL expires. That is why global checks can legitimately show both values for a period after an authoritative change.',
              'Compare several independent locations and record the timestamp. A steady increase in the intended value is normal convergence. A stable regional split after the expected cache window deserves investigation into delegation, DNSSEC, geo-aware DNS or inconsistent authoritative answers.',
            ],
          },
          {
            heading: '4. Check the layers DNS does not prove',
            paragraphs: [
              'A correct address record only points clients toward a destination. It does not prove that TLS covers the hostname, the web server recognizes it, redirects are correct, the mail provider accepts the domain or the application is healthy. Test the destination separately after DNS returns the expected value.',
              'For CNAMEs, follow the entire chain and confirm that every target resolves. For DNSSEC-enabled zones, a stale DS record or invalid signature can make validating resolvers fail even when a non-validating lookup appears normal.',
            ],
            checklist: ['CNAME targets resolve to a final answer', 'TLS certificate covers the hostname', 'HTTP status and redirects are expected', 'DNSSEC validation is healthy when enabled'],
          },
          {
            heading: '5. Know when to wait and when to act',
            paragraphs: [
              'Wait when authoritative servers agree on the intended value and remaining differences fit the previous TTL. Act when authoritative servers disagree, delegation points to the wrong provider, the expected cache window has passed without convergence, or the destination service is not configured for the hostname.',
              'Save a short incident note with the exact queries, locations, values and times. This turns “it works for me” into comparable evidence and gives a DNS provider enough detail to investigate without guesswork.',
            ],
          },
        ],
        faq: [
          { question: 'Does DNS propagation always take 24 to 48 hours?', answer: 'No. The practical window depends on previous cache state, TTL, provider publication and delegation. Many changes converge much sooner, while a delegation or DNSSEC problem will not be fixed merely by waiting.' },
          { question: 'Should I lower the TTL after the change?', answer: 'Lowering it after resolvers cached the old value does not shorten that existing cache. For planned work, lower TTL before the change, allow the old TTL to expire, then restore a sensible value after stability.' },
          { question: 'Why does my computer show a different result?', answer: 'Your device, router, ISP resolver, VPN or browser may use a different cache path. Compare the authoritative answer and multiple public resolvers before flushing local caches.' },
          { question: 'Can a propagation checker guarantee the site will work?', answer: 'No. It can compare DNS answers. TLS, HTTP routing, application health, firewall rules and mail acceptance require separate checks.' },
        ],
        sources: [
          { label: 'RFC 1034 — Domain names: concepts and facilities', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc1034', note: 'Authoritative data, resolvers, caching and the DNS model.' },
          { label: 'RFC 1035 — Domain names: implementation and specification', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc1035', note: 'Record formats, messages and resolver behavior.' },
        ],
        relatedTools: [
          { label: 'DNS propagation checker', href: tools.dnsPropagation, note: 'Compare answers across resolver locations.' },
          { label: 'DNS lookup', href: tools.dnsLookup, note: 'Inspect a record and its returned values.' },
          { label: 'Website status checker', href: tools.status, note: 'Verify the destination after DNS is correct.' },
        ],
      },
      'pt-br': {
        title: 'Propagação DNS: um roteiro de diagnóstico orientado por decisões',
        description: 'Aprenda a separar uma alteração DNS real de problemas de cache, delegação e resolvedor local sem editar registros repetidamente.',
        eyebrow: 'DNS e domínios',
        summary: 'Uma consulta bem-sucedida não comprova sozinha uma mudança de DNS. É preciso verificar se os servidores autoritativos publicam o valor desejado, se os resolvedores recursivos estão convergindo e se a aplicação de destino está pronta. Este roteiro confere essas camadas na ordem certa.',
        takeaways: [
          'Anote valor antigo, valor novo, tipo de registro e TTL antes de editar.',
          'Consulte os servidores autoritativos antes de interpretar resultados globais.',
          'Durante a janela de TTL, respostas mistas são evidência e não falha automática.',
          'Confira cadeias CNAME, DNSSEC e a aplicação quando o valor final parece correto.',
          'Evite novas edições durante o diagnóstico: elas confundem a linha do tempo.',
        ],
        sections: [
          {
            heading: '1. Defina exatamente o que mudou',
            paragraphs: [
              'Registre hostname, tipo, valor anterior, valor desejado, TTL e horário em que salvou a alteração. “O domínio está com problema” é amplo demais: registro A do domínio raiz, CNAME de www, MX e TXT de verificação percorrem caminhos distintos.',
              'Confirme que a zona editada é a zona ativa. O registrador pode oferecer um editor, mas o domínio pode delegar a servidores de outro provedor. Um registro correto em uma zona inativa nunca aparecerá publicamente.',
            ],
            checklist: ['Hostname e tipo estão exatos', 'Nameservers autoritativos ativos são conhecidos', 'Valores antigo e novo foram anotados', 'Horário e TTL foram registrados'],
          },
          {
            heading: '2. Pergunte primeiro aos servidores autoritativos',
            paragraphs: [
              'Os servidores autoritativos são a fonte da zona. Consulte mais de um. Se eles discordam, o problema está na publicação ou sincronização da zona, e não no cache comum. Se todos retornam o valor antigo, revise a zona editada ou aguarde a publicação pelo provedor.',
              'Observe também o código de resposta. NXDOMAIN indica que o nome consultado não existe; NOERROR sem a resposta pedida pode apontar ausência daquele tipo. Timeout significa falta de resposta e não prova que o registro está ausente.',
            ],
          },
          {
            heading: '3. Compare resolvedores considerando o TTL',
            paragraphs: [
              'Resolvedores recursivos guardam respostas para reduzir latência. Quem consultou o valor antigo pouco antes da mudança pode mantê-lo até o TTL restante terminar. Por isso, verificações globais podem mostrar legitimamente dois valores por algum tempo.',
              'Compare locais independentes e registre o horário. O crescimento gradual do novo valor indica convergência normal. Uma divisão regional estável depois da janela esperada pede análise de delegação, DNSSEC, DNS geográfico ou respostas autoritativas inconsistentes.',
            ],
          },
          {
            heading: '4. Verifique o que o DNS não comprova',
            paragraphs: [
              'Um registro de endereço correto apenas aponta para um destino. Ele não comprova que o certificado TLS cobre o hostname, que o servidor web reconhece o domínio, que os redirecionamentos estão certos ou que a aplicação está saudável. Teste o destino separadamente.',
              'Em CNAMEs, siga a cadeia inteira. Em zonas com DNSSEC, um registro DS antigo ou uma assinatura inválida pode fazer resolvedores validadores falharem, mesmo que uma consulta sem validação pareça normal.',
            ],
            checklist: ['CNAME chega a uma resposta final', 'Certificado TLS cobre o hostname', 'Status HTTP e redirects estão corretos', 'DNSSEC valida quando habilitado'],
          },
          {
            heading: '5. Saiba quando esperar e quando agir',
            paragraphs: [
              'Espere quando os autoritativos concordam com o valor pretendido e as diferenças cabem no TTL anterior. Aja quando eles discordam, a delegação aponta para o provedor errado, a janela de cache terminou sem convergência ou o serviço de destino não está configurado para o hostname.',
              'Guarde uma nota curta com consultas, locais, valores e horários. Isso transforma “aqui funciona” em evidência comparável e dá ao provedor informações suficientes para investigar sem adivinhação.',
            ],
          },
        ],
        faq: [
          { question: 'Propagação DNS sempre leva de 24 a 48 horas?', answer: 'Não. A janela depende do cache anterior, TTL, publicação do provedor e delegação. Muitas mudanças convergem antes; problemas de delegação ou DNSSEC não se resolvem apenas esperando.' },
          { question: 'Devo baixar o TTL depois da mudança?', answer: 'Baixar depois não reduz caches já existentes. Em mudança planejada, reduza antes, espere o TTL antigo vencer e restaure um valor adequado após a estabilização.' },
          { question: 'Por que meu computador mostra outro resultado?', answer: 'Dispositivo, roteador, provedor, VPN ou navegador podem usar caches diferentes. Compare autoritativos e resolvedores públicos antes de limpar caches locais.' },
          { question: 'O verificador garante que o site vai funcionar?', answer: 'Não. Ele compara respostas DNS. TLS, roteamento HTTP, aplicação, firewall e aceitação de e-mail exigem testes próprios.' },
        ],
        sources: [
          { label: 'RFC 1034 — conceitos e recursos do DNS', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc1034', note: 'Dados autoritativos, resolvedores, cache e modelo DNS.' },
          { label: 'RFC 1035 — implementação e especificação do DNS', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc1035', note: 'Registros, mensagens e comportamento de resolvedores.' },
        ],
        relatedTools: [
          { label: 'Verificador de propagação DNS', href: tools.dnsPropagation.replace('/en/', '/pt-br/'), note: 'Compare respostas em vários locais.' },
          { label: 'Consulta DNS', href: tools.dnsLookup.replace('/en/', '/pt-br/'), note: 'Inspecione um registro e seus valores.' },
          { label: 'Status de website', href: tools.status.replace('/en/', '/pt-br/'), note: 'Teste o destino depois de corrigir o DNS.' },
        ],
      },
    },
  },
  {
    slug: 'spf-dkim-dmarc-checklist',
    category: 'email',
    reviewedAt: '2026-08-04',
    readingMinutes: 10,
    localized: {
      en: {
        title: 'SPF, DKIM and DMARC: a rollout checklist that protects legitimate mail',
        description: 'Map senders, align SPF and DKIM, read DMARC reports and move to enforcement without guessing or breaking valid email.',
        eyebrow: 'Email authentication',
        summary: 'SPF, DKIM and DMARC solve related but different parts of email authentication. A safe rollout begins by inventorying every legitimate sender, makes at least one authenticated identity align with the visible From domain, observes real traffic, and only then tightens policy.',
        takeaways: [
          'Inventory people, applications, support desks, marketing tools and transactional senders first.',
          'Keep one SPF record per domain and account for the ten-DNS-lookup processing limit.',
          'Sign with DKIM using an aligned domain and rotate keys through the sending provider.',
          'Start DMARC in monitoring mode with a real aggregate-report mailbox.',
          'Move toward quarantine or reject only after legitimate sources consistently align.',
        ],
        sections: [
          { heading: '1. Build a sender inventory', paragraphs: ['List every system allowed to send using your visible From domain: employee mail, forms, receipts, support, CRM, newsletters, monitoring and vendors. Include rarely used systems such as billing reminders and password resets.', 'Capture the envelope-from domain, DKIM signing domain, provider owner and a test contact for each source. This prevents a policy change from silently blocking a small but important mail stream.'], checklist: ['Every sending service has an owner', 'Transactional and marketing streams are included', 'Forwarding and mailing-list paths are identified', 'A test message can be generated from each source'] },
          { heading: '2. Make SPF precise and maintainable', paragraphs: ['SPF authorizes hosts for the SMTP identity, not the human-visible From address by itself. Publish a single SPF TXT record for each domain and merge providers deliberately. Multiple SPF records cause a permanent evaluation error.', 'Review include chains and the protocol processing limit. Remove retired services instead of accumulating authorizations forever. A message can still pass DMARC through aligned DKIM when SPF does not align, so do not treat SPF as the entire solution.'] },
          { heading: '3. Use aligned DKIM signatures', paragraphs: ['DKIM signs selected message headers and body content. The receiver retrieves a public key from DNS and verifies that a responsible signing domain created an intact signature. For DMARC, the signing domain must align with the visible From domain.', 'Enable DKIM in every provider, prefer modern key sizes offered by that provider, document selectors and rotate keys without deleting the old public key before queued mail has cleared. Send a real message and inspect Authentication-Results rather than trusting a setup screen alone.'] },
          { heading: '4. Observe DMARC before enforcement', paragraphs: ['Publish a valid DMARC record at the _dmarc label and send aggregate reports to a monitored mailbox or reporting service. Monitoring mode lets you discover forgotten senders and alignment failures while receivers continue normal disposition.', 'Group reports by source and volume. Investigate unknown high-volume sources, but distinguish abuse from a legitimate vendor using an unaligned identity. Fix the sender rather than permanently weakening policy.'], checklist: ['Aggregate reports are arriving', 'Known sources pass through SPF or DKIM alignment', 'Unknown sources are investigated', 'Forwarding behavior is understood'] },
          { heading: '5. Increase policy with rollback evidence', paragraphs: ['When legitimate traffic is consistently aligned, advance policy in measured steps. Record the previous record, change time, expected effect and rollback owner. Watch delivery telemetry and reports after every change.', 'Authentication proves domain authorization and message integrity signals; it does not prove that content is safe or wanted. Reputation, complaint rates, list hygiene and secure account access still affect deliverability.'] },
        ],
        faq: [
          { question: 'Does a DMARC pass require both SPF and DKIM?', answer: 'No. DMARC can pass when at least one supported authenticated identifier passes and aligns with the visible From domain. Operating both gives resilience.' },
          { question: 'Can I publish more than one SPF record?', answer: 'No. A domain should return one SPF policy. Combine authorized mechanisms carefully and stay within protocol evaluation limits.' },
          { question: 'Should a new domain start with p=reject?', answer: 'Usually not without evidence. Begin by monitoring real traffic, fix legitimate alignment gaps, then increase enforcement with a rollback plan.' },
          { question: 'Will authentication guarantee inbox placement?', answer: 'No. It establishes authorization and policy signals. Reputation, content, recipient engagement and provider decisions remain separate.' },
        ],
        sources: [
          { label: 'RFC 7208 — Sender Policy Framework', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc7208', note: 'SPF authorization and processing rules.' },
          { label: 'RFC 6376 — DomainKeys Identified Mail', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc6376', note: 'DKIM signatures and verification.' },
          { label: 'RFC 9989 — DMARC', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc9989', note: 'Current DMARC participation, alignment, policy and reporting guidance.' },
        ],
        relatedTools: [
          { label: 'SPF checker', href: tools.spf, note: 'Inspect the published SPF policy.' },
          { label: 'DKIM checker', href: tools.dkim, note: 'Check a selector and public key.' },
          { label: 'DMARC checker', href: tools.dmarc, note: 'Review policy and reporting tags.' },
        ],
      },
      'pt-br': {
        title: 'SPF, DKIM e DMARC: checklist para proteger e-mails legítimos',
        description: 'Mapeie remetentes, alinhe SPF e DKIM, leia relatórios DMARC e avance a política sem adivinhação nem bloqueio indevido.',
        eyebrow: 'Autenticação de e-mail',
        summary: 'SPF, DKIM e DMARC resolvem partes relacionadas, mas diferentes, da autenticação. Uma implantação segura começa pelo inventário de todos os remetentes legítimos, alinha ao menos uma identidade autenticada ao domínio visível no From, observa o tráfego real e só depois endurece a política.',
        takeaways: ['Mapeie pessoas, aplicações, suporte, marketing e mensagens transacionais.', 'Mantenha um único registro SPF e respeite o limite de consultas DNS do protocolo.', 'Assine com DKIM usando domínio alinhado e faça rotação de chaves.', 'Comece DMARC em monitoramento com uma caixa real para relatórios.', 'Use quarantine ou reject apenas depois de confirmar o alinhamento das fontes legítimas.'],
        sections: [
          { heading: '1. Faça o inventário de remetentes', paragraphs: ['Liste cada sistema autorizado a usar o domínio visível no From: e-mail corporativo, formulários, recibos, suporte, CRM, newsletters, monitoramento e fornecedores. Inclua fluxos raros, como redefinição de senha e cobrança.', 'Anote domínio de envelope, domínio de assinatura DKIM, responsável pelo provedor e contato de teste. Isso evita que uma mudança bloqueie silenciosamente um fluxo pequeno e importante.'], checklist: ['Cada serviço tem responsável', 'Fluxos transacionais e de marketing estão incluídos', 'Encaminhamentos e listas foram identificados', 'É possível gerar mensagem de teste por origem'] },
          { heading: '2. Torne o SPF preciso e sustentável', paragraphs: ['SPF autoriza hosts para a identidade SMTP; sozinho, não autentica o endereço From visível. Publique um único TXT SPF por domínio e una provedores de forma consciente. Vários registros SPF produzem erro permanente.', 'Revise cadeias de include e o limite de processamento. Remova serviços antigos. Uma mensagem também pode passar DMARC por DKIM alinhado quando SPF não alinha, portanto SPF não é a solução completa.'] },
          { heading: '3. Use assinaturas DKIM alinhadas', paragraphs: ['DKIM assina cabeçalhos selecionados e o corpo da mensagem. O destinatário busca a chave pública no DNS e verifica se o domínio assinante produziu uma assinatura íntegra. Para DMARC, esse domínio precisa alinhar com o From visível.', 'Ative DKIM em cada provedor, documente seletores e faça rotação sem remover a chave antiga antes de esvaziar filas. Envie uma mensagem real e examine Authentication-Results, não apenas a tela de configuração.'] },
          { heading: '4. Observe DMARC antes de bloquear', paragraphs: ['Publique um registro válido em _dmarc e direcione relatórios agregados para uma caixa monitorada ou serviço de análise. O modo de monitoramento revela remetentes esquecidos e falhas de alinhamento sem pedir bloqueio imediato.', 'Agrupe relatórios por origem e volume. Investigue fontes desconhecidas, mas diferencie abuso de fornecedor legítimo com identidade desalinhada. Corrija o remetente em vez de enfraquecer a política para sempre.'], checklist: ['Relatórios agregados estão chegando', 'Fontes conhecidas alinham SPF ou DKIM', 'Fontes desconhecidas foram investigadas', 'Encaminhamentos são compreendidos'] },
          { heading: '5. Avance com evidência e rollback', paragraphs: ['Quando o tráfego legítimo estiver consistentemente alinhado, aumente a política em passos medidos. Registre valor anterior, horário, efeito esperado e responsável pelo rollback. Observe entrega e relatórios após cada mudança.', 'Autenticação comprova autorização do domínio e sinais de integridade; não prova que o conteúdo é seguro ou desejado. Reputação, reclamações, higiene de lista e proteção das contas continuam relevantes.'] },
        ],
        faq: [
          { question: 'DMARC exige que SPF e DKIM passem juntos?', answer: 'Não. DMARC pode passar quando ao menos uma identidade autenticada suportada passa e alinha com o From. Operar ambos aumenta a resiliência.' },
          { question: 'Posso publicar mais de um SPF?', answer: 'Não. O domínio deve retornar uma política SPF. Combine mecanismos autorizados e respeite os limites de avaliação.' },
          { question: 'Um domínio novo deve começar com p=reject?', answer: 'Normalmente não sem evidência. Primeiro monitore o tráfego, corrija alinhamentos e só então avance com plano de rollback.' },
          { question: 'Autenticação garante chegada na caixa de entrada?', answer: 'Não. Ela estabelece autorização e política. Reputação, conteúdo, engajamento e decisões do provedor são fatores separados.' },
        ],
        sources: [
          { label: 'RFC 7208 — Sender Policy Framework', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc7208', note: 'Autorização e processamento SPF.' },
          { label: 'RFC 6376 — DomainKeys Identified Mail', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc6376', note: 'Assinaturas e verificação DKIM.' },
          { label: 'RFC 9989 — DMARC', publisher: 'IETF', href: 'https://datatracker.ietf.org/doc/html/rfc9989', note: 'Orientação atual de alinhamento, política e relatórios.' },
        ],
        relatedTools: [
          { label: 'Verificador SPF', href: tools.spf.replace('/en/', '/pt-br/'), note: 'Inspecione a política SPF publicada.' },
          { label: 'Verificador DKIM', href: tools.dkim.replace('/en/', '/pt-br/'), note: 'Confira seletor e chave pública.' },
          { label: 'Verificador DMARC', href: tools.dmarc.replace('/en/', '/pt-br/'), note: 'Revise política e tags de relatório.' },
        ],
      },
    },
  },
  {
    slug: 'website-launch-technical-checklist',
    category: 'web',
    reviewedAt: '2026-08-04',
    readingMinutes: 10,
    localized: {
      en: {
        title: 'Website launch checklist: verify the public path, not just the homepage',
        description: 'A practical pre-launch sequence for DNS, HTTPS, redirects, crawl controls, sitemaps, metadata, errors and mobile usability.',
        eyebrow: 'Web operations',
        summary: 'A homepage loading on one laptop is not a launch test. A reliable release verifies the public hostname, response chain, representative routes, crawler instructions, metadata and recovery path from outside the development environment.',
        takeaways: ['Test the final public hostname from a clean client.', 'Keep redirects short, intentional and free of loops.', 'Make robots.txt and sitemap agree with the URLs you want indexed.', 'Check representative content, error and localized routes—not only `/`.', 'Record rollback steps before changing traffic.'],
        sections: [
          { heading: '1. Define the release contract', paragraphs: ['List the public hostnames, canonical scheme, base path, supported languages and representative routes. Include a content page, interactive tool, legal page, static asset, 404 and any important redirect.', 'Write the expected result for each route: final URL, status code, page marker and whether it should be indexed. A release check is actionable only when “correct” is explicit.'], checklist: ['Primary and alternate hostnames listed', 'Canonical HTTPS URL decided', 'Representative routes selected', 'Rollback owner and trigger recorded'] },
          { heading: '2. Verify DNS, TLS and the response chain', paragraphs: ['Resolve the public hostname using independent resolvers, then connect over HTTPS. Confirm the certificate covers the hostname, is currently valid and serves the intended application.', 'Follow redirects without browser cache. HTTP-to-HTTPS and alternate-host redirects should reach one canonical destination. Long chains waste time and create more failure points; loops or mixed destinations must block the release.'] },
          { heading: '3. Align crawl controls and discovery', paragraphs: ['Fetch robots.txt exactly where crawlers will request it. Confirm it does not block required pages or critical assets and that any sitemap reference points to a reachable, current file.', 'A sitemap is a discovery hint, not a quality certificate. Include canonical URLs that you want in search, omit private or duplicate paths, and make every important URL reachable through normal internal links as well.'], checklist: ['robots.txt returns 200', 'Sitemap references are reachable', 'Sitemap URLs are canonical and return 200', 'No accidental noindex on public content'] },
          { heading: '4. Inspect rendered pages as users and crawlers receive them', paragraphs: ['For each representative route, verify one clear H1, useful title and description, canonical URL, language metadata, visible main content and working internal links. Localized pages should point only to real reciprocal translations.', 'Test mobile width, keyboard focus, form labels, validation messages and horizontal overflow. Confirm the core free task works without signup. Error states should explain the next step instead of exposing stack traces or empty panels.'] },
          { heading: '5. Observe, roll back and re-check', paragraphs: ['After publication, run the same checks against the live origin and inspect server or application errors. Compare the deployed asset or release identifier with the intended commit so a green test is tied to the right version.', 'Rollback when a critical route, certificate, canonical path, data boundary or core action fails. After recovery, repeat the public checks; do not assume reverting files also reverted caches, routing or DNS.'] },
        ],
        faq: [
          { question: 'Is a 200 response enough?', answer: 'No. A generic fallback or error page can return 200. Check the final URL, expected page marker, metadata and core action.' },
          { question: 'Should every URL appear in the sitemap?', answer: 'No. Include canonical URLs you want discovered and indexed. Navigation must still link important pages.' },
          { question: 'Can robots.txt remove a page from search?', answer: 'Blocking crawl does not reliably remove an already known URL. Use the appropriate indexing control and follow current search-engine guidance.' },
          { question: 'When should a launch be rolled back?', answer: 'When the core public path, security boundary, canonical routing or essential user task is broken and a quick, well-understood fix is not safer than rollback.' },
        ],
        sources: [
          { label: 'Google Search technical requirements', publisher: 'Google Search Central', href: 'https://developers.google.com/search/docs/essentials/technical', note: 'Baseline requirements for crawlable and indexable pages.' },
          { label: 'Learn about sitemaps', publisher: 'Google Search Central', href: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview', note: 'Discovery, linking and sitemap limitations.' },
          { label: 'OWASP Secure Headers Project', publisher: 'OWASP', href: 'https://owasp.org/www-project-secure-headers/', note: 'Security-header purpose and current guidance.' },
        ],
        relatedTools: [
          { label: 'HTTP status checker', href: tools.status, note: 'Verify response and timing.' },
          { label: 'Redirect checker', href: tools.redirects, note: 'Inspect each hop to the final URL.' },
          { label: 'Security headers', href: tools.headers, note: 'Review public response headers.' },
          { label: 'Robots.txt checker', href: tools.robots, note: 'Inspect crawler directives.' },
          { label: 'Sitemap validator', href: tools.sitemap, note: 'Check shape, reachability and URL count.' },
        ],
      },
      'pt-br': {
        title: 'Checklist de publicação: valide o caminho público, não apenas a home',
        description: 'Sequência prática para conferir DNS, HTTPS, redirects, rastreamento, sitemap, metadados, erros e uso no celular.',
        eyebrow: 'Operação de websites',
        summary: 'A home abrir em um notebook não é um teste de publicação. Uma entrega confiável verifica hostname público, cadeia de resposta, rotas representativas, instruções para crawlers, metadados e caminho de recuperação fora do ambiente de desenvolvimento.',
        takeaways: ['Teste o hostname final a partir de um cliente limpo.', 'Mantenha redirects curtos, intencionais e sem loops.', 'Faça robots.txt e sitemap concordarem com as URLs desejadas.', 'Valide conteúdo, erro e idiomas — não só `/`.', 'Registre o rollback antes de alterar o tráfego.'],
        sections: [
          { heading: '1. Defina o contrato da entrega', paragraphs: ['Liste hostnames públicos, esquema canônico, caminho-base, idiomas e rotas representativas. Inclua conteúdo, ferramenta interativa, página legal, asset, 404 e redirects importantes.', 'Anote o resultado esperado: URL final, status, marcador da página e indexação desejada. Uma verificação de entrega só é acionável quando “correto” está explícito.'], checklist: ['Hostnames principal e alternativos listados', 'URL HTTPS canônica decidida', 'Rotas representativas escolhidas', 'Responsável e gatilho de rollback registrados'] },
          { heading: '2. Confira DNS, TLS e cadeia de resposta', paragraphs: ['Resolva o hostname público com resolvedores independentes e conecte por HTTPS. Confirme que o certificado cobre o hostname, está válido e entrega a aplicação desejada.', 'Siga os redirects sem cache do navegador. HTTP e hosts alternativos devem chegar a um único destino canônico. Cadeias longas aumentam latência e pontos de falha; loops ou destinos mistos bloqueiam a entrega.'] },
          { heading: '3. Alinhe rastreamento e descoberta', paragraphs: ['Busque robots.txt exatamente onde o crawler buscará. Confirme que ele não bloqueia páginas ou assets necessários e que referências de sitemap apontam para arquivos atuais e acessíveis.', 'Sitemap é pista de descoberta, não certificado de qualidade. Inclua URLs canônicas desejadas na busca, retire caminhos privados ou duplicados e mantenha links internos normais para cada página importante.'], checklist: ['robots.txt retorna 200', 'Sitemaps referenciados estão acessíveis', 'URLs do sitemap são canônicas e retornam 200', 'Conteúdo público não tem noindex acidental'] },
          { heading: '4. Inspecione o HTML entregue a usuários e crawlers', paragraphs: ['Em cada rota, confira H1 claro, título e descrição úteis, canonical, idioma, conteúdo principal visível e links internos. Páginas localizadas só devem anunciar traduções recíprocas que realmente existem.', 'Teste largura móvel, foco por teclado, labels, mensagens de validação e overflow horizontal. A tarefa gratuita principal deve funcionar sem cadastro. Erros precisam orientar o próximo passo.'] },
          { heading: '5. Observe, reverta e teste novamente', paragraphs: ['Após publicar, repita os testes contra a origem pública e procure erros. Compare asset ou identificador da release ao commit pretendido para ligar o resultado verde à versão certa.', 'Reverta quando rota crítica, certificado, canonical, limite de dados ou ação central falhar. Depois da recuperação, repita o teste público: reverter arquivos não garante que cache, roteamento ou DNS também voltaram.'] },
        ],
        faq: [
          { question: 'Resposta 200 é suficiente?', answer: 'Não. Uma página genérica ou de erro pode retornar 200. Confira URL final, marcador esperado, metadados e ação principal.' },
          { question: 'Toda URL deve entrar no sitemap?', answer: 'Não. Inclua URLs canônicas que devem ser descobertas e indexadas. A navegação ainda precisa ligar as páginas importantes.' },
          { question: 'robots.txt remove uma página da busca?', answer: 'Bloquear rastreamento não remove de forma confiável uma URL já conhecida. Use o controle de indexação apropriado e siga a orientação atual do buscador.' },
          { question: 'Quando devo fazer rollback?', answer: 'Quando o caminho público, limite de segurança, roteamento canônico ou tarefa essencial falha e uma correção rápida não é mais segura que a reversão.' },
        ],
        sources: [
          { label: 'Requisitos técnicos do Google Search', publisher: 'Google Search Central', href: 'https://developers.google.com/search/docs/essentials/technical', note: 'Base para páginas rastreáveis e indexáveis.' },
          { label: 'Entenda sitemaps', publisher: 'Google Search Central', href: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview', note: 'Descoberta, links e limites de sitemap.' },
          { label: 'OWASP Secure Headers Project', publisher: 'OWASP', href: 'https://owasp.org/www-project-secure-headers/', note: 'Finalidade e orientação atual para headers.' },
        ],
        relatedTools: [
          { label: 'Status HTTP', href: tools.status.replace('/en/', '/pt-br/'), note: 'Confira resposta e tempo.' },
          { label: 'Redirects', href: tools.redirects.replace('/en/', '/pt-br/'), note: 'Inspecione cada salto.' },
          { label: 'Headers de segurança', href: tools.headers.replace('/en/', '/pt-br/'), note: 'Revise headers públicos.' },
          { label: 'Robots.txt', href: tools.robots.replace('/en/', '/pt-br/'), note: 'Inspecione diretivas.' },
          { label: 'Validador de sitemap', href: tools.sitemap.replace('/en/', '/pt-br/'), note: 'Confira formato e URLs.' },
        ],
      },
    },
  },
  {
    slug: 'private-file-processing',
    category: 'privacy',
    reviewedAt: '2026-08-04',
    readingMinutes: 8,
    localized: {
      en: {
        title: 'Private file processing: decide what should stay in your browser',
        description: 'A practical framework for images and PDFs: classify the file, verify where processing happens, remove metadata and inspect the output.',
        eyebrow: 'Files and privacy',
        summary: '“Online tool” does not automatically mean “uploaded to a server,” and “local” does not automatically make every workflow safe. The useful decision is based on file sensitivity, processing architecture, browser context, output review and your organization’s rules.',
        takeaways: ['Classify the file before choosing a tool.', 'Verify whether bytes leave the device; do not rely on a vague privacy badge.', 'Use a current browser and close unrelated tabs for sensitive local work.', 'Inspect metadata and visual output after transformation.', 'Do not process regulated or contract-restricted files without authorization.'],
        sections: [
          { heading: '1. Classify the file and the consequence of exposure', paragraphs: ['Separate public assets from internal, personal, confidential and regulated material. A marketing image already published on a website has a different risk from an identity document, health record, client contract or unreleased financial report.', 'Ask who owns the file, who is allowed to process it, how long the output should exist and what harm an unintended copy could cause. If policy or contract prohibits a web workflow, convenience does not override that rule.'], checklist: ['Owner and sensitivity are known', 'Processing is authorized', 'Retention expectation is clear', 'A lower-risk sample can be used first'] },
          { heading: '2. Verify the processing boundary', paragraphs: ['Browser-side processing uses web APIs and code running on your device. A genuine local workflow can read a file selected by you and create an output without transmitting file bytes to an application server. Network inspection or clear technical documentation provides stronger evidence than marketing language.', 'The page itself still arrives from a server, and extensions, compromised devices or third-party scripts can affect the environment. Use a trusted device, current browser and the expected site origin. For highly sensitive work, an approved offline application or controlled workstation may be the right boundary.'] },
          { heading: '3. Minimize before transforming', paragraphs: ['Work on a copy. Remove pages, layers or images that are not needed before further processing. For screenshots, crop unrelated conversations, tabs and account details. For documents, redact with a method that removes underlying content rather than merely drawing a visible rectangle.', 'Metadata can include creation software, timestamps, author fields, GPS coordinates and document properties. Remove what is unnecessary, but keep information required for accessibility, evidence, rights management or organizational records.'] },
          { heading: '4. Inspect output, not just the success message', paragraphs: ['Open the resulting file independently. Confirm page order, image quality, transparency, text selection, links, orientation and expected metadata. Compression and conversion can change color, remove animation, flatten forms or make text unreadable.', 'If the output will be published, also check dimensions, file size and accessibility. Keep the original until the new file has been verified and backed up according to your normal policy.'], checklist: ['Output opens in an independent viewer', 'Sensitive metadata was reviewed', 'Visual and text quality are acceptable', 'Original remains recoverable until approval'] },
          { heading: '5. Understand what the tool cannot promise', paragraphs: ['A browser tool cannot certify legal compliance, prove that the source device is clean or decide whether you had authority to process a file. Local execution reduces one transfer path; it does not remove human error, unsafe sharing or endpoint risk.', 'For regulated records, litigation evidence, signed documents or confidential client work, follow the applicable policy and use approved systems. When uncertain, test the workflow with synthetic data and ask the data owner before introducing real material.'] },
        ],
        faq: [
          { question: 'Can a website process a file without uploading it?', answer: 'Yes. Browser APIs can read a user-selected file and generate an output locally. The specific application must still be verified; the capability alone is not proof of its implementation.' },
          { question: 'Does removing metadata anonymize a file?', answer: 'Not necessarily. Visible content, filenames, embedded text, document history or unique image details may still identify people or organizations.' },
          { question: 'Is compression lossless?', answer: 'It depends on the format and settings. Always inspect the result; image quality, PDF structure, forms or embedded content may change.' },
          { question: 'Should I delete the original immediately?', answer: 'No. Keep a recoverable original until the transformed output is verified and your retention policy permits deletion.' },
        ],
        sources: [
          { label: 'File API', publisher: 'W3C', href: 'https://www.w3.org/TR/FileAPI/', note: 'Browser model for user-selected files, blobs and local reads.' },
          { label: 'File API guide', publisher: 'MDN Web Docs', href: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications', note: 'How web applications handle files selected by users.' },
          { label: 'OWASP File Upload Cheat Sheet', publisher: 'OWASP', href: 'https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html', note: 'Risks and controls when a workflow does upload files.' },
        ],
        relatedTools: [
          { label: 'Image compressor', href: tools.imageCompressor, note: 'Compress images in the browser.' },
          { label: 'Image metadata cleaner', href: tools.imageMetadata, note: 'Review and remove image metadata.' },
          { label: 'PDF merge', href: tools.pdfMerge, note: 'Combine PDF files through the document workbench.' },
          { label: 'PDF metadata cleaner', href: tools.pdfMetadata, note: 'Inspect and clean document properties.' },
        ],
      },
      'pt-br': {
        title: 'Arquivos privados: decida o que deve permanecer no navegador',
        description: 'Um roteiro para imagens e PDFs: classifique o arquivo, verifique onde ocorre o processamento, remova metadados e confira a saída.',
        eyebrow: 'Arquivos e privacidade',
        summary: '“Ferramenta online” não significa automaticamente “upload para servidor”, e “local” não torna todo fluxo seguro. A decisão útil considera sensibilidade, arquitetura, contexto do navegador, revisão da saída e regras da organização.',
        takeaways: ['Classifique o arquivo antes de escolher a ferramenta.', 'Confirme se os bytes deixam o dispositivo; não dependa de um selo vago.', 'Use navegador atualizado e feche abas desnecessárias.', 'Revise metadados e resultado visual depois da transformação.', 'Não processe arquivos regulados ou restritos sem autorização.'],
        sections: [
          { heading: '1. Classifique o arquivo e a consequência da exposição', paragraphs: ['Separe material público de conteúdo interno, pessoal, confidencial e regulado. Uma imagem de marketing já publicada tem risco diferente de documento de identidade, prontuário, contrato de cliente ou relatório financeiro inédito.', 'Pergunte quem é o dono, quem pode processar, por quanto tempo a saída deve existir e qual seria o dano de uma cópia indevida. Se política ou contrato proíbe o fluxo web, conveniência não muda a regra.'], checklist: ['Dono e sensibilidade são conhecidos', 'Processamento está autorizado', 'Retenção está definida', 'É possível testar primeiro com amostra sem risco'] },
          { heading: '2. Confirme o limite de processamento', paragraphs: ['Processamento no navegador usa APIs e código executado no dispositivo. Um fluxo realmente local pode ler o arquivo escolhido e gerar a saída sem transmitir os bytes ao servidor da aplicação. Inspeção de rede ou documentação técnica clara vale mais que linguagem promocional.', 'A página ainda vem de um servidor, e extensões, dispositivo comprometido ou scripts terceiros afetam o ambiente. Use dispositivo confiável, navegador atual e origem esperada. Para material muito sensível, aplicativo offline aprovado pode ser o limite adequado.'] },
          { heading: '3. Minimize antes de transformar', paragraphs: ['Trabalhe em uma cópia. Remova páginas, camadas ou imagens desnecessárias. Em screenshots, corte conversas, abas e dados de conta. Em documentos, faça redação que retire o conteúdo subjacente, não apenas um retângulo visual.', 'Metadados podem incluir software, horários, autor, GPS e propriedades. Remova o que não é necessário, mas preserve informações exigidas para acessibilidade, prova, direitos ou registro organizacional.'] },
          { heading: '4. Inspecione a saída, não apenas a mensagem de sucesso', paragraphs: ['Abra o resultado em outro visualizador. Confira ordem, qualidade, transparência, seleção de texto, links, orientação e metadados. Compressão e conversão podem mudar cor, remover animação, achatar formulários ou prejudicar leitura.', 'Se a saída será publicada, confira dimensões, tamanho e acessibilidade. Preserve o original até validar e fazer o backup conforme sua política.'], checklist: ['Saída abre em visualizador independente', 'Metadados sensíveis foram revisados', 'Qualidade visual e textual está aceitável', 'Original continua recuperável até a aprovação'] },
          { heading: '5. Entenda o que a ferramenta não promete', paragraphs: ['Uma ferramenta no navegador não certifica conformidade jurídica, não prova que o dispositivo está limpo e não decide se havia autorização. Execução local reduz um caminho de transferência, mas não elimina erro humano, compartilhamento inseguro ou risco do endpoint.', 'Para registros regulados, provas, documentos assinados ou material confidencial de clientes, siga a política aplicável. Em dúvida, teste com dados sintéticos e consulte o dono antes de usar material real.'] },
        ],
        faq: [
          { question: 'Um site pode processar sem fazer upload?', answer: 'Sim. APIs do navegador podem ler um arquivo escolhido e gerar a saída localmente. A aplicação específica ainda precisa ser verificada.' },
          { question: 'Remover metadados anonimiza o arquivo?', answer: 'Não necessariamente. Conteúdo visível, nome, texto embutido, histórico ou detalhes únicos ainda podem identificar pessoas.' },
          { question: 'Compressão sempre preserva tudo?', answer: 'Depende do formato e das opções. Confira o resultado; qualidade, estrutura, formulários e conteúdo embutido podem mudar.' },
          { question: 'Devo apagar o original imediatamente?', answer: 'Não. Preserve uma cópia recuperável até validar a saída e até que a política de retenção permita a exclusão.' },
        ],
        sources: [
          { label: 'File API', publisher: 'W3C', href: 'https://www.w3.org/TR/FileAPI/', note: 'Modelo do navegador para arquivos escolhidos, blobs e leitura local.' },
          { label: 'Guia da File API', publisher: 'MDN Web Docs', href: 'https://developer.mozilla.org/pt-BR/docs/Web/API/File_API/Using_files_from_web_applications', note: 'Como aplicações web tratam arquivos selecionados.' },
          { label: 'OWASP File Upload Cheat Sheet', publisher: 'OWASP', href: 'https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html', note: 'Riscos e controles quando existe upload.' },
        ],
        relatedTools: [
          { label: 'Compressor de imagens', href: tools.imageCompressor.replace('/en/', '/pt-br/'), note: 'Comprima imagens no navegador.' },
          { label: 'Limpador de metadados de imagem', href: tools.imageMetadata.replace('/en/', '/pt-br/'), note: 'Revise e remova metadados.' },
          { label: 'Unir PDFs', href: tools.pdfMerge.replace('/en/', '/pt-br/'), note: 'Combine PDFs no workbench.' },
          { label: 'Metadados de PDF', href: tools.pdfMetadata.replace('/en/', '/pt-br/'), note: 'Inspecione propriedades do documento.' },
        ],
      },
    },
  },
  ...expandedGuideCatalog,
]

export function isGuideLocale(locale: LocaleCode | string): locale is GuideLocale {
  return guideLocales.includes(locale as GuideLocale)
}

export function localizedGuideIndexPath(locale: GuideLocale): string {
  return localizedPath(locale, 'guides')
}

export function localizedGuidePath(locale: GuideLocale, slug: string): string {
  return localizedPath(locale, 'guides', slug)
}

export function getGuideBySlug(slug: string): Guide | null {
  return guideCatalog.find((guide) => guide.slug === slug) ?? null
}

export function getGuideWordCount(guide: Guide, locale: GuideLocale): number {
  const copy = guide.localized[locale]
  const text = [
    copy.title,
    copy.description,
    copy.summary,
    ...copy.takeaways,
    ...copy.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.checklist ?? [])]),
    ...copy.faq.flatMap((item) => [item.question, item.answer]),
  ].join(' ')

  return text.trim().split(/\s+/u).filter(Boolean).length
}
