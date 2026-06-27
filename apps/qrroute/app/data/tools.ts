import type { LocaleCode } from './locales'
import { publicLocaleCodes } from './locales'

export const qrRouteToolSlugs = [
  'static-qr-code',
  'barcode-generator',
  'utm-builder',
  'vcard-qr',
  'wifi-qr',
  'preview-lab',
] as const

export type QrRouteToolSlug = (typeof qrRouteToolSlugs)[number]
export type QrRouteToolCategory = 'qr' | 'barcode' | 'campaign' | 'contact' | 'network' | 'preview'
export type QrRouteToolMode = string
export type PreviewKind = 'qr' | 'barcode' | 'text'

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface QrRouteToolCopy {
  title: string
  shortName: string
  headline: string
  description: string
  inputLabel: string
  secondaryInputLabel: string
  modeLabel: string
  resultLabel: string
  previewLabel: string
  freeScope: string
  upgradeScope: string
  reviewedLabel: string
  contentSections: ContentSection[]
  faq: FaqItem[]
}

export interface QrRouteToolOption {
  value: QrRouteToolMode
  label: string
}

export interface QrRouteToolDefinition {
  slug: QrRouteToolSlug
  category: QrRouteToolCategory
  modes: QrRouteToolOption[]
  acceptsSecondaryInput: boolean
  samplePrimary: string
  sampleSecondary: string
  localized: Record<LocaleCode, QrRouteToolCopy>
}

export interface ResultMeta {
  label: string
  value: string
}

export interface QrRouteToolResult {
  ok: boolean
  output: string
  meta: ResultMeta[]
  previewKind: PreviewKind
  previewPayload: string
  error?: string
}

export interface QrRoutePayloadSummary {
  label: string
  value: string
  details: ResultMeta[]
}

