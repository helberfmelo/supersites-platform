import { sanitizePublicCopy, type LocaleCode } from './locales'
import {
  formatPlannerZone,
  plannerSourceZones,
  type PlannerZonePreset,
  type PlannerZoneResult,
  zonedLocalDateTimeToUtc,
} from './tools'

export interface CityTimePageSection {
  heading: string
  paragraphs: string[]
}

export interface CityTimelineItem {
  label: string
  localTime: string
  utcTime: string
  note: string
}

export interface CityTimePageCopy {
  eyebrow: string
  navLabel: string
  title: string
  description: string
  updatedLabel: string
  zoneLabel: string
  countryLabel: string
  timelineTitle: string
  overlapTitle: string
  plannerTitle: string
  sections: CityTimePageSection[]
}

export interface CityTimePageDefinition {
  slug: string
  city: string
  country: string
  timeZone: string
  primaryGroup: string
  referenceDate: string
  relatedZones: PlannerZonePreset[]
}

const zoneByName = new Map(plannerSourceZones.map((zone) => [zone.zone, zone]))

function requiredZone(zone: string): PlannerZonePreset {
  const preset = zoneByName.get(zone)
  if (!preset) {
    throw new Error(`Missing curated TimeNexus zone preset: ${zone}`)
  }

  return preset
}

export const cityTimePageCatalog: CityTimePageDefinition[] = [
  {
    slug: 'new-york',
    city: 'New York',
    country: 'United States',
    timeZone: 'America/New_York',
    primaryGroup: 'americas-europe',
    referenceDate: '2026-06-26',
    relatedZones: [
      requiredZone('Europe/London'),
      requiredZone('Europe/Berlin'),
      requiredZone('America/Sao_Paulo'),
    ],
  },
  {
    slug: 'sao-paulo',
    city: 'Sao Paulo',
    country: 'Brazil',
    timeZone: 'America/Sao_Paulo',
    primaryGroup: 'americas-europe',
    referenceDate: '2026-06-26',
    relatedZones: [
      requiredZone('America/New_York'),
      requiredZone('Europe/London'),
      requiredZone('Europe/Berlin'),
    ],
  },
  {
    slug: 'london',
    city: 'London',
    country: 'United Kingdom',
    timeZone: 'Europe/London',
    primaryGroup: 'americas-europe',
    referenceDate: '2026-06-26',
    relatedZones: [
      requiredZone('America/New_York'),
      requiredZone('America/Sao_Paulo'),
      requiredZone('Europe/Berlin'),
    ],
  },
  {
    slug: 'berlin',
    city: 'Berlin',
    country: 'Germany',
    timeZone: 'Europe/Berlin',
    primaryGroup: 'americas-europe',
    referenceDate: '2026-06-26',
    relatedZones: [
      requiredZone('Europe/London'),
      requiredZone('America/New_York'),
      requiredZone('Asia/Tokyo'),
    ],
  },
  {
    slug: 'san-francisco',
    city: 'San Francisco',
    country: 'United States',
    timeZone: 'America/Los_Angeles',
    primaryGroup: 'global-product',
    referenceDate: '2026-06-26',
    relatedZones: [
      requiredZone('America/New_York'),
      requiredZone('Europe/London'),
      requiredZone('Asia/Tokyo'),
    ],
  },
  {
    slug: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    timeZone: 'Asia/Tokyo',
    primaryGroup: 'global-product',
    referenceDate: '2026-06-26',
    relatedZones: [
      requiredZone('America/Los_Angeles'),
      requiredZone('Europe/London'),
      requiredZone('Australia/Sydney'),
    ],
  },
  {
    slug: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    timeZone: 'Asia/Singapore',
    primaryGroup: 'apac-europe',
    referenceDate: '2026-06-26',
    relatedZones: [
      requiredZone('Asia/Tokyo'),
      requiredZone('Australia/Sydney'),
      requiredZone('Europe/Berlin'),
    ],
  },
  {
    slug: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    timeZone: 'Australia/Sydney',
    primaryGroup: 'apac-europe',
    referenceDate: '2026-06-26',
    relatedZones: [
      requiredZone('Asia/Singapore'),
      requiredZone('Asia/Tokyo'),
      requiredZone('Europe/Berlin'),
    ],
  },
]

const cityTimePageBySlug = new Map(cityTimePageCatalog.map((page) => [page.slug, page]))

