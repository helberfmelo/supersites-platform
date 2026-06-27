import type { LocaleCode } from './locales'
import { publicLocaleCodes } from './locales'

export const invoiceCraftToolSlugs = [
  'invoice-builder',
  'quote-builder',
  'receipt-builder',
] as const

export type InvoiceCraftToolSlug = (typeof invoiceCraftToolSlugs)[number]
export type InvoiceCraftToolCategory = 'invoice' | 'quote' | 'receipt'
export type InvoiceCraftToolMode = 'clean' | 'compact' | 'service'
export type InvoiceCraftDocumentKind = 'invoice' | 'quote' | 'receipt'

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface InvoiceCraftToolCopy {
  title: string
  shortName: string
  headline: string
  description: string
  resultLabel: string
  freeScope: string
  upgradeScope: string
  reviewedLabel: string
  contentSections: ContentSection[]
  faq: FaqItem[]
}

export interface InvoiceCraftToolOption {
  value: InvoiceCraftToolMode
  label: string
}

export interface InvoiceCraftDocumentInput {
  issuerName: string
  issuerDetails: string
  clientName: string
  clientDetails: string
  documentNumber: string
  issueDate: string
  dueDate: string
  currency: string
  terms: string
  itemsRaw: string
  discountAmount: string
  adjustmentLabel: string
  adjustmentAmount: string
  notes: string
}

export interface InvoiceCraftToolDefinition {
  slug: InvoiceCraftToolSlug
  kind: InvoiceCraftDocumentKind
  category: InvoiceCraftToolCategory
  modes: InvoiceCraftToolOption[]
  sample: InvoiceCraftDocumentInput
  localized: Record<LocaleCode, InvoiceCraftToolCopy>
}

export interface InvoiceCraftRelatedTool {
  slug: InvoiceCraftToolSlug
  title: string
  description: string
}

export interface ResultMeta {
  label: string
  value: string
}

