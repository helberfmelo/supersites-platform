<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, sanitizePublicCopy, toHtmlLang, type LocaleCode } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { createToolStructuredData, getCategoryLabel, getToolBySlug, getToolCopy, toolCatalog } from '../../../data/tools'
import { trackToolStarted } from '../../../utils/analytics'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

const copy = getToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const upgradePanelCopyByLocale = {
  en: {
    ariaLabel: 'Planned upgrade path',
    eyebrow: 'Planned upgrade path',
    title: 'Monitor, alert and export later',
    body: 'Saved history, multi-region checks, alerts, reports and API access remain planned upgrades. Billing, workers and external providers stay disabled until quality checks are complete.',
    cta: 'Review limits',
  },
  'pt-br': {
    ariaLabel: 'Caminho de upgrade planejado',
    eyebrow: 'Upgrade planejado',
    title: 'Monitorar, alertar e exportar depois',
    body: 'Histórico salvo, checagens multi-região, alertas, relatórios e API continuam como upgrades planejados. Billing, workers e provedores externos ficam desativados até as revisões de qualidade.',
    cta: 'Revisar limites',
  },
  es: {
    ariaLabel: 'Ruta de upgrade planificada',
    eyebrow: 'Upgrade planificado',
    title: 'Monitorear, alertar y exportar después',
    body: 'Historial guardado, chequeos multi-región, alertas, reportes y API siguen como upgrades planificados. Billing, workers y proveedores externos permanecen desactivados hasta completar las revisiones de calidad.',
    cta: 'Revisar limites',
  },
  fr: {
    ariaLabel: 'Parcours de mise à niveau prévu',
    eyebrow: 'Mise à niveau prévue',
    title: 'Surveiller, alerter et exporter plus tard',
    body: 'Historique sauvegardé, vérifications multi-région, alertes, rapports et API restent des évolutions prévues. Billing, workers et fournisseurs externes restent désactivés jusqu’aux revues qualité.',
    cta: 'Revoir les limites',
  },
  de: {
    ariaLabel: 'Geplanter Upgrade-Pfad',
    eyebrow: 'Geplanter Upgrade',
    title: 'Monitoring, Alerts und Exporte später',
    body: 'Gespeicherter Verlauf, Multi-Region-Prüfungen, Alerts, Reports und API-Zugriff bleiben geplante Upgrades. Billing, Worker und externe Anbieter bleiben deaktiviert, bis die Qualitätsprüfungen abgeschlossen sind.',
    cta: 'Grenzen pruefen',
  },
} satisfies Record<LocaleCode, { ariaLabel: string; eyebrow: string; title: string; body: string; cta: string }>
const upgradePanelCopy = sanitizePublicCopy(locale, upgradePanelCopyByLocale[locale])
const formCopy = sanitizePublicCopy(locale, {
  expectedValueLabel: 'Expected value (optional)',
  expectedValuePlaceholder: '93.184.216.34 or ns1.example.com',
})
const benchmarkCopyByLocale = {
  en: {
    recordTabsLabel: 'DNS record type shortcuts',
    ipPanelTitle: 'Visible IP now',
    ipPanelBody: 'Use this answer to troubleshoot VPN, proxy, carrier NAT or IPv6 preference. It is not a precise identity or location proof.',
    ipMeaningTitle: 'How to use this IP',
    privacyTitle: 'Private by design',
    privacyBody: 'Inputs and returned values stay out of analytics. The IP result is shown to this browser session and the event only records the tool slug.',
    privacyLink: 'Read privacy details',
    coverageTitle: 'Coverage disclosure',
    coverageBody: 'Current propagation uses controlled resolver snapshots available to this runtime. It is not a worldwide propagation claim until regional probes are deployed and documented.',
    relatedTitle: 'Next checks',
    mapTitle: 'Resolver coverage map',
    resolverDetailsTitle: 'Resolver and locality table',
    distinctValuesTitle: 'Values seen by resolvers',
    copySummary: 'Copy safe summary',
  },
  'pt-br': {
    recordTabsLabel: 'Atalhos de tipo DNS',
    ipPanelTitle: 'IP visivel agora',
    ipPanelBody: 'Use esta resposta para investigar VPN, proxy, NAT de operadora ou preferencia IPv6. Ela nao prova identidade nem localizacao exata.',
    ipMeaningTitle: 'Como usar este IP',
    privacyTitle: 'Privacidade por desenho',
    privacyBody: 'Entradas e valores retornados ficam fora de analytics. O IP aparece apenas nesta sessao do navegador e o evento registra so o slug da ferramenta.',
    privacyLink: 'Ler detalhes de privacidade',
    coverageTitle: 'Cobertura declarada',
    coverageBody: 'A propagacao atual usa snapshots de resolvedores controlados disponiveis neste runtime. Nao e uma promessa mundial ate probes regionais serem publicados e documentados.',
    relatedTitle: 'Proximas checagens',
    mapTitle: 'Mapa de cobertura dos resolvedores',
    resolverDetailsTitle: 'Tabela de resolvedor e localidade',
    distinctValuesTitle: 'Valores vistos pelos resolvedores',
    copySummary: 'Copiar resumo seguro',
  },
  es: {
    recordTabsLabel: 'Atajos de tipo DNS',
    ipPanelTitle: 'IP visible ahora',
    ipPanelBody: 'Usa esta respuesta para investigar VPN, proxy, NAT del operador o preferencia IPv6. No prueba identidad ni ubicacion exacta.',
    ipMeaningTitle: 'Como usar esta IP',
    privacyTitle: 'Privacidad por diseno',
    privacyBody: 'Entradas y valores devueltos quedan fuera de analytics. La IP se muestra solo en esta sesion y el evento registra solo el slug de herramienta.',
    privacyLink: 'Leer privacidad',
    coverageTitle: 'Cobertura declarada',
    coverageBody: 'La propagacion actual usa snapshots de resolvers controlados disponibles en este runtime. No es una promesa mundial hasta publicar probes regionales documentados.',
    relatedTitle: 'Siguientes chequeos',
    mapTitle: 'Mapa de cobertura de resolvers',
    resolverDetailsTitle: 'Tabla de resolver y localidad',
    distinctValuesTitle: 'Valores vistos por resolvers',
    copySummary: 'Copiar resumen seguro',
  },
  fr: {
    recordTabsLabel: 'Raccourcis de type DNS',
    ipPanelTitle: 'IP visible maintenant',
    ipPanelBody: 'Utilisez cette reponse pour analyser VPN, proxy, NAT operateur ou preference IPv6. Ce resultat ne prouve ni identite ni localisation exacte.',
    ipMeaningTitle: 'Comment utiliser cette IP',
    privacyTitle: 'Confidentialite par conception',
    privacyBody: 'Les entrees et valeurs retournees restent hors analytics. L IP est affichee dans cette session et l evenement ne garde que le slug outil.',
    privacyLink: 'Lire la confidentialite',
    coverageTitle: 'Couverture declaree',
    coverageBody: 'La propagation actuelle utilise les snapshots de resolveurs controles disponibles dans ce runtime. Ce resultat ne promet pas une couverture mondiale avant des probes regionaux documentes.',
    relatedTitle: 'Controles suivants',
    mapTitle: 'Carte de couverture des resolveurs',
    resolverDetailsTitle: 'Table resolveur et localite',
    distinctValuesTitle: 'Valeurs vues par les resolveurs',
    copySummary: 'Copier le resume securise',
  },
  de: {
    recordTabsLabel: 'DNS-Typ Kurzwege',
    ipPanelTitle: 'Jetzt sichtbare IP',
    ipPanelBody: 'Nutzen Sie diese Antwort fuer VPN-, Proxy-, Carrier-NAT- oder IPv6-Analyse. Sie ist kein Identitaets- oder exakter Standortnachweis.',
    ipMeaningTitle: 'So nutzen Sie diese IP',
    privacyTitle: 'Datenschutz im Design',
    privacyBody: 'Eingaben und Rueckgabewerte bleiben aus Analytics heraus. Die IP wird nur in dieser Browsersitzung gezeigt; das Event speichert nur den Tool-Slug.',
    privacyLink: 'Datenschutz lesen',
    coverageTitle: 'Abgedeckter Umfang',
    coverageBody: 'Die aktuelle Propagation nutzt kontrollierte Resolver-Snapshots dieses Runtimes. Sie ist keine weltweite Aussage, bis regionale Probes dokumentiert bereitstehen.',
    relatedTitle: 'Naechste Pruefungen',
    mapTitle: 'Resolver-Abdeckung',
    resolverDetailsTitle: 'Resolver- und Standorttabelle',
    distinctValuesTitle: 'Von Resolvern gesehene Werte',
    copySummary: 'Sichere Zusammenfassung kopieren',
  },
} satisfies Record<LocaleCode, {
  recordTabsLabel: string
  ipPanelTitle: string
  ipPanelBody: string
  ipMeaningTitle: string
  privacyTitle: string
  privacyBody: string
  privacyLink: string
  coverageTitle: string
  coverageBody: string
  relatedTitle: string
  mapTitle: string
  resolverDetailsTitle: string
  distinctValuesTitle: string
  copySummary: string
}>
const benchmarkCopy = sanitizePublicCopy(locale, benchmarkCopyByLocale[locale])
const propagationRecordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'] as const
const runtimeConfig = useRuntimeConfig()
const previewSubmitted = ref(false)
const targetValue = ref(tool.slug === 'what-is-my-ip' ? '' : tool.exampleTarget)
const selectedRecordTypes = ref(['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA'])
const propagationRecordType = ref('A')
const expectedPropagationValue = ref('')
const selectedPort = ref(443)
const isLoading = ref(false)
const errorMessage = ref('')
const copyNotice = ref('')
const dnsResult = ref<DnsLookupData | null>(null)
const dnsMeta = ref<Record<string, unknown>>({})
const ipResult = ref<ClientIpData | null>(null)
const ipMeta = ref<Record<string, unknown>>({})
const rdapResult = ref<RdapLookupData | null>(null)
const rdapMeta = ref<Record<string, unknown>>({})
const sslResult = ref<SslCertificateData | null>(null)
const sslMeta = ref<Record<string, unknown>>({})
const propagationResult = ref<DnsPropagationData | null>(null)
const propagationMeta = ref<Record<string, unknown>>({})
const portResult = ref<PortCheckData | null>(null)
const portMeta = ref<Record<string, unknown>>({})
const reachabilityResult = ref<ReachabilityData | null>(null)
const reachabilityMeta = ref<Record<string, unknown>>({})
const isDnsLookup = computed(() => tool.slug === 'dns-lookup')
const isIpLookup = computed(() => tool.slug === 'what-is-my-ip')
const isRdapLookup = computed(() => tool.slug === 'rdap-domain-lookup')
const isSslLookup = computed(() => tool.slug === 'ssl-certificate-checker')
const isPropagationLookup = computed(() => tool.slug === 'dns-propagation')
const isPortCheck = computed(() => tool.slug === 'port-checker')
const isReachabilityCheck = computed(() => tool.slug === 'ping-traceroute')
const isLiveTool = computed(() => (
  isDnsLookup.value
  || isIpLookup.value
  || isRdapLookup.value
  || isSslLookup.value
  || isPropagationLookup.value
  || isPortCheck.value
  || isReachabilityCheck.value
))
const relatedTools = computed(() => toolCatalog
  .filter((candidate) => candidate.slug !== tool.slug)
  .filter((candidate) => candidate.category === tool.category || ['what-is-my-ip', 'dns-lookup', 'dns-propagation'].includes(candidate.slug))
  .slice(0, 3))

