# my-turborepo

A pnpm and Turborepo workspace with Next.js App Router, TypeScript, Tailwind CSS v4, and shared shadcn/ui components.

## Get started

Use Node.js 22.14 or newer and pnpm 10.31.0 (pinned in `package.json`).

```sh
pnpm install
pnpm dev
```

Open [the dashboard](http://localhost:3000) or the [design system explorer](http://localhost:3000/design-system).

## Workspace

```text
apps/dashboard                Next.js application
packages/shadcn-ui                   Shared shadcn/ui components and theme styles
packages/eslint-config        Shared ESLint configuration
packages/typescript-config    Shared strict TypeScript configuration
```

Next.js, React, TypeScript, and Turbo are pinned to the stable releases selected during initialization. The lockfile records the complete dependency tree.

## Commands

Run these from the repository root:

| Command                         | Purpose                                             |
| ------------------------------- | --------------------------------------------------- |
| `pnpm dev`                      | Start the dashboard app in development mode         |
| `pnpm build`                    | Build the app, with local Turbo caching             |
| `pnpm lint`                     | Lint the app and shared UI; warnings fail the check |
| `pnpm typecheck`                | Generate Next.js route types and check TypeScript   |
| `pnpm format`                   | Format the repository                               |
| `pnpm format:check`             | Check formatting without changing files             |
| `pnpm --filter dashboard start` | Serve the production app after a build              |

Development servers are persistent and uncached. Production build outputs are cached, excluding Next.js's own cache and development artifacts. The formatter always runs directly, so it never caches file changes.

## Git hooks

Husky installs the repository's Git hooks automatically during `pnpm install` through the `prepare` script.

- Before a commit, `pnpm typecheck` checks the app and shared UI package.
- Before a push, `pnpm build` builds the app.

A failed check blocks the commit or push. Run `pnpm prepare` to reinstall the hooks if needed.

## Add shadcn/ui components

The `shadcn-ui` workspace package lives in [packages/shadcn-ui](packages/shadcn-ui/README.md) and supplies the dashboard's shared components, tokens, and styles.

```sh
pnpm dlx shadcn@latest add dialog --cwd apps/dashboard
```

Both workspaces have `components.json` configured so the CLI installs reusable components in `packages/shadcn-ui` and resolves their imports correctly.

```tsx
import { Button } from "shadcn-ui/components/atomic/button"
```

## Themes

The app supports **Light**, **Dark**, and **System**. It defaults to Light and remembers explicit selections in local storage through `next-themes`. Selecting System follows device changes.

- Change shared tokens in `packages/shadcn-ui/src/styles/tokens.css` under `:root` and `.dark`. The global stylesheet maps them to Tailwind utilities.
- The shared `ThemeProvider` is mounted once in `apps/dashboard/app/layout.tsx`.
- The shared `ThemeSwitcher` uses labeled buttons with pressed states.
- The root layout suppresses the expected theme attribute hydration warning. Theme controls use a stable server snapshot during hydration, and the theme initialization script applies the saved preference before paint.

ESLint runs separately from `next build`. TypeScript errors remain enabled during production builds.

## Modern dashboard

The main page includes reporting periods, interactive sales charts, searchable and sortable orders, pagination, order details, workspace search (Ctrl/⌘ + K), theme preferences, and CSV export. It uses explicitly labeled sample data; no backend or external account is required.

The design system explorer includes live theme-aware swatches, typography, spacing, component states, copyable variable names, and JSON export of the selected theme. The shared UI package includes all 63 installable shadcn Base UI / Nova components, with a searchable component index and interactive examples in the Components tab. Import components from `shadcn-ui/components/atomic/<name>`. See [the design system guide](docs/design-system.md) for the reference analysis, token architecture, component APIs, and accessibility conventions.

Run `pnpm --filter shadcn-ui test` for token integrity, text contrast, and class-merging regression checks. The app excludes the development-only generated validator from standalone typechecking because this Next.js version emits unused API-route imports when no API routes exist; the production validator remains checked.

The shared lint configuration uses Babel to parse TypeScript 7 syntax, and ESLint checks JavaScript and React rules. The native TypeScript compiler handles symbol checks, including unused locals and parameters. This avoids requiring the older JavaScript compiler API used by `typescript-eslint`.

## References

- [Next.js](https://nextjs.org/docs)
- [Turborepo](https://turborepo.dev/docs)
- [shadcn/ui monorepos](https://ui.shadcn.com/docs/monorepo)
- [shadcn/ui dark mode](https://ui.shadcn.com/docs/dark-mode/next)