export interface InvoiceCraftDocumentLineItem {
  description: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface InvoiceCraftDocumentSummary {
  kind: InvoiceCraftDocumentKind
  title: string
  mode: InvoiceCraftToolMode
  issuerName: string
  issuerDetails: string
  clientName: string
  clientDetails: string
  documentNumber: string
  issueDate: string
  dueDate: string
  dueDateLabel: string
  currency: string
  terms: string
  items: InvoiceCraftDocumentLineItem[]
  subtotal: number
  discountAmount: number
  adjustmentLabel: string
  adjustmentAmount: number
  total: number
  notes: string
  localOnlyNote: string
  taxGateNote: string
}

export interface InvoiceCraftToolResult {
  ok: boolean
  output: string
  meta: ResultMeta[]
  document?: InvoiceCraftDocumentSummary
  error?: string
}

interface InvoiceCraftToolSpec {
  slug: InvoiceCraftToolSlug
  kind: InvoiceCraftDocumentKind
  category: InvoiceCraftToolCategory
  title: string
  shortName: string
  headline: string
  description: string
  freeScope: string
  upgradeScope: string
  useCase: string
  bestPractice: string
  sample: InvoiceCraftDocumentInput
}

const reviewed: Record<LocaleCode, string> = {
  en: 'Reviewed June 27, 2026',
  'pt-br': 'Revisado em 27 de junho de 2026',
  es: 'Revisado el 27 de junio de 2026',
  fr: 'Revise le 27 juin 2026',
  de: 'Geprueft am 27. Juni 2026',
}

const modes: InvoiceCraftToolOption[] = [
  { value: 'clean', label: 'Clean document' },
  { value: 'compact', label: 'Compact receipt-style' },
  { value: 'service', label: 'Service business' },
]

const localizedBasics: Record<LocaleCode, {
  resultLabel: string
  localSection: string
  localBody: string
  pdfSection: string
  pdfBody: string
  bestPracticeSection: string
  gateSection: string
  gateBody: string
  faqStorage: FaqItem
  faqTax: FaqItem
}> = {
  en: {
    resultLabel: 'Document preview',
    localSection: 'Local document data',
    localBody: 'InvoiceCraft keeps issuer, client, item and amount data in the browser session and never sends document fields to analytics.',
    pdfSection: 'PDF rendering',
    pdfBody: 'The free builder renders a browser preview and downloads a PDF locally, which solves the basic need without mandatory signup.',
    bestPracticeSection: 'Document best practices',
    gateSection: 'Tax and payment limits',
    gateBody: 'Tax labels, fiscal numbering, payment collection, recurring invoices, saved clients and team workspaces remain gated until human legal and billing review.',
    faqStorage: { question: 'Are clients, products or invoices stored?', answer: 'No. InvoiceCraft does not create accounts, call a product API, use browser storage or save document fields.' },
    faqTax: { question: 'Can this create official tax invoices?', answer: 'No. Manual tax or adjustment lines are formatting helpers only; jurisdiction-specific taxes require HUMAN_ACTION_REQUIRED before activation.' },
  },
  'pt-br': {
    resultLabel: 'Preview do documento',
    localSection: 'Dados locais do documento',
    localBody: 'O InvoiceCraft mantem emissor, cliente, itens e valores na sessao do navegador e nunca envia campos do documento para analytics.',
    pdfSection: 'Renderizacao PDF',
    pdfBody: 'O builder gratuito mostra preview no navegador e baixa um PDF local, resolvendo a necessidade basica sem cadastro obrigatorio.',
    bestPracticeSection: 'Boas praticas do documento',
    gateSection: 'Limites fiscais e pagamentos',
    gateBody: 'Impostos, numeracao fiscal, cobranca, recorrencia, clientes salvos e equipe seguem bloqueados ate revisao humana juridica e de billing.',
    faqStorage: { question: 'Clientes, produtos ou faturas sao armazenados?', answer: 'Nao. O InvoiceCraft nao cria conta, nao chama API de produto, nao usa storage do navegador e nao salva campos.' },
    faqTax: { question: 'Isto cria nota fiscal oficial?', answer: 'Nao. Linhas manuais de imposto ou ajuste sao apenas formatacao; impostos por jurisdicao exigem HUMAN_ACTION_REQUIRED antes de ativar.' },
  },
  es: {
    resultLabel: 'Vista previa',
    localSection: 'Datos locales',
    localBody: 'InvoiceCraft mantiene emisor, cliente, items e importes en la sesion del navegador y no envia campos del documento a analytics.',
    pdfSection: 'PDF local',
    pdfBody: 'El builder gratis muestra una vista previa y descarga un PDF local para resolver la necesidad basica sin registro obligatorio.',
    bestPracticeSection: 'Buenas practicas del documento',
    gateSection: 'Limites fiscales y pagos',
    gateBody: 'Impuestos, numeracion fiscal, cobros, recurrencia, clientes guardados y equipos quedan bloqueados hasta revision legal y de billing.',
    faqStorage: { question: 'Se guardan clientes, productos o facturas?', answer: 'No. InvoiceCraft no crea cuentas, no llama APIs de producto, no usa storage del navegador y no guarda campos.' },
    faqTax: { question: 'Sirve como factura fiscal oficial?', answer: 'No. Lineas manuales de impuesto o ajuste son solo ayuda de formato; impuestos por jurisdiccion requieren HUMAN_ACTION_REQUIRED.' },
  },
  fr: {
    resultLabel: 'Apercu document',
    localSection: 'Donnees locales',
    localBody: 'InvoiceCraft garde emetteur, client, lignes et montants dans la session navigateur et n envoie pas les champs a analytics.',
    pdfSection: 'PDF local',
    pdfBody: 'Le builder gratuit affiche un apercu et telecharge un PDF local pour couvrir le besoin de base sans compte obligatoire.',
    bestPracticeSection: 'Bonnes pratiques document',
    gateSection: 'Limites fiscales et paiement',
    gateBody: 'Taxes, numerotation fiscale, paiement, recurrence, clients sauvegardes et equipes restent gates avant revue humaine juridique et billing.',
    faqStorage: { question: 'Les clients, produits ou factures sont-ils stockes?', answer: 'Non. InvoiceCraft ne cree pas de compte, n appelle pas d API produit, n utilise pas de storage et ne sauvegarde pas les champs.' },
    faqTax: { question: 'Est-ce une facture fiscale officielle?', answer: 'Non. Les lignes manuelles de taxe ou ajustement sont seulement un format; les taxes par juridiction exigent HUMAN_ACTION_REQUIRED.' },
  },
  de: {
    resultLabel: 'Dokumentvorschau',
    localSection: 'Lokale Dokumentdaten',
    localBody: 'InvoiceCraft haelt Aussteller, Kunde, Positionen und Betraege in der Browser-Sitzung und sendet keine Felder an Analytics.',
    pdfSection: 'Lokales PDF',
    pdfBody: 'Der kostenlose Builder rendert eine Vorschau und laedt lokal ein PDF herunter, ohne Pflichtkonto.',
    bestPracticeSection: 'Dokument-Best-Practices',
    gateSection: 'Steuer- und Zahlungslimits',
    gateBody: 'Steuern, fiskalische Nummerierung, Zahlungen, Wiederholung, gespeicherte Kunden und Teams bleiben bis menschlicher Legal- und Billing-Pruefung gesperrt.',
    faqStorage: { question: 'Werden Kunden, Produkte oder Rechnungen gespeichert?', answer: 'Nein. InvoiceCraft erstellt kein Konto, ruft keine Produkt-API auf, nutzt kein Browser-Storage und speichert keine Felder.' },
    faqTax: { question: 'Ist das eine offizielle Steuerrechnung?', answer: 'Nein. Manuelle Steuer- oder Anpassungszeilen sind nur Formatierung; Steuerregeln pro Jurisdiktion brauchen HUMAN_ACTION_REQUIRED.' },
  },
}

const sampleBase: InvoiceCraftDocumentInput = {
  issuerName: 'Northstar Studio',
  issuerDetails: '245 Market Street\nSan Francisco, CA\nbilling@example.com',
  clientName: 'Acme Operations',
  clientDetails: '18 Harbor Road\nAustin, TX\nfinance@example.com',
  documentNumber: 'IC-2026-0042',
  issueDate: '2026-06-27',
  dueDate: '2026-07-12',
  currency: 'USD',
  terms: 'Due on receipt unless another written agreement applies.',
  itemsRaw: 'Workflow setup | 1 | 950\nTemplate cleanup | 3 | 125\nReview call | 2 | 90',
  discountAmount: '50',
  adjustmentLabel: 'Manual tax/adjustment',
  adjustmentAmount: '0',
  notes: 'Generated locally. Review legal, tax and payment details before operational use.',
}

const specs: InvoiceCraftToolSpec[] = [
  {
    slug: 'invoice-builder',
    kind: 'invoice',
    category: 'invoice',
    title: 'Invoice Builder',
    shortName: 'Invoice',
    headline: 'Create an invoice preview and download a PDF in the browser without mandatory signup.',
    description: 'Fill issuer, client, line items, dates, discount and one manual adjustment line. InvoiceCraft calculates totals locally.',
    freeScope: 'One invoice at a time, local preview, local PDF download and no saved customer or product records.',
    upgradeScope: 'Saved clients, product catalog, recurring invoices, branding, team review, payment links and automation.',
    useCase: 'Use an invoice after work is delivered or ready to bill, when the recipient needs itemized charges, due date and payment terms.',
    bestPractice: 'Keep the document number, dates, client name, line items and manual tax/adjustment label visible before downloading the PDF.',
    sample: sampleBase,
  },
  {
    slug: 'quote-builder',
    kind: 'quote',
    category: 'quote',
    title: 'Quote Builder',
    shortName: 'Quote',
    headline: 'Prepare a quote or estimate with itemized totals and local PDF export.',
    description: 'Use the quote builder for one-time estimates where the recipient needs itemized scope and a total before approval.',
    freeScope: 'One quote/estimate at a time with local calculation, preview and PDF download.',
    upgradeScope: 'Reusable products, approval workflow, expiry reminders, branded templates, CRM export and team collaboration.',
    useCase: 'Use a quote before work starts, when the buyer needs scope, pricing and validity details before written approval.',
    bestPractice: 'Make the validity date and assumptions explicit, and keep acceptance, tax and payment obligations outside the free builder until reviewed.',
    sample: {
      ...sampleBase,
      documentNumber: 'QT-2026-0088',
      dueDate: '2026-07-27',
      terms: 'Quote valid for 30 days. Work starts after written approval.',
      notes: 'This quote is informational until accepted in writing.',
    },
  },
  {
    slug: 'receipt-builder',
    kind: 'receipt',
    category: 'receipt',
    title: 'Receipt Builder',
    shortName: 'Receipt',
    headline: 'Draft a simple receipt with paid date, itemized total and local PDF download.',
    description: 'Generate a receipt after a payment has already happened. The MVP does not collect payment or store history.',
    freeScope: 'One receipt at a time with local preview, local PDF export and explicit paid-date labeling.',
    upgradeScope: 'Saved customers, payment reconciliation, branding, team access, exports, history and payment integrations.',
    useCase: 'Use a receipt after payment is complete, when the payer needs a record of what was paid and when.',
    bestPractice: 'Match the paid date and total against your real payment records; InvoiceCraft does not verify payment settlement.',
    sample: {
      ...sampleBase,
      documentNumber: 'RC-2026-0019',
      dueDate: '2026-06-27',
      terms: 'Paid in full. No payment processing occurs in InvoiceCraft.',
      notes: 'Receipt generated after payment. Keep your official payment records separately.',
    },
  },
]

function sections(spec: InvoiceCraftToolSpec, locale: LocaleCode): ContentSection[] {
  const base = localizedBasics[locale]

  return [
    { heading: spec.shortName, paragraphs: [spec.useCase] },
    { heading: base.localSection, paragraphs: [base.localBody] },
    { heading: base.pdfSection, paragraphs: [base.pdfBody] },
    { heading: base.bestPracticeSection, paragraphs: [spec.bestPractice] },
    { heading: base.gateSection, paragraphs: [base.gateBody] },
  ]
}

function copyFor(spec: InvoiceCraftToolSpec, locale: LocaleCode): InvoiceCraftToolCopy {
  const base = localizedBasics[locale]

  return {
    title: spec.title,
    shortName: spec.shortName,
    headline: spec.headline,
    description: spec.description,
    resultLabel: base.resultLabel,
    freeScope: spec.freeScope,
    upgradeScope: spec.upgradeScope,
    reviewedLabel: reviewed[locale],
    contentSections: sections(spec, locale),
    faq: [base.faqStorage, base.faqTax],
  }
}

function invoiceCraftTool(spec: InvoiceCraftToolSpec): InvoiceCraftToolDefinition {
  return {
    slug: spec.slug,
    kind: spec.kind,
    category: spec.category,
    modes,
    sample: spec.sample,
    localized: Object.fromEntries(
      publicLocaleCodes.map((locale) => [locale, copyFor(spec, locale)]),
    ) as Record<LocaleCode, InvoiceCraftToolCopy>,
  }
}

export const invoiceCraftToolCatalog: InvoiceCraftToolDefinition[] = specs.map(invoiceCraftTool)
const invoiceCraftToolBySlug = new Map(invoiceCraftToolCatalog.map((candidate) => [candidate.slug, candidate]))

export function getInvoiceCraftToolBySlug(slug: string | undefined): InvoiceCraftToolDefinition | null {
  if (!invoiceCraftToolSlugs.includes(slug as InvoiceCraftToolSlug)) {
    return null
  }

  return invoiceCraftToolBySlug.get(slug as InvoiceCraftToolSlug) ?? null
}

export function getInvoiceCraftToolCopy(toolDefinition: InvoiceCraftToolDefinition, locale: LocaleCode): InvoiceCraftToolCopy {
  return toolDefinition.localized[locale]
}

export function getRelatedInvoiceCraftTools(slug: InvoiceCraftToolSlug, locale: LocaleCode): InvoiceCraftRelatedTool[] {
  return invoiceCraftToolCatalog
    .filter((toolDefinition) => toolDefinition.slug !== slug)
    .map((toolDefinition) => {
      const copy = getInvoiceCraftToolCopy(toolDefinition, locale)

      return {
        slug: toolDefinition.slug,
        title: copy.title,
        description: copy.freeScope,
      }
    })
}

export function getCategoryLabel(category: InvoiceCraftToolCategory, locale: LocaleCode): string {
  const labels: Record<InvoiceCraftToolCategory, Record<LocaleCode, string>> = {
    invoice: { en: 'Invoices', 'pt-br': 'Faturas', es: 'Facturas', fr: 'Factures', de: 'Rechnungen' },
    quote: { en: 'Quotes', 'pt-br': 'Orcamentos', es: 'Presupuestos', fr: 'Devis', de: 'Angebote' },
    receipt: { en: 'Receipts', 'pt-br': 'Recibos', es: 'Recibos', fr: 'Recus', de: 'Belege' },
  }

  return labels[category][locale]
}

export function filterInvoiceCraftTools(query: string, category: InvoiceCraftToolCategory | 'all', locale: LocaleCode): InvoiceCraftToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return invoiceCraftToolCatalog.filter((toolDefinition) => {
    const copy = getInvoiceCraftToolCopy(toolDefinition, locale)
    const matchesCategory = category === 'all' || toolDefinition.category === category
    const searchableText = [
      toolDefinition.slug,
      copy.title,
      copy.shortName,
      copy.headline,
      copy.description,
      copy.freeScope,
      copy.upgradeScope,
      toolDefinition.modes.map((mode) => mode.label).join(' '),
    ].join(' ').toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}

export function createInvoiceCraftToolStructuredData(toolDefinition: InvoiceCraftToolDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getInvoiceCraftToolCopy(toolDefinition, locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.title,
      applicationCategory: 'BusinessApplication',
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

function ok(output: string, meta: ResultMeta[], document: InvoiceCraftDocumentSummary): InvoiceCraftToolResult {
  return { ok: true, output, meta, document }
}

function fail(error: string): InvoiceCraftToolResult {
  return { ok: false, output: '', meta: [], error }
}

function ensureInputLimit(input: InvoiceCraftDocumentInput): void {
  const totalLength = Object.values(input).reduce((sum, value) => sum + String(value ?? '').length, 0)

  if (totalLength > 20_000) {
    throw new Error('Free InvoiceCraft documents accept short one-off inputs. Bulk imports are gated upgrades.')
  }
}

function sanitizeText(value: string, label: string, maxLength: number, required = true): string {
  const normalized = String(value ?? '').replace(/\r\n/g, '\n').trim()

  if (required && !normalized) {
    throw new Error(`${label} is required.`)
  }

  if (normalized.length > maxLength) {
    throw new Error(`${label} is too long for the free local document builder.`)
  }

  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(normalized)) {
    throw new Error(`${label} contains unsupported control characters.`)
  }

  return normalized
}

function validateDate(value: string, label: string): string {
  const normalized = sanitizeText(value, label, 20)

  if (!/^\d{4}-\d{2}-\d{2}$/u.test(normalized)) {
    throw new Error(`${label} must use YYYY-MM-DD format.`)
  }

  const parsed = new Date(`${normalized}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== normalized) {
    throw new Error(`${label} is not a valid calendar date.`)
  }

  return normalized
}

function parseAmount(value: string, label: string): number {
  const normalized = String(value ?? '').trim() || '0'
  const amount = Number(normalized.replace(/,/g, ''))

  if (!Number.isFinite(amount) || amount < 0 || amount > 1_000_000_000) {
    throw new Error(`${label} must be a number from 0 to 1,000,000,000.`)
  }

  return Math.round(amount * 100) / 100
}

function parsePositiveNumber(value: string, label: string): number {
  const amount = Number(String(value ?? '').trim().replace(/,/g, ''))

  if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
    throw new Error(`${label} must be greater than 0 and within free-document limits.`)
  }

  return Math.round(amount * 10000) / 10000
}

function normalizeCurrency(value: string): string {
  const currency = sanitizeText(value, 'Currency', 3).toUpperCase()
  const allowed = new Set(['USD', 'BRL', 'EUR', 'GBP', 'CAD', 'AUD'])

  if (!allowed.has(currency)) {
    throw new Error('Currency must be one of USD, BRL, EUR, GBP, CAD or AUD.')
  }

  return currency
}

function parseItems(itemsRaw: string): InvoiceCraftDocumentLineItem[] {
  const lines = sanitizeText(itemsRaw, 'Line items', 6000)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    throw new Error('At least one line item is required.')
  }

  if (lines.length > 30) {
    throw new Error('Free InvoiceCraft documents support up to 30 line items. Batch workflows are gated upgrades.')
  }

  return lines.map((line, index) => {
    const [descriptionRaw, quantityRaw, unitPriceRaw, ...extra] = line.split('|').map((part) => part.trim())
    if (!descriptionRaw || !quantityRaw || !unitPriceRaw || extra.length) {
      throw new Error(`Line item ${index + 1} must use: Description | Quantity | Unit price.`)
    }

    const description = sanitizeText(descriptionRaw, `Line item ${index + 1} description`, 160)
    const quantity = parsePositiveNumber(quantityRaw, `Line item ${index + 1} quantity`)
    const unitPrice = parseAmount(unitPriceRaw, `Line item ${index + 1} unit price`)
    const lineTotal = Math.round(quantity * unitPrice * 100) / 100

    return {
      description,
      quantity,
      unitPrice,
      lineTotal,
    }
  })
}

export function formatMoney(value: number, currency: string, locale: LocaleCode = 'en'): string {
  return new Intl.NumberFormat(locale === 'pt-br' ? 'pt-BR' : locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

function buildOutput(document: InvoiceCraftDocumentSummary, locale: LocaleCode = 'en'): string {
  const lines = [
    `${document.title}: ${document.documentNumber}`,
    `Issuer: ${document.issuerName}`,
    `Client: ${document.clientName}`,
    `Issue date: ${document.issueDate}`,
    `${document.dueDateLabel}: ${document.dueDate}`,
    '',
    'Items',
    ...document.items.map((item) => (
      `- ${item.description}: ${item.quantity} x ${formatMoney(item.unitPrice, document.currency, locale)} = ${formatMoney(item.lineTotal, document.currency, locale)}`
    )),
    '',
    `Subtotal: ${formatMoney(document.subtotal, document.currency, locale)}`,
    `Discount: ${formatMoney(document.discountAmount, document.currency, locale)}`,
    `${document.adjustmentLabel}: ${formatMoney(document.adjustmentAmount, document.currency, locale)}`,
    `Total: ${formatMoney(document.total, document.currency, locale)}`,
    '',
    document.localOnlyNote,
    document.taxGateNote,
  ]

  return lines.join('\n')
}

function buildDocument(
  tool: InvoiceCraftToolDefinition,
  input: InvoiceCraftDocumentInput,
  mode: InvoiceCraftToolMode,
): InvoiceCraftDocumentSummary {
  ensureInputLimit(input)

  const issuerName = sanitizeText(input.issuerName, 'Issuer name', 120)
  const issuerDetails = sanitizeText(input.issuerDetails, 'Issuer details', 600)
  const clientName = sanitizeText(input.clientName, 'Client name', 120)
  const clientDetails = sanitizeText(input.clientDetails, 'Client details', 600)
  const documentNumber = sanitizeText(input.documentNumber, 'Document number', 80)
  const issueDate = validateDate(input.issueDate, 'Issue date')
  const dueDate = validateDate(input.dueDate, tool.kind === 'receipt' ? 'Paid date' : tool.kind === 'quote' ? 'Valid-until date' : 'Due date')
  const currency = normalizeCurrency(input.currency)
  const terms = sanitizeText(input.terms, 'Terms', 600, false)
  const notes = sanitizeText(input.notes, 'Notes', 800, false)
  const adjustmentLabel = sanitizeText(input.adjustmentLabel || 'Manual adjustment', 'Adjustment label', 80, false) || 'Manual adjustment'
  const items = parseItems(input.itemsRaw)
  const subtotal = Math.round(items.reduce((sum, item) => sum + item.lineTotal, 0) * 100) / 100
  const discountAmount = parseAmount(input.discountAmount, 'Discount')
  const adjustmentAmount = parseAmount(input.adjustmentAmount, 'Manual adjustment')
  const total = Math.round(Math.max(0, subtotal - discountAmount + adjustmentAmount) * 100) / 100
  const title = tool.kind === 'quote'
    ? 'Quote'
    : tool.kind === 'receipt'
      ? 'Receipt'
      : 'Invoice'

  return {
    kind: tool.kind,
    title,
    mode,
    issuerName,
    issuerDetails,
    clientName,
    clientDetails,
    documentNumber,
    issueDate,
    dueDate,
    dueDateLabel: tool.kind === 'receipt' ? 'Paid date' : tool.kind === 'quote' ? 'Valid until' : 'Due date',
    currency,
    terms,
    items,
    subtotal,
    discountAmount,
    adjustmentLabel,
    adjustmentAmount,
    total,
    notes,
    localOnlyNote: 'Storage: local browser session only; no account, localStorage, sessionStorage or product API.',
    taxGateNote: 'Tax/legal note: manual tax or adjustment lines are not jurisdictional tax advice and require HUMAN_ACTION_REQUIRED before fiscal activation.',
  }
}

export async function executeInvoiceCraftTool(
  slug: InvoiceCraftToolSlug,
  input: InvoiceCraftDocumentInput,
  mode: InvoiceCraftToolMode,
  locale: LocaleCode = 'en',
): Promise<InvoiceCraftToolResult> {
  try {
    const tool = getInvoiceCraftToolBySlug(slug)
    if (!tool) {
      return fail('Tool not found.')
    }

    const normalizedMode = modes.some((candidate) => candidate.value === mode) ? mode : 'clean'
    const document = buildDocument(tool, input, normalizedMode)

    return ok(buildOutput(document, locale), [
      { label: 'Document type', value: document.title },
      { label: 'Line items', value: String(document.items.length) },
      { label: 'Total', value: formatMoney(document.total, document.currency, locale) },
    ], document)
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Document generation failed.')
  }
}
