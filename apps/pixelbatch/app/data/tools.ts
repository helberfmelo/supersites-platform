import { publicLocaleCodes, sanitizePublicCopy, type LocaleCode } from './locales'

export const pixelBatchToolSlugs = [
  'image-compressor',
  'image-resizer',
  'image-cropper',
  'image-converter',
  'metadata-remover',
  'social-preset-generator',
] as const

export type PixelBatchToolSlug = (typeof pixelBatchToolSlugs)[number]
export type PixelBatchToolCategory = 'optimize' | 'resize' | 'crop' | 'convert' | 'privacy' | 'presets'
export type PixelBatchOutputFormat = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif'
export type PixelBatchCropPreset = 'free' | 'square' | 'portrait' | 'landscape' | 'open-graph' | 'marketplace'
export type PixelBatchSocialPreset = 'instagram-square' | 'story' | 'open-graph' | 'marketplace'

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PixelBatchToolCopy {
  title: string
  shortName: string
  headline: string
  description: string
  resultLabel: string
  freeScope: string
  upgradeScope: string
  reviewedLabel: string
  contentSections: ContentSection[]
  faq: FaqItem[]
}

export interface PixelBatchToolDefinition {
  slug: PixelBatchToolSlug
  category: PixelBatchToolCategory
  defaultFormat: PixelBatchOutputFormat
  defaultQuality: number
  localized: Record<LocaleCode, PixelBatchToolCopy>
}

export interface PixelBatchRelatedTool {
  slug: PixelBatchToolSlug
  title: string
  description: string
}

export interface PixelBatchWorkflowStep {
  title: string
  body: string
}

export interface PixelBatchToolInput {
  fileName: string
  mimeType: string
  sizeBytes: number
  width: number
  height: number
  outputFormat?: PixelBatchOutputFormat
  quality?: number
  targetWidth?: number
  targetHeight?: number
  cropPreset?: PixelBatchCropPreset
  socialPreset?: PixelBatchSocialPreset
  removeMetadata?: boolean
}

export interface PixelBatchCropPlan {
  sx: number
  sy: number
  sw: number
  sh: number
}

export interface PixelBatchTransformPlan {
  slug: PixelBatchToolSlug
  inputName: string
  outputFormat: PixelBatchOutputFormat
  outputExtension: string
  outputWidth: number
  outputHeight: number
  quality: number
  crop: PixelBatchCropPlan
  removeMetadata: boolean
  workerUsed: boolean
  warnings: string[]
  privacyNote: string
  upgradeGateNote: string
}

export interface ResultMeta {
  label: string
  value: string
}

export interface PixelBatchToolResult {
  ok: boolean
  output: string
  meta: ResultMeta[]
  plan?: PixelBatchTransformPlan
  error?: string
}

interface PixelBatchToolSpec {
  slug: PixelBatchToolSlug
  category: PixelBatchToolCategory
  defaultFormat: PixelBatchOutputFormat
  defaultQuality: number
  title: string
  shortName: string
  headline: string
  description: string
  freeScope: string
  upgradeScope: string
}

const maxFreeBytes = 10 * 1024 * 1024
const maxFreePixels = 40_000_000
const maxFreeDimension = 8_000
const maxOutputDimension = 6_000
const allowedMimeTypes = new Set<PixelBatchOutputFormat>([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
])

const reviewed: Record<LocaleCode, string> = {
  en: 'Reviewed June 27, 2026',
  'pt-br': 'Revisado em 27 de junho de 2026',
  es: 'Revisado el 27 de junio de 2026',
  fr: 'Revise le 27 juin 2026',
  de: 'Geprueft am 27. Juni 2026',
}

