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
  '--header-height'?: string; // Header height (e.g., '72px', '64px')
  '--header-cta-bg'?: string;
  '--header-cta-text'?: string;
  '--header-cta-hover-bg'?: string;
  '--header-cta-padding'?: string;
  '--header-cta-radius'?: string;
  '--header-cta-font-size'?: string; // CTA button font size
  '--header-cta-font-weight'?: string; // CTA button font weight

  // Logo styling
  '--header-logo-font'?: string;
  '--header-logo-size'?: string; // Logo text size (e.g., '1.5rem', '24px')
  '--header-logo-weight'?: string; // Logo text weight (e.g., '600')
  '--header-logo-color'?: string;
  '--header-logo-accent'?: string;
  '--header-logo-accent-color'?: string; // Accent color for two-part logo names
  '--footer-logo-accent'?: string; // Accent color for footer logo

  // Footer styling
  '--footer-bg'?: string;
  '--footer-text'?: string;
  '--footer-heading'?: string;
  '--footer-link'?: string;
  '--footer-link-hover'?: string;
  '--footer-max-width'?: string;
}

export interface RecipeFonts {
  google?: string; // Google Fonts URL
  preload?: { href: string; type: string }[]; // Self-hosted fonts to preload
}

export interface RecipeLogo {
  src: string; // Path to logo image (relative to public/)
  alt: string;
  width: number;
  height: number;
  emoji?: string; // Emoji to display as logo icon
  char?: string; // Character to display in gradient-box style logo
  svgIcon?: string; // Inline SVG markup for custom icon (e.g., wave icon for nonprofit)
}

/**
 * Logo mark type for header display
 * - 'text-only': Just the brand name text
 * - 'icon-text': Icon/image next to brand name
 * - 'gradient-box': Gradient colored box icon (agency style)
 */
export type LogoMarkType = 'text-only' | 'icon-text' | 'gradient-box';

/**
 * Whether to show the template name next to the brand in the logo
 * Default is true for most recipes, but false for nonprofit/newsletter style
 */

/**
 * Footer layout type
 * - 'grid-4col': Multi-column grid (corporate, startup, nonprofit style)
 * - 'flex-row': Single row with logo+links left, copyright right (agency style)
 * - 'flex-sections': Two sections - brand left, links right (product, app style)
 * - 'minimal-centered': Centered brand, tagline, links, copyright (newsletter style)
 */
export type FooterLayoutType = 'grid-4col' | 'flex-row' | 'flex-sections' | 'minimal-centered';

/**
 * Header layout type
 * - 'standard': Logo left, nav right, CTA right (default)
 * - 'centered': Logo left, nav center, CTA right
 * - 'minimal': Logo left, CTA right only (no nav)
 */
export type HeaderLayoutType = 'standard' | 'centered' | 'minimal';

/**
 * CTA button shape
 * - 'rounded': Rounded corners (6-8px radius)
 * - 'pill': Fully rounded pill shape
 */
export type CTAShapeType = 'rounded' | 'pill';

/**
 * Social link style
 * - 'icons': Lucide icons
 * - 'initials': Circular badges with initials (FB, TW, etc.)
 * - 'text': Plain text links
 * - 'none': No social links
 */
export type SocialStyleType = 'icons' | 'initials' | 'text' | 'none';

/**
 * Social links position
 * - 'brand': Under the brand/logo section (nonprofit style)
 * - 'column': In a separate link group column (corporate style)
 */
export type SocialPositionType = 'brand' | 'column';

/**
 * Social link configuration
 */
export interface SocialLinkConfig {
  platform: string;
  label: string;
  href: string;
}

/**
 * Footer link group for grid layouts
 */
export interface FooterLinkGroupConfig {
  heading: string;
  links: { label: string; href: string }[];
}

/**
 * Legal link (Privacy Policy, Terms of Service)
 */
export interface LegalLink {
  label: string;
  href: string;
}

/**
 * Navigation item - simple link
 */
export interface RecipeNavLink {
  label: string;
  href: string;
}

/**
 * Navigation configuration for recipes
 */
