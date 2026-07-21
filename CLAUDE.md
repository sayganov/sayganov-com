# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo's root only holds `CNAME` (GitHub Pages custom domain) and `.github/workflows/`. The
actual application lives entirely under `src/` — **all commands below must run from `src/`**, not
the repo root.

## Commands

```bash
cd src
npm install       # install dependencies
npm run dev       # start the Vite dev server
npm run build     # tsc -b type-check, then vite build
npm run preview   # preview the production build
npm run lint      # eslint .
npm run format    # prettier --write .
npm run format:check
npm run test      # vitest run (single run, used in CI)
npm run test:watch
```

To run a single test file: `npx vitest run src/components/CookieBanner.test.tsx`.

## Architecture

This is a minimal single-page personal landing site (React 19 + TypeScript + Vite + Tailwind
CSS v4). There is no router and no backend — `App.tsx` renders one screen: a hero (visible `<h1>`
name + role tagline) above a row of social links.

- **Entry**: `src/main.tsx` mounts `App`, `ThemeToggle`, and `CookieBanner` as siblings under
  `StrictMode`.
- **State pattern**: UI state lives in small custom hooks under `src/hooks/`, each wrapping
  `localStorage` persistence with try/catch fallbacks (private browsing, disabled storage) and
  exposing a single state + action object:
  - `use-theme.ts` — light/dark theme, defaults to `prefers-color-scheme`, persisted to
    `localStorage['theme']`, applied via a `dark` class on `<html>`. It also subscribes to
    `matchMedia('(prefers-color-scheme: dark)')` and follows OS changes live _only while no
    explicit choice is stored_. Background/`theme-color` hex values live in the exported
    `THEME_COLOR` constant (the single TS-side source).
  - `use-cookie-consent.ts` — accept/reject cookie consent, persisted to
    `localStorage['cookie-consent']`, and calls `gtag('consent', 'update', ...)` when the user
    decides.
  - Components (`ThemeToggle`, `CookieBanner`) are thin — they just call the hook and render.
- **Theme flash prevention**: `index.html` has an inline pre-hydration `<script>` that reads
  `localStorage`/`matchMedia` and adds the `dark` class before first paint. It also syncs the
  `theme-color` meta tag (must appear in the HTML _before_ this script, so `querySelector` can find
  it) to keep iOS/Android safe-area and browser-chrome coloring correct. Any change to the theme
  storage key or logic in `use-theme.ts` — including the `THEME_COLOR` values used by the
  `theme-color`/background sync in `applyTheme` and the matching `html`/`html.dark`
  background-color and color-scheme rules in `index.css` — must be mirrored in the pre-hydration
  script (which can't import the constant, since it runs before the module graph).
- **Icons / PWA**: `public/` holds `favicon.svg` (browsers), `apple-touch-icon.png` (iOS home
  screen), `icon-192.png`/`icon-512.png`, and `site.webmanifest`. All share the favicon design
  (dark `#18181b` square, white bold "S"); regenerate the PNGs if that design changes.
- **Analytics / consent**: `index.html` bootstraps `gtag.js` with `consent: 'default'` set to
  `analytics_storage: denied`. The Google Analytics ID is injected via the `%VITE_GA_MEASUREMENT_ID%`
  Vite HTML env placeholder, sourced from `VITE_GA_MEASUREMENT_ID` (defaulted in the committed
  `src/.env`, not a secret). Consent is only flipped to `granted` after `useCookieConsent().accept()`.
- **Styling**: Tailwind v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — config
  lives in `src/index.css` using `@import 'tailwindcss'` and `@custom-variant dark`). Dark mode is
  class-based (`.dark`), not media-based, so it can be manually toggled. Interactive elements share
  a 44px min tap target (`min-h-11` / `h-11`) and a `rounded-md` radius; safe-area insets
  (`env(safe-area-inset-*)`) keep the fixed `ThemeToggle` and `CookieBanner` clear of the notch and
  home indicator under `viewport-fit=cover`.
- **Fonts**: JetBrains Mono is self-hosted via `@fontsource`, importing only the weights the UI
  uses — 400/500/700 in `main.tsx`. Using a new `font-*` weight utility (e.g. `font-semibold`)
  requires importing the matching `@fontsource/jetbrains-mono/latin-<weight>.css`, otherwise the
  browser synthesizes a low-quality faux weight.
- **Testing**: Vitest + `@testing-library/react` + `jsdom`, set up in `vite.config.ts`
  (`test.setupFiles: ./src/test-setup.ts`). Test files sit next to the component they cover
  (`*.test.tsx`).

## CI

`.github/workflows/deploy-to-pages.yaml` runs on every push to `main`: lint → format:check → test
→ build, then publishes `src/dist` to GitHub Pages. All four checks must pass locally before
pushing to `main`.
