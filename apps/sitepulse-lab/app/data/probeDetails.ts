import { sanitizePublicCopy, type LocaleCode } from './locales'

export type SitePulseDetailStatus = 'pass' | 'warn' | 'fail' | 'unknown'

export interface SitePulseDetailItem {
  label: string
  status: SitePulseDetailStatus
  detail: string
  value?: string
}

export interface SitePulseRedirectHop {
  step: string
  status: SitePulseDetailStatus
  code: string
  url: string
  location: string
  duration: string
  crossDomain: string
  warning?: string
}

export interface SitePulseDetailView {
  redirectHops: SitePulseRedirectHop[]
  headerItems: SitePulseDetailItem[]
  crawlItems: SitePulseDetailItem[]
  sitemapSampleUrls: string[]
  technologyItems: SitePulseDetailItem[]
  performanceItems: SitePulseDetailItem[]
  warnings: string[]
}

export interface SitePulseProbeDetailInput {
  checks: Record<string, unknown>
  redirect_chain: Array<Record<string, unknown>>
  warnings: string[]
}

export interface SitePulseDetailCopy {
  redirectPathTitle: string
  headerMatrixTitle: string
  technologyTitle: string
  crawlabilityTitle: string
  performanceTitle: string
  warningsTitle: string
  emptyRedirects: string
  presentDetail: string
  missingDetail: string
  reviewDetail: string
  noHeaderSignals: string
  noTechnologySignals: string
  contentTypeDetail: string
  serverHintDetail: string
  cacheHintDetail: string
  securityPolicyDetail: string
  ttfbDetail: string
  redirectCountDetail: string
  bodySizeDetail: string
  finalStatusDetail: string
  fetchStatusDetail: string
  robotsSitemapHintsDetail: string
  robotsBroadDisallowDetail: string
  sitemapXmlShapeDetail: string
  sitemapUrlCountDetail: string
  seoNextStepDetail: string
  ttfbRatingDetail: string
  contentTypeLabel: string
  serverHintLabel: string
  technologyHintLabel: string
  securityPolicyLabel: string
  cacheHintLabel: string
  finalStatusLabel: string
  ttfbLabel: string
  ttfbRatingLabel: string
  redirectCountLabel: string
  sampledBodyLabel: string
  urlLabel: string
  locationLabel: string
  durationLabel: string
  crossDomainLabel: string
  loopWarningLabel: string
  fetchStatusLabel: string
  robotsSitemapHintsLabel: string
  robotsBroadDisallowLabel: string
  sitemapXmlShapeLabel: string
  sitemapUrlCountLabel: string
  sitemapSampleUrlsLabel: string
  seoNextStepLabel: string
  goodLabel: string
  needsWorkLabel: string
  slowLabel: string
  yesLabel: string
  noLabel: string
}

