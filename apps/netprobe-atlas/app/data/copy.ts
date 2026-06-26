import type { LocaleCode } from './locales'

export interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
  searchLabel: string
  searchPlaceholder: string
  categoryLabel: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  freeLabel: string
  upgradeLabel: string
  detailCta: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface ShellCopy {
  breadcrumbHome: string
  pageStatusLabel: string
  relatedTitle: string
  plannedTitle: string
  plannedBody: string
  exampleLabel: string
  methodologyLabel: string
}

export const homeCopy: { en: HomeCopy } & Partial<Record<LocaleCode, HomeCopy>> = {
  en: {
    eyebrow: 'NetProbe Atlas',
    title: 'Network facts before assumptions.',
    lead: 'Point-in-time IP, DNS, domain and SSL diagnostics for public troubleshooting, staged behind safety gates before live probes go public.',
    searchLabel: 'Search tools',
    searchPlaceholder: 'Try DNS, SSL, port or RDAP',
    categoryLabel: 'Category',
    allCategories: 'All tools',
    noResultsTitle: 'No matching tools',
    noResultsBody: 'Clear the search or choose a different category.',
    freeLabel: 'Free check',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Launch principles',
    principles: [
      {
        title: 'No mandatory account',
        body: 'The basic lookup should answer the user need before signup, billing or saved history.',
      },
      {
        title: 'Safe public targets',
        body: 'Hostnames are validated and probes are blocked from private, loopback and metadata ranges before live network access.',
      },
      {
        title: 'Transparent limits',
        body: 'Results must name resolver context, cache, timeouts, registry limits and uncertainty.',
      },
    ],
    statusRows: [
      {
        title: 'Foundation build',
        body: 'Routes, metadata, sitemap and tool structure are ready.',
        tone: 'green',
      },
      {
        title: 'Live probes gated',
        body: 'APIs, rate limits and SSRF guards land in the next sprints.',
        tone: 'amber',
      },
      {
        title: 'No ads active',
        body: 'AdSense remains blocked until content and policy gates pass.',
        tone: 'green',
      },
    ],
  },
}

export const shellCopy: { en: ShellCopy } & Partial<Record<LocaleCode, ShellCopy>> = {
  en: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Page status',
    relatedTitle: 'Related pages',
    plannedTitle: 'Probe status',
    plannedBody: 'This foundation build does not run live probes yet.',
    exampleLabel: 'Example',
    methodologyLabel: 'Methodology',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return homeCopy[locale] ?? homeCopy.en
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return shellCopy[locale] ?? shellCopy.en
}
