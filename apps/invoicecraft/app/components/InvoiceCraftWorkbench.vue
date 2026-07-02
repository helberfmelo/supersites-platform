<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { getShellCopy } from '../data/copy'
import { localizedHomePath, localizedToolPath, type LocaleCode } from '../data/locales'
import {
  formatMoney,
  getCategoryLabel,
  getInvoiceCraftToolBySlug,
  getInvoiceCraftToolCopy,
  getRelatedInvoiceCraftTools,
  invoiceCraftToolCatalog,
  type InvoiceCraftDocumentKind,
  type InvoiceCraftDocumentInput,
  type InvoiceCraftDocumentSummary,
  type InvoiceCraftToolMode,
  type InvoiceCraftToolResult,
  type InvoiceCraftToolSlug,
} from '../data/tools'
import { trackInvoiceCraftEvent } from '../utils/analytics'
import { runInvoiceCraftToolInWorker } from '../utils/invoicecraftWorker'

interface EditableLineItem {
  id: number
  description: string
  quantity: string
  unitPrice: string
}

interface WorkbenchCopy {
  eyebrow: string
  title: string
  body: string
  tabsLabel: string
  localPdfLabel: string
  noStorageLabel: string
  taxReviewLabel: string
  taxReviewBody: string
  documentLabel: string
  itemsCountLabel: string
  logoLabel: string
  logoHelp: string
  logoClearLabel: string
  logoErrorLabel: string
  paidStatusLabel: string
  quoteCtaTitle: string
  quoteCtaBody: string
  receiptNoteTitle: string
  receiptNoteBody: string
  localeLabel: string
  currencyLabel: string
  issuerNameLabel: string
  clientNameLabel: string
  issuerDetailsLabel: string
  clientDetailsLabel: string
  documentNumberLabel: string
  issueDateLabel: string
  dueDateLabel: string
  validUntilLabel: string
  paidDateLabel: string
  lineItemsTitle: string
  addLineLabel: string
  removeLineLabel: string
  itemDescriptionLabel: string
  quantityLabel: string
  unitPriceLabel: string
  discountAmountLabel: string
  shippingAmountLabel: string
  adjustmentLabelLabel: string
  adjustmentAmountLabel: string
  termsLabel: string
  notesLabel: string
  subtotalLabel: string
  discountLabel: string
  shippingLabel: string
  totalLabel: string
  fromLabel: string
  billToLabel: string
  receivedFromLabel: string
  itemLabel: string
  previewStatusLabel: string
}

const props = withDefaults(defineProps<{
  locale: LocaleCode
  initialSlug?: InvoiceCraftToolSlug
  trackView?: boolean
}>(), {
  initialSlug: 'invoice-builder',
  trackView: false,
})

