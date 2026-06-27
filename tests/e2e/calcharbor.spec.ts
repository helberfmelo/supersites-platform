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

test.describe('CalcHarbor MVP', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/CalcHarbor/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Financial calculators')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/calcharbor/en',
    )
    await expect(page.getByRole('heading', { name: 'Loan Payment Calculator' })).toBeVisible()
    await expect(page.getByText('No ads or billing')).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('calcharbor-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('calculates a loan payment and records sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/calculators/loan-payment')

    await page.getByLabel('Loan amount').fill('25000')
    await page.getByLabel('Annual interest rate').fill('8.5')
    await page.getByLabel('Term in years').fill('5')
    await page.getByRole('button', { name: 'Calculate' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Loan Payment Calculator')
    await expect(page.locator('.primary-result').filter({ hasText: 'Monthly payment' })).toBeVisible()
    await expect(page.locator('.primary-result strong')).toContainText('$512.')
    await expect(page.locator('code').filter({ hasText: 'M = P x r x (1 + r)^n / ((1 + r)^n - 1)' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Calculation memory' })).toBeVisible()
    await expect(page.getByText('Formula used')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Related calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Workflow upgrades gated' })).toBeVisible()
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6)
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
    }))

    expect(analytics.localEvents).toHaveLength(2)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'tool_started',
      siteSlug: 'calcharbor',
      routePath: '/en/calculators/loan-payment',
      properties: {
        tool_slug: 'loan-payment',
      },
    })
    expect(analytics.localEvents?.[1]).toMatchObject({
      name: 'tool_completed',
      properties: {
        tool_slug: 'loan-payment',
      },
    })
    expect(JSON.stringify(analytics)).not.toContain('25000')
    expect(JSON.stringify(analytics)).not.toContain('8.5')
    expect(JSON.stringify(analytics)).not.toContain('$512')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('calcharbor-loan-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders a localized ROI calculator and policy page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/calculators/roi')

    await expect(page).toHaveTitle(/Calculadora de ROI/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Calculadora de ROI')
    await expect(page.getByLabel('Valor de retorno')).toBeVisible()
    await expect(page.locator('code').filter({ hasText: 'ROI = (valor de retorno - custo do investimento) / custo do investimento' })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expectNoHorizontalOverflow(page)

    await page.goto('/en/privacy')
    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByText('Data minimization')).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('calcharbor-privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
