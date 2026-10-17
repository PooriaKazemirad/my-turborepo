"use client"

import { lazy, Suspense, useId, useState } from "react"
import { Button } from "shadcn-ui/components/atomic/button"
import { Skeleton } from "shadcn-ui/components/atomic/skeleton"
import { exampleGroups, type ExampleName, type ExampleGroup } from "./registry"
import { Text } from "./shared"

const examples = {
  controls: lazy(() => import("./controls")),
  layout: lazy(() => import("./layout")),
  navigation: lazy(() => import("./navigation")),
  overlays: lazy(() => import("./overlays")),
  conversation: lazy(() => import("./conversation")),
} satisfies Record<ExampleGroup, unknown>

export function ComponentExample({
  name,
  title,
}: {
  name: ExampleName
  title: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const Example = examples[exampleGroups[name]]
  return (
    <div className="mt-3" data-example={name}>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${open ? "Hide" : "Show"} ${title} example`}
        onClick={() => setOpen(!open)}
      >
        <Text>{open ? "Hide example" : "Show example"}</Text>
      </Button>
      {open && (
        <div
          id={id}
          role="region"
          aria-label={`${title} example`}
          className="mt-3 min-w-0 space-y-3 rounded-lg border bg-muted/20 p-3"
        >
          <Suspense
            fallback={
              <Skeleton aria-label="Loading example" className="h-24 w-full" />
            }
          >
            <Example name={name} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