interface QrRouteToolSpec {
  slug: QrRouteToolSlug
  category: QrRouteToolCategory
  title: string
  shortName: string
  headline: string
  description: string
  inputLabel: string
  secondaryInputLabel: string
  freeScope: string
  upgradeScope: string
  modes: QrRouteToolOption[]
  acceptsSecondaryInput?: boolean
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
  previewLabel: string
  localSection: string
  localBody: string
  abuseSection: string
  abuseBody: string
  limitsSection: string
  limitsBody: string
  faqStorage: FaqItem
  faqDynamic: FaqItem
}> = {
  en: {
    modeLabel: 'Mode',
    resultLabel: 'Payload',
    previewLabel: 'Preview',
    localSection: 'Local generation',
    localBody: 'QRRoute generates static QR, barcode, campaign, vCard and Wi-Fi payloads in the browser without mandatory signup.',
    abuseSection: 'Abuse controls',
    abuseBody: 'The free builder blocks dangerous URL schemes, local hosts, credentialed URLs and oversized payloads before a preview is generated.',
    limitsSection: 'Limits',
    limitsBody: 'Static codes do not provide editable destinations, scans, analytics, branded domains, bulk jobs or redirect monitoring.',
    faqStorage: { question: 'Are destinations or contact details stored?', answer: 'No. QRRoute does not save inputs, create accounts, write browser storage or send payload contents to analytics.' },
    faqDynamic: { question: 'Can I edit a QR code after printing it?', answer: 'Not in the free static MVP. Dynamic QR codes, short links, analytics and custom domains are upgrade features behind later gates.' },
  },
  'pt-br': {
    modeLabel: 'Modo',
    resultLabel: 'Payload',
    previewLabel: 'Preview',
    localSection: 'Geracao local',
    localBody: 'O QRRoute gera QR estatico, barcode, campanha, vCard e Wi-Fi no navegador sem cadastro obrigatorio.',
    abuseSection: 'Controles antiabuso',
    abuseBody: 'O construtor gratuito bloqueia esquemas perigosos, hosts locais, URLs com credenciais e payloads grandes antes do preview.',
    limitsSection: 'Limites',
    limitsBody: 'Codigos estaticos nao oferecem destino editavel, scans, analytics, dominio proprio, lote ou monitoramento de redirect.',
    faqStorage: { question: 'Destinos ou contatos sao armazenados?', answer: 'Nao. O QRRoute nao salva entradas, nao cria conta, nao grava storage e nao envia payloads para analytics.' },
    faqDynamic: { question: 'Posso editar um QR depois de imprimir?', answer: 'Nao no MVP estatico gratuito. QR dinamico, short links, analytics e dominio proprio sao upgrades com gates futuros.' },
  },
  es: {
    modeLabel: 'Modo',
    resultLabel: 'Payload',
    previewLabel: 'Vista previa',
    localSection: 'Generacion local',
    localBody: 'QRRoute genera QR estatico, barcode, campana, vCard y Wi-Fi en el navegador sin registro obligatorio.',
    abuseSection: 'Controles antiabuso',
    abuseBody: 'El builder gratis bloquea esquemas peligrosos, hosts locales, URLs con credenciales y payloads grandes antes de previsualizar.',
    limitsSection: 'Limites',
    limitsBody: 'Los codigos estaticos no incluyen destino editable, escaneos, analytics, dominio propio, lotes ni monitoreo de redirects.',
    faqStorage: { question: 'Se guardan destinos o contactos?', answer: 'No. QRRoute no guarda entradas, no crea cuentas, no escribe storage ni envia payloads a analytics.' },
    faqDynamic: { question: 'Puedo editar un QR despues de imprimir?', answer: 'No en el MVP estatico gratis. QR dinamico, short links, analytics y dominio propio son upgrades con gates futuros.' },
  },
  fr: {
    modeLabel: 'Mode',
    resultLabel: 'Payload',
    previewLabel: 'Apercu',
    localSection: 'Generation locale',
    localBody: 'QRRoute genere QR statique, code-barres, campagne, vCard et Wi-Fi dans le navigateur sans compte obligatoire.',
    abuseSection: 'Controles anti-abus',
    abuseBody: 'Le builder gratuit bloque schemas dangereux, hosts locaux, URLs avec identifiants et payloads trop grands avant apercu.',
    limitsSection: 'Limites',
    limitsBody: 'Les codes statiques n incluent pas destination editable, scans, analytics, domaine personnalise, lot ni monitoring redirect.',
    faqStorage: { question: 'Les destinations ou contacts sont-ils stockes?', answer: 'Non. QRRoute ne sauvegarde pas les entrees, ne cree pas de compte, n ecrit pas de storage et n envoie pas les payloads a analytics.' },
    faqDynamic: { question: 'Puis-je modifier un QR apres impression?', answer: 'Pas dans le MVP statique gratuit. QR dynamique, short links, analytics et domaine propre sont des upgrades gates.' },
  },
  de: {
    modeLabel: 'Modus',
    resultLabel: 'Payload',
    previewLabel: 'Vorschau',
    localSection: 'Lokale Generierung',
    localBody: 'QRRoute erzeugt statische QR-Codes, Barcodes, Kampagnen, vCards und Wi-Fi-Payloads im Browser ohne Pflichtkonto.',
    abuseSection: 'Missbrauchsschutz',
    abuseBody: 'Der kostenlose Builder blockiert gefaehrliche URL-Schemata, lokale Hosts, URLs mit Zugangsdaten und zu grosse Payloads vor der Vorschau.',
    limitsSection: 'Grenzen',
    limitsBody: 'Statische Codes bieten keine editierbaren Ziele, Scans, Analytics, eigene Domains, Batch-Jobs oder Redirect-Ueberwachung.',
    faqStorage: { question: 'Werden Ziele oder Kontaktdaten gespeichert?', answer: 'Nein. QRRoute speichert keine Eingaben, erstellt keine Konten, nutzt kein Storage und sendet Payloads nicht an Analytics.' },
    faqDynamic: { question: 'Kann ich einen QR nach dem Druck aendern?', answer: 'Nicht im kostenlosen statischen MVP. Dynamische QR, Short Links, Analytics und eigene Domains sind spaetere gated Upgrades.' },
  },
}

