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
      mailhealthApiBaseUrl: process.env.NUXT_PUBLIC_MAILHEALTH_API_BASE_URL ?? '/api/v1/mailhealth',
    },
  },
  app: {
    baseURL: normalizeBaseURL(process.env.NUXT_APP_BASE_URL),
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'MailHealth',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'Email authentication, DNS, SMTP and header checks with privacy-first workflow boundaries.',
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
