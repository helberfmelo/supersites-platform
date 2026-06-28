<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createDocShiftToolStructuredData,
  formatBytes,
  getCategoryLabel,
  getDocShiftToolBySlug,
  getDocShiftToolCopy,
  getDocShiftWorkflowSteps,
  getRelatedDocShiftTools,
  type DocShiftToolInput,
  type DocShiftToolResult,
  type DocShiftTransformPlan,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackDocShiftEvent } from '../../../utils/analytics'
import { runDocShiftToolInWorker } from '../../../utils/docshiftWorker'

type PdfLibModule = typeof import('pdf-lib')
type PdfDocumentInstance = Awaited<ReturnType<PdfLibModule['PDFDocument']['create']>>

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getDocShiftToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

const copy = getDocShiftToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createDocShiftToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const workflowSteps = getDocShiftWorkflowSteps(tool.slug, locale)
const relatedTools = getRelatedDocShiftTools(tool.slug, locale)
const selectedFiles = ref<File[]>([])
const pageSelection = ref(tool.defaultPages)
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
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.invalidResultTitle : copy.resultLabel)
const selectedFileLabel = computed(() => {
  if (!tool.requiresPdf) {
    return shellCopy.privacyNote
  }

  if (selectedFiles.value.length === 0) {
    return shellCopy.privacyNote
  }

  const total = selectedFiles.value.reduce((sum, file) => sum + file.size, 0)
  return `${selectedFiles.value.length} PDF file${selectedFiles.value.length === 1 ? '' : 's'} selected (${formatBytes(total)})`
})
const workflowSnapshotRows = computed(() => [
  { label: 'Mode', value: copy.shortName },
  {
    label: 'Input',
    value: tool.requiresPdf
      ? (selectedFiles.value.length === 0 ? 'No PDF selected yet' : `${selectedFiles.value.length} local PDF${selectedFiles.value.length === 1 ? '' : 's'}`)
      : `${textContent.value.trim().length} characters in browser memory`,
  },
  { label: 'Output', value: outputFileName.value || 'PDF created after processing' },
  {
    label: 'Processing',
    value: result.value?.plan?.workerUsed
      ? 'browser worker + pdf-lib'
      : 'browser tab + pdf-lib',
  },
])
const privacyChecklist = [
  'Files and pasted text stay in browser memory.',
  'No upload API, localStorage or sessionStorage is used.',
  'Analytics records only sanitized tool slug and route path.',
]
const displayedMeta = computed(() => {
  if (!result.value?.ok) {
    return []
  }

  return [
    ...result.value.meta,
    { label: 'Actual output', value: outputSize.value ? formatBytes(outputSize.value) : '-' },
    { label: 'Worker', value: result.value.plan?.workerUsed ? 'browser worker' : 'local fallback' },
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

function onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement
  selectedFiles.value = Array.from(input.files ?? [])
  hasRun.value = false
  clearResult()
}

function resetSettings(): void {
  pageSelection.value = tool.defaultPages
  rotationDegrees.value = 90
  watermarkText.value = 'Draft'
  metadataTitle.value = 'DocShift output'
  metadataAuthor.value = 'DocShift local tool'
  textContent.value = 'Paste a short note, checklist or draft here. DocShift will create a simple PDF locally in your browser.'
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
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_started')

  try {
    const pdfLib = await loadPdfLib()
    const buffers = tool.requiresPdf ? await readPdfBuffers(selectedFiles.value) : []
    const firstPdf = tool.requiresPdf && buffers[0]
      ? await pdfLib.PDFDocument.load(buffers[0], { ignoreEncryption: true })
      : null
    const pageCount = firstPdf?.getPageCount()
    const workerResult = await runDocShiftToolInWorker({
      slug: tool.slug,
      input: pdfInputFrom(pageCount),
    })

    if (!workerResult.ok || !workerResult.plan) {
      result.value = workerResult
      trackDocShiftEvent({
        toolSlug: tool.slug,
        locale,
        routePath: canonicalPath,
      }, 'tool_failed')
      return
    }

    const bytes = tool.operation === 'text-to-pdf'
      ? await makeTextPdf(pdfLib, workerResult.plan)
      : await processPdf(pdfLib, buffers, workerResult.plan)
    const blob = new Blob([bytes], { type: 'application/pdf' })

    previewUrl.value = URL.createObjectURL(blob)
    outputSize.value = blob.size
    outputFileName.value = workerResult.output
    result.value = workerResult

    trackDocShiftEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'file_processed')
    trackDocShiftEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'tool_completed')
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Document processing failed.',
    }
    trackDocShiftEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
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
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'file_downloaded')
}

