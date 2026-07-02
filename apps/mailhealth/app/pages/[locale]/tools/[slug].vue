<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref, watch } from 'vue'
import { getShellCopy } from '../../../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, sanitizePublicCopy, toHtmlLang } from '../../../data/locales'
import {
  buildDmarcRecord,
  buildSpfRecord,
  getRecordBuilderCopy,
  isRecordBuilderTool,
  type DmarcAlignment,
  type DmarcPolicy,
  type DmarcSubdomainPolicy,
  type SpfAllMechanism,
} from '../../../data/recordBuilders'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import {
  analyzeMailHeaders,
  createMailHealthScoreCard,
  createToolStructuredData,
  getCategoryLabel,
  getRelatedMailHealthTools,
  getToolBySlug,
  getToolCopy,
  type HeaderAnalysisResult,
} from '../../../data/tools'
import { trackMailHealthEvent } from '../../../utils/analytics'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

interface MailHealthFinding {
  label: string
  status: string
  detail: string
  value?: string | number | boolean | null
}

interface MailHealthApiData {
  check: string
  domain?: string
  selector?: string
  status: string
  summary: string
  findings: MailHealthFinding[]
  records?: Array<Record<string, unknown>>
  probes?: Array<Record<string, unknown>>
  warnings?: string[]
}

interface ApiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

interface ResultDetailItem {
  label: string
  value: string
  status?: string
}

interface ResultDetailTable {
  title: string
  headers: string[]
  rows: string[][]
}

