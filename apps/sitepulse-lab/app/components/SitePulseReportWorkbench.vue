<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref } from 'vue'
import { localizedHomePath, sanitizePublicCopy, type LocaleCode } from '../data/locales'
import { createSitePulseScoreCard } from '../data/tools'
import { trackSitePulseEvent } from '../utils/analytics'

const props = defineProps<{
  locale: LocaleCode
}>()

type FindingStatus = 'pass' | 'warn' | 'fail' | 'unknown'
type VisualState = 'online' | 'redirecting' | 'slow' | 'down' | 'ready'

interface SitePulseFinding {
  label: string
  status: string
  detail: string
  value?: string | number | boolean | null
}

interface SitePulseProbeData {
  url: string
  final_url: string
  status: string
  summary: string
  findings: SitePulseFinding[]
  checks: Record<string, unknown>
  redirect_chain: Array<Record<string, unknown>>
  warnings: string[]
}

interface ApiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

interface ReportCopy {
  eyebrow: string
  title: string
  lead: string
  inputLabel: string
  inputPlaceholder: string
  primaryAction: string
  runningLabel: string
  errorFallback: string
  scoreLabel: string
  checkCardsTitle: string
  readyState: string
  stateLabels: Record<VisualState, string>
  stateDescriptions: Record<VisualState, string>
  statusLabels: Record<FindingStatus, string>
  resultDetails: Record<FindingStatus, string>
  metaLabels: {
    status: string
    redirects: string
    ttfb: string
    cache: string
    cached: string
    fresh: string
  }
  groupLabels: Record<ReportGroupKey, string>
  groupDescriptions: Record<ReportGroupKey, string>
  waitingDetail: string
  safeguardsTitle: string
  safeguards: string[]
  upgradeTitle: string
  upgradeBody: string
}

type ReportGroupKey = 'availability' | 'redirects' | 'security' | 'crawlability' | 'performance'

