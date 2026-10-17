# Graph Report - my-turborepo  (2026-10-18)

## Corpus Check
- Corpus is ~49,933 words - fits in a single context window. You may not need a graph.

## Summary
- 1216 nodes · 2546 edges · 66 communities (61 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.86)
- Token cost: unavailable (the agent interface does not expose real usage; zero placeholders are not measured usage).

## Community Hubs (Navigation)
- Reusable Chart Implementation
- Overlays and Feedback
- Responsive Sidebar Components
- Conversation and Navigation Examples
- Dashboard Package Dependencies
- UI Package Tooling
- ESLint Package Dependencies
- UI Runtime Dependencies
- Build Tasks and Explorer
- Form Selection Controls
- Dropdown and Menu Components
- Workspace Scripts and Tooling
- Class Utilities and Messages
- Autocomplete Input Composition
- Panel Catalog and Types
- Layout Component Examples
- Syntax Highlighting Pipeline
- Dashboard Data and Rendering
- Application Shell and Direction
- Base TypeScript Compiler Options
- Command and Dialog Components
- Dashboard Component Aliases
- UI Component Aliases
- Typography and Identity Components
- Dashboard TypeScript Configuration
- Form Fields and Grouping
- Questionnaire Navigation Controls
- Chart API and Accessibility
- Context Menu Components
- Design Tokens and Catalog
- Drawer Component Composition
- Carousel Component Controls
- Linting and Validation Workflow
- Workspace Architecture and Packages
- Alert Dialog Components
- Collapsible Trace Components
- Item Component Composition
- Attachment Component Composition
- UI TypeScript Configuration
- Next.js TypeScript Configuration
- Token Explorer Implementation
- Order Tables and Calendar
- Code Block Composition
- Navigation Menu Components
- Shared ESLint Implementation
- Reusable Molecule State Boundaries
- ESLint TypeScript Configuration
- Pagination Component Controls
- React Library TypeScript Configuration
- Empty State Components
- Autocomplete Type Contracts
- Layout and Chart Direction
- Toggle Group Components
- Design Token Validation
- TypeScript Package Metadata
- Autocomplete Matching Logic
- Workspace Build Dependency Policy
- Development Command Input
- Design System Documentation
- Theme Appearance and Hydration
- Next.js Agent Documentation Rules
- UI PostCSS Configuration
- Badge Component Variants
- Scroll Area Components
- Workspace TypeScript Configuration

## God Nodes (most connected - your core abstractions)
1. `cn` - 394 edges
2. `Typography()` - 47 edges
3. `Button()` - 33 edges
4. `compilerOptions` - 17 edges
5. `Reusable chart families` - 17 edges

## Surprising Connections (you probably didn't know these)
- `my-turborepo workspace` --conceptually_related_to--> `pnpm workspace manifest`  [INFERRED]
  README.md → pnpm-workspace.yaml
- `Dashboard application` --implements--> `Dashboard accessibility conventions`  [EXTRACTED]
  README.md → docs/design-system.md
- `Dashboard application` --references--> `Shared shadcn Table primitives`  [EXTRACTED]
  README.md → docs/design-system.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Synchronized workspace and chart direction** — docs_design_system_workspace_direction, docs_design_system_base_direction, docs_charts_chart_direction [EXTRACTED 1.00]
- **Shared panel composition contract** — docs_design_system_panel, docs_design_system_panel_header, docs_design_system_panel_content, docs_design_system_panel_footer [EXTRACTED 1.00]
- **Foundation to semantic role to component usage** — docs_design_system_foundations, docs_design_system_semantic_roles, docs_design_system_globals_css [EXTRACTED 1.00]

## Communities (66 total, 5 thin omitted)

### Community 0 - "Reusable Chart Implementation"
Cohesion: 0.06
Nodes (77): ChartExamples(), radarSeries, series, skills, sources, traffic, ChartConfig, ChartContainer() (+69 more)

### Community 1 - "Overlays and Feedback"
Cohesion: 0.07
Nodes (30): fontMono, fontSans, metadata, Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants (+22 more)

### Community 2 - "Responsive Sidebar Components"
Cohesion: 0.06
Nodes (38): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), Sidebar() (+30 more)

