# Graph Report - my-turborepo  (2026-10-19)

## Corpus Check
- 168 files · ~53,203 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1366 nodes · 2772 edges · 70 communities (66 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.9)
- Token cost: unavailable (the agent interface does not expose actual usage).

## Community Hubs (Navigation)
- Reusable Chart Implementation
- Component Interaction Examples
- Shared Class and Message Utilities
- Design System Package Dependencies
- Dashboard Package Dependencies
- Responsive Sidebar Components
- UI Package Tooling
- Layout Providers and Feedback
- ESLint Package Dependencies
- UI Runtime Dependencies
- Workspace Scripts and Tooling
- Dropdown and Menu Components
- Dashboard Data and Identity
- Catalog and Control Examples
- Shell Buttons and Direction
- Workspace Build Tasks
- Form Fields and Controls
- Standalone Explorer and Dashboard
- Syntax Highlighting Pipeline
- Autocomplete and Combobox Inputs
- Base TypeScript Compiler Options
- Layout Component Examples
- Command and Dialog Components
- Dashboard Component Aliases
- Design System Component Aliases
- Workspace Architecture and Setup
- UI Component Aliases
- Item and Button Groups
- Dashboard TypeScript Configuration
- Design System TypeScript Configuration
- Linting and Validation Workflow
- Workspace Dependency Catalog
- Token Explorer and Tables
- Design Tokens and Typography
- Context Menu Components
- Drawer Component Composition
- Explorer State and Direction
- Chart API and Accessibility
- Carousel Component Controls
- Autocomplete Matching and Contracts
- Panel Composition and Types
- Typography and Greeting
- Alert Dialog Components
- Collapsible Trace Components
- Attachment Component Composition
- UI TypeScript Configuration
- Next.js TypeScript Configuration
- Molecule Composition and State
- Code Block Composition
- Input Groups and Utilities
- Shared ESLint Implementation
- Navigation Menu Components
- Select Component Options
- ESLint TypeScript Configuration
- Pagination Component Controls
- React Library TypeScript Configuration
- Empty State Components
- Layout and Chart Direction
- Avatar Component Composition
- Toggle Group Components
- Design Token Validation
- TypeScript Package Metadata
- Development Command Input
- Next.js Agent Documentation Rules
- UI PostCSS Configuration
- Badge Component Variants
- Workspace TypeScript Configuration

## God Nodes (most connected - your core abstractions)
1. `cn` - 394 edges
2. `Typography()` - 49 edges
3. `Button()` - 33 edges
4. `Standalone design system explorer` - 20 edges
5. `Workspace dependency catalog` - 18 edges

## Surprising Connections (you probably didn't know these)
- `TypeScript source package exports` --rationale_for--> `Dashboard application`  [EXTRACTED]
  packages/shadcn-ui/README.md → README.md
- `my-turborepo workspace` --references--> `pnpm workspace manifest`  [INFERRED]
  README.md → pnpm-workspace.yaml
- `Turborepo` --conceptually_related_to--> `Turbo 2.11.8`  [INFERRED]
  README.md → pnpm-workspace.yaml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Bidirectional standalone-app deployment contract** — readme_dashboard, readme_design_explorer, apps_design_system_readme_dashboard_url, apps_design_system_readme_design_system_url, apps_design_system_readme_dashboard_redirect [EXTRACTED 1.00]
- **Synchronized workspace and chart direction** — docs_design_system_workspace_direction, docs_design_system_base_direction, docs_charts_chart_direction [EXTRACTED 1.00]
- **Shared panel composition contract** — docs_design_system_panel, docs_design_system_panel_header, docs_design_system_panel_content, docs_design_system_panel_footer [EXTRACTED 1.00]
- **Foundation to semantic role to component usage** — docs_design_system_foundations, docs_design_system_semantic_roles, docs_design_system_globals_css [EXTRACTED 1.00]

## Communities (70 total, 4 thin omitted)

### Community 0 - "Reusable Chart Implementation"
Cohesion: 0.06
Nodes (76): radarSeries, series, skills, sources, traffic, ChartConfig, ChartContainer(), ChartContext (+68 more)

### Community 1 - "Component Interaction Examples"
Cohesion: 0.06
Nodes (48): Conversation(), questions, examples, Layout(), Navigation(), Overlays(), ExampleGroup, exampleGroups (+40 more)

