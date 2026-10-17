import { AreaChart } from "../src/components/molecules/charts/area-chart"
import {
  BarChart,
  type BarChartProps,
} from "../src/components/molecules/charts/bar-chart"
import { LineChart } from "../src/components/molecules/charts/line-chart"
import { PieChart } from "../src/components/molecules/charts/pie-chart"
import { RadarChart } from "../src/components/molecules/charts/radar-chart"
import { RadialChart } from "../src/components/molecules/charts/radial-chart"
import type { ChartSeries } from "../src/lib/charts"
import {
  GaugeChart,
  type GaugeChartProps,
  type GaugeThreshold,
} from "../src/components/molecules/charts"

type Point = { month: string; desktop: number; mobile: number | null }
const data: readonly Point[] = [{ month: "Jan", desktop: 10, mobile: null }]
const series = [
  { dataKey: "desktop", label: "Desktop", color: "chart-1" },
] as const satisfies readonly ChartSeries<Point>[]
const props = {
  data,
  series,
  categoryKey: "month" as const,
  label: "Visits",
  dir: "rtl" as const,
}

export const examples = (
  <>
    <GaugeChart
      dir="rtl"
      label="Capacity"
      value={72}
      unit="%"
      showNeedle
      thresholds={[{ upTo: 100, color: "success" }]}
    />
    <AreaChart {...props} normalized gradient curve="step" />
    <BarChart {...props} orientation="horizontal" stacked labels />
    <LineChart {...props} dots connectNulls lineProps={{ strokeWidth: 3 }} />
    <RadarChart {...props} grid="circle" />
    <PieChart
      dir="rtl"
      data={data}
      label="Share"
      categoryKey="month"
      valueKey="desktop"
      variant="donut"
    />
    <RadialChart
      dir="rtl"
      data={data}
      label="Progress"
      categoryKey="month"
      valueKey="desktop"
      max={100}
    />
  </>
)

export const invalidGaugeValue: Pick<GaugeChartProps, "value"> = {
  // @ts-expect-error Gauge values are numeric or explicitly missing.
  value: "72",
}
export const invalidDirection: Pick<BarChartProps<Point>, "dir"> = {
  // @ts-expect-error Chart direction accepts only explicit LTR or RTL overrides.
  dir: "auto",
}
export const invalidGaugeColor: GaugeThreshold = {
  upTo: 100,
  // @ts-expect-error Threshold colors use design-system tokens.
  color: "#123456",
}

export const invalidKey: ChartSeries<Point> = {
  // @ts-expect-error String categories cannot be plotted as numeric series.
  dataKey: "month",
  label: "Month",
}
export const invalidColor: ChartSeries<Point> = {
  dataKey: "desktop",
  label: "Desktop",
  // @ts-expect-error Chart colors use the design system's color tokens.
  color: "#123456",
}
export const invalidCategory: Pick<BarChartProps<Point>, "categoryKey"> = {
  // @ts-expect-error Categories must refer to a real data key.
  categoryKey: "missing",
}
