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

test.describe('QRRoute MVP', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/QRRoute/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('QR, barcode and campaign link builders')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/qrroute/en',
    )
    await expect(page.getByRole('heading', { name: 'Build a QR, barcode, UTM, vCard or Wi-Fi code in one local workspace.' })).toBeVisible()
    await expect(page.getByText('Private by design')).toBeVisible()
    await expect(page.getByRole('tab', { name: /Static QR/ })).toHaveAttribute('aria-selected', 'true')
    await page.getByLabel('URL, text, email or phone value').fill('https://opentshost.com/supersites/qrroute/en')
    await page.getByRole('button', { name: 'Generate preview' }).click()
    await expect(page.locator('.preview-panel--dominant .preview-frame img')).toHaveAttribute('src', /^data:image\/svg\+xml/)
    await expect(page.getByRole('heading', { name: 'Static QR Code Generator' }).first()).toBeVisible()
    await expect(page.getByText('6 local workflow tools')).toBeVisible()
    await expect(page.getByText('Free result').first()).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('qrroute-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('builds a UTM QR preview and records sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1050 })
    await page.goto('/en/tools/utm-builder?url=https://secret.example/path')

    await page.getByLabel('Base campaign URL').fill('https://example.com/pricing')
    await page.getByLabel(/UTM fields/).fill('source=newsletter\nmedium=email\ncampaign=summer-launch')
    await page.getByRole('button', { name: 'Generate preview' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('UTM Builder')
    await expect(page.getByRole('heading', { name: 'Final payload' })).toBeVisible()
    await expect(page.locator('.payload-value')).toContainText('Campaign URL:')
    await expect(page.locator('.result-output')).toContainText('utm_source=newsletter')
    await expect(page.locator('.preview-frame img')).toHaveAttribute('src', /^data:image\/svg\+xml/)
    await expect(page.getByRole('link', { name: 'Download SVG' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Copy payload' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Static vs dynamic' })).toBeVisible()
    await expect(page.getByText('Dynamic QR editing')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Related tools' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Static QR Code Generator/ })).toBeVisible()
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
      siteSlug: 'qrroute',
      routePath: '/en/tools/utm-builder',
      properties: {
        tool_slug: 'utm-builder',
      },
    })
    expect(analytics.localEvents?.[1]).toMatchObject({
      name: 'tool_started',
      properties: {
        tool_slug: 'utm-builder',
      },
    })
    expect(analytics.localEvents?.[2]).toMatchObject({
      name: 'tool_completed',
      properties: {
        tool_slug: 'utm-builder',
      },
    })
    expect(JSON.stringify(analytics.localEvents)).not.toContain('example.com/pricing')
    expect(JSON.stringify(analytics.dataLayer)).not.toContain('secret.example')
    expect(analytics.localStorageLength).toBe(0)
    expect(analytics.sessionStorageLength).toBe(0)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('qrroute-utm-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders localized Wi-Fi and privacy pages on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1050 })
    await page.goto('/pt-br/tools/wifi-qr')

    await expect(page).toHaveTitle(/Construtor de QR Wi-Fi/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Construtor de QR Wi-Fi')
    await expect(page.getByLabel('Network SSID')).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expectNoHorizontalOverflow(page)

    await page.goto('/en/privacy')
    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByText('Data minimization')).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('qrroute-privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
