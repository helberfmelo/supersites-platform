import {
  createAnalyticsEvent,
  createDataLayerEvent,
  type AnalyticsEvent,
} from '@supersites/analytics'
import type { LocaleCode } from '../data/locales'
import type { TimeToolSlug } from '../data/tools'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    supersitesAnalyticsEvents?: AnalyticsEvent[]
  }
}

export interface TimeNexusAnalyticsInput {
  toolSlug: TimeToolSlug
  locale: LocaleCode
  routePath: string
}

export function createTimeNexusToolEvent(
  input: TimeNexusAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed',
): AnalyticsEvent {
  return createAnalyticsEvent({
    name,
    siteSlug: 'timenexus',
    locale: input.locale,
    routePath: input.routePath,
    surface: 'tool_page',
    properties: {
      tool_slug: input.toolSlug,
    },
  })
}

export function pushTimeNexusAnalyticsEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  window.supersitesAnalyticsEvents = window.supersitesAnalyticsEvents ?? []
  window.dataLayer = window.dataLayer ?? []

  window.supersitesAnalyticsEvents.push(event)
  window.dataLayer.push(createDataLayerEvent(event))

  return true
}

export function trackTimeNexusEvent(
  input: TimeNexusAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed',
): boolean {
  return pushTimeNexusAnalyticsEvent(createTimeNexusToolEvent(input, name))
}
