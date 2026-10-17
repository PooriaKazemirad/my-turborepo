"use client"

import { useState } from "react"
import { Folder, Home, Search, Plus, MoreHorizontal } from "lucide-react"
import * as B from "shadcn-ui/components/atomic/breadcrumb"
import * as C from "shadcn-ui/components/atomic/command"
import * as Context from "shadcn-ui/components/atomic/context-menu"
import { DirectionProvider } from "shadcn-ui/components/atomic/direction"
import * as D from "shadcn-ui/components/atomic/dropdown-menu"
import * as M from "shadcn-ui/components/atomic/menubar"
import * as N from "shadcn-ui/components/atomic/navigation-menu"
import * as P from "shadcn-ui/components/atomic/pagination"
import * as S from "shadcn-ui/components/atomic/sidebar"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "shadcn-ui/components/atomic/tabs"
import { Button } from "shadcn-ui/components/atomic/button"
import {
  NativeSelect,
  NativeSelectOption,
} from "shadcn-ui/components/atomic/native-select"
import { Text, Note } from "./shared"
import type { ExampleProps } from "./registry"

export default function Navigation({ name }: ExampleProps) {
  const [message, setMessage] = useState("")
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState("overview")
  const [checked, setChecked] = useState(true)
  const choose = (label: string) =>
    setMessage(`${label} selected in this preview.`)
  switch (name) {
    case "breadcrumb":
      return (
        <>
          <B.Breadcrumb>
            <B.BreadcrumbList>
              <B.BreadcrumbItem>
                <B.BreadcrumbLink
                  href="#component-library"
                  onClick={(event) => {
                    event.preventDefault()
                    choose("Workspace")
                  }}
                >
                  <Text>Workspace</Text>
                </B.BreadcrumbLink>
              </B.BreadcrumbItem>
              <B.BreadcrumbSeparator />
              <B.BreadcrumbItem>
                <B.BreadcrumbPage>
                  <Text>Projects</Text>
                </B.BreadcrumbPage>
              </B.BreadcrumbItem>
            </B.BreadcrumbList>
          </B.Breadcrumb>
          <Note>{message || "A clear path back to the parent view."}</Note>
        </>
      )
    case "command":
      return (
        <>
          <C.Command className="rounded-lg border">
            <C.CommandInput
              placeholder="Search commands…"
              aria-label="Search preview commands"
            />
            <C.CommandList className="max-h-40">
              <C.CommandEmpty>
                <Text>No command found.</Text>
              </C.CommandEmpty>
              <C.CommandGroup heading="Workspace">
                <C.CommandItem onSelect={() => choose("Open projects")}>
                  <Folder aria-hidden="true" />
                  <Text>Open projects</Text>
                </C.CommandItem>
                <C.CommandItem onSelect={() => choose("Search workspace")}>
                  <Search aria-hidden="true" />
                  <Text>Search workspace</Text>
                </C.CommandItem>
              </C.CommandGroup>
            </C.CommandList>
          </C.Command>
          <Note>{message || "Search, then choose a command with Enter."}</Note>
        </>
      )
    case "context-menu":
      return (
        <>
          <Context.ContextMenu>
            <Context.ContextMenuTrigger
              className="flex h-24 items-center justify-center rounded-lg border border-dashed text-center"
              tabIndex={0}
            >
              <Text>Right-click here, or press Shift+F10</Text>
            </Context.ContextMenuTrigger>
            <Context.ContextMenuContent>
              <Context.ContextMenuItem onClick={() => choose("Open")}>
                <Text>Open project</Text>
              </Context.ContextMenuItem>
              <Context.ContextMenuItem onClick={() => choose("Duplicate")}>
                <Text>Duplicate</Text>
              </Context.ContextMenuItem>
              <Context.ContextMenuSub>
                <Context.ContextMenuSubTrigger>
                  <Text>Export format</Text>
                </Context.ContextMenuSubTrigger>
                <Context.ContextMenuSubContent>
                  <Context.ContextMenuItem onClick={() => choose("PDF export")}>
                    <Text>PDF</Text>
                  </Context.ContextMenuItem>
                  <Context.ContextMenuItem onClick={() => choose("CSV export")}>
                    <Text>CSV</Text>
                  </Context.ContextMenuItem>
                </Context.ContextMenuSubContent>
              </Context.ContextMenuSub>
              <Context.ContextMenuSeparator />
              <Context.ContextMenuItem disabled>
                <Text>Archive unavailable</Text>
              </Context.ContextMenuItem>
            </Context.ContextMenuContent>
          </Context.ContextMenu>
          <Note>{message || "Contextual actions stay close to the item."}</Note>
        </>
      )
    case "direction":
      return (
        <>
          <NativeSelect
            aria-label="Example reading direction"
            value={direction}
            onChange={(event) =>
              setDirection(event.target.value as "ltr" | "rtl")
            }
          >
            <NativeSelectOption value="ltr">Left to right</NativeSelectOption>
            <NativeSelectOption value="rtl">Right to left</NativeSelectOption>
          </NativeSelect>
          <DirectionProvider direction={direction}>
            <div
              dir={direction}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <Home aria-hidden="true" className="size-4" />
              <Text>
                {direction === "ltr"
                  ? "Welcome to your workspace"
                  : "به فضای کاری خوش آمدید"}
              </Text>
            </div>
          </DirectionProvider>
          <Note>This changes only the example.</Note>
        </>
      )
    case "dropdown-menu":
      return (
        <>
          <D.DropdownMenu>
            <D.DropdownMenuTrigger render={<Button variant="outline" />}>
              <Text>Project actions</Text>
            </D.DropdownMenuTrigger>
            <D.DropdownMenuContent>
              <D.DropdownMenuItem onClick={() => choose("Rename")}>
                <Text>Rename project</Text>
              </D.DropdownMenuItem>
              <D.DropdownMenuItem onClick={() => choose("Duplicate")}>
                <Text>Duplicate project</Text>
              </D.DropdownMenuItem>
              <D.DropdownMenuSub>
                <D.DropdownMenuSubTrigger>
                  <Text>Export format</Text>
                </D.DropdownMenuSubTrigger>
                <D.DropdownMenuSubContent>
                  <D.DropdownMenuItem onClick={() => choose("PDF export")}>
                    <Text>PDF</Text>
                  </D.DropdownMenuItem>
                  <D.DropdownMenuItem onClick={() => choose("CSV export")}>
                    <Text>CSV</Text>
                  </D.DropdownMenuItem>
                </D.DropdownMenuSubContent>
              </D.DropdownMenuSub>
              <D.DropdownMenuSeparator />
              <D.DropdownMenuCheckboxItem
                checked={checked}
                onCheckedChange={setChecked}
              >
                <Text>Show activity</Text>
              </D.DropdownMenuCheckboxItem>
            </D.DropdownMenuContent>
          </D.DropdownMenu>
          <Note>
            {message || `Activity ${checked ? "visible" : "hidden"}.`}
          </Note>
        </>
      )
    case "menubar":
      return (
        <>
          <M.Menubar>
            <M.MenubarMenu>
              <M.MenubarTrigger>
                <Text>File</Text>
              </M.MenubarTrigger>
              <M.MenubarContent>
                <M.MenubarItem onClick={() => choose("New project")}>
                  <Text>New project</Text>
                </M.MenubarItem>
                <M.MenubarItem onClick={() => choose("Open project")}>
                  <Text>Open project</Text>
                </M.MenubarItem>
              </M.MenubarContent>
            </M.MenubarMenu>
            <M.MenubarMenu>
              <M.MenubarTrigger>
                <Text>View</Text>
              </M.MenubarTrigger>
              <M.MenubarContent>
                <M.MenubarSub>
                  <M.MenubarSubTrigger>
                    <Text>Density</Text>
                  </M.MenubarSubTrigger>
                  <M.MenubarSubContent>
                    <M.MenubarItem
                      onClick={() => choose("Comfortable density")}
                    >
                      <Text>Comfortable</Text>
                    </M.MenubarItem>
                    <M.MenubarItem onClick={() => choose("Compact density")}>
                      <Text>Compact</Text>
                    </M.MenubarItem>
                  </M.MenubarSubContent>
                </M.MenubarSub>
                <M.MenubarCheckboxItem
                  checked={checked}
                  onCheckedChange={setChecked}
                >
                  <Text>Show sidebar</Text>
                </M.MenubarCheckboxItem>
              </M.MenubarContent>
            </M.MenubarMenu>
          </M.Menubar>
          <Note>{message || `Sidebar ${checked ? "shown" : "hidden"}.`}</Note>
        </>
      )
    case "navigation-menu":
      return (
        <>
          <N.NavigationMenu>
            <N.NavigationMenuList>
              <N.NavigationMenuItem>
                <N.NavigationMenuTrigger>
                  <Text>Resources</Text>
                </N.NavigationMenuTrigger>
                <N.NavigationMenuContent className="min-w-44 p-2">
                  <N.NavigationMenuLink
                    href="#component-library"
                    onClick={(event) => {
                      event.preventDefault()
                      choose("Documentation")
                    }}
                  >
                    <Text>Documentation</Text>
                  </N.NavigationMenuLink>
                  <N.NavigationMenuLink
                    href="#component-library"
                    onClick={(event) => {
                      event.preventDefault()
                      choose("Examples")
                    }}
                  >
                    <Text>Examples</Text>
                  </N.NavigationMenuLink>
                </N.NavigationMenuContent>
              </N.NavigationMenuItem>
            </N.NavigationMenuList>
          </N.NavigationMenu>
          <Note>{message || "Open the menu to explore related views."}</Note>
        </>
      )
    case "pagination":
      return (
        <>
          <P.Pagination aria-label="Preview result pages">
            <P.PaginationContent>
              {[1, 2, 3].map((number) => (
                <P.PaginationItem key={number}>
                  <P.PaginationLink
                    href="#component-library"
                    isActive={page === number}
                    aria-label={`Preview page ${number}`}
                    onClick={(event) => {
                      event.preventDefault()
                      setPage(number)
                    }}
                  >
                    <Text>{number}</Text>
                  </P.PaginationLink>
                </P.PaginationItem>
              ))}
            </P.PaginationContent>
          </P.Pagination>
          <Note>
            Showing sample items {(page - 1) * 5 + 1}–{page * 5} of 15.
          </Note>
        </>
      )
    case "sidebar":
      return (
        <>
          <S.SidebarProvider className="min-h-0">
            <S.Sidebar collapsible="none" className="w-full rounded-lg border">
              <S.SidebarHeader>
                <Text>Preview workspace</Text>
              </S.SidebarHeader>
              <S.SidebarContent>
                <S.SidebarGroup>
                  <S.SidebarGroupLabel>
                    <Text>Navigation</Text>
                  </S.SidebarGroupLabel>
                  <S.SidebarGroupAction
                    aria-label="Add sample navigation group"
                    onClick={() => choose("New group")}
                  >
                    <Plus aria-hidden="true" />
                  </S.SidebarGroupAction>
                  <S.SidebarMenu>
                    {["overview", "projects"].map((value) => (
                      <S.SidebarMenuItem key={value}>
                        <S.SidebarMenuButton
                          isActive={selected === value}
                          onClick={() => setSelected(value)}
                        >
                          {value === "overview" ? (
                            <Home aria-hidden="true" />
                          ) : (
                            <Folder aria-hidden="true" />
                          )}
                          <Text>
                            {value === "overview" ? "Overview" : "Projects"}
                          </Text>
                        </S.SidebarMenuButton>
                        {value === "overview" ? (
                          <S.SidebarMenuBadge>
                            <Text>3</Text>
                          </S.SidebarMenuBadge>
                        ) : (
                          <>
                            <S.SidebarMenuAction
                              aria-label="Sample project options"
                              onClick={() => choose("Project options")}
                            >
                              <MoreHorizontal aria-hidden="true" />
                            </S.SidebarMenuAction>
                            <S.SidebarMenuSub>
                              <S.SidebarMenuSubItem>
                                <S.SidebarMenuSubButton
                                  href="#component-library"
                                  isActive={selected === "all projects"}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    setSelected("all projects")
                                  }}
                                >
                                  <Text>All projects</Text>
                                </S.SidebarMenuSubButton>
                              </S.SidebarMenuSubItem>
                            </S.SidebarMenuSub>
                          </>
                        )}
                      </S.SidebarMenuItem>
                    ))}
                  </S.SidebarMenu>
                </S.SidebarGroup>
              </S.SidebarContent>
            </S.Sidebar>
          </S.SidebarProvider>
          <Note>
            Active view: {selected}
            {message ? `. ${message}` : ""}
          </Note>
        </>
      )
    case "tabs":
      return (
        <Tabs defaultValue="overview">
          <TabsList aria-label="Project views">
            <TabsTrigger value="overview">
              <Text>Overview</Text>
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Text>Activity</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Note>Two tasks are ready for review.</Note>
          </TabsContent>
          <TabsContent value="activity">
            <Note>Emily updated the brief today.</Note>
          </TabsContent>
        </Tabs>
      )
    default:
      return null
  }
}
