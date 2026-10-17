"use client"

import type { ComponentProps } from "react"
import { Pie, PieChart, useChartWidth, useChartHeight } from "recharts"
import { Typography } from "shadcn-ui/components/atomic/typography"
import {
  ChartFrame,
  ChartOverlays,
  useChartDirection,
  type ChartCommonProps,
} from "shadcn-ui/components/molecules/charts/chart-base"
import {
  chartAngles,
  gaugeState,
  type GaugeThreshold,
  type ChartDirection,
} from "shadcn-ui/lib/charts"
import type { ColorToken } from "shadcn-ui/lib/design-tokens"

type GaugeDatum = {
  metric: string
  value: number | null
  min: number
  max: number
}

export type GaugeChartProps = Omit<
  ChartCommonProps<GaugeDatum>,
  "data" | "legend" | "children"
> & {
  value: number | null
  min?: number
  max?: number
  variant?: "semicircle" | "circle"
  color?: ColorToken
  trackColor?: ColorToken
  thresholds?: readonly GaugeThreshold[]
  showNeedle?: boolean
  showRangeLabels?: boolean
  unit?: string
  pieProps?: Omit<
    ComponentProps<typeof Pie>,
    | "data"
    | "dataKey"
    | "nameKey"
    | "children"
    | "cx"
    | "cy"
    | "innerRadius"
    | "outerRadius"
    | "startAngle"
    | "endAngle"
    | "isAnimationActive"
  >
}

function GaugePlot({
  fraction,
  variant,
  showNeedle,
  trackColor,
  pieProps,
  dir,
}: {
  dir: ChartDirection
  fraction: number
  variant: "semicircle" | "circle"
  showNeedle: boolean
  trackColor: ColorToken
  pieProps?: GaugeChartProps["pieProps"]
}) {
  const width = useChartWidth()
  const height = useChartHeight()
  if (!width || !height) return null
  const circle = variant === "circle"
  const cx = width / 2
  const cy = height * (circle ? 0.5 : 0.7)
  const radius = Math.min(width * 0.44, height * (circle ? 0.4 : 0.55))
  const { startAngle, endAngle } = chartAngles(
    circle ? 90 : 180,
    circle ? -270 : 0,
    dir
  )
  const angle =
    ((startAngle + fraction * (endAngle - startAngle)) * Math.PI) / 180
  return (
    <>
      <Pie
        {...pieProps}
        data={[
          { key: "progress", amount: fraction, fill: "var(--color-progress)" },
          {
            key: "remaining",
            amount: 1 - fraction,
            fill: `var(--${trackColor})`,
          },
        ]}
        dataKey="amount"
        nameKey="key"
        cx={cx}
        cy={cy}
        innerRadius={radius * 0.78}
        outerRadius={radius}
        startAngle={startAngle}
        endAngle={endAngle}
        stroke="none"
        isAnimationActive={false}
      />
      {showNeedle && (
        <g
          data-slot="gauge-needle"
          aria-hidden="true"
          fill="var(--foreground)"
          stroke="var(--foreground)"
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx + radius * 0.67 * Math.cos(angle)}
            y2={cy - radius * 0.67 * Math.sin(angle)}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r={5} />
        </g>
      )}
    </>
  )
}

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  variant = "semicircle",
  color = "chart-1",
  trackColor = "muted",
  thresholds,
  showNeedle = false,
  showRangeLabels = true,
  unit = "",
  valueFormatter,
  tooltip = false,
  pieProps,
  ...props
}: GaugeChartProps) {
  const direction = useChartDirection(props.dir)
  const state = gaugeState({ value, min, max, color, thresholds })
  const format = valueFormatter ?? ((n: number) => `${n}${unit}`)
  const displayValue = value === null ? "—" : format(value)
  const data: GaugeDatum[] = [{ metric: props.label, value, min, max }]
  return (
    <ChartFrame
      {...props}
      data={data}
      error={props.error || state.error}
      empty={value === null}
      valueFormatter={format}
      columns={[
        { key: "metric", label: "Metric" },
        { key: "value", label: "Value" },
        { key: "min", label: "Minimum" },
        { key: "max", label: "Maximum" },
      ]}
      config={{
        progress: { label: props.label, color: `var(--${state.color})` },
        remaining: { label: "Remaining", color: `var(--${trackColor})` },
      }}
      overlay={
        <>
          <div
            className="pointer-events-none absolute inset-x-0 flex -translate-y-1/2 flex-col items-center gap-1 text-center"
            style={{
              top:
                variant === "circle"
                  ? showNeedle
                    ? "68%"
                    : "50%"
                  : showNeedle
                    ? "84%"
                    : "70%",
            }}
          >
            <Typography
              dir="ltr"
              as="span"
              variant={showNeedle ? "title" : "heading"}
              color="foreground"
              weight="semibold"
              role="meter"
              aria-label={props.label}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value ?? undefined}
              aria-valuetext={displayValue}
            >
              {displayValue}
            </Typography>
            {state.thresholdLabel && (
              <Typography as="span" variant="caption" color="muted-foreground">
                {state.thresholdLabel}
              </Typography>
            )}
          </div>
          {showRangeLabels && (
            <div
              dir={direction}
              className="pointer-events-none absolute inset-x-[6%] flex justify-between"
              style={{ top: variant === "circle" ? "92%" : "76%" }}
            >
              <Typography
                dir="ltr"
                as="span"
                variant="caption"
                color="muted-foreground"
              >
                {format(min)}
              </Typography>
              <Typography
                dir="ltr"
                as="span"
                variant="caption"
                color="muted-foreground"
              >
                {format(max)}
              </Typography>
            </div>
          )}
        </>
      }
    >
      <PieChart
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        accessibilityLayer
      >
        <GaugePlot
          dir={direction}
          fraction={state.fraction}
          variant={variant}
          showNeedle={showNeedle}
          trackColor={trackColor}
          pieProps={pieProps}
        />
        <ChartOverlays
          legend={false}
          nameKey="key"
          tooltip={
            tooltip === false
              ? false
              : {
                  hideLabel: true,
                  formatter: (fraction, name) => (
                    <>
                      <Typography
                        as="span"
                        variant="caption"
                        color="muted-foreground"
                      >
                        {name === "progress" ? props.label : "Remaining"}
                      </Typography>
                      <Typography
                        dir="ltr"
                        as="span"
                        variant="caption"
                        color="foreground"
                        className="ms-auto font-mono"
                      >
                        {format(
                          Number(fraction) * (max - min) +
                            (name === "progress" ? min : 0)
                        )}
                      </Typography>
                    </>
                  ),
                  ...(typeof tooltip === "object" ? tooltip : {}),
                }
          }
        />
      </PieChart>
    </ChartFrame>
  )
}

export type { GaugeThreshold }