const specs: QrRouteToolSpec[] = [
  {
    slug: 'static-qr-code',
    category: 'qr',
    title: 'Static QR Code Generator',
    shortName: 'Static QR',
    headline: 'Create a scannable static QR code for a safe URL, plain text, email or phone payload.',
    description: 'Choose a payload type and generate an SVG preview locally. URL mode blocks risky schemes and local destinations.',
    inputLabel: 'URL, text, email or phone value',
    secondaryInputLabel: 'Optional label for your own notes',
    freeScope: 'One static QR payload with SVG preview and copyable encoded value.',
    upgradeScope: 'Dynamic QR, editable destinations, scan analytics, branded short links, custom domain, teams and bulk creation.',
    modes: [
      { value: 'url', label: 'Safe URL' },
      { value: 'text', label: 'Plain text' },
      { value: 'email', label: 'Email address' },
      { value: 'phone', label: 'Phone number' },
    ],
    samplePrimary: 'https://example.com/product-launch',
    sampleSecondary: 'Printed flyer QR',
  },
  {
    slug: 'barcode-generator',
    category: 'barcode',
    title: 'Barcode Generator',
    shortName: 'Barcode',
    headline: 'Generate a Code 128 barcode preview for short inventory, ticket or reference values.',
    description: 'Enter a short ASCII code. The MVP renders a Code 128 SVG preview in the browser.',
    inputLabel: 'Barcode value',
    secondaryInputLabel: 'Optional human-readable label',
    freeScope: 'One Code 128 barcode preview for a short value with no server-side storage.',
    upgradeScope: 'Bulk barcode sheets, templates, labels, saved assets, API rendering and workspace history.',
    modes: [{ value: 'code128', label: 'Code 128' }],
    samplePrimary: 'INV-2026-0042',
    sampleSecondary: 'Sample inventory label',
  },
  {
    slug: 'utm-builder',
    category: 'campaign',
    title: 'UTM Builder',
    shortName: 'UTM',
    headline: 'Build a tagged campaign URL and QR preview without sending the destination to a server.',
    description: 'Start with an HTTPS URL and add source, medium, campaign, term or content fields as key-value lines.',
    inputLabel: 'Base campaign URL',
    secondaryInputLabel: 'UTM fields, one per line',
    freeScope: 'One tagged URL with standard UTM parameters, copyable output and local QR preview.',
    upgradeScope: 'Saved campaigns, naming rules, branded short links, scan/click analytics, approvals and bulk generation.',
    modes: [{ value: 'standard', label: 'Standard UTM tags' }],
    samplePrimary: 'https://example.com/pricing',
    sampleSecondary: 'source=newsletter\nmedium=email\ncampaign=summer-launch\ncontent=hero-cta',
  },
  {
    slug: 'vcard-qr',
    category: 'contact',
    title: 'vCard QR Builder',
    shortName: 'vCard',
    headline: 'Turn a small contact profile into a vCard payload and QR preview locally.',
    description: 'Enter name, organization, email, phone and website as lines. The output uses a compact vCard 4.0 payload.',
    inputLabel: 'Contact lines',
    secondaryInputLabel: 'Optional note',
    freeScope: 'One local vCard QR payload with no CRM, account or contact database.',
    upgradeScope: 'Saved contacts, branded cards, team directories, bulk QR batches, CRM export and scan analytics.',
    modes: [{ value: 'vcard4', label: 'vCard 4.0' }],
    samplePrimary: 'Alex Morgan\nExample Studio\nalex@example.com\n+1 555 0100\nhttps://example.com',
    sampleSecondary: 'Event badge',
  },
  {
    slug: 'wifi-qr',
    category: 'network',
    title: 'Wi-Fi QR Builder',
    shortName: 'Wi-Fi',
    headline: 'Create a Wi-Fi QR payload for WPA, WEP or open networks directly in the browser.',
    description: 'Enter the SSID and network options. The result follows the common WIFI QR payload format.',
    inputLabel: 'Network SSID',
    secondaryInputLabel: 'Network options',
    freeScope: 'One Wi-Fi QR payload and preview for a single network, with no account or saved secrets.',
    upgradeScope: 'Location templates, printable sheets, access rotation workflows, team permissions and audit history.',
    modes: [
      { value: 'WPA', label: 'WPA/WPA2/WPA3' },
      { value: 'WEP', label: 'WEP' },
      { value: 'nopass', label: 'Open network' },
    ],
    samplePrimary: 'Guest-WiFi',
    sampleSecondary: 'key=correct horse battery staple\nhidden=false',
  },
  {
    slug: 'preview-lab',
    category: 'preview',
    title: 'QR Preview Lab',
    shortName: 'Preview',
    headline: 'Inspect a static QR payload before printing and see why dynamic redirects stay gated.',
    description: 'Paste a URL or text payload. QRRoute shows a static preview and local safety notes without fetching the URL.',
    inputLabel: 'Payload to preview',
    secondaryInputLabel: 'Optional context',
    freeScope: 'One local QR preview with scheme, length and safety notes when the payload is a URL.',
    upgradeScope: 'Managed redirect previews, abuse scanning, destination monitoring, scan analytics and custom domains.',
    modes: [{ value: 'inspect', label: 'Inspect locally' }],
    samplePrimary: 'https://example.com/help?ref=poster',
    sampleSecondary: 'Poster proof',
  },
]

