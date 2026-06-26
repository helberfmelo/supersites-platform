import type { LocaleCode } from './locales'

export const toolSlugs = [
  'what-is-my-ip',
  'dns-lookup',
  'rdap-domain-lookup',
  'ssl-certificate-checker',
  'dns-propagation',
  'port-checker',
  'ping-traceroute',
] as const

export type ToolSlug = (typeof toolSlugs)[number]
export type ToolCategory = 'identity' | 'dns' | 'domain' | 'tls' | 'reachability'

export interface ToolCopy {
  navLabel: string
  title: string
  headline: string
  description: string
  inputLabel: string
  inputPlaceholder: string
  primaryAction: string
  previewResult: string
  methodology: string[]
}

export interface ToolDefinition {
  slug: ToolSlug
  category: ToolCategory
  shortName: string
  statusLabel: string
  freeScope: string
  upgradeScope: string
  exampleTarget: string
  localized: { en: ToolCopy } & Partial<Record<LocaleCode, ToolCopy>>
}

export const categoryLabels: Record<ToolCategory, string> = {
  identity: 'Connection identity',
  dns: 'DNS records',
  domain: 'Domain registration',
  tls: 'TLS and certificates',
  reachability: 'Reachability probes',
}

export const toolCatalog: ToolDefinition[] = [
  {
    slug: 'what-is-my-ip',
    category: 'identity',
    shortName: 'IP check',
    statusLabel: 'Live API',
    freeScope: 'Public IPv4 or IPv6, network hints and privacy notes',
    upgradeScope: 'Saved baseline, change alerts and API access',
    exampleTarget: 'Current browser connection',
    localized: {
      en: {
        navLabel: 'What is my IP',
        title: 'What is my IP',
        headline: 'Read the public address seen by the service and explain what it can and cannot prove.',
        description: 'The live check reads the request address seen by the API edge without writing it to analytics.',
        inputLabel: 'Lookup target',
        inputPlaceholder: 'Current connection',
        primaryAction: 'Run IP check',
        previewResult: 'The IP result shows the address observed by the API edge and whether it is public.',
        methodology: [
          'Show the address observed by the application edge.',
          'Avoid storing the full address in analytics events.',
          'Separate IP facts from geolocation or ownership estimates.',
        ],
      },
    },
  },
  {
    slug: 'dns-lookup',
    category: 'dns',
    shortName: 'DNS lookup',
    statusLabel: 'Live API',
    freeScope: 'A, AAAA, CNAME, MX, TXT, NS, SOA and CAA records',
    upgradeScope: 'Monitoring, record history and API batches',
    exampleTarget: 'example.com',
    localized: {
      en: {
        navLabel: 'DNS Lookup',
        title: 'DNS Lookup',
        headline: 'Inspect common public DNS records with clear TTL and resolver context.',
        description: 'Hostnames are normalized, checked against private-range resolution and cached briefly before records are returned.',
        inputLabel: 'Domain name',
        inputPlaceholder: 'example.com',
        primaryAction: 'Run DNS lookup',
        previewResult: 'Record rows show type, value, TTL and resolver notes from the safe DNS API.',
        methodology: [
          'Accept hostnames only, not URLs or private network targets.',
          'Cache public DNS answers with short TTLs to reduce repeated resolver load.',
          'Explain empty answers, NXDOMAIN and resolver failures separately.',
        ],
      },
    },
  },
  {
    slug: 'rdap-domain-lookup',
    category: 'domain',
    shortName: 'RDAP lookup',
    statusLabel: 'Planned',
    freeScope: 'Registrar, status, important dates and nameservers',
    upgradeScope: 'Expiration alerts, ownership change history and reports',
    exampleTarget: 'example.com',
    localized: {
      en: {
        navLabel: 'RDAP Domain Lookup',
        title: 'RDAP Domain Lookup',
        headline: 'Summarize public domain registration facts without exposing private contact data.',
        description: 'RDAP support arrives after the DNS API so date parsing and registry limits can be tested with fixtures.',
        inputLabel: 'Domain name',
        inputPlaceholder: 'example.com',
        primaryAction: 'Preview result',
        previewResult: 'RDAP results will separate registry facts, registrar facts, dates and limitations.',
        methodology: [
          'Normalize dates and statuses from RDAP responses.',
          'Hide or omit redacted personal contact fields.',
          'Document registry rate limits and temporary lookup failures.',
        ],
      },
    },
  },
  {
    slug: 'ssl-certificate-checker',
    category: 'tls',
    shortName: 'SSL check',
    statusLabel: 'Planned',
    freeScope: 'Issuer, subject, SANs, validity dates and chain notes',
    upgradeScope: 'Expiry monitoring, alerts and change history',
    exampleTarget: 'example.com',
    localized: {
      en: {
        navLabel: 'SSL Certificate Checker',
        title: 'SSL Certificate Checker',
        headline: 'Check certificate identity, expiry and chain context for public HTTPS endpoints.',
        description: 'The SSL page is prepared for a bounded probe that connects only to validated public hostnames.',
        inputLabel: 'Hostname',
        inputPlaceholder: 'example.com',
        primaryAction: 'Preview result',
        previewResult: 'Certificate details will appear here after hostname validation and timeout controls are active.',
        methodology: [
          'Probe HTTPS with strict timeouts and no private address targets.',
          'Report expiry and issuer facts without storing certificate payloads unnecessarily.',
          'Explain hostname mismatch and chain validation warnings plainly.',
        ],
      },
    },
  },
  {
    slug: 'dns-propagation',
    category: 'dns',
    shortName: 'Propagation',
    statusLabel: 'Planned',
    freeScope: 'Regional resolver snapshots for selected DNS records',
    upgradeScope: 'Scheduled propagation watches and reports',
    exampleTarget: 'example.com A',
    localized: {
      en: {
        navLabel: 'DNS Propagation',
        title: 'DNS Propagation',
        headline: 'Compare public DNS answers across controlled resolvers and explain differences.',
        description: 'This page waits for the resolver policy and cache controls planned for Sprint 2.4.',
        inputLabel: 'Domain and record type',
        inputPlaceholder: 'example.com A',
        primaryAction: 'Preview result',
        previewResult: 'Propagation rows will show resolver region, answer, TTL and timestamp.',
        methodology: [
          'Use a bounded resolver list instead of untrusted user-supplied endpoints.',
          'Keep record types explicit and reject URL-shaped inputs.',
          'Label cached results and direct resolver measurements clearly.',
        ],
      },
    },
  },
  {
    slug: 'port-checker',
    category: 'reachability',
    shortName: 'Port checker',
    statusLabel: 'Planned',
    freeScope: 'Limited public TCP reachability checks',
    upgradeScope: 'Monitoring, alerts and incident history',
    exampleTarget: 'example.com:443',
    localized: {
      en: {
        navLabel: 'Port Checker',
        title: 'Port Checker',
        headline: 'Test a small allowlisted set of public ports with anti-abuse boundaries.',
        description: 'Port checks require stricter SSRF guards and limits before any network connection is allowed.',
        inputLabel: 'Host and port',
        inputPlaceholder: 'example.com:443',
        primaryAction: 'Preview result',
        previewResult: 'Port status will appear only after allowlists, private-range blocks and rate limits are validated.',
        methodology: [
          'Limit the allowed port list and request rate.',
          'Block private, loopback, link-local and metadata ranges after DNS resolution.',
          'Log abuse signals without logging sensitive user-entered context.',
        ],
      },
    },
  },
  {
    slug: 'ping-traceroute',
    category: 'reachability',
    shortName: 'Ping and trace',
    statusLabel: 'Planned',
    freeScope: 'Bounded latency and path diagnostics from controlled probes',
    upgradeScope: 'Multi-region checks, history and alerts',
    exampleTarget: 'example.com',
    localized: {
      en: {
        navLabel: 'Ping and Traceroute',
        title: 'Ping and Traceroute',
        headline: 'Run limited reachability diagnostics from controlled infrastructure.',
        description: 'This page is staged for local probes first, with clear failure modes and no open scanning.',
        inputLabel: 'Hostname',
        inputPlaceholder: 'example.com',
        primaryAction: 'Preview result',
        previewResult: 'Latency and hop summaries will appear after probe workers and abuse limits are in place.',
        methodology: [
          'Use controlled probes with fixed packet and timeout limits.',
          'Avoid user-selected arbitrary probe infrastructure.',
          'Explain packet loss and blocked ICMP as limitations, not final truth.',
        ],
      },
    },
  },
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

export function filterTools(query: string, category: ToolCategory | 'all'): ToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return toolCatalog.filter((tool) => {
    const copy = getToolCopy(tool, 'en')
    const matchesCategory = category === 'all' || tool.category === category
    const searchableText = [
      tool.shortName,
      tool.slug,
      categoryLabels[tool.category],
      tool.freeScope,
      tool.upgradeScope,
      copy.title,
      copy.headline,
      copy.description,
    ].join(' ').toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}
