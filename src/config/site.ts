/**
 * Site Configuration
 *
 * This file contains all configurable options for the template.
 * Modify these values to customize your site.
 */

export const siteConfig = {
  // Site metadata
  name: "Sofondo Template",
  description: "A modern Astro template for marketing sites and landing pages",

  // Branding
  logo: {
    src: "/logo.png",
    alt: "Site Logo",
    width: 32,
    height: 32,
  },

  // Navigation
  nav: {
    // Main navigation links
    links: [
      { label: "Features", href: "/features/" },
      { label: "Showcase", href: "/showcase/" },
      { label: "Documentation", href: "/docs/" },
    ],
    // CTA button in header
    cta: {
      label: "Get Started",
      href: "/get-started/",
    },
  },

  // Footer
  footer: {
    copyright: "Sofondo Template",
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
     * Interactive shards background
     * Animated geometric shapes that respond to mouse movement
     * Set to false for a static background
     */
    shardsBackground: true,

    /**
     * View transitions
     * Smooth page transitions using Astro's View Transitions API
     */
    viewTransitions: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
