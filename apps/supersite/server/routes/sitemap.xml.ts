import { createSitemapIndexXml } from '@supersites/seo'
import { siteBaseUrl } from '../../app/data/routes'
import { siteCatalog } from '../../app/data/sites'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return createSitemapIndexXml([
    { url: `${siteBaseUrl}/sitemap-hub.xml` },
    ...siteCatalog.map((site) => ({ url: `${siteBaseUrl}/${site.slug}/sitemap.xml` })),
  ])
})