const detailCopy: Record<LocaleCode, SitePulseDetailCopy> = {
  en: {
    redirectPathTitle: 'Redirect path',
    headerMatrixTitle: 'Header matrix',
    technologyTitle: 'Technology clues',
    crawlabilityTitle: 'Crawlability files',
    performanceTitle: 'Performance sample',
    warningsTitle: 'Bounded probe notes',
    emptyRedirects: 'No redirect hops were reported for this one-shot check.',
    presentDetail: 'Present on the final response.',
    missingDetail: 'Missing from the final response or not sampled by the bounded probe.',
    reviewDetail: 'Detected but should be reviewed in the final deployment context.',
    noHeaderSignals: 'No header matrix was returned for this check.',
    noTechnologySignals: 'No technology clues were returned by the bounded probe.',
    contentTypeDetail: 'Content type seen on the final response.',
    serverHintDetail: 'Server or platform hint exposed by bounded response metadata.',
    cacheHintDetail: 'Cache or CDN hint exposed by public response headers.',
    securityPolicyDetail: 'Browser hardening signal exposed by public response headers.',
    ttfbDetail: 'Approximate first-byte timing sample from one probe runtime.',
    redirectCountDetail: 'Redirect hops followed before the final response.',
    bodySizeDetail: 'Sampled response body size within the configured cap.',
    finalStatusDetail: 'Final HTTP status after bounded redirects.',
    fetchStatusDetail: 'HTTP status returned by the same-origin file request.',
    robotsSitemapHintsDetail: 'Sitemap hints discovered inside the sampled robots.txt body.',
    robotsBroadDisallowDetail: 'Broad Disallow rules can block crawlers from the whole site.',
    sitemapXmlShapeDetail: 'Recognized sitemap XML container in the sampled body.',
    sitemapUrlCountDetail: 'Number of URL entries counted inside the sampled sitemap body.',
    seoNextStepDetail: 'Use this signal before submitting or refreshing the sitemap in search tooling.',
    ttfbRatingDetail: 'Good is under 800 ms, needs work is under 2000 ms and slow is 2000 ms or above.',
    contentTypeLabel: 'Content type',
    serverHintLabel: 'Server hint',
    technologyHintLabel: 'Technology hint',
    securityPolicyLabel: 'Security policy',
    cacheHintLabel: 'Cache/CDN hint',
    finalStatusLabel: 'Final status',
    ttfbLabel: 'TTFB sample',
    ttfbRatingLabel: 'TTFB rating',
    redirectCountLabel: 'Redirect count',
    sampledBodyLabel: 'Sampled body',
    urlLabel: 'URL',
    locationLabel: 'Location',
    durationLabel: 'Duration',
    crossDomainLabel: 'Cross-domain',
    loopWarningLabel: 'Redirect loop warning',
    fetchStatusLabel: 'Fetch status',
    robotsSitemapHintsLabel: 'Sitemap hints',
    robotsBroadDisallowLabel: 'Broad disallow',
    sitemapXmlShapeLabel: 'XML shape',
    sitemapUrlCountLabel: 'URL count',
    sitemapSampleUrlsLabel: 'Sample URLs',
    seoNextStepLabel: 'Next SEO step',
    goodLabel: 'Good',
    needsWorkLabel: 'Needs work',
    slowLabel: 'Slow',
    yesLabel: 'Yes',
    noLabel: 'No',
  },
  'pt-br': {
    redirectPathTitle: 'Caminho de redirects',
    headerMatrixTitle: 'Matriz de headers',
    technologyTitle: 'Pistas de tecnologia',
    crawlabilityTitle: 'Arquivos de crawl',
    performanceTitle: 'Amostra de performance',
    warningsTitle: 'Notas da probe limitada',
    emptyRedirects: 'Nenhum hop de redirect foi retornado neste check pontual.',
    presentDetail: 'Presente na resposta final.',
    missingDetail: 'Ausente na resposta final ou nao amostrado pela probe limitada.',
    reviewDetail: 'Detectado, mas deve ser revisado no contexto final do deploy.',
    noHeaderSignals: 'Nenhuma matriz de headers foi retornada para este check.',
    noTechnologySignals: 'Nenhuma pista de tecnologia foi retornada pela probe limitada.',
    contentTypeDetail: 'Tipo de conteudo visto na resposta final.',
    serverHintDetail: 'Pista de servidor ou plataforma exposta pela metadata da resposta.',
    cacheHintDetail: 'Pista de cache ou CDN exposta por headers publicos.',
    securityPolicyDetail: 'Sinal de hardening do navegador exposto por headers publicos.',
    ttfbDetail: 'Amostra aproximada de first byte em um runtime de probe.',
    redirectCountDetail: 'Hops de redirect seguidos antes da resposta final.',
    bodySizeDetail: 'Tamanho de corpo amostrado dentro do limite configurado.',
    finalStatusDetail: 'Status HTTP final depois dos redirects limitados.',
    fetchStatusDetail: 'Status HTTP retornado pela requisicao ao arquivo da mesma origem.',
    robotsSitemapHintsDetail: 'Hints de sitemap encontradas no corpo amostrado do robots.txt.',
    robotsBroadDisallowDetail: 'Regras Disallow amplas podem bloquear crawlers no site inteiro.',
    sitemapXmlShapeDetail: 'Container XML de sitemap reconhecido no corpo amostrado.',
    sitemapUrlCountDetail: 'Numero de entradas URL contadas no corpo amostrado do sitemap.',
    seoNextStepDetail: 'Use este sinal antes de enviar ou atualizar o sitemap nas ferramentas de busca.',
    ttfbRatingDetail: 'Bom fica abaixo de 800 ms, precisa melhorar abaixo de 2000 ms e lento em 2000 ms ou mais.',
    contentTypeLabel: 'Tipo de conteudo',
    serverHintLabel: 'Pista de servidor',
    technologyHintLabel: 'Pista de tecnologia',
    securityPolicyLabel: 'Politica de seguranca',
    cacheHintLabel: 'Pista de cache/CDN',
    finalStatusLabel: 'Status final',
    ttfbLabel: 'Amostra TTFB',
    ttfbRatingLabel: 'Classificacao TTFB',
    redirectCountLabel: 'Contagem de redirects',
    sampledBodyLabel: 'Corpo amostrado',
    urlLabel: 'URL',
    locationLabel: 'Destino',
    durationLabel: 'Duracao',
    crossDomainLabel: 'Outro dominio',
    loopWarningLabel: 'Alerta de loop de redirect',
    fetchStatusLabel: 'Status da busca',
    robotsSitemapHintsLabel: 'Hints de sitemap',
    robotsBroadDisallowLabel: 'Disallow amplo',
    sitemapXmlShapeLabel: 'Formato XML',
    sitemapUrlCountLabel: 'Contagem de URLs',
    sitemapSampleUrlsLabel: 'URLs de amostra',
    seoNextStepLabel: 'Proximo passo SEO',
    goodLabel: 'Bom',
    needsWorkLabel: 'Precisa melhorar',
    slowLabel: 'Lento',
    yesLabel: 'Sim',
    noLabel: 'Nao',
  },
  es: {
    redirectPathTitle: 'Ruta de redirects',
    headerMatrixTitle: 'Matriz de headers',
    technologyTitle: 'Pistas de tecnologia',
    crawlabilityTitle: 'Archivos de rastreo',
    performanceTitle: 'Muestra de rendimiento',
    warningsTitle: 'Notas de la probe limitada',
    emptyRedirects: 'No se reportaron saltos de redirect en este check puntual.',
    presentDetail: 'Presente en la respuesta final.',
    missingDetail: 'Ausente en la respuesta final o no muestreado por la probe limitada.',
    reviewDetail: 'Detectado, pero debe revisarse en el contexto final del deploy.',
    noHeaderSignals: 'No se devolvio matriz de headers para este check.',
    noTechnologySignals: 'La probe limitada no devolvio pistas de tecnologia.',
    contentTypeDetail: 'Tipo de contenido visto en la respuesta final.',
    serverHintDetail: 'Pista de servidor o plataforma expuesta por metadata de respuesta.',
    cacheHintDetail: 'Pista de cache o CDN expuesta por headers publicos.',
    securityPolicyDetail: 'Senal de hardening del navegador expuesta por headers publicos.',
    ttfbDetail: 'Muestra aproximada de first byte desde un runtime de probe.',
    redirectCountDetail: 'Saltos de redirect seguidos antes de la respuesta final.',
    bodySizeDetail: 'Tamano de cuerpo muestreado dentro del limite configurado.',
    finalStatusDetail: 'Status HTTP final despues de redirects limitados.',
    fetchStatusDetail: 'Status HTTP devuelto por la solicitud al archivo del mismo origen.',
    robotsSitemapHintsDetail: 'Hints de sitemap encontradas en el cuerpo muestreado de robots.txt.',
    robotsBroadDisallowDetail: 'Reglas Disallow amplias pueden bloquear crawlers en todo el sitio.',
    sitemapXmlShapeDetail: 'Contenedor XML de sitemap reconocido en el cuerpo muestreado.',
    sitemapUrlCountDetail: 'Numero de entradas URL contadas en el cuerpo muestreado del sitemap.',
    seoNextStepDetail: 'Usa esta senal antes de enviar o actualizar el sitemap en herramientas de busqueda.',
    ttfbRatingDetail: 'Bueno es menos de 800 ms, necesita trabajo menos de 2000 ms y lento 2000 ms o mas.',
    contentTypeLabel: 'Tipo de contenido',
    serverHintLabel: 'Pista de servidor',
    technologyHintLabel: 'Pista de tecnologia',
    securityPolicyLabel: 'Politica de seguridad',
    cacheHintLabel: 'Pista de cache/CDN',
    finalStatusLabel: 'Estado final',
    ttfbLabel: 'Muestra TTFB',
    ttfbRatingLabel: 'Clasificacion TTFB',
    redirectCountLabel: 'Conteo de redirects',
    sampledBodyLabel: 'Cuerpo muestreado',
    urlLabel: 'URL',
    locationLabel: 'Ubicacion',
    durationLabel: 'Duracion',
    crossDomainLabel: 'Otro dominio',
    loopWarningLabel: 'Alerta de loop de redirect',
    fetchStatusLabel: 'Status de busqueda',
    robotsSitemapHintsLabel: 'Hints de sitemap',
    robotsBroadDisallowLabel: 'Disallow amplio',
    sitemapXmlShapeLabel: 'Forma XML',
    sitemapUrlCountLabel: 'Conteo de URLs',
    sitemapSampleUrlsLabel: 'URLs de muestra',
    seoNextStepLabel: 'Siguiente paso SEO',
    goodLabel: 'Bueno',
    needsWorkLabel: 'Necesita trabajo',
    slowLabel: 'Lento',
    yesLabel: 'Si',
    noLabel: 'No',
  },
  fr: {
    redirectPathTitle: 'Chemin de redirects',
    headerMatrixTitle: 'Matrice headers',
    technologyTitle: 'Indices technologie',
    crawlabilityTitle: 'Fichiers crawl',
    performanceTitle: 'Echantillon performance',
    warningsTitle: 'Notes de probe bornee',
    emptyRedirects: 'Aucun hop de redirect n a ete retourne pour ce controle ponctuel.',
    presentDetail: 'Present sur la reponse finale.',
    missingDetail: 'Absent de la reponse finale ou non echantillonne par la probe bornee.',
    reviewDetail: 'Detecte, mais a revoir dans le contexte final du deploy.',
    noHeaderSignals: 'Aucune matrice de headers retournee pour ce controle.',
    noTechnologySignals: 'Aucun indice technologie retourne par la probe bornee.',
    contentTypeDetail: 'Type de contenu vu sur la reponse finale.',
    serverHintDetail: 'Indice serveur ou plateforme expose par la metadata de reponse.',
    cacheHintDetail: 'Indice cache ou CDN expose par les headers publics.',
    securityPolicyDetail: 'Signal de hardening navigateur expose par les headers publics.',
    ttfbDetail: 'Echantillon approximatif first byte depuis un runtime de probe.',
    redirectCountDetail: 'Hops de redirect suivis avant la reponse finale.',
    bodySizeDetail: 'Taille de corps echantillonnee dans la limite configuree.',
    finalStatusDetail: 'Statut HTTP final apres redirects bornes.',
    fetchStatusDetail: 'Statut HTTP retourne par la requete fichier meme origine.',
    robotsSitemapHintsDetail: 'Indices sitemap trouves dans le corps robots.txt echantillonne.',
    robotsBroadDisallowDetail: 'Des regles Disallow larges peuvent bloquer tout le site.',
    sitemapXmlShapeDetail: 'Conteneur XML sitemap reconnu dans le corps echantillonne.',
    sitemapUrlCountDetail: 'Nombre d entrees URL comptees dans le sitemap echantillonne.',
    seoNextStepDetail: 'Utilisez ce signal avant soumission ou mise a jour du sitemap en outil search.',
    ttfbRatingDetail: 'Bon est sous 800 ms, a ameliorer sous 2000 ms et lent a 2000 ms ou plus.',
    contentTypeLabel: 'Type de contenu',
    serverHintLabel: 'Indice serveur',
    technologyHintLabel: 'Indice technologie',
    securityPolicyLabel: 'Politique securite',
    cacheHintLabel: 'Indice cache/CDN',
    finalStatusLabel: 'Statut final',
    ttfbLabel: 'Echantillon TTFB',
    ttfbRatingLabel: 'Classement TTFB',
    redirectCountLabel: 'Nombre de redirects',
    sampledBodyLabel: 'Corps echantillonne',
    urlLabel: 'URL',
    locationLabel: 'Destination',
    durationLabel: 'Duree',
    crossDomainLabel: 'Autre domaine',
    loopWarningLabel: 'Alerte boucle redirect',
    fetchStatusLabel: 'Statut fetch',
    robotsSitemapHintsLabel: 'Indices sitemap',
    robotsBroadDisallowLabel: 'Disallow large',
    sitemapXmlShapeLabel: 'Forme XML',
    sitemapUrlCountLabel: 'Nombre URLs',
    sitemapSampleUrlsLabel: 'URLs exemple',
    seoNextStepLabel: 'Prochaine etape SEO',
    goodLabel: 'Bon',
    needsWorkLabel: 'A ameliorer',
    slowLabel: 'Lent',
    yesLabel: 'Oui',
    noLabel: 'Non',
  },
  de: {
    redirectPathTitle: 'Redirect-Pfad',
    headerMatrixTitle: 'Header-Matrix',
    technologyTitle: 'Technologie-Hinweise',
    crawlabilityTitle: 'Crawl-Dateien',
    performanceTitle: 'Performance-Sample',
    warningsTitle: 'Hinweise zur begrenzten Probe',
    emptyRedirects: 'Fuer diesen Einmal-Check wurden keine Redirect-Hops gemeldet.',
    presentDetail: 'Auf der finalen Antwort vorhanden.',
    missingDetail: 'Auf der finalen Antwort fehlend oder durch die begrenzte Probe nicht erfasst.',
    reviewDetail: 'Erkannt, aber im finalen Deployment-Kontext zu pruefen.',
    noHeaderSignals: 'Fuer diesen Check wurde keine Header-Matrix geliefert.',
    noTechnologySignals: 'Die begrenzte Probe lieferte keine Technologie-Hinweise.',
    contentTypeDetail: 'Content-Type der finalen Antwort.',
    serverHintDetail: 'Server- oder Plattformhinweis aus begrenzter Response-Metadata.',
    cacheHintDetail: 'Cache- oder CDN-Hinweis aus oeffentlichen Response-Headern.',
    securityPolicyDetail: 'Browser-Hardening-Signal aus oeffentlichen Response-Headern.',
    ttfbDetail: 'Ungefaehres First-Byte-Timing aus einem Probe-Runtime.',
    redirectCountDetail: 'Redirect-Hops vor der finalen Antwort.',
    bodySizeDetail: 'Gesampelte Antwortgroesse innerhalb der konfigurierten Grenze.',
    finalStatusDetail: 'Finaler HTTP-Status nach begrenzten Redirects.',
    fetchStatusDetail: 'HTTP-Status der Datei-Anfrage auf gleicher Origin.',
    robotsSitemapHintsDetail: 'Sitemap-Hinweise im gesampelten robots.txt-Body.',
    robotsBroadDisallowDetail: 'Breite Disallow-Regeln koennen Crawler fuer die ganze Site blockieren.',
    sitemapXmlShapeDetail: 'Erkannter Sitemap-XML-Container im gesampelten Body.',
    sitemapUrlCountDetail: 'Anzahl der URL-Eintraege im gesampelten Sitemap-Body.',
    seoNextStepDetail: 'Dieses Signal vor Submission oder Refresh in Search-Tools nutzen.',
    ttfbRatingDetail: 'Gut ist unter 800 ms, braucht Arbeit unter 2000 ms und langsam ist 2000 ms oder mehr.',
    contentTypeLabel: 'Content-Type',
    serverHintLabel: 'Server-Hinweis',
    technologyHintLabel: 'Technologie-Hinweis',
    securityPolicyLabel: 'Security-Policy',
    cacheHintLabel: 'Cache/CDN-Hinweis',
    finalStatusLabel: 'Finaler Status',
    ttfbLabel: 'TTFB-Sample',
    ttfbRatingLabel: 'TTFB-Bewertung',
    redirectCountLabel: 'Redirect-Anzahl',
    sampledBodyLabel: 'Gesampelter Body',
    urlLabel: 'URL',
    locationLabel: 'Ziel',
    durationLabel: 'Dauer',
    crossDomainLabel: 'Andere Domain',
    loopWarningLabel: 'Redirect-Loop-Warnung',
    fetchStatusLabel: 'Fetch-Status',
    robotsSitemapHintsLabel: 'Sitemap-Hinweise',
    robotsBroadDisallowLabel: 'Breites Disallow',
    sitemapXmlShapeLabel: 'XML-Form',
    sitemapUrlCountLabel: 'URL-Anzahl',
    sitemapSampleUrlsLabel: 'Beispiel-URLs',
    seoNextStepLabel: 'Naechster SEO-Schritt',
    goodLabel: 'Gut',
    needsWorkLabel: 'Braucht Arbeit',
    slowLabel: 'Langsam',
    yesLabel: 'Ja',
    noLabel: 'Nein',
  },
}