const copy = getToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const recordBuilderCopy = getRecordBuilderCopy(locale)
const resultMetaCopy = sanitizePublicCopy(locale, {
  check: 'Check',
  status: 'Status',
  cache: 'Cache',
  cached: 'cached',
  fresh: 'fresh',
  ttl: 'TTL',
})
const resultDetailCopy = sanitizePublicCopy(locale, {
  parsedTitle: 'Parsed details',
  recordsTitle: 'Records',
  probesTitle: 'Probe details',
  warningsTitle: 'Warnings',
  guidanceCopyLabel: 'Copy fix guidance',
  guidanceCopiedLabel: 'Guidance copied',
  authenticationResultsTitle: 'Authentication-Results highlights',
  noAuthenticationResults: 'No Authentication-Results header is visible in the pasted sample yet.',
  dkimSelectorTitle: 'Selector lookup',
  dkimSelectorBody: 'DKIM checks read selector._domainkey.domain. Use the selector shown by the sender or mail provider.',
  dkimKeyHidden: 'Public key present; raw DKIM key is hidden from page details.',
  missingValue: 'Not found',
  yes: 'yes',
  no: 'no',
  table: {
    signal: 'Signal',
    status: 'Status',
    detail: 'Detail',
    priority: 'Priority',
    target: 'Target',
    addresses: 'Public addresses',
    address: 'Address',
    zone: 'List',
    result: 'Result',
    host: 'Host',
    port: 'Port',
    latency: 'Latency',
  },
})
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const runtimeConfig = useRuntimeConfig()
const previewSubmitted = ref(false)
const targetValue = ref('example.com')
const selectorValue = ref('default')
const smtpPort = ref(25)
const headersValue = ref('Authentication-Results: mx.example; spf=pass smtp.mailfrom=example.com; dkim=pass header.d=example.com; dmarc=pass header.from=example.com\nFrom: Example Sender <sender@example.com>\nReturn-Path: <bounce@example.com>\nDKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=default; bh=sample; b=sample')
const spfIncludes = ref('_spf.example.net')
const spfIp4 = ref('192.0.2.0/24')
const spfIp6 = ref('')
const spfUseMx = ref(true)
const spfUseA = ref(false)
const spfAll = ref<SpfAllMechanism>('~all')
const dmarcPolicy = ref<DmarcPolicy>('none')
const dmarcSubdomainPolicy = ref<DmarcSubdomainPolicy>('inherit')
const dmarcPct = ref(100)
const dmarcRua = ref('dmarc@example.com')
const dmarcRuf = ref('')
const dmarcAdkim = ref<DmarcAlignment>('r')
const dmarcAspf = ref<DmarcAlignment>('r')
const isLoading = ref(false)
const errorMessage = ref('')
const apiResult = ref<MailHealthApiData | null>(null)
const apiMeta = ref<Record<string, unknown>>({})
const headerResult = ref<HeaderAnalysisResult | null>(null)
const guidanceCopied = ref(false)
const isHeaderAnalyzer = computed(() => tool.checkType === 'headers')
const isDkimCheck = computed(() => tool.checkType === 'dkim')
const isSmtpCheck = computed(() => tool.checkType === 'smtp')
const isBlacklistCheck = computed(() => tool.checkType === 'blacklist')
const isDnsCheck = computed(() => ['spf', 'dkim', 'dmarc', 'mx'].includes(tool.checkType))
const hasRecordBuilder = computed(() => isRecordBuilderTool(tool.slug))
const recordBuilderResult = computed(() => {
  if (tool.slug === 'spf-checker') {
    return buildSpfRecord({
      includes: spfIncludes.value,
      ip4: spfIp4.value,
      ip6: spfIp6.value,
      useMx: spfUseMx.value,
      useA: spfUseA.value,
      all: spfAll.value,
    }, locale)
  }

  if (tool.slug === 'dmarc-checker') {
    return buildDmarcRecord({
      policy: dmarcPolicy.value,
      subdomainPolicy: dmarcSubdomainPolicy.value,
      pct: dmarcPct.value,
      rua: dmarcRua.value,
      ruf: dmarcRuf.value,
      adkim: dmarcAdkim.value,
      aspf: dmarcAspf.value,
    }, locale)
  }

  return null
})
const displayedFindings = computed(() => headerResult.value?.findings ?? apiResult.value?.findings ?? [])
const hasResult = computed(() => Boolean(headerResult.value?.ok || apiResult.value))
const displayedMeta = computed(() => headerResult.value?.meta ?? [
  { label: resultMetaCopy.check, value: apiResult.value?.check ?? '-' },
  { label: resultMetaCopy.status, value: apiResult.value?.status ?? '-' },
  { label: resultMetaCopy.cache, value: apiMeta.value.cached ? resultMetaCopy.cached : resultMetaCopy.fresh },
  { label: resultMetaCopy.ttl, value: String(apiMeta.value.cache_ttl_seconds ?? '-') },
])
const summary = computed(() => headerResult.value?.summary || apiResult.value?.summary || copy.previewResult)
const scoreCard = computed(() => createMailHealthScoreCard(displayedFindings.value, copy.previewResult))
const relatedTools = computed(() => getRelatedMailHealthTools(tool.slug, locale))
const fixGuidanceText = computed(() => [
  copy.title,
  copy.freeScope,
  ...copy.methodology,
  ...copy.contentSections.flatMap((section) => section.paragraphs),
].join('\n'))

function stringifyValue(value: unknown, fallback = '-'): string {
  if (value === null || value === undefined || value === '') {
    return fallback
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.map((item) => stringifyValue(item)).join(', ') : fallback
  }

  if (typeof value === 'boolean') {
    return value ? resultDetailCopy.yes : resultDetailCopy.no
  }

  return String(value)
}

function recordText(record: Record<string, unknown> | undefined): string {
  return stringifyValue(record?.value ?? record?.txt ?? record?.record ?? record?.raw_record, '')
}

function parseRecordTags(record: string): Record<string, string> {
  return Object.fromEntries(record
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [key, ...valueParts] = part.split('=')
      return [key.trim().toLowerCase(), valueParts.join('=').trim()]
    })
    .filter(([key]) => Boolean(key)))
}

function spfMechanisms(record: string): string[] {
  return record
    .split(/\s+/)
    .map((part) => part.trim())
    .filter((part) => part && part.toLowerCase() !== 'v=spf1')
}

function spfLookupCount(record: string): number {
  return (record.match(/\b(?:include:|a(?=\s|:)|mx(?=\s|:)|ptr(?=\s|:)|exists:|redirect=)/gi) ?? []).length
}

