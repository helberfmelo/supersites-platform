import { formatCurrency, formatNumber, sanitizePublicCopy, type LocaleCode } from './locales'

export const calculatorSlugs = [
  'loan-payment',
  'compound-interest',
  'savings-goal',
  'break-even-point',
  'gross-margin',
  'cash-runway',
  'discount-price',
  'roi',
] as const

export type CalculatorSlug = (typeof calculatorSlugs)[number]
export type CalculatorCategory = 'finance' | 'business'
export type MetricFormat = 'currency' | 'number' | 'percent'
export type CurrencyCode = 'USD' | 'BRL' | 'EUR'
export type LocalizedNumber = number | Record<LocaleCode, number>

export interface LocalizedText {
  en: string
  'pt-br': string
  es: string
  fr: string
  de: string
}

export interface CalculatorField {
  key: string
  label: LocalizedText
  help: LocalizedText
  defaultValue: LocalizedNumber
  min: number
  step: number
  format: MetricFormat
  suffix?: string
  prefix?: string
}

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface CalculatorCopy {
  title: string
  shortName: string
  headline: string
  description: string
  formula: string
  example: string
  interpretation: string
  freeScope: string
  upgradeScope: string
  reviewedLabel: string
  contentSections: ContentSection[]
  faq: FaqItem[]
}

export interface CalculationMetric {
  key: string
  label: LocalizedText
  value: number
  format: MetricFormat
}

export interface CalculationMemoryLine {
  label: string
  value: string
}

export type ScenarioVariant = 'low' | 'base' | 'high'

export interface CalculatorScenarioRow {
  variant: ScenarioVariant
  label: string
  assumption: string
  resultLabel: string
  resultValue: string
  numericValue: number | null
  ok: boolean
}

export interface InterpretationState {
  tone: 'good' | 'review' | 'warning'
  label: string
  body: string
}

export interface CalculationOk {
  ok: true
  metrics: CalculationMetric[]
}

export interface CalculationError {
  ok: false
  error: LocalizedText
}

export type CalculationResult = CalculationOk | CalculationError

export interface CalculatorDefinition {
  slug: CalculatorSlug
  category: CalculatorCategory
  fields: CalculatorField[]
  localized: Record<LocaleCode, CalculatorCopy>
  calculate: (inputs: Record<string, number>) => CalculationResult
}

const positiveNumberError: LocalizedText = {
  en: 'Use positive numbers for every required field.',
  'pt-br': 'Use numeros positivos em todos os campos obrigatorios.',
  es: 'Usa numeros positivos en todos los campos requeridos.',
  fr: 'Utilisez des nombres positifs dans chaque champ requis.',
  de: 'Verwenden Sie positive Zahlen in jedem Pflichtfeld.',
}

const contributionError: LocalizedText = {
  en: 'Price per unit must be higher than variable cost per unit.',
  'pt-br': 'O preco por unidade deve ser maior que o custo variavel por unidade.',
  es: 'El precio por unidad debe ser mayor que el costo variable por unidad.',
  fr: 'Le prix unitaire doit etre superieur au cout variable unitaire.',
  de: 'Der Preis pro Einheit muss hoeher sein als die variablen Kosten pro Einheit.',
}

const goalContributionError: LocalizedText = {
  en: 'Monthly contribution or interest must be enough to reach the goal.',
  'pt-br': 'A contribuicao mensal ou os juros precisam ser suficientes para atingir a meta.',
  es: 'La contribucion mensual o el interes deben alcanzar para llegar a la meta.',
  fr: 'La contribution mensuelle ou les interets doivent suffire pour atteindre l objectif.',
  de: 'Monatlicher Beitrag oder Zinsen muessen ausreichen, um das Ziel zu erreichen.',
}

const runwayBurnError: LocalizedText = {
  en: 'Monthly operating cost must be higher than monthly revenue to estimate runway.',
  'pt-br': 'O custo operacional mensal precisa ser maior que a receita mensal para estimar runway.',
  es: 'El costo operativo mensual debe ser mayor que los ingresos mensuales para estimar runway.',
  fr: 'Le cout operationnel mensuel doit depasser les revenus mensuels pour estimer le runway.',
  de: 'Monatliche Betriebskosten muessen hoeher als Monatsumsatz sein, um Runway zu schaetzen.',
}

const defaultCurrencyByLocale: Record<LocaleCode, CurrencyCode> = {
  en: 'USD',
  'pt-br': 'BRL',
  es: 'EUR',
  fr: 'EUR',
  de: 'EUR',
}

const currencyPrefixByLocale: Record<LocaleCode, string> = {
  en: '$',
  'pt-br': 'R$',
  es: 'EUR',
  fr: 'EUR',
  de: 'EUR',
}

function localizedNumber(en: number, ptBr: number, es: number, fr: number, de: number): Record<LocaleCode, number> {
  return {
    en,
    'pt-br': ptBr,
    es,
    fr,
    de,
  }
}

export function getDefaultCurrency(locale: LocaleCode): CurrencyCode {
  return defaultCurrencyByLocale[locale]
}

export function getFieldDefaultValue(fieldValue: CalculatorField, locale: LocaleCode): number {
  return typeof fieldValue.defaultValue === 'number' ? fieldValue.defaultValue : fieldValue.defaultValue[locale]
}

export function getFieldPrefix(fieldValue: CalculatorField, locale: LocaleCode): string | undefined {
  return fieldValue.format === 'currency' ? currencyPrefixByLocale[locale] : fieldValue.prefix
}

function isPositive(...values: number[]): boolean {
  return values.every((value) => Number.isFinite(value) && value > 0)
}

function field(
  key: string,
  label: LocalizedText,
  help: LocalizedText,
  defaultValue: LocalizedNumber,
  options: { min?: number; step?: number; prefix?: string; suffix?: string; format?: MetricFormat } = {},
): CalculatorField {
  return {
    key,
    label,
    help,
    defaultValue,
    min: options.min ?? 0,
    step: options.step ?? 1,
    format: options.format ?? (options.prefix === '$' ? 'currency' : options.suffix === '%' ? 'percent' : 'number'),
    prefix: options.prefix,
    suffix: options.suffix,
  }
}

function metric(key: string, label: LocalizedText, value: number, format: MetricFormat): CalculationMetric {
  return { key, label, value, format }
}

function formatFieldValue(fieldValue: CalculatorField, value: number, locale: LocaleCode): string {
  if (fieldValue.format === 'currency') {
    return money(value, locale)
  }

  if (fieldValue.format === 'percent') {
    return `${number(value, locale)}%`
  }

  return number(value, locale)
}

function money(value: number, locale: LocaleCode): string {
  return formatCurrency(value, locale, getDefaultCurrency(locale), { maximumFractionDigits: 2 })
}

function number(value: number, locale: LocaleCode): string {
  return formatNumber(value, locale, { maximumFractionDigits: 2 })
}

function percent(value: number, locale: LocaleCode): string {
  return formatNumber(value, locale, {
    style: 'percent',
    maximumFractionDigits: 2,
  })
}

export function formatMetricValue(metricValue: CalculationMetric, locale: LocaleCode): string {
  if (metricValue.format === 'currency') {
    return money(metricValue.value, locale)
  }

  if (metricValue.format === 'percent') {
    return percent(metricValue.value, locale)
  }

  return number(metricValue.value, locale)
}

const memoryLabels: Record<LocaleCode, { inputPrefix: string; resultPrefix: string; formulaLabel: string }> = {
  en: {
    inputPrefix: 'Input',
    resultPrefix: 'Result',
    formulaLabel: 'Formula used',
  },
  'pt-br': {
    inputPrefix: 'Entrada',
    resultPrefix: 'Resultado',
    formulaLabel: 'Formula usada',
  },
  es: {
    inputPrefix: 'Entrada',
    resultPrefix: 'Resultado',
    formulaLabel: 'Formula usada',
  },
  fr: {
    inputPrefix: 'Entree',
    resultPrefix: 'Resultat',
    formulaLabel: 'Formule utilisee',
  },
  de: {
    inputPrefix: 'Eingabe',
    resultPrefix: 'Ergebnis',
    formulaLabel: 'Verwendete Formel',
  },
}

export function buildCalculationMemory(
  calculator: CalculatorDefinition,
  inputs: Record<string, number>,
  result: CalculationResult,
  locale: LocaleCode,
): CalculationMemoryLine[] {
  const copy = getCalculatorCopy(calculator, locale)
  const labels = memoryLabels[locale]
  const fieldLines = calculator.fields.map((fieldValue) => ({
    label: `${labels.inputPrefix}: ${fieldValue.label[locale]}`,
    value: formatFieldValue(fieldValue, inputs[fieldValue.key], locale),
  }))

  if (!result.ok) {
    return [
      ...fieldLines,
      {
        label: labels.formulaLabel,
        value: copy.formula,
      },
    ]
  }

  return [
    ...fieldLines,
    {
      label: labels.formulaLabel,
      value: copy.formula,
    },
    ...result.metrics.map((metricValue) => ({
      label: `${labels.resultPrefix}: ${metricValue.label[locale]}`,
      value: formatMetricValue(metricValue, locale),
    })),
  ]
}

const scenarioLabels: Record<LocaleCode, Record<ScenarioVariant, string> & { invalidResult: string }> = {
  en: {
    low: 'Lower case',
    base: 'Base case',
    high: 'Higher case',
    invalidResult: 'Needs valid inputs',
  },
  'pt-br': {
    low: 'Caso menor',
    base: 'Caso base',
    high: 'Caso maior',
    invalidResult: 'Precisa de entradas validas',
  },
  es: {
    low: 'Caso bajo',
    base: 'Caso base',
    high: 'Caso alto',
    invalidResult: 'Necesita entradas validas',
  },
  fr: {
    low: 'Cas bas',
    base: 'Cas de base',
    high: 'Cas haut',
    invalidResult: 'Entrees valides requises',
  },
  de: {
    low: 'Niedriger Fall',
    base: 'Basisfall',
    high: 'Hoeherer Fall',
    invalidResult: 'Gueltige Eingaben erforderlich',
  },
}

const scenarioFocusFields: Record<CalculatorSlug, { fieldKey: string; lowMultiplier: number; highMultiplier: number }> = {
  'loan-payment': {
    fieldKey: 'annualRate',
    lowMultiplier: 0.9,
    highMultiplier: 1.1,
  },
  'compound-interest': {
    fieldKey: 'annualRate',
    lowMultiplier: 0.9,
    highMultiplier: 1.1,
  },
  'savings-goal': {
    fieldKey: 'monthlyContribution',
    lowMultiplier: 0.85,
    highMultiplier: 1.15,
  },
  'break-even-point': {
    fieldKey: 'fixedCosts',
    lowMultiplier: 0.9,
    highMultiplier: 1.1,
  },
  'gross-margin': {
    fieldKey: 'cost',
    lowMultiplier: 0.9,
    highMultiplier: 1.1,
  },
  'cash-runway': {
    fieldKey: 'monthlyRevenue',
    lowMultiplier: 0.9,
    highMultiplier: 1.1,
  },
  'discount-price': {
    fieldKey: 'discountRate',
    lowMultiplier: 0.8,
    highMultiplier: 1.2,
  },
  roi: {
    fieldKey: 'returnValue',
    lowMultiplier: 0.9,
    highMultiplier: 1.1,
  },
}

function scenarioInputValue(fieldValue: CalculatorField, inputs: Record<string, number>, multiplier: number, locale: LocaleCode): number {
  const inputValue = inputs[fieldValue.key]
  const baseValue = Number.isFinite(inputValue) ? inputValue : getFieldDefaultValue(fieldValue, locale)
  const minValue = fieldValue.min > 0 ? fieldValue.min : 0

  return Math.max(minValue, Number((baseValue * multiplier).toFixed(4)))
}

function buildScenarioInputs(
  calculator: CalculatorDefinition,
  inputs: Record<string, number>,
  variant: ScenarioVariant,
  locale: LocaleCode,
): Record<string, number> {
  const focusConfig = scenarioFocusFields[calculator.slug]
  const multiplier = variant === 'low' ? focusConfig.lowMultiplier : variant === 'high' ? focusConfig.highMultiplier : 1

  return Object.fromEntries(calculator.fields.map((fieldValue) => {
    const value = fieldValue.key === focusConfig.fieldKey
      ? scenarioInputValue(fieldValue, inputs, multiplier, locale)
      : Number.isFinite(inputs[fieldValue.key])
        ? inputs[fieldValue.key]
        : getFieldDefaultValue(fieldValue, locale)

    return [fieldValue.key, value]
  }))
}

export function buildCalculatorScenarioRows(
  calculator: CalculatorDefinition,
  inputs: Record<string, number>,
  locale: LocaleCode,
): CalculatorScenarioRow[] {
  const labels = scenarioLabels[locale]
  const focusConfig = scenarioFocusFields[calculator.slug]
  const focusField = calculator.fields.find((fieldValue) => fieldValue.key === focusConfig.fieldKey) ?? calculator.fields[0]

  return (['low', 'base', 'high'] as const).map((variant) => {
    const scenarioInputs = buildScenarioInputs(calculator, inputs, variant, locale)
    const result = calculator.calculate(scenarioInputs)
    const assumption = `${focusField.label[locale]}: ${formatFieldValue(focusField, scenarioInputs[focusField.key], locale)}`

    if (!result.ok) {
      return {
        variant,
        label: labels[variant],
        assumption,
        resultLabel: labels.invalidResult,
        resultValue: result.error[locale],
        numericValue: null,
        ok: false,
      }
    }

    const primaryMetric = result.metrics[0]

    return {
      variant,
      label: labels[variant],
      assumption,
      resultLabel: primaryMetric.label[locale],
      resultValue: formatMetricValue(primaryMetric, locale),
      numericValue: primaryMetric.value,
      ok: true,
    }
  })
}

