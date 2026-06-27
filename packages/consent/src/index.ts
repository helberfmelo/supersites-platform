export const consentPolicyVersion = '2026-06-26.1'
export const consentStorageKey = 'supersites.consent.v1'

export const consentCategories = ['necessary', 'preferences', 'analytics', 'ads'] as const

export type ConsentCategory = (typeof consentCategories)[number]
export type ConsentSignal = 'granted' | 'denied'
export type ConsentModeCommandName = 'default' | 'update'

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
  | 'legal'
  | 'tool-input'
  | 'tool-action'
  | 'tool-preview'
  | 'tool-result'
  | 'file-upload'
  | 'file-result'
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

export interface ConsentModeCommand {
  command: ConsentModeCommandName
  mode: ConsentModeState
  version: string
}

export interface TcfGateInput {
  region: ConsentRegionInput
  hasCertifiedCmp?: boolean
}

export interface TcfGate {
  applies: boolean
  certifiedCmpRequired: boolean
  canRequestAds: boolean
  reason: 'not_required' | 'certified_cmp_present' | 'certified_cmp_required'
}

export interface ConsentRuntimeInput {
  state: ConsentState
  region?: ConsentRegionInput
  hasCertifiedCmp?: boolean
  internalTraffic?: boolean
}

export interface ConsentRuntime {
  consentRequired: boolean
  consentMode: ConsentModeState
  tcf: TcfGate
  canLoadAnalyticsTags: boolean
  canRequestAds: boolean
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

const tcfRequiredCountries = new Set([
  'AT',
  'BE',
  'BG',
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
  'legal',
  'tool-input',
  'tool-action',
  'tool-preview',
  'admin',
  'login',
  'checkout',
  'account',
  'error',
  'upload-progress',
  'file-upload',
  'file-result',
  'tool-result',
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

export function serializeConsentState(state: ConsentState): string {
  return JSON.stringify({
    version: state.version,
    necessary: true,
    preferences: Boolean(state.preferences),
    analytics: Boolean(state.analytics),
    ads: Boolean(state.ads),
    updatedAt: state.updatedAt,
  })
}

export function parseConsentState(raw: string | null | undefined): ConsentState | null {
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>

    if (parsed.version !== consentPolicyVersion || parsed.necessary !== true || typeof parsed.updatedAt !== 'string') {
      return null
    }

    return createConsentState({
      version: parsed.version,
      preferences: parsed.preferences === true,
      analytics: parsed.analytics === true,
      ads: parsed.ads === true,
      updatedAt: parsed.updatedAt,
    })
  } catch {
    return null
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

export function buildConsentModeCommand(
  state: ConsentState,
  command: ConsentModeCommandName = 'default',
): ConsentModeCommand {
  return {
    command,
    mode: buildConsentMode(state),
    version: state.version,
  }
}

export function isConsentRequiredForRegion(input: ConsentRegionInput): boolean {
  const countryCode = input.countryCode?.trim().toUpperCase()

  if (!countryCode) {
    return true
  }

  return consentRequiredCountries.has(countryCode)
}

export function isTcfRequiredForRegion(input: ConsentRegionInput): boolean {
  const countryCode = input.countryCode?.trim().toUpperCase()

  if (!countryCode) {
    return true
  }

  return tcfRequiredCountries.has(countryCode)
}

export function buildTcfGate(input: TcfGateInput): TcfGate {
  const applies = isTcfRequiredForRegion(input.region)

  if (!applies) {
    return {
      applies: false,
      certifiedCmpRequired: false,
      canRequestAds: true,
      reason: 'not_required',
    }
  }

  if (input.hasCertifiedCmp) {
    return {
      applies: true,
      certifiedCmpRequired: false,
      canRequestAds: true,
      reason: 'certified_cmp_present',
    }
  }

  return {
    applies: true,
    certifiedCmpRequired: true,
    canRequestAds: false,
    reason: 'certified_cmp_required',
  }
}

export function resolveConsentRuntime(input: ConsentRuntimeInput): ConsentRuntime {
  const region = input.region ?? {}
  const consentRequired = isConsentRequiredForRegion(region)
  const consentMode = buildConsentMode(input.state)
  const tcf = buildTcfGate({ region, hasCertifiedCmp: input.hasCertifiedCmp })
  const canLoadAnalyticsTags = !input.internalTraffic && (!consentRequired || input.state.analytics)
  const canRequestAds = !input.internalTraffic && (!consentRequired || input.state.ads) && tcf.canRequestAds

  return {
    consentRequired,
    consentMode,
    tcf,
    canLoadAnalyticsTags,
    canRequestAds,
  }
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
