"use client"

import { useState } from "react"
import { Check, FileText, Inbox, Plus } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "shadcn-ui/components/atomic/accordion"
import { AspectRatio } from "shadcn-ui/components/atomic/aspect-ratio"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "shadcn-ui/components/atomic/avatar"
import { Badge } from "shadcn-ui/components/atomic/badge"
import { Button } from "shadcn-ui/components/atomic/button"
import { Calendar } from "shadcn-ui/components/atomic/calendar"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "shadcn-ui/components/atomic/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "shadcn-ui/components/atomic/carousel"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "shadcn-ui/components/atomic/collapsible"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "shadcn-ui/components/atomic/empty"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "shadcn-ui/components/atomic/item"
import { Kbd, KbdGroup } from "shadcn-ui/components/atomic/kbd"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "shadcn-ui/components/atomic/resizable"
import { ScrollArea, ScrollBar } from "shadcn-ui/components/atomic/scroll-area"
import { Separator } from "shadcn-ui/components/atomic/separator"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "shadcn-ui/components/atomic/table"
import { Typography } from "shadcn-ui/components/atomic/typography"
import { BarChart } from "shadcn-ui/components/molecules/charts"
import { Text, Note } from "./shared"
import type { ExampleProps } from "./registry"
import { choice } from "./variants"

const tasks = [
  { name: "Design review", owner: "Emily", complete: true },
  { name: "Build preview", owner: "Ryan", complete: false },
]