const interpretationCopy: Record<LocaleCode, Record<InterpretationState['tone'], { label: string; body: string }>> = {
  en: {
    good: {
      label: 'Planning range',
      body: 'This scenario is in a workable planning range. Confirm fees, taxes, timing and accounting rules before acting.',
    },
    review: {
      label: 'Review assumptions',
      body: 'The result is usable as a planning signal, but the assumptions deserve a second pass before a business decision.',
    },
    warning: {
      label: 'Needs closer review',
      body: 'This scenario may be sensitive to cost, rate or timing changes. Treat it as a prompt for deeper review, not advice.',
    },
  },
  'pt-br': {
    good: {
      label: 'Faixa de planejamento',
      body: 'O cenario esta em uma faixa util de planejamento. Confirme tarifas, impostos, prazo e regras contabeis antes de agir.',
    },
    review: {
      label: 'Revise premissas',
      body: 'O resultado serve como sinal de planejamento, mas as premissas merecem nova revisao antes de uma decisao de negocio.',
    },
    warning: {
      label: 'Precisa de revisao',
      body: 'O cenario pode ser sensivel a custo, taxa ou prazo. Use como alerta para revisao profunda, nao como conselho.',
    },
  },
  es: {
    good: {
      label: 'Rango de planificacion',
      body: 'El escenario esta en un rango util de planificacion. Confirma cargos, impuestos, plazos y reglas contables antes de actuar.',
    },
    review: {
      label: 'Revisa supuestos',
      body: 'El resultado sirve como senal de planificacion, pero los supuestos merecen otra revision antes de decidir.',
    },
    warning: {
      label: 'Requiere mas revision',
      body: 'El escenario puede ser sensible a costos, tasas o plazos. Usalo como alerta para revisar, no como consejo.',
    },
  },
  fr: {
    good: {
      label: 'Plage de planification',
      body: 'Le scenario reste utile pour planifier. Confirmez frais, taxes, calendrier et regles comptables avant decision.',
    },
    review: {
      label: 'Verifier les hypotheses',
      body: 'Le resultat est un signal de planification, mais les hypotheses meritent une verification avant une decision.',
    },
    warning: {
      label: 'Revue approfondie',
      body: 'Le scenario peut etre sensible aux couts, taux ou delais. Utilisez-le pour approfondir, pas comme conseil.',
    },
  },
  de: {
    good: {
      label: 'Planungsbereich',
      body: 'Das Szenario liegt in einem brauchbaren Planungsbereich. Pruefen Sie Gebuehren, Steuern, Zeitraum und Buchhaltung.',
    },
    review: {
      label: 'Annahmen pruefen',
      body: 'Das Ergebnis ist ein Planungssignal, doch die Annahmen sollten vor einer Entscheidung erneut geprueft werden.',
    },
    warning: {
      label: 'Genauer pruefen',
      body: 'Das Szenario kann empfindlich auf Kosten, Zinsen oder Zeit reagieren. Nutzen Sie es als Pruefhinweis, nicht als Rat.',
    },
  },
}

export function getCalculatorInterpretationState(
  slug: CalculatorSlug,
  result: CalculationResult,
  locale: LocaleCode,
): InterpretationState {
  if (!result.ok) {
    return {
      tone: 'warning',
      ...interpretationCopy[locale].warning,
    }
  }

  const metricByKey = new Map(result.metrics.map((metricValue) => [metricValue.key, metricValue.value]))
  let tone: InterpretationState['tone'] = 'review'

  if (slug === 'loan-payment') {
    const interest = metricByKey.get('total_interest') ?? 0
    const totalPaid = metricByKey.get('total_paid') ?? 0
    const ratio = totalPaid > 0 ? interest / totalPaid : 0
    tone = ratio <= 0.2 ? 'good' : ratio <= 0.4 ? 'review' : 'warning'
  } else if (slug === 'compound-interest') {
    const interest = metricByKey.get('interest_earned') ?? 0
    const endingBalance = metricByKey.get('ending_balance') ?? 0
    const ratio = endingBalance > 0 ? interest / endingBalance : 0
    tone = ratio >= 0.25 ? 'good' : ratio >= 0.1 ? 'review' : 'warning'
  } else if (slug === 'savings-goal') {
    const years = metricByKey.get('years_to_goal') ?? 0
    tone = years <= 3 ? 'good' : years <= 7 ? 'review' : 'warning'
  } else if (slug === 'break-even-point') {
    const units = metricByKey.get('break_even_units') ?? 0
    tone = units <= 500 ? 'good' : units <= 5000 ? 'review' : 'warning'
  } else if (slug === 'gross-margin') {
    const marginValue = metricByKey.get('gross_margin') ?? 0
    tone = marginValue >= 0.4 ? 'good' : marginValue >= 0.2 ? 'review' : 'warning'
  } else if (slug === 'cash-runway') {
    const months = metricByKey.get('runway_months') ?? 0
    tone = months >= 12 ? 'good' : months >= 6 ? 'review' : 'warning'
  } else if (slug === 'discount-price') {
    const saved = metricByKey.get('discount_saved') ?? 0
    const finalPrice = metricByKey.get('final_unit_price') ?? 0
    const ratio = saved + finalPrice > 0 ? saved / (saved + finalPrice) : 0
    tone = ratio >= 0.2 ? 'good' : ratio >= 0.05 ? 'review' : 'warning'
  } else if (slug === 'roi') {
    const roiValue = metricByKey.get('roi') ?? 0
    tone = roiValue >= 0.2 ? 'good' : roiValue >= 0 ? 'review' : 'warning'
  }

  return {
    tone,
    ...interpretationCopy[locale][tone],
  }
}

export function getRelatedCalculators(calculator: CalculatorDefinition): CalculatorDefinition[] {
  return calculatorCatalog
    .filter((item) => item.slug !== calculator.slug)
    .sort((a, b) => {
      if (a.category === calculator.category && b.category !== calculator.category) {
        return -1
      }

      if (b.category === calculator.category && a.category !== calculator.category) {
        return 1
      }

      return calculatorSlugs.indexOf(a.slug) - calculatorSlugs.indexOf(b.slug)
    })
    .slice(0, 3)
}

type CalculatorKind =
  | 'loan'
  | 'compoundInterest'
  | 'savingsGoal'
  | 'breakEven'
  | 'margin'
  | 'cashRunway'
  | 'discountPrice'
  | 'roi'