const localizedBasics: Record<LocaleCode, {
  resultLabel: string
  localSection: string
  localBody: string
  workerSection: string
  workerBody: string
  gateSection: string
  gateBody: string
  faqStorage: FaqItem
  faqBatch: FaqItem
}> = {
  en: {
    resultLabel: 'Image preview',
    localSection: 'Local image data',
    localBody: 'The free browser tool processes one selected image in the browser. File names, pixels and generated output are not sent to a product API or analytics.',
    workerSection: 'Worker and canvas flow',
    workerBody: 'A browser worker validates limits and creates a transform plan; Canvas re-encodes the image to resize, crop, convert or strip metadata when supported.',
    gateSection: 'Free limits and upgrade boundary',
    gateBody: 'Batch folders, larger files, saved presets, integrations, API, high-resolution automation and AI credits remain account workflow features.',
    faqStorage: { question: 'Are my images uploaded or stored?', answer: 'No. PixelBatch uses browser memory and object URLs only; it does not use localStorage, sessionStorage or a product upload endpoint.' },
    faqBatch: { question: 'Can I process a whole folder?', answer: 'Not in the free browser flow. Batch processing, folders and larger files need account controls for worker quota and retention.' },
  },
  'pt-br': {
    resultLabel: 'Preview da imagem',
    localSection: 'Dados locais da imagem',
    localBody: 'A ferramenta gratuita processa uma imagem selecionada no navegador. Nome, pixels e resultado nao sao enviados a API de produto ou analytics.',
    workerSection: 'Fluxo worker e canvas',
    workerBody: 'Um worker valida limites e monta o plano; o Canvas reencodeia a imagem para redimensionar, cortar, converter ou remover metadados quando suportado.',
    gateSection: 'Limites gratuitos e upgrade',
    gateBody: 'Lotes, pastas, arquivos maiores, presets salvos, integracoes, API, alta resolucao e creditos de IA seguem como workflow pago.',
    faqStorage: { question: 'Minhas imagens sao enviadas ou armazenadas?', answer: 'Nao. O PixelBatch usa memoria do navegador e object URLs; nao usa localStorage, sessionStorage ou endpoint de upload.' },
    faqBatch: { question: 'Posso processar uma pasta inteira?', answer: 'Nao no fluxo gratuito do navegador. Lotes, pastas e arquivos maiores precisam de controles de conta para worker, quota e retencao.' },
  },
  es: {
    resultLabel: 'Vista de imagen',
    localSection: 'Datos locales',
    localBody: 'La herramienta gratis procesa una imagen seleccionada en el navegador. Nombre, pixeles y salida no se envian a API de producto ni analytics.',
    workerSection: 'Worker y canvas',
    workerBody: 'Un worker valida limites y crea el plan; Canvas re-codifica para redimensionar, recortar, convertir o quitar metadatos cuando el navegador lo soporta.',
    gateSection: 'Limites gratis y upgrade',
    gateBody: 'Lotes, carpetas, archivos grandes, presets guardados, integraciones, API, alta resolucion e IA quedan como workflow pago.',
    faqStorage: { question: 'Se suben o guardan mis imagenes?', answer: 'No. PixelBatch usa memoria del navegador y object URLs; no usa localStorage, sessionStorage ni endpoint de subida.' },
    faqBatch: { question: 'Puedo procesar una carpeta?', answer: 'No en el flujo gratis del navegador. Lotes, carpetas y archivos mayores necesitan controles de cuenta para worker, cuota y retencion.' },
  },
  fr: {
    resultLabel: 'Apercu image',
    localSection: 'Donnees locales',
    localBody: 'L outil gratuit traite une image choisie dans le navigateur. Noms, pixels et sortie ne partent pas vers une API produit ou analytics.',
    workerSection: 'Worker et canvas',
    workerBody: 'Un worker valide les limites et cree le plan; Canvas reencode pour redimensionner, rogner, convertir ou supprimer les metadonnees si supporte.',
    gateSection: 'Limites gratuites et offre payante',
    gateBody: 'Lots, dossiers, gros fichiers, presets sauvegardes, integrations, API, haute resolution et credits IA restent payants.',
    faqStorage: { question: 'Mes images sont-elles envoyees ou stockees?', answer: 'Non. PixelBatch utilise la memoire navigateur et des object URLs, sans localStorage, sessionStorage ni upload produit.' },
    faqBatch: { question: 'Puis-je traiter un dossier?', answer: 'Pas dans le flux navigateur gratuit. Lots, dossiers et gros fichiers exigent des controles compte pour worker, quota et retention.' },
  },
  de: {
    resultLabel: 'Bildvorschau',
    localSection: 'Lokale Bilddaten',
    localBody: 'Das kostenlose Browser-Tool verarbeitet ein ausgewaehltes Bild im Browser. Name, Pixel und Ergebnis werden nicht an Produkt-API oder Analytics gesendet.',
    workerSection: 'Worker und Canvas',
    workerBody: 'Ein Worker validiert Limits und erstellt den Plan; Canvas encodiert neu fuer Groesse, Zuschnitt, Formatwechsel oder Metadatenentfernung.',
    gateSection: 'Kostenlose Limits und Upgrade',
    gateBody: 'Batch, Ordner, groessere Dateien, gespeicherte Presets, Integrationen, API, hohe Aufloesung und KI-Credits bleiben bezahlt.',
    faqStorage: { question: 'Werden Bilder hochgeladen oder gespeichert?', answer: 'Nein. PixelBatch nutzt Browser-Speicher und Object URLs, kein localStorage, sessionStorage oder Upload-Endpunkt.' },
    faqBatch: { question: 'Kann ich einen Ordner verarbeiten?', answer: 'Nicht im kostenlosen Browserablauf. Batch, Ordner und groessere Dateien brauchen Konto-Kontrollen fuer Worker, Quota und Retention.' },
  },
}