const workbenchCopy: Record<LocaleCode, WorkbenchCopy> = {
  en: {
    eyebrow: 'Free document studio',
    title: 'Edit the document and watch the PDF preview update.',
    body: 'Use editable rows, currency, dates, discount, freight and manual tax/adjustment fields before downloading a local PDF.',
    tabsLabel: 'Document types',
    localPdfLabel: 'Local PDF export',
    noStorageLabel: 'Browser-only session',
    taxReviewLabel: 'Tax/legal note',
    taxReviewBody: 'Review official taxes, fiscal numbering and payment obligations outside this free document builder.',
    documentLabel: 'Document',
    itemsCountLabel: 'Items',
    logoLabel: 'Logo (PNG/JPEG)',
    logoHelp: 'Optional local logo preview. Files stay in this browser session and are not uploaded.',
    logoClearLabel: 'Clear logo',
    logoErrorLabel: 'Use a PNG or JPEG image up to 1 MB.',
    paidStatusLabel: 'Paid',
    quoteCtaTitle: 'Convert quote to invoice',
    quoteCtaBody: 'Future account option: reuse this quote as an invoice with saved clients, approval history and reminders.',
    receiptNoteTitle: 'Receipt status',
    receiptNoteBody: 'This receipt marks an already-paid transaction. InvoiceCraft does not process or verify payments.',
    localeLabel: 'Locale',
    currencyLabel: 'Currency',
    issuerNameLabel: 'Issuer name',
    clientNameLabel: 'Client name',
    issuerDetailsLabel: 'Issuer details',
    clientDetailsLabel: 'Client details',
    documentNumberLabel: 'Document number',
    issueDateLabel: 'Issue date',
    dueDateLabel: 'Due date',
    validUntilLabel: 'Valid until',
    paidDateLabel: 'Paid date',
    lineItemsTitle: 'Editable line items',
    addLineLabel: 'Add line',
    removeLineLabel: 'Remove line item',
    itemDescriptionLabel: 'Line item description',
    quantityLabel: 'Quantity',
    unitPriceLabel: 'Unit price',
    discountAmountLabel: 'Discount amount',
    shippingAmountLabel: 'Shipping/freight amount',
    adjustmentLabelLabel: 'Manual tax/adjustment label',
    adjustmentAmountLabel: 'Manual tax/adjustment amount',
    termsLabel: 'Terms',
    notesLabel: 'Notes',
    subtotalLabel: 'Subtotal',
    discountLabel: 'Discount',
    shippingLabel: 'Shipping/freight',
    totalLabel: 'Total',
    fromLabel: 'From',
    billToLabel: 'Bill to',
    receivedFromLabel: 'Received from',
    itemLabel: 'Item',
    previewStatusLabel: 'Live preview',
  },
  'pt-br': {
    eyebrow: 'Estudio gratuito de documentos',
    title: 'Edite o documento e veja o preview do PDF atualizar.',
    body: 'Use linhas editaveis, moeda, datas, desconto, frete e imposto/ajuste manual antes de baixar um PDF local.',
    tabsLabel: 'Fluxo de documento',
    localPdfLabel: 'PDF local',
    noStorageLabel: 'Sessao no navegador',
    taxReviewLabel: 'Nota fiscal/juridica',
    taxReviewBody: 'Revise impostos oficiais, numeracao fiscal e obrigacoes de cobranca fora deste gerador gratuito.',
    documentLabel: 'Documento',
    itemsCountLabel: 'Itens',
    logoLabel: 'Logo (PNG/JPEG)',
    logoHelp: 'Logo local opcional. O arquivo fica nesta sessao do navegador e nao e enviado.',
    logoClearLabel: 'Remover logo',
    logoErrorLabel: 'Use uma imagem PNG ou JPEG de ate 1 MB.',
    paidStatusLabel: 'Pago',
    quoteCtaTitle: 'Converter orçamento em fatura',
    quoteCtaBody: 'Opção futura de conta: reaproveitar este orçamento como fatura com clientes salvos, histórico de aprovação e lembretes.',
    receiptNoteTitle: 'Status do recibo',
    receiptNoteBody: 'Este recibo marca uma transacao ja paga. O InvoiceCraft nao processa nem verifica pagamentos.',
    localeLabel: 'Idioma',
    currencyLabel: 'Moeda',
    issuerNameLabel: 'Nome do emissor',
    clientNameLabel: 'Nome do cliente',
    issuerDetailsLabel: 'Dados do emissor',
    clientDetailsLabel: 'Dados do cliente',
    documentNumberLabel: 'Numero do documento',
    issueDateLabel: 'Data de emissao',
    dueDateLabel: 'Vencimento',
    validUntilLabel: 'Valido ate',
    paidDateLabel: 'Data de pagamento',
    lineItemsTitle: 'Linhas editaveis',
    addLineLabel: 'Adicionar linha',
    removeLineLabel: 'Remover item',
    itemDescriptionLabel: 'Descricao do item',
    quantityLabel: 'Quantidade',
    unitPriceLabel: 'Preco unitario',
    discountAmountLabel: 'Valor do desconto',
    shippingAmountLabel: 'Valor do frete',
    adjustmentLabelLabel: 'Rotulo de imposto/ajuste manual',
    adjustmentAmountLabel: 'Valor de imposto/ajuste manual',
    termsLabel: 'Termos',
    notesLabel: 'Observacoes',
    subtotalLabel: 'Subtotal',
    discountLabel: 'Desconto',
    shippingLabel: 'Frete',
    totalLabel: 'Total',
    fromLabel: 'De',
    billToLabel: 'Cobrar de',
    receivedFromLabel: 'Recebido de',
    itemLabel: 'Item',
    previewStatusLabel: 'Preview ao vivo',
  },
  es: {
    eyebrow: 'Estudio gratis de documentos',
    title: 'Edita el documento y revisa la vista previa del PDF.',
    body: 'Usa lineas editables, moneda, fechas, descuento, envio e impuesto/ajuste manual antes de descargar un PDF local.',
    tabsLabel: 'Flujo de documento',
    localPdfLabel: 'PDF local',
    noStorageLabel: 'Sesion en navegador',
    taxReviewLabel: 'Nota fiscal/legal',
    taxReviewBody: 'Revisa impuestos oficiales, numeracion fiscal y obligaciones de cobro fuera de este generador gratis.',
    documentLabel: 'Documento',
    itemsCountLabel: 'Items',
    logoLabel: 'Logo (PNG/JPEG)',
    logoHelp: 'Logo local opcional. El archivo queda en esta sesion del navegador y no se sube.',
    logoClearLabel: 'Quitar logo',
    logoErrorLabel: 'Usa una imagen PNG o JPEG de hasta 1 MB.',
    paidStatusLabel: 'Pagado',
    quoteCtaTitle: 'Convertir presupuesto en factura',
    quoteCtaBody: 'Opcion futura de cuenta: reutilizar este presupuesto como factura con clientes guardados, historial de aprobacion y recordatorios.',
    receiptNoteTitle: 'Estado del recibo',
    receiptNoteBody: 'Este recibo marca una transaccion ya pagada. InvoiceCraft no procesa ni verifica pagos.',
    localeLabel: 'Idioma',
    currencyLabel: 'Moneda',
    issuerNameLabel: 'Nombre del emisor',
    clientNameLabel: 'Nombre del cliente',
    issuerDetailsLabel: 'Datos del emisor',
    clientDetailsLabel: 'Datos del cliente',
    documentNumberLabel: 'Numero de documento',
    issueDateLabel: 'Fecha de emision',
    dueDateLabel: 'Vencimiento',
    validUntilLabel: 'Valido hasta',
    paidDateLabel: 'Fecha de pago',
    lineItemsTitle: 'Lineas editables',
    addLineLabel: 'Agregar linea',
    removeLineLabel: 'Eliminar item',
    itemDescriptionLabel: 'Descripcion del item',
    quantityLabel: 'Cantidad',
    unitPriceLabel: 'Precio unitario',
    discountAmountLabel: 'Importe de descuento',
    shippingAmountLabel: 'Importe de envio',
    adjustmentLabelLabel: 'Etiqueta de impuesto/ajuste manual',
    adjustmentAmountLabel: 'Importe de impuesto/ajuste manual',
    termsLabel: 'Terminos',
    notesLabel: 'Notas',
    subtotalLabel: 'Subtotal',
    discountLabel: 'Descuento',
    shippingLabel: 'Envio',
    totalLabel: 'Total',
    fromLabel: 'De',
    billToLabel: 'Facturar a',
    receivedFromLabel: 'Recibido de',
    itemLabel: 'Item',
    previewStatusLabel: 'Vista en vivo',
  },
  fr: {
    eyebrow: 'Studio document gratuit',
    title: 'Modifiez le document et verifiez l apercu PDF.',
    body: 'Utilisez lignes editables, devise, dates, remise, frais et taxe/ajustement manuel avant de telecharger un PDF local.',
    tabsLabel: 'Flux document',
    localPdfLabel: 'PDF local',
    noStorageLabel: 'Session navigateur',
    taxReviewLabel: 'Note fiscale/juridique',
    taxReviewBody: 'Verifiez taxes officielles, numerotation fiscale et obligations d encaissement hors de ce generateur gratuit.',
    documentLabel: 'Document',
    itemsCountLabel: 'Lignes',
    logoLabel: 'Logo (PNG/JPEG)',
    logoHelp: 'Logo local optionnel. Le fichier reste dans cette session navigateur et n est pas envoye.',
    logoClearLabel: 'Retirer logo',
    logoErrorLabel: 'Utilisez une image PNG ou JPEG de 1 Mo maximum.',
    paidStatusLabel: 'Paye',
    quoteCtaTitle: 'Convertir le devis en facture',
    quoteCtaBody: 'Option future de compte: reutiliser ce devis comme facture avec clients sauvegardes, historique d approbation et rappels.',
    receiptNoteTitle: 'Statut du recu',
    receiptNoteBody: 'Ce recu marque une transaction deja payee. InvoiceCraft ne traite ni ne verifie les paiements.',
    localeLabel: 'Langue',
    currencyLabel: 'Devise',
    issuerNameLabel: 'Nom emetteur',
    clientNameLabel: 'Nom client',
    issuerDetailsLabel: 'Details emetteur',
    clientDetailsLabel: 'Details client',
    documentNumberLabel: 'Numero document',
    issueDateLabel: 'Date emission',
    dueDateLabel: 'Echeance',
    validUntilLabel: 'Valide jusque',
    paidDateLabel: 'Date paiement',
    lineItemsTitle: 'Lignes editables',
    addLineLabel: 'Ajouter ligne',
    removeLineLabel: 'Retirer ligne',
    itemDescriptionLabel: 'Description ligne',
    quantityLabel: 'Quantite',
    unitPriceLabel: 'Prix unitaire',
    discountAmountLabel: 'Montant remise',
    shippingAmountLabel: 'Frais livraison',
    adjustmentLabelLabel: 'Libelle taxe/ajustement manuel',
    adjustmentAmountLabel: 'Montant taxe/ajustement manuel',
    termsLabel: 'Conditions',
    notesLabel: 'Notes',
    subtotalLabel: 'Sous-total',
    discountLabel: 'Remise',
    shippingLabel: 'Frais',
    totalLabel: 'Total',
    fromLabel: 'De',
    billToLabel: 'Facturer a',
    receivedFromLabel: 'Recu de',
    itemLabel: 'Ligne',
    previewStatusLabel: 'Apercu live',
  },
  de: {
    eyebrow: 'Kostenloses Dokumentstudio',
    title: 'Dokument bearbeiten und PDF-Vorschau pruefen.',
    body: 'Nutzen Sie editierbare Zeilen, Waehrung, Daten, Rabatt, Versand und manuelle Steuer/Anpassung vor dem lokalen PDF.',
    tabsLabel: 'Dokumenttypen',
    localPdfLabel: 'Lokales PDF',
    noStorageLabel: 'Browser-Sitzung',
    taxReviewLabel: 'Steuer-/Rechtshinweis',
    taxReviewBody: 'Pruefen Sie offizielle Steuern, fiskalische Nummerierung und Zahlungspflichten ausserhalb dieses kostenlosen Generators.',
    documentLabel: 'Dokument',
    itemsCountLabel: 'Positionen',
    logoLabel: 'Logo (PNG/JPEG)',
    logoHelp: 'Optionales lokales Logo. Die Datei bleibt in dieser Browser-Sitzung und wird nicht hochgeladen.',
    logoClearLabel: 'Logo entfernen',
    logoErrorLabel: 'Nutzen Sie ein PNG- oder JPEG-Bild bis 1 MB.',
    paidStatusLabel: 'Bezahlt',
    quoteCtaTitle: 'Angebot in Rechnung umwandeln',
    quoteCtaBody: 'Kuenftige Kontooption: dieses Angebot als Rechnung mit gespeicherten Kunden, Freigabehistorie und Erinnerungen wiederverwenden.',
    receiptNoteTitle: 'Belegstatus',
    receiptNoteBody: 'Dieser Beleg markiert eine bereits bezahlte Transaktion. InvoiceCraft verarbeitet oder prueft keine Zahlungen.',
    localeLabel: 'Sprache',
    currencyLabel: 'Waehrung',
    issuerNameLabel: 'Ausstellername',
    clientNameLabel: 'Kundenname',
    issuerDetailsLabel: 'Ausstellerdetails',
    clientDetailsLabel: 'Kundendetails',
    documentNumberLabel: 'Dokumentnummer',
    issueDateLabel: 'Ausgabedatum',
    dueDateLabel: 'Faelligkeit',
    validUntilLabel: 'Gueltig bis',
    paidDateLabel: 'Zahldatum',
    lineItemsTitle: 'Editierbare Positionen',
    addLineLabel: 'Position hinzufuegen',
    removeLineLabel: 'Position entfernen',
    itemDescriptionLabel: 'Positionsbeschreibung',
    quantityLabel: 'Menge',
    unitPriceLabel: 'Einzelpreis',
    discountAmountLabel: 'Rabattbetrag',
    shippingAmountLabel: 'Versandbetrag',
    adjustmentLabelLabel: 'Manuelle Steuer/Anpassung Label',
    adjustmentAmountLabel: 'Manuelle Steuer/Anpassung Betrag',
    termsLabel: 'Bedingungen',
    notesLabel: 'Notizen',
    subtotalLabel: 'Zwischensumme',
    discountLabel: 'Rabatt',
    shippingLabel: 'Versand',
    totalLabel: 'Summe',
    fromLabel: 'Von',
    billToLabel: 'Rechnung an',
    receivedFromLabel: 'Erhalten von',
    itemLabel: 'Position',
    previewStatusLabel: 'Live-Vorschau',
  },
}