interface DnsRecord {
  type: string
  ttl: number
  value: string
  fields: Record<string, unknown>
}

interface DnsLookupData {
  domain: string
  queried_types: string[]
  checked_addresses: string[]
  records: Record<string, DnsRecord[]>
}

interface ClientIpData {
  address: string
  version: string
  is_public: boolean
  source: string
}

interface RdapLookupData {
  domain: string
  handle: string | null
  registrar: {
    name: string | null
    handle: string | null
  }
  statuses: string[]
  registered_at: string | null
  updated_at: string | null
  expires_at: string | null
  age_days: number | null
  days_until_expiration: number | null
  nameservers: string[]
  limitations: string[]
}

interface SslCertificateData {
  hostname: string
  checked_addresses: string[]
  subject: {
    common_name?: string | null
    organization?: string | null
  }
  issuer: {
    common_name?: string | null
    organization?: string | null
  }
  serial_number: string | null
  valid_from: string | null
  valid_to: string | null
  days_until_expiration: number | null
  is_expired: boolean
  matches_hostname: boolean
  subject_alt_names: string[]
  chain_count: number
  fingerprint_sha256: string | null
}

interface DnsPropagationSnapshot {
  resolver_id: string
  region: string
  status: string
  ttl_min: number | null
  values: string[]
}