const specs: PixelBatchToolSpec[] = [
  {
    slug: 'image-compressor',
    category: 'optimize',
    defaultFormat: 'image/webp',
    defaultQuality: 0.72,
    title: 'Image Compressor',
    shortName: 'Compress',
    headline: 'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.',
    description: 'Choose one public-safe image file, adjust quality and let PixelBatch re-encode a clean downloadable output locally.',
    freeScope: 'One image at a time up to 10 MB with browser-side quality control and no account.',
    upgradeScope: 'Batch folders, larger files, saved compression presets, background jobs, API and integrations.',
  },
  {
    slug: 'image-resizer',
    category: 'resize',
    defaultFormat: 'image/webp',
    defaultQuality: 0.82,
    title: 'Image Resizer',
    shortName: 'Resize',
    headline: 'Resize an image to exact or proportional dimensions without uploading it to a server.',
    description: 'Set width, height or both. PixelBatch preserves aspect ratio when one dimension is blank.',
    freeScope: 'One resize at a time with capped output dimensions and local download.',
    upgradeScope: 'Preset libraries, brand kits, high-resolution export, batch variants and team workflows.',
  },
  {
    slug: 'image-cropper',
    category: 'crop',
    defaultFormat: 'image/webp',
    defaultQuality: 0.84,
    title: 'Image Cropper',
    shortName: 'Crop',
    headline: 'Create centered square, portrait or landscape crops from a selected browser-side image.',
    description: 'Pick a crop profile and PixelBatch calculates a centered crop before re-encoding the result.',
    freeScope: 'One centered crop at a time with common aspect ratios and local output.',
    upgradeScope: 'Manual crop UI, batch crops, smart subject detection, saved brand sizes and team review.',
  },
  {
    slug: 'image-converter',
    category: 'convert',
    defaultFormat: 'image/png',
    defaultQuality: 0.9,
    title: 'Image Converter',
    shortName: 'Convert',
    headline: 'Convert PNG, JPEG, WebP and browser-supported AVIF images to another common format.',
    description: 'Select an output format supported by the current browser Canvas encoder and download the converted file.',
    freeScope: 'One format conversion at a time with PNG, JPEG, WebP and AVIF support when available.',
    upgradeScope: 'Bulk conversion, larger input queues, API automation, integrations and export profiles.',
  },
  {
    slug: 'metadata-remover',
    category: 'privacy',
    defaultFormat: 'image/jpeg',
    defaultQuality: 0.9,
    title: 'Metadata Remover',
    shortName: 'Clean',
    headline: 'Strip camera metadata by drawing pixels to a clean Canvas and downloading a re-encoded copy.',
    description: 'PixelBatch does not parse or preserve EXIF/IPTC fields. Re-encoding keeps only visible pixels when the browser supports the chosen output.',
    freeScope: 'One local metadata-cleaning re-encode at a time with no upload and no analytics payload values.',
    upgradeScope: 'Batch metadata cleaning, policy presets, audit reports, larger files and storage retention controls.',
  },
  {
    slug: 'social-preset-generator',
    category: 'presets',
    defaultFormat: 'image/webp',
    defaultQuality: 0.84,
    title: 'Social Preset Generator',
    shortName: 'Presets',
    headline: 'Generate square, story, Open Graph or marketplace-ready image sizes from one original.',
    description: 'Choose a common preset and PixelBatch creates a centered crop and output size for quick publishing workflows.',
    freeScope: 'One preset output at a time for social and marketplace dimensions.',
    upgradeScope: 'Brand presets, bulk channels, naming rules, team approval, integrations and high-resolution packs.',
  },
]

