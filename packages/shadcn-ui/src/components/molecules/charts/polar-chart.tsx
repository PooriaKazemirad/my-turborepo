"use client"

import type { ComponentProps, ReactNode } from "react"
import {
  LabelList,
  Pie,
  PieChart as RechartsPieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
} from "recharts"
import {
  ChartFrame,
  ChartOverlays,
  seriesColumns,
  seriesConfig,
  seriesData,
  useChartDirection,
  type ChartCommonProps,
  type SeriesChartProps,
} from "shadcn-ui/components/molecules/charts/chart-base"
import { Typography } from "shadcn-ui/components/atomic/typography"
import {
  chartColor,
  chartAngles,
  radarAngles,
  chartNumber,
  chartValueText,
  validateChartValues,
  type ChartKey,
  type NumericChartKey,
} from "shadcn-ui/lib/charts"
import type { ColorToken } from "shadcn-ui/lib/design-tokens"

export type CircularChartProps<T extends object> = ChartCommonProps<T> & {
  categoryKey: ChartKey<T>
  valueKey: NumericChartKey<T>
  valueLabel?: string
  colors?: readonly ColorToken[]
  centerLabel?: ReactNode
  centerValue?: ReactNode
}

export type PieChartProps<T extends object> = CircularChartProps<T> & {
  variant?: "pie" | "donut"
  labels?: boolean
  innerRadius?: number | string
  outerRadius?: number | string
  pieProps?: Omit<
    ComponentProps<typeof Pie>,
    "data" | "dataKey" | "nameKey" | "children" | "fill"
  >
  chartProps?: Omit<
    ComponentProps<typeof RechartsPieChart>,
    "data" | "children"
  >
}

export type RadarChartProps<T extends object> = SeriesChartProps<T> & {
  grid?: "polygon" | "circle" | "none"
  filled?: boolean
  dots?: boolean
  radialLines?: boolean
  valueAxis?: boolean
  radarProps?: Omit<
    ComponentProps<typeof Radar>,
    "dataKey" | "children" | "stroke" | "fill"
  >
  chartProps?: Omit<
    ComponentProps<typeof RechartsRadarChart>,
    "data" | "children"
  >
}

export type RadialChartProps<T extends object> = CircularChartProps<T> & {
  variant?: "rings" | "stacked"
  /** Fixed scale for progress charts. Defaults to the maximum value, or total for a stack. */
  max?: number
  startAngle?: number
  endAngle?: number
  labels?: boolean
  innerRadius?: number | string
  outerRadius?: number | string
  radialProps?: Omit<
    ComponentProps<typeof RadialBar>,
    "data" | "dataKey" | "children" | "fill" | "stackId"
  >
  chartProps?: Omit<
    ComponentProps<typeof RechartsRadialBarChart>,
    "data" | "children"
  >
}

function circularData<T extends object>(props: CircularChartProps<T>) {
  return props.data.map((row, index) => ({
    key: `slice${index}`,
    label: chartValueText(row[props.categoryKey]),
    value: chartNumber(row[props.valueKey]),
    fill: `var(--color-slice${index})`,
  }))
}

function circularConfig<T extends object>(props: CircularChartProps<T>) {
  return Object.fromEntries(
    props.data.map((row, index) => [
      `slice${index}`,
      {
        label: chartValueText(row[props.categoryKey]),
        color: chartColor(index, props.colors?.[index % props.colors.length]),
      },
    ])
  )
}

function circularColumns<T extends object>(props: CircularChartProps<T>) {
  return [
    { key: props.categoryKey, label: "Category" },
    { key: props.valueKey, label: props.valueLabel ?? "Value" },
  ]
}

function ChartCenter({
  value,
  label,
  legend = true,
}: {
  value?: ReactNode
  label?: ReactNode
  legend?: boolean
}) {
  if (value == null && label == null) return null
  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center"
      style={{ paddingBottom: legend ? 32 : 0 }}
    >
      {value != null && (
        <Typography
          as="span"
          variant="title"
          weight="semibold"
          color="foreground"
        >
          {value}
        </Typography>
      )}
      {label != null && (
        <Typography as="span" variant="caption" color="muted-foreground">
          {label}
        </Typography>
      )}
    </div>
  )
}

export function PieChart<T extends object>(props: PieChartProps<T>) {
  const direction = useChartDirection(props.dir)
  const data = circularData(props)
  const donut = props.variant === "donut"
  return (
    <ChartFrame
      {...props}
      config={circularConfig(props)}
      columns={circularColumns(props)}
      overlay={
        donut ? (
          <ChartCenter
            value={props.centerValue}
            label={props.centerLabel}
            legend={props.legend}
          />
        ) : undefined
      }
      error={
        props.error ?? validateChartValues(props.data, [props.valueKey], true)
      }
      empty={!data.some((item) => item.value > 0)}
    >
      <RechartsPieChart {...props.chartProps} accessibilityLayer>
        <ChartOverlays
          tooltip={props.tooltip ?? { hideLabel: true }}
          legend={props.legend}
          valueFormatter={props.valueFormatter}
          nameKey="key"
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="key"
          innerRadius={props.innerRadius ?? (donut ? "58%" : 0)}
          outerRadius={props.outerRadius ?? "85%"}
          stroke="var(--card)"
          strokeWidth={2}
          isAnimationActive={false}
          {...props.pieProps}
          {...chartAngles(
            props.pieProps?.startAngle ?? 0,
            props.pieProps?.endAngle ?? 360,
            direction
          )}
        >
          {props.labels && (
            <LabelList
              dataKey="label"
              position="outside"
              fill="var(--foreground)"
              fontSize="var(--font-size-caption)"
            />
          )}
        </Pie>
        {props.children}
      </RechartsPieChart>
    </ChartFrame>
  )
}

