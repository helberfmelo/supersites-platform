import { describe, expect, it } from 'vitest'
import {
  adFormats,
  buildGoogleAdsTxtLine,
  buildAdSenseSiteReviewPlan,
  createAdSlotPlan,
  isAccidentalClickRisk,
  normalizeAdSensePublisherId,
  normalizeAdSlotId,
  resolveAdSenseAccountGate,
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

  it('normalizes AdSense publisher ids without accepting arbitrary values', () => {
    expect(normalizeAdSensePublisherId(' CA-PUB-1234567890123456 ')).toBe('ca-pub-1234567890123456')
    expect(normalizeAdSensePublisherId('pub-123')).toBeNull()
    expect(normalizeAdSensePublisherId(null)).toBeNull()
  })

  it('builds a Google ads.txt line only for valid publisher ids', () => {
    expect(buildGoogleAdsTxtLine(' CA-PUB-1234567890123456 ')).toBe(
      'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0',
    )
    expect(buildGoogleAdsTxtLine('ca-pub-1234567890123456', 'RESELLER')).toBe(
      'google.com, pub-1234567890123456, RESELLER, f08c47fec0942fa0',
    )
    expect(buildGoogleAdsTxtLine('pub-1234567890123456')).toBeNull()
  })

  it('fails the AdSense account gate closed until human and payment gates pass', () => {
    expect(resolveAdSenseAccountGate({
      humanApproved: false,
      duplicateAccountChecked: false,
      legalBeneficiaryApproved: false,
      termsAccepted: false,
      taxProfileComplete: false,
      paymentProfileComplete: false,
      bankAccountVerified: false,
      pinVerified: false,
      accountConfigured: false,
    })).toMatchObject({
      status: 'human_required',
      canUsePublisherAccount: false,
      canEnableManagementApi: false,
      canServeAds: false,
    })

    expect(resolveAdSenseAccountGate({
      humanApproved: true,
      duplicateAccountChecked: true,
      existingAccountConfirmed: true,
      legalBeneficiaryApproved: true,
      termsAccepted: true,
      taxProfileComplete: true,
      paymentProfileComplete: true,
      bankAccountVerified: true,
      pinVerified: true,
      accountConfigured: true,
      publisherId: 'ca-pub-1234567890123456',
      managementApiApproved: false,
    })).toMatchObject({
      status: 'ready',
      canUsePublisherAccount: true,
      canEnableManagementApi: false,
      canServeAds: true,
      normalizedPublisherId: 'ca-pub-1234567890123456',
    })
  })

  it('keeps AdSense site review manual and blocked until site gates pass', () => {
    const blockedPlan = buildAdSenseSiteReviewPlan({
      siteSlug: 'NetProbe Atlas',
      publicUrl: 'https://opentshost.com/supersites/netprobe-atlas/?utm=secret',
      accountGate: {
        status: 'human_required',
        canUsePublisherAccount: false,
        canServeAds: false,
      },
      definitiveDomainApproved: false,
      productionDeployed: true,
      publicSmokePassed: true,
      noPlaceholder: true,
      contentQualityGatePassed: true,
      legalPagesPresent: true,
      privacyAndCookiePagesPresent: true,
      consentReady: true,
      adsTxtReady: false,
      policyReviewPassed: true,
      featureFlagEnabled: false,
    })

    expect(blockedPlan).toMatchObject({
      siteSlug: 'netprobe-atlas',
      publicUrl: 'https://opentshost.com/supersites/netprobe-atlas/',
      reviewStatus: 'human_required',
      canRequestHumanSiteReview: false,
      shouldSubmitAutomatically: false,
      shouldServeAds: false,
    })

    const readyPlan = buildAdSenseSiteReviewPlan({
      siteSlug: 'supersite',
      publicUrl: 'https://supersites.example/',
      accountGate: {
        status: 'ready',
        canUsePublisherAccount: true,
        canServeAds: true,
      },
      definitiveDomainApproved: true,
      productionDeployed: true,
      publicSmokePassed: true,
      noPlaceholder: true,
      contentQualityGatePassed: true,
      legalPagesPresent: true,
      privacyAndCookiePagesPresent: true,
      consentReady: true,
      adsTxtReady: true,
      policyReviewPassed: true,
      featureFlagEnabled: true,
    })

    expect(readyPlan).toMatchObject({
      reviewStatus: 'ready_for_review',
      canRequestHumanSiteReview: true,
      shouldSubmitAutomatically: false,
      shouldServeAds: false,
    })
  })
})
