export const executiveReportContractVersion = '2026-06-27.1'

export const reportPeriodTypes = ['weekly', 'monthly'] as const
export const reportDataStatuses = ['finalized', 'estimated', 'delayed', 'unavailable'] as const
export const reportSections = ['delivery', 'quality', 'traffic', 'monetization', 'billing', 'growth', 'operations'] as const

export type ReportPeriodType = (typeof reportPeriodTypes)[number]
export type ReportDataStatus = (typeof reportDataStatuses)[number]
export type ReportSection = (typeof reportSections)[number]
export type ReportStatus = 'ready' | 'needs_review' | 'blocked'

export interface ReportEvidenceInput {
  source: string
  summary: string
  observedAt?: string | null
}

export interface ReportEvidence {
  source: string
  summary: string
  observedAt: string | null
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

const safeSourcePattern = /^[a-z0-9][a-z0-9._:/-]*$/i
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
      const evidence = sanitizeEvidence(item.evidence)
      const notes = item.notes ? sanitizeText(item.notes, '', 280) || null : null

      if (!source) {
        reasons.push('missing_source')
      }

      if (evidence.length === 0) {
        reasons.push('missing_evidence')
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
      const summary = sanitizeText(item.summary, '', 220)

      if (!source || !summary) {
        return null
      }

      return {
        source,
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
  const normalized = sanitizeIdentifier(value, 140)

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
