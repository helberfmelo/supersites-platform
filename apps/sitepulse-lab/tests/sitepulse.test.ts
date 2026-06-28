import { describe, expect, it } from 'vitest'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  categoryLabels,
  createSitePulseScoreCard,
  createToolStructuredData,
  filterTools,
  getRelatedSitePulseTools,
  getToolBySlug,
  getToolCopy,
  toolCatalog,
  toolSlugs,
} from '../app/data/tools'
import { createSitePulseToolEvent } from '../app/utils/analytics'

describe('SitePulse Lab MVP', () => {
  it('lists website checks in roadmap order', () => {
    expect(toolCatalog.map((tool) => tool.slug)).toEqual([...toolSlugs])
    expect(toolCatalog).toHaveLength(7)
    expect(getToolBySlug('status-checker')?.shortName).toBe('Status')
    expect(getToolBySlug('missing')).toBeNull()
  })

  it('prerenders localized tool and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/tools/status-checker')
    expect(contentPrerenderRoutes).toContain('/de/tools/performance-snapshot')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(1 + publicLocaleCodes.length * (1 + toolCatalog.length + contentPageCatalog.length))
    expect(prerenderRoutes).toEqual([...contentPrerenderRoutes, '/sitemap.xml'])
  })

  it('keeps multilingual tool and policy content complete', () => {
    expect(contentPageCatalog.map((page) => page.slug)).toEqual([...contentPageSlugs])

    for (const tool of toolCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getToolCopy(tool, locale)

        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.contentSections).toHaveLength(5)
        expect(copy.faq).toHaveLength(2)
        expect(copy.freeScope.length).toBeGreaterThan(20)
        expect(copy.upgradeScope.length).toBeGreaterThan(20)
      }
    }

    for (const page of contentPageCatalog) {
      for (const locale of publicLocaleCodes) {
        const localized = page.localized[locale]
        expect(localized.description.length).toBeGreaterThan(60)
        expect(localized.sections).toHaveLength(3)
      }

      expect(getContentPageBySlug(page.slug)).toBe(page)
    }
  })

  it('filters checks by availability, headers, crawlability and performance', () => {
    expect(filterTools('redirect', 'all').map((tool) => tool.slug)).toContain('redirect-chain')
    expect(filterTools('', 'crawlability').map((tool) => tool.slug)).toEqual([
      'robots-checker',
      'sitemap-validator',
    ])
    expect(filterTools('CSP', 'security').map((tool) => tool.slug)).toEqual(['security-headers'])
    expect(filterTools('multi-region', 'performance').map((tool) => tool.slug)).toContain('ttfb-check')
    expect(Object.keys(categoryLabels)).toContain('availability')
  })

  it('creates related-check links and a one-shot pulse score', () => {
    expect(getRelatedSitePulseTools('status-checker', 'en').map((tool) => tool.slug)).toEqual([
      'redirect-chain',
      'ttfb-check',
      'performance-snapshot',
    ])

    const score = createSitePulseScoreCard([
      { label: 'HTTP status', status: 'pass', detail: 'Final response is in the 2xx range.' },
      { label: 'Redirect count', status: 'warn', detail: 'Two redirects were followed.' },
      { label: 'Headers', status: 'fail', detail: 'CSP is missing.' },
    ], 'Run a check to score visible web signals.')

    expect(score).toMatchObject({
      score: 52,
      grade: 'Action needed',
      tone: 'fail',
    })
    expect(score.summary).toContain('failing')
    expect(JSON.stringify(score)).not.toContain('example.com')
  })

  it('creates tool schema with FAQ and free WebApplication offer', () => {
    const tool = getToolBySlug('status-checker')
    expect(tool).not.toBeNull()

    const schema = createToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/status-checker`)
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

  it('creates analytics events without target URL or result values', () => {
    const event = createSitePulseToolEvent({
      toolSlug: 'redirect-chain',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/redirect-chain?url=https://private.example/admin`,
    }, 'tool_completed')

    expect(event.name).toBe('tool_completed')
    expect(event.siteSlug).toBe('sitepulse-lab')
    expect(event.routePath).toBe('/en/tools/redirect-chain')
    expect(event.properties).toEqual({ tool_slug: 'redirect-chain' })
    expect(JSON.stringify(event)).not.toContain('private.example')
    expect(JSON.stringify(event)).not.toContain('/admin')

    const reportEvent = createSitePulseToolEvent({
      toolSlug: 'visual-report',
      locale: 'en',
      routePath: `${siteBaseUrl}/en?url=https://secret.example/private`,
    }, 'tool_completed')

    expect(reportEvent.routePath).toBe('/en')
    expect(reportEvent.properties).toEqual({ tool_slug: 'visual-report' })
    expect(JSON.stringify(reportEvent)).not.toContain('secret.example')
    expect(JSON.stringify(reportEvent)).not.toContain('/private')
  })
})
