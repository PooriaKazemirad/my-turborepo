import type { Metadata } from "next"
import { DesignSystem } from "@/components/dashboard/design-system"

export const metadata: Metadata = {
  title: "Design System | Shadcn Dashboard",
  description:
    "The shared foundations, semantic tokens, and components behind Modern Dashboard.",
}

export default function DesignSystemPage() {
  return <DesignSystem />
}
