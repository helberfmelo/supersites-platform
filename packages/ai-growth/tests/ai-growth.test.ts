import { describe, expect, it } from 'vitest'
import {
  buildGrowthRecommendation,
  detectMetricAnomaly,
  prioritizeGrowthRecommendations,
  resolveGrowthAutomationGate,
  resolveGrowthPriorityGate,
  summarizeGrowthBacklog,
} from '../src/index'

const evidence = [
  {
    type: 'gate',
    source: 'docs/STATUS.md',
    summary: 'Sprint validation recorded with public smokes passing.',
    value: 'passed',
  },
]

describe('ai growth engine contracts', () => {
  it('blocks recommendations without evidence and required scores', () => {
    const recommendation = buildGrowthRecommendation({
      category: 'seo',
      title: 'Improve page cluster',
      recommendation: 'Review the SEO backlog.',
      impact: 4,
    })

    expect(recommendation.status).toBe('blocked')
    expect(recommendation.automationAllowed).toBe(false)
    expect(recommendation.reasons).toEqual([
      'missing_evidence',
      'missing_effort_score',
      'missing_confidence_score',
      'missing_risk_score',
    ])
  })

  it('creates evidence-backed recommendations with deterministic score', () => {
    const recommendation = buildGrowthRecommendation({
      category: 'technical',
      title: 'Reduce release friction',
      recommendation: 'Prioritize dry-run stability before more launches.',
      impact: 5,
      effort: 2,
      confidence: 4,
      risk: 2,
      evidence,
    })

    expect(recommendation.status).toBe('candidate')
    expect(recommendation.priorityScore).toBe(16)
    expect(recommendation.evidence).toHaveLength(1)
    expect(recommendation.automationAllowed).toBe(false)
  })

  it('keeps human-gated growth work closed', () => {
    const recommendation = buildGrowthRecommendation({
      category: 'monetization',
      title: 'Enable checkout',
      recommendation: 'Enable checkout only after KYC and tax gates are complete.',
      impact: 5,
      effort: 3,
      confidence: 5,
      risk: 5,
      evidence,
      humanGateRequired: true,
    })

    expect(recommendation.status).toBe('human_required')
    expect(recommendation.automationAllowed).toBe(false)
  })

  it('redacts PII and secret-like evidence values', () => {
    const tokenKey = ['tok', 'en'].join('')
    const tokenValue = 'abcd'.repeat(8)
    const apiKey = ['api', 'key'].join('_')
    const sampleSecret = ['super', 'secret', 'value'].join('-')

    const recommendation = buildGrowthRecommendation({
      category: 'aio',
      title: 'Audit request from user@example.com',
      recommendation: `Credential ${tokenKey}=${tokenValue} must not appear.`,
      impact: 3,
      effort: 2,
      confidence: 3,
      risk: 2,
      evidence: [
        {
          type: 'check',
          source: 'docs/STATUS.md',
          summary: `Contact user@example.com with ${apiKey}=${sampleSecret}.`,
          value: '12345678901234567890123456789012',
        },
      ],
    })

    expect(recommendation.title).toContain('[redacted-email]')
    expect(recommendation.recommendation).toContain('token=[redacted]')
    expect(recommendation.evidence[0]?.summary).toContain('api_key=[redacted]')
    expect(recommendation.evidence[0]?.value).toBe('[redacted-token]')
  })

  it('sorts recommendations by readiness and priority deterministically', () => {
    const low = buildGrowthRecommendation({
      category: 'seo',
      title: 'Low priority',
      recommendation: 'Small copy cleanup.',
      impact: 2,
      effort: 2,
      confidence: 3,
      risk: 1,
      evidence,
    })
    const high = buildGrowthRecommendation({
      category: 'technical',
      title: 'High priority',
      recommendation: 'Improve validation reliability.',
      impact: 5,
      effort: 1,
      confidence: 5,
      risk: 1,
      evidence,
    })
    const gated = buildGrowthRecommendation({
      category: 'monetization',
      title: 'Gated priority',
      recommendation: 'Submit provider account.',
      impact: 5,
      effort: 1,
      confidence: 5,
      risk: 1,
      evidence,
      humanGateRequired: true,
    })

    expect(prioritizeGrowthRecommendations([low, gated, high]).map((item) => item.title)).toEqual([
      'High priority',
      'Low priority',
      'Gated priority',
    ])
  })

  it('detects metric anomalies without inferring causes', () => {
    const anomaly = detectMetricAnomaly({
      metricKey: 'deploy_dry_run_artifact_quota_annotations',
      direction: 'increase',
      baselineValue: 0,
      currentValue: 1,
      thresholdPercent: 50,
      evidence,
    })

    expect(anomaly.status).toBe('watching')
    expect(anomaly.changePercent).toBe(100)
    expect(anomaly.causalityStatus).toBe('not_inferred')
    expect(anomaly.reasons).toEqual([])
  })

  it('requires samples and evidence before anomaly review', () => {
    const anomaly = detectMetricAnomaly({
      metricKey: 'public_smoke_failures',
      direction: 'increase',
    })

    expect(anomaly.status).toBe('insufficient_data')
    expect(anomaly.reasons).toEqual(['missing_metric_sample', 'missing_evidence'])
  })

  it('summarizes backlog readiness without allowing automation', () => {
    const ready = buildGrowthRecommendation({
      category: 'technical',
      title: 'Ready',
      recommendation: 'Review release metrics.',
      impact: 4,
      effort: 2,
      confidence: 4,
      risk: 2,
      evidence,
    })
    const gated = buildGrowthRecommendation({
      category: 'monetization',
      title: 'Gated',
      recommendation: 'Wait for billing gates.',
      impact: 5,
      effort: 3,
      confidence: 5,
      risk: 5,
      evidence,
      humanGateRequired: true,
    })

    expect(summarizeGrowthBacklog([ready, gated])).toMatchObject({
      total: 2,
      humanGateRequired: 1,
      evidenceBacked: 2,
      automationAllowed: 0,
    })
  })

  it('keeps priority gates local-only until provider data is available', () => {
    const recommendation = buildGrowthRecommendation({
      category: 'technical',
      title: 'Prioritize public smoke reliability',
      recommendation: 'Keep public smoke evidence ahead of automation.',
      impact: 5,
      effort: 2,
      confidence: 5,
      risk: 2,
      evidence,
    })

    expect(resolveGrowthPriorityGate({
      recommendations: [recommendation],
      providerDataStatuses: ['unavailable', 'delayed'],
    })).toMatchObject({
      status: 'local_evidence_only',
      dataStatus: 'unavailable',
      providerDataAvailable: false,
      causalityStatus: 'not_inferred',
      automaticPrioritizationEnabled: false,
      shouldCreatePr: false,
      reasons: ['provider_data_unavailable'],
    })
  })

  it('allows real-data priority review without automation or causality', () => {
    const recommendation = buildGrowthRecommendation({
      category: 'seo',
      title: 'Review high impression pages',
      recommendation: 'Use finalized provider evidence for operator review.',
      impact: 5,
      effort: 2,
      confidence: 4,
      risk: 3,
      evidence,
    })

    expect(resolveGrowthPriorityGate({
      recommendations: [recommendation],
      providerDataStatuses: ['finalized'],
    })).toMatchObject({
      status: 'real_data_ready',
      dataStatus: 'finalized',
      providerDataAvailable: true,
      causalityStatus: 'not_inferred',
      automaticPrioritizationEnabled: false,
      automationAllowed: false,
      externalAiAllowed: false,
      shouldCreatePr: false,
      reasons: [],
    })
  })

  it('marks low-risk evidence-backed work as PR-review-only without side effects', () => {
    const recommendation = buildGrowthRecommendation({
      category: 'technical',
      title: 'Tighten growth smoke checks',
      recommendation: 'Add a local assertion before any automated execution exists.',
      impact: 4,
      effort: 2,
      confidence: 4,
      risk: 2,
      evidence,
    })

    expect(resolveGrowthAutomationGate({
      recommendation,
      providerDataAvailable: false,
    })).toMatchObject({
      status: 'pr_review_only',
      riskLevel: 'low',
      prReviewAllowed: true,
      providerDataAvailable: false,
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
      reasons: ['provider_data_unavailable'],
    })
  })

  it('blocks growth automation for human-gated or higher-risk work', () => {
    const recommendation = buildGrowthRecommendation({
      category: 'monetization',
      title: 'Publish paid checkout',
      recommendation: 'Never publish checkout from the growth loop.',
      impact: 5,
      effort: 3,
      confidence: 5,
      risk: 5,
      evidence,
      humanGateRequired: true,
    })

    expect(resolveGrowthAutomationGate({
      recommendation,
      providerDataAvailable: true,
    })).toMatchObject({
      status: 'human_required',
      riskLevel: 'high',
      prReviewAllowed: false,
      providerDataAvailable: true,
      shouldCreateBranch: false,
      shouldOpenPullRequest: false,
      shouldAutoMerge: false,
      shouldPublish: false,
      reasons: ['risk_above_low_risk_threshold', 'human_review_required'],
    })
  })
})
