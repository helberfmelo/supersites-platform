import { describe, expect, it } from 'vitest'
import {
  assertReportUsesInternalEvidence,
  buildExecutiveReport,
  classifyReportEvidenceSource,
  growthReportingContractVersion,
  resolveGrowthReportingGate,
  summarizeDataStatuses,
  summarizeReportEvidenceSources,
  toExecutiveReportCsv,
} from '../src/index'

const evidence = [
  {
    source: 'docs/STATUS.md',
    summary: 'Quality Gate and Deploy Dry Run were monitored to success.',
    observedAt: '2026-06-27',
  },
]

describe('executive report contracts', () => {
  it('builds export-ready reports with explicit data status separation', () => {
    const report = buildExecutiveReport({
      title: 'Weekly executive readiness',
      periodType: 'weekly',
      periodStart: '2026-06-21',
      periodEnd: '2026-06-27',
      narrative: 'Status summary only; causality is not inferred.',
      items: [
        {
          section: 'delivery',
          label: 'Quality gates passed',
          value: 5,
          unit: 'runs',
          dataStatus: 'finalized',
          source: 'docs/STATUS.md',
          evidence,
        },
        {
          section: 'growth',
          label: 'Growth recommendations',
          value: 5,
          unit: 'items',
          dataStatus: 'estimated',
          source: 'docs/METRICS.md',
          evidence,
        },
      ],
    })

    expect(report.status).toBe('ready')
    expect(report.exportReady).toBe(true)
    expect(report.causalityStatus).toBe('not_inferred')
    expect(assertReportUsesInternalEvidence(report).allowed).toBe(true)
    expect(report.dataStatusSummary).toMatchObject({
      finalized: 1,
      estimated: 1,
      delayed: 0,
      unavailable: 0,
    })
  })

  it('blocks exports when evidence is missing', () => {
    const report = buildExecutiveReport({
      title: 'Monthly report',
      periodType: 'monthly',
      periodStart: '2026-06-01',
      periodEnd: '2026-06-27',
      items: [
        {
          section: 'traffic',
          label: 'Search traffic',
          value: null,
          dataStatus: 'unavailable',
          source: 'docs/ANALYTICS.md',
        },
      ],
    })

    expect(report.status).toBe('blocked')
    expect(report.exportReady).toBe(false)
    expect(report.reasons).toContain('item_validation_failed')
    expect(report.items[0]?.reasons).toEqual(['missing_evidence'])
  })

  it('blocks causal claims unless a future manual review contract exists', () => {
    const report = buildExecutiveReport({
      title: 'Weekly report',
      periodType: 'weekly',
      periodStart: '2026-06-21',
      periodEnd: '2026-06-27',
      narrative: 'Revenue changed due to launch work.',
      items: [
        {
          section: 'monetization',
          label: 'External revenue',
          value: 0,
          unit: 'USD',
          dataStatus: 'finalized',
          source: 'docs/METRICS.md',
          evidence,
        },
      ],
    })

    expect(report.status).toBe('blocked')
    expect(report.exportReady).toBe(false)
    expect(report.reasons).toContain('causality_claim_requires_manual_evidence')
  })

  it('classifies internal documents and measurement artifacts as allowed evidence', () => {
    expect(classifyReportEvidenceSource('docs/STATUS.md')).toMatchObject({
      status: 'internal_document',
    })
    expect(classifyReportEvidenceSource('artifacts/benchmark-crawl/2026-06-29T01-22-23-919Z/report.json')).toMatchObject({
      status: 'public_watchdog_artifact',
    })
    expect(classifyReportEvidenceSource('artifacts/google-readiness/2026-06-29T05-47-31Z/google-readiness.json')).toMatchObject({
      status: 'local_measurement_artifact',
    })
    expect(classifyReportEvidenceSource('apps/control-plane/database/seeders/ExecutiveReportReadinessSeeder.php')).toMatchObject({
      status: 'control_plane_seed',
    })
  })

  it('blocks active provider sources while allowing explicit unavailable markers', () => {
    const report = buildExecutiveReport({
      title: 'Provider report',
      periodType: 'weekly',
      periodStart: '2026-06-21',
      periodEnd: '2026-06-27',
      items: [
        {
          section: 'traffic',
          label: 'GA4 imported sessions',
          value: 42,
          dataStatus: 'finalized',
          source: 'ga4://properties/1234/reports',
          evidence: [
            {
              source: 'https://analytics.google.com/reporting',
              summary: 'Provider data import should not be consumed before gates exist.',
            },
          ],
        },
        {
          section: 'traffic',
          label: 'Search Console import',
          value: 'not_active',
          dataStatus: 'unavailable',
          source: 'provider-unavailable:search-console',
          evidence: [
            {
              source: 'docs/ANALYTICS.md',
              summary: 'Search Console import remains gated.',
            },
          ],
        },
      ],
    })

    const policy = assertReportUsesInternalEvidence(report)

    expect(report.status).toBe('blocked')
    expect(report.reasons).toContain('item_validation_failed')
    expect(report.items[0]?.reasons).toContain('external_provider_source_blocked_until_human_gate')
    expect(policy.allowed).toBe(false)
    expect(policy.blockedSources.map((source) => source.status)).toContain('blocked_external_provider')
    expect(report.items[1]?.reasons).toEqual([])
    expect(summarizeReportEvidenceSources(report).provider_unavailable).toBe(1)
  })

  it('redacts PII and secret-like values before export', () => {
    const apiKey = ['api', 'key'].join('_')
    const sampleSecret = ['sample', 'secret'].join('-')
    const report = buildExecutiveReport({
      title: 'Report for finance@example.com',
      periodType: 'weekly',
      periodStart: '2026-06-21',
      periodEnd: '2026-06-27',
      items: [
        {
          section: 'billing',
          label: `Provider ${apiKey}=${sampleSecret}`,
          value: 'abcdefghijklmnopqrstuvwxyz123456',
          dataStatus: 'delayed',
          source: 'docs/BILLING.md',
          evidence,
        },
      ],
    })

    expect(report.title).toContain('[redacted-email]')
    expect(report.items[0]?.label).toContain('api_key=[redacted]')
    expect(report.items[0]?.value).toBe('[redacted-token]')
  })

  it('exports CSV with item data status and causality status columns', () => {
    const report = buildExecutiveReport({
      title: 'Weekly executive readiness',
      periodType: 'weekly',
      periodStart: '2026-06-21',
      periodEnd: '2026-06-27',
      items: [
        {
          section: 'quality',
          label: 'Public smokes',
          value: 3,
          unit: 'passed',
          dataStatus: 'finalized',
          source: 'docs/STATUS.md',
          evidence,
        },
      ],
    })

    const csv = toExecutiveReportCsv(report)

    expect(csv).toContain('data_status')
    expect(csv).toContain('causality_status')
    expect(csv).toContain('finalized')
    expect(csv).toContain('not_inferred')
  })

  it('summarizes statuses deterministically', () => {
    const report = buildExecutiveReport({
      title: 'Monthly executive readiness',
      periodType: 'monthly',
      periodStart: '2026-06-01',
      periodEnd: '2026-06-27',
      items: [
        {
          section: 'traffic',
          label: 'Search Console import',
          value: 'not_active',
          dataStatus: 'unavailable',
          source: 'docs/ANALYTICS.md',
          evidence,
        },
        {
          section: 'billing',
          label: 'Billing provider settlement',
          value: 'not_active',
          dataStatus: 'delayed',
          source: 'docs/BILLING.md',
          evidence,
        },
      ],
    })

    expect(summarizeDataStatuses(report.items)).toEqual({
      finalized: 0,
      estimated: 0,
      delayed: 1,
      unavailable: 1,
    })
  })

  it('keeps growth reporting review-only and fail-closed for delivery', () => {
    const gate = resolveGrowthReportingGate({
      reportStatus: 'ready',
      exportReady: true,
      evidencePolicyAllowed: true,
      causalityStatus: 'not_inferred',
      dataStatusSummary: {
        finalized: 4,
        estimated: 1,
        delayed: 0,
        unavailable: 1,
      },
      beforeAfterItems: 5,
    })

    expect(gate.contractVersion).toBe(growthReportingContractVersion)
    expect(gate.status).toBe('review_ready')
    expect(gate.reportReviewReady).toBe(true)
    expect(gate.beforeAfterReviewReady).toBe(true)
    expect(gate.sideEffects).toBe('none')
    expect(gate.recurringDeliveryAllowed).toBe(false)
    expect(gate.emailDeliveryAllowed).toBe(false)
    expect(gate.providerImportAllowed).toBe(false)
    expect(gate.revenueReportingAllowed).toBe(false)
    expect(gate.shouldScheduleReport).toBe(false)
    expect(gate.shouldSendEmail).toBe(false)
    expect(gate.shouldImportProviderData).toBe(false)
    expect(gate.shouldInferCausality).toBe(false)
    expect(gate.causalityStatus).toBe('not_inferred')
    expect(gate.blockers).toEqual([])
  })

  it('blocks causal claims and requires human gates for recurring or provider-backed reporting', () => {
    expect(resolveGrowthReportingGate({
      reportStatus: 'ready',
      exportReady: true,
      evidencePolicyAllowed: true,
      causalityStatus: 'attributed',
      beforeAfterItems: 4,
    })).toMatchObject({
      status: 'blocked',
      reportReviewReady: false,
      shouldInferCausality: false,
      blockers: ['causality_review_required'],
    })

    const providerBackedGate = resolveGrowthReportingGate({
      reportStatus: 'ready',
      exportReady: true,
      evidencePolicyAllowed: true,
      causalityStatus: 'not_inferred',
      beforeAfterItems: 4,
      recurringDeliveryEnabled: true,
      externalRecipientsEnabled: true,
      providerImportsEnabled: 2,
      revenueReportingEnabled: true,
    })

    expect(providerBackedGate.status).toBe('human_required')
    expect(providerBackedGate.reportReviewReady).toBe(false)
    expect(providerBackedGate.shouldScheduleReport).toBe(false)
    expect(providerBackedGate.shouldSendEmail).toBe(false)
    expect(providerBackedGate.shouldImportProviderData).toBe(false)
    expect(providerBackedGate.blockers).toEqual([
      'recurring_delivery_human_gate_required',
      'external_recipients_human_gate_required',
      'provider_import_human_gate_required',
      'revenue_reporting_human_gate_required',
    ])
  })
})
