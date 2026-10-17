# Modern Dashboard design system

The dashboard translates the [Modern Admin Dashboard reference](https://demos.shadcndashboard.dev/dashboards/modern) into an original implementation in the existing Next.js monorepo. Its public [Next.js implementation](https://github.com/shadcndashboard/next-shadcn-dashboard) and live stylesheet assets informed the analysis. The reference's direct browser connection failed during inspection, so this is a reference-informed implementation rather than a verified pixel-for-pixel copy.

## Reference analysis

| Pattern    | Reference observation                                                | Implementation                                                               |
| ---------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Shell      | Persistent vertical navigation, compact header, grouped destinations | Collapsible desktop sidebar, mobile navigation dialog, breadcrumbs, search   |
| Hierarchy  | Greeting and reporting actions precede financial summaries           | A greeting, period selector, export action, and three metric cards           |
| Surfaces   | Outlined cards with restrained elevation                             | White or carbon panels, 1px borders, 12px corners                            |
| Typography | Geist, compact supporting text, prominent financial values           | Seven semantic text sizes, tabular metrics, monospace identifiers            |
| Data       | Sales comparison, four asset counts, projects and orders             | Two distinct line styles, accessible data table, asset grid, sortable orders |
| Color      | Neutral shell with semantic chart and status accents                 | Cool neutral foundations; green, amber, red, and blue semantic pairs         |
| Density    | Compact controls with room between content groups                    | 4px base, 20px panel padding and gaps, 32px desktop gutters                  |

The implementation preserves the reference's content hierarchy while adding a discoverable design system, complete interactions, responsive behavior, and explicit sample-data labeling. Business totals are illustrative. Sales totals and percentages are calculated from the displayed chart series.

## Token architecture

`packages/ui/src/styles/tokens.css` is the source of truth. It has three levels:

1. **Foundations:** the neutral palette, spacing, type, radii, elevation, and motion.
2. **Semantic roles:** `background`, `foreground`, `card`, `primary`, `success`, `sidebar`, and chart roles reference foundations or define purpose-specific colors.
3. **Component usage:** Tailwind utilities in `globals.css` and layout rules in `apps/dashboard/app/dashboard.css` consume those roles.

Themes override semantic values under `.dark`; component markup stays the same. Use semantic colors in components, and add raw color values only to the token file. Consumers can import the tokens alone from `@workspace/ui/tokens.css`, or use the complete `@workspace/ui/globals.css`. `lib/design-tokens.ts` contains token names and descriptions, with no duplicated visual values. `/design-system` resolves values from the active CSS theme, supports copying `var(--token)`, and exports grouped JSON for the selected theme. The JSON is a resolved CSS-variable export, not a claimed DTCG interchange format.

| Category   | Tokens / convention                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Colors     | Neutral 0–950; canvas, surfaces, ink, input, focus, sidebar, chart series                               |
| Feedback   | `success`, `warning`, `danger`, `info`, each with a `-soft` background                                  |
| Spacing    | `space-1/2/3/4/5/6/8/10/12` = 4/8/12/16/20/24/32/40/48px                                                |
| Typography | `caption` 11px, `label` 12px, `body` 13px, `subtitle` 14px, `title` 16px, `heading` 24px, `metric` 28px |
| Shape      | Control 7px, default 10px, panel 12px, full 9999px; border 1px                                          |
| Elevation  | `elevation-panel` for cards; `elevation-popover` for dialogs and transient messages                     |
| Motion     | `duration-fast` 150ms; `duration-normal` 220ms; `ease-standard` cubic-bezier(0.2, 0, 0, 1)              |
| Layout     | Sidebar 244px / collapsed 72px; header 68px; page maximum 1600px; chart 256px                           |

Spacing utilities use `--space-1` as the Tailwind base. Typography utilities are registered with the shared `cn` merger so `text-label` overrides another size without accidentally removing `text-primary-foreground`.

## Shared components

### Layout direction

The dashboard and design-system gallery support LTR and RTL. Open the header's
direction preferences or use the gallery's LTR / RTL selector. The selection is
saved in the `workspace-direction` cookie and applied on the server on reload.
It changes layout direction; the existing English content is not translated.

`WorkspaceDirectionProvider` sets the document direction and wraps the shared
Base UI `DirectionProvider`, including portaled menus and dialogs. Shell layout,
table alignment, input adornments, and control spacing use logical properties.
Directional navigation icons and gallery tab arrow keys follow the active
direction. Sales charts retain left-to-right chronological order.

Import from `@workspace/ui/components/<name>`.

All application tables use the shared shadcn `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, and `TableCaption` components. This includes orders, the token reference, and the sales chart's screen-reader data table. `Table` accepts an optional `containerClassName` to control its built-in scroll container, including bounded-height and screen-reader-only layouts. Calendar week-number rendering also uses `TableCell`.

The complete official **Base UI / Nova** registry is installed: 63 component modules, plus the mobile and code-highlighting hooks. The registry's `form` entry is currently an empty compatibility placeholder; form interfaces are composed with `Field` and the input components. All installable component files from `shadcn add --all` are present, including the message, code block, attachment, questionnaire, and trace components.

The **Components** tab at `/design-system` has a searchable index with category filters, copyable import paths, official documentation links, and interactive controls, calendar, accordion, tooltip, and toast previews. The inventory is exported from `@workspace/ui/lib/component-catalog`.

`TooltipProvider` and `Toaster` are mounted in the app layout. Components use the shared semantic `cn` configuration and the existing token stylesheet. The syntax highlighter has an explicit package export because it is a TSX module. The generated carousel and mobile hook use `useSyncExternalStore` for their external state subscriptions so they comply with this project's React lint rules.

The dashboard's convenience wrappers are distinct from the standard primitives:

| Dashboard helper                                               | Module             | Standard shadcn module                                                               |
| -------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `PersonAvatar` (`name`, `tone`)                                | `person-avatar`    | `avatar` exports composable `Avatar`, `AvatarImage`, `AvatarFallback`, etc.          |
| `DetailDialog` (`title`, `description`, controlled open state) | `detail-dialog`    | `dialog` exports composable `Dialog`, `DialogContent`, `DialogTitle`, etc.           |
| `SalesChart`, `Sparkline`, `SalesPoint`                        | `dashboard-charts` | `chart` exports `ChartContainer`, `ChartTooltip`, `ChartLegend`, and related helpers |

| Component       | API / purpose                                                                                                 | States                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `Button`        | `variant`: default, outline, secondary, ghost, destructive, link; `size`: xs, sm, default, lg, and icon sizes | Hover, focus, pressed, disabled, invalid                |
| `Input`         | Native input props and accessible validation attributes                                                       | Empty, filled, focus, disabled, invalid                 |
| `Panel`         | Semantic section with shared surface tokens, native props, and refs                                           | Vertical composition of header, content, and footer     |
| `PanelHeader`   | Rich `title`/`description`, optional `icon`/`action`, `headingAs`, `separator`, and Typography props          | Actions wrap; long titles and descriptions reflow       |
| `PanelContent`  | Padded body, or `padding="none"` for edge-to-edge content                                                     | Charts, lists, asset grids, and shadcn tables           |
| `PanelFooter`   | Wrapping footer with a separator; `variant="muted"` adds a subtle surface                                     | Notes, actions, totals, and pagination                  |
| `StatusBadge`   | `tone`: success, warning, danger, info, neutral; optional `dot`                                               | Color paired with a written status                      |
| `PersonAvatar`  | `name`; `tone`: neutral, green, blue, amber                                                                   | Initials fallback; no external image dependency         |
| `DetailDialog`  | Controlled `open`, `onOpenChange`, `title`, optional `description`, `children`                                | Focus trapping, Escape/outside close, focus restoration |
| `SalesChart`    | `SalesPoint[]`: date, current, previous; period labels                                                        | Responsive, hover/keyboard tooltip, screen reader table |
| `Sparkline`     | `values`; `variant`: line, area, bar                                                                          | Decorative, hidden from assistive technology            |
| `ThemeSwitcher` | Light, Dark, System                                                                                           | Accessible pressed state; saved preference              |
| `ThemeToggle`   | Compact light/dark control                                                                                    | CSS theme icons avoid hydration differences             |

```tsx
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
} from "@workspace/ui/components/panel"
import { StatusBadge } from "@workspace/ui/components/status-badge"

