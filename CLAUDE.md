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
CSS v4). There is no router and no backend — `App.tsx` renders one screen of social links.

- **Entry**: `src/main.tsx` mounts `App`, `ThemeToggle`, and `CookieBanner` as siblings under
  `StrictMode`.
- **State pattern**: UI state lives in small custom hooks under `src/hooks/`, each wrapping
  `localStorage` persistence with try/catch fallbacks (private browsing, disabled storage) and
  exposing a single state + action object:
  - `use-theme.ts` — light/dark theme, defaults to `prefers-color-scheme`, persisted to
    `localStorage['theme']`, applied via a `dark` class on `<html>`.
  - `use-cookie-consent.ts` — accept/reject cookie consent, persisted to
    `localStorage['cookie-consent']`, and calls `gtag('consent', 'update', ...)` when the user
    decides.
  - Components (`ThemeToggle`, `CookieBanner`) are thin — they just call the hook and render.
- **Theme flash prevention**: `index.html` has an inline pre-hydration `<script>` that reads
  `localStorage`/`matchMedia` and adds the `dark` class before first paint. Any change to the
  theme storage key or logic in `use-theme.ts` must be mirrored there.
- **Analytics / consent**: `index.html` bootstraps `gtag.js` with `consent: 'default'` set to
  `analytics_storage: denied`. The Google Analytics ID is injected via the `%VITE_GA_MEASUREMENT_ID%`
  Vite HTML env placeholder, sourced from `VITE_GA_MEASUREMENT_ID` (defaulted in the committed
  `src/.env`, not a secret). Consent is only flipped to `granted` after `useCookieConsent().accept()`.
- **Styling**: Tailwind v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — config
  lives in `src/index.css` using `@import 'tailwindcss'` and `@custom-variant dark`). Dark mode is
  class-based (`.dark`), not media-based, so it can be manually toggled.
- **Testing**: Vitest + `@testing-library/react` + `jsdom`, set up in `vite.config.ts`
  (`test.setupFiles: ./src/test-setup.ts`). Test files sit next to the component they cover
  (`*.test.tsx`).

## CI

`.github/workflows/deploy-to-pages.yaml` runs on every push to `main`: lint → format:check → test
→ build, then publishes `src/dist` to GitHub Pages. All four checks must pass locally before
pushing to `main`.
