import { describe, expect, it } from 'vitest'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  createQrRouteToolStructuredData,
  executeQrRouteTool,
  filterQrRouteTools,
  getQrRouteToolBySlug,
  getQrRouteToolCopy,
  qrRouteToolCatalog,
  qrRouteToolSlugs,
} from '../app/data/tools'
import { createQRRouteToolEvent } from '../app/utils/analytics'

describe('QRRoute MVP', () => {
  it('lists Sprint 4.1 tools in roadmap order', () => {
    expect(qrRouteToolCatalog.map((tool) => tool.slug)).toEqual([...qrRouteToolSlugs])
    expect(qrRouteToolCatalog).toHaveLength(6)
    expect(getQrRouteToolBySlug('static-qr-code')?.localized.en.shortName).toBe('Static QR')
    expect(getQrRouteToolBySlug('missing')).toBeNull()
  })

  it('keeps localized tool content complete', () => {
    for (const tool of qrRouteToolCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getQrRouteToolCopy(tool, locale)

        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.contentSections).toHaveLength(3)
        expect(copy.faq).toHaveLength(2)
        expect(copy.freeScope.length).toBeGreaterThan(20)
        expect(copy.upgradeScope.length).toBeGreaterThan(20)
      }
    }
  })

  it('generates static QR, barcode, UTM, vCard and Wi-Fi payloads', async () => {
    const staticQr = await executeQrRouteTool('static-qr-code', 'https://example.com/path#secret', '', 'url')
    expect(staticQr.ok).toBe(true)
    expect(staticQr.previewKind).toBe('qr')
    expect(staticQr.previewPayload).toBe('https://example.com/path')
    expect(staticQr.output).not.toContain('#secret')

    const barcode = await executeQrRouteTool('barcode-generator', 'INV-2026-0042', '', 'code128')
    expect(barcode.ok).toBe(true)
    expect(barcode.previewKind).toBe('barcode')
    expect(barcode.previewPayload).toBe('INV-2026-0042')

    const utm = await executeQrRouteTool(
      'utm-builder',
      'https://example.com/pricing',
      'source=newsletter\nmedium=email\ncampaign=summer-launch',
      'standard',
    )
    expect(utm.ok).toBe(true)
    expect(utm.previewPayload).toContain('utm_source=newsletter')
    expect(utm.previewPayload).toContain('utm_medium=email')
    expect(utm.previewPayload).toContain('utm_campaign=summer-launch')

    const vcard = await executeQrRouteTool(
      'vcard-qr',
      'Alex Morgan\nExample Studio\nalex@example.com\n+1 555 0100\nhttps://example.com',
      '',
      'vcard4',
    )
    expect(vcard.ok).toBe(true)
    expect(vcard.previewPayload).toContain('BEGIN:VCARD')
    expect(vcard.previewPayload).toContain('FN:Alex Morgan')

    const wifi = await executeQrRouteTool('wifi-qr', 'Guest-WiFi', 'key=safe sample\nhidden=false', 'WPA')
    expect(wifi.ok).toBe(true)
    expect(wifi.previewPayload).toContain('WIFI:T:WPA;S:Guest-WiFi;P:safe sample;H:false;;')
  })

  it('blocks unsafe redirect-style URL payloads before preview', async () => {
    await expect(executeQrRouteTool('static-qr-code', 'javascript:alert(1)', '', 'url'))
      .resolves.toMatchObject({ ok: false })
    await expect(executeQrRouteTool('static-qr-code', 'http://127.0.0.1/admin', '', 'url'))
      .resolves.toMatchObject({ ok: false })
    await expect(executeQrRouteTool('static-qr-code', 'https://user:pass@example.com', '', 'url'))
      .resolves.toMatchObject({ ok: false })
    await expect(executeQrRouteTool('utm-builder', 'https://example.com', 'source=x\ncampaign=y', 'standard'))
      .resolves.toMatchObject({ ok: false })
  })

  it('prerenders localized tool and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/tools/utm-builder')
    expect(contentPrerenderRoutes).toContain('/de/tools/wifi-qr')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + publicLocaleCodes.length * (1 + qrRouteToolCatalog.length + contentPageCatalog.length),
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
    expect(filterQrRouteTools('wifi', 'all', 'en').map((tool) => tool.slug)).toEqual(['wifi-qr'])
    expect(filterQrRouteTools('', 'qr', 'en').map((tool) => tool.slug)).toEqual(['static-qr-code'])

    const tool = getQrRouteToolBySlug('utm-builder')
    expect(tool).not.toBeNull()
    const schema = createQrRouteToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/utm-builder`)
    expect(schema).toHaveLength(2)
    expect(schema[0]).toMatchObject({
      '@type': 'WebApplication',
      isAccessibleForFree: true,
      offers: {
        price: '0',
      },
    })
    expect(schema[1]).toMatchObject({ '@type': 'FAQPage' })

    const event = createQRRouteToolEvent({
      toolSlug: 'utm-builder',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/utm-builder?url=https://secret.example/path`,
    }, 'tool_completed')

    expect(event.name).toBe('tool_completed')
    expect(event.siteSlug).toBe('qrroute')
    expect(event.routePath).toBe('/supersites/qrroute/en/tools/utm-builder')
    expect(event.properties).toEqual({ tool_slug: 'utm-builder' })
    expect(JSON.stringify(event)).not.toContain('secret.example')
  })
})
