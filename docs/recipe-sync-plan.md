# Recipe-Showcase Synchronization Plan

## Problem Statement

Currently, showcase examples and initialized recipe sites are **partially decoupled**:
- Recipes define what sites *should* look like (in `recipes/index.ts`)
- Showcases show what sites *could* look like (in `pages/showcase/examples/`)
- But showcases **don't use the shared components** or follow the recipe config

This creates:
- **1000+ lines of duplicated CSS** across 5+ showcase files
- **50-100 lines of duplicated JS** (fade-in animations) per showcase
- **Hardcoded colors/fonts** instead of CSS variables
- **Out-of-sync styling** when recipes change
- **Complex init script** with fragile regex-based CSS removal

---

## Current Architecture

### Showcase Examples (`/src/pages/showcase/examples/*`)
- Use `ShowcaseLayout` (minimal wrapper with close button only)
- **Fully self-contained**: inline header, footer, nav, all styling
- Use native `<header>`, `<footer>` HTML elements
- Each has 1000+ lines of inline CSS
- Hardcoded colors (e.g., `#7c3aed`, `#0a0a0a`)
- Own Google Fonts loading
- Duplicated fade-in animation JavaScript

### Recipe System (`/src/recipes/index.ts`)
- Defines complete site configuration
- Theme CSS variables (colors, fonts, spacing)
- Logo config (emoji, char, image)
- Layout options (logoMark, footerLayout, headerLayout, ctaShape)
- Footer config (socialStyle, socialPosition, linkGroups, legalLinks)
- **Problem**: References showcases as "source" but they don't actually use recipe config

### Init Script (`/scripts/init-recipe.js`)
- Copies showcase to `/src/pages/index.astro`
- Strips header/footer HTML with regex
- Removes CSS for `.header`, `.nav`, `.footer` classes
- Updates imports (ShowcaseLayout → Layout)
- Applies recipe config to site.ts
- Updates global.css with theme variables
- **Problem**: Complex, fragile, error-prone regex manipulation

### Shared Components (unused by showcases)
- `Header.astro` - 3 layout types, CTA shapes, mobile menu, scroll hide
- `Footer.astro` - 3 layouts, social styles/positions, legal links
- `Logo.astro` - emoji/char/image logos, two-part names
- `FadeInOnScroll.astro` - scroll-triggered animations

---

## Proposed Solution: Component-Based Showcases

### Core Idea
Make showcases use the **same shared components** (Header, Footer, Logo) that initialized sites use. The recipe config becomes the single source of truth for both.

### Key Changes

1. **Showcases import shared components** instead of inline HTML
2. **ShowcaseLayout passes recipe config** to Header/Footer components
3. **CSS variables replace hardcoded colors** in showcase styles
4. **Init script becomes simpler** - just copies content, no CSS stripping

---

## Implementation Phases

### Phase 1: Create Recipe Context System

**Goal**: Allow showcases to use recipe config without modifying site.ts

**Files to create/modify**:
- `src/context/RecipeContext.ts` - recipe config provider
- `src/layouts/ShowcaseLayout.astro` - accept recipe prop, provide to components

**Approach**:
```typescript
// ShowcaseLayout receives recipe name as prop
<ShowcaseLayout recipe="agency">
  <!-- Components read from context -->
</ShowcaseLayout>
```

**Implementation**:
1. Create `getRecipeConfig(recipeName: string)` helper
2. Modify ShowcaseLayout to accept `recipe` prop
3. ShowcaseLayout sets CSS variables from recipe.theme in `<style>` tag
4. Pass recipe config to Header/Footer as props

---

### Phase 2: Update Shared Components for Dual Mode

**Goal**: Components work in both showcase (recipe prop) and production (site.ts) modes

**Files to modify**:
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/Logo.astro`

**Approach**:
```astro
---
// Header.astro
import { siteConfig } from '@/config/site';

interface Props {
  config?: typeof siteConfig; // Optional recipe override
}

const { config = siteConfig } = Astro.props;
const { header, nav } = config;
---
```

**Implementation**:
1. Add optional `config` prop to Header, Footer, Logo
2. Default to `siteConfig` if no prop provided
3. Use prop config for rendering decisions
4. Components work identically in both contexts

---

### Phase 3: Refactor Showcase Examples

**Goal**: Remove inline header/footer, use shared components

**Files to modify** (5-7 showcases):
- `src/pages/showcase/examples/agency/index.astro`
- `src/pages/showcase/examples/startup/index.astro`
- `src/pages/showcase/examples/newsletter/index.astro`
- `src/pages/showcase/examples/corporate/index.astro`
- `src/pages/showcase/examples/nonprofit/index.astro`
- `src/pages/showcase/examples/product-launch/index.astro`
- `src/pages/showcase/examples/app-download/index.astro`

**Changes per file**:
1. Remove inline `<header>` HTML (~20-50 lines)
2. Remove inline `<footer>` HTML (~30-60 lines)
3. Remove header/footer CSS (~100-150 lines)
4. Remove reset CSS that conflicts with global.css (~20 lines)
5. Replace hardcoded colors with CSS variables
6. Import and use Header/Footer components
7. Remove inline fade-in JS, use FadeInOnScroll component

**Before** (~1200 lines):
```astro
<ShowcaseLayout>
  <header class="header"><!-- 50 lines inline --></header>
  <main><!-- Hero content --></main>
  <footer class="footer"><!-- 60 lines inline --></footer>
</ShowcaseLayout>
<style>
  .header { /* 100 lines */ }
  .footer { /* 80 lines */ }
  .hero { /* uses #7c3aed */ }
