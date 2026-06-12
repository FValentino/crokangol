# Crokangol — AGENTS.md

## Stack

- **Framework**: Next.js 16.2.9 (App Router, React 19)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Language**: TypeScript (strict mode, `bundler` module resolution)
- **Package manager**: pnpm
- **Lint**: ESLint 9 with `eslint-config-next` (core-web-vitals + TypeScript configs)
- **React Compiler**: enabled in `next.config.ts`

## Commands

| Action | Command |
|--------|---------|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Start prod | `pnpm start` |

- Lint (ESLint 9 flat config) is the only verification step — no typecheck or test scripts exist yet.
- The `next-env.d.ts` and `.next/types/` are auto-generated; do not edit.

## Architecture

- Monorepo-lite: single Next.js app under `src/app/` (no packages).
- `src/app/layout.tsx` is the root layout (sets `<html lang="es">` and global CSS).
- `src/app/page.tsx` is the landing page.
- `src/app/globals.css` imports Tailwind; all styling uses utility classes or `@layer` directives.
- Path alias `@/*` maps to `./src/*`.

## Conventions

- ESLint ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.
- No `.env` files tracked — created locally if needed.
- No testing setup (Jest, Vitest, Playwright) configured yet.
- React Compiler is on — avoid patterns that break compiler rules (hooks rules, mutation).
