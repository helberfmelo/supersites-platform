<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createToolStructuredData,
  getCategoryLabel,
  getRelatedTools,
  getToolBySlug,
  getToolCopy,
  type ToolResult,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackDevUtilityEvent } from '../../../utils/analytics'
import { runToolInWorker } from '../../../utils/toolWorker'

type StructuredAction = 'format' | 'minify' | 'validate'
type StructuredView = 'raw' | 'tree' | 'table'
type DiffView = 'unified' | 'split'

interface KeyValueRow {
  label: string
  value: string
}

interface DiffRow {
  kind: 'added' | 'removed' | 'unchanged'
  text: string
}

interface RegexMatchRow {
  index: number
  match: string
  groups: string[]
}

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
const selectedMode = ref(tool.modes[0]?.value ?? '')
const primaryInput = ref(tool.samplePrimary)
const secondaryInput = ref(tool.sampleSecondary)
const hasRun = ref(false)
const isRunning = ref(false)
const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
const result = ref<ToolResult | null>(null)
const relatedTools = getRelatedTools(tool)
const structuredAction = ref<StructuredAction>('format')
const structuredView = ref<StructuredView>('raw')
const diffView = ref<DiffView>('unified')
const selectedTimezone = ref('UTC')

const isStructuredFormatter = computed(() => tool.slug === 'structured-data-formatter')
const isBase64Converter = computed(() => tool.slug === 'base64-converter')
const isJwtInspector = computed(() => tool.slug === 'jwt-inspector')
const isRegexTester = computed(() => tool.slug === 'regex-tester')
const isTextDiff = computed(() => tool.slug === 'text-diff')
const isCronHelper = computed(() => tool.slug === 'cron-helper')
const isUuidGenerator = computed(() => tool.slug === 'uuid-generator')
const isTimestampConverter = computed(() => tool.slug === 'timestamp-converter')
const isHashGenerator = computed(() => tool.slug === 'hash-generator')

const resultTitle = computed(() => {
  if (isRunning.value) {
    return shellCopy.runningResultTitle
  }

  if (!hasRun.value) {
    return shellCopy.emptyResultTitle
  }

  return result.value?.ok === false ? shellCopy.invalidResultTitle : shellCopy.successResultTitle
})

const resultBody = computed(() => {
  if (isRunning.value) {
    return shellCopy.runningResultBody
  }

  if (!hasRun.value) {
    return shellCopy.emptyResultBody
  }

  if (result.value?.ok) {
    return shellCopy.successResultBody
  }

  return result.value?.error ?? ''
})

const resultOutput = computed(() => result.value?.ok ? result.value.output : '')

const resultStats = computed(() => {
  const output = resultOutput.value
  if (!output) {
    return []
  }

  return [
    { label: 'Characters', value: output.length.toLocaleString('en-US') },
    { label: 'Lines', value: Math.max(output.split(/\r?\n/u).length, 1).toLocaleString('en-US') },
  ]
})

const workbenchStats = computed(() => {
  const inputCharacters = [primaryInput.value, secondaryInput.value]
    .filter(Boolean)
    .reduce((sum, value) => sum + value.length, 0)

  const stats = [
    { label: 'Input characters', value: inputCharacters.toLocaleString('en-US') },
    { label: 'Mode', value: selectedMode.value || 'default' },
  ]

  if (isBase64Converter.value) {
    stats.push({ label: 'Input bytes', value: byteLength(primaryInput.value).toLocaleString('en-US') })
  }

  if (isUuidGenerator.value) {
    stats.push({ label: 'Limit', value: '1-50' })
  }

  return stats
})

const structuredTabs = computed(() => [
  { value: 'raw' as const, label: 'Raw' },
  { value: 'tree' as const, label: 'Tree' },
  { value: 'table' as const, label: 'Table' },
])

const structuredTreeRows = computed(() => buildTreeRows(resultOutput.value))
const structuredTableRows = computed(() => buildTableRows(resultOutput.value))

