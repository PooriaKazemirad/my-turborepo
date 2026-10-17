import {
  createElement,
  type ComponentPropsWithRef,
  type CSSProperties,
} from "react"
import type { ColorToken } from "@workspace/ui/lib/design-tokens"
import {
  typographyVariants,
  type TypographyVariants,
} from "@workspace/ui/lib/typography"
import { cn } from "@workspace/ui/lib/utils"

type TypographyElement =
  | "p"
  | "div"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "legend"
  | "dt"
  | "dd"
  | "strong"
  | "em"
  | "small"
  | "code"
  | "pre"
  | "kbd"
  | "blockquote"
  | "figcaption"
  | "caption"
  | "th"
  | "td"
  | "option"

export type TypographyColor = ColorToken | "inherit"

export type TypographyNativeProps<T extends TypographyElement> = Omit<
  ComponentPropsWithRef<T>,
  "color"
> & { color?: TypographyColor }

export type TypographyProps<T extends TypographyElement = "p"> = {
  as?: T
} & TypographyVariants &
  Omit<TypographyNativeProps<T>, "as" | keyof TypographyVariants>

/** Visual scale is independent of the semantic element; color inherits by default. */
export function Typography<T extends TypographyElement = "p">({
  as,
  variant = "body",
  weight,
  tone,
  color,
  className,
  style,
  ...props
}: TypographyProps<T>) {
  return createElement(as ?? "p", {
    "data-slot": "typography",
    "data-variant": variant,
    ...props,
    className: cn(
      typographyVariants({ variant, weight, tone: color ? "inherit" : tone }),
      color === "inherit"
        ? "text-inherit"
        : color && "text-[color:var(--typography-color)]",
      className
    ),
    style:
      color && color !== "inherit"
        ? ({
            "--typography-color": `var(--${color})`,
            ...style,
          } as CSSProperties)
        : style,
  })
}

export { typographyVariants }
