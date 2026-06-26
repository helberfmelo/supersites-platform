import { describe, expect, it } from 'vitest'
import { siteCatalog } from '../app/data/sites'

describe('site catalog', () => {
  it('lists the ten utility sites', () => {
    expect(siteCatalog).toHaveLength(10)
  })

  it('keeps the first build focused on NetProbe Atlas', () => {
    expect(siteCatalog[0]).toMatchObject({
      slug: 'netprobe-atlas',
      status: 'foundation',
    })
  })

  it('documents free value and upgrade value for every site', () => {
    for (const site of siteCatalog) {
      expect(site.freeValue.length).toBeGreaterThan(12)
      expect(site.upgrade.length).toBeGreaterThan(12)
    }
  })
})
