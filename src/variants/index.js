import { prodConfig } from './prod'
import { v1Config } from './v1'
import { v2Config } from './v2'
import { v3Config } from './v3'
import { v4Config } from './v4'

/**
 * Deep merge utility for combining config objects
 */
function deepMerge(base, override) {
  const result = { ...base }
  
  for (const key in override) {
    if (override[key] !== undefined) {
      if (
        typeof override[key] === 'object' &&
        override[key] !== null &&
        !Array.isArray(override[key]) &&
        typeof base[key] === 'object' &&
        base[key] !== null &&
        !Array.isArray(base[key])
      ) {
        result[key] = deepMerge(base[key], override[key])
      } else {
        result[key] = override[key]
      }
    }
  }
  
  return result
}

/**
 * Get variant-specific config overrides
 */
function getVariantOverride(variantId) {
  switch (variantId) {
    case 'prod':
      return {}
    case 'v1':
      return v1Config
    case 'v2':
      return v2Config
    case 'v3':
      return v3Config
    case 'v4':
      return v4Config
    default:
      return {}
  }
}

/**
 * Get the complete config for a variant
 * Merges Prod base config with variant-specific overrides
 */
export function getVariantConfig(variantId) {
  const override = getVariantOverride(variantId)
  return deepMerge(prodConfig, override)
}

/**
 * Get default variant from localStorage or return 'prod'
 */
export function getStoredVariant() {
  if (typeof window === 'undefined') return 'prod'
  
  const stored = localStorage.getItem('prototype-variant')
  if (stored && ['prod', 'v1', 'v2', 'v3', 'v4'].includes(stored)) {
    return stored
  }
  return 'prod'
}

/**
 * Store variant selection in localStorage
 */
export function storeVariant(variantId) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('prototype-variant', variantId)
  }
}
