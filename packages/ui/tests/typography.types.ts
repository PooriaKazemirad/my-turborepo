import type {
  TypographyColor,
  TypographyProps,
} from "../src/components/typography"
import type { ColorToken } from "../src/lib/design-tokens"

type Assert<T extends true> = T

export type TypographyColorChecks = [
  Assert<Exclude<ColorToken, TypographyColor> extends never ? true : false>,
  Assert<"inherit" extends TypographyColor ? true : false>,
  Assert<"#123456" extends TypographyProps["color"] ? false : true>,
  Assert<
    "made-up-token" extends TypographyProps<"span">["color"] ? false : true
  >,
]