interface DnsPropagationData {
  domain: string
  record_type: string
  checked_addresses: string[]
  snapshots: DnsPropagationSnapshot[]
}

interface TcpCheck {
  address: string
  status: string
  latency_ms: number | null
  error: string | null
}

interface PortCheckData {
  hostname: string
  port: number
  checked_addresses: string[]
  checks: TcpCheck[]
  overall_status: string
}

interface ReachabilityData {
  hostname: string
  checked_addresses: string[]
  tcp_443: TcpCheck
  icmp: {
    status: string
    reason: string
  }
  traceroute: {
    status: string
    reason: string
  }
}

interface ApiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

interface SummaryCard {
  label: string
  value: string
  tone?: 'good' | 'warning' | 'neutral'
}

function netprobeEndpoint(path: string): string {
  return `${String(runtimeConfig.public.netprobeApiBaseUrl).replace(/\/+$/g, '')}/${path}`
}

function formatMetaDate(meta: Record<string, unknown>): string {
  const generatedAt = typeof meta.generated_at === 'string' ? meta.generated_at : ''

  if (!generatedAt) {
    return 'Just now'
  }

  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(generatedAt))
  } catch {
    return generatedAt
  }
}

function normalizeCompareValue(value: string): string {
  return value.trim().toLowerCase().replace(/\.$/, '')
}

const ipSummaryCards = computed<SummaryCard[]>(() => {
  if (!ipResult.value) {
    return []
  }

  return [
    {
      label: 'Visible address',
      value: ipResult.value.address,
      tone: ipResult.value.is_public ? 'good' : 'warning',
    },
    {
      label: 'Protocol',
      value: ipResult.value.version,
      tone: 'neutral',
    },
    {
      label: 'Observed by',
      value: ipResult.value.source,
      tone: 'neutral',
    },
    {
      label: 'Last checked',
      value: formatMetaDate(ipMeta.value),
      tone: 'neutral',
    },
  ]
})

