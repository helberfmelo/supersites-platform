import { describe, expect, it } from 'vitest'
import { getPixelBatchAdvancedWorkflowCopy } from '../app/data/advancedWorkflows'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  createPixelBatchToolStructuredData,
  estimateOutputBytes,
  filterPixelBatchTools,
  formatBytes,
  getPixelBatchToolBySlug,
  getPixelBatchToolCopy,
  getPixelBatchWorkflowSteps,
  getRelatedPixelBatchTools,
  pixelBatchToolCatalog,
  pixelBatchToolSlugs,
  planPixelBatchTransform,
  type PixelBatchToolInput,
} from '../app/data/tools'
import { createPixelBatchToolEvent } from '../app/utils/analytics'

const sample: PixelBatchToolInput = {
  fileName: 'private-campaign-photo.jpg',
  mimeType: 'image/jpeg',
  sizeBytes: 1_250_000,
  width: 2400,
  height: 1600,
  outputFormat: 'image/webp',
  quality: 0.72,
}

describe('PixelBatch MVP', () => {
  it('lists browser image tools in roadmap order', () => {
    expect(pixelBatchToolCatalog.map((tool) => tool.slug)).toEqual([...pixelBatchToolSlugs])
    expect(pixelBatchToolCatalog).toHaveLength(6)
    expect(getPixelBatchToolBySlug('image-compressor')?.localized.en.shortName).toBe('Compress')
    expect(getPixelBatchToolBySlug('missing')).toBeNull()
  })

  it('maps related tools and workflow steps for every image task', () => {
    for (const slug of pixelBatchToolSlugs) {
      const relatedTools = getRelatedPixelBatchTools(slug, 'en')
      const workflowSteps = getPixelBatchWorkflowSteps(slug)

      expect(relatedTools).toHaveLength(3)
      expect(relatedTools.map((tool) => tool.slug)).not.toContain(slug)
      expect(workflowSteps).toHaveLength(3)
      expect(workflowSteps.every((step) => step.title.length > 4 && step.body.length > 20)).toBe(true)
    }
  })

  it('keeps localized image content complete', () => {
    for (const tool of pixelBatchToolCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getPixelBatchToolCopy(tool, locale)

        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.contentSections).toHaveLength(3)
        expect(copy.faq).toHaveLength(2)
        expect(copy.freeScope.length).toBeGreaterThan(20)
        expect(copy.upgradeScope.length).toBeGreaterThan(20)
      }
    }
  })

  it('documents advanced image workflow data gates in every locale', () => {
    for (const locale of publicLocaleCodes) {
      const copy = getPixelBatchAdvancedWorkflowCopy(locale)

      expect(copy.title.length).toBeGreaterThan(10)
      expect(copy.body).toMatch(/upload|local|navegador|Browser|navigateur|Daten|datos/i)
      expect(copy.items).toHaveLength(3)
      expect(copy.items.map((item) => item.title).join(' ')).not.toContain('active provider')
      expect(copy.items.every((item) => item.current.length > 20 && item.data.length > 20 && item.gate.length > 20)).toBe(true)
    }
  })

  it('plans browser-side image transforms with worker and metadata boundaries', () => {
    const compressed = planPixelBatchTransform('image-compressor', sample, true)
    expect(compressed.ok).toBe(true)
    expect(compressed.plan).toMatchObject({
      outputFormat: 'image/webp',
      outputWidth: 2400,
      outputHeight: 1600,
      removeMetadata: false,
      workerUsed: true,
    })
    expect(compressed.output).toBe('private-campaign-photo-image-compressor.webp')
    expect(compressed.plan?.privacyNote).toContain('Processed locally')
    expect(estimateOutputBytes(compressed.plan!)).toBeGreaterThan(0)

    const resized = planPixelBatchTransform('image-resizer', {
      ...sample,
      targetWidth: 1200,
      targetHeight: undefined,
    })
    expect(resized.plan?.outputWidth).toBe(1200)
    expect(resized.plan?.outputHeight).toBe(800)

    const cropped = planPixelBatchTransform('image-cropper', {
      ...sample,
      cropPreset: 'square',
    })
    expect(cropped.plan?.crop).toMatchObject({ sx: 400, sy: 0, sw: 1600, sh: 1600 })

    const cleaned = planPixelBatchTransform('metadata-remover', sample)
    expect(cleaned.plan?.removeMetadata).toBe(true)
  })

  it('plans social presets and warns about browser-gated AVIF support', () => {
    const social = planPixelBatchTransform('social-preset-generator', {
      ...sample,
      socialPreset: 'open-graph',
    })
    expect(social.ok).toBe(true)
    expect(social.plan?.outputWidth).toBe(1200)
    expect(social.plan?.outputHeight).toBe(630)
    expect(social.plan?.warnings.join(' ')).toContain('centered crop')

    const avif = planPixelBatchTransform('image-converter', {
      ...sample,
      outputFormat: 'image/avif',
    })
    expect(avif.plan?.warnings.join(' ')).toContain('AVIF export depends')
  })

  it('rejects unsafe or oversized local image inputs', () => {
    expect(planPixelBatchTransform('image-compressor', {
      ...sample,
      mimeType: 'image/gif',
    })).toMatchObject({ ok: false })
    expect(planPixelBatchTransform('image-compressor', {
      ...sample,
      sizeBytes: 11 * 1024 * 1024,
    })).toMatchObject({ ok: false })
    expect(planPixelBatchTransform('image-resizer', {
      ...sample,
      targetWidth: 20_000,
    })).toMatchObject({ ok: false })
    expect(formatBytes(10 * 1024 * 1024)).toBe('10.00 MB')
  })

  it('prerenders localized tool and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/tools/image-compressor')
    expect(contentPrerenderRoutes).toContain('/de/tools/social-preset-generator')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + publicLocaleCodes.length * (1 + pixelBatchToolCatalog.length + contentPageCatalog.length),
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
    expect(filterPixelBatchTools('metadata', 'all', 'en').map((tool) => tool.slug)).toEqual(['metadata-remover'])
    expect(filterPixelBatchTools('', 'convert', 'en').map((tool) => tool.slug)).toEqual(['image-converter'])

    const tool = getPixelBatchToolBySlug('image-compressor')
    expect(tool).not.toBeNull()
    const schema = createPixelBatchToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/image-compressor`)
    expect(schema).toHaveLength(2)
    expect(schema[0]).toMatchObject({
      '@type': 'WebApplication',
      applicationCategory: 'MultimediaApplication',
      isAccessibleForFree: true,
      offers: {
        price: '0',
      },
    })
    expect(schema[1]).toMatchObject({ '@type': 'FAQPage' })

    const event = createPixelBatchToolEvent({
      toolSlug: 'image-compressor',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/image-compressor?file=private-campaign-photo.jpg&w=2400&h=1600`,
    }, 'file_processed')

    expect(event.name).toBe('file_processed')
    expect(event.siteSlug).toBe('pixelbatch')
    expect(event.routePath).toBe('/supersites/pixelbatch/en/tools/image-compressor')
    expect(event.properties).toEqual({ tool_slug: 'image-compressor' })
    expect(JSON.stringify(event)).not.toContain('private-campaign-photo')
    expect(JSON.stringify(event)).not.toContain('2400')
  })
})
