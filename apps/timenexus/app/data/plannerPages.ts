import { sanitizePublicCopy, type LocaleCode } from './locales'
import { plannerZoneGroups, type PlannerZoneGroup } from './tools'

export interface PlannerPageSection {
  heading: string
  paragraphs: string[]
}

export interface PlannerPageCopy {
  eyebrow: string
  navLabel: string
  title: string
  description: string
  updatedLabel: string
  sections: PlannerPageSection[]
}

export interface PlannerPageDefinition {
  slug: string
  group: PlannerZoneGroup
}

const localizedPageText: Record<LocaleCode, {
  eyebrow: string
  titlePrefix: string
  descriptionPrefix: string
  descriptionSuffix: string
  updatedLabel: string
  howHeading: string
  howBody: string
  coverageHeading: string
  coverageBodyPrefix: string
  limitsHeading: string
  limitsBody: string
}> = {
  en: {
    eyebrow: 'World clock',
    titlePrefix: 'World clock for',
    descriptionPrefix: 'Compare meeting times across',
    descriptionSuffix: 'with a browser-side planner, UTC instant and business-hour fit.',
    updatedLabel: 'Comparison reviewed',
    howHeading: 'How to use this city comparison',
    howBody: 'Choose the local meeting time, source city and duration. TimeNexus converts that instant to UTC and then renders each city in the selected group with early, business-hours or late status.',
    coverageHeading: 'Cities and IANA zones covered',
    coverageBodyPrefix: 'This curated page covers',
    limitsHeading: 'DST and calendar limits',
    limitsBody: 'The calculation uses the browser Intl time-zone database. Daylight-saving changes, local holidays, payroll rules and legal deadlines still require official review before operational use.',
  },
  'pt-br': {
    eyebrow: 'Relogio mundial',
    titlePrefix: 'Relogio mundial para',
    descriptionPrefix: 'Compare horarios de reuniao em',
    descriptionSuffix: 'com planejador no navegador, instante UTC e aderencia ao expediente.',
    updatedLabel: 'Comparacao revisada',
    howHeading: 'Como usar esta comparacao de cidades',
    howBody: 'Escolha horario local, cidade de origem e duracao. O TimeNexus converte o instante para UTC e mostra cada cidade do grupo com status cedo, expediente ou tarde.',
    coverageHeading: 'Cidades e fusos IANA cobertos',
    coverageBodyPrefix: 'Esta pagina curada cobre',
    limitsHeading: 'Limites de DST e calendario',
    limitsBody: 'O calculo usa a base Intl de fusos do navegador. Mudancas de horario de verao, feriados locais, regras trabalhistas e prazos legais ainda exigem revisao oficial antes de uso operacional.',
  },
  es: {
    eyebrow: 'Reloj mundial',
    titlePrefix: 'Reloj mundial para',
    descriptionPrefix: 'Compara horarios de reunion en',
    descriptionSuffix: 'con planificador en navegador, instante UTC y encaje laboral.',
    updatedLabel: 'Comparacion revisada',
    howHeading: 'Como usar esta comparacion de ciudades',
    howBody: 'Elige hora local, ciudad origen y duracion. TimeNexus convierte ese instante a UTC y muestra cada ciudad del grupo con estado temprano, laboral o tarde.',
    coverageHeading: 'Ciudades y zonas IANA cubiertas',
    coverageBodyPrefix: 'Esta pagina curada cubre',
    limitsHeading: 'Limites de DST y calendario',
    limitsBody: 'El calculo usa la base Intl de zonas horarias del navegador. Cambios de horario de verano, festivos locales, reglas laborales y plazos legales requieren revision oficial antes de uso operativo.',
  },
  fr: {
    eyebrow: 'Horloge mondiale',
    titlePrefix: 'Horloge mondiale pour',
    descriptionPrefix: 'Comparez les heures de reunion dans',
    descriptionSuffix: 'avec planificateur navigateur, instant UTC et compatibilite ouvrable.',
    updatedLabel: 'Comparaison revue',
    howHeading: 'Comment utiliser cette comparaison de villes',
    howBody: 'Choisissez heure locale, ville source et duree. TimeNexus convertit cet instant en UTC puis affiche chaque ville du groupe avec statut tot, heures ouvrables ou tard.',
    coverageHeading: 'Villes et fuseaux IANA couverts',
    coverageBodyPrefix: 'Cette page selectionnee couvre',
    limitsHeading: 'Limites DST et calendrier',
    limitsBody: 'Le calcul utilise la base Intl des fuseaux du navigateur. Changements DST, jours feries locaux, regles paie et delais juridiques demandent encore une revue officielle avant usage operationnel.',
  },
  de: {
    eyebrow: 'Weltuhr',
    titlePrefix: 'Weltuhr fuer',
    descriptionPrefix: 'Vergleichen Sie Meetingzeiten in',
    descriptionSuffix: 'mit Browser-Planer, UTC-Zeitpunkt und Arbeitszeit-Fit.',
    updatedLabel: 'Vergleich geprueft',
    howHeading: 'So nutzen Sie diesen Staedtevergleich',
    howBody: 'Waehlen Sie lokale Meetingzeit, Quellstadt und Dauer. TimeNexus konvertiert den Zeitpunkt nach UTC und zeigt jede Stadt der Gruppe mit Status frueh, Arbeitszeit oder spaet.',
    coverageHeading: 'Abgedeckte Staedte und IANA-Zonen',
    coverageBodyPrefix: 'Diese kuratierte Seite deckt ab',
    limitsHeading: 'DST- und Kalendergrenzen',
    limitsBody: 'Die Berechnung nutzt die Intl-Zeitzonendatenbank des Browsers. Sommerzeitwechsel, lokale Feiertage, Payroll-Regeln und juristische Fristen brauchen vor operativem Einsatz weiter offizielle Pruefung.',
  },
}

export const plannerPageCatalog: PlannerPageDefinition[] = plannerZoneGroups.map((group) => ({
  slug: group.value,
  group,
}))

const plannerPageBySlug = new Map(plannerPageCatalog.map((page) => [page.slug, page]))

export function getPlannerPageBySlug(slug: string | undefined): PlannerPageDefinition | null {
  if (!slug) {
    return null
  }

  return plannerPageBySlug.get(slug) ?? null
}

export function getPlannerPageCopy(page: PlannerPageDefinition, locale: LocaleCode): PlannerPageCopy {
  const text = localizedPageText[locale]
  const groupLabel = page.group.label[locale]
  const zonesList = page.group.zones.map((zone) => `${zone.label} (${zone.zone})`).join(', ')

  return sanitizePublicCopy(locale, {
    eyebrow: text.eyebrow,
    navLabel: groupLabel,
    title: `${text.titlePrefix} ${groupLabel}`,
    description: `${text.descriptionPrefix} ${groupLabel} ${text.descriptionSuffix}`,
    updatedLabel: text.updatedLabel,
    sections: [
      {
        heading: text.howHeading,
        paragraphs: [text.howBody],
      },
      {
        heading: text.coverageHeading,
        paragraphs: [`${text.coverageBodyPrefix}: ${zonesList}.`],
      },
      {
        heading: text.limitsHeading,
        paragraphs: [text.limitsBody],
      },
    ],
  })
}
