import type { HomeCopy } from './copy'
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
      name: copy.featuredToolsTitle,
      itemListElement: copy.featuredTools.map((item, index) => {
        const site = siteCatalog.find((candidate) => candidate.slug === item.siteSlug)

        return listItem(
          index + 1,
          item.label,
          absoluteUrl(localizedSitePath(locale, item.siteSlug)),
          site?.localized[locale].headline ?? item.body,
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
