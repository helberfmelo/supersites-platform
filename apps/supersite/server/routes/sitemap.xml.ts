import { createSitemapXml } from '@supersites/seo'
import { contentPrerenderRoutes, siteBaseUrl } from '../../app/data/routes'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return createSitemapXml(
    siteBaseUrl,
    contentPrerenderRoutes.map((path) => ({ path })),
  )
})
