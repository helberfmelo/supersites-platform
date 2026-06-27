import { describe, expect, it } from 'vitest'
import { legalPageCatalog, legalPageSlugs } from '../app/data/legal'
import { localeCodes } from '../app/data/locales'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import { categoryCatalog, filterSites, getSiteBySlug, siteCatalog } from '../app/data/sites'
import { createCatalogOutboundClickEvent } from '../app/utils/analytics'

describe('site catalog', () => {
  it('lists the ten utility sites in launch order', () => {
    expect(siteCatalog).toHaveLength(10)
    expect(siteCatalog.map((site) => site.launchOrder)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('keeps the first build focused on NetProbe Atlas', () => {
    expect(siteCatalog[0]).toMatchObject({
      slug: 'netprobe-atlas',
      status: 'foundation',
    })
  })

  it('documents localized free value and upgrade value for every site', () => {
    for (const site of siteCatalog) {
      expect(site.freeTools.length).toBeGreaterThanOrEqual(3)
      expect(site.paidBenefits.length).toBeGreaterThanOrEqual(3)

      for (const locale of localeCodes) {
        expect(site.localized[locale].headline.length).toBeGreaterThan(24)
        expect(site.localized[locale].summary.length).toBeGreaterThan(48)
        expect(site.localized[locale].freeValue.length).toBeGreaterThan(12)
        expect(site.localized[locale].upgrade.length).toBeGreaterThan(12)
      }
    }
  })

  it('keeps category labels available for every locale', () => {
    for (const category of categoryCatalog) {
      for (const locale of localeCodes) {
        expect(category.labels[locale].length).toBeGreaterThan(2)
      }
    }
  })

  it('generates the catalog prerender routes for home and localized site pages', () => {
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/pt-br')
    expect(contentPrerenderRoutes).toContain('/de/sites/docshift')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + localeCodes.length * (1 + siteCatalog.length + legalPageCatalog.length),
    )
    expect(prerenderRoutes).toEqual([...contentPrerenderRoutes, '/sitemap.xml'])
  })

  it('keeps temporary public URLs under the safe HostGator fallback path', () => {
    for (const site of siteCatalog) {
      expect(site.temporaryUrl).toBe(`${siteBaseUrl}/${site.slug}/`)
    }
  })

  it('filters sites by search and category', () => {
    expect(filterSites('dns', 'all').map((site) => site.slug)).toContain('netprobe-atlas')
    expect(filterSites('', 'documents').map((site) => site.slug)).toEqual(['invoicecraft', 'docshift'])
  })

  it('finds detail pages by slug', () => {
    expect(getSiteBySlug('mailhealth')?.name).toBe('MailHealth')
    expect(getSiteBySlug('missing-site')).toBeNull()
  })

  it('creates a sanitized outbound click event for temporary public URLs', () => {
    const event = createCatalogOutboundClickEvent({
      siteSlug: 'NetProbe Atlas',
      targetUrl: `${siteBaseUrl}/netprobe-atlas/?email=person@example.test#result`,
      locale: 'pt-br',
      routePath: '/pt-br?utm_source=test',
      surface: 'catalog_card',
    })

    expect(event.name).toBe('outbound_site_click')
    expect(event.siteSlug).toBe('netprobe-atlas')
    expect(event.routePath).toBe('/pt-br')
    expect(event.properties.target_url).toBe('/supersites/netprobe-atlas')
  })

  it('documents legal and editorial pages for every locale', () => {
    expect(legalPageCatalog.map((page) => page.slug)).toEqual([...legalPageSlugs])

    for (const page of legalPageCatalog) {
      for (const locale of localeCodes) {
        const localized = page.localized[locale]

        expect(localized.title.length).toBeGreaterThan(5)
        expect(localized.description.length).toBeGreaterThan(60)
        expect(localized.sections).toHaveLength(3)
        expect(localized.sections.every((section) => section.paragraphs.length > 0)).toBe(true)
      }
    }
  })
})
