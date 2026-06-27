import type { LocaleCode } from './locales'
import { publicLocaleCodes } from './locales'

export const toolSlugs = [
  'spf-checker',
  'dkim-checker',
  'dmarc-checker',
  'mx-checker',
  'blacklist-check',
  'smtp-check',
  'header-analyzer',
] as const

export type ToolSlug = (typeof toolSlugs)[number]
export type ToolCategory = 'authentication' | 'dns' | 'reputation' | 'transport' | 'headers'

export interface ToolContentSection {
  heading: string
  paragraphs: string[]
}

export interface ToolFaq {
  question: string
  answer: string
}

export interface ToolCopy {
  navLabel: string
  title: string
  headline: string
  description: string
  inputLabel: string
  inputPlaceholder: string
  primaryAction: string
  previewResult: string
  statusLabel: string
  freeScope: string
  upgradeScope: string
  exampleTarget: string
  reviewedLabel: string
  methodology: string[]
  contentSections: ToolContentSection[]
  faq: ToolFaq[]
}

interface ToolSeed {
  navLabel: string
  title: string
  headline: string
  description: string
  inputLabel: string
  inputPlaceholder: string
  primaryAction: string
  previewResult: string
  statusLabel: string
  freeScope: string
  upgradeScope: string
  exampleTarget: string
  measure: string
  interpret: string
  example: string
  commonIssue: string
  fix: string
  limitation: string
  faq: ToolFaq[]
}

export interface ToolDefinition {
  slug: ToolSlug
  category: ToolCategory
  shortName: string
  checkType: 'spf' | 'dkim' | 'dmarc' | 'mx' | 'blacklist' | 'smtp' | 'headers'
  statusLabel: string
  freeScope: string
  upgradeScope: string
  exampleTarget: string
  localized: Record<LocaleCode, ToolCopy>
}

export interface HeaderFinding {
  label: string
  status: 'pass' | 'warn' | 'fail' | 'unknown'
  detail: string
}

export interface HeaderAnalysisResult {
  ok: boolean
  summary: string
  meta: Array<{ label: string; value: string }>
  findings: HeaderFinding[]
  error?: string
}

export const categoryLabels: Record<ToolCategory, string> = {
  authentication: 'Authentication',
  dns: 'DNS records',
  reputation: 'Reputation',
  transport: 'SMTP transport',
  headers: 'Message headers',
}

const localizedCategoryLabels: Record<LocaleCode, Record<ToolCategory, string>> = {
  en: categoryLabels,
  'pt-br': {
    authentication: 'Autenticacao',
    dns: 'Registros DNS',
    reputation: 'Reputacao',
    transport: 'Transporte SMTP',
    headers: 'Headers da mensagem',
  },
  es: {
    authentication: 'Autenticacion',
    dns: 'Registros DNS',
    reputation: 'Reputacion',
    transport: 'Transporte SMTP',
    headers: 'Headers del mensaje',
  },
  fr: {
    authentication: 'Authentification',
    dns: 'Enregistrements DNS',
    reputation: 'Reputation',
    transport: 'Transport SMTP',
    headers: 'Headers message',
  },
  de: {
    authentication: 'Authentifizierung',
    dns: 'DNS-Eintraege',
    reputation: 'Reputation',
    transport: 'SMTP-Transport',
    headers: 'Nachrichten-Header',
  },
}

const reviewedLabelByLocale: Record<LocaleCode, string> = {
  en: 'Reviewed June 27, 2026',
  'pt-br': 'Revisado em 27 de junho de 2026',
  es: 'Revisado el 27 de junio de 2026',
  fr: 'Revise le 27 juin 2026',
  de: 'Geprueft am 27. Juni 2026',
}

const sectionLabelsByLocale: Record<LocaleCode, {
  use: string
  interpret: string
  example: string
  issues: string
  limits: string
}> = {
  en: {
    use: 'How to use this check',
    interpret: 'How to interpret the result',
    example: 'Example',
    issues: 'Common issues and next steps',
    limits: 'Methodology and limits',
  },
  'pt-br': {
    use: 'Como usar este check',
    interpret: 'Como interpretar o resultado',
    example: 'Exemplo',
    issues: 'Problemas comuns e proximos passos',
    limits: 'Metodologia e limites',
  },
  es: {
    use: 'Como usar este check',
    interpret: 'Como interpretar el resultado',
    example: 'Ejemplo',
    issues: 'Problemas comunes y proximos pasos',
    limits: 'Metodologia y limites',
  },
  fr: {
    use: 'Comment utiliser ce controle',
    interpret: 'Comment interpreter le resultat',
    example: 'Exemple',
    issues: 'Problemes courants et prochaines etapes',
    limits: 'Methodologie et limites',
  },
  de: {
    use: 'So verwenden Sie diesen Check',
    interpret: 'So interpretieren Sie das Ergebnis',
    example: 'Beispiel',
    issues: 'Haeufige Probleme und naechste Schritte',
    limits: 'Methodik und Grenzen',
  },
}

