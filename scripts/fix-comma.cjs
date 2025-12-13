const fs = require('fs');

const filePath = 'scripts/init-recipe.js';
let content = fs.readFileSync(filePath, 'utf8');

// Look for the pattern: regex followed by newline and backtick (missing comma)
// The line ending with: |`[^`]*`)/
// Followed by: `$1svgIcon:
content = content.replace(
  /(\|`\[\^`\]\*`\)\/)\r?\n(\s+`\$1svgIcon:)/g,
  '$1,\n$2'
);

fs.writeFileSync(filePath, content);
console.log('Fixed comma');
