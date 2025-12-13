const fs = require('fs');

let content = fs.readFileSync('scripts/init-recipe.js', 'utf8');
content = content.replace(/\r\n/g, '\n');

// 1. Fix the svgIcon regex to handle SVG content with quotes
// The SVG content uses double quotes inside, so we need to match until the closing quote + comma pattern
console.log('Fixing svgIcon regex...');
content = content.replace(
  "const svgIcon = logoContent.match(/svgIcon:\\s*['\"]([^'\"]+)['\"]/);" ,
  "// svgIcon contains quotes, so we match more carefully\n  const svgIconMatch = logoContent.match(/svgIcon:\\s*['\"](.+?)['\"],?\\s*\\n/);\n  const svgIcon = svgIconMatch;"
);

// 2. Fix the CSS pattern that's removing section headers like .involve-header, .programs-header, .stories-header
// These are content section headers, not navigation headers - they should NOT be removed
console.log('Fixing CSS patterns...');

// Remove the pattern that matches .xxx-header (it's too broad)
content = content.replace(
  "/\\s*\\.[a-z]+-header\\s*\\{[^}]*\\}/g,",
  "// Removed: was matching content headers like .involve-header\n  // /\\s*\\.[a-z]+-header\\s*\\{[^}]*\\}/g,"
);

content = content.replace(/\n/g, '\r\n');
fs.writeFileSync('scripts/init-recipe.js', content);
console.log('Done');
