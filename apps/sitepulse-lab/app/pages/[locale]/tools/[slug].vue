<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, sanitizePublicCopy, toHtmlLang } from '../../../data/locales'
import { createSitePulseDetailView, getSitePulseDetailCopy } from '../../../data/probeDetails'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import {
  createSitePulseScoreCard,
  createToolStructuredData,
  getCategoryLabel,
  getRelatedSitePulseTools,
  getToolBySlug,
  getToolCopy,
  type SitePulseCheck,
} from '../../../data/tools'
import { trackSitePulseEvent } from '../../../utils/analytics'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

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

const copy = getToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const detailCopy = getSitePulseDetailCopy(locale)
const resultMetaCopy = sanitizePublicCopy(locale, {
  status: 'Page state',
  online: 'online',
  redirecting: 'redirecting',
  slow: 'slow',
  down: 'down',
  httpCode: 'HTTP code',
  finalUrl: 'Final URL',
  ttfb: 'TTFB',
  cache: 'Cache',
  cached: 'cached',
  fresh: 'fresh',
  ttl: 'TTL',
})
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const runtimeConfig = useRuntimeConfig()
const targetValue = ref('')
const previewSubmitted = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const apiResult = ref<SitePulseProbeData | null>(null)
const apiMeta = ref<Record<string, unknown>>({})
const activeResultTab = ref<'overview' | 'findings' | 'details'>('overview')
const reportCopied = ref(false)
const displayedFindings = computed(() => apiResult.value?.findings ?? [])
const hasResult = computed(() => Boolean(apiResult.value))
const statusCheck = computed(() => asRecord(apiResult.value?.checks.status))
const ttfbCheck = computed(() => asRecord(apiResult.value?.checks.ttfb))
const performanceCheck = computed(() => asRecord(apiResult.value?.checks.performance))
const httpCode = computed(() => numberFrom(statusCheck.value.code))
const redirectCount = computed(() => numberFrom(performanceCheck.value.redirect_count) ?? Math.max((apiResult.value?.redirect_chain.length ?? 1) - 1, 0))
const ttfbMs = computed(() => numberFrom(ttfbCheck.value.duration_ms ?? statusCheck.value.duration_ms))
const pageState = computed(() => {
  if (!apiResult.value || httpCode.value === null) {
    return '-'
  }

  if (apiResult.value.status === 'fail' || httpCode.value >= 400) {
    return resultMetaCopy.down
  }

  if (ttfbMs.value !== null && ttfbMs.value >= 1200) {
    return resultMetaCopy.slow
  }

  if (redirectCount.value > 0) {
    return resultMetaCopy.redirecting
  }

  return resultMetaCopy.online
})
const displayedMeta = computed(() => [
  { label: resultMetaCopy.status, value: pageState.value },
  { label: resultMetaCopy.httpCode, value: httpCode.value === null ? '-' : String(httpCode.value) },
  { label: resultMetaCopy.finalUrl, value: apiResult.value?.final_url ?? '-' },
  { label: resultMetaCopy.ttfb, value: ttfbMs.value === null ? '-' : `${ttfbMs.value} ms` },
  { label: resultMetaCopy.cache, value: apiMeta.value.cached ? resultMetaCopy.cached : resultMetaCopy.fresh },
  { label: resultMetaCopy.ttl, value: String(apiMeta.value.cache_ttl_seconds ?? '-') },
])
const summary = computed(() => apiResult.value?.summary || copy.previewResult)
const scoreCard = computed(() => createSitePulseScoreCard(displayedFindings.value, copy.previewResult))
const actionItems = computed(() => scoreCard.value.checklist.filter((item) => item.status !== 'pass').slice(0, 4))
const relatedTools = computed(() => getRelatedSitePulseTools(tool.slug, locale))
const detailView = computed(() => apiResult.value ? createSitePulseDetailView(apiResult.value, locale) : null)
const resultTabs = computed(() => [
  { key: 'overview' as const, label: shellCopy.overviewTabLabel },
  { key: 'findings' as const, label: shellCopy.findingsTabLabel },
  { key: 'details' as const, label: shellCopy.detailsTabLabel },
])
const reportText = computed(() => {
  if (!apiResult.value) {
    return ''
  }

  return [
    `${copy.title}`,
    `${resultMetaCopy.status}: ${pageState.value}`,
    `${resultMetaCopy.httpCode}: ${httpCode.value === null ? '-' : httpCode.value}`,
    `${resultMetaCopy.finalUrl}: ${apiResult.value.final_url}`,
    `${resultMetaCopy.ttfb}: ${ttfbMs.value === null ? '-' : `${ttfbMs.value} ms`}`,
    '',
    ...displayedFindings.value.map((finding) => `${finding.label}: ${finding.status} - ${finding.detail}${finding.value ? ` (${finding.value})` : ''}`),
  ].join('\n')
})

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
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

