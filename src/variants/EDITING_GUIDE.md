# Editing Variants - Quick Guide

## Recommended Workflow

### 1. **Adding New Features (Affects All Variants)**

**Step 1:** Add the new field to `types.ts`
```typescript
export interface VariantConfig {
  // ... existing fields
  enableNewFeature: boolean  // Add here
}
```

**Step 2:** Set default in `prod.ts`
```typescript
export const prodConfig: VariantConfig = {
  // ... existing fields
  enableNewFeature: true,  // Default for Prod
}
```

**Step 3:** Override in specific variants if needed
```typescript
// In v1.ts (if you want to disable it)
export const v1Config = {
  enableNewFeature: false,
}
```

**Result:** All variants inherit the new field automatically. Only override where needed.

---

### 2. **Editing Individual Variants**

Each variant file is small and isolated. Edit directly:

**`src/variants/v1.ts`** - No editing variant
```typescript
export const v1Config = {
  canEdit: false,
  showEditToolbar: false,
  // Add more overrides as needed
}
```

**`src/variants/v2.ts`** - Cropping & cover
```typescript
export const v2Config = {
  enableCropping: true,
  enableCoverSelection: true,
  showCroppingTools: true,
  showCoverSelectionUI: true,
  // Add more overrides as needed
}
```

**`src/variants/v3.ts`** - Cover top
```typescript
export const v3Config = {
  enableCoverSelection: true,
  showCoverSelectionUI: true,
  coverSelectionMode: "top",
  // Add more overrides as needed
}
```

**`src/variants/v4.ts`** - Cover bottom
```typescript
export const v4Config = {
  enableCoverSelection: true,
  showCoverSelectionUI: true,
  coverSelectionMode: "bottom",
  // Add more overrides as needed
}
```

---

### 3. **Using Variants in Components**

**In any component:**
```javascript
import { useVariant } from '../variants/VariantProvider'

function MyComponent() {
  const { config, variantId, isProd, isVariant } = useVariant()
  
  // Check capabilities
  if (!config.canEdit) {
    return <div>Editing disabled</div>
  }
  
  // Conditional rendering
  return (
    <div>
      {config.showCroppingTools && <CroppingTool />}
      {config.showCoverSelectionUI && (
        <CoverSelector mode={config.coverSelectionMode} />
      )}
    </div>
  )
}
```

---

## Best Practices

### ✅ DO:
1. **Always edit Prod first** when adding new features
2. **Keep variant files small** - only override what differs
3. **Use config flags** instead of duplicating components
4. **Test Prod first**, then test variants
5. **Add comments** in variant files explaining the override

### ❌ DON'T:
1. **Don't copy Prod config** into variants
2. **Don't duplicate components** per variant
3. **Don't add variant-specific logic** in main components (use config instead)
4. **Don't forget to update types.ts** when adding new fields

---

## Quick Reference

### Files to Edit:

| What You Want To Do | File to Edit |
|---------------------|--------------|
| Add a new feature flag | `variants/types.ts` + `variants/prod.ts` |
| Disable feature in v1 | `variants/v1.ts` |
| Enable cropping in v2 | `variants/v2.ts` (already done) |
| Change cover mode | `variants/v3.ts` or `v4.ts` |
| Use variant in component | Import `useVariant()` hook |

### Common Patterns:

**Pattern 1: Feature exists in Prod, disable in variant**
```typescript
// prod.ts
enableFeature: true

// v1.ts
enableFeature: false
```

**Pattern 2: Feature disabled in Prod, enable in variant**
```typescript
// prod.ts
enableFeature: false

// v2.ts
enableFeature: true
```

**Pattern 3: Feature with different modes**
```typescript
// prod.ts
featureMode: "default"

// v3.ts
featureMode: "advanced"
```

---

## Example: Adding a New Feature

Let's say you want to add "Filters" capability:

**1. Update `types.ts`:**
```typescript
export interface VariantConfig {
  // ... existing
  enableFilters: boolean
  showFilterToolbar: boolean
}
```

**2. Update `prod.ts`:**
```typescript
export const prodConfig = {
  // ... existing
  enableFilters: true,
  showFilterToolbar: true,
}
```

**3. Override in `v1.ts` (if v1 shouldn't have filters):**
```typescript
export const v1Config = {
  // ... existing
  enableFilters: false,
  showFilterToolbar: false,
}
```

**4. Use in component:**
```javascript
const { config } = useVariant()
{config.showFilterToolbar && <FilterToolbar />}
```

**Result:** 
- Prod, v2, v3, v4 have filters ✅
- v1 doesn't have filters ✅
- No code duplication ✅

---

## Testing Workflow

1. **Start with Prod** - Make sure it works
2. **Switch to v1** - Test no-editing behavior
3. **Switch to v2** - Test cropping & cover
4. **Switch to v3** - Test cover top
5. **Switch to v4** - Test cover bottom
6. **Switch back to Prod** - Verify everything still works

Use the dropdown menu (click Instagram logo) to switch variants quickly.

---

## Troubleshooting

**Q: My changes aren't showing up**
- Check if you updated `types.ts` when adding new fields
- Make sure you're using `useVariant().config` in components
- Refresh the page (localStorage might cache old config)

**Q: Variant inherits something I don't want**
- Override it in the variant file (e.g., `v1.ts`)
- Set it to `false` or the desired value

**Q: I want to add variant-specific UI**
- Add a config flag in `types.ts`
- Set default in `prod.ts`
- Override in variant file
- Check flag in component: `if (config.myFlag) { ... }`
