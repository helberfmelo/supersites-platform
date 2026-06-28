import { publicLocaleCodes, sanitizePublicCopy, type LocaleCode } from './locales'

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

export interface SitePulseRelatedTool {
  slug: ToolSlug
  title: string
  description: string
}

export interface SitePulseScoreChecklistItem {
  label: string
  status: 'pass' | 'warn' | 'fail' | 'unknown'
  detail: string
}

export interface SitePulseScoreCard {
  score: number
  grade: string
  tone: 'pass' | 'warn' | 'fail'
  summary: string
  checklist: SitePulseScoreChecklistItem[]
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

const localizedCheckNames: Record<LocaleCode, Record<SitePulseCheck, string>> = {
  en: {
    status: 'status',
    redirects: 'redirects',
    headers: 'headers',
    robots: 'robots.txt',
    sitemap: 'sitemap',
    ttfb: 'TTFB',
    performance: 'performance snapshot',
  },
  'pt-br': {
    status: 'status HTTP',
    redirects: 'redirecionamentos',
    headers: 'headers',
    robots: 'robots.txt',
    sitemap: 'sitemap',
    ttfb: 'TTFB',
    performance: 'snapshot de performance',
  },
  es: {
    status: 'estado HTTP',
    redirects: 'redirecciones',
    headers: 'headers',
    robots: 'robots.txt',
    sitemap: 'sitemap',
    ttfb: 'TTFB',
    performance: 'snapshot de rendimiento',
  },
  fr: {
    status: 'statut HTTP',
    redirects: 'redirections',
    headers: 'headers',
    robots: 'robots.txt',
    sitemap: 'sitemap',
    ttfb: 'TTFB',
    performance: 'snapshot de performance',
  },
  de: {
    status: 'HTTP-Status',
    redirects: 'Weiterleitungen',
    headers: 'Header',
    robots: 'robots.txt',
    sitemap: 'Sitemap',
    ttfb: 'TTFB',
    performance: 'Performance-Snapshot',
  },
}

const localizedSitePulseCopy = {
  'pt-br': {
    inputLabel: 'URL do site',
    statusLabel: 'Probe pontual',
    headline: (name: string) => `Teste ${name} de uma pagina publica com limites antiabuso claros.`,
    description: (name: string) => `Informe uma URL publica para executar um teste pontual de ${name} sem salvar o alvo.`,
    previewResult: (name: string) => `O resultado resume ${name}, achados principais e detalhes tecnicos limitados.`,
    freeScope: (name: string) => `Um teste pontual de ${name} para uma URL publica.`,
    upgradeScope: 'Uptime, incidentes, status page, alertas, historico e multi-regiao continuam planejados.',
    methodology: (name: string) => [
      `SitePulse executa uma unica probe de ${name}, com timeout curto, rate limit e validacao SSRF.`,
      'Use o resultado como linha de base antes de abrir incidente, alterar CDN ou mudar regras de servidor.',
      'A versao gratuita nao salva URL, headers, redirects, timings ou historico.',
    ],
    interpret: 'Priorize falhas que afetem disponibilidade, rastreabilidade, seguranca ou latencia percebida.',
    example: 'Exemplo: teste https://example.com antes e depois de uma mudanca de DNS, CDN ou configuracao.',
    commonIssue: 'Problemas comuns incluem redirects em cadeia, robots restritivo, sitemap antigo, headers ausentes e TTFB alto.',
    fix: 'Corrija na origem ou CDN, aguarde propagacao quando houver cache e execute novo teste pontual.',
    faq: [
      { question: 'O SitePulse salva a URL testada?', answer: 'Nao. A rota gratuita evita armazenar URL, headers, redirects, tempos e resultados.' },
      { question: 'Isto substitui monitoramento de uptime?', answer: 'Nao nesta versao gratuita. Uptime, alertas, historico e multi-regiao seguem planejados como upgrade.' },
    ],
  },
  es: {
    inputLabel: 'URL del sitio',
    statusLabel: 'Probe puntual',
    headline: (name: string) => `Prueba ${name} de una pagina publica con limites antiabuso claros.`,
    description: (name: string) => `Ingresa una URL publica para ejecutar una prueba puntual de ${name} sin guardar el objetivo.`,
    previewResult: (name: string) => `El resultado resume ${name}, hallazgos principales y detalles tecnicos limitados.`,
    freeScope: (name: string) => `Una prueba puntual de ${name} para una URL publica.`,
    upgradeScope: 'Uptime, incidentes, status page, alertas, historial y multi-region siguen planificados.',
    methodology: (name: string) => [
      `SitePulse ejecuta una sola probe de ${name}, con timeout corto, rate limit y validacion SSRF.`,
      'Usa el resultado como linea base antes de abrir incidente, cambiar CDN o modificar reglas del servidor.',
      'La version gratuita no guarda URL, headers, redirecciones, tiempos ni historial.',
    ],
    interpret: 'Prioriza fallas que afecten disponibilidad, rastreo, seguridad o latencia percibida.',
    example: 'Ejemplo: prueba https://example.com antes y despues de un cambio de DNS, CDN o configuracion.',
    commonIssue: 'Problemas comunes incluyen cadenas de redireccion, robots restrictivo, sitemap antiguo, headers ausentes y TTFB alto.',
    fix: 'Corrige en origen o CDN, espera propagacion cuando haya cache y ejecuta una nueva prueba puntual.',
    faq: [
      { question: 'SitePulse guarda la URL probada?', answer: 'No. La ruta gratuita evita almacenar URL, headers, redirecciones, tiempos y resultados.' },
      { question: 'Esto reemplaza monitoreo de uptime?', answer: 'No en esta version gratuita. Uptime, alertas, historial y multi-region siguen planificados como upgrade.' },
    ],
  },
  fr: {
    inputLabel: 'URL du site',
    statusLabel: 'Probe ponctuelle',
    headline: (name: string) => `Testez ${name} d une page publique avec des limites anti-abus claires.`,
    description: (name: string) => `Saisissez une URL publique pour lancer un controle ponctuel de ${name} sans stocker la cible.`,
    previewResult: (name: string) => `Le resultat resume ${name}, les constats principaux et des details techniques limites.`,
    freeScope: (name: string) => `Un controle ponctuel de ${name} pour une URL publique.`,
    upgradeScope: 'Uptime, incidents, status page, alertes, historique et multi-region restent planifies.',
    methodology: (name: string) => [
      `SitePulse lance une seule probe de ${name}, avec timeout court, rate limit et validation SSRF.`,
      'Utilisez le resultat comme ligne de base avant incident, changement CDN ou regles serveur.',
      'La version gratuite ne stocke ni URL, ni headers, ni redirections, ni timings, ni historique.',
    ],
    interpret: 'Priorisez les erreurs qui affectent disponibilite, exploration, securite ou latence percue.',
    example: 'Exemple: testez https://example.com avant et apres un changement DNS, CDN ou configuration.',
    commonIssue: 'Les problemes courants incluent chaines de redirection, robots restrictif, sitemap ancien, headers absents et TTFB eleve.',
    fix: 'Corrigez a l origine ou au CDN, attendez la propagation si cache est implique, puis relancez un controle ponctuel.',
    faq: [
      { question: 'SitePulse stocke l URL testee?', answer: 'Non. La route gratuite evite le stockage des URL, headers, redirections, temps et resultats.' },
      { question: 'Cela remplace une surveillance uptime?', answer: 'Non dans cette version gratuite. Uptime, alertes, historique et multi-region restent planifies comme upgrade.' },
    ],
  },
  de: {
    inputLabel: 'Website-URL',
    statusLabel: 'Einmalige Probe',
    headline: (name: string) => `Pruefen Sie ${name} einer oeffentlichen Seite mit klaren Anti-Abuse-Grenzen.`,
    description: (name: string) => `Geben Sie eine oeffentliche URL ein, um eine einmalige ${name}-Pruefung ohne Speicherung des Ziels zu starten.`,
    previewResult: (name: string) => `Das Ergebnis fasst ${name}, wichtigste Befunde und begrenzte technische Details zusammen.`,
    freeScope: (name: string) => `Eine einmalige ${name}-Pruefung fuer eine oeffentliche URL.`,
    upgradeScope: 'Uptime, Incidents, Status Page, Alarme, Historie und Multi-Region bleiben geplant.',
    methodology: (name: string) => [
      `SitePulse fuehrt eine einzelne ${name}-Probe mit kurzem Timeout, Rate Limit und SSRF-Validierung aus.`,
      'Nutzen Sie das Ergebnis als Basis vor Incident, CDN-Aenderung oder Serverregel-Aenderung.',
      'Die kostenlose Version speichert weder URL, Header, Weiterleitungen, Timings noch Historie.',
    ],
    interpret: 'Priorisieren Sie Fehler, die Verfuegbarkeit, Crawlbarkeit, Sicherheit oder Latenz betreffen.',
    example: 'Beispiel: pruefen Sie https://example.com vor und nach einer DNS-, CDN- oder Konfigurationsaenderung.',
    commonIssue: 'Haeufige Probleme sind Redirect-Ketten, restriktive robots.txt, alte Sitemaps, fehlende Header und hoher TTFB.',
    fix: 'Korrigieren Sie Origin oder CDN, warten Sie bei Cache auf Propagation und starten Sie eine neue Pruefung.',
    faq: [
      { question: 'Speichert SitePulse die getestete URL?', answer: 'Nein. Die kostenlose Route speichert keine URL, Header, Weiterleitungen, Zeiten oder Ergebnisse.' },
      { question: 'Ersetzt das Uptime-Monitoring?', answer: 'Nicht in dieser kostenlosen Version. Uptime, Alarme, Historie und Multi-Region bleiben als Upgrade geplant.' },
    ],
  },
} satisfies Record<Exclude<LocaleCode, 'en'>, {
  inputLabel: string
  statusLabel: string
  headline: (name: string) => string
  description: (name: string) => string
  previewResult: (name: string) => string
  freeScope: (name: string) => string
  upgradeScope: string
  methodology: (name: string) => string[]
  interpret: string
  example: string
  commonIssue: string
  fix: string
  faq: ToolFaq[]
}>

function buildToolCopy(locale: LocaleCode, seed: ToolSeed, check: SitePulseCheck): ToolCopy {
  const labels = sectionLabelsByLocale[locale]

  if (locale !== 'en') {
    const localized = localizedSitePulseCopy[locale]
    const name = localizedCheckNames[locale][check]
    const description = localized.description(name)
    const methodology = localized.methodology(name)

    return {
      navLabel: seed.navLabel,
      title: seed.title,
      headline: localized.headline(name),
      description,
      inputLabel: localized.inputLabel,
      inputPlaceholder: 'https://example.com',
      primaryAction: seed.primaryAction,
      previewResult: localized.previewResult(name),
      statusLabel: localized.statusLabel,
      freeScope: localized.freeScope(name),
      upgradeScope: localized.upgradeScope,
      exampleTarget: seed.exampleTarget,
      reviewedLabel: reviewedLabelByLocale[locale],
      methodology,
      contentSections: [
        { heading: labels.use, paragraphs: [description, methodology[0]] },
        { heading: labels.interpret, paragraphs: [localized.interpret] },
        { heading: labels.example, paragraphs: [localized.example] },
        { heading: labels.issues, paragraphs: [localized.commonIssue, localized.fix] },
        { heading: labels.limits, paragraphs: [methodology[2]] },
      ],
      faq: localized.faq,
    }
  }

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

function localized(seed: ToolSeed, check: SitePulseCheck): Record<LocaleCode, ToolCopy> {
  return Object.fromEntries(publicLocaleCodes.map((locale) => [locale, buildToolCopy(locale, seed, check)])) as Record<LocaleCode, ToolCopy>
}

function makeTool(
  slug: ToolSlug,
  category: ToolCategory,
  shortName: string,
  check: SitePulseCheck,
  seed: ToolSeed,
): ToolDefinition {
  const copy = localized(seed, check)

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
const relatedBySlug: Record<ToolSlug, ToolSlug[]> = {
  'status-checker': ['redirect-chain', 'ttfb-check', 'performance-snapshot'],
  'redirect-chain': ['status-checker', 'sitemap-validator', 'performance-snapshot'],
  'security-headers': ['status-checker', 'performance-snapshot', 'robots-checker'],
  'robots-checker': ['sitemap-validator', 'status-checker', 'performance-snapshot'],
  'sitemap-validator': ['robots-checker', 'redirect-chain', 'performance-snapshot'],
  'ttfb-check': ['status-checker', 'performance-snapshot', 'redirect-chain'],
  'performance-snapshot': ['status-checker', 'redirect-chain', 'security-headers'],
}

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
  return sanitizePublicCopy(locale, tool.localized[locale] ?? tool.localized.en)
}

export function getRelatedSitePulseTools(slug: ToolSlug, locale: LocaleCode): SitePulseRelatedTool[] {
  return relatedBySlug[slug]
    .map((relatedSlug) => getToolBySlug(relatedSlug))
    .filter((tool): tool is ToolDefinition => Boolean(tool))
    .map((tool) => {
      const copy = getToolCopy(tool, locale)

      return {
        slug: tool.slug,
        title: copy.title,
        description: copy.freeScope,
      }
    })
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

function normalizeFindingStatus(status: string | undefined): SitePulseScoreChecklistItem['status'] {
  if (status === 'pass' || status === 'warn' || status === 'fail' || status === 'unknown') {
    return status
  }

  if (status === 'ok' || status === 'healthy') {
    return 'pass'
  }

  if (status === 'warning' || status === 'review' || status === 'blocked') {
    return 'warn'
  }

  return status ? 'fail' : 'unknown'
}

export function createSitePulseScoreCard(findings: Array<{ label: string; status?: string; detail: string }>, fallbackSummary: string): SitePulseScoreCard {
  const checklist = findings.map((finding) => ({
    label: finding.label,
    status: normalizeFindingStatus(finding.status),
    detail: finding.detail,
  }))

  if (checklist.length === 0) {
    return {
      score: 0,
      grade: 'Not run',
      tone: 'warn',
      summary: fallbackSummary,
      checklist: [],
    }
  }

  const score = Math.max(0, Math.round(
    checklist.reduce((total, item) => {
      if (item.status === 'pass') {
        return total + 100
      }
      if (item.status === 'warn' || item.status === 'unknown') {
        return total + 55
      }

      return total
    }, 0) / checklist.length,
  ))
  const failCount = checklist.filter((item) => item.status === 'fail').length
  const warnCount = checklist.filter((item) => item.status === 'warn' || item.status === 'unknown').length
  const grade = score >= 85 && failCount === 0
    ? 'Healthy'
    : score >= 60
      ? 'Review'
      : 'Action needed'
  const tone = grade === 'Healthy' ? 'pass' : grade === 'Review' ? 'warn' : 'fail'
  const summary = failCount > 0
    ? `${failCount} failing signal${failCount === 1 ? '' : 's'} should be investigated before treating this URL as healthy.`
    : warnCount > 0
      ? `${warnCount} warning signal${warnCount === 1 ? '' : 's'} need review before recurring monitoring is useful.`
      : 'All visible signals in this one-shot check look healthy.'

  return {
    score,
    grade,
    tone,
    summary,
    checklist,
  }
}
