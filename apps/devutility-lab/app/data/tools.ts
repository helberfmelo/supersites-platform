import type { LocaleCode } from './locales'
import { publicLocaleCodes } from './locales'

export const toolSlugs = [
  'structured-data-formatter',
  'base64-converter',
  'jwt-inspector',
  'regex-tester',
  'text-diff',
  'cron-helper',
  'uuid-generator',
  'timestamp-converter',
  'hash-generator',
] as const

export type ToolSlug = (typeof toolSlugs)[number]
export type ToolCategory = 'data' | 'encoding' | 'inspection' | 'text' | 'time' | 'identity' | 'security'
export type ToolMode = string

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ToolCopy {
  title: string
  shortName: string
  headline: string
  description: string
  inputLabel: string
  secondaryInputLabel: string
  modeLabel: string
  resultLabel: string
  exampleBody: string
  commonErrorBody: string
  freeScope: string
  upgradeScope: string
  reviewedLabel: string
  contentSections: ContentSection[]
  faq: FaqItem[]
}

export interface ToolOption {
  value: ToolMode
  label: string
}

export interface ToolDefinition {
  slug: ToolSlug
  category: ToolCategory
  modes: ToolOption[]
  acceptsPrimaryInput: boolean
  requiresSecondaryInput: boolean
  samplePrimary: string
  sampleSecondary: string
  localized: Record<LocaleCode, ToolCopy>
}

export interface ResultMeta {
  label: string
  value: string
}

export interface ToolResult {
  ok: boolean
  output: string
  meta: ResultMeta[]
  error?: string
}

interface ToolSpec {
  slug: ToolSlug
  category: ToolCategory
  title: string
  shortName: string
  headline: string
  description: string
  inputLabel: string
  secondaryInputLabel?: string
  freeScope: string
  upgradeScope: string
  exampleBody: string
  commonErrorBody: string
  modes: ToolOption[]
  acceptsPrimaryInput?: boolean
  requiresSecondaryInput?: boolean
  samplePrimary: string
  sampleSecondary?: string
}

const reviewed: Record<LocaleCode, string> = {
  en: 'Reviewed June 26, 2026',
  'pt-br': 'Revisado em 26 de junho de 2026',
  es: 'Revisado el 26 de junio de 2026',
  fr: 'Revise le 26 juin 2026',
  de: 'Geprueft am 26. Juni 2026',
}

