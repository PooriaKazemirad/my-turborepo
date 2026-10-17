"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "./button"
import { Typography } from "./typography"

export function DetailDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-(--overlay) backdrop-blur-[2px]" />
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border bg-popover p-6 text-popover-foreground shadow-popover">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <DialogPrimitive.Title
                render={
                  <Typography
                    color="popover-foreground"
                    as="h2"
                    variant="title"
                    weight="semibold"
                  />
                }
              >
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description
                  render={
                    <Typography color="muted-foreground" variant="body" />
                  }
                  className="mt-1"
                >
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close dialog"
                />
              }
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