const categoryLabels: Record<PixelBatchToolCategory, Record<LocaleCode, string>> = {
  optimize: { en: 'Optimize', 'pt-br': 'Otimizar', es: 'Optimizar', fr: 'Optimiser', de: 'Optimieren' },
  resize: { en: 'Resize', 'pt-br': 'Redimensionar', es: 'Redimensionar', fr: 'Redimensionner', de: 'Groesse' },
  crop: { en: 'Crop', 'pt-br': 'Cortar', es: 'Recortar', fr: 'Rogner', de: 'Zuschnitt' },
  convert: { en: 'Convert', 'pt-br': 'Converter', es: 'Convertir', fr: 'Convertir', de: 'Konvertieren' },
  privacy: { en: 'Privacy', 'pt-br': 'Privacidade', es: 'Privacidad', fr: 'Confidentialite', de: 'Datenschutz' },
  presets: { en: 'Presets', 'pt-br': 'Presets', es: 'Presets', fr: 'Presets', de: 'Presets' },
}

const socialPresetSizes: Record<PixelBatchSocialPreset, { width: number; height: number; label: string }> = {
  'instagram-square': { width: 1080, height: 1080, label: 'Instagram square 1080 x 1080' },
  story: { width: 1080, height: 1920, label: 'Story 1080 x 1920' },
  'open-graph': { width: 1200, height: 630, label: 'Open Graph 1200 x 630' },
  marketplace: { width: 1600, height: 1600, label: 'Marketplace 1600 x 1600' },
}

function copyFor(spec: PixelBatchToolSpec, locale: LocaleCode): PixelBatchToolCopy {
  const base = localizedBasics[locale]

  return {
    title: spec.title,
    shortName: spec.shortName,
    headline: spec.headline,
    description: spec.description,
    resultLabel: base.resultLabel,
    freeScope: spec.freeScope,
    upgradeScope: spec.upgradeScope,
    reviewedLabel: reviewed[locale],
    contentSections: [
      { heading: base.localSection, paragraphs: [base.localBody] },
      { heading: base.workerSection, paragraphs: [base.workerBody] },
      { heading: base.gateSection, paragraphs: [base.gateBody] },
    ],
    faq: [base.faqStorage, base.faqBatch],
  }
}

function makeTool(spec: PixelBatchToolSpec): PixelBatchToolDefinition {
  return {
    slug: spec.slug,
    category: spec.category,
    defaultFormat: spec.defaultFormat,
    defaultQuality: spec.defaultQuality,
    localized: Object.fromEntries(
      publicLocaleCodes.map((locale) => [locale, copyFor(spec, locale)]),
    ) as Record<LocaleCode, PixelBatchToolCopy>,
  }
}

export const pixelBatchToolCatalog: PixelBatchToolDefinition[] = specs.map(makeTool)
const toolBySlug = new Map(pixelBatchToolCatalog.map((tool) => [tool.slug, tool]))
const relatedBySlug: Record<PixelBatchToolSlug, PixelBatchToolSlug[]> = {
  'image-compressor': ['image-resizer', 'image-converter', 'metadata-remover'],
  'image-resizer': ['image-cropper', 'social-preset-generator', 'image-compressor'],
  'image-cropper': ['social-preset-generator', 'image-resizer', 'image-converter'],
  'image-converter': ['image-compressor', 'metadata-remover', 'image-resizer'],
  'metadata-remover': ['image-converter', 'image-compressor', 'social-preset-generator'],
  'social-preset-generator': ['image-cropper', 'image-resizer', 'image-compressor'],
}

