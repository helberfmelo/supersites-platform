import type { LocaleCode } from './locales'

export const contentPageSlugs = [
  'about',
  'contact',
  'privacy',
  'cookies',
  'terms',
  'methodology',
  'editorial-policy',
  'status',
] as const

export type ContentPageSlug = (typeof contentPageSlugs)[number]

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface ContentPageCopy {
  navLabel: string
  title: string
  description: string
  updatedLabel: string
  sections: ContentSection[]
}

export interface ContentPage {
  slug: ContentPageSlug
  localized: Record<LocaleCode, ContentPageCopy>
}

const labels: Record<LocaleCode, Record<ContentPageSlug, string>> = {
  en: {
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy',
    cookies: 'Cookies',
    terms: 'Terms',
    methodology: 'Methodology',
    'editorial-policy': 'Editorial',
    status: 'Status',
  },
  'pt-br': {
    about: 'Sobre',
    contact: 'Contato',
    privacy: 'Privacidade',
    cookies: 'Cookies',
    terms: 'Termos',
    methodology: 'Metodologia',
    'editorial-policy': 'Editorial',
    status: 'Status',
  },
  es: {
    about: 'Acerca de',
    contact: 'Contacto',
    privacy: 'Privacidad',
    cookies: 'Cookies',
    terms: 'Terminos',
    methodology: 'Metodologia',
    'editorial-policy': 'Editorial',
    status: 'Estado',
  },
  fr: {
    about: 'A propos',
    contact: 'Contact',
    privacy: 'Confidentialite',
    cookies: 'Cookies',
    terms: 'Conditions',
    methodology: 'Methodologie',
    'editorial-policy': 'Editorial',
    status: 'Statut',
  },
  de: {
    about: 'Ueber',
    contact: 'Kontakt',
    privacy: 'Datenschutz',
    cookies: 'Cookies',
    terms: 'Bedingungen',
    methodology: 'Methodik',
    'editorial-policy': 'Redaktion',
    status: 'Status',
  },
}

const reviewed: Record<LocaleCode, string> = {
  en: 'Reviewed June 26, 2026',
  'pt-br': 'Revisado em 26 de junho de 2026',
  es: 'Revisado el 26 de junio de 2026',
  fr: 'Revise le 26 juin 2026',
  de: 'Geprueft am 26. Juni 2026',
}

const languageName: Record<LocaleCode, string> = {
  en: 'English',
  'pt-br': 'portugues',
  es: 'espanol',
  fr: 'francais',
  de: 'Deutsch',
}

