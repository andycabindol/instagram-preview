# Prototype Variants System

## Overview

This variant system allows you to create multiple prototype versions (v1–v4) that extend from the base "Prod" configuration. Changes to Prod automatically flow to all variants, and each variant only needs to override what differs.

## Architecture

### Base Flow
- **Prod** (`variants/prod.ts`) is the single source of truth
- Variants (`variants/v1.ts`, `v2.ts`, etc.) export **partial overrides only**
- `getVariantConfig()` deep-merges Prod + variant overrides
- All variant configs are computed at runtime, not copied

### Key Files

```
variants/
├── types.ts          # VariantId type and VariantConfig interface
├── index.ts          # getVariantConfig(), deep merge, localStorage helpers
├── prod.ts           # Base Prod configuration (single source of truth)
├── v1.ts             # v1 overrides (no editing)
├── v2.ts             # v2 overrides (cropping & cover)
├── v3.ts             # v3 overrides (cover top selection)
├── v4.ts             # v4 overrides (cover bottom selection)
├── VariantProvider.jsx  # React context provider
└── README.md         # This file
```

## How Prod Flows into Variants

1. **Prod defines the base**: All capabilities are defined in `prod.ts`
2. **Variants override selectively**: Each variant file exports only what changes
3. **Deep merge combines them**: `getVariantConfig('v2')` merges `prodConfig + v2Config`
4. **No manual syncing**: When you add a new field to Prod, all variants inherit it automatically

### Example

```typescript
// prod.ts
export const prodConfig = {
  canEdit: true,
  enableCropping: false,
  // ... other fields
}

// v1.ts (only overrides what differs)
export const v1Config = {
  canEdit: false,  // Override: disable editing
  // All other fields inherit from Prod
}

// Result: v1 has canEdit: false, enableCropping: false (from Prod)
```

## How to Add a v5

1. **Create `variants/v5.ts`**:
```typescript
import { Partial<VariantConfig> } from './types'

export const v5Config: Partial<VariantConfig> = {
  // Only override what differs from Prod
  enableCropping: true,
  coverSelectionMode: "top",
}
```

2. **Add to `variants/index.ts`**:
```typescript
import { v5Config } from './v5'

function getVariantOverride(variantId: VariantId): Partial<VariantConfig> {
  switch (variantId) {
    // ... existing cases
    case 'v5':
      return v5Config
    default:
      return {}
  }
}
```

3. **Update `variants/types.ts`**:
```typescript
export type VariantId = "prod" | "v1" | "v2" | "v3" | "v4" | "v5"
```

4. **Add to menu in `Screen1Feed.jsx`** (if using the existing menu)

## Where to Put Variant-Specific Code

### Config-Driven (Preferred)
- Add flags to `VariantConfig` in `types.ts`
- Override flags in variant files
- Use `useVariant().config` to check flags in components

### Component-Level (When Needed)
- Use `useVariant()` hook in components
- Conditionally render based on `config` flags
- Example:
```typescript
const { config } = useVariant()
if (!config.canEdit) {
  return <div>Editing disabled</div>
}
```

### Screen-Level
- Pass `config` as props to screens that need variant behavior
- Or use `useVariant()` directly in screen components

## Usage Examples

### In a Component
```typescript
import { useVariant } from '../variants/VariantProvider'

function EditScreen() {
  const { config, isProd, isVariant } = useVariant()
  
  if (!config.canEdit) {
    return <div>Editing not available</div>
  }
  
  return (
    <div>
      {config.showCroppingTools && <CroppingTool />}
      {config.showCoverSelectionUI && <CoverSelector mode={config.coverSelectionMode} />}
    </div>
  )
}
```

### In App.jsx
```typescript
import { VariantProvider } from './variants/VariantProvider'

function App() {
  return (
    <VariantProvider>
      {/* Your app */}
    </VariantProvider>
  )
}
```

## Best Practices

1. **Always extend Prod**: Never copy Prod config into variants
2. **Override minimally**: Only specify what differs in variant files
3. **Use config flags**: Prefer boolean flags over branching entire components
4. **Keep variants small**: Each variant file should be < 20 lines
5. **Test Prod first**: Make sure Prod works before testing variants

## Adding New Config Fields

1. Add to `VariantConfig` interface in `types.ts`
2. Add default value to `prodConfig` in `prod.ts`
3. Variants automatically inherit the new field
4. Override in specific variants if needed