;<Panel aria-labelledby="project-status-title">
  <PanelHeader
    title="Project status"
    titleProps={{ id: "project-status-title" }}
  />
  <PanelContent>
    <StatusBadge tone="success" dot>
      Delivered
    </StatusBadge>
  </PanelContent>
  <PanelFooter>Updated today</PanelFooter>
</Panel>
```

App-specific state and data live in `apps/dashboard/components/dashboard`. The route pages remain server components, and interactive behavior is isolated in client modules. Replace `data.ts` with server-fed props or an application data layer when connecting a backend.

### Panel composition

The main page uses eight panels: three metrics, sales, assets, orders, products, and activity. They shared a surface and title row but previously repeated content padding and footer borders. Metrics also implemented their own title row. These patterns now use the same four exports from `@workspace/ui/components/panel`.

`Panel` lays out its children vertically and consumes the card, border, radius, and elevation tokens. `PanelContent` uses the shared 20px padding by default; choose `padding="none"` for tables or asset grids. `PanelFooter` keeps footers at the bottom of stretched cards and wraps notes, actions, or pagination. All four components forward native attributes, refs, and `className`.

`PanelHeader` keeps the existing `title`, `description`, `icon`, and `action` API. Title and description accept React content. The decorative icon is hidden from assistive technology; action content remains interactive. A wrapping action slot and shrinkable text avoid forcing the panel wider on small screens. Optional descriptions and actions are omitted when null or false; numeric zero is preserved.

- `headingAs` defaults to `h2`; use `h3`–`h6` when nesting beneath another heading.
- `titleProps` and `descriptionProps` accept Typography styling, color tokens, IDs, and accessibility attributes. Metric cards use a normal-weight body title with `color="muted-foreground"`.
- `separator={false}` removes the header border. Native `className` customizes spacing without introducing a separate metric-only component.
- Connect the section's `aria-labelledby` to `titleProps.id` for an accessible region name. Main-page panels already do this.

The Components tab at `/design-system` includes an interactive panel example. Panel composition stays server-compatible and has no built-in data fetching or application state.

### Autocomplete field

`AutocompleteField` from `@workspace/ui/components/autocomplete-field` combines the installed Base UI autocomplete behavior with shadcn field, input-group, and combobox presentation. It accepts free text; choosing a suggestion inserts its label. Use the existing `Combobox` when the value must be restricted to a predefined choice.

```tsx
import { AutocompleteField } from "@workspace/ui/components/autocomplete-field"