function standardSections(locale: LocaleCode, kind: CalculatorKind): ContentSection[] {
  const sections = {
    en: {
      loan: [
        ['What it calculates', 'The loan payment calculator estimates the fixed monthly payment, total paid and interest cost from principal, annual rate and term.'],
        ['Formula', 'It uses the amortization formula M = P x r x (1 + r)^n / ((1 + r)^n - 1), where r is the monthly rate and n is the number of payments.'],
        ['How to interpret it', 'Compare the monthly payment with available cash flow, then compare total interest across terms before choosing a loan.'],
        ['Common mistakes', 'Do not compare only the monthly payment. A longer term can look affordable while increasing total interest materially.'],
        ['Limits', 'The result excludes taxes, fees, insurance, prepayment rules and variable-rate changes unless you add those costs to the inputs.'],
      ],
      compoundInterest: [
        ['What it calculates', 'The compound interest calculator estimates ending balance, interest earned and total contributions from a starting amount, monthly contribution, annual rate and term.'],
        ['Formula', 'It compounds monthly: future value = principal growth plus monthly contribution growth over the selected number of months.'],
        ['How to interpret it', 'Compare interest earned with total contributions to see how much of the balance comes from time and reinvested growth.'],
        ['Common mistakes', 'Do not treat an expected rate as guaranteed. Small changes in rate or time can change the ending balance sharply.'],
        ['Limits', 'The estimate excludes taxes, fees, inflation, market losses and account rules unless you include them in the assumptions.'],
      ],
      savingsGoal: [
        ['What it calculates', 'The savings goal calculator estimates the months and years needed to reach a target from current savings, monthly contribution and annual rate.'],
        ['Formula', 'It solves for time using monthly compounding, or a straight contribution path when the annual rate is zero.'],
        ['How to interpret it', 'Use the time-to-goal as a planning target, then test higher and lower monthly contributions for sensitivity.'],
        ['Common mistakes', 'Do not mix one-time savings, monthly contributions and annual rates without checking that each value is in the right period.'],
        ['Limits', 'The result excludes taxes, fees, penalties, inflation and changing contribution schedules.'],
      ],
      breakEven: [
        ['What it calculates', 'The break-even calculator shows how many units must be sold before contribution margin covers fixed costs.'],
        ['Formula', 'Break-even units = fixed costs / (price per unit - variable cost per unit). The denominator is contribution margin.'],
        ['How to interpret it', 'A lower break-even point means the business has more room for slow sales, discounts or demand swings.'],
        ['Common mistakes', 'Do not mix monthly fixed costs with annual unit expectations. Keep the time period consistent.'],
        ['Limits', 'The model assumes a single price, a single variable cost and no capacity constraint. Use scenarios for mixed products.'],
      ],
      margin: [
        ['What it calculates', 'The gross margin calculator reports gross profit, gross margin and markup from revenue and cost of goods sold.'],
        ['Formula', 'Gross profit = revenue - cost. Gross margin = gross profit / revenue. Markup = gross profit / cost.'],
        ['How to interpret it', 'Gross margin explains how much revenue remains before operating expenses, taxes and financing costs.'],
        ['Common mistakes', 'Margin and markup are not the same. Markup uses cost as the base, while margin uses revenue as the base.'],
        ['Limits', 'The calculator does not decide which costs belong in COGS. Use consistent accounting definitions across periods.'],
      ],
      cashRunway: [
        ['What it calculates', 'The cash runway calculator estimates how many months current cash can cover net monthly burn.'],
        ['Formula', 'Net burn = monthly operating cost - monthly revenue. Runway months = cash on hand / net burn.'],
        ['How to interpret it', 'More runway gives more time to adjust revenue, cost, pricing or financing before cash becomes constrained.'],
        ['Common mistakes', 'Do not include one-time receipts or annual expenses without converting them to the same monthly period.'],
        ['Limits', 'The model excludes credit lines, delayed invoices, taxes, debt covenants and financing events unless reflected in inputs.'],
      ],
      discountPrice: [
        ['What it calculates', 'The discount price calculator estimates final unit price, order total and savings before added fees.'],
        ['Formula', 'Final unit price = list price x (1 - discount rate) + added fee per unit. Order total multiplies that value by quantity.'],
        ['How to interpret it', 'Use final unit price to compare offers and use total order cost when quantity or fees matter.'],
        ['Common mistakes', 'Do not compare discount percentage alone. Fees and quantity can erase part of the apparent savings.'],
        ['Limits', 'The result excludes taxes, shipping rules, coupons with caps and return costs unless you include them as fees.'],
      ],
      roi: [
        ['What it calculates', 'The ROI calculator compares return value with investment cost and reports net return plus return on investment.'],
        ['Formula', 'Net return = return value - investment cost. ROI = net return / investment cost.'],
        ['How to interpret it', 'Positive ROI means the return is higher than cost. Compare ROI with risk, time horizon and alternatives.'],
        ['Common mistakes', 'Do not compare a one-month ROI with a multi-year ROI without annualizing or naming the time period.'],
        ['Limits', 'The result excludes risk, taxes, financing cost, inflation and opportunity cost unless those are included in the inputs.'],
      ],
    },
    'pt-br': {
      loan: [
        ['O que calcula', 'A calculadora estima parcela mensal fixa, total pago e juros a partir de principal, taxa anual e prazo.'],
        ['Formula', 'Usa M = P x r x (1 + r)^n / ((1 + r)^n - 1), com r como taxa mensal e n como numero de parcelas.'],
        ['Como interpretar', 'Compare a parcela com o caixa disponivel e depois compare juros totais entre prazos.'],
        ['Erros comuns', 'Nao olhe apenas a parcela. Prazo maior pode parecer leve e ainda aumentar muito os juros totais.'],
        ['Limites', 'O resultado nao inclui impostos, tarifas, seguros, antecipacao ou taxa variavel sem que isso entre nos campos.'],
      ],
      compoundInterest: [
        ['O que calcula', 'Estima saldo final, juros acumulados e total aportado a partir de valor inicial, aporte mensal, taxa anual e prazo.'],
        ['Formula', 'Compoe mensalmente: valor futuro = crescimento do principal mais crescimento dos aportes mensais no periodo.'],
        ['Como interpretar', 'Compare juros acumulados com total aportado para ver quanto do saldo vem do tempo e dos reinvestimentos.'],
        ['Erros comuns', 'Nao trate taxa esperada como garantia. Pequenas mudancas de taxa ou prazo alteram bastante o saldo final.'],
        ['Limites', 'A estimativa exclui impostos, tarifas, inflacao, perdas de mercado e regras de conta se nao estiverem nas premissas.'],
      ],
      savingsGoal: [
        ['O que calcula', 'Estima meses e anos para atingir uma meta a partir de poupanca atual, aporte mensal e taxa anual.'],
        ['Formula', 'Resolve o tempo com capitalizacao mensal, ou usa caminho linear quando a taxa anual e zero.'],
        ['Como interpretar', 'Use o prazo ate a meta como alvo de planejamento e teste aportes maiores ou menores nos cenarios.'],
        ['Erros comuns', 'Nao misture economia unica, aportes mensais e taxa anual sem conferir o periodo de cada valor.'],
        ['Limites', 'O resultado exclui impostos, tarifas, multas, inflacao e mudancas futuras de aporte.'],
      ],
      breakEven: [
        ['O que calcula', 'Mostra quantas unidades precisam ser vendidas para a margem de contribuicao cobrir os custos fixos.'],
        ['Formula', 'Ponto de equilibrio = custos fixos / (preco por unidade - custo variavel por unidade).'],
        ['Como interpretar', 'Um ponto menor cria mais espaco para vendas lentas, descontos ou oscilacao de demanda.'],
        ['Erros comuns', 'Nao misture custos fixos mensais com metas anuais de unidades. Mantenha o periodo igual.'],
        ['Limites', 'O modelo assume um preco, um custo variavel e nenhuma restricao de capacidade. Use cenarios para mix de produtos.'],
      ],
      margin: [
        ['O que calcula', 'Calcula lucro bruto, margem bruta e markup a partir de receita e custo dos produtos vendidos.'],
        ['Formula', 'Lucro bruto = receita - custo. Margem = lucro bruto / receita. Markup = lucro bruto / custo.'],
        ['Como interpretar', 'A margem mostra quanto da receita sobra antes de despesas operacionais, impostos e financiamento.'],
        ['Erros comuns', 'Margem e markup nao sao iguais: markup usa custo como base, margem usa receita.'],
        ['Limites', 'A calculadora nao decide quais custos entram no CPV. Use a mesma regra contabil em todos os periodos.'],
      ],
      cashRunway: [
        ['O que calcula', 'Estima por quantos meses o caixa atual cobre a queima mensal liquida.'],
        ['Formula', 'Queima liquida = custo operacional mensal - receita mensal. Runway = caixa disponivel / queima liquida.'],
        ['Como interpretar', 'Mais runway cria tempo para ajustar receita, custo, preco ou financiamento antes de restricao de caixa.'],
        ['Erros comuns', 'Nao inclua recebimentos unicos ou despesas anuais sem converter tudo para o mesmo periodo mensal.'],
        ['Limites', 'O modelo exclui linhas de credito, recebiveis atrasados, impostos, covenants e eventos de financiamento.'],
      ],
      discountPrice: [
        ['O que calcula', 'Estima preco final por unidade, total do pedido e economia antes de tarifas adicionadas.'],
        ['Formula', 'Preco final = preco de lista x (1 - desconto) + tarifa por unidade. O total multiplica por quantidade.'],
        ['Como interpretar', 'Use o preco final para comparar ofertas e o total quando quantidade ou tarifas importam.'],
        ['Erros comuns', 'Nao compare apenas o percentual de desconto. Tarifas e quantidade podem reduzir a economia aparente.'],
        ['Limites', 'O resultado exclui impostos, frete, cupons com limite e custo de devolucao se nao entrarem como tarifa.'],
      ],
      roi: [
        ['O que calcula', 'Compara retorno com custo de investimento e mostra retorno liquido e ROI.'],
        ['Formula', 'Retorno liquido = retorno - custo. ROI = retorno liquido / custo.'],
        ['Como interpretar', 'ROI positivo significa retorno acima do custo. Compare tambem risco, prazo e alternativas.'],
        ['Erros comuns', 'Nao compare ROI de um mes com ROI de varios anos sem anualizar ou deixar o periodo claro.'],
        ['Limites', 'O resultado exclui risco, impostos, financiamento, inflacao e custo de oportunidade se nao estiverem nos campos.'],
      ],
    },
    es: {
      loan: [
        ['Que calcula', 'Estima pago mensual fijo, total pagado e interes desde principal, tasa anual y plazo.'],
        ['Formula', 'Usa M = P x r x (1 + r)^n / ((1 + r)^n - 1), con r mensual y n pagos.'],
        ['Como interpretarlo', 'Compara el pago con el flujo disponible y luego compara interes total entre plazos.'],
        ['Errores comunes', 'No mires solo el pago mensual. Un plazo largo puede subir mucho el interes total.'],
        ['Limites', 'No incluye impuestos, cargos, seguros, prepago o tasa variable salvo que los agregues.'],
      ],
      compoundInterest: [
        ['Que calcula', 'Estima saldo final, interes generado y aportes totales desde saldo inicial, aporte mensual, tasa anual y plazo.'],
        ['Formula', 'Capitaliza mensualmente: valor futuro = crecimiento del principal mas crecimiento de aportes mensuales.'],
        ['Como interpretarlo', 'Compara interes generado con aportes totales para ver cuanto viene del tiempo y reinversion.'],
        ['Errores comunes', 'No trates una tasa esperada como garantia. Cambios pequenos de tasa o plazo alteran el saldo final.'],
        ['Limites', 'Excluye impuestos, comisiones, inflacion, perdidas de mercado y reglas de cuenta si no las agregas.'],
      ],
      savingsGoal: [
        ['Que calcula', 'Estima meses y anos para alcanzar una meta desde ahorro actual, aporte mensual y tasa anual.'],
        ['Formula', 'Resuelve el tiempo con capitalizacion mensual, o usa una ruta lineal cuando la tasa anual es cero.'],
        ['Como interpretarlo', 'Usa el tiempo hasta la meta como objetivo y prueba aportes mayores o menores en escenarios.'],
        ['Errores comunes', 'No mezcles ahorro inicial, aportes mensuales y tasa anual sin revisar el periodo de cada valor.'],
        ['Limites', 'Excluye impuestos, comisiones, penalizaciones, inflacion y cambios futuros de aportes.'],
      ],
      breakEven: [
        ['Que calcula', 'Muestra cuantas unidades deben venderse para cubrir costos fijos con margen de contribucion.'],
        ['Formula', 'Punto de equilibrio = costos fijos / (precio unitario - costo variable unitario).'],
        ['Como interpretarlo', 'Un punto menor da mas espacio ante ventas lentas, descuentos o cambios de demanda.'],
        ['Errores comunes', 'No mezcles costos fijos mensuales con metas anuales de unidades.'],
        ['Limites', 'Asume un precio, un costo variable y sin limite de capacidad. Usa escenarios para mix de productos.'],
      ],
      margin: [
        ['Que calcula', 'Informa ganancia bruta, margen bruto y markup desde ingresos y costo de ventas.'],
        ['Formula', 'Ganancia bruta = ingresos - costo. Margen = ganancia / ingresos. Markup = ganancia / costo.'],
        ['Como interpretarlo', 'El margen muestra cuanto ingreso queda antes de gastos operativos, impuestos y financiamiento.'],
        ['Errores comunes', 'Margen y markup no son lo mismo; usan bases distintas.'],
        ['Limites', 'No decide que costos entran en COGS. Usa definiciones consistentes.'],
      ],
      cashRunway: [
        ['Que calcula', 'Estima cuantos meses el efectivo actual cubre la quema neta mensual.'],
        ['Formula', 'Quema neta = costo operativo mensual - ingresos mensuales. Runway = efectivo / quema neta.'],
        ['Como interpretarlo', 'Mas runway da tiempo para ajustar ingresos, costos, precios o financiacion antes de tension de caja.'],
        ['Errores comunes', 'No incluyas cobros unicos o gastos anuales sin convertir todo al mismo periodo mensual.'],
        ['Limites', 'Excluye lineas de credito, facturas retrasadas, impuestos, covenants y eventos de financiacion.'],
      ],
      discountPrice: [
        ['Que calcula', 'Estima precio final unitario, total del pedido y ahorro antes de cargos agregados.'],
        ['Formula', 'Precio final = precio de lista x (1 - descuento) + cargo por unidad. El total multiplica por cantidad.'],
        ['Como interpretarlo', 'Usa precio final para comparar ofertas y costo total cuando cantidad o cargos importan.'],
        ['Errores comunes', 'No compares solo el porcentaje de descuento. Cargos y cantidad pueden reducir el ahorro aparente.'],
        ['Limites', 'Excluye impuestos, envio, cupones con tope y costos de devolucion salvo que los agregues como cargos.'],
      ],
      roi: [
        ['Que calcula', 'Compara retorno con costo de inversion y muestra retorno neto y ROI.'],
        ['Formula', 'Retorno neto = retorno - costo. ROI = retorno neto / costo.'],
        ['Como interpretarlo', 'ROI positivo significa retorno superior al costo. Considera riesgo, plazo y alternativas.'],
        ['Errores comunes', 'No compares ROI mensual con ROI plurianual sin aclarar el periodo.'],
        ['Limites', 'Excluye riesgo, impuestos, financiamiento, inflacion y costo de oportunidad si no los agregas.'],
      ],
    },
    fr: {
      loan: [
        ['Ce que cela calcule', 'Estime mensualite fixe, total paye et interets a partir du capital, du taux annuel et de la duree.'],
        ['Formule', 'Utilise M = P x r x (1 + r)^n / ((1 + r)^n - 1), ou r est mensuel et n le nombre de paiements.'],
        ['Interpretation', 'Comparez la mensualite au flux disponible, puis les interets totaux selon la duree.'],
        ['Erreurs courantes', 'Ne regardez pas seulement la mensualite. Une duree longue peut augmenter fortement les interets.'],
        ['Limites', 'Taxes, frais, assurance, remboursement anticipe et taux variable ne sont inclus que si vous les ajoutez.'],
      ],
      compoundInterest: [
        ['Ce que cela calcule', 'Estime solde final, interets gagnes et versements totaux depuis capital initial, versement mensuel, taux annuel et duree.'],
        ['Formule', 'Capitalise chaque mois: valeur future = croissance du capital plus croissance des versements mensuels.'],
        ['Interpretation', 'Comparez interets gagnes et versements pour voir la part venant du temps et du reinvestissement.'],
        ['Erreurs courantes', 'Ne traitez pas un taux attendu comme garanti. Taux et duree changent fortement le solde final.'],
        ['Limites', 'Taxes, frais, inflation, pertes de marche et regles de compte sont exclus sauf si vous les ajoutez.'],
      ],
      savingsGoal: [
        ['Ce que cela calcule', 'Estime mois et annees pour atteindre un objectif depuis epargne actuelle, versement mensuel et taux annuel.'],
        ['Formule', 'Resout la duree avec capitalisation mensuelle, ou utilise un chemin lineaire quand le taux annuel est nul.'],
        ['Interpretation', 'Utilisez le delai comme cible de planification, puis testez des versements mensuels plus hauts ou bas.'],
        ['Erreurs courantes', 'Ne melangez pas epargne initiale, versements mensuels et taux annuel sans verifier chaque periode.'],
        ['Limites', 'Taxes, frais, penalites, inflation et changements futurs de versement sont exclus.'],
      ],
      breakEven: [
        ['Ce que cela calcule', 'Indique les unites a vendre pour que la marge de contribution couvre les couts fixes.'],
        ['Formule', 'Seuil de rentabilite = couts fixes / (prix unitaire - cout variable unitaire).'],
        ['Interpretation', 'Un seuil plus bas donne plus de marge face aux ventes lentes, remises ou variations de demande.'],
        ['Erreurs courantes', 'Ne melangez pas couts mensuels et objectifs annuels. Gardez la meme periode.'],
        ['Limites', 'Suppose un prix, un cout variable et aucune contrainte de capacite. Utilisez des scenarios pour un mix.'],
      ],
      margin: [
        ['Ce que cela calcule', 'Calcule profit brut, marge brute et markup a partir du chiffre d affaires et du cout des ventes.'],
        ['Formule', 'Profit brut = revenus - cout. Marge = profit / revenus. Markup = profit / cout.'],
        ['Interpretation', 'La marge montre ce qui reste avant frais operationnels, taxes et financement.'],
        ['Erreurs courantes', 'Marge et markup different: ils utilisent des bases differentes.'],
        ['Limites', 'Ne decide pas quels couts entrent dans le cout des ventes. Gardez des definitions constantes.'],
      ],
      cashRunway: [
        ['Ce que cela calcule', 'Estime combien de mois la tresorerie actuelle couvre le burn mensuel net.'],
        ['Formule', 'Burn net = cout operationnel mensuel - revenus mensuels. Runway = tresorerie / burn net.'],
        ['Interpretation', 'Plus de runway donne du temps pour ajuster revenus, couts, prix ou financement avant tension de cash.'],
        ['Erreurs courantes', 'Ne mettez pas recettes uniques ou depenses annuelles sans tout convertir a la meme periode mensuelle.'],
        ['Limites', 'Lignes de credit, factures en retard, taxes, covenants et financements futurs sont exclus.'],
      ],
      discountPrice: [
        ['Ce que cela calcule', 'Estime prix final unitaire, total de commande et economie avant frais ajoutes.'],
        ['Formule', 'Prix final = prix catalogue x (1 - remise) + frais par unite. Le total multiplie par la quantite.'],
        ['Interpretation', 'Utilisez le prix final pour comparer offres et le total quand quantite ou frais comptent.'],
        ['Erreurs courantes', 'Ne comparez pas seulement le taux de remise. Frais et quantite peuvent reduire l economie apparente.'],
        ['Limites', 'Taxes, livraison, coupons plafonnes et retours sont exclus sauf si vous les ajoutez en frais.'],
      ],
      roi: [
        ['Ce que cela calcule', 'Compare valeur de retour et cout d investissement, puis donne retour net et ROI.'],
        ['Formule', 'Retour net = retour - cout. ROI = retour net / cout.'],
        ['Interpretation', 'Un ROI positif signifie que le retour depasse le cout. Comparez aussi risque, horizon et alternatives.'],
        ['Erreurs courantes', 'Ne comparez pas un ROI mensuel et pluriannuel sans nommer la periode.'],
        ['Limites', 'Risque, taxes, financement, inflation et cout d opportunite sont exclus sauf si vous les ajoutez.'],
      ],
    },
    de: {
      loan: [
        ['Was berechnet wird', 'Schaetzt feste Monatsrate, Gesamtzahlung und Zinskosten aus Kapital, Jahreszins und Laufzeit.'],
        ['Formel', 'Nutzt M = P x r x (1 + r)^n / ((1 + r)^n - 1), mit r als Monatszins und n Zahlungen.'],
        ['Interpretation', 'Vergleichen Sie die Monatsrate mit dem Cashflow und danach die Gesamtzinsen je Laufzeit.'],
        ['Haeufige Fehler', 'Schauen Sie nicht nur auf die Rate. Eine laengere Laufzeit kann die Zinsen stark erhoehen.'],
        ['Grenzen', 'Steuern, Gebuehren, Versicherung, Sondertilgung und variable Zinsen sind nur enthalten, wenn Sie sie einrechnen.'],
      ],
      compoundInterest: [
        ['Was berechnet wird', 'Schaetzt Endsaldo, verdiente Zinsen und gesamte Einzahlungen aus Startbetrag, Monatsbeitrag, Jahreszins und Laufzeit.'],
        ['Formel', 'Monatliche Verzinsung: Zukunftswert = Wachstum des Startbetrags plus Wachstum der Monatsbeitraege.'],
        ['Interpretation', 'Vergleichen Sie Zinsen mit Einzahlungen, um den Anteil aus Zeit und Wiederanlage zu sehen.'],
        ['Haeufige Fehler', 'Behandeln Sie erwartete Rendite nicht als Garantie. Kleine Aenderungen bei Zins oder Zeit wirken stark.'],
        ['Grenzen', 'Steuern, Gebuehren, Inflation, Marktrisiken und Kontoregeln sind ausgeschlossen, wenn sie nicht eingegeben werden.'],
      ],
      savingsGoal: [
        ['Was berechnet wird', 'Schaetzt Monate und Jahre bis zu einem Sparziel aus vorhandenem Guthaben, Monatsbeitrag und Jahreszins.'],
        ['Formel', 'Loest die Zeit mit monatlicher Verzinsung oder linear, wenn der Jahreszins null ist.'],
        ['Interpretation', 'Nutzen Sie die Zeit bis zum Ziel als Planungswert und testen Sie hoehere oder niedrigere Beitraege.'],
        ['Haeufige Fehler', 'Mischen Sie Startguthaben, Monatsbeitraege und Jahreszins nicht ohne gleiche Periodenlogik.'],
        ['Grenzen', 'Steuern, Gebuehren, Strafen, Inflation und kuenftige Beitragsaenderungen sind ausgeschlossen.'],
      ],
      breakEven: [
        ['Was berechnet wird', 'Zeigt, wie viele Einheiten verkauft werden muessen, damit Deckungsbeitrag Fixkosten deckt.'],
        ['Formel', 'Break-even-Einheiten = Fixkosten / (Preis pro Einheit - variable Kosten pro Einheit).'],
        ['Interpretation', 'Ein niedrigerer Break-even gibt mehr Raum fuer langsame Verkaeufe, Rabatte oder Nachfragewechsel.'],
        ['Haeufige Fehler', 'Mischen Sie keine monatlichen Fixkosten mit Jahreszielen. Halten Sie die Periode gleich.'],
        ['Grenzen', 'Das Modell nimmt einen Preis, variable Kosten und keine Kapazitaetsgrenze an. Nutzen Sie Szenarien fuer Produktmix.'],
      ],
      margin: [
        ['Was berechnet wird', 'Berechnet Bruttogewinn, Bruttomarge und Markup aus Umsatz und Warenkosten.'],
        ['Formel', 'Bruttogewinn = Umsatz - Kosten. Marge = Gewinn / Umsatz. Markup = Gewinn / Kosten.'],
        ['Interpretation', 'Marge zeigt, was vor Betriebskosten, Steuern und Finanzierung vom Umsatz bleibt.'],
        ['Haeufige Fehler', 'Marge und Markup sind verschieden, weil sie verschiedene Basen verwenden.'],
        ['Grenzen', 'Der Rechner entscheidet nicht, welche Kosten in COGS gehoeren. Nutzen Sie konsistente Definitionen.'],
      ],
      cashRunway: [
        ['Was berechnet wird', 'Schaetzt, wie viele Monate aktuelles Bargeld den monatlichen Netto-Burn deckt.'],
        ['Formel', 'Netto-Burn = monatliche Betriebskosten - monatlicher Umsatz. Runway = Bargeld / Netto-Burn.'],
        ['Interpretation', 'Mehr Runway gibt Zeit, Umsatz, Kosten, Preise oder Finanzierung vor Cash-Druck anzupassen.'],
        ['Haeufige Fehler', 'Einmalige Einnahmen oder Jahreskosten gehoeren erst nach Umrechnung in dieselbe Monatsperiode hinein.'],
        ['Grenzen', 'Kreditlinien, spaete Rechnungen, Steuern, Covenants und Finanzierungsereignisse sind ausgeschlossen.'],
      ],
      discountPrice: [
        ['Was berechnet wird', 'Schaetzt finalen Stueckpreis, Bestellsumme und Ersparnis vor zusaetzlichen Gebuehren.'],
        ['Formel', 'Finaler Stueckpreis = Listenpreis x (1 - Rabatt) + Gebuehr je Einheit. Summe = Stueckpreis x Menge.'],
        ['Interpretation', 'Nutzen Sie den finalen Preis fuer Angebotsvergleich und die Summe, wenn Menge oder Gebuehren zaehlen.'],
        ['Haeufige Fehler', 'Vergleichen Sie nicht nur den Rabatt. Gebuehren und Menge koennen die Ersparnis verringern.'],
        ['Grenzen', 'Steuern, Versand, gedeckelte Coupons und Ruecksendekosten sind ausgeschlossen, wenn sie nicht als Gebuehr eingegeben werden.'],
      ],
      roi: [
        ['Was berechnet wird', 'Vergleicht Rueckfluss und Investitionskosten und zeigt Nettoertrag sowie ROI.'],
        ['Formel', 'Nettoertrag = Rueckfluss - Kosten. ROI = Nettoertrag / Kosten.'],
        ['Interpretation', 'Positiver ROI heisst Rueckfluss ueber Kosten. Vergleichen Sie auch Risiko, Zeitraum und Alternativen.'],
        ['Haeufige Fehler', 'Vergleichen Sie keinen Monats-ROI mit Mehrjahres-ROI ohne Zeitraum.'],
        ['Grenzen', 'Risiko, Steuern, Finanzierung, Inflation und Opportunitaetskosten sind ausgeschlossen, wenn sie nicht eingegeben werden.'],
      ],
    },
  } as const

  return sections[locale][kind].map(([heading, paragraph]) => ({ heading, paragraphs: [paragraph] }))
}

