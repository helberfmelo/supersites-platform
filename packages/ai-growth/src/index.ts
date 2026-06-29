export const aiGrowthContractVersion = '2026-06-27.1'
export const growthPriorityContractVersion = '2026-06-29.16.2'
export const growthAutomationContractVersion = '2026-06-29.16.3'

export const growthCategories = ['technical', 'seo', 'aio', 'monetization', 'anomaly', 'prioritization'] as const

export const growthEvidenceTypes = ['metric', 'check', 'gate', 'runbook', 'human_required'] as const

export type GrowthCategory = (typeof growthCategories)[number]
export type GrowthEvidenceType = (typeof growthEvidenceTypes)[number]
export type GrowthStatus = 'candidate' | 'human_required' | 'blocked' | 'accepted' | 'watching'
export type GrowthAnomalyDirection = 'increase' | 'decrease' | 'any'
export type GrowthAnomalyStatus = 'within_threshold' | 'watching' | 'insufficient_data'
export type GrowthPriorityStatus = 'local_evidence_only' | 'real_data_ready' | 'human_required' | 'blocked'
export type GrowthPriorityDataStatus = 'finalized' | 'estimated' | 'delayed' | 'unavailable'
export type GrowthAutomationStatus = 'pr_review_only' | 'human_required' | 'blocked'
export type GrowthAutomationRiskLevel = 'low' | 'medium' | 'high' | 'unknown'

export interface GrowthEvidenceInput {
  type: string
  source: string
  summary: string
  value?: string | number | boolean | null
  observedAt?: string | null
}

export interface GrowthEvidence {
  type: GrowthEvidenceType
  source: string
  summary: string
  value: string | number | boolean | null
  observedAt: string | null
}

export interface GrowthRecommendationInput {
  category: string
  title: string
  recommendation: string
  impact?: number | null
  effort?: number | null
  confidence?: number | null
  risk?: number | null
  evidence?: GrowthEvidenceInput[] | null
  status?: GrowthStatus | null
  humanGateRequired?: boolean
}

export interface GrowthRecommendation {
  contractVersion: string
  category: GrowthCategory
  title: string
  recommendation: string
  impactScore: number | null
  effortScore: number | null
  confidenceScore: number | null
  riskScore: number | null
  priorityScore: number | null
  status: GrowthStatus
  evidence: GrowthEvidence[]
  humanGateRequired: boolean
  automationAllowed: false
  reasons: string[]
}

export interface GrowthAnomalyInput {
  metricKey: string
  direction: GrowthAnomalyDirection
  baselineValue?: number | null
  currentValue?: number | null
  thresholdPercent?: number | null
  evidence?: GrowthEvidenceInput[] | null
}

export interface GrowthAnomaly {
  contractVersion: string
  metricKey: string
  direction: GrowthAnomalyDirection
  baselineValue: number | null
  currentValue: number | null
  thresholdPercent: number
  changePercent: number | null
  status: GrowthAnomalyStatus
  evidence: GrowthEvidence[]
  causalityStatus: 'not_inferred'
  reasons: string[]
}

export interface GrowthBacklogSummary {
  contractVersion: string
  total: number
  byCategory: Record<GrowthCategory, number>
  humanGateRequired: number
  blocked: number
  evidenceBacked: number
  automationAllowed: 0
}

export interface GrowthPriorityGateInput {
  recommendations?: GrowthRecommendation[] | null
  providerDataStatuses?: Array<string | null | undefined> | null
  humanReviewRequired?: boolean
}

export interface GrowthPriorityGate {
  contractVersion: string
  status: GrowthPriorityStatus
  dataStatus: GrowthPriorityDataStatus
  providerDataAvailable: boolean
  causalityStatus: 'not_inferred'
  automaticPrioritizationEnabled: false
  automationAllowed: false
  externalAiAllowed: false
  shouldCreatePr: false
  reasons: string[]
}

export interface GrowthAutomationGateInput {
  recommendation?: GrowthRecommendation | null
  riskScore?: number | null
  evidenceCount?: number | null
  providerDataAvailable?: boolean
  humanReviewRequired?: boolean
  sourceStatus?: GrowthStatus | GrowthPriorityStatus | GrowthAutomationStatus | null
}

export interface GrowthAutomationGate {
  contractVersion: string
  status: GrowthAutomationStatus
  riskLevel: GrowthAutomationRiskLevel
  prReviewAllowed: boolean
  providerDataAvailable: boolean
  branchCreationAllowed: false
  pullRequestCreationAllowed: false
  autoMergeAllowed: false
  directPublishAllowed: false
  externalAiAllowed: false
  shouldCreateBranch: false
  shouldOpenPullRequest: false
  shouldAutoMerge: false
  shouldPublish: false
  sideEffects: 'none'
  reasons: string[]
}

