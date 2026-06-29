export const billingContractVersion = '2026-06-27.1'

export const billingProviders = ['stripe', 'mercado_pago', 'paddle'] as const

export type BillingProvider = (typeof billingProviders)[number]

export type BillingGateStatus = 'human_required' | 'not_configured' | 'ready' | 'blocked'

export type BillingPlanInterval = 'month' | 'year' | 'one_time'

export type BillingPlanKind = 'free_preview' | 'subscription' | 'metered' | 'one_time'

export type BillingEntitlementValue = boolean | number | string

export interface BillingProviderGateInput {
  provider: string
  accountApproved?: boolean
  kycApproved?: boolean
  termsAccepted?: boolean
  taxProfileApproved?: boolean
  paymentProfileApproved?: boolean
  providerTermsReviewed?: boolean
  countrySupported?: boolean
  currencySupported?: boolean
  apiKeyConfigured?: boolean
  webhookSecretConfigured?: boolean
  webhookEndpointApproved?: boolean
  checkoutEnabledByHuman?: boolean
}

export interface BillingProviderGate {
  contractVersion: string
  provider: BillingProvider | null
  status: BillingGateStatus
  canCreateCheckout: boolean
  canProcessWebhooks: boolean
  reasons: string[]
}

export interface BillingPlanInput {
  slug: string
  name: string
  siteSlug: string
  kind?: BillingPlanKind
  amountMinor?: number | null
  currency?: string | null
  interval?: BillingPlanInterval | null
  entitlements?: Record<string, unknown> | null
  provider?: string | null
  providerPriceId?: string | null
  checkoutEnabled?: boolean
}

export interface BillingPlan {
  contractVersion: string
  slug: string
  name: string
  siteSlug: string
  kind: BillingPlanKind
  amountMinor: number
  currency: string
  interval: BillingPlanInterval
  entitlements: Record<string, BillingEntitlementValue>
  provider: BillingProvider | null
  providerPriceId: string | null
  checkoutEnabled: boolean
  reasons: string[]
}

export interface BillingWebhookDecisionInput {
  provider: string
  eventId?: string | null
  eventType?: string | null
  signatureVerified?: boolean
  eventAgeSeconds?: number | null
  replayWindowSeconds?: number | null
}

export interface BillingWebhookDecision {
  contractVersion: string
  provider: BillingProvider | null
  accepted: boolean
  idempotencyKey: string | null
  processingStatus: 'accepted' | 'rejected'
  reasons: string[]
}

export interface BillingQuotaDecisionInput {
  plan?: BillingPlan | null
  entitlementCode: string
  used: number
  fallbackLimit: number
}

export interface BillingQuotaDecision {
  contractVersion: string
  allowed: boolean
  entitlementCode: string
  limit: number
  used: number
  remaining: number
  source: 'plan_entitlement' | 'fallback_limit'
  reasons: string[]
}

const safeSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const safeIdentifierPattern = /^[A-Za-z0-9._:-]{3,120}$/
const sensitiveEntitlementPattern =
  /(email|phone|telefone|cpf|cnpj|ssn|tax|document|password|secret|token|api[_-]?key|authorization|card|iban|bank|pix|name|address)/i

export function isBillingProvider(value: string): value is BillingProvider {
  return billingProviders.includes(value as BillingProvider)
}

export function normalizeBillingProvider(value: string | null | undefined): BillingProvider | null {
  const normalized = String(value ?? '').trim().toLowerCase().replace(/-/g, '_')

  return isBillingProvider(normalized) ? normalized : null
}