export interface RecipeNavConfig {
  items: RecipeNavLink[];
  cta: {
    label: string;
    href: string;
  };
}

/**
 * Footer links for recipes
 */
export interface RecipeFooterLinks {
  links: { label: string; href: string }[];
}

export interface Recipe {
  name: string;
  nameAccent?: string; // Second part of name in accent color (e.g., "Corp" in "NexusCorp")
  description: string;
  tagline: string; // Footer tagline
  category: 'marketing' | 'landing' | 'nonprofit';
  premium?: boolean; // True for premium recipes (agency, product-launch, app-download, newsletter)
  source: string;
  theme: RecipeTheme;
  fonts?: RecipeFonts;
  logo?: RecipeLogo;
  logoMark?: LogoMarkType; // How the logo is displayed in the header
  footerLayout?: FooterLayoutType; // Footer layout style
  // Header configuration
  headerLayout?: HeaderLayoutType; // Nav alignment
  ctaShape?: CTAShapeType; // CTA button shape
  // Footer configuration
  socialStyle?: SocialStyleType; // How social links are displayed
  socialPosition?: SocialPositionType; // Where social links appear: 'brand' or 'column'
  socialLinks?: SocialLinkConfig[]; // Social platform links
  linkGroups?: FooterLinkGroupConfig[]; // Footer link columns
  legalLinks?: LegalLink[]; // Privacy/Terms links
  legalInBottomRow?: boolean; // Show legal links in separate row
  showLegalLinks?: boolean; // Show legal links
  showCopyright?: boolean; // Show copyright line
  showTemplateCredit?: boolean; // Show template credit line
  isDark?: boolean; // True if this is a dark-themed recipe (affects scrollbar, sub-nav colors)
  copyrightSuffix?: string; // Custom suffix after copyright (e.g., "Made with ☕ in Brooklyn.")
  // Navigation configuration (optional - defaults to template siteConfig)
  nav?: RecipeNavConfig;
  // Footer links for flex layouts (optional - defaults to template siteConfig)
  footerLinks?: { label: string; href: string }[];
}