### Community 2 - "Shared Class and Message Utilities"
Cohesion: 0.08
Nodes (43): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator(), buttonVariants (+35 more)

### Community 3 - "Design System Package Dependencies"
Cohesion: 0.05
Nodes (43): dependencies, lucide-react, next, react, react-dom, shadcn-ui, devDependencies, eslint (+35 more)

### Community 4 - "Dashboard Package Dependencies"
Cohesion: 0.05
Nodes (41): dependencies, lucide-react, next, react, react-dom, shadcn-ui, devDependencies, eslint (+33 more)

### Community 5 - "Responsive Sidebar Components"
Cohesion: 0.06
Nodes (36): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), Sidebar() (+28 more)

### Community 6 - "UI Package Tooling"
Cohesion: 0.05
Nodes (40): devDependencies, eslint, jiti, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+32 more)

### Community 7 - "Layout Providers and Feedback"
Cohesion: 0.07
Nodes (25): fontMono, fontSans, metadata, nextConfig, fontMono, fontSans, metadata, nextConfig (+17 more)

### Community 8 - "ESLint Package Dependencies"
Cohesion: 0.05
Nodes (36): @babel/core, @babel/eslint-parser, eslint-config-prettier, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-turbo, globals, @next/eslint-plugin-next (+28 more)

### Community 9 - "UI Runtime Dependencies"
Cohesion: 0.05
Nodes (37): @base-ui/react, class-variance-authority, cmdk, cn, date-fns, embla-carousel-react, input-otp, next-themes (+29 more)

### Community 10 - "Workspace Scripts and Tooling"
Cohesion: 0.06
Nodes (32): husky, devDependencies, husky, prettier, prettier-plugin-tailwindcss, turbo, typescript, @workspace/eslint-config (+24 more)

### Community 11 - "Dropdown and Menu Components"
Cohesion: 0.09
Nodes (26): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup() (+18 more)

### Community 12 - "Dashboard Data and Identity"
Cohesion: 0.11
Nodes (21): assets, Dashboard(), metricDefinitions, products, currency(), formatDate(), Order, orders (+13 more)

### Community 13 - "Catalog and Control Examples"
Cohesion: 0.10
Nodes (20): ChartExamples(), categories, categoryFor(), ComponentCatalog(), controlNames, conversationNames, feedbackNames, navigationNames (+12 more)

### Community 14 - "Shell Buttons and Direction"
Cohesion: 0.14
Nodes (16): AppShell(), navigation, searchEntries, Direction, DirectionSwitcher(), useWorkspaceDirection(), WorkspaceDirectionContext, WorkspaceDirectionProvider() (+8 more)

### Community 15 - "Workspace Build Tasks"
Cohesion: 0.08
Nodes (24): ^build, DASHBOARD_URL, DESIGN_SYSTEM_URL, .env*, ^lint, $TURBO_DEFAULT$, ^typecheck, dependsOn (+16 more)

### Community 16 - "Form Fields and Controls"
Cohesion: 0.14
Nodes (18): Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), FieldLegend(), FieldSeparator() (+10 more)

### Community 17 - "Standalone Explorer and Dashboard"
Cohesion: 0.11
Nodes (24): Dashboard port 3000, Dashboard design-system redirect, DASHBOARD_URL, Design-system bookmark compatibility, Design system port 3001, DESIGN_SYSTEM_URL, Interactive chart examples, Dashboard accessibility conventions (+16 more)

### Community 18 - "Syntax Highlighting Pipeline"
Cohesion: 0.10
Nodes (7): useHighlightedCode(), aliases, getHighlighter(), getLanguage(), highlightCode(), languages, loadHighlighter()

### Community 19 - "Autocomplete and Combobox Inputs"
Cohesion: 0.12
Nodes (18): ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent(), ComboboxEmpty(), ComboboxGroup(), ComboboxInput() (+10 more)

### Community 20 - "Base TypeScript Compiler Options"
Cohesion: 0.09
Nodes (22): compilerOptions, declaration, declarationMap, esModuleInterop, incremental, isolatedModules, lib, module (+14 more)