const reportCopy: Record<LocaleCode, ReportCopy> = {
  en: {
    eyebrow: 'One-shot website report',
    title: 'Check if a website is up, then review redirects, headers and speed signals.',
    lead: 'Enter a public URL and SitePulse combines bounded checks into a visual report without creating an account or monitoring history.',
    inputLabel: 'Website URL',
    inputPlaceholder: 'https://example.com',
    primaryAction: 'Run visual report',
    runningLabel: 'Running bounded website checks...',
    errorFallback: 'The SitePulse API is not reachable from this browser session.',
    scoreLabel: 'Pulse score',
    checkCardsTitle: 'Report cards',
    readyState: 'Ready',
    stateLabels: {
      online: 'Online',
      redirecting: 'Redirecting',
      slow: 'Slow',
      down: 'Down',
      ready: 'Ready',
    },
    stateDescriptions: {
      online: 'The final response is reachable and the visible signals look healthy.',
      redirecting: 'The page answered, with redirect hops that should stay intentional.',
      slow: 'The page answered, but timing should be reviewed before relying on it.',
      down: 'The URL failed, timed out or returned an unhealthy status for this probe.',
      ready: 'Run the report to classify this URL as online, redirecting, slow or down.',
    },
    statusLabels: {
      pass: 'Pass',
      warn: 'Review',
      fail: 'Action',
      unknown: 'Waiting',
    },
    resultDetails: {
      pass: 'This signal looks healthy in the bounded report.',
      warn: 'Review this signal before treating the URL as fully healthy.',
      fail: 'Investigate this signal before relying on the URL.',
      unknown: 'Run the report to populate this signal.',
    },
    metaLabels: {
      status: 'HTTP',
      redirects: 'Redirects',
      ttfb: 'TTFB',
      cache: 'Cache',
      cached: 'cached',
      fresh: 'fresh',
    },
    groupLabels: {
      availability: 'Availability',
      redirects: 'Redirects',
      security: 'Security headers',
      crawlability: 'Crawlability',
      performance: 'Performance',
    },
    groupDescriptions: {
      availability: 'Final HTTP status, timeout and response reachability.',
      redirects: 'Hop count, loops and unexpected handoffs.',
      security: 'Baseline browser security headers on the final response.',
      crawlability: 'robots.txt and sitemap.xml same-origin signals.',
      performance: 'Single timing sample and response-size clues.',
    },
    waitingDetail: 'Run a one-shot report to populate this signal.',
    safeguardsTitle: 'Privacy and antiabuse boundaries',
    safeguards: [
      'Only public HTTP/HTTPS targets on standard web ports are accepted.',
      'Private, local, reserved and metadata-network destinations are rejected before requests.',
      'Analytics receives route and tool metadata only, never the target URL or result values.',
    ],
    upgradeTitle: 'Optional account features',
    upgradeBody: 'Recurring uptime, incidents, public status pages, alerts, history, reports and multi-region probes remain future workflow value.',
  },
  'pt-br': {
    eyebrow: 'Relatorio web pontual',
    title: 'Veja se um site esta no ar e revise redirecionamentos, cabecalhos e velocidade.',
    lead: 'Informe uma URL publica e o SitePulse combina verificacoes limitadas em um relatorio visual sem conta ou historico de monitoramento.',
    inputLabel: 'URL do site',
    inputPlaceholder: 'https://example.com',
    primaryAction: 'Rodar relatorio visual',
    runningLabel: 'Executando verificacoes web limitadas...',
    errorFallback: 'A API SitePulse nao esta acessivel nesta sessao do navegador.',
    scoreLabel: 'Score Pulse',
    checkCardsTitle: 'Sinais do relatorio',
    readyState: 'Pronto',
    stateLabels: {
      online: 'Online',
      redirecting: 'Com redirects',
      slow: 'Lento',
      down: 'Fora',
      ready: 'Pronto',
    },
    stateDescriptions: {
      online: 'A resposta final esta acessivel e os sinais visiveis parecem saudaveis.',
      redirecting: 'A pagina respondeu, com redirecionamentos que devem ser intencionais.',
      slow: 'A pagina respondeu, mas o tempo deve ser revisado antes de confiar no resultado.',
      down: 'A URL falhou, expirou ou retornou status nao saudavel nesta verificacao.',
      ready: 'Rode o relatorio para classificar a URL como online, com redirects, lenta ou fora.',
    },
    statusLabels: {
      pass: 'Passou',
      warn: 'Revisar',
      fail: 'Acao',
      unknown: 'Aguardando',
    },
    resultDetails: {
      pass: 'Este sinal parece saudavel no relatorio limitado.',
      warn: 'Revise este sinal antes de tratar a URL como totalmente saudavel.',
      fail: 'Investigue este sinal antes de confiar na URL.',
      unknown: 'Rode o relatorio para preencher este sinal.',
    },
    metaLabels: {
      status: 'HTTP',
      redirects: 'Redirecionamentos',
      ttfb: 'TTFB',
      cache: 'Cache',
      cached: 'em cache',
      fresh: 'novo',
    },
    groupLabels: {
      availability: 'Disponibilidade',
      redirects: 'Redirecionamentos',
      security: 'Cabecalhos de seguranca',
      crawlability: 'Rastreamento',
      performance: 'Performance',
    },
    groupDescriptions: {
      availability: 'Status HTTP final, timeout e alcance da resposta.',
      redirects: 'Quantidade de saltos, loops e trocas inesperadas.',
      security: 'Cabecalhos basicos de seguranca no navegador na resposta final.',
      crawlability: 'Sinais same-origin de robots.txt e sitemap.xml.',
      performance: 'Amostra unica de tempo e pistas de tamanho de resposta.',
    },
    waitingDetail: 'Rode um relatorio pontual para preencher este sinal.',
    safeguardsTitle: 'Limites de privacidade e antiabuso',
    safeguards: [
      'Somente alvos HTTP/HTTPS publicos em portas web padrao sao aceitos.',
      'Destinos privados, locais, reservados e de metadados sao recusados antes das requisicoes.',
      'Analytics recebe apenas rota e ferramenta, nunca URL testada ou valores do resultado.',
    ],
    upgradeTitle: 'Recursos avancados',
    upgradeBody: 'Uptime recorrente, incidentes, pagina de status, alertas, historico, relatorios e verificacoes multi-regiao continuam como valor de conta.',
  },
  es: {
    eyebrow: 'Informe web puntual',
    title: 'Comprueba si un sitio esta online y revisa redirecciones, headers y velocidad.',
    lead: 'Ingresa una URL publica y SitePulse combina pruebas limitadas en un informe visual sin cuenta ni historial de monitoreo.',
    inputLabel: 'URL del sitio',
    inputPlaceholder: 'https://example.com',
    primaryAction: 'Ejecutar informe visual',
    runningLabel: 'Ejecutando pruebas web limitadas...',
    errorFallback: 'La API SitePulse no esta disponible desde esta sesion del navegador.',
    scoreLabel: 'Score Pulse',
    checkCardsTitle: 'Cards del informe',
    readyState: 'Listo',
    stateLabels: {
      online: 'Online',
      redirecting: 'Redirigiendo',
      slow: 'Lento',
      down: 'Caido',
      ready: 'Listo',
    },
    stateDescriptions: {
      online: 'La respuesta final es accesible y los signos visibles se ven sanos.',
      redirecting: 'La pagina respondio, con redirecciones que deben ser intencionales.',
      slow: 'La pagina respondio, pero el tiempo debe revisarse antes de confiar en el resultado.',
      down: 'La URL fallo, expiro o devolvio un estado no saludable en esta prueba.',
      ready: 'Ejecuta el informe para clasificar la URL como online, redirigiendo, lenta o caida.',
    },
    statusLabels: {
      pass: 'Pasa',
      warn: 'Revisar',
      fail: 'Accion',
      unknown: 'Esperando',
    },
    resultDetails: {
      pass: 'Esta senal se ve sana en el informe limitado.',
      warn: 'Revisa esta senal antes de tratar la URL como totalmente sana.',
      fail: 'Investiga esta senal antes de confiar en la URL.',
      unknown: 'Ejecuta el informe para completar esta senal.',
    },
    metaLabels: {
      status: 'HTTP',
      redirects: 'Redirecciones',
      ttfb: 'TTFB',
      cache: 'Cache',
      cached: 'en cache',
      fresh: 'nuevo',
    },
    groupLabels: {
      availability: 'Disponibilidad',
      redirects: 'Redirecciones',
      security: 'Headers de seguridad',
      crawlability: 'Rastreo',
      performance: 'Rendimiento',
    },
    groupDescriptions: {
      availability: 'Estado HTTP final, timeout y alcance de respuesta.',
      redirects: 'Numero de saltos, loops y cambios inesperados.',
      security: 'Headers basicos de seguridad del navegador en la respuesta final.',
      crawlability: 'Senales same-origin de robots.txt y sitemap.xml.',
      performance: 'Muestra unica de tiempo y pistas de tamano de respuesta.',
    },
    waitingDetail: 'Ejecuta un informe puntual para completar esta senal.',
    safeguardsTitle: 'Limites de privacidad y antiabuso',
    safeguards: [
      'Solo se aceptan objetivos HTTP/HTTPS publicos en puertos web estandar.',
      'Destinos privados, locales, reservados y de metadata se rechazan antes de solicitar.',
      'Analytics recibe solo ruta y herramienta, nunca la URL objetivo ni valores de resultado.',
    ],
    upgradeTitle: 'Opciones de cuenta',
    upgradeBody: 'Uptime recurrente, incidentes, status page, alertas, historial, informes y probes multi-region siguen como valor futuro.',
  },
  fr: {
    eyebrow: 'Rapport web ponctuel',
    title: 'Verifiez si un site est en ligne, puis revoyez redirections, headers et vitesse.',
    lead: 'Saisissez une URL publique et SitePulse combine des controles limites en rapport visuel sans compte ni historique de monitoring.',
    inputLabel: 'URL du site',
    inputPlaceholder: 'https://example.com',
    primaryAction: 'Lancer le rapport visuel',
    runningLabel: 'Controle web limite en cours...',
    errorFallback: 'L API SitePulse n est pas joignable depuis cette session navigateur.',
    scoreLabel: 'Score Pulse',
    checkCardsTitle: 'Cartes du rapport',
    readyState: 'Pret',
    stateLabels: {
      online: 'Online',
      redirecting: 'Redirections',
      slow: 'Lent',
      down: 'Indisponible',
      ready: 'Pret',
    },
    stateDescriptions: {
      online: 'La reponse finale est joignable et les signaux visibles semblent sains.',
      redirecting: 'La page repond, avec des redirections qui doivent rester intentionnelles.',
      slow: 'La page repond, mais le temps doit etre revu avant de se fier au resultat.',
      down: 'L URL a echoue, expire ou renvoye un statut non sain pour cette probe.',
      ready: 'Lancez le rapport pour classer l URL comme online, avec redirections, lente ou indisponible.',
    },
    statusLabels: {
      pass: 'OK',
      warn: 'Revoir',
      fail: 'Action',
      unknown: 'Attente',
    },
    resultDetails: {
      pass: 'Ce signal semble sain dans le rapport limite.',
      warn: 'Revoyez ce signal avant de considerer l URL entierement saine.',
      fail: 'Examinez ce signal avant de vous fier a l URL.',
      unknown: 'Lancez le rapport pour remplir ce signal.',
    },
    metaLabels: {
      status: 'HTTP',
      redirects: 'Redirections',
      ttfb: 'TTFB',
      cache: 'Cache',
      cached: 'en cache',
      fresh: 'recent',
    },
    groupLabels: {
      availability: 'Disponibilite',
      redirects: 'Redirections',
      security: 'Headers securite',
      crawlability: 'Exploration',
      performance: 'Performance',
    },
    groupDescriptions: {
      availability: 'Statut HTTP final, timeout et accessibilite de la reponse.',
      redirects: 'Nombre de hops, boucles et passages inattendus.',
      security: 'Headers securite de base du navigateur sur la reponse finale.',
      crawlability: 'Signaux same-origin robots.txt et sitemap.xml.',
      performance: 'Echantillon unique de temps et indices de taille de reponse.',
    },
    waitingDetail: 'Lancez un rapport ponctuel pour remplir ce signal.',
    safeguardsTitle: 'Limites confidentialite et anti-abus',
    safeguards: [
      'Seules les cibles HTTP/HTTPS publiques sur ports web standards sont acceptees.',
      'Les destinations privees, locales, reservees et metadata sont refusees avant requete.',
      'Analytics recoit seulement route et outil, jamais l URL cible ni valeurs de resultat.',
    ],
    upgradeTitle: 'Chemin workflow payant',
    upgradeBody: 'Uptime recurrent, incidents, status page, alertes, historique, rapports et probes multi-region restent une valeur future.',
  },
  de: {
    eyebrow: 'Einmaliger Website-Bericht',
    title: 'Pruefen, ob eine Website online ist, dann Redirects, Header und Speed-Signale ansehen.',
    lead: 'Geben Sie eine oeffentliche URL ein und SitePulse kombiniert begrenzte Checks zu einem visuellen Bericht ohne Konto oder Monitoring-Verlauf.',
    inputLabel: 'Website-URL',
    inputPlaceholder: 'https://example.com',
    primaryAction: 'Visuellen Bericht starten',
    runningLabel: 'Begrenzte Website-Checks laufen...',
    errorFallback: 'Die SitePulse API ist aus dieser Browser-Sitzung nicht erreichbar.',
    scoreLabel: 'Pulse Score',
    checkCardsTitle: 'Berichtskarten',
    readyState: 'Bereit',
    stateLabels: {
      online: 'Online',
      redirecting: 'Weiterleitung',
      slow: 'Langsam',
      down: 'Offline',
      ready: 'Bereit',
    },
    stateDescriptions: {
      online: 'Die finale Antwort ist erreichbar und die sichtbaren Signale wirken gesund.',
      redirecting: 'Die Seite antwortet, mit Weiterleitungen, die bewusst bleiben sollten.',
      slow: 'Die Seite antwortet, aber das Timing sollte vor Verlass geprueft werden.',
      down: 'Die URL ist fehlgeschlagen, abgelaufen oder lieferte fuer diese Probe einen ungesunden Status.',
      ready: 'Starten Sie den Bericht, um die URL als online, weiterleitend, langsam oder offline einzuordnen.',
    },
    statusLabels: {
      pass: 'OK',
      warn: 'Pruefen',
      fail: 'Aktion',
      unknown: 'Warten',
    },
    resultDetails: {
      pass: 'Dieses Signal wirkt im begrenzten Bericht gesund.',
      warn: 'Pruefen Sie dieses Signal, bevor die URL als vollstaendig gesund gilt.',
      fail: 'Untersuchen Sie dieses Signal, bevor Sie sich auf die URL verlassen.',
      unknown: 'Starten Sie den Bericht, um dieses Signal zu fuellen.',
    },
    metaLabels: {
      status: 'HTTP',
      redirects: 'Redirects',
      ttfb: 'TTFB',
      cache: 'Cache',
      cached: 'Cache',
      fresh: 'neu',
    },
    groupLabels: {
      availability: 'Verfuegbarkeit',
      redirects: 'Weiterleitungen',
      security: 'Security Header',
      crawlability: 'Crawlbarkeit',
      performance: 'Performance',
    },
    groupDescriptions: {
      availability: 'Finaler HTTP-Status, Timeout und Erreichbarkeit.',
      redirects: 'Hop-Anzahl, Loops und unerwartete Uebergaben.',
      security: 'Baseline Browser-Security-Header auf der finalen Antwort.',
      crawlability: 'Same-Origin-Signale fuer robots.txt und sitemap.xml.',
      performance: 'Einzelne Timing-Probe und Hinweise zur Antwortgroesse.',
    },
    waitingDetail: 'Starten Sie einen Einmal-Bericht, um dieses Signal zu fuellen.',
    safeguardsTitle: 'Datenschutz- und Anti-Abuse-Grenzen',
    safeguards: [
      'Nur oeffentliche HTTP/HTTPS-Ziele auf Standard-Web-Ports werden akzeptiert.',
      'Private, lokale, reservierte und Metadata-Netzwerkziele werden vor Requests abgelehnt.',
      'Analytics erhaelt nur Route und Tool, nie Ziel-URL oder Ergebniswerte.',
    ],
    upgradeTitle: 'Workflow Upgrade-Pfad',
    upgradeBody: 'Wiederkehrende Uptime, Incidents, Status Pages, Alerts, Verlauf, Reports und Multi-Region-Probes bleiben kuenftiger Workflow-Wert.',
  },
}

