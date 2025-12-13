const fs = require('fs');

let content = fs.readFileSync('scripts/init-recipe.js', 'utf8');
content = content.replace(/\r\n/g, '\n');

// The svgIcon value contains double quotes (like viewBox="0 0 32 32")
// When we insert it into site.ts wrapped in double quotes, it breaks the JS
// Solution: escape the inner double quotes, or use backticks for template literal

console.log('Fixing svgIcon escaping...');

// Current: `$1svgIcon: "${recipe.logo.svgIcon || ''}"`
// Need to escape double quotes inside the SVG

const oldCode = '`$1svgIcon: "${recipe.logo.svgIcon || \'\'}"`';
// Use backticks and escape the inner content properly
const newCode = '`$1svgIcon: \\`${(recipe.logo.svgIcon || \\'\\').replace(/"/g, "\\\\\\"\\"))}\\``';

// Actually, simpler approach - the SVG uses double quotes, so wrap in backticks in the output
// Or escape the double quotes in the SVG value

// Let me check if the value needs escaping
// recipe.logo.svgIcon = '<svg viewBox="0 0 32 32"...'
// We need to output: svgIcon: `<svg viewBox="0 0 32 32"...`
// Using backticks avoids quote escaping issues

// Replace the svgIcon update code to use backticks
const oldPattern = `  // Update logo svgIcon
  siteConfig = siteConfig.replace(
    /(logo:\\s*\\{[^}]*?)svgIcon:\\s*"[^"]*"/,
    \`$1svgIcon: "\${recipe.logo.svgIcon || ''}"\`
  );`;

const newPattern = `  // Update logo svgIcon - use backticks to avoid quote issues in SVG
  const escapedSvgIcon = (recipe.logo.svgIcon || '').replace(/\\\\/g, '\\\\\\\\').replace(/\`/g, '\\\\\`');
  siteConfig = siteConfig.replace(
    /(logo:\\s*\\{[^}]*?)svgIcon:\\s*(?:"[^"]*"|'[^']*'|\\\`[^\\\`]*\\\`)/,
    \`$1svgIcon: \\\\\`\${escapedSvgIcon}\\\\\`\`
  );`;

if (content.includes('$1svgIcon: "${recipe.logo.svgIcon || \'\'}"`')) {
  content = content.replace(
    `\`$1svgIcon: "\${recipe.logo.svgIcon || ''}"\``,
    `\`$1svgIcon: \\\`\${(recipe.logo.svgIcon || '').replace(/\\\\/g, '\\\\\\\\').replace(/\\\`/g, '\\\\\\\`')}\\\`\``
  );
  console.log('Updated svgIcon replacement to use backticks');
} else {
  console.log('Pattern not found - current content may differ');
  // Show what we're looking for
  const svgLine = content.match(/svgIcon.*recipe\.logo\.svgIcon.*/);
  console.log('Found:', svgLine ? svgLine[0] : 'nothing');
}

content = content.replace(/\n/g, '\r\n');
fs.writeFileSync('scripts/init-recipe.js', content);
console.log('Done');
