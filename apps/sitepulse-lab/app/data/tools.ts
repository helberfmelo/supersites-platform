import type { LocaleCode } from './locales'
import { publicLocaleCodes } from './locales'

export const toolSlugs = [
  'status-checker',
  'redirect-chain',
  'security-headers',
  'robots-checker',
  'sitemap-validator',
  'ttfb-check',
  'performance-snapshot',
] as const

export type ToolSlug = (typeof toolSlugs)[number]
export type ToolCategory = 'availability' | 'routing' | 'security' | 'crawlability' | 'performance'
export type SitePulseCheck = 'status' | 'redirects' | 'headers' | 'robots' | 'sitemap' | 'ttfb' | 'performance'

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
  check: SitePulseCheck
  statusLabel: string
  freeScope: string
  upgradeScope: string
  exampleTarget: string
  localized: Record<LocaleCode, ToolCopy>
}

export const categoryLabels: Record<ToolCategory, string> = {
  availability: 'Availability',
  routing: 'Redirects',
  security: 'Headers',
  crawlability: 'Crawlability',
  performance: 'Performance',
}

const localizedCategoryLabels: Record<LocaleCode, Record<ToolCategory, string>> = {
  en: categoryLabels,
  'pt-br': {
    availability: 'Disponibilidade',
    routing: 'Redirecionamentos',
    security: 'Headers',
    crawlability: 'Rastreamento',
    performance: 'Performance',
  },
  es: {
    availability: 'Disponibilidad',
    routing: 'Redirecciones',
    security: 'Headers',
    crawlability: 'Rastreo',
    performance: 'Rendimiento',
  },
  fr: {
    availability: 'Disponibilite',
    routing: 'Redirections',
    security: 'Headers',
    crawlability: 'Exploration',
    performance: 'Performance',
  },
  de: {
    availability: 'Verfuegbarkeit',
    routing: 'Weiterleitungen',
    security: 'Header',
    crawlability: 'Crawlbarkeit',
    performance: 'Performance',
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
    use: 'Como usar este teste',
    interpret: 'Como interpretar o resultado',
    example: 'Exemplo',
    issues: 'Problemas comuns e proximos passos',
    limits: 'Metodologia e limites',
  },
  es: {
    use: 'Como usar esta prueba',
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
    inputLabel: 'Website URL',
    inputPlaceholder: 'https://example.com',
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
  check: SitePulseCheck,
  seed: ToolSeed,
): ToolDefinition {
  const copy = localized(seed)

  return {
    slug,
    category,
    shortName,
    check,
    statusLabel: copy.en.statusLabel,
    freeScope: copy.en.freeScope,
    upgradeScope: copy.en.upgradeScope,
    exampleTarget: copy.en.exampleTarget,
    localized: copy,
  }
}

export const toolCatalog: ToolDefinition[] = [
  makeTool('status-checker', 'availability', 'Status', 'status', {
    navLabel: 'HTTP Status Checker',
    title: 'HTTP Status Checker',
    headline: 'Check whether a public page answers with a healthy HTTP status and bounded timing data.',
    description: 'Enter a public HTTP or HTTPS URL to run one point-in-time request through the SitePulse probe guard.',
    primaryAction: 'Check status',
    previewResult: 'The result shows final status, response class, content type and bounded timing notes.',
    statusLabel: 'Live one-shot probe',
    freeScope: 'One guarded website status request with redirect limit and public DNS validation.',
    upgradeScope: 'Recurring uptime checks, incidents, alerts, history, status pages and reports.',
    exampleTarget: 'https://example.com',
    measure: 'SitePulse normalizes the URL, blocks private/reserved destinations, resolves public addresses and performs a short HTTP GET.',
    interpret: 'A 2xx or expected 3xx result is usually healthy; 4xx, 5xx, timeout or blocked redirects need investigation.',
    example: 'If https://example.com returns 200 with text/html, the public web route is reachable from the probe runtime.',
    commonIssue: 'A site can work in a browser but fail from an external probe because of WAF, geo rules, DNS drift or TLS policy.',
    fix: 'Compare DNS, CDN, WAF and origin logs before changing application code.',
    limitation: 'This is not uptime monitoring. It is a single web request from one runtime with short timeouts.',
    faq: [
      { question: 'Does the free check monitor my site?', answer: 'No. Monitoring, alerts and history are gated upgrade value.' },
      { question: 'Can I check intranet URLs?', answer: 'No. Private, local, metadata and reserved destinations are blocked.' },
    ],
  }),
  makeTool('redirect-chain', 'routing', 'Redirects', 'redirects', {
    navLabel: 'Redirect Chain',
    title: 'Redirect Chain Checker',
    headline: 'Follow a short redirect chain and flag loops, cross-host hops and slow handoffs.',
    description: 'Enter a public URL to inspect up to a small number of redirects without crawling the rest of the site.',
    primaryAction: 'Trace redirects',
    previewResult: 'The result shows each hop, status, location and whether the final URL resolved safely.',
    statusLabel: 'Redirect-limited',
    freeScope: 'One redirect trace with capped hops and SSRF validation before every hop.',
    upgradeScope: 'Scheduled redirect audits, incident detection, SEO history and multi-page reports.',
    exampleTarget: 'https://example.com',
    measure: 'Every Location header is resolved against the previous URL and revalidated before the next request.',
    interpret: 'One clean HTTPS redirect can be fine. Chains, loops and unexpected host changes can waste crawl budget or break users.',
    example: 'http://example.com -> https://example.com -> 200 is a common healthy chain.',
    commonIssue: 'Legacy marketing redirects often stack through old domains and add latency before the final page.',
    fix: 'Collapse redirects at the edge or origin so users and crawlers reach the canonical URL quickly.',
    limitation: 'The free checker does not crawl internal links or run a full SEO migration audit.',
    faq: [
      { question: 'How many redirects are followed?', answer: 'The MVP follows a small capped chain to prevent abuse and loops.' },
      { question: 'Are redirect targets saved?', answer: 'No. The target stays in the transient probe response and is not sent to analytics.' },
    ],
  }),
  makeTool('security-headers', 'security', 'Headers', 'headers', {
    navLabel: 'Security Headers',
    title: 'Security Headers Checker',
    headline: 'Inspect response headers for baseline browser security and caching signals.',
    description: 'Enter a public URL to review headers such as HSTS, CSP, X-Frame-Options, Referrer-Policy and content type.',
    primaryAction: 'Check headers',
    previewResult: 'The result summarizes present, missing and review-needed security headers.',
    statusLabel: 'Header snapshot',
    freeScope: 'One response-header snapshot with clear missing-header findings.',
    upgradeScope: 'Header drift monitoring, policy regression alerts, history and client-facing reports.',
    exampleTarget: 'https://example.com',
    measure: 'SitePulse reads only HTTP response headers from the bounded request; it does not execute page scripts.',
    interpret: 'Missing CSP or HSTS can be a risk, but final policy depends on the application and deployment model.',
    example: 'A healthy public app may include strict-transport-security, content-security-policy and referrer-policy headers.',
    commonIssue: 'Headers are often configured in CDN, reverse proxy and application layers, which can overwrite each other.',
    fix: 'Audit the final response at the public URL, then update the layer that actually controls the header.',
    limitation: 'Header presence is not a full vulnerability scan or CSP quality audit.',
    faq: [
      { question: 'Is this a penetration test?', answer: 'No. It is a lightweight response-header diagnostic.' },
      { question: 'Does SitePulse run JavaScript?', answer: 'No. The backend probe reads HTTP responses only.' },
    ],
  }),
  makeTool('robots-checker', 'crawlability', 'Robots', 'robots', {
    navLabel: 'Robots.txt Checker',
    title: 'Robots.txt Checker',
    headline: 'Fetch the origin robots.txt file and identify basic crawl directives and sitemap hints.',
    description: 'Enter a public site URL and SitePulse will request only the same-origin /robots.txt file.',
    primaryAction: 'Check robots.txt',
    previewResult: 'The result shows robots status, size, directives and sitemap hints.',
    statusLabel: 'Same-origin file',
    freeScope: 'One same-origin robots.txt fetch with size limits and no site crawl.',
    upgradeScope: 'Crawlability monitoring, SEO change alerts, historical diffs and multi-site reports.',
    exampleTarget: 'https://example.com',
    measure: 'The probe derives the origin from the input URL and fetches /robots.txt after validating the host.',
    interpret: 'A missing robots.txt is not always an error, but accidental Disallow rules can block important pages.',
    example: 'A robots file with Sitemap: https://example.com/sitemap.xml helps crawlers discover submitted URLs.',
    commonIssue: 'Staging Disallow rules can accidentally ship to production.',
    fix: 'Review robots.txt after deploys and confirm important sections are crawlable before requesting indexing.',
    limitation: 'The MVP does not emulate every crawler or evaluate every path rule.',
    faq: [
      { question: 'Will this crawl my site?', answer: 'No. It fetches only robots.txt for the normalized origin.' },
      { question: 'Is Disallow always bad?', answer: 'No. It is useful for areas that should not be crawled, but dangerous when applied broadly by mistake.' },
    ],
  }),
  makeTool('sitemap-validator', 'crawlability', 'Sitemap', 'sitemap', {
    navLabel: 'Sitemap Validator',
    title: 'Sitemap Validator',
    headline: 'Fetch a same-origin sitemap and summarize XML validity, URL count and basic size limits.',
    description: 'Enter a public site URL to check /sitemap.xml without submitting it to a search engine.',
    primaryAction: 'Validate sitemap',
    previewResult: 'The result shows sitemap status, XML shape, URL count and bounded warnings.',
    statusLabel: 'Same-origin XML',
    freeScope: 'One same-origin sitemap fetch with XML and URL-count summary.',
    upgradeScope: 'Scheduled sitemap audits, broken URL sampling, Search Console correlation and reports.',
    exampleTarget: 'https://example.com',
    measure: 'SitePulse derives /sitemap.xml from the origin and parses only a capped response body.',
    interpret: 'A valid sitemap helps discovery, but it does not guarantee indexing or ranking.',
    example: 'A sitemap with canonical HTTPS URLs and recent lastmod values gives crawlers cleaner discovery signals.',
    commonIssue: 'Sitemaps often point at staging hosts, blocked URLs or stale HTTP canonicals after migrations.',
    fix: 'Regenerate from canonical production routes and validate before Search Console submission.',
    limitation: 'The MVP does not crawl every URL inside the sitemap.',
    faq: [
      { question: 'Can I paste a custom sitemap URL?', answer: 'The MVP checks same-origin /sitemap.xml only to keep SSRF controls simple.' },
      { question: 'Does valid XML mean indexed?', answer: 'No. Indexing also depends on content quality, crawlability, canonical signals and search engine decisions.' },
    ],
  }),
  makeTool('ttfb-check', 'performance', 'TTFB', 'ttfb', {
    navLabel: 'TTFB Check',
    title: 'TTFB Checker',
    headline: 'Measure bounded first-byte timing for a public URL from one probe runtime.',
    description: 'Enter a public URL to capture a short TTFB-style timing sample and response status.',
    primaryAction: 'Measure TTFB',
    previewResult: 'The result shows first-byte timing, total duration and interpretation warnings.',
    statusLabel: 'Single timing sample',
    freeScope: 'One short timing sample from one runtime with no historical storage.',
    upgradeScope: 'Multi-region performance monitoring, trend history, budgets, alerts and reports.',
    exampleTarget: 'https://example.com',
    measure: 'The backend records elapsed time around a bounded HTTP request and reports approximate first-byte timing.',
    interpret: 'One high TTFB can be network, CDN, origin or cold-cache behavior; recurring samples are needed for confidence.',
    example: 'A 180 ms first-byte sample for an edge-cached page is usually healthier than a 1800 ms uncached origin path.',
    commonIssue: 'Dynamic pages can be fast for logged-in admins and slow for anonymous users behind different cache rules.',
    fix: 'Compare cache headers, CDN hit status and origin logs before changing code.',
    limitation: 'This is not Lighthouse, CrUX or a multi-region benchmark.',
    faq: [
      { question: 'Why is this different from my browser?', answer: 'Network path, cache state and region differ. Treat it as a single diagnostic sample.' },
      { question: 'Is history saved?', answer: 'No. History and alerts are paid workflow features.' },
    ],
  }),
  makeTool('performance-snapshot', 'performance', 'Performance', 'performance', {
    navLabel: 'Performance Snapshot',
    title: 'Performance Snapshot',
    headline: 'Combine status, redirect count, headers, byte size and timing into a quick web health snapshot.',
    description: 'Enter a public URL to run the bounded SitePulse check set for a one-page overview.',
    primaryAction: 'Run snapshot',
    previewResult: 'The result summarizes availability, redirects, headers, robots/sitemap hints and timing.',
    statusLabel: 'Combined snapshot',
    freeScope: 'One combined page-level snapshot with bounded redirects and same-origin auxiliary files.',
    upgradeScope: 'Uptime, incidents, status page, alerts, historical trends, multi-region probes and reports.',
    exampleTarget: 'https://example.com',
    measure: 'The snapshot reuses the same one-shot probe contract and reports only the selected page plus same-origin files.',
    interpret: 'Use the snapshot to triage obvious issues; use dedicated checks for deeper interpretation.',
    example: 'A healthy snapshot has 2xx final status, short redirect chain, core security headers and valid crawl files.',
    commonIssue: 'Teams may fix performance while missing crawlability or security header regressions.',
    fix: 'Track the snapshot after deploys, then promote recurring monitoring only when alerting and retention gates exist.',
    limitation: 'The free snapshot is not a full synthetic browser test or Lighthouse audit.',
    faq: [
      { question: 'Does this replace uptime monitoring?', answer: 'No. It is a one-shot diagnostic. Recurring probes are gated.' },
      { question: 'Does it call external analytics?', answer: 'No. No GA4, GTM, AdSense or external observability is activated.' },
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
      tool.check,
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
