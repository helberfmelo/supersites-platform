import { describe, expect, it } from 'vitest'
import { publicLocaleCodes } from '../app/data/locales'
import {
  buildCityBusinessTimeline,
  buildCityOverlapSnapshot,
  cityTimePageCatalog,
  getCityTimePageBySlug,
  getCityTimePageCopy,
} from '../app/data/cityPages'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { getPlannerPageBySlug, getPlannerPageCopy, plannerPageCatalog } from '../app/data/plannerPages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  createTimeToolAnswerSummary,
  createTimeToolStructuredData,
  createTimeToolTimeline,
  buildMeetingPlannerResult,
  executeTimeTool,
  filterTimeTools,
  formatPlannerZone,
  getRelatedTimeTools,
  getTimeToolBySlug,
  getTimeToolCopy,
  plannerZoneGroups,
  timeToolCatalog,
  timeToolSlugs,
  zonedLocalDateTimeToUtc,
} from '../app/data/tools'
import { createTimeNexusToolEvent } from '../app/utils/analytics'

function withoutDiacritics(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

describe('TimeNexus MVP', () => {
  it('lists browser tools in roadmap order', () => {
    expect(timeToolCatalog.map((tool) => tool.slug)).toEqual([...timeToolSlugs])
    expect(timeToolCatalog).toHaveLength(7)
    expect(getTimeToolBySlug('timezone-converter')?.localized.en.shortName).toBe('Zones')
    expect(getTimeToolBySlug('missing')).toBeNull()
  })

  it('keeps localized tool content complete', () => {
    for (const tool of timeToolCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getTimeToolCopy(tool, locale)

        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.contentSections).toHaveLength(3)
        expect(copy.faq).toHaveLength(2)
        expect(copy.freeScope.length).toBeGreaterThan(20)
        expect(copy.upgradeScope.length).toBeGreaterThan(20)
      }
    }
  })

  it('runs timezone, date and business-day helpers deterministically', async () => {
    const zones = await executeTimeTool(
      'timezone-converter',
      '2026-06-26T15:30:00Z',
      'America/New_York -> Europe/London',
      'instant',
    )
    expect(zones.ok).toBe(true)
    expect(zones.output).toContain('Input instant: 2026-06-26T15:30:00.000Z')
    expect(zones.output).toContain('America/New_York')
    expect(zones.output).toContain('Europe/London')

    const diff = await executeTimeTool('date-difference', '2026-01-01', '2026-02-15', 'calendar-days')
    expect(diff.ok).toBe(true)
    expect(diff.output).toContain('Calendar days: 45')

    const businessDays = await executeTimeTool('business-days', '2026-06-01', '2026-06-05', 'mon-fri-inclusive')
    expect(businessDays.ok).toBe(true)
    expect(businessDays.output).toContain('Business days: 5')
  })

  it('creates direct answers, timelines and related tool suggestions', async () => {
    const zoneTool = getTimeToolBySlug('timezone-converter')
    expect(zoneTool).not.toBeNull()

    const zones = await executeTimeTool(
      'timezone-converter',
      '2026-06-26T15:30:00Z',
      'America/New_York -> Europe/London',
      'instant',
    )
    const summary = createTimeToolAnswerSummary('timezone-converter', zones)
    const timeline = createTimeToolTimeline('timezone-converter', zones)

    expect(summary?.primary).toContain('Europe/London')
    expect(summary?.secondary).toContain('UTC')
    expect(summary?.details).toHaveLength(2)
    expect(timeline.map((item) => item.label)).toEqual(['UTC', 'America/New_York', 'Europe/London'])

    expect(getRelatedTimeTools(zoneTool!).map((tool) => tool.slug)).toEqual([
      'date-difference',
      'business-days',
      'timestamp-converter',
    ])

    const businessDays = await executeTimeTool('business-days', '2026-06-01', '2026-06-05', 'mon-fri-inclusive')
    expect(createTimeToolAnswerSummary('business-days', businessDays)?.primary).toBe('Business days: 5')
    expect(createTimeToolTimeline('business-days', businessDays)).toEqual([])
  })

  it('builds world clock planner slots without persistence', () => {
    const utc = zonedLocalDateTimeToUtc('2026-06-26T09:30', 'America/New_York')
    expect(utc.toISOString()).toBe('2026-06-26T13:30:00.000Z')

    const london = formatPlannerZone(utc, { label: 'London', zone: 'Europe/London' }, 'en')
    expect(london.label).toBe('London')
    expect(london.zone).toBe('Europe/London')
    expect(london.businessStatus).toBe('business')

    const result = buildMeetingPlannerResult({
      localDateTime: '2026-06-26T09:30',
      sourceZone: 'America/New_York',
      durationMinutes: 60,
      targetZones: plannerZoneGroups[0].zones,
      locale: 'en',
    })

    expect(result.utcInstant).toBe('2026-06-26T13:30:00.000Z')
    expect(result.durationMinutes).toBe(60)
    expect(result.zones.map((zone) => zone.label)).toEqual(['New York', 'Sao Paulo', 'London', 'Berlin'])
    expect(result.zones.filter((zone) => zone.businessStatus === 'business').length).toBeGreaterThanOrEqual(3)
    expect(result.suggestions.map((slot) => slot.label)).toEqual(['-2h', 'Anchor', '+2h'])
    expect(JSON.stringify(result)).not.toContain('localStorage')
  })

  it('keeps curated world clock pages limited and useful', () => {
    expect(plannerPageCatalog.map((page) => page.slug)).toEqual(['americas-europe', 'global-product', 'apac-europe'])
    expect(getPlannerPageBySlug('global-product')?.group.zones.map((zone) => zone.zone)).toContain('Asia/Tokyo')
    expect(getPlannerPageBySlug('missing')).toBeNull()

    for (const page of plannerPageCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getPlannerPageCopy(page, locale)

        expect(copy.title.length).toBeGreaterThan(20)
        expect(copy.description.length).toBeGreaterThan(80)
        expect(copy.sections).toHaveLength(3)
        expect(copy.sections[1].paragraphs[0]).toContain(page.group.zones[0].zone)
      }
    }
  })

  it('keeps curated city time pages finite and useful', () => {
    expect(cityTimePageCatalog.map((page) => page.slug)).toEqual([
      'new-york',
      'sao-paulo',
      'london',
      'berlin',
      'san-francisco',
      'tokyo',
      'singapore',
      'sydney',
    ])
    expect(new Set(cityTimePageCatalog.map((page) => page.timeZone)).size).toBe(8)
    expect(getCityTimePageBySlug('missing')).toBeNull()

    const tokyo = getCityTimePageBySlug('tokyo')
    expect(tokyo).not.toBeNull()
    expect(tokyo?.primaryGroup).toBe('global-product')

    const timeline = buildCityBusinessTimeline(tokyo!, 'en')
    const currentUtcDate = new Date().toISOString().slice(0, 10)
    expect(timeline).toHaveLength(4)
    expect(timeline[1].localTime).toContain('09:00')
    expect(timeline[1].utcTime).toBe(`${currentUtcDate}T00:00:00.000Z`)

    const overlap = buildCityOverlapSnapshot(tokyo!, 'en')
    expect(overlap.map((zone) => zone.label)).toEqual(['Tokyo', 'San Francisco', 'London', 'Sydney'])
    expect(overlap[0].businessStatus).toBe('business')

    for (const page of cityTimePageCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getCityTimePageCopy(page, locale)

        expect(withoutDiacritics(copy.title)).toContain(page.city)
        expect(copy.description.length).toBeGreaterThan(110)
        expect(copy.sections).toHaveLength(4)
        expect(copy.sections[0].paragraphs[0]).toContain(page.timeZone)
        expect(copy.sections[2].paragraphs[0]).toContain(page.relatedZones[0].label)
      }
    }
  })

  it('supports timestamp, age, percentage and unit helpers', async () => {
    const timestamp = await executeTimeTool('timestamp-converter', '1767225600', 'America/Sao_Paulo', 'auto')
    expect(timestamp.ok).toBe(true)
    expect(timestamp.output).toContain('2026-01-01T00:00:00.000Z')
    expect(timestamp.output).toContain('America/Sao_Paulo')

    const age = await executeTimeTool('age-calculator', '1990-06-15', '2026-06-26', 'ymd')
    expect(age.ok).toBe(true)
    expect(age.output).toContain('Age: 36 years, 0 months, 11 days')

    const percentOf = await executeTimeTool('percentage-calculator', '250', '40', 'percent-of')
    expect(percentOf.ok).toBe(true)
    expect(percentOf.output).toContain('40% of 250 = 100')

    const change = await executeTimeTool('percentage-calculator', '80', '100', 'percent-change')
    expect(change.ok).toBe(true)
    expect(change.output).toContain('Percent change: 25%')

    const unit = await executeTimeTool('unit-converter', '10', '', 'km-mi')
    expect(unit.ok).toBe(true)
    expect(unit.output).toContain('6.213712 mi')
  })

  it('prerenders localized tool and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/tools/timestamp-converter')
    expect(contentPrerenderRoutes).toContain('/en/world-clock/global-product')
    expect(contentPrerenderRoutes).toContain('/en/world-clock/cities/tokyo')
    expect(contentPrerenderRoutes).toContain('/de/tools/unit-converter')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + publicLocaleCodes.length * (
        1
        + timeToolCatalog.length
        + plannerPageCatalog.length
        + cityTimePageCatalog.length
        + contentPageCatalog.length
      ),
    )
    expect(prerenderRoutes).toEqual([...contentPrerenderRoutes, '/sitemap.xml'])
  })

  it('documents legal and editorial pages for every locale', () => {
    expect(contentPageCatalog.map((page) => page.slug)).toEqual([...contentPageSlugs])

    for (const page of contentPageCatalog) {
      for (const locale of publicLocaleCodes) {
        const localized = page.localized[locale]

        expect(localized.description.length).toBeGreaterThan(60)
        expect(localized.sections).toHaveLength(3)
      }

      expect(getContentPageBySlug(page.slug)).toBe(page)
    }
  })

  it('filters tools and keeps analytics sanitized', () => {
    expect(filterTimeTools('timestamp', 'all', 'en').map((tool) => tool.slug)).toEqual(['timestamp-converter'])
    expect(filterTimeTools('', 'calendar', 'en').map((tool) => tool.slug)).toEqual(['date-difference', 'age-calculator'])

    const tool = getTimeToolBySlug('timezone-converter')
    expect(tool).not.toBeNull()
    const schema = createTimeToolStructuredData(tool!, 'en', `${siteBaseUrl}/en/tools/timezone-converter`)
    expect(schema).toHaveLength(2)
    expect(schema[0]).toMatchObject({
      '@type': 'WebApplication',
      isAccessibleForFree: true,
      offers: {
        price: '0',
      },
    })
    expect(schema[1]).toMatchObject({ '@type': 'FAQPage' })

    const event = createTimeNexusToolEvent({
      toolSlug: 'timezone-converter',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/tools/timezone-converter?date=2026-06-26T15:30:00Z&zone=secret`,
    }, 'tool_completed')

    expect(event.name).toBe('tool_completed')
    expect(event.siteSlug).toBe('timenexus')
    expect(event.routePath).toBe('/supersites/timenexus/en/tools/timezone-converter')
    expect(event.properties).toEqual({ tool_slug: 'timezone-converter' })
    expect(JSON.stringify(event)).not.toContain('secret')
  })
})
