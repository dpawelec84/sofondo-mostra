# Sofondo Mostra - Astro Marketing Template

A modern, feature-rich Astro template for building marketing sites and landing pages with smooth scrolling, polished UI components, elegant animations, and a powerful recipe system for quick customization.

## Features

- **Recipe System** - Pre-configured themes for different use cases (corporate, agency, startup, etc.)
- **Multiple Header Layouts** - Standard, centered, or minimal navigation layouts
- **Logo Options** - Text-only, icon+text, gradient-box, emoji, or custom SVG icons
- **Mega Menu Navigation** - Multi-column dropdown menus with sections and descriptions
- **Multiple Footer Layouts** - Grid columns, flex rows, flex sections, or minimal centered
- **Lenis Smooth Scrolling** - Buttery smooth scrolling experience (opt-in)
- **Custom Scrollbar** - Chrome-style custom scrollbar with theme awareness (opt-in)
- **View Transitions** - Smooth page transitions using Astro's View Transitions API (opt-in)
- **SubNav Component** - Sticky navigation with glassmorphism effects and grouped links
- **FadeIn Animations** - Scroll-triggered fade-in animations for content
- **Mobile-First** - Responsive design with horizontal scroll on mobile sub-navigation
- **Dark Theme Support** - Full dark mode with themed scrollbars and components
- **Fully Configurable** - All features controlled through a single configuration file

## Quick Start

```bash
# Clone the repository
git clone https://github.com/sofondo/mostra.git my-project
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Using a Recipe

Apply a pre-configured theme instantly:

```bash
# Initialize with a specific recipe
npm run init:recipe -- --recipe=corporate

# Available recipes: corporate, agency, startup, product-launch, app-download, newsletter, nonprofit
```

## Recipe System

Recipes are pre-configured themes that instantly transform the template for specific use cases:

| Recipe | Description | Header | Footer | Logo Style |
|--------|-------------|--------|--------|------------|
| `corporate` | Professional business sites | Standard | Grid 4-col | Gradient box |
| `agency` | Creative agency sites | Centered | Flex sections | Icon + text |
| `startup` | Tech startup sites | Standard | Flex row | Text only |
| `product-launch` | Product launch pages | Standard | Minimal centered | Emoji |
| `app-download` | App download landing pages | Standard | Minimal centered | Emoji |
| `newsletter` | Newsletter signup pages | Standard (compact) | Minimal centered | Icon + text |
| `nonprofit` | Charity/foundation sites | Centered | Grid 4-col | SVG icon |

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.astro     # Site header with navigation
│   ├── Footer.astro     # Site footer with multiple layouts
│   ├── SubNav.astro     # Sticky sub-navigation
│   ├── FadeInOnScroll.astro  # Scroll animation wrapper
│   ├── Logo.astro       # Logo component (multiple styles)
│   └── Navigation.tsx   # React navigation with mega menus
├── config/
│   └── site.ts          # Site configuration (all options)
├── layouts/
│   ├── Layout.astro     # Main layout with optional features
│   └── ShowcaseLayout.astro  # Layout for recipe showcases
├── recipes/
│   └── index.ts         # Recipe definitions
├── pages/
│   ├── index.astro      # Homepage
│   ├── features/        # Features pages
│   ├── showcase/        # Showcase & recipe examples
│   ├── docs/            # Documentation pages
│   └── get-started/     # Getting started guide
├── styles/
│   ├── global.css       # Global styles & CSS variables
│   └── mobile-menu.css  # Mobile menu styles
└── public/
    └── fonts/           # Self-hosted fonts
```

## Configuration

All configuration is done through `src/config/site.ts`:

### Site Metadata

```typescript
export const siteConfig = {
  name: "Your Brand",           // Primary brand name
  nameAccent: "Corp",           // Optional accent-colored suffix
  templateName: "Mostra",       // Template name (for branding)
  showTemplateName: false,      // Show template name in logo
  description: "Your site description",
  isDark: false,                // Enable dark theme
};
```

### Logo Configuration

```typescript
logo: {
  src: "",           // Image path: "/logo.png"
  emoji: "",         // Emoji: "🚀"
  char: "",          // Character for gradient-box: "Q"
  svgIcon: "",       // Inline SVG markup
  alt: "Site Logo",
  width: 32,
  height: 32,
},

// Logo mark type: 'text-only' | 'icon-text' | 'gradient-box'
logoMark: "icon-text" as const,
```

### Header Configuration

```typescript
header: {
  // Layout: 'standard' (nav right), 'centered' (nav center), 'minimal' (no nav)
  layout: "standard" as HeaderLayout,

  // CTA button shape: 'rounded' or 'pill'
  ctaShape: "rounded" as CTAShape,

  // Navigation spacing: 'normal' or 'compact' (tighter for short labels)
  navSpacing: "normal" as NavSpacing,
},
```

