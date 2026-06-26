import { executeTimeTool, type TimeToolMode, type TimeToolSlug } from '../data/tools'

interface TimeToolWorkerRequest {
  slug: TimeToolSlug
  primaryInput: string
  secondaryInput: string
  mode: TimeToolMode
}

self.addEventListener('message', async (event: MessageEvent<TimeToolWorkerRequest>) => {
  try {
    const result = await executeTimeTool(
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
