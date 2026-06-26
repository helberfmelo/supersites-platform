import { describe, expect, it } from 'vitest'
import {
  analyticsEventNames,
  createAnalyticsEvent,
  createDataLayerEvent,
  createOutboundSiteClickEvent,
  isAnalyticsEventName,
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
})
