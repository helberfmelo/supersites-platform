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
    title: 'About DocShift',
    description: 'DocShift is the SuperSites product for browser-side PDF and document workflows.',
    sections: [
      ['Purpose', 'The site helps users merge, split, rotate, watermark, number, clean metadata and convert small documents without mandatory signup or upload storage.'],
      ['What is live now', 'DocShift contains eight document tools with worker validation, pdf-lib browser output, sitemap, canonical, hreflang and structured data.'],
      ['Upgrade boundary', 'Paid value is planned around batch folders, larger files, OCR, table extraction, history, API, teams and server-side queues.'],
    ],
  },
  contact: {
    title: 'Contact DocShift',
    description: 'How to reach the SuperSites operator about corrections, privacy, accessibility and document-tool feedback.',
    sections: [
      ['Useful reports', 'Include the page URL, language, tool name, browser, file type and observed behavior without attaching private documents.'],
      ['No sensitive documents', 'Do not send IDs, contracts, medical files, payroll records, unreleased legal drafts or credentials through feedback.'],
      ['Public channel gate', 'A monitored public mailbox is required before independent launch; until then feedback remains in the owner workflow.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'DocShift minimizes collection by processing document files locally in the browser whenever possible.',
    sections: [
      ['Data minimization', 'Selected PDFs and pasted text are processed in browser memory using ArrayBuffers, object URLs and pdf-lib. No product upload API, server storage, localStorage or sessionStorage is used.'],
      ['Analytics boundary', 'Allowed analytics events may record tool slugs and sanitized page paths, but not file names, page text, metadata, page counts, output sizes or user-selected values.'],
      ['Future file handling', 'Server-side batch, OCR, API, history or larger-file queues require upload validation, sandboxing, antivirus where applicable, retention, deletion, export and consent rules before launch.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How DocShift plans essential storage, consent-aware analytics and advertising controls after gates.',
    sections: [
      ['Essential storage', 'Language, consent and session security may use essential storage when those platform features are enabled. The document MVP itself does not need browser storage.'],
      ['Analytics and ads', 'External analytics and advertising storage remain blocked until consent mode, regional rules and placement gates are implemented.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local site data.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Baseline terms for responsible use of DocShift document tools and future commercial features.',
    sections: [
      ['Responsible documents', 'Do not process illegal, abusive, infringing, deceptive, confidential-without-permission or unauthorized document content through DocShift workflows.'],
      ['MVP limits', 'DocShift is a local formatting helper, not a secure archive, legal redaction, compliance or e-discovery system.'],
      ['Paid features', 'Commercial features require visible pricing, quotas, cancellation rules, provider terms, abuse controls and legal review before checkout or file API access.'],
    ],
  },
  methodology: {
    title: 'Methodology',
    description: 'How DocShift keeps document tools useful, local and honest about browser and file-processing limits.',
    sections: [
      ['Working tool first', 'Each tool page must include a functioning free document workflow before it can be treated as launch-ready content.'],
      ['Browser-side processing', 'The MVP validates MIME type, file size, file count, page ranges and text length, then uses pdf-lib in the browser to create the output PDF.'],
      ['Abuse guard', 'The free MVP caps total file size and file count, avoids mass generation and keeps server-side OCR, batch and API processing gated.'],
    ],
  },
  'editorial-policy': {
    title: 'Editorial Policy',
    description: 'Editorial rules for useful DocShift pages and avoiding shallow generator content.',
    sections: [
      ['Useful pages', 'Each tool page must include the working PDF control, file limits, privacy boundary, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when compression, metadata-cleaning, conversion or privacy promises could mislead users.'],
      ['Localization gate', 'Localized pages must preserve tool behavior, assumptions and commercial boundaries before launch readiness.'],
    ],
  },
  status: {
    title: 'Launch Status',
    description: 'DocShift status for public web readiness, ads, billing, file processing and gates.',
    sections: [
      ['MVP surface', 'The local/CI MVP contains eight document tools, five language route sets, sitemap, canonical, hreflang, structured data, worker validation and browser-side pdf-lib output.'],
      ['Production', 'DocShift is live at `/supersites/docshift/` as a versioned HostGator static app with public smoke and rollback workflow validated. Document processing remains browser-side; no upload, OCR server path or storage path is active.'],
      ['Gates', 'Batch folders, larger files, OCR, table extraction, API, history, teams, billing, ads and external analytics remain blocked until documented gates pass.'],
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
