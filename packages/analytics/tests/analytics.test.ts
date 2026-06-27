import { describe, expect, it } from 'vitest'
import {
  analyticsEventNames,
  buildSearchConsolePropertyPlan,
  createAnalyticsEvent,
  createDataLayerEvent,
  createGoogleDataLayerEvent,
  createGoogleEventParameters,
  createOutboundSiteClickEvent,
  googleAnalyticsEventNames,
  isAnalyticsEventName,
  resolveGoogleIntegrationGate,
  sanitizeAnalyticsPath,
  sanitizeAnalyticsProperties,
} from '../src'

describe('@supersites/analytics', () => {
  it('keeps the required public event contract explicit', () => {
    expect(analyticsEventNames).toContain('tool_viewed')
    expect(analyticsEventNames).toContain('tool_started')
    expect(analyticsEventNames).toContain('tool_completed')
    expect(analyticsEventNames).toContain('outbound_site_click')
    expect(isAnalyticsEventName('tool_failed')).toBe(true)
    expect(isAnalyticsEventName('email_collected')).toBe(false)
  })

  it('strips query strings and fragments from paths and URLs', () => {
    expect(sanitizeAnalyticsPath('https://example.test/en/tool?email=user@example.test#result')).toBe('/en/tool')
    expect(sanitizeAnalyticsPath('/pt-br/sites/netprobe-atlas?token=abc')).toBe('/pt-br/sites/netprobe-atlas')
  })

  it('drops sensitive keys and redacts sensitive values', () => {
    const properties = sanitizeAnalyticsProperties({
      result_count: 3,
      email: 'person@example.test',
      api_key: 'secret',
      copied_value: 'contact me at person@example.test from 192.168.0.10',
      target_url: 'https://opentshost.com/supersites/netprobe-atlas/?token=abc#frag',
      nested: { unsafe: true },
    })

    expect(properties).toEqual({
      result_count: 3,
      copied_value: 'contact me at [redacted-email] from [redacted-ip]',
      target_url: '/supersites/netprobe-atlas',
    })
  })

  it('creates an outbound click event without leaking target query parameters', () => {
    const event = createOutboundSiteClickEvent({
      siteSlug: 'NetProbe Atlas',
      targetUrl: 'https://opentshost.com/supersites/netprobe-atlas/?session_id=abc',
      locale: 'pt-BR',
      routePath: '/pt-br?utm_source=test',
      surface: 'catalog_card',
    })

    expect(event.name).toBe('outbound_site_click')
    expect(event.siteSlug).toBe('netprobe-atlas')
    expect(event.locale).toBe('pt-br')
    expect(event.routePath).toBe('/pt-br')
    expect(event.properties.target_url).toBe('/supersites/netprobe-atlas')
  })

  it('builds a data layer payload from sanitized events', () => {
    const event = createAnalyticsEvent({
      name: 'tool_completed',
      siteSlug: 'devutility-lab',
      occurredAt: '2026-06-26T00:00:00.000Z',
      properties: {
        tool_slug: 'json-formatter',
        user_email: 'person@example.test',
      },
    })

    expect(createDataLayerEvent(event)).toEqual({
      event: 'tool_completed',
      supersites_event: {
        contract_version: '2026-06-26.1',
        site_slug: 'devutility-lab',
        source: 'client',
        locale: null,
        route_path: null,
        surface: null,
        occurred_at: '2026-06-26T00:00:00.000Z',
        properties: {
          tool_slug: 'json-formatter',
        },
      },
    })
  })

  it('keeps every standard event mapped to a GA4-compatible event name', () => {
    for (const eventName of analyticsEventNames) {
      expect(googleAnalyticsEventNames[eventName]).toMatch(/^[a-z][a-z0-9_]{0,39}$/)
    }
  })

  it('fails Google tag delivery closed until human, consent and ids are present', () => {
    expect(resolveGoogleIntegrationGate({
      environment: 'production',
      humanApproved: false,
      hasAnalyticsConsent: true,
      tagsEnabled: true,
      ga4MeasurementId: 'G-TEST1234',
      gtmContainerId: 'GTM-TEST123',
      searchConsoleVerified: true,
    })).toMatchObject({
      shouldLoadGa4: false,
      shouldLoadGtm: false,
      shouldImportSearchConsole: false,
      status: 'human_required',
    })

    expect(resolveGoogleIntegrationGate({
      environment: 'production',
      humanApproved: true,
      hasAnalyticsConsent: true,
      tagsEnabled: true,
      dataImportEnabled: true,
      ga4MeasurementId: 'G-TEST1234',
      gtmContainerId: 'GTM-TEST123',
      searchConsoleVerified: true,
    })).toMatchObject({
      shouldLoadGa4: true,
      shouldLoadGtm: true,
      shouldImportSearchConsole: true,
      status: 'configured',
    })
  })

  it('creates Google data layer payloads only after the delivery gate allows tags', () => {
    const event = createAnalyticsEvent({
      name: 'tool_started',
      siteSlug: 'mailhealth',
      locale: 'en',
      routePath: '/en/tools/spf-checker?domain=example.com',
      properties: {
        tool_slug: 'spf-checker',
        domain: 'private.example',
        raw_url: 'https://example.test/path?email=person@example.test',
      },
    })

    expect(createGoogleDataLayerEvent(event, { shouldLoadGa4: false, shouldLoadGtm: false })).toBeNull()
    expect(createGoogleEventParameters(event)).toEqual({
      supersites_event_name: 'tool_started',
      site_slug: 'mailhealth',
      locale: 'en',
      route_path: '/en/tools/spf-checker',
      tool_slug: 'spf-checker',
    })
    expect(createGoogleDataLayerEvent(event, { shouldLoadGa4: true, shouldLoadGtm: true })).toMatchObject({
      event: 'tool_started',
      supersites_google_event: {
        site_slug: 'mailhealth',
      },
    })
  })

  it('plans Search Console properties without creating verification tokens', () => {
    expect(buildSearchConsolePropertyPlan({
      siteSlug: 'NetProbe Atlas',
      domain: 'netprobe.example',
      humanApproved: false,
      verified: false,
    })).toEqual({
      siteSlug: 'netprobe-atlas',
      property: 'sc-domain:netprobe.example',
      verificationStatus: 'human_required',
      reason: 'Search Console ownership verification requires approved Google access.',
    })

    expect(buildSearchConsolePropertyPlan({
      siteSlug: 'supersite',
    }).verificationStatus).toBe('missing_property')

    expect(buildSearchConsolePropertyPlan({
      siteSlug: 'SitePulse Lab',
      urlPrefix: 'https://sitepulse.example/tools/?token=secret#verify',
      humanApproved: true,
      verified: true,
    })).toEqual({
      siteSlug: 'sitepulse-lab',
      property: 'https://sitepulse.example/tools/',
      verificationStatus: 'verified',
      reason: 'Search Console property is verified and eligible for data import.',
    })
  })
})