function spfAllMechanism(record: string): string {
  return /(?:^|\s)([+?~-]all)(?:\s|$)/i.exec(record)?.[1]?.toLowerCase() ?? resultDetailCopy.missingValue
}

function statusForCount(count: number): string {
  if (count === 1) {
    return 'pass'
  }

  return count === 0 ? 'fail' : 'warn'
}

function dmarcEnforcement(policy: string): string {
  if (policy === 'reject') {
    return 'reject'
  }

  if (policy === 'quarantine') {
    return 'quarantine'
  }

  return 'none'
}

const resultDetailItems = computed<ResultDetailItem[]>(() => {
  if (!apiResult.value) {
    return []
  }

  const records = apiResult.value.records ?? []
  const firstRecord = records[0]
  const rawRecord = recordText(firstRecord)

  if (tool.checkType === 'spf') {
    const mechanisms = spfMechanisms(rawRecord)

    return [
      { label: 'SPF record status', value: records.length === 1 ? 'found' : (records.length === 0 ? 'missing' : 'multiple'), status: statusForCount(records.length) },
      { label: 'Raw record', value: rawRecord || resultDetailCopy.missingValue },
      { label: 'Mechanisms', value: mechanisms.length > 0 ? mechanisms.join(', ') : resultDetailCopy.missingValue },
      { label: 'DNS lookup count', value: String(spfLookupCount(rawRecord)), status: spfLookupCount(rawRecord) > 10 ? 'fail' : (spfLookupCount(rawRecord) > 8 ? 'warn' : 'pass') },
      { label: 'All mechanism', value: spfAllMechanism(rawRecord), status: spfAllMechanism(rawRecord) === '+all' ? 'fail' : (spfAllMechanism(rawRecord) === '-all' ? 'pass' : 'warn') },
    ]
  }

  if (tool.checkType === 'dkim') {
    return [
      { label: 'Query name', value: stringifyValue(firstRecord?.host, `${selectorValue.value}._domainkey.${targetValue.value}`) },
      { label: 'Record status', value: records.length === 1 ? 'found' : (records.length === 0 ? 'missing' : 'multiple'), status: statusForCount(records.length) },
      { label: 'Version', value: stringifyValue(firstRecord?.version, resultDetailCopy.missingValue) },
      { label: 'Key type', value: stringifyValue(firstRecord?.key_type, 'rsa') },
      { label: 'Public key', value: firstRecord?.public_key_present ? resultDetailCopy.dkimKeyHidden : resultDetailCopy.missingValue, status: firstRecord?.public_key_present ? 'pass' : 'fail' },
      { label: 'Key length', value: stringifyValue(firstRecord?.public_key_length) },
    ]
  }

  if (tool.checkType === 'dmarc') {
    const tags = parseRecordTags(rawRecord)
    const policy = stringifyValue(firstRecord?.policy ?? tags.p, resultDetailCopy.missingValue).toLowerCase()
    const pct = stringifyValue(firstRecord?.pct ?? tags.pct ?? '100')
    const rua = stringifyValue(firstRecord?.rua ?? tags.rua, resultDetailCopy.missingValue)
    const ruf = stringifyValue(firstRecord?.ruf ?? tags.ruf, resultDetailCopy.missingValue)
    const adkim = stringifyValue(firstRecord?.alignment_dkim ?? tags.adkim ?? 'r')
    const aspf = stringifyValue(firstRecord?.alignment_spf ?? tags.aspf ?? 'r')

    return [
      { label: 'Policy', value: policy, status: policy === 'reject' || policy === 'quarantine' ? 'pass' : (policy === 'none' ? 'warn' : 'fail') },
      { label: 'Rollout percent', value: pct, status: Number(pct) >= 100 ? 'pass' : 'warn' },
      { label: 'Aggregate reports', value: rua },
      { label: 'Failure reports', value: ruf },
      { label: 'DKIM alignment', value: adkim === 's' ? 'strict' : 'relaxed' },
      { label: 'SPF alignment', value: aspf === 's' ? 'strict' : 'relaxed' },
      { label: 'Enforcement progress', value: `none -> quarantine -> reject: ${dmarcEnforcement(policy)}` },
    ]
  }

  return []
})

