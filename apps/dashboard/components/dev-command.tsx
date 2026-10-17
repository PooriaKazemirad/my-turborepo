"use client"

import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Typography } from "@workspace/ui/components/typography"

export function DevCommand() {
  const [status, setStatus] = useState("")

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText("pnpm dev")
      setStatus("Command copied.")
    } catch {
      setStatus("Select the command and copy it manually.")
    }
  }

  return (
    <div className="space-y-3">
      <Label color="foreground" htmlFor="dev-command">
        Start local development
      </Label>
      <div className="flex gap-2">
        <Input
          id="dev-command"
          readOnly
          value="pnpm dev"
          className="h-10 font-mono"
        />
        <Button type="button" onClick={copyCommand} className="h-10 px-4">
          <Typography color="inherit" as="span" variant="inherit">
            Copy
          </Typography>
        </Button>
      </div>
      <Typography
        color="muted-foreground"
        as="p"
        variant="label"
        role="status"
        aria-live="polite"
        className="min-h-5"
      >
        {status || "Run this command from the repository root."}
      </Typography>
    </div>
  )
}
