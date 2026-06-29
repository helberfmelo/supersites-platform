export const executiveReportContractVersion = '2026-06-29.1'

export const reportPeriodTypes = ['weekly', 'monthly'] as const
export const reportDataStatuses = ['finalized', 'estimated', 'delayed', 'unavailable'] as const
export const reportSections = ['delivery', 'quality', 'traffic', 'monetization', 'billing', 'growth', 'operations'] as const
export const reportEvidenceSourceKinds = [
  'internal_document',
  'public_watchdog_artifact',
  'local_measurement_artifact',
  'control_plane_seed',
  'provider_unavailable',
] as const
export const reportEvidenceSourceStatuses = [
  ...reportEvidenceSourceKinds,
  'blocked_external_provider',
  'unknown',
] as const

export type ReportPeriodType = (typeof reportPeriodTypes)[number]
export type ReportDataStatus = (typeof reportDataStatuses)[number]
export type ReportSection = (typeof reportSections)[number]
export type ReportStatus = 'ready' | 'needs_review' | 'blocked'
export type ReportEvidenceSourceKind = (typeof reportEvidenceSourceKinds)[number]
export type ReportEvidenceSourceStatus = (typeof reportEvidenceSourceStatuses)[number]

export interface ReportEvidenceInput {
  source: string
  summary: string
  observedAt?: string | null
}

export interface ReportEvidence {
  source: string
  sourceKind: ReportEvidenceSourceStatus
  summary: string
  observedAt: string | null
}

export interface ReportEvidenceSourceClassification {
  source: string
  status: ReportEvidenceSourceStatus
  reason: string
}

export interface ExecutiveReportItemInput {
  section: string
  label: string
  value: string | number | boolean | null
  unit?: string | null
  dataStatus: string
  source: string
  evidence?: ReportEvidenceInput[] | null
  notes?: string | null
}

export interface ExecutiveReportInput {
  title: string
  periodType: string
  periodStart: string
  periodEnd: string
  generatedAt?: string | null
  narrative?: string | null
  items?: ExecutiveReportItemInput[] | null
}

export interface ExecutiveReportItem {
  section: ReportSection
  label: string
  value: string | number | boolean | null
  unit: string | null
  dataStatus: ReportDataStatus
  source: string
  sourceKind: ReportEvidenceSourceStatus
  evidence: ReportEvidence[]
  notes: string | null
  reasons: string[]
}

export interface ExecutiveReport {
  contractVersion: string
  title: string
  periodType: ReportPeriodType
  periodStart: string
  periodEnd: string
  generatedAt: string | null
  status: ReportStatus
  exportReady: boolean
  dataStatusSummary: Record<ReportDataStatus, number>
  causalityStatus: 'not_inferred'
  narrative: string | null
  items: ExecutiveReportItem[]
  reasons: string[]
}

export interface ReportEvidencePolicySummary {
  allowed: boolean
  sourceSummary: Record<ReportEvidenceSourceStatus, number>
  blockedSources: ReportEvidenceSourceClassification[]
}

const safeSourcePattern = /^[a-z0-9][a-z0-9._:/-]*$/i
const internalDocumentSourcePattern = /^(?:AGENTS\.md|README\.md|docs\/[a-z0-9._:/-]+|packages\/[a-z0-9._:/-]+\/README\.md)$/i
const publicWatchdogArtifactSourcePattern = /^artifacts\/(?:adsense-safe-public|benchmark-crawl|benchmark-crawl-label-smoke|uptime-incident-readiness)\/[a-z0-9._:/-]+$/i
const localMeasurementArtifactSourcePattern = /^artifacts\/(?:control-plane-admin-audit|executive-evidence|google-readiness|lhci-public|lighthouse-public)\/[a-z0-9._:/-]+$/i
const controlPlaneSeedSourcePattern = /^apps\/control-plane\/database\/seeders\/[a-z0-9._-]+\.php$/i
const providerUnavailableSourcePattern = /^provider-unavailable:(?:adsense|billing|ga4|gtm|pagespeed|search-console)$/i
const blockedExternalProviderSourcePattern =
  /^(?:adsense|billing-provider|ga4|google-analytics|gtm|pagespeed|search-console|stripe|mercado-pago|paddle):|^https?:\/\/(?:analytics\.google|search\.google|adsense\.google|pagead2\.googlesyndication|www\.googletagmanager|www\.google-analytics|api\.stripe|api\.mercadopago|api\.paddle)/i
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
const brazilDocumentPattern = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b|\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g
const secretAssignmentPattern = /\b(api[_-]?key|authorization|cookie|password|secret|session|token)\s*[:=]\s*[^\s,;]+/gi
const longTokenPattern = /\b[A-Za-z0-9_-]{32,}\b/g
const causalLanguagePattern = /\b(caused by|because of|due to|resulted from|led to|attributed to|driven by)\b/i
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/
const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}(?:T[0-9:.+-]+Z?)?$/

