import type { ReactNode } from "react"
import { Typography } from "shadcn-ui/components/atomic/typography"

export function Text({ children }: { children: ReactNode }) {
  return (
    <Typography as="span" variant="inherit" color="inherit">
      {children}
    </Typography>
  )
}

export function Note({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <Typography
      id={id}
      variant="caption"
      color="muted-foreground"
      role="status"
    >
      {children}
    </Typography>
  )
}