const propagationSummaryCards = computed<SummaryCard[]>(() => {
  if (!propagationResult.value) {
    return []
  }

  const snapshots = propagationResult.value.snapshots
  const expectedValue = normalizeCompareValue(expectedPropagationValue.value)
  const total = snapshots.length
  const answered = snapshots.filter((snapshot) => snapshot.status === 'answered' && snapshot.values.length > 0).length
  const matched = expectedValue
    ? snapshots.filter((snapshot) => snapshot.values.some((value) => normalizeCompareValue(value) === expectedValue)).length
    : answered
  const distinctValues = new Set(snapshots.flatMap((snapshot) => snapshot.values.map((value) => normalizeCompareValue(value))).filter(Boolean))
  const ttlValues = snapshots.map((snapshot) => snapshot.ttl_min).filter((value): value is number => typeof value === 'number')
  const percent = total > 0 ? Math.round((matched / total) * 100) : 0

  return [
    {
      label: expectedValue ? 'Expected-value match' : 'Answered resolvers',
      value: total > 0 ? `${matched}/${total} (${percent}%)` : '0/0',
      tone: percent >= 80 ? 'good' : percent > 0 ? 'warning' : 'neutral',
    },
    {
      label: 'Distinct values',
      value: String(distinctValues.size),
      tone: distinctValues.size <= 1 ? 'good' : 'warning',
    },
    {
      label: 'Checked scope',
      value: `${total} resolver snapshot${total === 1 ? '' : 's'}`,
      tone: 'neutral',
    },
    {
      label: 'Lowest TTL',
      value: ttlValues.length > 0 ? `${Math.min(...ttlValues)}s` : 'Not returned',
      tone: 'neutral',
    },
  ]
})

const propagationDistinctValues = computed(() => {
  if (!propagationResult.value) {
    return []
  }

  return Array.from(new Set(propagationResult.value.snapshots.flatMap((snapshot) => snapshot.values))).slice(0, 6)
})

function buildSafeSummary(): string {
  if (ipResult.value) {
    return [
      'NetProbe Atlas IP check',
      `Version: ${ipResult.value.version}`,
      `Public range: ${ipResult.value.is_public ? 'yes' : 'no'}`,
      `Observed source: ${ipResult.value.source}`,
      `Checked: ${formatMetaDate(ipMeta.value)}`,
    ].join('\n')
  }

  if (propagationResult.value) {
    return [
      'NetProbe Atlas DNS propagation snapshot',
      `Record type: ${propagationResult.value.record_type}`,
      `Summary: ${propagationSummaryCards.value.map((card) => `${card.label} ${card.value}`).join('; ')}`,
      `Distinct values: ${propagationDistinctValues.value.join(', ') || 'none'}`,
      `Checked: ${formatMetaDate(propagationMeta.value)}`,
    ].join('\n')
  }

  return 'NetProbe Atlas result summary is available after a live check.'
}

async function copySafeSummary(): Promise<void> {
  copyNotice.value = ''
  const summary = buildSafeSummary()

  try {
    await navigator.clipboard.writeText(summary)
    copyNotice.value = 'Safe summary copied locally.'
  } catch {
    copyNotice.value = 'Copy is unavailable in this browser session.'
  }
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = await response.json() as { message?: string; errors?: Record<string, string[]> }
    const firstError = Object.values(payload.errors ?? {})[0]?.[0]

    return firstError ?? payload.message ?? `Lookup failed with HTTP ${response.status}.`
  } catch {
    return `Lookup failed with HTTP ${response.status}.`
  }
}