function buildToolCopy(locale: LocaleCode, seed: ToolSeed): ToolCopy {
  const labels = sectionLabelsByLocale[locale]

  return {
    navLabel: seed.navLabel,
    title: seed.title,
    headline: seed.headline,
    description: seed.description,
    inputLabel: seed.inputLabel,
    inputPlaceholder: seed.inputPlaceholder,
    primaryAction: seed.primaryAction,
    previewResult: seed.previewResult,
    statusLabel: seed.statusLabel,
    freeScope: seed.freeScope,
    upgradeScope: seed.upgradeScope,
    exampleTarget: seed.exampleTarget,
    reviewedLabel: reviewedLabelByLocale[locale],
    methodology: [seed.measure, seed.interpret, seed.limitation],
    contentSections: [
      { heading: labels.use, paragraphs: [seed.description, seed.measure] },
      { heading: labels.interpret, paragraphs: [seed.interpret] },
      { heading: labels.example, paragraphs: [seed.example] },
      { heading: labels.issues, paragraphs: [seed.commonIssue, seed.fix] },
      { heading: labels.limits, paragraphs: [seed.limitation] },
    ],
    faq: seed.faq,
  }
}

function localized(seed: ToolSeed): Record<LocaleCode, ToolCopy> {
  return Object.fromEntries(publicLocaleCodes.map((locale) => [locale, buildToolCopy(locale, seed)])) as Record<LocaleCode, ToolCopy>
}

function makeTool(
  slug: ToolSlug,
  category: ToolCategory,
  shortName: string,
  checkType: ToolDefinition['checkType'],
  seed: ToolSeed,
): ToolDefinition {
  const copy = localized(seed)

  return {
    slug,
    category,
    shortName,
    checkType,
    statusLabel: copy.en.statusLabel,
    freeScope: copy.en.freeScope,
    upgradeScope: copy.en.upgradeScope,
    exampleTarget: copy.en.exampleTarget,
    localized: copy,
  }
}

