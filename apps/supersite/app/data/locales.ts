export const localeCodes = ['en', 'pt-br', 'es', 'fr', 'de'] as const

export type LocaleCode = (typeof localeCodes)[number]

export interface LocaleDefinition {
  code: LocaleCode
  label: string
  shortLabel: string
}

export const defaultLocale: LocaleCode = 'en'

export const locales: LocaleDefinition[] = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'pt-br', label: 'Português', shortLabel: 'PT-BR' },
  { code: 'es', label: 'Español', shortLabel: 'ES' },
  { code: 'fr', label: 'Français', shortLabel: 'FR' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE' },
]

export function isLocaleCode(value: string | undefined): value is LocaleCode {
  return localeCodes.includes(value as LocaleCode)
}

export function normalizeLocale(value: string | undefined): LocaleCode | null {
  const normalized = value?.toLowerCase()

  return isLocaleCode(normalized) ? normalized : null
}

export function localizedHomePath(locale: LocaleCode): string {
  return `/${locale}`
}

export function localizedSitePath(locale: LocaleCode, slug: string): string {
  return `/${locale}/sites/${slug}`
}

export function localizedLegalPath(locale: LocaleCode, slug: string): string {
  return `/${locale}/${slug}`
}