const headerNameMap: Record<string, string> = {
  'content-security-policy': 'Content-Security-Policy',
  'strict-transport-security': 'Strict-Transport-Security',
  'x-frame-options': 'X-Frame-Options',
  'x-content-type-options': 'X-Content-Type-Options',
  'referrer-policy': 'Referrer-Policy',
  'permissions-policy': 'Permissions-Policy',
  'cache-control': 'Cache-Control',
  'cf-cache-status': 'CF-Cache-Status',
  'x-cache': 'X-Cache',
  server: 'Server',
}

export function getSitePulseDetailCopy(locale: LocaleCode): SitePulseDetailCopy {
  return sanitizePublicCopy(locale, detailCopy[locale])
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
}

function asString(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return ''
}

function asList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => asString(item))
    .filter(Boolean)
}

function formatHeaderName(value: string): string {
  const normalized = value.toLowerCase()

  return headerNameMap[normalized] ?? normalized
    .split('-')
    .map((part) => part ? `${part[0].toUpperCase()}${part.slice(1)}` : part)
    .join('-')
}

function formatDuration(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return `${Math.round(value)} ms`
  }

  return asString(value) || '-'
}

function numberFrom(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)

    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

function statusFromCode(value: unknown): SitePulseDetailStatus {
  const code = typeof value === 'number' ? value : Number(asString(value))

  if (!Number.isFinite(code)) {
    return 'unknown'
  }

  if (code >= 200 && code < 400) {
    return 'pass'
  }

  if (code >= 400 && code < 500) {
    return 'warn'
  }

  return 'fail'
}