### Navigation with Mega Menus

```typescript
nav: {
  items: [
    // Mega menu
    {
      label: "Features",
      menuId: "features",
      sections: [
        {
          title: "Core Features",
          titleStyle: "primary",  // primary, secondary, tertiary, etc.
          links: [
            {
              title: "Smooth Scrolling",
              description: "Buttery smooth Lenis-powered scrolling",
              href: "/features/scrolling/",
            },
          ],
        },
      ],
    },
    // Simple link
    {
      label: "Documentation",
      href: "/docs/",
    },
  ],
  cta: {
    label: "Get Started",
    href: "/get-started/",
  },
},
```

### Footer Configuration

```typescript
// Footer layout: 'grid-4col' | 'flex-row' | 'flex-sections' | 'minimal-centered'
footerLayout: "grid-4col" as const,

footer: {
  copyright: "Your Company",
  copyrightSuffix: "",        // e.g., "A 501(c)(3) nonprofit."
  tagline: "Your tagline here.",

  // Link groups for grid layout
  linkGroups: [
    {
      heading: "Links",
      links: [
        { label: "Features", href: "/features/" },
        { label: "Docs", href: "/docs/" },
      ],
    },
  ],

  // Social links
  social: {
    style: "icons",           // 'icons' | 'initials' | 'text' | 'none'
    position: "brand",        // 'brand' (under logo) | 'column' (in linkGroups)
    links: [
      { platform: "github", label: "GitHub", href: "https://github.com" },
      { platform: "twitter", label: "Twitter", href: "https://twitter.com" },
    ],
  },

  // Legal links
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Terms of Service", href: "/terms/" },
  ],
  showLegalLinks: true,
  legalInBottomRow: false,    // Separate row for legal links

  // Display options
  showCopyright: true,
  showTemplateCredit: true,   // "Mostra template by Sofondo"
},
```

### Feature Flags

```typescript
features: {
  smoothScrolling: true,           // Lenis smooth scrolling
  customScrollbar: true,           // Chrome-style custom scrollbar
  scrollbarThumbStyle: "full",     // "auto" (thin, expands on hover) or "full" (always full width)
  viewTransitions: true,           // Astro View Transitions
},
```

## Components

### SubNav

A sticky sub-navigation component with two variants:

```astro
<!-- Simple variant - flat list of links -->
<SubNav variant="simple">
  <a href="/docs/" class="active">Getting Started</a>
  <a href="/docs/config/">Configuration</a>
</SubNav>

<!-- Grouped variant - links with color indicators -->
<SubNav variant="grouped">
  <div class="sub-nav-group sub-nav-group-primary">
    <a href="/features/" class="active">Overview</a>
    <a href="/features/scrolling/">Smooth Scrolling</a>
  </div>
</SubNav>
```

### FadeInOnScroll

Wrapper component for scroll-triggered animations:

```astro
<FadeInOnScroll delay={100}>
  <h2>This content fades in on scroll</h2>
</FadeInOnScroll>
```

### Logo

Supports multiple logo styles:

```astro
<!-- Automatically uses siteConfig settings -->
<Logo />

<!-- Or with ShowcaseLayout config override -->
<Logo config={showcaseConfig} />
```

## Customization

### Colors

Edit the CSS variables in `src/styles/global.css`:

```css
:root {
  --bg-light: #fafafa;
  --bg-card: #ffffff;
  --bg-secondary: #f5f5f4;
  --text-primary: #1c1917;
  --text-secondary: #57534e;
  --accent-primary: #1e3a5f;
  --accent-secondary: #f0f4f8;
  --border-color: #e7e5e4;
}
```

### Fonts

The template uses self-hosted fonts:
- **Fraunces** - Serif font for headings
- **Outfit** - Sans-serif font for body text

Replace the font files in `public/fonts/` and update the `@font-face` declarations in `Layout.astro`.

### Creating Custom Recipes

Add new recipes in `src/recipes/index.ts`:

```typescript
export const myRecipe: Recipe = {
  name: "My Custom Recipe",
  description: "Description of my recipe",
  siteName: "My Site",
  headerLayout: "centered",
  footerLayout: "flex-row",
  logoMark: "text-only",
  // ... other options
};
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run init:recipe -- --recipe=NAME` | Initialize with a recipe |

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [React](https://react.dev/) - For interactive components
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS
- [Lenis](https://lenis.studiofreight.com/) - Smooth scrolling
- [Radix UI](https://www.radix-ui.com/) - Navigation primitives
- [Lucide React](https://lucide.dev/) - Icons

## License

MIT License - feel free to use this template for personal or commercial projects.