const base64Facts = computed<KeyValueRow[]>(() => {
  const facts = [
    { label: 'Input bytes', value: byteLength(primaryInput.value).toLocaleString('en-US') },
    { label: 'Output bytes', value: resultOutput.value ? byteLength(resultOutput.value).toLocaleString('en-US') : '0' },
  ]

  if (selectedMode.value === 'decode') {
    facts.push({
      label: 'UTF-8 validation',
      value: result.value?.ok ? 'Valid decoded text' : 'Waiting for decode',
    })
  } else {
    facts.push({ label: 'UTF-8 validation', value: 'Source text is encoded as UTF-8' })
  }

  return facts
})

const jwtPreview = computed(() => parseJwtParts(primaryInput.value))
const jwtClaims = computed<KeyValueRow[]>(() => {
  const payload = jwtPreview.value.payloadObject
  if (!payload) {
    return []
  }

  return ['sub', 'iss', 'aud', 'iat', 'exp']
    .filter((claim) => Object.prototype.hasOwnProperty.call(payload, claim))
    .map((claim) => ({
      label: claim,
      value: formatJwtClaim(claim, payload[claim]),
    }))
})

const regexMatches = computed<RegexMatchRow[]>(() => {
  if (!result.value?.ok || !isRegexTester.value) {
    return []
  }

  return collectRegexMatches(primaryInput.value, secondaryInput.value, selectedMode.value)
})

const diffRows = computed<DiffRow[]>(() => parseDiffRows(resultOutput.value))
const diffSummary = computed<KeyValueRow[]>(() => {
  const rows = diffRows.value
  return [
    { label: 'Added', value: rows.filter((row) => row.kind === 'added').length.toLocaleString('en-US') },
    { label: 'Removed', value: rows.filter((row) => row.kind === 'removed').length.toLocaleString('en-US') },
    { label: 'Unchanged', value: rows.filter((row) => row.kind === 'unchanged').length.toLocaleString('en-US') },
  ]
})

const cronRuns = computed(() => resultOutput.value
  .split(/\r?\n/u)
  .filter((line) => line.startsWith('- '))
  .map((line) => line.slice(2)))

const timestampRows = computed<KeyValueRow[]>(() => {
  const date = parseDateInput(primaryInput.value)
  if (!date) {
    return []
  }

  return [
    { label: 'UTC', value: date.toUTCString() },
    { label: 'Local', value: date.toString() },
    { label: selectedTimezone.value, value: formatInTimezone(date, selectedTimezone.value) },
    { label: 'Unix seconds', value: Math.floor(date.getTime() / 1000).toString() },
    { label: 'Unix milliseconds', value: date.getTime().toString() },
    { label: 'ISO', value: date.toISOString() },
  ]
})

const hashWarning = computed(() => {
  if (!isHashGenerator.value) {
    return ''
  }

  if (selectedMode.value === 'SHA-1') {
    return 'SHA-1 is shown for legacy comparison and is not recommended for security-sensitive use.'
  }

  return 'MD5 is not offered here because Web Crypto does not support it; use SHA-256 or SHA-512 for new work.'
})

onMounted(() => {
  if (isTimestampConverter.value) {
    primaryInput.value = Math.floor(Date.now() / 1000).toString()
  }

  if (isUuidGenerator.value) {
    void executeRun({ track: false })
  }
})

async function runTool(): Promise<void> {
  await executeRun()
}

async function executeRun(options: { track?: boolean } = {}): Promise<void> {
  const shouldTrack = options.track ?? true

  isRunning.value = true
  hasRun.value = true
  copyState.value = 'idle'
  structuredView.value = 'raw'

  if (shouldTrack) {
    trackDevUtilityEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'tool_started')
  }

  try {
    const workerResult = await runToolInWorker({
      slug: tool.slug,
      primaryInput: primaryInput.value,
      secondaryInput: secondaryInput.value,
      mode: selectedMode.value,
    })

    result.value = applyToolPresentation(workerResult)

    if (shouldTrack) {
      trackDevUtilityEvent({
        toolSlug: tool.slug,
        locale,
        routePath: canonicalPath,
      }, result.value.ok ? 'tool_completed' : 'tool_failed')
    }
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Tool execution failed.',
    }

    if (shouldTrack) {
      trackDevUtilityEvent({
        toolSlug: tool.slug,
        locale,
        routePath: canonicalPath,
      }, 'tool_failed')
    }
  } finally {
    isRunning.value = false
  }
}

