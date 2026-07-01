<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getShellCopy } from '../data/copy'
import {
  formatBytes,
  getCategoryLabel,
  getPixelBatchToolBySlug,
  getPixelBatchToolCopy,
  getPixelBatchWorkflowSteps,
  getRelatedPixelBatchTools,
  pixelBatchToolCatalog,
  type PixelBatchCropPreset,
  type PixelBatchOutputFormat,
  type PixelBatchSocialPreset,
  type PixelBatchToolResult,
  type PixelBatchToolSlug,
  type PixelBatchTransformPlan,
} from '../data/tools'
import { localizedToolPath, type LocaleCode } from '../data/locales'
import { trackPixelBatchEvent } from '../utils/analytics'
import { runPixelBatchToolInWorker } from '../utils/pixelbatchWorker'

interface LoadedImage {
  element: HTMLImageElement
  width: number
  height: number
  objectUrl: string
}

type UseCasePreset = 'web' | 'storefront' | 'social'
type SocialPresetSelection = PixelBatchSocialPreset | 'all'

interface SocialOutput {
  preset: PixelBatchSocialPreset
  label: string
  previewUrl: string
  fileName: string
  size: number
}

const props = withDefaults(defineProps<{
  locale: LocaleCode
  initialSlug: PixelBatchToolSlug
  trackView?: boolean
}>(), {
  trackView: false,
})

const initialTool = getPixelBatchToolBySlug(props.initialSlug) ?? pixelBatchToolCatalog[0]
const selectedSlug = ref<PixelBatchToolSlug>(initialTool.slug)
const selectedFile = ref<File | null>(null)
const outputFormat = ref<PixelBatchOutputFormat>(initialTool.defaultFormat)
const quality = ref(Math.round(initialTool.defaultQuality * 100))
const targetWidth = ref(initialTool.slug === 'image-resizer' ? '1200' : '')
const targetHeight = ref('')
const maintainAspectRatio = ref(true)
const cropPreset = ref<PixelBatchCropPreset>('square')
const socialPreset = ref<SocialPresetSelection>('instagram-square')
const hasRun = ref(false)
const isRunning = ref(false)
const isDownloading = ref(false)
const isDragging = ref(false)
const result = ref<PixelBatchToolResult | null>(null)
const sourcePreviewUrl = ref('')
const previewUrl = ref('')
const socialOutputs = ref<SocialOutput[]>([])
const outputFileName = ref('')
const outputSize = ref(0)

