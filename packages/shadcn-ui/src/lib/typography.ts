import { cva, type VariantProps } from "class-variance-authority"

/** Shared by Typography and controls that own their text rendering. */
export const typographyVariants = cva("", {
  variants: {
    variant: {
      inherit: "",
      caption: "text-caption leading-(--leading-body)",
      label: "text-label leading-(--leading-body)",
      body: "text-body leading-(--leading-body)",
      subtitle: "text-subtitle leading-(--leading-heading)",
      title: "text-title leading-(--leading-heading)",
      heading: "text-heading leading-(--leading-heading)",
      metric: "text-metric leading-(--leading-heading) tabular-nums",
    },
    weight: {
      inherit: "",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      inherit: "",
      default: "text-foreground",
      muted: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      info: "text-info",
    },
  },
  defaultVariants: { variant: "body", weight: "inherit", tone: "inherit" },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
