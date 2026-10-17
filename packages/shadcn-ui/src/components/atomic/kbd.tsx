import { cn } from "shadcn-ui/lib/utils"
import {
  Typography,
  type TypographyNativeProps,
} from "shadcn-ui/components/atomic/typography"

function Kbd({ className, ...props }: TypographyNativeProps<"kbd">) {
  return (
    <Typography
      color="muted-foreground"
      as="kbd"
      variant="inherit"
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-label font-medium select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: TypographyNativeProps<"div">) {
  return (
    <Typography
      color="inherit"
      as="kbd"
      variant="inherit"
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
