import { executeTool, type ToolMode, type ToolSlug } from '../data/tools'

interface ToolWorkerRequest {
  slug: ToolSlug
  primaryInput: string
  secondaryInput: string
  mode: ToolMode
}

self.addEventListener('message', async (event: MessageEvent<ToolWorkerRequest>) => {
  try {
    const result = await executeTool(
      event.data.slug,
      event.data.primaryInput,
      event.data.secondaryInput,
      event.data.mode,
    )

    self.postMessage({ ok: true, result })
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error instanceof Error ? error.message : 'Tool execution failed.',
    })
  }
})
