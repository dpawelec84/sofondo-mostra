#!/usr/bin/env node

/**
 * Recipe Initialization Script
 *
 * Usage: npm run init -- --recipe=corporate
 *        npm run init -- --recipe=corporate --list
 *
 * This script:
 * 1. Creates a new homepage based on the selected showcase example
 * 2. Updates global.css with the recipe's theme variables
 * 3. Updates site.ts with the recipe's name
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Import recipes (we'll use dynamic import since it's TypeScript)
const recipesPath = path.join(ROOT, 'src/recipes/index.ts');

// Parse recipes from TypeScript file directly (simple extraction)
function parseRecipes() {
  const content = fs.readFileSync(recipesPath, 'utf-8');

  // Find the recipes object
  const recipesStart = content.indexOf('export const recipes');
  if (recipesStart === -1) {
    console.error('Could not parse recipes from src/recipes/index.ts');
    process.exit(1);
  }

  const recipesContent = content.substring(recipesStart);
  const recipes = {};

  // Match recipe entries - handles both 'name': and name: formats
  const recipePattern = /(?:['"]([^'"]+)['"]|(\w+)):\s*\{[^{}]*name:\s*['"]([^'"]+)['"]/g;
  let match;

  while ((match = recipePattern.exec(recipesContent)) !== null) {
    const id = match[1] || match[2];
    if (!id || id === 'recipes') continue;

    // Find the full block for this recipe
    const searchStr = match[1] ? `'${id}':` : `${id}:`;
    const blockStart = recipesContent.indexOf(searchStr);
    if (blockStart === -1) continue;

    const afterColon = recipesContent.substring(blockStart + searchStr.length);
    const braceStart = afterColon.indexOf('{');
    if (braceStart === -1) continue;

    const endIndex = findMatchingBrace(afterColon, braceStart);
    const recipeContent = afterColon.substring(0, endIndex + 1);

    recipes[id] = {
      name: extractField(recipeContent, 'name'),
      description: extractField(recipeContent, 'description'),
      category: extractField(recipeContent, 'category'),
      source: extractField(recipeContent, 'source'),
      theme: extractTheme(recipeContent),
      fonts: extractFonts(recipeContent),
    };
  }

  return recipes;
}

function findMatchingBrace(str, startIndex) {
  let count = 0;
  let inString = false;
  let stringChar = '';

  for (let i = startIndex; i < str.length; i++) {
    const char = str[i];

    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && str[i - 1] !== '\\') {
      inString = false;
    } else if (!inString) {
      if (char === '{') count++;
      if (char === '}') {
        count--;
        if (count === 0) return i;
      }
    }
  }
  return str.length;
}

function extractField(content, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*['"]([^'"]+)['"]`);
  const match = content.match(regex);
  return match ? match[1] : '';
}

function extractTheme(content) {
  const themeMatch = content.match(/theme:\s*\{([\s\S]*?)\n\s*\},?\s*\n/);
  if (!themeMatch) return {};

  const theme = {};
  const themeContent = themeMatch[1];

  // Match CSS variable entries - handles nested quotes like "'Inter', sans-serif"
  // Format: '--var-name': 'value' or "--var-name": "value"
  const lines = themeContent.split('\n');
  for (const line of lines) {
    // Match: '--var-name': 'value', or "--var-name": "value",
    const match = line.match(/['"](--.+?)['"]\s*:\s*['"](.+)['"]\s*,?\s*$/);
    if (match) {
      theme[match[1]] = match[2];
    }
  }

  return theme;
}

function extractFonts(content) {
  const fontsMatch = content.match(/fonts:\s*\{[\s\S]*?google:\s*['"](.+?)['"]/);
  return fontsMatch ? { google: fontsMatch[1] } : undefined;
}

// CLI argument parsing
const args = process.argv.slice(2);
const flags = {};

for (const arg of args) {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    flags[key] = value || true;
  }
}

const recipes = parseRecipes();

// List recipes
if (flags.list) {
  console.log('\nAvailable recipes:\n');
  for (const [id, recipe] of Object.entries(recipes)) {
    console.log(`  ${id.padEnd(16)} - ${recipe.name}`);
    console.log(`  ${' '.repeat(16)}   ${recipe.description}`);
    console.log();
  }
  process.exit(0);
}

// Show help
if (flags.help || !flags.recipe) {
  console.log(`
Mostra Recipe Initializer

Usage:
  npm run init -- --recipe=<recipe-name>
  npm run init -- --list

Options:
  --recipe=<name>   Apply a recipe to initialize the project
  --list            List all available recipes
  --help            Show this help message

Examples:
  npm run init -- --recipe=corporate
  npm run init -- --recipe=agency
  npm run init -- --list
`);
  process.exit(0);
}

// Get the selected recipe
const recipeName = flags.recipe;
const recipe = recipes[recipeName];

if (!recipe) {
  console.error(`\nError: Recipe "${recipeName}" not found.\n`);
  console.log('Available recipes:');
  for (const id of Object.keys(recipes)) {
    console.log(`  - ${id}`);
  }
  process.exit(1);
}

console.log(`\nApplying recipe: ${recipe.name}\n`);

// 1. Copy showcase example to be the new homepage
const sourcePath = path.join(ROOT, 'src/pages/showcase/examples', recipe.source, 'index.astro');
const targetPath = path.join(ROOT, 'src/pages/index.astro');
const backupPath = path.join(ROOT, 'src/pages/index.astro.backup');

if (!fs.existsSync(sourcePath)) {
  console.error(`Error: Source file not found: ${sourcePath}`);
  process.exit(1);
}

// Backup existing homepage
if (fs.existsSync(targetPath)) {
  fs.copyFileSync(targetPath, backupPath);
  console.log('✓ Backed up existing homepage to index.astro.backup');
}

// Read source and transform it to use Layout instead of ShowcaseLayout
let sourceContent = fs.readFileSync(sourcePath, 'utf-8');

// Transform: Replace ShowcaseLayout with Layout
sourceContent = sourceContent.replace(
  /import ShowcaseLayout from .+?;/,
  'import Layout from "../layouts/Layout.astro";'
);

// Remove returnUrl prop and update the layout wrapper
sourceContent = sourceContent.replace(
  /<ShowcaseLayout[^>]*title="([^"]+)"[^>]*>/g,
  '<Layout title="$1">'
);
sourceContent = sourceContent.replace(/<\/ShowcaseLayout>/g, '</Layout>');

// Move <Fragment slot="head"> styles to a <style> block (handled by Astro)
// Keep the head styles but transform them to work in Layout context

fs.writeFileSync(targetPath, sourceContent);
console.log(`✓ Created new homepage from ${recipe.source} example`);

// 2. Update global.css with theme variables
const globalCssPath = path.join(ROOT, 'src/styles/global.css');
let globalCss = fs.readFileSync(globalCssPath, 'utf-8');

// Create backup
fs.writeFileSync(globalCssPath + '.backup', globalCss);
console.log('✓ Backed up global.css');

// Update CSS variables in :root
for (const [varName, value] of Object.entries(recipe.theme)) {
  // Match CSS variable and its value (handles values with commas, quotes, etc.)
  // Matches: --var-name: any-value-until-semicolon;
  const escapedVarName = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedVarName}):\\s*([^;]+);`, 'g');
  if (globalCss.match(regex)) {
    globalCss = globalCss.replace(regex, `$1: ${value};`);
  }
}

fs.writeFileSync(globalCssPath, globalCss);
console.log('✓ Updated global.css with theme variables');

// 3. Update site.ts with recipe name
const siteConfigPath = path.join(ROOT, 'src/config/site.ts');
let siteConfig = fs.readFileSync(siteConfigPath, 'utf-8');

// Create backup
fs.writeFileSync(siteConfigPath + '.backup', siteConfig);
console.log('✓ Backed up site.ts');

// Update the site name
siteConfig = siteConfig.replace(
  /name:\s*"[^"]+"/,
  `name: "${recipe.name}"`
);

// Update description if available
siteConfig = siteConfig.replace(
  /description:\s*"[^"]+"/,
  `description: "${recipe.description}"`
);

fs.writeFileSync(siteConfigPath, siteConfig);
console.log('✓ Updated site.ts with recipe name');

// 4. Add font imports if needed
if (recipe.fonts?.google) {
  const layoutPath = path.join(ROOT, 'src/layouts/Layout.astro');
  let layoutContent = fs.readFileSync(layoutPath, 'utf-8');

  // Check if Google Fonts link already exists
  if (!layoutContent.includes(recipe.fonts.google)) {
    // Add Google Fonts link after existing preload links
    const insertPoint = layoutContent.indexOf('<style>');
    if (insertPoint !== -1) {
      const fontLink = `    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${recipe.fonts.google}" rel="stylesheet">
`;
      layoutContent = layoutContent.slice(0, insertPoint) + fontLink + layoutContent.slice(insertPoint);
      fs.writeFileSync(layoutPath, layoutContent);
      console.log('✓ Added Google Fonts to Layout.astro');
    }
  }
}

console.log(`
✅ Recipe "${recipe.name}" applied successfully!

Next steps:
  1. Run 'npm run dev' to see your new homepage
  2. Customize the content in src/pages/index.astro
  3. Update navigation in src/config/site.ts
  4. (Optional) Remove showcase examples you don't need

To revert:
  - Homepage backup: src/pages/index.astro.backup
  - CSS backup: src/styles/global.css.backup
  - Config backup: src/config/site.ts.backup
`);