const labels = computed(() => workbenchCopy[props.locale])
const shellCopy = computed(() => getShellCopy(props.locale))

const modeLabels: Record<LocaleCode, Record<InvoiceCraftToolMode, string>> = {
  en: {
    clean: 'Clean document',
    compact: 'Compact receipt-style',
    service: 'Service business',
  },
  'pt-br': {
    clean: 'Documento limpo',
    compact: 'Recibo compacto',
    service: 'Servicos',
  },
  es: {
    clean: 'Documento limpio',
    compact: 'Recibo compacto',
    service: 'Servicios',
  },
  fr: {
    clean: 'Document clair',
    compact: 'Recu compact',
    service: 'Services',
  },
  de: {
    clean: 'Klares Dokument',
    compact: 'Kompakter Beleg',
    service: 'Dienstleistung',
  },
}

const localizedSampleOverrides: Partial<Record<LocaleCode, Record<InvoiceCraftDocumentKind, Partial<InvoiceCraftDocumentInput>>>> = {
  'pt-br': {
    invoice: {
      issuerName: 'Estudio Norte',
      issuerDetails: 'Av. Paulista, 1000\nSao Paulo, SP\ncontato@example.com',
      clientName: 'Operacoes Acme',
      clientDetails: 'Rua das Flores, 42\nBelo Horizonte, MG\nfinanceiro@example.com',
      currency: 'BRL',
      terms: 'Pagamento no vencimento, salvo acordo por escrito.',
      itemsRaw: 'Configuracao do servico | 1 | 950\nAjuste de template | 3 | 125\nReuniao de revisao | 2 | 90',
      adjustmentLabel: 'Imposto/ajuste manual',
      notes: 'Gerado localmente. Revise dados legais, fiscais e de pagamento antes de usar.',
    },
    quote: {
      issuerName: 'Estudio Norte',
      issuerDetails: 'Av. Paulista, 1000\nSao Paulo, SP\ncontato@example.com',
      clientName: 'Operacoes Acme',
      clientDetails: 'Rua das Flores, 42\nBelo Horizonte, MG\nfinanceiro@example.com',
      currency: 'BRL',
      terms: 'Orcamento valido por 30 dias. O trabalho comeca apos aprovacao por escrito.',
      itemsRaw: 'Escopo inicial | 1 | 950\nAjuste de template | 3 | 125\nReuniao de revisao | 2 | 90',
      adjustmentLabel: 'Imposto/ajuste manual',
      notes: 'Este orcamento e informativo ate aceite por escrito.',
    },
    receipt: {
      issuerName: 'Estudio Norte',
      issuerDetails: 'Av. Paulista, 1000\nSao Paulo, SP\ncontato@example.com',
      clientName: 'Operacoes Acme',
      clientDetails: 'Rua das Flores, 42\nBelo Horizonte, MG\nfinanceiro@example.com',
      currency: 'BRL',
      terms: 'Pago integralmente. O InvoiceCraft nao processa pagamentos.',
      itemsRaw: 'Servico entregue | 1 | 950\nAjuste de template | 3 | 125\nReuniao de revisao | 2 | 90',
      adjustmentLabel: 'Imposto/ajuste manual',
      notes: 'Recibo gerado apos pagamento. Mantenha registros oficiais separadamente.',
    },
  },
}