### Community 3 - "Conversation and Navigation Examples"
Cohesion: 0.08
Nodes (30): questions, ComponentExample(), examples, ExampleGroup, exampleGroups, ExampleName, ExampleProps, Note() (+22 more)

### Community 4 - "Dashboard Package Dependencies"
Cohesion: 0.05
Nodes (41): dependencies, lucide-react, next, react, react-dom, shadcn-ui, devDependencies, eslint (+33 more)

### Community 5 - "UI Package Tooling"
Cohesion: 0.05
Nodes (40): devDependencies, eslint, jiti, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+32 more)

### Community 6 - "ESLint Package Dependencies"
Cohesion: 0.05
Nodes (36): @babel/core, @babel/eslint-parser, eslint-config-prettier, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-turbo, globals, @next/eslint-plugin-next (+28 more)

### Community 7 - "UI Runtime Dependencies"
Cohesion: 0.05
Nodes (37): @base-ui/react, class-variance-authority, cmdk, cn, date-fns, embla-carousel-react, input-otp, next-themes (+29 more)

### Community 8 - "Build Tasks and Explorer"
Cohesion: 0.06
Nodes (28): metadata, DesignSystem(), nextConfig, ^build, .env*, ^lint, .next/**, !.next/cache/** (+20 more)

### Community 9 - "Form Selection Controls"
Cohesion: 0.10
Nodes (22): Checkbox(), InputOTP(), InputOTPGroup(), InputOTPSlot(), NativeSelect(), NativeSelectOptGroup(), NativeSelectOption(), NativeSelectProps (+14 more)

### Community 10 - "Dropdown and Menu Components"
Cohesion: 0.09
Nodes (26): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup() (+18 more)

### Community 11 - "Workspace Scripts and Tooling"
Cohesion: 0.06
Nodes (30): husky, devDependencies, husky, prettier, prettier-plugin-tailwindcss, turbo, typescript, @workspace/eslint-config (+22 more)

### Community 12 - "Class Utilities and Messages"
Cohesion: 0.11
Nodes (26): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator(), CalendarDayButton() (+18 more)

### Community 13 - "Autocomplete Input Composition"
Cohesion: 0.11
Nodes (24): ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent(), ComboboxEmpty(), ComboboxGroup(), ComboboxInput() (+16 more)

### Community 14 - "Panel Catalog and Types"
Cohesion: 0.10
Nodes (23): categories, categoryFor(), ComponentCatalog(), controlNames, conversationNames, feedbackNames, navigationNames, ownerSuggestions (+15 more)

### Community 15 - "Layout Component Examples"
Cohesion: 0.13
Nodes (18): tasks, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), AspectRatio(), Card(), CardAction() (+10 more)

### Community 16 - "Syntax Highlighting Pipeline"
Cohesion: 0.10
Nodes (7): useHighlightedCode(), aliases, getHighlighter(), getLanguage(), highlightCode(), languages, loadHighlighter()

### Community 17 - "Dashboard Data and Rendering"
Cohesion: 0.13
Nodes (15): assets, Dashboard(), metricDefinitions, products, currency(), formatDate(), Order, orders (+7 more)

### Community 18 - "Application Shell and Direction"
Cohesion: 0.16
Nodes (15): AppShell(), navigation, searchEntries, Direction, DirectionSwitcher(), useWorkspaceDirection(), WorkspaceDirectionContext, WorkspaceDirectionProvider() (+7 more)

### Community 19 - "Base TypeScript Compiler Options"
Cohesion: 0.09
Nodes (22): compilerOptions, declaration, declarationMap, esModuleInterop, incremental, isolatedModules, lib, module (+14 more)

### Community 20 - "Command and Dialog Components"
Cohesion: 0.12
Nodes (16): Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator() (+8 more)

### Community 21 - "Dashboard Component Aliases"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+11 more)

### Community 22 - "UI Component Aliases"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+11 more)

### Community 23 - "Typography and Identity Components"
Cohesion: 0.15
Nodes (14): Label(), Typography(), TypographyColor, TypographyElement, TypographyNativeProps, TypographyProps, PersonAvatar(), tones (+6 more)

### Community 24 - "Dashboard TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, paths, plugins, exclude, extends, include, node_modules, **/*.ts (+10 more)