export const toolCatalog: ToolDefinition[] = [
  makeTool('spf-checker', 'authentication', 'SPF', 'spf', {
    navLabel: 'SPF Checker',
    title: 'SPF Checker',
    headline: 'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.',
    description: 'Enter a public domain to inspect its SPF TXT records through the bounded MailHealth DNS path.',
    inputLabel: 'Domain name',
    inputPlaceholder: 'example.com',
    primaryAction: 'Run SPF check',
    previewResult: 'The result shows SPF policy status, record count, mechanisms and safe remediation hints.',
    statusLabel: 'Live DNS check',
    freeScope: 'One point-in-time SPF lookup with duplicate, all-mechanism and lookup-count warnings.',
    upgradeScope: 'Ongoing authentication monitoring, diff history, alerting, batches and API access.',
    exampleTarget: 'example.com',
    measure: 'MailHealth normalizes the hostname, rejects local or private names and reads TXT records without storing the target in analytics.',
    interpret: 'A single SPF record with a strict all mechanism is usually healthier than multiple records or permissive +all.',
    example: 'A record like v=spf1 include:_spf.example.net -all delegates authorized senders and rejects everything else.',
    commonIssue: 'Multiple SPF records often cause receivers to treat SPF as permerror even if each record looks valid alone.',
    fix: 'Merge mechanisms into one v=spf1 record, remove unused includes and keep DNS-lookup mechanisms within the SPF limit.',
    limitation: 'This check evaluates published DNS shape; it does not verify every sender IP or mailbox-provider policy.',
    faq: [
      { question: 'Does MailHealth send email during the SPF check?', answer: 'No. SPF checks use DNS TXT lookup only and do not send messages.' },
      { question: 'Can I monitor changes over time?', answer: 'Not in the free MVP. Monitoring, alerts and history are gated upgrade value.' },
    ],
  }),
  makeTool('dkim-checker', 'authentication', 'DKIM', 'dkim', {
    navLabel: 'DKIM Checker',
    title: 'DKIM Checker',
    headline: 'Check a selector._domainkey TXT record and confirm that a DKIM public key is published.',
    description: 'Enter a domain and selector to inspect DKIM metadata without exposing the raw key in analytics.',
    inputLabel: 'Domain name',
    inputPlaceholder: 'example.com',
    primaryAction: 'Run DKIM check',
    previewResult: 'The result shows whether a DKIM record exists, key type, key presence and DNS safety notes.',
    statusLabel: 'Live DNS check',
    freeScope: 'One selector lookup with key-present, version and tag summary.',
    upgradeScope: 'Selector inventory, rotation reminders, key-length policy checks, reports and API batches.',
    exampleTarget: 'example.com / selector default',
    measure: 'The API validates the selector as a DNS label, then reads TXT at selector._domainkey.domain.',
    interpret: 'A DKIM record must publish v=DKIM1 and a public key tag; missing keys cause signed mail to fail DKIM.',
    example: 'If selector default is used, the DNS name is default._domainkey.example.com.',
    commonIssue: 'Teams often rotate ESP providers but leave the old selector in DNS or forget to publish the new one.',
    fix: 'Confirm the active selector in the sending platform and publish only valid current DKIM records.',
    limitation: 'The free check does not fetch a sample message, verify a signature body hash or audit all selectors.',
    faq: [
      { question: 'Where do I find the selector?', answer: 'Your email provider usually shows it in DKIM setup instructions; common examples are default, selector1 or google.' },
      { question: 'Does the page store my DKIM key?', answer: 'No. The raw key is not sent to analytics and the free response summarizes key presence rather than saving a record.' },
    ],
  }),
  makeTool('dmarc-checker', 'authentication', 'DMARC', 'dmarc', {
    navLabel: 'DMARC Checker',
    title: 'DMARC Checker',
    headline: 'Inspect the _dmarc TXT record and identify policy, alignment and reporting readiness.',
    description: 'Enter a domain to read its DMARC record and understand whether receivers see none, quarantine or reject policy.',
    inputLabel: 'Domain name',
    inputPlaceholder: 'example.com',
    primaryAction: 'Run DMARC check',
    previewResult: 'The result summarizes DMARC policy, reporting tags and common gaps without collecting report data.',
    statusLabel: 'Live DNS check',
    freeScope: 'One DMARC TXT lookup with policy, pct and aggregate-report presence.',
    upgradeScope: 'DMARC aggregate report ingestion, trend history, alerts, teams and white-label reports.',
    exampleTarget: 'example.com',
    measure: 'MailHealth reads _dmarc.domain TXT through the same bounded DNS resolver and returns only parsed tag facts.',
    interpret: 'p=none is useful for observation, while quarantine or reject is stronger once SPF/DKIM alignment is ready.',
    example: '_dmarc.example.com with v=DMARC1; p=reject; rua=mailto:dmarc@example.com tells receivers to reject unauthenticated aligned failures and send aggregate reports.',
    commonIssue: 'A domain may publish DMARC with p=none forever, which gives visibility but little protection.',
    fix: 'Use reports to fix legitimate senders, then move gradually toward quarantine or reject with a pct rollout.',
    limitation: 'The MVP does not collect, parse or store DMARC XML reports; that is a gated paid workflow.',
    faq: [
      { question: 'Will MailHealth receive my DMARC reports?', answer: 'No. Report ingestion is not active in Sprint 4.3.' },
      { question: 'Is p=reject always safe?', answer: 'No. Move to enforcement only after legitimate senders pass SPF or DKIM alignment.' },
    ],
  }),
  makeTool('mx-checker', 'dns', 'MX', 'mx', {
    navLabel: 'MX Checker',
    title: 'MX Checker',
    headline: 'Inspect mail exchanger priority, host shape and public resolution before debugging delivery.',
    description: 'Enter a domain to see MX records, priority order and whether the selected hosts resolve publicly.',
    inputLabel: 'Domain name',
    inputPlaceholder: 'example.com',
    primaryAction: 'Run MX check',
    previewResult: 'The result lists MX hosts, priorities, public address counts and warnings for missing records.',
    statusLabel: 'Live DNS check',
    freeScope: 'One MX lookup with priority sort and public-resolution guard.',
    upgradeScope: 'MX change monitoring, incident history, alert routing and multi-domain batch checks.',
    exampleTarget: 'example.com',
    measure: 'The API reads MX, then validates a small number of MX hosts through public A/AAAA resolution.',
    interpret: 'Lower priority values are tried first. Missing or private-only MX hosts usually block inbound mail.',
    example: 'A domain can publish priority 10 mail1.example.com and priority 20 mail2.example.com for fallback.',
    commonIssue: 'An MX host can exist but point to private or stale addresses after provider migration.',
    fix: 'Confirm the MX host belongs to the current mail provider and resolves to public addresses.',
    limitation: 'The free check is a point-in-time DNS view and does not verify mailbox acceptance.',
    faq: [
      { question: 'Does MX prove outgoing mail is configured?', answer: 'No. MX controls inbound delivery; SPF, DKIM and DMARC are usually more relevant for outbound authentication.' },
      { question: 'Why are only some hosts probed?', answer: 'The MVP limits host and address checks to reduce abuse and latency.' },
    ],
  }),
  makeTool('blacklist-check', 'reputation', 'Blacklist', 'blacklist', {
    navLabel: 'Blacklist Check',
    title: 'Blacklist Check',
    headline: 'Run a small DNSBL sample against public mail-related addresses with strict query limits.',
    description: 'Enter a public domain to resolve a bounded set of addresses and test them against an allowlisted DNSBL sample.',
    inputLabel: 'Domain name',
    inputPlaceholder: 'example.com',
    primaryAction: 'Run blacklist check',
    previewResult: 'The result shows checked addresses, DNSBL zones, listed status and provider-limit warnings.',
    statusLabel: 'Bounded DNSBL sample',
    freeScope: 'Small DNSBL sample for a limited number of public IPv4 addresses.',
    upgradeScope: 'Reputation monitoring, alerting, provider-specific reports, batches and white-label exports.',
    exampleTarget: 'example.com',
    measure: 'MailHealth resolves a few public A/MX addresses, blocks private ranges and queries only configured DNSBL zones.',
    interpret: 'A listed result is a signal to investigate the provider and sending IP; an unlisted sample is not a guarantee of deliverability.',
    example: 'If one mail IP appears listed in a DNSBL, review recent sending patterns, compromised accounts and delisting steps.',
    commonIssue: 'DNSBL providers can rate limit public resolvers or require direct policy review for commercial use.',
    fix: 'Treat the free result as a pointer, then confirm directly with the listed provider before making operational claims.',
    limitation: 'This is not a universal blocklist audit; broad reputation feeds and historical monitoring are gated.',
    faq: [
      { question: 'Why only a DNSBL sample?', answer: 'A small allowlist keeps the free tool useful while controlling abuse, provider policy and latency.' },
      { question: 'Does unlisted mean my mail will land in inbox?', answer: 'No. Inbox placement depends on many sender, content, engagement and provider-specific signals.' },
    ],
  }),
  makeTool('smtp-check', 'transport', 'SMTP', 'smtp', {
    navLabel: 'SMTP Check',
    title: 'SMTP Check',
    headline: 'Test bounded TCP reachability to a domain mail exchanger without sending a message.',
    description: 'Enter a domain and choose an allowed SMTP port to test whether a selected MX host accepts a TCP connection.',
    inputLabel: 'Domain name',
    inputPlaceholder: 'example.com',
    primaryAction: 'Run SMTP check',
    previewResult: 'The result shows selected MX host, checked address, port, TCP status and antiabuse limits.',
    statusLabel: 'Bounded SMTP probe',
    freeScope: 'One MX-based TCP probe on allowed SMTP ports with no EHLO, recipient or message sending.',
    upgradeScope: 'Uptime monitoring, incident timelines, alerting, multi-region checks and status reports.',
    exampleTarget: 'example.com / port 25',
    measure: 'The API resolves MX first, validates public addresses, checks at most one address and uses a short timeout.',
    interpret: 'Open means the runtime established TCP; closed or timeout can be firewall, provider policy or route-specific.',
    example: 'A provider may allow port 25 from the internet but block 587 unless authenticated submission is configured.',
    commonIssue: 'Testing arbitrary SMTP hosts can become abusive, so MailHealth only checks MX-derived public hosts.',
    fix: 'Verify MX records first, then compare the SMTP result with provider status and firewall rules.',
    limitation: 'The MVP does not send EHLO, STARTTLS, AUTH, RCPT, DATA or any message content.',
    faq: [
      { question: 'Does this send an email?', answer: 'No. The free SMTP check only attempts a bounded TCP connection.' },
      { question: 'Why not scan every port?', answer: 'MailHealth is not a port scanner; SMTP checks use a narrow allowlist and MX-derived hosts.' },
    ],
  }),
  makeTool('header-analyzer', 'headers', 'Headers', 'headers', {
    navLabel: 'Header Analyzer',
    title: 'Header Analyzer',
    headline: 'Parse raw message headers locally to summarize SPF, DKIM, DMARC and alignment clues.',
    description: 'Paste message headers in the browser to inspect Authentication-Results, Received-SPF and DKIM-Signature lines locally.',
    inputLabel: 'Raw headers',
    inputPlaceholder: 'Authentication-Results: mx.example; spf=pass dkim=pass dmarc=pass',
    primaryAction: 'Analyze headers',
    previewResult: 'The result summarizes authentication signals, detected domains and privacy-safe warnings.',
    statusLabel: 'Browser-side only',
    freeScope: 'Local header parsing for one message with no backend call and no browser storage.',
    upgradeScope: 'Saved investigations, team comments, report exports, alert workflows and API analysis.',
    exampleTarget: 'Authentication-Results header sample',
    measure: 'The analyzer unfolds header lines in the browser and extracts only authentication status clues for display.',
    interpret: 'Authentication-Results from the receiving system is usually more trustworthy than a sender-provided claim.',
    example: 'A header with spf=pass dkim=pass dmarc=pass and aligned From/Return-Path domains is generally healthier.',
    commonIssue: 'Forwarding and mailing lists can change Return-Path or body signatures, causing SPF or DKIM to fail.',
    fix: 'Compare Authentication-Results, From, Return-Path and DKIM d= domains before changing DNS.',
    limitation: 'Headers can contain personal addresses and message IDs; the free analyzer never sends them to an API.',
    faq: [
      { question: 'Are pasted headers uploaded?', answer: 'No. Header analysis runs in the browser and does not use localStorage, sessionStorage or a product API.' },
      { question: 'Can this prove a message is legitimate?', answer: 'No. Header analysis is one signal and must be combined with sender, content and account context.' },
    ],
  }),
]