const activeSlug = ref<InvoiceCraftToolSlug>(props.initialSlug)
const activeTool = computed(() => getInvoiceCraftToolBySlug(activeSlug.value) ?? invoiceCraftToolCatalog[0]!)
const copy = computed(() => getInvoiceCraftToolCopy(activeTool.value, props.locale))
const selectedMode = ref<InvoiceCraftToolMode>(activeTool.value.modes[0]?.value ?? 'clean')
const form = reactive<InvoiceCraftDocumentInput>(cloneInput(localizedSample(activeTool.value.sample, activeTool.value.kind)))
const lineItemSequence = ref(0)
const lineItems = ref<EditableLineItem[]>(rowsFromRaw(localizedSample(activeTool.value.sample, activeTool.value.kind).itemsRaw))
const hasRun = ref(false)
const isRunning = ref(false)
const isDownloading = ref(false)
const copyState = ref<'idle' | 'copied'>('idle')
const result = ref<InvoiceCraftToolResult | null>(null)
const runSequence = ref(0)
const autoPreviewReady = ref(false)
const autoPreviewTimer = ref<ReturnType<typeof window.setTimeout> | null>(null)
const logoDataUrl = ref('')
const logoFormat = ref<'PNG' | 'JPEG' | null>(null)
const logoError = ref('')

const canonicalPath = computed(() => (
  props.trackView ? localizedToolPath(props.locale, activeSlug.value) : localizedHomePath(props.locale)
))
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.value.invalidResultTitle : copy.value.resultLabel)
const dueDateLabel = computed(() => (
  activeTool.value.kind === 'receipt'
    ? labels.value.paidDateLabel
    : activeTool.value.kind === 'quote'
      ? labels.value.validUntilLabel
      : labels.value.dueDateLabel
))
const document = computed<InvoiceCraftDocumentSummary | null>(() => result.value?.ok ? result.value.document ?? null : null)
const relatedTools = computed(() => getRelatedInvoiceCraftTools(activeSlug.value, props.locale))
const showQuoteUpgrade = computed(() => activeTool.value.kind === 'quote')
const showReceiptNote = computed(() => activeTool.value.kind === 'receipt')
const snapshotMeta = computed(() => {
  if (!document.value) {
    return []
  }

  return [
    { label: labels.value.documentLabel, value: `${document.value.title} ${document.value.documentNumber}` },
    { label: document.value.dueDateLabel, value: document.value.dueDate },
    { label: labels.value.itemsCountLabel, value: String(document.value.items.length) },
    { label: labels.value.totalLabel, value: formatMoney(document.value.total, document.value.currency, props.locale) },
  ]
})

function cloneInput(input: InvoiceCraftDocumentInput): InvoiceCraftDocumentInput {
  return { ...input }
}

function localizedSample(input: InvoiceCraftDocumentInput, kind: InvoiceCraftDocumentKind): InvoiceCraftDocumentInput {
  return {
    ...cloneInput(input),
    ...(localizedSampleOverrides[props.locale]?.[kind] ?? {}),
  }
}

function modeLabel(mode: InvoiceCraftToolMode): string {
  return modeLabels[props.locale]?.[mode] ?? activeTool.value.modes.find((candidate) => candidate.value === mode)?.label ?? mode
}

function rowsFromRaw(raw: string): EditableLineItem[] {
  const rows = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [description = '', quantity = '1', unitPrice = '0'] = line.split('|').map((part) => part.trim())

      lineItemSequence.value += 1
      return {
        id: lineItemSequence.value,
        description,
        quantity,
        unitPrice,
      }
    })

  if (rows.length > 0) {
    return rows
  }

  lineItemSequence.value += 1
  return [{ id: lineItemSequence.value, description: '', quantity: '1', unitPrice: '0' }]
}

function serializeRows(): string {
  return lineItems.value
    .map((item) => `${item.description} | ${item.quantity} | ${item.unitPrice}`)
    .join('\n')
}

