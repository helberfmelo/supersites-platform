<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getShellCopy } from '../data/copy'
import {
  docShiftToolCatalog,
  formatBytes,
  getCategoryLabel,
  getDocShiftToolBySlug,
  getDocShiftToolCopy,
  getDocShiftWorkflowSteps,
  getRelatedDocShiftTools,
  type DocShiftToolInput,
  type DocShiftToolResult,
  type DocShiftToolSlug,
  type DocShiftTransformPlan,
} from '../data/tools'
import { localizedToolPath, type LocaleCode } from '../data/locales'
import { trackDocShiftEvent } from '../utils/analytics'
import { runDocShiftToolInWorker } from '../utils/docshiftWorker'

type PdfLibModule = typeof import('pdf-lib')
type PdfDocumentInstance = Awaited<ReturnType<PdfLibModule['PDFDocument']['create']>>

const props = withDefaults(defineProps<{
  locale: LocaleCode
  initialSlug: DocShiftToolSlug
  trackView?: boolean
}>(), {
  trackView: false,
})

const selectedSlug = ref<DocShiftToolSlug>(props.initialSlug)
const selectedFiles = ref<File[]>([])
const pageSelection = ref('all')
const rotationDegrees = ref(90)
const watermarkText = ref('Draft')
const metadataTitle = ref('DocShift output')
const metadataAuthor = ref('DocShift local tool')
const textContent = ref('Paste a short note, checklist or draft here. DocShift will create a simple PDF locally in your browser.')
const hasRun = ref(false)
const isRunning = ref(false)
const isDownloading = ref(false)
const result = ref<DocShiftToolResult | null>(null)
const previewUrl = ref('')
const outputFileName = ref('')
const outputSize = ref(0)

const tool = computed(() => getDocShiftToolBySlug(selectedSlug.value) ?? docShiftToolCatalog[0])
const copy = computed(() => getDocShiftToolCopy(tool.value, props.locale))
const shellCopy = computed(() => getShellCopy(props.locale))
const canonicalPath = computed(() => localizedToolPath(props.locale, tool.value.slug))
const workflowSteps = computed(() => getDocShiftWorkflowSteps(tool.value.slug, props.locale))
const relatedTools = computed(() => getRelatedDocShiftTools(tool.value.slug, props.locale))
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.value.invalidResultTitle : copy.value.resultLabel)
const selectedFileLabel = computed(() => {
  if (!tool.value.requiresPdf) {
    return shellCopy.value.privacyNote
  }

  if (selectedFiles.value.length === 0) {
    return shellCopy.value.privacyNote
  }

  const total = selectedFiles.value.reduce((sum, file) => sum + file.size, 0)
  return `${selectedFiles.value.length} PDF file${selectedFiles.value.length === 1 ? '' : 's'} selected (${formatBytes(total)})`
})
const workflowSnapshotRows = computed(() => [
  { label: shellCopy.value.workflowModeLabel, value: copy.value.shortName },
  {
    label: shellCopy.value.workflowInputLabel,
    value: tool.value.requiresPdf
      ? (selectedFiles.value.length === 0 ? shellCopy.value.noFileSelectedLabel : `${selectedFiles.value.length} local PDF${selectedFiles.value.length === 1 ? '' : 's'}`)
      : `${textContent.value.trim().length} ${shellCopy.value.charactersInMemoryLabel}`,
  },
  { label: shellCopy.value.workflowOutputLabel, value: outputFileName.value || shellCopy.value.outputPendingLabel },
  {
    label: shellCopy.value.workflowProcessingLabel,
    value: result.value?.plan?.workerUsed
      ? shellCopy.value.workerPipelineLabel
      : shellCopy.value.tabPipelineLabel,
  },
])
const displayedMeta = computed(() => {
  if (!result.value?.ok) {
    return []
  }

  return [
    ...result.value.meta,
    { label: shellCopy.value.actualOutputLabel, value: outputSize.value ? formatBytes(outputSize.value) : '-' },
    { label: shellCopy.value.workerLabel, value: result.value.plan?.workerUsed ? shellCopy.value.browserWorkerLabel : shellCopy.value.localFallbackLabel },
  ]
})

const rotationOptions = [
  { value: 90, label: '90 degrees' },
  { value: 180, label: '180 degrees' },
  { value: 270, label: '270 degrees' },
]

function revokePreviewUrl(): void {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }
}

