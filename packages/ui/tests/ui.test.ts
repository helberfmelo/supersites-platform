import { describe, expect, it } from 'vitest'
import {
  componentRecipes,
  createCssVariableMap,
  designTokens,
  getButtonClass,
  getStatusBadgeClass,
  getStatusTone,
} from '../src'

describe('@supersites/ui', () => {
  it('keeps accessible target and focus token defaults', () => {
    expect(designTokens.target.comfortablePx).toBeGreaterThanOrEqual(44)
    expect(designTokens.target.focusRingPx).toBeGreaterThanOrEqual(3)
    expect(componentRecipes.languageSwitcher.itemMinHeightPx).toBeGreaterThanOrEqual(34)
  })

  it('maps product statuses to reusable badge tones', () => {
    expect(getStatusTone('foundation')).toBe('success')
    expect(getStatusTone('planned')).toBe('info')
    expect(getStatusTone('blocked')).toBe('warning')
    expect(getStatusBadgeClass('foundation')).toEqual(['status', 'status--success'])
  })

  it('exposes stable button classes for Vue components', () => {
    expect(getButtonClass()).toBe('button-link')
    expect(getButtonClass('secondary')).toBe('button-link button-link--secondary')
  })

  it('can flatten tokens into CSS variables', () => {
    const variables = createCssVariableMap()

    expect(variables['--ss-color-brand']).toBe('#254c6a')
    expect(variables['--ss-radius-control']).toBe('8px')
  })
})
