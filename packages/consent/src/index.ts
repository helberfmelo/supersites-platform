export const consentPolicyVersion = '2026-06-26.1'

export const consentCategories = ['necessary', 'preferences', 'analytics', 'ads'] as const

export type ConsentCategory = (typeof consentCategories)[number]
export type ConsentSignal = 'granted' | 'denied'

export interface ConsentState {
  version: string
  necessary: true
  preferences: boolean
  analytics: boolean
  ads: boolean
  updatedAt: string
}

export interface ConsentRegionInput {
  countryCode?: string | null
  subdivisionCode?: string | null
}

export type PageSurface =
  | 'public-content'
  | 'tool-result'
  | 'admin'
  | 'login'
  | 'checkout'
  | 'account'
  | 'error'
  | 'upload-progress'

export interface AdPlacementContext {
  surface: PageSurface
  hasUsefulContent: boolean
  consentRequired?: boolean
  hasAdsConsent?: boolean
  isInternalTraffic?: boolean
}

export type ConsentModeState = {
  ad_storage: ConsentSignal
  ad_user_data: ConsentSignal
  ad_personalization: ConsentSignal
  analytics_storage: ConsentSignal
  functionality_storage: ConsentSignal
  security_storage: ConsentSignal
}

const consentRequiredCountries = new Set([
  'AT',
  'BE',
  'BG',
  'BR',
  'CH',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FR',
  'GB',
  'GR',
  'HR',
  'HU',
  'IE',
  'IS',
  'IT',
  'LI',
  'LT',
  'LU',
  'LV',
  'MT',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'SE',
  'SI',
  'SK',
])

const adExcludedSurfaces = new Set<PageSurface>([
  'admin',
  'login',
  'checkout',
  'account',
  'error',
  'upload-progress',
])

export function createConsentState(input: Partial<Omit<ConsentState, 'necessary'>> = {}): ConsentState {
  return {
    version: input.version ?? consentPolicyVersion,
    necessary: true,
    preferences: input.preferences ?? false,
    analytics: input.analytics ?? false,
    ads: input.ads ?? false,
    updatedAt: input.updatedAt ?? new Date(0).toISOString(),
  }
}

export function canActivateCategory(state: ConsentState, category: ConsentCategory): boolean {
  if (category === 'necessary') {
    return true
  }

  return state[category]
}

export function buildConsentMode(state: ConsentState): ConsentModeState {
  const ads = state.ads ? 'granted' : 'denied'
  const analytics = state.analytics ? 'granted' : 'denied'

  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: analytics,
    functionality_storage: state.preferences ? 'granted' : 'denied',
    security_storage: 'granted',
  }
}

export function isConsentRequiredForRegion(input: ConsentRegionInput): boolean {
  const countryCode = input.countryCode?.trim().toUpperCase()

  if (!countryCode) {
    return true
  }

  return consentRequiredCountries.has(countryCode)
}

export function isAdPlacementAllowed(context: AdPlacementContext): boolean {
  if (context.isInternalTraffic || !context.hasUsefulContent || adExcludedSurfaces.has(context.surface)) {
    return false
  }

  if (context.consentRequired && !context.hasAdsConsent) {
    return false
  }

  return true
}