function clearResult(): void {
  revokePreviewUrl()
  result.value = null
  outputFileName.value = ''
  outputSize.value = 0
}

function resetSettings(): void {
  pageSelection.value = tool.value.defaultPages
  rotationDegrees.value = 90
  watermarkText.value = 'Draft'
  metadataTitle.value = 'DocShift output'
  metadataAuthor.value = 'DocShift local tool'
  textContent.value = 'Paste a short note, checklist or draft here. DocShift will create a simple PDF locally in your browser.'
  hasRun.value = false
  selectedFiles.value = []
  clearResult()
}

function selectTool(slug: DocShiftToolSlug): void {
  if (selectedSlug.value === slug) {
    return
  }

  selectedSlug.value = slug
}

function onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement
  selectedFiles.value = Array.from(input.files ?? [])
  hasRun.value = false
  clearResult()
}

function pdfInputFrom(pageCount?: number): DocShiftToolInput {
  return {
    fileNames: selectedFiles.value.map((file) => file.name),
    mimeTypes: selectedFiles.value.map((file) => file.type),
    sizeBytes: selectedFiles.value.map((file) => file.size),
    pageCount,
    pageSelection: pageSelection.value,
    rotationDegrees: rotationDegrees.value,
    watermarkText: watermarkText.value,
    metadataTitle: metadataTitle.value,
    metadataAuthor: metadataAuthor.value,
    textContent: textContent.value,
  }
}

async function readPdfBuffers(files: File[]): Promise<Uint8Array[]> {
  return Promise.all(files.map(async (file) => new Uint8Array(await file.arrayBuffer())))
}

async function loadPdfLib(): Promise<PdfLibModule> {
  return import('pdf-lib')
}

function applyMetadata(pdf: PdfDocumentInstance, plan: DocShiftTransformPlan): void {
  pdf.setTitle(plan.metadataTitle)
  pdf.setAuthor(plan.metadataAuthor)
  pdf.setSubject('DocShift local browser output')
  pdf.setKeywords(['docshift', 'local', 'browser'])
  pdf.setProducer('DocShift browser-side document workflow')
  pdf.setCreator('DocShift')
  pdf.setCreationDate(new Date(0))
  pdf.setModificationDate(new Date(0))
}

function selectedPageIndexes(plan: DocShiftTransformPlan, pageCount: number): number[] {
  if (plan.pageSelection.length === 0) {
    return Array.from({ length: pageCount }, (_, index) => index)
  }

  return plan.pageSelection.filter((index) => index >= 0 && index < pageCount)
}

function wrapText(value: string, limit: number): string[] {
  const words = value.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > limit && current) {
      lines.push(current)
      current = word
      continue
    }

    current = candidate
  }

  lines.push(current)
  return lines
}

async function makeTextPdf(pdfLib: PdfLibModule, plan: DocShiftTransformPlan): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = pdfLib
  const pdf = await PDFDocument.create()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const lines = plan.textContent
    .split(/\r?\n/)
    .flatMap((line) => wrapText(line, 86))
  let page = pdf.addPage([612, 792])
  let y = 738

  page.drawText('DocShift Text to PDF', { x: 54, y, size: 16, font: bold, color: rgb(0.08, 0.11, 0.18) })
  y -= 34

  for (const line of lines) {
    if (y < 60) {
      page = pdf.addPage([612, 792])
      y = 738
    }

    page.drawText(line || ' ', { x: 54, y, size: 11, font, color: rgb(0.08, 0.11, 0.18) })
    y -= 16
  }

  applyMetadata(pdf, plan)
  return pdf.save({ useObjectStreams: true })
}

