"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import {
  Activity,
  ArrowUpRight,
  Bell,
  BookOpen,
  Box,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  ChevronRight,
  Command,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Layers,
  Menu,
  PanelLeftClose,
  Search,
  Settings2,
  ShoppingBag,
  SlidersHorizontal,
  Users,
} from "lucide-react"
import { PersonAvatar as Avatar } from "shadcn-ui/components/molecules/person-avatar"
import { Button } from "shadcn-ui/components/atomic/button"
import { DetailDialog as Dialog } from "shadcn-ui/components/molecules/detail-dialog"
import { Input } from "shadcn-ui/components/atomic/input"
import { StatusBadge } from "shadcn-ui/components/molecules/status-badge"
import { ThemeSwitcher } from "shadcn-ui/components/molecules/theme-switcher"
import { ThemeToggle } from "shadcn-ui/components/molecules/theme-toggle"
import { Typography } from "shadcn-ui/components/atomic/typography"
import { DirectionSwitcher, useWorkspaceDirection } from "./workspace-direction"

const navigation = [
  {
    label: "WORKSPACE",
    items: [
      { title: "Modern", icon: LayoutDashboard, href: "/", badge: "Overview" },
      { title: "Analytics", icon: ChartNoAxesCombined, href: "/#sales" },
      { title: "eCommerce", icon: ShoppingBag, href: "/#products" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { title: "Projects", icon: BriefcaseBusiness, href: "/#orders" },
      { title: "Orders", icon: Box, href: "/#orders", badge: "8" },
      { title: "Customers", icon: Users, href: "/#customers" },
      { title: "Transactions", icon: CreditCard, href: "/#activity" },
    ],
  },
]

const searchEntries = navigation.flatMap((group) => group.items)

function SidebarContent({
  compact = false,
  isDesignSystem,
  setMobileOpen,
  setPreferencesOpen,
  setProfileOpen,
}: {
  compact?: boolean
  isDesignSystem: boolean
  setMobileOpen: (open: boolean) => void
  setPreferencesOpen: (open: boolean) => void
  setProfileOpen: (open: boolean) => void
}) {
  return (
    <>
      <Link
        href="/"
        aria-label="Shadcn dashboard home"
        className={`flex h-(--header-height) items-center gap-2.5 px-6 text-foreground ${compact ? "justify-center px-0" : ""}`}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Layers className="size-5" strokeWidth={1.8} />
        </span>
        {!compact && (
          <Typography
            color="inherit"
            as="span"
            variant="title"
            className="font-semibold tracking-tight"
          >
            shadcn
            <Typography
              color="muted-foreground"
              as="span"
              variant="inherit"
              className="ms-1 font-normal"
            >
              dashboard
            </Typography>
          </Typography>
        )}
      </Link>
      <div className="flex-1 space-y-7 overflow-y-auto px-3 pt-5 pb-4">
        {navigation.map((group) => (
          <div key={group.label}>
            {!compact && (
              <Typography
                color="muted-foreground"
                as="p"
                variant="caption"
                className="mb-2.5 px-3 font-medium tracking-widest"
              >
                {group.label}
              </Typography>
            )}
            {compact && <div className="mx-auto mb-2.5 h-px w-6 bg-border" />}
            <nav aria-label={group.label} className="space-y-1">
              {group.items.map(({ title, icon: Icon, href, badge }) => {
                const active = isDesignSystem
                  ? href === "/design-system"
                  : href === "/"
                return (
                  <Link
                    key={title}
                    href={href}
                    title={compact ? title : undefined}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-h-10 items-center gap-3 rounded-md px-3 text-body transition-colors duration-150 ${compact ? "justify-center px-0" : ""} ${active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`}
                  >
                    <Icon className="size-[18px] shrink-0" strokeWidth={1.7} />
                    {!compact && (
                      <>
                        <Typography
                          color="inherit"
                          as="span"
                          variant="inherit"
                          className="flex-1"
                        >
                          {title}
                        </Typography>
                        {badge && (
                          <Typography
                            color="muted-foreground"
                            as="span"
                            variant="caption"
                            className={`rounded px-1.5 py-0.5 ${badge === "New" ? "bg-card ring-1 ring-border" : ""}`}
                          >
                            {badge}
                          </Typography>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>
      {!compact && (
        <div className="mx-4 mb-5 rounded-lg border bg-card p-4">
          <div className="mb-3 flex size-8 items-center justify-center rounded-md border">
            <Activity className="size-4" />
          </div>
          <Typography
            color="foreground"
            as="p"
            variant="label"
            className="font-semibold"
          >
            A little clarity, every day.
          </Typography>
          <Typography
            color="muted-foreground"
            as="p"
            variant="label"
            className="mt-1 leading-relaxed"
          >
            All your numbers. One workspace.
          </Typography>
        </div>
      )}
      <div className="border-t p-3">
        <button
          title={compact ? "Settings" : undefined}
          className={`flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-sidebar-foreground transition-colors hover:bg-sidebar-accent ${compact ? "justify-center px-0" : ""}`}
          onClick={() => {
            setPreferencesOpen(true)
            setMobileOpen(false)
          }}
        >
          <Settings2 className="size-[18px]" strokeWidth={1.7} />
          {!compact && (
            <Typography color="inherit" as="span" variant="inherit">
              Settings
            </Typography>
          )}
        </button>
        <button
          aria-label="Open Cameron Williamson’s profile"
          className={`mt-2 flex w-full items-center gap-2.5 rounded-lg p-2 text-start hover:bg-sidebar-accent/60 ${compact ? "justify-center px-0" : ""}`}
          onClick={() => setProfileOpen(true)}
        >
          <Avatar
            name="Cameron Williamson"
            className="bg-primary text-primary-foreground"
          />
          {!compact && (
            <>
              <span className="min-w-0 flex-1">
                <Typography
                  color="foreground"
                  as="span"
                  variant="label"
                  className="block truncate font-medium"
                >
                  Cameron Williamson
                </Typography>
                <Typography
                  color="muted-foreground"
                  as="span"
                  variant="caption"
                  className="block"
                >
                  Personal account
                </Typography>
              </span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </>
          )}
        </button>
      </div>
    </>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const { direction } = useWorkspaceDirection()
  const pathname = usePathname()
  const isDesignSystem = pathname === "/design-system"
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsRead, setNotificationsRead] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setSearchOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", shortcut)
    return () => document.removeEventListener("keydown", shortcut)
  }, [])

  const sidebarProps = {
    isDesignSystem,
    setMobileOpen,
    setPreferencesOpen,
    setProfileOpen,
  }

  return (
    <div className={`dashboard-shell ${collapsed ? "is-collapsed" : ""}`}>
      <a
        href="#main"
        className="sr-only fixed start-2 top-2 z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only"
      >
        <Typography color="inherit" as="span" variant="inherit">
          Skip to content
        </Typography>
      </a>
      <aside
        className="dashboard-sidebar hidden md:flex"
        aria-label="Main sidebar"
      >
        <SidebarContent compact={collapsed} {...sidebarProps} />
      </aside>
      <div className="dashboard-body">
        <header className="dashboard-header">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              className="hidden text-muted-foreground md:inline-flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              <PanelLeftClose
                className={
                  collapsed ? "rotate-180 rtl:rotate-0" : "rtl:rotate-180"
                }
              />
            </Button>
            <div className="me-1 hidden h-5 w-px bg-border md:block" />
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-label"
            >
              <Link
                href="/"
                className="hidden text-muted-foreground hover:text-foreground sm:inline"
              >
                <Typography color="inherit" as="span" variant="inherit">
                  Dashboard
                </Typography>
              </Link>
              <ChevronRight className="hidden size-3 text-muted-foreground sm:inline rtl:rotate-180" />
              <Typography
                color="foreground"
                as="span"
                variant="inherit"
                className="font-medium"
              >
                {isDesignSystem ? "Design system" : "Modern"}
              </Typography>
            </nav>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              aria-label="Search workspace"
              onClick={() => setSearchOpen(true)}
              className="flex h-8 items-center gap-2 rounded-md border border-transparent px-2 text-muted-foreground hover:bg-muted sm:w-56 sm:border-border sm:bg-card"
            >
              <Search className="size-3.5" />
              <Typography
                color="inherit"
                as="span"
                variant="label"
                className="hidden flex-1 text-start sm:block"
              >
                Search anything...
              </Typography>
              <Typography
                color="inherit"
                as="kbd"
                variant="caption"
                className="hidden items-center gap-0.5 rounded border px-1 py-0.5 sm:flex"
              >
                <Command className="size-2.5" /> K
              </Typography>
            </button>
            <ThemeToggle />
            <Button
              aria-label="Layout direction preferences"
              variant="ghost"
              size="sm"
              onClick={() => setPreferencesOpen(true)}
            >
              <Typography color="inherit" as="span" variant="inherit">
                {direction.toUpperCase()}
              </Typography>
            </Button>
            <Button
              aria-label="Help and keyboard shortcuts"
              variant="ghost"
              size="icon"
              className="hidden text-muted-foreground sm:inline-flex"
              onClick={() => setHelpOpen(true)}
            >
              <HelpCircle />
            </Button>
            <Button
              aria-label={
                notificationsRead ? "Notifications" : "Notifications, 3 unread"
              }
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell />
              {!notificationsRead && (
                <span className="absolute end-1.5 top-1 size-1.5 rounded-full bg-success ring-2 ring-background" />
              )}
            </Button>
            <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
            <button
              aria-label="Open profile"
              onClick={() => setProfileOpen(true)}
              className="rounded-full"
            >
              <Avatar
                name="Cameron Williamson"
                className="size-8 bg-primary text-primary-foreground"
              />
            </button>
          </div>
        </header>
        <main id="main" className="dashboard-main">
          {children}
        </main>
        <footer className="mx-5 flex flex-wrap items-center justify-between gap-2 border-t py-5 text-caption text-muted-foreground sm:mx-8">
          <Typography color="muted-foreground" as="span" variant="inherit">
            © 2026 Shadcn Dashboard
          </Typography>
          <Typography color="muted-foreground" as="span" variant="inherit">
            Inspired by{" "}
            <a
              href="https://demos.shadcndashboard.dev/dashboards/modern"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              <Typography color="inherit" as="span" variant="inherit">
                Shadcn Dashboard
              </Typography>
              <ArrowUpRight className="ms-0.5 inline size-3" />
            </a>
            <Typography
              color="inherit"
              as="span"
              variant="inherit"
              className="mx-2"
            >
              ·
            </Typography>
            <Link className="hover:text-foreground" href="/design-system">
              <Typography color="inherit" as="span" variant="inherit">
                Design system
              </Typography>
            </Link>
          </Typography>
        </footer>
      </div>

      <Dialog open={mobileOpen} onOpenChange={setMobileOpen} title="Navigation">
        <div className="-mx-3 -mt-4 flex flex-col">
          <SidebarContent {...sidebarProps} />
        </div>
      </Dialog>
      <Dialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        title="Search your workspace"
        description="Find a page, section, or resource."
      >
        <div className="relative">
          <Search className="absolute start-3 top-3 size-4 text-muted-foreground" />
          <Input
            autoFocus
            aria-label="Search pages"
            placeholder="What are you looking for?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 ps-9"
          />
        </div>
        <div className="mt-3 space-y-1">
          {searchEntries
            .filter((entry) =>
              entry.title.toLowerCase().includes(query.toLowerCase())
            )
            .map(({ title, icon: Icon, href }) => (
              <Link
                key={title}
                href={href}
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-3 rounded-md p-3 hover:bg-muted"
              >
                <Icon className="size-4 text-muted-foreground" />
                <Typography
                  color="inherit"
                  as="span"
                  variant="inherit"
                  className="flex-1"
                >
                  {title}
                </Typography>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </Link>
            ))}
          {!searchEntries.some((entry) =>
            entry.title.toLowerCase().includes(query.toLowerCase())
          ) && (
            <Typography
              color="muted-foreground"
              as="p"
              variant="inherit"
              className="py-8 text-center"
            >
              No pages found. Try “orders” or “design”.
            </Typography>
          )}
        </div>
      </Dialog>
      <Dialog
        open={preferencesOpen}
        onOpenChange={setPreferencesOpen}
        title="Workspace preferences"
        description="Make this workspace feel like yours."
      >
        <div className="space-y-5">
          <div>
            <Typography
              color="inherit"
              as="h3"
              variant="label"
              className="mb-2 font-medium"
            >
              Appearance
            </Typography>
            <ThemeSwitcher />
          </div>
          <div>
            <Typography
              color="inherit"
              as="h3"
              variant="label"
              className="mb-2 font-medium"
            >
              Layout direction
            </Typography>
            <DirectionSwitcher />
          </div>
          <div className="rounded-lg border bg-muted p-4">
            <div className="flex items-center gap-2 font-medium">
              <SlidersHorizontal className="size-4" />{" "}
              <Typography color="inherit" as="span" variant="inherit">
                Built on shared design tokens
              </Typography>
            </div>
            <Typography
              color="muted-foreground"
              as="p"
              variant="label"
              className="mt-2"
            >
              Theme changes apply to every chart, surface, and component, and
              are saved on this device.
            </Typography>
            <Link
              href="/design-system"
              onClick={() => setPreferencesOpen(false)}
              className="mt-3 inline-flex items-center gap-1 text-label font-medium underline underline-offset-4"
            >
              <Typography color="inherit" as="span" variant="inherit">
                View design system
              </Typography>{" "}
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
        title="Notifications"
        description={
          notificationsRead
            ? "You're all caught up."
            : "You have 3 unread updates."
        }
      >
        <div className="divide-y">
          {[
            {
              icon: ShoppingBag,
              title: "A new order just landed",
              detail: "Orbit Commerce · $3,240.00",
              time: "5 min ago",
            },
            {
              icon: Check,
              title: "Material Pro was delivered",
              detail: "Ryan Scott completed the project",
              time: "32 min ago",
            },
            {
              icon: FileText,
              title: "Your monthly report is ready",
              detail: "October sales are up 22%",
              time: "1 hour ago",
            },
          ].map(({ icon: Icon, title, detail, time }) => (
            <div key={title} className="flex items-start gap-3 py-4">
              <span className="rounded-lg border p-2">
                <Icon className="size-4" />
              </span>
              <div className="flex-1">
                <Typography
                  color="inherit"
                  as="p"
                  variant="body"
                  className="font-medium"
                >
                  {title}
                </Typography>
                <Typography
                  color="muted-foreground"
                  as="p"
                  variant="label"
                  className="mt-0.5"
                >
                  {detail}
                </Typography>
                <Typography
                  color="muted-foreground"
                  as="p"
                  variant="caption"
                  className="mt-1"
                >
                  {time}
                </Typography>
              </div>
              {!notificationsRead && (
                <span className="mt-2 size-1.5 rounded-full bg-success" />
              )}
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="mt-4 w-full"
          disabled={notificationsRead}
          onClick={() => setNotificationsRead(true)}
        >
          <Check />

          <Typography color="inherit" as="span" variant="inherit">
            {notificationsRead ? "All updates read" : "Mark all as read"}
          </Typography>
        </Button>
      </Dialog>
      <Dialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        title="Your account"
      >
        <div className="flex items-center gap-4 rounded-lg border bg-muted p-4">
          <Avatar
            name="Cameron Williamson"
            className="size-12 bg-primary text-primary-foreground"
          />
          <div>
            <Typography
              color="inherit"
              as="p"
              variant="inherit"
              className="font-medium"
            >
              Cameron Williamson
            </Typography>
            <Typography
              color="muted-foreground"
              as="p"
              variant="label"
              className="mt-0.5"
            >
              Workspace administrator
            </Typography>
            <StatusBadge tone="success" className="mt-2">
              Personal workspace
            </StatusBadge>
          </div>
        </div>
        <Button
          variant="outline"
          className="mt-5 w-full"
          onClick={() => {
            setProfileOpen(false)
            setPreferencesOpen(true)
          }}
        >
          <Settings2 />{" "}
          <Typography color="inherit" as="span" variant="inherit">
            Account preferences
          </Typography>
        </Button>
      </Dialog>
      <Dialog
        open={helpOpen}
        onOpenChange={setHelpOpen}
        title="A little help"
        description="A few shortcuts to get around."
      >
        <dl className="space-y-3">
          <div className="flex justify-between">
            <Typography color="inherit" as="dt" variant="inherit">
              Search the workspace
            </Typography>
            <Typography
              color="inherit"
              as="dd"
              variant="label"
              className="rounded border px-2 font-mono"
            >
              ⌘ / Ctrl + K
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography color="inherit" as="dt" variant="inherit">
              Close a dialog
            </Typography>
            <Typography
              color="inherit"
              as="dd"
              variant="label"
              className="rounded border px-2 font-mono"
            >
              Esc
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography color="inherit" as="dt" variant="inherit">
              Explore a chart
            </Typography>
            <Typography
              color="inherit"
              as="dd"
              variant="label"
              className="rounded border px-2 font-mono"
            >
              ← →
            </Typography>
          </div>
        </dl>
        <Link
          href="/design-system"
          onClick={() => setHelpOpen(false)}
          className="mt-6 flex items-center gap-2 text-label font-medium underline underline-offset-4"
        >
          <BookOpen className="size-4" />{" "}
          <Typography color="inherit" as="span" variant="inherit">
            Read the design system guide
          </Typography>
        </Link>
      </Dialog>
    </div>
  )
}
