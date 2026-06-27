import { absoluteUrl as buildAbsoluteUrl, createSitemapXml } from '@supersites/seo'
import { contentPageCatalog } from './pages'
import { qrRouteToolCatalog } from './tools'
import {
  localizedContentPath,
  localizedHomePath,
  localizedToolPath,
  publicLocaleCodes,
  toHreflang,
  type LocaleCode,
} from './locales'

export const siteBaseUrl = 'https://opentshost.com/supersites/qrroute'

export const contentPrerenderRoutes = [
  '/',
  ...publicLocaleCodes.flatMap((locale) => [
    localizedHomePath(locale),
    ...qrRouteToolCatalog.map((tool) => localizedToolPath(locale, tool.slug)),
    ...contentPageCatalog.map((page) => localizedContentPath(locale, page.slug)),
  ]),
]

export const prerenderRoutes = [...contentPrerenderRoutes, '/sitemap.xml']

export function absoluteUrl(path: string): string {
  return buildAbsoluteUrl(siteBaseUrl, path)
}

export function localeAlternates(pathBuilder: (locale: LocaleCode) => string) {
  return [
    {
      rel: 'alternate' as const,
      hreflang: 'x-default',
      href: absoluteUrl(pathBuilder('en')),
    },
    ...publicLocaleCodes.map((locale) => ({
      rel: 'alternate' as const,
      hreflang: toHreflang(locale),
      href: absoluteUrl(pathBuilder(locale)),
    })),
  ]
}

export function sitemapXml(): string {
  return createSitemapXml(siteBaseUrl, contentPrerenderRoutes.map((path) => ({ path })))
}