function currentInput(): InvoiceCraftDocumentInput {
  return {
    ...cloneInput(form),
    itemsRaw: serializeRows(),
  }
}

function clearScheduledPreview(): void {
  if (autoPreviewTimer.value) {
    window.clearTimeout(autoPreviewTimer.value)
    autoPreviewTimer.value = null
  }
}

function schedulePreview(): void {
  if (!import.meta.client || !autoPreviewReady.value) {
    return
  }

  clearScheduledPreview()
  autoPreviewTimer.value = window.setTimeout(() => {
    void generatePreview(false)
  }, 260)
}

function clearLogo(): void {
  logoDataUrl.value = ''
  logoFormat.value = null
  logoError.value = ''
}

function updateLogo(event: Event): void {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    clearLogo()
    return
  }

  if (!['image/png', 'image/jpeg'].includes(file.type) || file.size > 1_000_000) {
    clearLogo()
    logoError.value = labels.value.logoErrorLabel
    input.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    logoDataUrl.value = typeof reader.result === 'string' ? reader.result : ''
    logoFormat.value = file.type === 'image/png' ? 'PNG' : 'JPEG'
    logoError.value = ''
  }
  reader.onerror = () => {
    clearLogo()
    logoError.value = labels.value.logoErrorLabel
  }
  reader.readAsDataURL(file)
}

