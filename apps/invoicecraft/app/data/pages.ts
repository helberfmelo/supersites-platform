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
  en: 'Reviewed June 27, 2026',
  'pt-br': 'Revisado em 27 de junho de 2026',
  es: 'Revisado el 27 de junio de 2026',
  fr: 'Revise le 27 juin 2026',
  de: 'Geprueft am 27. Juni 2026',
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
    title: 'About InvoiceCraft',
    description: 'InvoiceCraft is the SuperSites product for one-off invoices, quotes and receipts with local PDF export.',
    sections: [
      ['Purpose', 'The site helps users draft a single business document, calculate itemized totals and download a PDF without mandatory signup.'],
      ['What is live now', 'Invoice, quote and receipt builders keep fields in the browser session and generate local PDFs.'],
      ['Upgrade boundary', 'Paid value is planned around saved clients, product catalogs, recurrence, branding, team workflows, payments and history.'],
    ],
  },
  contact: {
    title: 'Contact InvoiceCraft',
    description: 'How to reach the SuperSites operator about corrections, privacy, accessibility and tool feedback.',
    sections: [
      ['Useful reports', 'Include the page URL, language, tool name, observed behavior, expected result and browser context.'],
      ['No sensitive data', 'Do not send client records, tax identifiers, bank details, payment card data, credentials or confidential contract terms through feedback.'],
      ['Public channel gate', 'A monitored public mailbox is required before independent launch; until then feedback remains in the owner workflow.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'InvoiceCraft minimizes collection by generating document previews and PDFs locally in the browser.',
    sections: [
      ['Data minimization', 'Issuer, client, item, tax/adjustment, notes and amount fields are not sent to a product API, not saved in account history and not written to browser storage.'],
      ['Analytics boundary', 'Allowed analytics events may record tool slugs and page paths, but not names, addresses, invoice numbers, line items, amounts, tax labels or generated PDF contents.'],
      ['Future accounts', 'Saved clients, products, branding, team history, payment integrations and recurring invoices require retention, export, deletion, abuse and consent rules before launch.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How InvoiceCraft plans essential storage, consent-aware analytics and advertising controls after gates.',
    sections: [
      ['Essential storage', 'Language, consent and session security may use essential storage when those features are enabled.'],
      ['Analytics and ads', 'External analytics and advertising storage remain blocked until consent mode, regional rules and placement gates are implemented.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local data.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Baseline terms for responsible use of InvoiceCraft tools and future commercial features.',
    sections: [
      ['Responsible documents', 'Do not create misleading, fraudulent, impersonating, illegal or unauthorized billing documents.'],
      ['Fiscal limits', 'InvoiceCraft is a formatting and calculation helper, not jurisdiction-specific tax, legal, accounting or payment advice.'],
      ['Paid features', 'Commercial features require visible pricing, quotas, cancellation rules, provider terms, abuse controls and legal review before checkout or payment collection.'],
    ],
  },
  methodology: {
    title: 'Methodology',
    description: 'How InvoiceCraft keeps document builders useful, local and honest about fiscal and payment limits.',
    sections: [
      ['Working builder first', 'Each page must include a functioning free document builder and preview before it can be treated as launch-ready content.'],
      ['Client-side rendering', 'Totals, item rows and PDF downloads are generated in the browser from visible fields so the MVP does not need account storage to solve the basic task.'],
      ['Abuse guard', 'The free MVP limits document size, line count and numeric ranges, and avoids payment collection or official tax claims.'],
    ],
  },
  'editorial-policy': {
    title: 'Editorial Policy',
    description: 'Editorial rules for useful InvoiceCraft pages and avoiding shallow generator content.',
    sections: [
      ['Useful pages', 'Each tool page must include the working builder, input labels, safety assumptions, limits, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when PDF output, total calculations, tax/payment boundaries or privacy claims could mislead users.'],
      ['Localization gate', 'Localized pages must preserve tool behavior, assumptions and commercial boundaries before launch readiness.'],
    ],
  },
  status: {
    title: 'Launch Status',
    description: 'InvoiceCraft status for public web readiness, ads, billing, PDF rendering and gates.',
    sections: [
      ['MVP surface', 'The local/CI MVP contains three document builders, five language route sets, sitemap, canonical, hreflang, structured data and browser-side PDF rendering.'],
      ['Production', 'No InvoiceCraft public deploy is switched because app-specific packaging, smoke and rollback are not implemented yet.'],
      ['Gates', 'Saved clients, products, recurrence, branding, team access, payments, billing, ads and external analytics remain blocked until documented gates pass.'],
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
