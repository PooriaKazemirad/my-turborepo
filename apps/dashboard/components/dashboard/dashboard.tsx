"use client"

import { useState } from "react"
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Box,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  Download,
  FileText,
  Megaphone,
  Package,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"
import { PersonAvatar as Avatar } from "shadcn-ui/components/molecules/person-avatar"
import { Button } from "shadcn-ui/components/atomic/button"
import {
  SalesChart,
  Sparkline,
} from "shadcn-ui/components/molecules/charts/dashboard-charts"
import { DetailDialog as Dialog } from "shadcn-ui/components/molecules/detail-dialog"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
} from "shadcn-ui/components/molecules/panel"
import { StatusBadge } from "shadcn-ui/components/molecules/status-badge"
import { AppShell } from "./app-shell"
import { currency, orders, salesData, yearlySalesData } from "./data"
import { Greeting } from "./greeting"
import { OrdersTable } from "./orders-table"
import { Typography } from "shadcn-ui/components/atomic/typography"

const metricDefinitions = [
  {
    title: "Total Profit",
    icon: Wallet,
    value: 135000,
    change: "+12.8%",
    comparison: "vs. last month",
    values: [10, 16, 13, 21, 17, 25, 22, 30, 27, 35, 33, 42],
    variant: "line" as const,
    detail:
      "Profit is net revenue after operating costs for the selected reporting period.",
  },
  {
    title: "Advertisement Cost",
    icon: Megaphone,
    value: 17200,
    change: "−8.2%",
    comparison: "vs. last month",
    values: [16, 24, 19, 31, 22, 27, 18, 25, 16, 21, 14, 19],
    variant: "bar" as const,
    detail:
      "Advertising costs include paid search, social, and display campaigns for the selected reporting period.",
  },
  {
    title: "Total Orders",
    icon: ShoppingCart,
    value: 714,
    change: "+16.4%",
    comparison: "vs. last month",
    values: [15, 18, 14, 22, 18, 26, 21, 32, 26, 34, 31, 40],
    variant: "area" as const,
    detail:
      "Order volume includes all placed orders, regardless of their current fulfillment status.",
  },
]

const assets = [
  {
    title: "Employees",
    value: "96",
    icon: Users,
    trend: "+8",
    description: "96 people across design, engineering, operations, and sales.",
    tone: "neutral" as const,
  },
  {
    title: "Projects",
    value: "356",
    icon: FileText,
    trend: "+24",
    description: "356 projects in the workspace, with 24 added this month.",
    tone: "blue" as const,
  },
  {
    title: "Clients",
    value: "3,650",
    icon: BriefcaseBusiness,
    trend: "+128",
    description:
      "3,650 client relationships. Your client base grew by 128 this month.",
    tone: "green" as const,
  },
  {
    title: "Events",
    value: "86",
    icon: Bookmark,
    trend: "+12",
    description:
      "86 scheduled workspace events, including launches and client meetings.",
    tone: "amber" as const,
  },
]

const products = [
  {
    title: "Modernize UI Kit",
    category: "Design resources",
    sales: 124,
    price: 49,
    icon: LayersIcon,
    tone: "neutral" as const,
  },
  {
    title: "Dashboard Pro",
    category: "Admin template",
    sales: 86,
    price: 79,
    icon: BriefcaseBusiness,
    tone: "blue" as const,
  },
  {
    title: "Commerce Starter",
    category: "eCommerce template",
    sales: 64,
    price: 59,
    icon: ShoppingBag,
    tone: "green" as const,
  },
  {
    title: "Essential Icons",
    category: "Icon library",
    sales: 52,
    price: 29,
    icon: Box,
    tone: "amber" as const,
  },
]

function LayersIcon({ className }: { className?: string }) {
  return <Package className={className} />
}

