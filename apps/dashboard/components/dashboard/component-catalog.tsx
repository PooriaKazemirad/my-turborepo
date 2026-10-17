"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy, Search } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { Button } from "@workspace/ui/components/button"
import {
  AutocompleteField,
  type AutocompleteOption,
} from "@workspace/ui/components/autocomplete-field"
import { Calendar } from "@workspace/ui/components/calendar"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
} from "@workspace/ui/components/panel"
import { Input } from "@workspace/ui/components/input"
import { Progress } from "@workspace/ui/components/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Slider } from "@workspace/ui/components/slider"
import { Switch } from "@workspace/ui/components/switch"
import { toast } from "@workspace/ui/components/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { shadcnComponents } from "@workspace/ui/lib/component-catalog"
import { Typography } from "@workspace/ui/components/typography"

const controlNames = new Set([
  "button",
  "button-group",
  "checkbox",
  "combobox",
  "field",
  "input",
  "input-group",
  "input-otp",
  "label",
  "native-select",
  "radio-group",
  "select",
  "slider",
  "switch",
  "textarea",
  "toggle",
  "toggle-group",
])
const navigationNames = new Set([
  "breadcrumb",
  "command",
  "context-menu",
  "direction",
  "dropdown-menu",
  "menubar",
  "navigation-menu",
  "pagination",
  "sidebar",
  "tabs",
])
const feedbackNames = new Set([
  "alert",
  "alert-dialog",
  "dialog",
  "drawer",
  "hover-card",
  "popover",
  "progress",
  "sheet",
  "skeleton",
  "spinner",
  "toast",
  "tooltip",
])
const conversationNames = new Set([
  "attachment",
  "bubble",
  "code-block",
  "marker",
  "message",
  "message-scroller",
  "questionnaire",
  "trace",
])
const categories = [
  "All components",
  "Controls",
  "Navigation",
  "Layout & data",
  "Overlays & feedback",
  "Conversation & code",
]

function categoryFor(name: string) {
  if (controlNames.has(name)) return "Controls"
  if (navigationNames.has(name)) return "Navigation"
  if (feedbackNames.has(name)) return "Overlays & feedback"
  if (conversationNames.has(name)) return "Conversation & code"
  return "Layout & data"
}

