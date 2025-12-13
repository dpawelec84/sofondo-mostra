const fs = require('fs');

let content = fs.readFileSync('scripts/init-recipe.js', 'utf8');
content = content.replace(/\r\n/g, '\n');

// Fix the svgIcon regex - match until we find </svg> followed by closing quote
console.log('Fixing svgIcon regex...');

// The current regex:
// /svgIcon:\s*['"](.+?)['"],?\s*\n/
// Problem: .+? is non-greedy and stops at first quote inside the SVG

// Better approach: match the entire SVG element which ends with </svg>
// Then capture everything between the opening quote and </svg>'
const oldPattern = `const svgIconMatch = logoContent.match(/svgIcon:\\s*['"](.+?)['"],?\\s*\\n/);
  const svgIcon = svgIconMatch;`;

const newPattern = `// svgIcon may contain quotes, so we match until </svg> closing tag
  const svgIconMatch = logoContent.match(/svgIcon:\\s*['"](<svg[\\s\\S]*?<\\/svg>)['"]/);
  const svgIcon = svgIconMatch;`;

if (content.includes(oldPattern)) {
  content = content.replace(oldPattern, newPattern);
  console.log('Pattern replaced successfully');
} else {
  console.log('Pattern not found - checking current content:');
  const svgLine = content.match(/const svgIconMatch = logoContent\.match.*/);
  console.log('Current line:', svgLine ? svgLine[0] : 'not found');
}

content = content.replace(/\n/g, '\r\n');
fs.writeFileSync('scripts/init-recipe.js', content);
console.log('Done');
