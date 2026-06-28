import { absoluteUrl as buildAbsoluteUrl, createSitemapXml } from '@supersites/seo'
import { contentPageCatalog } from './pages'
import { plannerPageCatalog } from './plannerPages'
import { timeToolCatalog } from './tools'
import {
  localizedContentPath,
  localizedHomePath,
  localizedToolPath,
  localizedWorldClockPath,
  publicLocaleCodes,
  toHreflang,
  type LocaleCode,
} from './locales'

export const siteBaseUrl = 'https://opentshost.com/supersites/timenexus'

export const contentPrerenderRoutes = [
  '/',
  ...publicLocaleCodes.flatMap((locale) => [
    localizedHomePath(locale),
    ...timeToolCatalog.map((tool) => localizedToolPath(locale, tool.slug)),
    ...plannerPageCatalog.map((page) => localizedWorldClockPath(locale, page.slug)),
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