async function processPdf(pdfLib: PdfLibModule, buffers: Uint8Array[], plan: DocShiftTransformPlan): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, degrees, rgb } = pdfLib
  const first = await PDFDocument.load(buffers[0], { ignoreEncryption: true })

  if (plan.operation === 'merge') {
    const output = await PDFDocument.create()
    for (const buffer of buffers) {
      const source = await PDFDocument.load(buffer, { ignoreEncryption: true })
      const pages = await output.copyPages(source, source.getPageIndices())
      pages.forEach((page) => output.addPage(page))
    }
    applyMetadata(output, plan)
    return output.save({ useObjectStreams: true })
  }

  if (plan.operation === 'split') {
    const output = await PDFDocument.create()
    const pages = await output.copyPages(first, selectedPageIndexes(plan, first.getPageCount()))
    pages.forEach((page) => output.addPage(page))
    applyMetadata(output, plan)
    return output.save({ useObjectStreams: true })
  }

  const font = await first.embedFont(StandardFonts.Helvetica)
  const bold = await first.embedFont(StandardFonts.HelveticaBold)
  const pages = first.getPages()
  const selected = new Set(selectedPageIndexes(plan, pages.length))

  for (const [index, page] of pages.entries()) {
    if (!selected.has(index)) {
      continue
    }

    if (plan.operation === 'rotate') {
      const current = page.getRotation().angle
      page.setRotation(degrees((current + plan.rotationDegrees) % 360))
    }

    if (plan.operation === 'watermark') {
      const { width, height } = page.getSize()
      page.drawText(plan.watermarkText, {
        x: width * 0.17,
        y: height * 0.47,
        size: Math.max(24, Math.min(width, height) / 10),
        font: bold,
        color: rgb(0.17, 0.24, 0.38),
        opacity: 0.18,
        rotate: degrees(-32),
      })
    }

    if (plan.operation === 'page-numbers') {
      const { width } = page.getSize()
      page.drawText(`${index + 1} / ${pages.length}`, {
        x: width / 2 - 20,
        y: 24,
        size: 10,
        font,
        color: rgb(0.25, 0.29, 0.36),
      })
    }
  }

  applyMetadata(first, plan)
  return first.save({ useObjectStreams: true })
}

