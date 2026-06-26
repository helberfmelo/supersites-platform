import {
  buildLanguageOptions,
  defaultLocale,
  getLocaleDefinition,
  isLocaleCode,
  localizedHomePath,
  localizedPath,
  normalizeLocale,
  formatCurrency,
  formatNumber,
  toHreflang,
  toHtmlLang,
  toIntlLocale,
  type LocaleCode,
} from '@supersites/i18n'

export {
  buildLanguageOptions,
  defaultLocale,
  getLocaleDefinition,
  isLocaleCode,
  localizedHomePath,
  localizedPath,
  normalizeLocale,
  formatCurrency,
  formatNumber,
  toHreflang,
  toHtmlLang,
  toIntlLocale,
  type LanguageOption,
  type LocaleCode,
} from '@supersites/i18n'

export const publicLocaleCodes = ['en', 'pt-br', 'es', 'fr', 'de'] satisfies LocaleCode[]

export function isPublicLocaleCode(value: unknown): value is LocaleCode {
  return isLocaleCode(value) && publicLocaleCodes.includes(value)
}

export function normalizePublicLocale(value: unknown): LocaleCode | null {
  const locale = normalizeLocale(value)

  return locale && isPublicLocaleCode(locale) ? locale : null
}

export function localizedCalculatorPath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, 'calculators', slug)
}

export function localizedContentPath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, slug)
}
