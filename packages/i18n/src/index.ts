export const localeCodes = ['en', 'pt-br', 'es', 'fr', 'de'] as const

export type LocaleCode = (typeof localeCodes)[number]

export interface LocaleDefinition {
  code: LocaleCode
  label: string
  shortLabel: string
  htmlLang: string
  hreflang: string
  intlLocale: string
  textDirection: 'ltr'
}

export interface LanguageOption {
  code: LocaleCode
  label: string
  shortLabel: string
  href: string
  current: boolean
}

export const defaultLocale: LocaleCode = 'en'

export const locales: readonly LocaleDefinition[] = [
  { code: 'en', label: 'English', shortLabel: 'EN', htmlLang: 'en', hreflang: 'en', intlLocale: 'en-US', textDirection: 'ltr' },
  { code: 'pt-br', label: 'Português', shortLabel: 'PT-BR', htmlLang: 'pt-BR', hreflang: 'pt-BR', intlLocale: 'pt-BR', textDirection: 'ltr' },
  { code: 'es', label: 'Español', shortLabel: 'ES', htmlLang: 'es', hreflang: 'es', intlLocale: 'es-ES', textDirection: 'ltr' },
  { code: 'fr', label: 'Français', shortLabel: 'FR', htmlLang: 'fr', hreflang: 'fr', intlLocale: 'fr-FR', textDirection: 'ltr' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE', htmlLang: 'de', hreflang: 'de', intlLocale: 'de-DE', textDirection: 'ltr' },
]

const localeSet = new Set<string>(localeCodes)
const localeDefinitionByCode = new Map(locales.map((locale) => [locale.code, locale]))

export function isLocaleCode(value: unknown): value is LocaleCode {
  return typeof value === 'string' && localeSet.has(value)
}

export function normalizeLocale(value: unknown): LocaleCode | null {
  if (typeof value !== 'string') {
    return null
  }

  const normalized = value.trim().replace('_', '-').toLowerCase()

  return isLocaleCode(normalized) ? normalized : null
}

export function getLocaleDefinition(locale: LocaleCode): LocaleDefinition {
  const definition = localeDefinitionByCode.get(locale)

  if (!definition) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  return definition
}

export function toHreflang(locale: LocaleCode): string {
  return getLocaleDefinition(locale).hreflang
}

export function toHtmlLang(locale: LocaleCode): string {
  return getLocaleDefinition(locale).htmlLang
}

export function toIntlLocale(locale: LocaleCode): string {
  return getLocaleDefinition(locale).intlLocale
}

function normalizePathSegment(segment: string | number): string {
  return String(segment).trim().replace(/^\/+|\/+$/g, '')
}

export function localizedPath(
  locale: LocaleCode,
  ...segments: Array<string | number | null | undefined>
): string {
  const path = segments
    .filter((segment): segment is string | number => segment !== null && segment !== undefined)
    .flatMap((segment) => normalizePathSegment(segment).split('/'))
    .map((segment) => normalizePathSegment(segment))
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return path ? `/${locale}/${path}` : `/${locale}`
}

export function localizedHomePath(locale: LocaleCode): string {
  return localizedPath(locale)
}

export function localizedSitePath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, 'sites', slug)
}

export function localizedLegalPath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, slug)
}

export function buildLanguageOptions(
  currentLocale: LocaleCode,
  pathForLocale: (locale: LocaleCode) => string,
): LanguageOption[] {
  return locales.map((locale) => ({
    code: locale.code,
    label: locale.label,
    shortLabel: locale.shortLabel,
    href: pathForLocale(locale.code),
    current: locale.code === currentLocale,
  }))
}

export function formatDate(
  value: Date | string | number,
  locale: LocaleCode,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
): string {
  return new Intl.DateTimeFormat(toIntlLocale(locale), options).format(new Date(value))
}

export function formatNumber(
  value: number,
  locale: LocaleCode,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(toIntlLocale(locale), options).format(value)
}

export function formatCurrency(
  value: number,
  locale: LocaleCode,
  currency: string,
  options: Intl.NumberFormatOptions = {},
): string {
  return formatNumber(value, locale, {
    style: 'currency',
    currency,
    ...options,
  })
}
