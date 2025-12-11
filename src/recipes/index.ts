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

  // Header styling
  '--header-bg'?: string;
  '--header-text'?: string;
  '--header-border'?: string;
  '--header-cta-bg'?: string;
  '--header-cta-text'?: string;
  '--header-cta-hover-bg'?: string;

  // Footer styling
  '--footer-bg'?: string;
  '--footer-text'?: string;
  '--footer-heading'?: string;
  '--footer-link'?: string;
  '--footer-link-hover'?: string;
}

export interface RecipeFonts {
  google?: string; // Google Fonts URL
  preload?: { href: string; type: string }[]; // Self-hosted fonts to preload
}

export interface Recipe {
  name: string;
  description: string;
  tagline: string; // Footer tagline
  category: 'marketing' | 'landing' | 'nonprofit';
  source: string;
  theme: RecipeTheme;
  fonts?: RecipeFonts;
}

export const recipes: Record<string, Recipe> = {
  corporate: {
    name: 'Nexus Corp',
    description: 'Professional business consulting with elegant navy and gold palette',
    tagline: 'Transforming businesses through strategic excellence and innovative solutions since 1999.',
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
      // Header: light background with navy CTA
      '--header-bg': 'rgba(255, 255, 255, 0.95)',
      '--header-text': '#57534e',
      '--header-border': '#e7e5e4',
      '--header-cta-bg': '#1e3a5f',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': '#152a45',
      // Footer: dark navy background
      '--footer-bg': '#152a45',
      '--footer-text': 'rgba(255, 255, 255, 0.7)',
      '--footer-heading': '#ffffff',
      '--footer-link': 'rgba(255, 255, 255, 0.7)',
      '--footer-link-hover': '#c9a227',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
    },
  },

  agency: {
    name: 'Pixel Flow Agency',
    description: 'Bold creative agency with vibrant gradients and modern typography',
    tagline: 'We craft digital experiences that captivate, engage, and convert.',
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
      // Header: dark glassmorphism with gradient CTA
      '--header-bg': 'rgba(10, 10, 10, 0.8)',
      '--header-text': '#a1a1aa',
      '--header-border': '#27272a',
      '--header-cta-bg': 'linear-gradient(135deg, #a855f7, #ec4899)',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': 'linear-gradient(135deg, #9333ea, #db2777)',
      // Footer: dark background
      '--footer-bg': '#0a0a0a',
      '--footer-text': '#a1a1aa',
      '--footer-heading': '#ffffff',
      '--footer-link': '#a1a1aa',
      '--footer-link-hover': '#a855f7',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    },
  },

  startup: {
    name: 'Velocity Tech',
    description: 'Clean tech startup with modern blue and green accents',
    tagline: 'Building the future of work, one innovation at a time.',
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
    tagline: 'Ignite your next big idea with tools designed for creators.',
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
    tagline: 'Your personal productivity companion, available everywhere.',
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
    tagline: 'Curated insights and inspiration delivered to your inbox every week.',
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
    tagline: 'Protecting our oceans and marine life for generations to come.',
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
