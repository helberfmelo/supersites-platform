export const designTokens = {
  color: {
    text: '#18231f',
    muted: '#46554e',
    background: '#f6f7f2',
    surface: '#ffffff',
    brand: '#254c6a',
    accent: '#9b4f1f',
    success: '#2e8a57',
    warning: '#bd7424',
    border: '#cfd8d3',
    focus: '#1f7a8c',
  },
  radius: {
    control: '8px',
    panel: '8px',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '18px',
    xl: '28px',
  },
  typography: {
    bodyFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    minReadableSize: '0.85rem',
  },
  target: {
    compactPx: 34,
    comfortablePx: 44,
    focusRingPx: 3,
  },
} as const

export type ProgressStatus = 'foundation' | 'planned' | 'blocked'
export type StatusTone = 'success' | 'info' | 'warning' | 'neutral'
export type ButtonTone = 'primary' | 'secondary'

export const componentRecipes = {
  button: {
    baseClass: 'button-link',
    variants: {
      primary: 'button-link',
      secondary: 'button-link button-link--secondary',
    },
    minHeightPx: 40,
  },
  languageSwitcher: {
    rootClass: 'language-nav',
    itemMinHeightPx: designTokens.target.compactPx,
  },
  card: {
    className: 'site-card',
    radius: designTokens.radius.panel,
  },
  statusBadge: {
    baseClass: 'status',
    minHeightPx: 24,
  },
} as const

export function getButtonClass(tone: ButtonTone = 'primary'): string {
  return componentRecipes.button.variants[tone]
}

export function getStatusTone(status: ProgressStatus): StatusTone {
  if (status === 'foundation') {
    return 'success'
  }

  if (status === 'blocked') {
    return 'warning'
  }

  return 'info'
}

export function getStatusBadgeClass(status: ProgressStatus): string[] {
  return [componentRecipes.statusBadge.baseClass, `${componentRecipes.statusBadge.baseClass}--${getStatusTone(status)}`]
}

function flattenTokens(
  value: Record<string, unknown>,
  path: string[] = [],
  result: Record<string, string> = {},
): Record<string, string> {
  for (const [key, nestedValue] of Object.entries(value)) {
    const nextPath = [...path, key]

    if (typeof nestedValue === 'string' || typeof nestedValue === 'number') {
      result[`--ss-${nextPath.join('-')}`] = String(nestedValue)
    } else if (nestedValue && typeof nestedValue === 'object') {
      flattenTokens(nestedValue as Record<string, unknown>, nextPath, result)
    }
  }

  return result
}

export function createCssVariableMap(): Record<string, string> {
  return flattenTokens(designTokens)
}
