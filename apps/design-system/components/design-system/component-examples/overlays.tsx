"use client"

import { useId, useState } from "react"
import { Check, Info } from "lucide-react"
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "shadcn-ui/components/atomic/alert"
import * as A from "shadcn-ui/components/atomic/alert-dialog"
import * as D from "shadcn-ui/components/atomic/dialog"
import * as Drawer from "shadcn-ui/components/atomic/drawer"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "shadcn-ui/components/atomic/hover-card"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "shadcn-ui/components/atomic/popover"
import { Progress } from "shadcn-ui/components/atomic/progress"
import * as S from "shadcn-ui/components/atomic/sheet"
import { Skeleton } from "shadcn-ui/components/atomic/skeleton"
import { Spinner } from "shadcn-ui/components/atomic/spinner"
import { toast } from "shadcn-ui/components/atomic/toast"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "shadcn-ui/components/atomic/tooltip"
import { Button } from "shadcn-ui/components/atomic/button"
import { Input } from "shadcn-ui/components/atomic/input"
import { Label } from "shadcn-ui/components/atomic/label"
import { Text, Note } from "./shared"
import type { ExampleProps } from "./registry"
import { choice } from "./variants"

export default function Overlays({ name, variant }: ExampleProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [project, setProject] = useState("Modern Dashboard")
  const [progress, setProgress] = useState(
    variant === "Empty" ? 0 : variant === "Complete" ? 100 : 35
  )
  const [loading, setLoading] = useState(true)
  switch (name) {
    case "alert":
      return (
        <Alert variant={variant === "Destructive" ? "destructive" : "default"}>
          <Info aria-hidden="true" />
          <AlertTitle>
            <Text>
              {variant === "Destructive"
                ? "Changes could not be saved"
                : "You’re up to date"}
            </Text>
          </AlertTitle>
          <AlertDescription>
            <Text>
              {variant === "Destructive"
                ? "Review the connection and try again."
                : "All project changes have been saved."}
            </Text>
          </AlertDescription>
        </Alert>
      )
    case "alert-dialog":
      return (
        <>
          <A.AlertDialog open={open} onOpenChange={setOpen}>
            <A.AlertDialogTrigger render={<Button variant="outline" />}>
              <Text>Reset sample?</Text>
            </A.AlertDialogTrigger>
            <A.AlertDialogContent size={variant === "Small" ? "sm" : "default"}>
              <A.AlertDialogHeader>
                <A.AlertDialogTitle>
                  <Text>Reset the preview?</Text>
                </A.AlertDialogTitle>
                <A.AlertDialogDescription>
                  <Text>
                    This only resets this sample. Your workspace is unaffected.
                  </Text>
                </A.AlertDialogDescription>
              </A.AlertDialogHeader>
              <A.AlertDialogFooter>
                <A.AlertDialogCancel>
                  <Text>Keep sample</Text>
                </A.AlertDialogCancel>
                <A.AlertDialogAction
                  onClick={() => {
                    setMessage("Sample reset.")
                    setOpen(false)
                  }}
                >
                  <Text>Reset sample</Text>
                </A.AlertDialogAction>
              </A.AlertDialogFooter>
            </A.AlertDialogContent>
          </A.AlertDialog>
          <Note>
            {message || "A confirmation gives the user a clear choice."}
          </Note>
        </>
      )
    case "dialog":
      return (
        <>
          <D.Dialog open={open} onOpenChange={setOpen}>
            <D.DialogTrigger render={<Button variant="outline" />}>
              <Text>Edit sample project</Text>
            </D.DialogTrigger>
            <D.DialogContent showCloseButton={variant !== "Without close icon"}>
              <D.DialogHeader>
                <D.DialogTitle>
                  <Text>Edit project</Text>
                </D.DialogTitle>
                <D.DialogDescription>
                  <Text>Update this sample’s name, then save.</Text>
                </D.DialogDescription>
              </D.DialogHeader>
              <Label htmlFor={id}>Project name</Label>
              <Input
                id={id}
                value={project}
                onChange={(event) => setProject(event.target.value)}
              />
              <D.DialogFooter>
                <D.DialogClose render={<Button variant="outline" />}>
                  <Text>Cancel</Text>
                </D.DialogClose>
                <Button
                  onClick={() => {
                    setMessage(`Saved: ${project}`)
                    setOpen(false)
                  }}
                >
                  <Text>Save sample</Text>
                </Button>
              </D.DialogFooter>
            </D.DialogContent>
          </D.Dialog>
          <Note>
            {message || "Escape closes the dialog and restores focus."}
          </Note>
        </>
      )
    case "drawer":
      return (
        <Drawer.Drawer
          showSwipeHandle={variant !== "Without handle"}
          swipeDirection={choice(
            variant,
            ["down", "up", "left", "right"],
            "down"
          )}
          snapPoints={variant === "Snap points" ? [0.4, 0.8] : undefined}
        >
          <Drawer.DrawerTrigger render={<Button variant="outline" />}>
            <Text>Open activity drawer</Text>
          </Drawer.DrawerTrigger>
          <Drawer.DrawerContent>
            <Drawer.DrawerHeader>
              <Drawer.DrawerTitle>
                <Text>Recent activity</Text>
              </Drawer.DrawerTitle>
              <Drawer.DrawerDescription>
                <Text>Two sample updates from your team.</Text>
              </Drawer.DrawerDescription>
            </Drawer.DrawerHeader>
            <div className="space-y-3 px-4">
              <Note>Emily completed the design review.</Note>
              <Note>Ryan shared a new build.</Note>
            </div>
            <Drawer.DrawerFooter>
              <Drawer.DrawerClose render={<Button variant="outline" />}>
                <Text>Close drawer</Text>
              </Drawer.DrawerClose>
            </Drawer.DrawerFooter>
          </Drawer.DrawerContent>
        </Drawer.Drawer>
      )
    case "hover-card":
      return (
        <HoverCard>
          <HoverCardTrigger render={<Button variant="link" />}>
            <Text>Emily Carter</Text>
          </HoverCardTrigger>
          <HoverCardContent
            side={choice(variant, ["top", "bottom", "left", "right"], "bottom")}
            align={
              variant === "Start aligned"
                ? "start"
                : variant === "End aligned"
                  ? "end"
                  : "center"
            }
          >
            <div className="space-y-2">
              <Text>Emily Carter · Product designer</Text>
              <Note>Working on the shared component library.</Note>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    case "popover":
      return (
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            <Text>View workspace details</Text>
          </PopoverTrigger>
          <PopoverContent
            side={choice(variant, ["top", "bottom", "left", "right"], "bottom")}
            align={
              variant === "Start aligned"
                ? "start"
                : variant === "End aligned"
                  ? "end"
                  : "center"
            }
          >
            <PopoverHeader>
              <PopoverTitle>
                <Text>Product workspace</Text>
              </PopoverTitle>
              <PopoverDescription>
                <Text>Three collaborators and two active projects.</Text>
              </PopoverDescription>
            </PopoverHeader>
            <Note>Last updated today.</Note>
          </PopoverContent>
        </Popover>
      )
    case "progress":
      return (
        <>
          <Progress
            value={variant === "Indeterminate" ? null : progress}
            aria-label="Sample import progress"
          />
          <Note>
            {variant === "Indeterminate"
              ? "Waiting for progress…"
              : `Import progress: ${progress}%`}
          </Note>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setProgress(progress >= 100 ? 0 : Math.min(progress + 15, 100))
            }
          >
            <Text>
              {progress >= 100 ? "Restart preview" : "Advance progress"}
            </Text>
          </Button>
        </>
      )
    case "sheet":
      return (
        <>
          <S.Sheet>
            <S.SheetTrigger render={<Button variant="outline" />}>
              <Text>Open project sheet</Text>
            </S.SheetTrigger>
            <S.SheetContent
              side={choice(
                variant,
                [
                  "inline-start",
                  "inline-end",
                  "top",
                  "right",
                  "bottom",
                  "left",
                ],
                "inline-end"
              )}
              showCloseButton={variant !== "Without close icon"}
            >
              <S.SheetHeader>
                <S.SheetTitle>
                  <Text>Project summary</Text>
                </S.SheetTitle>
                <S.SheetDescription>
                  <Text>
                    A quick view without leaving the component library.
                  </Text>
                </S.SheetDescription>
              </S.SheetHeader>
              <div className="space-y-3 p-4">
                <Label htmlFor={id}>Sample project</Label>
                <Input
                  id={id}
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                />
              </div>
              <S.SheetFooter>
                <S.SheetClose render={<Button variant="outline" />}>
                  <Text>Close sheet</Text>
                </S.SheetClose>
              </S.SheetFooter>
            </S.SheetContent>
          </S.Sheet>
        </>
      )
    case "skeleton":
      return (
        <>
          <div className="space-y-2" aria-busy={loading}>
            {loading ? (
              <>
                {variant !== "Text" && (
                  <Skeleton
                    className={
                      variant === "Card"
                        ? "h-32 w-full rounded-lg motion-reduce:animate-none"
                        : "h-9 w-9 rounded-full motion-reduce:animate-none"
                    }
                  />
                )}
                <Skeleton className="h-3 w-3/4 motion-reduce:animate-none" />
                <Skeleton className="h-3 w-1/2 motion-reduce:animate-none" />
              </>
            ) : (
              <>
                <Text>Project overview</Text>
                <Note>Your content is ready.</Note>
              </>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLoading(!loading)}
          >
            <Text>
              {loading ? "Show loaded content" : "Show loading state"}
            </Text>
          </Button>
        </>
      )
    case "spinner":
      if (variant !== "In button")
        return (
          <Spinner
            aria-label="Loading preview"
            className={
              variant === "Small"
                ? "size-3"
                : variant === "Large"
                  ? "size-8"
                  : "size-4"
            }
          />
        )
      return (
        <>
          <Button variant="outline" onClick={() => setLoading(!loading)}>
            {loading ? (
              <Spinner
                aria-label="Loading preview"
                className="motion-reduce:animate-none"
              />
            ) : (
              <Check aria-hidden="true" />
            )}
            <Text>
              {loading ? "Stop loading preview" : "Start loading preview"}
            </Text>
          </Button>
          <Note>
            {loading
              ? "A visible status indicator accompanies the action."
              : "Preview complete."}
          </Note>
        </>
      )
    case "toast":
      return (
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              title: `${variant} notification`,
              description: "This notification is a component preview.",
              type: choice(
                variant,
                ["default", "success", "info", "warning", "error", "loading"],
                "default"
              ),
            })
          }
        >
          <Text>Show {variant.toLowerCase()} notification</Text>
        </Button>
      )
    case "tooltip":
      return (
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            <Text>Focus or hover for a hint</Text>
          </TooltipTrigger>
          <TooltipContent
            side={choice(variant, ["top", "bottom", "left", "right"], "top")}
            align={
              variant === "Start aligned"
                ? "start"
                : variant === "End aligned"
                  ? "end"
                  : "center"
            }
          >
            <Text>Helpful context without interrupting your task.</Text>
          </TooltipContent>
        </Tooltip>
      )
    default:
      return null
  }
}