async function runTool(): Promise<void> {
  hasRun.value = true
  clearResult()
  isRunning.value = true
  trackDocShiftEvent({
    toolSlug: tool.value.slug,
    locale: props.locale,
    routePath: canonicalPath.value,
  }, 'tool_started')

  try {
    const pdfLib = await loadPdfLib()
    const buffers = tool.value.requiresPdf ? await readPdfBuffers(selectedFiles.value) : []
    const firstPdf = tool.value.requiresPdf && buffers[0]
      ? await pdfLib.PDFDocument.load(buffers[0], { ignoreEncryption: true })
      : null
    const pageCount = firstPdf?.getPageCount()
    const workerResult = await runDocShiftToolInWorker({
      slug: tool.value.slug,
      input: pdfInputFrom(pageCount),
    })

    if (!workerResult.ok || !workerResult.plan) {
      result.value = workerResult
      trackDocShiftEvent({
        toolSlug: tool.value.slug,
        locale: props.locale,
        routePath: canonicalPath.value,
      }, 'tool_failed')
      return
    }

    const bytes = tool.value.operation === 'text-to-pdf'
      ? await makeTextPdf(pdfLib, workerResult.plan)
      : await processPdf(pdfLib, buffers, workerResult.plan)
    const blob = new Blob([bytes], { type: 'application/pdf' })

    previewUrl.value = URL.createObjectURL(blob)
    outputSize.value = blob.size
    outputFileName.value = workerResult.output
    result.value = workerResult

    trackDocShiftEvent({
      toolSlug: tool.value.slug,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'file_processed')
    trackDocShiftEvent({
      toolSlug: tool.value.slug,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'tool_completed')
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Document processing failed.',
    }
    trackDocShiftEvent({
      toolSlug: tool.value.slug,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'tool_failed')
  } finally {
    isRunning.value = false
  }
}

function downloadPdf(): void {
  if (!previewUrl.value || !outputFileName.value) {
    return
  }

  isDownloading.value = true
  const link = document.createElement('a')
  link.href = previewUrl.value
  link.download = outputFileName.value
  document.body.appendChild(link)
  link.click()
  link.remove()
  isDownloading.value = false

  trackDocShiftEvent({
    toolSlug: tool.value.slug,
    locale: props.locale,
    routePath: canonicalPath.value,
  }, 'file_downloaded')
}

watch(selectedSlug, resetSettings)

onMounted(() => {
  pageSelection.value = tool.value.defaultPages

  if (props.trackView) {
    trackDocShiftEvent({
      toolSlug: tool.value.slug,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'tool_viewed')
  }
})

onBeforeUnmount(() => {
  revokePreviewUrl()
})
</script>

<template>
  <section class="pdf-workbench" :aria-labelledby="`${tool.slug}-workbench`">
    <div class="pdf-workbench__intro">
      <p class="eyebrow">{{ shellCopy.workbenchEyebrow }}</p>
      <h2 :id="`${tool.slug}-workbench`">{{ shellCopy.workbenchTitle }}</h2>
      <p>{{ shellCopy.workbenchBody }}</p>
    </div>

    <div class="pdf-tool-tabs" :aria-label="shellCopy.toolTabsLabel">
      <button
        v-for="item in docShiftToolCatalog"
        :key="item.slug"
        type="button"
        :aria-pressed="selectedSlug === item.slug"
        @click="selectTool(item.slug)"
      >
        <span>{{ getDocShiftToolCopy(item, locale).shortName }}</span>
        <small>{{ getCategoryLabel(item.category, locale) }}</small>
      </button>
    </div>

    <div class="pdf-workbench__grid">
      <section class="input-panel input-panel--dominant" :aria-labelledby="`${tool.slug}-input`">
        <div class="tool-heading-row">
          <div>
            <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
            <p :id="`${tool.slug}-input`" class="workbench-tool-title">{{ copy.title }}</p>
            <p>{{ copy.description }}</p>
          </div>
          <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, tool.slug)">
            {{ shellCopy.openGuideLabel }}
          </NuxtLink>
        </div>

        <form class="utility-form document-tool-form" @submit.prevent="runTool">
          <div v-if="tool.requiresPdf" class="dropzone dropzone--dominant">
            <strong>{{ shellCopy.dropzoneTitle }}</strong>
            <p>{{ shellCopy.dropzoneBody }}</p>
            <div class="field">
              <label :for="`${tool.slug}-file`">{{ shellCopy.fileLabel }}</label>
              <input
                :id="`${tool.slug}-file`"
                type="file"
                accept="application/pdf,.pdf"
                :multiple="tool.acceptsMultiple"
                @change="onFileSelected"
              >
            </div>
            <div class="file-state" aria-live="polite">
              <strong>{{ shellCopy.fileStateTitle }}</strong>
              <span>{{ selectedFileLabel }}</span>
            </div>
          </div>

          <div v-if="tool.usesTextInput" class="dropzone dropzone--dominant">
            <strong>{{ shellCopy.dropzoneTitle }}</strong>
            <p>{{ shellCopy.dropzoneBody }}</p>
            <div class="field">
              <label :for="`${tool.slug}-text`">{{ shellCopy.textLabel }}</label>
              <textarea :id="`${tool.slug}-text`" v-model="textContent" spellcheck="true"></textarea>
            </div>
            <div class="file-state" aria-live="polite">
              <strong>{{ shellCopy.fileStateTitle }}</strong>
              <span>{{ textContent.trim().length }} {{ shellCopy.charactersInMemoryLabel }}</span>
            </div>
          </div>

          <div v-if="tool.requiresPdf && tool.operation !== 'merge' && tool.operation !== 'compress' && tool.operation !== 'metadata'" class="field">
            <label :for="`${tool.slug}-pages`">{{ shellCopy.pagesLabel }}</label>
            <input :id="`${tool.slug}-pages`" v-model="pageSelection" placeholder="all or 1-3,5" autocomplete="off">
          </div>

          <div v-if="tool.operation === 'rotate'" class="field">
            <label :for="`${tool.slug}-rotation`">{{ shellCopy.rotationLabel }}</label>
            <select :id="`${tool.slug}-rotation`" v-model.number="rotationDegrees">
              <option v-for="option in rotationOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div v-if="tool.operation === 'watermark'" class="field">
            <label :for="`${tool.slug}-watermark`">{{ shellCopy.watermarkLabel }}</label>
            <input :id="`${tool.slug}-watermark`" v-model="watermarkText" maxlength="64" autocomplete="off">
          </div>

          <div v-if="tool.operation === 'metadata'" class="form-grid">
            <div class="field">
              <label :for="`${tool.slug}-title`">{{ shellCopy.metadataTitleLabel }}</label>
              <input :id="`${tool.slug}-title`" v-model="metadataTitle" maxlength="90" autocomplete="off">
            </div>
            <div class="field">
              <label :for="`${tool.slug}-author`">{{ shellCopy.metadataAuthorLabel }}</label>
              <input :id="`${tool.slug}-author`" v-model="metadataAuthor" maxlength="90" autocomplete="off">
            </div>
          </div>

          <div class="tool-actions">
            <button :class="getButtonClass()" type="submit" :disabled="isRunning">
              {{ shellCopy.runLabel }}
            </button>
            <button :class="getButtonClass('secondary')" type="button" @click="resetSettings">
              {{ shellCopy.resetLabel }}
            </button>
            <button
              :class="getButtonClass('secondary')"
              type="button"
              :disabled="!previewUrl || isRunning || isDownloading"
              @click="downloadPdf"
            >
              {{ shellCopy.downloadLabel }}
            </button>
          </div>
        </form>

        <div class="workflow-block">
          <h4>{{ shellCopy.workflowSnapshotTitle }}</h4>
          <div class="workflow-steps workflow-steps--compact" :aria-label="shellCopy.workflowSnapshotTitle">
          <div v-for="(step, index) in workflowSteps" :key="step.title" class="workflow-step">
            <span>{{ index + 1 }}</span>
            <div>
              <strong>{{ step.title }}</strong>
              <p>{{ step.body }}</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section class="result-panel result-panel--dominant" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
        <div class="preview-heading">
          <div>
            <p class="eyebrow">{{ shellCopy.previewEyebrow }}</p>
            <h3 :id="`${tool.slug}-result`">{{ resultTitle }}</h3>
          </div>
          <span class="status">{{ shellCopy.localTrustTitle }}</span>
        </div>

        <div v-if="isRunning" class="empty-preview">
          <strong>{{ shellCopy.processingTitle }}</strong>
          <p>{{ shellCopy.processingBody }}</p>
        </div>
        <div v-else-if="!hasRun" class="empty-preview">
          <strong>{{ shellCopy.previewEmptyTitle }}</strong>
          <p>{{ shellCopy.privacyNote }}</p>
        </div>
        <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>

        <template v-else-if="result?.ok && previewUrl">
          <div class="result-meta result-meta--dense">
            <div v-for="item in displayedMeta" :key="`${item.label}-${item.value}`">
              <strong>{{ item.label }}</strong>
              <span>{{ item.value }}</span>
            </div>
          </div>

          <div class="document-snapshot">
            <h4>{{ shellCopy.workflowSnapshotTitle }}</h4>
            <dl class="fact-list">
              <div v-for="item in workflowSnapshotRows" :key="`${item.label}-${item.value}`">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
          </div>

          <figure class="pdf-preview">
            <div class="pdf-preview__frame">
              <iframe :src="previewUrl" :title="shellCopy.processedPreviewTitle"></iframe>
            </div>
            <figcaption>{{ result.plan?.privacyNote }}</figcaption>
          </figure>

          <ul v-if="result.plan?.warnings.length" class="warning-list">
            <li v-for="warning in result.plan.warnings" :key="warning">{{ warning }}</li>
          </ul>
        </template>
      </section>
    </div>

    <div class="pdf-support-grid">
      <section class="band" :aria-labelledby="`${tool.slug}-scope`">
        <h3 :id="`${tool.slug}-scope`">{{ shellCopy.freeCheckLabel }}</h3>
        <dl class="fact-list">
          <div>
            <dt>{{ shellCopy.freeCheckLabel }}</dt>
            <dd>{{ copy.freeScope }}</dd>
          </div>
          <div>
            <dt>{{ shellCopy.upgradePathLabel }}</dt>
            <dd>{{ copy.upgradeScope }}</dd>
          </div>
          <div>
            <dt>{{ shellCopy.fileSafetyLabel }}</dt>
            <dd>{{ shellCopy.fileSafetyBody }}</dd>
          </div>
        </dl>
      </section>

      <section class="band" :aria-labelledby="`${tool.slug}-privacy`">
        <h3 :id="`${tool.slug}-privacy`">{{ shellCopy.privacyChecklistTitle }}</h3>
        <ul class="privacy-list">
          <li v-for="item in shellCopy.privacyChecklistItems" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section class="band" :aria-labelledby="`${tool.slug}-server`">
        <h3 :id="`${tool.slug}-server`">{{ shellCopy.heavyQueueTitle }}</h3>
        <p>{{ shellCopy.heavyQueueBody }}</p>
        <ul class="privacy-list">
          <li v-for="item in shellCopy.heavyQueueItems" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section class="band" :aria-labelledby="`${tool.slug}-related`">
        <h3 :id="`${tool.slug}-related`">{{ shellCopy.relatedToolsTitle }}</h3>
        <p>{{ shellCopy.relatedToolsBody }}</p>
        <div class="related-list">
          <NuxtLink v-for="related in relatedTools" :key="related.slug" :to="localizedToolPath(locale, related.slug)">
            <strong>{{ related.title }}</strong>
            <span>{{ related.description }}</span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>
