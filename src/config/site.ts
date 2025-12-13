/**
 * Site Configuration
 *
 * This file contains all configurable options for the template.
 * Modify these values to customize your site.
 */

/**
 * Navigation link types:
 * - Simple link: { label: "About", href: "/about/" }
 * - Mega menu: { label: "Services", menuId: "services", sections: [...] }
 */

export type NavLink = {
  label: string;
  href: string;
};

export type MegaMenuLink = {
  title: string;
  description?: string;
  href: string;
  external?: boolean;
};

export type MegaMenuSection = {
  title: string;
  titleStyle?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary' | 'senary' | 'neutral';
  links: MegaMenuLink[];
};

export type MegaMenuItem = {
  label: string;
  menuId: string;
  sections: MegaMenuSection[];
};

export type NavItem = NavLink | MegaMenuItem;

// Type guard to check if nav item is a mega menu
export const isMegaMenu = (item: NavItem): item is MegaMenuItem => {
  return 'menuId' in item && 'sections' in item;
};

/**
 * Header layout options
 * - 'standard': Logo left, nav right, CTA right (default)
 * - 'centered': Logo left, nav center, CTA right
 * - 'minimal': Logo left, CTA right only (no nav)
 */
export type HeaderLayout = 'standard' | 'centered' | 'minimal';

/**
 * CTA button shape
 * - 'rounded': Rounded corners (6-8px radius)
 * - 'pill': Fully rounded pill shape
 */
export type CTAShape = 'rounded' | 'pill';

/**
 * Footer social icon style
 * - 'icons': Lucide icons (Github, Twitter, etc.)
 * - 'initials': Circular badges with initials (FB, TW, IG)
 * - 'text': Plain text links
 * - 'none': No social links
 */
export type SocialStyle = 'icons' | 'initials' | 'text' | 'none';

/**
 * Social links position in footer
 * - 'brand': Under the brand/logo section (nonprofit style)
 * - 'column': In a separate link group column (corporate style - uses linkGroups)
 */
export type SocialPosition = 'brand' | 'column';

/**
 * Footer link group for grid layouts
 */
export type FooterLinkGroup = {
  heading: string;
  links: { label: string; href: string }[];
};

/**
 * Social link configuration
 */
export type SocialLink = {
  platform: string;  // e.g., 'twitter', 'facebook', 'instagram'
  label: string;     // Display text or initials
  href: string;
};

export const siteConfig = {
  // Site metadata - "Sofondo" is the brand, "Mostra" is the template name
  name: "Sofondo",
  nameAccent: "", // Optional second part of name in accent color (e.g., "Corp" in "NexusCorp")
  templateName: "Mostra",
  showTemplateName: true, // Set to true to show template name after brand name in logo
  description: "A modern Astro template for marketing sites and landing pages",

  // Branding - leave src empty for no logo mark
  logo: {
    src: "", // e.g., "/logo.png" - leave empty if no logo
    emoji: "", // e.g., "🌊" - use emoji instead of image (takes precedence over src)
    char: "", // e.g., "Q" - character for gradient-box style logo
    svgIcon: "", // Inline SVG markup for custom icon
    alt: "Site Logo",
    width: 32,
    height: 32,
  },

  // Logo mark type: 'text-only' | 'icon-text' | 'gradient-box'
  logoMark: "icon-text" as const,

  // Header configuration
  header: {
    // Layout: 'standard' (nav right), 'centered' (nav center), 'minimal' (no nav)
    layout: "standard" as HeaderLayout,
    // CTA button shape: 'rounded' or 'pill'
    ctaShape: "rounded" as CTAShape,
  },

  // Dark theme flag - affects scrollbar and sub-nav colors
  isDark: false,

  // Footer layout: 'grid-4col' | 'flex-row' | 'flex-sections'
  footerLayout: "grid-4col" as const,

  // Navigation - supports both simple links and mega menus
  nav: {
    items: [
      // Mega menu example
      {
        label: "Features",
        menuId: "features",
        sections: [
          {
            title: "Core Features",
            titleStyle: "primary" as const,
            links: [
              {
                title: "Smooth Scrolling",
                description: "Buttery smooth Lenis-powered scrolling",
                href: "/features/scrolling/",
              },
              {
                title: "Animations",
                description: "Scroll-triggered fade-in effects",
                href: "/features/animations/",
              },
            ],
          },
          {
            title: "Components",
            titleStyle: "secondary" as const,
            links: [
              {
                title: "SubNav",
                description: "Sticky navigation with glassmorphism",
                href: "/features/components/subnav/",
              },
              {
                title: "FadeInOnScroll",
                description: "Scroll-triggered reveal animations",
                href: "/features/components/fadein/",
              },
            ],
          },
        ],
      },
      // Another mega menu
      {
        label: "Showcase",
        menuId: "showcase",
        sections: [
          {
            title: "Examples",
            titleStyle: "tertiary" as const,
            links: [
              {
                title: "Marketing Sites",
                description: "Corporate and brand websites",
                href: "/showcase/marketing/",
              },
              {
                title: "Landing Pages",
                description: "High-converting campaign pages",
                href: "/showcase/landing/",
              },
              {
                title: "Non-profit",
                description: "Charity and foundation sites",
                href: "/showcase/nonprofit/",
              },
            ],
          },
        ],
      },
      // Simple link (no mega menu)
      {
        label: "Documentation",
        href: "/docs/",
      },
    ] as NavItem[],
    // CTA button in header
    cta: {
      label: "Get Started",
      href: "/get-started/",
    },
  },

  // Footer
  footer: {
    copyright: "Sofondo",
    copyrightSuffix: "", // Optional suffix after "All rights reserved." (e.g., "A 501(c)(3) nonprofit organization.")
    tagline: "A modern Astro template for marketing sites and landing pages.",
    // Simple links for flex layouts
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Documentation", href: "/docs/" },
    ],
    // Link groups for grid layout (optional - if not provided, uses simple links)
    linkGroups: [
      {
        heading: "Links",
        links: [
          { label: "Features", href: "/features/" },
          { label: "Documentation", href: "/docs/" },
        ],
      },
    ] as FooterLinkGroup[],
    // Social links configuration
    social: {
      style: "icons" as SocialStyle,  // 'icons' | 'initials' | 'text' | 'none'
      position: "brand" as SocialPosition, // 'brand' (under logo) | 'column' (in linkGroups)
      links: [
        { platform: "github", label: "GitHub", href: "https://github.com" },
      ] as SocialLink[],
    },
    // Legal links (Privacy, Terms) - shown in bottom bar
    legalLinks: [] as { label: string; href: string }[],
    // Show legal links in separate bottom row (true) or inline (false)
    legalInBottomRow: false,
    // Show legal links (set to false to hide privacy/terms links entirely)
    showLegalLinks: false,
    // Show copyright line (set to false to hide "© 2025 Company. All rights reserved.")
    showCopyright: false,
    // Show template credit line (set to false to hide "Mostra template by Sofondo")
    showTemplateCredit: true,
  },

  // Feature flags - enable/disable optional features
  features: {
    /**
     * Lenis smooth scrolling
     * Provides buttery smooth scrolling experience
     * Set to false for native browser scrolling
     */
    smoothScrolling: true,

    /**
     * Custom scrollbar
     * Chrome-style custom scrollbar with theme awareness
     * Set to false to use native browser scrollbar
     */
    customScrollbar: true,

    /**
     * View transitions
     * Smooth page transitions using Astro's View Transitions API
     */
    viewTransitions: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