function sections(locale: LocaleCode): ContentSection[] {
  const base = localizedBasics[locale]

  return [
    { heading: base.localSection, paragraphs: [base.localBody] },
    { heading: base.abuseSection, paragraphs: [base.abuseBody] },
    { heading: base.limitsSection, paragraphs: [base.limitsBody] },
  ]
}

function copyFor(spec: QrRouteToolSpec, locale: LocaleCode): QrRouteToolCopy {
  const base = localizedBasics[locale]

  return {
    title: spec.title,
    shortName: spec.shortName,
    headline: spec.headline,
    description: spec.description,
    inputLabel: spec.inputLabel,
    secondaryInputLabel: spec.secondaryInputLabel,
    modeLabel: base.modeLabel,
    resultLabel: base.resultLabel,
    previewLabel: base.previewLabel,
    freeScope: spec.freeScope,
    upgradeScope: spec.upgradeScope,
    reviewedLabel: reviewed[locale],
    contentSections: sections(locale),
    faq: [base.faqStorage, base.faqDynamic],
  }
}

function qrRouteTool(spec: QrRouteToolSpec): QrRouteToolDefinition {
  return {
    slug: spec.slug,
    category: spec.category,
    modes: spec.modes,
    acceptsSecondaryInput: spec.acceptsSecondaryInput ?? true,
    samplePrimary: spec.samplePrimary,
    sampleSecondary: spec.sampleSecondary ?? '',
    localized: Object.fromEntries(
      publicLocaleCodes.map((locale) => [locale, copyFor(spec, locale)]),
    ) as Record<LocaleCode, QrRouteToolCopy>,
  }
}

export const qrRouteToolCatalog: QrRouteToolDefinition[] = specs.map(qrRouteTool)
const qrRouteToolBySlug = new Map(qrRouteToolCatalog.map((candidate) => [candidate.slug, candidate]))

export function getQrRouteToolBySlug(slug: string | undefined): QrRouteToolDefinition | null {
  if (!qrRouteToolSlugs.includes(slug as QrRouteToolSlug)) {
    return null
  }

  return qrRouteToolBySlug.get(slug as QrRouteToolSlug) ?? null
}

export function getQrRouteToolCopy(toolDefinition: QrRouteToolDefinition, locale: LocaleCode): QrRouteToolCopy {
  return toolDefinition.localized[locale]
}

