import { expect, test, type Page } from '@playwright/test'

const pngFixture = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAFUlEQVR4nGP8z4AATAxEcQAz0QEAmA0B9zB5r9cAAAAASUVORK5CYII=',
  'base64',
)

function collectBrowserErrors(page: Page): string[] {
  const errors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })

  page.on('pageerror', (error) => {
    errors.push(error.message)
  })

  return errors
}

async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => {
    const wideElements = Array.from(document.querySelectorAll('*'))
      .map((element) => {
        const rect = element.getBoundingClientRect()

        return {
          tag: element.tagName,
          className: String(element.className || ''),
          width: rect.width,
          right: rect.right,
        }
      })
      .filter((element) => element.width > window.innerWidth + 1 || element.right > window.innerWidth + 1)
      .slice(0, 8)

    return {
      bodyScrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      wideElements,
    }
  })

  expect(metrics.scrollWidth, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.innerWidth)
  expect(metrics.bodyScrollWidth, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.innerWidth)
  expect(metrics.wideElements, JSON.stringify(metrics)).toHaveLength(0)
}

async function uploadFixture(page: Page, label = 'Image file') {
  await page.getByLabel(label).setInputFiles({
    name: 'secret-product-photo.png',
    mimeType: 'image/png',
    buffer: pngFixture,
  })
}

test.describe('PixelBatch MVP', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/PixelBatch/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Image resize')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pixelbatch/en',
    )
    await expect(page.getByRole('heading', { name: 'Image Compressor' })).toBeVisible()
    await expect(page.getByText('6 browser tools')).toBeVisible()
    await expect(page.getByText('Local MVP')).toHaveCount(6)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('pixelbatch-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('processes an image locally with sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1180 })
    await page.goto('/en/tools/image-compressor?file=private-name.png&w=9999')
    await expect(page.getByText('Drop or choose one image')).toBeVisible()
    await uploadFixture(page)
    await expect(page.getByAltText('Original image preview')).toBeVisible()
    await page.getByLabel(/Output format/).selectOption('image/webp')
    await page.getByLabel(/Quality/).fill('70')
    await page.getByRole('button', { name: 'Process image' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Image Compressor')
    await expect(page.getByRole('heading', { name: 'Before and after' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Workflow snapshot' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Privacy checklist' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Batch queue gated' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Related image tools' })).toBeVisible()
    await expect(page.getByAltText('Processed image preview')).toBeVisible()
    await expect(page.getByText('Actual output')).toBeVisible()
    await expect(page.getByText('No image bytes leave the browser session.')).toBeVisible()
    await expect(page.getByRole('link', { name: /Image Resizer/ })).toBeVisible()
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6)
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
      localStorageLength: window.localStorage.length,
      sessionStorageLength: window.sessionStorage.length,
    }))

    expect(analytics.localEvents?.map((event) => event.name)).toEqual([
      'tool_viewed',
      'tool_started',
      'file_processed',
      'tool_completed',
    ])
    expect(analytics.localEvents?.[0]).toMatchObject({
      siteSlug: 'pixelbatch',
      routePath: '/en/tools/image-compressor',
      properties: {
        tool_slug: 'image-compressor',
      },
    })
    expect(JSON.stringify(analytics.localEvents)).not.toContain('secret-product-photo')
    expect(JSON.stringify(analytics.dataLayer)).not.toContain('private-name')
    expect(analytics.localStorageLength).toBe(0)
    expect(analytics.sessionStorageLength).toBe(0)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('pixelbatch-compressor-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('resizes, downloads and renders localized privacy pages', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1180 })
    await page.goto('/en/tools/image-resizer')
    await uploadFixture(page)
    await page.getByLabel('Width').fill('2')
    await page.getByRole('button', { name: 'Process image' }).click()

    await expect(page.getByText('Output dimensions')).toBeVisible()
    await expect(page.getByAltText('Processed image preview')).toBeVisible()

    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download image' }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/image-resizer\.(webp|png|jpg)$/)
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => window.supersitesAnalyticsEvents)
    expect(analytics?.map((event) => event.name)).toContain('file_downloaded')

    await page.goto('/pt-br/tools/social-preset-generator')
    await expect(page).toHaveTitle(/Social Preset Generator/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expectNoHorizontalOverflow(page)

    await page.goto('/en/privacy')
    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByText('Data minimization')).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('pixelbatch-privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