const safeIdPattern = /^[a-z0-9]+(?:[-_.:][a-z0-9]+)*$/i
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
const brazilDocumentPattern = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b|\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g
const secretAssignmentPattern = /\b(api[_-]?key|authorization|cookie|password|secret|session|token)\s*[:=]\s*[^\s,;]+/gi
const longTokenPattern = /\b[A-Za-z0-9_-]{32,}\b/g

export function buildGrowthRecommendation(input: GrowthRecommendationInput): GrowthRecommendation {
  const reasons: string[] = []
  const category = normalizeCategory(input.category)
  const evidence = sanitizeEvidence(input.evidence)
  const impactScore = normalizeScore(input.impact)
  const effortScore = normalizeScore(input.effort)
  const confidenceScore = normalizeScore(input.confidence)
  const riskScore = normalizeScore(input.risk)
  const humanGateRequired = Boolean(input.humanGateRequired)

  if (evidence.length === 0) {
    reasons.push('missing_evidence')
  }

  if (impactScore === null) {
    reasons.push('missing_impact_score')
  }

  if (effortScore === null) {
    reasons.push('missing_effort_score')
  }

  if (confidenceScore === null) {
    reasons.push('missing_confidence_score')
  }

  if (riskScore === null) {
    reasons.push('missing_risk_score')
  }

  const status = resolveStatus(input.status, humanGateRequired, reasons)
  const priorityScore = impactScore === null || effortScore === null || confidenceScore === null || riskScore === null
    ? null
    : calculatePriorityScore(impactScore, effortScore, confidenceScore, riskScore)

  return {
    contractVersion: aiGrowthContractVersion,
    category,
    title: sanitizeText(input.title, 'Untitled recommendation', 120),
    recommendation: sanitizeText(input.recommendation, 'Review evidence before action.', 360),
    impactScore,
    effortScore,
    confidenceScore,
    riskScore,
    priorityScore,
    status,
    evidence,
    humanGateRequired,
    automationAllowed: false,
    reasons: Array.from(new Set(reasons)),
  }
}

export function prioritizeGrowthRecommendations(items: GrowthRecommendation[]): GrowthRecommendation[] {
  return [...items].sort((left, right) => {
    const leftBlocked = left.status === 'blocked' ? 1 : 0
    const rightBlocked = right.status === 'blocked' ? 1 : 0

    if (leftBlocked !== rightBlocked) {
      return leftBlocked - rightBlocked
    }

    const leftHuman = left.humanGateRequired ? 1 : 0
    const rightHuman = right.humanGateRequired ? 1 : 0

    if (leftHuman !== rightHuman) {
      return leftHuman - rightHuman
    }

    const scoreDiff = (right.priorityScore ?? -999) - (left.priorityScore ?? -999)

    if (scoreDiff !== 0) {
      return scoreDiff
    }

    const confidenceDiff = (right.confidenceScore ?? 0) - (left.confidenceScore ?? 0)

    if (confidenceDiff !== 0) {
      return confidenceDiff
    }

    const riskDiff = (left.riskScore ?? 99) - (right.riskScore ?? 99)

    if (riskDiff !== 0) {
      return riskDiff
    }

    return left.title.localeCompare(right.title)
  })
}

export function detectMetricAnomaly(input: GrowthAnomalyInput): GrowthAnomaly {
  const reasons: string[] = []
  const metricKey = normalizeMetricKey(input.metricKey)
  const baselineValue = normalizeNumber(input.baselineValue)
  const currentValue = normalizeNumber(input.currentValue)
  const thresholdPercent = normalizeThreshold(input.thresholdPercent)
  const evidence = sanitizeEvidence(input.evidence)

  if (!metricKey) {
    reasons.push('missing_metric_key')
  }

  if (baselineValue === null || currentValue === null) {
    reasons.push('missing_metric_sample')
  }

  if (evidence.length === 0) {
    reasons.push('missing_evidence')
  }

  const changePercent = baselineValue === null || currentValue === null
    ? null
    : calculateChangePercent(baselineValue, currentValue)
  const status = reasons.length > 0
    ? 'insufficient_data'
    : isOutsideThreshold(changePercent, thresholdPercent, input.direction)
      ? 'watching'
      : 'within_threshold'

  return {
    contractVersion: aiGrowthContractVersion,
    metricKey: metricKey || 'unknown_metric',
    direction: input.direction,
    baselineValue,
    currentValue,
    thresholdPercent,
    changePercent,
    status,
    evidence,
    causalityStatus: 'not_inferred',
    reasons: Array.from(new Set(reasons)),
  }
}

