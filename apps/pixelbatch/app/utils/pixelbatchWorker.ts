import {
  planPixelBatchTransform,
  type PixelBatchToolInput,
  type PixelBatchToolResult,
  type PixelBatchToolSlug,
} from '../data/tools'

export interface PixelBatchToolWorkerInput {
  slug: PixelBatchToolSlug
  input: PixelBatchToolInput
}

interface PixelBatchToolWorkerResponse {
  ok: boolean
  result?: PixelBatchToolResult
  error?: string
}

export function runPixelBatchToolInWorker(input: PixelBatchToolWorkerInput): Promise<PixelBatchToolResult> {
  if (typeof Worker === 'undefined') {
    return Promise.resolve(planPixelBatchTransform(input.slug, input.input, false))
  }

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/pixelbatch.worker.ts', import.meta.url), {
      name: 'pixelbatch-plan-worker',
      type: 'module',
    })
    const timeout = window.setTimeout(() => {
      worker.terminate()
      reject(new Error('The browser-side image worker timed out.'))
    }, 8000)

    worker.onmessage = (event: MessageEvent<PixelBatchToolWorkerResponse>) => {
      window.clearTimeout(timeout)
      worker.terminate()

      if (event.data.ok && event.data.result) {
        resolve(event.data.result)
        return
      }

      reject(new Error(event.data.error ?? 'The browser-side image worker failed.'))
    }

    worker.onerror = (event) => {
      window.clearTimeout(timeout)
      worker.terminate()
      reject(new Error(event.message || 'The browser-side image worker failed.'))
    }

    worker.postMessage(input)
  })
}
