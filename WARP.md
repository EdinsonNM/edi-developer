# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project summary
- SPA built with React + Vite + TypeScript
- Styling via Tailwind CSS (with tailwindcss-animate) and PostCSS
- 3D/animation stack: three, @react-three/fiber, @react-three/drei, GSAP, framer-motion
- Data/UX: @tanstack/react-query for async state and caching, hash-based routing for GitHub Pages

Common commands
Use the package manager you prefer. The repo declares pnpm in package.json (packageManager), but CI uses npm. Both examples are shown.

- Install dependencies
  - pnpm: pnpm install
  - npm: npm install

- Start dev server
  - pnpm: pnpm dev
  - npm: npm run dev
  - Notes: Vite dev server; open the URL printed in the terminal.

- Lint
  - pnpm: pnpm lint
  - npm: npm run lint

- Build production bundle
  - pnpm: pnpm build
  - npm: npm run build
  - Output: dist/

- Preview built app locally
  - pnpm: pnpm preview
  - npm: npm run preview

- Tests
  - Not configured in this project (no test script present).

Environment variables
This app uses Vite-style env vars (must be prefixed with VITE_). For local development, add a .env (or .env.local) at repo root with keys like:
- VITE_OPENAI_API_KEY
- VITE_GOOGLE_API_KEY
- VITE_API_KEY

References in code:
- src/presentation/utils/hooks/useCompletions.tsx reads import.meta.env.VITE_OPENAI_API_KEY
- src/presentation/utils/hooks/useGeminiReceipt.tsx reads import.meta.env.VITE_GOOGLE_API_KEY

High-level architecture
- Entry and app shell
  - src/main.tsx mounts <App /> with React.StrictMode.
  - src/main/app.tsx sets global providers:
    - QueryClientProvider from @tanstack/react-query
    - I18nProvider (custom) from @presentation/utils/use-i18n

- Routing
  - src/main/app.routes.tsx uses HashRouter for GH Pages compatibility.
  - Layout at @presentation/layout/layout; routes under @presentation/pages/* (home, about, contact, my-projects, podcast, sass, info-search).
  - React.lazy + Suspense used for route code-splitting.

- Design system and UI
  - src/design: atoms, molecules, templates for reusable UI building blocks.
  - src/components/ui: interactive/animated primitives (animated-list, particles, marquee, etc.).
  - Tailwind configuration in tailwind.config.js; global styles under src/assets/styles/.

- Core utilities and hooks
  - src/core/ui/hooks (e.g., use-modal)
  - src/core/utils (e.g., is-mobile, math)
  - src/lib utilities at src/lib/utils.ts

- Presentation layer
  - src/presentation/components: app-specific components (loading, modal, etc.)
  - src/presentation/layout: app layout shell, navbar/sidebar, context
  - src/presentation/utils: i18n provider, constants, and AI hooks integrating OpenAI/Gemini

- Assets
  - src/assets for images and styles; static models/images/videos live adjacent to project root folders as described in README.

- Module resolution and aliases
  - Configured in both tsconfig.json (paths) and vite.config.ts (resolve.alias):
    - @core -> /src/core
    - @design -> /src/design
    - @presentation -> /src/presentation
    - @domain, @infra are reserved in config but not currently used in this repo
    - @ -> /src

Tooling and configuration
- Vite configuration: vite.config.ts (base="/", React plugin, path aliases)
- TypeScript: tsconfig.json (strict, noEmit, bundler moduleResolution, path aliases)
- Tailwind CSS: tailwind.config.js plus postcss.config.js
- ESLint: lint script runs eslint . --ext ts,tsx; no explicit config file detected (uses plugin defaults declared in devDependencies)

CI/CD and deployment
- GitHub Actions workflow: .github/workflows/deploy.yml
  - On push/PR to main: install deps (npm), build (npm run build), deploy dist/ to gh-pages via JamesIves/github-pages-deploy-action@v4
  - Routing uses HashRouter, so base path issues on GH Pages are avoided.

Key docs
- README.md includes a high-level overview, demo link, and installation basics. Demo: https://edinsonnm.github.io/edi-developer/

Warp-specific notes
- When running commands on Windows (pwsh), prefer npm run <script> or pnpm <script> as shown above.
- For any commands that depend on secrets, ensure Vite env vars are set via a local .env and never printed. Use environment variables rather than inline secrets.