export function summarizeGrowthBacklog(items: GrowthRecommendation[]): GrowthBacklogSummary {
  const byCategory = growthCategories.reduce((summary, category) => {
    summary[category] = 0
    return summary
  }, {} as Record<GrowthCategory, number>)

  let humanGateRequired = 0
  let blocked = 0
  let evidenceBacked = 0

  for (const item of items) {
    byCategory[item.category] += 1

    if (item.humanGateRequired) {
      humanGateRequired += 1
    }

    if (item.status === 'blocked') {
      blocked += 1
    }

    if (item.evidence.length > 0) {
      evidenceBacked += 1
    }
  }

  return {
    contractVersion: aiGrowthContractVersion,
    total: items.length,
    byCategory,
    humanGateRequired,
    blocked,
    evidenceBacked,
    automationAllowed: 0,
  }
}

export function resolveGrowthPriorityGate(input: GrowthPriorityGateInput): GrowthPriorityGate {
  const recommendations = input.recommendations ?? []
  const providerStatuses = input.providerDataStatuses ?? []
  const providerDataAvailable = providerStatuses.some((status) => normalizePriorityDataStatus(status) === 'finalized')
  const hasEvidenceBackedRecommendation = recommendations.some((item) => item.evidence.length > 0 && item.priorityScore !== null)
  const hasBlockedRecommendation = recommendations.some((item) => item.status === 'blocked')
  const humanReviewRequired = Boolean(input.humanReviewRequired)
    || recommendations.some((item) => item.humanGateRequired)

  const reasons: string[] = []

  if (recommendations.length === 0) {
    reasons.push('missing_recommendations')
  }

  if (!hasEvidenceBackedRecommendation) {
    reasons.push('missing_evidence_backed_priority')
  }

  if (!providerDataAvailable) {
    reasons.push('provider_data_unavailable')
  }

  if (hasBlockedRecommendation) {
    reasons.push('blocked_recommendations_present')
  }

  if (humanReviewRequired) {
    reasons.push('human_review_required')
  }

  const status: GrowthPriorityStatus = recommendations.length === 0 || !hasEvidenceBackedRecommendation
    ? 'blocked'
    : humanReviewRequired
      ? 'human_required'
      : providerDataAvailable
        ? 'real_data_ready'
        : 'local_evidence_only'

  return {
    contractVersion: growthPriorityContractVersion,
    status,
    dataStatus: providerDataAvailable ? 'finalized' : 'unavailable',
    providerDataAvailable,
    causalityStatus: 'not_inferred',
    automaticPrioritizationEnabled: false,
    automationAllowed: false,
    externalAiAllowed: false,
    shouldCreatePr: false,
    reasons: Array.from(new Set(reasons)),
  }
}

export function resolveGrowthAutomationGate(input: GrowthAutomationGateInput): GrowthAutomationGate {
  const recommendation = input.recommendation ?? null
  const evidenceCount = input.evidenceCount ?? recommendation?.evidence.length ?? 0
  const riskScore = normalizeScore(input.riskScore ?? recommendation?.riskScore)
  const sourceStatus = input.sourceStatus ?? recommendation?.status ?? null
  const humanReviewRequired = Boolean(input.humanReviewRequired)
    || Boolean(recommendation?.humanGateRequired)
    || sourceStatus === 'human_required'
  const providerDataAvailable = Boolean(input.providerDataAvailable)
  const reasons: string[] = []

  if (recommendation === null) {
    reasons.push('missing_recommendation')
  }

  if (evidenceCount === 0) {
    reasons.push('missing_evidence')
  }

  if (riskScore === null) {
    reasons.push('missing_risk_score')
  } else if (riskScore > 2) {
    reasons.push('risk_above_low_risk_threshold')
  }

  if (sourceStatus === 'blocked') {
    reasons.push('blocked_recommendation')
  }

  if (humanReviewRequired) {
    reasons.push('human_review_required')
  }

  if (!providerDataAvailable) {
    reasons.push('provider_data_unavailable')
  }

  const blocked = recommendation === null
    || evidenceCount === 0
    || riskScore === null
    || riskScore > 2
    || sourceStatus === 'blocked'

  const status: GrowthAutomationStatus = humanReviewRequired
    ? 'human_required'
    : blocked
      ? 'blocked'
      : 'pr_review_only'

  return {
    contractVersion: growthAutomationContractVersion,
    status,
    riskLevel: automationRiskLevel(riskScore),
    prReviewAllowed: status === 'pr_review_only',
    providerDataAvailable,
    branchCreationAllowed: false,
    pullRequestCreationAllowed: false,
    autoMergeAllowed: false,
    directPublishAllowed: false,
    externalAiAllowed: false,
    shouldCreateBranch: false,
    shouldOpenPullRequest: false,
    shouldAutoMerge: false,
    shouldPublish: false,
    sideEffects: 'none',
    reasons: Array.from(new Set(reasons)),
  }
}

