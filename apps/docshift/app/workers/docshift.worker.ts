import {
  planDocShiftTransform,
  type DocShiftToolInput,
  type DocShiftToolSlug,
} from '../data/tools'

interface DocShiftToolWorkerRequest {
  slug: DocShiftToolSlug
  input: DocShiftToolInput
}

self.addEventListener('message', (event: MessageEvent<DocShiftToolWorkerRequest>) => {
  try {
    const result = planDocShiftTransform(
      event.data.slug,
      event.data.input,
      true,
    )

    self.postMessage({ ok: true, result })
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error instanceof Error ? error.message : 'Document planning failed.',
    })
  }
})
