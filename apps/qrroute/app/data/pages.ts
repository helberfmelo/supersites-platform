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
    title: 'About QRRoute',
    description: 'QRRoute is the SuperSites product for static QR, barcode, UTM, vCard, Wi-Fi and preview workflows.',
    sections: [
      ['Purpose', 'The site helps users create one-off scannable payloads without mandatory signup, hidden redirects or server-side storage.'],
      ['What is live now', 'Sprint 4.1 launches six local tools covering static QR, Code 128 barcode, UTM links, vCard, Wi-Fi and QR preview inspection.'],
      ['Upgrade boundary', 'Paid value is planned around dynamic QR, short links, analytics, custom domains, batches, teams and API access.'],
    ],
  },
  contact: {
    title: 'Contact QRRoute',
    description: 'How to reach the SuperSites operator about corrections, privacy, accessibility and tool feedback.',
    sections: [
      ['Useful reports', 'Include the page URL, language, tool name, observed behavior, expected result and browser context.'],
      ['No sensitive data', 'Do not send private Wi-Fi passwords, customer contact lists, credentials, access tokens or confidential campaign links through feedback.'],
      ['Public channel gate', 'A monitored public mailbox is required before independent launch; until then feedback remains in the owner workflow.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'QRRoute minimizes collection by generating Sprint 4.1 payloads locally in the browser.',
    sections: [
      ['Data minimization', 'Static QR, barcode, UTM, vCard and Wi-Fi inputs are not sent to a product API, not saved in account history and not written to browser storage.'],
      ['Analytics boundary', 'Allowed analytics events may record tool slugs and page paths, but not URLs, Wi-Fi passwords, contact details, campaign values or generated payloads.'],
      ['Future accounts', 'Dynamic QR, short links, teams, custom domains and analytics require account, retention, export, deletion, abuse handling and consent rules before launch.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How QRRoute plans essential storage, consent-aware analytics and advertising controls after gates.',
    sections: [
      ['Essential storage', 'Language, consent and session security may use essential storage when those features are enabled.'],
      ['Analytics and ads', 'External analytics and advertising storage remain blocked until consent mode, regional rules and placement gates are implemented.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local data.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Baseline terms for responsible use of QRRoute tools and future commercial features.',
    sections: [
      ['Responsible payloads', 'Do not create QR codes, barcodes or links for phishing, malware, impersonation, illegal content or misleading destinations.'],
      ['Static-code risk', 'Static printed codes cannot be edited by QRRoute after distribution; review payloads carefully before production use.'],
      ['Paid features', 'Commercial features require visible pricing, quotas, cancellation rules, provider terms, abuse controls and legal review before checkout.'],
    ],
  },
  methodology: {
    title: 'Methodology',
    description: 'How QRRoute keeps builders useful, local and honest about redirect limits.',
    sections: [
      ['Working builder first', 'Each page must include a functioning free builder or preview before it can be treated as launch-ready content.'],
      ['Client-side rendering', 'Static QR and barcode previews are rendered in the browser from the visible payload so the MVP does not need a redirect service to solve the basic task.'],
      ['Abuse guard', 'URL previews block dangerous schemes, localhost/private destinations, embedded credentials and oversized payloads before rendering.'],
    ],
  },
  'editorial-policy': {
    title: 'Editorial Policy',
    description: 'Editorial rules for useful QRRoute pages and avoiding shallow generator content.',
    sections: [
      ['Useful pages', 'Each tool page must include the working builder, input labels, safety assumptions, limits, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when URL safety, barcode limitations, Wi-Fi disclosure or privacy claims could mislead users.'],
      ['Localization gate', 'Localized pages must preserve tool behavior, assumptions and commercial boundaries before launch readiness.'],
    ],
  },
  status: {
    title: 'Launch Status',
    description: 'QRRoute Sprint 4.1 status for public web readiness, ads, billing, redirect service and gates.',
    sections: [
      ['MVP surface', 'The local/CI MVP contains six tools, five language route sets, sitemap, canonical, hreflang, structured data and browser-side preview rendering.'],
      ['Production', 'No QRRoute public deploy is switched in Sprint 4.1 because app-specific packaging, smoke and rollback are not implemented yet.'],
      ['Gates', 'Dynamic QR, short links, redirect analytics, custom domains, batches, billing, ads and external analytics remain blocked until documented gates pass.'],
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
