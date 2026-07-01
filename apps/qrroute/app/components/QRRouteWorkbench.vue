<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getShellCopy } from '../data/copy'
import { localizedToolPath, type LocaleCode } from '../data/locales'
import {
  createQrRoutePayloadSummary,
  getCategoryLabel,
  getQrRouteToolBySlug,
  getQrRouteToolCopy,
  getQrRouteToolModes,
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

type BarcodeSize = 'compact' | 'standard' | 'large'
type UtmPreset = 'newsletter' | 'social' | 'launch'

const shellCopy = computed(() => getShellCopy(props.locale))
const selectedToolSlug = ref<QrRouteToolSlug>(props.initialSlug ?? 'static-qr-code')
const selectedTool = computed(() => getQrRouteToolBySlug(selectedToolSlug.value) ?? qrRouteToolCatalog[0])
const toolModes = computed(() => getQrRouteToolModes(selectedTool.value, props.locale))
const copy = computed(() => getQrRouteToolCopy(selectedTool.value, props.locale))
const selectedMode = ref('')
const primaryInput = ref('')
const secondaryInput = ref('')
const staticLabel = ref('')
const barcodeLabel = ref('')
const barcodeSize = ref<BarcodeSize>('standard')
const utmBaseUrl = ref('')
const utmSource = ref('')
const utmMedium = ref('')
const utmCampaign = ref('')
const utmTerm = ref('')
const utmContent = ref('')
const vcardName = ref('')
const vcardOrg = ref('')
const vcardPhone = ref('')
const vcardEmail = ref('')
const vcardWebsite = ref('')
const wifiSsid = ref('')
const wifiKey = ref('')
const wifiHidden = ref(false)
const wifiRevealKey = ref(false)
const previewContext = ref('')
const hasRun = ref(false)
const isRunning = ref(false)
const result = ref<QrRouteToolResult | null>(null)
const previewDataUrl = ref('')
const previewPngDataUrl = ref('')
const previewError = ref('')
const copyState = ref('')
const isMounted = ref(false)
let autoRunTimer: ReturnType<typeof setTimeout> | null = null
let runSequence = 0

const resultTitle = computed(() => result.value?.ok === false ? shellCopy.value.invalidResultTitle : copy.value.resultLabel)
const payloadSummary = computed(() => createQrRoutePayloadSummary(selectedTool.value.slug, result.value))
const fileBaseName = computed(() => `qrroute-${selectedTool.value.slug}-${selectedMode.value || 'preview'}`)
const previewDownloadName = computed(() => `${fileBaseName.value}.svg`)
const previewPngDownloadName = computed(() => `${fileBaseName.value}.png`)
const isWifiKeyRequired = computed(() => selectedTool.value.slug === 'wifi-qr' && selectedMode.value !== 'nopass')
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
const barcodeSizeOptions = computed<Array<{ value: BarcodeSize; label: string }>>(() => [
  { value: 'compact', label: shellCopy.value.barcodeSizeCompact },
  { value: 'standard', label: shellCopy.value.barcodeSizeStandard },
  { value: 'large', label: shellCopy.value.barcodeSizeLarge },
])
const utmPresets = computed<Array<{ value: UtmPreset; label: string }>>(() => [
  { value: 'newsletter', label: shellCopy.value.utmPresetNewsletter },
  { value: 'social', label: shellCopy.value.utmPresetSocial },
  { value: 'launch', label: shellCopy.value.utmPresetLaunch },
])
const autoRunSignature = computed(() => JSON.stringify({
  slug: selectedTool.value.slug,
  mode: selectedMode.value,
  primary: primaryInput.value,
  secondary: secondaryInput.value,
  staticLabel: staticLabel.value,
  barcodeLabel: barcodeLabel.value,
  barcodeSize: barcodeSize.value,
  utmBaseUrl: utmBaseUrl.value,
  utmSource: utmSource.value,
  utmMedium: utmMedium.value,
  utmCampaign: utmCampaign.value,
  utmTerm: utmTerm.value,
  utmContent: utmContent.value,
  vcardName: vcardName.value,
  vcardOrg: vcardOrg.value,
  vcardPhone: vcardPhone.value,
  vcardEmail: vcardEmail.value,
  vcardWebsite: vcardWebsite.value,
  wifiSsid: wifiSsid.value,
  wifiKey: wifiKey.value,
  wifiHidden: wifiHidden.value,
  previewContext: previewContext.value,
}))

function clearOutput(): void {
  hasRun.value = false
  result.value = null
  previewDataUrl.value = ''
  previewPngDataUrl.value = ''
  previewError.value = ''
  copyState.value = ''
}

function parseKeyValueLines(value: string): Record<string, string> {
  const fields: Record<string, string> = {}

  for (const rawLine of value.split(/\n|&|;/u)) {
    const line = rawLine.trim()
    if (!line) {
      continue
    }

    const [rawKey, ...rawValueParts] = line.split('=')
    const key = rawKey.trim().toLowerCase()
    if (!key) {
      continue
    }

    fields[key] = rawValueParts.join('=').trim()
  }

  return fields
}

function applyToolSample(tool: QrRouteToolDefinition): void {
  selectedMode.value = tool.modes[0]?.value ?? ''
  primaryInput.value = tool.samplePrimary
  secondaryInput.value = tool.sampleSecondary
  staticLabel.value = tool.slug === 'static-qr-code' ? tool.sampleSecondary : ''
  barcodeLabel.value = tool.slug === 'barcode-generator' ? tool.sampleSecondary : ''
  barcodeSize.value = 'standard'
  previewContext.value = tool.slug === 'preview-lab' ? tool.sampleSecondary : ''

  const utmFields = tool.slug === 'utm-builder' ? parseKeyValueLines(tool.sampleSecondary) : {}
  utmBaseUrl.value = tool.slug === 'utm-builder' ? tool.samplePrimary : ''
  utmSource.value = utmFields.source ?? utmFields.utm_source ?? ''
  utmMedium.value = utmFields.medium ?? utmFields.utm_medium ?? ''
  utmCampaign.value = utmFields.campaign ?? utmFields.utm_campaign ?? ''
  utmTerm.value = utmFields.term ?? utmFields.utm_term ?? ''
  utmContent.value = utmFields.content ?? utmFields.utm_content ?? ''

  const vcardLines = tool.slug === 'vcard-qr'
    ? tool.samplePrimary.split('\n').map((line) => line.trim())
    : []
  vcardName.value = vcardLines[0] ?? ''
  vcardOrg.value = vcardLines[1] ?? ''
  vcardEmail.value = vcardLines[2] ?? ''
  vcardPhone.value = vcardLines[3] ?? ''
  vcardWebsite.value = vcardLines[4] ?? ''

  const wifiOptions = tool.slug === 'wifi-qr' ? parseKeyValueLines(tool.sampleSecondary) : {}
  wifiSsid.value = tool.slug === 'wifi-qr' ? tool.samplePrimary : ''
  wifiKey.value = wifiOptions.key ?? wifiOptions.passphrase ?? ''
  wifiHidden.value = ['true', '1', 'yes'].includes((wifiOptions.hidden ?? 'false').toLowerCase())
  wifiRevealKey.value = false

  clearOutput()
}

watch(selectedTool, (tool) => applyToolSample(tool), { immediate: true })

watch(autoRunSignature, () => {
  scheduleAutoRun()
})

onMounted(() => {
  isMounted.value = true
  scheduleAutoRun(40)
})

onBeforeUnmount(() => {
  if (autoRunTimer) {
    clearTimeout(autoRunTimer)
  }
})

function selectTool(slug: QrRouteToolSlug): void {
  selectedToolSlug.value = slug
}

function setMode(mode: string): void {
  selectedMode.value = mode
}

function applyUtmPreset(preset: UtmPreset): void {
  const presets: Record<UtmPreset, { source: string; medium: string; campaign: string; term: string; content: string }> = {
    newsletter: {
      source: 'newsletter',
      medium: 'email',
      campaign: 'monthly-update',
      term: '',
      content: 'hero-cta',
    },
    social: {
      source: 'social',
      medium: 'organic',
      campaign: 'qr-tools',
      term: '',
      content: 'profile-link',
    },
    launch: {
      source: 'launch',
      medium: 'owned',
      campaign: 'product-launch',
      term: 'qr-generator',
      content: 'poster',
    },
  }
  const selected = presets[preset]

  utmSource.value = selected.source
  utmMedium.value = selected.medium
  utmCampaign.value = selected.campaign
  utmTerm.value = selected.term
  utmContent.value = selected.content
}

function buildUtmSecondaryInput(): string {
  return [
    ['source', utmSource.value],
    ['medium', utmMedium.value],
    ['campaign', utmCampaign.value],
    ['term', utmTerm.value],
    ['content', utmContent.value],
  ]
    .filter(([, value]) => value.trim())
    .map(([key, value]) => `${key}=${value.trim()}`)
    .join('\n')
}

function buildExecutionInput(): { primaryInput: string; secondaryInput: string; mode: string } {
  if (selectedTool.value.slug === 'static-qr-code') {
    return {
      primaryInput: primaryInput.value,
      secondaryInput: staticLabel.value,
      mode: selectedMode.value,
    }
  }

  if (selectedTool.value.slug === 'barcode-generator') {
    return {
      primaryInput: primaryInput.value,
      secondaryInput: [
        barcodeLabel.value.trim() ? `label=${barcodeLabel.value.trim()}` : '',
        `size=${barcodeSize.value}`,
      ].filter(Boolean).join('\n'),
      mode: selectedMode.value,
    }
  }

  if (selectedTool.value.slug === 'utm-builder') {
    return {
      primaryInput: utmBaseUrl.value,
      secondaryInput: buildUtmSecondaryInput(),
      mode: selectedMode.value,
    }
  }

  if (selectedTool.value.slug === 'vcard-qr') {
    return {
      primaryInput: [
        vcardName.value,
        vcardOrg.value,
        vcardEmail.value,
        vcardPhone.value,
        vcardWebsite.value,
      ].join('\n'),
      secondaryInput: secondaryInput.value,
      mode: selectedMode.value,
    }
  }

  if (selectedTool.value.slug === 'wifi-qr') {
    return {
      primaryInput: wifiSsid.value,
      secondaryInput: [
        `key=${wifiKey.value}`,
        `hidden=${wifiHidden.value ? 'true' : 'false'}`,
      ].join('\n'),
      mode: selectedMode.value,
    }
  }

  if (selectedTool.value.slug === 'preview-lab') {
    return {
      primaryInput: primaryInput.value,
      secondaryInput: previewContext.value,
      mode: selectedMode.value,
    }
  }

  return {
    primaryInput: primaryInput.value,
    secondaryInput: secondaryInput.value,
    mode: selectedMode.value,
  }
}

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function svgDimension(svg: string, name: 'width' | 'height', fallback: number): number {
  const match = svg.match(new RegExp(`${name}="([^"]+)"`, 'u'))
  const parsed = match ? Number.parseFloat(match[1]) : Number.NaN

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

async function svgToPngDataUrl(svg: string): Promise<string> {
  return await new Promise((resolve, reject) => {
    const image = new Image()
    const width = Math.ceil(svgDimension(svg, 'width', 720))
    const height = Math.ceil(svgDimension(svg, 'height', 720))

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const scale = 2
      canvas.width = width * scale
      canvas.height = height * scale
      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Canvas unavailable.'))
        return
      }

      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.scale(scale, scale)
      context.drawImage(image, 0, 0, width, height)
      resolve(canvas.toDataURL('image/png'))
    }
    image.onerror = () => reject(new Error('SVG image conversion failed.'))
    image.src = svgDataUrl(svg)
  })
}