function applyToolPresentation(workerResult: ToolResult): ToolResult {
  if (!isStructuredFormatter.value || !workerResult.ok) {
    return workerResult
  }

  try {
    if (structuredAction.value === 'minify') {
      return {
        ...workerResult,
        output: minifyStructuredInput(primaryInput.value, selectedMode.value),
        meta: [...workerResult.meta, { label: 'Action', value: 'Minify' }],
      }
    }

    if (structuredAction.value === 'validate') {
      return {
        ...workerResult,
        output: `Valid ${selectedMode.value.toUpperCase()} input.\n\n${workerResult.output}`,
        meta: [...workerResult.meta, { label: 'Action', value: 'Validate' }],
      }
    }

    return {
      ...workerResult,
      meta: [...workerResult.meta, { label: 'Action', value: 'Format' }],
    }
  } catch (error) {
    return {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Structured data action failed.',
    }
  }
}

function resetExample(): void {
  selectedMode.value = tool.modes[0]?.value ?? ''
  primaryInput.value = isTimestampConverter.value ? Math.floor(Date.now() / 1000).toString() : tool.samplePrimary
  secondaryInput.value = tool.sampleSecondary
  hasRun.value = false
  result.value = null
  copyState.value = 'idle'
  structuredAction.value = 'format'
  structuredView.value = 'raw'
  diffView.value = 'unified'
}

function clearInputs(): void {
  primaryInput.value = ''
  secondaryInput.value = ''
  hasRun.value = false
  result.value = null
  copyState.value = 'idle'
  structuredView.value = 'raw'
}

async function runStructuredAction(action: StructuredAction): Promise<void> {
  structuredAction.value = action
  await executeRun()
}

async function runBase64(mode: string): Promise<void> {
  selectedMode.value = mode
  await executeRun()
}

function swapBase64(): void {
  if (resultOutput.value) {
    primaryInput.value = resultOutput.value
  }
  selectedMode.value = selectedMode.value === 'decode' ? 'encode' : 'decode'
  result.value = null
  hasRun.value = false
}

async function copyPattern(): Promise<void> {
  await copyText(primaryInput.value)
}

async function copyResult(): Promise<void> {
  await copyText(resultOutput.value)
}

async function copyText(value: string): Promise<void> {
  if (!value) {
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
    } else {
      const scratch = document.createElement('textarea')
      scratch.value = value
      scratch.setAttribute('readonly', 'true')
      scratch.style.position = 'fixed'
      scratch.style.left = '-9999px'
      document.body.appendChild(scratch)
      scratch.select()
      document.execCommand('copy')
      document.body.removeChild(scratch)
    }
    copyState.value = 'copied'
  } catch {
    copyState.value = 'failed'
  }
}

