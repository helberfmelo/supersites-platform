import { localeCodes, localizedHomePath, toHreflang, type LocaleCode } from '@supersites/i18n'

export interface LinkDescriptor {
  rel: 'canonical' | 'alternate'
  href: string
  hreflang?: string
}

export interface MetaDescriptor {
  name?: string
  property?: string
  content: string
}

export interface PageMetadataInput {
  title: string
  description: string
  baseUrl: string
  path: string
  type?: 'website' | 'article'
  siteName?: string
}

export interface PageMetadata {
  title: string
  meta: MetaDescriptor[]
  link: LinkDescriptor[]
}

export interface LocaleAlternateInput {
  baseUrl: string
  pathForLocale: (locale: LocaleCode) => string
  xDefaultPath?: string
}

export interface SitemapEntry {
  path: string
  lastmod?: string
}

export const SEO_TITLE_MAX_LENGTH = 70
export const SEO_DESCRIPTION_MAX_LENGTH = 170

export function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/g, '')
}

export function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/'
  }

  return `/${path.replace(/^\/+|\/+$/g, '')}`
}

export function absoluteUrl(baseUrl: string, path: string): string {
  const normalizedPath = normalizePath(path)

  return `${normalizeBaseUrl(baseUrl)}${normalizedPath === '/' ? '' : normalizedPath}`
}

export function createCanonicalLink(baseUrl: string, path: string): LinkDescriptor {
  return {
    rel: 'canonical',
    href: absoluteUrl(baseUrl, path),
  }
}

export function createLocaleAlternates(input: LocaleAlternateInput): LinkDescriptor[] {
  return [
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: absoluteUrl(input.baseUrl, input.xDefaultPath ?? '/'),
    },
    ...localeCodes.map((locale) => ({
      rel: 'alternate' as const,
      hreflang: toHreflang(locale),
      href: absoluteUrl(input.baseUrl, input.pathForLocale(locale)),
    })),
  ]
}

export function limitSeoText(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim()

  if (normalized.length <= maxLength) {
    return normalized
  }

  const brandedSeparator = ' | '
  const brandedSeparatorIndex = normalized.lastIndexOf(brandedSeparator)

  if (brandedSeparatorIndex > 0 && brandedSeparatorIndex + brandedSeparator.length < normalized.length) {
    const prefix = normalized.slice(0, brandedSeparatorIndex).trim()
    const suffix = normalized.slice(brandedSeparatorIndex + brandedSeparator.length).trim()
    const reservedLength = brandedSeparator.length + suffix.length

    if (reservedLength < maxLength) {
      const clippedPrefix = clipSeoTextAtWordBoundary(prefix, maxLength - reservedLength)

      if (clippedPrefix) {
        return `${clippedPrefix}${brandedSeparator}${suffix}`
      }
    }
  }

  return clipSeoTextAtWordBoundary(normalized, maxLength)
}

function clipSeoTextAtWordBoundary(value: string, maxLength: number): string {
  const clipped = value.slice(0, maxLength).trimEnd()
  const wordBoundary = clipped.lastIndexOf(' ')

  if (wordBoundary >= Math.floor(maxLength * 0.72)) {
    return clipped.slice(0, wordBoundary)
  }

  return clipped
}

export function createPageMetadata(input: PageMetadataInput): PageMetadata {
  const type = input.type ?? 'website'
  const siteName = input.siteName ?? 'SuperSites'
  const url = absoluteUrl(input.baseUrl, input.path)
  const title = limitSeoText(input.title, SEO_TITLE_MAX_LENGTH)
  const description = limitSeoText(input.description, SEO_DESCRIPTION_MAX_LENGTH)

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: siteName },
    ],
    link: [createCanonicalLink(input.baseUrl, input.path)],
  }
}

export function createWebSiteJsonLd(baseUrl: string, name: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url: absoluteUrl(baseUrl, localizedHomePath('en')),
  }
}

export function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function createSitemapXml(baseUrl: string, entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ''

      return `  <url><loc>${escapeXml(absoluteUrl(baseUrl, entry.path))}</loc>${lastmod}</url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
}
