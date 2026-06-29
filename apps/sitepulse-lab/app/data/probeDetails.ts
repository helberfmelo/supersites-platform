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
}

export interface SitePulseDetailView {
  redirectHops: SitePulseRedirectHop[]
  headerItems: SitePulseDetailItem[]
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
  contentTypeLabel: string
  serverHintLabel: string
  technologyHintLabel: string
  securityPolicyLabel: string
  cacheHintLabel: string
  finalStatusLabel: string
  ttfbLabel: string
  redirectCountLabel: string
  sampledBodyLabel: string
  urlLabel: string
  locationLabel: string
  durationLabel: string
}

const detailCopy: Record<LocaleCode, SitePulseDetailCopy> = {
  en: {
    redirectPathTitle: 'Redirect path',
    headerMatrixTitle: 'Header matrix',
    technologyTitle: 'Technology clues',
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
    contentTypeLabel: 'Content type',
    serverHintLabel: 'Server hint',
    technologyHintLabel: 'Technology hint',
    securityPolicyLabel: 'Security policy',
    cacheHintLabel: 'Cache/CDN hint',
    finalStatusLabel: 'Final status',
    ttfbLabel: 'TTFB sample',
    redirectCountLabel: 'Redirect count',
    sampledBodyLabel: 'Sampled body',
    urlLabel: 'URL',
    locationLabel: 'Location',
    durationLabel: 'Duration',
  },
  'pt-br': {
    redirectPathTitle: 'Caminho de redirects',
    headerMatrixTitle: 'Matriz de headers',
    technologyTitle: 'Pistas de tecnologia',
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
    contentTypeLabel: 'Tipo de conteudo',
    serverHintLabel: 'Pista de servidor',
    technologyHintLabel: 'Pista de tecnologia',
    securityPolicyLabel: 'Politica de seguranca',
    cacheHintLabel: 'Pista de cache/CDN',
    finalStatusLabel: 'Status final',
    ttfbLabel: 'Amostra TTFB',
    redirectCountLabel: 'Contagem de redirects',
    sampledBodyLabel: 'Corpo amostrado',
    urlLabel: 'URL',
    locationLabel: 'Destino',
    durationLabel: 'Duracao',
  },
  es: {
    redirectPathTitle: 'Ruta de redirects',
    headerMatrixTitle: 'Matriz de headers',
    technologyTitle: 'Pistas de tecnologia',
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
    contentTypeLabel: 'Tipo de contenido',
    serverHintLabel: 'Pista de servidor',
    technologyHintLabel: 'Pista de tecnologia',
    securityPolicyLabel: 'Politica de seguridad',
    cacheHintLabel: 'Pista de cache/CDN',
    finalStatusLabel: 'Estado final',
    ttfbLabel: 'Muestra TTFB',
    redirectCountLabel: 'Conteo de redirects',
    sampledBodyLabel: 'Cuerpo muestreado',
    urlLabel: 'URL',
    locationLabel: 'Ubicacion',
    durationLabel: 'Duracion',
  },
  fr: {
    redirectPathTitle: 'Chemin de redirects',
    headerMatrixTitle: 'Matrice headers',
    technologyTitle: 'Indices technologie',
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
    contentTypeLabel: 'Type de contenu',
    serverHintLabel: 'Indice serveur',
    technologyHintLabel: 'Indice technologie',
    securityPolicyLabel: 'Politique securite',
    cacheHintLabel: 'Indice cache/CDN',
    finalStatusLabel: 'Statut final',
    ttfbLabel: 'Echantillon TTFB',
    redirectCountLabel: 'Nombre de redirects',
    sampledBodyLabel: 'Corps echantillonne',
    urlLabel: 'URL',
    locationLabel: 'Destination',
    durationLabel: 'Duree',
  },
  de: {
    redirectPathTitle: 'Redirect-Pfad',
    headerMatrixTitle: 'Header-Matrix',
    technologyTitle: 'Technologie-Hinweise',
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
    contentTypeLabel: 'Content-Type',
    serverHintLabel: 'Server-Hinweis',
    technologyHintLabel: 'Technologie-Hinweis',
    securityPolicyLabel: 'Security-Policy',
    cacheHintLabel: 'Cache/CDN-Hinweis',
    finalStatusLabel: 'Finaler Status',
    ttfbLabel: 'TTFB-Sample',
    redirectCountLabel: 'Redirect-Anzahl',
    sampledBodyLabel: 'Gesampelter Body',
    urlLabel: 'URL',
    locationLabel: 'Ziel',
    durationLabel: 'Dauer',
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
  const performanceCheck = asRecord(checks.performance)
  const ttfbCheck = asRecord(checks.ttfb)
  const redirectHops = input.redirect_chain.map((hop, index) => {
    const statusCode = asString(hop.status) || '-'

    return {
      step: String(index + 1),
      status: statusFromCode(hop.status),
      code: statusCode,
      url: asString(hop.url) || '-',
      location: asString(hop.location) || '-',
      duration: formatDuration(hop.duration_ms),
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
    performanceItems.push({
      label: copy.ttfbLabel,
      status: typeof ttfb === 'number' && ttfb > 1000 ? 'warn' : 'pass',
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
    technologyItems,
    performanceItems,
    warnings: input.warnings,
  }
}