function faq(locale: LocaleCode): FaqItem[] {
  const entries: Record<LocaleCode, FaqItem[]> = {
    en: [
      { question: 'Are values stored?', answer: 'No. CalcHarbor calculates in the browser and does not store calculator inputs or results.' },
      { question: 'Can I use this for final financial decisions?', answer: 'Use the result as a planning signal. Confirm legal, tax, credit and accounting decisions with a qualified professional.' },
    ],
    'pt-br': [
      { question: 'Os valores sao armazenados?', answer: 'Nao. O CalcHarbor calcula no navegador e nao armazena entradas ou resultados.' },
      { question: 'Posso usar para decisao financeira final?', answer: 'Use como sinal de planejamento. Confirme decisoes juridicas, fiscais, de credito e contabeis com profissional qualificado.' },
    ],
    es: [
      { question: 'Se almacenan los valores?', answer: 'No. CalcHarbor calcula en el navegador y no guarda entradas ni resultados.' },
      { question: 'Sirve para decisiones financieras finales?', answer: 'Usalo como senal de planificacion. Confirma decisiones legales, fiscales, de credito y contables con un profesional.' },
    ],
    fr: [
      { question: 'Les valeurs sont-elles stockees?', answer: 'Non. CalcHarbor calcule dans le navigateur et ne stocke ni entrees ni resultats.' },
      { question: 'Puis-je l utiliser pour une decision finale?', answer: 'Utilisez-le comme signal de planification. Confirmez fiscal, juridique, credit et comptabilite avec un professionnel.' },
    ],
    de: [
      { question: 'Werden Werte gespeichert?', answer: 'Nein. CalcHarbor rechnet im Browser und speichert keine Eingaben oder Ergebnisse.' },
      { question: 'Eignet es sich fuer endgueltige Finanzentscheidungen?', answer: 'Nutzen Sie es als Planungssignal. Recht, Steuern, Kredit und Buchhaltung sollten Fachleute bestaetigen.' },
    ],
  }

  return entries[locale]
}

function copy(
  locale: LocaleCode,
  kind: CalculatorKind,
  input: Omit<CalculatorCopy, 'contentSections' | 'faq' | 'reviewedLabel'>,
): CalculatorCopy {
  const reviewed: Record<LocaleCode, string> = {
    en: 'Reviewed June 26, 2026',
    'pt-br': 'Revisado em 26 de junho de 2026',
    es: 'Revisado el 26 de junio de 2026',
    fr: 'Revise le 26 juin 2026',
    de: 'Geprueft am 26. Juni 2026',
  }

  return {
    ...input,
    reviewedLabel: reviewed[locale],
    contentSections: standardSections(locale, kind),
    faq: faq(locale),
  }
}

const loanFields = [
  field(
    'principal',
    { en: 'Loan amount', 'pt-br': 'Valor do emprestimo', es: 'Monto del prestamo', fr: 'Montant du pret', de: 'Darlehensbetrag' },
    { en: 'Principal before interest.', 'pt-br': 'Principal antes dos juros.', es: 'Principal antes de intereses.', fr: 'Capital avant interets.', de: 'Kapital vor Zinsen.' },
    localizedNumber(25000, 125000, 25000, 25000, 25000),
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'annualRate',
    { en: 'Annual interest rate', 'pt-br': 'Taxa anual de juros', es: 'Tasa anual de interes', fr: 'Taux annuel', de: 'Jahreszins' },
    { en: 'Nominal annual rate.', 'pt-br': 'Taxa anual nominal.', es: 'Tasa anual nominal.', fr: 'Taux annuel nominal.', de: 'Nominaler Jahreszins.' },
    8.5,
    { min: 0, step: 0.1, suffix: '%' },
  ),
  field(
    'years',
    { en: 'Term in years', 'pt-br': 'Prazo em anos', es: 'Plazo en anos', fr: 'Duree en annees', de: 'Laufzeit in Jahren' },
    { en: 'Total repayment term.', 'pt-br': 'Prazo total de pagamento.', es: 'Plazo total de pago.', fr: 'Duree totale de remboursement.', de: 'Gesamte Rueckzahlungsdauer.' },
    5,
    { min: 1, step: 1 },
  ),
]

const compoundInterestFields = [
  field(
    'principal',
    { en: 'Starting balance', 'pt-br': 'Saldo inicial', es: 'Saldo inicial', fr: 'Solde initial', de: 'Startguthaben' },
    { en: 'Amount already invested or saved.', 'pt-br': 'Valor ja investido ou poupado.', es: 'Monto ya invertido o ahorrado.', fr: 'Montant deja investi ou epargne.', de: 'Bereits investierter oder gesparter Betrag.' },
    localizedNumber(10000, 50000, 10000, 10000, 10000),
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'monthlyContribution',
    { en: 'Monthly contribution', 'pt-br': 'Aporte mensal', es: 'Aporte mensual', fr: 'Versement mensuel', de: 'Monatsbeitrag' },
    { en: 'Recurring amount added each month.', 'pt-br': 'Valor recorrente adicionado todo mes.', es: 'Monto recurrente agregado cada mes.', fr: 'Montant ajoute chaque mois.', de: 'Betrag, der monatlich hinzukommt.' },
    localizedNumber(250, 1250, 250, 250, 250),
    { min: 0, step: 25, prefix: '$' },
  ),
  field(
    'annualRate',
    { en: 'Annual growth rate', 'pt-br': 'Taxa anual de crescimento', es: 'Tasa anual de crecimiento', fr: 'Taux annuel de croissance', de: 'Jaehrliche Wachstumsrate' },
    { en: 'Expected annual rate before fees and taxes.', 'pt-br': 'Taxa anual esperada antes de tarifas e impostos.', es: 'Tasa anual esperada antes de comisiones e impuestos.', fr: 'Taux annuel attendu avant frais et taxes.', de: 'Erwartete Jahresrate vor Gebuehren und Steuern.' },
    6,
    { min: 0, step: 0.1, suffix: '%' },
  ),
  field(
    'years',
    { en: 'Years invested', 'pt-br': 'Anos investidos', es: 'Anos invertidos', fr: 'Annees investies', de: 'Anlagejahre' },
    { en: 'Total compounding period.', 'pt-br': 'Periodo total de capitalizacao.', es: 'Periodo total de capitalizacion.', fr: 'Periode totale de capitalisation.', de: 'Gesamter Anlagezeitraum.' },
    10,
    { min: 1, step: 1 },
  ),
]

const savingsGoalFields = [
  field(
    'targetAmount',
    { en: 'Target amount', 'pt-br': 'Meta financeira', es: 'Meta financiera', fr: 'Objectif financier', de: 'Sparziel' },
    { en: 'Goal balance you want to reach.', 'pt-br': 'Saldo final que voce quer atingir.', es: 'Saldo objetivo que quieres alcanzar.', fr: 'Solde cible a atteindre.', de: 'Zielbetrag, der erreicht werden soll.' },
    localizedNumber(20000, 100000, 20000, 20000, 20000),
    { min: 1, step: 100, prefix: '$' },
  ),
  field(
    'currentSavings',
    { en: 'Current savings', 'pt-br': 'Poupanca atual', es: 'Ahorro actual', fr: 'Epargne actuelle', de: 'Aktuelles Guthaben' },
    { en: 'Amount already set aside.', 'pt-br': 'Valor ja reservado.', es: 'Monto ya reservado.', fr: 'Montant deja mis de cote.', de: 'Bereits beiseitegelegter Betrag.' },
    localizedNumber(2500, 12500, 2500, 2500, 2500),
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'monthlyContribution',
    { en: 'Monthly contribution', 'pt-br': 'Aporte mensal', es: 'Aporte mensual', fr: 'Versement mensuel', de: 'Monatsbeitrag' },
    { en: 'Recurring amount added each month.', 'pt-br': 'Valor recorrente adicionado todo mes.', es: 'Monto recurrente agregado cada mes.', fr: 'Montant ajoute chaque mois.', de: 'Betrag, der monatlich hinzukommt.' },
    localizedNumber(600, 3000, 600, 600, 600),
    { min: 0, step: 50, prefix: '$' },
  ),
  field(
    'annualRate',
    { en: 'Annual growth rate', 'pt-br': 'Taxa anual de crescimento', es: 'Tasa anual de crecimiento', fr: 'Taux annuel de croissance', de: 'Jaehrliche Wachstumsrate' },
    { en: 'Expected annual growth while saving.', 'pt-br': 'Crescimento anual esperado durante a poupanca.', es: 'Crecimiento anual esperado durante el ahorro.', fr: 'Croissance annuelle attendue pendant l epargne.', de: 'Erwartetes Jahreswachstum beim Sparen.' },
    4,
    { min: 0, step: 0.1, suffix: '%' },
  ),
]