const localizedBasics: Record<LocaleCode, {
  modeLabel: string
  resultLabel: string
  secondaryInputLabel: string
  localSection: string
  localBody: string
  qualitySection: string
  qualityBody: string
  limitsSection: string
  limitsBody: string
  faqStorage: FaqItem
  faqAccuracy: FaqItem
}> = {
  en: {
    modeLabel: 'Mode',
    resultLabel: 'Result',
    secondaryInputLabel: 'Secondary input',
    localSection: 'Local execution',
    localBody: 'The free tool runs in a browser worker when the browser supports it and keeps entered snippets out of product APIs.',
    qualitySection: 'Review method',
    qualityBody: 'Each utility exposes a focused transformation, visible limits and a short result that can be copied or inspected before any paid workflow exists.',
    limitsSection: 'Limits',
    limitsBody: 'The free browser surface is designed for snippets and small files. Private history, workspaces, batch jobs, larger files and API access remain paid-roadmap features.',
    faqStorage: { question: 'Are snippets stored?', answer: 'No. DevUtility Lab does not use account storage, localStorage, sessionStorage or a product API in the free workbench.' },
    faqAccuracy: { question: 'Can I paste production secrets?', answer: 'Avoid pasting secrets. The MVP processes locally, but safe handling still means redacting keys, tokens and confidential data.' },
  },
  'pt-br': {
    modeLabel: 'Modo',
    resultLabel: 'Resultado',
    secondaryInputLabel: 'Entrada secundaria',
    localSection: 'Execucao local',
    localBody: 'A ferramenta gratuita roda em Web Worker quando o navegador suporta e mantem trechos fora de APIs de produto.',
    qualitySection: 'Metodo de revisao',
    qualityBody: 'Cada utilitario entrega uma transformacao focada, limites visiveis e resultado curto para copiar ou inspecionar antes de qualquer fluxo pago.',
    limitsSection: 'Limites',
    limitsBody: 'A superficie gratuita foi feita para trechos e arquivos pequenos. Historico privado, workspaces, lotes, arquivos maiores e API seguem no roadmap pago.',
    faqStorage: { question: 'Os trechos sao armazenados?', answer: 'Nao. O DevUtility Lab nao usa conta, localStorage, sessionStorage nem API de produto no workbench gratuito.' },
    faqAccuracy: { question: 'Posso colar segredos de producao?', answer: 'Evite colar segredos. O MVP processa localmente, mas o manuseio seguro ainda pede redacao de chaves, tokens e dados confidenciais.' },
  },
  es: {
    modeLabel: 'Modo',
    resultLabel: 'Resultado',
    secondaryInputLabel: 'Entrada secundaria',
    localSection: 'Ejecucion local',
    localBody: 'La herramienta gratis se ejecuta en un Web Worker cuando el navegador lo soporta y mantiene fragmentos fuera de APIs de producto.',
    qualitySection: 'Metodo de revision',
    qualityBody: 'Cada utilidad ofrece una transformacion enfocada, limites visibles y un resultado breve para copiar o inspeccionar.',
    limitsSection: 'Limites',
    limitsBody: 'La superficie gratis es para fragmentos y archivos pequenos. Historial privado, workspaces, lotes, archivos mayores y API quedan en la ruta paga.',
    faqStorage: { question: 'Se almacenan fragmentos?', answer: 'No. DevUtility Lab no usa cuentas, localStorage, sessionStorage ni API de producto en el workbench gratuito.' },
    faqAccuracy: { question: 'Puedo pegar secretos de produccion?', answer: 'Evita pegar secretos. El MVP procesa localmente, pero conviene redactar claves, tokens y datos confidenciales.' },
  },
  fr: {
    modeLabel: 'Mode',
    resultLabel: 'Resultat',
    secondaryInputLabel: 'Entree secondaire',
    localSection: 'Execution locale',
    localBody: 'L outil gratuit s execute dans un Web Worker quand le navigateur le supporte et garde les extraits hors des API produit.',
    qualitySection: 'Methode de revue',
    qualityBody: 'Chaque utilitaire propose une transformation ciblee, des limites visibles et un resultat court a inspecter ou copier.',
    limitsSection: 'Limites',
    limitsBody: 'La surface gratuite vise extraits et petits fichiers. Historique prive, workspaces, lots, gros fichiers et API restent dans la feuille de route payante.',
    faqStorage: { question: 'Les extraits sont-ils stockes?', answer: 'Non. DevUtility Lab n utilise ni compte, ni localStorage, ni sessionStorage, ni API produit dans le workbench gratuit.' },
    faqAccuracy: { question: 'Puis-je coller des secrets de production?', answer: 'Evitez les secrets. Le MVP traite localement, mais il faut masquer cles, tokens et donnees confidentielles.' },
  },
  de: {
    modeLabel: 'Modus',
    resultLabel: 'Ergebnis',
    secondaryInputLabel: 'Zweite Eingabe',
    localSection: 'Lokale Ausfuehrung',
    localBody: 'Das kostenlose Tool laeuft in einem Web Worker, wenn der Browser es unterstuetzt, und sendet Ausschnitte nicht an Produkt-APIs.',
    qualitySection: 'Pruefmethode',
    qualityBody: 'Jedes Tool liefert eine fokussierte Umwandlung, sichtbare Grenzen und ein kurzes Ergebnis zum Kopieren oder Pruefen.',
    limitsSection: 'Grenzen',
    limitsBody: 'Die kostenlose Browser-Oberflaeche ist fuer Ausschnitte und kleine Dateien. Privater Verlauf, Workspaces, Stapel, groessere Dateien und API bleiben kostenpflichtige Roadmap.',
    faqStorage: { question: 'Werden Ausschnitte gespeichert?', answer: 'Nein. DevUtility Lab nutzt im kostenlosen Workbench weder Konto, localStorage, sessionStorage noch Produkt-API.' },
    faqAccuracy: { question: 'Kann ich Produktionsgeheimnisse einfuegen?', answer: 'Vermeiden Sie Geheimnisse. Das MVP verarbeitet lokal, trotzdem sollten Keys, Tokens und vertrauliche Daten geschwaerzt werden.' },
  },
}