;<AutocompleteField
  label="Project"
  name="project"
  options={[
    {
      value: "dashboard",
      label: "Modern Dashboard",
      description: "Analytics",
      keywords: ["admin"],
    },
    { value: "archive", label: "Archived project", disabled: true },
  ]}
  value={project}
  onValueChange={setProject}
  showOptionsOnFocus
  description="Choose a suggestion or type a new project name."
  error={projectError}
  required
/>
```

- Each option has a unique `value` identifier and a `label`. Optional `description`, `keywords`, and `disabled` support richer suggestions. Search is case- and accent-insensitive and matches every query term across the label, description, and keywords.
- `value`/`onValueChange` control the **text**. `defaultValue` provides an uncontrolled initial value. `onSelect(option)` receives a chosen suggestion separately. Native form submission through `name` submits the text, not the suggestion identifier.
- `loading` displays a spinner and loading message, announces the loading state, and hides stale suggestions. For server-filtered results, pass `filter={null}`, supply `options`, and update them from `onValueChange`; the caller owns fetching and cancellation.
- `description`, `error`, and `invalid` connect validation text to the input. The visible label, required indicator, clear/trigger button names, stable IDs, and `aria-describedby` are handled by the field. Base UI manages suggestions, focus, arrows, Enter, and Escape.
- `disabled`, `readOnly`, `required`, `form`, `name`, `id`, and an input `ref` are supported. `inputProps` accepts native input attributes such as `onBlur`, `autoComplete`, and additional help IDs; `className` styles the outer field.
- `clearable` defaults to true. `emptyMessage`, `loadingMessage`, and `placeholder` are customizable. The popup is portalled and anchored to the complete input group, with constrained height and scrolling for small screens.
- `showOptionsOnFocus` defaults to `false`. Set it to `true` to open suggestions on keyboard focus, programmatic focus, or clicking the input. With `false`, focus and input clicks alone keep the popup closed; typing, ArrowDown, and the dropdown button still open suggestions. Disabled and read-only inputs do not auto-open. Existing `inputProps.onFocus` handlers are preserved and may call `preventDefault()` to prevent automatic opening.

The Components tab at `/design-system` includes controlled, uncontrolled, required, disabled, validation, loading, and local form-submission examples. This application helper is separate from the 63 official shadcn registry entries.

## Typography component

Import `Typography` from `@workspace/ui/components/typography`. All application text uses it, directly or through text primitives such as `Label`, `PanelHeader`, `StatusBadge`, and shadcn table cells. It is a pure component that works in server and client modules without adding a client boundary.

- `variant`: `caption`, `label`, `body` (default), `subtitle`, `title`, `heading`, `metric`, or `inherit`. Sizes and line heights reference the CSS tokens; metrics use tabular numbers.
- `as`: the semantic HTML element, defaulting to `p`. Use `h1`–`h6` for headings, `span` for inline text, `label` with `htmlFor` for form labels, and `code`/`pre` for code. Shared table primitives render `th`, `td`, and `caption` through Typography.
- `weight`: `inherit` (default), `normal`, `medium`, `semibold`, or `bold`.
- `color`: a color token name from `tokenGroups.color` (for example, `foreground`, `muted-foreground`, `primary`, `primary-foreground`, `success`, or `neutral-500`), or `inherit`. The exported `TypographyColor` type follows the token catalog automatically. Values resolve through CSS variables and update with the theme. Omit it to preserve existing color inheritance or `tone` behavior.
- `tone`: `inherit` (default), `default`, `muted`, `success`, `warning`, `danger`, or `info`. Inheriting color preserves contrast in buttons, badges, and navigation states.
- An explicit `color` takes precedence over `tone`; `className` text colors can override either. Native `style` props are preserved, including explicit inline color overrides. `color` is consumed by the component and is never forwarded as an HTML attribute.
- Native props, refs, ARIA attributes, and `className` pass through to the selected element. Classes can override defaults, including responsive sizes.

```tsx
import { Typography } from "@workspace/ui/components/typography"