function hostnameOf(value: string): string {
  try {
    return new URL(value).hostname.toLowerCase()
  } catch {
    return ''
  }
}

function ttfbRating(value: unknown, copy: SitePulseDetailCopy): { status: SitePulseDetailStatus; value: string } {
  const duration = numberFrom(value)

  if (duration === null) {
    return { status: 'unknown', value: '-' }
  }

  if (duration < 800) {
    return { status: 'pass', value: copy.goodLabel }
  }

  if (duration < 2000) {
    return { status: 'warn', value: copy.needsWorkLabel }
  }

  return { status: 'fail', value: copy.slowLabel }
}

function extractSitemapUrls(body: string): string[] {
  return Array.from(body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi))
    .map((match) => match[1]?.trim() ?? '')
    .filter(Boolean)
    .slice(0, 3)
}

function addUniqueItem(items: SitePulseDetailItem[], item: SitePulseDetailItem): void {
  const key = `${item.label}:${item.value ?? ''}`.toLowerCase()

  if (!items.some((existing) => `${existing.label}:${existing.value ?? ''}`.toLowerCase() === key)) {
    items.push(item)
  }
}

export function createSitePulseDetailView(input: SitePulseProbeDetailInput, locale: LocaleCode = 'en'): SitePulseDetailView {
  const copy = getSitePulseDetailCopy(locale)
  const checks = asRecord(input.checks)
  const statusCheck = asRecord(checks.status)
  const redirectCheck = asRecord(checks.redirects)
  const headerCheck = asRecord(checks.headers)
  const robotsCheck = asRecord(checks.robots)
  const sitemapCheck = asRecord(checks.sitemap)
  const performanceCheck = asRecord(checks.performance)
  const ttfbCheck = asRecord(checks.ttfb)
  const originHost = hostnameOf(asString(input.redirect_chain[0]?.url))
  const seenUrls = new Set<string>()
  const redirectHops = input.redirect_chain.map((hop, index) => {
    const statusCode = asString(hop.status) || '-'
    const url = asString(hop.url) || '-'
    const host = hostnameOf(url)
    const repeated = url !== '-' && seenUrls.has(url)
    const error = asString(hop.error)

    if (url !== '-') {
      seenUrls.add(url)
    }

    return {
      step: String(index + 1),
      status: error || repeated ? 'fail' : statusFromCode(hop.status),
      code: statusCode,
      url,
      location: asString(hop.location) || '-',
      duration: formatDuration(hop.duration_ms),
      crossDomain: host && originHost && host !== originHost ? copy.yesLabel : copy.noLabel,
      warning: error || repeated ? copy.loopWarningLabel : undefined,
    }
  })
  const headerItems: SitePulseDetailItem[] = []

  for (const header of asList(headerCheck.present)) {
    headerItems.push({
      label: formatHeaderName(header),
      status: 'pass',
      detail: copy.presentDetail,
    })
  }

  for (const header of asList(headerCheck.missing)) {
    headerItems.push({
      label: formatHeaderName(header),
      status: 'warn',
      detail: copy.missingDetail,
    })
  }

  for (const header of asList(headerCheck.review)) {
    headerItems.push({
      label: formatHeaderName(header),
      status: 'warn',
      detail: copy.reviewDetail,
    })
  }

  if (!headerItems.length) {
    headerItems.push({
      label: copy.headerMatrixTitle,
      status: 'unknown',
      detail: copy.noHeaderSignals,
    })
  }

  const crawlItems: SitePulseDetailItem[] = []
  const robotsBody = asString(robotsCheck.body_sample)
  const sitemapBody = asString(sitemapCheck.body_sample)
  const robotsStatus = robotsCheck.status
  const sitemapStatus = sitemapCheck.status

  if (Object.keys(robotsCheck).length) {
    const sitemapHints = (robotsBody.match(/^\s*sitemap\s*:/gim) ?? []).length
    const hasBroadDisallow = /^\s*disallow\s*:\s*\/\s*$/im.test(robotsBody)

    crawlItems.push({
      label: `robots.txt ${copy.fetchStatusLabel}`,
      status: statusFromCode(robotsStatus),
      detail: copy.fetchStatusDetail,
      value: asString(robotsStatus) || '-',
    })
    crawlItems.push({
      label: copy.robotsSitemapHintsLabel,
      status: sitemapHints > 0 ? 'pass' : 'warn',
      detail: copy.robotsSitemapHintsDetail,
      value: String(sitemapHints),
    })
    crawlItems.push({
      label: copy.robotsBroadDisallowLabel,
      status: hasBroadDisallow ? 'warn' : 'pass',
      detail: copy.robotsBroadDisallowDetail,
      value: hasBroadDisallow ? copy.yesLabel : copy.noLabel,
    })
  }

  if (Object.keys(sitemapCheck).length) {
    const sitemapUrlCount = numberFrom(sitemapCheck.url_count) ?? extractSitemapUrls(sitemapBody).length
    const xmlShape = asString(sitemapCheck.xml_shape) || '-'

    crawlItems.push({
      label: `sitemap.xml ${copy.fetchStatusLabel}`,
      status: statusFromCode(sitemapStatus),
      detail: copy.fetchStatusDetail,
      value: asString(sitemapStatus) || '-',
    })
    crawlItems.push({
      label: copy.sitemapXmlShapeLabel,
      status: xmlShape !== '-' && xmlShape !== 'invalid' ? 'pass' : 'warn',
      detail: copy.sitemapXmlShapeDetail,
      value: xmlShape,
    })
    crawlItems.push({
      label: copy.sitemapUrlCountLabel,
      status: sitemapUrlCount > 0 ? 'pass' : 'warn',
      detail: copy.sitemapUrlCountDetail,
      value: String(sitemapUrlCount),
    })
    crawlItems.push({
      label: copy.seoNextStepLabel,
      status: sitemapUrlCount > 0 ? 'pass' : 'warn',
      detail: copy.seoNextStepDetail,
      value: sitemapUrlCount > 0 ? copy.yesLabel : copy.needsWorkLabel,
    })
  }

  const presentHeaders = asList(headerCheck.present).map((header) => header.toLowerCase())
  const technologyItems: SitePulseDetailItem[] = []
  const contentType = asString(statusCheck.content_type || headerCheck.content_type)
  const serverHint = asString(statusCheck.server || headerCheck.server)

  if (contentType) {
    addUniqueItem(technologyItems, {
      label: copy.contentTypeLabel,
      status: 'pass',
      detail: copy.contentTypeDetail,
      value: contentType,
    })
  }

  if (serverHint) {
    addUniqueItem(technologyItems, {
      label: copy.serverHintLabel,
      status: 'warn',
      detail: copy.serverHintDetail,
      value: serverHint,
    })
  }

  for (const hint of [...asList(checks.technologies), ...asList(headerCheck.technologies)]) {
    addUniqueItem(technologyItems, {
      label: copy.technologyHintLabel,
      status: 'warn',
      detail: copy.serverHintDetail,
      value: hint,
    })
  }

  if (presentHeaders.some((header) => ['strict-transport-security', 'content-security-policy', 'permissions-policy'].includes(header))) {
    addUniqueItem(technologyItems, {
      label: copy.securityPolicyLabel,
      status: 'pass',
      detail: copy.securityPolicyDetail,
    })
  }

  if (presentHeaders.some((header) => ['cache-control', 'cf-cache-status', 'x-cache', 'server-timing', 'cdn-cache-control'].includes(header))) {
    addUniqueItem(technologyItems, {
      label: copy.cacheHintLabel,
      status: 'warn',
      detail: copy.cacheHintDetail,
    })
  }

  if (!technologyItems.length) {
    technologyItems.push({
      label: copy.technologyTitle,
      status: 'unknown',
      detail: copy.noTechnologySignals,
    })
  }

  const performanceItems: SitePulseDetailItem[] = []
  const ttfb = ttfbCheck.duration_ms ?? statusCheck.duration_ms
  const redirectCount = performanceCheck.redirect_count ?? redirectCheck.count ?? Math.max(input.redirect_chain.length - 1, 0)
  const bodyBytes = performanceCheck.body_bytes_sampled ?? statusCheck.body_bytes_sampled
  const finalStatus = redirectCheck.final_status ?? statusCheck.code

  if (finalStatus !== undefined) {
    performanceItems.push({
      label: copy.finalStatusLabel,
      status: statusFromCode(finalStatus),
      detail: copy.finalStatusDetail,
      value: asString(finalStatus),
    })
  }

  if (ttfb !== undefined) {
    const rating = ttfbRating(ttfb, copy)

    performanceItems.push({
      label: copy.ttfbRatingLabel,
      status: rating.status,
      detail: copy.ttfbRatingDetail,
      value: rating.value,
    })
    performanceItems.push({
      label: copy.ttfbLabel,
      status: rating.status,
      detail: copy.ttfbDetail,
      value: formatDuration(ttfb),
    })
  }

  performanceItems.push({
    label: copy.redirectCountLabel,
    status: Number(redirectCount) > 1 ? 'warn' : 'pass',
    detail: copy.redirectCountDetail,
    value: asString(redirectCount),
  })

  if (bodyBytes !== undefined) {
    performanceItems.push({
      label: copy.sampledBodyLabel,
      status: 'pass',
      detail: copy.bodySizeDetail,
      value: `${asString(bodyBytes)} bytes`,
    })
  }

  return {
    redirectHops,
    headerItems,
    crawlItems,
    sitemapSampleUrls: extractSitemapUrls(sitemapBody),
    technologyItems,
    performanceItems,
    warnings: input.warnings,
  }
}
