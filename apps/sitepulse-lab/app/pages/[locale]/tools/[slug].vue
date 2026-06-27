<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import {
  createToolStructuredData,
  getCategoryLabel,
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
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const runtimeConfig = useRuntimeConfig()
const targetValue = ref('https://example.com')
const previewSubmitted = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const apiResult = ref<SitePulseProbeData | null>(null)
const apiMeta = ref<Record<string, unknown>>({})
const displayedFindings = computed(() => apiResult.value?.findings ?? [])
const displayedMeta = computed(() => [
  { label: 'Status', value: apiResult.value?.status ?? '-' },
  { label: 'Final URL', value: apiResult.value?.final_url ?? '-' },
  { label: 'Cache', value: apiMeta.value.cached ? 'cached' : 'fresh' },
  { label: 'TTL', value: String(apiMeta.value.cache_ttl_seconds ?? '-') },
])
const summary = computed(() => apiResult.value?.summary || copy.previewResult)

function sitepulseEndpoint(path: string): string {
  return `${String(runtimeConfig.public.sitepulseApiBaseUrl).replace(/\/+$/g, '')}/${path}`
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
                    <td>{{ finding.status }}</td>
                    <td>{{ finding.value ? `${finding.detail} (${finding.value})` : finding.detail }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <section v-if="apiResult.redirect_chain.length" class="content-section">
              <h3>Redirect chain</h3>
              <ul class="result-list">
                <li v-for="hop in apiResult.redirect_chain" :key="JSON.stringify(hop)">
                  {{ JSON.stringify(hop) }}
                </li>
              </ul>
            </section>

            <section v-if="Object.keys(apiResult.checks).length" class="content-section">
              <h3>Probe details</h3>
              <ul class="result-list">
                <li v-for="(value, key) in apiResult.checks" :key="key">
                  <strong>{{ key }}:</strong> {{ JSON.stringify(value) }}
                </li>
              </ul>
            </section>

            <section v-if="apiResult.warnings.length" class="content-section">
              <h3>Warnings</h3>
              <ul class="result-list">
                <li v-for="warning in apiResult.warnings" :key="warning">{{ warning }}</li>
              </ul>
            </section>
          </template>

          <p v-else>{{ previewSubmitted ? copy.previewResult : shellCopy.plannedBody }}</p>
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
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
