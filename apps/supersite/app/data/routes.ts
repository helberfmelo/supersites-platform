import { localeCodes, localizedHomePath, localizedSitePath, type LocaleCode } from './locales'
import { siteCatalog } from './sites'

export const siteBaseUrl = 'https://opentshost.com/supersites'

export const prerenderRoutes: string[] = [
  '/',
  ...localeCodes.flatMap((locale) => [
    localizedHomePath(locale),
    ...siteCatalog.map((site) => localizedSitePath(locale, site.slug)),
  ]),
]

export function absoluteUrl(path: string): string {
  const normalizedPath = path === '/' ? '' : path

  return `${siteBaseUrl}${normalizedPath}`
}

export function localeAlternates(pathFactory: (locale: LocaleCode) => string) {
  return [
    { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl('/') },
    ...localeCodes.map((locale) => ({
      rel: 'alternate',
      hreflang: locale === 'pt-br' ? 'pt-BR' : locale,
      href: absoluteUrl(pathFactory(locale)),
    })),
  ]
}
