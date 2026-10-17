"use client"

import { useId, type ComponentProps } from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartFrame,
  ChartOverlays,
  seriesColumns,
  seriesConfig,
  seriesData,
  useChartDirection,
  type SeriesChartProps,
} from "shadcn-ui/components/molecules/charts/chart-base"
import { validateChartValues } from "shadcn-ui/lib/charts"

export type CartesianChartProps<T extends object> = SeriesChartProps<T> & {
  grid?: boolean
  axes?: boolean
  valueAxis?: boolean
  labels?: boolean
  categoryFormatter?: (value: string) => string
  valueDomain?: ComponentProps<typeof YAxis>["domain"]
}

export type BarChartProps<T extends object> = CartesianChartProps<T> & {
  orientation?: "vertical" | "horizontal"
  stacked?: boolean
  normalized?: boolean
  barProps?: Omit<
    ComponentProps<typeof Bar>,
    "dataKey" | "data" | "children" | "stackId" | "fill"
  >
  chartProps?: Omit<
    ComponentProps<typeof RechartsBarChart>,
    "data" | "children" | "layout" | "stackOffset"
  >
}

export type LineChartProps<T extends object> = CartesianChartProps<T> & {
  curve?: ComponentProps<typeof Line>["type"]
  dots?: boolean
  connectNulls?: boolean
  lineProps?: Omit<
    ComponentProps<typeof Line>,
    "dataKey" | "data" | "children" | "stroke"
  >
  chartProps?: Omit<
    ComponentProps<typeof RechartsLineChart>,
    "data" | "children"
  >
}

export type AreaChartProps<T extends object> = CartesianChartProps<T> & {
  curve?: ComponentProps<typeof Area>["type"]
  stacked?: boolean
  normalized?: boolean
  gradient?: boolean
  dots?: boolean
  connectNulls?: boolean
  areaProps?: Omit<
    ComponentProps<typeof Area>,
    "dataKey" | "data" | "children" | "stroke" | "fill" | "stackId"
  >
  chartProps?: Omit<
    ComponentProps<typeof RechartsAreaChart>,
    "data" | "children" | "stackOffset"
  >
}

function Axes<T extends object>({
  props,
  horizontal = false,
  normalized = false,
}: {
  props: CartesianChartProps<T>
  horizontal?: boolean
  normalized?: boolean
}) {
  const rtl = useChartDirection(props.dir) === "rtl"
  const category = {
    dataKey: "category",
    axisLine: false,
    tickLine: false,
    tickMargin: 10,
    tickFormatter: props.categoryFormatter,
  }
  const value = {
    axisLine: false,
    tickLine: false,
    domain: props.valueDomain,
    tickFormatter: normalized
      ? (n: number) => `${Math.round(n * 100)}%`
      : props.valueFormatter,
  }
  return (
    <>
      {props.grid !== false && (
        <CartesianGrid
          horizontal={!horizontal}
          vertical={horizontal}
          stroke="var(--border)"
          strokeDasharray="3 4"
        />
      )}
      {horizontal ? (
        <>
          <XAxis
            {...value}
            reversed={rtl}
            type="number"
            hide={props.axes === false || props.valueAxis === false}
          />
          <YAxis
            {...category}
            orientation={rtl ? "right" : "left"}
            type="category"
            width={88}
            hide={props.axes === false}
          />
        </>
      ) : (
        <>
          <XAxis
            {...category}
            reversed={rtl}
            type="category"
            minTickGap={24}
            hide={props.axes === false}
          />
          <YAxis
            {...value}
            orientation={rtl ? "right" : "left"}
            type="number"
            width={56}
            hide={props.axes === false || props.valueAxis === false}
          />
        </>
      )}
    </>
  )
}

function chartError<T extends object>(
  props: CartesianChartProps<T>,
  nonNegative = false
) {
  return (
    props.error ??
    validateChartValues(
      props.data,
      props.series.map((item) => item.dataKey),
      nonNegative
    )
  )
}

export function BarChart<T extends object>(props: BarChartProps<T>) {
  const horizontal = props.orientation === "horizontal"
  const rtl = useChartDirection(props.dir) === "rtl"
  const bars = props.series.map((item, index) => ({ item, index }))
  if (rtl && !horizontal && !props.stacked && !props.normalized) bars.reverse()
  return (
    <ChartFrame
      {...props}
      config={seriesConfig(props.series)}
      columns={seriesColumns(props)}
      error={chartError(props, props.normalized)}
      empty={!props.data.length || !props.series.length}
    >
      <RechartsBarChart
        margin={{
          top: props.labels ? 24 : 12,
          right: rtl ? 0 : 24,
          bottom: 4,
          left: rtl ? 24 : 0,
        }}
        {...props.chartProps}
        accessibilityLayer
        data={seriesData(props)}
        layout={horizontal ? "vertical" : "horizontal"}
        stackOffset={props.normalized ? "expand" : "sign"}
      >
        <Axes
          props={props}
          horizontal={horizontal}
          normalized={props.normalized}
        />
        <ChartOverlays
          tooltip={props.tooltip}
          legend={props.legend}
          valueFormatter={props.valueFormatter}
        />
        {bars.map(({ item, index }) => (
          <Bar
            key={item.dataKey}
            dataKey={`series${index}`}
            name={item.label}
            fill={`var(--color-series${index})`}
            stackId={props.stacked || props.normalized ? "stack" : undefined}
            radius={4}
            isAnimationActive={false}
            {...props.barProps}
          >
            {props.labels && (
              <LabelList
                dataKey={`series${index}`}
                position={horizontal ? (rtl ? "left" : "right") : "top"}
                fill="var(--foreground)"
                fontSize="var(--font-size-caption)"
                formatter={(value) =>
                  typeof value === "number" && props.valueFormatter
                    ? props.valueFormatter(value)
                    : String(value ?? "")
                }
              />
            )}
          </Bar>
        ))}
        {props.children}
      </RechartsBarChart>
    </ChartFrame>
  )
}

