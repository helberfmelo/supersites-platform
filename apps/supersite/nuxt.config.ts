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
          name: 'description',
          content: 'A curated network of useful, privacy-aware web tools.',
        },
      ],
    },
  },
})