const groupFindingTerms: Record<ReportGroupKey, string[]> = {
  availability: ['http status'],
  redirects: ['redirect count'],
  security: ['security headers present', 'security headers missing'],
  crawlability: ['robots.txt', 'sitemap xml'],
  performance: ['ttfb sample'],
}

const copy = computed(() => sanitizePublicCopy(props.locale, reportCopy[props.locale] ?? reportCopy.en))
const runtimeConfig = useRuntimeConfig()
const targetValue = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const apiResult = ref<SitePulseProbeData | null>(null)
const apiMeta = ref<Record<string, unknown>>({})
const canonicalPath = computed(() => localizedHomePath(props.locale))
const findings = computed(() => apiResult.value?.findings ?? [])
const scoreCard = computed(() => createSitePulseScoreCard(findings.value, copy.value.stateDescriptions.ready))
const statusCode = computed(() => numberFrom(recordValue(apiResult.value?.checks.status)?.code))
const redirectCount = computed(() => Math.max((apiResult.value?.redirect_chain.length ?? 1) - 1, 0))
const ttfbMs = computed(() => numberFrom(recordValue(apiResult.value?.checks.ttfb)?.duration_ms))
const visualState = computed<VisualState>(() => {
  if (!apiResult.value) {
    return 'ready'
  }

  if (apiResult.value.status === 'fail' || (statusCode.value !== null && statusCode.value >= 400)) {
    return 'down'
  }

  if (ttfbMs.value !== null && ttfbMs.value >= 1200) {
    return 'slow'
  }

  if (redirectCount.value > 0) {
    return 'redirecting'
  }

  return 'online'
})
const visualTone = computed<FindingStatus>(() => {
  if (visualState.value === 'online') {
    return 'pass'
  }

  if (visualState.value === 'down') {
    return 'fail'
  }

  return 'warn'
})
const summaryText = computed(() => apiResult.value ? copy.value.stateDescriptions[visualState.value] : copy.value.stateDescriptions.ready)
const metaItems = computed(() => [
  { label: copy.value.metaLabels.status, value: statusCode.value === null ? '--' : String(statusCode.value) },
  { label: copy.value.metaLabels.redirects, value: apiResult.value ? String(redirectCount.value) : '--' },
  { label: copy.value.metaLabels.ttfb, value: ttfbMs.value === null ? '--' : `${ttfbMs.value} ms` },
  { label: copy.value.metaLabels.cache, value: apiResult.value ? (apiMeta.value.cached ? copy.value.metaLabels.cached : copy.value.metaLabels.fresh) : '--' },
])
const groupCards = computed(() => (Object.keys(groupFindingTerms) as ReportGroupKey[]).map((key) => {
  const terms = groupFindingTerms[key]
  const matchedFindings = findings.value.filter((finding) => {
    const label = finding.label.toLowerCase()

    return terms.some((term) => label.includes(term))
  })
  const status = groupStatus(matchedFindings)
  const detail = matchedFindings.length ? copy.value.resultDetails[status] : copy.value.waitingDetail

  return {
    key,
    label: copy.value.groupLabels[key],
    description: copy.value.groupDescriptions[key],
    status,
    detail,
  }
}))

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
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

