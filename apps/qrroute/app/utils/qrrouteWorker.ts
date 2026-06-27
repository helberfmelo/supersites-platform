import { executeQrRouteTool, type QrRouteToolMode, type QrRouteToolResult, type QrRouteToolSlug } from '../data/tools'

export interface QrRouteToolWorkerInput {
  slug: QrRouteToolSlug
  primaryInput: string
  secondaryInput: string
  mode: QrRouteToolMode
}

interface QrRouteToolWorkerResponse {
  ok: boolean
  result?: QrRouteToolResult
  error?: string
}

export function runQrRouteToolInWorker(input: QrRouteToolWorkerInput): Promise<QrRouteToolResult> {
  if (typeof Worker === 'undefined') {
    return executeQrRouteTool(input.slug, input.primaryInput, input.secondaryInput, input.mode)
  }

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/qrroute.worker.ts', import.meta.url), {
      name: 'qrroute-privacy-worker',
      type: 'module',
    })
    const timeout = window.setTimeout(() => {
      worker.terminate()
      reject(new Error('The browser-side worker timed out.'))
    }, 8000)

    worker.onmessage = (event: MessageEvent<QrRouteToolWorkerResponse>) => {
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