export function calculatePriorityScore(impact: number, effort: number, confidence: number, risk: number): number {
  return (impact * confidence) - effort - risk
}

function normalizeCategory(value: string): GrowthCategory {
  const normalized = String(value ?? '').trim().toLowerCase()

  return growthCategories.includes(normalized as GrowthCategory)
    ? normalized as GrowthCategory
    : 'prioritization'
}

function normalizeScore(value: number | null | undefined): number | null {
  if (!Number.isFinite(value)) {
    return null
  }

  const score = Math.trunc(Number(value))

  return score >= 1 && score <= 5 ? score : null
}

function resolveStatus(status: GrowthStatus | null | undefined, humanGateRequired: boolean, reasons: string[]): GrowthStatus {
  if (reasons.length > 0) {
    return 'blocked'
  }

  if (humanGateRequired) {
    return 'human_required'
  }

  return status ?? 'candidate'
}

function sanitizeEvidence(input: GrowthEvidenceInput[] | null | undefined): GrowthEvidence[] {
  return (input ?? [])
    .map((item): GrowthEvidence | null => {
      const type = normalizeEvidenceType(item.type)
      const source = sanitizeIdentifier(item.source, 120)
      const summary = sanitizeText(item.summary, '', 240)

      if (!source || !summary) {
        return null
      }

      return {
        type,
        source,
        summary,
        value: sanitizeEvidenceValue(item.value),
        observedAt: item.observedAt ? sanitizeIdentifier(item.observedAt, 40) : null,
      }
    })
    .filter((item): item is GrowthEvidence => item !== null)
    .slice(0, 12)
}

function normalizeEvidenceType(value: string): GrowthEvidenceType {
  const normalized = String(value ?? '').trim().toLowerCase()

  return growthEvidenceTypes.includes(normalized as GrowthEvidenceType)
    ? normalized as GrowthEvidenceType
    : 'check'
}

function sanitizeEvidenceValue(value: string | number | boolean | null | undefined): string | number | boolean | null {
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

function sanitizeIdentifier(value: string, maxLength: number): string {
  const normalized = sanitizeText(value, '', maxLength)

  return safeIdPattern.test(normalized) || normalized.includes('/') ? normalized : ''
}

function normalizeMetricKey(value: string): string {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._:-]+/g, '_')
    .replace(/^_+|_+$/g, '')

  return normalized.slice(0, 120)
}

function normalizePriorityDataStatus(value: string | null | undefined): GrowthPriorityDataStatus {
  const normalized = String(value ?? '').trim().toLowerCase()

  return ['finalized', 'estimated', 'delayed', 'unavailable'].includes(normalized)
    ? normalized as GrowthPriorityDataStatus
    : 'unavailable'
}

function automationRiskLevel(riskScore: number | null): GrowthAutomationRiskLevel {
  if (riskScore === null) {
    return 'unknown'
  }

  if (riskScore <= 2) {
    return 'low'
  }

  if (riskScore <= 4) {
    return 'medium'
  }

  return 'high'
}

function normalizeNumber(value: number | null | undefined): number | null {
  return Number.isFinite(value) ? Number(Number(value).toFixed(4)) : null
}

function normalizeThreshold(value: number | null | undefined): number {
  if (!Number.isFinite(value)) {
    return 20
  }

  return Math.max(1, Math.min(500, Number(Number(value).toFixed(2))))
}

function calculateChangePercent(baseline: number, current: number): number {
  if (baseline === 0) {
    return current === 0 ? 0 : 100
  }

  return Number((((current - baseline) / Math.abs(baseline)) * 100).toFixed(2))
}

function isOutsideThreshold(changePercent: number | null, thresholdPercent: number, direction: GrowthAnomalyDirection): boolean {
  if (changePercent === null) {
    return false
  }

  if (direction === 'increase') {
    return changePercent >= thresholdPercent
  }

  if (direction === 'decrease') {
    return changePercent <= -thresholdPercent
  }

  return Math.abs(changePercent) >= thresholdPercent
}
