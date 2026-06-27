<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createQrRoutePayloadSummary,
  createQrRouteToolStructuredData,
  getCategoryLabel,
  getQrRouteToolBySlug,
  getQrRouteToolCopy,
  getRelatedQrRouteTools,
  type QrRouteToolResult,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackQRRouteEvent } from '../../../utils/analytics'
import { runQrRouteToolInWorker } from '../../../utils/qrrouteWorker'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getQrRouteToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

const copy = getQrRouteToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createQrRouteToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const selectedMode = ref(tool.modes[0]?.value ?? '')
const primaryInput = ref(tool.samplePrimary)
const secondaryInput = ref(tool.sampleSecondary)
const hasRun = ref(false)
const isRunning = ref(false)
const result = ref<QrRouteToolResult | null>(null)
const previewDataUrl = ref('')
const previewError = ref('')
const copyState = ref('')
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.invalidResultTitle : copy.resultLabel)
const payloadSummary = computed(() => createQrRoutePayloadSummary(tool.slug, result.value))
const relatedTools = computed(() => getRelatedQrRouteTools(tool))
const previewDownloadName = computed(() => `qrroute-${tool.slug}-${selectedMode.value || 'preview'}.svg`)
const payloadStateTitle = computed(() => {
  if (isRunning.value) {
    return shellCopy.payloadRunningTitle
  }

  if (result.value?.ok === false) {
    return shellCopy.invalidResultTitle
  }

  if (payloadSummary.value) {
    return shellCopy.payloadReadyLabel
  }

  return shellCopy.payloadEmptyTitle
})

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

async function renderPreview(nextResult: QrRouteToolResult | null): Promise<void> {
  previewDataUrl.value = ''
  previewError.value = ''

  if (!nextResult?.ok || !nextResult.previewPayload || !import.meta.client) {
    return
  }

  try {
    if (nextResult.previewKind === 'barcode') {
      const { default: JsBarcode } = await import('jsbarcode')
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      JsBarcode(svg, nextResult.previewPayload, {
        format: 'CODE128',
        displayValue: true,
        font: 'monospace',
        fontSize: 16,
        height: 84,
        margin: 12,
        width: 2,
      })
      previewDataUrl.value = svgDataUrl(new XMLSerializer().serializeToString(svg))
      return
    }

    const QRCode = await import('qrcode')
    const svg = await QRCode.toString(nextResult.previewPayload, {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: 'M',
      width: 260,
    })
    previewDataUrl.value = svgDataUrl(svg)
  } catch {
    previewError.value = shellCopy.previewError
  }
}

async function runTool(): Promise<void> {
  isRunning.value = true
  hasRun.value = true
  copyState.value = ''
  trackQRRouteEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_started')

  try {
    result.value = await runQrRouteToolInWorker({
      slug: tool.slug,
      primaryInput: primaryInput.value,
      secondaryInput: secondaryInput.value,
      mode: selectedMode.value,
    })
    await renderPreview(result.value)

    trackQRRouteEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, result.value.ok ? 'tool_completed' : 'tool_failed')
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      previewKind: 'text',
      previewPayload: '',
      error: error instanceof Error ? error.message : 'Tool execution failed.',
    }
    await renderPreview(result.value)
    trackQRRouteEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'tool_failed')
  } finally {
    isRunning.value = false
  }
}

function resetExample(): void {
  selectedMode.value = tool.modes[0]?.value ?? ''
  primaryInput.value = tool.samplePrimary
  secondaryInput.value = tool.sampleSecondary
  hasRun.value = false
  result.value = null
  previewDataUrl.value = ''
  previewError.value = ''
  copyState.value = ''
}

function setMode(mode: string): void {
  selectedMode.value = mode
  hasRun.value = false
  result.value = null
  previewDataUrl.value = ''
  previewError.value = ''
  copyState.value = ''
}

async function copyPayload(): Promise<void> {
  const payload = result.value?.previewPayload || result.value?.output || ''
  if (!payload || !import.meta.client) {
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(payload)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = payload
      textarea.setAttribute('readonly', 'readonly')
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    copyState.value = shellCopy.copiedLabel
  } catch {
    copyState.value = shellCopy.copyUnavailableLabel
  }
}

