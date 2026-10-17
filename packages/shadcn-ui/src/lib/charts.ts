import type { ColorToken } from "./design-tokens"

export type ChartKey<T> = Extract<keyof T, string>
export type ChartDirection = "ltr" | "rtl"

/** Reflect polar geometry without reversing the source data or mirroring text. */
export function chartAngles(
  startAngle: number,
  endAngle: number,
  dir: ChartDirection
) {
  return dir === "rtl"
    ? { startAngle: 180 - startAngle, endAngle: 180 - endAngle }
    : { startAngle, endAngle }
}

/** Point scales keep radar labels and vertices aligned in either sweep direction. */
export function radarAngles(
  startAngle: number,
  endAngle: number,
  count: number,
  dir: ChartDirection
) {
  const sweep = endAngle - startAngle
  const end =
    count <= 1
      ? startAngle
      : Math.abs(sweep) >= 360
        ? startAngle + (sweep * (count - 1)) / count
        : endAngle
  return chartAngles(startAngle, end, dir)
}

export type NumericChartKey<T> = {
  [K in ChartKey<T>]-?: NonNullable<T[K]> extends number ? K : never
}[ChartKey<T>]

export type ChartSeries<T> = {
  dataKey: NumericChartKey<T>
  label: string
  color?: ColorToken
  strokeDasharray?: string
}

/** Stable token colors; never derive presentation keys from user-provided data. */
export function chartColor(index: number, color?: ColorToken) {
  return `var(--${color ?? `chart-${(index % 5) + 1}`})`
}

export function validateChartValues<T extends object>(
  data: readonly T[],
  keys: readonly ChartKey<T>[],
  nonNegative = false
): string | undefined {
  for (const row of data) {
    for (const key of keys) {
      const value = row[key]
      if (value == null) continue
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return "Chart values must be finite numbers."
      }
      if (nonNegative && value < 0) {
        return "This chart requires values greater than or equal to zero."
      }
    }
  }
}

export function chartNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

export function chartValueText(value: unknown): string {
  return value == null ? "—" : String(value)
}

export type GaugeThreshold = {
  /** Inclusive upper bound, in the same units as the gauge value. */
  upTo: number
  color: ColorToken
  label?: string
}

export function gaugeState({
  value,
  min = 0,
  max = 100,
  color = "chart-1",
  thresholds = [],
}: {
  value: number | null
  min?: number
  max?: number
  color?: ColorToken
  thresholds?: readonly GaugeThreshold[]
}): {
  fraction: number
  color: ColorToken
  thresholdLabel?: string
  error?: string
} {
  const invalid = (error: string) => ({ fraction: 0, color, error })
  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    max <= min ||
    !Number.isFinite(max - min)
  ) {
    return invalid(
      "The gauge range must be finite, with a maximum greater than its minimum."
    )
  }
  let previous = min
  for (const threshold of thresholds) {
    if (
      !Number.isFinite(threshold.upTo) ||
      threshold.upTo <= previous ||
      threshold.upTo > max
    ) {
      return invalid("Gauge thresholds must increase within the gauge range.")
    }
    previous = threshold.upTo
  }
  if (value === null) return { fraction: 0, color }
  if (!Number.isFinite(value) || value < min || value > max) {
    return invalid("The gauge value must be a finite number within its range.")
  }
  const threshold = thresholds.find((item) => value <= item.upTo)
  return {
    fraction: (value - min) / (max - min),
    color: threshold?.color ?? color,
    thresholdLabel: threshold?.label,
  }
}
