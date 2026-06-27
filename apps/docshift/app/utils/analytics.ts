import {
  createAnalyticsEvent,
  createDataLayerEvent,
  type AnalyticsEvent,
} from '@supersites/analytics'
import type { LocaleCode } from '../data/locales'
import type { DocShiftToolSlug } from '../data/tools'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    supersitesAnalyticsEvents?: AnalyticsEvent[]
  }
}

export interface DocShiftAnalyticsInput {
  toolSlug: DocShiftToolSlug
  locale: LocaleCode
  routePath: string
}

export function createDocShiftToolEvent(
  input: DocShiftAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed' | 'file_processed' | 'file_downloaded',
): AnalyticsEvent {
  return createAnalyticsEvent({
    name,
    siteSlug: 'docshift',
    locale: input.locale,
    routePath: input.routePath,
    surface: 'tool_page',
    properties: {
      tool_slug: input.toolSlug,
    },
  })
}

export function pushDocShiftAnalyticsEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  window.supersitesAnalyticsEvents = window.supersitesAnalyticsEvents ?? []
  window.dataLayer = window.dataLayer ?? []

  window.supersitesAnalyticsEvents.push(event)
  window.dataLayer.push(createDataLayerEvent(event))

  return true
}

export function trackDocShiftEvent(
  input: DocShiftAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed' | 'file_processed' | 'file_downloaded',
): boolean {
  return pushDocShiftAnalyticsEvent(createDocShiftToolEvent(input, name))
}
