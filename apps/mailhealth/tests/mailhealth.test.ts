import { describe, expect, it } from 'vitest'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  analyzeMailHeaders,
  categoryLabels,
  createMailHealthScoreCard,
  createToolStructuredData,
  filterTools,
  getRelatedMailHealthTools,
  getToolBySlug,
  getToolCopy,
  toolCatalog,
  toolSlugs,
} from '../app/data/tools'
import { createMailHealthToolEvent } from '../app/utils/analytics'

describe('MailHealth MVP', () => {
  it('lists email checks in roadmap order', () => {
    expect(toolCatalog.map((tool) => tool.slug)).toEqual([...toolSlugs])
    expect(toolCatalog).toHaveLength(7)
    expect(getToolBySlug('spf-checker')?.shortName).toBe('SPF')
    expect(getToolBySlug('missing')).toBeNull()
  })

  it('prerenders localized tool and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/tools/spf-checker')
    expect(contentPrerenderRoutes).toContain('/de/tools/header-analyzer')
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

  it('filters checks by authentication, transport and local headers', () => {
    expect(filterTools('DMARC reports', 'all').map((tool) => tool.slug)).toContain('dmarc-checker')
    expect(filterTools('', 'authentication').map((tool) => tool.slug)).toEqual([
      'spf-checker',
      'dkim-checker',
      'dmarc-checker',
    ])
    expect(filterTools('EHLO', 'transport').map((tool) => tool.slug)).toEqual(['smtp-check'])
    expect(Object.keys(categoryLabels)).toContain('headers')
  })

  it('creates related-check links and a privacy-safe health score', () => {
    expect(getRelatedMailHealthTools('spf-checker', 'en').map((tool) => tool.slug)).toEqual([
      'dmarc-checker',
      'dkim-checker',
      'header-analyzer',
    ])

    const score = createMailHealthScoreCard([
      { label: 'SPF record count', status: 'pass', detail: 'Exactly one SPF record was found.' },
      { label: 'All mechanism', status: 'warn', detail: 'SPF ends with ~all.' },
      { label: 'Lookup count', status: 'unknown', detail: 'Lookup count was not available.' },
    ], 'Run a check to score visible signals.')

    expect(score).toMatchObject({
      score: 63,
      grade: 'Review',
      tone: 'warn',
    })
    expect(score.summary).toContain('warning')
    expect(JSON.stringify(score)).not.toContain('example.com')
  })

  it('creates tool schema with FAQ and free WebApplication offer', () => {
    const tool = getToolBySlug('spf-checker')
    expect(tool).not.toBeNull()

    const schema = createToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/spf-checker`)
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

  it('analyzes message headers locally without backend data needs', () => {
    const result = analyzeMailHeaders([
      'Authentication-Results: mx.example; spf=pass smtp.mailfrom=example.com; dkim=pass header.d=example.com; dmarc=pass header.from=example.com',
      'From: Example Sender <sender@example.com>',
      'Return-Path: <bounce@example.com>',
      'DKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=default; bh=sample; b=sample',
    ].join('\n'))

    expect(result.ok).toBe(true)
    expect(result.summary).toContain('healthy')
    expect(result.findings.map((finding) => finding.status)).toContain('pass')
    expect(result.meta).toContainEqual({ label: 'DKIM signatures', value: '1' })

    expect(analyzeMailHeaders('').ok).toBe(false)
    expect(analyzeMailHeaders('x'.repeat(80_001)).error).toContain('80 KB')
  })

  it('creates analytics events without domain, selector, headers or result values', () => {
    const event = createMailHealthToolEvent({
      toolSlug: 'dkim-checker',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/dkim-checker?domain=secret.example&selector=private`,
    }, 'tool_completed')

    expect(event.name).toBe('tool_completed')
    expect(event.siteSlug).toBe('mailhealth')
    expect(event.routePath).toBe('/supersites/mailhealth/en/tools/dkim-checker')
    expect(event.properties).toEqual({ tool_slug: 'dkim-checker' })
    expect(JSON.stringify(event)).not.toContain('secret.example')
    expect(JSON.stringify(event)).not.toContain('private')
  })
})
