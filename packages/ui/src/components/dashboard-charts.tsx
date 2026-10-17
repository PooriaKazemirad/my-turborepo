"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

export type SalesPoint = { date: string; current: number; previous: number }

export function SalesChart({
  data,
  currentLabel = "This month",
  previousLabel = "Last month",
}: {
  data: SalesPoint[]
  currentLabel?: string
  previousLabel?: string
}) {
  return (
    <div
      dir="ltr"
      className="h-(--chart-height) min-w-0 text-caption"
      aria-label="Sales trend. Use arrow keys on the chart to explore daily sales."
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        initialDimension={{ width: 650, height: 256 }}
      >
        <LineChart
          data={data}
          margin={{ top: 15, right: 8, bottom: 0, left: -23 }}
          accessibilityLayer
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="3 4"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={12}
            minTickGap={28}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: "var(--font-size-caption)",
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: "var(--font-size-caption)",
            }}
            tickFormatter={(value: number) => `$${value}k`}
            domain={[0, 40]}
            ticks={[0, 10, 20, 30, 40]}
          />
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-control)",
              color: "var(--foreground)",
              boxShadow: "var(--elevation-popover)",
              fontSize: "var(--font-size-label)",
            }}
            formatter={(value) => [`$${Number(value).toLocaleString()}k`]}
          />
          <Line
            dataKey="previous"
            name={previousLabel}
            type="monotone"
            stroke="var(--chart-2)"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{ r: 4, stroke: "var(--card)", strokeWidth: 2 }}
            isAnimationActive={false}
          />
          <Line
            dataKey="current"
            name={currentLabel}
            type="monotone"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, stroke: "var(--card)", strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <Table containerClassName="sr-only absolute w-px overflow-hidden">
        <TableCaption>Sales in thousands of dollars</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Date</TableHead>
            <TableHead scope="col">{currentLabel}</TableHead>
            <TableHead scope="col">{previousLabel}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((point) => (
            <TableRow key={point.date}>
              <TableHead scope="row">{point.date}</TableHead>
              <TableCell>{point.current}</TableCell>
              <TableCell>{point.previous}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function Sparkline({
  values,
  variant = "line",
}: {
  values: number[]
  variant?: "line" | "bar" | "area"
}) {
  const data = values.map((value, index) => ({ value, index }))
  return (
    <div dir="ltr" className="h-12 w-28 shrink-0" aria-hidden="true">
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        initialDimension={{ width: 112, height: 48 }}
      >
        {variant === "bar" ? (
          <BarChart data={data}>
            <Bar
              dataKey="value"
              fill="var(--chart-1)"
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        ) : variant === "area" ? (
          <AreaChart data={data}>
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
