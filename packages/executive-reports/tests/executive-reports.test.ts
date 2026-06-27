import { describe, expect, it } from 'vitest'
import {
  buildExecutiveReport,
  summarizeDataStatuses,
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
})
