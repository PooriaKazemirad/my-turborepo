"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { Button } from "@workspace/ui/components/button"
import { Typography } from "@workspace/ui/components/typography"

const themes = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
] as const

function subscribe() {
  return () => {}
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  // Keep the server and initial client render consistent before reading storage.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const selectedTheme = mounted ? (theme ?? "light") : "light"

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-1 rounded-xl border bg-muted/50 p-1"
    >
      {themes.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          type="button"
          variant={selectedTheme === value ? "secondary" : "ghost"}
          size="sm"
          aria-label={`${label} theme`}
          aria-pressed={selectedTheme === value}
          onClick={() => setTheme(value)}
          className="h-9 gap-2 px-3"
        >
          <Icon aria-hidden="true" className="size-4" />
          <Typography color="inherit" as="span" variant="inherit">
            {label}
          </Typography>
        </Button>
      ))}
    </div>
  )
}
