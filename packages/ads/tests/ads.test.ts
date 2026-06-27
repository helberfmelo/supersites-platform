import { describe, expect, it } from 'vitest'
import {
  adFormats,
  createAdSlotPlan,
  isAccidentalClickRisk,
  normalizeAdSlotId,
  summarizeAdSlots,
} from '../src'

describe('@supersites/ads', () => {
  it('normalizes slot identifiers for data attributes and provider mapping', () => {
    expect(normalizeAdSlotId(' Hub Home / Footer Leaderboard ')).toBe('hub-home-footer-leaderboard')
  })

  it('reserves stable dimensions for manual responsive placeholders', () => {
    expect(adFormats.leaderboard.reservedStyle).toMatchObject({
      minHeight: 100,
      maxWidth: 728,
      aspectRatio: '728 / 100',
    })
    expect(adFormats['sidebar-rail'].reservedStyle.minHeight).toBe(600)
  })

  it('renders an inert placeholder while feature and delivery gates are disabled', () => {
    const plan = createAdSlotPlan({
      slotId: 'hub-home-footer',
      siteSlug: 'supersite',
      pagePath: '/en',
      surface: 'public-content',
      position: 'footer',
      format: 'leaderboard',
      hasUsefulContent: true,
      hasAdsConsent: true,
      featureFlagEnabled: false,
      deliveryEnabled: false,
    })

    expect(plan.status).toBe('delivery-disabled')
    expect(plan.shouldRenderPlaceholder).toBe(true)
    expect(plan.shouldRequestAd).toBe(false)
  })

  it('blocks sensitive surfaces instead of rendering placeholders', () => {
    const plan = createAdSlotPlan({
      slotId: 'checkout',
      siteSlug: 'supersite',
      pagePath: '/checkout',
      surface: 'checkout',
      position: 'footer',
      format: 'leaderboard',
      hasUsefulContent: true,
    })

    expect(plan.status).toBe('blocked-sensitive-surface')
    expect(plan.shouldRenderPlaceholder).toBe(false)
  })

  it('blocks placements too close to tool actions to avoid accidental clicks', () => {
    expect(isAccidentalClickRisk({ position: 'near-tool-action' })).toBe(true)
    expect(isAccidentalClickRisk({ position: 'between-content', distanceToInteractivePx: 40 })).toBe(true)

    const plan = createAdSlotPlan({
      slotId: 'tool-ad',
      siteSlug: 'calcharbor',
      pagePath: '/en/calculators/loan-payment',
      surface: 'public-content',
      position: 'between-content',
      format: 'inline-rectangle',
      hasUsefulContent: true,
      distanceToInteractivePx: 40,
    })

    expect(plan.status).toBe('blocked-accidental-click-risk')
  })

  it('keeps consent-gated slots inert until ads consent exists', () => {
    const plan = createAdSlotPlan({
      slotId: 'regulated',
      siteSlug: 'supersite',
      pagePath: '/de',
      surface: 'public-content',
      position: 'footer',
      format: 'leaderboard',
      hasUsefulContent: true,
      consentRequired: true,
      hasAdsConsent: false,
      featureFlagEnabled: true,
      deliveryEnabled: true,
    })

    expect(plan.status).toBe('blocked-consent')
    expect(plan.shouldRenderPlaceholder).toBe(true)
    expect(plan.shouldRequestAd).toBe(false)
  })

  it('summarizes placeholders, blocked slots and future requests', () => {
    const plans = [
      createAdSlotPlan({
        slotId: 'a',
        siteSlug: 'supersite',
        pagePath: '/en',
        surface: 'public-content',
        position: 'footer',
        format: 'leaderboard',
        hasUsefulContent: true,
      }),
      createAdSlotPlan({
        slotId: 'b',
        siteSlug: 'supersite',
        pagePath: '/login',
        surface: 'login',
        position: 'footer',
        format: 'leaderboard',
        hasUsefulContent: true,
      }),
    ]

    expect(summarizeAdSlots(plans)).toEqual({
      total: 2,
      placeholders: 1,
      requests: 0,
      blocked: 1,
    })
  })
})
