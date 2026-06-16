# sayganov.com

[![Deploy static content to Pages](https://github.com/sayganov/sayganov-com/actions/workflows/deploy-to-pages.yaml/badge.svg?branch=main)](https://github.com/sayganov/sayganov-com/actions/workflows/deploy-to-pages.yaml)

Personal landing page for [sayganov.com](https://sayganov.com) — a minimal, single-page
profile with social links.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build tooling)
- [Tailwind CSS v4](https://tailwindcss.com/) (styling)
- Deployed to GitHub Pages via GitHub Actions

## Development

The application lives in the [`src/`](./src) directory.

```bash
cd src
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # lint with ESLint
npm run format   # format with Prettier
```

## Deployment

Pushing to `main` triggers the
[Deploy to Pages](./.github/workflows/deploy-to-pages.yaml) workflow, which builds the site
and publishes it to GitHub Pages. The custom domain is configured via [`CNAME`](./CNAME).