const breakEvenFields = [
  field(
    'fixedCosts',
    { en: 'Fixed costs', 'pt-br': 'Custos fixos', es: 'Costos fijos', fr: 'Couts fixes', de: 'Fixkosten' },
    { en: 'Costs for the same period.', 'pt-br': 'Custos do mesmo periodo.', es: 'Costos del mismo periodo.', fr: 'Couts de la meme periode.', de: 'Kosten derselben Periode.' },
    localizedNumber(12000, 60000, 12000, 12000, 12000),
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'pricePerUnit',
    { en: 'Price per unit', 'pt-br': 'Preco por unidade', es: 'Precio unitario', fr: 'Prix unitaire', de: 'Preis pro Einheit' },
    { en: 'Average selling price.', 'pt-br': 'Preco medio de venda.', es: 'Precio promedio de venta.', fr: 'Prix de vente moyen.', de: 'Durchschnittlicher Verkaufspreis.' },
    localizedNumber(80, 400, 80, 80, 80),
    { min: 1, step: 1, prefix: '$' },
  ),
  field(
    'variableCostPerUnit',
    { en: 'Variable cost per unit', 'pt-br': 'Custo variavel por unidade', es: 'Costo variable unitario', fr: 'Cout variable unitaire', de: 'Variable Kosten pro Einheit' },
    { en: 'Cost that moves with each unit.', 'pt-br': 'Custo que acompanha cada unidade.', es: 'Costo que cambia por unidad.', fr: 'Cout qui varie par unite.', de: 'Kosten je verkaufter Einheit.' },
    localizedNumber(32, 160, 32, 32, 32),
    { min: 0, step: 1, prefix: '$' },
  ),
]

const marginFields = [
  field(
    'revenue',
    { en: 'Revenue', 'pt-br': 'Receita', es: 'Ingresos', fr: 'Revenus', de: 'Umsatz' },
    { en: 'Sales before subtracting cost.', 'pt-br': 'Vendas antes do custo.', es: 'Ventas antes del costo.', fr: 'Ventes avant cout.', de: 'Umsatz vor Kosten.' },
    localizedNumber(50000, 250000, 50000, 50000, 50000),
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'cost',
    { en: 'Cost of goods sold', 'pt-br': 'Custo dos produtos vendidos', es: 'Costo de ventas', fr: 'Cout des ventes', de: 'Warenkosten' },
    { en: 'Direct cost tied to the revenue.', 'pt-br': 'Custo direto ligado a receita.', es: 'Costo directo ligado a ingresos.', fr: 'Cout direct lie aux revenus.', de: 'Direkte Kosten zum Umsatz.' },
    localizedNumber(28500, 142500, 28500, 28500, 28500),
    { min: 0, step: 100, prefix: '$' },
  ),
]

const cashRunwayFields = [
  field(
    'cashBalance',
    { en: 'Cash on hand', 'pt-br': 'Caixa disponivel', es: 'Efectivo disponible', fr: 'Tresorerie disponible', de: 'Verfuegbares Bargeld' },
    { en: 'Available cash balance today.', 'pt-br': 'Saldo de caixa disponivel hoje.', es: 'Saldo disponible hoy.', fr: 'Solde disponible aujourd hui.', de: 'Heute verfuegbares Guthaben.' },
    localizedNumber(60000, 300000, 60000, 60000, 60000),
    { min: 0, step: 1000, prefix: '$' },
  ),
  field(
    'monthlyOperatingCost',
    { en: 'Monthly operating cost', 'pt-br': 'Custo operacional mensal', es: 'Costo operativo mensual', fr: 'Cout operationnel mensuel', de: 'Monatliche Betriebskosten' },
    { en: 'Recurring cost for the same month.', 'pt-br': 'Custo recorrente do mesmo mes.', es: 'Costo recurrente del mismo mes.', fr: 'Cout recurrent du meme mois.', de: 'Wiederkehrende Kosten desselben Monats.' },
    localizedNumber(18000, 90000, 18000, 18000, 18000),
    { min: 0, step: 500, prefix: '$' },
  ),
  field(
    'monthlyRevenue',
    { en: 'Monthly revenue', 'pt-br': 'Receita mensal', es: 'Ingresos mensuales', fr: 'Revenus mensuels', de: 'Monatlicher Umsatz' },
    { en: 'Recurring monthly revenue already expected.', 'pt-br': 'Receita mensal recorrente ja esperada.', es: 'Ingresos mensuales recurrentes ya esperados.', fr: 'Revenus mensuels recurrents deja attendus.', de: 'Bereits erwarteter wiederkehrender Monatsumsatz.' },
    localizedNumber(6000, 30000, 6000, 6000, 6000),
    { min: 0, step: 500, prefix: '$' },
  ),
]

const discountPriceFields = [
  field(
    'listPrice',
    { en: 'List price', 'pt-br': 'Preco de lista', es: 'Precio de lista', fr: 'Prix catalogue', de: 'Listenpreis' },
    { en: 'Original price before discount.', 'pt-br': 'Preco original antes do desconto.', es: 'Precio original antes del descuento.', fr: 'Prix initial avant remise.', de: 'Urspruenglicher Preis vor Rabatt.' },
    localizedNumber(120, 600, 120, 120, 120),
    { min: 0, step: 1, prefix: '$' },
  ),
  field(
    'discountRate',
    { en: 'Discount rate', 'pt-br': 'Percentual de desconto', es: 'Porcentaje de descuento', fr: 'Taux de remise', de: 'Rabatt' },
    { en: 'Percent removed from the list price.', 'pt-br': 'Percentual removido do preco de lista.', es: 'Porcentaje restado del precio de lista.', fr: 'Pourcentage retire du prix catalogue.', de: 'Prozentualer Abzug vom Listenpreis.' },
    15,
    { min: 0, step: 0.1, suffix: '%' },
  ),
  field(
    'addedFee',
    { en: 'Added fee per unit', 'pt-br': 'Tarifa por unidade', es: 'Cargo por unidad', fr: 'Frais par unite', de: 'Gebuehr je Einheit' },
    { en: 'Shipping, service or handling fee per unit.', 'pt-br': 'Frete, servico ou manuseio por unidade.', es: 'Envio, servicio o manejo por unidad.', fr: 'Livraison, service ou manutention par unite.', de: 'Versand, Service oder Bearbeitung je Einheit.' },
    localizedNumber(0, 0, 0, 0, 0),
    { min: 0, step: 1, prefix: '$' },
  ),
  field(
    'quantity',
    { en: 'Quantity', 'pt-br': 'Quantidade', es: 'Cantidad', fr: 'Quantite', de: 'Menge' },
    { en: 'Number of units in the order.', 'pt-br': 'Numero de unidades no pedido.', es: 'Numero de unidades en el pedido.', fr: 'Nombre d unites dans la commande.', de: 'Anzahl der Einheiten in der Bestellung.' },
    1,
    { min: 1, step: 1 },
  ),
]

const roiFields = [
  field(
    'returnValue',
    { en: 'Return value', 'pt-br': 'Valor de retorno', es: 'Valor de retorno', fr: 'Valeur de retour', de: 'Rueckfluss' },
    { en: 'Money or value received.', 'pt-br': 'Dinheiro ou valor recebido.', es: 'Dinero o valor recibido.', fr: 'Argent ou valeur recue.', de: 'Erhaltener Wert.' },
    localizedNumber(18000, 90000, 18000, 18000, 18000),
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'investmentCost',
    { en: 'Investment cost', 'pt-br': 'Custo do investimento', es: 'Costo de inversion', fr: 'Cout d investissement', de: 'Investitionskosten' },
    { en: 'Total cost to make the investment.', 'pt-br': 'Custo total para investir.', es: 'Costo total de la inversion.', fr: 'Cout total de l investissement.', de: 'Gesamtkosten der Investition.' },
    localizedNumber(12000, 60000, 12000, 12000, 12000),
    { min: 0, step: 100, prefix: '$' },
  ),
]