async function previewResult(): Promise<void> {
  previewSubmitted.value = true
  errorMessage.value = ''
  copyNotice.value = ''
  dnsResult.value = null
  ipResult.value = null
  rdapResult.value = null
  sslResult.value = null
  propagationResult.value = null
  portResult.value = null
  reachabilityResult.value = null

  trackToolStarted({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  })

  if (!isLiveTool.value) {
    return
  }

  isLoading.value = true

  try {
    if (isIpLookup.value) {
      const response = await fetch(netprobeEndpoint('ip'), {
        headers: {
          accept: 'application/json',
        },
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<ClientIpData>
      ipResult.value = payload.data
      ipMeta.value = payload.meta
      return
    }

    if (isDnsLookup.value) {
      const response = await fetch(netprobeEndpoint('dns'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          domain: targetValue.value,
          types: selectedRecordTypes.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<DnsLookupData>
      dnsResult.value = payload.data
      dnsMeta.value = payload.meta
      return
    }

    if (isRdapLookup.value) {
      const response = await fetch(netprobeEndpoint('rdap'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          domain: targetValue.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<RdapLookupData>
      rdapResult.value = payload.data
      rdapMeta.value = payload.meta
      return
    }

    if (isSslLookup.value) {
      const response = await fetch(netprobeEndpoint('ssl'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          hostname: targetValue.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<SslCertificateData>
      sslResult.value = payload.data
      sslMeta.value = payload.meta
      return
    }

    if (isPropagationLookup.value) {
      const response = await fetch(netprobeEndpoint('propagation'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          domain: targetValue.value,
          type: propagationRecordType.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<DnsPropagationData>
      propagationResult.value = payload.data
      propagationMeta.value = payload.meta
      return
    }

    if (isPortCheck.value) {
      const response = await fetch(netprobeEndpoint('port'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          hostname: targetValue.value,
          port: selectedPort.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<PortCheckData>
      portResult.value = payload.data
      portMeta.value = payload.meta
      return
    }

    if (isReachabilityCheck.value) {
      const response = await fetch(netprobeEndpoint('reachability'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          hostname: targetValue.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<ReachabilityData>
      reachabilityResult.value = payload.data
      reachabilityMeta.value = payload.meta
    }
  } catch {
    errorMessage.value = 'The lookup API is not reachable from this browser session.'
  } finally {
    isLoading.value = false
  }
}

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | NetProbe Atlas`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | NetProbe Atlas`,
    },
    {
      property: 'og:description',
      content: copy.headline,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedToolPath(targetLocale, tool.slug)),
  ],
  script: structuredData.map((item) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(item),
  })),
})
</script>

<template>
  <main class="page-shell">
    <SiteHeader
      :locale="locale"
      :path-for-locale="(targetLocale) => localizedToolPath(targetLocale, tool.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.navLabel }}</span>
    </nav>

    <section class="hero" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span class="status">{{ copy.statusLabel }}</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

      <aside class="status-panel" :aria-label="shellCopy.pageStatusLabel">
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.exampleLabel }}</strong>
            <span>{{ copy.exampleTarget }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.plannedTitle }}</strong>
            <span>{{ shellCopy.plannedBody }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section :class="['tool-layout', (isIpLookup || isPropagationLookup) ? 'tool-layout--diagnostic' : '']">
      <div class="tool-workbench">
        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ copy.navLabel }}</h2>
          <p>{{ copy.description }}</p>
          <form class="field" @submit.prevent="previewResult">
            <template v-if="isDnsLookup">
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >
              <fieldset class="checkbox-grid">
                <legend>{{ shellCopy.recordTypesLabel }}</legend>
                <label v-for="recordType in ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA']" :key="recordType">
                  <input v-model="selectedRecordTypes" type="checkbox" :value="recordType">
                  <span>{{ recordType }}</span>
                </label>
              </fieldset>
            </template>
            <template v-else-if="isPropagationLookup">
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >
              <p :id="`${tool.slug}-record-type-label`" class="field-label">{{ benchmarkCopy.recordTabsLabel }}</p>
              <div class="record-tabs" role="tablist" :aria-labelledby="`${tool.slug}-record-type-label`">
                <button
                  v-for="recordType in propagationRecordTypes"
                  :key="recordType"
                  type="button"
                  role="tab"
                  :aria-selected="propagationRecordType === recordType"
                  @click="propagationRecordType = recordType"
                >
                  {{ recordType }}
                </button>
              </div>
              <label :for="`${tool.slug}-expected`">{{ formCopy.expectedValueLabel }}</label>
              <input
                :id="`${tool.slug}-expected`"
                v-model="expectedPropagationValue"
                type="text"
                :placeholder="formCopy.expectedValuePlaceholder"
                autocomplete="off"
              >
            </template>
            <template v-else-if="isPortCheck">
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >
              <label :for="`${tool.slug}-port`">{{ shellCopy.portLabel }}</label>
              <select :id="`${tool.slug}-port`" v-model.number="selectedPort">
                <option v-for="port in [80, 443, 587, 993]" :key="port" :value="port">
                  {{ port }}
                </option>
              </select>
            </template>
            <template v-else-if="!isIpLookup">
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >
            </template>
            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit" :disabled="isLoading || (isDnsLookup && selectedRecordTypes.length === 0)">
                {{ copy.primaryAction }}
              </button>
              <NuxtLink class="button-link button-link--secondary" :to="localizedContentPath(locale, 'methodology')">
                {{ shellCopy.methodologyLabel }}
              </NuxtLink>
            </div>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-labelledby="`${tool.slug}-result`">
          <h2 :id="`${tool.slug}-result`">{{ shellCopy.resultTitle }}</h2>
          <p v-if="isLoading">{{ shellCopy.runningLabel }}</p>
          <p v-else-if="errorMessage" class="result-error">{{ errorMessage }}</p>

          <div v-else-if="ipResult">
            <section class="ip-visual-panel" :aria-label="benchmarkCopy.ipPanelTitle">
              <p class="eyebrow">{{ benchmarkCopy.ipPanelTitle }}</p>
              <strong>{{ ipResult.address }}</strong>
              <div class="ip-visual-panel__meta">
                <span>{{ ipResult.version }}</span>
                <span>{{ ipResult.is_public ? 'Public range' : 'Review range' }}</span>
                <span>{{ ipResult.source }}</span>
              </div>
              <p>{{ benchmarkCopy.ipPanelBody }}</p>
            </section>

            <div class="answer-strip" aria-label="IP answer summary">
              <div v-for="card in ipSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>
            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ benchmarkCopy.copySummary }}
              </button>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>
            <section class="result-callout">
              <h3>{{ benchmarkCopy.ipMeaningTitle }}</h3>
              <p>{{ benchmarkCopy.ipPanelBody }}</p>
              <p>{{ ipMeta.retention }}</p>
            </section>
          </div>

          <div v-else-if="dnsResult">
            <div class="result-meta">
              <div>
                <strong>Domain</strong>
                <span>{{ dnsResult.domain }}</span>
              </div>
              <div>
                <strong>Cache</strong>
                <span>{{ dnsMeta.cached ? 'Cached' : 'Fresh' }} / {{ dnsMeta.cache_ttl_seconds }}s</span>
              </div>
              <div>
                <strong>Address guard</strong>
                <span>{{ dnsResult.checked_addresses.length }} checked</span>
              </div>
            </div>

            <section v-for="recordType in dnsResult.queried_types" :key="recordType" class="content-section">
              <h3>{{ recordType }}</h3>
              <p v-if="(dnsResult.records[recordType] ?? []).length === 0">No records returned.</p>
              <div v-else class="result-table-wrap">
                <table class="result-table">
                  <thead>
                    <tr>
                      <th>Value</th>
                      <th>TTL</th>
                      <th>Fields</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="record in dnsResult.records[recordType]" :key="`${record.type}-${record.value}-${record.ttl}`">
                      <td>{{ record.value }}</td>
                      <td>{{ record.ttl }}</td>
                      <td>{{ JSON.stringify(record.fields) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <p v-if="Array.isArray(dnsMeta.warnings) && dnsMeta.warnings.length > 0">
              {{ dnsMeta.warnings.join(' ') }}
            </p>
          </div>

          <div v-else-if="rdapResult">
            <div class="result-meta">
              <div>
                <strong>Domain</strong>
                <span>{{ rdapResult.domain }}</span>
              </div>
              <div>
                <strong>Registrar</strong>
                <span>{{ rdapResult.registrar.name || 'Not provided' }}</span>
              </div>
              <div>
                <strong>Cache</strong>
                <span>{{ rdapMeta.cached ? 'Cached' : 'Fresh' }} / {{ rdapMeta.cache_ttl_seconds }}s</span>
              </div>
              <div>
                <strong>Registered</strong>
                <span>{{ rdapResult.registered_at || 'Not provided' }}</span>
              </div>
              <div>
                <strong>Expires</strong>
                <span>{{ rdapResult.expires_at || 'Not provided' }}</span>
              </div>
              <div>
                <strong>Days left</strong>
                <span>{{ rdapResult.days_until_expiration ?? 'Unknown' }}</span>
              </div>
            </div>

            <section class="content-section">
              <h3>Status</h3>
              <ul class="pill-list">
                <li v-for="status in rdapResult.statuses" :key="status">{{ status }}</li>
              </ul>
              <p v-if="rdapResult.statuses.length === 0">No status values returned.</p>
            </section>

            <section class="content-section">
              <h3>Nameservers</h3>
              <ul class="result-list">
                <li v-for="nameserver in rdapResult.nameservers" :key="nameserver">{{ nameserver }}</li>
              </ul>
              <p v-if="rdapResult.nameservers.length === 0">No nameservers returned.</p>
            </section>

            <section v-if="rdapResult.limitations.length > 0" class="content-section">
              <h3>Limitations</h3>
              <ul class="result-list">
                <li v-for="limitation in rdapResult.limitations" :key="limitation">{{ limitation }}</li>
              </ul>
            </section>

            <p v-if="Array.isArray(rdapMeta.warnings) && rdapMeta.warnings.length > 0">
              {{ rdapMeta.warnings.join(' ') }}
            </p>
          </div>

          <div v-else-if="sslResult">
            <div class="result-meta">
              <div>
                <strong>Hostname</strong>
                <span>{{ sslResult.hostname }}</span>
              </div>
              <div>
                <strong>Issuer</strong>
                <span>{{ sslResult.issuer.common_name || sslResult.issuer.organization || 'Not provided' }}</span>
              </div>
              <div>
                <strong>Cache</strong>
                <span>{{ sslMeta.cached ? 'Cached' : 'Fresh' }} / {{ sslMeta.cache_ttl_seconds }}s</span>
              </div>
              <div>
                <strong>Subject</strong>
                <span>{{ sslResult.subject.common_name || 'Not provided' }}</span>
              </div>
              <div>
                <strong>Expires</strong>
                <span>{{ sslResult.valid_to || 'Not provided' }}</span>
              </div>
              <div>
                <strong>Hostname match</strong>
                <span>{{ sslResult.matches_hostname ? 'Yes' : 'No' }}</span>
              </div>
            </div>

            <section class="content-section">
              <h3>Subject alternative names</h3>
              <ul class="result-list">
                <li v-for="name in sslResult.subject_alt_names" :key="name">{{ name }}</li>
              </ul>
              <p v-if="sslResult.subject_alt_names.length === 0">No SAN values returned.</p>
            </section>

            <section class="content-section">
              <h3>Probe facts</h3>
              <ul class="result-list">
                <li>{{ sslResult.checked_addresses.length }} public address checks before TLS.</li>
                <li>{{ sslResult.chain_count }} certificate chain entries returned.</li>
                <li>{{ sslResult.days_until_expiration ?? 'Unknown' }} days until expiration.</li>
              </ul>
            </section>

            <p v-if="Array.isArray(sslMeta.warnings) && sslMeta.warnings.length > 0">
              {{ sslMeta.warnings.join(' ') }}
            </p>
            <p v-if="Array.isArray(sslMeta.limitations) && sslMeta.limitations.length > 0">
              {{ sslMeta.limitations.join(' ') }}
            </p>
          </div>

          <div v-else-if="propagationResult">
            <div class="answer-strip" aria-label="Propagation summary">
              <div v-for="card in propagationSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>

            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ benchmarkCopy.copySummary }}
              </button>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>

            <section class="result-callout">
              <h3>{{ benchmarkCopy.coverageTitle }}</h3>
              <p>{{ benchmarkCopy.coverageBody }}</p>
              <p>
                Cache: {{ propagationMeta.cached ? 'cached' : 'fresh' }} / {{ propagationMeta.cache_ttl_seconds }}s.
                Checked: {{ formatMetaDate(propagationMeta) }}.
              </p>
            </section>

            <section class="resolver-map" :aria-label="benchmarkCopy.mapTitle">
              <h3>{{ benchmarkCopy.mapTitle }}</h3>
              <div class="resolver-grid">
                <div v-for="snapshot in propagationResult.snapshots" :key="`${snapshot.resolver_id}-pin`" :class="['resolver-pin', snapshot.status === 'answered' ? 'resolver-pin--good' : 'resolver-pin--warning']">
                  <strong>{{ snapshot.region }}</strong>
                  <span>{{ snapshot.status }}</span>
                </div>
              </div>
            </section>

            <section class="content-section">
              <h3>{{ benchmarkCopy.resolverDetailsTitle }}</h3>
              <div class="result-table-wrap">
                <table class="result-table">
                  <thead>
                    <tr>
                      <th>Resolver</th>
                      <th>Region</th>
                      <th>Status</th>
                      <th>TTL min</th>
                      <th>Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="snapshot in propagationResult.snapshots" :key="snapshot.resolver_id">
                      <td>{{ snapshot.resolver_id }}</td>
                      <td>{{ snapshot.region }}</td>
                      <td>{{ snapshot.status }}</td>
                      <td>{{ snapshot.ttl_min ?? 'None' }}</td>
                      <td>
                        <span v-if="snapshot.values.length > 0">{{ snapshot.values.join(', ') }}</span>
                        <span v-else>No values returned</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section v-if="propagationDistinctValues.length > 0" class="content-section">
              <h3>{{ benchmarkCopy.distinctValuesTitle }}</h3>
              <ul class="pill-list">
                <li v-for="value in propagationDistinctValues" :key="value">{{ value }}</li>
              </ul>
            </section>

            <p v-if="Array.isArray(propagationMeta.warnings) && propagationMeta.warnings.length > 0">
              {{ propagationMeta.warnings.join(' ') }}
            </p>
          </div>

          <div v-else-if="portResult">
            <div class="result-meta">
              <div>
                <strong>Hostname</strong>
                <span>{{ portResult.hostname }}</span>
              </div>
              <div>
                <strong>Port</strong>
                <span>{{ portResult.port }}</span>
              </div>
              <div>
                <strong>Status</strong>
                <span>{{ portResult.overall_status }}</span>
              </div>
            </div>

            <div class="result-table-wrap">
              <table class="result-table">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Latency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="check in portResult.checks" :key="`${check.address}-${check.status}`">
                    <td>{{ check.address }}</td>
                    <td>{{ check.status }}</td>
                    <td>{{ check.latency_ms ?? 'n/a' }} ms</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p v-if="Array.isArray(portMeta.warnings) && portMeta.warnings.length > 0">
              {{ portMeta.warnings.join(' ') }}
            </p>
          </div>

          <div v-else-if="reachabilityResult">
            <div class="result-meta">
              <div>
                <strong>Hostname</strong>
                <span>{{ reachabilityResult.hostname }}</span>
              </div>
              <div>
                <strong>TCP 443</strong>
                <span>{{ reachabilityResult.tcp_443.status }}</span>
              </div>
              <div>
                <strong>Latency</strong>
                <span>{{ reachabilityResult.tcp_443.latency_ms ?? 'n/a' }} ms</span>
              </div>
            </div>

            <section class="content-section">
              <h3>Bounded probes</h3>
              <ul class="result-list">
                <li>{{ reachabilityResult.tcp_443.address }} checked for TCP 443.</li>
                <li>ICMP: {{ reachabilityResult.icmp.status }} - {{ reachabilityResult.icmp.reason }}</li>
                <li>Traceroute: {{ reachabilityResult.traceroute.status }} - {{ reachabilityResult.traceroute.reason }}</li>
              </ul>
            </section>

            <p v-if="Array.isArray(reachabilityMeta.warnings) && reachabilityMeta.warnings.length > 0">
              {{ reachabilityMeta.warnings.join(' ') }}
            </p>
          </div>

          <p v-else>{{ previewSubmitted ? copy.previewResult : shellCopy.plannedBody }}</p>
        </section>

        <section class="upgrade-panel" :aria-label="upgradePanelCopy.ariaLabel">
          <div>
            <p class="eyebrow">{{ upgradePanelCopy.eyebrow }}</p>
            <h2>{{ upgradePanelCopy.title }}</h2>
            <p>{{ upgradePanelCopy.body }}</p>
          </div>
          <NuxtLink class="button-link button-link--secondary" :to="localizedContentPath(locale, 'methodology')">
            {{ upgradePanelCopy.cta }}
          </NuxtLink>
        </section>

        <section v-if="isIpLookup || isPropagationLookup" class="privacy-strip" :aria-labelledby="`${tool.slug}-privacy-cta`">
          <div>
            <h2 :id="`${tool.slug}-privacy-cta`">{{ benchmarkCopy.privacyTitle }}</h2>
            <p>{{ benchmarkCopy.privacyBody }}</p>
          </div>
          <NuxtLink class="button-link button-link--secondary" :to="localizedContentPath(locale, 'privacy')">
            {{ benchmarkCopy.privacyLink }}
          </NuxtLink>
        </section>

        <section v-if="isIpLookup || isPropagationLookup" class="quick-related" :aria-labelledby="`${tool.slug}-next-checks`">
          <h2 :id="`${tool.slug}-next-checks`">{{ benchmarkCopy.relatedTitle }}</h2>
          <div class="related-tool-list related-tool-list--inline">
            <NuxtLink v-for="relatedTool in relatedTools" :key="relatedTool.slug" :to="localizedToolPath(locale, relatedTool.slug)">
              {{ getToolCopy(relatedTool, locale).navLabel }}
            </NuxtLink>
          </div>
        </section>
      </div>

      <aside class="band" :aria-labelledby="`${tool.slug}-methodology`">
        <h2 :id="`${tool.slug}-methodology`">{{ shellCopy.methodologyLabel }}</h2>
        <ul class="method-list">
          <li v-for="item in copy.methodology" :key="item">{{ item }}</li>
        </ul>
        <dl class="fact-list">
          <div>
            <dt>{{ shellCopy.freeCheckLabel }}</dt>
            <dd>{{ copy.freeScope }}</dd>
          </div>
          <div>
            <dt>{{ shellCopy.upgradePathLabel }}</dt>
            <dd>{{ copy.upgradeScope }}</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section class="content-layout" :aria-labelledby="`${tool.slug}-guide`">
      <div>
        <h2 :id="`${tool.slug}-guide`">{{ shellCopy.toolGuideTitle }}</h2>
        <article v-for="section in copy.contentSections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
        <section class="content-section" :aria-labelledby="`${tool.slug}-faq`">
          <h3 :id="`${tool.slug}-faq`">{{ shellCopy.faqTitle }}</h3>
          <div class="faq-list">
            <details v-for="faq in copy.faq" :key="faq.question">
              <summary>{{ faq.question }}</summary>
              <p>{{ faq.answer }}</p>
            </details>
          </div>
        </section>
      </div>

      <aside class="band" :aria-label="copy.reviewedLabel">
        <h2>{{ copy.reviewedLabel }}</h2>
        <p>{{ shellCopy.contentQualityBody }}</p>
        <div class="inline-link-list">
          <NuxtLink :to="localizedContentPath(locale, 'methodology')">
            {{ shellCopy.methodologyLabel }}
          </NuxtLink>
          <NuxtLink :to="localizedContentPath(locale, 'editorial-policy')">
            {{ shellCopy.editorialLabel }}
          </NuxtLink>
        </div>

        <section class="content-section">
          <h3>{{ shellCopy.relatedTitle }}</h3>
          <div class="related-tool-list">
            <NuxtLink v-for="relatedTool in relatedTools" :key="relatedTool.slug" :to="localizedToolPath(locale, relatedTool.slug)">
              {{ getToolCopy(relatedTool, locale).navLabel }}
            </NuxtLink>
          </div>
        </section>
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