function titleFor(name: string) {
  return name
    .split("-")
    .map((word) =>
      word === "otp"
        ? "OTP"
        : word === "kbd"
          ? "Keyboard"
          : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ")
}

const projectSuggestions = [
  {
    value: "modern-dashboard",
    label: "Modern Dashboard",
    description: "Analytics and reporting",
    keywords: ["admin", "charts"],
  },
  {
    value: "commerce",
    label: "Commerce Starter",
    description: "Storefront and checkout",
    keywords: ["shop", "store"],
  },
  {
    value: "design-system",
    label: "Design System",
    description: "Tokens and shared components",
    keywords: ["ui", "library"],
  },
  {
    value: "customer-portal",
    label: "Customer Portal",
    description: "Accounts and client services",
  },
  {
    value: "legacy",
    label: "Legacy Portal",
    description: "Archived project",
    disabled: true,
  },
] as const satisfies readonly AutocompleteOption[]

const ownerSuggestions = [
  { value: "emily", label: "Emily Carter", description: "Design" },
  { value: "ryan", label: "Ryan Scott", description: "Engineering" },
  { value: "jason", label: "Jason Miller", description: "Operations" },
] as const satisfies readonly AutocompleteOption[]

export function ComponentCatalog() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All components")
  const [copied, setCopied] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [archived, setArchived] = useState(false)
  const [period, setPeriod] = useState("monthly")
  const [completion, setCompletion] = useState<number[]>([65])
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 16))
  const [project, setProject] = useState("")
  const [owner, setOwner] = useState("")
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const [submittedProject, setSubmittedProject] = useState("")
  const visibleComponents = shadcnComponents.filter(
    (name) =>
      (category === "All components" || categoryFor(name) === category) &&
      `${name} ${titleFor(name)}`.toLowerCase().includes(query.toLowerCase())
  )

  async function copyPath(name: string) {
    const path = `@workspace/ui/components/${name}`
    try {
      await navigator.clipboard.writeText(path)
      setCopied(name)
      toast.add({
        title: "Import path copied",
        description: path,
        type: "success",
      })
    } catch {
      toast.add({
        title: "Component import path",
        description: path,
        type: "info",
      })
    }
  }

  return (
    <div className="space-y-5 lg:col-span-2">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            title="Controls in action"
            description="Try the installed components. Every control uses the shared theme."
          />
          <div className="space-y-6 p-5">
            <div className="flex items-center justify-between gap-4">
              <Label color="foreground" htmlFor="catalog-notifications">
                Enable notifications
              </Label>
              <Switch
                id="catalog-notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="catalog-archived"
                checked={archived}
                onCheckedChange={setArchived}
              />
              <Label color="foreground" htmlFor="catalog-archived">
                Include archived projects
              </Label>
            </div>
            <div className="space-y-2">
              <Label color="foreground" id="catalog-period-label">
                Reporting period
              </Label>
              <Select
                items={[
                  { label: "Monthly", value: "monthly" },
                  { label: "Quarterly", value: "quarterly" },
                  { label: "Yearly", value: "yearly" },
                ]}
                value={period}
                onValueChange={(value) => {
                  if (value) setPeriod(value)
                }}
              >
                <SelectTrigger
                  className="w-full"
                  aria-labelledby="catalog-period-label"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">
                    <Typography color="inherit" as="span" variant="inherit">
                      Monthly
                    </Typography>
                  </SelectItem>
                  <SelectItem value="quarterly">
                    <Typography color="inherit" as="span" variant="inherit">
                      Quarterly
                    </Typography>
                  </SelectItem>
                  <SelectItem value="yearly">
                    <Typography color="inherit" as="span" variant="inherit">
                      Yearly
                    </Typography>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label color="foreground" id="catalog-completion-label">
                  Project completion
                </Label>
                <Typography
                  color="muted-foreground"
                  as="span"
                  variant="label"
                  className="tabular-nums"
                >
                  {completion[0]}%
                </Typography>
              </div>
              <Slider
                aria-labelledby="catalog-completion-label"
                value={completion}
                onValueChange={(value) =>
                  setCompletion(Array.isArray(value) ? value : [value])
                }
                min={0}
                max={100}
              />
              <Progress
                value={completion[0] ?? 0}
                aria-label="Example project progress"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  toast.add({
                    title: "Your changes are saved",
                    description:
                      "This is a preview notification from the component library.",
                    type: "success",
                  })
                }
              >
                <Typography color="inherit" as="span" variant="inherit">
                  Preview toast
                </Typography>
              </Button>
              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" />}>
                  <Typography color="inherit" as="span" variant="inherit">
                    Hover for a hint
                  </Typography>
                </TooltipTrigger>
                <TooltipContent>
                  <Typography color="inherit" as="span" variant="inherit">
                    Helpful context, right when you need it.
                  </Typography>
                </TooltipContent>
              </Tooltip>
            </div>
            <Typography
              color="muted-foreground"
              as="p"
              variant="caption"
              role="status"
            >
              Notifications {notifications ? "on" : "off"} · Archived projects{" "}
              {archived ? "included" : "hidden"} ·{" "}
              {period.charAt(0).toUpperCase() + period.slice(1)} reports
            </Typography>
          </div>
        </Panel>
        <Panel>
          <PanelHeader
            title="Calendar & disclosure"
            description="Keyboard-friendly dates and expandable details."
          />
          <div className="flex flex-col items-center p-5">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date(2026, 9, 1)}
              className="rounded-lg border"
            />
            <Typography
              color="muted-foreground"
              as="p"
              variant="caption"
              className="mt-3"
            >
              {date
                ? `Selected: ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                : "Choose a date to get started."}
            </Typography>
            <Accordion defaultValue={["tokens"]} className="mt-4 w-full">
              <AccordionItem value="tokens">
                <AccordionTrigger>
                  <Typography color="inherit" as="span" variant="inherit">
                    Do these components use our design tokens?
                  </Typography>
                </AccordionTrigger>
                <AccordionContent>
                  <Typography color="inherit" as="span" variant="inherit">
                    Yes. Surfaces, text, focus states, borders, and semantic
                    colors inherit the active light or dark theme.
                  </Typography>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="accessibility">
                <AccordionTrigger>
                  <Typography color="inherit" as="span" variant="inherit">
                    Can I use them with a keyboard?
                  </Typography>
                </AccordionTrigger>
                <AccordionContent>
                  <Typography color="inherit" as="span" variant="inherit">
                    Base UI handles focus and keyboard navigation. Each
                    component also supports accessible labels and descriptions.
                  </Typography>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Panel>
      </div>

      <Panel aria-labelledby="autocomplete-demo-title">
        <PanelHeader
          title="Autocomplete field"
          titleProps={{ id: "autocomplete-demo-title" }}
          description="Type your own value or choose a suggestion. Use arrow keys and Enter to select."
          action={
            <Button
              variant="outline"
              aria-pressed={suggestionsLoading}
              onClick={() => setSuggestionsLoading(!suggestionsLoading)}
            >
              <Typography color="inherit" as="span" variant="inherit">
                {suggestionsLoading
                  ? "Finish loading preview"
                  : "Preview loading"}
              </Typography>
            </Button>
          }
        />
        <PanelContent>
          <form
            id="autocomplete-demo"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              setSubmittedProject(String(data.get("project") ?? ""))
            }}
            className="grid gap-6 sm:grid-cols-2"
          >
            <AutocompleteField
              label="Project"
              name="project"
              options={projectSuggestions}
              value={project}
              onValueChange={setProject}
              loading={suggestionsLoading}
              showOptionsOnFocus
              required
              placeholder="Find or name a project…"
              description="Focus to see suggestions, or search names, descriptions, and keywords such as “shop”."
            />
            <AutocompleteField
              label="Project owner"
              name="owner"
              required
              options={ownerSuggestions}
              showOptionsOnFocus={false}
              description="Suggestions open when you type or use the dropdown button."
              onValueChange={setOwner}
              error={
                !owner.trim()
                  ? "Enter an owner or choose a suggestion."
                  : undefined
              }
              placeholder="Find a person…"
            />
            <AutocompleteField
              label="Archived project"
              options={projectSuggestions}
              defaultValue="Legacy Portal"
              disabled
              description="This field is disabled."
            />
            <div className="flex items-end justify-end">
              <Button type="submit">
                <Typography color="inherit" as="span" variant="inherit">
                  Submit example
                </Typography>
              </Button>
            </div>
          </form>
        </PanelContent>
        <PanelFooter>
          <Typography
            color="muted-foreground"
            as="span"
            variant="inherit"
            role="status"
          >
            {submittedProject
              ? `Submitted project: ${submittedProject}`
              : "Suggestions are optional; the field submits the text you enter."}
          </Typography>
        </PanelFooter>
      </Panel>

      <Panel id="component-library">
        <PanelHeader
          title="The complete component library"
          description={`${shadcnComponents.length} installed shadcn components. Search by name or browse a category.`}
          action={
            <Typography
              color="muted-foreground"
              as="span"
              variant="caption"
              className="rounded-md border px-2 py-1"
            >
              Base UI · Nova
            </Typography>
          }
        />
        <div className="flex flex-wrap items-center gap-3 border-b p-5">
          <div className="relative min-w-40 flex-1">
            <Search className="absolute start-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              aria-label="Search components"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all components..."
              className="h-9 ps-9 text-label"
            />
          </div>
          <select
            aria-label="Component category"
            className="control-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <Typography
                color="inherit"
                as="option"
                variant="inherit"
                key={item}
              >
                {item}
              </Typography>
            ))}
          </select>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleComponents.map((name) => (
            <article key={name} className="min-w-0 rounded-lg border p-4">
              <div className="flex items-start justify-between gap-2">
                <Typography
                  color="foreground"
                  as="h3"
                  variant="body"
                  className="font-medium"
                >
                  {titleFor(name)}
                </Typography>
                <a
                  href={`https://ui.shadcn.com/docs/components/${name}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${titleFor(name)} documentation (opens in a new tab)`}
                  className="rounded text-muted-foreground hover:text-foreground"
                >
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
              <Typography
                color="muted-foreground"
                as="p"
                variant="caption"
                className="mt-1"
              >
                {categoryFor(name)}
              </Typography>
              <button
                onClick={() => copyPath(name)}
                aria-label={`Copy ${titleFor(name)} import path`}
                className="mt-4 flex w-full items-center justify-between gap-2 rounded-md border bg-muted px-2.5 py-2 text-start text-muted-foreground hover:text-foreground"
              >
                <Typography
                  color="inherit"
                  as="code"
                  dir="ltr"
                  variant="caption"
                  className="truncate"
                >
                  components/{name}
                </Typography>
                {copied === name ? (
                  <Check className="size-3 shrink-0 text-success" />
                ) : (
                  <Copy className="size-3 shrink-0" />
                )}
              </button>
            </article>
          ))}
        </div>
        {visibleComponents.length === 0 && (
          <div className="px-5 pb-8 text-center">
            <Typography
              color="foreground"
              as="p"
              variant="body"
              className="font-medium"
            >
              No components found
            </Typography>
            <Typography
              color="muted-foreground"
              as="p"
              variant="label"
              className="mt-1"
            >
              Try a different name or category.
            </Typography>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("")
                setCategory("All components")
              }}
            >
              <Typography color="inherit" as="span" variant="inherit">
                Clear filters
              </Typography>
            </Button>
          </div>
        )}
        <div className="border-t px-5 py-3 text-caption text-muted-foreground">
          <Typography color="muted-foreground" as="span" variant="inherit">
            Showing {visibleComponents.length} of {shadcnComponents.length}{" "}
            components
          </Typography>
        </div>
      </Panel>
    </div>
  )
}
