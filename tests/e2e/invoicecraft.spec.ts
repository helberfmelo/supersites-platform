import { expect, test, type Page } from '@playwright/test'

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

test.describe('InvoiceCraft document studio', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/InvoiceCraft/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Invoices, quotes and receipts')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/invoicecraft/en',
    )
    await expect(page.locator('#invoicecraft-workbench-invoice-builder')).toBeVisible()
    await expect(page.getByText('Browser-only session')).toBeVisible()
    await expect(page.getByText('Free PDF').first()).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('invoicecraft-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('builds an invoice preview and records sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1180 })
    await page.goto('/en/tools/invoice-builder?client=secret-client&amount=9999')

    await page.getByLabel('Issuer name').fill('Blue Harbor LLC')
    await page.getByLabel('Client name').fill('Client With Private Name')
    await page.getByRole('button', { name: 'Remove line item 3' }).click()
    await page.getByLabel('Line item description 1').fill('Consulting')
    await page.getByLabel('Quantity 1').fill('2')
    await page.getByLabel('Unit price 1').fill('150')
    await page.getByLabel('Line item description 2').fill('Documentation')
    await page.getByLabel('Quantity 2').fill('1')
    await page.getByLabel('Unit price 2').fill('80')
    await page.getByLabel('Discount amount').fill('10')
    await page.getByLabel('Shipping/freight amount').fill('0')
    await page.getByLabel('Manual tax/adjustment amount').fill('5')
    await page.getByRole('button', { name: 'Update preview' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Invoice Builder')
    await expect(page.getByRole('heading', { name: 'Document snapshot' })).toBeVisible()
    await expect(page.getByText('Invoice IC-2026-0042')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Download PDF' })).toBeEnabled()
    await expect(page.getByRole('button', { name: 'Copy text summary' })).toBeEnabled()
    await expect(page.locator('.document-preview')).toContainText('Blue Harbor LLC')
    await expect(page.locator('.document-preview')).toContainText('$375.00')
    await expect(page.locator('.document-preview')).toContainText('Tax/legal note')
    await expect(page.getByRole('heading', { name: 'Related documents' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Quote Builder/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Future workflow options' })).toBeVisible()
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6)
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
      localStorageLength: window.localStorage.length,
      sessionStorageLength: window.sessionStorage.length,
    }))

    expect(analytics.localEvents).toHaveLength(3)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'tool_viewed',
      siteSlug: 'invoicecraft',
      routePath: '/en/tools/invoice-builder',
      properties: {
        tool_slug: 'invoice-builder',
      },
    })
    expect(analytics.localEvents?.[1]).toMatchObject({
      name: 'tool_started',
      properties: {
        tool_slug: 'invoice-builder',
      },
    })
    expect(analytics.localEvents?.[2]).toMatchObject({
      name: 'tool_completed',
      properties: {
        tool_slug: 'invoice-builder',
      },
    })
    expect(JSON.stringify(analytics.localEvents)).not.toContain('Blue Harbor')
    expect(JSON.stringify(analytics.dataLayer)).not.toContain('secret-client')
    expect(analytics.localStorageLength).toBe(0)
    expect(analytics.sessionStorageLength).toBe(0)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('invoicecraft-preview-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('downloads a local PDF and renders localized pages on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1180 })
    await page.goto('/en/tools/receipt-builder')
    await page.getByRole('button', { name: 'Update preview' }).click()

    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download PDF' }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/^receipt-/)

    await expect(page.locator('.document-preview')).toContainText('Paid date')
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => window.supersitesAnalyticsEvents)
    expect(analytics?.map((event) => event.name)).toContain('file_downloaded')

    await page.goto('/pt-br/tools/quote-builder')
    await expect(page).toHaveTitle(/Construtor de orçamentos/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Construtor de orçamentos')
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expectNoHorizontalOverflow(page)

    await page.goto('/en/privacy')
    await expect(page).toHaveTitle(/InvoiceCraft privacy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('InvoiceCraft privacy')
    await expect(page.getByRole('heading', { name: 'Data used by the tool' })).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('invoicecraft-privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
