import {
  buildLanguageOptions,
  defaultLocale,
  formatNumber,
  getLocaleDefinition,
  isLocaleCode,
  localizedHomePath,
  localizedPath,
  normalizeLocale,
  sanitizePublicCopy,
  toHreflang,
  toHtmlLang,
  toIntlLocale,
  type LocaleCode,
} from '@supersites/i18n'

export {
  buildTrustPageCopy,
  buildLanguageOptions,
  defaultLocale,
  formatNumber,
  getLocaleDefinition,
  isLocaleCode,
  localizedHomePath,
  localizedPath,
  normalizeLocale,
  sanitizePublicCopy,
  toHreflang,
  toHtmlLang,
  toIntlLocale,
  type LanguageOption,
  type LocaleCode,
  type TrustPageCopyShape,
  type TrustPageSlug,
  type TrustSupportProfile,
} from '@supersites/i18n'

export const publicLocaleCodes = ['en', 'pt-br', 'es', 'fr', 'de'] satisfies LocaleCode[]

export function isPublicLocaleCode(value: unknown): value is LocaleCode {
  return isLocaleCode(value) && publicLocaleCodes.includes(value)
}

export function normalizePublicLocale(value: unknown): LocaleCode | null {
  const locale = normalizeLocale(value)

  return locale && isPublicLocaleCode(locale) ? locale : null
}

export function localizedToolPath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, 'tools', slug)
}

export function localizedWorldClockPath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, 'world-clock', slug)
}

export function localizedContentPath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, slug)
}

export const defaultPublicLocale = defaultLocale
