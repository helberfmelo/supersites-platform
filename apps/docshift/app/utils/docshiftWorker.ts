import {
  planDocShiftTransform,
  type DocShiftToolInput,
  type DocShiftToolResult,
  type DocShiftToolSlug,
} from '../data/tools'

export interface DocShiftToolWorkerInput {
  slug: DocShiftToolSlug
  input: DocShiftToolInput
}

interface DocShiftToolWorkerResponse {
  ok: boolean
  result?: DocShiftToolResult
  error?: string
}

export function runDocShiftToolInWorker(input: DocShiftToolWorkerInput): Promise<DocShiftToolResult> {
  if (typeof Worker === 'undefined') {
    return Promise.resolve(planDocShiftTransform(input.slug, input.input, false))
  }

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/docshift.worker.ts', import.meta.url), {
      name: 'docshift-plan-worker',
      type: 'module',
    })
    const timeout = window.setTimeout(() => {
      worker.terminate()
      reject(new Error('The browser-side document worker timed out.'))
    }, 8000)

    worker.onmessage = (event: MessageEvent<DocShiftToolWorkerResponse>) => {
      window.clearTimeout(timeout)
      worker.terminate()

      if (event.data.ok && event.data.result) {
        resolve(event.data.result)
        return
      }

      reject(new Error(event.data.error ?? 'The browser-side document worker failed.'))
    }

    worker.onerror = (event) => {
      window.clearTimeout(timeout)
      worker.terminate()
      reject(new Error(event.message || 'The browser-side document worker failed.'))
    }

    worker.postMessage(input)
  })
}
