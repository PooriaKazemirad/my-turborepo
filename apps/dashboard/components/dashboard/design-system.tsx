"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Layers,
  MousePointer2,
  Palette,
  Plus,
  Search,
  Type,
} from "lucide-react"
import { PersonAvatar as Avatar } from "@workspace/ui/components/person-avatar"
import { Button } from "@workspace/ui/components/button"
import { DetailDialog as Dialog } from "@workspace/ui/components/detail-dialog"
import { Input } from "@workspace/ui/components/input"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
} from "@workspace/ui/components/panel"
import { StatusBadge } from "@workspace/ui/components/status-badge"
import { ThemeSwitcher } from "@workspace/ui/components/theme-switcher"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  colorTokens,
  tokenGroups,
  typographyTokens,
} from "@workspace/ui/lib/design-tokens"
import { AppShell } from "./app-shell"
import { ComponentCatalog } from "./component-catalog"
import { shadcnComponents } from "@workspace/ui/lib/component-catalog"
import { Typography } from "@workspace/ui/components/typography"
import { DirectionSwitcher, useWorkspaceDirection } from "./workspace-direction"

export function DesignSystem() {
  const { direction } = useWorkspaceDirection()
  const [values, setValues] = useState<Record<string, string>>({})
  const [tab, setTab] = useState("Foundations")
  const [copied, setCopied] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const [query, setQuery] = useState("")
  const tokenCount = Object.values(tokenGroups).reduce(
    (count, tokens) => count + tokens.length,
    0
  )

  useEffect(() => {
    function readTokens() {
      const styles = getComputedStyle(document.documentElement)
      setValues(
        Object.fromEntries(
          Object.values(tokenGroups)
            .flat()
            .map((token) => [
              token,
              styles.getPropertyValue(`--${token}`).trim(),
            ])
        )
      )
    }
    readTokens()
    const observer = new MutationObserver(readTokens)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  async function copyToken(token: string) {
    try {
      await navigator.clipboard.writeText(`var(--${token})`)
      setCopied(token)
      setNotice(`Copied var(--${token}) to your clipboard.`)
    } catch {
      setNotice(`Use var(--${token}) in your stylesheet.`)
    }
  }

  function exportTokens() {
    const groups = Object.fromEntries(
      Object.entries(tokenGroups).map(([group, names]) => [
        group,
        Object.fromEntries(names.map((name) => [name, values[name]])),
      ])
    )
    const output = {
      name: "Modern Dashboard",
      version: "1.0.0",
      mode: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
      format: "Resolved CSS custom properties",
      tokens: groups,
    }
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(output, null, 2)], { type: "application/json" })
    )
    const link = document.createElement("a")
    link.href = url
    link.download = `modern-dashboard-tokens-${output.mode}.json`
    link.click()
    URL.revokeObjectURL(url)
    setNotice(`Exported ${tokenCount} ${output.mode} theme tokens.`)
  }

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-label text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 rtl:rotate-180" />
            <Typography color="inherit" as="span" variant="inherit">
              Back to overview
            </Typography>
          </Link>
          <div className="flex items-center gap-3">
            <Typography
              color="foreground"
              as="h1"
              variant="heading"
              className="font-semibold tracking-tight"
            >
              A system, thoughtfully connected.
            </Typography>
            <StatusBadge>v1.0</StatusBadge>
          </div>
          <Typography
            color="muted-foreground"
            as="p"
            variant="body"
            className="mt-2 max-w-xl"
          >
            The foundations behind Modern Dashboard. One set of variables, a
            consistent experience, and room to make it yours.
          </Typography>
        </div>
        <Button
          size="lg"
          className="mt-1 gap-2 px-4 text-label"
          onClick={exportTokens}
        >
          <Download className="size-3.5" />
          <Typography color="inherit" as="span" variant="inherit">
            Export tokens
          </Typography>
        </Button>
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-secondary">
            <Layers className="size-5" />
          </span>
          <div>
            <Typography
              color="foreground"
              as="p"
              variant="body"
              className="font-medium"
            >
              Built to work together
            </Typography>
            <Typography
              color="muted-foreground"
              as="p"
              variant="label"
              className="mt-0.5"
            >
              {tokenCount} tokens · {shadcnComponents.length} shadcn components
              · Two color themes
            </Typography>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <DirectionSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
      <div
        role="tablist"
        aria-label="Design system sections"
        className="mb-6 flex gap-6 border-b"
      >
        {["Foundations", "Components", "Guidelines"].map((title, index) => (
          <button
            key={title}
            id={`system-tab-${index}`}
            role="tab"
            aria-selected={tab === title}
            aria-controls={`system-panel-${index}`}
            tabIndex={tab === title ? 0 : -1}
            onClick={() => setTab(title)}
            onKeyDown={(event) => {
              if (
                event.key === "ArrowRight" ||
                event.key === "ArrowLeft" ||
                event.key === "Home" ||
                event.key === "End"
              ) {
                event.preventDefault()
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 2
                      : (index +
                          ((event.key === "ArrowRight") ===
                          (direction === "ltr")
                            ? 1
                            : -1) +
                          3) %
                        3
                setTab(
                  ["Foundations", "Components", "Guidelines"][next] ??
                    "Foundations"
                )
                document.getElementById(`system-tab-${next}`)?.focus()
              }
            }}
            className={`border-b-2 pb-3 text-body font-medium transition-colors ${tab === title ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <Typography color="inherit" as="span" variant="inherit">
              {title}
            </Typography>
          </button>
        ))}
      </div>
      {tab === "Foundations" && (
        <div
          role="tabpanel"
          id="system-panel-0"
          aria-labelledby="system-tab-0"
          className="space-y-5"
        >
          <Panel id="foundations">
            <PanelHeader
              title="Color with a purpose"
              icon={<Palette />}
              description="Neutral foundations. Semantic accents. Every color has a role."
              action={
                <Typography
                  color="muted-foreground"
                  as="span"
                  variant="caption"
                  className="hidden sm:inline"
                >
                  Click a swatch to copy its token
                </Typography>
              }
            />
            <div className="swatch-grid p-5">
              {colorTokens.map(({ name, label, description }) => (
                <button
                  key={name}
                  onClick={() => copyToken(name)}
                  className="group flex flex-col overflow-hidden rounded-lg border text-start transition-shadow hover:shadow-panel"
                >
                  <span
                    className="relative h-20 w-full shrink-0 border-b"
                    style={{ background: `var(--${name})` }}
                  >
                    {copied === name && (
                      <span className="absolute end-2 top-2 flex size-6 items-center justify-center rounded bg-card text-foreground shadow-panel">
                        <Check className="size-3.5" />
                      </span>
                    )}
                  </span>
                  <span className="block p-3">
                    <Typography
                      color="inherit"
                      as="span"
                      variant="label"
                      className="block font-medium"
                    >
                      {label}
                    </Typography>
                    <Typography
                      color="muted-foreground"
                      as="span"
                      variant="caption"
                      className="mt-1 block truncate font-mono"
                    >
                      --{name}
                    </Typography>
                    <Typography
                      color="muted-foreground"
                      as="span"
                      variant="caption"
                      className="mt-1 block font-mono"
                    >
                      {values[name] ?? "…"}
                    </Typography>
                    <Typography
                      color="muted-foreground"
                      as="span"
                      variant="caption"
                      className="mt-2 block leading-relaxed"
                    >
                      {description}
                    </Typography>
                  </span>
                </button>
              ))}
            </div>
          </Panel>
          <Panel>
            <PanelHeader
              title="Typography that gets out of the way"
              icon={<Type />}
              description="Geist Sans for the interface. Geist Mono for code. A focused seven-step scale."
            />
            <div className="divide-y px-5">
              {typographyTokens.map(({ name, label, usage }) => (
                <div
                  key={name}
                  className="flex flex-wrap items-center justify-between gap-3 py-5"
                >
                  <div className="min-w-36">
                    <Typography
                      color="foreground"
                      as="p"
                      variant="label"
                      className="font-medium"
                    >
                      {label}
                    </Typography>
                    <Typography
                      color="muted-foreground"
                      as="p"
                      variant="caption"
                      className="mt-1 font-mono"
                    >
                      {values[`font-size-${name}`] ?? "…"} / text-{name}
                    </Typography>
                  </div>
                  <Typography
                    color="foreground"
                    as="p"
                    variant={name}
                    className="flex-1 font-medium tracking-tight"
                  >
                    Clarity in every detail.
                  </Typography>
                  <Typography
                    color="muted-foreground"
                    as="p"
                    variant="caption"
                    className="hidden max-w-44 xl:block"
                  >
                    {usage}
                  </Typography>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t bg-muted/30 p-5">
              <Typography color="foreground" variant="body" weight="medium">
                One component for every text style
              </Typography>
              <Typography variant="label" color="muted-foreground">
                Choose the visual size with variant, and preserve the meaning
                with as. Headings, labels, inline text, and table cells share
                the same tokens.
              </Typography>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {(
                  [
                    "foreground",
                    "muted-foreground",
                    "success",
                    "warning",
                    "danger",
                    "info",
                  ] as const
                ).map((color) => (
                  <Typography
                    key={color}
                    as="span"
                    variant="label"
                    color={color}
                  >
                    {color}
                  </Typography>
                ))}
              </div>
              <Typography
                color="foreground"
                as="pre"
                dir="ltr"
                variant="caption"
                className="overflow-x-auto rounded-md border bg-card p-3 font-mono"
              >
                <Typography color="inherit" as="code" variant="inherit">
                  {
                    '<Typography as="h2" variant="heading" weight="semibold" color="foreground">\n  Project overview\n</Typography>\n<Typography color="muted-foreground">Supporting text.</Typography>\n<Typography color="success">Changes saved.</Typography>'
                  }
                </Typography>
              </Typography>
            </div>
          </Panel>
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel>
              <PanelHeader
                title="Space to breathe"
                description="A four-pixel base, shared from navigation to charts."
              />
              <div className="space-y-3 p-5">
                {tokenGroups.spacing.map((name) => (
                  <button
                    key={name}
                    className="flex w-full items-center gap-4 text-start"
                    onClick={() => copyToken(name)}
                  >
                    <Typography
                      color="muted-foreground"
                      as="code"
                      variant="caption"
                      className="w-24"
                    >
                      --{name}
                    </Typography>
                    <span
                      className="h-4 rounded-sm bg-primary"
                      style={{ width: `var(--${name})` }}
                    />
                    <Typography
                      color="muted-foreground"
                      as="span"
                      variant="caption"
                      className="ms-auto font-mono"
                    >
                      {values[name] ?? "…"}
                    </Typography>
                  </button>
                ))}
              </div>
            </Panel>
            <Panel>
              <PanelHeader
                title="Consistent by definition"
                description="A small set of shape, elevation, and motion decisions."
              />
              <div className="grid grid-cols-3 gap-3 p-5">
                {["radius-control", "radius", "radius-panel"].map((name) => (
                  <button
                    key={name}
                    onClick={() => copyToken(name)}
                    className="text-start"
                  >
                    <div
                      className="mb-3 h-16 border-2 bg-muted"
                      style={{ borderRadius: `var(--${name})` }}
                    />
                    <Typography
                      color="inherit"
                      as="p"
                      variant="caption"
                      className="font-medium"
                    >
                      {name.replace("radius-", "")}
                    </Typography>
                    <Typography
                      color="muted-foreground"
                      as="p"
                      variant="caption"
                      className="mt-1 font-mono"
                    >
                      {values[name] ?? "…"}
                    </Typography>
                  </button>
                ))}
              </div>
              <dl className="mx-5 mb-5 space-y-3 border-t pt-4">
                {["duration-fast", "duration-normal", "ease-standard"].map(
                  (name) => (
                    <div
                      key={name}
                      className="flex justify-between gap-2 text-caption"
                    >
                      <Typography
                        color="muted-foreground"
                        as="dt"
                        variant="inherit"
                      >
                        {name}
                      </Typography>
                      <Typography
                        color="foreground"
                        as="dd"
                        variant="inherit"
                        className="font-mono"
                      >
                        {values[name] ?? "…"}
                      </Typography>
                    </div>
                  )
                )}
              </dl>
            </Panel>
          </div>
          <Panel>
            <PanelHeader
              title="Token reference"
              description="Search the complete set of live variables. Values update with the theme."
              action={
                <div className="relative">
                  <Search className="absolute start-2.5 top-2.5 size-3.5 text-muted-foreground" />
                  <Input
                    className="h-8 w-36 ps-8 text-label sm:w-52"
                    aria-label="Search design tokens"
                    placeholder="Find a token..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              }
            />
            <Table
              className="data-table"
              containerClassName="max-h-96 overflow-auto"
              aria-label="Design tokens"
            >
              <TableHeader>
                <TableRow>
                  <TableHead color="inherit" scope="col">
                    Token
                  </TableHead>
                  <TableHead color="inherit" scope="col">
                    Category
                  </TableHead>
                  <TableHead color="inherit" scope="col">
                    Resolved value
                  </TableHead>
                  <TableHead color="inherit" scope="col">
                    <Typography
                      color="inherit"
                      as="span"
                      variant="inherit"
                      className="sr-only"
                    >
                      Copy
                    </Typography>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(tokenGroups).flatMap(([group, names]) =>
                  names
                    .filter((name) => name.includes(query.toLowerCase()))
                    .map((name) => (
                      <TableRow key={name}>
                        <TableCell
                          color="inherit"
                          className="font-mono text-caption"
                        >
                          --{name}
                        </TableCell>
                        <TableCell
                          color="muted-foreground"
                          className="text-label"
                        >
                          {group}
                        </TableCell>
                        <TableCell
                          color="inherit"
                          className="font-mono text-caption"
                        >
                          {values[name] ?? "…"}
                        </TableCell>
                        <TableCell color="inherit">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label={`Copy ${name} token`}
                            onClick={() => copyToken(name)}
                          >
                            {copied === name ? <Check /> : <Copy />}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
            {!Object.values(tokenGroups)
              .flat()
              .some((name) => name.includes(query.toLowerCase())) && (
              <Typography
                color="muted-foreground"
                as="p"
                variant="inherit"
                className="p-8 text-center"
              >
                No tokens match “{query}”.
              </Typography>
            )}
          </Panel>
        </div>
      )}
      {tab === "Components" && (
        <div
          role="tabpanel"
          id="system-panel-1"
          aria-labelledby="system-tab-1"
          className="grid gap-5 lg:grid-cols-2"
        >
          <Panel aria-labelledby="panel-demo-title" className="lg:col-span-2">
            <PanelHeader
              title="Panel structure"
              titleProps={{ id: "panel-demo-title" }}
              icon={<Layers />}
              description={
                <>
                  A shared header, padded or edge-to-edge content, and an
                  optional footer. Text styles use{" "}
                  <Typography color="inherit" as="code" variant="inherit">
                    Typography
                  </Typography>
                  .
                </>
              }
              action={
                <Button
                  variant="outline"
                  onClick={() => setNotice("Panel action selected.")}
                >
                  <Plus />
                  <Typography color="inherit" as="span" variant="inherit">
                    Try panel action
                  </Typography>
                </Button>
              }
            />
            <PanelContent>
              <Typography
                color="muted-foreground"
                variant="body"
                className="mb-3"
              >
                Use the same building blocks for charts, lists, tables, and
                summary cards. Header actions wrap when space is limited.
              </Typography>
              <Typography
                color="card-foreground"
                as="pre"
                variant="caption"
                dir="ltr"
                className="overflow-x-auto rounded-md border bg-muted/40 p-3 font-mono"
              >
                <Typography color="inherit" as="code" variant="inherit">
                  {
                    '<Panel aria-labelledby="revenue-title">\n  <PanelHeader title="Revenue" titleProps={{ id: "revenue-title" }} />\n  <PanelContent>...</PanelContent>\n  <PanelFooter>...</PanelFooter>\n</Panel>'
                  }
                </Typography>
              </Typography>
            </PanelContent>
            <PanelFooter variant="muted">
              <Typography color="muted-foreground" as="span" variant="inherit">
                Panel · PanelHeader · PanelContent · PanelFooter
              </Typography>
              <StatusBadge tone="success">Shared component</StatusBadge>
            </PanelFooter>
          </Panel>
          <Panel>
            <PanelHeader
              title="Buttons"
              icon={<MousePointer2 />}
              description="One primary action per context. Supporting actions step back."
            />
            <div className="flex flex-wrap items-center gap-3 p-5">
              <Button onClick={() => setNotice("Primary action selected.")}>
                <Plus />
                <Typography color="inherit" as="span" variant="inherit">
                  Primary
                </Typography>
              </Button>
              <Button
                variant="outline"
                onClick={() => setNotice("Secondary action selected.")}
              >
                <Typography color="inherit" as="span" variant="inherit">
                  Outline
                </Typography>
              </Button>
              <Button
                variant="secondary"
                onClick={() => setNotice("Subtle action selected.")}
              >
                <Typography color="inherit" as="span" variant="inherit">
                  Secondary
                </Typography>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setNotice("Ghost action selected.")}
              >
                <Typography color="inherit" as="span" variant="inherit">
                  Ghost
                </Typography>
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  setNotice("Destructive style preview. No data was changed.")
                }
              >
                <Typography color="inherit" as="span" variant="inherit">
                  Destructive
                </Typography>
              </Button>
              <Button disabled>
                <Typography color="inherit" as="span" variant="inherit">
                  Disabled
                </Typography>
              </Button>
            </div>
            <div className="border-t px-5 py-4">
              <Typography color="muted-foreground" as="code" variant="caption">
                Button · default / outline / secondary / ghost / destructive /
                link
              </Typography>
            </div>
          </Panel>
          <Panel>
            <PanelHeader
              title="Status badges"
              description="A written label and optional dot support the semantic color."
            />
            <div className="flex flex-wrap gap-3 p-5">
              <StatusBadge tone="success" dot>
                Delivered
              </StatusBadge>
              <StatusBadge tone="warning" dot>
                Processing
              </StatusBadge>
              <StatusBadge tone="danger" dot>
                Delayed
              </StatusBadge>
              <StatusBadge tone="info" dot>
                In review
              </StatusBadge>
              <StatusBadge tone="neutral">Cancelled</StatusBadge>
            </div>
            <div className="border-t px-5 py-4">
              <Typography color="muted-foreground" as="code" variant="caption">
                StatusBadge · success / warning / danger / info / neutral
              </Typography>
            </div>
          </Panel>
          <Panel>
            <PanelHeader
              title="Form controls"
              description="Persistent labels, clear focus, and useful validation."
            />
            <div className="space-y-4 p-5">
              <div>
                <Typography
                  color="foreground"
                  as="label"
                  variant="label"
                  htmlFor="example-name"
                  className="mb-2 block font-medium"
                >
                  Project name
                </Typography>
                <Input id="example-name" placeholder="e.g. Modern Dashboard" />
              </div>
              <div>
                <Typography
                  color="foreground"
                  as="label"
                  variant="label"
                  htmlFor="example-error"
                  className="mb-2 block font-medium"
                >
                  Workspace name
                </Typography>
                <Input
                  id="example-error"
                  aria-invalid="true"
                  aria-describedby="example-error-message"
                  defaultValue=""
                  placeholder="Enter a workspace name"
                />
                <Typography
                  color="danger"
                  as="p"
                  variant="caption"
                  id="example-error-message"
                  className="mt-1.5"
                >
                  A workspace name is required.
                </Typography>
              </div>
              <Input
                disabled
                aria-label="Disabled control example"
                placeholder="This field is disabled"
              />
            </div>
          </Panel>
          <Panel>
            <PanelHeader
              title="People & dialogs"
              description="Initials work without external images. Dialogs manage focus."
            />
            <div className="p-5">
              <div className="mb-6 flex items-center gap-3">
                <Avatar name="Cameron Williamson" />
                <Avatar name="Emily Carter" tone="blue" />
                <Avatar name="Ryan Scott" tone="green" />
                <Avatar name="Lisa Park" tone="amber" />
              </div>
              <Button variant="outline" onClick={() => setDialogOpen(true)}>
                <Typography color="inherit" as="span" variant="inherit">
                  Open a dialog
                </Typography>{" "}
                <ArrowUpRight />
              </Button>
              <Typography
                color="muted-foreground"
                as="p"
                variant="label"
                className="mt-4 leading-relaxed"
              >
                Dialogs trap focus, close with Escape, and restore focus to the
                initiating control. Charts support arrow keys and include a
                screen reader data table.
              </Typography>
            </div>
          </Panel>
          <ComponentCatalog />
        </div>
      )}
      {tab === "Guidelines" && (
        <div
          role="tabpanel"
          id="system-panel-2"
          aria-labelledby="system-tab-2"
          className="grid gap-5 lg:grid-cols-2"
        >
          {[
            {
              title: "Start with the role",
              description:
                "Use semantic variables such as background, foreground, and success. Keep raw palette values in the token source so themes stay consistent.",
              example: "bg-card text-foreground border-border",
            },
            {
              title: "Keep the hierarchy quiet",
              description:
                "Page titles use Heading. Panel titles use Subtitle. Metrics use Metric with tabular figures. Reserve primary buttons for the most important action.",
              example: "text-heading / text-subtitle / text-metric",
            },
            {
              title: "Make space predictable",
              description:
                "Use the 4px spacing scale. Panels use 20px padding, sections use 20px gaps, and the desktop page uses 32px gutters. Small screens use 20px gutters.",
              example: "p-5 / gap-5 / sm:p-8",
            },
            {
              title: "Design every state",
              description:
                "Use labeled error messages, explain empty results, disable unavailable actions, and provide visible keyboard focus. Never rely on color alone to convey status.",
              example: "aria-invalid / aria-describedby / :focus-visible",
            },
            {
              title: "Let the data tell the truth",
              description:
                "Sales totals and comparison percentages derive from the displayed series. Use solid and dashed lines to distinguish periods. Every chart includes its units and time range.",
              example: "SalesPoint[] → SalesChart → accessible table",
            },
            {
              title: "Keep motion purposeful",
              description:
                "Fast transitions communicate hover. Standard transitions handle navigation. Respect reduced-motion preferences and keep chart updates immediate.",
              example: "--duration-fast / --duration-normal / --ease-standard",
            },
          ].map(({ title, description, example }) => (
            <Panel key={title} className="p-6">
              <Typography
                color="foreground"
                as="h2"
                variant="subtitle"
                className="font-semibold"
              >
                {title}
              </Typography>
              <Typography
                color="muted-foreground"
                as="p"
                variant="body"
                className="mt-3 leading-relaxed"
              >
                {description}
              </Typography>
              <Typography
                color="foreground"
                as="code"
                variant="caption"
                className="mt-5 block overflow-x-auto rounded-md border bg-muted p-3"
              >
                {example}
              </Typography>
            </Panel>
          ))}
        </div>
      )}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="A consistent conversation"
        description="A reusable dialog with sensible, accessible defaults."
      >
        <div className="rounded-lg border bg-muted p-4 text-body text-muted-foreground">
          <Typography color="muted-foreground" as="span" variant="inherit">
            Use this pattern for focused details and short decisions. Press
            Escape to return to the component gallery.
          </Typography>
        </div>
        <Button className="mt-5 w-full" onClick={() => setDialogOpen(false)}>
          <Typography color="inherit" as="span" variant="inherit">
            Got it
          </Typography>{" "}
          <Check />
        </Button>
      </Dialog>
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
    </AppShell>
  )
}