function normalizeStatus(status: string | undefined): FindingStatus {
  if (status === 'pass' || status === 'warn' || status === 'fail' || status === 'unknown') {
    return status
  }

  if (status === 'ok' || status === 'healthy') {
    return 'pass'
  }

  if (status === 'warning' || status === 'review') {
    return 'warn'
  }

  return status ? 'fail' : 'unknown'
}

function groupStatus(groupFindings: SitePulseFinding[]): FindingStatus {
  if (groupFindings.length === 0) {
    return 'unknown'
  }

  const statuses = groupFindings.map((finding) => normalizeStatus(finding.status))

  if (statuses.includes('fail')) {
    return 'fail'
  }

  if (statuses.includes('warn') || statuses.includes('unknown')) {
    return 'warn'
  }

  return 'pass'
}

function statusClass(status: FindingStatus): string {
  return `severity severity--${status === 'unknown' ? 'warn' : status}`
}

function sitepulseEndpoint(path: string): string {
  return `${String(runtimeConfig.public.sitepulseApiBaseUrl).replace(/\/+$/g, '')}/${path}`
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = await response.json() as { message?: string; errors?: Record<string, string[]> }
    const firstError = Object.values(payload.errors ?? {})[0]?.[0]

    return firstError ?? payload.message ?? `Report failed with HTTP ${response.status}.`
  } catch {
    return `Report failed with HTTP ${response.status}.`
  }
}

