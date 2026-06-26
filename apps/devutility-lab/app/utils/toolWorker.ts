import { executeTool, type ToolMode, type ToolResult, type ToolSlug } from '../data/tools'

export interface ToolWorkerInput {
  slug: ToolSlug
  primaryInput: string
  secondaryInput: string
  mode: ToolMode
}

interface ToolWorkerResponse {
  ok: boolean
  result?: ToolResult
  error?: string
}

export function runToolInWorker(input: ToolWorkerInput): Promise<ToolResult> {
  if (typeof Worker === 'undefined') {
    return executeTool(input.slug, input.primaryInput, input.secondaryInput, input.mode)
  }

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/devutility.worker.ts', import.meta.url), {
      name: 'devutility-privacy-worker',
      type: 'module',
    })
    const timeout = window.setTimeout(() => {
      worker.terminate()
      reject(new Error('The browser-side worker timed out.'))
    }, 8000)

    worker.onmessage = (event: MessageEvent<ToolWorkerResponse>) => {
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
