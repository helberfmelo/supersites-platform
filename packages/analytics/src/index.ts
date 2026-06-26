export const analyticsContractVersion = '2026-06-26.1'

export const analyticsEventNames = [
  'tool_viewed',
  'tool_started',
  'tool_completed',
  'tool_failed',
  'result_copied',
  'file_uploaded',
  'file_processed',
  'file_downloaded',
  'monitor_created',
  'signup_started',
  'signup_completed',
  'upgrade_viewed',
  'checkout_started',
  'purchase_completed',
  'subscription_cancelled',
  'outbound_site_click',
] as const

export type AnalyticsEventName = (typeof analyticsEventNames)[number]

export type AnalyticsSurface =
  | 'catalog_home'
  | 'catalog_card'
  | 'site_detail'
  | 'tool_page'
  | 'tool_result'
  | 'signup'
  | 'checkout'
  | 'account'
  | 'admin'

export type AnalyticsPropertyValue = string | number | boolean | null

export interface AnalyticsEventInput {
  name: AnalyticsEventName
  siteSlug: string
  source?: 'client' | 'server' | 'import'
  locale?: string | null
  routePath?: string | null
  surface?: AnalyticsSurface | null
  anonymousId?: string | null
  sessionId?: string | null
  occurredAt?: string | Date | null
  properties?: Record<string, unknown> | null
}

export interface AnalyticsEvent {
  contractVersion: string
  name: AnalyticsEventName
  siteSlug: string
  source: 'client' | 'server' | 'import'
  locale: string | null
  routePath: string | null
  surface: AnalyticsSurface | null
  anonymousId: string | null
  sessionId: string | null
  occurredAt: string
  properties: Record<string, AnalyticsPropertyValue>
}

export interface OutboundSiteClickInput {
  siteSlug: string
  targetUrl: string
  locale?: string | null
  routePath?: string | null
  surface?: Extract<AnalyticsSurface, 'catalog_card' | 'site_detail'>
}

export const sensitivePropertyPattern =
  /(email|e-mail|phone|telefone|cpf|cnpj|ssn|tax|document|password|senha|secret|token|api[_-]?key|authorization|card|iban|bank|pix|name|full[_-]?name|ip|address)/i

const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
const ipv4Pattern = /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g
const longTokenPattern = /\b[A-Za-z0-9_-]{32,}\b/g
const cardLikePattern = /\b(?:\d[ -]*?){13,19}\b/g

export function isAnalyticsEventName(value: string): value is AnalyticsEventName {
  return analyticsEventNames.includes(value as AnalyticsEventName)
}

export function normalizeAnalyticsSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function sanitizeAnalyticsPath(value: string | null | undefined): string | null {
  if (!value) {
    return null
  }

  try {
    const parsed = new URL(value, 'https://supersites.local')
    const path = parsed.pathname.replace(/\/+/g, '/')

    return redactAnalyticsText(path === '/' ? '/' : path.replace(/\/$/g, ''))
  } catch {
    const withoutQuery = value.split('?')[0]?.split('#')[0] ?? ''
    const normalized = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`

    return redactAnalyticsText(normalized.replace(/\/+/g, '/'))
  }
}

export function redactAnalyticsText(value: string): string {
  return value
    .replace(emailPattern, '[redacted-email]')
    .replace(ipv4Pattern, '[redacted-ip]')
    .replace(cardLikePattern, '[redacted-number]')
    .replace(longTokenPattern, '[redacted-token]')
}

export function sanitizeAnalyticsValue(value: unknown): AnalyticsPropertyValue | undefined {
  if (value === null || typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined
  }

  if (typeof value === 'string') {
    return redactAnalyticsText(value.trim()).slice(0, 500)
  }

  return undefined
}

export function sanitizeAnalyticsProperties(
  properties: Record<string, unknown> | null | undefined,
): Record<string, AnalyticsPropertyValue> {
  const sanitized: Record<string, AnalyticsPropertyValue> = {}

  if (!properties) {
    return sanitized
  }

  for (const [rawKey, rawValue] of Object.entries(properties)) {
    const key = rawKey.trim().replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 80)

    if (!key || sensitivePropertyPattern.test(key)) {
      continue
    }

    const value = key.toLowerCase().includes('url') || key.toLowerCase().includes('path')
      ? sanitizeAnalyticsPath(String(rawValue))
      : sanitizeAnalyticsValue(rawValue)

    if (value !== undefined) {
      sanitized[key] = value
    }
  }

  return sanitized
}

export function createAnalyticsEvent(input: AnalyticsEventInput): AnalyticsEvent {
  const occurredAt = input.occurredAt instanceof Date
    ? input.occurredAt
    : input.occurredAt
      ? new Date(input.occurredAt)
      : new Date()

  return {
    contractVersion: analyticsContractVersion,
    name: input.name,
    siteSlug: normalizeAnalyticsSlug(input.siteSlug),
    source: input.source ?? 'client',
    locale: input.locale?.toLowerCase() ?? null,
    routePath: sanitizeAnalyticsPath(input.routePath),
    surface: input.surface ?? null,
    anonymousId: (sanitizeAnalyticsValue(input.anonymousId) as string | undefined) ?? null,
    sessionId: (sanitizeAnalyticsValue(input.sessionId) as string | undefined) ?? null,
    occurredAt: Number.isNaN(occurredAt.getTime()) ? new Date(0).toISOString() : occurredAt.toISOString(),
    properties: sanitizeAnalyticsProperties(input.properties),
  }
}

export function createOutboundSiteClickEvent(input: OutboundSiteClickInput): AnalyticsEvent {
  return createAnalyticsEvent({
    name: 'outbound_site_click',
    siteSlug: input.siteSlug,
    locale: input.locale,
    routePath: input.routePath,
    surface: input.surface ?? 'catalog_card',
    properties: {
      target_url: input.targetUrl,
    },
  })
}

export function createDataLayerEvent(event: AnalyticsEvent): Record<string, unknown> {
  return {
    event: event.name,
    supersites_event: {
      contract_version: event.contractVersion,
      site_slug: event.siteSlug,
      source: event.source,
      locale: event.locale,
      route_path: event.routePath,
      surface: event.surface,
      occurred_at: event.occurredAt,
      properties: event.properties,
    },
  }
}
