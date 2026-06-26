import { describe, expect, it } from 'vitest'
import { localeCodes } from '../app/data/locales'
import { prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import { categoryCatalog, filterSites, getSiteBySlug, siteCatalog } from '../app/data/sites'

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
    expect(prerenderRoutes).toContain('/')
    expect(prerenderRoutes).toContain('/pt-br')
    expect(prerenderRoutes).toContain('/de/sites/docshift')
    expect(prerenderRoutes).toHaveLength(1 + localeCodes.length * (1 + siteCatalog.length))
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
})