### Community 25 - "Form Fields and Grouping"
Cohesion: 0.13
Nodes (16): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Field(), FieldContent(), FieldDescription(), FieldError() (+8 more)

### Community 26 - "Questionnaire Navigation Controls"
Cohesion: 0.15
Nodes (16): buttonVariants, Questionnaire(), QuestionnaireActions(), QuestionnaireChoice(), QuestionnaireChoiceDescription(), QuestionnaireChoices(), QuestionnaireDescription(), QuestionnaireError() (+8 more)

### Community 27 - "Chart API and Accessibility"
Cohesion: 0.22
Nodes (16): AreaChart, BarChart, Chart keyboard and tabular accessibility, Chart rendering error boundary, shadcn chart primitives, Chart numeric validation, GaugeChart, LineChart (+8 more)

### Community 28 - "Context Menu Components"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubTrigger() (+1 more)

### Community 29 - "Design Tokens and Catalog"
Cohesion: 0.19
Nodes (15): Interactive chart examples, Semantic cn class merger, Component catalog, Typed component example registry, Design foundations, Shared globals.css Tailwind mapping, Base UI Nova component registry, Semantic color and component roles (+7 more)

### Community 30 - "Drawer Component Composition"
Cohesion: 0.14
Nodes (10): DrawerContent(), DrawerContext, DrawerContextProps, DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerSwipeHandle() (+2 more)

### Community 31 - "Carousel Component Controls"
Cohesion: 0.19
Nodes (13): Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions (+5 more)

### Community 32 - "Linting and Validation Workflow"
Cohesion: 0.18
Nodes (13): Development validator exclusion, Base flat ESLint configuration, Next.js ESLint configuration, React internal ESLint configuration, ESLint package guide, jiti configuration loader, Babel TypeScript 7 parsing, Shared ESLint configuration (+5 more)

### Community 33 - "Workspace Architecture and Packages"
Cohesion: 0.18
Nodes (13): TypeScript source package exports, TypeScript configuration guide, Turborepo cache policy, Dashboard application, my-turborepo workspace, Next.js App Router, Node.js 22.14 or newer, pnpm 10.31.0 (+5 more)

### Community 34 - "Alert Dialog Components"
Cohesion: 0.15
Nodes (9): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogMedia(), AlertDialogOverlay() (+1 more)

### Community 35 - "Collapsible Trace Components"
Cohesion: 0.19
Nodes (11): Collapsible(), CollapsibleContent(), CollapsibleTrigger(), Trace(), TraceCollapsible(), TraceCollapsibleContent(), TraceCollapsibleTrigger(), TraceDescription() (+3 more)

### Community 36 - "Item Component Composition"
Cohesion: 0.18
Nodes (12): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemFooter(), ItemGroup(), ItemHeader(), ItemMedia() (+4 more)

### Community 37 - "Attachment Component Composition"
Cohesion: 0.20
Nodes (11): Attachment(), AttachmentAction(), AttachmentActions(), AttachmentContent(), AttachmentDescription(), AttachmentGroup(), AttachmentMedia(), attachmentMediaVariants (+3 more)

