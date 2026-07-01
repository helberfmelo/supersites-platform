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
  siteName: 'SitePulse Lab',
  publicPath: '/supersites/sitepulse-lab/',
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
    title: 'About SitePulse Lab',
    description: 'SitePulse Lab is the SuperSites product for uptime, web status, redirects, headers and crawlability diagnostics.',
    sections: [
      ['Purpose', 'The site helps operators inspect one public URL before deciding whether recurring uptime and incident workflows are worth paying for.'],
      ['What is live now', 'SitePulse Lab provides a free diagnostic surface plus a bounded control-plane API endpoint for one-shot web probes.'],
      ['Account features', 'Account value centers on uptime, incident timelines, public status pages, alerts, history, multi-region checks and reports.'],
    ],
  },
  contact: {
    title: 'Contact SitePulse Lab',
    description: 'How to reach the SuperSites operator about SitePulse corrections, privacy, abuse controls and accessibility.',
    sections: [
      ['Useful reports', 'Include the page URL, language, tool name, observed behavior, expected result and browser context.'],
      ['No sensitive data', 'Do not send private admin URLs, tokens, customer paths, credentials, headers with secrets or internal hostnames through feedback.'],
      ['Security reports', 'Reports about SSRF, private network access, redirect abuse or rate-limit bypass should include safe reproduction steps.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'SitePulse Lab minimizes collection and keeps analytics free of target URLs and probe results.',
    sections: [
      ['Data minimization', 'URL checks are point-in-time diagnostics. The backend returns transient results and does not create monitoring history for the free check.'],
      ['Analytics boundary', 'Allowed analytics events may record tool slug, locale and sanitized route path, but not URLs, hosts, response headers, redirects or timings.'],
      ['Future accounts', 'Saved monitors, incidents, alert destinations, status pages and reports require retention, export, deletion and consent rules before launch.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How SitePulse Lab handles essential storage, consent-aware analytics and advertising controls.',
    sections: [
      ['Essential storage', 'Language, consent and session security may use essential storage when those features are enabled.'],
      ['Analytics and advertising', 'External analytics and advertising storage require consent mode, regional rules and clear placement controls before use.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local data.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Baseline terms for responsible use of SitePulse checks and future commercial features.',
    sections: [
      ['Responsible diagnostics', 'Do not use SitePulse to attack systems, enumerate third-party infrastructure, bypass rate limits or probe private networks.'],
      ['Informational results', 'Status, redirect, header, robots, sitemap and timing results are operational signals, not guarantees of uptime, ranking or security compliance.'],
      ['Paid features', 'Commercial monitoring requires visible pricing, quotas, cancellation rules, alert controls, abuse response and legal review before checkout.'],
    ],
  },
  methodology: {
    title: 'Methodology',
    description: 'How SitePulse Lab keeps website diagnostics useful, bounded and honest about one-shot limits.',
    sections: [
      ['Working check first', 'Each tool page must include a functioning free check, clear interpretation, example, limits and review date before launch readiness.'],
      ['Bounded network access', 'The probe validates public destinations, blocks private ranges, caps redirects, uses short timeouts and applies a dedicated rate limit.'],
      ['No uptime overclaim', 'A green one-shot result does not prove uptime. Recurring samples, multi-region checks and incident history belong to account workflows.'],
    ],
  },
  'editorial-policy': {
    title: 'Editorial Policy',
    description: 'Editorial rules for useful SitePulse pages and avoiding shallow uptime content.',
    sections: [
      ['Useful pages', 'Each page must include the working check, input assumptions, result interpretation, common failures, remediation hints, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when availability, crawlability, performance, header or privacy guidance could mislead users.'],
      ['Localization quality', 'Localized pages must preserve behavior, safety assumptions and commercial boundaries before launch readiness.'],
    ],
  },
  status: {
    title: 'Public Status',
    description: 'SitePulse Lab status for free website checks and advanced monitoring workflows.',
    sections: [
      ['Free checks', 'SitePulse Lab offers seven point-in-time website checks with bounded probes and readable results without mandatory signup.'],
      ['Probe limits', 'The free pages focus on public status, redirects, headers, robots, sitemap, TTFB and lightweight performance signals.'],
      ['Advanced workflows', 'Recurring uptime, alert delivery, incident workflows, public status pages, history, multi-region probes, payments, advertising and external analytics require separate controls before activation.'],
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
