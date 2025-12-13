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
      nameAccent: extractField(recipeContent, 'nameAccent'),
      description: extractField(recipeContent, 'description'),
      tagline: extractField(recipeContent, 'tagline'),
      category: extractField(recipeContent, 'category'),
      source: extractField(recipeContent, 'source'),
      theme: extractTheme(recipeContent),
      fonts: extractFonts(recipeContent),
      logo: extractLogo(recipeContent),
      // Header/footer config
      logoMark: extractField(recipeContent, 'logoMark'),
      footerLayout: extractField(recipeContent, 'footerLayout'),
      headerLayout: extractField(recipeContent, 'headerLayout'),
      ctaShape: extractField(recipeContent, 'ctaShape'),
      socialStyle: extractField(recipeContent, 'socialStyle'),
      socialPosition: extractField(recipeContent, 'socialPosition'),
      socialLinks: extractArray(recipeContent, 'socialLinks'),
      linkGroups: extractArray(recipeContent, 'linkGroups'),
      legalLinks: extractArray(recipeContent, 'legalLinks'),
      legalInBottomRow: extractBoolean(recipeContent, 'legalInBottomRow'),
      showLegalLinks: extractBoolean(recipeContent, 'showLegalLinks'),
      showCopyright: extractBoolean(recipeContent, 'showCopyright'),
      showTemplateCredit: extractBoolean(recipeContent, 'showTemplateCredit'),
      showTemplateName: extractBoolean(recipeContent, 'showTemplateName'),
      isDark: extractBoolean(recipeContent, 'isDark'),
      copyrightSuffix: extractField(recipeContent, 'copyrightSuffix'),
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

