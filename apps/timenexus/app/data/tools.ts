import { publicLocaleCodes, sanitizePublicCopy, type LocaleCode } from './locales'

export const timeToolSlugs = [
  'timezone-converter',
  'date-difference',
  'business-days',
  'timestamp-converter',
  'age-calculator',
  'percentage-calculator',
  'unit-converter',
] as const

export type TimeToolSlug = (typeof timeToolSlugs)[number]
export type TimeToolCategory = 'timezone' | 'calendar' | 'business' | 'timestamp' | 'math' | 'units'
export type TimeToolMode = string

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface TimeToolCopy {
  title: string
  shortName: string
  headline: string
  description: string
  inputLabel: string
  secondaryInputLabel: string
  modeLabel: string
  resultLabel: string
  freeScope: string
  upgradeScope: string
  reviewedLabel: string
  contentSections: ContentSection[]
  faq: FaqItem[]
}

export interface TimeToolOption {
  value: TimeToolMode
  label: string
}

export interface TimeToolDefinition {
  slug: TimeToolSlug
  category: TimeToolCategory
  modes: TimeToolOption[]
  acceptsSecondaryInput: boolean
  samplePrimary: string
  sampleSecondary: string
  localized: Record<LocaleCode, TimeToolCopy>
}

export interface ResultMeta {
  label: string
  value: string
}

export interface TimeToolResult {
  ok: boolean
  output: string
  meta: ResultMeta[]
  error?: string
}

export interface TimeToolAnswerSummary {
  primary: string
  secondary: string
  details: ResultMeta[]
}

export interface TimeToolTimelineItem {
  label: string
  value: string
}

export interface PlannerZonePreset {
  label: string
  zone: string
}

export interface PlannerZoneGroup {
  value: string
  label: Record<LocaleCode, string>
  zones: PlannerZonePreset[]
}

export interface PlannerZoneResult extends PlannerZonePreset {
  localTime: string
  localDate: string
  hour: number
  businessStatus: 'business' | 'early' | 'late'
}

export interface MeetingPlannerResult {
  sourceLocal: string
  utcInstant: string
  durationMinutes: number
  zones: PlannerZoneResult[]
  suggestions: Array<{
    label: string
    sourceLocal: string
    utcInstant: string
    zonesInBusinessHours: number
    zoneSummary: string
  }>
}

