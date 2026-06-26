import {
  createDataLayerEvent,
  createOutboundSiteClickEvent,
  type AnalyticsEvent,
  type AnalyticsSurface,
} from '@supersites/analytics'
import type { LocaleCode } from '../data/locales'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    supersitesAnalyticsEvents?: AnalyticsEvent[]
  }
}

export interface CatalogOutboundClickInput {
  siteSlug: string
  targetUrl: string
  locale: LocaleCode
  routePath: string
  surface: Extract<AnalyticsSurface, 'catalog_card' | 'site_detail'>
}

export function createCatalogOutboundClickEvent(input: CatalogOutboundClickInput): AnalyticsEvent {
  return createOutboundSiteClickEvent({
    siteSlug: input.siteSlug,
    targetUrl: input.targetUrl,
    locale: input.locale,
    routePath: input.routePath,
    surface: input.surface,
  })
}

export function pushCatalogAnalyticsEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  window.supersitesAnalyticsEvents = window.supersitesAnalyticsEvents ?? []
  window.dataLayer = window.dataLayer ?? []

  window.supersitesAnalyticsEvents.push(event)
  window.dataLayer.push(createDataLayerEvent(event))

  return true
}

export function trackOutboundSiteClick(input: CatalogOutboundClickInput): boolean {
  return pushCatalogAnalyticsEvent(createCatalogOutboundClickEvent(input))
}