const specs: ToolSpec[] = [
  {
    slug: 'structured-data-formatter',
    category: 'data',
    title: 'Structured Data Formatter',
    shortName: 'Formatter',
    headline: 'Format JSON, XML, YAML and CSV snippets in the browser.',
    description: 'Paste a small structured snippet and choose the mode. The free result is immediate and local.',
    inputLabel: 'Data input',
    freeScope: 'JSON pretty print, XML indentation, YAML cleanup and CSV table alignment.',
    upgradeScope: 'Private history, team workspaces, larger files, batch jobs and API formatting.',
    exampleBody: 'Try the JSON sample to see indentation, stable spacing and quick copy/download output before pasting your own snippet.',
    commonErrorBody: 'Malformed JSON, missing XML tags or uneven CSV quotes return a focused input error instead of sending the snippet anywhere.',
    modes: [
      { value: 'json', label: 'JSON' },
      { value: 'xml', label: 'XML' },
      { value: 'yaml', label: 'YAML' },
      { value: 'csv', label: 'CSV' },
    ],
    samplePrimary: '{"service":"supersites","sprint":3.2,"tools":["json","xml","csv"]}',
  },
  {
    slug: 'base64-converter',
    category: 'encoding',
    title: 'Base64 Converter',
    shortName: 'Base64',
    headline: 'Encode or decode UTF-8 text without sending the text to a server.',
    description: 'Use the mode switch for quick Base64 encoding or decoding of text snippets.',
    inputLabel: 'Text input',
    freeScope: 'Encode and decode UTF-8 text snippets.',
    upgradeScope: 'Batch conversion, larger files, private history and API.',
    exampleBody: 'The default text encodes to Base64; switch to decode and paste Base64 text to recover the UTF-8 value.',
    commonErrorBody: 'Decode mode expects valid Base64. Whitespace is ignored, but malformed padding or non-Base64 characters will fail locally.',
    modes: [
      { value: 'encode', label: 'Encode' },
      { value: 'decode', label: 'Decode' },
    ],
    samplePrimary: 'DevUtility Lab',
  },
  {
    slug: 'jwt-inspector',
    category: 'inspection',
    title: 'JWT Inspector',
    shortName: 'JWT',
    headline: 'Decode JWT header and payload locally without verifying the signature.',
    description: 'Inspect a token structure and claims. Signature validation is intentionally not claimed by the free inspector.',
    inputLabel: 'JWT input',
    freeScope: 'Header decode, payload decode and signature-present signal.',
    upgradeScope: 'Team-safe vaulting, private history, issuer presets and API checks.',
    exampleBody: 'The bundled token has a readable header and payload so you can verify how claims are displayed without using a real token.',
    commonErrorBody: 'A JWT needs at least header and payload segments. This inspector decodes structure only and never claims signature verification.',
    modes: [{ value: 'inspect', label: 'Inspect' }],
    samplePrimary: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vIiwic2l0ZSI6ImRldnV0aWxpdHktbGFiIn0.signature',
  },
  {
    slug: 'regex-tester',
    category: 'text',
    title: 'Regex Tester',
    shortName: 'Regex',
    headline: 'Run JavaScript regular expressions against sample text in a browser worker.',
    description: 'Enter a pattern and sample text to list matches, indexes and capture groups.',
    inputLabel: 'Regex pattern',
    secondaryInputLabel: 'Sample text',
    freeScope: 'Global and case-insensitive matching with capture group display.',
    upgradeScope: 'Saved test suites, shared workspaces, larger fixtures and API.',
    exampleBody: 'The sample pattern finds capitalized words in the sample text and shows indexes plus capture groups when present.',
    commonErrorBody: 'Invalid JavaScript regex syntax or an empty pattern is reported before any result is generated.',
    modes: [
      { value: 'global', label: 'Global' },
      { value: 'global-insensitive', label: 'Global + ignore case' },
    ],
    requiresSecondaryInput: true,
    samplePrimary: '\\b[A-Z][a-z]+\\b',
    sampleSecondary: 'DevUtility Lab formats JSON and tests Regex patterns.',
  },
  {
    slug: 'text-diff',
    category: 'text',
    title: 'Text Diff',
    shortName: 'Diff',
    headline: 'Compare two text blocks and produce a compact line diff locally.',
    description: 'Paste the original and changed text to see added, removed and unchanged lines.',
    inputLabel: 'Original text',
    secondaryInputLabel: 'Changed text',
    freeScope: 'Line-by-line diff for short snippets.',
    upgradeScope: 'Private workspaces, file diffing, batch comparisons and API.',
    exampleBody: 'The example compares two short blocks and marks changed, added and unchanged lines in a compact unified view.',
    commonErrorBody: 'Very large files are intentionally blocked in the free workbench; use short snippets and redact confidential text.',
    modes: [{ value: 'unified', label: 'Unified line diff' }],
    requiresSecondaryInput: true,
    samplePrimary: 'alpha\nbeta\ngamma',
    sampleSecondary: 'alpha\nbeta updated\ngamma\ndelta',
  },
  {
    slug: 'cron-helper',
    category: 'time',
    title: 'Cron Helper',
    shortName: 'Cron',
    headline: 'Explain a five-field cron expression and list the next UTC runs.',
    description: 'Use simple numeric cron expressions with wildcards, comma lists and step syntax.',
    inputLabel: 'Cron expression',
    freeScope: 'Five-field cron parsing, field summary and next UTC run preview.',
    upgradeScope: 'Named schedules, monitoring, alerts, calendars and API.',
    exampleBody: 'The sample runs every 15 minutes during weekday morning hours and previews the next UTC executions.',
    commonErrorBody: 'Use exactly five cron fields. Unsupported names, ranges and out-of-range values return an actionable parsing error.',
    modes: [{ value: 'utc', label: 'UTC preview' }],
    samplePrimary: '*/15 9,10 * * 1,2,3,4,5',
  },
  {
    slug: 'uuid-generator',
    category: 'identity',
    title: 'UUID Generator',
    shortName: 'UUID',
    headline: 'Generate version 4 UUIDs locally for development fixtures.',
    description: 'Generate a fresh set of random UUIDs in the browser.',
    inputLabel: 'No input required',
    freeScope: 'Five UUID v4 values per run.',
    upgradeScope: 'Bulk generation, namespaces, private history and API.',
    exampleBody: 'Run the generator to create five fresh UUID v4 values in the browser for fixtures, mocks or local tests.',
    commonErrorBody: 'UUID generation requires browser crypto support. If unavailable, the tool reports the missing capability.',
    modes: [{ value: 'v4', label: 'UUID v4' }],
    acceptsPrimaryInput: false,
    samplePrimary: '',
  },
  {
    slug: 'timestamp-converter',
    category: 'time',
    title: 'Timestamp Converter',
    shortName: 'Timestamp',
    headline: 'Convert Unix timestamps, milliseconds and date strings into readable UTC values.',
    description: 'Paste a timestamp or date string. Leave it empty to inspect the current time.',
    inputLabel: 'Timestamp or date',
    freeScope: 'Unix seconds, Unix milliseconds, ISO, UTC and local display.',
    upgradeScope: 'Saved presets, widgets, history, batch conversion and API.',
    exampleBody: 'The default Unix timestamp resolves to a known UTC instant; empty input inspects the current local browser time.',
    commonErrorBody: 'Unparseable date strings show a local validation error. Ambiguous local formats should be replaced with ISO dates.',
    modes: [{ value: 'auto', label: 'Auto-detect' }],
    samplePrimary: '1767225600',
  },
  {
    slug: 'hash-generator',
    category: 'security',
    title: 'Hash Generator',
    shortName: 'Hash',
    headline: 'Generate SHA digests for small text snippets with browser crypto.',
    description: 'Choose a digest algorithm and process the text locally with Web Crypto.',
    inputLabel: 'Text input',
    freeScope: 'SHA-256 and SHA-1 text digests for small snippets.',
    upgradeScope: 'File hashing, batch jobs, private history and API.',
    exampleBody: 'Hash the sample text with SHA-256 or SHA-1 to compare digest length and download the result as plain text.',
    commonErrorBody: 'Hashing depends on Web Crypto. Browsers without crypto support receive a clear local error.',
    modes: [
      { value: 'SHA-256', label: 'SHA-256' },
      { value: 'SHA-1', label: 'SHA-1' },
    ],
    samplePrimary: 'DevUtility Lab',
  },
]

