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

test.describe('DevUtility Lab MVP', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/DevUtility Lab/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Developer utilities')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/devutility-lab/en',
    )
    await expect(page.getByRole('heading', { name: 'Structured Data Formatter' })).toBeVisible()
    await expect(page.getByText('No storage or logging')).toBeVisible()
    await expect(page.getByText('Local MVP').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Workbench principles' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('devutility-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('formats JSON in a browser worker and records sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/tools/structured-data-formatter')

    await page.getByLabel('Data input').fill('{"b":2,"a":1}')
    await page.getByRole('button', { name: 'Run tool' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Structured Data Formatter')
    await expect(page.getByRole('heading', { name: 'Result ready' })).toBeVisible()
    await expect(page.locator('.result-output')).toContainText('"a": 1')
    await expect(page.getByRole('button', { name: 'Copy result' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Download .txt' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Related tools' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Base64 Converter/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Commercial features gated' })).toBeVisible()
    await expect(page.getByText('Private snippet history')).toBeVisible()
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6)
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
      localStorageLength: window.localStorage.length,
      sessionStorageLength: window.sessionStorage.length,
    }))

    expect(analytics.localEvents).toHaveLength(2)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'tool_started',
      siteSlug: 'devutility-lab',
      routePath: '/en/tools/structured-data-formatter',
      properties: {
        tool_slug: 'structured-data-formatter',
      },
    })
    expect(analytics.localEvents?.[1]).toMatchObject({
      name: 'tool_completed',
      properties: {
        tool_slug: 'structured-data-formatter',
      },
    })
    expect(JSON.stringify(analytics.localEvents)).not.toContain('"b":2')
    expect(JSON.stringify(analytics.dataLayer)).not.toContain('"a":1')
    expect(analytics.localStorageLength).toBe(0)
    expect(analytics.sessionStorageLength).toBe(0)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('devutility-json-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders localized timestamp and privacy pages on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/tools/timestamp-converter')

    await expect(page).toHaveTitle(/Timestamp Converter/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Timestamp Converter')
    await expect(page.getByLabel('Timestamp or date')).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expectNoHorizontalOverflow(page)

    await page.goto('/en/privacy')
    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByText('Data minimization')).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('devutility-privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
