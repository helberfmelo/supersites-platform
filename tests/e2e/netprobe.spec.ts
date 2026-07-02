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
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Check IP, DNS and domain signals')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/en',
    )
    await expect(page.getByPlaceholder('Enter a domain, hostname or IP')).toBeVisible()
    await expect(page.getByRole('link', { name: 'What is my IP' }).first()).toBeVisible()
    await expect(page.getByLabel('Run a network check').getByRole('heading', { name: 'DNS Lookup' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'DNS Lookup by type' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Support the free diagnostics' })).toBeVisible()
    await expect(page.locator('main')).not.toContainText(/Launch status|Advertising not active|API live|release checks|Upgrade path|Free results first|PayPal|Stripe|PIX/i)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized home page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Verifique sinais de IP')
    await expect(page.getByPlaceholder('Digite um domínio, hostname ou IP')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Consulta DNS por tipo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Apoie os diagnósticos gratuitos' })).toBeVisible()
    await expect(page.locator('main')).not.toContainText(/Launch status|Tool finder|Advertising not active|API live|release checks|Upgrade path|Free results first|PayPal|Stripe|PIX/i)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-home-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the DNS tool page and records sanitized preview analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/netprobe\/dns$/, async (route) => {
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
    await expect(page.getByRole('heading', { name: 'FAQ' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/en/tools/dns-lookup',
    )
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6)
    await expectNoHorizontalOverflow(page)

    const jsonLdTypes = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.map((script) => {
      const text = (script.textContent ?? '').trim()
      if (!text) {
        return null
      }

      const payload = JSON.parse(text) as { '@type'?: string }

      return payload['@type']
    }).filter(Boolean))
    expect(jsonLdTypes).toEqual(expect.arrayContaining(['WebApplication', 'FAQPage']))

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

  test('renders the IP answer with benchmark summary cards', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/netprobe\/ip$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            address: '203.0.113.42',
            version: 'IPv4',
            is_public: true,
            source: 'api-edge',
          },
          meta: {
            generated_at: '2026-06-26T00:00:00.000Z',
            retention: 'The full observed IP is returned to this browser response and is not stored in analytics events.',
          },
        }),
      })
    })

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/tools/what-is-my-ip')

    await expect(page.getByRole('heading', { name: 'Your public IP is' })).toBeVisible()
    await expect(page.locator('.ip-address-value')).toHaveText('203.0.113.42')
    await expect(page.getByLabel('IP answer summary').getByText('203.0.113.42')).toBeVisible()
    await expect(page.getByText('Visible address', { exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Copy IP' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Show details' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Run IP check' })).toHaveCount(0)
    await page.getByRole('button', { name: 'Show details' }).click()
    await expect(page.getByText('ISP / ASN')).toBeVisible()
    await expect(page.getByText('Reverse DNS')).toBeVisible()
    await expect(page.getByText('Approximate map')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Review privacy options' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Open privacy notes' })).toBeVisible()
    await expect(page.getByText('Methodology, privacy and limits')).toBeVisible()
    await expect(page.locator('main')).not.toContainText(/AdSense|Public API live|release checks|Run IP check/i)
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
    }))

    expect(JSON.stringify(analytics)).not.toContain('203.0.113.42')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-ip-summary-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders a localized Portuguese tool page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/tools/dns-lookup')

    await expect(page).toHaveTitle(/Consulta DNS/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Consulta DNS')
    await expect(page.locator('legend').filter({ hasText: 'Tipos de registro' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Guia e interpretação' })).toBeVisible()
    await expect(page.getByText('Como interpretar o resultado')).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/pt-br/tools/dns-lookup',
    )
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-dns-pt-br-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the RDAP tool page with sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/netprobe\/rdap$/, async (route) => {
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
    await expect(page.getByText('a.iana-servers.net', { exact: true })).toBeVisible()
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

    await page.route(/.*\/api\/v1\/netprobe\/ssl$/, async (route) => {
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

  test('renders propagation, port and reachability bounded diagnostics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/netprobe\/propagation$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            domain: 'example.com',
            record_type: 'NS',
            checked_addresses: ['93.184.216.34'],
            snapshots: [{
              resolver_id: 'system-resolver',
              region: 'local-runtime',
              status: 'answered',
              ttl_min: 300,
              values: ['a.iana-servers.net', 'b.iana-servers.net'],
            }],
          },
          meta: {
            generated_at: '2026-06-26T00:00:00.000Z',
            cache_ttl_seconds: 120,
            cached: false,
            warnings: ['Sprint 2.4 uses the local system resolver as the first controlled propagation probe.'],
          },
        }),
      })
    })

    await page.route(/.*\/api\/v1\/netprobe\/port$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            hostname: 'example.com',
            port: 443,
            checked_addresses: ['93.184.216.34'],
            checks: [{ address: '93.184.216.34', status: 'open', latency_ms: 42, error: null }],
            overall_status: 'open',
          },
          meta: {
            generated_at: '2026-06-26T00:00:00.000Z',
            cache_ttl_seconds: 60,
            cached: false,
            allowed_ports: [80, 443, 587, 993],
            warnings: ['Port checks are limited to an allowlist.'],
          },
        }),
      })
    })

    await page.route(/.*\/api\/v1\/netprobe\/reachability$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            hostname: 'example.com',
            checked_addresses: ['93.184.216.34'],
            tcp_443: { address: '93.184.216.34', status: 'open', latency_ms: 33, error: null },
            icmp: { status: 'not_supported', reason: 'ICMP ping is disabled in the initial web runtime probe.' },
            traceroute: { status: 'not_supported', reason: 'Traceroute requires controlled probe infrastructure.' },
          },
          meta: {
            generated_at: '2026-06-26T00:00:00.000Z',
            cache_ttl_seconds: 60,
            cached: false,
            warnings: ['Sprint 2.4 reports bounded TCP reachability first.'],
          },
        }),
      })
    })

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/tools/dns-propagation')
    await page.getByLabel('Domain name').fill('secret-propagation.example')
    await page.getByRole('tab', { name: 'NS' }).click()
    await page.getByLabel('Expected value (optional)').fill('a.iana-servers.net')
    await page.getByRole('button', { name: 'Run propagation check' }).click()
    await expect(page.getByText('Expected-value match')).toBeVisible()
    await expect(page.getByText('1/1 (100%)')).toBeVisible()
    await expect(page.getByRole('tab', { name: 'NS' })).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByText('Coverage disclosure')).toBeVisible()
    await expect(page.getByText('Resolver coverage map')).toBeVisible()
    await expect(page.getByText('Resolver and locality list')).toBeVisible()
    await expect(page.getByText('system-resolver', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('a.iana-servers.net', { exact: true }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Copy safe summary' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Private by design' })).toBeVisible()
    await expectNoHorizontalOverflow(page)
    expect(JSON.stringify(await page.evaluate(() => window.supersitesAnalyticsEvents))).not.toContain('secret-propagation.example')

    await page.goto('/en/tools/port-checker')
    await page.getByLabel('Hostname').fill('secret-port.example')
    await page.locator('#port-checker-port').selectOption('443')
    await page.getByRole('button', { name: 'Run port check' }).click()
    await expect(page.getByText('open').first()).toBeVisible()
    await expect(page.getByText('42 ms')).toBeVisible()
    await expectNoHorizontalOverflow(page)
    expect(JSON.stringify(await page.evaluate(() => window.supersitesAnalyticsEvents))).not.toContain('secret-port.example')

    await page.goto('/en/tools/ping-traceroute')
    await page.getByLabel('Hostname').fill('secret-reachability.example')
    await page.getByRole('button', { name: 'Run reachability check' }).click()
    await expect(page.getByText('TCP 443', { exact: true })).toBeVisible()
    await expect(page.getByText('33 ms')).toBeVisible()
    await expect(page.getByText(/Traceroute: not_supported/)).toBeVisible()
    await expectNoHorizontalOverflow(page)
    expect(JSON.stringify(await page.evaluate(() => window.supersitesAnalyticsEvents))).not.toContain('secret-reachability.example')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-reachability-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the privacy page on mobile', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/privacy')

    await expect(page).toHaveTitle(/NetProbe Atlas privacy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('NetProbe Atlas privacy')
    await expect(page.getByRole('heading', { name: 'Data used by the tool' })).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Status' })).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'SuperSites home' })).toBeVisible()
    await expect(page.locator('.page-footer a')).toHaveCount(10)
    await expectNoHorizontalOverflow(page)

    expect(errors).toEqual([])
  })
})