export const calculatorCatalog: CalculatorDefinition[] = [
  {
    slug: 'loan-payment',
    category: 'finance',
    fields: loanFields,
    localized: {
      en: copy('en', 'loan', {
        title: 'Loan Payment Calculator',
        shortName: 'Loan payment',
        headline: 'Estimate monthly payment, total paid and interest with the amortization formula visible.',
        description: 'Enter principal, annual rate and term. The free result is complete and runs in your browser.',
        formula: 'M = P x r x (1 + r)^n / ((1 + r)^n - 1)',
        example: 'Example: USD 25,000 at 8.5% for 5 years.',
        interpretation: 'Use the monthly payment for cash-flow fit and the total interest for cost comparison.',
        freeScope: 'Monthly payment, total paid, total interest and formula.',
        upgradeScope: 'Saved loan scenarios, comparison exports, team review and API.',
      }),
      'pt-br': copy('pt-br', 'loan', {
        title: 'Calculadora de Parcela de Emprestimo',
        shortName: 'Parcela',
        headline: 'Estime parcela mensal, total pago e juros com a formula de amortizacao visivel.',
        description: 'Informe principal, taxa anual e prazo. O resultado gratuito e completo e roda no navegador.',
        formula: 'M = P x r x (1 + r)^n / ((1 + r)^n - 1)',
        example: 'Exemplo: BRL 125.000 a 8,5% por 5 anos.',
        interpretation: 'Use a parcela para encaixe de caixa e os juros totais para comparar custo.',
        freeScope: 'Parcela mensal, total pago, juros totais e formula.',
        upgradeScope: 'Cenarios salvos, exportacao, revisao em equipe e API.',
      }),
      es: copy('es', 'loan', {
        title: 'Calculadora de Pago de Prestamo',
        shortName: 'Pago de prestamo',
        headline: 'Estima pago mensual, total pagado e interes con la formula visible.',
        description: 'Ingresa principal, tasa anual y plazo. El resultado gratis es completo y corre en el navegador.',
        formula: 'M = P x r x (1 + r)^n / ((1 + r)^n - 1)',
        example: 'Ejemplo: EUR 25.000 al 8,5% por 5 anos.',
        interpretation: 'Usa el pago para flujo de caja y el interes total para comparar costo.',
        freeScope: 'Pago mensual, total pagado, interes total y formula.',
        upgradeScope: 'Escenarios guardados, exportaciones, revision de equipo y API.',
      }),
      fr: copy('fr', 'loan', {
        title: 'Calculatrice de Mensualite',
        shortName: 'Mensualite',
        headline: 'Estime mensualite, total paye et interets avec la formule visible.',
        description: 'Saisissez capital, taux annuel et duree. Le resultat gratuit est complet et local.',
        formula: 'M = P x r x (1 + r)^n / ((1 + r)^n - 1)',
        example: 'Exemple: 25 000 EUR a 8,5% sur 5 ans.',
        interpretation: 'Utilisez la mensualite pour le cash-flow et les interets pour comparer le cout.',
        freeScope: 'Mensualite, total paye, interets et formule.',
        upgradeScope: 'Scenarios sauvegardes, exports, equipe et API.',
      }),
      de: copy('de', 'loan', {
        title: 'Kreditratenrechner',
        shortName: 'Kreditrate',
        headline: 'Schaetzt Monatsrate, Gesamtzahlung und Zinsen mit sichtbarer Formel.',
        description: 'Geben Sie Kapital, Jahreszins und Laufzeit ein. Das kostenlose Ergebnis laeuft im Browser.',
        formula: 'M = P x r x (1 + r)^n / ((1 + r)^n - 1)',
        example: 'Beispiel: 25.000 EUR zu 8,5% fuer 5 Jahre.',
        interpretation: 'Nutzen Sie die Monatsrate fuer Cashflow und Gesamtzinsen fuer Kostenvergleich.',
        freeScope: 'Monatsrate, Gesamtzahlung, Zinsen und Formel.',
        upgradeScope: 'Gespeicherte Szenarien, Exporte, Teampruefung und API.',
      }),
    },
    calculate(inputs) {
      const principal = inputs.principal
      const annualRate = inputs.annualRate
      const years = inputs.years

      if (!isPositive(principal, years) || annualRate < 0) {
        return { ok: false, error: positiveNumberError }
      }

      const months = Math.round(years * 12)
      const monthlyRate = annualRate / 100 / 12
      const monthlyPayment = monthlyRate === 0
        ? principal / months
        : principal * monthlyRate * ((1 + monthlyRate) ** months) / (((1 + monthlyRate) ** months) - 1)
      const totalPaid = monthlyPayment * months

      return {
        ok: true,
        metrics: [
          metric('monthly_payment', { en: 'Monthly payment', 'pt-br': 'Parcela mensal', es: 'Pago mensual', fr: 'Mensualite', de: 'Monatsrate' }, monthlyPayment, 'currency'),
          metric('total_paid', { en: 'Total paid', 'pt-br': 'Total pago', es: 'Total pagado', fr: 'Total paye', de: 'Gesamtzahlung' }, totalPaid, 'currency'),
          metric('total_interest', { en: 'Total interest', 'pt-br': 'Juros totais', es: 'Interes total', fr: 'Interets totaux', de: 'Gesamtzinsen' }, totalPaid - principal, 'currency'),
        ],
      }
    },
  },
  {
    slug: 'compound-interest',
    category: 'finance',
    fields: compoundInterestFields,
    localized: {
      en: copy('en', 'compoundInterest', {
        title: 'Compound Interest Calculator',
        shortName: 'Compound interest',
        headline: 'Estimate ending balance, interest earned and contributions with monthly compounding visible.',
        description: 'Enter a starting balance, monthly contribution, annual growth rate and term. The result runs locally.',
        formula: 'FV = P x (1 + r)^n + PMT x (((1 + r)^n - 1) / r)',
        example: 'Example: USD 10,000 starting balance, USD 250 monthly, 6% for 10 years.',
        interpretation: 'Use ending balance as a planning estimate and compare interest earned with total contributions.',
        freeScope: 'Ending balance, interest earned, total contributions and formula.',
        upgradeScope: 'Saved investment scenarios, comparison exports, recurring reminders and API.',
      }),
      'pt-br': copy('pt-br', 'compoundInterest', {
        title: 'Calculadora de Juros Compostos',
        shortName: 'Juros compostos',
        headline: 'Estime saldo final, juros acumulados e aportes com capitalizacao mensal visivel.',
        description: 'Informe saldo inicial, aporte mensal, taxa anual e prazo. O resultado roda localmente.',
        formula: 'VF = P x (1 + r)^n + PMT x (((1 + r)^n - 1) / r)',
        example: 'Exemplo: BRL 50.000 de saldo inicial, BRL 1.250 mensais, 6% por 10 anos.',
        interpretation: 'Use o saldo final como estimativa e compare juros acumulados com total aportado.',
        freeScope: 'Saldo final, juros acumulados, total aportado e formula.',
        upgradeScope: 'Cenarios salvos, exportacoes comparativas, lembretes recorrentes e API.',
      }),
      es: copy('es', 'compoundInterest', {
        title: 'Calculadora de Interes Compuesto',
        shortName: 'Interes compuesto',
        headline: 'Estima saldo final, interes generado y aportes con capitalizacion mensual visible.',
        description: 'Ingresa saldo inicial, aporte mensual, tasa anual y plazo. El resultado corre localmente.',
        formula: 'VF = P x (1 + r)^n + PMT x (((1 + r)^n - 1) / r)',
        example: 'Ejemplo: EUR 10.000 iniciales, EUR 250 mensuales, 6% por 10 anos.',
        interpretation: 'Usa el saldo final como estimacion y compara interes generado con aportes totales.',
        freeScope: 'Saldo final, interes generado, aportes totales y formula.',
        upgradeScope: 'Escenarios guardados, exportaciones comparativas, recordatorios y API.',
      }),
      fr: copy('fr', 'compoundInterest', {
        title: 'Calculatrice d Interets Composes',
        shortName: 'Interets composes',
        headline: 'Estime solde final, interets gagnes et versements avec capitalisation mensuelle visible.',
        description: 'Saisissez solde initial, versement mensuel, taux annuel et duree. Le resultat reste local.',
        formula: 'VF = P x (1 + r)^n + PMT x (((1 + r)^n - 1) / r)',
        example: 'Exemple: 10 000 EUR au depart, 250 EUR mensuels, 6% sur 10 ans.',
        interpretation: 'Utilisez le solde final comme estimation et comparez interets gagnes et versements.',
        freeScope: 'Solde final, interets gagnes, versements totaux et formule.',
        upgradeScope: 'Scenarios sauvegardes, exports comparatifs, rappels recurrents et API.',
      }),
      de: copy('de', 'compoundInterest', {
        title: 'Zinseszinsrechner',
        shortName: 'Zinseszins',
        headline: 'Schaetzt Endsaldo, verdiente Zinsen und Einzahlungen mit sichtbarer Monatsverzinsung.',
        description: 'Geben Sie Startguthaben, Monatsbeitrag, Jahreszins und Laufzeit ein. Ergebnis bleibt lokal.',
        formula: 'ZW = P x (1 + r)^n + PMT x (((1 + r)^n - 1) / r)',
        example: 'Beispiel: 10.000 EUR Startguthaben, 250 EUR monatlich, 6% fuer 10 Jahre.',
        interpretation: 'Nutzen Sie den Endsaldo als Planungsschaetzung und vergleichen Sie Zinsen mit Einzahlungen.',
        freeScope: 'Endsaldo, verdiente Zinsen, gesamte Einzahlungen und Formel.',
        upgradeScope: 'Gespeicherte Szenarien, Vergleichsexporte, wiederkehrende Erinnerungen und API.',
      }),
    },
    calculate(inputs) {
      const principal = inputs.principal
      const monthlyContribution = inputs.monthlyContribution
      const annualRate = inputs.annualRate
      const years = inputs.years

      if (!isPositive(principal, years) || monthlyContribution < 0 || annualRate < 0) {
        return { ok: false, error: positiveNumberError }
      }

      const months = Math.round(years * 12)
      const monthlyRate = annualRate / 100 / 12
      const principalGrowth = monthlyRate === 0 ? principal : principal * ((1 + monthlyRate) ** months)
      const contributionGrowth = monthlyRate === 0
        ? monthlyContribution * months
        : monthlyContribution * ((((1 + monthlyRate) ** months) - 1) / monthlyRate)
      const endingBalance = principalGrowth + contributionGrowth
      const totalContributed = principal + (monthlyContribution * months)

      return {
        ok: true,
        metrics: [
          metric('ending_balance', { en: 'Ending balance', 'pt-br': 'Saldo final', es: 'Saldo final', fr: 'Solde final', de: 'Endsaldo' }, endingBalance, 'currency'),
          metric('interest_earned', { en: 'Interest earned', 'pt-br': 'Juros acumulados', es: 'Interes generado', fr: 'Interets gagnes', de: 'Verdiente Zinsen' }, endingBalance - totalContributed, 'currency'),
          metric('total_contributed', { en: 'Total contributed', 'pt-br': 'Total aportado', es: 'Aportes totales', fr: 'Versements totaux', de: 'Gesamte Einzahlungen' }, totalContributed, 'currency'),
        ],
      }
    },
  },
  {
    slug: 'savings-goal',
    category: 'finance',
    fields: savingsGoalFields,
    localized: {
      en: copy('en', 'savingsGoal', {
        title: 'Savings Goal Calculator',
        shortName: 'Savings goal',
        headline: 'Estimate how long a target balance takes with current savings, monthly contributions and growth.',
        description: 'Enter the goal, current savings, monthly contribution and annual rate to get time-to-goal.',
        formula: 'n = log((target x r + PMT) / (current x r + PMT)) / log(1 + r)',
        example: 'Example: USD 20,000 goal, USD 2,500 saved, USD 600 monthly and 4% annual growth.',
        interpretation: 'Use months to goal as a planning checkpoint and compare contribution scenarios.',
        freeScope: 'Months to goal, years to goal, projected contributions and formula.',
        upgradeScope: 'Saved goals, calendar reminders, exportable plans and API.',
      }),
      'pt-br': copy('pt-br', 'savingsGoal', {
        title: 'Calculadora de Meta de Poupanca',
        shortName: 'Meta de poupanca',
        headline: 'Estime quanto tempo uma meta leva com poupanca atual, aportes mensais e crescimento.',
        description: 'Informe meta, poupanca atual, aporte mensal e taxa anual para obter o prazo.',
        formula: 'n = log((meta x r + PMT) / (atual x r + PMT)) / log(1 + r)',
        example: 'Exemplo: BRL 100.000 de meta, BRL 12.500 guardados, BRL 3.000 mensais e 4% ao ano.',
        interpretation: 'Use meses ate a meta como marco de planejamento e compare cenarios de aporte.',
        freeScope: 'Meses ate a meta, anos ate a meta, aportes projetados e formula.',
        upgradeScope: 'Metas salvas, lembretes de calendario, planos exportaveis e API.',
      }),
      es: copy('es', 'savingsGoal', {
        title: 'Calculadora de Meta de Ahorro',
        shortName: 'Meta de ahorro',
        headline: 'Estima cuanto tarda una meta con ahorro actual, aportes mensuales y crecimiento.',
        description: 'Ingresa meta, ahorro actual, aporte mensual y tasa anual para obtener el plazo.',
        formula: 'n = log((meta x r + PMT) / (actual x r + PMT)) / log(1 + r)',
        example: 'Ejemplo: EUR 20.000 de meta, EUR 2.500 ahorrados, EUR 600 mensuales y 4% anual.',
        interpretation: 'Usa meses hasta la meta como control de planificacion y compara aportes.',
        freeScope: 'Meses hasta la meta, anos hasta la meta, aportes proyectados y formula.',
        upgradeScope: 'Metas guardadas, recordatorios, planes exportables y API.',
      }),
      fr: copy('fr', 'savingsGoal', {
        title: 'Calculatrice d Objectif d Epargne',
        shortName: 'Objectif epargne',
        headline: 'Estime le delai pour atteindre un objectif avec epargne actuelle, versements et croissance.',
        description: 'Saisissez objectif, epargne actuelle, versement mensuel et taux annuel pour obtenir la duree.',
        formula: 'n = log((objectif x r + PMT) / (actuel x r + PMT)) / log(1 + r)',
        example: 'Exemple: objectif 20 000 EUR, 2 500 EUR deja epargnes, 600 EUR mensuels et 4% annuel.',
        interpretation: 'Utilisez les mois restants comme point de planification et comparez les versements.',
        freeScope: 'Mois jusqu a l objectif, annees, versements projetes et formule.',
        upgradeScope: 'Objectifs sauvegardes, rappels calendrier, plans exportables et API.',
      }),
      de: copy('de', 'savingsGoal', {
        title: 'Sparzielrechner',
        shortName: 'Sparziel',
        headline: 'Schaetzt die Zeit bis zum Ziel mit vorhandenem Guthaben, Monatsbeitrag und Wachstum.',
        description: 'Geben Sie Ziel, Guthaben, Monatsbeitrag und Jahreszins ein, um die Zeit zu berechnen.',
        formula: 'n = log((Ziel x r + PMT) / (Aktuell x r + PMT)) / log(1 + r)',
        example: 'Beispiel: 20.000 EUR Ziel, 2.500 EUR gespart, 600 EUR monatlich und 4% pro Jahr.',
        interpretation: 'Nutzen Sie Monate bis zum Ziel als Planungswert und vergleichen Sie Beitragszenarien.',
        freeScope: 'Monate bis zum Ziel, Jahre bis zum Ziel, geplante Einzahlungen und Formel.',
        upgradeScope: 'Gespeicherte Ziele, Kalendererinnerungen, exportierbare Plaene und API.',
      }),
    },
    calculate(inputs) {
      const targetAmount = inputs.targetAmount
      const currentSavings = inputs.currentSavings
      const monthlyContribution = inputs.monthlyContribution
      const annualRate = inputs.annualRate

      if (!isPositive(targetAmount) || currentSavings < 0 || monthlyContribution < 0 || annualRate < 0) {
        return { ok: false, error: positiveNumberError }
      }

      if (currentSavings >= targetAmount) {
        return {
          ok: true,
          metrics: [
            metric('months_to_goal', { en: 'Months to goal', 'pt-br': 'Meses ate a meta', es: 'Meses hasta la meta', fr: 'Mois jusqu a l objectif', de: 'Monate bis zum Ziel' }, 0, 'number'),
            metric('years_to_goal', { en: 'Years to goal', 'pt-br': 'Anos ate a meta', es: 'Anos hasta la meta', fr: 'Annees jusqu a l objectif', de: 'Jahre bis zum Ziel' }, 0, 'number'),
            metric('projected_contributions', { en: 'Projected contributions', 'pt-br': 'Aportes projetados', es: 'Aportes proyectados', fr: 'Versements projetes', de: 'Geplante Einzahlungen' }, 0, 'currency'),
          ],
        }
      }

      const monthlyRate = annualRate / 100 / 12
      let monthsToGoal = 0
      if (monthlyRate === 0) {
        if (monthlyContribution <= 0) {
          return { ok: false, error: goalContributionError }
        }

        monthsToGoal = (targetAmount - currentSavings) / monthlyContribution
      } else if (monthlyContribution === 0) {
        if (currentSavings <= 0) {
          return { ok: false, error: goalContributionError }
        }

        monthsToGoal = Math.log(targetAmount / currentSavings) / Math.log(1 + monthlyRate)
      } else {
        monthsToGoal = Math.log(((targetAmount * monthlyRate) + monthlyContribution) / ((currentSavings * monthlyRate) + monthlyContribution)) / Math.log(1 + monthlyRate)
      }

      if (!Number.isFinite(monthsToGoal) || monthsToGoal < 0) {
        return { ok: false, error: goalContributionError }
      }

      const roundedMonths = Math.ceil(monthsToGoal)

      return {
        ok: true,
        metrics: [
          metric('months_to_goal', { en: 'Months to goal', 'pt-br': 'Meses ate a meta', es: 'Meses hasta la meta', fr: 'Mois jusqu a l objectif', de: 'Monate bis zum Ziel' }, roundedMonths, 'number'),
          metric('years_to_goal', { en: 'Years to goal', 'pt-br': 'Anos ate a meta', es: 'Anos hasta la meta', fr: 'Annees jusqu a l objectif', de: 'Jahre bis zum Ziel' }, roundedMonths / 12, 'number'),
          metric('projected_contributions', { en: 'Projected contributions', 'pt-br': 'Aportes projetados', es: 'Aportes proyectados', fr: 'Versements projetes', de: 'Geplante Einzahlungen' }, monthlyContribution * roundedMonths, 'currency'),
        ],
      }
    },
  },
  {
    slug: 'break-even-point',
    category: 'business',
    fields: breakEvenFields,
    localized: {
      en: copy('en', 'breakEven', {
        title: 'Break-even Point Calculator',
        shortName: 'Break-even',
        headline: 'Find the unit volume needed for contribution margin to cover fixed costs.',
        description: 'Enter fixed costs, price and variable cost. The result shows required units and revenue.',
        formula: 'Break-even units = fixed costs / (price per unit - variable cost per unit)',
        example: 'Example: USD 12,000 fixed cost, USD 80 price and USD 32 variable cost.',
        interpretation: 'Use the unit count as the minimum sales target before profit starts.',
        freeScope: 'Break-even units, contribution margin and break-even revenue.',
        upgradeScope: 'Scenario library, exports, product mix widgets and API.',
      }),
      'pt-br': copy('pt-br', 'breakEven', {
        title: 'Calculadora de Ponto de Equilibrio',
        shortName: 'Equilibrio',
        headline: 'Encontre o volume necessario para a margem de contribuicao cobrir custos fixos.',
        description: 'Informe custos fixos, preco e custo variavel. O resultado mostra unidades e receita.',
        formula: 'Unidades de equilibrio = custos fixos / (preco por unidade - custo variavel por unidade)',
        example: 'Exemplo: BRL 60.000 de custo fixo, BRL 400 de preco e BRL 160 de custo variavel.',
        interpretation: 'Use as unidades como meta minima antes de comecar o lucro.',
        freeScope: 'Unidades de equilibrio, margem de contribuicao e receita.',
        upgradeScope: 'Biblioteca de cenarios, exportacoes, widgets e API.',
      }),
      es: copy('es', 'breakEven', {
        title: 'Calculadora de Punto de Equilibrio',
        shortName: 'Equilibrio',
        headline: 'Encuentra el volumen necesario para cubrir costos fijos con margen de contribucion.',
        description: 'Ingresa costos fijos, precio y costo variable. El resultado muestra unidades e ingresos.',
        formula: 'Unidades de equilibrio = costos fijos / (precio unitario - costo variable unitario)',
        example: 'Ejemplo: EUR 12.000 fijos, EUR 80 precio y EUR 32 costo variable.',
        interpretation: 'Usa las unidades como meta minima antes de generar ganancia.',
        freeScope: 'Unidades, margen de contribucion e ingresos de equilibrio.',
        upgradeScope: 'Escenarios, exportaciones, widgets de mix y API.',
      }),
      fr: copy('fr', 'breakEven', {
        title: 'Calculatrice de Seuil de Rentabilite',
        shortName: 'Seuil',
        headline: 'Trouvez le volume necessaire pour couvrir les couts fixes.',
        description: 'Saisissez couts fixes, prix et cout variable. Le resultat montre unites et revenus.',
        formula: 'Unites au seuil = couts fixes / (prix unitaire - cout variable unitaire)',
        example: 'Exemple: 12 000 EUR fixes, 80 EUR de prix et 32 EUR de cout variable.',
        interpretation: 'Utilisez ce volume comme objectif minimum avant profit.',
        freeScope: 'Unites, marge de contribution et revenus au seuil.',
        upgradeScope: 'Scenarios, exports, widgets de mix et API.',
      }),
      de: copy('de', 'breakEven', {
        title: 'Break-even-Rechner',
        shortName: 'Break-even',
        headline: 'Findet das Absatzvolumen, bei dem Deckungsbeitrag Fixkosten deckt.',
        description: 'Geben Sie Fixkosten, Preis und variable Kosten ein. Ergebnis zeigt Einheiten und Umsatz.',
        formula: 'Break-even-Einheiten = Fixkosten / (Preis pro Einheit - variable Kosten pro Einheit)',
        example: 'Beispiel: 12.000 EUR Fixkosten, 80 EUR Preis, 32 EUR variable Kosten.',
        interpretation: 'Nutzen Sie die Einheiten als Mindestziel vor Gewinn.',
        freeScope: 'Break-even-Einheiten, Deckungsbeitrag und Umsatz.',
        upgradeScope: 'Szenarien, Exporte, Produktmix-Widgets und API.',
      }),
    },
    calculate(inputs) {
      const fixedCosts = inputs.fixedCosts
      const pricePerUnit = inputs.pricePerUnit
      const variableCostPerUnit = inputs.variableCostPerUnit

      if (!isPositive(fixedCosts, pricePerUnit) || variableCostPerUnit < 0) {
        return { ok: false, error: positiveNumberError }
      }

      const contributionMargin = pricePerUnit - variableCostPerUnit
      if (contributionMargin <= 0) {
        return { ok: false, error: contributionError }
      }

      const units = fixedCosts / contributionMargin

      return {
        ok: true,
        metrics: [
          metric('break_even_units', { en: 'Break-even units', 'pt-br': 'Unidades de equilibrio', es: 'Unidades de equilibrio', fr: 'Unites au seuil', de: 'Break-even-Einheiten' }, units, 'number'),
          metric('contribution_margin', { en: 'Contribution margin', 'pt-br': 'Margem de contribuicao', es: 'Margen de contribucion', fr: 'Marge de contribution', de: 'Deckungsbeitrag' }, contributionMargin, 'currency'),
          metric('break_even_revenue', { en: 'Break-even revenue', 'pt-br': 'Receita de equilibrio', es: 'Ingresos de equilibrio', fr: 'Revenus au seuil', de: 'Break-even-Umsatz' }, units * pricePerUnit, 'currency'),
        ],
      }
    },
  },
  {
    slug: 'gross-margin',
    category: 'business',
    fields: marginFields,
    localized: {
      en: copy('en', 'margin', {
        title: 'Gross Margin Calculator',
        shortName: 'Gross margin',
        headline: 'Calculate gross profit, gross margin and markup from revenue and direct cost.',
        description: 'Enter revenue and cost of goods sold to compare pricing and cost structure.',
        formula: 'Gross margin = (revenue - cost) / revenue',
        example: 'Example: USD 50,000 revenue and USD 28,500 cost.',
        interpretation: 'Higher margin leaves more room for operating expenses and profit.',
        freeScope: 'Gross profit, gross margin, markup and formula.',
        upgradeScope: 'Saved period comparisons, exports, dashboards and API.',
      }),
      'pt-br': copy('pt-br', 'margin', {
        title: 'Calculadora de Margem Bruta',
        shortName: 'Margem bruta',
        headline: 'Calcule lucro bruto, margem e markup a partir de receita e custo direto.',
        description: 'Informe receita e custo dos produtos vendidos para comparar preco e estrutura de custo.',
        formula: 'Margem bruta = (receita - custo) / receita',
        example: 'Exemplo: BRL 250.000 de receita e BRL 142.500 de custo.',
        interpretation: 'Margem maior deixa mais espaco para despesas operacionais e lucro.',
        freeScope: 'Lucro bruto, margem, markup e formula.',
        upgradeScope: 'Comparacoes salvas, exportacoes, dashboards e API.',
      }),
      es: copy('es', 'margin', {
        title: 'Calculadora de Margen Bruto',
        shortName: 'Margen bruto',
        headline: 'Calcula ganancia bruta, margen y markup desde ingresos y costo directo.',
        description: 'Ingresa ingresos y costo de ventas para comparar precio y estructura de costo.',
        formula: 'Margen bruto = (ingresos - costo) / ingresos',
        example: 'Ejemplo: EUR 50.000 de ingresos y EUR 28.500 de costo.',
        interpretation: 'Mayor margen deja mas espacio para gastos operativos y ganancia.',
        freeScope: 'Ganancia bruta, margen, markup y formula.',
        upgradeScope: 'Comparaciones guardadas, exportes, dashboards y API.',
      }),
      fr: copy('fr', 'margin', {
        title: 'Calculatrice de Marge Brute',
        shortName: 'Marge brute',
        headline: 'Calcule profit brut, marge et markup depuis revenus et cout direct.',
        description: 'Saisissez revenus et cout des ventes pour comparer prix et structure de cout.',
        formula: 'Marge brute = (revenus - cout) / revenus',
        example: 'Exemple: 50 000 EUR de revenus et 28 500 EUR de cout.',
        interpretation: 'Une marge plus elevee laisse plus de place aux frais et au profit.',
        freeScope: 'Profit brut, marge, markup et formule.',
        upgradeScope: 'Comparaisons sauvegardees, exports, tableaux de bord et API.',
      }),
      de: copy('de', 'margin', {
        title: 'Bruttomargenrechner',
        shortName: 'Bruttomarge',
        headline: 'Berechnet Bruttogewinn, Marge und Markup aus Umsatz und direkten Kosten.',
        description: 'Geben Sie Umsatz und Warenkosten ein, um Preis und Kostenstruktur zu vergleichen.',
        formula: 'Bruttomarge = (Umsatz - Kosten) / Umsatz',
        example: 'Beispiel: 50.000 EUR Umsatz und 28.500 EUR Kosten.',
        interpretation: 'Hoehere Marge laesst mehr Raum fuer Betriebskosten und Gewinn.',
        freeScope: 'Bruttogewinn, Marge, Markup und Formel.',
        upgradeScope: 'Gespeicherte Vergleiche, Exporte, Dashboards und API.',
      }),
    },
    calculate(inputs) {
      const revenue = inputs.revenue
      const cost = inputs.cost

      if (!isPositive(revenue) || cost < 0) {
        return { ok: false, error: positiveNumberError }
      }

      const grossProfit = revenue - cost
      const grossMargin = grossProfit / revenue
      const markup = cost === 0 ? 0 : grossProfit / cost

      return {
        ok: true,
        metrics: [
          metric('gross_profit', { en: 'Gross profit', 'pt-br': 'Lucro bruto', es: 'Ganancia bruta', fr: 'Profit brut', de: 'Bruttogewinn' }, grossProfit, 'currency'),
          metric('gross_margin', { en: 'Gross margin', 'pt-br': 'Margem bruta', es: 'Margen bruto', fr: 'Marge brute', de: 'Bruttomarge' }, grossMargin, 'percent'),
          metric('markup', { en: 'Markup', 'pt-br': 'Markup', es: 'Markup', fr: 'Markup', de: 'Markup' }, markup, 'percent'),
        ],
      }
    },
  },
  {
    slug: 'cash-runway',
    category: 'business',
    fields: cashRunwayFields,
    localized: {
      en: copy('en', 'cashRunway', {
        title: 'Cash Runway Calculator',
        shortName: 'Cash runway',
        headline: 'Estimate how many months current cash covers net burn before the balance becomes constrained.',
        description: 'Enter cash on hand, monthly operating cost and monthly revenue to estimate runway.',
        formula: 'Runway months = cash on hand / (monthly operating cost - monthly revenue)',
        example: 'Example: USD 60,000 cash, USD 18,000 cost and USD 6,000 monthly revenue.',
        interpretation: 'Use runway as a planning window for revenue, cost, pricing or financing decisions.',
        freeScope: 'Runway months, net monthly burn, 90-day reserve and formula.',
        upgradeScope: 'Saved runway scenarios, board exports, alerts, team review and API.',
      }),
      'pt-br': copy('pt-br', 'cashRunway', {
        title: 'Calculadora de Runway de Caixa',
        shortName: 'Runway de caixa',
        headline: 'Estime quantos meses o caixa atual cobre a queima liquida antes de restricao.',
        description: 'Informe caixa disponivel, custo operacional mensal e receita mensal para estimar runway.',
        formula: 'Meses de runway = caixa disponivel / (custo operacional mensal - receita mensal)',
        example: 'Exemplo: BRL 300.000 de caixa, BRL 90.000 de custo e BRL 30.000 de receita mensal.',
        interpretation: 'Use runway como janela para decisoes de receita, custo, preco ou financiamento.',
        freeScope: 'Meses de runway, queima mensal liquida, reserva de 90 dias e formula.',
        upgradeScope: 'Cenarios salvos, exports para conselho, alertas, revisao em equipe e API.',
      }),
      es: copy('es', 'cashRunway', {
        title: 'Calculadora de Runway de Caja',
        shortName: 'Runway de caja',
        headline: 'Estima cuantos meses el efectivo actual cubre la quema neta antes de restriccion.',
        description: 'Ingresa efectivo disponible, costo operativo mensual e ingresos mensuales para estimar runway.',
        formula: 'Meses de runway = efectivo / (costo operativo mensual - ingresos mensuales)',
        example: 'Ejemplo: EUR 60.000 de efectivo, EUR 18.000 de costo y EUR 6.000 de ingresos mensuales.',
        interpretation: 'Usa runway como ventana para ingresos, costos, precios o financiacion.',
        freeScope: 'Meses de runway, quema neta mensual, reserva de 90 dias y formula.',
        upgradeScope: 'Escenarios guardados, exports para directorio, alertas, revision de equipo y API.',
      }),
      fr: copy('fr', 'cashRunway', {
        title: 'Calculatrice de Runway de Tresorerie',
        shortName: 'Runway cash',
        headline: 'Estime combien de mois la tresorerie couvre le burn net avant contrainte de solde.',
        description: 'Saisissez tresorerie, cout operationnel mensuel et revenus mensuels pour estimer le runway.',
        formula: 'Mois de runway = tresorerie / (cout operationnel mensuel - revenus mensuels)',
        example: 'Exemple: 60 000 EUR de tresorerie, 18 000 EUR de couts et 6 000 EUR de revenus mensuels.',
        interpretation: 'Utilisez le runway comme fenetre pour revenus, couts, prix ou financement.',
        freeScope: 'Mois de runway, burn net mensuel, reserve de 90 jours et formule.',
        upgradeScope: 'Scenarios sauvegardes, exports conseil, alertes, revue equipe et API.',
      }),
      de: copy('de', 'cashRunway', {
        title: 'Cash-Runway-Rechner',
        shortName: 'Cash runway',
        headline: 'Schaetzt, wie viele Monate aktuelles Bargeld den Netto-Burn bis zu Cash-Druck deckt.',
        description: 'Geben Sie Bargeld, monatliche Betriebskosten und monatlichen Umsatz fuer die Runway ein.',
        formula: 'Runway-Monate = Bargeld / (monatliche Betriebskosten - monatlicher Umsatz)',
        example: 'Beispiel: 60.000 EUR Bargeld, 18.000 EUR Kosten und 6.000 EUR Monatsumsatz.',
        interpretation: 'Nutzen Sie Runway als Planungsfenster fuer Umsatz, Kosten, Preise oder Finanzierung.',
        freeScope: 'Runway-Monate, monatlicher Netto-Burn, 90-Tage-Reserve und Formel.',
        upgradeScope: 'Gespeicherte Szenarien, Board-Exporte, Alerts, Teampruefung und API.',
      }),
    },
    calculate(inputs) {
      const cashBalance = inputs.cashBalance
      const monthlyOperatingCost = inputs.monthlyOperatingCost
      const monthlyRevenue = inputs.monthlyRevenue

      if (!isPositive(cashBalance, monthlyOperatingCost) || monthlyRevenue < 0) {
        return { ok: false, error: positiveNumberError }
      }

      const netBurn = monthlyOperatingCost - monthlyRevenue
      if (netBurn <= 0) {
        return { ok: false, error: runwayBurnError }
      }

      return {
        ok: true,
        metrics: [
          metric('runway_months', { en: 'Runway months', 'pt-br': 'Meses de runway', es: 'Meses de runway', fr: 'Mois de runway', de: 'Runway-Monate' }, cashBalance / netBurn, 'number'),
          metric('net_monthly_burn', { en: 'Net monthly burn', 'pt-br': 'Queima mensal liquida', es: 'Quema neta mensual', fr: 'Burn net mensuel', de: 'Monatlicher Netto-Burn' }, netBurn, 'currency'),
          metric('ninety_day_reserve', { en: '90-day reserve', 'pt-br': 'Reserva de 90 dias', es: 'Reserva de 90 dias', fr: 'Reserve de 90 jours', de: '90-Tage-Reserve' }, netBurn * 3, 'currency'),
        ],
      }
    },
  },
  {
    slug: 'discount-price',
    category: 'business',
    fields: discountPriceFields,
    localized: {
      en: copy('en', 'discountPrice', {
        title: 'Discount Price Calculator',
        shortName: 'Discount price',
        headline: 'Calculate final unit price, order total and savings after a discount and added unit fee.',
        description: 'Enter list price, discount rate, added fee and quantity to compare the real offer total.',
        formula: 'Final unit price = list price x (1 - discount rate) + added fee',
        example: 'Example: USD 120 list price, 15% discount, no fee and quantity 1.',
        interpretation: 'Use final unit price and order total instead of discount percentage alone.',
        freeScope: 'Final unit price, total order cost, discount savings and formula.',
        upgradeScope: 'Saved deal comparisons, procurement exports, team approvals and API.',
      }),
      'pt-br': copy('pt-br', 'discountPrice', {
        title: 'Calculadora de Preco com Desconto',
        shortName: 'Preco com desconto',
        headline: 'Calcule preco final por unidade, total do pedido e economia apos desconto e tarifa.',
        description: 'Informe preco de lista, desconto, tarifa e quantidade para comparar o total real.',
        formula: 'Preco final = preco de lista x (1 - desconto) + tarifa',
        example: 'Exemplo: BRL 600 de preco, 15% de desconto, sem tarifa e quantidade 1.',
        interpretation: 'Use preco final e total do pedido, nao apenas o percentual de desconto.',
        freeScope: 'Preco final unitario, custo total, economia de desconto e formula.',
        upgradeScope: 'Comparacoes salvas, exports de compras, aprovacoes em equipe e API.',
      }),
      es: copy('es', 'discountPrice', {
        title: 'Calculadora de Precio con Descuento',
        shortName: 'Precio con descuento',
        headline: 'Calcula precio final unitario, total del pedido y ahorro tras descuento y cargo.',
        description: 'Ingresa precio de lista, descuento, cargo y cantidad para comparar el total real.',
        formula: 'Precio final = precio de lista x (1 - descuento) + cargo',
        example: 'Ejemplo: EUR 120 de lista, 15% de descuento, sin cargo y cantidad 1.',
        interpretation: 'Usa precio final y total del pedido, no solo el porcentaje de descuento.',
        freeScope: 'Precio final unitario, costo total, ahorro por descuento y formula.',
        upgradeScope: 'Comparaciones guardadas, exports de compras, aprobaciones y API.',
      }),
      fr: copy('fr', 'discountPrice', {
        title: 'Calculatrice de Prix Remise',
        shortName: 'Prix remise',
        headline: 'Calcule prix final unitaire, total de commande et economie apres remise et frais.',
        description: 'Saisissez prix catalogue, remise, frais et quantite pour comparer le total reel.',
        formula: 'Prix final = prix catalogue x (1 - remise) + frais',
        example: 'Exemple: 120 EUR catalogue, 15% de remise, sans frais et quantite 1.',
        interpretation: 'Utilisez prix final et total, pas seulement le pourcentage de remise.',
        freeScope: 'Prix final unitaire, cout total, economie de remise et formule.',
        upgradeScope: 'Comparaisons sauvegardees, exports achats, validations equipe et API.',
      }),
      de: copy('de', 'discountPrice', {
        title: 'Rabattpreisrechner',
        shortName: 'Rabattpreis',
        headline: 'Berechnet finalen Stueckpreis, Bestellsumme und Ersparnis nach Rabatt und Gebuehr.',
        description: 'Geben Sie Listenpreis, Rabatt, Gebuehr und Menge ein, um das echte Angebot zu vergleichen.',
        formula: 'Finaler Stueckpreis = Listenpreis x (1 - Rabatt) + Gebuehr',
        example: 'Beispiel: 120 EUR Listenpreis, 15% Rabatt, keine Gebuehr und Menge 1.',
        interpretation: 'Nutzen Sie finalen Preis und Bestellsumme, nicht nur den Rabattprozentsatz.',
        freeScope: 'Finaler Stueckpreis, Bestellsumme, Rabattersparnis und Formel.',
        upgradeScope: 'Gespeicherte Angebotsvergleiche, Einkaufsexporte, Teamfreigaben und API.',
      }),
    },
    calculate(inputs) {
      const listPrice = inputs.listPrice
      const discountRate = inputs.discountRate
      const addedFee = inputs.addedFee
      const quantity = inputs.quantity

      if (!isPositive(listPrice, quantity) || discountRate < 0 || addedFee < 0) {
        return { ok: false, error: positiveNumberError }
      }

      const boundedDiscount = Math.min(discountRate, 100)
      const discountedUnit = listPrice * (1 - (boundedDiscount / 100))
      const finalUnitPrice = discountedUnit + addedFee
      const discountSaved = (listPrice - discountedUnit) * quantity

      return {
        ok: true,
        metrics: [
          metric('final_unit_price', { en: 'Final unit price', 'pt-br': 'Preco final unitario', es: 'Precio final unitario', fr: 'Prix final unitaire', de: 'Finaler Stueckpreis' }, finalUnitPrice, 'currency'),
          metric('total_price', { en: 'Order total', 'pt-br': 'Total do pedido', es: 'Total del pedido', fr: 'Total commande', de: 'Bestellsumme' }, finalUnitPrice * quantity, 'currency'),
          metric('discount_saved', { en: 'Discount savings', 'pt-br': 'Economia do desconto', es: 'Ahorro por descuento', fr: 'Economie de remise', de: 'Rabattersparnis' }, discountSaved, 'currency'),
        ],
      }
    },
  },
  {
    slug: 'roi',
    category: 'finance',
    fields: roiFields,
    localized: {
      en: copy('en', 'roi', {
        title: 'ROI Calculator',
        shortName: 'ROI',
        headline: 'Calculate net return and return on investment with a transparent formula.',
        description: 'Enter return value and investment cost. The result is local to the browser.',
        formula: 'ROI = (return value - investment cost) / investment cost',
        example: 'Example: USD 18,000 return from USD 12,000 invested.',
        interpretation: 'ROI is one signal. Compare it with risk, time horizon and alternatives.',
        freeScope: 'Net return, ROI percentage and formula.',
        upgradeScope: 'Saved scenarios, portfolio exports, widgets and API.',
      }),
      'pt-br': copy('pt-br', 'roi', {
        title: 'Calculadora de ROI',
        shortName: 'ROI',
        headline: 'Calcule retorno liquido e retorno sobre investimento com formula transparente.',
        description: 'Informe retorno e custo do investimento. O resultado fica local no navegador.',
        formula: 'ROI = (valor de retorno - custo do investimento) / custo do investimento',
        example: 'Exemplo: BRL 90.000 de retorno para BRL 60.000 investidos.',
        interpretation: 'ROI e um sinal. Compare com risco, prazo e alternativas.',
        freeScope: 'Retorno liquido, percentual de ROI e formula.',
        upgradeScope: 'Cenarios salvos, exportacoes, widgets e API.',
      }),
      es: copy('es', 'roi', {
        title: 'Calculadora de ROI',
        shortName: 'ROI',
        headline: 'Calcula retorno neto y retorno sobre inversion con formula transparente.',
        description: 'Ingresa retorno y costo de inversion. El resultado queda local en el navegador.',
        formula: 'ROI = (valor de retorno - costo de inversion) / costo de inversion',
        example: 'Ejemplo: EUR 18.000 de retorno por EUR 12.000 invertidos.',
        interpretation: 'ROI es una senal. Comparalo con riesgo, plazo y alternativas.',
        freeScope: 'Retorno neto, porcentaje ROI y formula.',
        upgradeScope: 'Escenarios guardados, exportes, widgets y API.',
      }),
      fr: copy('fr', 'roi', {
        title: 'Calculatrice ROI',
        shortName: 'ROI',
        headline: 'Calcule retour net et retour sur investissement avec formule transparente.',
        description: 'Saisissez retour et cout d investissement. Le resultat reste local au navigateur.',
        formula: 'ROI = (valeur de retour - cout d investissement) / cout d investissement',
        example: 'Exemple: 18 000 EUR de retour pour 12 000 EUR investis.',
        interpretation: 'Le ROI est un signal. Comparez-le au risque, a la duree et aux alternatives.',
        freeScope: 'Retour net, pourcentage ROI et formule.',
        upgradeScope: 'Scenarios sauvegardes, exports, widgets et API.',
      }),
      de: copy('de', 'roi', {
        title: 'ROI-Rechner',
        shortName: 'ROI',
        headline: 'Berechnet Nettoertrag und Return on Investment mit transparenter Formel.',
        description: 'Geben Sie Rueckfluss und Investitionskosten ein. Das Ergebnis bleibt im Browser.',
        formula: 'ROI = (Rueckfluss - Investitionskosten) / Investitionskosten',
        example: 'Beispiel: 18.000 EUR Rueckfluss aus 12.000 EUR Investition.',
        interpretation: 'ROI ist ein Signal. Vergleichen Sie Risiko, Zeitraum und Alternativen.',
        freeScope: 'Nettoertrag, ROI-Prozent und Formel.',
        upgradeScope: 'Gespeicherte Szenarien, Exporte, Widgets und API.',
      }),
    },
    calculate(inputs) {
      const returnValue = inputs.returnValue
      const investmentCost = inputs.investmentCost

      if (returnValue < 0 || !isPositive(investmentCost)) {
        return { ok: false, error: positiveNumberError }
      }

      const netReturn = returnValue - investmentCost
      const roi = netReturn / investmentCost

      return {
        ok: true,
        metrics: [
          metric('net_return', { en: 'Net return', 'pt-br': 'Retorno liquido', es: 'Retorno neto', fr: 'Retour net', de: 'Nettoertrag' }, netReturn, 'currency'),
          metric('roi', { en: 'ROI', 'pt-br': 'ROI', es: 'ROI', fr: 'ROI', de: 'ROI' }, roi, 'percent'),
          metric('return_value', { en: 'Return value', 'pt-br': 'Valor de retorno', es: 'Valor de retorno', fr: 'Valeur de retour', de: 'Rueckfluss' }, returnValue, 'currency'),
        ],
      }
    },
  },
]

