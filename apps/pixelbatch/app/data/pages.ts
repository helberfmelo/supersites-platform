import { buildTrustPageCopy, sanitizePublicCopy, type LocaleCode, type TrustSupportProfile } from './locales'

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

const trustProfile = {
  siteName: 'PixelBatch',
  publicPath: '/supersites/pixelbatch/',
} satisfies TrustSupportProfile

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
    title: 'About PixelBatch',
    description: 'PixelBatch is the SuperSites product for browser-side image resizing, compression, conversion and metadata cleaning.',
    sections: [
      ['Purpose', 'The site helps users process one image at a time without mandatory signup, upload storage or a product backend.'],
      ['What is live now', 'PixelBatch offers six local image tools with worker planning, Canvas rendering, sitemap, canonical, hreflang and structured data.'],
      ['Account features', 'Account value centers on batch folders, larger files, saved presets, integrations, API, high-resolution queues and AI credits.'],
    ],
  },
  contact: {
    title: 'Contact PixelBatch',
    description: 'How to reach the SuperSites operator about corrections, privacy, accessibility and image-tool feedback.',
    sections: [
      ['Useful reports', 'Include the page URL, language, tool name, browser, file type and observed behavior without attaching private images.'],
      ['No sensitive files', 'Do not send confidential photos, IDs, medical images, contracts, unreleased creative assets or credentials through feedback.'],
      ['Feedback channel', 'A monitored public mailbox is required before independent launch; until then feedback remains in the owner workflow.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'PixelBatch minimizes collection by processing image files locally in the browser whenever possible.',
    sections: [
      ['Data minimization', 'Selected images are decoded, transformed and downloaded in the browser using object URLs and Canvas. No product upload API, server storage, localStorage or sessionStorage is used.'],
      ['Analytics boundary', 'Allowed analytics events may record tool slugs and sanitized page paths, but not file names, dimensions, metadata, image contents, output sizes or user-selected values.'],
      ['Future file handling', 'Server-side batch, API, OCR/AI or high-resolution queues require upload validation, sandboxing, antivirus where applicable, retention, deletion, export and consent rules before launch.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How PixelBatch handles essential storage, consent-aware analytics and advertising controls.',
    sections: [
      ['Essential storage', 'Language, consent and session security may use essential storage when those platform features are enabled. The image tool itself does not need browser storage.'],
      ['Analytics and advertising', 'External analytics and advertising storage require consent mode, regional rules and clear placement controls before use.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local site data.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Baseline terms for responsible use of PixelBatch image tools and future commercial features.',
    sections: [
      ['Responsible images', 'Do not process illegal, abusive, infringing, deceptive or unauthorized image content through PixelBatch workflows.'],
      ['Free-flow limits', 'PixelBatch is a local formatting helper, not a secure archival, forensic metadata or legal redaction system.'],
      ['Paid features', 'Commercial features require visible pricing, quotas, cancellation rules, provider terms, abuse controls and legal review before payment flow or file API access.'],
    ],
  },
  methodology: {
    title: 'Methodology',
    description: 'How PixelBatch keeps image tools useful, local and honest about browser and file-processing limits.',
    sections: [
      ['Working tool first', 'Each tool page must include a functioning free image workflow before it can be treated as launch-ready content.'],
      ['Browser-side processing', 'The tool validates MIME type, file size, dimensions and output settings, then uses Canvas to re-encode the selected image.'],
      ['Abuse guard', 'The free browser flow caps input size, pixel count and output dimensions, avoids mass generation and keeps server-side batch processing separate from the local tool.'],
    ],
  },
  'editorial-policy': {
    title: 'Editorial Policy',
    description: 'Editorial rules for useful PixelBatch pages and avoiding shallow generator content.',
    sections: [
      ['Useful pages', 'Each tool page must include the working image control, file limits, privacy boundary, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when output format support, metadata-removal claims, file limits or privacy promises could mislead users.'],
      ['Localization quality', 'Localized pages must preserve tool behavior, assumptions and commercial boundaries before launch readiness.'],
    ],
  },
  status: {
    title: 'Launch Status',
    description: 'PixelBatch status for public web readiness, advertising, payments and file-processing workflows.',
    sections: [
      ['Free surface', 'The app contains six image tools, five language route sets, sitemap, canonical, hreflang, structured data, worker planning and browser-side Canvas output.'],
      ['Production', 'PixelBatch is live at `/supersites/pixelbatch/` as a versioned HostGator static app with public smoke and rollback workflow validated. Image processing remains browser-side; no upload or storage path is active.'],
      ['Account roadmap', 'Batch folders, larger files, API, integrations, high-resolution queues, AI features, payments, advertising and external analytics require dedicated controls.'],
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
  return buildTrustPageCopy(locale, page.slug, sanitizePublicCopy(locale, page.localized[locale]), trustProfile)
}
