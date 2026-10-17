"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { Typography } from "@workspace/ui/components/typography"

function subscribeToClock(onChange: () => void) {
  const timer = setInterval(onChange, 60_000)
  return () => clearInterval(timer)
}

export function Greeting() {
  const hour = useSyncExternalStore(
    subscribeToClock,
    () => new Date().getHours(),
    () => -1
  )
  const greeting =
    hour < 0
      ? "Welcome back"
      : hour < 5
        ? "Good evening"
        : hour < 12
          ? "Good morning"
          : hour < 17
            ? "Good afternoon"
            : "Good evening"
  const Icon = hour >= 5 && hour < 17 ? Sun : Moon

  return (
    <div className="flex items-center gap-2.5">
      <Typography
        color="foreground"
        as="h1"
        variant="heading"
        className="leading-tight font-semibold tracking-tight"
      >
        {greeting}, Cameron
      </Typography>
      <Icon className="size-6 shrink-0 text-warning" strokeWidth={1.7} />
    </div>
  )
}
