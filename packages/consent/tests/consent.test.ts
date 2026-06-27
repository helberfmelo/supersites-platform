import { describe, expect, it } from 'vitest'
import {
  buildConsentModeCommand,
  buildConsentMode,
  buildTcfGate,
  canActivateCategory,
  consentStorageKey,
  createConsentState,
  isAdPlacementAllowed,
  isConsentRequiredForRegion,
  isTcfRequiredForRegion,
  parseConsentState,
  resolveConsentRuntime,
  serializeConsentState,
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

  it('wraps consent mode updates without loading a Google tag', () => {
    const state = createConsentState({ analytics: true, ads: true, updatedAt: '2026-06-27T00:00:00.000Z' })
    const command = buildConsentModeCommand(state, 'update')

    expect(command).toMatchObject({
      command: 'update',
      version: state.version,
      mode: {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      },
    })
  })

  it('serializes only the consent choices needed for the CMP', () => {
    const state = createConsentState({
      preferences: true,
      analytics: false,
      ads: true,
      updatedAt: '2026-06-27T00:00:00.000Z',
    })
    const parsed = parseConsentState(serializeConsentState(state))

    expect(consentStorageKey).toBe('supersites.consent.v1')
    expect(parsed).toEqual(state)
    expect(parseConsentState('{not json')).toBeNull()
    expect(parseConsentState(JSON.stringify({ ...state, version: 'old' }))).toBeNull()
  })

  it('requires explicit consent in regulated or unknown regions', () => {
    expect(isConsentRequiredForRegion({ countryCode: 'DE' })).toBe(true)
    expect(isConsentRequiredForRegion({ countryCode: 'BR' })).toBe(true)
    expect(isConsentRequiredForRegion({ countryCode: 'US' })).toBe(false)
    expect(isConsentRequiredForRegion({})).toBe(true)
  })

  it('separates Google-certified CMP and TCF requirements from generic consent regions', () => {
    expect(isTcfRequiredForRegion({ countryCode: 'DE' })).toBe(true)
    expect(isTcfRequiredForRegion({ countryCode: 'GB' })).toBe(true)
    expect(isTcfRequiredForRegion({ countryCode: 'BR' })).toBe(false)
    expect(buildTcfGate({ region: { countryCode: 'DE' } })).toMatchObject({
      applies: true,
      certifiedCmpRequired: true,
      canRequestAds: false,
    })
    expect(buildTcfGate({ region: { countryCode: 'DE' }, hasCertifiedCmp: true })).toMatchObject({
      applies: true,
      certifiedCmpRequired: false,
      canRequestAds: true,
    })
  })

  it('blocks ads on unsafe surfaces and before consent where required', () => {
    expect(isAdPlacementAllowed({ surface: 'checkout', hasUsefulContent: true })).toBe(false)
    expect(isAdPlacementAllowed({ surface: 'tool-input', hasUsefulContent: true })).toBe(false)
    expect(isAdPlacementAllowed({ surface: 'tool-result', hasUsefulContent: true })).toBe(false)
    expect(isAdPlacementAllowed({ surface: 'legal', hasUsefulContent: true })).toBe(false)
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

  it('resolves runtime gates without enabling external analytics or ads by default', () => {
    const runtime = resolveConsentRuntime({
      state: createConsentState({ analytics: true, ads: true }),
      region: { countryCode: 'DE' },
      hasCertifiedCmp: false,
    })

    expect(runtime.canLoadAnalyticsTags).toBe(true)
    expect(runtime.canRequestAds).toBe(false)
    expect(runtime.tcf.reason).toBe('certified_cmp_required')
  })
})
