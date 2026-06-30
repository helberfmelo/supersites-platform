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

async function dismissConsentBanner(page: Page) {
  const button = page.getByRole('button', {
    name: /Essential only|Somente essenciais|Solo esenciales|Essentiels seulement|Nur notwendige/i,
  })

  if (await button.isVisible().catch(() => false)) {
    await button.click()
  }
}

test.describe('SuperSites public hub', () => {
  test('renders the localized privacy page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/privacy')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/SuperSites/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacidade')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/privacy',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('.page-footer__links--legal a')).toHaveCount(8)
    await expect(page.getByLabel(/Páginas legais e editoriais/).getByRole('link', { name: 'Status' })).toBeVisible()
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the editorial policy page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/editorial-policy')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Editorial Policy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Editorial Policy')
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Privacy' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/editorial-policy',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('.footer-verticals').getByRole('link', { name: 'JSON Formatter' })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/devutility-lab/en/tools/structured-data-formatter',
    )
    await expect(page.locator('.footer-verticals').getByRole('link', { name: 'PDF Merge' })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/docshift/en/tools/pdf-merge',
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('editorial-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the benchmark-grade tool finder and records sanitized outbound site clicks', async ({
    page,
  }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')
    await dismissConsentBanner(page)
    await expect(page.getByRole('heading', { name: 'Find the right web tool in seconds.' })).toBeVisible()
    await expect(page.getByRole('search', { name: 'Search the catalog' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Free tools ready to use' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose by workflow' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Explore focused tool suites' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Support the free network' })).toBeVisible()
    await expect(page.locator('.trust-row').getByText('No account required')).toBeVisible()
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(3)
    await expect(page.locator('.tool-shortcut-card[href="https://opentshost.com/supersites/netprobe-atlas/en/tools/what-is-my-ip"]')).toBeVisible()
    await expect(page.locator('.footer-verticals a[href="https://opentshost.com/supersites/docshift/en/tools/pdf-merge"]')).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Available')
    await expect(page.locator('main')).not.toContainText('Preview')
    await expect(page.locator('main')).not.toContainText('Upgrade path')
    await expect(page.locator('main')).not.toContainText('10 utility sites live')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('hub-tool-finder-desktop', { body: screenshot, contentType: 'image/png' })

    await page.evaluate(() => {
      window.addEventListener('click', (event) => event.preventDefault(), { capture: true })
    })

    await page.locator('a[href="https://opentshost.com/supersites/netprobe-atlas/"]').first().click()

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
    }))

    expect(analytics.localEvents).toHaveLength(1)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'outbound_site_click',
      siteSlug: 'netprobe-atlas',
      routePath: '/en',
      properties: {
        target_url: '/supersites/netprobe-atlas',
      },
    })
    expect(analytics.dataLayer?.find((entry) => entry.event === 'outbound_site_click')).toMatchObject({
      event: 'outbound_site_click',
    })
    expect(JSON.stringify(analytics)).not.toContain('?')
    expect(errors).toEqual([])
  })

  test('renders the benchmark-grade tool finder in Portuguese on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Encontre a ferramenta certa em segundos.' })).toBeVisible()
    await expect(page.getByRole('search', { name: 'Buscar no catálogo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Ferramentas gratuitas prontas para uso' })).toBeVisible()
    await expect(page.locator('.trust-row').getByText('Sem cadastro obrigatório')).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Available')
    await expect(page.locator('main')).not.toContainText('Preview')
    await expect(page.locator('main')).not.toContainText('Upgrade path')
    await expect(page.locator('main')).not.toContainText('Search the catalog')
    await expect(page.locator('main')).not.toContainText('Public API live')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('hub-tool-finder-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders CMP controls and inert ad placeholders without external ad scripts', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    const banner = page.getByTestId('consent-banner')
    const adSlot = page.getByTestId('ad-placeholder-hub-home-footer-leaderboard')

    await expect(banner).toBeVisible()
    await expect(adSlot).toBeVisible()
    await expect(adSlot).toHaveAttribute('data-ad-status', 'blocked-consent')

    const reservedBox = await adSlot.boundingBox()
    expect(reservedBox?.height).toBeGreaterThanOrEqual(100)

    await page.getByRole('button', { name: 'Customize' }).click()
    await page.getByLabel('Analytics storage').check()
    await page.getByLabel('Advertising storage').check()
    await page.getByRole('button', { name: 'Save choices' }).click()

    await expect(banner).toBeHidden()
    await expect(adSlot).toHaveAttribute('data-ad-status', 'delivery-disabled')

    const consent = await page.evaluate(() => ({
      stored: window.localStorage.getItem('supersites.consent.v1'),
      dataLayer: window.dataLayer,
    }))

    expect(consent.stored).toContain('"analytics":true')
    expect(consent.stored).toContain('"ads":true')
    expect(consent.dataLayer?.some((entry) => entry.event === 'supersites_consent_update')).toBe(true)
    expect(JSON.stringify(consent)).not.toContain('@')
    await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0)
    await expect(page.locator('iframe[src*="googleads"]')).toHaveCount(0)
    expect(errors).toEqual([])
  })

  test('keeps legal pages free of ad placements', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/privacy')
    await dismissConsentBanner(page)

    await expect(page.locator('[data-ad-slot-id]')).toHaveCount(0)
    await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(errors).toEqual([])
  })

  test('renders the NetProbe catalog page as a benchmark-grade network landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/netprobe-atlas')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Network diagnostics you can start now.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start a network check' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'NetProbe tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'For everyone' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'For technical teams' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'For ongoing monitoring' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'DNS Tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'IP Tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Domain Tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'SSL Tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Guides' })).toBeVisible()

    for (const path of [
      'what-is-my-ip',
      'dns-propagation',
      'dns-lookup',
      'rdap-domain-lookup',
      'ssl-certificate-checker',
      'port-checker',
      'ping-traceroute',
    ]) {
      await expect(
        page.locator(`.netprobe-tool-grid a[href="https://opentshost.com/supersites/netprobe-atlas/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await expect(page.locator('main')).not.toContainText('Review notes')
    await expect(page.locator('main')).not.toContainText('Available')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Public API live')
    await expect(page.locator('main')).not.toContainText('billing disabled')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized NetProbe catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/netprobe-atlas')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Diagnósticos de rede para começar agora.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Comece uma verificação de rede' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Ferramentas NetProbe' })).toBeVisible()
    await expect(
      page.locator('.netprobe-tool-grid a[href="https://opentshost.com/supersites/netprobe-atlas/pt-br/tools/what-is-my-ip"]'),
    ).toBeVisible()
    await expect(
      page.locator('.netprobe-tool-grid a[href="https://opentshost.com/supersites/netprobe-atlas/pt-br/tools/dns-propagation"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Network diagnostics you can start now.')
    await expect(page.locator('main')).not.toContainText('Review notes')
    await expect(page.locator('main')).not.toContainText('Available')
    await expect(page.locator('main')).not.toContainText('Public API live')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the CalcHarbor catalog page as a benchmark-grade calculator landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/calcharbor')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Find the right calculator before the spreadsheet.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Calculator finder' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Popular business calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Next calculator areas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Finance calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Business calculators', exact: true })).toBeVisible()

    for (const path of [
      'loan-payment',
      'compound-interest',
      'savings-goal',
      'break-even-point',
      'gross-margin',
      'cash-runway',
      'discount-price',
      'roi',
    ]) {
      await expect(
        page.locator(`.calcharbor-tool-grid a[href="https://opentshost.com/supersites/calcharbor/en/calculators/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search calculators' }).fill('roi')
    await expect(page.locator('#calcharbor-all .calcharbor-tool-card').filter({ hasText: 'ROI Calculator' })).toBeVisible()
    await expect(page.locator('#calcharbor-all .calcharbor-tool-card').filter({ hasText: 'Loan Payment' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('checkout inactive')
    await expect(page.locator('main')).not.toContainText('billing disabled')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('calcharbor-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized CalcHarbor catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/calcharbor')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Encontre a calculadora certa antes da planilha.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Buscador de calculadoras' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar calculadoras' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Calculadoras empresariais populares' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as calculadoras publicadas' })).toBeVisible()
    await expect(
      page.locator('.calcharbor-tool-grid a[href="https://opentshost.com/supersites/calcharbor/pt-br/calculators/loan-payment"]'),
    ).toBeVisible()
    await expect(
      page.locator('.calcharbor-tool-grid a[href="https://opentshost.com/supersites/calcharbor/pt-br/calculators/roi"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Find the right calculator before the spreadsheet.')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('calcharbor-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the DevUtility Lab catalog page as a benchmark-grade developer workbench', async ({
    page,
  }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/devutility-lab')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Format, inspect and compare code snippets locally.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Developer workbench finder' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search developer tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Pinned local shortcuts' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published developer tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Formatters', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Encoding and tokens' })).toBeVisible()

    for (const path of [
      'structured-data-formatter',
      'base64-converter',
      'jwt-inspector',
      'regex-tester',
      'text-diff',
      'cron-helper',
      'uuid-generator',
      'timestamp-converter',
      'hash-generator',
    ]) {
      await expect(
        page.locator(`.devutility-tool-grid a[href="https://opentshost.com/supersites/devutility-lab/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search developer tools' }).fill('uuid')
    await expect(page.locator('#devutility-lab-all .devutility-tool-card').filter({ hasText: 'UUID Generator' })).toBeVisible()
    await expect(page.locator('#devutility-lab-all .devutility-tool-card').filter({ hasText: 'JSON Formatter' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('checkout inactive')
    await expect(page.locator('main')).not.toContainText('billing disabled')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('devutility-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized DevUtility Lab catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/devutility-lab')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Formate, inspecione e compare snippets localmente.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Buscador de workbench dev' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas dev' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Atalhos locais fixos' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas dev publicadas' })).toBeVisible()
    await expect(
      page.locator('.devutility-tool-grid a[href="https://opentshost.com/supersites/devutility-lab/pt-br/tools/structured-data-formatter"]'),
    ).toBeVisible()
    await expect(
      page.locator('.devutility-tool-grid a[href="https://opentshost.com/supersites/devutility-lab/pt-br/tools/hash-generator"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Format, inspect and compare code snippets locally.')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('devutility-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the TimeNexus catalog page as a benchmark-grade time landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/timenexus')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Plan time across cities, dates and calendars.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Current time now' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Browse by time task' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with time planning' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published TimeNexus tools' })).toBeVisible()
    await expect(page.locator('.timenexus-shortcut-grid').getByRole('heading', { name: 'World Clock' })).toBeVisible()
    await expect(page.locator('.timenexus-shortcut-grid').getByRole('heading', { name: 'Time Zones' })).toBeVisible()
    await expect(page.locator('.timenexus-shortcut-grid').getByRole('heading', { name: 'Calendar' })).toBeVisible()
    await expect(page.locator('.timenexus-shortcut-grid').getByRole('heading', { name: 'Calculators' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search time tools' })).toBeVisible()

    for (const path of [
      'tools/timezone-converter',
      'tools/timestamp-converter',
      'tools/date-difference',
      'tools/business-days',
      'tools/age-calculator',
      'tools/percentage-calculator',
      'tools/unit-converter',
      'world-clock/americas-europe',
      'world-clock/global-product',
      'world-clock/cities/tokyo',
    ]) {
      await expect(
        page.locator(`.timenexus-tool-grid a[href="https://opentshost.com/supersites/timenexus/en/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search time tools' }).fill('timestamp')
    await expect(page.locator('#timenexus-all .timenexus-tool-card').filter({ hasText: 'Timestamp Converter' })).toBeVisible()
    await expect(page.locator('#timenexus-all .timenexus-tool-card').filter({ hasText: 'Date Difference' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('No accounts or storage')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('ads inactive')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized TimeNexus catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/timenexus')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Planeje horarios entre cidades, datas e calendarios.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Hora atual agora' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha por tarefa de tempo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas TimeNexus publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas de tempo' })).toBeVisible()
    await expect(
      page.locator('.timenexus-tool-grid a[href="https://opentshost.com/supersites/timenexus/pt-br/tools/timezone-converter"]'),
    ).toBeVisible()
    await expect(
      page.locator('.timenexus-tool-grid a[href="https://opentshost.com/supersites/timenexus/pt-br/world-clock/americas-europe"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Plan time across cities, dates and calendars.')
    await expect(page.locator('main')).not.toContainText('No accounts or storage')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the QRRoute catalog page as a benchmark-grade generator landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/qrroute')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Generate a QR code or campaign asset with a live preview.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Live static preview' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose by asset type' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with the common QRRoute jobs' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Static first, dynamic later' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published QRRoute tools' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search QRRoute tools' })).toBeVisible()
    await expect(page.locator('.qrroute-preview-art')).toBeVisible()

    for (const path of [
      'static-qr-code',
      'barcode-generator',
      'utm-builder',
      'vcard-qr',
      'wifi-qr',
      'preview-lab',
    ]) {
      await expect(
        page.locator(`.qrroute-tool-grid a[href="https://opentshost.com/supersites/qrroute/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search QRRoute tools' }).fill('wifi')
    await expect(page.locator('#qrroute-all .qrroute-tool-card').filter({ hasText: 'Wi-Fi QR Builder' })).toBeVisible()
    await expect(page.locator('#qrroute-all .qrroute-tool-card').filter({ hasText: 'UTM Builder' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('QR, barcode e links de campanha com preview local')
    await expect(page.locator('main')).not.toContainText('commercial redirects planned')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('qrroute-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized QRRoute catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/qrroute')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Gere um QR ou ativo de campanha com prévia ao vivo.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Prévia estática ao vivo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha por tipo de ativo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas QRRoute publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas QRRoute' })).toBeVisible()
    await expect(
      page.locator('.qrroute-tool-grid a[href="https://opentshost.com/supersites/qrroute/pt-br/tools/static-qr-code"]'),
    ).toBeVisible()
    await expect(
      page.locator('.qrroute-tool-grid a[href="https://opentshost.com/supersites/qrroute/pt-br/tools/wifi-qr"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Generate a QR code or campaign asset with a live preview.')
    await expect(page.locator('main')).not.toContainText('preview local')
    await expect(page.locator('main')).not.toContainText('commercial redirects planned')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('qrroute-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
