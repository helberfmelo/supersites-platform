<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, ref, watch } from 'vue'
import { getShellCopy } from '../data/copy'
import { localizedToolPath, type LocaleCode } from '../data/locales'
import {
  createQrRoutePayloadSummary,
  getCategoryLabel,
  getQrRouteToolBySlug,
  getQrRouteToolCopy,
  qrRouteToolCatalog,
  type QrRouteToolDefinition,
  type QrRouteToolResult,
  type QrRouteToolSlug,
} from '../data/tools'
import { trackQRRouteEvent } from '../utils/analytics'
import { runQrRouteToolInWorker } from '../utils/qrrouteWorker'

const props = defineProps<{
  locale: LocaleCode
  initialSlug?: QrRouteToolSlug
}>()

const shellCopy = computed(() => getShellCopy(props.locale))
const selectedToolSlug = ref<QrRouteToolSlug>(props.initialSlug ?? 'static-qr-code')
const selectedTool = computed(() => getQrRouteToolBySlug(selectedToolSlug.value) ?? qrRouteToolCatalog[0])
const copy = computed(() => getQrRouteToolCopy(selectedTool.value, props.locale))
const selectedMode = ref('')
const primaryInput = ref('')
const secondaryInput = ref('')
const hasRun = ref(false)
const isRunning = ref(false)
const result = ref<QrRouteToolResult | null>(null)
const previewDataUrl = ref('')
const previewError = ref('')
const copyState = ref('')
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.value.invalidResultTitle : copy.value.resultLabel)
const payloadSummary = computed(() => createQrRoutePayloadSummary(selectedTool.value.slug, result.value))
const previewDownloadName = computed(() => `qrroute-${selectedTool.value.slug}-${selectedMode.value || 'preview'}.svg`)
const payloadStateTitle = computed(() => {
  if (isRunning.value) {
    return shellCopy.value.payloadRunningTitle
  }

  if (result.value?.ok === false) {
    return shellCopy.value.invalidResultTitle
  }

  if (payloadSummary.value) {
    return shellCopy.value.payloadReadyLabel
  }

  return shellCopy.value.payloadEmptyTitle
})

function applyToolSample(tool: QrRouteToolDefinition): void {
  selectedMode.value = tool.modes[0]?.value ?? ''
  primaryInput.value = tool.samplePrimary
  secondaryInput.value = tool.sampleSecondary
  hasRun.value = false
  result.value = null
  previewDataUrl.value = ''
  previewError.value = ''
  copyState.value = ''
}

watch(selectedTool, (tool) => applyToolSample(tool), { immediate: true })

function selectTool(slug: QrRouteToolSlug): void {
  selectedToolSlug.value = slug
}

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
        height: 96,
        margin: 16,
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
      width: 340,
    })
    previewDataUrl.value = svgDataUrl(svg)
  } catch {
    previewError.value = shellCopy.value.previewError
  }
}

async function runTool(): Promise<void> {
  const tool = selectedTool.value

  isRunning.value = true
  hasRun.value = true
  copyState.value = ''
  trackQRRouteEvent({
    toolSlug: tool.slug,
    locale: props.locale,
    routePath: localizedToolPath(props.locale, tool.slug),
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
      locale: props.locale,
      routePath: localizedToolPath(props.locale, tool.slug),
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
      locale: props.locale,
      routePath: localizedToolPath(props.locale, tool.slug),
    }, 'tool_failed')
  } finally {
    isRunning.value = false
  }
}

function resetExample(): void {
  applyToolSample(selectedTool.value)
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

    copyState.value = shellCopy.value.copiedLabel
  } catch {
    copyState.value = shellCopy.value.copyUnavailableLabel
  }
}
</script>

