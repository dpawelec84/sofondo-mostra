const fs = require('fs');

let content = fs.readFileSync('scripts/init-recipe.js', 'utf8');

// Fix the svgIcon replacement to use backticks instead of double quotes
const oldCode = `  // Update logo svgIcon
  siteConfig = siteConfig.replace(
    /(logo:\\s*\\{[^}]*?)svgIcon:\\s*"[^"]*"/,
    \`$1svgIcon: "\${recipe.logo.svgIcon || ''}"\`
  );`;

const newCode = `  // Update logo svgIcon - use backticks to avoid quote escaping issues in SVG
  const svgIconValue = (recipe.logo.svgIcon || '').replace(/\\\\/g, '\\\\\\\\').replace(/\`/g, '\\\\\`');
  siteConfig = siteConfig.replace(
    /(logo:\\s*\\{[^}]*?)svgIcon:\\s*(?:"[^"]*"|'[^']*'|\`[^\`]*\`)/,
    \`$1svgIcon: \\\`\${svgIconValue}\\\`\`
  );`;

if (content.includes(oldCode)) {
  content = content.replace(oldCode, newCode);
  fs.writeFileSync('scripts/init-recipe.js', content);
  console.log('Fixed svgIcon to use backticks');
} else {
  console.log('Pattern not found. Current content around line 557:');
  const lines = content.split('\n');
  console.log(lines.slice(554, 565).join('\n'));
}
