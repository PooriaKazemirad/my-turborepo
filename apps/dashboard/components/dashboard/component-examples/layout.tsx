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
import { Avatar, AvatarFallback } from "shadcn-ui/components/atomic/avatar"
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
import { ScrollArea } from "shadcn-ui/components/atomic/scroll-area"
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

const tasks = [
  { name: "Design review", owner: "Emily", complete: true },
  { name: "Build preview", owner: "Ryan", complete: false },
]

export default function Layout({ name }: ExampleProps) {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 16))
  const [added, setAdded] = useState(false)
  const [sort, setSort] = useState(false)
  switch (name) {
    case "accordion":
      return (
        <Accordion defaultValue={["details"]}>
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
            ratio={16 / 9}
            className="flex items-center justify-center rounded-lg border bg-secondary"
          >
            <Typography
              color="secondary-foreground"
              variant="title"
              weight="semibold"
            >
              16:9
            </Typography>
          </AspectRatio>
          <Note>The preview keeps its proportions as the card resizes.</Note>
        </>
      )
    case "avatar":
      return (
        <div className="flex items-center gap-3">
          {["EC", "RS", "LP"].map((initials) => (
            <Avatar
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
          <Badge>
            <Text>Default</Text>
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
      return (
        <>
          <div className="max-w-full overflow-x-auto">
            <Calendar
              mode="single"
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
        <Card>
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
        <div className="px-8">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
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
            <CarouselPrevious className="-start-8" />
            <CarouselNext className="-end-8" />
          </Carousel>
          <Note>Use the arrows or swipe to browse.</Note>
        </div>
      )
    case "chart":
      return (
        <BarChart
          label="Weekly sample visits"
          data={[
            { day: "Mon", visits: 12 },
            { day: "Tue", visits: 24 },
            { day: "Wed", visits: 18 },
          ]}
          categoryKey="day"
          series={[{ dataKey: "visits", label: "Visits", color: "chart-1" }]}
          height={150}
          legend={false}
          valueAxis={false}
        />
      )
    case "collapsible":
      return (
        <Collapsible>
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
        <Empty className="p-3">
          <EmptyHeader>
            <EmptyMedia variant="icon">
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
        <Item variant="outline">
          <ItemMedia variant="icon">
            <FileText aria-hidden="true" />
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
            orientation="horizontal"
            className="min-h-36 rounded-lg border"
          >
            <ResizablePanel defaultSize="50%" minSize="25%">
              <div className="flex h-full min-h-36 items-center justify-center">
                <Text>Outline</Text>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle aria-label="Resize preview panels" />
            <ResizablePanel defaultSize="50%" minSize="25%">
              <div className="flex h-full min-h-36 items-center justify-center">
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
          <div className="space-y-3 p-3">
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index}>
                <Text>Project update {index + 1}</Text>
                {index < 11 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      )
    case "separator":
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
            {[...tasks]
              .sort((a, b) =>
                sort
                  ? a.name.localeCompare(b.name)
                  : b.name.localeCompare(a.name)
              )
              .map((task) => (
                <TableRow key={task.name}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.owner}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )
    default:
      return null
  }
}
