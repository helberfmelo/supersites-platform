import type { HomeCopy } from './copy'
import type { Guide, GuideLocale, LocalizedGuide } from './guides'
import { localizedGuideIndexPath, localizedGuidePath } from './guides'
import type { LegalPage, LocalizedLegalPage } from './legal'
import type { LocaleCode } from './locales'
import { localizedHomePath, localizedLegalPath, localizedSitePath, toHreflang } from './locales'
import { absoluteUrl, siteBaseUrl } from './routes'
import { getCategoryLabel, siteCatalog, type SiteSummary } from './sites'

function baseNode(type: string, url: string, name: string, description: string, locale: LocaleCode) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    inLanguage: toHreflang(locale),
  }
}

function listItem(position: number, name: string, url: string, description: string) {
  return {
    '@type': 'ListItem',
    position,
    name,
    url,
    description,
  }
}

export function createHubHomeStructuredData(locale: LocaleCode, copy: HomeCopy): Record<string, unknown>[] {
  const url = absoluteUrl(localizedHomePath(locale))

  return [
    {
      ...baseNode('WebSite', url, 'SuperSites Hub', copy.lead, locale),
      publisher: {
        '@type': 'Organization',
        name: 'SuperSites',
        url: siteBaseUrl,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${url}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      ...baseNode('CollectionPage', url, copy.title, copy.lead, locale),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: siteCatalog.length,
        itemListElement: siteCatalog.map((site, index) => listItem(
          index + 1,
          site.name,
          absoluteUrl(localizedSitePath(locale, site.slug)),
          site.localized[locale].headline,
        )),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: copy.popularToolsTitle,
      itemListElement: copy.popularTools.map((item, index) => {
        const site = siteCatalog.find((candidate) => candidate.slug === item.siteSlug)

        return listItem(
          index + 1,
          item.label,
          site ? `${site.temporaryUrl}${locale}${item.path}` : absoluteUrl(localizedSitePath(locale, item.siteSlug)),
          item.body,
        )
      }),
    },
  ]
}

export function createSiteDetailStructuredData(
  locale: LocaleCode,
  site: SiteSummary,
): Record<string, unknown>[] {
  const url = absoluteUrl(localizedSitePath(locale, site.slug))
  const text = site.localized[locale]

  return [
    {
      ...baseNode('WebApplication', url, site.name, text.summary, locale),
      applicationCategory: getCategoryLabel(site.category, locale),
      operatingSystem: 'Web browser',
      featureList: site.freeTools,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: text.freeValue,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${site.name} tool tracks`,
      itemListElement: site.freeTools.map((tool, index) => listItem(
        index + 1,
        tool,
        url,
        text.freeValue,
      )),
    },
  ]
}

export function createLegalPageStructuredData(
  locale: LocaleCode,
  page: LegalPage,
  copy: LocalizedLegalPage,
): Record<string, unknown>[] {
  const url = absoluteUrl(localizedLegalPath(locale, page.slug))
  const typeBySlug: Partial<Record<LegalPage['slug'], string>> = {
    about: 'AboutPage',
    contact: 'ContactPage',
    privacy: 'PrivacyPolicy',
    terms: 'TermsOfService',
  }

  return [
    {
      ...baseNode(typeBySlug[page.slug] ?? 'WebPage', url, copy.title, copy.description, locale),
      isPartOf: {
        '@type': 'WebSite',
        name: 'SuperSites Hub',
        url: absoluteUrl(localizedHomePath(locale)),
      },
      dateModified: '2026-06-28',
    },
  ]
}

export function createGuideLandingStructuredData(locale: GuideLocale, title: string, description: string) {
  const url = absoluteUrl(localizedGuideIndexPath(locale))

  return [
    {
      ...baseNode('CollectionPage', url, title, description, locale),
      isPartOf: {
        '@type': 'WebSite',
        name: 'SuperSites Hub',
        url: absoluteUrl(localizedHomePath(locale)),
      },
    },
  ]
}

export function createGuideStructuredData(
  locale: GuideLocale,
  guide: Guide,
  copy: LocalizedGuide,
): Record<string, unknown>[] {
  const url = absoluteUrl(localizedGuidePath(locale, guide.slug))
  const homeUrl = absoluteUrl(localizedHomePath(locale))
  const guidesUrl = absoluteUrl(localizedGuideIndexPath(locale))

  return [
    {
      ...baseNode('Article', url, copy.title, copy.description, locale),
      headline: copy.title,
      datePublished: '2026-08-04',
      dateModified: guide.reviewedAt,
      author: {
        '@type': 'Organization',
        name: 'SuperSites Editorial',
        url: homeUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'SuperSites',
        url: siteBaseUrl,
      },
      mainEntityOfPage: url,
      citation: copy.sources.map((source) => source.href),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SuperSites', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: locale === 'pt-br' ? 'Guias' : 'Guides', item: guidesUrl },
        { '@type': 'ListItem', position: 3, name: copy.title, item: url },
      ],
    },
  ]
}
