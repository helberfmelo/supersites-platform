import {
  createAnalyticsEvent,
  createDataLayerEvent,
  type AnalyticsEvent,
} from '@supersites/analytics'
import type { CalculatorSlug } from '../data/calculators'
import type { LocaleCode } from '../data/locales'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    supersitesAnalyticsEvents?: AnalyticsEvent[]
  }
}

export interface CalculatorAnalyticsInput {
  calculatorSlug: CalculatorSlug
  locale: LocaleCode
  routePath: string
}

export function createCalcHarborToolEvent(
  input: CalculatorAnalyticsInput,
  name: 'tool_viewed' | 'tool_started' | 'tool_completed' | 'tool_failed',
): AnalyticsEvent {
  return createAnalyticsEvent({
    name,
    siteSlug: 'calcharbor',
    locale: input.locale,
    routePath: input.routePath,
    surface: 'tool_page',
    properties: {
      tool_slug: input.calculatorSlug,
    },
  })
}

export function pushCalcHarborAnalyticsEvent(event: AnalyticsEvent): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  window.supersitesAnalyticsEvents = window.supersitesAnalyticsEvents ?? []
  window.dataLayer = window.dataLayer ?? []

  window.supersitesAnalyticsEvents.push(event)
  window.dataLayer.push(createDataLayerEvent(event))

  return true
}

export function trackCalculatorEvent(
  input: CalculatorAnalyticsInput,
  name: 'tool_started' | 'tool_completed' | 'tool_failed',
): boolean {
  return pushCalcHarborAnalyticsEvent(createCalcHarborToolEvent(input, name))
}
