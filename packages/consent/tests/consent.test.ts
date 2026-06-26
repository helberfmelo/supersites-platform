import { describe, expect, it } from 'vitest'
import {
  buildConsentMode,
  canActivateCategory,
  createConsentState,
  isAdPlacementAllowed,
  isConsentRequiredForRegion,
} from '../src'

describe('@supersites/consent', () => {
  it('keeps necessary storage enabled and optional categories denied by default', () => {
    const state = createConsentState()

    expect(state.necessary).toBe(true)
    expect(canActivateCategory(state, 'necessary')).toBe(true)
    expect(canActivateCategory(state, 'analytics')).toBe(false)
    expect(canActivateCategory(state, 'ads')).toBe(false)
  })

  it('maps consent state to Google Consent Mode style signals', () => {
    const mode = buildConsentMode(createConsentState({ analytics: true, ads: false, preferences: true }))

    expect(mode.analytics_storage).toBe('granted')
    expect(mode.ad_storage).toBe('denied')
    expect(mode.functionality_storage).toBe('granted')
    expect(mode.security_storage).toBe('granted')
  })

  it('requires explicit consent in regulated or unknown regions', () => {
    expect(isConsentRequiredForRegion({ countryCode: 'DE' })).toBe(true)
    expect(isConsentRequiredForRegion({ countryCode: 'BR' })).toBe(true)
    expect(isConsentRequiredForRegion({ countryCode: 'US' })).toBe(false)
    expect(isConsentRequiredForRegion({})).toBe(true)
  })

  it('blocks ads on unsafe surfaces and before consent where required', () => {
    expect(isAdPlacementAllowed({ surface: 'checkout', hasUsefulContent: true })).toBe(false)
    expect(isAdPlacementAllowed({ surface: 'public-content', hasUsefulContent: false })).toBe(false)
    expect(
      isAdPlacementAllowed({
        surface: 'public-content',
        hasUsefulContent: true,
        consentRequired: true,
        hasAdsConsent: false,
      }),
    ).toBe(false)
    expect(
      isAdPlacementAllowed({
        surface: 'public-content',
        hasUsefulContent: true,
        consentRequired: true,
        hasAdsConsent: true,
      }),
    ).toBe(true)
  })
})
