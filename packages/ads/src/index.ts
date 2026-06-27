import { isAdPlacementAllowed, type PageSurface } from '@supersites/consent'

export const adPolicyVersion = '2026-06-27.1'
export const defaultAdDensityLimit = 2
export const minimumInteractiveGapPx = 96

export type AdFormat = 'leaderboard' | 'mobile-banner' | 'inline-rectangle' | 'sidebar-rail'
export type AdPosition = 'below-hero' | 'between-content' | 'sidebar' | 'footer' | 'near-tool-action'
export type AdSlotStatus =
  | 'eligible-placeholder'
  | 'blocked-sensitive-surface'
  | 'blocked-no-content'
  | 'blocked-internal-traffic'
  | 'blocked-consent'
  | 'blocked-density'
  | 'blocked-accidental-click-risk'
  | 'delivery-disabled'

export interface AdSlotSize {
  width: number
  height: number
  minViewportWidth?: number
}

export interface ReservedAdStyle {
  minHeight: number
  aspectRatio: string
  maxWidth?: number
}

export interface AdFormatDefinition {
  format: AdFormat
  sizes: AdSlotSize[]
  reservedStyle: ReservedAdStyle
}

export interface AdSlotContext {
  slotId: string
  siteSlug: string
  pagePath: string
  surface: PageSurface
  position: AdPosition
  format: AdFormat
  hasUsefulContent: boolean
  featureFlagEnabled?: boolean
  deliveryEnabled?: boolean
  consentRequired?: boolean
  hasAdsConsent?: boolean
  isInternalTraffic?: boolean
  existingSlotsOnPage?: number
  densityLimit?: number
  distanceToInteractivePx?: number
}

export interface AdSlotPlan {
  policyVersion: string
  slotId: string
  siteSlug: string
  pagePath: string
  format: AdFormat
  position: AdPosition
  status: AdSlotStatus
  reason: string
  shouldRenderPlaceholder: boolean
  shouldRequestAd: boolean
  reservedStyle: ReservedAdStyle
}

export const adFormats: Record<AdFormat, AdFormatDefinition> = {
  leaderboard: {
    format: 'leaderboard',
    sizes: [
      { width: 728, height: 90, minViewportWidth: 760 },
      { width: 320, height: 100 },
    ],
    reservedStyle: {
      minHeight: 100,
      maxWidth: 728,
      aspectRatio: '728 / 100',
    },
  },
  'mobile-banner': {
    format: 'mobile-banner',
    sizes: [{ width: 320, height: 100 }],
    reservedStyle: {
      minHeight: 100,
      maxWidth: 360,
      aspectRatio: '320 / 100',
    },
  },
  'inline-rectangle': {
    format: 'inline-rectangle',
    sizes: [
      { width: 336, height: 280, minViewportWidth: 380 },
      { width: 300, height: 250 },
    ],
    reservedStyle: {
      minHeight: 280,
      maxWidth: 360,
      aspectRatio: '336 / 280',
    },
  },
  'sidebar-rail': {
    format: 'sidebar-rail',
    sizes: [{ width: 300, height: 600, minViewportWidth: 960 }],
    reservedStyle: {
      minHeight: 600,
      maxWidth: 320,
      aspectRatio: '300 / 600',
    },
  },
}

export function normalizeAdSlotId(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function isAccidentalClickRisk(context: Pick<AdSlotContext, 'position' | 'distanceToInteractivePx'>): boolean {
  if (context.position === 'near-tool-action') {
    return true
  }

  if (typeof context.distanceToInteractivePx === 'number') {
    return context.distanceToInteractivePx < minimumInteractiveGapPx
  }

  return false
}

export function createAdSlotPlan(context: AdSlotContext): AdSlotPlan {
  const slotId = normalizeAdSlotId(context.slotId)
  const definition = adFormats[context.format]
  const basePlan = {
    policyVersion: adPolicyVersion,
    slotId,
    siteSlug: normalizeAdSlotId(context.siteSlug),
    pagePath: sanitizePagePath(context.pagePath),
    format: context.format,
    position: context.position,
    reservedStyle: definition.reservedStyle,
  }

  if (context.isInternalTraffic) {
    return block(basePlan, 'blocked-internal-traffic', 'Internal traffic must not be monetized.', false)
  }

  if (!context.hasUsefulContent) {
    return block(basePlan, 'blocked-no-content', 'Ads require useful editorial or product content.', false)
  }

  if (
    !isAdPlacementAllowed({
      surface: context.surface,
      hasUsefulContent: context.hasUsefulContent,
      consentRequired: false,
      hasAdsConsent: true,
      isInternalTraffic: false,
    })
  ) {
    return block(basePlan, 'blocked-sensitive-surface', 'This page surface is excluded from ads.', false)
  }

  if (isAccidentalClickRisk(context)) {
    return block(basePlan, 'blocked-accidental-click-risk', 'The slot is too close to an interactive tool control.', false)
  }

  const densityLimit = context.densityLimit ?? defaultAdDensityLimit
  if ((context.existingSlotsOnPage ?? 0) >= densityLimit) {
    return block(basePlan, 'blocked-density', 'The page has reached its manual ad density limit.', false)
  }

  if (context.consentRequired && !context.hasAdsConsent) {
    return block(basePlan, 'blocked-consent', 'Ads consent is required before any ad request.', true)
  }

  if (!context.featureFlagEnabled || !context.deliveryEnabled) {
    return block(basePlan, 'delivery-disabled', 'Ad delivery is disabled; render an inert reserved placeholder only.', true)
  }

  return {
    ...basePlan,
    status: 'eligible-placeholder',
    reason: 'The slot is eligible for a future ad request after launch gates.',
    shouldRenderPlaceholder: true,
    shouldRequestAd: true,
  }
}

export function summarizeAdSlots(plans: AdSlotPlan[]): {
  total: number
  placeholders: number
  requests: number
  blocked: number
} {
  return {
    total: plans.length,
    placeholders: plans.filter((plan) => plan.shouldRenderPlaceholder).length,
    requests: plans.filter((plan) => plan.shouldRequestAd).length,
    blocked: plans.filter((plan) => !plan.shouldRenderPlaceholder && !plan.shouldRequestAd).length,
  }
}

function block(
  basePlan: Omit<AdSlotPlan, 'status' | 'reason' | 'shouldRenderPlaceholder' | 'shouldRequestAd'>,
  status: AdSlotStatus,
  reason: string,
  shouldRenderPlaceholder: boolean,
): AdSlotPlan {
  return {
    ...basePlan,
    status,
    reason,
    shouldRenderPlaceholder,
    shouldRequestAd: false,
  }
}

function sanitizePagePath(value: string): string {
  const path = value.trim() || '/'
  const withoutQuery = path.split(/[?#]/, 1)[0] || '/'

  return withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`
}
