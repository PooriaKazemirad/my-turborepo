"use client"

import { Component, useId, type CSSProperties, type ReactNode } from "react"
import {
  ChartContainer,
  ChartTooltip as Tooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "shadcn-ui/components/atomic/chart"
import { Skeleton } from "shadcn-ui/components/atomic/skeleton"
import { Typography } from "shadcn-ui/components/atomic/typography"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shadcn-ui/components/atomic/table"
import { cn } from "shadcn-ui/lib/utils"
import { useDirection } from "shadcn-ui/components/atomic/direction"
import {
  chartColor,
  chartValueText,
  type ChartKey,
  type ChartSeries,
  type ChartDirection,
} from "shadcn-ui/lib/charts"
import type { ComponentProps } from "react"

export type ChartTooltipOptions = Pick<
  ComponentProps<typeof ChartTooltipContent>,
  "indicator" | "hideLabel" | "hideIndicator" | "formatter" | "labelFormatter"
>

export type ChartCommonProps<T extends object> = {
  /** Defaults to the surrounding DirectionProvider. */
  dir?: ChartDirection
  data: readonly T[]
  /** A human-readable chart title, also used for its accessible data table. */
  label: string
  description?: string
  className?: string
  chartClassName?: string
  height?: number
  loading?: boolean
  error?: string
  emptyMessage?: string
  tooltip?: boolean | ChartTooltipOptions
  legend?: boolean
  /** Display an expandable data table. A screen-reader table is always included. */
  showDataTable?: boolean
  valueFormatter?: (value: number) => string
  children?: ReactNode
}

export function useChartDirection(dir?: ChartDirection): ChartDirection {
  const inherited = useDirection()
  return dir ?? inherited
}

export type SeriesChartProps<T extends object> = ChartCommonProps<T> & {
  categoryKey: ChartKey<T>
  categoryLabel?: string
  series: readonly ChartSeries<T>[]
}

export function seriesConfig<T>(
  series: readonly ChartSeries<T>[]
): ChartConfig {
  return Object.fromEntries(
    series.map((item, index) => [
      `series${index}`,
      { label: item.label, color: chartColor(index, item.color) },
    ])
  )
}

/** Generated keys keep ChartStyle selectors safe even when data keys contain spaces. */
export function seriesData<T extends object>(props: SeriesChartProps<T>) {
  return props.data.map((row) => ({
    category: chartValueText(row[props.categoryKey]),
    ...Object.fromEntries(
      props.series.map((item, index) => [
        `series${index}`,
        row[item.dataKey] ?? null,
      ])
    ),
  }))
}

export function ChartOverlays({
  tooltip = true,
  legend = true,
  valueFormatter,
  nameKey,
}: {
  tooltip?: ChartCommonProps<object>["tooltip"]
  legend?: boolean
  valueFormatter?: (value: number) => string
  nameKey?: string
}) {
  return (
    <>
      {tooltip !== false && (
        <Tooltip
          content={
            <ChartTooltipContent
              nameKey={nameKey}
              {...(valueFormatter
                ? {
                    formatter: (value, name) => (
                      <>
                        <Typography
                          as="span"
                          variant="caption"
                          color="muted-foreground"
                        >
                          {String(name)}
                        </Typography>
                        <Typography
                          dir="ltr"
                          as="span"
                          variant="caption"
                          color="foreground"
                          className="ms-auto font-mono"
                        >
                          {valueFormatter(Number(value))}
                        </Typography>
                      </>
                    ),
                  }
                : {})}
              {...(typeof tooltip === "object" ? tooltip : {})}
            />
          }
        />
      )}
      {legend && (
        <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
      )}
    </>
  )
}

class ChartBoundary extends Component<
  { children: ReactNode; resetKey: unknown },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidUpdate(
    previous: Readonly<{ children: ReactNode; resetKey: unknown }>
  ) {
    if (this.state.failed && previous.resetKey !== this.props.resetKey)
      this.setState({ failed: false })
  }
  render() {
    return this.state.failed ? (
      <Typography role="alert" color="danger" variant="body">
        Unable to display this chart. The data table is still available.
      </Typography>
    ) : (
      this.props.children
    )
  }
}

export function ChartFrame<T extends object>({
  dir,
  data,
  label,
  description,
  className,
  chartClassName,
  height,
  loading,
  error,
  emptyMessage = "No chart data available.",
  showDataTable = false,
  columns,
  config,
  children,
  overlay,
  valueFormatter,
  empty = data.length === 0,
}: ChartCommonProps<T> & {
  columns: readonly { key: ChartKey<T>; label: string }[]
  config: ChartConfig
  children: ComponentProps<typeof ChartContainer>["children"]
  empty?: boolean
  overlay?: ReactNode
}) {
  const id = useId()
  const direction = useChartDirection(dir)
  const table = (
    <Table
      containerClassName={
        showDataTable ? "mt-3 max-h-72 overflow-auto" : "sr-only"
      }
    >
      <TableCaption>{label}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead scope="col" key={index}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column, columnIndex) => (
              <TableCell key={columnIndex}>
                {typeof row[column.key] === "number" && valueFormatter
                  ? valueFormatter(Number(row[column.key]))
                  : chartValueText(row[column.key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
  const style: CSSProperties | undefined =
    height === undefined ? undefined : { height }
  return (
    <figure
      dir={direction}
      data-slot="data-chart"
      className={cn("min-w-0", className)}
      aria-labelledby={`${id}-caption`}
      aria-busy={loading || undefined}
    >
      <figcaption id={`${id}-caption`} className="sr-only">
        {label}
        {description ? `. ${description}` : ""}
      </figcaption>
      {loading ? (
        <div role="status" className="h-(--chart-height)" style={style}>
          <Typography
            as="span"
            variant="caption"
            color="muted-foreground"
            className="sr-only"
          >
            Loading {label}
          </Typography>
          <Skeleton className="h-full w-full motion-reduce:animate-none" />
        </div>
      ) : error || empty ? (
        <div
          className="flex h-(--chart-height) items-center justify-center p-5 text-center"
          style={style}
        >
          <Typography
            role={error ? "alert" : "status"}
            variant="body"
            color={error ? "danger" : "muted-foreground"}
          >
            {error || emptyMessage}
          </Typography>
        </div>
      ) : (
        <ChartBoundary resetKey={data}>
          <div className="relative">
            <ChartContainer
              config={config}
              dir={direction}
              className={cn(
                "aspect-auto h-(--chart-height) w-full min-w-0",
                chartClassName
              )}
              style={style}
            >
              {children}
            </ChartContainer>
            {overlay}
          </div>
        </ChartBoundary>
      )}
      {!loading &&
        (showDataTable ? (
          <details className="mt-3">
            <summary className="cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-ring">
              <Typography as="span" color="muted-foreground" variant="caption">
                View chart data
              </Typography>
            </summary>
            {table}
          </details>
        ) : (
          table
        ))}
    </figure>
  )
}

export function seriesColumns<T extends object>(props: SeriesChartProps<T>) {
  return [
    { key: props.categoryKey, label: props.categoryLabel ?? "Category" },
    ...props.series.map((item) => ({ key: item.dataKey, label: item.label })),
  ]
}