const workflowStepsBySlug: Record<PixelBatchToolSlug, PixelBatchWorkflowStep[]> = {
  'image-compressor': [
    { title: 'Choose one image', body: 'Start with a PNG, JPEG, WebP or browser-supported AVIF file up to 10 MB.' },
    { title: 'Tune quality', body: 'Use WebP or JPEG quality control for smaller browser-side output.' },
    { title: 'Download locally', body: 'The result is generated from Canvas and stays in this browser session.' },
  ],
  'image-resizer': [
    { title: 'Set dimensions', body: 'Enter width, height or one side to preserve the original aspect ratio.' },
    { title: 'Preview scale', body: 'Check the before/after dimensions before downloading the generated file.' },
    { title: 'Batch later', body: 'Multiple sizes, saved presets and brand kits belong to account workflow value.' },
  ],
  'image-cropper': [
    { title: 'Pick a crop profile', body: 'Square, portrait and landscape crops use a centered browser-side crop.' },
    { title: 'Inspect subject fit', body: 'The before/after preview helps catch crops that need manual adjustment.' },
    { title: 'Manual crop later', body: 'Manual crop UI, subject detection and review flows remain account workflow scope.' },
  ],
  'image-converter': [
    { title: 'Select output format', body: 'Convert to PNG, JPEG, WebP or AVIF when the browser encoder supports it.' },
    { title: 'Re-encode cleanly', body: 'A matching input/output format can still create a fresh local copy.' },
    { title: 'Automate later', body: 'Bulk conversion, API workflows and integrations remain account workflow scope.' },
  ],
  'metadata-remover': [
    { title: 'Re-encode pixels', body: 'PixelBatch draws visible pixels to Canvas and downloads a clean copy.' },
    { title: 'Avoid claims beyond Canvas', body: 'This is not forensic redaction of every possible hidden field.' },
    { title: 'Policy reports later', body: 'Audit reports, policy presets and retention controls remain account workflow scope.' },
  ],
  'social-preset-generator': [
    { title: 'Choose a channel preset', body: 'Generate square, story, Open Graph or marketplace dimensions.' },
    { title: 'Review centered crop', body: 'The preview shows whether the original subject fits the preset.' },
    { title: 'Brand presets later', body: 'Bulk channels, naming rules and team approval remain account workflow scope.' },
  ],
}

export function getPixelBatchToolBySlug(slug: string | undefined): PixelBatchToolDefinition | null {
  if (!pixelBatchToolSlugs.includes(slug as PixelBatchToolSlug)) {
    return null
  }

  return toolBySlug.get(slug as PixelBatchToolSlug) ?? null
}

export function getPixelBatchToolCopy(tool: PixelBatchToolDefinition, locale: LocaleCode): PixelBatchToolCopy {
  return sanitizePublicCopy(locale, tool.localized[locale])
}

export function getRelatedPixelBatchTools(slug: PixelBatchToolSlug, locale: LocaleCode): PixelBatchRelatedTool[] {
  return relatedBySlug[slug]
    .map((relatedSlug) => getPixelBatchToolBySlug(relatedSlug))
    .filter((tool): tool is PixelBatchToolDefinition => Boolean(tool))
    .map((tool) => {
      const copy = getPixelBatchToolCopy(tool, locale)

      return {
        slug: tool.slug,
        title: copy.title,
        description: copy.freeScope,
      }
    })
}

export function getPixelBatchWorkflowSteps(slug: PixelBatchToolSlug, locale: LocaleCode = 'en'): PixelBatchWorkflowStep[] {
  return sanitizePublicCopy(locale, workflowStepsBySlug[slug])
}

export function getCategoryLabel(category: PixelBatchToolCategory, locale: LocaleCode): string {
  return categoryLabels[category][locale]
}

