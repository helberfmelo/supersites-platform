import {
  executeInvoiceCraftTool,
  type InvoiceCraftDocumentInput,
  type InvoiceCraftToolMode,
  type InvoiceCraftToolSlug,
} from '../data/tools'
import type { LocaleCode } from '../data/locales'

interface InvoiceCraftToolWorkerRequest {
  slug: InvoiceCraftToolSlug
  input: InvoiceCraftDocumentInput
  mode: InvoiceCraftToolMode
  locale: LocaleCode
}

self.addEventListener('message', async (event: MessageEvent<InvoiceCraftToolWorkerRequest>) => {
  try {
    const result = await executeInvoiceCraftTool(
      event.data.slug,
      event.data.input,
      event.data.mode,
      event.data.locale,
    )

    self.postMessage({ ok: true, result })
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error instanceof Error ? error.message : 'Tool execution failed.',
    })
  }
})
