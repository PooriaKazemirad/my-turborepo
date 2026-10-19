"use client"

import { lazy, Suspense, useState } from "react"
import {
  NativeSelect,
  NativeSelectOption,
} from "shadcn-ui/components/atomic/native-select"
import { exampleVariants } from "./variants"
import { Skeleton } from "shadcn-ui/components/atomic/skeleton"
import { exampleGroups, type ExampleName, type ExampleGroup } from "./registry"

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
  const Example = examples[exampleGroups[name]]
  const variants = exampleVariants[name]
  const [variant, setVariant] = useState<string>(variants[0])
  return (
    <div
      role="region"
      aria-label={`${title} example`}
      className="mt-4 min-w-0 flex-1 space-y-3 rounded-lg border bg-muted/20 p-4"
      data-example={name}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
        <span className="text-caption text-muted-foreground">
          {variants.length} variants & states
        </span>
        <NativeSelect
          aria-label={`${title} variant`}
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
        >
          {variants.map((value) => (
            <NativeSelectOption key={value} value={value}>
              {value}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <Suspense
        fallback={
          <Skeleton
            aria-label={`Loading ${title} example`}
            className="h-24 w-full"
          />
        }
      >
        <Example key={variant} name={name} variant={variant} />
      </Suspense>
    </div>
  )
}
