"use client"

import { useState, type ReactNode } from "react"
import {
  NativeSelect,
  NativeSelectOption,
} from "shadcn-ui/components/atomic/native-select"
import { Typography } from "shadcn-ui/components/atomic/typography"
import {
  Panel,
  PanelContent,
  PanelHeader,
} from "shadcn-ui/components/molecules/panel"
import { BarChart } from "shadcn-ui/components/molecules/charts/bar-chart"
import { AreaChart } from "shadcn-ui/components/molecules/charts/area-chart"
import { LineChart } from "shadcn-ui/components/molecules/charts/line-chart"
import { PieChart } from "shadcn-ui/components/molecules/charts/pie-chart"
import { RadarChart } from "shadcn-ui/components/molecules/charts/radar-chart"
import { RadialChart } from "shadcn-ui/components/molecules/charts/radial-chart"
import { GaugeChart } from "shadcn-ui/components/molecules/charts/gauge-chart"
import { Slider } from "shadcn-ui/components/atomic/slider"
import type { ChartSeries } from "shadcn-ui/lib/charts"
import type { ChartTooltipOptions } from "shadcn-ui/components/molecules/charts/chart-base"

const traffic = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]
const series = [
  { dataKey: "desktop", label: "Desktop", color: "chart-1" },
  {
    dataKey: "mobile",
    label: "Mobile",
    color: "chart-2",
    strokeDasharray: "4 3",
  },
] as const satisfies readonly ChartSeries<(typeof traffic)[number]>[]
const sources = [
  { source: "Direct", visitors: 420 },
  { source: "Search", visitors: 310 },
  { source: "Referral", visitors: 180 },
  { source: "Social", visitors: 90 },
]
const skills = [
  { skill: "Design", current: 80, previous: 65 },
  { skill: "Research", current: 68, previous: 75 },
  { skill: "Delivery", current: 92, previous: 70 },
  { skill: "Quality", current: 85, previous: 78 },
  { skill: "Support", current: 73, previous: 60 },
]
const radarSeries = [
  { dataKey: "current", label: "Current", color: "chart-1" },
  {
    dataKey: "previous",
    label: "Previous",
    color: "chart-2",
    strokeDasharray: "4 3",
  },
] as const satisfies readonly ChartSeries<(typeof skills)[number]>[]

