import { cn } from "shadcn-ui/lib/utils"
import {
  Typography,
  type TypographyNativeProps,
} from "shadcn-ui/components/atomic/typography"

const tones = {
  neutral: { background: "bg-secondary", color: "secondary-foreground" },
  green: { background: "bg-success-soft", color: "success" },
  blue: { background: "bg-info-soft", color: "info" },
  amber: { background: "bg-warning-soft", color: "warning" },
} as const

export function PersonAvatar({
  name,
  tone = "neutral",
  color = tones[tone].color,
  className,
  ...props
}: TypographyNativeProps<"span"> & {
  name: string
  tone?: "neutral" | "green" | "blue" | "amber"
}) {
  return (
    <Typography
      color={color}
      as="span"
      variant="inherit"
      aria-label={name}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-caption font-semibold",
        tones[tone].background,
        className
      )}
      {...props}
    >
      {name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")}
    </Typography>
  )
}
