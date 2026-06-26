import { prerenderRoutes } from './app/data/routes'

function normalizeBaseURL(value: string | undefined): string {
  const normalized = (value ?? '/').trim()

  if (!normalized || normalized === '/') {
    return '/'
  }

  return `/${normalized.replace(/^\/+|\/+$/g, '')}/`
}

export default defineNuxtConfig({
  compatibilityDate: '2026-06-26',
  devtools: { enabled: false },
  ssr: true,
  app: {
    baseURL: normalizeBaseURL(process.env.NUXT_APP_BASE_URL),
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'DevUtility Lab',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'Browser-side developer utilities for formatting, encoding, inspection and time conversion.',
        },
      ],
    },
  },
  nitro: {
    prerender: {
      concurrency: 1,
      routes: prerenderRoutes,
    },
  },
})