const resultDetailTables = computed<ResultDetailTable[]>(() => {
  if (!apiResult.value) {
    return []
  }

  const records = apiResult.value.records ?? []
  const probes = apiResult.value.probes ?? []

  if (tool.checkType === 'mx') {
    return [{
      title: resultDetailCopy.recordsTitle,
      headers: [resultDetailCopy.table.priority, resultDetailCopy.table.target, resultDetailCopy.table.addresses, resultDetailCopy.table.status],
      rows: records.map((record) => [
        stringifyValue(record.priority),
        stringifyValue(record.target),
        stringifyValue(record.public_addresses ?? record.address_count),
        Number(record.address_count ?? 0) > 0 ? 'inbound ready' : 'needs public A/AAAA',
      ]),
    }]
  }

  if (tool.checkType === 'blacklist') {
    return [{
      title: resultDetailCopy.probesTitle,
      headers: [resultDetailCopy.table.address, resultDetailCopy.table.zone, resultDetailCopy.table.result, resultDetailCopy.table.detail],
      rows: probes.map((probe) => [
        stringifyValue(probe.address),
        stringifyValue(probe.zone),
        probe.error ? 'error' : (probe.rate_limited ? 'rate-limited' : (probe.listed ? 'listed' : 'unlisted')),
        stringifyValue(probe.responses ?? probe.error, 'No DNSBL response'),
      ]),
    }]
  }

  if (tool.checkType === 'smtp') {
    return [{
      title: resultDetailCopy.probesTitle,
      headers: [resultDetailCopy.table.host, resultDetailCopy.table.address, resultDetailCopy.table.port, resultDetailCopy.table.status, resultDetailCopy.table.latency],
      rows: probes.map((probe) => [
        stringifyValue(probe.mx_host),
        stringifyValue(probe.address),
        stringifyValue(probe.port),
        stringifyValue(probe.tcp_status),
        probe.latency_ms === null || probe.latency_ms === undefined ? '-' : `${probe.latency_ms} ms`,
      ]),
    }]
  }

  if (tool.checkType === 'spf' || tool.checkType === 'dmarc') {
    return []
  }

  return []
})

const authenticationResultHighlights = computed(() => {
  if (!isHeaderAnalyzer.value) {
    return []
  }

  return headersValue.value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^Authentication-Results:/iu.test(line))
})

function statusClass(status: string | undefined): string {
  if (status === 'pass') {
    return 'severity severity--pass'
  }
  if (status === 'warn' || status === 'unknown' || status === 'neutral' || status === 'none') {
    return 'severity severity--warn'
  }

  return 'severity severity--fail'
}

function mailhealthEndpoint(path: string): string {
  return `${String(runtimeConfig.public.mailhealthApiBaseUrl).replace(/\/+$/g, '')}/${path}`
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = await response.json() as { message?: string; errors?: Record<string, string[]> }
    const firstError = Object.values(payload.errors ?? {})[0]?.[0]

    return firstError ?? payload.message ?? `Check failed with HTTP ${response.status}.`
  } catch {
    return `Check failed with HTTP ${response.status}.`
  }
}

function resetResult(): void {
  errorMessage.value = ''
  apiResult.value = null
  apiMeta.value = {}
  headerResult.value = null
}

async function copyRecordValue(): Promise<void> {
  if (!recordBuilderResult.value || typeof navigator === 'undefined' || !navigator.clipboard) {
    return
  }

  try {
    await navigator.clipboard.writeText(recordBuilderResult.value.value)
  } catch {
    // Clipboard availability depends on browser permissions; the TXT value remains visible.
  }
}

async function copyFixGuidance(): Promise<void> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return
  }

  try {
    await navigator.clipboard.writeText(fixGuidanceText.value)
    guidanceCopied.value = true
    window.setTimeout(() => {
      guidanceCopied.value = false
    }, 1600)
  } catch {
    // The guidance remains visible when clipboard permissions are unavailable.
  }
}

