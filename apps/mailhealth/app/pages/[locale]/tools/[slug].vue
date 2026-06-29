<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref } from 'vue'
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
    headerResult.value = analyzeMailHeaders(headersValue.value)
    trackMailHealthEvent(
      { toolSlug: tool.slug, locale, routePath: canonicalPath },
      headerResult.value.ok ? 'tool_completed' : 'tool_failed',
    )
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
                    <th>Signal</th>
                    <th>Status</th>
                    <th>Detail</th>
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

            <section v-if="apiResult?.records?.length" class="content-section">
              <h3>DNS records</h3>
              <ul class="result-list">
                <li v-for="record in apiResult.records" :key="JSON.stringify(record)">
                  {{ JSON.stringify(record) }}
                </li>
              </ul>
            </section>

            <section v-if="apiResult?.probes?.length" class="content-section">
              <h3>Probe details</h3>
              <ul class="result-list">
                <li v-for="probe in apiResult.probes" :key="JSON.stringify(probe)">
                  {{ JSON.stringify(probe) }}
                </li>
              </ul>
            </section>

            <section v-if="apiResult?.warnings?.length" class="content-section">
              <h3>Warnings</h3>
              <ul class="result-list">
                <li v-for="warning in apiResult.warnings" :key="warning">{{ warning }}</li>
              </ul>
            </section>
          </template>

          <p v-else>{{ previewSubmitted ? copy.previewResult : shellCopy.plannedBody }}</p>
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
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
