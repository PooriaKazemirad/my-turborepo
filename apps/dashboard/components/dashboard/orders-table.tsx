"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpDown,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Search,
  SearchX,
} from "lucide-react"
import { PersonAvatar as Avatar } from "shadcn-ui/components/molecules/person-avatar"
import { Button } from "shadcn-ui/components/atomic/button"
import { DetailDialog as Dialog } from "shadcn-ui/components/molecules/detail-dialog"
import { Input } from "shadcn-ui/components/atomic/input"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
} from "shadcn-ui/components/molecules/panel"
import { StatusBadge } from "shadcn-ui/components/molecules/status-badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shadcn-ui/components/atomic/table"
import { currency, formatDate, orders, statusTone, type Order } from "./data"
import { Typography } from "shadcn-ui/components/atomic/typography"

type SortKey = "project" | "name" | "status" | "price" | "deadline"
const pageSize = 5

export function OrdersTable() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All statuses")
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{
    key: SortKey
    descending: boolean
  } | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const filteredOrders = useMemo(() => {
    const filtered = orders.filter(
      (order) =>
        `${order.project} ${order.name} ${order.id}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (status === "All statuses" || order.status === status)
    )
    if (sort)
      filtered.sort((a, b) => {
        const aValue = a[sort.key]
        const bValue = b[sort.key]
        const result =
          typeof aValue === "number" && typeof bValue === "number"
            ? aValue - bValue
            : String(aValue).localeCompare(String(bValue))
        return sort.descending ? -result : result
      })
    return filtered
  }, [query, status, sort])
  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize))
  const visibleOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  function sortBy(key: SortKey) {
    setSort((value) => ({
      key,
      descending: value?.key === key ? !value.descending : false,
    }))
    setPage(1)
  }

  return (
    <>
      <Panel id="orders" aria-labelledby="orders-title">
        <PanelHeader
          title="Projects & Orders"
          titleProps={{ id: "orders-title" }}
          icon={<BriefcaseBusiness />}
          action={
            <Typography
              color="muted-foreground"
              as="span"
              variant="caption"
              className="rounded-md border px-2 py-1"
            >
              {orders.length} orders
            </Typography>
          }
        />
        <PanelContent className="flex flex-wrap items-center justify-between gap-3 py-4">
          <Typography color="muted-foreground" as="p" variant="label">
            Keep track of your latest projects and orders.
          </Typography>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute start-3 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                aria-label="Search orders"
                placeholder="Search orders..."
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(1)
                }}
                className="h-9 w-full ps-8 text-label sm:w-44"
              />
            </div>
            <select
              aria-label="Filter orders by status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value)
                setPage(1)
              }}
              className="control-select max-w-36"
            >
              <Typography color="inherit" as="option" variant="inherit">
                All statuses
              </Typography>
              {Object.keys(statusTone).map((value) => (
                <Typography
                  color="inherit"
                  as="option"
                  variant="inherit"
                  key={value}
                >
                  {value}
                </Typography>
              ))}
            </select>
          </div>
        </PanelContent>
        <PanelContent padding="none">
          <Table className="data-table">
            <TableCaption color="inherit" className="sr-only">
              Projects and orders. Use column headings to sort, or each row’s
              detail button to inspect an order.
            </TableCaption>
            <TableHeader>
              <TableRow>
                {[
                  { key: "project", title: "Project" },
                  { key: "name", title: "Assigned to" },
                  { key: "status", title: "Status" },
                  { key: "price", title: "Amount" },
                  { key: "deadline", title: "Deadline" },
                ].map(({ key, title }) => (
                  <TableHead
                    color="inherit"
                    key={key}
                    scope="col"
                    aria-sort={
                      sort?.key === key
                        ? sort.descending
                          ? "descending"
                          : "ascending"
                        : "none"
                    }
                  >
                    <button onClick={() => sortBy(key as SortKey)}>
                      <Typography color="inherit" as="span" variant="inherit">
                        {title}
                      </Typography>
                      <ArrowUpDown />
                    </button>
                  </TableHead>
                ))}
                <TableHead color="inherit" scope="col">
                  <Typography
                    color="inherit"
                    as="span"
                    variant="inherit"
                    className="sr-only"
                  >
                    Actions
                  </Typography>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell color="inherit">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-start"
                    >
                      <Typography
                        color="inherit"
                        as="span"
                        variant="body"
                        className="block font-medium hover:underline"
                      >
                        {order.project}
                      </Typography>
                      <Typography
                        color="muted-foreground"
                        as="span"
                        variant="caption"
                        className="mt-1 block font-mono"
                      >
                        <bdi dir="ltr">#{order.id}</bdi>
                      </Typography>
                    </button>
                  </TableCell>
                  <TableCell color="inherit">
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        name={order.name}
                        tone={order.tone}
                        className="size-8"
                      />
                      <div>
                        <Typography
                          color="inherit"
                          as="span"
                          variant="label"
                          className="block font-medium"
                        >
                          {order.name}
                        </Typography>
                        <Typography
                          color="muted-foreground"
                          as="span"
                          variant="caption"
                          className="mt-0.5 block"
                        >
                          {order.role}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell color="inherit">
                    <StatusBadge tone={statusTone[order.status]} dot>
                      {order.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell
                    color="inherit"
                    className="text-label font-medium tabular-nums"
                  >
                    {currency(order.price)}
                  </TableCell>
                  <TableCell color="muted-foreground" className="text-label">
                    {formatDate(order.deadline)}
                  </TableCell>
                  <TableCell color="inherit">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`View ${order.project} order details`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Ellipsis />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PanelContent>
        {visibleOrders.length === 0 && (
          <div className="flex flex-col items-center px-5 py-12">
            <SearchX className="mb-3 size-7 text-muted-foreground" />
            <Typography
              color="foreground"
              as="h3"
              variant="inherit"
              className="font-medium"
            >
              No orders found
            </Typography>
            <Typography
              color="muted-foreground"
              as="p"
              variant="label"
              className="mt-1"
            >
              Try another search or clear your filters.
            </Typography>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("")
                setStatus("All statuses")
                setPage(1)
              }}
            >
              <Typography color="inherit" as="span" variant="inherit">
                Clear filters
              </Typography>
            </Button>
          </div>
        )}
        <PanelFooter className="py-3.5">
          <Typography color="muted-foreground" as="p" variant="caption">
            Showing{" "}
            {filteredOrders.length === 0 ? 0 : (page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </Typography>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Previous orders page"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="rtl:rotate-180" />
            </Button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (value) => (
                <Button
                  key={value}
                  size="icon-sm"
                  variant={page === value ? "default" : "ghost"}
                  aria-label={`Orders page ${value}`}
                  aria-current={page === value ? "page" : undefined}
                  onClick={() => setPage(value)}
                >
                  <Typography color="inherit" as="span" variant="inherit">
                    <bdi dir="ltr">{value}</bdi>
                  </Typography>
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Next orders page"
              disabled={page === pageCount}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="rtl:rotate-180" />
            </Button>
          </div>
        </PanelFooter>
      </Panel>
      <Dialog
        open={!!selectedOrder}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null)
        }}
        title={
          selectedOrder ? `${selectedOrder.project} order` : "Order details"
        }
        description="The latest details for this project."
      >
        {selectedOrder && (
          <>
            <div className="mb-5 flex items-center gap-3 rounded-lg border bg-muted p-4">
              <Avatar name={selectedOrder.name} tone={selectedOrder.tone} />
              <div>
                <Typography
                  color="inherit"
                  as="p"
                  variant="inherit"
                  className="font-medium"
                >
                  {selectedOrder.name}
                </Typography>
                <Typography color="muted-foreground" as="p" variant="label">
                  {selectedOrder.role}
                </Typography>
              </div>
            </div>
            <dl className="space-y-4">
              {[
                { label: "Order ID", value: `#${selectedOrder.id}` },
                { label: "Amount", value: currency(selectedOrder.price) },
                {
                  label: "Deadline",
                  value: formatDate(selectedOrder.deadline),
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <Typography
                    color="muted-foreground"
                    as="dt"
                    variant="inherit"
                  >
                    {label}
                  </Typography>
                  <Typography
                    color="inherit"
                    as="dd"
                    variant="inherit"
                    className="font-medium"
                  >
                    <bdi dir="ltr">{value}</bdi>
                  </Typography>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <Typography color="muted-foreground" as="dt" variant="inherit">
                  Status
                </Typography>
                <Typography color="inherit" as="dd" variant="inherit">
                  <StatusBadge tone={statusTone[selectedOrder.status]} dot>
                    {selectedOrder.status}
                  </StatusBadge>
                </Typography>
              </div>
            </dl>
          </>
        )}
      </Dialog>
    </>
  )
}
