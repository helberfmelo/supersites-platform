import { describe, expect, it } from 'vitest'
import { getDocShiftAdvancedWorkflowCopy } from '../app/data/advancedWorkflows'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  createDocShiftToolStructuredData,
  docShiftToolCatalog,
  docShiftToolSlugs,
  estimateOutputBytesForPlan,
  filterDocShiftTools,
  formatBytes,
  getDocShiftWorkflowSteps,
  getDocShiftToolBySlug,
  getDocShiftToolCopy,
  getRelatedDocShiftTools,
  parsePageSelection,
  planDocShiftTransform,
  type DocShiftToolInput,
} from '../app/data/tools'
import { createDocShiftToolEvent } from '../app/utils/analytics'

const sample: DocShiftToolInput = {
  fileNames: ['confidential-client-brief.pdf'],
  mimeTypes: ['application/pdf'],
  sizeBytes: [1_250_000],
  pageCount: 6,
  pageSelection: '1-2,4',
  rotationDegrees: 90,
  watermarkText: 'Draft',
  watermarkPosition: 'bottom-right',
  watermarkOpacity: 0.22,
  watermarkSize: 48,
  metadataTitle: 'Clean copy',
  metadataAuthor: 'Local editor',
  pageNumberPosition: 'top-right',
  pageNumberStart: 4,
  pageNumberFormat: 'page-number',
  textTitle: 'Meeting notes',
  pageSize: 'a4',
  fontSize: 12,
}

