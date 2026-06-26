import { describe, expect, it } from 'vitest'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import { categoryLabels, filterTools, getToolBySlug, toolCatalog, toolSlugs } from '../app/data/tools'
import { createNetProbeToolEvent } from '../app/utils/analytics'

describe('NetProbe Atlas foundation', () => {
  it('lists the planned tool structure in roadmap order', () => {
    expect(toolCatalog.map((tool) => tool.slug)).toEqual([...toolSlugs])
    expect(toolCatalog).toHaveLength(7)
    expect(getToolBySlug('dns-lookup')?.shortName).toBe('DNS lookup')
    expect(getToolBySlug('missing')).toBeNull()
  })

  it('keeps public foundation routes English-only until Sprint 2.5 localization', () => {
    expect(publicLocaleCodes).toEqual(['en'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/en/tools/dns-lookup')
    expect(contentPrerenderRoutes).toContain('/en/privacy')
    expect(contentPrerenderRoutes).not.toContain('/pt-br')
    expect(contentPrerenderRoutes).toHaveLength(1 + publicLocaleCodes.length * (1 + toolCatalog.length + contentPageCatalog.length))
    expect(prerenderRoutes).toEqual([...contentPrerenderRoutes, '/sitemap.xml'])
  })

  it('documents site-scoped legal and methodology pages', () => {
    expect(contentPageCatalog.map((page) => page.slug)).toEqual([...contentPageSlugs])

    for (const page of contentPageCatalog) {
      const localized = page.localized.en
      expect(localized.description.length).toBeGreaterThan(70)
      expect(localized.sections).toHaveLength(3)
      expect(getContentPageBySlug(page.slug)).toBe(page)
    }
  })

  it('filters tools without hiding planned safety status', () => {
    expect(filterTools('ssl', 'all').map((tool) => tool.slug)).toEqual(['ssl-certificate-checker'])
    expect(filterTools('', 'dns').map((tool) => tool.slug)).toEqual(['dns-lookup', 'dns-propagation'])
    expect(Object.keys(categoryLabels)).toContain('reachability')
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
