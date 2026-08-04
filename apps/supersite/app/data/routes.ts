import { absoluteUrl as buildAbsoluteUrl, createLocaleAlternates } from '@supersites/seo'
import { legalPageCatalog } from './legal'
import { guideCatalog, guideLocales, localizedGuideIndexPath, localizedGuidePath } from './guides'
import { localeCodes, localizedHomePath, localizedLegalPath, localizedSitePath, type LocaleCode } from './locales'
import { siteCatalog } from './sites'

export const siteBaseUrl = 'https://opentshost.com/supersites'

export const contentPrerenderRoutes: string[] = [
  '/',
  ...guideLocales.flatMap((locale) => [
    localizedGuideIndexPath(locale),
    ...guideCatalog.map((guide) => localizedGuidePath(locale, guide.slug)),
  ]),
  ...localeCodes.flatMap((locale) => [
    localizedHomePath(locale),
    ...siteCatalog.map((site) => localizedSitePath(locale, site.slug)),
    ...legalPageCatalog.map((page) => localizedLegalPath(locale, page.slug)),
  ]),
]

export const prerenderRoutes: string[] = [
  ...contentPrerenderRoutes,
  '/sitemap.xml',
  '/sitemap-hub.xml',
]

export function absoluteUrl(path: string): string {
  return buildAbsoluteUrl(siteBaseUrl, path)
}

export function localeAlternates(pathFactory: (locale: LocaleCode) => string) {
  return createLocaleAlternates({
    baseUrl: siteBaseUrl,
    pathForLocale: pathFactory,
  })
}
