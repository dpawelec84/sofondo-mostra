# Sofondo Mostra - Astro Marketing Template

A modern, feature-rich Astro template for building marketing sites and landing pages with smooth scrolling, polished UI components, and elegant animations.

## Features

- **Lenis Smooth Scrolling** - Buttery smooth scrolling experience (opt-in)
- **Custom Scrollbar** - Chrome-style custom scrollbar with theme awareness (opt-in)
- **View Transitions** - Smooth page transitions using Astro's View Transitions API (opt-in)
- **SubNav Component** - Sticky navigation with glassmorphism effects and grouped links
- **FadeIn Animations** - Scroll-triggered fade-in animations for content
- **Mobile-First** - Responsive design with horizontal scroll on mobile sub-navigation
- **Configurable** - All features are opt-in through a simple configuration file

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

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.astro     # Site header with navigation
│   ├── Footer.astro     # Site footer
│   ├── SubNav.astro     # Sticky sub-navigation
│   ├── FadeInOnScroll.astro  # Scroll animation wrapper
│   ├── Logo.astro       # Logo component
│   └── Navigation.tsx   # React navigation component
├── config/
│   └── site.ts          # Site configuration
├── layouts/
│   └── Layout.astro     # Main layout with optional features
├── pages/               # Page routes
│   ├── index.astro      # Homepage
│   ├── features/        # Features pages
│   ├── showcase/        # Showcase pages
│   ├── docs/            # Documentation pages
│   └── get-started/     # Getting started guide
├── styles/
│   ├── global.css       # Global styles
│   └── mobile-menu.css  # Mobile menu styles
└── public/
    └── fonts/           # Self-hosted fonts
```

## Configuration

All configuration is done through `src/config/site.ts`:

```typescript
export const siteConfig = {
  // Site metadata - "Sofondo" is the brand, "Mostra" is the template name
  name: "Your Site Name",
  templateName: "",  // Optional template/product name suffix
  description: "Your site description",

  // Branding - leave src empty for text-only logo
  logo: {
    src: "",  // e.g., "/logo.png" - leave empty if no logo
    alt: "Logo",
    width: 32,
    height: 32,
  },

  // Navigation
  nav: {
    links: [
      { label: "Features", href: "/features/" },
      { label: "Showcase", href: "/showcase/" },
      { label: "Documentation", href: "/docs/" },
    ],
    cta: {
      label: "Get Started",
      href: "/get-started/",
    },
  },

  // Footer
  footer: {
    copyright: "Your Site Name",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Documentation", href: "/docs/" },
    ],
  },

  // Feature flags - enable/disable optional features
  features: {
    smoothScrolling: true,  // Lenis smooth scrolling
    customScrollbar: true,  // Chrome-style custom scrollbar
    viewTransitions: true,  // Page transitions
  },
};
```

## Components

### SubNav

A sticky sub-navigation component with two variants:

```astro
<!-- Simple variant - flat list of links -->
<SubNav variant="simple">
  <a href="/docs/" class="active">Getting Started</a>
  <a href="/docs/config/">Configuration</a>
  <a href="/docs/components/">Components</a>
</SubNav>

<!-- Grouped variant - links with color indicators -->
<SubNav variant="grouped">
  <div class="sub-nav-group sub-nav-group-design">
    <a href="/features/" class="active">Overview</a>
    <a href="/features/scrolling/">Smooth Scrolling</a>
  </div>
  <div class="sub-nav-group sub-nav-group-hosting">
    <a href="/features/components/subnav/">SubNav</a>
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

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [React](https://react.dev/) - For interactive components
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS
- [Lenis](https://lenis.studiofreight.com/) - Smooth scrolling
- [Framer Motion](https://www.framer.com/motion/) - Animations (available)
- [Lucide React](https://lucide.dev/) - Icons

## License

MIT License - feel free to use this template for personal or commercial projects.