async function generatePreview(trackEvents = true): Promise<void> {
  const sequence = runSequence.value + 1
  runSequence.value = sequence
  isRunning.value = true
  hasRun.value = true

  if (trackEvents) {
    trackInvoiceCraftEvent({
      toolSlug: activeSlug.value,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'tool_started')
  }

  try {
    const nextResult = await runInvoiceCraftToolInWorker({
      slug: activeSlug.value,
      input: currentInput(),
      mode: selectedMode.value,
      locale: props.locale,
    })

    if (sequence === runSequence.value) {
      result.value = nextResult
    }

    if (trackEvents) {
      trackInvoiceCraftEvent({
        toolSlug: activeSlug.value,
        locale: props.locale,
        routePath: canonicalPath.value,
      }, nextResult.ok ? 'tool_completed' : 'tool_failed')
    }
  } catch (error) {
    if (sequence === runSequence.value) {
      result.value = {
        ok: false,
        output: '',
        meta: [],
        error: error instanceof Error ? error.message : 'Document generation failed.',
      }
    }

    if (trackEvents) {
      trackInvoiceCraftEvent({
        toolSlug: activeSlug.value,
        locale: props.locale,
        routePath: canonicalPath.value,
      }, 'tool_failed')
    }
  } finally {
    if (sequence === runSequence.value) {
      isRunning.value = false
    }
  }
}

function loadSample(preview = true): void {
  const tool = activeTool.value
  const sample = localizedSample(tool.sample, tool.kind)

  Object.assign(form, sample)
  selectedMode.value = tool.modes[0]?.value ?? 'clean'
  lineItems.value = rowsFromRaw(sample.itemsRaw)
  hasRun.value = false
  result.value = null
  copyState.value = 'idle'

  if (preview && import.meta.client) {
    void generatePreview(false)
  }
}

function setActiveTool(slug: InvoiceCraftToolSlug): void {
  if (activeSlug.value === slug) {
    return
  }

  activeSlug.value = slug
}

function resetExample(): void {
  loadSample(true)
}

function setMode(mode: InvoiceCraftToolMode): void {
  selectedMode.value = mode
  copyState.value = 'idle'
}

function addLineItem(): void {
  lineItemSequence.value += 1
  lineItems.value.push({
    id: lineItemSequence.value,
    description: '',
    quantity: '1',
    unitPrice: '0',
  })
}

function removeLineItem(id: number): void {
  if (lineItems.value.length === 1) {
    return
  }

  lineItems.value = lineItems.value.filter((item) => item.id !== id)
}

function safeFileName(documentSummary: InvoiceCraftDocumentSummary): string {
  const normalizedNumber = documentSummary.documentNumber
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return `${documentSummary.kind}-${normalizedNumber || 'document'}.pdf`
}

function writeTextBlock(pdf: InstanceType<(typeof import('jspdf'))['jsPDF']>, text: string, x: number, y: number, width: number): number {
  const lines = pdf.splitTextToSize(text || '-', width) as string[]
  pdf.text(lines, x, y)

  return y + lines.length * 12
}

async function copySummary(): Promise<void> {
  if (!result.value?.ok || !result.value.output) {
    return
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(result.value.output)
  } else {
    const textarea = window.document.createElement('textarea')
    textarea.value = result.value.output
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    window.document.body.appendChild(textarea)
    textarea.select()
    window.document.execCommand('copy')
    window.document.body.removeChild(textarea)
  }

  copyState.value = 'copied'
  window.setTimeout(() => {
    copyState.value = 'idle'
  }, 1800)
}

async function downloadPdf(): Promise<void> {
  if (!document.value) {
    await generatePreview(false)
  }

  if (!document.value) {
    return
  }

  isDownloading.value = true

  try {
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
    const doc = document.value
    const left = 42
    const right = 553
    let y = 48

    if (logoDataUrl.value && logoFormat.value) {
      try {
        pdf.addImage(logoDataUrl.value, logoFormat.value, left, y - 18, 72, 36, undefined, 'FAST')
      } catch {
        // Keep PDF export usable if the local image cannot be decoded by jsPDF.
      }
    }

    const titleX = logoDataUrl.value ? left + 88 : left
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(22)
    pdf.text(doc.title, titleX, y)
    pdf.setFontSize(10)
    pdf.text(doc.documentNumber, right, y, { align: 'right' })

    y += 30
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.text(`${labels.value.issueDateLabel}: ${doc.issueDate}`, left, y)
    pdf.text(`${dueDateLabel.value}: ${doc.dueDate}`, right, y, { align: 'right' })

    y += 32
    pdf.setFont('helvetica', 'bold')
    pdf.text(labels.value.fromLabel, left, y)
    pdf.text(activeTool.value.kind === 'receipt' ? labels.value.receivedFromLabel : labels.value.billToLabel, 310, y)
    pdf.setFont('helvetica', 'normal')
    y += 16
    const issuerEnd = writeTextBlock(pdf, `${doc.issuerName}\n${doc.issuerDetails}`, left, y, 220)
    const clientEnd = writeTextBlock(pdf, `${doc.clientName}\n${doc.clientDetails}`, 310, y, 220)
    y = Math.max(issuerEnd, clientEnd) + 20

    pdf.setFont('helvetica', 'bold')
    pdf.text(labels.value.itemLabel, left, y)
    pdf.text(labels.value.quantityLabel, 330, y, { align: 'right' })
    pdf.text(labels.value.unitPriceLabel, 430, y, { align: 'right' })
    pdf.text(labels.value.totalLabel, right, y, { align: 'right' })
    pdf.line(left, y + 6, right, y + 6)
    y += 22
    pdf.setFont('helvetica', 'normal')

    for (const item of doc.items) {
      const itemLines = pdf.splitTextToSize(item.description, 250) as string[]
      pdf.text(itemLines, left, y)
      pdf.text(String(item.quantity), 330, y, { align: 'right' })
      pdf.text(formatMoney(item.unitPrice, doc.currency, props.locale), 430, y, { align: 'right' })
      pdf.text(formatMoney(item.lineTotal, doc.currency, props.locale), right, y, { align: 'right' })
      y += Math.max(18, itemLines.length * 12 + 6)
    }

    y += 8
    pdf.line(330, y, right, y)
    y += 18
    const totals = [
      [labels.value.subtotalLabel, doc.subtotal],
      [labels.value.discountLabel, doc.discountAmount],
      [labels.value.shippingLabel, doc.shippingAmount],
      [doc.adjustmentLabel, doc.adjustmentAmount],
      [labels.value.totalLabel, doc.total],
    ] as const

    for (const [label, amount] of totals) {
      pdf.setFont('helvetica', label === labels.value.totalLabel ? 'bold' : 'normal')
      pdf.text(label, 360, y)
      pdf.text(formatMoney(amount, doc.currency, props.locale), right, y, { align: 'right' })
      y += 16
    }

    y += 12
    pdf.setFont('helvetica', 'bold')
    pdf.text(labels.value.termsLabel, left, y)
    pdf.setFont('helvetica', 'normal')
    y += 16
    y = writeTextBlock(pdf, [doc.terms, doc.notes, doc.taxGateNote].filter(Boolean).join('\n'), left, y, 490)
    y += 12
    pdf.setFontSize(8)
    writeTextBlock(pdf, doc.localOnlyNote, left, y, 490)

    pdf.save(safeFileName(doc))
    trackInvoiceCraftEvent({
      toolSlug: activeSlug.value,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'file_downloaded')
  } finally {
    isDownloading.value = false
  }
}

watch(activeSlug, () => {
  loadSample(true)
})

watch([form, lineItems, selectedMode], () => {
  schedulePreview()
}, { deep: true })

onMounted(() => {
  if (props.trackView) {
    trackInvoiceCraftEvent({
      toolSlug: activeSlug.value,
      locale: props.locale,
      routePath: canonicalPath.value,
    }, 'tool_viewed')
  }

  autoPreviewReady.value = true
  void generatePreview(false)
})

onBeforeUnmount(() => {
  clearScheduledPreview()
})
</script>

<template>
  <section class="invoice-workbench" :aria-labelledby="`invoicecraft-workbench-${activeSlug}`">
    <div class="workbench-heading">
      <div>
        <p class="eyebrow">{{ labels.eyebrow }}</p>
        <h2 :id="`invoicecraft-workbench-${activeSlug}`">{{ copy.title }}</h2>
        <p>{{ copy.headline }}</p>
      </div>
      <div class="workbench-pills" aria-label="InvoiceCraft safeguards">
        <span>{{ labels.localPdfLabel }}</span>
        <span>{{ labels.noStorageLabel }}</span>
      </div>
    </div>

    <div class="document-type-tabs" :aria-label="labels.tabsLabel" role="tablist">
      <button
        v-for="candidate in invoiceCraftToolCatalog"
        :key="candidate.slug"
        type="button"
        role="tab"
        :aria-selected="activeSlug === candidate.slug"
        @click="setActiveTool(candidate.slug)"
      >
        <span>{{ getInvoiceCraftToolCopy(candidate, locale).shortName }}</span>
        <small>{{ getCategoryLabel(candidate.category, locale) }}</small>
      </button>
    </div>

    <section class="document-snapshot" :aria-labelledby="`${activeSlug}-snapshot`">
      <div>
        <span class="status">{{ labels.previewStatusLabel }}</span>
        <h2 :id="`${activeSlug}-snapshot`">{{ shellCopy.documentSnapshotTitle }}</h2>
        <p v-if="!document">{{ shellCopy.documentSnapshotEmpty }}</p>
        <div v-else class="snapshot-meta">
          <div v-for="item in snapshotMeta" :key="`${item.label}-${item.value}`">
            <strong>{{ item.label }}</strong>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>

      <div class="snapshot-actions">
        <button :class="getButtonClass()" type="button" :disabled="!document || isDownloading" @click="downloadPdf">
          {{ shellCopy.downloadLabel }}
        </button>
        <button :class="getButtonClass('secondary')" type="button" :disabled="!document" @click="copySummary">
          {{ copyState === 'copied' ? shellCopy.copiedSummaryLabel : shellCopy.copySummaryLabel }}
        </button>
      </div>
    </section>

    <section class="tool-layout">
      <div>
        <section class="input-panel" :aria-labelledby="`${activeSlug}-input`">
          <h2 :id="`${activeSlug}-input`">{{ shellCopy.inputTitle }}</h2>
          <p>{{ copy.description }}</p>
          <form class="utility-form document-form" @submit.prevent="generatePreview(true)">
            <div class="editor-toolbar">
              <div class="mode-tabs" :aria-label="shellCopy.modeLabel" role="group">
                <button
                  v-for="mode in activeTool.modes"
                  :key="mode.value"
                  type="button"
                  :aria-pressed="selectedMode === mode.value"
                  @click="setMode(mode.value)"
                >
                  {{ modeLabel(mode.value) }}
                </button>
              </div>
              <div class="form-grid form-grid--compact">
                <div class="field">
                  <label :for="`${activeSlug}-locale`">{{ labels.localeLabel }}</label>
                  <input :id="`${activeSlug}-locale`" :value="locale" readonly>
                </div>
                <div class="field">
                  <label :for="`${activeSlug}-currency`">{{ labels.currencyLabel }}</label>
                  <select :id="`${activeSlug}-currency`" v-model="form.currency">
                    <option value="USD">USD</option>
                    <option value="BRL">BRL</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="logo-control">
              <div class="field">
                <label :for="`${activeSlug}-logo`">{{ labels.logoLabel }}</label>
                <input
                  :id="`${activeSlug}-logo`"
                  type="file"
                  accept="image/png,image/jpeg"
                  @change="updateLogo"
                >
              </div>
              <div class="logo-control__preview">
                <img v-if="logoDataUrl" :src="logoDataUrl" alt="">
                <span v-else>{{ labels.logoHelp }}</span>
                <button
                  v-if="logoDataUrl"
                  class="button-link button-link--secondary"
                  type="button"
                  @click="clearLogo"
                >
                  {{ labels.logoClearLabel }}
                </button>
              </div>
              <p v-if="logoError" class="result-error">{{ logoError }}</p>
            </div>

            <div class="form-grid">
              <div class="field">
                <label :for="`${activeSlug}-issuer-name`">{{ labels.issuerNameLabel }}</label>
                <input :id="`${activeSlug}-issuer-name`" v-model="form.issuerName" autocomplete="off">
              </div>
              <div class="field">
                <label :for="`${activeSlug}-client-name`">{{ labels.clientNameLabel }}</label>
                <input :id="`${activeSlug}-client-name`" v-model="form.clientName" autocomplete="off">
              </div>
            </div>

            <div class="form-grid">
              <div class="field">
                <label :for="`${activeSlug}-issuer-details`">{{ labels.issuerDetailsLabel }}</label>
                <textarea :id="`${activeSlug}-issuer-details`" v-model="form.issuerDetails" spellcheck="false"></textarea>
              </div>
              <div class="field">
                <label :for="`${activeSlug}-client-details`">{{ labels.clientDetailsLabel }}</label>
                <textarea :id="`${activeSlug}-client-details`" v-model="form.clientDetails" spellcheck="false"></textarea>
              </div>
            </div>

            <div class="form-grid form-grid--three">
              <div class="field">
                <label :for="`${activeSlug}-number`">{{ labels.documentNumberLabel }}</label>
                <input :id="`${activeSlug}-number`" v-model="form.documentNumber" autocomplete="off">
              </div>
              <div class="field">
                <label :for="`${activeSlug}-issue-date`">{{ labels.issueDateLabel }}</label>
                <input :id="`${activeSlug}-issue-date`" v-model="form.issueDate" type="date">
              </div>
              <div class="field">
                <label :for="`${activeSlug}-due-date`">{{ dueDateLabel }}</label>
                <input :id="`${activeSlug}-due-date`" v-model="form.dueDate" type="date">
              </div>
            </div>

            <section class="line-editor" :aria-labelledby="`${activeSlug}-line-items`">
              <div class="line-editor__heading">
                <h3 :id="`${activeSlug}-line-items`">{{ labels.lineItemsTitle }}</h3>
                <button :class="getButtonClass('secondary')" type="button" @click="addLineItem">
                  {{ labels.addLineLabel }}
                </button>
              </div>

              <div v-for="(item, index) in lineItems" :key="item.id" class="line-row">
                <div class="field line-row__description">
                  <label :for="`${activeSlug}-line-${item.id}-description`">
                    {{ labels.itemDescriptionLabel }} {{ index + 1 }}
                  </label>
                  <input :id="`${activeSlug}-line-${item.id}-description`" v-model="item.description" autocomplete="off">
                </div>
                <div class="field">
                  <label :for="`${activeSlug}-line-${item.id}-quantity`">
                    {{ labels.quantityLabel }} {{ index + 1 }}
                  </label>
                  <input :id="`${activeSlug}-line-${item.id}-quantity`" v-model="item.quantity" inputmode="decimal">
                </div>
                <div class="field">
                  <label :for="`${activeSlug}-line-${item.id}-unit-price`">
                    {{ labels.unitPriceLabel }} {{ index + 1 }}
                  </label>
                  <input :id="`${activeSlug}-line-${item.id}-unit-price`" v-model="item.unitPrice" inputmode="decimal">
                </div>
                <button
                  class="line-row__remove"
                  type="button"
                  :aria-label="`${labels.removeLineLabel} ${index + 1}`"
                  :disabled="lineItems.length === 1"
                  @click="removeLineItem(item.id)"
                >
                  -
                </button>
              </div>
            </section>

            <div class="form-grid form-grid--three">
              <div class="field">
                <label :for="`${activeSlug}-discount`">{{ labels.discountAmountLabel }}</label>
                <input :id="`${activeSlug}-discount`" v-model="form.discountAmount" inputmode="decimal">
              </div>
              <div class="field">
                <label :for="`${activeSlug}-shipping`">{{ labels.shippingAmountLabel }}</label>
                <input :id="`${activeSlug}-shipping`" v-model="form.shippingAmount" inputmode="decimal">
              </div>
              <div class="field">
                <label :for="`${activeSlug}-adjustment-amount`">{{ labels.adjustmentAmountLabel }}</label>
                <input :id="`${activeSlug}-adjustment-amount`" v-model="form.adjustmentAmount" inputmode="decimal">
              </div>
            </div>

            <div class="field">
              <label :for="`${activeSlug}-adjustment-label`">{{ labels.adjustmentLabelLabel }}</label>
              <input :id="`${activeSlug}-adjustment-label`" v-model="form.adjustmentLabel" autocomplete="off">
            </div>

            <div class="field">
              <label :for="`${activeSlug}-terms`">{{ labels.termsLabel }}</label>
              <textarea :id="`${activeSlug}-terms`" v-model="form.terms" spellcheck="false"></textarea>
            </div>

            <div class="field">
              <label :for="`${activeSlug}-notes`">{{ labels.notesLabel }}</label>
              <textarea :id="`${activeSlug}-notes`" v-model="form.notes" spellcheck="false"></textarea>
            </div>

            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit" :disabled="isRunning">
                {{ shellCopy.runLabel }}
              </button>
              <button :class="getButtonClass('secondary')" type="button" @click="resetExample">
                {{ shellCopy.resetLabel }}
              </button>
            </div>
            <p class="download-hint">{{ shellCopy.downloadHint }}</p>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${activeSlug}-result`">
          <h2 :id="`${activeSlug}-result`">{{ resultTitle }}</h2>

          <p v-if="!hasRun">{{ shellCopy.privacyNote }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>

          <template v-else-if="document">
            <div v-if="result?.meta.length" class="result-meta">
              <div v-for="item in result.meta" :key="`${item.label}-${item.value}`">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>

            <article class="document-preview" :class="`document-preview--${document.mode}`">
              <header class="document-preview__header">
                <div class="document-preview__brand">
                  <img v-if="logoDataUrl" :src="logoDataUrl" alt="">
                  <div>
                    <p class="eyebrow">{{ document.title }}</p>
                    <h3>{{ document.documentNumber }}</h3>
                  </div>
                </div>
                <div class="document-preview__dates">
                  <span v-if="activeTool.kind === 'receipt'" class="document-status">{{ labels.paidStatusLabel }}</span>
                  <strong>{{ document.issueDate }}</strong>
                  <span>{{ dueDateLabel }}: {{ document.dueDate }}</span>
                </div>
              </header>

              <section class="document-preview__parties">
                <div>
                  <strong>{{ labels.fromLabel }}</strong>
                  <p>{{ document.issuerName }}</p>
                  <pre>{{ document.issuerDetails }}</pre>
                </div>
                <div>
                  <strong>{{ activeTool.kind === 'receipt' ? labels.receivedFromLabel : labels.billToLabel }}</strong>
                  <p>{{ document.clientName }}</p>
                  <pre>{{ document.clientDetails }}</pre>
                </div>
              </section>

              <div class="document-preview__table" role="table" aria-label="Document line items">
                <div class="document-preview__row document-preview__row--head" role="row">
                  <span role="columnheader">{{ labels.itemLabel }}</span>
                  <span role="columnheader">{{ labels.quantityLabel }}</span>
                  <span role="columnheader">{{ labels.unitPriceLabel }}</span>
                  <span role="columnheader">{{ labels.totalLabel }}</span>
                </div>
                <div v-for="item in document.items" :key="`${item.description}-${item.lineTotal}`" class="document-preview__row" role="row">
                  <span role="cell">{{ item.description }}</span>
                  <span role="cell">{{ item.quantity }}</span>
                  <span role="cell">{{ formatMoney(item.unitPrice, document.currency, locale) }}</span>
                  <span role="cell">{{ formatMoney(item.lineTotal, document.currency, locale) }}</span>
                </div>
              </div>

              <dl class="document-preview__totals">
                <div>
                  <dt>{{ labels.subtotalLabel }}</dt>
                  <dd>{{ formatMoney(document.subtotal, document.currency, locale) }}</dd>
                </div>
                <div>
                  <dt>{{ labels.discountLabel }}</dt>
                  <dd>{{ formatMoney(document.discountAmount, document.currency, locale) }}</dd>
                </div>
                <div>
                  <dt>{{ labels.shippingLabel }}</dt>
                  <dd>{{ formatMoney(document.shippingAmount, document.currency, locale) }}</dd>
                </div>
                <div>
                  <dt>{{ document.adjustmentLabel }}</dt>
                  <dd>{{ formatMoney(document.adjustmentAmount, document.currency, locale) }}</dd>
                </div>
                <div class="document-preview__total">
                  <dt>{{ labels.totalLabel }}</dt>
                  <dd>{{ formatMoney(document.total, document.currency, locale) }}</dd>
                </div>
              </dl>

              <footer class="document-preview__notes">
                <p v-if="document.terms"><strong>{{ labels.termsLabel }}:</strong> {{ document.terms }}</p>
                <p v-if="document.notes"><strong>{{ labels.notesLabel }}:</strong> {{ document.notes }}</p>
                <p>{{ document.taxGateNote }}</p>
                <p>{{ document.localOnlyNote }}</p>
              </footer>
            </article>
          </template>
        </section>
      </div>

      <aside class="tool-sidebar" :aria-labelledby="`${activeSlug}-scope`">
        <section class="band">
          <h2 :id="`${activeSlug}-scope`">{{ shellCopy.useCaseTitle }}</h2>
          <p>{{ copy.contentSections[0]?.paragraphs[0] }}</p>
        </section>

        <section class="band">
          <h2>{{ shellCopy.freeCheckLabel }}</h2>
          <dl class="fact-list">
            <div>
              <dt>{{ shellCopy.freeCheckLabel }}</dt>
              <dd>{{ copy.freeScope }}</dd>
            </div>
            <div>
              <dt>{{ shellCopy.upgradePathLabel }}</dt>
              <dd>{{ copy.upgradeScope }}</dd>
            </div>
            <div>
              <dt>{{ labels.taxReviewLabel }}</dt>
              <dd>{{ labels.taxReviewBody }}</dd>
            </div>
          </dl>
        </section>

        <section v-if="showQuoteUpgrade" class="band band--soft">
          <h2>{{ labels.quoteCtaTitle }}</h2>
          <p>{{ labels.quoteCtaBody }}</p>
        </section>

        <section v-if="showReceiptNote" class="band band--soft">
          <h2>{{ labels.receiptNoteTitle }}</h2>
          <p>{{ labels.receiptNoteBody }}</p>
        </section>

        <section class="band">
          <h2>{{ shellCopy.futureListTitle }}</h2>
          <ul class="future-list">
            <li v-for="item in shellCopy.futureItems" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="band">
          <h2>{{ shellCopy.relatedTitle }}</h2>
          <p>{{ shellCopy.relatedBody }}</p>
          <div class="related-list">
            <NuxtLink
              v-for="related in relatedTools"
              :key="related.slug"
              :to="localizedToolPath(locale, related.slug)"
              class="related-card"
            >
              <strong>{{ related.title }}</strong>
              <span>{{ related.description }}</span>
            </NuxtLink>
          </div>
        </section>
      </aside>
    </section>
  </section>
</template>