export function filterPixelBatchTools(query: string, category: PixelBatchToolCategory | 'all', locale: LocaleCode): PixelBatchToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return pixelBatchToolCatalog.filter((tool) => {
    const copy = getPixelBatchToolCopy(tool, locale)
    const matchesCategory = category === 'all' || tool.category === category
    const searchableText = [
      tool.slug,
      tool.defaultFormat,
      getCategoryLabel(tool.category, locale),
      copy.title,
      copy.shortName,
      copy.headline,
      copy.description,
      copy.freeScope,
      copy.upgradeScope,
    ].join(' ').toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}

export function createPixelBatchToolStructuredData(tool: PixelBatchToolDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getPixelBatchToolCopy(tool, locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.title,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      url,
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: copy.headline,
      featureList: [
        copy.freeScope,
        'Browser-side image processing',
        'Metadata removal by clean re-encode',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]
}

function fail(error: string): PixelBatchToolResult {
  return { ok: false, output: '', meta: [], error }
}

function normalizeInteger(value: unknown, label: string, fallback: number): number {
  if (value === undefined || value === null || value === '') {
    return fallback
  }

  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > maxOutputDimension) {
    throw new Error(`${label} must be a whole number from 1 to ${maxOutputDimension}.`)
  }

  return parsed
}

function normalizeQuality(value: unknown, fallback: number): number {
  const parsed = Number(value ?? fallback)
  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return Math.min(0.95, Math.max(0.1, Math.round(parsed * 100) / 100))
}

function normalizeFormat(value: unknown, fallback: PixelBatchOutputFormat): PixelBatchOutputFormat {
  const format = String(value ?? fallback).trim().toLowerCase()
  if (!allowedMimeTypes.has(format as PixelBatchOutputFormat)) {
    throw new Error('Output format must be PNG, JPEG, WebP or browser-supported AVIF.')
  }

  return format as PixelBatchOutputFormat
}

function normalizeCropPreset(value: unknown): PixelBatchCropPreset {
  const preset = String(value ?? 'free')
  return ['free', 'square', 'portrait', 'landscape', 'open-graph', 'marketplace'].includes(preset)
    ? preset as PixelBatchCropPreset
    : 'free'
}

function normalizeSocialPreset(value: unknown): PixelBatchSocialPreset {
  const preset = String(value ?? 'instagram-square')
  return Object.keys(socialPresetSizes).includes(preset)
    ? preset as PixelBatchSocialPreset
    : 'instagram-square'
}

function centeredCropForAspect(width: number, height: number, targetAspect: number): PixelBatchCropPlan {
  const sourceAspect = width / height
  if (sourceAspect > targetAspect) {
    const sw = Math.round(height * targetAspect)
    return { sx: Math.round((width - sw) / 2), sy: 0, sw, sh: height }
  }

  const sh = Math.round(width / targetAspect)
  return { sx: 0, sy: Math.round((height - sh) / 2), sw: width, sh }
}

function dimensionsForResize(width: number, height: number, targetWidth?: number, targetHeight?: number): { width: number; height: number } {
  if (targetWidth && targetHeight) {
    return { width: targetWidth, height: targetHeight }
  }

  if (targetWidth) {
    return { width: targetWidth, height: Math.max(1, Math.round(height * (targetWidth / width))) }
  }

  if (targetHeight) {
    return { width: Math.max(1, Math.round(width * (targetHeight / height))), height: targetHeight }
  }

  const scale = Math.min(1, 1600 / Math.max(width, height))
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

function extensionForFormat(format: PixelBatchOutputFormat): string {
  return format === 'image/jpeg'
    ? 'jpg'
    : format.replace('image/', '')
}

function baseName(value: string): string {
  return value
    .replace(/\.[a-z0-9]+$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'pixelbatch-image'
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function estimateOutputBytes(plan: PixelBatchTransformPlan): number {
  const pixels = plan.outputWidth * plan.outputHeight
  const formatFactor: Record<PixelBatchOutputFormat, number> = {
    'image/jpeg': 0.62,
    'image/png': 2.2,
    'image/webp': 0.44,
    'image/avif': 0.34,
  }

  return Math.max(800, Math.round(pixels * formatFactor[plan.outputFormat] * plan.quality))
}

function validateInput(input: PixelBatchToolInput): void {
  if (!input.fileName.trim()) {
    throw new Error('Choose an image file before processing.')
  }

  if (!allowedMimeTypes.has(input.mimeType as PixelBatchOutputFormat)) {
    throw new Error('PixelBatch accepts PNG, JPEG, WebP and browser-supported AVIF images in the free browser tool.')
  }

  if (!Number.isFinite(input.sizeBytes) || input.sizeBytes <= 0 || input.sizeBytes > maxFreeBytes) {
    throw new Error(`Free PixelBatch files must be larger than 0 B and at most ${formatBytes(maxFreeBytes)}.`)
  }

  if (!Number.isFinite(input.width) || !Number.isFinite(input.height) || input.width <= 0 || input.height <= 0) {
    throw new Error('The selected image dimensions could not be read by the browser.')
  }

  if (input.width > maxFreeDimension || input.height > maxFreeDimension || input.width * input.height > maxFreePixels) {
    throw new Error('This image is beyond the free browser-side dimension limit. Larger files belong to account workflows.')
  }
}

export function planPixelBatchTransform(slug: PixelBatchToolSlug, input: PixelBatchToolInput, workerUsed = false): PixelBatchToolResult {
  try {
    validateInput(input)
    const tool = getPixelBatchToolBySlug(slug)
    if (!tool) {
      return fail('Tool not found.')
    }

    const outputFormat = normalizeFormat(input.outputFormat, tool.defaultFormat)
    const quality = normalizeQuality(input.quality, tool.defaultQuality)
    let crop: PixelBatchCropPlan = { sx: 0, sy: 0, sw: input.width, sh: input.height }
    let outputWidth = input.width
    let outputHeight = input.height
    const warnings: string[] = []

    if (slug === 'image-resizer') {
      const targetWidth = input.targetWidth ? normalizeInteger(input.targetWidth, 'Width', input.width) : undefined
      const targetHeight = input.targetHeight ? normalizeInteger(input.targetHeight, 'Height', input.height) : undefined
      const resized = dimensionsForResize(input.width, input.height, targetWidth, targetHeight)
      outputWidth = resized.width
      outputHeight = resized.height
    }

    if (slug === 'image-cropper') {
      const preset = normalizeCropPreset(input.cropPreset)
      const aspect = preset === 'portrait'
        ? 4 / 5
        : preset === 'landscape'
          ? 16 / 9
          : preset === 'open-graph'
            ? 1200 / 630
            : 1
      crop = preset === 'free'
        ? centeredCropForAspect(input.width, input.height, 1)
        : centeredCropForAspect(input.width, input.height, aspect)
      outputWidth = crop.sw
      outputHeight = crop.sh
    }

    if (slug === 'social-preset-generator') {
      const preset = normalizeSocialPreset(input.socialPreset)
      const size = socialPresetSizes[preset]
      crop = centeredCropForAspect(input.width, input.height, size.width / size.height)
      outputWidth = size.width
      outputHeight = size.height
      warnings.push(`${size.label} uses a centered crop. Manual subject-aware cropping belongs to account workflows.`)
    }

    if (slug === 'image-compressor' && outputFormat === 'image/png') {
      warnings.push('PNG is usually larger than WebP or JPEG for compression. Choose WebP for smaller files when supported.')
    }

    if (slug === 'image-converter' && outputFormat === input.mimeType) {
      warnings.push('The output format matches the input; use this when you want a clean re-encode.')
    }

    if (outputFormat === 'image/avif') {
      warnings.push('AVIF export depends on current browser Canvas support. If unsupported, choose WebP.')
    }

    const plan: PixelBatchTransformPlan = {
      slug,
      inputName: input.fileName,
      outputFormat,
      outputExtension: extensionForFormat(outputFormat),
      outputWidth,
      outputHeight,
      quality,
      crop,
      removeMetadata: input.removeMetadata ?? slug === 'metadata-remover',
      workerUsed,
      warnings,
      privacyNote: 'Processed locally in this browser session; no upload endpoint, localStorage or sessionStorage is used.',
      upgradeGateNote: 'Batch jobs, folders, larger files, API, integrations, saved presets, high-res queues and AI features remain account workflows.',
    }

    const outputName = `${baseName(input.fileName)}-${slug}.${plan.outputExtension}`

    return {
      ok: true,
      output: outputName,
      meta: [
        { label: 'Input size', value: formatBytes(input.sizeBytes) },
        { label: 'Input dimensions', value: `${input.width} x ${input.height}` },
        { label: 'Output dimensions', value: `${plan.outputWidth} x ${plan.outputHeight}` },
        { label: 'Output format', value: plan.outputExtension.toUpperCase() },
        { label: 'Quality', value: `${Math.round(plan.quality * 100)}%` },
        { label: 'Estimated output', value: formatBytes(estimateOutputBytes(plan)) },
      ],
      plan,
    }
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Image plan failed.')
  }
}