</style>
<script>
  function initFadeIn() { /* 30 lines duplicated */ }
</script>
```

**After** (~600 lines):
```astro
---
import { recipes } from '@/recipes';
const recipe = recipes.agency;
---
<ShowcaseLayout recipe="agency">
  <Header config={recipe} />
  <main><!-- Hero content --></main>
  <Footer config={recipe} />
</ShowcaseLayout>
<style>
  .hero { /* uses var(--accent-primary) */ }
</style>
```

**Estimated reduction**: ~600 lines per showcase = **3000+ lines total**

---

### Phase 4: Extract Shared Showcase Styles

**Goal**: DRY up common patterns across showcases

**Files to create**:
- `src/styles/showcase-base.css` - shared reset, container, utilities

**What to extract**:
- Container max-width (use `--container-width` variable)
- Common section padding patterns
- Fade-in animation keyframes
- Grid/flex utilities

**Implementation**:
1. Identify common patterns across all showcases
2. Create shared CSS file with CSS variable hooks
3. Import in showcases: `@import '../styles/showcase-base.css'`
4. Remove duplicated CSS from each showcase

---

### Phase 5: Simplify Init Script

**Goal**: Remove fragile CSS stripping, simplify transformation

**File to modify**: `scripts/init-recipe.js`

**Current complexity to remove**:
- Header HTML regex removal
- Footer HTML regex removal
- CSS class stripping (`.header`, `.nav`, `.footer`)
- Reset CSS removal
- Body font-family removal

**New simplified flow**:
1. Copy showcase `index.astro` to `src/pages/index.astro`
2. Change import from `ShowcaseLayout` to `Layout`
3. Remove `recipe="..."` prop (Layout reads from site.ts)
4. Apply recipe config to `site.ts`
5. Apply theme variables to `global.css`
6. Done - no CSS manipulation needed

**Estimated reduction**: ~100 lines of regex code removed

---

### Phase 6: Validate Complete Recipes

**Goal**: Ensure all recipes have complete configuration

**File to modify**: `src/recipes/index.ts`

**Validation checklist per recipe**:
- [ ] `name` and `nameAccent` defined
- [ ] `logo` with emoji/char/src
- [ ] `logoMark` type specified
- [ ] `theme` with complete color palette
- [ ] `header.layout` and `header.ctaShape`
- [ ] `footer.layout`, `socialStyle`, `socialPosition`
- [ ] `footer.linkGroups` populated
- [ ] `fonts.google` URL specified

**Implementation**:
1. Audit each recipe for missing fields
2. Add TypeScript strict types to catch missing fields
3. Add runtime validation in init script

---

## Migration Strategy

### Option A: Big Bang (Recommended for small team)
1. Complete all phases in sequence
2. Test each showcase after refactoring
3. Run init script for each recipe, verify output
4. Single PR with all changes

### Option B: Incremental (Lower risk)
1. Start with one showcase (e.g., `agency`)
2. Verify it works in both showcase and initialized modes
3. Roll out to remaining showcases one at a time
4. Update init script last

---

## Testing Plan

### Per-Showcase Verification
1. **Visual comparison**: Screenshot before/after
2. **Responsive check**: Mobile, tablet, desktop
3. **Interaction check**: Nav, buttons, scroll animations
4. **Init verification**: Run init, compare to showcase

### Automated Checks
1. Add Playwright visual regression tests
2. Add build verification for each recipe
3. Add TypeScript strict mode for recipe configs

---

## File Change Summary

| File/Folder | Action | Lines Changed |
|-------------|--------|---------------|
| `src/context/RecipeContext.ts` | Create | +50 |
| `src/layouts/ShowcaseLayout.astro` | Modify | +30 |
| `src/components/Header.astro` | Modify | +15 |
| `src/components/Footer.astro` | Modify | +15 |
| `src/components/Logo.astro` | Modify | +10 |
| `src/styles/showcase-base.css` | Create | +100 |
| `src/pages/showcase/examples/*/index.astro` | Modify | -3000 |
| `scripts/init-recipe.js` | Simplify | -100 |
| `src/recipes/index.ts` | Validate | +50 |

**Net result**: ~2800 lines removed, much simpler architecture

---

## Success Criteria

1. **Single source of truth**: Change recipe → both showcase and init update
2. **Visual parity**: Showcases look identical to initialized sites
3. **Simpler init**: No regex CSS stripping needed
4. **Type safety**: TypeScript catches missing recipe config
5. **Maintainability**: New showcases follow component pattern

---

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Visual regressions | Screenshot comparison before/after |
| Component prop complexity | Keep props minimal, use sensible defaults |
| Init script breaks | Test each recipe after changes |
| CSS specificity conflicts | Use BEM naming, scoped styles |

---

## Timeline Estimate

| Phase | Effort |
|-------|--------|
| Phase 1: Recipe Context | Small |
| Phase 2: Component Updates | Small |
| Phase 3: Refactor Showcases | Medium (largest phase) |
| Phase 4: Extract Shared Styles | Small |
| Phase 5: Simplify Init Script | Small |
| Phase 6: Validate Recipes | Small |
| Testing & QA | Medium |

---

## Questions for Review

1. **Component prop API**: Should Header/Footer accept full recipe config or just the relevant subset?
2. **CSS variable naming**: Keep current names or standardize (e.g., `--ps-*` for Prism)?
3. **Showcase fonts**: Load from recipe config or keep inline for demo isolation?
4. **Migration order**: Which showcase to start with for pilot?