const toolBySlug = new Map(toolCatalog.map((tool) => [tool.slug, tool]))

export function isToolSlug(value: string | undefined): value is ToolSlug {
  return toolSlugs.includes(value as ToolSlug)
}

export function getToolBySlug(value: string | undefined): ToolDefinition | null {
  if (!isToolSlug(value)) {
    return null
  }

  return toolBySlug.get(value) ?? null
}

export function getToolCopy(tool: ToolDefinition, locale: LocaleCode): ToolCopy {
  return tool.localized[locale] ?? tool.localized.en
}

export function getCategoryLabel(category: ToolCategory, locale: LocaleCode): string {
  return localizedCategoryLabels[locale]?.[category] ?? categoryLabels[category]
}

export function filterTools(query: string, category: ToolCategory | 'all', locale: LocaleCode = 'en'): ToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return toolCatalog.filter((tool) => {
    const copy = getToolCopy(tool, locale)
    const matchesCategory = category === 'all' || tool.category === category
    const searchableText = [
      tool.shortName,
      tool.slug,
      tool.checkType,
      getCategoryLabel(tool.category, locale),
      copy.freeScope,
      copy.upgradeScope,
      copy.title,
      copy.headline,
      copy.description,
      ...copy.contentSections.flatMap((section) => [section.heading, ...section.paragraphs]),
      ...copy.faq.flatMap((faq) => [faq.question, faq.answer]),
    ].join(' ').toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}

export function createToolStructuredData(tool: ToolDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getToolCopy(tool, locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.title,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      inLanguage: locale,
      url,
      description: copy.headline,
      isAccessibleForFree: true,
      dateModified: '2026-06-27',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        copy.freeScope,
        ...copy.methodology,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: locale,
      mainEntity: copy.faq.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]
}

function unfoldHeaderLines(raw: string): string[] {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .reduce<string[]>((lines, line) => {
      if (/^[\t ]/u.test(line) && lines.length > 0) {
        lines[lines.length - 1] = `${lines[lines.length - 1]} ${line.trim()}`
        return lines
      }

      lines.push(line.trimEnd())
      return lines
    }, [])
    .filter(Boolean)
}

function headerValues(lines: string[], headerName: string): string[] {
  const prefix = `${headerName.toLowerCase()}:`

  return lines
    .filter((line) => line.toLowerCase().startsWith(prefix))
    .map((line) => line.slice(prefix.length).trim())
}

function extractDomain(value: string): string | null {
  const emailDomain = /@([a-z0-9.-]+\.[a-z]{2,})/iu.exec(value)?.[1]
  if (emailDomain) {
    return emailDomain.toLowerCase()
  }

  const domainTag = /\bd=([a-z0-9.-]+\.[a-z]{2,})\b/iu.exec(value)?.[1]
  if (domainTag) {
    return domainTag.toLowerCase()
  }

  return null
}

function authResult(values: string[], mechanism: 'spf' | 'dkim' | 'dmarc'): string | null {
  const combined = values.join(' ')
  const match = new RegExp(`\\b${mechanism}=([a-z0-9_-]+)`, 'iu').exec(combined)

  return match?.[1]?.toLowerCase() ?? null
}

function statusFromAuth(value: string | null): HeaderFinding['status'] {
  if (!value) {
    return 'unknown'
  }

  if (value === 'pass') {
    return 'pass'
  }

  if (['neutral', 'none', 'temperror', 'permerror'].includes(value)) {
    return 'warn'
  }

  return 'fail'
}

export function analyzeMailHeaders(rawHeaders: string): HeaderAnalysisResult {
  const raw = String(rawHeaders ?? '')

  if (!raw.trim()) {
    return {
      ok: false,
      summary: '',
      meta: [],
      findings: [],
      error: 'Paste raw message headers before running the analyzer.',
    }
  }

  if (raw.length > 80_000) {
    return {
      ok: false,
      summary: '',
      meta: [],
      findings: [],
      error: 'Free header analysis accepts up to 80 KB. Bulk mailbox analysis is a gated upgrade.',
    }
  }

  const lines = unfoldHeaderLines(raw)
  const authHeaders = headerValues(lines, 'Authentication-Results')
  const receivedSpf = headerValues(lines, 'Received-SPF')
  const dkimSignatures = headerValues(lines, 'DKIM-Signature')
  const fromDomain = extractDomain(headerValues(lines, 'From')[0] ?? '')
  const returnPathDomain = extractDomain(headerValues(lines, 'Return-Path')[0] ?? '')
  const dkimDomain = extractDomain(dkimSignatures[0] ?? '')
  const spfStatus = authResult(authHeaders, 'spf') ?? (/^(pass|fail|softfail|neutral|none|temperror|permerror)\b/iu.exec(receivedSpf[0] ?? '')?.[1]?.toLowerCase() ?? null)
  const dkimStatus = authResult(authHeaders, 'dkim') ?? (dkimSignatures.length > 0 ? 'present' : null)
  const dmarcStatus = authResult(authHeaders, 'dmarc')
  const alignedReturnPath = Boolean(fromDomain && returnPathDomain && fromDomain === returnPathDomain)
  const alignedDkim = Boolean(fromDomain && dkimDomain && fromDomain === dkimDomain)

  const findings: HeaderFinding[] = [
    {
      label: 'SPF result',
      status: statusFromAuth(spfStatus),
      detail: spfStatus ? `Authentication-Results or Received-SPF reports ${spfStatus}.` : 'No SPF result was found in the pasted headers.',
    },
    {
      label: 'DKIM result',
      status: dkimStatus === 'present' ? 'warn' : statusFromAuth(dkimStatus),
      detail: dkimStatus ? `DKIM signal found: ${dkimStatus}.` : 'No DKIM result or signature was found in the pasted headers.',
    },
    {
      label: 'DMARC result',
      status: statusFromAuth(dmarcStatus),
      detail: dmarcStatus ? `DMARC result reports ${dmarcStatus}.` : 'No DMARC result was found in Authentication-Results.',
    },
    {
      label: 'Visible alignment',
      status: alignedReturnPath || alignedDkim ? 'pass' : 'warn',
      detail: alignedReturnPath || alignedDkim
        ? 'At least one visible domain alignment clue matches the From domain.'
        : 'From, Return-Path and DKIM d= domains do not visibly align in this simple header pass.',
    },
  ]

  const passCount = findings.filter((finding) => finding.status === 'pass').length
  const summary = passCount >= 3
    ? 'Headers show mostly healthy authentication signals.'
    : passCount >= 1
      ? 'Headers show mixed authentication signals; review the warnings before changing DNS.'
      : 'Headers are missing clear authentication pass signals.'

  return {
    ok: true,
    summary,
    meta: [
      { label: 'Header lines', value: String(lines.length) },
      { label: 'Authentication-Results', value: String(authHeaders.length) },
      { label: 'DKIM signatures', value: String(dkimSignatures.length) },
      { label: 'From domain detected', value: fromDomain ? 'yes' : 'no' },
    ],
    findings,
  }
}
