<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, reactive, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createInvoiceCraftToolStructuredData,
  formatMoney,
  getCategoryLabel,
  getInvoiceCraftToolBySlug,
  getInvoiceCraftToolCopy,
  type InvoiceCraftDocumentInput,
  type InvoiceCraftDocumentSummary,
  type InvoiceCraftToolMode,
  type InvoiceCraftToolResult,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackInvoiceCraftEvent } from '../../../utils/analytics'
import { runInvoiceCraftToolInWorker } from '../../../utils/invoicecraftWorker'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getInvoiceCraftToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

function cloneInput(input: InvoiceCraftDocumentInput): InvoiceCraftDocumentInput {
  return { ...input }
}

const copy = getInvoiceCraftToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createInvoiceCraftToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const selectedMode = ref<InvoiceCraftToolMode>(tool.modes[0]?.value ?? 'clean')
const form = reactive<InvoiceCraftDocumentInput>(cloneInput(tool.sample))
const hasRun = ref(false)
const isRunning = ref(false)
const isDownloading = ref(false)
const result = ref<InvoiceCraftToolResult | null>(null)
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.invalidResultTitle : copy.resultLabel)
const dueDateLabel = computed(() => tool.kind === 'receipt' ? 'Paid date' : tool.kind === 'quote' ? 'Valid until' : 'Due date')
const document = computed<InvoiceCraftDocumentSummary | null>(() => result.value?.ok ? result.value.document ?? null : null)

function currentInput(): InvoiceCraftDocumentInput {
  return cloneInput(form)
}

async function runTool(): Promise<void> {
  isRunning.value = true
  hasRun.value = true
  trackInvoiceCraftEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_started')

  try {
    result.value = await runInvoiceCraftToolInWorker({
      slug: tool.slug,
      input: currentInput(),
      mode: selectedMode.value,
      locale,
    })

    trackInvoiceCraftEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, result.value.ok ? 'tool_completed' : 'tool_failed')
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Document generation failed.',
    }
    trackInvoiceCraftEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'tool_failed')
  } finally {
    isRunning.value = false
  }
}

function resetExample(): void {
  Object.assign(form, cloneInput(tool.sample))
  selectedMode.value = tool.modes[0]?.value ?? 'clean'
  hasRun.value = false
  result.value = null
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

async function downloadPdf(): Promise<void> {
  if (!document.value) {
    await runTool()
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

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(22)
    pdf.text(doc.title, left, y)
    pdf.setFontSize(10)
    pdf.text(doc.documentNumber, right, y, { align: 'right' })

    y += 30
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.text(`Issue date: ${doc.issueDate}`, left, y)
    pdf.text(`${doc.dueDateLabel}: ${doc.dueDate}`, right, y, { align: 'right' })

    y += 32
    pdf.setFont('helvetica', 'bold')
    pdf.text('From', left, y)
    pdf.text(tool.kind === 'receipt' ? 'Received from' : 'Bill to', 310, y)
    pdf.setFont('helvetica', 'normal')
    y += 16
    const issuerEnd = writeTextBlock(pdf, `${doc.issuerName}\n${doc.issuerDetails}`, left, y, 220)
    const clientEnd = writeTextBlock(pdf, `${doc.clientName}\n${doc.clientDetails}`, 310, y, 220)
    y = Math.max(issuerEnd, clientEnd) + 20

    pdf.setFont('helvetica', 'bold')
    pdf.text('Item', left, y)
    pdf.text('Qty', 330, y, { align: 'right' })
    pdf.text('Unit', 430, y, { align: 'right' })
    pdf.text('Total', right, y, { align: 'right' })
    pdf.line(left, y + 6, right, y + 6)
    y += 22
    pdf.setFont('helvetica', 'normal')

    for (const item of doc.items) {
      const itemLines = pdf.splitTextToSize(item.description, 250) as string[]
      pdf.text(itemLines, left, y)
      pdf.text(String(item.quantity), 330, y, { align: 'right' })
      pdf.text(formatMoney(item.unitPrice, doc.currency, locale), 430, y, { align: 'right' })
      pdf.text(formatMoney(item.lineTotal, doc.currency, locale), right, y, { align: 'right' })
      y += Math.max(18, itemLines.length * 12 + 6)
    }

    y += 8
    pdf.line(330, y, right, y)
    y += 18
    const totals = [
      ['Subtotal', doc.subtotal],
      ['Discount', doc.discountAmount],
      [doc.adjustmentLabel, doc.adjustmentAmount],
      ['Total', doc.total],
    ] as const

    for (const [label, amount] of totals) {
      pdf.setFont('helvetica', label === 'Total' ? 'bold' : 'normal')
      pdf.text(label, 360, y)
      pdf.text(formatMoney(amount, doc.currency, locale), right, y, { align: 'right' })
      y += 16
    }

    y += 12
    pdf.setFont('helvetica', 'bold')
    pdf.text('Terms and notes', left, y)
    pdf.setFont('helvetica', 'normal')
    y += 16
    y = writeTextBlock(pdf, [doc.terms, doc.notes, doc.taxGateNote].filter(Boolean).join('\n'), left, y, 490)
    y += 12
    pdf.setFontSize(8)
    writeTextBlock(pdf, doc.localOnlyNote, left, y, 490)

    pdf.save(safeFileName(doc))
    trackInvoiceCraftEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'file_downloaded')
  } finally {
    isDownloading.value = false
  }
}

