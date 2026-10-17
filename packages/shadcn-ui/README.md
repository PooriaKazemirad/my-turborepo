# shadcn-ui

The shared UI workspace package for the dashboard, located in `packages/shadcn-ui`.

It includes all 63 installed shadcn Base UI / Nova components, shared design tokens, Typography, Panel, AutocompleteField, theme controls, and dashboard helpers.

## Component structure

```text
src/components/
  atomic/       Shadcn components and the shared Typography primitive
  molecules/    Reusable compositions built from those primitives
    charts/     Chart families, gauges, shared helpers, and sparklines
```

`atomic` contains the installed shadcn components, including shadcn's own composed controls such as Calendar and Sidebar. Typography also lives here so primitives can share text styles without depending on molecules.

`molecules` contains AutocompleteField, Panel, dashboard charts, detail dialogs, person avatars, status badges, and theme controls. App-specific screens and state remain in the dashboard app. The shadcn CLI's `ui` alias points to `atomic` for future component installations.

## Usage

Add the workspace dependency to a consuming app:

```json
{
  "dependencies": {
    "shadcn-ui": "workspace:*"
  }
}
```

Import components and styles through the package exports:

```tsx
import { Button } from "shadcn-ui/components/atomic/button"
import { Typography } from "shadcn-ui/components/atomic/typography"
import {
  Panel,
  PanelHeader,
  PanelContent,
} from "shadcn-ui/components/molecules/panel"
import { AutocompleteField } from "shadcn-ui/components/molecules/autocomplete-field"
import "shadcn-ui/globals.css"
```

This package exports TypeScript source. Next.js consumers can include `shadcn-ui` in `transpilePackages`. The dashboard already configures this, along with shadcn CLI aliases and shared PostCSS settings.

## Checks

Run from the repository root:

```sh
pnpm --filter shadcn-ui typecheck
pnpm --filter shadcn-ui lint
pnpm --filter shadcn-ui test
```

See the [design system guide](../../docs/design-system.md) for tokens and component APIs.

Reusable area, bar, line, pie/donut, radar, radial, and gauge charts live in `molecules/charts`. Import them together from `shadcn-ui/components/molecules/charts`, or use individual chart module paths. See the [chart guide](../../docs/charts.md) for typed data APIs, variants, tooltips, and examples.