const pageSpecs: Record<ContentPageSlug, {
  title: string
  description: string
  sections: Array<[string, string]>
}> = {
  about: {
    title: 'About TimeNexus',
    description: 'TimeNexus is the SuperSites product for browser-side time, date, percentage and unit helpers.',
    sections: [
      ['Purpose', 'The site helps users answer everyday time, calendar and conversion questions without mandatory signup or server-side product storage.'],
      ['What is live now', 'The browser MVP includes seven local tools covering time zones, date difference, business days, timestamp, age, percentage and units.'],
      ['Upgrade boundary', 'Paid value is planned around widgets, API access, presets, private history, collaboration and no ads.'],
    ],
  },
  contact: {
    title: 'Contact TimeNexus',
    description: 'How to reach the SuperSites operator about corrections, privacy, accessibility and tool feedback.',
    sections: [
      ['Useful reports', 'Include the page URL, language, tool name, observed behavior, expected result and browser context.'],
      ['No sensitive data', 'Do not send private calendars, customer data, identity documents, access tokens or confidential schedules through feedback.'],
      ['Public channel gate', 'A monitored public mailbox is required before independent launch; until then feedback remains in the owner workflow.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'TimeNexus minimizes collection by processing free tool inputs locally in the browser.',
    sections: [
      ['Data minimization', 'Tool inputs and results are not sent to a product API, not stored in account history and not written to browser storage in this MVP.'],
      ['Analytics boundary', 'Allowed analytics events may record tool slugs and page paths, but not dates, zones, ages, percentages, units or generated results.'],
      ['Future accounts', 'Widgets, presets, history and API access require account, retention, export, deletion and consent rules before launch.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How TimeNexus plans essential storage, consent-aware analytics and advertising controls after gates.',
    sections: [
      ['Essential storage', 'Language, consent and session security may use essential storage when those features are enabled.'],
      ['Analytics and ads', 'External analytics and advertising storage remain blocked until consent mode and regional rules are implemented.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local data.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Baseline terms for responsible use of TimeNexus tools and future commercial features.',
    sections: [
      ['Planning assistance', 'Tool outputs are planning aids and not legal, payroll, tax, medical, compliance or production approval.'],
      ['Responsible use', 'Do not use the service to mislead users, process data you are not allowed to handle or make irreversible decisions without review.'],
      ['Paid features', 'Commercial features require visible pricing, quotas, cancellation rules and provider terms before checkout.'],
    ],
  },
  methodology: {
    title: 'Methodology',
    description: 'How TimeNexus keeps tools useful, local and honest about limits.',
    sections: [
      ['Working tool first', 'Each page must include a functioning free calculator or converter before it can be treated as launch-ready content.'],
      ['Client-side processing', 'Date math and conversions run client-side and use a Web Worker when supported so the UI remains responsive.'],
      ['Limit disclosure', 'Time zones, calendars and unit conversions can depend on business rules, local holidays and domain-specific definitions that must be reviewed.'],
    ],
  },
  'editorial-policy': {
    title: 'Editorial Policy',
    description: 'Editorial rules for useful TimeNexus pages and avoiding shallow conversion content.',
    sections: [
      ['Useful pages', 'Each tool page must include the working utility, input labels, assumptions, limits, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when date math, timezone explanation, locale wording or privacy claims could mislead users.'],
      ['Localization gate', 'Localized pages must preserve tool behavior, assumptions and commercial boundaries before launch readiness.'],
    ],
  },
  status: {
    title: 'Launch Status',
    description: 'TimeNexus status for public web readiness, ads, billing, deploy and gates.',
    sections: [
      ['MVP surface', 'The local/CI MVP contains seven tools, five language route sets, sitemap, canonical, hreflang and structured data.'],
      ['Production', 'No TimeNexus public deploy is switched because app-specific packaging, smoke and rollback gates are not implemented yet.'],
      ['Gates', 'AdSense, billing, external analytics, accounts, widgets, presets, history and API remain blocked until documented gates pass.'],
    ],
  },
}

function copy(locale: LocaleCode, slug: ContentPageSlug): ContentPageCopy {
  const spec = pageSpecs[slug]

  return {
    navLabel: labels[locale][slug],
    title: spec.title,
    description: `${spec.description} (${languageName[locale]} route).`,
    updatedLabel: reviewed[locale],
    sections: spec.sections.map(([heading, paragraph]) => ({ heading, paragraphs: [paragraph] })),
  }
}

export const contentPageCatalog: ContentPage[] = contentPageSlugs.map((slug) => ({
  slug,
  localized: {
    en: copy('en', slug),
    'pt-br': copy('pt-br', slug),
    es: copy('es', slug),
    fr: copy('fr', slug),
    de: copy('de', slug),
  },
}))

const contentPageBySlug = new Map(contentPageCatalog.map((candidate) => [candidate.slug, candidate]))

export function isContentPageSlug(value: string | undefined): value is ContentPageSlug {
  return contentPageSlugs.includes(value as ContentPageSlug)
}

export function getContentPageBySlug(value: string | undefined): ContentPage | null {
  if (!isContentPageSlug(value)) {
    return null
  }

  return contentPageBySlug.get(value) ?? null
}

export function getContentPageCopy(page: ContentPage, locale: LocaleCode): ContentPageCopy {
  return page.localized[locale]
}
