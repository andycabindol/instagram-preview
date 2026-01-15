import React, { createContext, useContext, useState, useEffect } from 'react'
import { getVariantConfig, getStoredVariant, storeVariant } from './index.js'

const VariantContext = createContext(undefined)

export function VariantProvider({ children }) {
  const [variantId, setVariantId] = useState(() => getStoredVariant())
  const [config, setConfig] = useState(() => getVariantConfig(variantId))

  // Update config when variant changes
  useEffect(() => {
    const newConfig = getVariantConfig(variantId)
    setConfig(newConfig)
    storeVariant(variantId)
  }, [variantId])

  const setVariant = (id) => {
    setVariantId(id)
  }

  const isProd = () => variantId === 'prod'
  const isVariant = (id) => variantId === id

  const value = {
    variantId,
    config,
    setVariant,
    isProd,
    isVariant,
  }

  return (
    <VariantContext.Provider value={value}>
      {children}
    </VariantContext.Provider>
  )
}

export function useVariant() {
  const context = useContext(VariantContext)
  if (context === undefined) {
    throw new Error('useVariant must be used within a VariantProvider')
  }
  return context
}
