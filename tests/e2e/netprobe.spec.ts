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

test.describe('NetProbe Atlas public foundation', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/NetProbe Atlas/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Network facts')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/en',
    )
    await expect(page.getByRole('heading', { name: 'DNS Lookup' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the DNS tool page and records sanitized preview analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route('http://127.0.0.1:8013/api/v1/netprobe/dns', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            domain: 'example.com',
            queried_types: ['A', 'MX'],
            checked_addresses: ['93.184.216.34'],
            records: {
              A: [{ type: 'A', ttl: 120, value: '93.184.216.34', fields: { ip: '93.184.216.34' } }],
              MX: [{ type: 'MX', ttl: 180, value: '10 mail.example.com', fields: { priority: 10, target: 'mail.example.com' } }],
            },
          },
          meta: {
            generated_at: '2026-06-26T00:00:00.000Z',
            cache_ttl_seconds: 120,
            cached: false,
            warnings: [],
          },
        }),
      })
    })

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/tools/dns-lookup')
    await page.getByLabel('Domain name').fill('secret.example')
    await page.getByRole('checkbox', { name: 'AAAA' }).uncheck()
    await page.getByRole('checkbox', { name: 'CNAME' }).uncheck()
    await page.getByRole('checkbox', { name: 'TXT' }).uncheck()
    await page.getByRole('checkbox', { name: 'NS' }).uncheck()
    await page.getByRole('checkbox', { name: 'SOA' }).uncheck()
    await page.getByRole('checkbox', { name: 'CAA' }).uncheck()
    await page.getByRole('button', { name: 'Run DNS lookup' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('DNS Lookup')
    await expect(page.getByText('93.184.216.34').first()).toBeVisible()
    await expect(page.getByText('10 mail.example.com')).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/en/tools/dns-lookup',
    )
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
    }))

    expect(analytics.localEvents).toHaveLength(1)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'tool_started',
      siteSlug: 'netprobe-atlas',
      routePath: '/en/tools/dns-lookup',
      properties: {
        tool_slug: 'dns-lookup',
      },
    })
    expect(JSON.stringify(analytics)).not.toContain('secret.example')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-dns-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the RDAP tool page with sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route('http://127.0.0.1:8013/api/v1/netprobe/rdap', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            domain: 'example.com',
            handle: '2336799_DOMAIN_COM-VRSN',
            registrar: { name: 'Example Registrar, Inc.', handle: '292' },
            statuses: ['client transfer prohibited'],
            registered_at: '1995-08-14T04:00:00.000000Z',
            updated_at: '2025-08-14T10:00:00.000000Z',
            expires_at: '2026-08-13T04:00:00.000000Z',
            age_days: 11273,
            days_until_expiration: 48,
            nameservers: ['a.iana-servers.net', 'b.iana-servers.net'],
            limitations: ['Terms of Use Public RDAP data is rate limited.'],
          },
          meta: {
            generated_at: '2026-06-26T00:00:00.000Z',
            cache_ttl_seconds: 21600,
            cached: false,
            warnings: ['Personal contact data is omitted from NetProbe RDAP summaries.'],
          },
        }),
      })
    })

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/tools/rdap-domain-lookup')
    await page.getByLabel('Domain name').fill('secret-rdap.example')
    await page.getByRole('button', { name: 'Run RDAP lookup' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('RDAP Domain Lookup')
    await expect(page.getByText('Example Registrar, Inc.')).toBeVisible()
    await expect(page.getByText('a.iana-servers.net')).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
    }))

    expect(analytics.localEvents).toHaveLength(1)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'tool_started',
      properties: {
        tool_slug: 'rdap-domain-lookup',
      },
    })
    expect(JSON.stringify(analytics)).not.toContain('secret-rdap.example')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-rdap-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the SSL tool page with bounded probe facts', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route('http://127.0.0.1:8013/api/v1/netprobe/ssl', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            hostname: 'example.com',
            checked_addresses: ['93.184.216.34'],
            subject: { common_name: 'example.com', organization: 'Example Org' },
            issuer: { common_name: 'Example CA', organization: 'Example Trust' },
            serial_number: 'ABC123',
            valid_from: '2026-01-01T00:00:00.000000Z',
            valid_to: '2026-07-26T00:00:00.000000Z',
            days_until_expiration: 30,
            is_expired: false,
            matches_hostname: true,
            subject_alt_names: ['example.com', 'www.example.com'],
            chain_count: 2,
            fingerprint_sha256: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          },
          meta: {
            generated_at: '2026-06-26T00:00:00.000Z',
            cache_ttl_seconds: 600,
            cached: false,
            warnings: ['Certificate chain validation is informational in this sprint.'],
            limitations: ['TLS is checked on port 443 only.'],
          },
        }),
      })
    })

    await page.goto('/en/tools/ssl-certificate-checker')
    await page.getByLabel('Hostname').fill('secret-ssl.example')
    await page.getByRole('button', { name: 'Run SSL check' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('SSL Certificate Checker')
    await expect(page.getByText('Example CA')).toBeVisible()
    await expect(page.getByText('www.example.com')).toBeVisible()
    await expect(page.getByText('2 certificate chain entries returned.')).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
    }))

    expect(analytics.localEvents).toHaveLength(1)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'tool_started',
      properties: {
        tool_slug: 'ssl-certificate-checker',
      },
    })
    expect(JSON.stringify(analytics)).not.toContain('secret-ssl.example')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-ssl-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the privacy page on mobile', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/privacy')

    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy Policy')
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expect(page.locator('.page-footer a')).toHaveCount(8)
    await expectNoHorizontalOverflow(page)

    expect(errors).toEqual([])
  })
})
