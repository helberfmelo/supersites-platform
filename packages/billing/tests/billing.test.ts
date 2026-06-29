import { describe, expect, it } from 'vitest'
import {
  buildBillingPlan,
  decideBillingWebhook,
  normalizeBillingProvider,
  normalizeProviderPriceReference,
  resolveBillingQuota,
  resolveBillingProviderGate,
} from '../src/index'

describe('billing foundation contracts', () => {
  it('normalizes supported provider ids', () => {
    expect(normalizeBillingProvider('Stripe')).toBe('stripe')
    expect(normalizeBillingProvider('mercado-pago')).toBe('mercado_pago')
    expect(normalizeBillingProvider('unknown')).toBeNull()
  })

  it('normalizes provider price references without accepting unsafe values', () => {
    expect(normalizeProviderPriceReference(' price_123:BR ')).toBe('price_123:BR')
    expect(normalizeProviderPriceReference('x')).toBeNull()
    expect(normalizeProviderPriceReference('price with spaces')).toBeNull()
  })

  it('fails closed until human and configuration gates are complete', () => {
    const gate = resolveBillingProviderGate({ provider: 'stripe' })

    expect(gate.status).toBe('human_required')
    expect(gate.canCreateCheckout).toBe(false)
    expect(gate.canProcessWebhooks).toBe(false)
    expect(gate.reasons).toContain('kyc_requires_human_approval')
    expect(gate.reasons).toContain('provider_api_key_not_configured')
  })

  it('blocks unsupported provider countries', () => {
    const gate = resolveBillingProviderGate({
      provider: 'paddle',
      countrySupported: false,
    })

    expect(gate.status).toBe('blocked')
    expect(gate.reasons).toContain('country_not_supported')
  })

  it('marks a provider ready only when all gates pass', () => {
    const gate = resolveBillingProviderGate({
      provider: 'stripe',
      accountApproved: true,
      kycApproved: true,
      termsAccepted: true,
      taxProfileApproved: true,
      paymentProfileApproved: true,
      providerTermsReviewed: true,
      countrySupported: true,
      currencySupported: true,
      apiKeyConfigured: true,
      webhookSecretConfigured: true,
      webhookEndpointApproved: true,
      checkoutEnabledByHuman: true,
    })

    expect(gate.status).toBe('ready')
    expect(gate.canCreateCheckout).toBe(true)
    expect(gate.canProcessWebhooks).toBe(true)
    expect(gate.reasons).toEqual([])
  })

  it('keeps checkout disabled when a provider gate is missing', () => {
    const plan = buildBillingPlan({
      slug: 'monitoring-pro',
      name: 'Monitoring Pro',
      siteSlug: 'sitepulse-lab',
      kind: 'subscription',
      amountMinor: 1900,
      currency: 'usd',
      provider: 'stripe',
      providerPriceId: 'price_123',
      checkoutEnabled: true,
      entitlements: { monitors: 10 },
    })

    expect(plan.checkoutEnabled).toBe(false)
    expect(plan.reasons).toContain('checkout_blocked_by_provider_gate')
  })

  it('requires a provider price id before enabling checkout', () => {
    const readyGate = resolveBillingProviderGate({
      provider: 'stripe',
      accountApproved: true,
      kycApproved: true,
      termsAccepted: true,
      taxProfileApproved: true,
      paymentProfileApproved: true,
      providerTermsReviewed: true,
      countrySupported: true,
      currencySupported: true,
      apiKeyConfigured: true,
      webhookSecretConfigured: true,
      webhookEndpointApproved: true,
      checkoutEnabledByHuman: true,
    })

    const plan = buildBillingPlan({
      slug: 'monitoring-pro',
      name: 'Monitoring Pro',
      siteSlug: 'sitepulse-lab',
      kind: 'subscription',
      amountMinor: 1900,
      currency: 'usd',
      provider: 'stripe',
      checkoutEnabled: true,
    }, readyGate)

    expect(plan.checkoutEnabled).toBe(false)
    expect(plan.reasons).toContain('checkout_requires_provider_price_id')
  })

  it('sanitizes plan identifiers, currency and entitlements', () => {
    const plan = buildBillingPlan({
      slug: ' Monitoring PRO! ',
      name: '  Monitoring   Pro  ',
      siteSlug: 'SitePulse Lab',
      amountMinor: 19.9,
      currency: 'usd',
      entitlements: {
        'Monitor Limit': 25.8,
        white_label: true,
        support: 'priority queue',
      },
    })

    expect(plan.slug).toBe('monitoring-pro')
    expect(plan.siteSlug).toBe('sitepulse-lab')
    expect(plan.currency).toBe('USD')
    expect(plan.amountMinor).toBe(19)
    expect(plan.entitlements).toEqual({
      'monitor-limit': 25,
      support: 'priority queue',
      'white-label': true,
    })
  })

  it('drops sensitive entitlement keys and values', () => {
    const plan = buildBillingPlan({
      slug: 'team',
      name: 'Team',
      siteSlug: 'qrroute',
      entitlements: {
        api_key: 'secret',
        customer_email: 'user@example.com',
        scans: 1000,
      },
    })

    expect(plan.entitlements).toEqual({ scans: 1000 })
  })

  it('resolves quota decisions from numeric plan entitlements', () => {
    const plan = buildBillingPlan({
      slug: 'free-preview',
      name: 'Free Preview',
      siteSlug: 'netprobe-atlas',
      entitlements: {
        'monitor-slots': 3,
      },
    })

    expect(resolveBillingQuota({
      plan,
      entitlementCode: 'monitor-slots',
      used: 2,
      fallbackLimit: 1,
    })).toMatchObject({
      allowed: true,
      limit: 3,
      remaining: 1,
      source: 'plan_entitlement',
      reasons: [],
    })
  })

  it('fails closed when quota usage reaches the entitlement limit', () => {
    const plan = buildBillingPlan({
      slug: 'free-preview',
      name: 'Free Preview',
      siteSlug: 'netprobe-atlas',
      entitlements: {
        'monitor-slots': 1,
      },
    })

    const decision = resolveBillingQuota({
      plan,
      entitlementCode: 'monitor-slots',
      used: 1,
      fallbackLimit: 3,
    })

    expect(decision.allowed).toBe(false)
    expect(decision.reasons).toContain('quota_exhausted')
  })

  it('uses a bounded fallback when a quota entitlement is missing', () => {
    const plan = buildBillingPlan({
      slug: 'free-preview',
      name: 'Free Preview',
      siteSlug: 'mailhealth',
      entitlements: {},
    })

    const decision = resolveBillingQuota({
      plan,
      entitlementCode: 'monitor-slots',
      used: 0,
      fallbackLimit: 2,
    })

    expect(decision.allowed).toBe(true)
    expect(decision.limit).toBe(2)
    expect(decision.source).toBe('fallback_limit')
    expect(decision.reasons).toContain('entitlement_missing_uses_fallback_limit')
  })

  it('rejects unsigned webhook events', () => {
    const decision = decideBillingWebhook({
      provider: 'stripe',
      eventId: 'evt_123',
      eventType: 'checkout.session.completed',
      signatureVerified: false,
      eventAgeSeconds: 10,
    })

    expect(decision.accepted).toBe(false)
    expect(decision.idempotencyKey).toBeNull()
    expect(decision.reasons).toContain('signature_not_verified')
  })

  it('rejects replayed webhook events outside the window', () => {
    const decision = decideBillingWebhook({
      provider: 'stripe',
      eventId: 'evt_123',
      eventType: 'invoice.paid',
      signatureVerified: true,
      eventAgeSeconds: 600,
      replayWindowSeconds: 300,
    })

    expect(decision.accepted).toBe(false)
    expect(decision.reasons).toContain('event_outside_replay_window')
  })

  it('accepts signed webhook events with deterministic idempotency', () => {
    const decision = decideBillingWebhook({
      provider: 'paddle',
      eventId: 'evt_abc',
      eventType: 'transaction.completed',
      signatureVerified: true,
      eventAgeSeconds: 30,
    })

    expect(decision.accepted).toBe(true)
    expect(decision.idempotencyKey).toBe('paddle:evt_abc')
    expect(decision.processingStatus).toBe('accepted')
  })
})
