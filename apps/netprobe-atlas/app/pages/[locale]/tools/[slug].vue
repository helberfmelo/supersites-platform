<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { categoryLabels, getToolBySlug, getToolCopy } from '../../../data/tools'
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
const runtimeConfig = useRuntimeConfig()
const previewSubmitted = ref(false)
const targetValue = ref(tool.slug === 'what-is-my-ip' ? '' : tool.exampleTarget)
const selectedRecordTypes = ref(['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA'])
const isLoading = ref(false)
const errorMessage = ref('')
const dnsResult = ref<DnsLookupData | null>(null)
const dnsMeta = ref<Record<string, unknown>>({})
const ipResult = ref<ClientIpData | null>(null)
const ipMeta = ref<Record<string, unknown>>({})
const isDnsLookup = computed(() => tool.slug === 'dns-lookup')
const isIpLookup = computed(() => tool.slug === 'what-is-my-ip')
const isLiveTool = computed(() => isDnsLookup.value || isIpLookup.value)

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

interface ApiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

function netprobeEndpoint(path: string): string {
  return `${String(runtimeConfig.public.netprobeApiBaseUrl).replace(/\/+$/g, '')}/${path}`
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
  dnsResult.value = null
  ipResult.value = null

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
  } catch {
    errorMessage.value = 'The lookup API is not reachable from this browser session.'
  } finally {
    isLoading.value = false
  }
}

useHead({
  htmlAttrs: {
    lang: locale,
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
          <p class="eyebrow">{{ categoryLabels[tool.category] }}</p>
          <span class="status">{{ tool.statusLabel }}</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

      <aside class="status-panel" :aria-label="shellCopy.pageStatusLabel">
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.exampleLabel }}</strong>
            <span>{{ tool.exampleTarget }}</span>
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
                <legend>Record types</legend>
                <label v-for="recordType in ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA']" :key="recordType">
                  <input v-model="selectedRecordTypes" type="checkbox" :value="recordType">
                  <span>{{ recordType }}</span>
                </label>
              </fieldset>
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
          <h2 :id="`${tool.slug}-result`">{{ isLiveTool ? 'Result' : 'Result preview' }}</h2>
          <p v-if="isLoading">Running lookup...</p>
          <p v-else-if="errorMessage" class="result-error">{{ errorMessage }}</p>

          <div v-else-if="ipResult">
            <div class="result-meta">
              <div>
                <strong>Address</strong>
                <span>{{ ipResult.address }}</span>
              </div>
              <div>
                <strong>Version</strong>
                <span>{{ ipResult.version }}</span>
              </div>
              <div>
                <strong>Public range</strong>
                <span>{{ ipResult.is_public ? 'Yes' : 'No' }}</span>
              </div>
            </div>
            <p>{{ ipMeta.retention }}</p>
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
            <dt>Free check</dt>
            <dd>{{ tool.freeScope }}</dd>
          </div>
          <div>
            <dt>Upgrade path</dt>
            <dd>{{ tool.upgradeScope }}</dd>
          </div>
        </dl>
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
