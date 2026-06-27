import { describe, expect, it } from 'vitest'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  createToolStructuredData,
  executeTool,
  filterTools,
  getRelatedTools,
  getToolBySlug,
  getToolCopy,
  toolCatalog,
  toolSlugs,
} from '../app/data/tools'
import { createDevUtilityToolEvent } from '../app/utils/analytics'

describe('DevUtility Lab MVP', () => {
  it('lists tools in roadmap order', () => {
    expect(toolCatalog.map((tool) => tool.slug)).toEqual([...toolSlugs])
    expect(toolCatalog).toHaveLength(9)
    expect(getToolBySlug('structured-data-formatter')?.localized.en.shortName).toBe('Formatter')
    expect(getToolBySlug('missing')).toBeNull()
  })

  it('keeps localized tool content complete', () => {
    for (const tool of toolCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getToolCopy(tool, locale)

        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.contentSections).toHaveLength(3)
        expect(copy.faq).toHaveLength(2)
        expect(copy.exampleBody.length).toBeGreaterThan(60)
        expect(copy.commonErrorBody.length).toBeGreaterThan(60)
        expect(copy.freeScope.length).toBeGreaterThan(20)
        expect(copy.upgradeScope.length).toBeGreaterThan(20)
      }
    }
  })

  it('runs deterministic client-side utilities', async () => {
    await expect(executeTool('structured-data-formatter', '{"b":2,"a":1}', '', 'json')).resolves.toMatchObject({
      ok: true,
      output: '{\n  "b": 2,\n  "a": 1\n}',
    })

    await expect(executeTool('base64-converter', 'DevUtility Lab', '', 'encode')).resolves.toMatchObject({
      ok: true,
      output: 'RGV2VXRpbGl0eSBMYWI=',
    })

    const jwt = await executeTool(
      'jwt-inspector',
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vIn0.signature',
      '',
      'inspect',
    )
    expect(jwt.ok).toBe(true)
    expect(jwt.output).toContain('"sub": "demo"')
    expect(jwt.output).toContain('Signature verified: no')

    const regex = await executeTool('regex-tester', '\\d+', 'Build 42 and 108', 'global')
    expect(regex.output).toContain('42')
    expect(regex.output).toContain('108')

    const diff = await executeTool('text-diff', 'a\nb', 'a\nc', 'unified')
    expect(diff.output).toContain('- b')
    expect(diff.output).toContain('+ c')
  })

  it('supports cron, UUID, timestamp and hash helpers', async () => {
    const cron = await executeTool('cron-helper', '0 12 * * *', '', 'utc')
    expect(cron.ok).toBe(true)
    expect(cron.output).toContain('Next 5 UTC runs')

    const uuid = await executeTool('uuid-generator', '', '', 'v4')
    expect(uuid.ok).toBe(true)
    expect(uuid.output.split('\n')).toHaveLength(5)
    expect(uuid.output).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/u)

    const timestamp = await executeTool('timestamp-converter', '1767225600', '', 'auto')
    expect(timestamp.ok).toBe(true)
    expect(timestamp.output).toContain('2026-01-01T00:00:00.000Z')

    const hash = await executeTool('hash-generator', 'DevUtility Lab', '', 'SHA-256')
    expect(hash.ok).toBe(true)
    expect(hash.output).toMatch(/^[0-9a-f]{64}$/u)
  })

  it('prerenders localized tool and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/tools/timestamp-converter')
    expect(contentPrerenderRoutes).toContain('/de/tools/hash-generator')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + publicLocaleCodes.length * (1 + toolCatalog.length + contentPageCatalog.length),
    )
    expect(prerenderRoutes).toEqual([...contentPrerenderRoutes, '/sitemap.xml'])
  })

  it('documents legal and editorial pages for every locale', () => {
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

  it('filters tools and keeps analytics sanitized', () => {
    expect(filterTools('jwt', 'all', 'en').map((tool) => tool.slug)).toEqual(['jwt-inspector'])
    expect(filterTools('', 'time', 'en').map((tool) => tool.slug)).toEqual(['cron-helper', 'timestamp-converter'])

    const tool = getToolBySlug('jwt-inspector')
    expect(tool).not.toBeNull()
    const schema = createToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/jwt-inspector`)
    expect(schema).toHaveLength(2)
    expect(schema[0]).toMatchObject({
      '@type': 'WebApplication',
      isAccessibleForFree: true,
      offers: {
        price: '0',
      },
    })
    expect(schema[1]).toMatchObject({ '@type': 'FAQPage' })

    const event = createDevUtilityToolEvent({
      toolSlug: 'jwt-inspector',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/jwt-inspector?token=secret`,
    }, 'tool_completed')

    expect(event.name).toBe('tool_completed')
    expect(event.siteSlug).toBe('devutility-lab')
    expect(event.routePath).toBe('/supersites/devutility-lab/en/tools/jwt-inspector')
    expect(event.properties).toEqual({ tool_slug: 'jwt-inspector' })
    expect(JSON.stringify(event)).not.toContain('secret')
  })

  it('returns related tools without duplicating the current utility', () => {
    const regex = getToolBySlug('regex-tester')
    expect(regex).not.toBeNull()

    const related = getRelatedTools(regex!)

    expect(related).toHaveLength(3)
    expect(related.map((tool) => tool.slug)).not.toContain('regex-tester')
    expect(related[0].slug).toBe('text-diff')
  })
})
