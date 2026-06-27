import { executeQrRouteTool, type QrRouteToolMode, type QrRouteToolSlug } from '../data/tools'

interface QrRouteToolWorkerRequest {
  slug: QrRouteToolSlug
  primaryInput: string
  secondaryInput: string
  mode: QrRouteToolMode
}

self.addEventListener('message', async (event: MessageEvent<QrRouteToolWorkerRequest>) => {
  try {
    const result = await executeQrRouteTool(
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