export function buildExecutiveReport(input: ExecutiveReportInput): ExecutiveReport {
  const reasons: string[] = []
  const periodType = normalizePeriodType(input.periodType)
  const periodStart = normalizeDate(input.periodStart)
  const periodEnd = normalizeDate(input.periodEnd)
  const generatedAt = input.generatedAt ? sanitizeIdentifier(input.generatedAt, 40) : null
  const narrative = input.narrative ? sanitizeText(input.narrative, '', 500) || null : null
  const items = sanitizeItems(input.items)

  if (!periodStart) {
    reasons.push('missing_period_start')
  }

  if (!periodEnd) {
    reasons.push('missing_period_end')
  }

  if (periodStart && periodEnd && periodStart > periodEnd) {
    reasons.push('invalid_period_range')
  }

  if (items.length === 0) {
    reasons.push('missing_report_items')
  }

  if (narrative && containsCausalLanguage(narrative)) {
    reasons.push('causality_claim_requires_manual_evidence')
  }

  if (items.some((item) => item.reasons.length > 0)) {
    reasons.push('item_validation_failed')
  }

  const dataStatusSummary = summarizeDataStatuses(items)
  const status: ReportStatus = reasons.length > 0 ? 'blocked' : 'ready'

  return {
    contractVersion: executiveReportContractVersion,
    title: sanitizeText(input.title, 'Executive report', 160),
    periodType,
    periodStart: periodStart || 'unknown',
    periodEnd: periodEnd || 'unknown',
    generatedAt,
    status,
    exportReady: status === 'ready',
    dataStatusSummary,
    causalityStatus: 'not_inferred',
    narrative,
    items,
    reasons: Array.from(new Set(reasons)),
  }
}

export function toExecutiveReportCsv(report: ExecutiveReport): string {
  const rows = [
    [
      'section',
      'label',
      'value',
      'unit',
      'data_status',
      'source',
      'evidence_count',
      'causality_status',
      'notes',
    ],
    ...report.items.map((item) => [
      item.section,
      item.label,
      item.value === null ? '' : String(item.value),
      item.unit ?? '',
      item.dataStatus,
      item.source,
      String(item.evidence.length),
      report.causalityStatus,
      item.notes ?? '',
    ]),
  ]

  return rows.map((row) => row.map(escapeCsvCell).join(',')).join('\n')
}

export function summarizeDataStatuses(items: ExecutiveReportItem[]): Record<ReportDataStatus, number> {
  const summary = reportDataStatuses.reduce((accumulator, status) => {
    accumulator[status] = 0
    return accumulator
  }, {} as Record<ReportDataStatus, number>)

  for (const item of items) {
    summary[item.dataStatus] += 1
  }

  return summary
}

function sanitizeItems(input: ExecutiveReportItemInput[] | null | undefined): ExecutiveReportItem[] {
  return (input ?? [])
    .map((item): ExecutiveReportItem => {
      const reasons: string[] = []
      const source = sanitizeSource(item.source)
      const sourceClassification = classifyReportEvidenceSource(source)
      const evidence = sanitizeEvidence(item.evidence)
      const notes = item.notes ? sanitizeText(item.notes, '', 280) || null : null

      if (!source) {
        reasons.push('missing_source')
      } else if (!isAllowedReportEvidenceSource(sourceClassification.status)) {
        reasons.push(sourceClassification.reason)
      }

      if (evidence.length === 0) {
        reasons.push('missing_evidence')
      }

      if (evidence.some((evidenceItem) => !isAllowedReportEvidenceSource(evidenceItem.sourceKind))) {
        reasons.push('unsupported_evidence_source')
      }

      if (notes && containsCausalLanguage(notes)) {
        reasons.push('causality_claim_requires_manual_evidence')
      }

      return {
        section: normalizeSection(item.section),
        label: sanitizeText(item.label, 'Untitled metric', 140),
        value: sanitizeValue(item.value),
        unit: item.unit ? sanitizeText(item.unit, '', 40) || null : null,
        dataStatus: normalizeDataStatus(item.dataStatus),
        source,
        sourceKind: sourceClassification.status,
        evidence,
        notes,
        reasons: Array.from(new Set(reasons)),
      }
    })
    .slice(0, 80)
}

function sanitizeEvidence(input: ReportEvidenceInput[] | null | undefined): ReportEvidence[] {
  return (input ?? [])
    .map((item): ReportEvidence | null => {
      const source = sanitizeSource(item.source)
      const sourceClassification = classifyReportEvidenceSource(source)
      const summary = sanitizeText(item.summary, '', 220)

      if (!source || !summary) {
        return null
      }

      return {
        source,
        sourceKind: sourceClassification.status,
        summary,
        observedAt: item.observedAt ? sanitizeIdentifier(item.observedAt, 40) : null,
      }
    })
    .filter((item): item is ReportEvidence => item !== null)
    .slice(0, 8)
}

function normalizePeriodType(value: string): ReportPeriodType {
  const normalized = String(value ?? '').trim().toLowerCase()

  return reportPeriodTypes.includes(normalized as ReportPeriodType)
    ? normalized as ReportPeriodType
    : 'weekly'
}

function normalizeSection(value: string): ReportSection {
  const normalized = String(value ?? '').trim().toLowerCase()

  return reportSections.includes(normalized as ReportSection)
    ? normalized as ReportSection
    : 'operations'
}