export function resolveBillingProviderGate(input: BillingProviderGateInput): BillingProviderGate {
  const provider = normalizeBillingProvider(input.provider)
  const reasons: string[] = []

  if (!provider) {
    reasons.push('unsupported_provider')
  }

  if (input.countrySupported === false) {
    reasons.push('country_not_supported')
  }

  if (input.currencySupported === false) {
    reasons.push('currency_not_supported')
  }

  const humanRequirements: Array<[keyof BillingProviderGateInput, string]> = [
    ['accountApproved', 'provider_account_requires_human_approval'],
    ['kycApproved', 'kyc_requires_human_approval'],
    ['termsAccepted', 'provider_terms_require_human_acceptance'],
    ['taxProfileApproved', 'tax_profile_requires_human_approval'],
    ['paymentProfileApproved', 'payment_profile_requires_human_approval'],
    ['providerTermsReviewed', 'provider_terms_review_required'],
    ['checkoutEnabledByHuman', 'checkout_activation_requires_human_approval'],
  ]

  for (const [key, reason] of humanRequirements) {
    if (!input[key]) {
      reasons.push(reason)
    }
  }

  const missingConfiguration: string[] = []

  if (!input.apiKeyConfigured) {
    missingConfiguration.push('provider_api_key_not_configured')
  }

  if (!input.webhookSecretConfigured) {
    missingConfiguration.push('webhook_secret_not_configured')
  }

  if (!input.webhookEndpointApproved) {
    missingConfiguration.push('webhook_endpoint_not_approved')
  }

  reasons.push(...missingConfiguration)

  const blocked = reasons.includes('unsupported_provider')
    || reasons.includes('country_not_supported')
    || reasons.includes('currency_not_supported')
  const hasHumanGate = reasons.some((reason) => reason.includes('human') || reason.includes('kyc') || reason.includes('terms') || reason.includes('tax') || reason.includes('payment'))
  const hasConfigurationGate = missingConfiguration.length > 0
  const status: BillingGateStatus = blocked
    ? 'blocked'
    : hasHumanGate
      ? 'human_required'
      : hasConfigurationGate
        ? 'not_configured'
        : 'ready'

  return {
    contractVersion: billingContractVersion,
    provider,
    status,
    canCreateCheckout: status === 'ready',
    canProcessWebhooks: status === 'ready',
    reasons: Array.from(new Set(reasons)),
  }
}

export function buildBillingPlan(input: BillingPlanInput, providerGate?: BillingProviderGate | null): BillingPlan {
  const reasons: string[] = []
  const slug = normalizeSlug(input.slug, 'plan')
  const siteSlug = normalizeSlug(input.siteSlug, 'site')
  const name = normalizeText(input.name, 'Unnamed plan', 80)
  const kind = input.kind ?? 'free_preview'
  const interval = input.interval ?? (kind === 'one_time' ? 'one_time' : 'month')
  const currency = normalizeCurrency(input.currency)
  const amountMinor = normalizeAmount(input.amountMinor)
  const provider = normalizeBillingProvider(input.provider)
  const providerPriceId = normalizeProviderPriceId(input.providerPriceId)

  if (!safeSlugPattern.test(slug)) {
    reasons.push('plan_slug_normalized')
  }

  if (!safeSlugPattern.test(siteSlug)) {
    reasons.push('site_slug_normalized')
  }

  if (kind !== 'free_preview' && amountMinor <= 0) {
    reasons.push('paid_plan_requires_positive_amount')
  }

  if (input.checkoutEnabled && !providerPriceId) {
    reasons.push('checkout_requires_provider_price_id')
  }

  if (input.checkoutEnabled && providerGate?.canCreateCheckout !== true) {
    reasons.push('checkout_blocked_by_provider_gate')
  }

  const checkoutEnabled = Boolean(input.checkoutEnabled && providerPriceId && providerGate?.canCreateCheckout)

  return {
    contractVersion: billingContractVersion,
    slug,
    name,
    siteSlug,
    kind,
    amountMinor,
    currency,
    interval,
    entitlements: sanitizeEntitlements(input.entitlements),
    provider,
    providerPriceId,
    checkoutEnabled,
    reasons: Array.from(new Set(reasons)),
  }
}