function sections(locale: LocaleCode): ContentSection[] {
  const base = localizedBasics[locale]

  return [
    { heading: base.localSection, paragraphs: [base.localBody] },
    { heading: base.qualitySection, paragraphs: [base.qualityBody] },
    { heading: base.limitsSection, paragraphs: [base.limitsBody] },
  ]
}

function copyFor(spec: ToolSpec, locale: LocaleCode): ToolCopy {
  const base = localizedBasics[locale]

  return {
    title: spec.title,
    shortName: spec.shortName,
    headline: spec.headline,
    description: spec.description,
    inputLabel: spec.inputLabel,
    secondaryInputLabel: spec.secondaryInputLabel ?? base.secondaryInputLabel,
    modeLabel: base.modeLabel,
    resultLabel: base.resultLabel,
    exampleBody: spec.exampleBody,
    commonErrorBody: spec.commonErrorBody,
    freeScope: spec.freeScope,
    upgradeScope: spec.upgradeScope,
    reviewedLabel: reviewed[locale],
    contentSections: sections(locale),
    faq: [base.faqStorage, base.faqAccuracy],
  }
}

function tool(spec: ToolSpec): ToolDefinition {
  return {
    slug: spec.slug,
    category: spec.category,
    modes: spec.modes,
    acceptsPrimaryInput: spec.acceptsPrimaryInput ?? true,
    requiresSecondaryInput: spec.requiresSecondaryInput ?? false,
    samplePrimary: spec.samplePrimary,
    sampleSecondary: spec.sampleSecondary ?? '',
    localized: Object.fromEntries(
      publicLocaleCodes.map((locale) => [locale, copyFor(spec, locale)]),
    ) as Record<LocaleCode, ToolCopy>,
  }
}

