<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createPixelBatchToolStructuredData,
  formatBytes,
  getCategoryLabel,
  getPixelBatchToolBySlug,
  getPixelBatchToolCopy,
  getPixelBatchWorkflowSteps,
  getRelatedPixelBatchTools,
  type PixelBatchCropPreset,
  type PixelBatchOutputFormat,
  type PixelBatchSocialPreset,
  type PixelBatchToolResult,
  type PixelBatchTransformPlan,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackPixelBatchEvent } from '../../../utils/analytics'
import { runPixelBatchToolInWorker } from '../../../utils/pixelbatchWorker'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getPixelBatchToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

interface LoadedImage {
  element: HTMLImageElement
  width: number
  height: number
  objectUrl: string
}

const copy = getPixelBatchToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createPixelBatchToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const selectedFile = ref<File | null>(null)
const outputFormat = ref<PixelBatchOutputFormat>(tool.defaultFormat)
const quality = ref(Math.round(tool.defaultQuality * 100))
const targetWidth = ref(tool.slug === 'image-resizer' ? '1200' : '')
const targetHeight = ref('')
const cropPreset = ref<PixelBatchCropPreset>('square')
const socialPreset = ref<PixelBatchSocialPreset>('instagram-square')
const hasRun = ref(false)
const isRunning = ref(false)
const isDownloading = ref(false)
const result = ref<PixelBatchToolResult | null>(null)
const sourcePreviewUrl = ref('')
const previewUrl = ref('')
const outputFileName = ref('')
const outputSize = ref(0)
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.invalidResultTitle : copy.resultLabel)
const selectedFileLabel = computed(() => selectedFile.value ? `${selectedFile.value.name} (${formatBytes(selectedFile.value.size)})` : shellCopy.privacyNote)
const relatedTools = computed(() => getRelatedPixelBatchTools(tool.slug, locale))
const workflowSteps = computed(() => getPixelBatchWorkflowSteps(tool.slug))
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
const workflowChecklist = computed(() => [
  {
    label: 'File',
    value: selectedFile.value ? `${selectedFile.value.type || 'image'} / ${formatBytes(selectedFile.value.size)}` : 'Waiting for one local image',
  },
  {
    label: 'Render',
    value: result.value?.plan
      ? `${result.value.plan.outputWidth} x ${result.value.plan.outputHeight} ${result.value.plan.outputExtension.toUpperCase()}`
      : 'Canvas output planned after processing',
  },
  {
    label: 'Storage',
    value: 'No upload endpoint, localStorage, sessionStorage or account.',
  },
  {
    label: 'Upgrade gate',
    value: result.value?.plan?.upgradeGateNote ?? 'Batch, API, high-res queues and AI remain inactive.',
  },
])

const formatOptions: Array<{ value: PixelBatchOutputFormat; label: string }> = [
  { value: 'image/webp', label: 'WebP' },
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/png', label: 'PNG' },
  { value: 'image/avif', label: 'AVIF' },
]

const cropOptions: Array<{ value: PixelBatchCropPreset; label: string }> = [
  { value: 'square', label: 'Square 1:1' },
  { value: 'portrait', label: 'Portrait 4:5' },
  { value: 'landscape', label: 'Landscape 16:9' },
]

const socialOptions: Array<{ value: PixelBatchSocialPreset; label: string }> = [
  { value: 'instagram-square', label: 'Instagram square 1080 x 1080' },
  { value: 'story', label: 'Story 1080 x 1920' },
  { value: 'open-graph', label: 'Open Graph 1200 x 630' },
  { value: 'marketplace', label: 'Marketplace 1600 x 1600' },
]

function revokePreviewUrl(): void {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }
}

function revokeSourcePreviewUrl(): void {
  if (sourcePreviewUrl.value) {
    URL.revokeObjectURL(sourcePreviewUrl.value)
    sourcePreviewUrl.value = ''
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
  selectedFile.value = input.files?.[0] ?? null
  hasRun.value = false
  revokeSourcePreviewUrl()
  if (selectedFile.value) {
    sourcePreviewUrl.value = URL.createObjectURL(selectedFile.value)
  }
  clearResult()
}

function resetSettings(): void {
  outputFormat.value = tool.defaultFormat
  quality.value = Math.round(tool.defaultQuality * 100)
  targetWidth.value = tool.slug === 'image-resizer' ? '1200' : ''
  targetHeight.value = ''
  cropPreset.value = 'square'
  socialPreset.value = 'instagram-square'
  hasRun.value = false
  clearResult()
}

function loadImage(file: File): Promise<LoadedImage> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      resolve({
        element: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        objectUrl,
      })
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('The selected file could not be decoded as an image by this browser.'))
    }

    image.src = objectUrl
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, plan: PixelBatchTransformPlan): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('The browser could not encode this image format. Try WebP or JPEG.'))
        return
      }

      if (plan.outputFormat === 'image/avif' && blob.type !== 'image/avif') {
        reject(new Error('This browser does not support AVIF Canvas export. Choose WebP, JPEG or PNG.'))
        return
      }

      resolve(blob)
    }, plan.outputFormat, plan.quality)
  })
}