function downloadResult(): void {
  if (!resultOutput.value) {
    return
  }

  const blob = new Blob([resultOutput.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${tool.slug}-${selectedMode.value || 'result'}.txt`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

function byteLength(value: string): number {
  return new TextEncoder().encode(value).length
}

function minifyStructuredInput(input: string, mode: string): string {
  if (mode === 'json') {
    return JSON.stringify(JSON.parse(input))
  }

  if (mode === 'csv') {
    return input
      .trim()
      .split(/\r?\n/u)
      .map((line) => line.split(',').map((cell) => cell.trim()).join(','))
      .join('\n')
  }

  return input.trim().replace(/>\s+</gu, '><').replace(/\s{2,}/gu, ' ')
}

function buildTreeRows(output: string): string[] {
  if (!output.trim()) {
    return []
  }

  const jsonCandidate = output.replace(/^Valid [A-Z]+ input\.\s*/u, '').trim()

  try {
    return flattenJson(JSON.parse(jsonCandidate)).slice(0, 24)
  } catch {
    return output
      .split(/\r?\n/u)
      .filter(Boolean)
      .slice(0, 24)
      .map((line, index) => `line ${index + 1}: ${line}`)
  }
}

function flattenJson(value: unknown, path = '$', rows: string[] = []): string[] {
  if (rows.length >= 24) {
    return rows
  }

  if (Array.isArray(value)) {
    rows.push(`${path}: array(${value.length})`)
    value.slice(0, 10).forEach((item, index) => flattenJson(item, `${path}[${index}]`, rows))
    return rows
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    rows.push(`${path}: object(${entries.length})`)
    entries.slice(0, 10).forEach(([key, item]) => flattenJson(item, `${path}.${key}`, rows))
    return rows
  }

  rows.push(`${path}: ${String(value)}`)
  return rows
}

function buildTableRows(output: string): KeyValueRow[] {
  return buildTreeRows(output).map((row) => {
    const [label, ...valueParts] = row.split(':')
    return {
      label: label.trim(),
      value: valueParts.join(':').trim() || row,
    }
  })
}

function parseJwtParts(input: string): {
  header: string
  payload: string
  signature: string
  payloadObject: Record<string, unknown> | null
} {
  const [headerSegment = '', payloadSegment = '', signature = ''] = input.trim().split('.')

  try {
    const header = JSON.stringify(JSON.parse(decodeBase64UrlText(headerSegment)), null, 2)
    const payloadObject = JSON.parse(decodeBase64UrlText(payloadSegment)) as Record<string, unknown>

    return {
      header,
      payload: JSON.stringify(payloadObject, null, 2),
      signature: signature ? 'Present, not verified' : 'Missing',
      payloadObject,
    }
  } catch {
    return {
      header: 'Run the inspector with a valid JWT to decode the header.',
      payload: 'Run the inspector with a valid JWT to decode the payload.',
      signature: signature ? 'Present, not verified' : 'Missing',
      payloadObject: null,
    }
  }
}

function decodeBase64UrlText(value: string): string {
  const normalized = value.replace(/-/gu, '+').replace(/_/gu, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  const binary = globalThis.atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}

function formatJwtClaim(claim: string, value: unknown): string {
  if ((claim === 'exp' || claim === 'iat') && typeof value === 'number') {
    return `${value} (${new Date(value * 1000).toISOString()})`
  }

  return Array.isArray(value) ? value.join(', ') : String(value)
}

function collectRegexMatches(pattern: string, sample: string, mode: string): RegexMatchRow[] {
  if (!pattern.trim() || pattern.length > 500 || sample.length > 20_000) {
    return []
  }

  try {
    const flags = mode === 'global-insensitive' ? 'gi' : 'g'
    const regex = new RegExp(pattern, flags)
    const rows: RegexMatchRow[] = []
    let match: RegExpExecArray | null

    while ((match = regex.exec(sample)) && rows.length < 50) {
      rows.push({
        index: match.index,
        match: match[0],
        groups: match.slice(1).map((group) => group ?? ''),
      })

      if (match[0] === '') {
        regex.lastIndex += 1
      }
    }

    return rows
  } catch {
    return []
  }
}

function parseDiffRows(output: string): DiffRow[] {
  return output
    .split(/\r?\n/u)
    .filter((line) => line.length > 0)
    .map((line) => {
      if (line.startsWith('+ ')) {
        return { kind: 'added', text: line.slice(2) }
      }

      if (line.startsWith('- ')) {
        return { kind: 'removed', text: line.slice(2) }
      }

      return { kind: 'unchanged', text: line.replace(/^  /u, '') }
    })
}

function parseDateInput(input: string): Date | null {
  const trimmed = input.trim()
  let date: Date

  if (!trimmed) {
    date = new Date()
  } else if (/^-?\d+$/u.test(trimmed)) {
    const numeric = Number(trimmed)
    date = new Date(Math.abs(numeric) < 10_000_000_000 ? numeric * 1000 : numeric)
  } else {
    date = new Date(trimmed)
  }

  return Number.isNaN(date.getTime()) ? null : date
}

function formatInTimezone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone,
  }).format(date)
}

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | DevUtility Lab`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | DevUtility Lab`,
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

    <section class="hero hero--single" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span class="status">{{ shellCopy.liveTitle }}</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

    </section>

    <section class="workbench" :aria-labelledby="`${tool.slug}-workbench`">
      <div class="workbench__header">
        <div>
          <p class="eyebrow">{{ shellCopy.workbenchTitle }}</p>
          <h2 :id="`${tool.slug}-workbench`">{{ copy.shortName }} {{ shellCopy.resultTitle }}</h2>
          <p>{{ shellCopy.workbenchBody }}</p>
        </div>
        <aside class="privacy-callout" :aria-label="shellCopy.privacyTitle">
          <strong>{{ shellCopy.privacyTitle }}</strong>
          <span>{{ shellCopy.privacyNote }}</span>
        </aside>
      </div>

      <div class="workbench-grid">
        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <div class="panel-heading">
            <div>
              <h2 :id="`${tool.slug}-input`">{{ shellCopy.inputTitle }}</h2>
              <p>{{ copy.description }}</p>
            </div>
            <div class="mini-metrics" aria-label="Input metrics">
              <div v-for="item in workbenchStats" :key="item.label">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="example-box">
            <strong>{{ shellCopy.exampleTitle }}</strong>
            <p>{{ copy.exampleBody }}</p>
          </div>

          <form class="utility-form" @submit.prevent="runTool">
            <div v-if="isStructuredFormatter || isBase64Converter || isHashGenerator" class="mode-tabs" :aria-label="copy.modeLabel">
              <button
                v-for="mode in tool.modes"
                :key="mode.value"
                type="button"
                :aria-pressed="selectedMode === mode.value"
                @click="selectedMode = mode.value"
              >
                {{ mode.label }}
              </button>
            </div>

            <div v-else-if="!isTextDiff && !isUuidGenerator" class="field">
              <label :for="`${tool.slug}-mode`">{{ copy.modeLabel }}</label>
              <select :id="`${tool.slug}-mode`" v-model="selectedMode">
                <option v-for="mode in tool.modes" :key="mode.value" :value="mode.value">
                  {{ mode.label }}
                </option>
              </select>
            </div>

            <div v-if="isTextDiff" class="mode-tabs" aria-label="Diff view">
              <button type="button" :aria-pressed="diffView === 'unified'" @click="diffView = 'unified'">
                Unified
              </button>
              <button type="button" :aria-pressed="diffView === 'split'" @click="diffView = 'split'">
                Split
              </button>
            </div>

            <div v-if="isUuidGenerator" class="field field--compact">
              <label :for="`${tool.slug}-quantity`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-quantity`"
                v-model="primaryInput"
                type="number"
                min="1"
                max="50"
                step="1"
              >
            </div>

            <div v-else-if="tool.acceptsPrimaryInput" class="field">
              <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
              <textarea
                :id="`${tool.slug}-primary`"
                v-model="primaryInput"
                :class="{ 'textarea--large': isJwtInspector }"
                spellcheck="false"
              ></textarea>
            </div>

            <div v-if="tool.requiresSecondaryInput" class="field">
              <label :for="`${tool.slug}-secondary`">{{ copy.secondaryInputLabel }}</label>
              <textarea :id="`${tool.slug}-secondary`" v-model="secondaryInput" spellcheck="false"></textarea>
            </div>

            <div v-if="isTimestampConverter" class="field field--compact">
              <label :for="`${tool.slug}-timezone`">Selected timezone</label>
              <select :id="`${tool.slug}-timezone`" v-model="selectedTimezone">
                <option value="UTC">UTC</option>
                <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>

            <div v-if="isHashGenerator" class="notice">
              {{ hashWarning }}
            </div>

            <div class="tool-actions">
              <template v-if="isStructuredFormatter">
                <button :class="getButtonClass()" type="button" :disabled="isRunning" @click="runStructuredAction('format')">
                  Format
                </button>
                <button :class="getButtonClass('secondary')" type="button" :disabled="isRunning" @click="runStructuredAction('minify')">
                  Minify
                </button>
                <button :class="getButtonClass('secondary')" type="button" :disabled="isRunning" @click="runStructuredAction('validate')">
                  Validate
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="clearInputs">
                  Clear
                </button>
              </template>
              <template v-else-if="isBase64Converter">
                <button :class="getButtonClass()" type="button" :disabled="isRunning" @click="runBase64('encode')">
                  Encode
                </button>
                <button :class="getButtonClass('secondary')" type="button" :disabled="isRunning" @click="runBase64('decode')">
                  Decode
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="swapBase64">
                  Swap
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="copyText(primaryInput)">
                  Copy
                </button>
              </template>
              <template v-else-if="isUuidGenerator">
                <button :class="getButtonClass()" type="submit" :disabled="isRunning">
                  Generate
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="copyResult">
                  Copy all
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="downloadResult">
                  Download
                </button>
              </template>
              <template v-else>
                <button :class="getButtonClass()" type="submit" :disabled="isRunning">
                  {{ shellCopy.runLabel }}
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="resetExample">
                  {{ shellCopy.resetLabel }}
                </button>
                <button v-if="isRegexTester" :class="getButtonClass('secondary')" type="button" @click="copyPattern">
                  Copy pattern
                </button>
              </template>
            </div>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
          <div class="result-panel__heading">
            <div>
              <h2 :id="`${tool.slug}-result`">{{ resultTitle }}</h2>
              <p :class="result && !result.ok ? 'result-error' : ''">{{ resultBody }}</p>
            </div>
            <div v-if="isStructuredFormatter && result && result.ok" class="result-view-tabs" aria-label="Structured data output views">
              <button
                v-for="tab in structuredTabs"
                :key="tab.value"
                type="button"
                :aria-pressed="structuredView === tab.value"
                @click="structuredView = tab.value"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <template v-if="result && result.ok && !isRunning">
            <div v-if="result.meta.length || resultStats.length" class="result-meta">
              <div v-for="item in result.meta" :key="`${item.label}-${item.value}`">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
              <div v-for="item in resultStats" :key="item.label">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>

            <div v-if="isBase64Converter" class="fact-grid">
              <div v-for="item in base64Facts" :key="item.label">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>

            <div v-if="isJwtInspector" class="jwt-grid">
              <article>
                <h3>Header</h3>
                <pre>{{ jwtPreview.header }}</pre>
              </article>
              <article>
                <h3>Payload</h3>
                <pre>{{ jwtPreview.payload }}</pre>
              </article>
              <article>
                <h3>Signature</h3>
                <p>{{ jwtPreview.signature }}</p>
                <p>Decode does not verify a token signature.</p>
              </article>
            </div>

            <div v-if="isJwtInspector && jwtClaims.length" class="fact-grid">
              <div v-for="claim in jwtClaims" :key="claim.label">
                <strong>{{ claim.label }}</strong>
                <span>{{ claim.value }}</span>
              </div>
            </div>

            <div v-if="isRegexTester" class="fact-grid">
              <div>
                <strong>Matches</strong>
                <span>{{ regexMatches.length }}</span>
              </div>
              <div>
                <strong>Engine</strong>
                <span>Browser worker run</span>
              </div>
            </div>

            <table v-if="isRegexTester && regexMatches.length" class="utility-table">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Match</th>
                  <th>Groups</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="match in regexMatches" :key="`${match.index}-${match.match}`">
                  <td>{{ match.index }}</td>
                  <td>{{ match.match }}</td>
                  <td>{{ match.groups.length ? match.groups.join(', ') : '-' }}</td>
                </tr>
              </tbody>
            </table>

            <div v-if="isTextDiff" class="fact-grid">
              <div v-for="item in diffSummary" :key="item.label">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>

            <div v-if="isTextDiff && diffView === 'split'" class="diff-split">
              <div>
                <h3>Removed</h3>
                <p v-for="row in diffRows.filter((item) => item.kind !== 'added')" :key="`left-${row.kind}-${row.text}`" :class="`diff-row diff-row--${row.kind}`">
                  {{ row.text || ' ' }}
                </p>
              </div>
              <div>
                <h3>Added</h3>
                <p v-for="row in diffRows.filter((item) => item.kind !== 'removed')" :key="`right-${row.kind}-${row.text}`" :class="`diff-row diff-row--${row.kind}`">
                  {{ row.text || ' ' }}
                </p>
              </div>
            </div>

            <div v-if="isTextDiff && diffView === 'unified'" class="diff-output">
              <p v-for="row in diffRows" :key="`${row.kind}-${row.text}`" :class="`diff-row diff-row--${row.kind}`">
                {{ row.kind === 'added' ? '+ ' : row.kind === 'removed' ? '- ' : '  ' }}{{ row.text }}
              </p>
            </div>

            <div v-if="isCronHelper" class="cron-panel">
              <p>Preview is calculated in UTC. Compare it with your server timezone before saving a schedule.</p>
              <ol>
                <li v-for="run in cronRuns" :key="run">{{ run }}</li>
              </ol>
            </div>

            <div v-if="isTimestampConverter && timestampRows.length" class="fact-grid fact-grid--wide">
              <div v-for="item in timestampRows" :key="item.label">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
                <button type="button" @click="copyText(item.value)">
                  Copy
                </button>
              </div>
            </div>

            <div v-if="isHashGenerator" class="notice">
              {{ hashWarning }}
            </div>

            <template v-if="isStructuredFormatter">
              <pre v-if="structuredView === 'raw'" class="result-output">{{ result.output }}</pre>
              <ul v-else-if="structuredView === 'tree'" class="tree-output">
                <li v-for="row in structuredTreeRows" :key="row">{{ row }}</li>
              </ul>
              <table v-else class="utility-table">
                <thead>
                  <tr>
                    <th>Path</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in structuredTableRows" :key="`${row.label}-${row.value}`">
                    <td>{{ row.label }}</td>
                    <td>{{ row.value }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
            <pre v-else-if="!isJwtInspector && !isTextDiff" class="result-output">{{ result.output }}</pre>

            <div class="tool-actions" :aria-label="shellCopy.resultActionsLabel">
              <button :class="getButtonClass('secondary')" type="button" @click="copyResult">
                {{ copyState === 'copied' ? shellCopy.copiedResultLabel : copyState === 'failed' ? shellCopy.copyFailedLabel : shellCopy.copyResultLabel }}
              </button>
              <button :class="getButtonClass('secondary')" type="button" @click="downloadResult">
                {{ shellCopy.downloadResultLabel }}
              </button>
            </div>
          </template>
        </section>
      </div>
    </section>

    <section class="tool-layout">
      <aside class="band" :aria-labelledby="`${tool.slug}-scope`">
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
      </aside>

      <aside class="band upgrade-band" :aria-labelledby="`${tool.slug}-upgrade`">
        <h2 :id="`${tool.slug}-upgrade`">{{ shellCopy.gatedTitle }}</h2>
        <p>{{ shellCopy.gatedBody }}</p>
        <ul>
          <li v-for="item in shellCopy.gatedItems" :key="item">{{ item }}</li>
        </ul>
      </aside>
    </section>

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="devutility-lab"
      :slot-id="`devutility-${tool.slug}-after-result`"
      variant="tool"
    />

    <section class="content-layout" :aria-labelledby="`${tool.slug}-guide`">
      <div>
        <h2 :id="`${tool.slug}-guide`">{{ shellCopy.guideTitle }}</h2>
        <article class="content-section">
          <h3>{{ shellCopy.exampleTitle }}</h3>
          <p>{{ copy.exampleBody }}</p>
        </article>
        <article class="content-section">
          <h3>{{ shellCopy.invalidResultTitle }}</h3>
          <p>{{ copy.commonErrorBody }}</p>
        </article>
        <article v-for="section in copy.contentSections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
        <section class="content-section" :aria-labelledby="`${tool.slug}-related`">
          <h3 :id="`${tool.slug}-related`">{{ shellCopy.relatedTitle }}</h3>
          <p>{{ shellCopy.relatedBody }}</p>
          <div class="related-grid">
            <NuxtLink
              v-for="related in relatedTools"
              :key="related.slug"
              class="related-card"
              :to="localizedToolPath(locale, related.slug)"
            >
              <strong>{{ getToolCopy(related, locale).title }}</strong>
              <span>{{ getToolCopy(related, locale).headline }}</span>
              <em>{{ shellCopy.openRelatedLabel }}</em>
            </NuxtLink>
          </div>
        </section>
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
