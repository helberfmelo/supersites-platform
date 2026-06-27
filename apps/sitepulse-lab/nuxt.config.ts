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
  runtimeConfig: {
    public: {
      sitepulseApiBaseUrl: process.env.NUXT_PUBLIC_SITEPULSE_API_BASE_URL ?? '/api/v1/sitepulse',
    },
  },
  app: {
    baseURL: normalizeBaseURL(process.env.NUXT_APP_BASE_URL),
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'SitePulse Lab',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'Bounded website status, redirects, headers, robots, sitemap and TTFB checks.',
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