interface TimeToolSpec {
  slug: TimeToolSlug
  category: TimeToolCategory
  title: string
  shortName: string
  headline: string
  description: string
  inputLabel: string
  secondaryInputLabel: string
  freeScope: string
  upgradeScope: string
  modes: TimeToolOption[]
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
  localSection: string
  localBody: string
  assumptionSection: string
  assumptionBody: string
  limitsSection: string
  limitsBody: string
  faqStorage: FaqItem
  faqAccuracy: FaqItem
}> = {
  en: {
    modeLabel: 'Mode',
    resultLabel: 'Result',
    localSection: 'Local execution',
    localBody: 'The free TimeNexus tool runs in this browser session and uses browser-side processing when supported.',
    assumptionSection: 'Assumptions',
    assumptionBody: 'Results use the entered dates, standard Gregorian calendar math, UTC-safe parsing, the browser Intl time-zone database and visible conversion labels.',
    limitsSection: 'Limits',
    limitsBody: 'DST changes, local holidays, payroll rules, legal deadlines and domain-specific calendars need human review before operational use.',
    faqStorage: { question: 'Are entries stored?', answer: 'No. TimeNexus does not use account storage, localStorage, sessionStorage or a product API for these free browser tools.' },
    faqAccuracy: { question: 'Can I use this for compliance deadlines?', answer: 'Use it as a planning helper only. Critical legal, tax, payroll or compliance deadlines require review against the official rule set.' },
  },
  'pt-br': {
    modeLabel: 'Modo',
    resultLabel: 'Resultado',
    localSection: 'Execucao local',
    localBody: 'A ferramenta gratuita do TimeNexus roda nesta sessao do navegador e usa processamento local quando suportado.',
    assumptionSection: 'Premissas',
    assumptionBody: 'Resultados usam as datas informadas, calendario gregoriano, parsing seguro em UTC, base de fusos Intl do navegador e rotulos visiveis.',
    limitsSection: 'Limites',
    limitsBody: 'Mudancas de horario de verao, feriados locais, regras trabalhistas, prazos legais e calendarios de dominio precisam revisao humana antes de uso operacional.',
    faqStorage: { question: 'As entradas sao armazenadas?', answer: 'Nao. O TimeNexus nao usa conta, localStorage, sessionStorage nem API de produto nestas ferramentas gratuitas do navegador.' },
    faqAccuracy: { question: 'Posso usar para prazos de compliance?', answer: 'Use apenas como apoio de planejamento. Prazos legais, fiscais, trabalhistas ou de compliance exigem revisao da regra oficial.' },
  },
  es: {
    modeLabel: 'Modo',
    resultLabel: 'Resultado',
    localSection: 'Ejecucion local',
    localBody: 'La herramienta gratis de TimeNexus corre en esta sesion del navegador y usa procesamiento local cuando hay soporte.',
    assumptionSection: 'Supuestos',
    assumptionBody: 'Los resultados usan las fechas ingresadas, calendario gregoriano, parsing seguro en UTC, base Intl de zonas horarias del navegador y etiquetas visibles.',
    limitsSection: 'Limites',
    limitsBody: 'Cambios DST, festivos locales, reglas laborales, plazos legales y calendarios del dominio requieren revision humana.',
    faqStorage: { question: 'Se almacenan entradas?', answer: 'No. TimeNexus no usa cuentas, localStorage, sessionStorage ni API de producto para estas herramientas gratis del navegador.' },
    faqAccuracy: { question: 'Sirve para plazos de cumplimiento?', answer: 'Usalo solo como apoyo de planificacion. Plazos legales, fiscales, laborales o de compliance requieren revisar la regla oficial.' },
  },
  fr: {
    modeLabel: 'Mode',
    resultLabel: 'Resultat',
    localSection: 'Execution locale',
    localBody: 'L outil gratuit TimeNexus s execute dans cette session navigateur et utilise un traitement local si supporte.',
    assumptionSection: 'Hypotheses',
    assumptionBody: 'Les resultats utilisent les dates saisies, le calendrier gregorien, un parsing UTC, la base Intl des fuseaux du navigateur et des libelles visibles.',
    limitsSection: 'Limites',
    limitsBody: 'Changements DST, jours feries locaux, regles paie, delais juridiques et calendriers metier demandent une revue humaine.',
    faqStorage: { question: 'Les entrees sont-elles stockees?', answer: 'Non. TimeNexus n utilise ni compte, ni localStorage, ni sessionStorage, ni API produit pour ces outils gratuits du navigateur.' },
    faqAccuracy: { question: 'Puis-je l utiliser pour des delais de conformite?', answer: 'Utilisez-le comme aide de planification. Les delais juridiques, fiscaux, paie ou conformite exigent la regle officielle.' },
  },
  de: {
    modeLabel: 'Modus',
    resultLabel: 'Ergebnis',
    localSection: 'Lokale Ausfuehrung',
    localBody: 'Das kostenlose TimeNexus-Tool laeuft in dieser Browser-Sitzung und nutzt lokale Verarbeitung, wenn moeglich.',
    assumptionSection: 'Annahmen',
    assumptionBody: 'Ergebnisse nutzen eingegebene Daten, gregorianische Kalenderlogik, UTC-sicheres Parsing, die Intl-Zeitzonendatenbank des Browsers und sichtbare Labels.',
    limitsSection: 'Grenzen',
    limitsBody: 'DST-Wechsel, lokale Feiertage, Payroll-Regeln, juristische Fristen und Fachkalender brauchen menschliche Pruefung.',
    faqStorage: { question: 'Werden Eingaben gespeichert?', answer: 'Nein. TimeNexus nutzt fuer diese kostenlosen Browser-Tools weder Konto, localStorage, sessionStorage noch Produkt-API.' },
    faqAccuracy: { question: 'Kann ich das fuer Compliance-Fristen nutzen?', answer: 'Nur als Planungshilfe. Rechtliche, steuerliche, Payroll- oder Compliance-Fristen brauchen die offizielle Regel.' },
  },
}

