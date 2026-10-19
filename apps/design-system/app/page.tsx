import { DesignSystem } from "@/components/design-system/design-system"

export default function DesignSystemPage() {
  return (
    <DesignSystem
      dashboardUrl={process.env.DASHBOARD_URL || "http://localhost:3000"}
    />
  )
}
