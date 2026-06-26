import { executeTimeTool, type TimeToolMode, type TimeToolResult, type TimeToolSlug } from '../data/tools'

export interface TimeToolWorkerInput {
  slug: TimeToolSlug
  primaryInput: string
  secondaryInput: string
  mode: TimeToolMode
}

interface TimeToolWorkerResponse {
  ok: boolean
  result?: TimeToolResult
  error?: string
}

export function runTimeToolInWorker(input: TimeToolWorkerInput): Promise<TimeToolResult> {
  if (typeof Worker === 'undefined') {
    return executeTimeTool(input.slug, input.primaryInput, input.secondaryInput, input.mode)
  }

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/timenexus.worker.ts', import.meta.url), {
      name: 'timenexus-privacy-worker',
      type: 'module',
    })
    const timeout = window.setTimeout(() => {
      worker.terminate()
      reject(new Error('The browser-side worker timed out.'))
    }, 8000)

    worker.onmessage = (event: MessageEvent<TimeToolWorkerResponse>) => {
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
