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
}

/**
 * Logo mark type for header display
 * - 'text-only': Just the brand name text
 * - 'icon-text': Icon/image next to brand name
 * - 'gradient-box': Gradient colored box icon (agency style)
 */
export type LogoMarkType = 'text-only' | 'icon-text' | 'gradient-box';

/**
 * Footer layout type
 * - 'grid-4col': Multi-column grid (corporate, startup, nonprofit style)
 * - 'flex-row': Single row with logo+links left, copyright right (agency style)
 * - 'flex-sections': Two sections - brand left, links right (product, app, newsletter style)
 */
export type FooterLayoutType = 'grid-4col' | 'flex-row' | 'flex-sections';

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

export interface Recipe {
  name: string;
  nameAccent?: string; // Second part of name in accent color (e.g., "Corp" in "NexusCorp")
  description: string;
  tagline: string; // Footer tagline
  category: 'marketing' | 'landing' | 'nonprofit';
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
  showTemplateCredit?: boolean; // Show template credit line
}

export const recipes: Record<string, Recipe> = {
  corporate: {
    name: 'Nexus',
    nameAccent: 'Corp',
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
    footerLayout: 'grid-4col', // Multi-column grid footer
    // Header: standard layout with rounded CTA
    headerLayout: 'standard',
    ctaShape: 'rounded',
    // Footer: no special social icons - social links in "Connect" link group
    socialStyle: 'none',
    socialPosition: 'column', // Not used since socialStyle is 'none'
    linkGroups: [
      {
        heading: 'Services',
        links: [
          { label: 'Strategic Planning', href: '/services/strategic-planning/' },
          { label: 'M&A Advisory', href: '/services/ma-advisory/' },
          { label: 'Performance', href: '/services/performance/' },
          { label: 'Risk Management', href: '/services/risk-management/' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About Us', href: '/about/' },
          { label: 'Leadership', href: '/leadership/' },
          { label: 'Careers', href: '/careers/' },
          { label: 'Contact', href: '/contact/' },
        ],
      },
      {
        heading: 'Connect',
        links: [
          { label: 'LinkedIn', href: 'https://linkedin.com' },
          { label: 'Twitter', href: 'https://twitter.com' },
          { label: 'Newsletter', href: '/newsletter/' },
          { label: 'Press', href: '/press/' },
        ],
      },
    ],
    legalLinks: [],
    legalInBottomRow: false,
    showLegalLinks: false,
    showTemplateCredit: true,
  },

  agency: {
    name: 'Pixel Flow Agency',
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
      // Footer: dark background
      '--footer-bg': '#0a0a0a',
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
      alt: 'Pixel Flow Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'gradient-box', // Agency uses gradient box icon + serif text
    footerLayout: 'flex-row', // Single row: logo + links left, copyright right
    // Header: standard layout with pill CTA
    headerLayout: 'standard',
    ctaShape: 'pill',
    // Footer: minimal (flex-row uses simple links, no social column)
    socialStyle: 'none',
  },

  startup: {
    name: 'Velocity Tech',
    description: 'Clean tech startup with modern blue and green accents',
    tagline: 'Building the future of work, one innovation at a time.',
    category: 'marketing',
    source: 'startup',
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
      // Header: dark glassmorphism with subtle white CTA - minimal, tech-focused
      '--header-bg': 'rgba(9, 9, 11, 0.8)',
      '--header-text': '#a1a1aa',
      '--header-border': 'rgba(255, 255, 255, 0.05)',
      '--header-height': '64px',
      '--header-cta-bg': 'rgba(255, 255, 255, 0.1)',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': 'rgba(255, 255, 255, 0.15)',
      '--header-cta-padding': '0.5rem 1rem',
      '--header-cta-radius': '6px',
      '--header-cta-font-size': '0.9375rem',
      '--header-cta-font-weight': '500',
      // Logo styling
      '--header-logo-font': 'var(--font-serif)',
      '--header-logo-size': '1.25rem',
      '--header-logo-color': '#fafafa',
      '--header-logo-accent': '#6366f1',
      // Footer: dark background
      '--footer-bg': '#09090b',
      '--footer-text': '#71717a',
      '--footer-heading': '#fafafa',
      '--footer-link': '#71717a',
      '--footer-link-hover': '#fafafa',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap',
    },
    logo: {
      src: '/logos/startup-logo.svg',
      alt: 'Velocity Tech Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'icon-text', // Startup uses gradient icon + text
    footerLayout: 'grid-4col', // Multi-column grid footer
    // Header: standard layout with rounded CTA
    headerLayout: 'standard',
    ctaShape: 'rounded',
    // Footer: icons style with tech-focused links
    socialStyle: 'icons',
    socialLinks: [
      { platform: 'github', label: 'GitHub', href: 'https://github.com' },
      { platform: 'twitter', label: 'Twitter', href: 'https://twitter.com' },
      { platform: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
    ],
    linkGroups: [
      {
        heading: 'Product',
        links: [
          { label: 'Features', href: '/features/' },
          { label: 'Pricing', href: '/pricing/' },
          { label: 'Changelog', href: '/changelog/' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Documentation', href: '/docs/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'API', href: '/api/' },
        ],
      },
    ],
    legalLinks: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
    legalInBottomRow: false,
  },

  'product-launch': {
    name: 'Spark Product Launch',
    description: 'Eye-catching product launch with vibrant orange and dark theme',
    tagline: 'Ignite your next big idea with tools designed for creators.',
    category: 'landing',
    source: 'product-launch',
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
      alt: 'Spark Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'text-only', // Product launch uses serif text only
    footerLayout: 'flex-sections', // Two sections: brand left, links right
    // Header: standard layout with pill CTA
    headerLayout: 'standard',
    ctaShape: 'pill',
    // Footer: minimal (flex-sections uses simple links)
    socialStyle: 'none',
  },

  'app-download': {
    name: 'Zenith App',
    description: 'Modern app landing page with purple gradient theme',
    tagline: 'Your personal productivity companion, available everywhere.',
    category: 'landing',
    source: 'app-download',
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
      '--footer-text': '#ffffff',
      '--footer-heading': '#ffffff',
      '--footer-link': '#999999',
      '--footer-link-hover': '#ffffff',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap',
    },
    logo: {
      src: '/logos/app-download-logo.svg',
      alt: 'Zenith App Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'icon-text', // App uses emoji icon + text
    footerLayout: 'flex-sections', // Two sections: brand left, links right
    // Header: standard layout with rounded CTA
    headerLayout: 'standard',
    ctaShape: 'rounded',
    // Footer: minimal (flex-sections uses simple links)
    socialStyle: 'none',
  },

  newsletter: {
    name: 'Weekly Spark Newsletter',
    description: 'Clean newsletter signup with warm amber accents',
    tagline: 'Curated insights and inspiration delivered to your inbox every week.',
    category: 'landing',
    source: 'newsletter',
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
      '--header-bg': 'rgba(255, 252, 247, 0.95)',
      '--header-text': '#1a1a1a',
      '--header-border': 'transparent',
      '--header-height': '56px',
      '--header-cta-bg': '#059669',
      '--header-cta-text': '#ffffff',
      '--header-cta-hover-bg': '#047857',
      '--header-cta-padding': '0.625rem 1.25rem',
      '--header-cta-radius': '8px',
      '--header-cta-font-size': '0.875rem',
      '--header-cta-font-weight': '600',
      // Logo styling - uses DM Sans, not serif
      '--header-logo-font': 'var(--font-sans)',
      '--header-logo-size': '1.25rem',
      '--header-logo-color': '#1a1a1a',
      '--header-logo-accent': '#059669',
      // Footer: inherits from page background (transparent)
      '--footer-bg': '#fffcf7',
      '--footer-text': '#666666',
      '--footer-heading': '#1a1a1a',
      '--footer-link': '#666666',
      '--footer-link-hover': '#059669',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
    },
    logo: {
      src: '/logos/newsletter-logo.svg',
      alt: 'Weekly Spark Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'icon-text', // Newsletter uses spark icon + text
    footerLayout: 'flex-sections', // Two sections: brand left, links right
    // Header: minimal layout (just logo + CTA) with rounded CTA
    headerLayout: 'minimal',
    ctaShape: 'rounded',
    // Footer: minimal (flex-sections uses simple links)
    socialStyle: 'none',
  },

  nonprofit: {
    name: 'Ocean Guardians',
    description: 'Non-profit with calming ocean blues and eco-friendly greens',
    tagline: 'Protecting our oceans and marine life for generations to come.',
    category: 'nonprofit',
    source: 'nonprofit',
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
      '--footer-text': '#94a3b8',
      '--footer-heading': '#ffffff',
      '--footer-link': '#94a3b8',
      '--footer-link-hover': '#0ea5e9',
    },
    fonts: {
      google: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap',
    },
    logo: {
      src: '/logos/nonprofit-logo.svg',
      alt: 'Ocean Guardians Logo',
      width: 32,
      height: 32,
    },
    logoMark: 'icon-text', // Nonprofit uses emoji icon + text
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
        heading: 'Organization',
        links: [
          { label: 'About Us', href: '/about/' },
          { label: 'Our Team', href: '/team/' },
          { label: 'Financials', href: '/financials/' },
          { label: 'Careers', href: '/careers/' },
        ],
      },
      {
        heading: 'Get Involved',
        links: [
          { label: 'Donate', href: '/donate/' },
          { label: 'Volunteer', href: '/volunteer/' },
          { label: 'Partner With Us', href: '/partner/' },
          { label: 'Events', href: '/events/' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'News & Blog', href: '/news/' },
          { label: 'Research', href: '/research/' },
          { label: 'Educational Materials', href: '/education/' },
          { label: 'Contact Us', href: '/contact/' },
        ],
      },
    ],
    legalLinks: [
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Use', href: '/terms/' },
    ],
    legalInBottomRow: false, // Legal links inline in footer bottom
    showTemplateCredit: false, // Hide template credit for cleaner nonprofit look
  },
};

export const getRecipe = (name: string): Recipe | undefined => recipes[name];

export const listRecipes = (): string[] => Object.keys(recipes);