onMounted(() => {
  trackQRRouteEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_viewed')
})

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | QRRoute`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | QRRoute`,
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
      <span>{{ copy.shortName }}</span>
    </nav>

    <section class="hero" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span class="status">{{ shellCopy.localBadgeLabel }}</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

      <aside class="status-panel" :aria-label="shellCopy.pageStatusLabel">
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.liveTitle }}</strong>
            <span>{{ shellCopy.liveBody }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.gatedTitle }}</strong>
            <span>{{ shellCopy.gatedBody }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section class="tool-layout">
      <div>
        <section class="payload-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-summary`">
          <div class="payload-panel__topline">
            <h2 :id="`${tool.slug}-summary`">{{ shellCopy.payloadSummaryTitle }}</h2>
            <span class="status">{{ payloadStateTitle }}</span>
          </div>
          <p v-if="isRunning">{{ shellCopy.payloadRunningBody }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>
          <template v-else-if="payloadSummary">
            <span class="payload-label">{{ payloadSummary.label }}</span>
            <strong class="payload-value">{{ payloadSummary.value }}</strong>
            <dl v-if="payloadSummary.details.length" class="payload-details">
              <div v-for="item in payloadSummary.details" :key="`${item.label}-${item.value}`">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
          </template>
          <p v-else>{{ shellCopy.payloadEmptyBody }}</p>
        </section>

        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ shellCopy.inputTitle }}</h2>
          <p>{{ copy.description }}</p>
          <form class="utility-form" @submit.prevent="runTool">
            <div class="field">
              <span class="field-label">{{ shellCopy.modeTabsTitle }}</span>
              <div class="mode-tabs" role="list" :aria-label="copy.modeLabel">
                <button
                  v-for="mode in tool.modes"
                  :key="mode.value"
                  type="button"
                  :aria-pressed="selectedMode === mode.value"
                  @click="setMode(mode.value)"
                >
                  {{ mode.label }}
                </button>
              </div>
            </div>

            <div class="field">
              <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
              <textarea :id="`${tool.slug}-primary`" v-model="primaryInput" spellcheck="false"></textarea>
            </div>

            <div v-if="tool.acceptsSecondaryInput" class="field">
              <label :for="`${tool.slug}-secondary`">{{ copy.secondaryInputLabel }}</label>
              <textarea :id="`${tool.slug}-secondary`" v-model="secondaryInput" spellcheck="false"></textarea>
            </div>

            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit" :disabled="isRunning">
                {{ shellCopy.runLabel }}
              </button>
              <button :class="getButtonClass('secondary')" type="button" @click="resetExample">
                {{ shellCopy.resetLabel }}
              </button>
            </div>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
          <h2 :id="`${tool.slug}-result`">{{ resultTitle }}</h2>

          <p v-if="!hasRun">{{ shellCopy.privacyNote }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>

          <template v-else-if="result && result.ok">
            <div v-if="result.meta.length" class="result-meta">
              <div v-for="item in result.meta" :key="`${item.label}-${item.value}`">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>
            <pre class="result-output">{{ result.output }}</pre>
          </template>
        </section>

        <section class="preview-panel" :aria-labelledby="`${tool.slug}-preview`">
          <h2 :id="`${tool.slug}-preview`">{{ copy.previewLabel }}</h2>
          <p v-if="!hasRun">{{ shellCopy.previewEmpty }}</p>
          <p v-else-if="previewError" class="result-error">{{ previewError }}</p>
          <div v-else-if="previewDataUrl" class="preview-frame">
            <img :src="previewDataUrl" :alt="`${copy.title} ${copy.previewLabel}`">
          </div>
          <p v-else-if="result && result.ok">{{ shellCopy.previewError }}</p>
          <div v-if="previewDataUrl && result?.ok" class="preview-actions">
            <a class="button-link" :href="previewDataUrl" :download="previewDownloadName">
              {{ shellCopy.downloadSvgLabel }}
            </a>
            <button :class="getButtonClass('secondary')" type="button" @click="copyPayload">
              {{ copyState || shellCopy.copyPayloadLabel }}
            </button>
          </div>
        </section>
      </div>

      <aside class="tool-sidebar">
        <section class="band" :aria-labelledby="`${tool.slug}-scope`">
          <h2 :id="`${tool.slug}-scope`">{{ shellCopy.freeCheckLabel }}</h2>
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

        <section class="band" :aria-labelledby="`${tool.slug}-example`">
          <h2 :id="`${tool.slug}-example`">{{ shellCopy.exampleTitle }}</h2>
          <p>{{ shellCopy.exampleBody }}</p>
          <dl class="fact-list">
            <div>
              <dt>{{ copy.inputLabel }}</dt>
              <dd>{{ tool.samplePrimary }}</dd>
            </div>
            <div v-if="tool.acceptsSecondaryInput">
              <dt>{{ copy.secondaryInputLabel }}</dt>
              <dd>{{ tool.sampleSecondary }}</dd>
            </div>
          </dl>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-static-dynamic`">
          <h2 :id="`${tool.slug}-static-dynamic`">{{ shellCopy.staticDynamicTitle }}</h2>
          <p>{{ shellCopy.staticDynamicBody }}</p>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-gated`">
          <h2 :id="`${tool.slug}-gated`">{{ shellCopy.gatedTitle }}</h2>
          <p>{{ shellCopy.gatedBody }}</p>
          <h3>{{ shellCopy.gatedItemsTitle }}</h3>
          <ul class="gated-list">
            <li v-for="item in shellCopy.gatedItems" :key="item">{{ item }}</li>
          </ul>
        </section>
      </aside>
    </section>

    <section class="related-panel" :aria-labelledby="`${tool.slug}-related`">
      <div>
        <h2 :id="`${tool.slug}-related`">{{ shellCopy.relatedTitle }}</h2>
        <p>{{ shellCopy.relatedBody }}</p>
      </div>
      <div class="related-grid">
        <NuxtLink
          v-for="relatedTool in relatedTools"
          :key="relatedTool.slug"
          class="related-card"
          :to="localizedToolPath(locale, relatedTool.slug)"
        >
          <span>{{ getCategoryLabel(relatedTool.category, locale) }}</span>
          <strong>{{ getQrRouteToolCopy(relatedTool, locale).title }}</strong>
          <small>{{ shellCopy.openRelatedLabel }}</small>
        </NuxtLink>
      </div>
    </section>

    <section class="content-layout" :aria-labelledby="`${tool.slug}-guide`">
      <div>
        <h2 :id="`${tool.slug}-guide`">{{ shellCopy.guideTitle }}</h2>
        <article v-for="section in copy.contentSections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
        <section class="content-section" :aria-labelledby="`${tool.slug}-faq`">
          <h3 :id="`${tool.slug}-faq`">{{ shellCopy.faqTitle }}</h3>
          <div class="faq-list">
            <details v-for="item in copy.faq" :key="item.question">
              <summary>{{ item.question }}</summary>
              <p>{{ item.answer }}</p>
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