function statusClass(status: string | undefined): string {
  if (status === 'pass' || status === 'ok' || status === 'healthy') {
    return 'severity severity--pass'
  }
  if (status === 'warn' || status === 'warning' || status === 'review' || status === 'unknown' || status === 'blocked') {
    return 'severity severity--warn'
  }

  return 'severity severity--fail'
}

function sitepulseEndpoint(path: string): string {
  return `${String(runtimeConfig.public.sitepulseApiBaseUrl).replace(/\/+$/g, '')}/${path}`
}

async function copyReport(): Promise<void> {
  if (!reportText.value || typeof navigator === 'undefined' || !navigator.clipboard) {
    return
  }

  try {
    await navigator.clipboard.writeText(reportText.value)
    reportCopied.value = true
    window.setTimeout(() => {
      reportCopied.value = false
    }, 1600)
  } catch {
    // The report remains visible if clipboard permissions are unavailable.
  }
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

async function runProbe(): Promise<void> {
  previewSubmitted.value = true
  errorMessage.value = ''
  apiResult.value = null
  apiMeta.value = {}
  activeResultTab.value = 'overview'
  isLoading.value = true
  trackSitePulseEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_started')

  try {
    const response = await fetch(sitepulseEndpoint('probe'), {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: targetValue.value,
        checks: [tool.check] satisfies SitePulseCheck[],
      }),
    })

    if (!response.ok) {
      errorMessage.value = await parseApiError(response)
      trackSitePulseEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_failed')
      return
    }

    const payload = await response.json() as ApiResponse<SitePulseProbeData>
    apiResult.value = payload.data
    apiMeta.value = payload.meta
    trackSitePulseEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_completed')
  } catch {
    errorMessage.value = 'The SitePulse API is not reachable from this browser session.'
    trackSitePulseEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_failed')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  trackSitePulseEvent({ toolSlug: tool.slug, locale, routePath: canonicalPath }, 'tool_viewed')
})

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | SitePulse Lab`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | SitePulse Lab`,
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
        <span>{{ shellCopy.pulseScoreTitle }}</span>
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
          <form class="field" @submit.prevent="runProbe">
            <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
            <input
              :id="`${tool.slug}-target`"
              v-model="targetValue"
              type="url"
              :placeholder="copy.inputPlaceholder"
              autocomplete="off"
            >

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

          <template v-else-if="apiResult">
            <div class="result-tabs" role="tablist" :aria-label="shellCopy.resultTitle">
              <button
                v-for="tab in resultTabs"
                :key="tab.key"
                type="button"
                role="tab"
                :aria-selected="activeResultTab === tab.key"
                @click="activeResultTab = tab.key"
              >
                {{ tab.label }}
              </button>
            </div>

            <section v-if="activeResultTab === 'overview'" class="result-tab-panel">
              <p>{{ summary }}</p>

              <div class="result-meta">
                <div v-for="item in displayedMeta" :key="`${item.label}-${item.value}`">
                  <strong>{{ item.label }}</strong>
                  <span>{{ item.value }}</span>
                </div>
              </div>

              <div class="result-actions">
                <button class="button-link button-link--secondary" type="button" @click="copyReport">
                  {{ reportCopied ? shellCopy.copiedReportLabel : shellCopy.copyReportLabel }}
                </button>
                <button class="button-link button-link--secondary" type="button" :disabled="isLoading" @click="runProbe">
                  {{ shellCopy.checkAgainLabel }}
                </button>
              </div>
            </section>

            <section v-if="activeResultTab === 'findings'" class="result-tab-panel">
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
            </section>

            <section v-if="activeResultTab === 'details' && detailView" class="result-tab-panel">
              <section class="technical-section">
                <h3>{{ detailCopy.redirectPathTitle }}</h3>
                <ol v-if="detailView.redirectHops.length" class="redirect-timeline">
                  <li v-for="hop in detailView.redirectHops" :key="`${hop.step}-${hop.url}-${hop.location}`">
                    <div class="redirect-timeline__step">
                      <strong>{{ hop.step }}</strong>
                      <span :class="statusClass(hop.status)">{{ hop.code }}</span>
                    </div>
                    <dl>
                      <div>
                        <dt>{{ detailCopy.urlLabel }}</dt>
                        <dd>{{ hop.url }}</dd>
                      </div>
                      <div>
                        <dt>{{ detailCopy.locationLabel }}</dt>
                        <dd>{{ hop.location }}</dd>
                      </div>
                      <div>
                        <dt>{{ detailCopy.durationLabel }}</dt>
                        <dd>{{ hop.duration }}</dd>
                      </div>
                      <div>
                        <dt>{{ detailCopy.crossDomainLabel }}</dt>
                        <dd>{{ hop.crossDomain }}</dd>
                      </div>
                    </dl>
                    <p v-if="hop.warning" class="technical-warning">{{ hop.warning }}</p>
                  </li>
                </ol>
                <p v-else>{{ detailCopy.emptyRedirects }}</p>
              </section>

              <section class="technical-section">
                <h3>{{ detailCopy.headerMatrixTitle }}</h3>
                <div class="detail-card-grid">
                  <article v-for="item in detailView.headerItems" :key="`${item.label}-${item.detail}`" class="detail-card">
                    <span :class="statusClass(item.status)">{{ item.status }}</span>
                    <strong>{{ item.label }}</strong>
                    <p>{{ item.detail }}</p>
                    <code v-if="item.value">{{ item.value }}</code>
                  </article>
                </div>
              </section>

              <section v-if="detailView.crawlItems.length" class="technical-section">
                <h3>{{ detailCopy.crawlabilityTitle }}</h3>
                <div class="detail-card-grid">
                  <article v-for="item in detailView.crawlItems" :key="`${item.label}-${item.value}`" class="detail-card">
                    <span :class="statusClass(item.status)">{{ item.status }}</span>
                    <strong>{{ item.label }}</strong>
                    <p>{{ item.detail }}</p>
                    <code v-if="item.value">{{ item.value }}</code>
                  </article>
                </div>
                <div v-if="detailView.sitemapSampleUrls.length" class="sample-url-list">
                  <strong>{{ detailCopy.sitemapSampleUrlsLabel }}</strong>
                  <ul class="method-list">
                    <li v-for="sampleUrl in detailView.sitemapSampleUrls" :key="sampleUrl">{{ sampleUrl }}</li>
                  </ul>
                </div>
              </section>

              <section class="technical-section">
                <h3>{{ detailCopy.technologyTitle }}</h3>
                <div class="detail-card-grid">
                  <article v-for="item in detailView.technologyItems" :key="`${item.label}-${item.detail}-${item.value}`" class="detail-card">
                    <span :class="statusClass(item.status)">{{ item.status }}</span>
                    <strong>{{ item.label }}</strong>
                    <p>{{ item.detail }}</p>
                    <code v-if="item.value">{{ item.value }}</code>
                  </article>
                </div>
              </section>

              <section class="technical-section">
                <h3>{{ detailCopy.performanceTitle }}</h3>
                <div class="detail-card-grid">
                  <article v-for="item in detailView.performanceItems" :key="`${item.label}-${item.value}`" class="detail-card">
                    <span :class="statusClass(item.status)">{{ item.status }}</span>
                    <strong>{{ item.label }}</strong>
                    <p>{{ item.detail }}</p>
                    <code v-if="item.value">{{ item.value }}</code>
                  </article>
                </div>
              </section>

              <section v-if="detailView.warnings.length" class="technical-section">
                <h3>{{ detailCopy.warningsTitle }}</h3>
                <ul class="method-list">
                  <li v-for="warning in detailView.warnings" :key="warning">{{ warning }}</li>
                </ul>
              </section>
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
          <h2>{{ shellCopy.recommendationTitle }}</h2>
          <ul v-if="actionItems.length" class="method-list">
            <li v-for="item in actionItems" :key="`${item.label}-${item.detail}`">
              {{ item.label }}: {{ item.detail }}
            </li>
          </ul>
          <p v-else>{{ shellCopy.recommendationEmpty }}</p>
        </section>

        <section class="band">
          <h2>{{ shellCopy.monitoringTitle }}</h2>
          <p>{{ shellCopy.monitoringBody }}</p>
          <ul class="method-list">
            <li v-for="item in shellCopy.monitoringItems" :key="item">{{ item }}</li>
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
      site-slug="sitepulse-lab"
      :slot-id="`sitepulse-${tool.slug}-after-result`"
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