async function runReport(): Promise<void> {
  errorMessage.value = ''
  apiResult.value = null
  apiMeta.value = {}
  isLoading.value = true
  trackSitePulseEvent({ toolSlug: 'visual-report', locale: props.locale, routePath: canonicalPath.value }, 'tool_started')

  try {
    const response = await fetch(sitepulseEndpoint('probe'), {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: targetValue.value,
        checks: ['performance'],
      }),
    })

    if (!response.ok) {
      errorMessage.value = await parseApiError(response)
      trackSitePulseEvent({ toolSlug: 'visual-report', locale: props.locale, routePath: canonicalPath.value }, 'tool_failed')
      return
    }

    const payload = await response.json() as ApiResponse<SitePulseProbeData>
    apiResult.value = payload.data
    apiMeta.value = payload.meta
    trackSitePulseEvent({ toolSlug: 'visual-report', locale: props.locale, routePath: canonicalPath.value }, 'tool_completed')
  } catch {
    errorMessage.value = copy.value.errorFallback
    trackSitePulseEvent({ toolSlug: 'visual-report', locale: props.locale, routePath: canonicalPath.value }, 'tool_failed')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  trackSitePulseEvent({ toolSlug: 'visual-report', locale: props.locale, routePath: canonicalPath.value }, 'tool_viewed')
})
</script>

