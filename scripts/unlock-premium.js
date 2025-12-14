#!/usr/bin/env node

/**
 * unlock-premium.js
 *
 * Displays the support message and optionally unlocks premium features
 * by setting premiumUnlocked: true in site.ts
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_CONFIG_PATH = path.join(__dirname, '..', 'src', 'config', 'site.ts');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
};

function printBox(lines, width = 65) {
  const border = '─'.repeat(width);
  console.log(`\n┌${border}┐`);
  lines.forEach(line => {
    const padding = width - stripAnsi(line).length;
    console.log(`│ ${line}${' '.repeat(Math.max(0, padding - 1))}│`);
  });
  console.log(`└${border}┘\n`);
}

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

function displaySupportMessage(recipeName = null) {
  const title = recipeName
    ? `${colors.bright}${colors.cyan}✨ Premium Recipe: ${recipeName}${colors.reset}`
    : `${colors.bright}${colors.cyan}✨ Premium Features${colors.reset}`;

  const lines = [
    '',
    title,
    '',
    'You\'re about to use premium features. Premium includes:',
    '',
    `  ${colors.yellow}•${colors.reset} Agency, Product Launch, App Download, Newsletter recipes`,
    `  ${colors.yellow}•${colors.reset} SEO Suite (meta tags, OG, Twitter Cards, sitemap)`,
    `  ${colors.yellow}•${colors.reset} Future premium components`,
    '',
    'These features are free to use, but if you find them',
    'valuable, please consider supporting development:',
    '',
    `  ${colors.magenta}☕${colors.reset} Ko-fi:     ${colors.blue}https://ko-fi.com/sofondo${colors.reset}`,
    `  ${colors.magenta}💜${colors.reset} Sponsor:   ${colors.blue}https://github.com/sponsors/sofondo${colors.reset}`,
    '',
    `${colors.dim}─────────────────────────────────────────────────────────────${colors.reset}`,
    '',
    `Press ${colors.green}Enter${colors.reset} to unlock premium, or ${colors.yellow}'s'${colors.reset} to skip...`,
    '',
  ];

  printBox(lines);
}

function unlockPremium() {
  try {
    let content = fs.readFileSync(SITE_CONFIG_PATH, 'utf8');

    // Replace premiumUnlocked: false with premiumUnlocked: true
    if (content.includes('premiumUnlocked: false')) {
      content = content.replace('premiumUnlocked: false', 'premiumUnlocked: true');
      fs.writeFileSync(SITE_CONFIG_PATH, content, 'utf8');
      return true;
    } else if (content.includes('premiumUnlocked: true')) {
      return true; // Already unlocked
    }

    return false;
  } catch (error) {
    console.error(`${colors.yellow}Warning: Could not update site.ts:${colors.reset}`, error.message);
    return false;
  }
}

function checkIfUnlocked() {
  try {
    const content = fs.readFileSync(SITE_CONFIG_PATH, 'utf8');
    return content.includes('premiumUnlocked: true');
  } catch (error) {
    return false;
  }
}

async function waitForInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    // Enable raw mode to capture single keystrokes
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.once('data', (data) => {
      const key = data.toString().toLowerCase();
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
      rl.close();
      resolve(key);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const recipeName = args.find(arg => arg.startsWith('--recipe='))?.split('=')[1];
  const forceShow = args.includes('--force');

  // Check if already unlocked (unless force flag is set)
  if (!forceShow && checkIfUnlocked()) {
    console.log(`${colors.green}✓${colors.reset} Premium features are already unlocked.`);
    process.exit(0);
  }

  displaySupportMessage(recipeName);

  const key = await waitForInput();

  if (key === 's' || key === 'q' || key === '\x1b') {
    // 's', 'q', or Escape to skip
    console.log(`\n${colors.dim}Skipped. Run again anytime to unlock premium.${colors.reset}\n`);
  } else {
    // Enter or any other key to unlock
    const success = unlockPremium();
    if (success) {
      console.log(`\n${colors.green}✓${colors.reset} Premium unlocked! You won't see this prompt again.`);
      console.log(`${colors.dim}  (You can still support us anytime at the links above)${colors.reset}\n`);
    }
  }
}

// Export for use in other scripts
export { displaySupportMessage, unlockPremium, checkIfUnlocked };

// Run if called directly
main().catch(console.error);
