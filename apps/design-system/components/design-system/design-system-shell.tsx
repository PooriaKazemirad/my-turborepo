import type { ReactNode } from "react"
import Link from "next/link"
import { Layers } from "lucide-react"
import { ThemeToggle } from "shadcn-ui/components/molecules/theme-toggle"
import { Typography } from "shadcn-ui/components/atomic/typography"

export function DesignSystemShell({
  dashboardUrl,
  children,
}: {
  dashboardUrl: string
  children: ReactNode
}) {
  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:p-3"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b bg-card">
        <div className="mx-auto flex min-h-16 max-w-(--page-max-width) items-center justify-between gap-4 px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2.5 font-medium">
            <Layers className="size-5" aria-hidden="true" />
            <Typography as="span" weight="semibold">
              Design System
            </Typography>
          </Link>
          <nav
            aria-label="Application navigation"
            className="flex items-center gap-4"
          >
            <a
              href={dashboardUrl}
              className="text-label text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto max-w-(--page-max-width) p-5 outline-none md:p-8"
      >
        {children}
      </main>
      <footer className="mx-auto max-w-(--page-max-width) border-t px-5 py-5 text-caption text-muted-foreground md:px-8">
        Shared components, tokens, and patterns for Modern Dashboard.
      </footer>
    </div>
  )
}
