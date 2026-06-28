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
  toolSlug: ToolSlug | 'domain-report'
  locale: LocaleCode
  routePath: string
}

export function createMailHealthToolEvent(
  input: ToolAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed',
): AnalyticsEvent {
  return createAnalyticsEvent({
    name,
    siteSlug: 'mailhealth',
    locale: input.locale,
    routePath: input.routePath,
    surface: 'tool_page',
    properties: {
      tool_slug: input.toolSlug,
    },
  })
}

export function pushMailHealthAnalyticsEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  window.supersitesAnalyticsEvents = window.supersitesAnalyticsEvents ?? []
  window.dataLayer = window.dataLayer ?? []

  window.supersitesAnalyticsEvents.push(event)
  window.dataLayer.push(createDataLayerEvent(event))

  return true
}

export function trackMailHealthEvent(
  input: ToolAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed',
): boolean {
  return pushMailHealthAnalyticsEvent(createMailHealthToolEvent(input, name))
}
