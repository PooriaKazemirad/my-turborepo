import type { ComponentProps, ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"
import {
  Typography,
  type TypographyProps,
} from "@workspace/ui/components/typography"

export type PanelProps = ComponentProps<"section">

export type PanelHeaderProps = Omit<
  ComponentProps<"div">,
  "title" | "children"
> & {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  action?: ReactNode
  headingAs?: "h2" | "h3" | "h4" | "h5" | "h6"
  separator?: boolean
  titleProps?: Omit<TypographyProps<"h2">, "as" | "children">
  descriptionProps?: Omit<TypographyProps<"p">, "as" | "children">
}

export type PanelContentProps = ComponentProps<"div"> & {
  padding?: "default" | "none"
}

export type PanelFooterProps = ComponentProps<"div"> & {
  variant?: "default" | "muted"
}

export function Panel({ className, ...props }: PanelProps) {
  return (
    <section
      data-slot="panel"
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-panel",
        className
      )}
      {...props}
    />
  )
}

export function PanelHeader({
  title,
  icon,
  action,
  description,
  headingAs = "h2",
  separator = true,
  titleProps,
  descriptionProps,
  className,
  ...props
}: PanelHeaderProps) {
  const { className: titleClassName, ...titleAttributes } = titleProps ?? {}
  const { className: descriptionClassName, ...descriptionAttributes } =
    descriptionProps ?? {}
  return (
    <div
      data-slot="panel-header"
      className={cn(
        "flex min-h-14 flex-wrap items-center justify-between gap-3 px-5 py-3.5",
        separator && "border-b",
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1 basis-40">
        <Typography
          color="card-foreground"
          as={headingAs}
          variant="subtitle"
          weight="semibold"
          data-slot="panel-title"
          {...titleAttributes}
          className={cn("flex min-w-0 items-center gap-2", titleClassName)}
        >
          {icon != null && icon !== false && (
            <span
              data-slot="panel-icon"
              aria-hidden="true"
              className="shrink-0 text-muted-foreground [&>svg]:size-4"
            >
              {icon}
            </span>
          )}
          <span className="min-w-0 wrap-break-word">{title}</span>
        </Typography>
        {description != null && description !== false && (
          <Typography
            color="muted-foreground"
            as="p"
            variant="label"
            data-slot="panel-description"
            {...descriptionAttributes}
            className={cn("mt-1 wrap-break-word", descriptionClassName)}
          >
            {description}
          </Typography>
        )}
      </div>
      {action != null && action !== false && (
        <div
          data-slot="panel-action"
          className="flex max-w-full min-w-0 flex-wrap items-center gap-2"
        >
          {action}
        </div>
      )}
    </div>
  )
}

export function PanelContent({
  padding = "default",
  className,
  ...props
}: PanelContentProps) {
  return (
    <div
      data-slot="panel-content"
      className={cn("min-w-0", padding === "default" && "p-5", className)}
      {...props}
    />
  )
}

export function PanelFooter({
  variant = "default",
  className,
  ...props
}: PanelFooterProps) {
  return (
    <div
      data-slot="panel-footer"
      className={cn(
        "mt-auto flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3 text-caption text-muted-foreground",
        variant === "muted" && "bg-muted/40",
        className
      )}
      {...props}
    />
  )
}