export function decideBillingWebhook(input: BillingWebhookDecisionInput): BillingWebhookDecision {
  const provider = normalizeBillingProvider(input.provider)
  const eventId = normalizeWebhookIdentifier(input.eventId)
  const eventType = normalizeWebhookIdentifier(input.eventType)
  const replayWindowSeconds = clampInteger(input.replayWindowSeconds, 300, 30, 900)
  const eventAgeSeconds = clampInteger(input.eventAgeSeconds, 0, 0, 86_400)
  const reasons: string[] = []

  if (!provider) {
    reasons.push('unsupported_provider')
  }

  if (!eventId) {
    reasons.push('missing_event_id')
  }

  if (!eventType) {
    reasons.push('missing_event_type')
  }

  if (!input.signatureVerified) {
    reasons.push('signature_not_verified')
  }

  if (eventAgeSeconds > replayWindowSeconds) {
    reasons.push('event_outside_replay_window')
  }

  const accepted = reasons.length === 0

  return {
    contractVersion: billingContractVersion,
    provider,
    accepted,
    idempotencyKey: accepted && provider && eventId ? `${provider}:${eventId}` : null,
    processingStatus: accepted ? 'accepted' : 'rejected',
    reasons,
  }
}

export function resolveBillingQuota(input: BillingQuotaDecisionInput): BillingQuotaDecision {
  const entitlementCode = normalizeSlug(input.entitlementCode, '')
  const fallbackLimit = clampInteger(input.fallbackLimit, 0, 0, 1_000_000)
  const used = clampInteger(input.used, 0, 0, 1_000_000)
  const entitlementValue = entitlementCode ? input.plan?.entitlements[entitlementCode] : undefined
  const reasons: string[] = []
  let source: BillingQuotaDecision['source'] = 'fallback_limit'
  let limit = fallbackLimit

  if (!entitlementCode) {
    reasons.push('missing_entitlement_code')
  }

  if (typeof entitlementValue === 'number' && Number.isFinite(entitlementValue)) {
    source = 'plan_entitlement'
    limit = clampInteger(entitlementValue, fallbackLimit, 0, 1_000_000)
  } else {
    reasons.push('entitlement_missing_uses_fallback_limit')
  }

  const remaining = Math.max(0, limit - used)

  if (used >= limit) {
    reasons.push('quota_exhausted')
  }

  return {
    contractVersion: billingContractVersion,
    allowed: used < limit,
    entitlementCode,
    limit,
    used,
    remaining,
    source,
    reasons: Array.from(new Set(reasons)),
  }
}

function normalizeSlug(value: string, fallback: string): string {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')

  return normalized || fallback
}

function normalizeText(value: string, fallback: string, maxLength: number): string {
  const normalized = String(value ?? '').trim().replace(/\s+/g, ' ')

  return (normalized || fallback).slice(0, maxLength)
}

function normalizeCurrency(value: string | null | undefined): string {
  const normalized = String(value ?? 'USD').trim().toUpperCase()

  return /^[A-Z]{3}$/.test(normalized) ? normalized : 'USD'
}

function normalizeAmount(value: number | null | undefined): number {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.max(0, Math.min(100_000_000, Math.trunc(Number(value))))
}

function normalizeProviderPriceId(value: string | null | undefined): string | null {
  const normalized = String(value ?? '').trim()

  return safeIdentifierPattern.test(normalized) ? normalized : null
}

function normalizeWebhookIdentifier(value: string | null | undefined): string | null {
  const normalized = String(value ?? '').trim()

  return safeIdentifierPattern.test(normalized) ? normalized : null
}

function sanitizeEntitlements(input: Record<string, unknown> | null | undefined): Record<string, BillingEntitlementValue> {
  const output: Record<string, BillingEntitlementValue> = {}

  for (const [rawKey, rawValue] of Object.entries(input ?? {})) {
    const key = normalizeSlug(rawKey, '')

    if (!key || sensitiveEntitlementPattern.test(rawKey)) {
      continue
    }

    if (typeof rawValue === 'boolean') {
      output[key] = rawValue
      continue
    }

    if (typeof rawValue === 'number' && Number.isFinite(rawValue)) {
      output[key] = Math.max(0, Math.trunc(rawValue))
      continue
    }

    if (typeof rawValue === 'string') {
      const value = rawValue.trim().replace(/\s+/g, ' ').slice(0, 80)

      if (value && !sensitiveEntitlementPattern.test(value)) {
        output[key] = value
      }
    }
  }

  return output
}

function clampInteger(value: number | null | undefined, fallback: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return fallback
  }

  return Math.max(min, Math.min(max, Math.trunc(Number(value))))
}