const specs: TimeToolSpec[] = [
  {
    slug: 'timezone-converter',
    category: 'timezone',
    title: 'Time Zone Converter',
    shortName: 'Zones',
    headline: 'Convert a local meeting time or UTC instant across two named IANA time zones.',
    description: 'Enter a local time, source zone and target zone. The free result names UTC and both selected zones.',
    inputLabel: 'Local time or UTC instant',
    secondaryInputLabel: 'From zone -> to zone',
    freeScope: 'Format one instant across two IANA time zones with UTC included.',
    upgradeScope: 'Embeddable widgets, saved zone presets, shared calendars, alerts and API conversion.',
    modes: [{ value: 'instant', label: 'Instant across zones' }],
    samplePrimary: '2026-06-26T09:30',
    sampleSecondary: 'America/New_York -> Europe/London',
  },
  {
    slug: 'date-difference',
    category: 'calendar',
    title: 'Date Difference Calculator',
    shortName: 'Date diff',
    headline: 'Measure days, weeks and approximate months between two dates.',
    description: 'Use two dates to get a readable span. Date-only inputs are parsed at UTC midnight.',
    inputLabel: 'Start date',
    secondaryInputLabel: 'End date',
    freeScope: 'Calendar-day difference, weeks and approximate months for one date pair.',
    upgradeScope: 'Saved presets, recurring spans, team export and API access.',
    modes: [
      { value: 'calendar-days', label: 'Exclusive' },
      { value: 'calendar-days-inclusive', label: 'Inclusive' },
    ],
    samplePrimary: '2026-01-01',
    sampleSecondary: '2026-02-15',
  },
  {
    slug: 'business-days',
    category: 'business',
    title: 'Business Days Calculator',
    shortName: 'Business days',
    headline: 'Count Monday to Friday business days between two dates.',
    description: 'Enter a start and end date. The free counter is inclusive and does not apply holiday calendars.',
    inputLabel: 'Start date',
    secondaryInputLabel: 'End date',
    freeScope: 'Inclusive Monday-Friday count for one date range, with weekend count disclosed.',
    upgradeScope: 'Regional holiday calendars, SLA rules, saved calendars, monitoring and API.',
    modes: [
      { value: 'mon-fri-inclusive', label: 'Include start/end' },
      { value: 'mon-fri-exclusive', label: 'Exclude start/end' },
    ],
    samplePrimary: '2026-06-01',
    sampleSecondary: '2026-06-05',
  },
  {
    slug: 'timestamp-converter',
    category: 'timestamp',
    title: 'Timestamp Converter',
    shortName: 'Timestamp',
    headline: 'Convert Unix seconds, Unix milliseconds and date strings into readable time values.',
    description: 'Paste a timestamp or date string. Leave it empty to inspect the current browser time.',
    inputLabel: 'Timestamp or date string',
    secondaryInputLabel: 'Optional IANA time zone',
    freeScope: 'Unix seconds, milliseconds, ISO, UTC, local display and optional named zone display.',
    upgradeScope: 'Preset widgets, batch conversion, monitoring and API.',
    modes: [{ value: 'auto', label: 'Auto-detect' }],
    samplePrimary: '1767225600',
    sampleSecondary: 'America/Sao_Paulo',
  },
  {
    slug: 'age-calculator',
    category: 'calendar',
    title: 'Age Calculator',
    shortName: 'Age',
    headline: 'Calculate age in years, months and days on a reference date.',
    description: 'Enter a birth date and an optional reference date to get a human-readable age span.',
    inputLabel: 'Birth date',
    secondaryInputLabel: 'Reference date',
    freeScope: 'Age as years, months, days, total days and reference date for one person/event.',
    upgradeScope: 'Saved profiles, reminders, team records, export and API.',
    modes: [{ value: 'ymd', label: 'Years, months, days' }],
    samplePrimary: '1990-06-15',
    sampleSecondary: '2026-06-26',
  },
  {
    slug: 'percentage-calculator',
    category: 'math',
    title: 'Percentage Calculator',
    shortName: 'Percent',
    headline: 'Calculate percent-of, percent change and add-percent scenarios.',
    description: 'Use two numeric values and choose the mode. The result shows the formula used.',
    inputLabel: 'Base value',
    secondaryInputLabel: 'Percent or comparison value',
    freeScope: 'One percent-of, percent-change or add-percent calculation with formula display.',
    upgradeScope: 'Bulk sheets, saved formulas, collaboration and API.',
    modes: [
      { value: 'percent-of', label: 'Percent of value' },
      { value: 'percent-change', label: 'Percent change' },
      { value: 'add-percent', label: 'Add percent' },
    ],
    samplePrimary: '250',
    sampleSecondary: '40',
  },
  {
    slug: 'unit-converter',
    category: 'units',
    title: 'Unit Converter',
    shortName: 'Units',
    headline: 'Convert common length, weight and temperature units locally.',
    description: 'Enter a number and choose the conversion pair. The free result includes the formula family.',
    inputLabel: 'Value',
    secondaryInputLabel: 'Not used',
    freeScope: 'Common km, mi, kg, lb, Celsius and Fahrenheit conversions for one value.',
    upgradeScope: 'Custom unit sets, engineering presets, widgets and API.',
    modes: [
      { value: 'km-mi', label: 'Kilometers to miles' },
      { value: 'mi-km', label: 'Miles to kilometers' },
      { value: 'kg-lb', label: 'Kilograms to pounds' },
      { value: 'lb-kg', label: 'Pounds to kilograms' },
      { value: 'c-f', label: 'Celsius to Fahrenheit' },
      { value: 'f-c', label: 'Fahrenheit to Celsius' },
    ],
    acceptsSecondaryInput: false,
    samplePrimary: '42',
  },
]

export const plannerZoneGroups: PlannerZoneGroup[] = [
  {
    value: 'americas-europe',
    label: {
      en: 'Americas + Europe',
      'pt-br': 'Americas + Europa',
      es: 'Americas + Europa',
      fr: 'Ameriques + Europe',
      de: 'Amerika + Europa',
    },
    zones: [
      { label: 'New York', zone: 'America/New_York' },
      { label: 'Sao Paulo', zone: 'America/Sao_Paulo' },
      { label: 'London', zone: 'Europe/London' },
      { label: 'Berlin', zone: 'Europe/Berlin' },
    ],
  },
  {
    value: 'global-product',
    label: {
      en: 'Global product team',
      'pt-br': 'Time global de produto',
      es: 'Equipo global de producto',
      fr: 'Equipe produit globale',
      de: 'Globales Produktteam',
    },
    zones: [
      { label: 'San Francisco', zone: 'America/Los_Angeles' },
      { label: 'New York', zone: 'America/New_York' },
      { label: 'London', zone: 'Europe/London' },
      { label: 'Tokyo', zone: 'Asia/Tokyo' },
    ],
  },
  {
    value: 'apac-europe',
    label: {
      en: 'APAC + Europe',
      'pt-br': 'APAC + Europa',
      es: 'APAC + Europa',
      fr: 'APAC + Europe',
      de: 'APAC + Europa',
    },
    zones: [
      { label: 'Singapore', zone: 'Asia/Singapore' },
      { label: 'Tokyo', zone: 'Asia/Tokyo' },
      { label: 'Sydney', zone: 'Australia/Sydney' },
      { label: 'Berlin', zone: 'Europe/Berlin' },
    ],
  },
]