export function getCategoryLabel(category: QrRouteToolCategory, locale: LocaleCode): string {
  const labels: Record<QrRouteToolCategory, Record<LocaleCode, string>> = {
    qr: { en: 'QR codes', 'pt-br': 'QR codes', es: 'QR codes', fr: 'QR codes', de: 'QR-Codes' },
    barcode: { en: 'Barcodes', 'pt-br': 'Barcodes', es: 'Codigos de barras', fr: 'Codes-barres', de: 'Barcodes' },
    campaign: { en: 'Campaign links', 'pt-br': 'Links de campanha', es: 'Enlaces de campana', fr: 'Liens campagne', de: 'Kampagnenlinks' },
    contact: { en: 'Contact cards', 'pt-br': 'Cartoes de contato', es: 'Tarjetas de contacto', fr: 'Fiches contact', de: 'Kontaktkarten' },
    network: { en: 'Wi-Fi', 'pt-br': 'Wi-Fi', es: 'Wi-Fi', fr: 'Wi-Fi', de: 'Wi-Fi' },
    preview: { en: 'Preview', 'pt-br': 'Preview', es: 'Vista previa', fr: 'Apercu', de: 'Vorschau' },
  }

  return labels[category][locale]
}

export function filterQrRouteTools(query: string, category: QrRouteToolCategory | 'all', locale: LocaleCode): QrRouteToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return qrRouteToolCatalog.filter((toolDefinition) => {
    const copy = getQrRouteToolCopy(toolDefinition, locale)
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

export function getRelatedQrRouteTools(toolDefinition: QrRouteToolDefinition, limit = 3): QrRouteToolDefinition[] {
  const sameFamily = qrRouteToolCatalog.filter((candidate) => candidate.slug !== toolDefinition.slug && candidate.category === toolDefinition.category)
  const workflowNeighbors = qrRouteToolCatalog.filter((candidate) => {
    if (candidate.slug === toolDefinition.slug || sameFamily.includes(candidate)) {
      return false
    }

    if (toolDefinition.category === 'campaign') {
      return ['static-qr-code', 'preview-lab', 'barcode-generator'].includes(candidate.slug)
    }

    if (toolDefinition.category === 'qr') {
      return ['utm-builder', 'preview-lab', 'vcard-qr'].includes(candidate.slug)
    }

    return true
  })
  const fallback = qrRouteToolCatalog.filter((candidate) => candidate.slug !== toolDefinition.slug && !sameFamily.includes(candidate) && !workflowNeighbors.includes(candidate))

  return [...sameFamily, ...workflowNeighbors, ...fallback].slice(0, limit)
}

function outputLines(result: QrRouteToolResult): string[] {
  return result.output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function findLine(result: QrRouteToolResult, prefix: string): string | null {
  return outputLines(result).find((line) => line.startsWith(prefix)) ?? null
}

function firstResultLine(result: QrRouteToolResult): string {
  return outputLines(result)[0] ?? 'Payload ready.'
}

export function createQrRoutePayloadSummary(slug: QrRouteToolSlug, result: QrRouteToolResult | null): QrRoutePayloadSummary | null {
  if (!result?.ok) {
    return null
  }

  const preferredPrefixes: Partial<Record<QrRouteToolSlug, string[]>> = {
    'static-qr-code': ['Payload:', 'Type:'],
    'barcode-generator': ['Value:', 'Format:'],
    'utm-builder': ['Campaign URL:', 'UTM campaign:'],
    'vcard-qr': ['FN:', 'BEGIN:VCARD'],
    'wifi-qr': ['Payload:', 'SSID:'],
    'preview-lab': ['URL:', 'Payload type:'],
  }
  const lines = outputLines(result)
  const selected = preferredPrefixes[slug]
    ?.map((prefix) => findLine(result, prefix))
    .find(Boolean)

  return {
    label: result.previewKind === 'barcode' ? 'Barcode value' : 'Encoded payload',
    value: selected ?? firstResultLine(result),
    details: result.meta,
  }
}

export function createQrRouteToolStructuredData(toolDefinition: QrRouteToolDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getQrRouteToolCopy(toolDefinition, locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.title,
      applicationCategory: 'UtilitiesApplication',
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

function ok(output: string, meta: ResultMeta[], previewPayload: string, previewKind: PreviewKind = 'qr'): QrRouteToolResult {
  return { ok: true, output, meta, previewKind, previewPayload }
}

function fail(error: string): QrRouteToolResult {
  return { ok: false, output: '', meta: [], previewKind: 'text', previewPayload: '', error }
}

function ensureInputLimit(...values: string[]): void {
  const totalLength = values.reduce((sum, value) => sum + value.length, 0)

  if (totalLength > 8_000) {
    throw new Error('Free QRRoute tools accept short payloads. Bulk and large payload workflows are gated upgrades.')
  }
}

function sanitizeText(value: string, label: string, maxLength = 2000): string {
  const normalized = value.replace(/\r\n/g, '\n').trim()

  if (!normalized) {
    throw new Error(`${label} is required.`)
  }

  if (normalized.length > maxLength) {
    throw new Error(`${label} is too long for the free static preview.`)
  }

  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(normalized)) {
    throw new Error(`${label} contains unsupported control characters.`)
  }

  return normalized
}

function normalizeHttpUrl(value: string): URL {
  const raw = sanitizeText(value, 'URL', 2048)
  let parsed: URL

  try {
    parsed = new URL(raw)
  } catch {
    throw new Error('Enter a valid absolute HTTP or HTTPS URL.')
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs are allowed for QRRoute URL previews.')
  }

  if (parsed.username || parsed.password) {
    throw new Error('URLs with embedded credentials are blocked.')
  }

  const hostname = parsed.hostname.toLowerCase()
  if (
    hostname === 'localhost'
    || hostname.endsWith('.localhost')
    || hostname.endsWith('.local')
    || hostname.endsWith('.internal')
    || hostname.endsWith('.lan')
  ) {
    throw new Error('Local or private hostnames are blocked.')
  }

  if (isBlockedIpLiteral(hostname)) {
    throw new Error('Private, loopback and reserved IP destinations are blocked.')
  }

  parsed.hash = ''

  return parsed
}

function isBlockedIpLiteral(hostname: string): boolean {
  const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/u)
  if (ipv4Match) {
    const octets = ipv4Match.slice(1).map(Number)
    if (octets.some((octet) => octet < 0 || octet > 255)) {
      return true
    }

    const [a, b] = octets
    return (
      a === 0
      || a === 10
      || a === 127
      || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31)
      || (a === 192 && b === 168)
      || a >= 224
    )
  }

  const unwrappedIpv6 = hostname.replace(/^\[|\]$/gu, '')
  if (unwrappedIpv6.includes(':')) {
    return (
      unwrappedIpv6 === '::1'
      || unwrappedIpv6.startsWith('fc')
      || unwrappedIpv6.startsWith('fd')
      || unwrappedIpv6.startsWith('fe80')
      || unwrappedIpv6 === '::'
    )
  }

  return false
}

function normalizeStaticPayload(primaryInput: string, mode: QrRouteToolMode): { payload: string; label: string } {
  if (mode === 'text') {
    return { payload: sanitizeText(primaryInput, 'Text payload'), label: 'Plain text' }
  }

  if (mode === 'email') {
    const email = sanitizeText(primaryInput, 'Email address', 320)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
      throw new Error('Enter a valid email address.')
    }

    return { payload: `mailto:${email}`, label: 'Email' }
  }

  if (mode === 'phone') {
    const phone = sanitizeText(primaryInput, 'Phone number', 80).replace(/[^\d+]/gu, '')
    if (!/^\+?\d{7,20}$/u.test(phone)) {
      throw new Error('Enter a phone number with 7 to 20 digits.')
    }

    return { payload: `tel:${phone}`, label: 'Phone' }
  }

  const url = normalizeHttpUrl(primaryInput)
  return { payload: url.toString(), label: 'Safe URL' }
}

function createStaticQr(primaryInput: string, mode: QrRouteToolMode): QrRouteToolResult {
  const { payload, label } = normalizeStaticPayload(primaryInput, mode)

  return ok([
    `Type: ${label}`,
    `Payload: ${payload}`,
    'Storage: not stored by QRRoute',
    'Redirects: not used for static QR codes',
  ].join('\n'), [
    { label: 'Payload type', value: label },
    { label: 'Characters', value: String(payload.length) },
  ], payload)
}

function createBarcode(primaryInput: string): QrRouteToolResult {
  const value = sanitizeText(primaryInput, 'Barcode value', 80)

  if (!/^[\x20-\x7e]+$/u.test(value)) {
    throw new Error('Code 128 preview accepts printable ASCII characters only.')
  }

  return ok([
    `Format: Code 128`,
    `Value: ${value}`,
    'Rendering: browser-side SVG preview',
  ].join('\n'), [
    { label: 'Format', value: 'Code 128' },
    { label: 'Characters', value: String(value.length) },
  ], value, 'barcode')
}

function parseUtmFields(value: string): Record<string, string> {
  const allowed = new Set(['source', 'medium', 'campaign', 'term', 'content', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'])
  const result: Record<string, string> = {}

  for (const rawLine of value.split(/\n|&/u)) {
    const line = rawLine.trim()
    if (!line) {
      continue
    }

    const [rawKey, ...rawValueParts] = line.split('=')
    const key = rawKey.trim().toLowerCase()
    const fieldValue = rawValueParts.join('=').trim()

    if (!allowed.has(key)) {
      throw new Error(`Unsupported UTM field: ${rawKey}`)
    }

    if (!fieldValue || fieldValue.length > 120) {
      throw new Error(`UTM field ${rawKey} needs a short value.`)
    }

    if (/[\u0000-\u001f\u007f]/u.test(fieldValue)) {
      throw new Error(`UTM field ${rawKey} contains unsupported characters.`)
    }

    const normalizedKey = key.startsWith('utm_') ? key : `utm_${key}`
    result[normalizedKey] = fieldValue
  }

  if (!result.utm_source || !result.utm_medium || !result.utm_campaign) {
    throw new Error('UTM source, medium and campaign are required.')
  }

  return result
}

function buildUtm(primaryInput: string, secondaryInput: string): QrRouteToolResult {
  const url = normalizeHttpUrl(primaryInput)
  const fields = parseUtmFields(secondaryInput)

  Object.entries(fields).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return ok([
    `Campaign URL: ${url.toString()}`,
    `UTM source: ${fields.utm_source}`,
    `UTM medium: ${fields.utm_medium}`,
    `UTM campaign: ${fields.utm_campaign}`,
    'Analytics note: QRRoute records only tool_slug events in this MVP.',
  ].join('\n'), [
    { label: 'UTM fields', value: String(Object.keys(fields).length) },
    { label: 'URL host', value: url.hostname },
  ], url.toString())
}

function escapeVcardValue(value: string): string {
  return value.replace(/\\/gu, '\\\\').replace(/\n/gu, '\\n').replace(/,/gu, '\\,').replace(/;/gu, '\\;')
}

function buildVcard(primaryInput: string): QrRouteToolResult {
  const lines = sanitizeText(primaryInput, 'Contact lines', 1200)
    .split('\n')
    .map((line) => line.trim())

  const [name, organization = '', email = '', phone = '', website = ''] = lines
  if (!name) {
    throw new Error('Contact name is required.')
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
    throw new Error('Contact email is not valid.')
  }

  if (website) {
    normalizeHttpUrl(website)
  }

  const payloadLines = [
    'BEGIN:VCARD',
    'VERSION:4.0',
    `FN:${escapeVcardValue(name)}`,
    organization ? `ORG:${escapeVcardValue(organization)}` : '',
    email ? `EMAIL:${escapeVcardValue(email)}` : '',
    phone ? `TEL:${escapeVcardValue(phone)}` : '',
    website ? `URL:${escapeVcardValue(website)}` : '',
    'END:VCARD',
  ].filter(Boolean)
  const payload = payloadLines.join('\n')

  return ok([
    payload,
    '',
    'Storage: not stored by QRRoute',
  ].join('\n'), [
    { label: 'Contact', value: name },
    { label: 'Fields', value: String(payloadLines.length - 3) },
  ], payload)
}

function escapeWifiValue(value: string): string {
  return value.replace(/\\/gu, '\\\\').replace(/;/gu, '\\;').replace(/,/gu, '\\,').replace(/:/gu, '\\:')
}

function parseOptions(value: string): Record<string, string> {
  const result: Record<string, string> = {}

  for (const rawLine of value.split(/\n|;/u)) {
    const line = rawLine.trim()
    if (!line) {
      continue
    }

    const [rawKey, ...rawValueParts] = line.split('=')
    const key = rawKey.trim().toLowerCase()
    const fieldValue = rawValueParts.join('=').trim()
    if (!key) {
      continue
    }

    result[key] = fieldValue
  }

  return result
}

function buildWifi(primaryInput: string, secondaryInput: string, mode: QrRouteToolMode): QrRouteToolResult {
  const ssid = sanitizeText(primaryInput, 'Network SSID', 120)
  const options = parseOptions(secondaryInput)
  const networkKey = options.key ?? options.passphrase ?? ''
  const hidden = ['true', '1', 'yes'].includes((options.hidden ?? 'false').toLowerCase()) ? 'true' : 'false'
  const security = ['WPA', 'WEP', 'nopass'].includes(mode) ? mode : 'WPA'

  if (security !== 'nopass' && !networkKey) {
    throw new Error('Network key is required for WPA or WEP Wi-Fi QR payloads.')
  }

  const payload = `WIFI:T:${security};S:${escapeWifiValue(ssid)};P:${escapeWifiValue(networkKey)};H:${hidden};;`

  return ok([
    `SSID: ${ssid}`,
    `Security: ${security}`,
    `Hidden: ${hidden}`,
    'Network key display: included only inside the local QR payload output.',
    `Payload: ${payload}`,
  ].join('\n'), [
    { label: 'Security', value: security },
    { label: 'Hidden', value: hidden },
  ], payload)
}

function inspectPreview(primaryInput: string): QrRouteToolResult {
  const value = sanitizeText(primaryInput, 'Preview payload')

  try {
    const url = normalizeHttpUrl(value)

    return ok([
      `URL: ${url.toString()}`,
      `Scheme: ${url.protocol.replace(':', '')}`,
      `Host: ${url.hostname}`,
      'Fetch performed: no',
      'Redirect service: not active for free static preview',
    ].join('\n'), [
      { label: 'Payload type', value: 'URL' },
      { label: 'Host', value: url.hostname },
    ], url.toString())
  } catch (error) {
    return ok([
      'Payload type: text',
      `Characters: ${value.length}`,
      'Fetch performed: no',
      `URL safety note: ${error instanceof Error ? error.message : 'not a URL'}`,
    ].join('\n'), [
      { label: 'Payload type', value: 'Text' },
      { label: 'Characters', value: String(value.length) },
    ], value)
  }
}

export async function executeQrRouteTool(
  slug: QrRouteToolSlug,
  primaryInput: string,
  secondaryInput: string,
  mode: QrRouteToolMode,
): Promise<QrRouteToolResult> {
  try {
    ensureInputLimit(primaryInput, secondaryInput)

    if (slug === 'static-qr-code') {
      return createStaticQr(primaryInput, mode)
    }

    if (slug === 'barcode-generator') {
      return createBarcode(primaryInput)
    }

    if (slug === 'utm-builder') {
      return buildUtm(primaryInput, secondaryInput)
    }

    if (slug === 'vcard-qr') {
      return buildVcard(primaryInput)
    }

    if (slug === 'wifi-qr') {
      return buildWifi(primaryInput, secondaryInput, mode)
    }

    if (slug === 'preview-lab') {
      return inspectPreview(primaryInput)
    }

    return fail('Tool not found.')
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Tool execution failed.')
  }
}
