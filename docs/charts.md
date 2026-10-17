# Reusable charts

Seven chart families compose the existing shadcn chart primitives with Recharts 3. The chart primitives remain in `atomic/chart`; all reusable chart types and helpers live in `molecules/charts`.

The [shadcn chart gallery](https://ui.shadcn.com/charts/bar#charts) informs the supported families and variants. These are configurable components rather than separate copies of every gallery example. Low-level Recharts props and `children` support custom labels, shapes, annotations, and interactions.

## Imports

```tsx
import { AreaChart } from "shadcn-ui/components/molecules/charts/area-chart"
import { BarChart } from "shadcn-ui/components/molecules/charts/bar-chart"
import { LineChart } from "shadcn-ui/components/molecules/charts/line-chart"
import { PieChart } from "shadcn-ui/components/molecules/charts/pie-chart"
import { RadarChart } from "shadcn-ui/components/molecules/charts/radar-chart"
import { RadialChart } from "shadcn-ui/components/molecules/charts/radial-chart"
import { GaugeChart } from "shadcn-ui/components/molecules/charts/gauge-chart"
import type { ChartSeries } from "shadcn-ui/lib/charts"
```

These are client components. Add a client boundary when supplying callbacks such as value formatters or event handlers. All charts use the app's existing `globals.css` and chart tokens.

The same components and their prop types can be imported together from `shadcn-ui/components/molecules/charts`. The folder also contains shared Cartesian and polar implementations, the chart frame, SalesChart, and Sparkline.

## Series charts

Area, bar, line, and radar charts share `data`, `categoryKey`, and `series`. Keys refer to real fields in the row type; numeric series cannot point to string fields.

```tsx
type Point = { month: string; desktop: number; mobile: number | null }

const data: Point[] = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: null },
]

const series = [
  { dataKey: "desktop", label: "Desktop", color: "chart-1" },
  { dataKey: "mobile", label: "Mobile", color: "chart-2", strokeDasharray: "4 3" },
] satisfies ChartSeries<Point>[]

<BarChart
  label="Visitors by month and device"
  data={data}
  categoryKey="month"
  series={series}
  orientation="horizontal"
  showDataTable
/>

<AreaChart label="Visitor trends" data={data} categoryKey="month" series={series} gradient stacked />
<LineChart label="Visitor comparison" data={data} categoryKey="month" series={series} curve="step" dots />
<RadarChart label="Visitor profiles" data={data} categoryKey="month" series={series} grid="circle" />
```

| Component    | Main options                                                                   | Custom rendering                       |
| ------------ | ------------------------------------------------------------------------------ | -------------------------------------- |
| `BarChart`   | `orientation`, `stacked`, `normalized`, `labels`                               | `barProps`, `chartProps`, `children`   |
| `AreaChart`  | `curve`, `gradient`, `stacked`, `normalized`, `dots`, `connectNulls`, `labels` | `areaProps`, `chartProps`, `children`  |
| `LineChart`  | `curve`, `dots`, `connectNulls`, `labels`                                      | `lineProps`, `chartProps`, `children`  |
| `RadarChart` | `grid="polygon\|circle\|none"`, `filled`, `dots`, `radialLines`, `valueAxis`   | `radarProps`, `chartProps`, `children` |

Cartesian charts also accept `grid`, `axes`, `valueAxis`, `categoryFormatter`, and `valueDomain`. Curves support Recharts curve types, including `monotone`, `linear`, and `step`. Set `labels` or supply custom Recharts label props. A normalized stack uses a 0–100% axis while its tooltips and table show the original values.

For interactive charts, keep selected series or filtered data in the parent and pass the selection back as `series` or `data`. `chartProps` exposes Recharts event handlers. This keeps application state outside the reusable chart.

## Pie, donut, and radial charts

Circular charts accept `categoryKey` and a numeric `valueKey`. Each category receives a token color and a matching legend entry. `colors` overrides the palette with color-token names.

```tsx
const sources = [
  { name: "Direct", visitors: 420 },
  { name: "Search", visitors: 310 },
  { name: "Referral", visitors: 180 },
  { name: "Social", visitors: 90 },
]

<PieChart
  label="Visitors by source"
  data={sources}
  categoryKey="name"
  valueKey="visitors"
  variant="donut"
  centerValue="1,000"
  centerLabel="Visitors"
  showDataTable
/>

<RadialChart
  label="Source distribution"
  data={sources}
  categoryKey="name"
  valueKey="visitors"
  variant="stacked"
  max={1000}
  startAngle={180}
  endAngle={0}
/>
```

| Component     | Main options                                                                                 | Custom rendering                        |
| ------------- | -------------------------------------------------------------------------------------------- | --------------------------------------- |
| `PieChart`    | `variant="pie\|donut"`, `labels`, `innerRadius`, `outerRadius`, `centerValue`, `centerLabel` | `pieProps`, `chartProps`, `children`    |
| `RadialChart` | `variant="rings\|stacked"`, `max`, `startAngle`, `endAngle`, `labels`, radii, center text    | `radialProps`, `chartProps`, `children` |

Radial rings scale to the maximum value by default; stacked arcs scale to the sum. Supply `max={100}` for percentage progress, or another explicit maximum. Values exceeding a supplied maximum produce an error state. Center text is caller-provided so it can represent the appropriate total, unit, or metric. Zero-total circular charts display the empty state.

## Gauge chart

Use a gauge for one measurement within a known range. It supports semicircle and full-circle views, an optional needle, token colors, threshold labels, and range labels. Values at the minimum and maximum remain valid, including zero.

```tsx
import { GaugeChart } from "shadcn-ui/components/molecules/charts"

;<GaugeChart
  label="Capacity used"
  value={72}
  min={0}
  max={100}
  unit="%"
  showNeedle
  thresholds={[
    { upTo: 50, color: "success", label: "Comfortable" },
    { upTo: 80, color: "warning", label: "Approaching capacity" },
    { upTo: 100, color: "danger", label: "High capacity" },
  ]}
  showDataTable
/>
```

| Prop                            | Behavior                                                                                                                                                                      |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                         | A finite number within the range; `null` displays the empty state.                                                                                                            |
| `min`, `max`                    | Defaults to 0 and 100. Nonzero and negative minimums are supported.                                                                                                           |
| `variant`                       | `semicircle` (default) or `circle`.                                                                                                                                           |
| `color`, `trackColor`           | Token colors for progress and the remaining track. Defaults to `chart-1` and `muted`.                                                                                         |
| `thresholds`                    | Increasing inclusive upper bounds, each with a token color and optional label. The first matching threshold sets the progress color. Values above the last bound use `color`. |
| `showNeedle`, `showRangeLabels` | Needle defaults to false; range labels default to true.                                                                                                                       |
| `unit`, `valueFormatter`        | Append a unit, or provide a formatter for the value, range labels, tooltip, and table.                                                                                        |
| `tooltip`                       | Defaults to false because the measurement is visible. Accepts the shared tooltip options.                                                                                     |
| `pieProps`                      | Customize presentation and events on the Recharts arc while retaining gauge geometry and scale.                                                                               |

The gauge also accepts shared height, class, description, loading, error, empty-message, and data-table props. Its accessible meter announces the actual value and range. Out-of-range values, non-finite inputs, invalid ranges, and unordered thresholds display an error rather than silently clamping the measurement. The table retains the original value, minimum, and maximum.

## Shared options

| Prop                          | Behavior                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `label`                       | Required accessible chart title and table caption.                                                            |
| `description`                 | Optional accessible explanation. Put visible headings in `PanelHeader`.                                       |
| `height`                      | Optional pixel height; defaults to the shared `--chart-height` token.                                         |
| `className`, `chartClassName` | Style the figure and the shadcn chart container.                                                              |
| `legend`                      | Show the shadcn legend; defaults to `true`.                                                                   |
| `tooltip`                     | `true`, `false`, or options for `indicator`, `hideLabel`, `hideIndicator`, `formatter`, and `labelFormatter`. |
| `valueFormatter`              | Format numeric axes, values in tooltips, and data tables.                                                     |
| `loading`                     | Show a skeleton with a loading status.                                                                        |
| `error`                       | Show an explicit error message.                                                                               |
| `emptyMessage`                | Override the empty-state text.                                                                                |
| `showDataTable`               | Show an expandable table. Otherwise an equivalent screen-reader table is included.                            |

```tsx
<LineChart
  label="Revenue"
  data={data}
  categoryKey="month"
  series={series}
  tooltip={{ indicator: "dashed", hideLabel: true }}
  valueFormatter={(value) => `$${value}`}
  loading={false}
  legend={false}
/>
```

The original `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, and `ChartLegendContent` remain available from `atomic/chart` for completely custom compositions.

## Behavior and accessibility

- Charts use stable generated keys for color configuration, independent of user-provided data keys and labels.
- Finite numeric values are validated. Signed values are supported by Cartesian charts; pie, radar, radial, and normalized stacks require nonnegative values.
- Missing values create gaps in line and area charts unless `connectNulls` is enabled. Circular charts treat missing numeric values as zero; the table retains an explicit missing-value marker.
- All charts enable Recharts keyboard accessibility, use shared text and color tokens, and include shadcn data tables. Axes, legends, tooltips, tables, and polar geometry follow the chart's resolved direction.
- Animation is disabled by default, including loading skeleton animation when reduced motion is requested.
- A rendering error boundary provides a fallback while retaining the data table. New data resets the boundary.

The main dashboard's `SalesChart` now composes the reusable `LineChart`. Sparklines retain their compact, decorative presentation.

## RTL and mixed directions

Every chart family, `SalesChart`, and `Sparkline` inherits `DirectionProvider`. Set `dir="rtl"` or `dir="ltr"` on a chart to override it, including its tooltip, legend, and data table. Keep the page's HTML `dir` synchronized with the provider, as the workspace direction switch already does.

```tsx
<LineChart {...props} dir="rtl" />
<GaugeChart label="Capacity" value={72} dir="rtl" showNeedle />
```

RTL Cartesian charts place the first category on the right, move the Y axis to the right, and reverse the horizontal numeric scale for horizontal bars. Grouped series mirror within each category while retaining their original colors and legend order. Recharts handles arrow-key exploration using the reversed axis. Data and table row order remain unchanged.

Pie, radar, radial, and gauge charts reflect their angles across the vertical axis. Custom start/end angles reflect as well; fractions and values keep the same scale. Gauge range labels put the minimum on the right in RTL and the needle uses the same reflected angles as the arc.

SVG coordinates and text anchors retain their physical coordinate system; text is never flipped with a transform. HTML legends and tooltips use the resolved reading direction. Formatted numeric tooltip values and gauge values use an isolated LTR run to preserve signs, decimals, and units. Direction does not translate labels or change number formatting: supply localized labels and `valueFormatter` where needed.

Open **Design system → Components → Charts for every view** for seven live examples, variant selectors, tooltip styles, an interactive series selector, a gauge slider, and loading/empty/error previews. The direction selector supports workspace inheritance or a chart-only override; the language selector supplies English or Persian sample labels. The examples use explicitly illustrative data.

Run `pnpm --filter shadcn-ui test` for data-validation regressions and `pnpm typecheck` for chart API fixtures.
