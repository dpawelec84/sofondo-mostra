# Tailwind CSS Opt-Out Implementation Plan

## Goal
Achieve pixel-perfect rendering with and without Tailwind CSS, with no CSS duplication.

## Analysis Summary

Tailwind v4's `@layer base` provides these styles that affect our components:

### Critical Missing Rules (causing visual differences)

1. **Form Elements** (`button,input,select,optgroup,textarea`)
   - Missing: `background-color: transparent`
   - Missing: `border-radius: 0`
   - Missing: `opacity: 1`
   - Missing: `letter-spacing: inherit`
   - Missing: `font-feature-settings: inherit`
   - Missing: `font-variation-settings: inherit`

2. **Placeholder Text** (`::placeholder`)
   - Missing: `opacity: 1`
   - Missing: `color: currentColor` (with color-mix fallback for 50% opacity)

3. **HTML/Host Element**
   - Missing: `-webkit-tap-highlight-color: transparent`
   - Missing: `font-feature-settings: normal`
   - Missing: `font-variation-settings: normal`

### Non-Critical Rules (edge cases, not used in our components)

- `abbr:where([title])` - underline dotted
- `textarea` - resize: vertical
- Various datetime picker pseudo-elements
- `::-webkit-search-decoration`

## Implementation Strategy

**Approach**: Add ONLY the missing critical rules to `global.css` that cause visual differences in our actual components. Do NOT duplicate rules that already exist.

### Changes to `global.css`

1. **Update universal selector** - already has margin:0, padding:0, just verify

2. **Update html selector** - add:
   ```css
   -webkit-tap-highlight-color: transparent;
   font-feature-settings: normal;
   font-variation-settings: normal;
   ```

3. **Update form elements selector** - add:
   ```css
   background-color: transparent;
   border-radius: 0;
   opacity: 1;
   letter-spacing: inherit;
   font-feature-settings: inherit;
   font-variation-settings: inherit;
   ```
   Change `font-family/size/weight/line-height: inherit` to shorthand `font: inherit`

4. **Add placeholder styles**:
   ```css
   ::placeholder {
     opacity: 1;
     color: currentColor;
   }
   @supports (color: color-mix(in lab, red, red)) {
     ::placeholder {
       color: color-mix(in oklab, currentcolor 50%, transparent);
     }
   }
   ```

5. **Add textarea resize**:
   ```css
   textarea {
     resize: vertical;
   }
   ```

## Files to Modify

1. `src/styles/global.css` - Add missing Tailwind base rules
2. `scripts/init-recipe.js` - Already handles tailwind.css content (no changes needed)
3. `astro.config.mjs` - Already handles conditional Vite plugin (no changes needed)

## Verification Steps

1. Build with Tailwind enabled → capture CSS
2. Build with Tailwind disabled → capture CSS
3. Visual comparison on newsletter recipe
4. Verify form inputs, buttons, placeholder text look identical
5. Check mobile tap highlight behavior

## Risk Assessment

- LOW: These are standard CSS resets, unlikely to break anything
- The form element changes (`background-color: transparent`, `border-radius: 0`) could affect custom-styled elements if they relied on browser defaults
- Our components explicitly set these properties, so no impact expected
