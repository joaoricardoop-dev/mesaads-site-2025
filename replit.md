# mesa-ads-site

Public institutional website for **mesa.ads**, a media network based in Manaus, Brazil, specializing in advertising via coasters, screens, and VIP lounges.

## Project Overview

The site serves as a landing page (`/`) and a digital Media Kit (`/media-kit`). It provides information about the company's advertising solutions, network coverage in Manaus, and pricing.

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** @react-three/fiber (Three.js) — used in the hero section
- **Routing:** react-router-dom v7
- **State Management:** Zustand (theme toggle)
- **Package Manager:** npm

## Project Structure

```
src/
  App.tsx           - Root component with routing
  main.tsx          - Entry point
  index.css         - Global styles
  pages/            - Route-level components (Home, MediaKit)
  components/
    site/           - Institutional page sections
    hero/           - 3D scene components
    ui/             - Reusable UI elements
    venues/         - Map components
  data/             - Static content (pricing, venues, stats)
  state/            - Global state (themeStore)
  lib/              - Utilities and motion constants
public/
  mesa-ads-media-kit.pdf  - Downloadable PDF media kit
```

## Development

```bash
npm install
npm run dev       # Dev server on port 5000
npm run build     # Production build to dist/
npm run typecheck # TypeScript type checking
```

## Deployment

Configured as a **static** deployment:
- Build command: `npm run build`
- Public directory: `dist/`
