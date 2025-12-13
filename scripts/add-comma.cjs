const fs = require('fs');

let content = fs.readFileSync('scripts/init-recipe.js', 'utf8');

// Add missing comma after the regex pattern
content = content.replace(
  /(\/(logo:\\s\*\\{[^}]*\?)svgIcon:\\s\*\(\?:"[^"]*"\|'[^']*'\|`[^`]*`\)\/)\n(\s*`\$1svgIcon:)/,
  '$1,\n$3'
);

fs.writeFileSync('scripts/init-recipe.js', content);
console.log('Added comma');
