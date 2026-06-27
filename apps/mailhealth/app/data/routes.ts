import { absoluteUrl as buildAbsoluteUrl } from '@supersites/seo'
import { contentPageCatalog } from './pages'
import {
  localizedContentPath,
  localizedHomePath,
  localizedToolPath,
  publicLocaleCodes,
  toHreflang,
  type LocaleCode,
} from './locales'
import { toolCatalog } from './tools'

export const siteBaseUrl = 'https://opentshost.com/supersites/mailhealth'

export const contentPrerenderRoutes: string[] = [
  '/',
  ...publicLocaleCodes.flatMap((locale) => [
    localizedHomePath(locale),
    ...toolCatalog.map((tool) => localizedToolPath(locale, tool.slug)),
    ...contentPageCatalog.map((page) => localizedContentPath(locale, page.slug)),
  ]),
]

export const prerenderRoutes: string[] = [
  ...contentPrerenderRoutes,
  '/sitemap.xml',
]

export function absoluteUrl(path: string): string {
  return buildAbsoluteUrl(siteBaseUrl, path)
}

export function localeAlternates(pathFactory: (locale: LocaleCode) => string) {
  return [
    {
      rel: 'alternate' as const,
      hreflang: 'x-default',
      href: absoluteUrl(pathFactory('en')),
    },
    ...publicLocaleCodes.map((locale) => ({
      rel: 'alternate' as const,
      hreflang: toHreflang(locale),
      href: absoluteUrl(pathFactory(locale)),
    })),
  ]
}
