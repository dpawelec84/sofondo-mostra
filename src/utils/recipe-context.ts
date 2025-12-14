/**
 * Recipe Context Utilities
 *
 * Provides helpers for accessing recipe configuration in both:
 * - Showcase mode: reads from recipe by name
 * - Production mode: reads from site.ts
 */

import { recipes, type Recipe, type RecipeTheme } from '../recipes/index';
import { siteConfig, type NavItem, type FooterLinkGroup, type SocialLink, type SocialStyle, type SocialPosition } from '../config/site';

/**
 * Configuration object that can be passed to Header/Footer/Logo components
 * This normalizes the shape between recipe config and site.ts config
 */
export interface ComponentConfig {
  // Site basics
  name: string;
  nameAccent?: string;
  templateName: string;
  showTemplateName: boolean;
  description: string;

  // Logo
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    emoji?: string;
    char?: string;
    svgIcon?: string;
  };
  logoMark: 'text-only' | 'icon-text' | 'gradient-box';

  // Header
  header: {
    layout: 'standard' | 'centered' | 'minimal';
    ctaShape: 'rounded' | 'pill';
    navSpacing?: 'normal' | 'compact';
  };

  // Navigation
  nav: {
    items: NavItem[];
    cta: {
      label: string;
      href: string;
    };
  };

  // Footer
  footer: {
    copyright: string;
    copyrightSuffix?: string;
    tagline?: string;
    links: { label: string; href: string }[];
    linkGroups: FooterLinkGroup[];
    social: {
      style: SocialStyle;
      position: SocialPosition;
      links: SocialLink[];
    };
    legalLinks: { label: string; href: string }[];
    legalInBottomRow: boolean;
    showLegalLinks: boolean;
    showCopyright: boolean;
    showTemplateCredit: boolean;
  };
  footerLayout: 'grid-4col' | 'flex-row' | 'flex-sections';

  // Theme
  isDark: boolean;
}

/**
 * Get recipe configuration by name
 */
export function getRecipe(recipeName: string): Recipe | undefined {
  return recipes[recipeName];
}

/**
 * Generate CSS variables string from recipe theme
 */
export function getThemeCssVars(theme: RecipeTheme): string {
  return Object.entries(theme)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n    ');
}

/**
 * Convert a Recipe to ComponentConfig format
 * Uses recipe-specific values when available, otherwise falls back to siteConfig
 */
export function recipeToConfig(recipe: Recipe): ComponentConfig {
  return {
    name: recipe.name,
    nameAccent: recipe.nameAccent,
    templateName: 'Mostra',
    showTemplateName: recipe.showTemplateName ?? true,
    description: recipe.description,

    logo: {
      src: recipe.logo?.src || '',
      alt: recipe.logo?.alt || `${recipe.name} Logo`,
      width: recipe.logo?.width || 32,
      height: recipe.logo?.height || 32,
      emoji: recipe.logo?.emoji,
      char: recipe.logo?.char,
      svgIcon: recipe.logo?.svgIcon,
    },
    logoMark: recipe.logoMark || 'icon-text',

    header: {
      layout: recipe.headerLayout || 'standard',
      ctaShape: recipe.ctaShape || 'rounded',
      navSpacing: recipe.navSpacing || 'normal',
    },

    // Use recipe nav if available, otherwise fall back to siteConfig
    nav: recipe.nav ? {
      items: recipe.nav.items as NavItem[],
      cta: recipe.nav.cta,
    } : {
      items: siteConfig.nav.items,
      cta: siteConfig.nav.cta,
    },

    footer: {
      copyright: recipe.name,
      copyrightSuffix: recipe.copyrightSuffix,
      tagline: recipe.tagline,
      // Use recipe footer links if available, otherwise fall back to siteConfig
      links: recipe.footerLinks || siteConfig.footer.links as { label: string; href: string }[],
      linkGroups: recipe.linkGroups || [],
      social: {
        style: recipe.socialStyle || 'none',
        position: recipe.socialPosition || 'brand',
        links: recipe.socialLinks || [],
      },
      legalLinks: recipe.legalLinks || [],
      legalInBottomRow: recipe.legalInBottomRow || false,
      showLegalLinks: recipe.showLegalLinks ?? true,
      showCopyright: recipe.showCopyright ?? true,
      showTemplateCredit: recipe.showTemplateCredit ?? true,
    },
    footerLayout: recipe.footerLayout || 'grid-4col',

    isDark: recipe.isDark || false,
  };
}

/**
 * Convert siteConfig to ComponentConfig format
 */
export function siteConfigToConfig(): ComponentConfig {
  return {
    name: siteConfig.name,
    nameAccent: (siteConfig as any).nameAccent,
    templateName: siteConfig.templateName,
    showTemplateName: (siteConfig as any).showTemplateName ?? true,
    description: siteConfig.description,

    logo: {
      src: siteConfig.logo.src,
      alt: siteConfig.logo.alt,
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
      emoji: siteConfig.logo.emoji,
      char: (siteConfig.logo as any).char,
      svgIcon: (siteConfig.logo as any).svgIcon,
    },
    logoMark: (siteConfig as any).logoMark || 'icon-text',

    header: {
      layout: siteConfig.header?.layout || 'standard',
      ctaShape: siteConfig.header?.ctaShape || 'rounded',
      navSpacing: siteConfig.header?.navSpacing || 'normal',
    },

    nav: {
      items: siteConfig.nav.items,
      cta: siteConfig.nav.cta,
    },

    footer: {
      copyright: siteConfig.footer.copyright,
      copyrightSuffix: siteConfig.footer.copyrightSuffix,
      tagline: siteConfig.footer.tagline,
      links: siteConfig.footer.links as { label: string; href: string }[],
      linkGroups: siteConfig.footer.linkGroups as FooterLinkGroup[],
      social: {
        style: siteConfig.footer.social?.style || 'none',
        position: siteConfig.footer.social?.position || 'brand',
        links: siteConfig.footer.social?.links || [],
      },
      legalLinks: siteConfig.footer.legalLinks as { label: string; href: string }[],
      legalInBottomRow: siteConfig.footer.legalInBottomRow,
      showLegalLinks: siteConfig.footer.showLegalLinks,
      showCopyright: siteConfig.footer.showCopyright,
      showTemplateCredit: siteConfig.footer.showTemplateCredit,
    },
    footerLayout: (siteConfig as any).footerLayout || 'grid-4col',

    isDark: siteConfig.isDark,
  };
}

/**
 * List all available recipe names
 */
export function listRecipeNames(): string[] {
  return Object.keys(recipes);
}