export function RadarChart<T extends object>(props: RadarChartProps<T>) {
  const direction = useChartDirection(props.dir)
  return (
    <ChartFrame
      {...props}
      config={seriesConfig(props.series)}
      columns={seriesColumns(props)}
      error={
        props.error ??
        validateChartValues(
          props.data,
          props.series.map((item) => item.dataKey),
          true
        )
      }
      empty={!props.data.length || !props.series.length}
    >
      <RechartsRadarChart
        outerRadius="72%"
        margin={{ top: 16, bottom: 16, left: 28, right: 28 }}
        {...props.chartProps}
        {...radarAngles(
          props.chartProps?.startAngle ?? 90,
          props.chartProps?.endAngle ?? -270,
          props.data.length,
          direction
        )}
        accessibilityLayer
        data={seriesData(props)}
      >
        {props.grid !== "none" && (
          <PolarGrid
            gridType={props.grid ?? "polygon"}
            radialLines={props.radialLines ?? true}
            stroke="var(--border)"
          />
        )}
        <PolarAngleAxis
          dataKey="category"
          scale="point"
          tick={{
            fill: "var(--muted-foreground)",
            fontSize: "var(--font-size-caption)",
          }}
        />
        <PolarRadiusAxis tick={props.valueAxis ?? false} axisLine={false} />
        <ChartOverlays
          tooltip={props.tooltip}
          legend={props.legend}
          valueFormatter={props.valueFormatter}
        />
        {props.series.map((item, index) => (
          <Radar
            key={item.dataKey}
            dataKey={`series${index}`}
            name={item.label}
            stroke={`var(--color-series${index})`}
            fill={
              props.filled === false ? "none" : `var(--color-series${index})`
            }
            fillOpacity={0.2}
            strokeWidth={2}
            strokeDasharray={item.strokeDasharray}
            dot={props.dots ?? false}
            isAnimationActive={false}
            {...props.radarProps}
          />
        ))}
        {props.children}
      </RechartsRadarChart>
    </ChartFrame>
  )
}

export function RadialChart<T extends object>(props: RadialChartProps<T>) {
  const direction = useChartDirection(props.dir)
  const data = circularData(props)
  const stacked = props.variant === "stacked"
  const max =
    props.max ??
    (stacked
      ? data.reduce((sum, item) => sum + item.value, 0)
      : Math.max(0, ...data.map((item) => item.value)))
  const rangeError =
    props.max !== undefined &&
    (!Number.isFinite(props.max) ||
      props.max <= 0 ||
      (stacked
        ? data.reduce((sum, item) => sum + item.value, 0)
        : Math.max(0, ...data.map((item) => item.value))) > props.max)
      ? "The radial chart maximum must be positive and cover all displayed values."
      : undefined
  const error =
    props.error ??
    validateChartValues(props.data, [props.valueKey], true) ??
    rangeError
  const stackData: Record<string, string | number>[] = [
    Object.fromEntries(data.map((item) => [item.key, item.value])),
  ]
  return (
    <ChartFrame
      {...props}
      config={circularConfig(props)}
      columns={circularColumns(props)}
      error={error}
      empty={!data.some((item) => item.value > 0)}
      overlay={
        <ChartCenter
          value={props.centerValue}
          label={props.centerLabel}
          legend={props.legend}
        />
      }
    >
      <RechartsRadialBarChart
        innerRadius={props.innerRadius ?? "28%"}
        outerRadius={props.outerRadius ?? "85%"}
        {...props.chartProps}
        {...chartAngles(
          props.startAngle ?? props.chartProps?.startAngle ?? 90,
          props.endAngle ?? props.chartProps?.endAngle ?? -270,
          direction
        )}
        accessibilityLayer
        data={stacked ? stackData : data}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, max]}
          tick={false}
          axisLine={false}
        />
        <ChartOverlays
          tooltip={props.tooltip ?? { hideLabel: true }}
          legend={props.legend}
          valueFormatter={props.valueFormatter}
          nameKey={stacked ? undefined : "key"}
        />
        {stacked ? (
          data.map((item) => (
            <RadialBar
              key={item.key}
              dataKey={item.key}
              name={item.label}
              stackId="stack"
              fill={item.fill}
              cornerRadius={4}
              isAnimationActive={false}
              {...props.radialProps}
            />
          ))
        ) : (
          <RadialBar
            dataKey="value"
            background={{ fill: "var(--muted)" }}
            cornerRadius={4}
            isAnimationActive={false}
            {...props.radialProps}
          >
            {props.labels && (
              <LabelList
                dataKey="label"
                position="insideStart"
                fill="var(--foreground)"
                fontSize="var(--font-size-caption)"
              />
            )}
          </RadialBar>
        )}
        {props.children}
      </RechartsRadialBarChart>
    </ChartFrame>
  )
}