onMounted(() => {
  trackDocShiftEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_viewed')
})

onBeforeUnmount(() => {
  revokePreviewUrl()
})

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | DocShift`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | DocShift`,
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
          <span class="status">{{ shellCopy.liveTitle }}</span>
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
        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ shellCopy.inputTitle }}</h2>
          <p>{{ copy.description }}</p>
          <form class="utility-form document-tool-form" @submit.prevent="runTool">
            <div v-if="tool.requiresPdf" class="dropzone">
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

            <div v-if="tool.usesTextInput" class="dropzone">
              <strong>{{ shellCopy.dropzoneTitle }}</strong>
              <p>{{ shellCopy.dropzoneBody }}</p>
              <div class="field">
                <label :for="`${tool.slug}-text`">{{ shellCopy.textLabel }}</label>
                <textarea :id="`${tool.slug}-text`" v-model="textContent" spellcheck="true"></textarea>
              </div>
              <div class="file-state" aria-live="polite">
                <strong>{{ shellCopy.fileStateTitle }}</strong>
                <span>{{ textContent.trim().length }} characters in browser memory</span>
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

            <div class="workflow-steps" :aria-label="shellCopy.workflowSnapshotTitle">
              <div v-for="(step, index) in workflowSteps" :key="step.title" class="workflow-step">
                <span>{{ index + 1 }}</span>
                <div>
                  <strong>{{ step.title }}</strong>
                  <p>{{ step.body }}</p>
                </div>
              </div>
            </div>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
          <h2 :id="`${tool.slug}-result`">{{ resultTitle }}</h2>

          <p v-if="isRunning">Processing the document locally...</p>
          <p v-else-if="!hasRun">{{ shellCopy.privacyNote }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>

          <template v-else-if="result?.ok && previewUrl">
            <div class="result-meta">
              <div v-for="item in displayedMeta" :key="`${item.label}-${item.value}`">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>

            <div class="document-snapshot">
              <h3>{{ shellCopy.workflowSnapshotTitle }}</h3>
              <dl class="fact-list">
                <div v-for="item in workflowSnapshotRows" :key="`${item.label}-${item.value}`">
                  <dt>{{ item.label }}</dt>
                  <dd>{{ item.value }}</dd>
                </div>
              </dl>
            </div>

            <figure class="pdf-preview">
              <div class="pdf-preview__frame">
                <iframe :src="previewUrl" title="Processed PDF preview"></iframe>
              </div>
              <figcaption>{{ result.plan?.privacyNote }}</figcaption>
            </figure>

            <ul v-if="result.plan?.warnings.length" class="warning-list">
              <li v-for="warning in result.plan.warnings" :key="warning">{{ warning }}</li>
            </ul>
          </template>
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
            <div>
              <dt>File safety</dt>
              <dd>Server-side batch, OCR, API and history require upload validation, sandboxing, antivirus where applicable, retention and deletion checks before activation.</dd>
            </div>
          </dl>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-snapshot`">
          <h2 :id="`${tool.slug}-snapshot`">{{ shellCopy.workflowSnapshotTitle }}</h2>
          <dl class="fact-list">
            <div v-for="item in workflowSnapshotRows" :key="`${item.label}-${item.value}`">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-privacy`">
          <h2 :id="`${tool.slug}-privacy`">{{ shellCopy.privacyChecklistTitle }}</h2>
          <ul class="privacy-list">
            <li v-for="item in privacyChecklist" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-server-gate`">
          <h2 :id="`${tool.slug}-server-gate`">{{ shellCopy.heavyQueueTitle }}</h2>
          <p>{{ shellCopy.heavyQueueBody }}</p>
          <ul class="privacy-list">
            <li v-for="item in shellCopy.heavyQueueItems" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-related`">
          <h2 :id="`${tool.slug}-related`">{{ shellCopy.relatedToolsTitle }}</h2>
          <p>{{ shellCopy.relatedToolsBody }}</p>
          <div class="related-list">
            <NuxtLink v-for="related in relatedTools" :key="related.slug" :to="localizedToolPath(locale, related.slug)">
              <strong>{{ related.title }}</strong>
              <span>{{ related.description }}</span>
            </NuxtLink>
          </div>
        </section>
      </aside>
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
