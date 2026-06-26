import {
  createAnalyticsEvent,
  createDataLayerEvent,
  type AnalyticsEvent,
} from '@supersites/analytics'
import type { LocaleCode } from '../data/locales'
import type { ToolSlug } from '../data/tools'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    supersitesAnalyticsEvents?: AnalyticsEvent[]
  }
}

export interface ToolAnalyticsInput {
  toolSlug: ToolSlug
  locale: LocaleCode
  routePath: string
}

export function createNetProbeToolEvent(input: ToolAnalyticsInput, name: 'tool_viewed' | 'tool_started'): AnalyticsEvent {
  return createAnalyticsEvent({
    name,
    siteSlug: 'netprobe-atlas',
    locale: input.locale,
    routePath: input.routePath,
    surface: 'tool_page',
    properties: {
      tool_slug: input.toolSlug,
    },
  })
}

export function pushNetProbeAnalyticsEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  window.supersitesAnalyticsEvents = window.supersitesAnalyticsEvents ?? []
  window.dataLayer = window.dataLayer ?? []

  window.supersitesAnalyticsEvents.push(event)
  window.dataLayer.push(createDataLayerEvent(event))

  return true
}

export function trackToolStarted(input: ToolAnalyticsInput): boolean {
  return pushNetProbeAnalyticsEvent(createNetProbeToolEvent(input, 'tool_started'))
}
