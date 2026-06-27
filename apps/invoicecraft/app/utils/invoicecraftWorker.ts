import {
  executeInvoiceCraftTool,
  type InvoiceCraftDocumentInput,
  type InvoiceCraftToolMode,
  type InvoiceCraftToolResult,
  type InvoiceCraftToolSlug,
} from '../data/tools'
import type { LocaleCode } from '../data/locales'

export interface InvoiceCraftToolWorkerInput {
  slug: InvoiceCraftToolSlug
  input: InvoiceCraftDocumentInput
  mode: InvoiceCraftToolMode
  locale: LocaleCode
}

interface InvoiceCraftToolWorkerResponse {
  ok: boolean
  result?: InvoiceCraftToolResult
  error?: string
}

export function runInvoiceCraftToolInWorker(input: InvoiceCraftToolWorkerInput): Promise<InvoiceCraftToolResult> {
  if (typeof Worker === 'undefined') {
    return executeInvoiceCraftTool(input.slug, input.input, input.mode, input.locale)
  }

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/invoicecraft.worker.ts', import.meta.url), {
      name: 'invoicecraft-privacy-worker',
      type: 'module',
    })
    const timeout = window.setTimeout(() => {
      worker.terminate()
      reject(new Error('The browser-side worker timed out.'))
    }, 8000)

    worker.onmessage = (event: MessageEvent<InvoiceCraftToolWorkerResponse>) => {
      window.clearTimeout(timeout)
      worker.terminate()

      if (event.data.ok && event.data.result) {
        resolve(event.data.result)
        return
      }

      reject(new Error(event.data.error ?? 'The browser-side worker failed.'))
    }

    worker.onerror = (event) => {
      window.clearTimeout(timeout)
      worker.terminate()
      reject(new Error(event.message || 'The browser-side worker failed.'))
    }

    worker.postMessage(input)
  })
}