function extractBoolean(content, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*(true|false)`);
  const match = content.match(regex);
  return match ? match[1] === 'true' : undefined;
}

function extractArray(content, fieldName) {
  // Find the array start: fieldName: [
  const regex = new RegExp(`${fieldName}:\\s*\\[`);
  const match = content.match(regex);
  if (!match) return undefined;

  const startIndex = content.indexOf(match[0]) + match[0].length - 1;
  const endIndex = findMatchingBracket(content, startIndex);
  if (endIndex === -1) return undefined;

  const arrayContent = content.substring(startIndex, endIndex + 1);

  // Parse the array content - this is a simplified parser
  // For our use case, we know the structure is arrays of objects
  try {
    // Convert TypeScript-style to JSON-style (single quotes to double, etc.)
    let jsonStr = arrayContent
      // Remove comments - but only when // is NOT inside a string
      // This regex matches // only when preceded by whitespace at start of line or after a comma/closing bracket
      .replace(/^\s*\/\/.*$/gm, '') // Remove full-line comments
      .replace(/,\s*\/\/.*$/gm, ',') // Remove trailing comments after commas
      // Replace single quotes with double quotes (but avoid replacing inside strings)
      .replace(/'/g, '"')
      // Add quotes around unquoted property names (handles word: and hyphen-word:)
      .replace(/([{,]\s*)(\w[\w-]*)(\s*:)/g, '$1"$2"$3')
      // Fix any double-quoted keys that got double-double-quoted
      .replace(/""/g, '"')
      // Remove trailing commas before closing brackets
      .replace(/,(\s*[}\]])/g, '$1');
    return JSON.parse(jsonStr);
  } catch (e) {
    // If JSON parsing fails, return undefined
    return undefined;
  }
}

function findMatchingBracket(str, startIndex) {
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
      if (char === '[') count++;
      if (char === ']') {
        count--;
        if (count === 0) return i;
      }
    }
  }
  return -1;
}

function extractLogo(content) {
  const logoMatch = content.match(/logo:\s*\{([\s\S]*?)\n\s*\}/);
  if (!logoMatch) return undefined;

  const logoContent = logoMatch[1];
  const src = logoContent.match(/src:\s*['"]([^'"]*)['"]/);
  const alt = logoContent.match(/alt:\s*['"]([^'"]+)['"]/);
  const width = logoContent.match(/width:\s*(\d+)/);
  const height = logoContent.match(/height:\s*(\d+)/);
  const emoji = logoContent.match(/emoji:\s*['"]([^'"]+)['"]/);
  // svgIcon contains quotes, so we match more carefully
  // svgIcon may contain quotes, so we match until </svg> closing tag
  const svgIconMatch = logoContent.match(/svgIcon:\s*['"](<svg[\s\S]*?<\/svg>)['"]/);
  const svgIcon = svgIconMatch;
  const char = logoContent.match(/char:\s*['"]([^'"]+)['"]/);

  return {
    src: src ? src[1] : '',
    alt: alt ? alt[1] : 'Logo',
    width: width ? parseInt(width[1]) : 32,
    height: height ? parseInt(height[1]) : 32,
    emoji: emoji ? emoji[1] : '',
    char: char ? char[1] : '',
    svgIcon: svgIcon ? svgIcon[1] : '',
  };
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

// Remove Header and Footer imports (Layout.astro provides these)
sourceContent = sourceContent.replace(/import Header from .+?;\n?/g, '');
sourceContent = sourceContent.replace(/import Footer from .+?;\n?/g, '');

// Remove the recipes import (not needed in production)
sourceContent = sourceContent.replace(/import \{ recipes \} from .+?;\n?/g, '');
sourceContent = sourceContent.replace(/const recipe = recipes\.\w+;\n?/g, '');

// Remove returnUrl prop and update the layout wrapper
sourceContent = sourceContent.replace(
  /<ShowcaseLayout[^>]*title="([^"]+)"[^>]*>/g,
  '<Layout title="$1">'
);
sourceContent = sourceContent.replace(/<\/ShowcaseLayout>/g, '</Layout>');

// Strip the example's header element (Layout.astro provides its own Header component)
// Match: <Header /> component usage
sourceContent = sourceContent.replace(/\s*<Header\s*\/>\s*/g, '\n');
// Match: <!-- Header --> comment (optional) + <header ...>...</header>
sourceContent = sourceContent.replace(
  /\s*<!--\s*Header\s*-->\s*<header[^>]*>[\s\S]*?<\/header>/gi,
  ''
);
// Match any <header> element with any class (newsletter-header, nonprofit-header, etc.)
// Use non-greedy match to avoid swallowing too much content
sourceContent = sourceContent.replace(
  /\s*<!--[^>]*Custom[^>]*Header[^>]*-->\s*<header[^>]*>[\s\S]*?<\/header>/gi,
  ''
);
sourceContent = sourceContent.replace(
  /\s*<header\s+class="[^"]*-header"[^>]*>[\s\S]*?<\/header>/gi,
  ''
);
sourceContent = sourceContent.replace(
  /\s*<header\s+class="header"[^>]*>[\s\S]*?<\/header>/gi,
  ''
);

// Strip the example's footer element (Layout.astro provides its own Footer component)
// Match: <Footer /> component usage
sourceContent = sourceContent.replace(/\s*<Footer\s*\/>\s*/g, '\n');
// Match: <!-- Footer --> comment (optional) + <footer ...>...</footer>
sourceContent = sourceContent.replace(
  /\s*<!--\s*Footer\s*-->\s*<footer[^>]*>[\s\S]*?<\/footer>/gi,
  ''
);
// Match any <footer> element with any class (newsletter-footer, nonprofit-footer, etc.)
sourceContent = sourceContent.replace(
  /\s*<!--[^>]*Custom[^>]*Footer[^>]*-->\s*<footer[^>]*>[\s\S]*?<\/footer>/gi,
  ''
);
sourceContent = sourceContent.replace(
  /\s*<footer\s+class="[^"]*-footer"[^>]*>[\s\S]*?<\/footer>/gi,
  ''
);
sourceContent = sourceContent.replace(
  /\s*<footer\s+class="footer"[^>]*>[\s\S]*?<\/footer>/gi,
  ''
);

// Remove conflicting CSS from the example's <style> block
// These conflict with Layout's global styles and Lenis smooth scrolling
const conflictingCSSPatterns = [
  // Reset styles that conflict with global.css
  /\s*\*\s*\{[^}]*margin:\s*0[^}]*\}/g,
  // HTML scroll behavior that conflicts with Lenis
  /\s*html\s*\{[^}]*scroll-behavior:\s*smooth[^}]*\}/g,
  // Body styles that override Layout's body
  /\s*body\s*\{[^}]*font-family:[^}]*\}/g,
  // Header CSS (no longer needed since we use Layout's Header)
  /\s*\/\*\s*Header\s*\*\/[\s\S]*?(?=\/\*|\.hero|$)/g,
  /\s*\.header\s*\{[^}]*\}/g,
  /\s*\.header-inner\s*\{[^}]*\}/g,
  /\s*\.logo\s*\{[^}]*\}/g,
  /\s*\.logo\s+span\s*\{[^}]*\}/g,
  /\s*\.nav\s*\{[^}]*\}/g,
  /\s*\.nav\s+a\s*\{[^}]*\}/g,
  /\s*\.nav\s+a:hover\s*\{[^}]*\}/g,
  /\s*\.nav-cta\s*\{[^}]*\}/g,
  /\s*\.nav-cta:hover\s*\{[^}]*\}/g,
  // Recipe-specific custom header CSS (newsletter-header, nonprofit-header, etc.)
  /\s*\/\*[^*]*Custom\s+Header[^*]*\*\/[\s\S]*?(?=\/\*|\s*\.hero|\s*<\/style>)/gi,
  // Removed: was matching content headers like .involve-header
  // /\s*\.[a-z]+-header\s*\{[^}]*\}/g,
  /\s*\.header-logo\s*\{[^}]*\}/g,
  /\s*\.header-nav\s*\{[^}]*\}/g,
  /\s*\.header-cta\s*\{[^}]*\}/g,
  /\s*\.header-cta:hover\s*\{[^}]*\}/g,
  /\s*\.logo-text\s*\{[^}]*\}/g,
  /\s*\.logo-wave\s*\{[^}]*\}/g,
  /\s*\.spark-icon\s*\{[^}]*\}/g,
  /\s*\.spark-icon\.small\s*\{[^}]*\}/g,
  /\s*\.nav-link\s*\{[^}]*\}/g,
  /\s*\.nav-link:hover\s*\{[^}]*\}/g,
  // Footer CSS (no longer needed since we use Layout's Footer)
  /\s*\/\*\s*Footer\s*\*\/[\s\S]*?(?=\/\*|\s*@media|\s*\.fade-in|\s*<\/style>)/g,
  /\s*\.footer\s*\{[^}]*\}/g,
  /\s*\.footer-grid\s*\{[^}]*\}/g,
  /\s*\.footer-brand[^{]*\{[^}]*\}/g,
  /\s*\.footer-links[^{]*\{[^}]*\}/g,
  /\s*\.footer-bottom\s*\{[^}]*\}/g,
  // Recipe-specific custom footer CSS (newsletter-footer, nonprofit-footer, etc.)
  /\s*\/\*[^*]*Custom\s+Footer[^*]*\*\/[\s\S]*?(?=\/\*|\s*@media|\s*<\/style>)/gi,
  /\s*\.[a-z]+-footer\s*\{[^}]*\}/g,
  /\s*\.footer-inner\s*\{[^}]*\}/g,
  /\s*\.footer-name\s*\{[^}]*\}/g,
  /\s*\.footer-tagline\s*\{[^}]*\}/g,
  /\s*\.footer-copyright\s*\{[^}]*\}/g,
  /\s*\.footer-main\s*\{[^}]*\}/g,
  /\s*\.footer-logo[^{]*\{[^}]*\}/g,
  /\s*\.footer-social\s*\{[^}]*\}/g,
  /\s*\.footer-col[^{]*\{[^}]*\}/g,
  /\s*\.footer-legal[^{]*\{[^}]*\}/g,
  /\s*\.social-link[^{]*\{[^}]*\}/g,
];

for (const pattern of conflictingCSSPatterns) {
  sourceContent = sourceContent.replace(pattern, '');
}

// Clean up any leftover /* Header */ or /* Footer */ comment blocks
sourceContent = sourceContent.replace(/\s*\/\*\s*Header\s*\*\/\s*/g, '');
sourceContent = sourceContent.replace(/\s*\/\*\s*Footer\s*\*\/\s*/g, '');

// Transform hero padding: keep header-height compensation for heroes that extend under the header
// Pattern: calc(var(--header-height, XXpx) + Yrem) 0 Zrem -> calc(var(--header-height) + Yrem) 0 Zrem
sourceContent = sourceContent.replace(
  /padding:\s*calc\(var\(--header-height,\s*\d+px\)\s*\+\s*(\d+(?:\.\d+)?rem)\)\s+(0|[\d.]+rem)\s+([\d.]+rem)/g,
  'padding: calc(var(--header-height) + $1) $2 $3'
);

// Also handle margin-top: calc(-1 * var(--header-height, XXpx)) for heroes that extend under header
sourceContent = sourceContent.replace(
  /margin-top:\s*calc\(-1\s*\*\s*var\(--header-height,\s*\d+px\)\)/g,
  'margin-top: calc(-1 * var(--header-height))'
);

// Transform padding that compensates for margin-top extension under header
sourceContent = sourceContent.replace(
  /padding:\s*calc\(var\(--header-height,\s*\d+px\)\s*\+\s*(\d+(?:\.\d+)?rem)\)/g,
  'padding: calc(var(--header-height) + $1)'
);

// NOTE: Hero transform disabled - showcase examples already have correct padding
// The examples are designed to work with fixed headers and their padding accounts for this
// Adding extra header-height padding was causing too much space above hero text

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

// Update nameAccent (always update to ensure it's cleared when not provided)
siteConfig = siteConfig.replace(
  /nameAccent:\s*"[^"]*"/,
  `nameAccent: "${recipe.nameAccent || ''}"`
);
if (recipe.nameAccent) {
  console.log(`✓ Updated nameAccent to "${recipe.nameAccent}"`);
} else {
  console.log('✓ Cleared nameAccent (recipe has no accent)');
}

// Update description if available
siteConfig = siteConfig.replace(
  /description:\s*"[^"]+"/,
  `description: "${recipe.description}"`
);

// Update footer tagline if available
if (recipe.tagline) {
  siteConfig = siteConfig.replace(
    /tagline:\s*"[^"]+"/,
    `tagline: "${recipe.tagline}"`
  );
}

// Update footer copyright to use recipe name
siteConfig = siteConfig.replace(
  /copyright:\s*"[^"]+"/,
  `copyright: "${recipe.name}"`
);

// Update logo settings if provided
if (recipe.logo) {
  // Update logo src
  siteConfig = siteConfig.replace(
    /logo:\s*\{[^}]*src:\s*"[^"]*"/,
    `logo: {\n    src: "${recipe.logo.src}"`
  );
  // Update logo emoji
  siteConfig = siteConfig.replace(
    /(logo:\s*\{[^}]*?)emoji:\s*"[^"]*"/,
    `$1emoji: "${recipe.logo.emoji || ''}"`
  );
  // Update logo svgIcon
  siteConfig = siteConfig.replace(
    /(logo:\s*\{[^}]*?)svgIcon:\s*"[^"]*"/,
    `$1svgIcon: "${recipe.logo.svgIcon || ''}"`
  );
  // Update logo char
  siteConfig = siteConfig.replace(
    /(logo:\s*\{[^}]*?)char:\s*"[^"]*"/,
    `$1char: "${recipe.logo.char || ''}"`
  );
  // Update logo alt
  siteConfig = siteConfig.replace(
    /(logo:\s*\{[^}]*?)alt:\s*"[^"]*"/,
    `$1alt: "${recipe.logo.alt}"`
  );
  // Update logo width
  siteConfig = siteConfig.replace(
    /(logo:\s*\{[^}]*?)width:\s*\d+/,
    `$1width: ${recipe.logo.width}`
  );
  // Update logo height
  siteConfig = siteConfig.replace(
    /(logo:\s*\{[^}]*?)height:\s*\d+/,
    `$1height: ${recipe.logo.height}`
  );
  console.log('✓ Updated logo settings');
}

// Update logo mark type if provided
if (recipe.logoMark) {
  siteConfig = siteConfig.replace(
    /logoMark:\s*"[^"]+"\s*as const/,
    `logoMark: "${recipe.logoMark}" as const`
  );
  console.log(`✓ Updated logoMark to "${recipe.logoMark}"`);
}

// Update footer layout if provided
if (recipe.footerLayout) {
  siteConfig = siteConfig.replace(
    /footerLayout:\s*"[^"]+"\s*as const/,
    `footerLayout: "${recipe.footerLayout}" as const`
  );
  console.log(`✓ Updated footerLayout to "${recipe.footerLayout}"`);
}

// Update header configuration if provided
if (recipe.headerLayout) {
  siteConfig = siteConfig.replace(
    /layout:\s*"[^"]+"\s*as HeaderLayout/,
    `layout: "${recipe.headerLayout}" as HeaderLayout`
  );
  console.log(`✓ Updated header layout to "${recipe.headerLayout}"`);
}

if (recipe.ctaShape) {
  siteConfig = siteConfig.replace(
    /ctaShape:\s*"[^"]+"\s*as CTAShape/,
    `ctaShape: "${recipe.ctaShape}" as CTAShape`
  );
  console.log(`✓ Updated CTA shape to "${recipe.ctaShape}"`);
}

// Update isDark flag if provided
if (recipe.isDark !== undefined && recipe.isDark !== null) {
  siteConfig = siteConfig.replace(
    /isDark:\s*(true|false)/,
    `isDark: ${recipe.isDark}`
  );
  console.log(`✓ Updated isDark to ${recipe.isDark}`);
}

// Update copyrightSuffix if provided
if (recipe.copyrightSuffix) {
  siteConfig = siteConfig.replace(
    /copyrightSuffix:\s*"[^"]*"/,
    `copyrightSuffix: "${recipe.copyrightSuffix}"`
  );
  console.log(`✓ Updated copyrightSuffix to "${recipe.copyrightSuffix}"`);
}

// Update footer social configuration
if (recipe.socialStyle) {
  siteConfig = siteConfig.replace(
    /style:\s*"[^"]+"\s*as SocialStyle/,
    `style: "${recipe.socialStyle}" as SocialStyle`
  );
  console.log(`✓ Updated social style to "${recipe.socialStyle}"`);
}

// Update social position if provided
if (recipe.socialPosition) {
  siteConfig = siteConfig.replace(
    /position:\s*"[^"]+"\s*as SocialPosition/,
    `position: "${recipe.socialPosition}" as SocialPosition`
  );
  console.log(`✓ Updated social position to "${recipe.socialPosition}"`);
}

// Update social links if provided
if (recipe.socialLinks && recipe.socialLinks.length > 0) {
  const socialLinksStr = JSON.stringify(recipe.socialLinks, null, 6)
    .replace(/"/g, "'")
    .replace(/'(\w+)':/g, '$1:')
    .replace(/\n/g, '\n      ');

  // Replace the social links array
  siteConfig = siteConfig.replace(
    /links:\s*\[\s*\{[^[\]]*platform:[^[\]]*\}\s*\]\s*as SocialLink\[\]/s,
    `links: ${socialLinksStr} as SocialLink[]`
  );
  console.log(`✓ Updated social links (${recipe.socialLinks.length} links)`);
}

// Update footer link groups if provided
if (recipe.linkGroups && recipe.linkGroups.length > 0) {
  const linkGroupsStr = JSON.stringify(recipe.linkGroups, null, 6)
    .replace(/"/g, "'")
    .replace(/'(\w+)':/g, '$1:')
    .replace(/\n/g, '\n    ');

  // Find the start of linkGroups array and use bracket matching to find the end
  const linkGroupsMatch = siteConfig.match(/linkGroups:\s*\[/);
  if (linkGroupsMatch) {
    const startPos = siteConfig.indexOf(linkGroupsMatch[0]);
    const bracketStart = startPos + linkGroupsMatch[0].length - 1;
    const bracketEnd = findMatchingBracket(siteConfig, bracketStart);
    if (bracketEnd !== -1) {
      // Find where the type annotation ends (as FooterLinkGroup[])
      const afterBracket = siteConfig.substring(bracketEnd + 1);
      const typeMatch = afterBracket.match(/^\s*as FooterLinkGroup\[\]/);
      const endPos = typeMatch ? bracketEnd + 1 + typeMatch[0].length : bracketEnd + 1;

      // Replace the entire linkGroups declaration
      siteConfig = siteConfig.substring(0, startPos) +
        `linkGroups: ${linkGroupsStr} as FooterLinkGroup[]` +
        siteConfig.substring(endPos);
      console.log(`✓ Updated footer link groups (${recipe.linkGroups.length} groups)`);
    }
  }
}

// Update legal links if provided
if (recipe.legalLinks && recipe.legalLinks.length > 0) {
  const legalLinksStr = JSON.stringify(recipe.legalLinks, null, 6)
    .replace(/"/g, "'")
    .replace(/'(\w+)':/g, '$1:')
    .replace(/\n/g, '\n    ');

  // Replace the legalLinks array
  siteConfig = siteConfig.replace(
    /legalLinks:\s*\[\s*\{[^[\]]*label:[^[\]]*\}\s*\]/s,
    `legalLinks: ${legalLinksStr}`
  );
  console.log(`✓ Updated legal links (${recipe.legalLinks.length} links)`);
}

// Update legalInBottomRow if provided
if (recipe.legalInBottomRow !== undefined) {
  siteConfig = siteConfig.replace(
    /legalInBottomRow:\s*(true|false)/,
    `legalInBottomRow: ${recipe.legalInBottomRow}`
  );
  console.log(`✓ Updated legalInBottomRow to ${recipe.legalInBottomRow}`);
}

// Update showLegalLinks if provided
if (recipe.showLegalLinks !== undefined) {
  siteConfig = siteConfig.replace(
    /showLegalLinks:\s*(true|false)/,
    `showLegalLinks: ${recipe.showLegalLinks}`
  );
  console.log(`✓ Updated showLegalLinks to ${recipe.showLegalLinks}`);
}

// Update showCopyright if provided
if (recipe.showCopyright !== undefined) {
  siteConfig = siteConfig.replace(
    /showCopyright:\s*(true|false)/,
    `showCopyright: ${recipe.showCopyright}`
  );
  console.log(`✓ Updated showCopyright to ${recipe.showCopyright}`);
}

// Update showTemplateName if provided
if (recipe.showTemplateName !== undefined) {
  siteConfig = siteConfig.replace(
    /showTemplateName:\s*(true|false)/,
    `showTemplateName: ${recipe.showTemplateName}`
  );
  console.log(`✓ Updated showTemplateName to ${recipe.showTemplateName}`);
}

// Update showTemplateCredit if provided
if (recipe.showTemplateCredit !== undefined) {
  siteConfig = siteConfig.replace(
    /showTemplateCredit:\s*(true|false)/,
    `showTemplateCredit: ${recipe.showTemplateCredit}`
  );
  console.log(`✓ Updated showTemplateCredit to ${recipe.showTemplateCredit}`);
}

fs.writeFileSync(siteConfigPath, siteConfig);
console.log('✓ Updated site.ts with recipe configuration');

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
