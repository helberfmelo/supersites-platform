import {
  planPixelBatchTransform,
  type PixelBatchToolInput,
  type PixelBatchToolSlug,
} from '../data/tools'

interface PixelBatchToolWorkerRequest {
  slug: PixelBatchToolSlug
  input: PixelBatchToolInput
}

self.addEventListener('message', (event: MessageEvent<PixelBatchToolWorkerRequest>) => {
  try {
    const result = planPixelBatchTransform(
      event.data.slug,
      event.data.input,
      true,
    )

    self.postMessage({ ok: true, result })
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error instanceof Error ? error.message : 'Image planning failed.',
    })
  }
})