function runLocalHeaderPreview(trackResult: boolean): void {
  previewSubmitted.value = true
  errorMessage.value = ''
  apiResult.value = null
  apiMeta.value = {}
  headerResult.value = analyzeMailHeaders(headersValue.value)

  if (trackResult) {
    trackMailHealthEvent(
      { toolSlug: tool.slug, locale, routePath: canonicalPath },
      headerResult.value.ok ? 'tool_completed' : 'tool_failed',
    )
  }
}

async function runApiCheck(path: string, body: Record<string, unknown>): Promise<void> {
  const response = await fetch(mailhealthEndpoint(path), {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    errorMessage.value = await parseApiError(response)
    trackMailHealthEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_failed')
    return
  }

  const payload = await response.json() as ApiResponse<MailHealthApiData>
  apiResult.value = payload.data
  apiMeta.value = payload.meta
  trackMailHealthEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_completed')
}

async function previewResult(): Promise<void> {
  previewSubmitted.value = true
  resetResult()
  trackMailHealthEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_started')

  if (isHeaderAnalyzer.value) {
    runLocalHeaderPreview(true)
    return
  }

  isLoading.value = true

  try {
    if (isDnsCheck.value) {
      await runApiCheck('dns', {
        domain: targetValue.value,
        check: tool.checkType,
        selector: isDkimCheck.value ? selectorValue.value : undefined,
      })
      return
    }

    if (isBlacklistCheck.value) {
      await runApiCheck('blacklist', {
        domain: targetValue.value,
      })
      return
    }

    if (isSmtpCheck.value) {
      await runApiCheck('smtp', {
        domain: targetValue.value,
        port: smtpPort.value,
      })
    }
  } catch {
    errorMessage.value = 'The MailHealth API is not reachable from this browser session.'
    trackMailHealthEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_failed')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  trackMailHealthEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_viewed')
})

