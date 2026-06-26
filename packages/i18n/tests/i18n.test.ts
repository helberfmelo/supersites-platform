import { describe, expect, it } from 'vitest'
import {
  buildLanguageOptions,
  formatCurrency,
  formatNumber,
  localeCodes,
  localizedLegalPath,
  localizedSitePath,
  normalizeLocale,
  toHreflang,
  toHtmlLang,
} from '../src'

describe('@supersites/i18n', () => {
  it('keeps the initial AdSense-supported locale set stable', () => {
    expect(localeCodes).toEqual(['en', 'pt-br', 'es', 'fr', 'de'])
    expect(toHtmlLang('pt-br')).toBe('pt-BR')
    expect(toHreflang('pt-br')).toBe('pt-BR')
  })

  it('normalizes locale params from routes and browser hints', () => {
    expect(normalizeLocale('PT-BR')).toBe('pt-br')
    expect(normalizeLocale('pt_BR')).toBe('pt-br')
    expect(normalizeLocale('it')).toBeNull()
    expect(normalizeLocale(undefined)).toBeNull()
  })

  it('builds localized paths for catalog pages', () => {
    expect(localizedSitePath('de', 'docshift')).toBe('/de/sites/docshift')
    expect(localizedLegalPath('fr', 'privacy')).toBe('/fr/privacy')
  })

  it('creates language selector options without redirects by IP', () => {
    const options = buildLanguageOptions('en', (locale) => localizedSitePath(locale, 'netprobe-atlas'))

    expect(options).toHaveLength(localeCodes.length)
    expect(options.find((option) => option.code === 'en')).toMatchObject({
      href: '/en/sites/netprobe-atlas',
      current: true,
    })
  })

  it('formats numbers and money with locale-aware Intl settings', () => {
    expect(formatNumber(1234.5, 'en')).toContain('1,234')
    expect(formatCurrency(25, 'pt-br', 'BRL')).toContain('R$')
  })
})
