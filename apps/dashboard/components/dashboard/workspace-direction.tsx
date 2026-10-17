"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { Button } from "@workspace/ui/components/button"
import { Typography } from "@workspace/ui/components/typography"

type Direction = "ltr" | "rtl"

const WorkspaceDirectionContext = createContext<{
  direction: Direction
  setDirection: (direction: Direction) => void
} | null>(null)

export function WorkspaceDirectionProvider({
  initialDirection,
  children,
}: {
  initialDirection: Direction
  children: ReactNode
}) {
  const [direction, updateDirection] = useState(initialDirection)

  function setDirection(value: Direction) {
    document.documentElement.dir = value
    document.cookie = `workspace-direction=${value}; Path=/; Max-Age=31536000; SameSite=Lax`
    updateDirection(value)
  }

  return (
    <WorkspaceDirectionContext.Provider value={{ direction, setDirection }}>
      <DirectionProvider direction={direction}>{children}</DirectionProvider>
    </WorkspaceDirectionContext.Provider>
  )
}

export function useWorkspaceDirection() {
  const context = useContext(WorkspaceDirectionContext)
  if (!context) {
    throw new Error("Workspace direction requires WorkspaceDirectionProvider")
  }
  return context
}

export function DirectionSwitcher() {
  const { direction, setDirection } = useWorkspaceDirection()

  return (
    <div
      role="group"
      aria-label="Layout direction"
      className="inline-flex items-center gap-1 rounded-xl border bg-muted/50 p-1"
    >
      {(["ltr", "rtl"] as const).map((value) => (
        <Button
          key={value}
          type="button"
          variant={direction === value ? "secondary" : "ghost"}
          size="sm"
          aria-label={
            value === "rtl" ? "Right-to-left layout" : "Left-to-right layout"
          }
          aria-pressed={direction === value}
          onClick={() => setDirection(value)}
          className="h-9 px-3"
        >
          <Typography color="inherit" as="span" variant="inherit">
            {value.toUpperCase()}
          </Typography>
        </Button>
      ))}
    </div>
  )
}