export function Dashboard() {
  const [period, setPeriod] = useState("Monthly")
  const [chartScope, setChartScope] = useState("all")
  const [lastUpdated, setLastUpdated] = useState("just now")
  const [notice, setNotice] = useState("")
  const [details, setDetails] = useState<{
    title: string
    description: string
    value?: string
  } | null>(null)
  const yearly = period === "Yearly"
  const allData = yearly ? yearlySalesData : salesData
  const chartData =
    chartScope === "recent" ? allData.slice(yearly ? -6 : -7) : allData
  const totalSales = chartData.reduce(
    (total, point) => total + point.current * 1000,
    0
  )
  const previousSales = chartData.reduce(
    (total, point) => total + point.previous * 1000,
    0
  )
  const salesChange = (
    ((totalSales - previousSales) / previousSales) *
    100
  ).toFixed(1)
  const positiveSales = totalSales >= previousSales

  function exportReport() {
    const csv = [
      ["Report", "Modern Dashboard", "Period", period],
      ["Sample data", "October 2026"],
      [],
      ["Date", "Current sales (USD)", "Previous sales (USD)"],
      ...chartData.map((point) => [
        point.date,
        point.current * 1000,
        point.previous * 1000,
      ]),
      [],
      [
        "Order ID",
        "Project",
        "Assigned to",
        "Status",
        "Amount (USD)",
        "Deadline",
      ],
      ...orders.map((order) => [
        order.id,
        order.project,
        order.name,
        order.status,
        order.price,
        order.deadline,
      ]),
    ]
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")
      )
      .join("\r\n")
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    )
    const link = document.createElement("a")
    link.href = url
    link.download = `modern-dashboard-${period.toLowerCase()}-2026-10.csv`
    link.click()
    URL.revokeObjectURL(url)
    setNotice("Your report has been exported as a CSV file.")
  }

  return (
    <AppShell>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-5">
        <div>
          <Greeting />
          <Typography
            color="muted-foreground"
            as="p"
            variant="body"
            className="mt-2"
          >
            Stay informed with today’s analytics. Here’s your business at a
            glance.
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Refresh dashboard"
            className="bg-card"
            onClick={() => {
              setLastUpdated(
                new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                }).format(new Date())
              )
              setNotice(
                "Dashboard refreshed. You’re viewing the latest sample data."
              )
            }}
          >
            <RefreshCw className="size-3.5" />
          </Button>
          <Typography
            color="foreground"
            as="label"
            variant="inherit"
            className="relative flex items-center"
          >
            <CalendarDays className="pointer-events-none absolute start-3 size-3.5" />
            <select
              aria-label="Reporting period"
              className="control-select with-icon h-9"
              value={period}
              onChange={(event) => {
                setPeriod(event.target.value)
                setChartScope("all")
              }}
            >
              <Typography color="inherit" as="option" variant="inherit">
                Monthly
              </Typography>
              <Typography color="inherit" as="option" variant="inherit">
                Yearly
              </Typography>
            </select>
          </Typography>
          <Button
            size="lg"
            className="gap-2 px-4 text-label"
            onClick={exportReport}
          >
            <Download className="size-3.5" />
            <Typography color="inherit" as="span" variant="inherit">
              Export report
            </Typography>
          </Button>
        </div>
      </div>
      <div className="mb-5 flex items-center justify-between gap-3 border-b pb-3">
        <div className="flex items-center gap-2">
          <Typography
            color="foreground"
            as="span"
            variant="subtitle"
            className="font-medium"
          >
            Overview
          </Typography>
          <StatusBadge tone="neutral">Demo workspace</StatusBadge>
        </div>
        <Typography
          color="muted-foreground"
          as="span"
          variant="caption"
          className="flex items-center gap-1.5"
        >
          <span className="size-1.5 rounded-full bg-success" />
          Updated {lastUpdated}
        </Typography>
      </div>

      <div className="metric-grid mb-5">
        {metricDefinitions.map(
          (
            {
              title,
              icon: Icon,
              value,
              change,
              comparison,
              values,
              variant,
              detail,
            },
            index
          ) => (
            <Panel key={title} aria-labelledby={`metric-${index}-title`}>
              <PanelHeader
                title={title}
                titleProps={{
                  id: `metric-${index}-title`,
                  variant: "body",
                  color: "muted-foreground",
                  weight: "normal",
                }}
                separator={false}
                className="py-5"
                action={
                  <span
                    aria-hidden="true"
                    className="flex size-8 items-center justify-center rounded-md border text-muted-foreground"
                  >
                    <Icon className="size-4" strokeWidth={1.7} />
                  </span>
                }
              />
              <PanelContent className="flex items-end justify-between gap-2 py-0">
                <div className="min-w-0">
                  <Typography
                    color="foreground"
                    as="p"
                    variant="metric"
                    weight="semibold"
                    className="text-heading tracking-[-0.04em] md:text-metric"
                  >
                    {index === 2
                      ? (yearly ? 6842 : value).toLocaleString("en-US")
                      : currency(yearly ? value * 9.2 : value).replace(
                          ".00",
                          ""
                        )}
                  </Typography>
                  <div className="mt-2.5 flex items-center gap-1.5 whitespace-nowrap">
                    <StatusBadge tone="success" className="gap-0.5 px-1.5 py-1">
                      {index === 1 ? (
                        <ArrowDownRight className="size-3" />
                      ) : (
                        <ArrowUpRight className="size-3" />
                      )}
                      <bdi dir="ltr">{change}</bdi>
                    </StatusBadge>
                    <Typography
                      color="muted-foreground"
                      as="span"
                      variant="caption"
                    >
                      {yearly ? "vs. last year" : comparison}
                    </Typography>
                  </div>
                </div>
                <div className="metric-sparkline">
                  <Sparkline values={values} variant={variant} />
                </div>
              </PanelContent>
              <PanelFooter className="mx-5 mt-5 px-0 pt-3 pb-5">
                <button
                  className="group flex w-full items-center justify-between text-label text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    setDetails({
                      title: `${title} report`,
                      description: detail,
                      value:
                        index === 2
                          ? (yearly ? 6842 : value).toLocaleString("en-US")
                          : currency(yearly ? value * 9.2 : value),
                    })
                  }
                >
                  <Typography color="inherit" as="span" variant="inherit">
                    View report
                  </Typography>{" "}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </PanelFooter>
            </Panel>
          )
        )}
      </div>

      <div className="overview-grid mb-5">
        <Panel id="sales" aria-labelledby="sales-title">
          <PanelHeader
            title="Sales Overview"
            titleProps={{ id: "sales-title" }}
            icon={<TrendingUp />}
            action={
              <Typography color="muted-foreground" as="span" variant="caption">
                {yearly ? "2026 year to date" : "October 2026"}
              </Typography>
            }
          />
          <PanelContent>
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <Typography color="muted-foreground" as="p" variant="label">
                  Total Sales
                </Typography>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Typography
                    color="foreground"
                    as="p"
                    variant="metric"
                    weight="semibold"
                    className="text-heading tracking-[-0.04em] md:text-metric"
                  >
                    {currency(totalSales)}
                  </Typography>
                  <StatusBadge tone={positiveSales ? "success" : "danger"}>
                    <bdi dir="ltr">
                      {positiveSales ? "+" : ""}
                      {salesChange}%
                    </bdi>
                  </StatusBadge>
                </div>
                <Typography
                  color="muted-foreground"
                  as="p"
                  variant="caption"
                  className="mt-1.5"
                >
                  Compared to{" "}
                  {yearly
                    ? "the same months last year"
                    : "the same days last month"}
                </Typography>
              </div>
              <select
                aria-label="Sales chart range"
                value={chartScope}
                onChange={(event) => setChartScope(event.target.value)}
                className="control-select"
              >
                <Typography
                  color="inherit"
                  as="option"
                  variant="inherit"
                  value="all"
                >
                  {yearly ? "Year to date" : "Month to date"}
                </Typography>
                <Typography
                  color="inherit"
                  as="option"
                  variant="inherit"
                  value="recent"
                >
                  {yearly ? "Last 6 months" : "Last 7 days"}
                </Typography>
              </select>
            </div>
            <SalesChart
              data={chartData}
              currentLabel={yearly ? "2026" : "October"}
              previousLabel={yearly ? "2025" : "September"}
            />
            <div className="mt-5 flex items-center justify-center gap-5 text-caption text-muted-foreground">
              <Typography
                color="muted-foreground"
                as="span"
                variant="inherit"
                className="flex items-center gap-2"
              >
                  <span className="h-0.5 w-4 rounded-full bg-primary" />
                {yearly ? "2026" : "This month"}
              </Typography>
              <Typography
                color="muted-foreground"
                as="span"
                variant="inherit"
                className="flex items-center gap-2"
              >
                <span className="w-4 border-t-2 border-dashed border-chart-2" />
                {yearly ? "2025" : "Last month"}
              </Typography>
            </div>
          </PanelContent>
        </Panel>
        <Panel id="customers" aria-labelledby="assets-title">
          <PanelHeader
            title="Total Assets"
            titleProps={{ id: "assets-title" }}
            icon={<Box />}
            action={
              <Typography color="muted-foreground" as="span" variant="caption">
                Your workspace
              </Typography>
            }
          />
          <PanelContent
            padding="none"
            className="asset-grid grid flex-1 grid-cols-2 gap-px bg-border"
          >
            {assets.map(
              ({ title, value, icon: Icon, trend, description, tone }) => (
                <button
                  key={title}
                  onClick={() => setDetails({ title, description, value })}
                  className="group flex flex-col justify-between gap-7 bg-card p-5 text-start transition-colors hover:bg-muted"
                >
                  <span className="flex items-center justify-between">
                    <span
                      className={`flex size-9 items-center justify-center rounded-lg border ${tone === "blue" ? "text-info" : tone === "green" ? "text-success" : tone === "amber" ? "text-warning" : "text-muted-foreground"}`}
                    >
                      <Icon className="size-4" strokeWidth={1.7} />
                    </span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span className="block">
                    <Typography
                      color="inherit"
                      as="span"
                      variant="heading"
                      className="block font-semibold tracking-tight tabular-nums"
                    >
                      {value}
                    </Typography>
                    <span className="mt-1 flex items-center justify-between gap-1">
                      <Typography
                        color="muted-foreground"
                        as="span"
                        variant="label"
                      >
                        {title}
                      </Typography>
                      <Typography color="success" as="span" variant="caption">
                        <bdi dir="ltr">{trend}</bdi>
                      </Typography>
                    </span>
                  </span>
                </button>
              )
            )}
          </PanelContent>
          <PanelFooter className="justify-start gap-1.5">
            <TrendingUp className="size-3.5 text-success" />{" "}
            <Typography color="muted-foreground" as="span" variant="inherit">
              Growing together, month after month.
            </Typography>
          </PanelFooter>
        </Panel>
      </div>

      <OrdersTable />

      <div className="overview-grid mt-5">
        <Panel id="products" aria-labelledby="products-title">
          <PanelHeader
            title="Top Selling Products"
            titleProps={{ id: "products-title" }}
            icon={<ShoppingBag />}
            action={
              <Typography color="muted-foreground" as="span" variant="caption">
                This month
              </Typography>
            }
          />
          <PanelContent className="divide-y py-0">
            {products.map(
              ({ title, category, sales, price, icon: Icon, tone }, index) => (
                <button
                  key={title}
                  className="group flex w-full items-center gap-3 py-4 text-start"
                  onClick={() =>
                    setDetails({
                      title,
                      description: `${category}. ${sales} licenses sold this month at ${currency(price)} each.`,
                      value: currency(sales * price),
                    })
                  }
                >
                  <Typography
                    color="muted-foreground"
                    as="span"
                    variant="caption"
                    className="w-3"
                  >
                    {index + 1}
                  </Typography>
                  <span
                    className={`flex size-10 items-center justify-center rounded-lg ${tone === "blue" ? "bg-info-soft text-info" : tone === "green" ? "bg-success-soft text-success" : tone === "amber" ? "bg-warning-soft text-warning" : "bg-secondary text-foreground"}`}
                  >
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="flex-1">
                    <Typography
                      color="inherit"
                      as="span"
                      variant="body"
                      className="block font-medium group-hover:underline"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="muted-foreground"
                      as="span"
                      variant="caption"
                      className="mt-0.5 block"
                    >
                      {category}
                    </Typography>
                  </span>
                  <Typography
                    color="muted-foreground"
                    as="span"
                    variant="caption"
                    className="hidden text-end sm:block"
                  >
                    {sales} sales
                  </Typography>
                  <Typography
                    color="inherit"
                    as="span"
                    variant="label"
                    className="ms-4 min-w-20 text-end font-medium tabular-nums"
                  >
                    {currency(sales * price)}
                  </Typography>
                </button>
              )
            )}
          </PanelContent>
          <PanelFooter variant="muted">
            <Typography color="muted-foreground" as="span" variant="inherit">
              326 products sold this month
            </Typography>
            <Typography
              color="success"
              as="span"
              variant="inherit"
              className="flex items-center gap-1"
            >
              <TrendingUp className="size-3" /> 18.6% growth
            </Typography>
          </PanelFooter>
        </Panel>
        <Panel id="activity" aria-labelledby="activity-title">
          <PanelHeader
            title="Recent Activity"
            titleProps={{ id: "activity-title" }}
            icon={<Clock3 />}
            action={<StatusBadge tone="neutral">Today</StatusBadge>}
          />
          <PanelContent className="space-y-6">
            {[
              {
                name: "Emily Carter",
                title: "placed a new order",
                description: "Modernize · $2,499.00",
                time: "5 minutes ago",
                tone: "blue" as const,
              },
              {
                name: "Ryan Scott",
                title: "completed a project",
                description: "Material Pro marked as delivered",
                time: "32 minutes ago",
                tone: "green" as const,
              },
              {
                name: "Jason Miller",
                title: "updated the timeline",
                description: "Spike Admin · Delivery rescheduled",
                time: "1 hour ago",
                tone: "amber" as const,
              },
            ].map(({ name, title, description, time, tone }) => (
              <div key={name} className="flex items-start gap-3">
                <Avatar name={name} tone={tone} className="size-8" />
                <div>
                  <Typography
                    color="foreground"
                    as="p"
                    variant="label"
                    className="leading-relaxed"
                  >
                    <Typography
                      color="inherit"
                      as="span"
                      variant="inherit"
                      className="font-medium"
                    >
                      {name}
                    </Typography>{" "}
                    <Typography
                      color="muted-foreground"
                      as="span"
                      variant="inherit"
                    >
                      {title}
                    </Typography>
                  </Typography>
                  <Typography
                    color="muted-foreground"
                    as="p"
                    variant="caption"
                    className="mt-0.5"
                  >
                    {description}
                  </Typography>
                  <Typography
                    color="muted-foreground"
                    as="p"
                    variant="caption"
                    className="mt-1.5"
                  >
                    {time}
                  </Typography>
                </div>
              </div>
            ))}
          </PanelContent>
          <PanelFooter>
            <Typography color="muted-foreground" as="span" variant="inherit">
              You’re up to date with your team.
            </Typography>
          </PanelFooter>
        </Panel>
      </div>

      <Typography
        color="muted-foreground"
        as="p"
        variant="caption"
        className="mt-5 flex items-center gap-1.5"
      >
        <CircleDollarSign className="size-3.5" /> Sample workspace data for
        October 2026. All amounts are in USD.
      </Typography>
      <div role="status" aria-live="polite">
        {notice && (
          <div className="fixed end-5 bottom-5 z-40 flex max-w-[calc(100%-2.5rem)] items-center gap-3 rounded-lg border bg-popover py-3 ps-4 pe-2 text-label shadow-popover">
            <Check className="size-4 shrink-0 text-success" />

            <Typography color="foreground" as="span" variant="inherit">
              {notice}
            </Typography>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <Typography
                color="inherit"
                as="span"
                variant="inherit"
                aria-hidden="true"
              >
                ×
              </Typography>
            </Button>
          </div>
        )}
      </div>
      <Dialog
        open={!!details}
        onOpenChange={(open) => {
          if (!open) setDetails(null)
        }}
        title={details?.title ?? "Details"}
        description={details?.description}
      >
        {details?.value && (
          <div className="rounded-lg border bg-muted p-6">
            <Typography color="muted-foreground" as="p" variant="caption">
              {period} overview · Sample data
            </Typography>
            <Typography
              color="inherit"
              as="p"
              variant="metric"
              className="mt-2 font-semibold tracking-tight"
            >
              {details.value}
            </Typography>
          </div>
        )}
        <Button
          variant="outline"
          className="mt-5 w-full"
          onClick={() => setDetails(null)}
        >
          <Typography color="inherit" as="span" variant="inherit">
            Back to overview
          </Typography>{" "}
          <ArrowRight className="rtl:rotate-180" />
        </Button>
      </Dialog>
    </AppShell>
  )
}
