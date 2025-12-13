const fs = require('fs');

let content = fs.readFileSync('scripts/init-recipe.js', 'utf8');

// Fix the badly formatted navSpacing block
content = content.replace(
  /\}\/\/ Update navSpacing if providedif \(recipe\.navSpacing\) \{  siteConfig = siteConfig\.replace\(    \/navSpacing: "\[\^"\]\+" as NavSpacing\/,    `navSpacing: "\$\{recipe\.navSpacing\}" as NavSpacing`  \);  console\.log\(`✓ Updated nav spacing to "\$\{recipe\.navSpacing\}"`\);\n\}/,
  `}

// Update navSpacing if provided
if (recipe.navSpacing) {
  siteConfig = siteConfig.replace(
    /navSpacing: "[^"]+" as NavSpacing/,
    \`navSpacing: "\${recipe.navSpacing}" as NavSpacing\`
  );
  console.log(\`✓ Updated nav spacing to "\${recipe.navSpacing}"\`);
}`
);

fs.writeFileSync('scripts/init-recipe.js', content);
console.log('Fixed navSpacing formatting');