async function setPreviewSvg(svg: string): Promise<void> {
  previewDataUrl.value = svgDataUrl(svg)

  try {
    previewPngDataUrl.value = await svgToPngDataUrl(svg)
  } catch {
    previewPngDataUrl.value = ''
  }
}

async function renderPreview(nextResult: QrRouteToolResult | null): Promise<void> {
  previewDataUrl.value = ''
  previewPngDataUrl.value = ''
  previewError.value = ''

  if (!nextResult?.ok || !nextResult.previewPayload || !import.meta.client) {
    return
  }

  try {
    if (nextResult.previewKind === 'barcode') {
      const sizeMap: Record<BarcodeSize, { height: number; width: number; fontSize: number }> = {
        compact: { height: 64, width: 1.6, fontSize: 13 },
        standard: { height: 96, width: 2, fontSize: 16 },
        large: { height: 132, width: 2.5, fontSize: 18 },
      }
      const settings = sizeMap[barcodeSize.value]
      const { default: JsBarcode } = await import('jsbarcode')
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      JsBarcode(svg, nextResult.previewPayload, {
        format: 'CODE128',
        displayValue: true,
        text: barcodeLabel.value.trim() || nextResult.previewPayload,
        font: 'monospace',
        fontSize: settings.fontSize,
        height: settings.height,
        margin: 16,
        width: settings.width,
      })
      await setPreviewSvg(new XMLSerializer().serializeToString(svg))
      return
    }

    const QRCode = await import('qrcode')
    const svg = await QRCode.toString(nextResult.previewPayload, {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: 'M',
      width: 360,
    })
    await setPreviewSvg(svg)
  } catch {
    previewError.value = shellCopy.value.previewError
  }
}

