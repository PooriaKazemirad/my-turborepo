import { redirect } from "next/navigation"

export default function DesignSystemPage() {
  redirect(process.env.DESIGN_SYSTEM_URL || "http://localhost:3001")
}
