import { describe, expect, it } from 'vitest'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import { categoryLabels, createToolStructuredData, filterTools, getToolBySlug, getToolCopy, toolCatalog, toolSlugs } from '../app/data/tools'
import { createNetProbeToolEvent } from '../app/utils/analytics'

describe('NetProbe Atlas foundation', () => {
  it('lists the planned tool structure in roadmap order', () => {
    expect(toolCatalog.map((tool) => tool.slug)).toEqual([...toolSlugs])
    expect(toolCatalog).toHaveLength(7)
    expect(getToolBySlug('dns-lookup')?.shortName).toBe('DNS lookup')
    expect(getToolBySlug('missing')).toBeNull()
  })

  it('prerenders all Sprint 2.5 public locale routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br')
    expect(contentPrerenderRoutes).toContain('/de/tools/ssl-certificate-checker')
    expect(contentPrerenderRoutes).toContain('/en/tools/dns-lookup')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(1 + publicLocaleCodes.length * (1 + toolCatalog.length + contentPageCatalog.length))
    expect(prerenderRoutes).toEqual([...contentPrerenderRoutes, '/sitemap.xml'])
  })

  it('documents site-scoped legal and methodology pages', () => {
    expect(contentPageCatalog.map((page) => page.slug)).toEqual([...contentPageSlugs])

    for (const page of contentPageCatalog) {
      for (const locale of publicLocaleCodes) {
        const localized = page.localized[locale]
        expect(localized.description.length).toBeGreaterThan(60)
        expect(localized.sections).toHaveLength(3)
      }

      expect(getContentPageBySlug(page.slug)).toBe(page)
    }
  })

  it('keeps multilingual tool content complete for the launch gate', () => {
    for (const tool of toolCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getToolCopy(tool, locale)
        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.contentSections).toHaveLength(5)
        expect(copy.faq).toHaveLength(2)
        expect(copy.freeScope.length).toBeGreaterThan(20)
      }
    }
  })

  it('filters tools without hiding safety status', () => {
    expect(filterTools('ssl', 'all').map((tool) => tool.slug)).toEqual(['ssl-certificate-checker'])
    expect(filterTools('', 'dns').map((tool) => tool.slug)).toEqual(['dns-lookup', 'dns-propagation'])
    expect(filterTools('allowlist', 'reachability', 'pt-br').map((tool) => tool.slug)).toEqual(['port-checker'])
    expect(Object.keys(categoryLabels)).toContain('reachability')
  })

  it('creates tool schema with FAQ and free WebApplication offer', () => {
    const tool = getToolBySlug('dns-lookup')
    expect(tool).not.toBeNull()

    const schema = createToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/dns-lookup`)
    expect(schema).toHaveLength(2)
    expect(schema[0]).toMatchObject({
      '@type': 'WebApplication',
      isAccessibleForFree: true,
      offers: {
        price: '0',
      },
    })
    expect(schema[1]).toMatchObject({
      '@type': 'FAQPage',
    })
  })

  it('creates analytics events without probe inputs or target values', () => {
    const event = createNetProbeToolEvent({
      toolSlug: 'dns-lookup',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/dns-lookup?domain=secret.example`,
    }, 'tool_started')

    expect(event.name).toBe('tool_started')
    expect(event.siteSlug).toBe('netprobe-atlas')
    expect(event.routePath).toBe('/supersites/netprobe-atlas/en/tools/dns-lookup')
    expect(event.properties).toEqual({ tool_slug: 'dns-lookup' })
    expect(JSON.stringify(event)).not.toContain('secret.example')
  })
})