async function renderImage(image: HTMLImageElement, plan: PixelBatchTransformPlan): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = plan.outputWidth
  canvas.height = plan.outputHeight

  const context = canvas.getContext('2d', { alpha: plan.outputFormat !== 'image/jpeg' })
  if (!context) {
    throw new Error('Canvas rendering is not available in this browser.')
  }

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(
    image,
    plan.crop.sx,
    plan.crop.sy,
    plan.crop.sw,
    plan.crop.sh,
    0,
    0,
    plan.outputWidth,
    plan.outputHeight,
  )

  return canvasToBlob(canvas, plan)
}

async function runTool(): Promise<void> {
  hasRun.value = true
  clearResult()

  if (!selectedFile.value) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: 'Choose a PNG, JPEG, WebP or browser-supported AVIF image first.',
    }
    return
  }

  isRunning.value = true
  trackPixelBatchEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_started')

  let loaded: LoadedImage | null = null

  try {
    loaded = await loadImage(selectedFile.value)
    const workerResult = await runPixelBatchToolInWorker({
      slug: tool.slug,
      input: {
        fileName: selectedFile.value.name,
        mimeType: selectedFile.value.type,
        sizeBytes: selectedFile.value.size,
        width: loaded.width,
        height: loaded.height,
        outputFormat: outputFormat.value,
        quality: quality.value / 100,
        targetWidth: targetWidth.value ? Number(targetWidth.value) : undefined,
        targetHeight: targetHeight.value ? Number(targetHeight.value) : undefined,
        cropPreset: cropPreset.value,
        socialPreset: socialPreset.value,
        removeMetadata: tool.slug === 'metadata-remover',
      },
    })

    if (!workerResult.ok || !workerResult.plan) {
      result.value = workerResult
      trackPixelBatchEvent({
        toolSlug: tool.slug,
        locale,
        routePath: canonicalPath,
      }, 'tool_failed')
      return
    }

    const blob = await renderImage(loaded.element, workerResult.plan)
    previewUrl.value = URL.createObjectURL(blob)
    outputSize.value = blob.size
    outputFileName.value = workerResult.output
    result.value = workerResult

    trackPixelBatchEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'file_processed')
    trackPixelBatchEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'tool_completed')
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Image processing failed.',
    }
    trackPixelBatchEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'tool_failed')
  } finally {
    if (loaded) {
      URL.revokeObjectURL(loaded.objectUrl)
    }
    isRunning.value = false
  }
}

function downloadImage(): void {
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

  trackPixelBatchEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'file_downloaded')
}

onMounted(() => {
  trackPixelBatchEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_viewed')
})

