import { formatCurrency, formatNumber, type LocaleCode } from './locales'

export const calculatorSlugs = [
  'loan-payment',
  'break-even-point',
  'gross-margin',
  'roi',
] as const

export type CalculatorSlug = (typeof calculatorSlugs)[number]
export type CalculatorCategory = 'finance' | 'business'
export type MetricFormat = 'currency' | 'number' | 'percent'

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
  defaultValue: number
  min: number
  step: number
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

function isPositive(...values: number[]): boolean {
  return values.every((value) => Number.isFinite(value) && value > 0)
}

function field(
  key: string,
  label: LocalizedText,
  help: LocalizedText,
  defaultValue: number,
  options: { min?: number; step?: number; prefix?: string; suffix?: string } = {},
): CalculatorField {
  return {
    key,
    label,
    help,
    defaultValue,
    min: options.min ?? 0,
    step: options.step ?? 1,
    prefix: options.prefix,
    suffix: options.suffix,
  }
}

function metric(key: string, label: LocalizedText, value: number, format: MetricFormat): CalculationMetric {
  return { key, label, value, format }
}

function money(value: number, locale: LocaleCode): string {
  return formatCurrency(value, locale, 'USD', { maximumFractionDigits: 2 })
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

function standardSections(locale: LocaleCode, kind: 'loan' | 'breakEven' | 'margin' | 'roi'): ContentSection[] {
  const sections = {
    en: {
      loan: [
        ['What it calculates', 'The loan payment calculator estimates the fixed monthly payment, total paid and interest cost from principal, annual rate and term.'],
        ['Formula', 'It uses the amortization formula M = P x r x (1 + r)^n / ((1 + r)^n - 1), where r is the monthly rate and n is the number of payments.'],
        ['How to interpret it', 'Compare the monthly payment with available cash flow, then compare total interest across terms before choosing a loan.'],
        ['Common mistakes', 'Do not compare only the monthly payment. A longer term can look affordable while increasing total interest materially.'],
        ['Limits', 'The result excludes taxes, fees, insurance, prepayment rules and variable-rate changes unless you add those costs to the inputs.'],
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
      { question: 'Are values stored?', answer: 'No. Sprint 3.1 calculates in the browser and does not store calculator inputs or results.' },
      { question: 'Can I use this for final financial decisions?', answer: 'Use the result as a planning signal. Confirm legal, tax, credit and accounting decisions with a qualified professional.' },
    ],
    'pt-br': [
      { question: 'Os valores sao armazenados?', answer: 'Nao. A Sprint 3.1 calcula no navegador e nao armazena entradas ou resultados.' },
      { question: 'Posso usar para decisao financeira final?', answer: 'Use como sinal de planejamento. Confirme decisoes juridicas, fiscais, de credito e contabeis com profissional qualificado.' },
    ],
    es: [
      { question: 'Se almacenan los valores?', answer: 'No. Sprint 3.1 calcula en el navegador y no guarda entradas ni resultados.' },
      { question: 'Sirve para decisiones financieras finales?', answer: 'Usalo como senal de planificacion. Confirma decisiones legales, fiscales, de credito y contables con un profesional.' },
    ],
    fr: [
      { question: 'Les valeurs sont-elles stockees?', answer: 'Non. Sprint 3.1 calcule dans le navigateur et ne stocke ni entrees ni resultats.' },
      { question: 'Puis-je l utiliser pour une decision finale?', answer: 'Utilisez-le comme signal de planification. Confirmez fiscal, juridique, credit et comptabilite avec un professionnel.' },
    ],
    de: [
      { question: 'Werden Werte gespeichert?', answer: 'Nein. Sprint 3.1 rechnet im Browser und speichert keine Eingaben oder Ergebnisse.' },
      { question: 'Eignet es sich fuer endgueltige Finanzentscheidungen?', answer: 'Nutzen Sie es als Planungssignal. Recht, Steuern, Kredit und Buchhaltung sollten Fachleute bestaetigen.' },
    ],
  }

  return entries[locale]
}

function copy(
  locale: LocaleCode,
  kind: 'loan' | 'breakEven' | 'margin' | 'roi',
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
    25000,
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

const breakEvenFields = [
  field(
    'fixedCosts',
    { en: 'Fixed costs', 'pt-br': 'Custos fixos', es: 'Costos fijos', fr: 'Couts fixes', de: 'Fixkosten' },
    { en: 'Costs for the same period.', 'pt-br': 'Custos do mesmo periodo.', es: 'Costos del mismo periodo.', fr: 'Couts de la meme periode.', de: 'Kosten derselben Periode.' },
    12000,
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'pricePerUnit',
    { en: 'Price per unit', 'pt-br': 'Preco por unidade', es: 'Precio unitario', fr: 'Prix unitaire', de: 'Preis pro Einheit' },
    { en: 'Average selling price.', 'pt-br': 'Preco medio de venda.', es: 'Precio promedio de venta.', fr: 'Prix de vente moyen.', de: 'Durchschnittlicher Verkaufspreis.' },
    80,
    { min: 1, step: 1, prefix: '$' },
  ),
  field(
    'variableCostPerUnit',
    { en: 'Variable cost per unit', 'pt-br': 'Custo variavel por unidade', es: 'Costo variable unitario', fr: 'Cout variable unitaire', de: 'Variable Kosten pro Einheit' },
    { en: 'Cost that moves with each unit.', 'pt-br': 'Custo que acompanha cada unidade.', es: 'Costo que cambia por unidad.', fr: 'Cout qui varie par unite.', de: 'Kosten je verkaufter Einheit.' },
    32,
    { min: 0, step: 1, prefix: '$' },
  ),
]

const marginFields = [
  field(
    'revenue',
    { en: 'Revenue', 'pt-br': 'Receita', es: 'Ingresos', fr: 'Revenus', de: 'Umsatz' },
    { en: 'Sales before subtracting cost.', 'pt-br': 'Vendas antes do custo.', es: 'Ventas antes del costo.', fr: 'Ventes avant cout.', de: 'Umsatz vor Kosten.' },
    50000,
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'cost',
    { en: 'Cost of goods sold', 'pt-br': 'Custo dos produtos vendidos', es: 'Costo de ventas', fr: 'Cout des ventes', de: 'Warenkosten' },
    { en: 'Direct cost tied to the revenue.', 'pt-br': 'Custo direto ligado a receita.', es: 'Costo directo ligado a ingresos.', fr: 'Cout direct lie aux revenus.', de: 'Direkte Kosten zum Umsatz.' },
    28500,
    { min: 0, step: 100, prefix: '$' },
  ),
]

const roiFields = [
  field(
    'returnValue',
    { en: 'Return value', 'pt-br': 'Valor de retorno', es: 'Valor de retorno', fr: 'Valeur de retour', de: 'Rueckfluss' },
    { en: 'Money or value received.', 'pt-br': 'Dinheiro ou valor recebido.', es: 'Dinero o valor recibido.', fr: 'Argent ou valeur recue.', de: 'Erhaltener Wert.' },
    18000,
    { min: 0, step: 100, prefix: '$' },
  ),
  field(
    'investmentCost',
    { en: 'Investment cost', 'pt-br': 'Custo do investimento', es: 'Costo de inversion', fr: 'Cout d investissement', de: 'Investitionskosten' },
    { en: 'Total cost to make the investment.', 'pt-br': 'Custo total para investir.', es: 'Costo total de la inversion.', fr: 'Cout total de l investissement.', de: 'Gesamtkosten der Investition.' },
    12000,
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
        example: 'Exemplo: USD 25.000 a 8,5% por 5 anos.',
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
        example: 'Ejemplo: USD 25.000 al 8,5% por 5 anos.',
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
        example: 'Exemple: 25 000 USD a 8,5% sur 5 ans.',
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
        example: 'Beispiel: 25.000 USD zu 8,5% fuer 5 Jahre.',
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
        example: 'Exemplo: USD 12.000 de custo fixo, USD 80 de preco e USD 32 de custo variavel.',
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
        example: 'Ejemplo: USD 12.000 fijos, USD 80 precio y USD 32 costo variable.',
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
        example: 'Exemple: 12 000 USD fixes, 80 USD de prix et 32 USD de cout variable.',
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
        example: 'Beispiel: 12.000 USD Fixkosten, 80 USD Preis, 32 USD variable Kosten.',
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
        example: 'Exemplo: USD 50.000 de receita e USD 28.500 de custo.',
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
        example: 'Ejemplo: USD 50.000 de ingresos y USD 28.500 de costo.',
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
        example: 'Exemple: 50 000 USD de revenus et 28 500 USD de cout.',
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
        example: 'Beispiel: 50.000 USD Umsatz und 28.500 USD Kosten.',
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
        example: 'Exemplo: USD 18.000 de retorno para USD 12.000 investidos.',
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
        example: 'Ejemplo: USD 18.000 de retorno por USD 12.000 invertidos.',
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
        example: 'Exemple: 18 000 USD de retour pour 12 000 USD investis.',
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
        example: 'Beispiel: 18.000 USD Rueckfluss aus 12.000 USD Investition.',
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
  return calculator.localized[locale]
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
        priceCurrency: 'USD',
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