async function runTool(options: { track?: boolean } = { track: true }): Promise<void> {
  const tool = selectedTool.value
  const executionInput = buildExecutionInput()
  const shouldTrack = options.track !== false
  const currentRun = ++runSequence

  isRunning.value = true
  hasRun.value = true
  copyState.value = ''

  if (shouldTrack) {
    trackQRRouteEvent({
      toolSlug: tool.slug,
      locale: props.locale,
      routePath: localizedToolPath(props.locale, tool.slug),
    }, 'tool_started')
  }

  try {
    const nextResult = await runQrRouteToolInWorker({
      slug: tool.slug,
      primaryInput: executionInput.primaryInput,
      secondaryInput: executionInput.secondaryInput,
      mode: executionInput.mode,
    })

    if (currentRun !== runSequence) {
      return
    }

    result.value = nextResult
    await renderPreview(nextResult)

    if (shouldTrack) {
      trackQRRouteEvent({
        toolSlug: tool.slug,
        locale: props.locale,
        routePath: localizedToolPath(props.locale, tool.slug),
      }, nextResult.ok ? 'tool_completed' : 'tool_failed')
    }
  } catch (error) {
    if (currentRun !== runSequence) {
      return
    }

    result.value = {
      ok: false,
      output: '',
      meta: [],
      previewKind: 'text',
      previewPayload: '',
      error: error instanceof Error ? error.message : 'Tool execution failed.',
    }
    await renderPreview(result.value)
    if (shouldTrack) {
      trackQRRouteEvent({
        toolSlug: tool.slug,
        locale: props.locale,
        routePath: localizedToolPath(props.locale, tool.slug),
      }, 'tool_failed')
    }
  } finally {
    if (currentRun === runSequence) {
      isRunning.value = false
    }
  }
}

