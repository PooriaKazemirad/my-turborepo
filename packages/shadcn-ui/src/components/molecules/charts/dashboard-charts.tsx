"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts"
import { useDirection } from "shadcn-ui/components/atomic/direction"
import type { ChartDirection } from "shadcn-ui/lib/charts"
import { LineChart as DataLineChart } from "shadcn-ui/components/molecules/charts/line-chart"

export type SalesPoint = { date: string; current: number; previous: number }

export function SalesChart({
  data,
  currentLabel = "This month",
  previousLabel = "Last month",
  dir,
}: {
  data: SalesPoint[]
  currentLabel?: string
  previousLabel?: string
  dir?: ChartDirection
}) {
  return (
    <DataLineChart
      dir={dir}
      label="Sales trend in thousands of dollars"
      description="Use arrow keys to explore daily sales."
      data={data}
      categoryKey="date"
      series={[
        {
          dataKey: "previous",
          label: previousLabel,
          color: "chart-2",
          strokeDasharray: "4 4",
        },
        { dataKey: "current", label: currentLabel, color: "chart-1" },
      ]}
      legend={false}
      valueDomain={[0, 40]}
      valueFormatter={(value) => `$${value}k`}
    />
  )
}

export function Sparkline({
  values,
  variant = "line",
  dir,
}: {
  values: number[]
  variant?: "line" | "bar" | "area"
  dir?: ChartDirection
}) {
  const inherited = useDirection()
  const direction = dir ?? inherited
  const data = values.map((value, index) => ({ value, index }))
  return (
    <div dir={direction} className="h-12 w-28 shrink-0" aria-hidden="true">
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        initialDimension={{ width: 112, height: 48 }}
      >
        {variant === "bar" ? (
          <BarChart data={data}>
            <XAxis hide reversed={direction === "rtl"} />
            <Bar
              dataKey="value"
              fill="var(--chart-1)"
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        ) : variant === "area" ? (
          <AreaChart data={data}>
            <XAxis hide reversed={direction === "rtl"} />
            <Area
              dataKey="value"
              stroke="var(--chart-1)"
              fill="var(--chart-4)"
              strokeWidth={1.8}
              type="monotone"
              isAnimationActive={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <XAxis hide reversed={direction === "rtl"} />
            <Line
              dataKey="value"
              stroke="var(--chart-1)"
              strokeWidth={1.8}
              dot={false}
              type="monotone"
              isAnimationActive={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