watch(headersValue, () => {
  if (isHeaderAnalyzer.value) {
    runLocalHeaderPreview(false)
  }
}, { immediate: true })

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | MailHealth`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | MailHealth`,
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

    <section class="hero hero--single" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span class="status">{{ copy.statusLabel }}</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

    </section>

    <section class="health-summary" :aria-labelledby="`${tool.slug}-score`">
      <div class="score-card" :class="`score-card--${scoreCard.tone}`">
        <span>{{ shellCopy.healthScoreTitle }}</span>
        <strong :id="`${tool.slug}-score`">{{ hasResult ? scoreCard.score : '--' }}</strong>
        <small>{{ hasResult ? scoreCard.grade : copy.statusLabel }}</small>
      </div>

      <div>
        <h2>{{ shellCopy.checklistTitle }}</h2>
        <p>{{ hasResult ? scoreCard.summary : copy.previewResult }}</p>
        <div v-if="hasResult" class="checklist-grid">
          <div v-for="item in scoreCard.checklist" :key="`${item.label}-${item.detail}`">
            <span :class="statusClass(item.status)">{{ item.status }}</span>
            <strong>{{ item.label }}</strong>
            <p>{{ item.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="tool-layout">
      <div>
        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ copy.navLabel }}</h2>
          <p>{{ copy.description }}</p>
          <form class="field" @submit.prevent="previewResult">
            <template v-if="isHeaderAnalyzer">
              <label :for="`${tool.slug}-headers`">{{ shellCopy.headersLabel }}</label>
              <textarea
                :id="`${tool.slug}-headers`"
                v-model="headersValue"
                spellcheck="false"
                rows="10"
                :placeholder="copy.inputPlaceholder"
              ></textarea>
            </template>
            <template v-else>
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >

              <template v-if="isDkimCheck">
                <label :for="`${tool.slug}-selector`">{{ shellCopy.selectorLabel }}</label>
                <input
                  :id="`${tool.slug}-selector`"
                  v-model="selectorValue"
                  type="text"
                  placeholder="default"
                  autocomplete="off"
                >
              </template>

              <template v-if="isSmtpCheck">
                <label :for="`${tool.slug}-port`">{{ shellCopy.portLabel }}</label>
                <select :id="`${tool.slug}-port`" v-model.number="smtpPort">
                  <option v-for="port in [25, 465, 587]" :key="port" :value="port">
                    {{ port }}
                  </option>
                </select>
              </template>
            </template>

            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit" :disabled="isLoading">
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
          <p v-else-if="headerResult && !headerResult.ok" class="result-error">{{ headerResult.error }}</p>

          <template v-else-if="headerResult?.ok || apiResult">
            <p>{{ summary }}</p>

            <div class="result-meta">
              <div v-for="item in displayedMeta" :key="`${item.label}-${item.value}`">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>

            <div class="result-table-wrap">
              <table class="result-table">
                <thead>
                  <tr>
                    <th>{{ resultDetailCopy.table.signal }}</th>
                    <th>{{ resultDetailCopy.table.status }}</th>
                    <th>{{ resultDetailCopy.table.detail }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="finding in displayedFindings" :key="`${finding.label}-${finding.detail}`">
                    <td>{{ finding.label }}</td>
                    <td><span :class="statusClass(finding.status)">{{ finding.status }}</span></td>
                    <td>{{ finding.value ? `${finding.detail} (${finding.value})` : finding.detail }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <section v-if="resultDetailItems.length" class="content-section">
              <h3>{{ resultDetailCopy.parsedTitle }}</h3>
              <dl class="result-detail-grid">
                <div v-for="item in resultDetailItems" :key="`${item.label}-${item.value}`">
                  <dt>{{ item.label }}</dt>
                  <dd>
                    <span v-if="item.status" :class="statusClass(item.status)">{{ item.value }}</span>
                    <span v-else>{{ item.value }}</span>
                  </dd>
                </div>
              </dl>
            </section>

            <section v-if="isDkimCheck" class="content-section">
              <h3>{{ resultDetailCopy.dkimSelectorTitle }}</h3>
              <p>{{ resultDetailCopy.dkimSelectorBody }}</p>
            </section>

            <section v-if="isHeaderAnalyzer" class="content-section">
              <h3>{{ resultDetailCopy.authenticationResultsTitle }}</h3>
              <ul v-if="authenticationResultHighlights.length" class="result-list">
                <li v-for="line in authenticationResultHighlights" :key="line">
                  <code>{{ line }}</code>
                </li>
              </ul>
              <p v-else>{{ resultDetailCopy.noAuthenticationResults }}</p>
            </section>

            <section v-for="table in resultDetailTables" :key="table.title" class="content-section">
              <h3>{{ table.title }}</h3>
              <div class="result-table-wrap">
                <table class="result-table">
                  <thead>
                    <tr>
                      <th v-for="header in table.headers" :key="header">{{ header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, rowIndex) in table.rows" :key="`${table.title}-${rowIndex}`">
                      <td v-for="(cell, cellIndex) in row" :key="`${table.title}-${rowIndex}-${cellIndex}`">{{ cell }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section v-if="apiResult?.warnings?.length" class="content-section">
              <h3>{{ resultDetailCopy.warningsTitle }}</h3>
              <ul class="result-list">
                <li v-for="warning in apiResult.warnings" :key="warning">{{ warning }}</li>
              </ul>
            </section>
          </template>

          <p v-else>{{ copy.previewResult }}</p>
        </section>
      </div>

      <aside class="tool-sidebar" :aria-labelledby="`${tool.slug}-methodology`">
        <section class="band">
          <h2 :id="`${tool.slug}-methodology`">{{ shellCopy.methodologyLabel }}</h2>
          <ul class="method-list">
            <li v-for="item in copy.methodology" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="band">
          <h2>{{ shellCopy.fixGuidanceTitle }}</h2>
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
          <button class="button-link button-link--secondary guidance-copy" type="button" @click="copyFixGuidance">
            {{ guidanceCopied ? resultDetailCopy.guidanceCopiedLabel : resultDetailCopy.guidanceCopyLabel }}
          </button>
        </section>

        <section class="band record-builder" :aria-labelledby="`${tool.slug}-record-builder`">
          <h2 :id="`${tool.slug}-record-builder`">{{ recordBuilderCopy.title }}</h2>
          <p>{{ hasRecordBuilder ? recordBuilderCopy.body : recordBuilderCopy.unavailableBody }}</p>

          <template v-if="tool.slug === 'spf-checker'">
            <form class="builder-form" @submit.prevent>
              <div class="field">
                <label :for="`${tool.slug}-builder-includes`">{{ recordBuilderCopy.includesLabel }}</label>
                <textarea
                  :id="`${tool.slug}-builder-includes`"
                  v-model="spfIncludes"
                  rows="3"
                  spellcheck="false"
                  placeholder="_spf.example.net"
                ></textarea>
                <small>{{ recordBuilderCopy.includesHelp }}</small>
              </div>

              <div class="builder-grid">
                <div class="field">
                  <label :for="`${tool.slug}-builder-ip4`">{{ recordBuilderCopy.ip4Label }}</label>
                  <input
                    :id="`${tool.slug}-builder-ip4`"
                    v-model="spfIp4"
                    type="text"
                    autocomplete="off"
                    placeholder="192.0.2.0/24"
                  >
                </div>

                <div class="field">
                  <label :for="`${tool.slug}-builder-ip6`">{{ recordBuilderCopy.ip6Label }}</label>
                  <input
                    :id="`${tool.slug}-builder-ip6`"
                    v-model="spfIp6"
                    type="text"
                    autocomplete="off"
                    placeholder="2001:db8::/32"
                  >
                </div>
              </div>

              <fieldset class="builder-options">
                <legend>{{ recordBuilderCopy.spfTitle }}</legend>
                <label>
                  <input v-model="spfUseMx" type="checkbox">
                  <span>{{ recordBuilderCopy.useMxLabel }}</span>
                </label>
                <label>
                  <input v-model="spfUseA" type="checkbox">
                  <span>{{ recordBuilderCopy.useALabel }}</span>
                </label>
              </fieldset>

              <div class="field">
                <label :for="`${tool.slug}-builder-all`">{{ recordBuilderCopy.allLabel }}</label>
                <select :id="`${tool.slug}-builder-all`" v-model="spfAll">
                  <option value="~all">{{ recordBuilderCopy.options.softFail }}</option>
                  <option value="-all">{{ recordBuilderCopy.options.hardFail }}</option>
                  <option value="?all">{{ recordBuilderCopy.options.neutral }}</option>
                </select>
              </div>
            </form>
          </template>

          <template v-else-if="tool.slug === 'dmarc-checker'">
            <h3>{{ recordBuilderCopy.dmarcTitle }}</h3>
            <form class="builder-form" @submit.prevent>
              <div class="builder-grid">
                <div class="field">
                  <label :for="`${tool.slug}-builder-policy`">{{ recordBuilderCopy.policyLabel }}</label>
                  <select :id="`${tool.slug}-builder-policy`" v-model="dmarcPolicy">
                    <option value="none">{{ recordBuilderCopy.options.none }}</option>
                    <option value="quarantine">{{ recordBuilderCopy.options.quarantine }}</option>
                    <option value="reject">{{ recordBuilderCopy.options.reject }}</option>
                  </select>
                </div>

                <div class="field">
                  <label :for="`${tool.slug}-builder-sp`">{{ recordBuilderCopy.subdomainPolicyLabel }}</label>
                  <select :id="`${tool.slug}-builder-sp`" v-model="dmarcSubdomainPolicy">
                    <option value="inherit">{{ recordBuilderCopy.options.inherit }}</option>
                    <option value="none">{{ recordBuilderCopy.options.none }}</option>
                    <option value="quarantine">{{ recordBuilderCopy.options.quarantine }}</option>
                    <option value="reject">{{ recordBuilderCopy.options.reject }}</option>
                  </select>
                </div>
              </div>

              <div class="field">
                <label :for="`${tool.slug}-builder-pct`">{{ recordBuilderCopy.pctLabel }}</label>
                <input
                  :id="`${tool.slug}-builder-pct`"
                  v-model.number="dmarcPct"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                >
              </div>

              <div class="field">
                <label :for="`${tool.slug}-builder-rua`">{{ recordBuilderCopy.ruaLabel }}</label>
                <input
                  :id="`${tool.slug}-builder-rua`"
                  v-model="dmarcRua"
                  type="text"
                  autocomplete="off"
                  placeholder="dmarc@example.com"
                >
              </div>

              <div class="field">
                <label :for="`${tool.slug}-builder-ruf`">{{ recordBuilderCopy.rufLabel }}</label>
                <input
                  :id="`${tool.slug}-builder-ruf`"
                  v-model="dmarcRuf"
                  type="text"
                  autocomplete="off"
                  placeholder="forensics@example.com"
                >
              </div>

              <fieldset class="builder-options">
                <legend>{{ recordBuilderCopy.alignmentLabel }}</legend>
                <label>
                  <input v-model="dmarcAdkim" type="radio" value="r" name="dmarc-adkim">
                  <span>DKIM {{ recordBuilderCopy.relaxedLabel }}</span>
                </label>
                <label>
                  <input v-model="dmarcAdkim" type="radio" value="s" name="dmarc-adkim">
                  <span>DKIM {{ recordBuilderCopy.strictLabel }}</span>
                </label>
                <label>
                  <input v-model="dmarcAspf" type="radio" value="r" name="dmarc-aspf">
                  <span>SPF {{ recordBuilderCopy.relaxedLabel }}</span>
                </label>
                <label>
                  <input v-model="dmarcAspf" type="radio" value="s" name="dmarc-aspf">
                  <span>SPF {{ recordBuilderCopy.strictLabel }}</span>
                </label>
              </fieldset>
            </form>
          </template>

          <template v-if="recordBuilderResult">
            <dl class="builder-output">
              <div>
                <dt>{{ recordBuilderCopy.recordNameLabel }}</dt>
                <dd>{{ recordBuilderResult.recordName }}</dd>
              </div>
              <div>
                <dt>{{ recordBuilderCopy.recordTypeLabel }}</dt>
                <dd>{{ recordBuilderResult.recordType }}</dd>
              </div>
              <div class="builder-output__value">
                <dt>{{ recordBuilderCopy.recordValueLabel }}</dt>
                <dd><code>{{ recordBuilderResult.value }}</code></dd>
              </div>
            </dl>

            <button class="button-link button-link--secondary builder-copy" type="button" @click="copyRecordValue">
              {{ recordBuilderCopy.copyValueLabel }}
            </button>

            <h3>{{ recordBuilderCopy.warningsTitle }}</h3>
            <ul class="method-list">
              <li v-for="warning in recordBuilderResult.warnings" :key="warning">{{ warning }}</li>
            </ul>

            <h3>{{ recordBuilderCopy.stepsTitle }}</h3>
            <ul class="method-list">
              <li v-for="step in recordBuilderResult.steps" :key="step">{{ step }}</li>
            </ul>
          </template>

          <template v-else>
            <h3>{{ recordBuilderCopy.unavailableTitle }}</h3>
            <ul class="method-list">
              <li v-for="item in shellCopy.recordBuilderItems" :key="item">{{ item }}</li>
            </ul>
          </template>
        </section>

        <section class="band">
          <h2>{{ shellCopy.relatedTitle }}</h2>
          <p>{{ shellCopy.relatedBody }}</p>
          <div class="related-list">
            <NuxtLink v-for="related in relatedTools" :key="related.slug" class="related-card" :to="localizedToolPath(locale, related.slug)">
              <strong>{{ related.title }}</strong>
              <span>{{ related.description }}</span>
            </NuxtLink>
          </div>
        </section>
      </aside>
    </section>

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="mailhealth"
      :slot-id="`mailhealth-${tool.slug}-after-result`"
      variant="tool"
    />

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

      <aside class="band" :aria-label="shellCopy.methodologyLabel">
        <h2>{{ shellCopy.methodologyLabel }}</h2>
        <p>{{ shellCopy.contentQualityBody }}</p>
        <div class="inline-link-list">
          <NuxtLink :to="localizedContentPath(locale, 'methodology')">
            {{ shellCopy.methodologyLabel }}
          </NuxtLink>
          <NuxtLink :to="localizedContentPath(locale, 'editorial-policy')">
            {{ shellCopy.editorialLabel }}
          </NuxtLink>
        </div>
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