export function getCityTimePageBySlug(slug: string | undefined): CityTimePageDefinition | null {
  if (!slug) {
    return null
  }

  return cityTimePageBySlug.get(slug) ?? null
}

const localizedCityText: Record<LocaleCode, {
  eyebrow: string
  titleSuffix: string
  descriptionPrefix: string
  descriptionMiddle: string
  descriptionSuffix: string
  updatedLabel: string
  zoneLabel: string
  countryLabel: string
  navSuffix: string
  timelineTitle: string
  overlapTitle: string
  plannerTitle: string
  planningHeading: string
  planningBodyPrefix: string
  planningBodyMiddle: string
  timelineHeading: string
  timelineBody: string
  overlapHeading: string
  overlapBodyPrefix: string
  limitsHeading: string
  limitsBody: string
  timelineLabels: string[]
  timelineNotes: string[]
}> = {
  en: {
    eyebrow: 'City time guide',
    titleSuffix: 'time zone and meeting planner',
    descriptionPrefix: 'Plan meetings from',
    descriptionMiddle: 'with local business-hour context, UTC anchors and related city overlap for',
    descriptionSuffix: 'without saving dates or cities.',
    updatedLabel: 'City guide reviewed',
    zoneLabel: 'IANA time zone',
    countryLabel: 'Country',
    navSuffix: 'time',
    timelineTitle: 'Business-day timeline',
    overlapTitle: '09:00 local overlap',
    plannerTitle: 'Open this city in the planner',
    planningHeading: 'When this city works best',
    planningBodyPrefix: 'Use this page when',
    planningBodyMiddle: 'is the anchor city and the working comparison needs',
    timelineHeading: 'Sample local workday',
    timelineBody: 'The timeline uses a fixed planning date so the page stays deterministic and reviewable. Use the live planner above for current dates.',
    overlapHeading: 'Related city overlap',
    overlapBodyPrefix: 'At 09:00 local time, the same instant is compared with',
    limitsHeading: 'DST and operational limits',
    limitsBody: 'TimeNexus uses the browser Intl time-zone database. Daylight-saving changes, holidays, payroll rules and legal deadlines still need official review before operational use.',
    timelineLabels: ['Pre-work check', 'Workday start', 'Midday handoff', 'Workday close'],
    timelineNotes: ['Prepare async updates.', 'Anchor same-day standups.', 'Review overlap windows.', 'Move late handoffs to async.'],
  },
  'pt-br': {
    eyebrow: 'Guia de horario por cidade',
    titleSuffix: 'fuso horario e planejador de reuniao',
    descriptionPrefix: 'Planeje reunioes a partir de',
    descriptionMiddle: 'com contexto de expediente local, ancora UTC e sobreposicao com cidades relacionadas para',
    descriptionSuffix: 'sem salvar datas ou cidades.',
    updatedLabel: 'Guia de cidade revisado',
    zoneLabel: 'Fuso IANA',
    countryLabel: 'Pais',
    navSuffix: 'horario',
    timelineTitle: 'Linha do expediente',
    overlapTitle: 'Sobreposicao as 09:00 locais',
    plannerTitle: 'Abrir esta cidade no planejador',
    planningHeading: 'Quando esta cidade encaixa melhor',
    planningBodyPrefix: 'Use esta pagina quando',
    planningBodyMiddle: 'e a cidade ancora e a comparacao de trabalho precisa de',
    timelineHeading: 'Exemplo de dia util local',
    timelineBody: 'A linha usa uma data fixa de planejamento para manter a pagina deterministica e revisavel. Use o planejador acima para datas atuais.',
    overlapHeading: 'Sobreposicao com cidades relacionadas',
    overlapBodyPrefix: 'As 09:00 locais, o mesmo instante e comparado com',
    limitsHeading: 'Limites de DST e operacao',
    limitsBody: 'O TimeNexus usa a base Intl de fusos do navegador. Mudancas de horario de verao, feriados, regras trabalhistas e prazos legais ainda precisam revisao oficial antes de uso operacional.',
    timelineLabels: ['Checagem pre-expediente', 'Inicio do expediente', 'Passagem do meio-dia', 'Fim do expediente'],
    timelineNotes: ['Prepare atualizacoes assincronas.', 'Use como ancora de standups.', 'Revise janelas de sobreposicao.', 'Mova passagens tardias para async.'],
  },
  es: {
    eyebrow: 'Guia horario por ciudad',
    titleSuffix: 'zona horaria y planificador de reunion',
    descriptionPrefix: 'Planifica reuniones desde',
    descriptionMiddle: 'con contexto laboral local, ancla UTC y solape con ciudades relacionadas para',
    descriptionSuffix: 'sin guardar fechas ni ciudades.',
    updatedLabel: 'Guia de ciudad revisada',
    zoneLabel: 'Zona IANA',
    countryLabel: 'Pais',
    navSuffix: 'horario',
    timelineTitle: 'Linea del dia laboral',
    overlapTitle: 'Solape a las 09:00 locales',
    plannerTitle: 'Abrir esta ciudad en el planificador',
    planningHeading: 'Cuando esta ciudad encaja mejor',
    planningBodyPrefix: 'Usa esta pagina cuando',
    planningBodyMiddle: 'es la ciudad ancla y la comparacion laboral necesita',
    timelineHeading: 'Ejemplo de jornada local',
    timelineBody: 'La linea usa una fecha fija de planificacion para mantener la pagina determinista y revisable. Usa el planificador superior para fechas actuales.',
    overlapHeading: 'Solape con ciudades relacionadas',
    overlapBodyPrefix: 'A las 09:00 locales, el mismo instante se compara con',
    limitsHeading: 'Limites DST y operativos',
    limitsBody: 'TimeNexus usa la base Intl de zonas horarias del navegador. Cambios DST, festivos, reglas laborales y plazos legales requieren revision oficial antes del uso operativo.',
    timelineLabels: ['Chequeo previo', 'Inicio laboral', 'Traspaso mediodia', 'Cierre laboral'],
    timelineNotes: ['Prepara actualizaciones asincronas.', 'Ancla reuniones de seguimiento.', 'Revisa ventanas de solape.', 'Mueve traspasos tardios a async.'],
  },
  fr: {
    eyebrow: 'Guide horaire par ville',
    titleSuffix: 'fuseau horaire et planificateur de reunion',
    descriptionPrefix: 'Planifiez les reunions depuis',
    descriptionMiddle: 'avec contexte ouvrable local, ancre UTC et chevauchement avec villes liees pour',
    descriptionSuffix: 'sans sauvegarder dates ni villes.',
    updatedLabel: 'Guide ville relu',
    zoneLabel: 'Fuseau IANA',
    countryLabel: 'Pays',
    navSuffix: 'horaire',
    timelineTitle: 'Chronologie ouvrable',
    overlapTitle: 'Chevauchement a 09:00 local',
    plannerTitle: 'Ouvrir cette ville dans le planificateur',
    planningHeading: 'Quand cette ville convient le mieux',
    planningBodyPrefix: 'Utilisez cette page quand',
    planningBodyMiddle: 'est la ville ancre et la comparaison ouvrable doit inclure',
    timelineHeading: 'Jour ouvrable local exemple',
    timelineBody: 'La chronologie utilise une date fixe pour garder la page deterministe et revisable. Utilisez le planificateur ci-dessus pour les dates actuelles.',
    overlapHeading: 'Chevauchement avec villes liees',
    overlapBodyPrefix: 'A 09:00 local, le meme instant est compare avec',
    limitsHeading: 'Limites DST et operationnelles',
    limitsBody: 'TimeNexus utilise la base Intl des fuseaux du navigateur. Changements DST, jours feries, regles paie et delais juridiques exigent une revue officielle avant usage operationnel.',
    timelineLabels: ['Controle avant travail', 'Debut de journee', 'Passage midi', 'Cloture de journee'],
    timelineNotes: ['Preparez les mises a jour async.', 'Ancrez les standups du jour.', 'Revoyez les fenetres de chevauchement.', 'Passez les relais tardifs en async.'],
  },
  de: {
    eyebrow: 'Stadt-Zeitguide',
    titleSuffix: 'Zeitzone und Meeting-Planer',
    descriptionPrefix: 'Planen Sie Meetings ab',
    descriptionMiddle: 'mit lokalem Arbeitszeitkontext, UTC-Anker und Ueberschneidung mit verbundenen Staedten fuer',
    descriptionSuffix: 'ohne Daten oder Staedte zu speichern.',
    updatedLabel: 'Stadtguide geprueft',
    zoneLabel: 'IANA-Zeitzone',
    countryLabel: 'Land',
    navSuffix: 'Zeit',
    timelineTitle: 'Arbeitstag-Timeline',
    overlapTitle: '09:00 lokale Ueberschneidung',
    plannerTitle: 'Diese Stadt im Planer oeffnen',
    planningHeading: 'Wann diese Stadt gut passt',
    planningBodyPrefix: 'Nutzen Sie diese Seite, wenn',
    planningBodyMiddle: 'die Ankerstadt ist und der Arbeitsvergleich diese Staedte braucht',
    timelineHeading: 'Beispiel lokaler Arbeitstag',
    timelineBody: 'Die Timeline nutzt ein fixes Planungsdatum, damit die Seite deterministisch und pruefbar bleibt. Fuer aktuelle Daten nutzen Sie den Planer oben.',
    overlapHeading: 'Ueberschneidung mit verbundenen Staedten',
    overlapBodyPrefix: 'Um 09:00 lokal wird derselbe Zeitpunkt verglichen mit',
    limitsHeading: 'DST- und Betriebsgrenzen',
    limitsBody: 'TimeNexus nutzt die Intl-Zeitzonendatenbank des Browsers. DST-Wechsel, Feiertage, Payroll-Regeln und juristische Fristen brauchen vor operativem Einsatz offizielle Pruefung.',
    timelineLabels: ['Vorarbeits-Check', 'Arbeitsbeginn', 'Mittagsuebergabe', 'Arbeitsende'],
    timelineNotes: ['Asynchrone Updates vorbereiten.', 'Standups am selben Tag verankern.', 'Ueberschneidungen pruefen.', 'Spaete Uebergaben asynchron machen.'],
  },
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

function formatTime(date: Date, timeZone: string, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(localeTag(locale), {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'short',
  }).format(date)
}

function localDateTime(referenceDate: string, hour: number, minute = 0): string {
  return `${referenceDate}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

function currentReferenceDate(): string {
  return new Date().toISOString().slice(0, 10)
}

export function buildCityBusinessTimeline(page: CityTimePageDefinition, locale: LocaleCode): CityTimelineItem[] {
  const text = localizedCityText[locale]
  const referenceDate = currentReferenceDate()
  const steps = [
    { hour: 8, minute: 30 },
    { hour: 9, minute: 0 },
    { hour: 12, minute: 30 },
    { hour: 17, minute: 0 },
  ]

  return steps.map((step, index) => {
    const instant = zonedLocalDateTimeToUtc(localDateTime(referenceDate, step.hour, step.minute), page.timeZone)

    return {
      label: text.timelineLabels[index],
      localTime: formatTime(instant, page.timeZone, locale),
      utcTime: instant.toISOString(),
      note: text.timelineNotes[index],
    }
  })
}

export function buildCityOverlapSnapshot(page: CityTimePageDefinition, locale: LocaleCode): PlannerZoneResult[] {
  const instant = zonedLocalDateTimeToUtc(localDateTime(currentReferenceDate(), 9), page.timeZone)

  return [
    formatPlannerZone(instant, { label: page.city, zone: page.timeZone }, locale),
    ...page.relatedZones.map((zone) => formatPlannerZone(instant, zone, locale)),
  ]
}

export function getCityTimePageCopy(page: CityTimePageDefinition, locale: LocaleCode): CityTimePageCopy {
  const text = localizedCityText[locale]
  const relatedCities = page.relatedZones.map((zone) => zone.label).join(', ')

  return sanitizePublicCopy(locale, {
    eyebrow: text.eyebrow,
    navLabel: `${page.city} ${text.navSuffix}`,
    title: `${page.city} ${text.titleSuffix}`,
    description: `${text.descriptionPrefix} ${page.city} ${text.descriptionMiddle} ${relatedCities} ${text.descriptionSuffix}`,
    updatedLabel: text.updatedLabel,
    zoneLabel: text.zoneLabel,
    countryLabel: text.countryLabel,
    timelineTitle: text.timelineTitle,
    overlapTitle: text.overlapTitle,
    plannerTitle: text.plannerTitle,
    sections: [
      {
        heading: text.planningHeading,
        paragraphs: [`${text.planningBodyPrefix} ${page.city} (${page.timeZone}) ${text.planningBodyMiddle} ${relatedCities}.`],
      },
      {
        heading: text.timelineHeading,
        paragraphs: [text.timelineBody],
      },
      {
        heading: text.overlapHeading,
        paragraphs: [`${text.overlapBodyPrefix}: ${relatedCities}.`],
      },
      {
        heading: text.limitsHeading,
        paragraphs: [text.limitsBody],
      },
    ],
  })
}