export const plannerSourceZones: PlannerZonePreset[] = Array.from(
  new Map(
    plannerZoneGroups
      .flatMap((group) => group.zones)
      .map((zone) => [zone.zone, zone] as const),
  ).values(),
)

function sections(locale: LocaleCode): ContentSection[] {
  const base = localizedBasics[locale]

  return [
    { heading: base.localSection, paragraphs: [base.localBody] },
    { heading: base.assumptionSection, paragraphs: [base.assumptionBody] },
    { heading: base.limitsSection, paragraphs: [base.limitsBody] },
  ]
}

function copyFor(spec: TimeToolSpec, locale: LocaleCode): TimeToolCopy {
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
    freeScope: spec.freeScope,
    upgradeScope: spec.upgradeScope,
    reviewedLabel: reviewed[locale],
    contentSections: sections(locale),
    faq: [base.faqStorage, base.faqAccuracy],
  }
}

function timeTool(spec: TimeToolSpec): TimeToolDefinition {
  return {
    slug: spec.slug,
    category: spec.category,
    modes: spec.modes,
    acceptsSecondaryInput: spec.acceptsSecondaryInput ?? true,
    samplePrimary: spec.samplePrimary,
    sampleSecondary: spec.sampleSecondary ?? '',
    localized: Object.fromEntries(
      publicLocaleCodes.map((locale) => [locale, copyFor(spec, locale)]),
    ) as Record<LocaleCode, TimeToolCopy>,
  }
}

export const timeToolCatalog: TimeToolDefinition[] = specs.map(timeTool)
const timeToolBySlug = new Map(timeToolCatalog.map((candidate) => [candidate.slug, candidate]))

export function getTimeToolBySlug(slug: string | undefined): TimeToolDefinition | null {
  if (!timeToolSlugs.includes(slug as TimeToolSlug)) {
    return null
  }

  return timeToolBySlug.get(slug as TimeToolSlug) ?? null
}

export function getTimeToolCopy(toolDefinition: TimeToolDefinition, locale: LocaleCode): TimeToolCopy {
  return sanitizePublicCopy(locale, toolDefinition.localized[locale])
}

export function getCategoryLabel(category: TimeToolCategory, locale: LocaleCode): string {
  const labels: Record<TimeToolCategory, Record<LocaleCode, string>> = {
    timezone: { en: 'Time zones', 'pt-br': 'Fusos horarios', es: 'Zonas horarias', fr: 'Fuseaux horaires', de: 'Zeitzonen' },
    calendar: { en: 'Dates', 'pt-br': 'Datas', es: 'Fechas', fr: 'Dates', de: 'Daten' },
    business: { en: 'Business days', 'pt-br': 'Dias uteis', es: 'Dias laborables', fr: 'Jours ouvrables', de: 'Arbeitstage' },
    timestamp: { en: 'Timestamps', 'pt-br': 'Timestamps', es: 'Timestamps', fr: 'Timestamps', de: 'Timestamps' },
    math: { en: 'Percentages', 'pt-br': 'Porcentagens', es: 'Porcentajes', fr: 'Pourcentages', de: 'Prozentwerte' },
    units: { en: 'Units', 'pt-br': 'Unidades', es: 'Unidades', fr: 'Unites', de: 'Einheiten' },
  }

  return labels[category][locale]
}