const calculatorBySlug = new Map(calculatorCatalog.map((calculator) => [calculator.slug, calculator]))

export function getCalculatorBySlug(slug: string | undefined): CalculatorDefinition | null {
  if (!calculatorSlugs.includes(slug as CalculatorSlug)) {
    return null
  }

  return calculatorBySlug.get(slug as CalculatorSlug) ?? null
}

export function getCalculatorCopy(calculator: CalculatorDefinition, locale: LocaleCode): CalculatorCopy {
  return sanitizePublicCopy(locale, calculator.localized[locale])
}

export function getCategoryLabel(category: CalculatorCategory, locale: LocaleCode): string {
  const labels: Record<CalculatorCategory, Record<LocaleCode, string>> = {
    finance: {
      en: 'Finance',
      'pt-br': 'Financas',
      es: 'Finanzas',
      fr: 'Finance',
      de: 'Finanzen',
    },
    business: {
      en: 'Business',
      'pt-br': 'Negocios',
      es: 'Negocios',
      fr: 'Entreprise',
      de: 'Business',
    },
  }

  return labels[category][locale]
}

export function filterCalculators(query: string, category: CalculatorCategory | 'all', locale: LocaleCode): CalculatorDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return calculatorCatalog.filter((calculator) => {
    const copy = getCalculatorCopy(calculator, locale)
    const matchesCategory = category === 'all' || calculator.category === category
    const searchableText = [
      calculator.slug,
      copy.title,
      copy.shortName,
      copy.headline,
      copy.description,
      copy.formula,
      copy.freeScope,
      copy.upgradeScope,
    ].join(' ').toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}

export function createCalculatorStructuredData(calculator: CalculatorDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getCalculatorCopy(calculator, locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.title,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      url,
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: getDefaultCurrency(locale),
      },
      description: copy.headline,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]
}
