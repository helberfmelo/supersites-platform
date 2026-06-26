import { prerenderRoutes } from './app/data/routes'

export default defineNuxtConfig({
  compatibilityDate: '2026-06-26',
  devtools: { enabled: false },
  ssr: true,
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'SuperSites',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'A curated network of useful, privacy-aware web tools.',
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
