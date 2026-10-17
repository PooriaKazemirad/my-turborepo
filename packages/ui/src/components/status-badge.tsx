import { cn } from "@workspace/ui/lib/utils"
import {
  Typography,
  type TypographyNativeProps,
} from "@workspace/ui/components/typography"

const tones = {
  success: "bg-success-soft",
  warning: "bg-warning-soft",
  danger: "bg-danger-soft",
  info: "bg-info-soft",
  neutral: "bg-secondary",
}

const toneColors = {
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  neutral: "secondary-foreground",
} as const

export function StatusBadge({
  tone = "neutral",
  color = toneColors[tone],
  dot = false,
  className,
  children,
  ...props
}: TypographyNativeProps<"span"> & {
  tone?: keyof typeof tones
  dot?: boolean
}) {
  return (
    <Typography
      color={color}
      as="span"
      variant="inherit"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-caption leading-none font-medium whitespace-nowrap",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {children}
    </Typography>
  )
}
