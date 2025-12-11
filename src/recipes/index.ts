/**
 * Recipe Configuration
 *
 * Each recipe defines:
 * - name: Display name
 * - description: Short description
 * - source: Path to the showcase example page (relative to src/pages/showcase/examples/)
 * - theme: CSS variable overrides for global theming
 * - fonts: Google Fonts to load (optional)
 */

export interface RecipeTheme {
  // Core colors
  '--bg-light': string;
  '--bg-card': string;
  '--bg-secondary': string;
  '--text-primary': string;
  '--text-secondary': string;
  '--accent-primary': string;
  '--accent-secondary': string;
  '--border-color': string;

  // Optional overrides
  '--font-sans'?: string;
  '--font-serif'?: string;
}

export interface RecipeFonts {
  google?: string; // Google Fonts URL
  preload?: { href: string; type: string }[]; // Self-hosted fonts to preload
}

export interface Recipe {
  name: string;
  description: string;
  category: 'marketing' | 'landing' | 'nonprofit';
  source: string;
  theme: RecipeTheme;
  fonts?: RecipeFonts;
}

export const recipes: Record<string, Recipe> = {
  corporate: {
    name: 'Nexus Corp',
    description: 'Professional business consulting with elegant navy and gold palette',
    category: 'marketing',
    source: 'corporate',
    theme: {
      '--bg-light': '#fafafa',
      '--bg-card': '#ffffff',
      '--bg-secondary': '#f5f5f4',
      '--text-primary': '#1c1917',
      '--text-secondary': '#57534e',
      '--accent-primary': '#1e3a5f',
      '--accent-secondary': '#c9a227',
      '--border-color': '#e7e5e4',
      '--font-sans': "'Inter', system-ui, sans-serif",
      '--font-serif': "'Playfair Display', Georgia, serif",
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
    },
  },

  agency: {
    name: 'Pixel Flow Agency',
    description: 'Bold creative agency with vibrant gradients and modern typography',
    category: 'marketing',
    source: 'agency',
    theme: {
      '--bg-light': '#0f0f0f',
      '--bg-card': '#1a1a1a',
      '--bg-secondary': '#141414',
      '--text-primary': '#ffffff',
      '--text-secondary': '#a1a1aa',
      '--accent-primary': '#a855f7',
      '--accent-secondary': '#ec4899',
      '--border-color': '#27272a',
      '--font-sans': "'Space Grotesk', system-ui, sans-serif",
      '--font-serif': "'Space Grotesk', system-ui, sans-serif",
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    },
  },

  startup: {
    name: 'Velocity Tech',
    description: 'Clean tech startup with modern blue and green accents',
    category: 'marketing',
    source: 'startup',
    theme: {
      '--bg-light': '#fafafa',
      '--bg-card': '#ffffff',
      '--bg-secondary': '#f1f5f9',
      '--text-primary': '#0f172a',
      '--text-secondary': '#64748b',
      '--accent-primary': '#2563eb',
      '--accent-secondary': '#10b981',
      '--border-color': '#e2e8f0',
      '--font-sans': "'Inter', system-ui, sans-serif",
      '--font-serif': "'Inter', system-ui, sans-serif",
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
  },

  'product-launch': {
    name: 'Spark Product Launch',
    description: 'Eye-catching product launch with vibrant orange and dark theme',
    category: 'landing',
    source: 'product-launch',
    theme: {
      '--bg-light': '#0a0a0a',
      '--bg-card': '#141414',
      '--bg-secondary': '#1a1a1a',
      '--text-primary': '#ffffff',
      '--text-secondary': '#a1a1aa',
      '--accent-primary': '#f97316',
      '--accent-secondary': '#fbbf24',
      '--border-color': '#27272a',
      '--font-sans': "'Inter', system-ui, sans-serif",
      '--font-serif': "'Inter', system-ui, sans-serif",
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
  },

  'app-download': {
    name: 'Zenith App',
    description: 'Modern app landing page with purple gradient theme',
    category: 'landing',
    source: 'app-download',
    theme: {
      '--bg-light': '#0f0a1a',
      '--bg-card': '#1a1025',
      '--bg-secondary': '#150d20',
      '--text-primary': '#ffffff',
      '--text-secondary': '#a78bfa',
      '--accent-primary': '#8b5cf6',
      '--accent-secondary': '#a855f7',
      '--border-color': '#2e1f42',
      '--font-sans': "'Inter', system-ui, sans-serif",
      '--font-serif': "'Inter', system-ui, sans-serif",
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
  },

  newsletter: {
    name: 'Weekly Spark Newsletter',
    description: 'Clean newsletter signup with warm amber accents',
    category: 'landing',
    source: 'newsletter',
    theme: {
      '--bg-light': '#fffbeb',
      '--bg-card': '#ffffff',
      '--bg-secondary': '#fef3c7',
      '--text-primary': '#1c1917',
      '--text-secondary': '#78716c',
      '--accent-primary': '#d97706',
      '--accent-secondary': '#f59e0b',
      '--border-color': '#fed7aa',
      '--font-sans': "'Inter', system-ui, sans-serif",
      '--font-serif': "'Playfair Display', Georgia, serif",
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
    },
  },

  nonprofit: {
    name: 'Ocean Guardians',
    description: 'Non-profit with calming ocean blues and eco-friendly greens',
    category: 'nonprofit',
    source: 'nonprofit',
    theme: {
      '--bg-light': '#f0fdfa',
      '--bg-card': '#ffffff',
      '--bg-secondary': '#ccfbf1',
      '--text-primary': '#134e4a',
      '--text-secondary': '#5eead4',
      '--accent-primary': '#0d9488',
      '--accent-secondary': '#14b8a6',
      '--border-color': '#99f6e4',
      '--font-sans': "'Inter', system-ui, sans-serif",
      '--font-serif': "'Playfair Display', Georgia, serif",
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
    },
  },
};

export const getRecipe = (name: string): Recipe | undefined => recipes[name];

export const listRecipes = (): string[] => Object.keys(recipes);