export const toolCatalog: ToolDefinition[] = specs.map(tool)
const toolBySlug = new Map(toolCatalog.map((candidate) => [candidate.slug, candidate]))

export function getToolBySlug(slug: string | undefined): ToolDefinition | null {
  if (!toolSlugs.includes(slug as ToolSlug)) {
    return null
  }

  return toolBySlug.get(slug as ToolSlug) ?? null
}

export function getToolCopy(toolDefinition: ToolDefinition, locale: LocaleCode): ToolCopy {
  return toolDefinition.localized[locale]
}

export function getRelatedTools(toolDefinition: ToolDefinition, limit = 3): ToolDefinition[] {
  const sameCategory = toolCatalog.filter((candidate) => (
    candidate.slug !== toolDefinition.slug && candidate.category === toolDefinition.category
  ))
  const remaining = toolCatalog.filter((candidate) => (
    candidate.slug !== toolDefinition.slug && candidate.category !== toolDefinition.category
  ))

  return [...sameCategory, ...remaining].slice(0, limit)
}

export function getCategoryLabel(category: ToolCategory, locale: LocaleCode): string {
  const labels: Record<ToolCategory, Record<LocaleCode, string>> = {
    data: { en: 'Structured data', 'pt-br': 'Dados estruturados', es: 'Datos estructurados', fr: 'Donnees structurees', de: 'Strukturierte Daten' },
    encoding: { en: 'Encoding', 'pt-br': 'Codificacao', es: 'Codificacion', fr: 'Encodage', de: 'Codierung' },
    inspection: { en: 'Inspection', 'pt-br': 'Inspecao', es: 'Inspeccion', fr: 'Inspection', de: 'Inspektion' },
    text: { en: 'Text', 'pt-br': 'Texto', es: 'Texto', fr: 'Texte', de: 'Text' },
    time: { en: 'Time', 'pt-br': 'Tempo', es: 'Tiempo', fr: 'Temps', de: 'Zeit' },
    identity: { en: 'Identifiers', 'pt-br': 'Identificadores', es: 'Identificadores', fr: 'Identifiants', de: 'Kennungen' },
    security: { en: 'Security', 'pt-br': 'Seguranca', es: 'Seguridad', fr: 'Securite', de: 'Sicherheit' },
  }

  return labels[category][locale]
}

