const fs = require('fs');

let content = fs.readFileSync('scripts/init-recipe.js', 'utf8');

// Replace line by line
const lines = content.split('\n');
let inSvgIconBlock = false;
let startLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// Update logo svgIcon') && !lines[i].includes('backticks')) {
    startLine = i;
    inSvgIconBlock = true;
  }
  if (inSvgIconBlock && lines[i].includes('// Update logo char')) {
    // Found the end marker, now replace the block
    const newBlock = [
      '  // Update logo svgIcon - use backticks to avoid quote escaping issues in SVG',
      '  const svgIconValue = (recipe.logo.svgIcon || \'\').replace(/\\\\/g, \'\\\\\\\\\').replace(/`/g, \'\\\\`\');',
      '  siteConfig = siteConfig.replace(',
      '    /(logo:\\s*\\{[^}]*?)svgIcon:\\s*(?:"[^"]*"|\'[^\']*\'|`[^`]*`)/',
      '    `$1svgIcon: \\`${svgIconValue}\\``',
      '  );'
    ];

    // Remove old lines and insert new ones
    const oldBlockLength = i - startLine;
    lines.splice(startLine, oldBlockLength, ...newBlock);
    console.log('Replaced svgIcon block');
    break;
  }
}

fs.writeFileSync('scripts/init-recipe.js', lines.join('\n'));
console.log('Done');