export const recipes: Record<string, Recipe> = {
  corporate: {
    name: 'Nexus',
    nameAccent: 'Corp',
    description: 'Professional business consulting with elegant navy and gold palette',
    tagline: 'Transforming businesses through strategic excellence and innovative solutions since 1999.',
    category: 'marketing',
    source: 'corporate',
    // Navigation - simple links for corporate
    nav: {
      items: [
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Testimonials', href: '#testimonials' },
      ],
      cta: { label: 'Contact Us', href: '#contact' },
    },
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
      // Header: light background with navy CTA - professional, tall header
      '--header-bg': 'rgba(255, 255, 255, 0.95)',
      '--header-text': '#57534e',
      '--header-border': '#e7e5e4',
      '--header-height': '72px',
      '--header-cta-bg': '#1e3a5f',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': '#152a45',
      '--header-cta-padding': '0.625rem 1.25rem',
      '--header-cta-radius': '6px',
      '--header-cta-font-size': '0.9375rem',
      '--header-cta-font-weight': '500',
      // Logo styling
      '--header-logo-font': 'var(--font-serif)',
      '--header-logo-size': '1.5rem',
      '--header-logo-color': '#1e3a5f',
      '--header-logo-accent': '#c9a227',
      '--header-logo-accent-color': '#c9a227',
      '--footer-logo-accent': '#c9a227',
      // Footer: dark navy background
      '--footer-bg': '#152a45',
      '--footer-border': 'rgba(255, 255, 255, 0.1)',
      '--footer-text': 'rgba(255, 255, 255, 0.7)',
      '--footer-heading': '#ffffff',
      '--footer-link': 'rgba(255, 255, 255, 0.7)',
      '--footer-link-hover': '#c9a227',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
    },
    logo: {
      src: '', // Empty for text-only logo
      alt: 'Nexus Corp Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'text-only', // Corporate uses serif text only, no icon
    showTemplateName: false,
    footerLayout: 'grid-4col', // Multi-column grid footer
    // Header: standard layout with rounded CTA
    headerLayout: 'standard',
    ctaShape: 'rounded',
    // Footer: no special social icons - social links in "Connect" link group
    socialStyle: 'none',
    socialPosition: 'column', // Not used since socialStyle is 'none'
    linkGroups: [
      {
        heading: 'Explore',
        links: [
          { label: 'Features', href: '/features/' },
          { label: 'Showcase', href: '/showcase/' },
        ],
      },
      {
        heading: 'Docs',
        links: [
          { label: 'Documentation', href: '/docs/' },
          { label: 'Get Started', href: '/get-started/' },
        ],
      },
      {
        heading: 'Connect',
        links: [
          { label: 'LinkedIn', href: 'https://linkedin.com' },
          { label: 'Twitter', href: 'https://twitter.com' },
          { label: 'GitHub', href: 'https://github.com/dpawelec84/sofondo-mostra' },
        ],
      },
    ],
    legalLinks: [],
    legalInBottomRow: false,
    showLegalLinks: false,
    showCopyright: true,
    showTemplateCredit: true,
  },

  agency: {
    premium: true,
    name: 'Prism',
    description: 'Bold creative agency with vibrant gradients and modern typography',
    tagline: 'We craft digital experiences that captivate, engage, and convert.',
    category: 'marketing',
    source: 'agency',
    theme: {
      '--bg-light': '#0a0a0a',
      '--bg-card': '#141414',
      '--bg-secondary': '#1a1a1a',
      '--text-primary': '#ffffff',
      '--text-secondary': '#a3a3a3',
      '--accent-primary': '#7c3aed',
      '--accent-secondary': '#ec4899',
      '--border-color': '#262626',
      '--font-sans': "'Space Grotesk', system-ui, sans-serif",
      '--font-serif': "'DM Serif Display', Georgia, serif",
      // Header: dark glassmorphism with gradient CTA - bold, edgy
      '--header-bg': 'rgba(10, 10, 10, 0.8)',
      '--header-text': '#a3a3a3',
      '--header-border': '#262626',
      '--header-height': '80px',
      '--header-cta-bg': 'linear-gradient(135deg, #7c3aed, #ec4899)',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': 'linear-gradient(135deg, #6d28d9, #db2777)',
      '--header-cta-padding': '0.75rem 1.5rem',
      '--header-cta-radius': '100px',
      '--header-cta-font-size': '0.9375rem',
      '--header-cta-font-weight': '600',
      // Logo styling
      '--header-logo-font': 'var(--font-serif)',
      '--header-logo-size': '1.75rem',
      '--header-logo-color': '#ffffff',
      '--header-logo-accent': '#a855f7',
      '--header-logo-weight': '400',
      // Footer: dark background
      '--footer-bg': '#0a0a0a',
      '--footer-border': 'rgba(255, 255, 255, 0.1)',
      '--footer-text': '#a3a3a3',
      '--footer-heading': '#ffffff',
      '--footer-link': '#a3a3a3',
      '--footer-link-hover': '#ffffff',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Serif+Display&display=swap',
    },
    logo: {
      src: '/logos/agency-logo.svg',
      alt: 'Prism Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'gradient-box', // Agency uses gradient box icon + serif text
    showTemplateName: false,
    footerLayout: 'flex-row', // Single row: logo + links left, copyright right
    // Header: standard layout with pill CTA
    headerLayout: 'standard',
    ctaShape: 'pill',
    // Footer: minimal (flex-row uses simple links, no social column)
    socialStyle: 'none',
    showCopyright: true,
    showTemplateCredit: true,
    isDark: true, // Dark themed recipe
    // Navigation - simple links for agency
    nav: {
      items: [
        { label: 'Work', href: '#work' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
      ],
      cta: { label: "Let's Talk", href: '#contact' },
    },
    // Footer links - social links for agency style
    footerLinks: [
      { label: 'Instagram', href: '#' },
      { label: 'Dribbble', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter', href: '#' },
    ],
  },

  startup: {
    name: 'Quantum',
    description: 'Clean tech startup with modern blue and green accents',
    tagline: 'Building the future of work, one innovation at a time.',
    category: 'marketing',
    source: 'startup',
    // Navigation - simple links for startup
    nav: {
      items: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'About', href: '#about' },
      ],
      cta: { label: 'Get Started', href: '#' },
    },
    theme: {
      '--bg-light': '#09090b',
      '--bg-card': '#18181b',
      '--bg-secondary': '#27272a',
      '--text-primary': '#fafafa',
      '--text-secondary': '#a1a1aa',
      '--accent-primary': '#a855f7',
      '--accent-secondary': '#6366f1',
      '--border-color': '#27272a',
      '--font-sans': "'Outfit', system-ui, sans-serif",
      '--font-serif': "'Sora', system-ui, sans-serif",
      // Header: dark glassmorphism with gradient CTA
      '--header-bg': 'rgba(9, 9, 11, 0.8)',
      '--header-text': '#a1a1aa',
      '--header-border': 'rgba(255, 255, 255, 0.05)',
      '--header-height': '64px',
      '--header-cta-bg': 'linear-gradient(135deg, #a855f7, #6366f1)',
      '--header-cta-text': '#fafafa',
      '--header-cta-hover-bg': 'linear-gradient(135deg, #9333ea, #4f46e5)',
      '--header-cta-padding': '0.5rem 1rem',
      '--header-cta-radius': '6px',
      '--header-cta-font-size': '0.9375rem',
      '--header-cta-font-weight': '500',
      // Logo styling
      '--header-logo-font': 'var(--font-serif)',
      '--header-logo-size': '1.25rem',
      '--header-logo-color': '#fafafa',
      '--header-logo-accent': '#6366f1',
      '--header-logo-weight': '600',
      // Footer: dark background
      '--footer-bg': '#09090b',
      '--footer-border': 'rgba(255, 255, 255, 0.1)',
      '--footer-text': '#71717a',
      '--footer-heading': '#fafafa',
      '--footer-link': '#71717a',
      '--footer-link-hover': '#fafafa',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap',
    },
    logo: {
      src: '', // Empty for gradient-box style
      alt: 'Quantum Logo',
      width: 32,
      height: 32,
      char: 'Q', // Character displayed in gradient-box
    },
    logoMark: 'gradient-box', // Startup uses gradient box with letter
    showTemplateName: false,
    footerLayout: 'grid-4col', // Multi-column grid footer
    // Header: standard layout with rounded CTA
    headerLayout: 'standard',
    ctaShape: 'rounded',
    // Footer: icons style with tech-focused links
    socialStyle: 'icons',
    socialLinks: [
      { platform: 'github', label: 'GitHub', href: 'https://github.com/dpawelec84/sofondo-mostra' },
      { platform: 'twitter', label: 'Twitter', href: 'https://twitter.com' },
      { platform: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
    ],
    linkGroups: [
      {
        heading: 'Product',
        links: [
          { label: 'Features', href: '/features/' },
          { label: 'Showcase', href: '/showcase/' },
          { label: 'Documentation', href: '/docs/' },
        ],
      },
      {
        heading: 'Connect',
        links: [
          { label: 'GitHub', href: 'https://github.com/dpawelec84/sofondo-mostra' },
          { label: 'Twitter', href: 'https://twitter.com' },
          { label: 'LinkedIn', href: 'https://linkedin.com' },
        ],
      },
    ],
    legalLinks: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
    showLegalLinks: true,
    showCopyright: true,
    showTemplateCredit: true,
    legalInBottomRow: false,
    isDark: true, // Dark themed recipe
  },

  'product-launch': {
    premium: true,
    name: 'aura',
    description: 'Eye-catching product launch with vibrant orange and dark theme',
    tagline: 'Ignite your next big idea with tools designed for creators.',
    category: 'landing',
    source: 'product-launch',
    // Navigation - simple links for product launch
    nav: {
      items: [
        { label: 'Features', href: '#features' },
        { label: 'Specs', href: '#specs' },
      ],
      cta: { label: 'Pre-order Now', href: '#preorder' },
    },
    theme: {
      '--bg-light': '#faf9f7',
      '--bg-card': '#ffffff',
      '--bg-secondary': '#f0eeec',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#666666',
      '--accent-primary': '#f97316',
      '--accent-secondary': '#fbbf24',
      '--border-color': '#e7e5e4',
      '--font-sans': "'Manrope', system-ui, sans-serif",
      '--font-serif': "'Fraunces', Georgia, serif",
      // Header: warm light with orange CTA - energetic, product-focused
      '--header-bg': 'rgba(250, 249, 247, 0.9)',
      '--header-text': '#666666',
      '--header-border': 'transparent',
      '--header-height': '64px',
      '--header-cta-bg': '#f97316',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': '#ea580c',
      '--header-cta-padding': '0.625rem 1.25rem',
      '--header-cta-radius': '100px',
      '--header-cta-font-size': '0.875rem',
      '--header-cta-font-weight': '600',
      // Logo styling
      '--header-logo-font': 'var(--font-serif)',
      '--header-logo-size': '1.75rem',
      '--header-logo-color': '#1a1a1a',
      '--header-logo-accent': '#f97316',
      // Footer: dark background
      '--footer-bg': '#1a1a1a',
      '--footer-border': 'rgba(255, 255, 255, 0.1)',
      '--footer-text': '#666666',
      '--footer-heading': '#ffffff',
      '--footer-link': '#999999',
      '--footer-link-hover': '#ffffff',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Fraunces:wght@400;500;600;700&display=swap',
    },
    logo: {
      src: '', // Empty for text-only logo
      alt: 'aura Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'text-only', // Product launch uses serif text only
    showTemplateName: false,
    footerLayout: 'flex-sections', // Two sections: brand left, links right
    // Header: centered layout with pill CTA
    headerLayout: 'centered',
    ctaShape: 'pill',
    // Footer: minimal (flex-sections uses simple links)
    socialStyle: 'none',
    showCopyright: true,
    showTemplateCredit: true,
  },

  'app-download': {
    premium: true,
    name: 'zenith',
    description: 'Modern app landing page with purple gradient theme',
    tagline: 'Your personal productivity companion, available everywhere.',
    category: 'landing',
    source: 'app-download',
    // Navigation - simple links for app download
    nav: {
      items: [
        { label: 'Features', href: '#features' },
        { label: 'Reviews', href: '#reviews' },
      ],
      cta: { label: 'Download App', href: '#download' },
    },
    theme: {
      '--bg-light': '#f8f5f2',
      '--bg-card': '#ffffff',
      '--bg-secondary': '#f3eeea',
      '--text-primary': '#2d2a26',
      '--text-secondary': '#666666',
      '--accent-primary': '#8b5cf6',
      '--accent-secondary': '#7c3aed',
      '--border-color': '#e7e5e4',
      '--font-sans': "'Plus Jakarta Sans', system-ui, sans-serif",
      '--font-serif': "'Crimson Pro', Georgia, serif",
      // Header: light with purple gradient CTA - modern app style
      '--header-bg': 'rgba(248, 245, 242, 0.9)',
      '--header-text': '#666666',
      '--header-border': 'transparent',
      '--header-height': '72px',
      '--header-cta-bg': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': 'linear-gradient(135deg, #7c3aed, #6d28d9)',
      '--header-cta-padding': '0.875rem 1.75rem',
      '--header-cta-radius': '12px',
      '--header-cta-font-size': '0.9375rem',
      '--header-cta-font-weight': '600',
      // Logo styling
      '--header-logo-font': 'var(--font-sans)',
      '--header-logo-size': '1.5rem',
      '--header-logo-color': '#2d2a26',
      '--header-logo-accent': '#7c3aed',
      // Footer: dark background
      '--footer-bg': '#1a1a1a',
      '--footer-border': 'rgba(255, 255, 255, 0.1)',
      '--footer-text': '#ffffff',
      '--footer-heading': '#ffffff',
      '--footer-link': '#999999',
      '--footer-link-hover': '#ffffff',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap',
    },
    logo: {
      src: '',
      alt: 'zenith Logo',
      width: 32,
      height: 32,
      emoji: '🧘',
    },
    logoMark: 'icon-text', // App uses emoji icon + text
    showTemplateName: false,
    footerLayout: 'flex-sections', // Two sections: brand left, links right
    // Header: centered layout with rounded CTA
    headerLayout: 'centered',
    ctaShape: 'rounded',
    // Footer: minimal with legal links
    socialStyle: 'none',
    legalLinks: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
      { label: 'Support', href: '/support/' },
    ],
    showLegalLinks: true,
    showCopyright: true,
    showTemplateCredit: true,
  },

  newsletter: {
    premium: true,
    name: 'The Weekly Spark',
    description: 'Clean newsletter signup with warm amber accents',
    tagline: 'Curated insights and inspiration delivered to your inbox every week.',
    category: 'landing',
    source: 'newsletter',
    // Navigation - standard layout with nav links visible
    nav: {
      items: [
        { label: 'Archive', href: '#archive' },
        { label: 'About', href: '#about' },
        { label: 'FAQ', href: '#faq' },
      ],
      cta: { label: 'Subscribe', href: '#subscribe' },
    },
    theme: {
      '--bg-light': '#fffcf7',
      '--bg-card': '#ffffff',
      '--bg-secondary': '#fef7ed',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#666666',
      '--accent-primary': '#059669',
      '--accent-secondary': '#10b981',
      '--border-color': '#f0f0f0',
      '--font-sans': "'DM Sans', system-ui, sans-serif",
      '--font-serif': "'Libre Baskerville', Georgia, serif",
      // Header: warm light with green CTA - minimal clean design
      '--header-bg': 'rgba(253, 251, 247, 0.95)',
      '--header-text': '#6B6B6B',
      '--header-border': '#E8E4DC',
      '--header-height': '56px',
      '--header-cta-bg': '#059669',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': '#047857',
      '--header-cta-padding': '0.5rem 1rem',
      '--header-cta-radius': '4px',
      '--header-cta-font-size': '0.875rem',
      '--header-cta-font-weight': '500',
      // Logo styling - uses serif font like original
      '--header-logo-font': "'Libre Baskerville', Georgia, serif",
      '--header-logo-size': '1.125rem',
      '--header-logo-weight': '600',
      '--header-logo-color': '#2C2C2C',
      '--header-logo-accent': '#059669',
      // Footer: inherits from page background (transparent)
      '--footer-bg': '#fffcf7',
      '--footer-text': '#666666',
      '--footer-heading': '#1a1a1a',
      '--footer-link': '#666666',
      '--footer-link-hover': '#059669',
      '--footer-max-width': '800px',
      '--container-width': '800px',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
    },
    logo: {
      src: '',
      alt: 'The Weekly Spark Logo',
      width: 32,
      height: 32,
      emoji: '✦',
    },
    logoMark: 'icon-text', // Newsletter uses spark symbol + text
    showTemplateName: false, // Don't show "Mostra" after brand name
    footerLayout: 'minimal-centered', // Centered brand, tagline, links, copyright
    // Header: standard layout with nav links
    headerLayout: 'standard',
    navSpacing: 'compact',
    ctaShape: 'rounded',
    // Footer: minimal centered layout
    socialStyle: 'none',
    showCopyright: true,
    showTemplateCredit: true,
    copyrightSuffix: 'Made with intention in Portland.',
    // Footer links for newsletter style
    footerLinks: [
      { label: 'Archive', href: '#archive' },
      { label: 'About', href: '#about' },
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Unsubscribe', href: '#unsubscribe' },
    ],
  },

  nonprofit: {
    name: 'Ocean Guardians',
    description: 'Non-profit with calming ocean blues and eco-friendly greens',
    tagline: 'Protecting our oceans and marine life for generations to come.',
    category: 'nonprofit',
    source: 'nonprofit',
    // Navigation - simple links for nonprofit
    nav: {
      items: [
        { label: 'Our Mission', href: '#mission' },
        { label: 'Programs', href: '#programs' },
        { label: 'Get Involved', href: '#involve' },
      ],
      cta: { label: 'Donate Now', href: '#donate' },
    },
    theme: {
      '--bg-light': '#f0f7ff',
      '--bg-card': '#ffffff',
      '--bg-secondary': '#f8fafc',
      '--text-primary': '#0f172a',
      '--text-secondary': '#64748b',
      '--accent-primary': '#0369a1',
      '--accent-secondary': '#0ea5e9',
      '--border-color': '#e2e8f0',
      '--font-sans': "'Source Sans 3', system-ui, sans-serif",
      '--font-serif': "'Merriweather', Georgia, serif",
      // Header: light blue-tinted solid background with blue CTA
      '--header-bg': '#f0f7ff',
      '--header-text': '#475569',
      '--header-border': 'transparent',
      '--header-height': '56px',
      '--header-cta-bg': '#0369a1',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': '#0284c7',
      '--header-cta-padding': '0.625rem 1.25rem',
      '--header-cta-radius': '6px',
      '--header-cta-font-size': '0.875rem',
      '--header-cta-font-weight': '600',
      // Logo styling
      '--header-logo-font': 'var(--font-serif)',
      '--header-logo-size': '1.25rem',
      '--header-logo-color': '#0369a1',
      '--header-logo-accent': '#0369a1',
      // Footer: dark blue background
      '--footer-bg': '#0f172a',
      '--footer-border': 'rgba(255, 255, 255, 0.1)',
      '--footer-text': '#94a3b8',
      '--footer-heading': '#ffffff',
      '--footer-link': '#94a3b8',
      '--footer-link-hover': '#0ea5e9',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap',
    },
    logo: {
      src: '',
      alt: 'Ocean Guardians Logo',
      width: 32,
      height: 32,
      svgIcon: '<svg viewBox="0 0 32 32" width="32" height="32"><path fill="currentColor" d="M2 20c4-4 8-4 12 0s8 4 12 0c2-2 4-3 6-3v6c-2 0-4 1-6 3-4 4-8 4-12 0s-8-4-12 0v-6z"/><path fill="currentColor" opacity="0.6" d="M2 14c4-4 8-4 12 0s8 4 12 0c2-2 4-3 6-3v6c-2 0-4 1-6 3-4 4-8 4-12 0s-8-4-12 0v-6z"/></svg>',
    },
    logoMark: 'icon-text', // Nonprofit uses SVG wave icon + text
    showTemplateName: false, // Don't show "Mostra" after brand name
    footerLayout: 'grid-4col', // Multi-column grid footer with social icons
    // Header: centered layout (logo left, nav center, CTA right) with rounded CTA
    headerLayout: 'centered',
    ctaShape: 'rounded',
    // Footer: initials style social under brand, 3 link groups
    socialStyle: 'initials',
    socialPosition: 'brand', // Social links under brand/logo
    socialLinks: [
      { platform: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
      { platform: 'twitter', label: 'Twitter', href: 'https://twitter.com' },
      { platform: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
      { platform: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
    ],
    linkGroups: [
      {
        heading: 'Our Work',
        links: [
          { label: 'Species Protection', href: '#' },
          { label: 'Clean Coasts', href: '#' },
          { label: 'Ocean Education', href: '#' },
          { label: 'Policy Advocacy', href: '#' },
        ],
      },
      {
        heading: 'Get Involved',
        links: [
          { label: 'Donate', href: '#' },
          { label: 'Volunteer', href: '#' },
          { label: 'Partner', href: '#' },
          { label: 'Careers', href: '#' },
        ],
      },
      {
        heading: 'About',
        links: [
          { label: 'Our Story', href: '#' },
          { label: 'Team', href: '#' },
          { label: 'Financials', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
    ],
    legalLinks: [
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Use', href: '/terms/' },
    ],
    showLegalLinks: true,
    showCopyright: true,
    showTemplateCredit: true,
    copyrightSuffix: 'Registered 501(c)(3) nonprofit. EIN: 12-3456789',
    legalInBottomRow: false, // Legal links inline in footer bottom
  },
};

export const getRecipe = (name: string): Recipe | undefined => recipes[name];

export const listRecipes = (): string[] => Object.keys(recipes);
