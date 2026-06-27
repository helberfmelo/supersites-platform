import { describe, expect, it } from 'vitest'
import {
  buildCalculationMemory,
  calculatorCatalog,
  calculatorSlugs,
  createCalculatorStructuredData,
  formatMetricValue,
  getCalculatorBySlug,
  getCalculatorCopy,
  getCalculatorInterpretationState,
  getRelatedCalculators,
} from '../app/data/calculators'
import { publicLocaleCodes } from '../app/data/locales'
import { contentPageCatalog, contentPageSlugs, getContentPageBySlug } from '../app/data/pages'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import { createCalcHarborToolEvent } from '../app/utils/analytics'

describe('CalcHarbor MVP', () => {
  it('lists Sprint 3.1 calculators in roadmap order', () => {
    expect(calculatorCatalog.map((calculator) => calculator.slug)).toEqual([...calculatorSlugs])
    expect(calculatorCatalog).toHaveLength(4)
    expect(getCalculatorBySlug('loan-payment')?.localized.en.shortName).toBe('Loan payment')
    expect(getCalculatorBySlug('missing')).toBeNull()
  })

  it('keeps localized calculator content complete', () => {
    for (const calculator of calculatorCatalog) {
      for (const locale of publicLocaleCodes) {
        const copy = getCalculatorCopy(calculator, locale)

        expect(copy.headline.length).toBeGreaterThan(50)
        expect(copy.formula.length).toBeGreaterThan(20)
        expect(copy.contentSections).toHaveLength(5)
        expect(copy.faq).toHaveLength(2)
        expect(copy.freeScope.length).toBeGreaterThan(20)
      }
    }
  })

  it('calculates the visible formulas deterministically', () => {
    const loan = getCalculatorBySlug('loan-payment')?.calculate({
      principal: 25000,
      annualRate: 8.5,
      years: 5,
    })
    expect(loan?.ok).toBe(true)
    if (loan?.ok) {
      expect(loan.metrics[0].value).toBeCloseTo(512.91, 2)
      expect(loan.metrics[2].value).toBeCloseTo(5774.80, 2)
      expect(formatMetricValue(loan.metrics[0], 'en')).toContain('$512')
    }

    const breakEven = getCalculatorBySlug('break-even-point')?.calculate({
      fixedCosts: 12000,
      pricePerUnit: 80,
      variableCostPerUnit: 32,
    })
    expect(breakEven?.ok).toBe(true)
    if (breakEven?.ok) {
      expect(breakEven.metrics[0].value).toBe(250)
      expect(breakEven.metrics[2].value).toBe(20000)
    }

    const margin = getCalculatorBySlug('gross-margin')?.calculate({
      revenue: 50000,
      cost: 28500,
    })
    expect(margin?.ok).toBe(true)
    if (margin?.ok) {
      expect(margin.metrics[0].value).toBe(21500)
      expect(margin.metrics[1].value).toBeCloseTo(0.43, 3)
      expect(margin.metrics[2].value).toBeCloseTo(0.754, 3)
    }

    const roi = getCalculatorBySlug('roi')?.calculate({
      returnValue: 18000,
      investmentCost: 12000,
    })
    expect(roi?.ok).toBe(true)
    if (roi?.ok) {
      expect(roi.metrics[0].value).toBe(6000)
      expect(roi.metrics[1].value).toBe(0.5)
    }
  })

  it('builds local calculation memory and related calculator paths', () => {
    const loan = getCalculatorBySlug('loan-payment')
    expect(loan).not.toBeNull()

    const result = loan!.calculate({
      principal: 25000,
      annualRate: 8.5,
      years: 5,
    })

    expect(result.ok).toBe(true)

    const memory = buildCalculationMemory(loan!, {
      principal: 25000,
      annualRate: 8.5,
      years: 5,
    }, result, 'en')

    expect(memory.map((line) => line.label)).toContain('Formula used')
    expect(memory.map((line) => line.label)).toContain('Result: Monthly payment')
    expect(JSON.stringify(memory)).toContain('$512')

    const interpretation = getCalculatorInterpretationState('loan-payment', result, 'en')
    expect(['good', 'review', 'warning']).toContain(interpretation.tone)
    expect(interpretation.body).toContain('Confirm')

    const related = getRelatedCalculators(loan!)
    expect(related).toHaveLength(3)
    expect(related.map((item) => item.slug)).not.toContain('loan-payment')
  })

  it('rejects invalid break-even contribution margin', () => {
    const result = getCalculatorBySlug('break-even-point')?.calculate({
      fixedCosts: 1000,
      pricePerUnit: 20,
      variableCostPerUnit: 20,
    })

    expect(result?.ok).toBe(false)
    if (result && !result.ok) {
      expect(result.error.en).toContain('higher than variable cost')
    }
  })

  it('prerenders localized calculator and policy routes', () => {
    expect(publicLocaleCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/en')
    expect(contentPrerenderRoutes).toContain('/pt-br/calculators/roi')
    expect(contentPrerenderRoutes).toContain('/de/calculators/gross-margin')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + publicLocaleCodes.length * (1 + calculatorCatalog.length + contentPageCatalog.length),
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

  it('creates structured data and analytics without calculator values', () => {
    const calculator = getCalculatorBySlug('loan-payment')
    expect(calculator).not.toBeNull()

    const schema = createCalculatorStructuredData(calculator!, 'en', `${siteBaseUrl}/en/calculators/loan-payment`)
    expect(schema).toHaveLength(2)
    expect(schema[0]).toMatchObject({
      '@type': 'WebApplication',
      isAccessibleForFree: true,
      offers: {
        price: '0',
      },
    })
    expect(schema[1]).toMatchObject({
      '@type': 'FAQPage',
    })

    const event = createCalcHarborToolEvent({
      calculatorSlug: 'loan-payment',
      locale: 'en',
      routePath: `${siteBaseUrl}/en/calculators/loan-payment?principal=25000`,
    }, 'tool_completed')

    expect(event.name).toBe('tool_completed')
    expect(event.siteSlug).toBe('calcharbor')
    expect(event.routePath).toBe('/supersites/calcharbor/en/calculators/loan-payment')
    expect(event.properties).toEqual({ tool_slug: 'loan-payment' })
    expect(JSON.stringify(event)).not.toContain('25000')
  })
})