onBeforeUnmount(() => {
  revokeSourcePreviewUrl()
  revokePreviewUrl()
})

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | PixelBatch`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | PixelBatch`,
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
          <span class="status">Local MVP</span>
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
          <form class="utility-form image-form" @submit.prevent="runTool">
            <div class="field dropzone">
              <label :for="`${tool.slug}-file`">{{ shellCopy.fileLabel }}</label>
              <strong>{{ shellCopy.dropzoneTitle }}</strong>
              <span>{{ shellCopy.dropzoneBody }}</span>
              <input
                :id="`${tool.slug}-file`"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif"
                @change="onFileSelected"
              >
              <p class="field-help">{{ selectedFileLabel }}</p>
            </div>

            <div class="form-grid">
              <div class="field">
                <label :for="`${tool.slug}-format`">{{ shellCopy.formatLabel }}</label>
                <select :id="`${tool.slug}-format`" v-model="outputFormat">
                  <option v-for="option in formatOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="field">
                <label :for="`${tool.slug}-quality`">{{ shellCopy.qualityLabel }}: {{ quality }}%</label>
                <input :id="`${tool.slug}-quality`" v-model.number="quality" type="range" min="10" max="95" step="1">
              </div>
            </div>

            <div v-if="tool.slug === 'image-resizer'" class="form-grid">
              <div class="field">
                <label :for="`${tool.slug}-width`">{{ shellCopy.widthLabel }}</label>
                <input :id="`${tool.slug}-width`" v-model="targetWidth" inputmode="numeric" placeholder="1200">
              </div>
              <div class="field">
                <label :for="`${tool.slug}-height`">{{ shellCopy.heightLabel }}</label>
                <input :id="`${tool.slug}-height`" v-model="targetHeight" inputmode="numeric" placeholder="auto">
              </div>
            </div>

            <div v-if="tool.slug === 'image-cropper'" class="field">
              <label :for="`${tool.slug}-crop`">{{ shellCopy.cropLabel }}</label>
              <select :id="`${tool.slug}-crop`" v-model="cropPreset">
                <option v-for="option in cropOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div v-if="tool.slug === 'social-preset-generator'" class="field">
              <label :for="`${tool.slug}-preset`">{{ shellCopy.presetLabel }}</label>
              <select :id="`${tool.slug}-preset`" v-model="socialPreset">
                <option v-for="option in socialOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
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
                @click="downloadImage"
              >
                {{ shellCopy.downloadLabel }}
              </button>
            </div>
          </form>

          <div class="workflow-steps" :aria-label="shellCopy.workflowSnapshotTitle">
            <div v-for="step in workflowSteps" :key="step.title">
              <strong>{{ step.title }}</strong>
              <span>{{ step.body }}</span>
            </div>
          </div>
        </section>

        <section class="result-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
          <h2 :id="`${tool.slug}-result`">{{ resultTitle }}</h2>

          <p v-if="isRunning">Processing the selected image locally...</p>
          <p v-else-if="!hasRun">{{ shellCopy.privacyNote }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>

          <figure v-if="sourcePreviewUrl && !previewUrl" class="image-preview image-preview--source">
            <figcaption>{{ shellCopy.sourcePreviewTitle }}</figcaption>
            <div class="image-preview__frame">
              <img :src="sourcePreviewUrl" alt="Original image preview">
            </div>
          </figure>

          <template v-else-if="result?.ok && previewUrl">
            <div class="result-meta">
              <div v-for="item in displayedMeta" :key="`${item.label}-${item.value}`">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>

            <section class="before-after" :aria-labelledby="`${tool.slug}-before-after`">
              <h3 :id="`${tool.slug}-before-after`">{{ shellCopy.beforeAfterTitle }}</h3>
              <div class="before-after-grid">
                <figure class="image-preview">
                  <figcaption>{{ shellCopy.sourcePreviewTitle }}</figcaption>
                  <div class="image-preview__frame">
                    <img v-if="sourcePreviewUrl" :src="sourcePreviewUrl" alt="Original image preview">
                  </div>
                </figure>
                <figure class="image-preview">
                  <figcaption>{{ shellCopy.outputPreviewTitle }}</figcaption>
                  <div class="image-preview__frame">
                    <img :src="previewUrl" alt="Processed image preview">
                  </div>
                </figure>
              </div>
              <p>{{ result.plan?.privacyNote }}</p>
            </section>

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
              <dd>Server-side batch, API and AI processing require upload validation, sandboxing, retention and antivirus gates before activation.</dd>
            </div>
          </dl>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-workflow`">
          <h2 :id="`${tool.slug}-workflow`">{{ shellCopy.workflowSnapshotTitle }}</h2>
          <div class="privacy-list">
            <div v-for="item in workflowChecklist" :key="item.label">
              <strong>{{ item.label }}</strong>
              <span>{{ item.value }}</span>
            </div>
          </div>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-privacy`">
          <h2 :id="`${tool.slug}-privacy`">{{ shellCopy.privacyChecklistTitle }}</h2>
          <ul class="warning-list">
            <li>No image bytes leave the browser session.</li>
            <li>Object URLs are revoked when the page resets or unloads.</li>
            <li>Analytics keeps only the tool slug, locale and route.</li>
          </ul>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-batch`">
          <h2 :id="`${tool.slug}-batch`">{{ shellCopy.batchQueueTitle }}</h2>
          <p>{{ shellCopy.batchQueueBody }}</p>
          <ul class="warning-list">
            <li v-for="item in shellCopy.batchQueueItems" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-related`">
          <h2 :id="`${tool.slug}-related`">{{ shellCopy.relatedToolsTitle }}</h2>
          <p>{{ shellCopy.relatedToolsBody }}</p>
          <div class="related-list">
            <NuxtLink
              v-for="relatedTool in relatedTools"
              :key="relatedTool.slug"
              class="related-card"
              :to="localizedToolPath(locale, relatedTool.slug)"
            >
              <strong>{{ relatedTool.title }}</strong>
              <span>{{ relatedTool.description }}</span>
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
