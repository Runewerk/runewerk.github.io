# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Runewerk is a static website for a software development company, built as a Single Page Application (SPA) using HTMX for dynamic content loading. The site is hosted on GitHub Pages from the `/docs` directory and features a responsive design with dark mode support.

## Development Commands

### Build and Run
```bash
npm run build:css    # Compile and minify Tailwind CSS
npm start            # Build CSS and start local dev server on port 3000
```

The dev server runs on `http://localhost:3000` and serves files from the `/docs` directory.

## Architecture

### Component-Based HTMX SPA
The site uses a clean component-based architecture with HTMX for dynamic content loading:

- **App Shell**: `index.html` is the main entry point that loads shared components dynamically
- **Components**: Header and footer are separate HTML files loaded via HTMX on page load
- **Content Pages**: Each page (about.html, services.html, etc.) contains only its content section
- **Navigation**: Links in header load content files and swap them into `#content`
- **Performance**: Navigation uses `preload="mouseover"` to prefetch content on hover

### Directory Structure
```
/docs                    # GitHub Pages root (deployment directory)
  index.html             # App shell (loads components dynamically)
  welcome.html           # Welcome/home content section
  about.html             # About content section only
  services.html          # Services content section only
  blog.html              # Blog content section only
  contact.html           # Contact content section only
  /components
    header.html          # Shared header component
    footer.html          # Shared footer component
  /css
    styles.css           # Tailwind source file with organized sections
    output.css           # Compiled/minified CSS (generated)
  /js
    darkmode.js          # Dark mode toggle and persistence
  /blog
    *.html               # Individual blog post files
server.js                # Express dev server (serves /docs)
tailwind.config.js       # Tailwind configuration
```

### Dark Mode Implementation
- Uses Tailwind's `selector` strategy (class-based)
- State persisted in `localStorage.theme`
- Respects system preference as fallback
- Icon switches between sun/moon based on current mode
- Initialized on `DOMContentLoaded` and listens for system preference changes

## Key Patterns

### Adding New Pages
1. Create a content-only HTML file in `/docs` (no header/footer boilerplate)
2. Wrap content in a div with unique `id` (e.g., `<div id="newpage">...</div>`)
3. Add navigation link in `components/header.html` with: `hx-get="newpage.html" hx-target="#content"`
4. Include `preload="mouseover"` for better UX

### Editing Shared Elements
- **Header/Footer**: Edit files in `/docs/components/` - changes apply to all pages
- **Styles**: Edit `/docs/css/styles.css` then run `npm run build:css`

### Styling
- Custom animations defined in tailwind.config.js: `animate-hue-rotate`, `animate-blink`
- Primary fonts: Fira Code (monospace), Playfair Display (serif)
- Console-style text uses `.console` class
- Dark mode styles prefix with `dark:`

### Blog Posts
- Blog posts are standalone HTML files in `/docs/blog`
- Use Marked.js CDN for markdown rendering if needed
- Link from blog.html using the same HTMX pattern

## Deployment
Site deploys automatically via GitHub Pages from the `/docs` directory. After CSS changes, always run `npm run build:css` before committing to ensure output.css is updated.
