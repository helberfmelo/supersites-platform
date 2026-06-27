import { sitemapXml } from '../../app/data/routes'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return sitemapXml()
})