### Community 38 - "UI TypeScript Configuration"
Cohesion: 0.17
Nodes (11): compilerOptions, paths, exclude, extends, include, node_modules, shadcn-ui/*, . (+3 more)

### Community 39 - "Next.js TypeScript Configuration"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, jsx, module, moduleResolution, noEmit, plugins, display (+3 more)

### Community 40 - "Token Explorer Implementation"
Cohesion: 0.31
Nodes (6): shadcnComponents, colorTokens, tokenGroups, typographyTokens, componentSource, source

### Community 41 - "Order Tables and Calendar"
Cohesion: 0.35
Nodes (8): SortKey, Table(), TableBody(), TableCaption(), TableCell(), TableHead(), TableHeader(), TableRow()

### Community 42 - "Code Block Composition"
Cohesion: 0.22
Nodes (10): CodeBlock(), CodeBlockActions(), CodeBlockContent(), CodeBlockCopyButton(), CodeBlockFooter(), CodeBlockHeader(), CodeBlockLine(), codeBlockLineVariants (+2 more)

### Community 43 - "Navigation Menu Components"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuPositioner(), NavigationMenuTrigger() (+1 more)

### Community 44 - "Shared ESLint Implementation"
Cohesion: 0.36
Nodes (3): config, nextJsConfig, config

### Community 45 - "Reusable Molecule State Boundaries"
Cohesion: 0.25
Nodes (9): Caller-owned chart interaction state, Dashboard application state boundary, AutocompleteField, Restricted-choice Combobox, Panel composition, PanelContent, PanelFooter, PanelHeader (+1 more)

### Community 46 - "ESLint TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, noEmit, exclude, extends, include, node_modules, *.ts, @workspace/typescript-config/base.json

### Community 47 - "Pagination Component Controls"
Cohesion: 0.22
Nodes (7): Pagination(), PaginationContent(), PaginationEllipsis(), PaginationLink(), PaginationLinkProps, PaginationNext(), PaginationPrevious()

### Community 48 - "React Library TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, jsx, module, moduleResolution, display, extends, ./base.json, $schema

### Community 49 - "Empty State Components"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 50 - "Autocomplete Type Contracts"
Cohesion: 0.25
Nodes (7): AutocompleteFieldProps, controlledField, invalidFocusSetting, invalidOption, invalidValue, options, uncontrolledField

### Community 51 - "Layout and Chart Direction"
Cohesion: 0.33
Nodes (7): Chart direction geometry, SalesChart, Sparkline, Base UI DirectionProvider, workspace-direction cookie, Logical layout direction, WorkspaceDirectionProvider

### Community 52 - "Toggle Group Components"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 53 - "Design Token Validation"
Cohesion: 0.29
Nodes (3): css, dark, light

### Community 54 - "TypeScript Package Metadata"
Cohesion: 0.29
Nodes (6): license, name, private, publishConfig, access, version

### Community 55 - "Autocomplete Matching Logic"
Cohesion: 0.47
Nodes (4): AutocompleteOption, matchesAutocompleteOption(), normalize(), option

### Community 56 - "Workspace Build Dependency Policy"
Cohesion: 0.33
Nodes (6): Built-dependency allowlist, esbuild, sharp, unrs-resolver, apps/* and packages/* workspace membership, pnpm workspace manifest

### Community 58 - "Design System Documentation"
Cohesion: 0.50
Nodes (5): Reusable charts guide, Modern Dashboard design system guide, Modern Admin Dashboard reference, Design system validation, Shared UI package guide

### Community 59 - "Theme Appearance and Hydration"
Cohesion: 0.40
Nodes (5): next-themes, Stable theme hydration, Light Dark System appearance, ThemeProvider, ThemeSwitcher

### Community 60 - "Next.js Agent Documentation Rules"
Cohesion: 0.67
Nodes (3): Installed Next.js documentation, Next.js agent-file generator, Next.js agent rules

## Knowledge Gaps
- **345 isolated node(s):** `metadata`, `fontSans`, `fontMono`, `metadata`, `$schema` (+340 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn` connect `Class Utilities and Messages`, `Reusable Chart Implementation`, and `Overlays and Feedback`?**
  _High betweenness centrality (0.264) - this node is a cross-community bridge._
- **What connects `metadata`, `fontSans`, `fontMono` to the rest of the system?**
  _345 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Reusable Chart Implementation` be split into smaller, more focused modules?**
  _Cohesion score 0.05722772277227723 - nodes in this community are weakly interconnected._

## Extraction Integrity and Coverage

- The undirected graph contains 1,216 nodes and 2,546 edges from 147 code files and 8 documents.
- Graph health warning: 261 extracted relationships have dangling endpoints; the built graph omits them. These are extractor limitations, not confirmed defects in the project. See `unresolved-relationships.json`.
- Graph health warning: 50 additional relationships collapse onto existing endpoint pairs in the simple graph, including 18 exact duplicates. Relation variants may be lost. See `graph-health.json`.
- Missing endpoint fields: 0. Self-loops: 0. All 8 detected documents produced semantic output.
- The sensitive-file filter skipped `packages/shadcn-ui/src/styles/tokens.css`; its contents were not analyzed.
- Semantic token usage is unavailable because the collaboration interface did not provide usage counts. Values of zero in cached extraction records are placeholders, not zero-cost claims.
- The HTML viewer loads vis-network from a public CDN and requires network access to that library.