function scheduleAutoRun(delay = 320): void {
  if (!import.meta.client || !isMounted.value) {
    return
  }

  if (autoRunTimer) {
    clearTimeout(autoRunTimer)
  }

  autoRunTimer = setTimeout(() => {
    void runTool({ track: false })
  }, delay)
}

function resetExample(): void {
  applyToolSample(selectedTool.value)
  scheduleAutoRun(40)
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

function printPreview(): void {
  if (!import.meta.client || !previewDataUrl.value) {
    return
  }

  const printWindow = window.open('', '_blank', 'width=720,height=820')
  if (!printWindow) {
    copyState.value = shellCopy.value.printUnavailableLabel
    return
  }

  printWindow.document.write(`<!doctype html><html><head><title>${fileBaseName.value}</title><style>body{margin:0;display:grid;min-height:100vh;place-items:center;background:#fff;font-family:sans-serif}img{max-width:min(90vw,620px);height:auto}</style></head><body><img src="${previewDataUrl.value}" alt="${fileBaseName.value}"></body></html>`)
  printWindow.document.close()
  printWindow.focus()
  window.setTimeout(() => printWindow.print(), 240)
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

        <form class="utility-form" @submit.prevent="runTool({ track: true })">
          <div class="field">
            <span class="field-label">{{ shellCopy.modeTabsTitle }}</span>
            <div class="mode-tabs" role="list" :aria-label="copy.modeLabel">
              <button
                v-for="mode in toolModes"
                :key="mode.value"
                type="button"
                :aria-pressed="selectedMode === mode.value"
                @click="setMode(mode.value)"
              >
                {{ mode.label }}
              </button>
            </div>
          </div>

          <template v-if="selectedTool.slug === 'static-qr-code'">
            <div class="field">
              <label :for="`${selectedTool.slug}-primary`">{{ copy.inputLabel }}</label>
              <textarea :id="`${selectedTool.slug}-primary`" v-model="primaryInput" spellcheck="false"></textarea>
            </div>
            <div class="field">
              <label :for="`${selectedTool.slug}-label`">{{ shellCopy.staticOptionalLabel }}</label>
              <input :id="`${selectedTool.slug}-label`" v-model="staticLabel" type="text" autocomplete="off">
            </div>
          </template>

          <template v-else-if="selectedTool.slug === 'barcode-generator'">
            <div class="field">
              <label :for="`${selectedTool.slug}-primary`">{{ shellCopy.barcodeValueLabel }}</label>
              <input :id="`${selectedTool.slug}-primary`" v-model="primaryInput" type="text" spellcheck="false" autocomplete="off">
            </div>
            <div class="field">
              <label :for="`${selectedTool.slug}-label`">{{ shellCopy.barcodeLabelLabel }}</label>
              <input :id="`${selectedTool.slug}-label`" v-model="barcodeLabel" type="text" autocomplete="off">
            </div>
            <div class="field">
              <span class="field-label">{{ shellCopy.barcodeSizeLabel }}</span>
              <div class="mode-tabs" role="list" :aria-label="shellCopy.barcodeSizeLabel">
                <button
                  v-for="size in barcodeSizeOptions"
                  :key="size.value"
                  type="button"
                  :aria-pressed="barcodeSize === size.value"
                  @click="barcodeSize = size.value"
                >
                  {{ size.label }}
                </button>
              </div>
            </div>
          </template>

          <template v-else-if="selectedTool.slug === 'utm-builder'">
            <div class="field">
              <label :for="`${selectedTool.slug}-base`">{{ copy.inputLabel }}</label>
              <input :id="`${selectedTool.slug}-base`" v-model="utmBaseUrl" type="url" spellcheck="false" autocomplete="url">
            </div>
            <div class="field-group field-group--two">
              <div class="field">
                <label :for="`${selectedTool.slug}-source`">{{ shellCopy.utmSourceLabel }}</label>
                <input :id="`${selectedTool.slug}-source`" v-model="utmSource" type="text" autocomplete="off">
              </div>
              <div class="field">
                <label :for="`${selectedTool.slug}-medium`">{{ shellCopy.utmMediumLabel }}</label>
                <input :id="`${selectedTool.slug}-medium`" v-model="utmMedium" type="text" autocomplete="off">
              </div>
              <div class="field">
                <label :for="`${selectedTool.slug}-campaign`">{{ shellCopy.utmCampaignLabel }}</label>
                <input :id="`${selectedTool.slug}-campaign`" v-model="utmCampaign" type="text" autocomplete="off">
              </div>
              <div class="field">
                <label :for="`${selectedTool.slug}-term`">{{ shellCopy.utmTermLabel }}</label>
                <input :id="`${selectedTool.slug}-term`" v-model="utmTerm" type="text" autocomplete="off">
              </div>
              <div class="field field--wide">
                <label :for="`${selectedTool.slug}-content`">{{ shellCopy.utmContentLabel }}</label>
                <input :id="`${selectedTool.slug}-content`" v-model="utmContent" type="text" autocomplete="off">
              </div>
            </div>
            <div class="field">
              <span class="field-label">{{ shellCopy.utmPresetTitle }}</span>
              <div class="mode-tabs" role="list" :aria-label="shellCopy.utmPresetTitle">
                <button
                  v-for="preset in utmPresets"
                  :key="preset.value"
                  type="button"
                  @click="applyUtmPreset(preset.value)"
                >
                  {{ preset.label }}
                </button>
              </div>
            </div>
          </template>

          <template v-else-if="selectedTool.slug === 'vcard-qr'">
            <div class="field-group field-group--two">
              <div class="field">
                <label :for="`${selectedTool.slug}-name`">{{ shellCopy.vcardNameLabel }}</label>
                <input :id="`${selectedTool.slug}-name`" v-model="vcardName" type="text" autocomplete="name">
              </div>
              <div class="field">
                <label :for="`${selectedTool.slug}-org`">{{ shellCopy.vcardOrgLabel }}</label>
                <input :id="`${selectedTool.slug}-org`" v-model="vcardOrg" type="text" autocomplete="organization">
              </div>
              <div class="field">
                <label :for="`${selectedTool.slug}-phone`">{{ shellCopy.vcardPhoneLabel }}</label>
                <input :id="`${selectedTool.slug}-phone`" v-model="vcardPhone" type="tel" autocomplete="tel">
              </div>
              <div class="field">
                <label :for="`${selectedTool.slug}-email`">{{ shellCopy.vcardEmailLabel }}</label>
                <input :id="`${selectedTool.slug}-email`" v-model="vcardEmail" type="email" autocomplete="email">
              </div>
              <div class="field field--wide">
                <label :for="`${selectedTool.slug}-website`">{{ shellCopy.vcardWebsiteLabel }}</label>
                <input :id="`${selectedTool.slug}-website`" v-model="vcardWebsite" type="url" autocomplete="url">
              </div>
            </div>
          </template>

          <template v-else-if="selectedTool.slug === 'wifi-qr'">
            <div class="field">
              <label :for="`${selectedTool.slug}-ssid`">{{ shellCopy.wifiSsidLabel }}</label>
              <input :id="`${selectedTool.slug}-ssid`" v-model="wifiSsid" type="text" autocomplete="off">
            </div>
            <div v-if="isWifiKeyRequired" class="field network-key-field">
              <label :for="`${selectedTool.slug}-network-key`">{{ shellCopy.wifiPasswordLabel }}</label>
              <div class="inline-input-action">
                <input
                  :id="`${selectedTool.slug}-network-key`"
                  v-model="wifiKey"
                  :type="wifiRevealKey ? 'text' : 'password'"
                  autocomplete="off"
                >
                <button :class="getButtonClass('secondary')" type="button" @click="wifiRevealKey = !wifiRevealKey">
                  {{ wifiRevealKey ? shellCopy.wifiHidePasswordLabel : shellCopy.wifiShowPasswordLabel }}
                </button>
              </div>
            </div>
            <label class="check-row">
              <input v-model="wifiHidden" type="checkbox">
              <span>{{ shellCopy.wifiHiddenLabel }}</span>
            </label>
          </template>

          <template v-else>
            <div class="field">
              <label :for="`${selectedTool.slug}-primary`">{{ shellCopy.previewPayloadLabel }}</label>
              <textarea :id="`${selectedTool.slug}-primary`" v-model="primaryInput" spellcheck="false"></textarea>
            </div>
            <div class="field">
              <label :for="`${selectedTool.slug}-context`">{{ shellCopy.previewContextLabel }}</label>
              <input :id="`${selectedTool.slug}-context`" v-model="previewContext" type="text" autocomplete="off">
            </div>
          </template>

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
          <a v-if="previewPngDataUrl" class="button-link button-link--secondary" :href="previewPngDataUrl" :download="previewPngDownloadName">
            {{ shellCopy.downloadPngLabel }}
          </a>
          <button :class="getButtonClass('secondary')" type="button" @click="copyPayload">
            {{ copyState || shellCopy.copyPayloadLabel }}
          </button>
          <button :class="getButtonClass('secondary')" type="button" @click="printPreview">
            {{ shellCopy.printLabel }}
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

      <aside class="band advanced-panel" :aria-labelledby="`${selectedTool.slug}-dynamic`">
        <h2 :id="`${selectedTool.slug}-dynamic`">{{ shellCopy.staticDynamicTitle }}</h2>
        <p>{{ shellCopy.staticDynamicBody }}</p>
        <h3>{{ shellCopy.advancedItemsTitle }}</h3>
        <ul class="advanced-list">
          <li v-for="item in shellCopy.advancedItems" :key="item">{{ item }}</li>
        </ul>
      </aside>
    </div>
  </section>
</template>