const tool = computed(() => getPixelBatchToolBySlug(selectedSlug.value) ?? pixelBatchToolCatalog[0])
const copy = computed(() => getPixelBatchToolCopy(tool.value, props.locale))
const shellCopy = computed(() => getShellCopy(props.locale))
const canonicalPath = computed(() => localizedToolPath(props.locale, tool.value.slug))
const relatedTools = computed(() => getRelatedPixelBatchTools(tool.value.slug, props.locale))
const workflowSteps = computed(() => getPixelBatchWorkflowSteps(tool.value.slug, props.locale))
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.value.invalidResultTitle : copy.value.resultLabel)
const selectedFileLabel = computed(() => selectedFile.value ? `${selectedFile.value.name} (${formatBytes(selectedFile.value.size)})` : shellCopy.value.privacyNote)
const outputSavingsLabel = computed(() => {
  if (!selectedFile.value || !outputSize.value) {
    return '-'
  }

  const delta = selectedFile.value.size - outputSize.value
  const ratio = Math.round((delta / selectedFile.value.size) * 100)
  return delta >= 0
    ? `${formatBytes(delta)} saved (${ratio}%)`
    : `${formatBytes(Math.abs(delta))} larger (${Math.abs(ratio)}%)`
})
const outputReductionLabel = computed(() => {
  if (!selectedFile.value || !outputSize.value) {
    return '-'
  }

  const ratio = Math.round(((selectedFile.value.size - outputSize.value) / selectedFile.value.size) * 100)

  return `${ratio}%`
})
const localizedResultMeta = computed(() => (result.value?.meta ?? []).map((item) => ({
  ...item,
  label: localizeMetaLabel(item.label),
})))
const displayedMeta = computed(() => {
  if (!result.value?.ok) {
    return []
  }

  return [
    ...localizedResultMeta.value,
    { label: shellCopy.value.actualOutputLabel, value: outputSize.value ? formatBytes(outputSize.value) : '-' },
    { label: shellCopy.value.savingsLabel, value: outputSavingsLabel.value },
    { label: shellCopy.value.reductionLabel, value: outputReductionLabel.value },
    ...(tool.value.slug === 'metadata-remover'
      ? [{ label: shellCopy.value.metadataHandlingLabel, value: shellCopy.value.metadataHandlingBody }]
      : []),
    { label: shellCopy.value.workerLabel, value: result.value.plan?.workerUsed ? shellCopy.value.browserWorkerLabel : shellCopy.value.localFallbackLabel },
  ]
})
const workflowChecklist = computed(() => [
  {
    label: shellCopy.value.fileStateLabel,
    value: selectedFile.value ? `${selectedFile.value.type || 'image'} / ${formatBytes(selectedFile.value.size)}` : shellCopy.value.noFileSelectedLabel,
  },
  {
    label: shellCopy.value.renderStateLabel,
    value: result.value?.plan
      ? `${result.value.plan.outputWidth} x ${result.value.plan.outputHeight} ${result.value.plan.outputExtension.toUpperCase()}`
      : shellCopy.value.renderPendingLabel,
  },
  {
    label: shellCopy.value.storageStateLabel,
    value: shellCopy.value.storageStateBody,
  },
  {
    label: shellCopy.value.upgradePathLabel,
    value: result.value?.plan?.upgradeGateNote ?? shellCopy.value.upgradeGateBody,
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
  { value: 'open-graph', label: 'Open Graph 1200 x 630' },
  { value: 'marketplace', label: 'Marketplace 1600 x 1600' },
]

const socialOutputOptions: Array<{ value: PixelBatchSocialPreset; label: string }> = [
  { value: 'instagram-square', label: 'Instagram square 1080 x 1080' },
  { value: 'story', label: 'Story 1080 x 1920' },
  { value: 'open-graph', label: 'Open Graph 1200 x 630' },
  { value: 'marketplace', label: 'Marketplace 1600 x 1600' },
]
const socialOptions: Array<{ value: SocialPresetSelection; label: string }> = [
  { value: 'all', label: shellCopy.value.allSocialPresetsLabel },
  ...socialOutputOptions,
]

function localizeMetaLabel(label: string): string {
  const labels: Record<string, string> = {
    'Input size': shellCopy.value.originalSizeLabel,
    'Input dimensions': shellCopy.value.inputDimensionsLabel,
    'Output dimensions': shellCopy.value.outputDimensionsLabel,
    'Output format': shellCopy.value.outputFormatMetaLabel,
    Quality: shellCopy.value.qualityMetaLabel,
    'Estimated output': shellCopy.value.estimatedOutputLabel,
  }

  return labels[label] ?? label
}

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

function revokeSocialOutputUrls(): void {
  for (const output of socialOutputs.value) {
    URL.revokeObjectURL(output.previewUrl)
  }
  socialOutputs.value = []
}

function clearResult(): void {
  revokePreviewUrl()
  revokeSocialOutputUrls()
  result.value = null
  outputFileName.value = ''
  outputSize.value = 0
}

function resetSettings(clearFile = false): void {
  outputFormat.value = tool.value.defaultFormat
  quality.value = Math.round(tool.value.defaultQuality * 100)
  targetWidth.value = tool.value.slug === 'image-resizer' ? '1200' : ''
  targetHeight.value = ''
  maintainAspectRatio.value = true
  cropPreset.value = 'square'
  socialPreset.value = 'instagram-square'
  hasRun.value = false
  if (clearFile) {
    selectedFile.value = null
    revokeSourcePreviewUrl()
  }
  clearResult()
}

function selectTool(slug: PixelBatchToolSlug): void {
  if (selectedSlug.value === slug) {
    return
  }

  selectedSlug.value = slug
}

function setSelectedFile(file: File | null): void {
  selectedFile.value = file
  hasRun.value = false
  revokeSourcePreviewUrl()
  if (file) {
    sourcePreviewUrl.value = URL.createObjectURL(file)
  }
  clearResult()
}

function onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement
  setSelectedFile(input.files?.[0] ?? null)
}

function onDrop(event: DragEvent): void {
  isDragging.value = false
  setSelectedFile(event.dataTransfer?.files?.[0] ?? null)
}

function applyUseCasePreset(preset: UseCasePreset): void {
  if (preset === 'web') {
    outputFormat.value = 'image/webp'
    quality.value = 72
    targetWidth.value = tool.value.slug === 'image-resizer' ? '1600' : targetWidth.value
    maintainAspectRatio.value = true
    return
  }

  if (preset === 'storefront') {
    outputFormat.value = 'image/jpeg'
    quality.value = 84
    targetWidth.value = tool.value.slug === 'image-resizer' ? '1600' : targetWidth.value
    maintainAspectRatio.value = true
    socialPreset.value = 'marketplace'
    cropPreset.value = 'square'
    return
  }

  outputFormat.value = 'image/webp'
  quality.value = 82
  socialPreset.value = tool.value.slug === 'social-preset-generator' ? 'all' : 'instagram-square'
  cropPreset.value = 'portrait'
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

function outputNameForPreset(fileName: string, preset: PixelBatchSocialPreset): string {
  return fileName.replace(/(\.[^.]+)$/i, `-${preset}$1`)
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
    toolSlug: tool.value.slug,
    locale: props.locale,
    routePath: canonicalPath.value,
  }, 'tool_started')

  let loaded: LoadedImage | null = null

  try {
    loaded = await loadImage(selectedFile.value)
    const resizeTargetWidth = targetWidth.value ? Number(targetWidth.value) : undefined
    const resizeTargetHeight = maintainAspectRatio.value && resizeTargetWidth
      ? undefined
      : targetHeight.value ? Number(targetHeight.value) : undefined
    const selectedSocialOutputs = tool.value.slug === 'social-preset-generator' && socialPreset.value === 'all'
      ? socialOutputOptions
      : socialOutputOptions.filter((option) => option.value === socialPreset.value)
    const firstSocialOutput = selectedSocialOutputs[0]
    const workerResult = await runPixelBatchToolInWorker({
      slug: tool.value.slug,
      input: {
        fileName: selectedFile.value.name,
        mimeType: selectedFile.value.type,
        sizeBytes: selectedFile.value.size,
        width: loaded.width,
        height: loaded.height,
        outputFormat: outputFormat.value,
        quality: quality.value / 100,
        targetWidth: resizeTargetWidth,
        targetHeight: resizeTargetHeight,
        cropPreset: cropPreset.value,
        socialPreset: firstSocialOutput?.value ?? 'instagram-square',
        removeMetadata: tool.value.slug === 'metadata-remover',
      },
    })

    if (!workerResult.ok || !workerResult.plan) {
      result.value = workerResult
      trackPixelBatchEvent({
        toolSlug: tool.value.slug,
        locale: props.locale,
        routePath: canonicalPath.value,
      }, 'tool_failed')
      return
    }

    const blob = await renderImage(loaded.element, workerResult.plan)
    previewUrl.value = URL.createObjectURL(blob)
    outputSize.value = blob.size
    outputFileName.value = workerResult.output
    result.value = workerResult

    if (tool.value.slug === 'social-preset-generator' && selectedSocialOutputs.length > 1) {
      const outputs: SocialOutput[] = [{
        preset: firstSocialOutput.value,
        label: firstSocialOutput.label,
        previewUrl: previewUrl.value,
        fileName: outputNameForPreset(workerResult.output, firstSocialOutput.value),
        size: blob.size,
      }]
      outputFileName.value = outputs[0].fileName

      for (const option of selectedSocialOutputs.slice(1)) {
        const presetResult = await runPixelBatchToolInWorker({
          slug: tool.value.slug,
          input: {
            fileName: selectedFile.value.name,
            mimeType: selectedFile.value.type,
            sizeBytes: selectedFile.value.size,
            width: loaded.width,
            height: loaded.height,
            outputFormat: outputFormat.value,
            quality: quality.value / 100,
            socialPreset: option.value,
          },
        })

        if (!presetResult.ok || !presetResult.plan) {
          result.value = presetResult
          trackPixelBatchEvent({
            toolSlug: tool.value.slug,
            locale: props.locale,
            routePath: canonicalPath.value,
          }, 'tool_failed')
          return
        }

        const presetBlob = await renderImage(loaded.element, presetResult.plan)
        outputs.push({
          preset: option.value,
          label: option.label,
          previewUrl: URL.createObjectURL(presetBlob),
          fileName: outputNameForPreset(presetResult.output, option.value),
          size: presetBlob.size,
        })
      }

      socialOutputs.value = outputs
    }

    trackPixelBatchEvent({
      toolSlug: tool.value.slug,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'file_processed')
    trackPixelBatchEvent({
      toolSlug: tool.value.slug,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'tool_completed')
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Image processing failed.',
    }
    trackPixelBatchEvent({
      toolSlug: tool.value.slug,
      locale: props.locale,
      routePath: canonicalPath.value,
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
    toolSlug: tool.value.slug,
    locale: props.locale,
    routePath: canonicalPath.value,
  }, 'file_downloaded')
}

function downloadSocialOutput(output: SocialOutput): void {
  const link = document.createElement('a')
  link.href = output.previewUrl
  link.download = output.fileName
  document.body.appendChild(link)
  link.click()
  link.remove()

  trackPixelBatchEvent({
    toolSlug: tool.value.slug,
    locale: props.locale,
    routePath: canonicalPath.value,
  }, 'file_downloaded')
}

watch(selectedSlug, () => {
  resetSettings(false)
})

onMounted(() => {
  if (props.trackView) {
    trackPixelBatchEvent({
      toolSlug: tool.value.slug,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'tool_viewed')
  }
})

onBeforeUnmount(() => {
  revokeSourcePreviewUrl()
  revokePreviewUrl()
})
</script>

<template>
  <section class="image-workbench" aria-labelledby="pixelbatch-workbench-title">
    <div class="workbench-heading">
      <div>
        <p class="eyebrow">{{ shellCopy.workbenchEyebrow }}</p>
        <h2 id="pixelbatch-workbench-title">{{ shellCopy.workbenchTitle }}</h2>
        <p>{{ shellCopy.workbenchBody }}</p>
      </div>
      <div class="workbench-pills" aria-label="PixelBatch local safeguards">
        <span>{{ shellCopy.browserOnlyLabel }}</span>
        <span>{{ shellCopy.noUploadLabel }}</span>
        <span>{{ shellCopy.oneImageLabel }}</span>
      </div>
    </div>

    <div class="image-tool-tabs" :aria-label="shellCopy.toolTabsLabel">
      <button
        v-for="item in pixelBatchToolCatalog"
        :key="item.slug"
        type="button"
        :aria-pressed="selectedSlug === item.slug"
        @click="selectTool(item.slug)"
      >
        <strong>{{ getPixelBatchToolCopy(item, locale).shortName }}</strong>
        <span>{{ getCategoryLabel(item.category, locale) }}</span>
      </button>
    </div>

    <div class="image-workbench__grid">
      <section class="input-panel image-workbench__input" :aria-label="shellCopy.inputTitle">
        <div class="tool-heading-row">
          <div>
            <span class="category">{{ getCategoryLabel(tool.category, locale) }}</span>
            <p class="workbench-tool-title">{{ copy.title }}</p>
          </div>
          <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, tool.slug)">
            {{ shellCopy.openGuideLabel }}
          </NuxtLink>
        </div>

        <p>{{ copy.description }}</p>

        <form class="utility-form image-form" @submit.prevent="runTool">
          <div
            :class="['field', 'dropzone', 'image-dropzone', isDragging ? 'image-dropzone--dragging' : '']"
            @dragenter.prevent="isDragging = true"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
          >
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

          <section class="use-case-panel" :aria-labelledby="`${tool.slug}-presets`">
            <h3 :id="`${tool.slug}-presets`">{{ shellCopy.useCaseTitle }}</h3>
            <p>{{ shellCopy.useCaseBody }}</p>
            <div class="preset-chips">
              <button type="button" @click="applyUseCasePreset('web')">{{ shellCopy.useCaseWebLabel }}</button>
              <button type="button" @click="applyUseCasePreset('storefront')">{{ shellCopy.useCaseStorefrontLabel }}</button>
              <button type="button" @click="applyUseCasePreset('social')">{{ shellCopy.useCaseSocialLabel }}</button>
            </div>
          </section>

          <div class="form-grid">
            <div class="field">
              <label :for="`${tool.slug}-format`">{{ shellCopy.formatLabel }}</label>
              <select :id="`${tool.slug}-format`" v-model="outputFormat">
                <option v-for="option in formatOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
              <p v-if="outputFormat === 'image/avif'" class="field-help">{{ shellCopy.avifSupportBody }}</p>
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
              <input :id="`${tool.slug}-height`" v-model="targetHeight" inputmode="numeric" placeholder="auto" :disabled="maintainAspectRatio && Boolean(targetWidth)">
            </div>
            <label class="inline-check">
              <input v-model="maintainAspectRatio" type="checkbox">
              <span>{{ shellCopy.maintainAspectRatioLabel }}</span>
            </label>
          </div>

          <div v-if="tool.slug === 'image-cropper'" class="field">
            <label :for="`${tool.slug}-crop`">{{ shellCopy.cropLabel }}</label>
            <select :id="`${tool.slug}-crop`" v-model="cropPreset">
              <option v-for="option in cropOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <p class="field-help">{{ shellCopy.centeredCropNotice }}</p>
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
            <button :class="getButtonClass('secondary')" type="button" @click="resetSettings(true)">
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

      <section class="result-panel image-workbench__preview" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
        <div class="preview-heading">
          <div>
            <p class="eyebrow">{{ shellCopy.previewEyebrow }}</p>
            <h3 :id="`${tool.slug}-result`">{{ resultTitle }}</h3>
          </div>
          <span>{{ outputFileName || shellCopy.previewPendingLabel }}</span>
        </div>

        <p v-if="isRunning">{{ shellCopy.processingBody }}</p>
        <p v-else-if="!hasRun && !sourcePreviewUrl">{{ shellCopy.previewEmptyBody }}</p>
        <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>

        <figure v-if="sourcePreviewUrl && !previewUrl" class="image-preview image-preview--source">
          <figcaption>{{ shellCopy.sourcePreviewTitle }}</figcaption>
          <div class="image-preview__frame image-preview__frame--large">
            <img :src="sourcePreviewUrl" alt="Original image preview">
          </div>
        </figure>

        <template v-else-if="result?.ok && previewUrl">
          <div class="result-meta result-meta--dense">
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

          <section v-if="socialOutputs.length > 1" class="social-output-panel" :aria-labelledby="`${tool.slug}-social-outputs`">
            <div>
              <h3 :id="`${tool.slug}-social-outputs`">{{ shellCopy.socialOutputsTitle }}</h3>
              <p>{{ shellCopy.socialOutputsBody }}</p>
            </div>
            <div class="social-output-grid">
              <article v-for="output in socialOutputs" :key="output.preset" class="social-output-card">
                <figure class="image-preview">
                  <figcaption>{{ output.label }}</figcaption>
                  <div class="image-preview__frame">
                    <img :src="output.previewUrl" :alt="`${output.label} preview`">
                  </div>
                </figure>
                <dl class="fact-list">
                  <div>
                    <dt>{{ shellCopy.actualOutputLabel }}</dt>
                    <dd>{{ formatBytes(output.size) }}</dd>
                  </div>
                </dl>
                <button class="button-link button-link--secondary" type="button" @click="downloadSocialOutput(output)">
                  {{ shellCopy.downloadPresetLabel }}
                </button>
              </article>
            </div>
          </section>

          <ul v-if="result.plan?.warnings.length" class="warning-list">
            <li v-for="warning in result.plan.warnings" :key="warning">{{ warning }}</li>
          </ul>
        </template>

        <div v-else class="empty-preview">
          <span>{{ shellCopy.previewEmptyTitle }}</span>
        </div>
      </section>
    </div>

    <div class="workbench-support-grid">
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

      <section class="band" :aria-labelledby="`${tool.slug}-workflow`">
        <h3 :id="`${tool.slug}-workflow`">{{ shellCopy.workflowSnapshotTitle }}</h3>
        <div class="privacy-list">
          <div v-for="item in workflowChecklist" :key="item.label">
            <strong>{{ item.label }}</strong>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </section>

      <section class="band" :aria-labelledby="`${tool.slug}-privacy`">
        <h3 :id="`${tool.slug}-privacy`">{{ shellCopy.privacyChecklistTitle }}</h3>
        <ul class="warning-list">
          <li>{{ shellCopy.privacyImageBytesLabel }}</li>
          <li>{{ shellCopy.privacyObjectUrlLabel }}</li>
          <li>{{ shellCopy.privacyAnalyticsLabel }}</li>
        </ul>
      </section>

      <section class="band" :aria-labelledby="`${tool.slug}-batch`">
        <h3 :id="`${tool.slug}-batch`">{{ shellCopy.batchQueueTitle }}</h3>
        <p>{{ shellCopy.batchQueueBody }}</p>
        <ul class="warning-list">
          <li v-for="item in shellCopy.batchQueueItems" :key="item">{{ item }}</li>
        </ul>
      </section>
    </div>

    <section class="band related-band" :aria-labelledby="`${tool.slug}-related`">
      <div>
        <h3 :id="`${tool.slug}-related`">{{ shellCopy.relatedToolsTitle }}</h3>
        <p>{{ shellCopy.relatedToolsBody }}</p>
      </div>
      <div class="related-list related-list--inline">
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
  </section>
</template>