onMounted(() => {
  trackInvoiceCraftEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_viewed')
})

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | InvoiceCraft`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | InvoiceCraft`,
    },
    {
      property: 'og:description',
      content: copy.headline,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedToolPath(targetLocale, tool.slug)),
  ],
  script: structuredData.map((item) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(item),
  })),
})
</script>

<template>
  <main class="page-shell">
    <SiteHeader
      :locale="locale"
      :path-for-locale="(targetLocale) => localizedToolPath(targetLocale, tool.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.shortName }}</span>
    </nav>

    <section class="hero" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span class="status">Sprint 4.2</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

      <aside class="status-panel" :aria-label="shellCopy.pageStatusLabel">
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.liveTitle }}</strong>
            <span>{{ shellCopy.liveBody }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.gatedTitle }}</strong>
            <span>{{ shellCopy.gatedBody }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section class="tool-layout">
      <div>
        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ shellCopy.inputTitle }}</h2>
          <p>{{ copy.description }}</p>
          <form class="utility-form document-form" @submit.prevent="runTool">
            <div class="form-grid">
              <div class="field">
                <label :for="`${tool.slug}-mode`">Template</label>
                <select :id="`${tool.slug}-mode`" v-model="selectedMode">
                  <option v-for="mode in tool.modes" :key="mode.value" :value="mode.value">
                    {{ mode.label }}
                  </option>
                </select>
              </div>
              <div class="field">
                <label :for="`${tool.slug}-currency`">Currency</label>
                <select :id="`${tool.slug}-currency`" v-model="form.currency">
                  <option value="USD">USD</option>
                  <option value="BRL">BRL</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>

            <div class="form-grid">
              <div class="field">
                <label :for="`${tool.slug}-issuer-name`">Issuer name</label>
                <input :id="`${tool.slug}-issuer-name`" v-model="form.issuerName" autocomplete="off">
              </div>
              <div class="field">
                <label :for="`${tool.slug}-client-name`">Client name</label>
                <input :id="`${tool.slug}-client-name`" v-model="form.clientName" autocomplete="off">
              </div>
            </div>

            <div class="form-grid">
              <div class="field">
                <label :for="`${tool.slug}-issuer-details`">Issuer details</label>
                <textarea :id="`${tool.slug}-issuer-details`" v-model="form.issuerDetails" spellcheck="false"></textarea>
              </div>
              <div class="field">
                <label :for="`${tool.slug}-client-details`">Client details</label>
                <textarea :id="`${tool.slug}-client-details`" v-model="form.clientDetails" spellcheck="false"></textarea>
              </div>
            </div>

            <div class="form-grid form-grid--three">
              <div class="field">
                <label :for="`${tool.slug}-number`">Document number</label>
                <input :id="`${tool.slug}-number`" v-model="form.documentNumber" autocomplete="off">
              </div>
              <div class="field">
                <label :for="`${tool.slug}-issue-date`">Issue date</label>
                <input :id="`${tool.slug}-issue-date`" v-model="form.issueDate" type="date">
              </div>
              <div class="field">
                <label :for="`${tool.slug}-due-date`">{{ dueDateLabel }}</label>
                <input :id="`${tool.slug}-due-date`" v-model="form.dueDate" type="date">
              </div>
            </div>

            <div class="field">
              <label :for="`${tool.slug}-items`">Line items: Description | Quantity | Unit price</label>
              <textarea :id="`${tool.slug}-items`" v-model="form.itemsRaw" spellcheck="false"></textarea>
            </div>

            <div class="form-grid form-grid--three">
              <div class="field">
                <label :for="`${tool.slug}-discount`">Discount amount</label>
                <input :id="`${tool.slug}-discount`" v-model="form.discountAmount" inputmode="decimal">
              </div>
              <div class="field">
                <label :for="`${tool.slug}-adjustment-label`">Manual tax/adjustment label</label>
                <input :id="`${tool.slug}-adjustment-label`" v-model="form.adjustmentLabel" autocomplete="off">
              </div>
              <div class="field">
                <label :for="`${tool.slug}-adjustment-amount`">Manual tax/adjustment amount</label>
                <input :id="`${tool.slug}-adjustment-amount`" v-model="form.adjustmentAmount" inputmode="decimal">
              </div>
            </div>

            <div class="field">
              <label :for="`${tool.slug}-terms`">Terms</label>
              <textarea :id="`${tool.slug}-terms`" v-model="form.terms" spellcheck="false"></textarea>
            </div>

            <div class="field">
              <label :for="`${tool.slug}-notes`">Notes</label>
              <textarea :id="`${tool.slug}-notes`" v-model="form.notes" spellcheck="false"></textarea>
            </div>

            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit" :disabled="isRunning">
                {{ shellCopy.runLabel }}
              </button>
              <button :class="getButtonClass('secondary')" type="button" @click="resetExample">
                {{ shellCopy.resetLabel }}
              </button>
              <button :class="getButtonClass('secondary')" type="button" :disabled="isRunning || isDownloading" @click="downloadPdf">
                {{ shellCopy.downloadLabel }}
              </button>
            </div>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
          <h2 :id="`${tool.slug}-result`">{{ resultTitle }}</h2>

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
                <div>
                  <p class="eyebrow">{{ document.title }}</p>
                  <h3>{{ document.documentNumber }}</h3>
                </div>
                <div>
                  <strong>{{ document.issueDate }}</strong>
                  <span>{{ document.dueDateLabel }}: {{ document.dueDate }}</span>
                </div>
              </header>

              <section class="document-preview__parties">
                <div>
                  <strong>From</strong>
                  <p>{{ document.issuerName }}</p>
                  <pre>{{ document.issuerDetails }}</pre>
                </div>
                <div>
                  <strong>{{ tool.kind === 'receipt' ? 'Received from' : 'Bill to' }}</strong>
                  <p>{{ document.clientName }}</p>
                  <pre>{{ document.clientDetails }}</pre>
                </div>
              </section>

              <div class="document-preview__table" role="table" aria-label="Document line items">
                <div class="document-preview__row document-preview__row--head" role="row">
                  <span role="columnheader">Item</span>
                  <span role="columnheader">Qty</span>
                  <span role="columnheader">Unit</span>
                  <span role="columnheader">Total</span>
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
                  <dt>Subtotal</dt>
                  <dd>{{ formatMoney(document.subtotal, document.currency, locale) }}</dd>
                </div>
                <div>
                  <dt>Discount</dt>
                  <dd>{{ formatMoney(document.discountAmount, document.currency, locale) }}</dd>
                </div>
                <div>
                  <dt>{{ document.adjustmentLabel }}</dt>
                  <dd>{{ formatMoney(document.adjustmentAmount, document.currency, locale) }}</dd>
                </div>
                <div class="document-preview__total">
                  <dt>Total</dt>
                  <dd>{{ formatMoney(document.total, document.currency, locale) }}</dd>
                </div>
              </dl>

              <footer class="document-preview__notes">
                <p v-if="document.terms"><strong>Terms:</strong> {{ document.terms }}</p>
                <p v-if="document.notes"><strong>Notes:</strong> {{ document.notes }}</p>
                <p>{{ document.taxGateNote }}</p>
                <p>{{ document.localOnlyNote }}</p>
              </footer>
            </article>
          </template>
        </section>
      </div>

      <aside class="band" :aria-labelledby="`${tool.slug}-scope`">
        <h2 :id="`${tool.slug}-scope`">{{ shellCopy.freeCheckLabel }}</h2>
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
            <dt>Tax/legal gate</dt>
            <dd>Official tax rules, fiscal numbering and payment collection require HUMAN_ACTION_REQUIRED before activation.</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section class="content-layout" :aria-labelledby="`${tool.slug}-guide`">
      <div>
        <h2 :id="`${tool.slug}-guide`">{{ shellCopy.guideTitle }}</h2>
        <article v-for="section in copy.contentSections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
        <section class="content-section" :aria-labelledby="`${tool.slug}-faq`">
          <h3 :id="`${tool.slug}-faq`">{{ shellCopy.faqTitle }}</h3>
          <div class="faq-list">
            <details v-for="item in copy.faq" :key="item.question">
              <summary>{{ item.question }}</summary>
              <p>{{ item.answer }}</p>
            </details>
          </div>
        </section>
      </div>

      <aside class="band" :aria-label="copy.reviewedLabel">
        <h2>{{ copy.reviewedLabel }}</h2>
        <p>{{ shellCopy.contentQualityBody }}</p>
        <div class="inline-link-list">
          <NuxtLink :to="localizedContentPath(locale, 'methodology')">
            {{ shellCopy.methodologyLabel }}
          </NuxtLink>
          <NuxtLink :to="localizedContentPath(locale, 'editorial-policy')">
            {{ shellCopy.editorialLabel }}
          </NuxtLink>
        </div>
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