<Typography as="h1" variant="heading" weight="semibold" color="foreground">Overview</Typography>
<Typography color="muted-foreground">Your latest workspace activity.</Typography>
<Typography color="success">Changes saved.</Typography>
<Typography as="label" variant="label" color="foreground" htmlFor="email">Email</Typography>
<Typography as="span" variant="inherit" color="inherit">Save changes</Typography>
```

`typographyVariants` is also exported from the component and `@workspace/ui/lib/typography` for controls that own their rendering. Library text sizes use the same semantic utilities, including responsive input sizes. Native option contents remain plain text; the option element renders through Typography. Chart-generated SVG labels and tooltips read the same CSS font-size variables. The typography foundation preview at `/design-system` renders each specimen with its corresponding component variant.

Application and shared Typography instances declare their color explicitly. Use semantic tokens for primary content, supporting text, errors, and trends. Use `color="inherit"` inside controls, navigation, nested text, and table contexts whose parent owns the color. Hover, selected, invalid, and disabled state styles stay on the owning control. Badges and avatars resolve their tone to a color token internally; caller color classes can still override their appearance.

## Behavior and accessibility

- Global search opens with Ctrl/⌘ + K. Dialogs support Escape, focus trapping, and returning focus.
- Order search matches project, person, and ID. Filters reset pagination; headings sort either direction and expose `aria-sort`. Empty results explain recovery.
- Monthly/yearly reporting and chart-range selections update the displayed series. Currency is USD. Sales chart units are thousands of dollars. Exports include the displayed sales range and the complete example order dataset.
- Trends, statuses, and legends combine text with color or line style. Charts disable animation and include hidden tabular data.
- Every icon-only control has an accessible name. A skip link bypasses navigation. Catalog tabs support arrows, Home, and End.
- The sidebar switches to mobile navigation below 768px. Metrics stack, asset cells reflow, and wide tables scroll inside their panels.
- Reduced motion disables smooth scrolling and transitions. The theme provider stores appearance locally and supports the device setting.

## Validation

Run `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm --filter @workspace/ui test`. Token checks cover missing references, theme-role availability, text contrast, and custom typography class merging. Browser checks exercise the dashboard and catalog, including filters, sorting, dialogs, themes, and mobile navigation.

The development-only `.next/dev/types/validator.ts` is excluded from the app's standalone TypeScript input because this Next.js build emits unused API-route imports for an app without API routes. `.next/types/validator.ts` remains included, so production page/layout validation and strict unused-symbol checking stay enabled.