export function filterTools(query: string, category: ToolCategory | 'all', locale: LocaleCode): ToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return toolCatalog.filter((toolDefinition) => {
    const copy = getToolCopy(toolDefinition, locale)
    const matchesCategory = category === 'all' || toolDefinition.category === category
    const searchableText = [
      toolDefinition.slug,
      copy.title,
      copy.shortName,
      copy.headline,
      copy.description,
      copy.freeScope,
      copy.upgradeScope,
      toolDefinition.modes.map((mode) => mode.label).join(' '),
    ].join(' ').toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}

export function createToolStructuredData(toolDefinition: ToolDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getToolCopy(toolDefinition, locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.title,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      url,
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: copy.headline,
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

function ensureSnippetLimit(...values: string[]): void {
  const totalLength = values.reduce((sum, value) => sum + value.length, 0)

  if (totalLength > 200_000) {
    throw new Error('Free browser tools accept snippets up to 200 KB. Larger files are reserved for gated batch workflows.')
  }
}

function ok(output: string, meta: ResultMeta[] = []): ToolResult {
  return { ok: true, output, meta }
}

function fail(error: string): ToolResult {
  return { ok: false, output: '', meta: [], error }
}

function formatJson(input: string): string {
  return JSON.stringify(JSON.parse(input), null, 2)
}

function formatXml(input: string): string {
  const compact = input.trim().replace(/>\s+</g, '><')
  if (!compact.startsWith('<') || !compact.endsWith('>')) {
    throw new Error('XML input must start and end with tags.')
  }

  const lines = compact.replace(/(>)(<)(\/*)/g, '$1\n$2$3').split('\n')
  let depth = 0

  return lines.map((line) => {
    const trimmed = line.trim()
    if (/^<\//.test(trimmed)) {
      depth = Math.max(depth - 1, 0)
    }

    const rendered = `${'  '.repeat(depth)}${trimmed}`
    if (
      /^<[^!?/][^>]*[^/]>/u.test(trimmed) &&
      !/^<[^>]+>.*<\/[^>]+>$/u.test(trimmed) &&
      !trimmed.endsWith('/>')
    ) {
      depth += 1
    }

    return rendered
  }).join('\n')
}

function normalizeYaml(input: string): string {
  const cleaned = input
    .replace(/\t/g, '  ')
    .split(/\r?\n/u)
    .map((line) => line.replace(/\s+$/u, ''))
    .join('\n')
    .trim()

  if (!cleaned) {
    throw new Error('YAML input is empty.')
  }

  return cleaned
}

function parseCsv(input: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index]
    const next = input[index + 1]

    if (char === '"' && inQuotes && next === '"') {
      cell += '"'
      index += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(cell.trim())
      cell = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        index += 1
      }
      row.push(cell.trim())
      rows.push(row)
      row = []
      cell = ''
      continue
    }

    cell += char
  }

  row.push(cell.trim())
  rows.push(row)

  return rows.filter((candidate) => candidate.some((value) => value.length > 0))
}

function formatCsv(input: string): string {
  const rows = parseCsv(input)
  if (rows.length === 0) {
    throw new Error('CSV input is empty.')
  }

  const columnCount = Math.max(...rows.map((row) => row.length))
  const widths = Array.from({ length: columnCount }, (_, column) => (
    Math.max(...rows.map((row) => row[column]?.length ?? 0))
  ))

  return rows.map((row) => (
    Array.from({ length: columnCount }, (_, column) => (row[column] ?? '').padEnd(widths[column], ' ')).join(' | ').trimEnd()
  )).join('\n')
}

function toBase64Utf8(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return globalThis.btoa(binary)
}

function fromBase64Utf8(input: string): string {
  const binary = globalThis.atob(input.replace(/\s+/gu, ''))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}

function decodeBase64Url(input: string): string {
  const normalized = input.replace(/-/gu, '+').replace(/_/gu, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')

  return fromBase64Utf8(padded)
}

function inspectJwt(input: string): string {
  const parts = input.trim().split('.')
  if (parts.length < 2) {
    throw new Error('JWT input must contain header and payload segments.')
  }

  const header = JSON.parse(decodeBase64Url(parts[0]))
  const payload = JSON.parse(decodeBase64Url(parts[1]))

  return [
    'Header',
    JSON.stringify(header, null, 2),
    '',
    'Payload',
    JSON.stringify(payload, null, 2),
    '',
    `Signature present: ${parts[2] ? 'yes' : 'no'}`,
    'Signature verified: no',
  ].join('\n')
}

function testRegex(pattern: string, sample: string, mode: ToolMode): string {
  if (!pattern.trim()) {
    throw new Error('Regex pattern is required.')
  }

  const flags = mode === 'global-insensitive' ? 'gi' : 'g'
  const regex = new RegExp(pattern, flags)
  const matches: string[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(sample)) && matches.length < 50) {
    const groups = match.slice(1).map((group, index) => `g${index + 1}=${group ?? ''}`).join(', ')
    matches.push(`[${matches.length + 1}] index ${match.index}: ${match[0]}${groups ? ` (${groups})` : ''}`)

    if (match[0] === '') {
      regex.lastIndex += 1
    }
  }

  return matches.length > 0 ? matches.join('\n') : 'No matches.'
}

function diffLines(original: string, changed: string): string {
  const left = original.split(/\r?\n/u)
  const right = changed.split(/\r?\n/u)
  const output: string[] = []
  let i = 0
  let j = 0

  while (i < left.length || j < right.length) {
    if (left[i] === right[j]) {
      output.push(`  ${left[i] ?? ''}`)
      i += 1
      j += 1
      continue
    }

    if (left[i] === right[j + 1]) {
      output.push(`+ ${right[j]}`)
      j += 1
      continue
    }

    if (left[i + 1] === right[j]) {
      output.push(`- ${left[i]}`)
      i += 1
      continue
    }

    if (i < left.length) {
      output.push(`- ${left[i]}`)
      i += 1
    }

    if (j < right.length) {
      output.push(`+ ${right[j]}`)
      j += 1
    }
  }

  return output.join('\n')
}

function parseCronField(value: string, min: number, max: number, label: string): Set<number> {
  const result = new Set<number>()

  for (const part of value.split(',')) {
    if (part === '*') {
      for (let current = min; current <= max; current += 1) {
        result.add(current)
      }
      continue
    }

    const step = /^\*\/(\d+)$/u.exec(part)
    if (step) {
      const interval = Number(step[1])
      if (!Number.isInteger(interval) || interval <= 0) {
        throw new Error(`${label} step must be positive.`)
      }
      for (let current = min; current <= max; current += interval) {
        result.add(current)
      }
      continue
    }

    const number = Number(part)
    if (!Number.isInteger(number) || number < min || number > max) {
      throw new Error(`${label} field is out of range.`)
    }
    result.add(number)
  }

  return result
}

function summarizeSet(values: Set<number>): string {
  const sorted = [...values].sort((a, b) => a - b)

  if (sorted.length > 8) {
    return `${sorted.slice(0, 8).join(', ')} ...`
  }

  return sorted.join(', ')
}

function explainCron(input: string): string {
  const parts = input.trim().split(/\s+/u)
  if (parts.length !== 5) {
    throw new Error('Use a five-field cron expression: minute hour day month weekday.')
  }

  const [minuteRaw, hourRaw, dayRaw, monthRaw, weekdayRaw] = parts
  const fields = {
    minutes: parseCronField(minuteRaw, 0, 59, 'Minute'),
    hours: parseCronField(hourRaw, 0, 23, 'Hour'),
    days: parseCronField(dayRaw, 1, 31, 'Day'),
    months: parseCronField(monthRaw, 1, 12, 'Month'),
    weekdays: parseCronField(weekdayRaw, 0, 6, 'Weekday'),
  }
  const runs: string[] = []
  const cursor = new Date()
  cursor.setUTCSeconds(0, 0)
  cursor.setUTCMinutes(cursor.getUTCMinutes() + 1)

  for (let guard = 0; guard < 366 * 24 * 60 && runs.length < 5; guard += 1) {
    if (
      fields.minutes.has(cursor.getUTCMinutes()) &&
      fields.hours.has(cursor.getUTCHours()) &&
      fields.days.has(cursor.getUTCDate()) &&
      fields.months.has(cursor.getUTCMonth() + 1) &&
      fields.weekdays.has(cursor.getUTCDay())
    ) {
      runs.push(cursor.toISOString())
    }

    cursor.setUTCMinutes(cursor.getUTCMinutes() + 1)
  }

  if (runs.length === 0) {
    throw new Error('No run found in the next year for this simple cron expression.')
  }

  return [
    `Expression: ${input.trim()}`,
    `Minutes: ${summarizeSet(fields.minutes)}`,
    `Hours: ${summarizeSet(fields.hours)}`,
    `Days: ${summarizeSet(fields.days)}`,
    `Months: ${summarizeSet(fields.months)}`,
    `Weekdays: ${summarizeSet(fields.weekdays)} (0 = Sunday)`,
    '',
    'Next 5 UTC runs',
    ...runs.map((run) => `- ${run}`),
  ].join('\n')
}

function createUuid(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  const bytes = new Uint8Array(16)
  globalThis.crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function convertTimestamp(input: string): string {
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

  if (Number.isNaN(date.getTime())) {
    throw new Error('Timestamp or date string could not be parsed.')
  }

  return [
    `ISO: ${date.toISOString()}`,
    `Unix seconds: ${Math.floor(date.getTime() / 1000)}`,
    `Unix milliseconds: ${date.getTime()}`,
    `UTC: ${date.toUTCString()}`,
    `Local: ${date.toString()}`,
  ].join('\n')
}

async function hashText(input: string, mode: ToolMode): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Web Crypto is not available in this browser context.')
  }

  const digest = await globalThis.crypto.subtle.digest(mode, new TextEncoder().encode(input))

  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function executeTool(
  slug: ToolSlug,
  primaryInput: string,
  secondaryInput: string,
  mode: ToolMode,
): Promise<ToolResult> {
  try {
    ensureSnippetLimit(primaryInput, secondaryInput)

    if (slug === 'structured-data-formatter') {
      const output = mode === 'xml'
        ? formatXml(primaryInput)
        : mode === 'yaml'
          ? normalizeYaml(primaryInput)
          : mode === 'csv'
            ? formatCsv(primaryInput)
            : formatJson(primaryInput)

      return ok(output, [{ label: 'Mode', value: mode.toUpperCase() }])
    }

    if (slug === 'base64-converter') {
      const output = mode === 'decode' ? fromBase64Utf8(primaryInput) : toBase64Utf8(primaryInput)
      return ok(output, [{ label: 'Mode', value: mode }])
    }

    if (slug === 'jwt-inspector') {
      return ok(inspectJwt(primaryInput), [{ label: 'Signature verification', value: 'not performed' }])
    }

    if (slug === 'regex-tester') {
      return ok(testRegex(primaryInput, secondaryInput, mode), [{ label: 'Mode', value: mode }])
    }

    if (slug === 'text-diff') {
      return ok(diffLines(primaryInput, secondaryInput), [{ label: 'Mode', value: 'line diff' }])
    }

    if (slug === 'cron-helper') {
      return ok(explainCron(primaryInput), [{ label: 'Time basis', value: 'UTC' }])
    }

    if (slug === 'uuid-generator') {
      return ok(Array.from({ length: 5 }, createUuid).join('\n'), [{ label: 'Version', value: '4' }])
    }

    if (slug === 'timestamp-converter') {
      return ok(convertTimestamp(primaryInput), [{ label: 'Detection', value: 'automatic' }])
    }

    if (slug === 'hash-generator') {
      return ok(await hashText(primaryInput, mode), [{ label: 'Algorithm', value: mode }])
    }

    return fail('Tool not found.')
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Tool execution failed.')
  }
}
