import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from "next/headers"
import { WorkspaceDirectionProvider } from "@/components/dashboard/workspace-direction"

import "shadcn-ui/globals.css"
import "./dashboard.css"
import { ThemeProvider } from "shadcn-ui/components/molecules/theme-provider"
import { TooltipProvider } from "shadcn-ui/components/atomic/tooltip"
import { Toaster } from "shadcn-ui/components/atomic/toast"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Modern Dashboard | Shadcn",
  description:
    "A considered workspace for your business. Analytics, projects, and orders built on a shared, tokenized design system.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const direction =
    (await cookies()).get("workspace-direction")?.value === "rtl"
      ? "rtl"
      : "ltr"

  return (
    <html
      lang="en"
      dir={direction}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
    >
      {/* Browser extensions may add body attributes before React hydrates. */}
      <body suppressHydrationWarning>
        <ThemeProvider>
          <WorkspaceDirectionProvider initialDirection={direction}>
            <TooltipProvider>
              <Toaster>{children}</Toaster>
            </TooltipProvider>
          </WorkspaceDirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
