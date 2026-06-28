import { sanitizePublicCopy, type LocaleCode } from './locales'

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
    title: 'About MailHealth',
    description: 'MailHealth is the SuperSites product for email authentication, deliverability and transport diagnostics.',
    sections: [
      ['Purpose', 'The site helps domain owners inspect SPF, DKIM, DMARC, MX, DNSBL reputation, SMTP reachability and message headers without mandatory signup.'],
      ['What is live now', 'MailHealth provides a free diagnostic surface plus bounded control-plane API endpoints for DNS, DNSBL and SMTP checks.'],
      ['Upgrade boundary', 'Paid value is planned around monitoring, alerts, DMARC reports, batches, API access, white-label exports and team workflows.'],
    ],
  },
  contact: {
    title: 'Contact MailHealth',
    description: 'How to reach the SuperSites operator about MailHealth corrections, privacy, abuse controls and accessibility.',
    sections: [
      ['Useful reports', 'Include the page URL, language, tool name, observed behavior, expected result and browser context.'],
      ['No sensitive data', 'Do not send mailbox passwords, raw private headers, message contents, API keys, customer lists or confidential campaign data through feedback.'],
      ['Security reports', 'Reports about SSRF, rate-limit bypass, private network access or SMTP abuse should include enough detail to reproduce without harming third-party systems.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'MailHealth minimizes collection and keeps analytics free of domains, headers and probe results.',
    sections: [
      ['Data minimization', 'Domain checks are point-in-time diagnostics. Header analysis runs in the browser and pasted headers are not sent to a product API.'],
      ['Analytics boundary', 'Allowed analytics events may record tool slug, locale and sanitized route path, but not domains, mail hosts, selectors, headers, message IDs or results.'],
      ['Future accounts', 'Monitoring history, DMARC reports, saved domains, alerts and API usage require retention, export, deletion and consent rules before launch.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How MailHealth plans essential storage, consent-aware analytics and advertising controls after launch gates.',
    sections: [
      ['Essential storage', 'Language, consent and session security may use essential storage when those features are enabled.'],
      ['Analytics and ads', 'External analytics and advertising storage remain blocked until consent mode, regional rules and placement gates are implemented.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local data.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Baseline terms for responsible use of MailHealth checks and future commercial features.',
    sections: [
      ['Responsible diagnostics', 'Do not use MailHealth to attack systems, enumerate third-party infrastructure, bypass rate limits, harvest addresses or disrupt mail servers.'],
      ['Informational results', 'DNS, DNSBL, SMTP and header results are operational signals, not guarantees of inbox placement, legal compliance or provider acceptance.'],
      ['Paid features', 'Commercial features require visible pricing, quotas, cancellation rules, provider terms, abuse controls and legal review before checkout or external delivery.'],
    ],
  },
  methodology: {
    title: 'Methodology',
    description: 'How MailHealth keeps email diagnostics useful, bounded and honest about deliverability limits.',
    sections: [
      ['Working check first', 'Each tool page must include a functioning free check, clear interpretation, example, limits and review date before launch readiness.'],
      ['Bounded network access', 'DNS, DNSBL and SMTP checks validate hostnames, block private ranges, use short timeouts, cache responses and apply a dedicated rate limit.'],
      ['No deliverability overclaim', 'A green diagnostic does not guarantee inbox placement because sender reputation, content, engagement and provider-specific rules also matter.'],
    ],
  },
  'editorial-policy': {
    title: 'Editorial Policy',
    description: 'Editorial rules for useful MailHealth pages and avoiding shallow deliverability content.',
    sections: [
      ['Useful pages', 'Each page must include the working check, input assumptions, result interpretation, common failures, remediation hints, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when SPF, DKIM, DMARC, MX, SMTP, blacklist or privacy guidance could mislead users.'],
      ['Localization gate', 'Localized pages must preserve behavior, safety assumptions and commercial boundaries before launch readiness.'],
    ],
  },
  status: {
    title: 'Launch Status',
    description: 'MailHealth status for public web readiness, API probes, ads, billing and monitoring gates.',
    sections: [
      ['MVP surface', 'The local/CI MVP contains seven checks, five language route sets, sitemap, canonical, hreflang, structured data and bounded API probes.'],
      ['Production', 'MailHealth is live at `/supersites/mailhealth/` as a versioned HostGator static app with public smoke, bounded public API probes and rollback workflow validated.'],
      ['Gates', 'Recurring monitoring, alert delivery, DMARC report ingestion, batches, white-label, billing, ads and external analytics remain blocked until documented gates pass.'],
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
  return sanitizePublicCopy(locale, page.localized[locale])
}
