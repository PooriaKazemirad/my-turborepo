# Design System

Standalone Next.js application for the shared foundations, tokens, charts, and
component library. Includes 63 live component previews with 288 variants and
states, seven chart families, light/dark themes, RTL/LTR layout, and token export.

From the repository root:

```sh
pnpm install
pnpm dev:design-system
```

Open [http://localhost:3001](http://localhost:3001). `pnpm dev` starts both apps;
the dashboard uses port 3000 and this app uses port 3001.

```sh
pnpm --filter design-system typecheck
pnpm --filter design-system lint
pnpm --filter design-system build
pnpm --filter design-system start
```

Dependencies use the workspace catalog. Components, chart implementations,
tokens, Tailwind styles, and their runtime dependencies come from the
`shadcn-ui` workspace package. TypeScript, ESLint, PostCSS, fonts, providers,
and shadcn CLI aliases are configured within this app.

For deployment, set `DASHBOARD_URL` in this app to the dashboard's public URL.
Set `DESIGN_SYSTEM_URL` in the dashboard app to this app's public URL. Defaults
are `http://localhost:3000` and `http://localhost:3001`, respectively. These
variables are part of Turbo's cache inputs. Existing dashboard links to
`/design-system` redirect here; this app also accepts `/design-system` bookmarks.