export function LineChart<T extends object>(props: LineChartProps<T>) {
  const rtl = useChartDirection(props.dir) === "rtl"
  return (
    <ChartFrame
      {...props}
      config={seriesConfig(props.series)}
      columns={seriesColumns(props)}
      error={chartError(props)}
      empty={!props.data.length || !props.series.length}
    >
      <RechartsLineChart
        margin={{
          top: props.labels ? 24 : 12,
          right: rtl ? 0 : 24,
          bottom: 4,
          left: rtl ? 24 : 0,
        }}
        {...props.chartProps}
        accessibilityLayer
        data={seriesData(props)}
      >
        <Axes props={props} />
        <ChartOverlays
          tooltip={props.tooltip}
          legend={props.legend}
          valueFormatter={props.valueFormatter}
        />
        {props.series.map((item, index) => (
          <Line
            key={item.dataKey}
            dataKey={`series${index}`}
            name={item.label}
            type={props.curve ?? "monotone"}
            stroke={`var(--color-series${index})`}
            strokeWidth={2}
            strokeDasharray={item.strokeDasharray}
            dot={props.dots ?? false}
            activeDot={{ r: 4 }}
            connectNulls={props.connectNulls ?? false}
            isAnimationActive={false}
            {...props.lineProps}
          >
            {props.labels && (
              <LabelList
                dataKey={`series${index}`}
                position="top"
                fill="var(--foreground)"
                fontSize="var(--font-size-caption)"
                formatter={(value) =>
                  typeof value === "number" && props.valueFormatter
                    ? props.valueFormatter(value)
                    : String(value ?? "")
                }
              />
            )}
          </Line>
        ))}
        {props.children}
      </RechartsLineChart>
    </ChartFrame>
  )
}

export function AreaChart<T extends object>(props: AreaChartProps<T>) {
  const rtl = useChartDirection(props.dir) === "rtl"
  const gradientId = `area-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  return (
    <ChartFrame
      {...props}
      config={seriesConfig(props.series)}
      columns={seriesColumns(props)}
      error={chartError(props, props.normalized)}
      empty={!props.data.length || !props.series.length}
    >
      <RechartsAreaChart
        margin={{
          top: props.labels ? 24 : 12,
          right: rtl ? 0 : 24,
          bottom: 4,
          left: rtl ? 24 : 0,
        }}
        {...props.chartProps}
        accessibilityLayer
        data={seriesData(props)}
        stackOffset={props.normalized ? "expand" : "none"}
      >
        {props.gradient && (
          <defs>
            {props.series.map((item, index) => (
              <linearGradient
                key={item.dataKey}
                id={`${gradientId}-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-series${index})`}
                  stopOpacity={0.65}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-series${index})`}
                  stopOpacity={0.05}
                />
              </linearGradient>
            ))}
          </defs>
        )}
        <Axes props={props} normalized={props.normalized} />
        <ChartOverlays
          tooltip={props.tooltip}
          legend={props.legend}
          valueFormatter={props.valueFormatter}
        />
        {props.series.map((item, index) => (
          <Area
            key={item.dataKey}
            dataKey={`series${index}`}
            name={item.label}
            type={props.curve ?? "monotone"}
            stroke={`var(--color-series${index})`}
            strokeWidth={2}
            fill={
              props.gradient
                ? `url(#${gradientId}-${index})`
                : `var(--color-series${index})`
            }
            fillOpacity={props.gradient ? 1 : 0.25}
            stackId={props.stacked || props.normalized ? "stack" : undefined}
            strokeDasharray={item.strokeDasharray}
            dot={props.dots ?? false}
            connectNulls={props.connectNulls ?? false}
            isAnimationActive={false}
            {...props.areaProps}
          >
            {props.labels && (
              <LabelList
                dataKey={`series${index}`}
                position="top"
                fill="var(--foreground)"
                fontSize="var(--font-size-caption)"
                formatter={(value) =>
                  typeof value === "number" && props.valueFormatter
                    ? props.valueFormatter(value)
                    : String(value ?? "")
                }
              />
            )}
          </Area>
        ))}
        {props.children}
      </RechartsAreaChart>
    </ChartFrame>
  )
}
