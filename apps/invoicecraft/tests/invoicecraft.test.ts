import { describe, expect, it } from 'vitest'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  createInvoiceCraftToolStructuredData,
  executeInvoiceCraftTool,
  filterInvoiceCraftTools,
  formatMoney,
  getInvoiceCraftToolBySlug,
  getInvoiceCraftToolCopy,
  getRelatedInvoiceCraftTools,
  invoiceCraftToolCatalog,
  invoiceCraftToolSlugs,
  type InvoiceCraftDocumentInput,
} from '../app/data/tools'
import { createInvoiceCraftToolEvent } from '../app/utils/analytics'

const sample: InvoiceCraftDocumentInput = {
  issuerName: 'Northstar Studio',
  issuerDetails: '245 Market Street\nSan Francisco, CA\nbilling@example.com',
  clientName: 'Acme Operations',
  clientDetails: '18 Harbor Road\nAustin, TX\nfinance@example.com',
  documentNumber: 'IC-2026-0042',
  issueDate: '2026-06-27',
  dueDate: '2026-07-12',
  currency: 'USD',
  terms: 'Due on receipt.',
  itemsRaw: 'Workflow setup | 1 | 950\nTemplate cleanup | 3 | 125\nReview call | 2 | 90',
  discountAmount: '50',
  shippingAmount: '0',
  adjustmentLabel: 'Manual tax/adjustment',
  adjustmentAmount: '25',
  notes: 'Generated locally.',
}

describe('InvoiceCraft MVP', () => {
  it('lists local document tools in roadmap order', () => {
    expect(invoiceCraftToolCatalog.map((tool) => tool.slug)).toEqual([...invoiceCraftToolSlugs])
    expect(invoiceCraftToolCatalog).toHaveLength(3)
    expect(getInvoiceCraftToolBySlug('invoice-builder')?.localized.en.shortName).toBe('Invoice')
    expect(getInvoiceCraftToolBySlug('missing')).toBeNull()
  })

  it('keeps localized document content complete', () => {
    for (const tool of invoiceCraftToolCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getInvoiceCraftToolCopy(tool, locale)

        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.contentSections).toHaveLength(5)
        expect(copy.faq).toHaveLength(2)
        expect(copy.freeScope.length).toBeGreaterThan(20)
        expect(copy.upgradeScope.length).toBeGreaterThan(20)
      }
    }
  })

  it('links related document flows without including the current tool', () => {
    expect(getRelatedInvoiceCraftTools('invoice-builder', 'en').map((tool) => tool.slug)).toEqual([
      'quote-builder',
      'receipt-builder',
    ])
    expect(getRelatedInvoiceCraftTools('receipt-builder', 'en')).toHaveLength(2)
  })

  it('generates invoice, quote and receipt summaries with deterministic totals', async () => {
    const invoice = await executeInvoiceCraftTool('invoice-builder', sample, 'clean')
    expect(invoice.ok).toBe(true)
    expect(invoice.document?.kind).toBe('invoice')
    expect(invoice.document?.subtotal).toBe(1505)
    expect(invoice.document?.discountAmount).toBe(50)
    expect(invoice.document?.shippingAmount).toBe(0)
    expect(invoice.document?.adjustmentAmount).toBe(25)
    expect(invoice.document?.total).toBe(1480)
    expect(invoice.output).toContain('Shipping/freight')
    expect(invoice.output).toContain('Storage: local browser session only')
    expect(invoice.output).toContain('Tax/legal note')

    const quote = await executeInvoiceCraftTool('quote-builder', { ...sample, documentNumber: 'QT-1' }, 'service')
    expect(quote.ok).toBe(true)
    expect(quote.document?.kind).toBe('quote')
    expect(quote.document?.dueDateLabel).toBe('Valid until')

    const receipt = await executeInvoiceCraftTool('receipt-builder', { ...sample, documentNumber: 'RC-1' }, 'compact')
    expect(receipt.ok).toBe(true)
    expect(receipt.document?.kind).toBe('receipt')
    expect(receipt.document?.dueDateLabel).toBe('Paid date')
  })

  it('rejects malformed local document inputs', async () => {
    await expect(executeInvoiceCraftTool('invoice-builder', { ...sample, issuerName: '' }, 'clean'))
      .resolves.toMatchObject({ ok: false })
    await expect(executeInvoiceCraftTool('invoice-builder', { ...sample, itemsRaw: 'Broken line' }, 'clean'))
      .resolves.toMatchObject({ ok: false })
    await expect(executeInvoiceCraftTool('invoice-builder', { ...sample, currency: 'JPY' }, 'clean'))
      .resolves.toMatchObject({ ok: false })
    await expect(executeInvoiceCraftTool('invoice-builder', { ...sample, dueDate: '2026-99-99' }, 'clean'))
      .resolves.toMatchObject({ ok: false })
  })

  it('prerenders localized tool and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/tools/invoice-builder')
    expect(contentPrerenderRoutes).toContain('/de/tools/receipt-builder')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + publicLocaleCodes.length * (1 + invoiceCraftToolCatalog.length + contentPageCatalog.length),
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
    expect(filterInvoiceCraftTools('paid-date', 'all', 'en').map((tool) => tool.slug)).toEqual(['receipt-builder'])
    expect(filterInvoiceCraftTools('', 'quote', 'en').map((tool) => tool.slug)).toEqual(['quote-builder'])
    expect(formatMoney(1480, 'USD', 'en')).toContain('$1,480')

    const tool = getInvoiceCraftToolBySlug('invoice-builder')
    expect(tool).not.toBeNull()
    const schema = createInvoiceCraftToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/invoice-builder`)
    expect(schema).toHaveLength(2)
    expect(schema[0]).toMatchObject({
      '@type': 'WebApplication',
      applicationCategory: 'BusinessApplication',
      isAccessibleForFree: true,
      offers: {
        price: '0',
      },
    })
    expect(schema[1]).toMatchObject({ '@type': 'FAQPage' })

    const event = createInvoiceCraftToolEvent({
      toolSlug: 'invoice-builder',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/invoice-builder?client=Acme&amount=1480&document=IC-2026-0042`,
    }, 'file_downloaded')

    expect(event.name).toBe('file_downloaded')
    expect(event.siteSlug).toBe('invoicecraft')
    expect(event.routePath).toBe('/supersites/invoicecraft/en/tools/invoice-builder')
    expect(event.properties).toEqual({ tool_slug: 'invoice-builder' })
    expect(JSON.stringify(event)).not.toContain('Acme')
    expect(JSON.stringify(event)).not.toContain('1480')
    expect(JSON.stringify(event)).not.toContain('IC-2026-0042')
  })
})