### Community 21 - "Layout Component Examples"
Cohesion: 0.15
Nodes (16): tasks, AspectRatio(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader() (+8 more)

### Community 22 - "Command and Dialog Components"
Cohesion: 0.12
Nodes (16): Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator() (+8 more)

### Community 23 - "Dashboard Component Aliases"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+11 more)

### Community 24 - "Design System Component Aliases"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+11 more)

### Community 25 - "Workspace Architecture and Setup"
Cohesion: 0.12
Nodes (20): Design system app configuration, Standalone design system setup guide, Reusable charts guide, Reusable charts guide, Modern Dashboard design system guide, Modern Admin Dashboard reference, Public Next.js dashboard implementation, Reusable chart families and gauge (+12 more)

### Community 26 - "UI Component Aliases"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+11 more)

### Community 27 - "Item and Button Groups"
Cohesion: 0.13
Nodes (17): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Item(), ItemActions(), ItemContent(), ItemDescription() (+9 more)

### Community 28 - "Dashboard TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, paths, plugins, exclude, extends, include, **/*.mts, next.config.ts (+10 more)

### Community 29 - "Design System TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, paths, plugins, exclude, extends, include, **/*.mts, next.config.ts (+10 more)

### Community 30 - "Linting and Validation Workflow"
Cohesion: 0.14
Nodes (18): Development validator exclusion, useSyncExternalStore subscriptions, Design system validation, Base flat ESLint configuration, Next.js ESLint configuration, React internal ESLint configuration, ESLint package guide, jiti configuration loader (+10 more)

### Community 31 - "Workspace Dependency Catalog"
Cohesion: 0.11
Nodes (18): Babel core ^8.0.7, Base UI React ^1.9.0, Built-dependency allowlist, Workspace dependency catalog, esbuild, ESLint ^10, jiti ^2.7.0, Tailwind PostCSS ^4 (+10 more)

### Community 32 - "Token Explorer and Tables"
Cohesion: 0.23
Nodes (11): Table(), TableBody(), TableCell(), TableHead(), TableHeader(), TableRow(), colorTokens, tokenGroups (+3 more)

### Community 33 - "Design Tokens and Typography"
Cohesion: 0.19
Nodes (16): 63 previews and 288 variants, Semantic cn class merger, Component catalog, Typed component example registry, Design foundations, Shared globals.css Tailwind mapping, Base UI Nova component registry, PersonAvatar (+8 more)

### Community 34 - "Context Menu Components"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubTrigger() (+1 more)

### Community 35 - "Drawer Component Composition"
Cohesion: 0.14
Nodes (10): DrawerContent(), DrawerContext, DrawerContextProps, DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerSwipeHandle() (+2 more)

### Community 36 - "Explorer State and Direction"
Cohesion: 0.16
Nodes (7): DesignSystem(), Direction, DirectionSwitcher(), useWorkspaceDirection(), WorkspaceDirectionContext, WorkspaceDirectionProvider(), setDirection()

### Community 37 - "Chart API and Accessibility"
Cohesion: 0.26
Nodes (14): AreaChart, BarChart, Chart keyboard and tabular accessibility, Chart rendering error boundary, shadcn chart primitives, Chart numeric validation, GaugeChart, LineChart (+6 more)

### Community 38 - "Carousel Component Controls"
Cohesion: 0.19
Nodes (13): Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions (+5 more)

### Community 39 - "Autocomplete Matching and Contracts"
Cohesion: 0.16
Nodes (11): AutocompleteFieldProps, AutocompleteOption, matchesAutocompleteOption(), normalize(), option, controlledField, invalidFocusSetting, invalidOption (+3 more)

### Community 40 - "Panel Composition and Types"
Cohesion: 0.19
Nodes (12): Panel(), PanelContent(), PanelContentProps, PanelFooter(), PanelFooterProps, PanelHeader(), PanelHeaderProps, PanelProps (+4 more)

### Community 41 - "Typography and Greeting"
Cohesion: 0.23
Nodes (9): Greeting(), subscribeToClock(), Typography(), TypographyColor, TypographyElement, TypographyProps, TypographyVariants, Assert (+1 more)

### Community 42 - "Alert Dialog Components"
Cohesion: 0.15
Nodes (9): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogMedia(), AlertDialogOverlay() (+1 more)

### Community 43 - "Collapsible Trace Components"
Cohesion: 0.19
Nodes (11): Collapsible(), CollapsibleContent(), CollapsibleTrigger(), Trace(), TraceCollapsible(), TraceCollapsibleContent(), TraceCollapsibleTrigger(), TraceDescription() (+3 more)

### Community 44 - "Attachment Component Composition"
Cohesion: 0.20
Nodes (11): Attachment(), AttachmentAction(), AttachmentActions(), AttachmentContent(), AttachmentDescription(), AttachmentGroup(), AttachmentMedia(), attachmentMediaVariants (+3 more)

### Community 45 - "UI TypeScript Configuration"
Cohesion: 0.17
Nodes (11): compilerOptions, paths, exclude, extends, include, node_modules, shadcn-ui/*, . (+3 more)

### Community 46 - "Next.js TypeScript Configuration"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, jsx, module, moduleResolution, noEmit, plugins, display (+3 more)

### Community 47 - "Molecule Composition and State"
Cohesion: 0.20
Nodes (11): Caller-owned chart interaction state, Dashboard application state boundary, AutocompleteField, Restricted-choice Combobox, Panel composition, PanelContent, PanelFooter, PanelHeader (+3 more)

### Community 48 - "Code Block Composition"
Cohesion: 0.22
Nodes (10): CodeBlock(), CodeBlockActions(), CodeBlockContent(), CodeBlockCopyButton(), CodeBlockFooter(), CodeBlockHeader(), CodeBlockLine(), codeBlockLineVariants (+2 more)

### Community 49 - "Input Groups and Utilities"
Cohesion: 0.25
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupText(), InputGroupTextarea(), Textarea()

### Community 50 - "Shared ESLint Implementation"
Cohesion: 0.33
Nodes (3): config, nextJsConfig, config

### Community 51 - "Navigation Menu Components"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuPositioner(), NavigationMenuTrigger() (+1 more)

### Community 52 - "Select Component Options"
Cohesion: 0.20
Nodes (9): SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger() (+1 more)

### Community 53 - "ESLint TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, noEmit, exclude, extends, include, node_modules, *.ts, @workspace/typescript-config/base.json

### Community 54 - "Pagination Component Controls"
Cohesion: 0.22
Nodes (7): Pagination(), PaginationContent(), PaginationEllipsis(), PaginationLink(), PaginationLinkProps, PaginationNext(), PaginationPrevious()

### Community 55 - "React Library TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, jsx, module, moduleResolution, display, extends, ./base.json, $schema

### Community 56 - "Empty State Components"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 57 - "Layout and Chart Direction"
Cohesion: 0.33
Nodes (7): Chart direction geometry, SalesChart, Sparkline, Base UI DirectionProvider, workspace-direction cookie, Logical layout direction, WorkspaceDirectionProvider

### Community 58 - "Avatar Component Composition"
Cohesion: 0.29
Nodes (6): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage()

### Community 59 - "Toggle Group Components"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 60 - "Design Token Validation"
Cohesion: 0.29
Nodes (3): css, dark, light

### Community 61 - "TypeScript Package Metadata"
Cohesion: 0.29
Nodes (6): license, name, private, publishConfig, access, version

### Community 63 - "Next.js Agent Documentation Rules"
Cohesion: 0.67
Nodes (3): Installed Next.js documentation, Next.js agent-file generator, Next.js agent rules

## Knowledge Gaps
- **418 isolated node(s):** `fontSans`, `fontMono`, `metadata`, `$schema`, `style` (+413 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn` connect charts, form controls, and application layout?**
  _High betweenness centrality (0.185) - this node is a cross-community bridge._
- **What connects `fontSans`, `fontMono`, `metadata` to the rest of the system?**
  _418 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Reusable Chart Implementation` be split into smaller, more focused modules?**
  _Cohesion score 0.05875077303648732 - nodes in this community are weakly interconnected._

## Extraction Integrity and Coverage

- Corpus: 168 files; 159 code files and 9 documents. All documents produced semantic output, including 5 cache hits and 4 fresh extractions.
- GRAPH HEALTH WARNING: 274 relationships have unresolved endpoints and are omitted from the built graph. See `unresolved-relationships.json`.
- GRAPH HEALTH WARNING: 53 additional relationships collapse onto existing endpoint pairs, including 18 exact duplicates. Relation variants may be lost. See `graph-health.json`.
- These are graph extraction limitations, not confirmed defects in project code.
- The sensitive-file filter skipped `packages/shadcn-ui/src/styles/tokens.css`; its contents were not analyzed.
- Real semantic token usage is unavailable. Zero values in cached extraction fragments are placeholders, not claims of zero usage.
- The HTML viewer loads vis-network from a public CDN and needs network access to that library.