<template>
  <section class="site-report" aria-labelledby="sitepulse-report-title">
    <div class="site-report__header">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h2 id="sitepulse-report-title">{{ copy.title }}</h2>
        <p>{{ copy.lead }}</p>
      </div>

      <form class="site-report__form" @submit.prevent="runReport">
        <label for="sitepulse-report-url">{{ copy.inputLabel }}</label>
        <div class="site-report__input-row">
          <input
            id="sitepulse-report-url"
            v-model="targetValue"
            type="url"
            :placeholder="copy.inputPlaceholder"
            autocomplete="off"
          >
          <button :class="getButtonClass()" type="submit" :disabled="isLoading">
            {{ copy.primaryAction }}
          </button>
        </div>
      </form>
    </div>

    <div class="site-report__summary" :class="`site-report__summary--${visualTone}`">
      <div class="site-report__score">
        <span>{{ copy.scoreLabel }}</span>
        <strong>{{ apiResult ? scoreCard.score : '--' }}</strong>
        <small>{{ apiResult ? scoreCard.grade : copy.readyState }}</small>
      </div>

      <div class="site-report__state">
        <span :class="statusClass(visualTone)">{{ copy.stateLabels[visualState] }}</span>
        <h3>{{ copy.stateDescriptions[visualState] }}</h3>
        <p v-if="isLoading">{{ copy.runningLabel }}</p>
        <p v-else-if="errorMessage" class="result-error">{{ errorMessage }}</p>
        <p v-else>{{ summaryText }}</p>
        <dl class="site-report__meta">
          <div v-for="item in metaItems" :key="item.label">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="site-report__section-heading">
      <h3>{{ copy.checkCardsTitle }}</h3>
      <p>{{ copy.upgradeBody }}</p>
    </div>

    <div class="site-report-card-grid">
      <article v-for="card in groupCards" :key="card.key" class="site-report-card">
        <span :class="statusClass(card.status)">{{ copy.statusLabels[card.status] }}</span>
        <h3>{{ card.label }}</h3>
        <p>{{ card.description }}</p>
        <p>{{ card.detail }}</p>
      </article>
    </div>

    <div class="site-report-safeguards">
      <section>
        <h3>{{ copy.safeguardsTitle }}</h3>
        <ul class="check-list">
          <li v-for="item in copy.safeguards" :key="item">{{ item }}</li>
        </ul>
      </section>
      <section>
        <h3>{{ copy.upgradeTitle }}</h3>
        <p>{{ copy.upgradeBody }}</p>
      </section>
    </div>
  </section>
</template>