export default function Layout({ name, variant }: ExampleProps) {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 16))
  const [added, setAdded] = useState(false)
  const [sort, setSort] = useState(false)
  switch (name) {
    case "accordion":
      return (
        <Accordion
          multiple={variant === "Multiple"}
          disabled={variant === "Disabled"}
          defaultValue={["details"]}
        >
          <AccordionItem value="details">
            <AccordionTrigger>
              <Text>Project details</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>One source for shared components and tokens.</Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="updates">
            <AccordionTrigger>
              <Text>Recent updates</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>New component previews are ready.</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    case "aspect-ratio":
      return (
        <>
          <AspectRatio
            ratio={variant === "1:1" ? 1 : variant === "4:3" ? 4 / 3 : 16 / 9}
            className="flex items-center justify-center rounded-lg border bg-secondary"
          >
            <Typography
              color="secondary-foreground"
              variant="title"
              weight="semibold"
            >
              {variant}
            </Typography>
          </AspectRatio>
          <Note>The preview keeps its proportions as the card resizes.</Note>
        </>
      )
    case "avatar":
      if (variant === "Group")
        return (
          <AvatarGroup>
            {["EC", "RS", "LP"].map((initials) => (
              <Avatar key={initials}>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        )
      return (
        <div className="flex items-center gap-3">
          {["EC", "RS", "LP"].map((initials) => (
            <Avatar
              size={
                variant === "Small"
                  ? "sm"
                  : variant === "Large"
                    ? "lg"
                    : "default"
              }
              key={initials}
              aria-label={
                initials === "EC"
                  ? "Emily Carter"
                  : initials === "RS"
                    ? "Ryan Scott"
                    : "Lisa Park"
              }
            >
              <AvatarFallback>
                <Text>{initials}</Text>
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      )
    case "badge":
      return (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={choice(
              variant,
              [
                "default",
                "secondary",
                "destructive",
                "outline",
                "ghost",
                "link",
              ],
              "default"
            )}
          >
            <Text>{variant}</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>Secondary</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Outline</Text>
          </Badge>
          <Badge variant="destructive">
            <Text>Attention</Text>
          </Badge>
        </div>
      )
    case "calendar":
      if (variant === "Multiple")
        return (
          <Calendar
            mode="multiple"
            defaultMonth={new Date(2026, 9, 1)}
            aria-label="Choose multiple dates"
          />
        )
      if (variant === "Range")
        return (
          <Calendar
            mode="range"
            defaultMonth={new Date(2026, 9, 1)}
            aria-label="Choose a date range"
          />
        )
      return (
        <>
          <div className="max-w-full overflow-x-auto">
            <Calendar
              mode="single"
              disabled={
                variant === "Disabled dates" ? { dayOfWeek: [0, 6] } : undefined
              }
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date(2026, 9, 1)}
              className="mx-auto"
            />
          </div>
          <Note>
            {date
              ? `Selected: ${date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`
              : "Choose a date."}
          </Note>
        </>
      )
    case "card":
      return (
        <Card size={variant === "Small" ? "sm" : "default"}>
          <CardHeader>
            <CardTitle>
              <Text>Team workspace</Text>
            </CardTitle>
            <CardDescription>Keep your project work together.</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Three collaborators · Two active projects</Text>
          </CardContent>
          <CardFooter>
            <Button size="sm" onClick={() => setAdded(!added)}>
              <Text>{added ? "Joined" : "Join workspace"}</Text>
            </Button>
          </CardFooter>
        </Card>
      )
    case "carousel":
      return (
        <div className={variant === "Vertical" ? "py-10" : "px-8"}>
          <Carousel
            orientation={variant === "Vertical" ? "vertical" : "horizontal"}
            className="w-full"
            opts={{ loop: true }}
          >
            <CarouselContent
              className={variant === "Vertical" ? "h-40" : undefined}
            >
              {["Discover", "Build", "Review"].map((title, index) => (
                <CarouselItem key={title}>
                  <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border bg-card">
                    <Typography color="foreground" variant="title">
                      {index + 1}
                    </Typography>
                    <Text>{title}</Text>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className={variant === "Vertical" ? "-top-8" : "-start-8"}
            />
            <CarouselNext
              className={variant === "Vertical" ? "-bottom-8" : "-end-8"}
            />
          </Carousel>
          <Note>Use the arrows or swipe to browse.</Note>
        </div>
      )
    case "chart":
      return (
        <BarChart
          label="Weekly sample visits"
          stacked={variant === "Stacked"}
          orientation={variant === "Horizontal" ? "horizontal" : "vertical"}
          labels={variant === "Labels"}
          loading={variant === "Loading"}
          error={
            variant === "Error" ? "Sample data could not be loaded." : undefined
          }
          data={
            variant === "Empty"
              ? []
              : [
                  { day: "Mon", visits: 12, returning: 8 },
                  { day: "Tue", visits: 24, returning: 14 },
                  { day: "Wed", visits: 18, returning: 10 },
                ]
          }
          categoryKey="day"
          series={[
            { dataKey: "visits", label: "Visits", color: "chart-1" },
            { dataKey: "returning", label: "Returning", color: "chart-2" },
          ]}
          height={150}
          legend={false}
          valueAxis={false}
        />
      )
    case "collapsible":
      return (
        <Collapsible
          defaultOpen={variant === "Open"}
          disabled={variant === "Disabled"}
        >
          <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
            <Text>Toggle project files</Text>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-3">
            <Note>design-tokens.json</Note>
            <Note>components.tsx</Note>
          </CollapsibleContent>
        </Collapsible>
      )
    case "empty":
      return added ? (
        <>
          <Note>First project created in this preview.</Note>
          <Button size="sm" variant="outline" onClick={() => setAdded(false)}>
            <Text>Reset example</Text>
          </Button>
        </>
      ) : (
        <Empty className={variant === "Bordered" ? "border p-3" : "p-3"}>
          <EmptyHeader>
            <EmptyMedia variant={variant === "Default" ? "default" : "icon"}>
              <Inbox aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>
              <Text>No projects yet</Text>
            </EmptyTitle>
            <EmptyDescription>
              Create your first project to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" onClick={() => setAdded(true)}>
              <Plus aria-hidden="true" />
              <Text>Create project</Text>
            </Button>
          </EmptyContent>
        </Empty>
      )
    case "item":
      return (
        <Item
          variant={choice(variant, ["default", "outline", "muted"], "default")}
          size={
            variant === "Small"
              ? "sm"
              : variant === "Extra small"
                ? "xs"
                : "default"
          }
        >
          <ItemMedia
            variant={
              variant === "Media default"
                ? "default"
                : variant === "Media image"
                  ? "image"
                  : "icon"
            }
          >
            {variant === "Media image" ? (
              <svg
                viewBox="0 0 40 40"
                role="img"
                aria-label="Sample document cover"
                className="size-full bg-secondary"
              >
                <rect
                  x="10"
                  y="6"
                  width="20"
                  height="28"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <FileText aria-hidden="true" />
            )}
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              <Text>Project brief</Text>
            </ItemTitle>
            <ItemDescription>Updated today</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Mark project brief as reviewed"
              aria-pressed={added}
              onClick={() => setAdded(!added)}
            >
              <Check aria-hidden="true" />
            </Button>
          </ItemActions>
        </Item>
      )
    case "kbd":
      if (variant === "Single") return <Kbd>Esc</Kbd>
      return (
        <>
          <KbdGroup>
            <Kbd>
              <Text>Ctrl</Text>
            </Kbd>
            <Text>+</Text>
            <Kbd>
              <Text>K</Text>
            </Kbd>
          </KbdGroup>
          <Note>Keyboard shortcuts use a compact, consistent treatment.</Note>
        </>
      )
    case "resizable":
      return (
        <>
          <ResizablePanelGroup
            orientation={variant === "Vertical" ? "vertical" : "horizontal"}
            className="h-64 rounded-lg border"
          >
            <ResizablePanel defaultSize="50%" minSize="25%">
              <div className="flex h-full items-center justify-center">
                <Text>Outline</Text>
              </div>
            </ResizablePanel>
            <ResizableHandle
              withHandle={variant !== "Without handle"}
              aria-label="Resize preview panels"
            />
            <ResizablePanel defaultSize="50%" minSize="25%">
              <div className="flex h-full items-center justify-center">
                <Text>Canvas</Text>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          <Note>Drag the divider or focus it and use the arrow keys.</Note>
        </>
      )
    case "scroll-area":
      return (
        <ScrollArea
          className="h-40 rounded-lg border"
          aria-label="Recent activity list"
          tabIndex={0}
        >
          <div
            className={
              variant === "Horizontal"
                ? "flex w-max gap-8 p-3"
                : "space-y-3 p-3"
            }
          >
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index}>
                <Text>Project update {index + 1}</Text>
                {index < 11 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
          {variant === "Horizontal" && <ScrollBar orientation="horizontal" />}
        </ScrollArea>
      )
    case "separator":
      if (variant === "Vertical")
        return (
          <div className="flex h-12 items-center gap-4">
            <Text>Design</Text>
            <Separator orientation="vertical" />
            <Text>Engineering</Text>
          </div>
        )
      return (
        <>
          <Text>Workspace details</Text>
          <Separator />
          <div className="flex h-6 items-center gap-3">
            <Text>Design</Text>
            <Separator orientation="vertical" />
            <Text>Engineering</Text>
          </div>
        </>
      )
    case "table":
      return (
        <Table>
          <TableCaption>Sample project tasks</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                scope="col"
                aria-sort={sort ? "ascending" : "descending"}
              >
                <button
                  onClick={() => setSort(!sort)}
                  aria-label="Sort tasks by name"
                >
                  <Text>Task {sort ? "↑" : "↓"}</Text>
                </button>
              </TableHead>
              <TableHead scope="col">Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(variant === "Empty" ? [] : [...tasks])
              .sort((a, b) =>
                sort
                  ? a.name.localeCompare(b.name)
                  : b.name.localeCompare(a.name)
              )
              .map((task) => (
                <TableRow
                  key={task.name}
                  data-state={
                    variant === "Selected row" && task.complete
                      ? "selected"
                      : undefined
                  }
                >
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.owner}</TableCell>
                </TableRow>
              ))}
            {variant === "Empty" && (
              <TableRow>
                <TableCell colSpan={2}>No tasks found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )
    default:
      return null
  }
}
