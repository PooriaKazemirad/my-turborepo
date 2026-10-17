import type { SalesPoint } from "shadcn-ui/components/molecules/charts/dashboard-charts"

export const salesData: SalesPoint[] = [
  { date: "Oct 1", current: 12, previous: 20 },
  { date: "Oct 2", current: 18, previous: 25 },
  { date: "Oct 3", current: 14, previous: 22 },
  { date: "Oct 4", current: 23, previous: 30 },
  { date: "Oct 5", current: 16, previous: 18 },
  { date: "Oct 6", current: 20, previous: 24 },
  { date: "Oct 7", current: 18, previous: 32 },
  { date: "Oct 8", current: 26, previous: 22 },
  { date: "Oct 9", current: 20, previous: 26 },
  { date: "Oct 10", current: 30, previous: 20 },
  { date: "Oct 11", current: 22, previous: 28 },
  { date: "Oct 12", current: 26, previous: 22 },
  { date: "Oct 13", current: 28, previous: 18 },
  { date: "Oct 14", current: 24, previous: 24 },
  { date: "Oct 15", current: 38, previous: 18 },
  { date: "Oct 16", current: 27, previous: 26 },
]

export const yearlySalesData: SalesPoint[] = [
  { date: "Jan", current: 12, previous: 18 },
  { date: "Feb", current: 18, previous: 22 },
  { date: "Mar", current: 16, previous: 20 },
  { date: "Apr", current: 24, previous: 17 },
  { date: "May", current: 20, previous: 23 },
  { date: "Jun", current: 28, previous: 20 },
  { date: "Jul", current: 24, previous: 25 },
  { date: "Aug", current: 32, previous: 22 },
  { date: "Sep", current: 27, previous: 24 },
  { date: "Oct", current: 38, previous: 28 },
]

export type OrderStatus = "Processing" | "Delayed" | "Delivered" | "Cancelled"
export type Order = {
  id: string
  project: string
  name: string
  role: string
  status: OrderStatus
  price: number
  deadline: string
  tone: "neutral" | "green" | "blue" | "amber"
}

export const orders: Order[] = [
  {
    id: "SD-001",
    project: "Modernize",
    name: "Emily Carter",
    role: "Project Manager",
    status: "Processing",
    price: 2499,
    deadline: "2026-10-24",
    tone: "blue",
  },
  {
    id: "SD-002",
    project: "Spike Admin",
    name: "Jason Miller",
    role: "Web Developer",
    status: "Delayed",
    price: 1348,
    deadline: "2026-10-12",
    tone: "amber",
  },
  {
    id: "SD-003",
    project: "Material Pro",
    name: "Ryan Scott",
    role: "UI/UX Designer",
    status: "Delivered",
    price: 1198,
    deadline: "2026-10-15",
    tone: "green",
  },
  {
    id: "SD-004",
    project: "Xtreme Admin",
    name: "Olivia Williams",
    role: "Frontend Developer",
    status: "Delivered",
    price: 799,
    deadline: "2026-10-14",
    tone: "neutral",
  },
  {
    id: "SD-005",
    project: "Nova Suite",
    name: "Lisa Park",
    role: "Product Designer",
    status: "Cancelled",
    price: 599,
    deadline: "2026-10-10",
    tone: "blue",
  },
  {
    id: "SD-006",
    project: "Pulse CRM",
    name: "David Kim",
    role: "Backend Developer",
    status: "Processing",
    price: 5498,
    deadline: "2026-10-28",
    tone: "green",
  },
  {
    id: "SD-007",
    project: "Vertex UI",
    name: "Anna Martinez",
    role: "UI/UX Designer",
    status: "Delivered",
    price: 1199,
    deadline: "2026-10-13",
    tone: "amber",
  },
  {
    id: "SD-008",
    project: "Orbit Commerce",
    name: "James Wilson",
    role: "Product Manager",
    status: "Processing",
    price: 3240,
    deadline: "2026-10-30",
    tone: "neutral",
  },
]

export const statusTone = {
  Processing: "warning",
  Delayed: "danger",
  Delivered: "success",
  Cancelled: "neutral",
} as const

export const currency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  )
export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`))