export function filterTimeTools(query: string, category: TimeToolCategory | 'all', locale: LocaleCode): TimeToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return timeToolCatalog.filter((toolDefinition) => {
    const copy = getTimeToolCopy(toolDefinition, locale)
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

export function getRelatedTimeTools(toolDefinition: TimeToolDefinition, limit = 3): TimeToolDefinition[] {
  const sameCategory = timeToolCatalog.filter((candidate) => candidate.slug !== toolDefinition.slug && candidate.category === toolDefinition.category)
  const otherCategories = timeToolCatalog.filter((candidate) => candidate.slug !== toolDefinition.slug && candidate.category !== toolDefinition.category)

  return [...sameCategory, ...otherCategories].slice(0, limit)
}

function outputLines(result: TimeToolResult): string[] {
  return result.output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function findLine(result: TimeToolResult, prefix: string): string | null {
  return outputLines(result).find((line) => line.startsWith(prefix)) ?? null
}

function firstResultLine(result: TimeToolResult): string {
  return outputLines(result)[0] ?? 'Result ready.'
}

function metaValue(result: TimeToolResult, label: string): string | null {
  return result.meta.find((item) => item.label === label)?.value ?? null
}

export function createTimeToolAnswerSummary(slug: TimeToolSlug, result: TimeToolResult | null): TimeToolAnswerSummary | null {
  if (!result?.ok) {
    return null
  }

  if (slug === 'timezone-converter') {
    const sourceZone = metaValue(result, 'Source zone')
    const targetZone = metaValue(result, 'Target zone')
    const targetLine = targetZone ? findLine(result, `${targetZone}:`) : null
    const sourceLine = sourceZone ? findLine(result, `${sourceZone}:`) : null
    const utcLine = findLine(result, 'UTC:')

    return {
      primary: targetLine ?? firstResultLine(result),
      secondary: [sourceLine, utcLine].filter(Boolean).join(' | '),
      details: result.meta,
    }
  }

  const preferredPrefixes: Partial<Record<TimeToolSlug, string[]>> = {
    'date-difference': ['Calendar days:', 'Weeks:'],
    'business-days': ['Business days:', 'Weekend days:'],
    'timestamp-converter': ['ISO:', 'UTC:'],
    'age-calculator': ['Age:', 'Total days:'],
    'percentage-calculator': ['Result:', 'Percent change:', '% of'],
    'unit-converter': ['Result:', 'Conversion:'],
  }
  const lines = outputLines(result)
  const primary = preferredPrefixes[slug]
    ?.map((prefix) => lines.find((line) => line.startsWith(prefix) || line.includes(prefix)))
    .find(Boolean)

  return {
    primary: primary ?? firstResultLine(result),
    secondary: lines.filter((line) => line !== primary).slice(0, 2).join(' | '),
    details: result.meta,
  }
}

export function createTimeToolTimeline(slug: TimeToolSlug, result: TimeToolResult | null): TimeToolTimelineItem[] {
  if (!result?.ok) {
    return []
  }

  const lines = outputLines(result)

  if (slug === 'timezone-converter') {
    const sourceZone = metaValue(result, 'Source zone')
    const targetZone = metaValue(result, 'Target zone')
    const timelinePrefixes = [
      'UTC',
      ...(sourceZone ? [sourceZone] : []),
      ...(targetZone ? [targetZone] : []),
    ]

    return timelinePrefixes
      .map((prefix) => {
        const line = lines.find((candidate) => candidate.startsWith(`${prefix}:`))
        return line ? { label: prefix, value: line.replace(`${prefix}:`, '').trim() } : null
      })
      .filter((item): item is TimeToolTimelineItem => Boolean(item))
  }

  if (slug === 'timestamp-converter') {
    const namedZone = metaValue(result, 'Named zone')
    const timelinePrefixes = ['ISO', 'UTC', 'Local', ...(namedZone && namedZone !== 'not provided' ? [namedZone] : [])]

    return timelinePrefixes
      .map((prefix) => {
        const line = lines.find((candidate) => candidate.startsWith(`${prefix}:`))
        return line ? { label: prefix, value: line.replace(`${prefix}:`, '').trim() } : null
      })
      .filter((item): item is TimeToolTimelineItem => Boolean(item))
  }

  return []
}

export function createTimeToolStructuredData(toolDefinition: TimeToolDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getTimeToolCopy(toolDefinition, locale)

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

function ensureInputLimit(...values: string[]): void {
  const totalLength = values.reduce((sum, value) => sum + value.length, 0)

  if (totalLength > 20_000) {
    throw new Error('Free browser tools accept short time and unit inputs. Larger batches belong in account features.')
  }
}

function ok(output: string, meta: ResultMeta[] = []): TimeToolResult {
  return { ok: true, output, meta }
}

function fail(error: string): TimeToolResult {
  return { ok: false, output: '', meta: [], error }
}

function parseRequiredDate(input: string, label: string): Date {
  const trimmed = input.trim()
  if (!trimmed) {
    throw new Error(`${label} is required.`)
  }

  const date = /^\d{4}-\d{2}-\d{2}$/u.test(trimmed)
    ? new Date(`${trimmed}T00:00:00Z`)
    : new Date(trimmed)

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${label} could not be parsed.`)
  }

  return date
}

function formatDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function assertTimeZone(zone: string): string {
  const trimmed = zone.trim()
  if (!trimmed) {
    throw new Error('Time zone is required.')
  }

  try {
    new Intl.DateTimeFormat('en-US', { timeZone: trimmed }).format(new Date())
  } catch {
    throw new Error(`Unsupported IANA time zone: ${trimmed}`)
  }

  return trimmed
}

function localeTag(locale: LocaleCode): string {
  const tags: Record<LocaleCode, string> = {
    en: 'en-US',
    'pt-br': 'pt-BR',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
  }

  return tags[locale]
}

function dateTimePartsInZone(date: Date, timeZone: string): Record<string, number> {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })
  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  )

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
  }
}

function offsetMinutesAt(date: Date, timeZone: string): number {
  const parts = dateTimePartsInZone(date, timeZone)
  const localAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second)

  return Math.round((localAsUtc - date.getTime()) / 60_000)
}

function parseLocalDateTime(value: string): { year: number; month: number; day: number; hour: number; minute: number } {
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/u)

  if (!match) {
    throw new Error('Use a local date-time in YYYY-MM-DDTHH:mm format.')
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5]),
  }
}

export function zonedLocalDateTimeToUtc(value: string, timeZone: string): Date {
  const zone = assertTimeZone(timeZone)
  const parts = parseLocalDateTime(value)
  const localAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, 0)
  const firstOffset = offsetMinutesAt(new Date(localAsUtc), zone)
  let utc = localAsUtc - firstOffset * 60_000
  const secondOffset = offsetMinutesAt(new Date(utc), zone)

  if (secondOffset !== firstOffset) {
    utc = localAsUtc - secondOffset * 60_000
  }

  return new Date(utc)
}

function formatInZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'short',
  }).format(date)
}

function formatPlannerDate(date: Date, timeZone: string, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(localeTag(locale), {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: '2-digit',
  }).format(date)
}

function formatPlannerTime(date: Date, timeZone: string, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(localeTag(locale), {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'short',
  }).format(date)
}

function businessStatus(hour: number): PlannerZoneResult['businessStatus'] {
  if (hour < 9) {
    return 'early'
  }

  if (hour >= 17) {
    return 'late'
  }

  return 'business'
}

export function formatPlannerZone(date: Date, preset: PlannerZonePreset, locale: LocaleCode): PlannerZoneResult {
  const zone = assertTimeZone(preset.zone)
  const parts = dateTimePartsInZone(date, zone)

  return {
    ...preset,
    zone,
    localTime: formatPlannerTime(date, zone, locale),
    localDate: formatPlannerDate(date, zone, locale),
    hour: parts.hour,
    businessStatus: businessStatus(parts.hour),
  }
}

function slotLabel(offsetMinutes: number): string {
  if (offsetMinutes === 0) {
    return 'Anchor'
  }

  const hours = Math.abs(offsetMinutes / 60)

  return offsetMinutes < 0 ? `-${hours}h` : `+${hours}h`
}

export function buildMeetingPlannerResult(input: {
  localDateTime: string
  sourceZone: string
  durationMinutes: number
  targetZones: PlannerZonePreset[]
  locale: LocaleCode
}): MeetingPlannerResult {
  const sourceZone = assertTimeZone(input.sourceZone)
  const instant = zonedLocalDateTimeToUtc(input.localDateTime, sourceZone)
  const durationMinutes = Math.max(15, Math.min(180, Math.round(input.durationMinutes)))
  const zones = input.targetZones.map((zone) => formatPlannerZone(instant, zone, input.locale))
  const sourceLocal = formatPlannerTime(instant, sourceZone, input.locale)
  const utcInstant = instant.toISOString()
  const suggestions = [-120, 0, 120].map((offset) => {
    const slotInstant = new Date(instant.getTime() + offset * 60_000)
    const slotZones = input.targetZones.map((zone) => formatPlannerZone(slotInstant, zone, input.locale))
    const businessZones = slotZones.filter((zone) => zone.businessStatus === 'business')

    return {
      label: slotLabel(offset),
      sourceLocal: formatPlannerTime(slotInstant, sourceZone, input.locale),
      utcInstant: slotInstant.toISOString(),
      zonesInBusinessHours: businessZones.length,
      zoneSummary: businessZones.map((zone) => zone.label).join(', '),
    }
  })

  return {
    sourceLocal,
    utcInstant,
    durationMinutes,
    zones,
    suggestions,
  }
}

function splitZonePair(input: string): [string, string] {
  const parts = input
    .split(/\s*(?:->|,|\n|\bto\b)\s*/u)
    .map((part) => part.trim())
    .filter(Boolean)

  if (parts.length < 2) {
    throw new Error('Enter two IANA zones, for example America/New_York -> Europe/London.')
  }

  return [assertTimeZone(parts[0]), assertTimeZone(parts[1])]
}

function convertTimeZones(primaryInput: string, secondaryInput: string): TimeToolResult {
  const [sourceZone, targetZone] = splitZonePair(secondaryInput)
  const trimmed = primaryInput.trim()
  const hasExplicitUtcOrOffset = /(?:z|[+-]\d{2}:?\d{2})$/iu.test(trimmed)
  const date = hasExplicitUtcOrOffset
    ? parseRequiredDate(primaryInput, 'Date-time')
    : zonedLocalDateTimeToUtc(trimmed, sourceZone)

  return ok([
    `Input time: ${trimmed}`,
    `Input instant: ${date.toISOString()}`,
    `UTC: ${formatInZone(date, 'UTC')}`,
    `${sourceZone}: ${formatInZone(date, sourceZone)}`,
    `${targetZone}: ${formatInZone(date, targetZone)}`,
  ].join('\n'), [
    { label: 'Source zone', value: sourceZone },
    { label: 'Target zone', value: targetZone },
  ])
}

function calculateDateDifference(primaryInput: string, secondaryInput: string, mode: TimeToolMode): TimeToolResult {
  const start = parseRequiredDate(primaryInput, 'Start date')
  const end = parseRequiredDate(secondaryInput, 'End date')
  const deltaMs = end.getTime() - start.getTime()
  const sign = deltaMs < 0 ? -1 : 1
  const exclusiveDays = Math.abs(Math.round(deltaMs / 86_400_000))
  const inclusive = mode === 'calendar-days-inclusive'
  const days = inclusive ? exclusiveDays + 1 : exclusiveDays
  const weeks = days / 7
  const approximateMonths = days / 30.4375

  return ok([
    `Start: ${formatDateOnly(start)}`,
    `End: ${formatDateOnly(end)}`,
    `Direction: ${sign < 0 ? 'end before start' : 'end after start'}`,
    `Counting mode: ${inclusive ? 'inclusive' : 'exclusive'}`,
    `Calendar days: ${days}`,
    `Weeks: ${formatNumber(weeks)}`,
    `Approximate months: ${formatNumber(approximateMonths)}`,
  ].join('\n'), [
    { label: 'Calendar days', value: String(days) },
    { label: 'Counting mode', value: inclusive ? 'inclusive' : 'exclusive' },
  ])
}

function calculateBusinessDays(primaryInput: string, secondaryInput: string, mode: TimeToolMode): TimeToolResult {
  let start = parseRequiredDate(primaryInput, 'Start date')
  let end = parseRequiredDate(secondaryInput, 'End date')
  const reversed = start.getTime() > end.getTime()

  if (reversed) {
    const previousStart = start
    start = end
    end = previousStart
  }

  const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()))
  const last = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()))
  const exclusive = mode === 'mon-fri-exclusive'
  if (exclusive) {
    cursor.setUTCDate(cursor.getUTCDate() + 1)
    last.setUTCDate(last.getUTCDate() - 1)
  }
  let businessDays = 0
  let weekendDays = 0
  let totalDays = 0

  while (cursor.getTime() <= last.getTime()) {
    const day = cursor.getUTCDay()
    if (day === 0 || day === 6) {
      weekendDays += 1
    } else {
      businessDays += 1
    }

    totalDays += 1
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }

  return ok([
    `Start: ${formatDateOnly(start)}`,
    `End: ${formatDateOnly(end)}`,
    `Range order: ${reversed ? 'reversed input, counted ascending' : 'ascending input'}`,
    `Endpoints: ${exclusive ? 'excluded' : 'included'}`,
    `Business days: ${businessDays}`,
    `Weekend days: ${weekendDays}`,
    `Calendar days included: ${totalDays}`,
    'Holiday calendars: not applied',
  ].join('\n'), [
    { label: 'Business days', value: String(businessDays) },
    { label: 'Endpoints', value: exclusive ? 'excluded' : 'included' },
    { label: 'Holiday calendars', value: 'not applied' },
  ])
}

function convertTimestamp(primaryInput: string, secondaryInput: string): TimeToolResult {
  const trimmed = primaryInput.trim()
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

  const zone = secondaryInput.trim() ? assertTimeZone(secondaryInput) : ''
  const output = [
    `ISO: ${date.toISOString()}`,
    `Unix seconds: ${Math.floor(date.getTime() / 1000)}`,
    `Unix milliseconds: ${date.getTime()}`,
    `UTC: ${date.toUTCString()}`,
    `Local: ${date.toString()}`,
    ...(zone ? [`${zone}: ${formatInZone(date, zone)}`] : []),
  ]

  return ok(output.join('\n'), [
    { label: 'Detection', value: 'automatic' },
    { label: 'Named zone', value: zone || 'not provided' },
  ])
}

function previousMonthDayCount(year: number, zeroBasedMonth: number): number {
  return new Date(Date.UTC(year, zeroBasedMonth, 0)).getUTCDate()
}

function calculateAge(primaryInput: string, secondaryInput: string): TimeToolResult {
  const birth = parseRequiredDate(primaryInput, 'Birth date')
  const reference = secondaryInput.trim() ? parseRequiredDate(secondaryInput, 'Reference date') : new Date()

  if (reference.getTime() < birth.getTime()) {
    throw new Error('Reference date must be on or after the birth date.')
  }

  let years = reference.getUTCFullYear() - birth.getUTCFullYear()
  let months = reference.getUTCMonth() - birth.getUTCMonth()
  let days = reference.getUTCDate() - birth.getUTCDate()

  if (days < 0) {
    months -= 1
    days += previousMonthDayCount(reference.getUTCFullYear(), reference.getUTCMonth())
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.floor((reference.getTime() - birth.getTime()) / 86_400_000)
  const nextBirthday = new Date(Date.UTC(reference.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate()))
  if (nextBirthday.getTime() < reference.getTime()) {
    nextBirthday.setUTCFullYear(nextBirthday.getUTCFullYear() + 1)
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - reference.getTime()) / 86_400_000)

  return ok([
    `Birth date: ${formatDateOnly(birth)}`,
    `Reference date: ${formatDateOnly(reference)}`,
    `Age: ${years} years, ${months} months, ${days} days`,
    `Total days: ${totalDays}`,
    `Next birthday: ${formatDateOnly(nextBirthday)}`,
    `Days until next birthday: ${daysUntilBirthday}`,
  ].join('\n'), [
    { label: 'Years', value: String(years) },
    { label: 'Total days', value: String(totalDays) },
    { label: 'Next birthday', value: formatDateOnly(nextBirthday) },
  ])
}

function parseNumber(input: string, label: string): number {
  const normalized = input.trim().replace(/,/gu, '.')
  if (!normalized) {
    throw new Error(`${label} is required.`)
  }

  const value = Number(normalized)
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a valid number.`)
  }

  return value
}

function formatNumber(value: number): string {
  if (Number.isInteger(value)) {
    return String(value)
  }

  return Number(value.toFixed(6)).toString()
}

function calculatePercentage(primaryInput: string, secondaryInput: string, mode: TimeToolMode): TimeToolResult {
  const primary = parseNumber(primaryInput, 'Base value')
  const secondary = parseNumber(secondaryInput, 'Percent or comparison value')

  if (mode === 'percent-change') {
    if (primary === 0) {
      throw new Error('Percent change cannot use zero as the original value.')
    }

    const delta = secondary - primary
    const percent = (delta / primary) * 100
    return ok([
      `Original value: ${formatNumber(primary)}`,
      `New value: ${formatNumber(secondary)}`,
      `Difference: ${formatNumber(delta)}`,
      `Percent change: ${formatNumber(percent)}%`,
      `Formula: (${formatNumber(secondary)} - ${formatNumber(primary)}) / ${formatNumber(primary)} x 100`,
    ].join('\n'), [{ label: 'Percent change', value: `${formatNumber(percent)}%` }])
  }

  if (mode === 'add-percent') {
    const added = primary * (secondary / 100)
    const result = primary + added
    return ok([
      `Base value: ${formatNumber(primary)}`,
      `Percent added: ${formatNumber(secondary)}%`,
      `Added amount: ${formatNumber(added)}`,
      `Result: ${formatNumber(result)}`,
      `Formula: ${formatNumber(primary)} + (${formatNumber(primary)} x ${formatNumber(secondary)} / 100)`,
    ].join('\n'), [{ label: 'Result', value: formatNumber(result) }])
  }

  const result = primary * (secondary / 100)
  return ok([
    `${formatNumber(secondary)}% of ${formatNumber(primary)} = ${formatNumber(result)}`,
    `Formula: ${formatNumber(primary)} x ${formatNumber(secondary)} / 100`,
  ].join('\n'), [{ label: 'Result', value: formatNumber(result) }])
}

function convertUnit(primaryInput: string, mode: TimeToolMode): TimeToolResult {
  const value = parseNumber(primaryInput, 'Value')
  const conversions: Record<string, { label: string; result: number; outputUnit: string }> = {
    'km-mi': { label: 'Kilometers to miles', result: value * 0.621371192, outputUnit: 'mi' },
    'mi-km': { label: 'Miles to kilometers', result: value / 0.621371192, outputUnit: 'km' },
    'kg-lb': { label: 'Kilograms to pounds', result: value * 2.2046226218, outputUnit: 'lb' },
    'lb-kg': { label: 'Pounds to kilograms', result: value / 2.2046226218, outputUnit: 'kg' },
    'c-f': { label: 'Celsius to Fahrenheit', result: (value * 9 / 5) + 32, outputUnit: 'F' },
    'f-c': { label: 'Fahrenheit to Celsius', result: (value - 32) * 5 / 9, outputUnit: 'C' },
  }
  const conversion = conversions[mode]
  if (!conversion) {
    throw new Error('Unsupported unit conversion mode.')
  }

  return ok([
    `Conversion: ${conversion.label}`,
    `Input: ${formatNumber(value)}`,
    `Result: ${formatNumber(conversion.result)} ${conversion.outputUnit}`,
  ].join('\n'), [
    { label: 'Conversion', value: conversion.label },
    { label: 'Result', value: `${formatNumber(conversion.result)} ${conversion.outputUnit}` },
  ])
}

export async function executeTimeTool(
  slug: TimeToolSlug,
  primaryInput: string,
  secondaryInput: string,
  mode: TimeToolMode,
): Promise<TimeToolResult> {
  try {
    ensureInputLimit(primaryInput, secondaryInput)

    if (slug === 'timezone-converter') {
      return convertTimeZones(primaryInput, secondaryInput)
    }

    if (slug === 'date-difference') {
      return calculateDateDifference(primaryInput, secondaryInput, mode)
    }

    if (slug === 'business-days') {
      return calculateBusinessDays(primaryInput, secondaryInput, mode)
    }

    if (slug === 'timestamp-converter') {
      return convertTimestamp(primaryInput, secondaryInput)
    }

    if (slug === 'age-calculator') {
      return calculateAge(primaryInput, secondaryInput)
    }

    if (slug === 'percentage-calculator') {
      return calculatePercentage(primaryInput, secondaryInput, mode)
    }

    if (slug === 'unit-converter') {
      return convertUnit(primaryInput, mode)
    }

    return fail('Tool not found.')
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Tool execution failed.')
  }
}
