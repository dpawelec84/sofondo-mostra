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

export const siteConfig = {
  // Site metadata - "Sofondo" is the brand, "Mostra" is the template name
  name: "Sofondo",
  templateName: "Mostra",
  description: "A modern Astro template for marketing sites and landing pages",

  // Branding - leave src empty for no logo mark
  logo: {
    src: "", // e.g., "/logo.png" - leave empty if no logo
    alt: "Site Logo",
    width: 32,
    height: 32,
  },

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
    copyright: "Sofondo Mostra",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Documentation", href: "/docs/" },
    ],
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
