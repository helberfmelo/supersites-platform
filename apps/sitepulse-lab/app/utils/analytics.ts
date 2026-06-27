import {
  createAnalyticsEvent,
  createDataLayerEvent,
  type AnalyticsEvent,
  type AnalyticsEventName,
} from '@supersites/analytics'
import { siteBaseUrl } from '../data/routes'
import type { ToolSlug } from '../data/tools'

type ToolEventName = Extract<AnalyticsEventName, 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed'>

export interface SitePulseToolEventInput {
  toolSlug: ToolSlug
  locale: string
  routePath: string
}

function normalizeRoutePath(routePath: string): string {
  const base = new URL(siteBaseUrl)
  const url = new URL(routePath, base)

  return url.pathname.replace(/^\/supersites\/sitepulse-lab/, '') || '/'
}

export function createSitePulseToolEvent(
  input: SitePulseToolEventInput,
  name: ToolEventName = 'tool_started',
): AnalyticsEvent {
  return createAnalyticsEvent({
    name,
    siteSlug: 'sitepulse-lab',
    locale: input.locale,
    routePath: normalizeRoutePath(input.routePath),
    surface: 'tool_page',
    properties: {
      tool_slug: input.toolSlug,
    },
  })
}

export function pushSitePulseAnalyticsEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  window.supersitesAnalyticsEvents = window.supersitesAnalyticsEvents ?? []
  window.dataLayer = window.dataLayer ?? []
  window.supersitesAnalyticsEvents.push(event)
  window.dataLayer.push(createDataLayerEvent(event))

  return true
}

export function trackSitePulseEvent(
  input: SitePulseToolEventInput,
  name: ToolEventName = 'tool_started',
): boolean {
  return pushSitePulseAnalyticsEvent(createSitePulseToolEvent(input, name))
}
