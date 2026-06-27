import {
  createAnalyticsEvent,
  createDataLayerEvent,
  type AnalyticsEvent,
} from '@supersites/analytics'
import type { LocaleCode } from '../data/locales'
import type { InvoiceCraftToolSlug } from '../data/tools'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    supersitesAnalyticsEvents?: AnalyticsEvent[]
  }
}

export interface InvoiceCraftAnalyticsInput {
  toolSlug: InvoiceCraftToolSlug
  locale: LocaleCode
  routePath: string
}

export function createInvoiceCraftToolEvent(
  input: InvoiceCraftAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed' | 'file_downloaded',
): AnalyticsEvent {
  return createAnalyticsEvent({
    name,
    siteSlug: 'invoicecraft',
    locale: input.locale,
    routePath: input.routePath,
    surface: 'tool_page',
    properties: {
      tool_slug: input.toolSlug,
    },
  })
}

export function pushInvoiceCraftAnalyticsEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  window.supersitesAnalyticsEvents = window.supersitesAnalyticsEvents ?? []
  window.dataLayer = window.dataLayer ?? []

  window.supersitesAnalyticsEvents.push(event)
  window.dataLayer.push(createDataLayerEvent(event))

  return true
}

export function trackInvoiceCraftEvent(
  input: InvoiceCraftAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed' | 'file_downloaded',
): boolean {
  return pushInvoiceCraftAnalyticsEvent(createInvoiceCraftToolEvent(input, name))
}