function ChartExample({
  title,
  description,
  variants,
  value,
  onChange,
  children,
}: {
  title: string
  description: string
  variants: readonly string[]
  value: string
  onChange: (value: string) => void
  children: ReactNode
}) {
  return (
    <Panel aria-label={`${title} examples`}>
      <PanelHeader
        title={title}
        description={description}
        action={
          <NativeSelect
            aria-label={`${title} variant`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          >
            {variants.map((variant) => (
              <NativeSelectOption key={variant} value={variant}>
                {variant}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        }
      />
      <PanelContent>{children}</PanelContent>
    </Panel>
  )
}

export function ChartExamples() {
  const [direction, setDirection] = useState<"inherit" | "ltr" | "rtl">(
    "inherit"
  )
  const [language, setLanguage] = useState("en")
  const translations: Record<string, string> = {
    Jan: "ژانویه",
    Feb: "فوریه",
    Mar: "مارس",
    Apr: "آوریل",
    May: "مه",
    Jun: "ژوئن",
    Desktop: "رایانه",
    Mobile: "موبایل",
    Direct: "مستقیم",
    Search: "جستجو",
    Referral: "ارجاع",
    Social: "شبکه اجتماعی",
    Design: "طراحی",
    Research: "پژوهش",
    Delivery: "تحویل",
    Quality: "کیفیت",
    Support: "پشتیبانی",
    Current: "فعلی",
    Previous: "قبلی",
  }
  const sampleLabel = (value: string) =>
    language === "fa" ? (translations[value] ?? value) : value
  const sampleTraffic = traffic.map((row) => ({
    ...row,
    month: sampleLabel(row.month),
  }))
  const sampleSeries = series.map((item) => ({
    ...item,
    label: sampleLabel(item.label),
  }))
  const sampleSources = sources.map((row) => ({
    ...row,
    source: sampleLabel(row.source),
  }))
  const sampleSkills = skills.map((row) => ({
    ...row,
    skill: sampleLabel(row.skill),
  }))
  const sampleRadarSeries = radarSeries.map((item) => ({
    ...item,
    label: sampleLabel(item.label),
  }))
  const dir = direction === "inherit" ? undefined : direction
  const [bar, setBar] = useState("Grouped")
  const [area, setArea] = useState("Gradient")
  const [line, setLine] = useState("Smooth")
  const [pie, setPie] = useState("Donut")
  const [radar, setRadar] = useState("Polygon")
  const [radial, setRadial] = useState("Rings")
  const [gauge, setGauge] = useState("Semicircle")
  const [gaugeValues, setGaugeValues] = useState<number[]>([72])
  const [state, setState] = useState("Ready")
  const [device, setDevice] = useState("desktop")
  const [tooltipStyle, setTooltipStyle] = useState("dot")
  const tooltip: boolean | ChartTooltipOptions =
    tooltipStyle === "none"
      ? false
      : {
          indicator:
            tooltipStyle === "line" || tooltipStyle === "dashed"
              ? tooltipStyle
              : ("dot" as const),
          hideLabel: tooltipStyle === "hide-label",
          hideIndicator: tooltipStyle === "hide-indicator",
        }
  const shared = {
    dir,
    data: state === "Empty" ? [] : sampleTraffic,
    loading: state === "Loading",
    error:
      state === "Error" ? "The chart data could not be loaded." : undefined,
    categoryKey: "month" as const,
    series: sampleSeries,
    showDataTable: true,
    tooltip,
  }
  return (
    <section aria-labelledby="chart-examples-title" className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Typography
            as="h2"
            id="chart-examples-title"
            color="foreground"
            variant="title"
            weight="semibold"
          >
            Charts for every view
          </Typography>
          <Typography color="muted-foreground" variant="body" className="mt-1">
            Seven reusable chart families. Sample data, shared tokens, and
            accessible tables.
          </Typography>
        </div>
        <div className="flex flex-wrap gap-2">
          <NativeSelect
            aria-label="Chart direction"
            value={direction}
            onChange={(event) =>
              setDirection(event.target.value as typeof direction)
            }
          >
            <NativeSelectOption value="inherit">
              Workspace direction
            </NativeSelectOption>
            <NativeSelectOption value="ltr">Left to right</NativeSelectOption>
            <NativeSelectOption value="rtl">Right to left</NativeSelectOption>
          </NativeSelect>
          <NativeSelect
            aria-label="Chart sample language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <NativeSelectOption value="en">English labels</NativeSelectOption>
            <NativeSelectOption value="fa">Persian labels</NativeSelectOption>
          </NativeSelect>
          <NativeSelect
            aria-label="Chart tooltip style"
            value={tooltipStyle}
            onChange={(event) => setTooltipStyle(event.target.value)}
          >
            {[
              ["dot", "Dot tooltip"],
              ["line", "Line tooltip"],
              ["dashed", "Dashed tooltip"],
              ["hide-label", "No tooltip label"],
              ["hide-indicator", "No tooltip indicator"],
              ["none", "No tooltip"],
            ].map(([value, label]) => (
              <NativeSelectOption key={value} value={value}>
                {label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <NativeSelect
            aria-label="Chart data state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            {["Ready", "Loading", "Empty", "Error"].map((value) => (
              <NativeSelectOption key={value}>{value}</NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <ChartExample
          title="Bar chart"
          description="Compare categories, groups, and contributions."
          variants={[
            "Grouped",
            "Horizontal",
            "Stacked",
            "Normalized",
            "Labels",
            "Negative",
            "Interactive",
          ]}
          value={bar}
          onChange={setBar}
        >
          {bar === "Interactive" && (
            <NativeSelect
              aria-label="Bar chart device"
              value={device}
              onChange={(event) => setDevice(event.target.value)}
            >
              <NativeSelectOption value="desktop">Desktop</NativeSelectOption>
              <NativeSelectOption value="mobile">Mobile</NativeSelectOption>
            </NativeSelect>
          )}
          <BarChart
            {...shared}
            label="Monthly visitors by device"
            orientation={bar === "Horizontal" ? "horizontal" : "vertical"}
            stacked={bar === "Stacked"}
            normalized={bar === "Normalized"}
            labels={bar === "Labels"}
            data={
              bar === "Negative" && state === "Ready"
                ? sampleTraffic.map((row) => ({ ...row, mobile: -row.mobile }))
                : shared.data
            }
            series={
              bar === "Interactive"
                ? sampleSeries.filter((item) => item.dataKey === device)
                : sampleSeries
            }
          />
        </ChartExample>
        <ChartExample
          title="Area chart"
          description="Follow trends with fills and stacked proportions."
          variants={[
            "Gradient",
            "Smooth",
            "Linear",
            "Step",
            "Stacked",
            "Normalized",
            "Dots",
          ]}
          value={area}
          onChange={setArea}
        >
          <AreaChart
            {...shared}
            label="Visitor trends"
            gradient={area === "Gradient"}
            curve={
              area === "Step"
                ? "step"
                : area === "Linear"
                  ? "linear"
                  : "monotone"
            }
            stacked={area === "Stacked"}
            normalized={area === "Normalized"}
            dots={area === "Dots"}
          />
        </ChartExample>
        <ChartExample
          title="Line chart"
          description="Compare series using curves, dots, and labels."
          variants={[
            "Smooth",
            "Linear",
            "Step",
            "Dots",
            "Labels",
            "Single series",
          ]}
          value={line}
          onChange={setLine}
        >
          <LineChart
            {...shared}
            label="Monthly visitor comparison"
            curve={
              line === "Step"
                ? "step"
                : line === "Linear"
                  ? "linear"
                  : "monotone"
            }
            dots={line === "Dots" || line === "Labels"}
            labels={line === "Labels"}
            series={
              line === "Single series" ? sampleSeries.slice(0, 1) : sampleSeries
            }
          />
        </ChartExample>
        <ChartExample
          title="Pie chart"
          description="Show category shares with optional center text."
          variants={["Donut", "Pie", "Labels", "No separator"]}
          value={pie}
          onChange={setPie}
        >
          <PieChart
            dir={dir}
            label="Visitors by source"
            data={state === "Empty" ? [] : sampleSources}
            loading={shared.loading}
            error={shared.error}
            categoryKey="source"
            valueKey="visitors"
            variant={pie === "Pie" || pie === "Labels" ? "pie" : "donut"}
            labels={pie === "Labels"}
            centerValue="1,000"
            centerLabel={language === "fa" ? "بازدیدکنندگان" : "Visitors"}
            showDataTable
            tooltip={tooltip}
            pieProps={pie === "No separator" ? { strokeWidth: 0 } : undefined}
          />
        </ChartExample>
        <ChartExample
          title="Radar chart"
          description="Compare several measures across a shared scale."
          variants={[
            "Polygon",
            "Circle",
            "Lines only",
            "Dots",
            "No grid",
            "Circle without spokes",
          ]}
          value={radar}
          onChange={setRadar}
        >
          <RadarChart
            dir={dir}
            label="Team performance"
            data={state === "Empty" ? [] : sampleSkills}
            loading={shared.loading}
            error={shared.error}
            categoryKey="skill"
            series={sampleRadarSeries}
            grid={
              radar === "No grid"
                ? "none"
                : radar.startsWith("Circle")
                  ? "circle"
                  : "polygon"
            }
            filled={radar !== "Lines only"}
            dots={radar === "Dots"}
            radialLines={radar !== "Circle without spokes"}
            showDataTable
            tooltip={tooltip}
          />
        </ChartExample>
        <ChartExample
          title="Radial chart"
          description="Compare rings or combine values in a stacked arc."
          variants={["Rings", "Stacked", "Half circle", "Labels"]}
          value={radial}
          onChange={setRadial}
        >
          <RadialChart
            dir={dir}
            label="Source distribution"
            data={state === "Empty" ? [] : sampleSources}
            loading={shared.loading}
            error={shared.error}
            categoryKey="source"
            valueKey="visitors"
            variant={radial === "Stacked" ? "stacked" : "rings"}
            max={radial === "Stacked" ? 1000 : 500}
            startAngle={radial === "Half circle" ? 180 : 90}
            endAngle={radial === "Half circle" ? 0 : -270}
            labels={radial === "Labels"}
            showDataTable
            tooltip={tooltip}
          />
        </ChartExample>
        <ChartExample
          title="Gauge chart"
          description="Measure a value against a defined range."
          variants={[
            "Semicircle",
            "Circle",
            "Needle",
            "Thresholds",
            "Custom range",
          ]}
          value={gauge}
          onChange={setGauge}
        >
          <GaugeChart
            dir={dir}
            label={
              gauge === "Custom range"
                ? "Operating temperature"
                : "Capacity used"
            }
            value={
              state === "Empty"
                ? null
                : gauge === "Custom range"
                  ? 40 + (gaugeValues[0] ?? 72) * 0.4
                  : (gaugeValues[0] ?? 72)
            }
            min={gauge === "Custom range" ? 40 : 0}
            max={gauge === "Custom range" ? 80 : 100}
            unit="%"
            valueFormatter={
              gauge === "Custom range" ? (n) => `${n.toFixed(1)}°C` : undefined
            }
            variant={gauge === "Circle" ? "circle" : "semicircle"}
            showNeedle={gauge === "Needle" || gauge === "Thresholds"}
            thresholds={
              gauge === "Thresholds"
                ? [
                    { upTo: 50, color: "success", label: "Comfortable" },
                    {
                      upTo: 80,
                      color: "warning",
                      label: "Approaching capacity",
                    },
                    { upTo: 100, color: "danger", label: "High capacity" },
                  ]
                : undefined
            }
            loading={shared.loading}
            error={shared.error}
            tooltip={tooltip}
            showDataTable
          />
          <div className="mt-4 space-y-3">
            <Typography as="span" variant="caption" color="muted-foreground">
              Adjust the gauge value
            </Typography>
            <Slider
              aria-label="Gauge value"
              value={gaugeValues}
              onValueChange={(value) =>
                setGaugeValues(typeof value === "number" ? [value] : [...value])
              }
              min={0}
              max={100}
              step={1}
            />
          </div>
        </ChartExample>
      </div>
    </section>
  )
}