function normalizeDataStatus(value: string): ReportDataStatus {
  const normalized = String(value ?? '').trim().toLowerCase()

  return reportDataStatuses.includes(normalized as ReportDataStatus)
    ? normalized as ReportDataStatus
    : 'unavailable'
}

function normalizeDate(value: string): string | null {
  const normalized = String(value ?? '').trim()

  return isoDatePattern.test(normalized) ? normalized : null
}

function sanitizeValue(value: string | number | boolean | null): string | number | boolean | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? Number(value.toFixed(4)) : null
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    return sanitizeText(value, '', 160) || null
  }

  return null
}

function sanitizeText(value: string, fallback: string, maxLength: number): string {
  const normalized = String(value ?? '')
    .replace(emailPattern, '[redacted-email]')
    .replace(brazilDocumentPattern, '[redacted-document]')
    .replace(secretAssignmentPattern, '$1=[redacted]')
    .replace(longTokenPattern, '[redacted-token]')
    .trim()
    .replace(/\s+/g, ' ')

  return (normalized || fallback).slice(0, maxLength)
}

function sanitizeSource(value: string): string {
  const normalized = sanitizeIdentifier(value, 140).replace(/\\/g, '/').replace(/^\.\//, '')

  return safeSourcePattern.test(normalized) ? normalized : ''
}

function sanitizeIdentifier(value: string, maxLength: number): string {
  return sanitizeText(value, '', maxLength)
}

function containsCausalLanguage(value: string): boolean {
  return causalLanguagePattern.test(value)
}

function escapeCsvCell(value: string): string {
  const normalized = value.replace(/\r?\n/g, ' ')

  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`
  }

  return normalized
}

export function isIsoReportTimestamp(value: string): boolean {
  return isoDateTimePattern.test(value)
}

export function classifyReportEvidenceSource(source: string): ReportEvidenceSourceClassification {
  const normalizedSource = sanitizeSource(source)

  if (!normalizedSource) {
    return {
      source: '',
      status: 'unknown',
      reason: 'missing_source',
    }
  }

  if (internalDocumentSourcePattern.test(normalizedSource)) {
    return {
      source: normalizedSource,
      status: 'internal_document',
      reason: 'source_allowed_internal_document',
    }
  }

  if (publicWatchdogArtifactSourcePattern.test(normalizedSource)) {
    return {
      source: normalizedSource,
      status: 'public_watchdog_artifact',
      reason: 'source_allowed_public_watchdog_artifact',
    }
  }

  if (localMeasurementArtifactSourcePattern.test(normalizedSource)) {
    return {
      source: normalizedSource,
      status: 'local_measurement_artifact',
      reason: 'source_allowed_local_measurement_artifact',
    }
  }

  if (controlPlaneSeedSourcePattern.test(normalizedSource)) {
    return {
      source: normalizedSource,
      status: 'control_plane_seed',
      reason: 'source_allowed_control_plane_seed',
    }
  }

  if (providerUnavailableSourcePattern.test(normalizedSource)) {
    return {
      source: normalizedSource,
      status: 'provider_unavailable',
      reason: 'source_allowed_provider_unavailable',
    }
  }

  if (blockedExternalProviderSourcePattern.test(normalizedSource)) {
    return {
      source: normalizedSource,
      status: 'blocked_external_provider',
      reason: 'external_provider_source_blocked_until_human_gate',
    }
  }

  return {
    source: normalizedSource,
    status: 'unknown',
    reason: 'unsupported_evidence_source',
  }
}

export function summarizeReportEvidenceSources(report: Pick<ExecutiveReport, 'items'>): Record<ReportEvidenceSourceStatus, number> {
  const summary = reportEvidenceSourceStatuses.reduce((accumulator, status) => {
    accumulator[status] = 0
    return accumulator
  }, {} as Record<ReportEvidenceSourceStatus, number>)

  for (const item of report.items) {
    summary[item.sourceKind] += 1

    for (const evidence of item.evidence) {
      summary[evidence.sourceKind] += 1
    }
  }

  return summary
}

export function assertReportUsesInternalEvidence(report: Pick<ExecutiveReport, 'items'>): ReportEvidencePolicySummary {
  const blockedSources: ReportEvidenceSourceClassification[] = []

  for (const item of report.items) {
    if (!isAllowedReportEvidenceSource(item.sourceKind)) {
      blockedSources.push(classifyReportEvidenceSource(item.source))
    }

    for (const evidence of item.evidence) {
      if (!isAllowedReportEvidenceSource(evidence.sourceKind)) {
        blockedSources.push(classifyReportEvidenceSource(evidence.source))
      }
    }
  }

  return {
    allowed: blockedSources.length === 0,
    sourceSummary: summarizeReportEvidenceSources(report),
    blockedSources,
  }
}

function isAllowedReportEvidenceSource(status: ReportEvidenceSourceStatus): status is ReportEvidenceSourceKind {
  return reportEvidenceSourceKinds.includes(status as ReportEvidenceSourceKind)
}
