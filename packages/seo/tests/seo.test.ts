import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  createCanonicalLink,
  createLocaleAlternates,
  createPageMetadata,
  createSitemapXml,
} from '../src'

const baseUrl = 'https://opentshost.com/supersites/'

describe('@supersites/seo', () => {
  it('normalizes base URL and path joins', () => {
    expect(absoluteUrl(baseUrl, '/en/privacy/')).toBe('https://opentshost.com/supersites/en/privacy')
    expect(absoluteUrl(baseUrl, '/')).toBe('https://opentshost.com/supersites')
  })

  it('builds canonical and reciprocal hreflang links', () => {
    expect(createCanonicalLink(baseUrl, '/en')).toEqual({
      rel: 'canonical',
      href: 'https://opentshost.com/supersites/en',
    })

    const alternates = createLocaleAlternates({
      baseUrl,
      pathForLocale: (locale) => `/${locale}/privacy`,
    })

    expect(alternates).toHaveLength(6)
    expect(alternates[0]).toMatchObject({ hreflang: 'x-default' })
    expect(alternates.find((link) => link.hreflang === 'pt-BR')?.href).toBe(
      'https://opentshost.com/supersites/pt-br/privacy',
    )
  })

  it('creates page metadata with Open Graph URL', () => {
    const metadata = createPageMetadata({
      title: 'Privacy Policy | SuperSites',
      description: 'Privacy baseline.',
      baseUrl,
      path: '/en/privacy',
      type: 'article',
    })

    expect(metadata.meta).toContainEqual({ property: 'og:type', content: 'article' })
    expect(metadata.meta).toContainEqual({
      property: 'og:url',
      content: 'https://opentshost.com/supersites/en/privacy',
    })
  })

  it('creates escaped sitemap XML', () => {
    const sitemap = createSitemapXml(baseUrl, [{ path: '/en' }, { path: '/pt-br/privacy', lastmod: '2026-06-26' }])

    expect(sitemap).toContain('<loc>https://opentshost.com/supersites/en</loc>')
    expect(sitemap).toContain('<lastmod>2026-06-26</lastmod>')
  })
})
