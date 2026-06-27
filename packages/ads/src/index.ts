import { isAdPlacementAllowed, type PageSurface } from '@supersites/consent'

export const adPolicyVersion = '2026-06-27.1'
export const adsenseIntegrationContractVersion = '2026-06-27.1'
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

export type AdSenseGateStatus = 'human_required' | 'not_configured' | 'ready' | 'blocked'
export type AdSenseSiteReviewStatus = 'not_ready' | 'human_required' | 'ready_for_review' | 'blocked'

export interface AdSenseAccountGateInput {
  humanApproved: boolean
  duplicateAccountChecked: boolean
  existingAccountConfirmed?: boolean
  legalBeneficiaryApproved: boolean
  termsAccepted: boolean
  taxProfileComplete: boolean
  paymentProfileComplete: boolean
  bankAccountVerified: boolean
  pinVerified: boolean
  accountConfigured?: boolean
  publisherId?: string | null
  managementApiApproved?: boolean
}

export interface AdSenseAccountGate {
  contractVersion: string
  status: AdSenseGateStatus
  canUsePublisherAccount: boolean
  canEnableManagementApi: boolean
  canServeAds: boolean
  normalizedPublisherId: string | null
  reasons: string[]
}

export interface AdSenseSiteReviewInput {
  siteSlug: string
  publicUrl: string
  accountGate: Pick<AdSenseAccountGate, 'canUsePublisherAccount' | 'canServeAds' | 'status'>
  definitiveDomainApproved: boolean
  productionDeployed: boolean
  publicSmokePassed: boolean
  noPlaceholder: boolean
  contentQualityGatePassed: boolean
  legalPagesPresent: boolean
  privacyAndCookiePagesPresent: boolean
  consentReady: boolean
  adsTxtReady: boolean
  policyReviewPassed: boolean
  featureFlagEnabled?: boolean
  siteApproved?: boolean
}

export interface AdSenseSiteReviewPlan {
  contractVersion: string
  siteSlug: string
  publicUrl: string
  reviewStatus: AdSenseSiteReviewStatus
  canRequestHumanSiteReview: boolean
  shouldSubmitAutomatically: boolean
  shouldServeAds: boolean
  reasons: string[]
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

export function normalizeAdSensePublisherId(value: string | null | undefined): string | null {
  if (!value) {
    return null
  }

  const normalized = value.trim().toLowerCase()

  return /^ca-pub-\d{16}$/.test(normalized) ? normalized : null
}

export function resolveAdSenseAccountGate(input: AdSenseAccountGateInput): AdSenseAccountGate {
  const reasons: string[] = []
  const normalizedPublisherId = normalizeAdSensePublisherId(input.publisherId)

  if (!input.humanApproved) {
    reasons.push('AdSense account actions require explicit human approval.')
  }

  if (!input.duplicateAccountChecked) {
    reasons.push('The publisher must confirm whether an existing AdSense account already exists.')
  }

  if (!input.legalBeneficiaryApproved) {
    reasons.push('The legal beneficiary must be approved before using a publisher account.')
  }

  if (!input.termsAccepted) {
    reasons.push('AdSense terms must be accepted by an authorized human.')
  }

  if (!input.taxProfileComplete) {
    reasons.push('Tax information must be completed before monetization.')
  }

  if (!input.paymentProfileComplete) {
    reasons.push('The payment profile must be completed before monetization.')
  }

  if (!input.bankAccountVerified) {
    reasons.push('A bank account must be verified before payment readiness.')
  }

  if (!input.pinVerified) {
    reasons.push('Postal PIN verification is still human-gated when requested by AdSense.')
  }

  if (!input.accountConfigured || !normalizedPublisherId) {
    reasons.push('A valid AdSense publisher id is not configured.')
  }

  const canUsePublisherAccount = reasons.length === 0
  const canEnableManagementApi = canUsePublisherAccount && Boolean(input.managementApiApproved)

  return {
    contractVersion: adsenseIntegrationContractVersion,
    status: canUsePublisherAccount ? 'ready' : input.humanApproved ? 'not_configured' : 'human_required',
    canUsePublisherAccount,
    canEnableManagementApi,
    canServeAds: canUsePublisherAccount,
    normalizedPublisherId,
    reasons,
  }
}

export function buildAdSenseSiteReviewPlan(input: AdSenseSiteReviewInput): AdSenseSiteReviewPlan {
  const reasons: string[] = []
  const publicUrl = sanitizePublicUrl(input.publicUrl)

  if (!input.accountGate.canUsePublisherAccount || input.accountGate.status !== 'ready') {
    reasons.push('A ready publisher account gate is required before adding sites.')
  }

  if (!input.definitiveDomainApproved) {
    reasons.push('A definitive domain must be approved before AdSense site review.')
  }

  if (!input.productionDeployed || !input.publicSmokePassed || !input.noPlaceholder) {
    reasons.push('The site must be deployed publicly, smoke-tested and no longer be a placeholder.')
  }

  if (!input.contentQualityGatePassed) {
    reasons.push('The site content and free tool quality gate must pass first.')
  }

  if (!input.legalPagesPresent || !input.privacyAndCookiePagesPresent) {
    reasons.push('Legal, privacy and cookie pages must be present before review.')
  }

  if (!input.consentReady) {
    reasons.push('Consent/CMP readiness must be complete before ad serving.')
  }

  if (!input.adsTxtReady) {
    reasons.push('ads.txt must be prepared for the approved publisher account.')
  }

  if (!input.policyReviewPassed) {
    reasons.push('Ad placement and policy review must pass before review.')
  }

  if (!input.featureFlagEnabled) {
    reasons.push('AdSense site submission remains disabled by feature flag.')
  }

  const readyForReview = reasons.length === 0

  return {
    contractVersion: adsenseIntegrationContractVersion,
    siteSlug: normalizeAdSlotId(input.siteSlug),
    publicUrl,
    reviewStatus: readyForReview ? 'ready_for_review' : 'human_required',
    canRequestHumanSiteReview: readyForReview,
    shouldSubmitAutomatically: false,
    shouldServeAds: readyForReview && input.accountGate.canServeAds && Boolean(input.siteApproved),
    reasons,
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

function sanitizePublicUrl(value: string): string {
  try {
    const url = new URL(value.trim(), 'https://opentshost.com')
    url.username = ''
    url.password = ''
    url.search = ''
    url.hash = ''

    if (!['https:', 'http:'].includes(url.protocol)) {
      return 'https://opentshost.com/'
    }

    return url.toString()
  } catch {
    return 'https://opentshost.com/'
  }
}
