import type { LocaleCode } from './locales'

export const contentPageSlugs = [
  'about',
  'contact',
  'privacy',
  'cookies',
  'terms',
  'methodology',
  'editorial-policy',
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
  localized: { en: ContentPageCopy } & Partial<Record<LocaleCode, ContentPageCopy>>
}

export const contentPageCatalog: ContentPage[] = [
  {
    slug: 'about',
    localized: {
      en: {
        navLabel: 'About',
        title: 'About NetProbe Atlas',
        description: 'NetProbe Atlas is the SuperSites network diagnostics product, starting with public IP, DNS, domain and SSL checks.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Free diagnostic focus',
            paragraphs: [
              'The basic lookup path is designed to work without mandatory signup. Paid features are reserved for monitoring, history, alerts, reports and API access.',
            ],
          },
          {
            heading: 'Launch order',
            paragraphs: [
              'The public foundation ships before live probes so routing, methodology, legal pages, SEO metadata and smoke checks are in place first.',
            ],
          },
          {
            heading: 'Safety boundary',
            paragraphs: [
              'Network probes are introduced only after input validation, private-range blocking, rate limits, timeouts, cache policy and abuse logging are validated.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'contact',
    localized: {
      en: {
        navLabel: 'Contact',
        title: 'Contact NetProbe Atlas',
        description: 'How to reach the SuperSites operator about NetProbe Atlas feedback, corrections, privacy requests and security reports.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'What to include',
            paragraphs: [
              'Include the page URL, language, observed behavior, expected result and browser or network context when relevant. Do not send passwords, tokens, private documents or sensitive personal data.',
            ],
          },
          {
            heading: 'Security reports',
            paragraphs: [
              'Reports about SSRF, rate-limit bypass, private network access, data leakage or unsafe probe behavior should include enough detail to reproduce without harming third-party systems.',
            ],
          },
          {
            heading: 'Public mailbox status',
            paragraphs: [
              'A monitored public mailbox is required before full launch. Until then, operational feedback remains inside the project owner workflow.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'privacy',
    localized: {
      en: {
        navLabel: 'Privacy',
        title: 'Privacy Policy',
        description: 'NetProbe Atlas minimizes collection, avoids logging sensitive probe input in analytics and starts without accounts, ads or external integrations.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Data minimization',
            paragraphs: [
              'The foundation build does not run live network lookups. Future probe APIs should collect only the input needed to answer the requested diagnostic and protect the service.',
            ],
          },
          {
            heading: 'Analytics boundary',
            paragraphs: [
              'Analytics events may record tool page usage and safe surface names, but must not include full IP addresses, email addresses, tokens, private hostnames, URLs with query strings or raw probe results.',
            ],
          },
          {
            heading: 'Retention',
            paragraphs: [
              'Unauthenticated point-in-time checks should not create user history. Paid monitoring history and exports require clear retention rules before launch.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'cookies',
    localized: {
      en: {
        navLabel: 'Cookies',
        title: 'Cookie Policy',
        description: 'How NetProbe Atlas plans to use essential storage, consent-aware analytics and advertising controls after the launch gates are complete.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Essential storage',
            paragraphs: [
              'Essential cookies or local storage may keep language, consent, session security and basic preferences when those features are active.',
            ],
          },
          {
            heading: 'Analytics and ads',
            paragraphs: [
              'Analytics and advertising storage remain gated behind consent mode and regional rules. No AdSense placement is active in the foundation build.',
            ],
          },
          {
            heading: 'Changing choices',
            paragraphs: [
              'A consent interface must exist before analytics or advertising storage is used. Browser controls can also clear or block cookies.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'terms',
    localized: {
      en: {
        navLabel: 'Terms',
        title: 'Terms of Use',
        description: 'Baseline terms for responsible use of NetProbe Atlas network diagnostics, result limitations and future paid upgrades.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Responsible testing',
            paragraphs: [
              'Do not use NetProbe Atlas to attack systems, scan targets without authorization, bypass limits, disrupt networks or collect data unlawfully.',
            ],
          },
          {
            heading: 'Informational results',
            paragraphs: [
              'Diagnostic results can depend on resolver behavior, registry limits, network conditions, certificate configuration and incomplete inputs. They are practical signals, not legal or security guarantees.',
            ],
          },
          {
            heading: 'Paid features',
            paragraphs: [
              'Paid monitoring and API features are not active in the foundation build. Pricing, quotas, cancellation and provider terms must be visible before checkout launches.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'methodology',
    localized: {
      en: {
        navLabel: 'Methodology',
        title: 'Methodology',
        description: 'How NetProbe Atlas explains IP, DNS, RDAP, SSL and reachability results with safety limits and transparent uncertainty.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Separate measurement from interpretation',
            paragraphs: [
              'Pages should distinguish direct measurements, resolver answers, registry data, certificate facts, cached responses and estimates.',
            ],
          },
          {
            heading: 'Explain failure modes',
            paragraphs: [
              'Timeouts, NXDOMAIN, empty records, registry throttling, blocked ICMP and certificate errors need separate messages so users know what failed.',
            ],
          },
          {
            heading: 'Bounded probes',
            paragraphs: [
              'Network probes require hostname validation, DNS resolution checks, private-range blocking, fixed timeouts, request limits and structured abuse signals.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'editorial-policy',
    localized: {
      en: {
        navLabel: 'Editorial',
        title: 'Editorial Policy',
        description: 'Editorial rules for useful NetProbe Atlas pages, corrections, review dates and avoiding low-value mass network content.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Useful pages',
            paragraphs: [
              'Each tool page should combine a working diagnostic, plain result interpretation, limitations, examples and next steps instead of thin keyword pages.',
            ],
          },
          {
            heading: 'Corrections',
            paragraphs: [
              'Corrections should be prioritized when a page gives misleading security, domain, DNS or certificate guidance.',
            ],
          },
          {
            heading: 'Localization gate',
            paragraphs: [
              'Multilingual pages must be reviewed for meaning and examples before being indexed. That work is scheduled for Sprint 2.5.',
            ],
          },
        ],
      },
    },
  },
]

const contentPageBySlug = new Map(contentPageCatalog.map((page) => [page.slug, page]))

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
  return page.localized[locale] ?? page.localized.en
}