<template>
  <section class="tool-workbench" :aria-labelledby="`${selectedTool.slug}-workbench`">
    <div class="tool-workbench__header">
      <div>
        <p class="eyebrow">{{ shellCopy.workbenchEyebrow }}</p>
        <h2 :id="`${selectedTool.slug}-workbench`">{{ shellCopy.workbenchTitle }}</h2>
        <p>{{ shellCopy.workbenchBody }}</p>
      </div>
      <div class="privacy-strip" aria-label="Privacy">
        <strong>{{ shellCopy.privacyStripTitle }}</strong>
        <span>{{ shellCopy.privacyStripBody }}</span>
      </div>
    </div>

    <div class="tool-type-tabs" role="tablist" :aria-label="shellCopy.toolTabsTitle">
      <button
        v-for="candidate in qrRouteToolCatalog"
        :key="candidate.slug"
        type="button"
        role="tab"
        :aria-selected="selectedTool.slug === candidate.slug"
        @click="selectTool(candidate.slug)"
      >
        <span>{{ getCategoryLabel(candidate.category, locale) }}</span>
        <strong>{{ getQrRouteToolCopy(candidate, locale).shortName }}</strong>
      </button>
    </div>

    <div class="tool-workbench__grid">
      <section class="input-panel input-panel--workbench" :aria-labelledby="`${selectedTool.slug}-input`">
        <div class="payload-panel__topline">
          <div>
            <h2 :id="`${selectedTool.slug}-input`">{{ copy.title }}</h2>
            <p>{{ copy.description }}</p>
          </div>
          <span class="status">{{ shellCopy.localBadgeLabel }}</span>
        </div>

        <form class="utility-form" @submit.prevent="runTool">
          <div class="field">
            <span class="field-label">{{ shellCopy.modeTabsTitle }}</span>
            <div class="mode-tabs" role="list" :aria-label="copy.modeLabel">
              <button
                v-for="mode in selectedTool.modes"
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
            <label :for="`${selectedTool.slug}-primary`">{{ copy.inputLabel }}</label>
            <textarea :id="`${selectedTool.slug}-primary`" v-model="primaryInput" spellcheck="false"></textarea>
          </div>

          <div v-if="selectedTool.acceptsSecondaryInput" class="field">
            <label :for="`${selectedTool.slug}-secondary`">{{ copy.secondaryInputLabel }}</label>
            <textarea :id="`${selectedTool.slug}-secondary`" v-model="secondaryInput" spellcheck="false"></textarea>
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

      <section class="preview-panel preview-panel--dominant" :aria-labelledby="`${selectedTool.slug}-preview`">
        <div class="payload-panel__topline">
          <div>
            <h2 :id="`${selectedTool.slug}-preview`">{{ copy.previewLabel }}</h2>
            <p>{{ shellCopy.previewTrustBody }}</p>
          </div>
          <span class="status">{{ shellCopy.previewTrustTitle }}</span>
        </div>
        <p v-if="!hasRun">{{ shellCopy.previewEmpty }}</p>
        <p v-else-if="previewError" class="result-error">{{ previewError }}</p>
        <div v-else-if="previewDataUrl" class="preview-frame preview-frame--dominant">
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

      <section class="payload-panel payload-panel--workbench" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${selectedTool.slug}-summary`">
        <div class="payload-panel__topline">
          <h2 :id="`${selectedTool.slug}-summary`">{{ shellCopy.payloadSummaryTitle }}</h2>
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

      <section class="result-panel result-panel--workbench" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${selectedTool.slug}-result`">
        <h2 :id="`${selectedTool.slug}-result`">{{ resultTitle }}</h2>

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

      <aside class="band upgrade-panel" :aria-labelledby="`${selectedTool.slug}-dynamic`">
        <h2 :id="`${selectedTool.slug}-dynamic`">{{ shellCopy.staticDynamicTitle }}</h2>
        <p>{{ shellCopy.staticDynamicBody }}</p>
        <h3>{{ shellCopy.gatedItemsTitle }}</h3>
        <ul class="gated-list">
          <li v-for="item in shellCopy.gatedItems" :key="item">{{ item }}</li>
        </ul>
      </aside>
    </div>
  </section>
</template>