describe('DocShift browser workflows', () => {
  it('lists document tools in roadmap order', () => {
    expect(docShiftToolCatalog.map((tool) => tool.slug)).toEqual([...docShiftToolSlugs])
    expect(docShiftToolCatalog).toHaveLength(8)
    expect(getDocShiftToolBySlug('pdf-merge')?.localized.en.shortName).toBe('Merge')
    expect(getDocShiftToolBySlug('text-to-pdf')?.usesTextInput).toBe(true)
    expect(getDocShiftToolBySlug('missing')).toBeNull()
  })

  it('keeps related tools and workflow steps complete', () => {
    for (const slug of docShiftToolSlugs) {
      const related = getRelatedDocShiftTools(slug, 'en')
      const steps = getDocShiftWorkflowSteps(slug)

      expect(related).toHaveLength(3)
      expect(related.map((item) => item.slug)).not.toContain(slug)
      expect(related.every((item) => item.title.length > 3 && item.description.length > 20)).toBe(true)
      expect(steps).toHaveLength(3)
      expect(steps.every((step) => step.title.length > 3 && step.body.length > 20)).toBe(true)
    }
  })

  it('keeps localized document content complete', () => {
    for (const tool of docShiftToolCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getDocShiftToolCopy(tool, locale)

        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.contentSections).toHaveLength(3)
        expect(copy.faq).toHaveLength(2)
        expect(copy.freeScope.length).toBeGreaterThan(20)
        expect(copy.upgradeScope.length).toBeGreaterThan(20)
      }
    }
  })

  it('documents advanced document workflow data gates in every locale', () => {
    for (const locale of publicLocaleCodes) {
      const copy = getDocShiftAdvancedWorkflowCopy(locale)

      expect(copy.title.length).toBeGreaterThan(10)
      expect(copy.body).toMatch(/OCR|upload|navegador|Browser|navigateur|Daten|datos/i)
      expect(copy.items).toHaveLength(3)
      expect(copy.items.map((item) => item.title).join(' ')).not.toContain('active file service')
      expect(copy.items.every((item) => item.current.length > 20 && item.data.length > 20 && item.gate.length > 20)).toBe(true)
    }
  })

  it('plans browser-side PDF workflows with page ranges and metadata boundaries', () => {
    const split = planDocShiftTransform('pdf-split', sample, true)
    expect(split.ok).toBe(true)
    expect(split.output).toBe('confidential-client-brief-pdf-split.pdf')
    expect(split.plan).toMatchObject({
      operation: 'split',
      pageSelection: [0, 1, 3],
      workerUsed: true,
      privacyNote: expect.stringContaining('Processed locally'),
    })
    expect(estimateOutputBytesForPlan(split.plan!, sample)).toBeGreaterThan(0)

    const rotated = planDocShiftTransform('pdf-rotate', sample)
    expect(rotated.plan?.rotationDegrees).toBe(90)

    const metadata = planDocShiftTransform('metadata-cleaner', sample)
    expect(metadata.plan?.metadataTitle).toBe('Clean copy')
    expect(metadata.plan?.warnings.join(' ')).toContain('not forensic redaction')
  })

  it('plans merge, watermark, page numbers, compression and text conversion', () => {
    const merge = planDocShiftTransform('pdf-merge', {
      ...sample,
      fileNames: ['one.pdf', 'two.pdf'],
      mimeTypes: ['application/pdf', 'application/pdf'],
      sizeBytes: [10_000, 20_000],
    })
    expect(merge.ok).toBe(true)
    expect(merge.plan?.operation).toBe('merge')

    const watermark = planDocShiftTransform('pdf-watermark', sample)
    expect(watermark.plan?.watermarkText).toBe('Draft')
    expect(watermark.plan?.watermarkPosition).toBe('bottom-right')
    expect(watermark.plan?.watermarkOpacity).toBe(0.22)

    const numbers = planDocShiftTransform('page-numbers', sample)
    expect(numbers.plan?.operation).toBe('page-numbers')
    expect(numbers.plan?.pageNumberPosition).toBe('top-right')
    expect(numbers.plan?.pageNumberStart).toBe(4)

    const compressed = planDocShiftTransform('pdf-compressor', sample)
    expect(compressed.plan?.warnings.join(' ')).toContain('structure rewrite')

    const text = planDocShiftTransform('text-to-pdf', {
      fileNames: [],
      mimeTypes: [],
      sizeBytes: [],
      textContent: 'A local browser-side document conversion.',
      textTitle: 'Meeting notes',
      pageSize: 'a4',
      fontSize: 12,
    })
    expect(text.ok).toBe(true)
    expect(text.output).toBe('docshift-text-to-pdf.pdf')
    expect(text.plan?.textTitle).toBe('Meeting notes')
    expect(text.plan?.pageSize).toBe('a4')
    expect(text.plan?.fontSize).toBe(12)
  })

  it('rejects unsafe, oversized or invalid free inputs', () => {
    expect(planDocShiftTransform('pdf-split', {
      ...sample,
      mimeTypes: ['image/png'],
      fileNames: ['photo.png'],
    })).toMatchObject({ ok: false })
    expect(planDocShiftTransform('pdf-merge', {
      ...sample,
      fileNames: ['a.pdf', 'b.pdf', 'c.pdf', 'd.pdf', 'e.pdf', 'f.pdf'],
      mimeTypes: Array(6).fill('application/pdf'),
      sizeBytes: Array(6).fill(1000),
    })).toMatchObject({ ok: false })
    expect(planDocShiftTransform('pdf-rotate', {
      ...sample,
      sizeBytes: [13 * 1024 * 1024],
    })).toMatchObject({ ok: false })
    expect(planDocShiftTransform('text-to-pdf', {
      fileNames: [],
      mimeTypes: [],
      sizeBytes: [],
      textContent: '',
    })).toMatchObject({ ok: false })
    expect(parsePageSelection('1-3, 5, 99', 6)).toEqual([0, 1, 2, 4])
    expect(formatBytes(12 * 1024 * 1024)).toBe('12.00 MB')
  })

  it('prerenders localized tool and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/tools/pdf-merge')
    expect(contentPrerenderRoutes).toContain('/de/tools/text-to-pdf')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + publicLocaleCodes.length * (1 + docShiftToolCatalog.length + contentPageCatalog.length),
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
    expect(filterDocShiftTools('author', 'all', 'en').map((tool) => tool.slug)).toEqual(['metadata-cleaner'])
    expect(filterDocShiftTools('', 'organize', 'en').map((tool) => tool.slug)).toEqual(['pdf-merge', 'pdf-split'])

    const tool = getDocShiftToolBySlug('pdf-merge')
    expect(tool).not.toBeNull()
    const schema = createDocShiftToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/pdf-merge`)
    expect(schema).toHaveLength(2)
    expect(schema[0]).toMatchObject({
      '@type': 'WebApplication',
      applicationCategory: 'ProductivityApplication',
      isAccessibleForFree: true,
      offers: {
        price: '0',
      },
    })
    expect(schema[1]).toMatchObject({ '@type': 'FAQPage' })

    const event = createDocShiftToolEvent({
      toolSlug: 'pdf-merge',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/pdf-merge?file=confidential-client-brief.pdf&page=1-2`,
    }, 'file_processed')

    expect(event.name).toBe('file_processed')
    expect(event.siteSlug).toBe('docshift')
    expect(event.routePath).toBe('/supersites/docshift/en/tools/pdf-merge')
    expect(event.properties).toEqual({ tool_slug: 'pdf-merge' })
    expect(JSON.stringify(event)).not.toContain('confidential-client-brief')
    expect(JSON.stringify(event)).not.toContain('1-2')
  })
})
