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

export default function Overlays({ name }: ExampleProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [project, setProject] = useState("Modern Dashboard")
  const [progress, setProgress] = useState(35)
  const [loading, setLoading] = useState(true)
  switch (name) {
    case "alert":
      return (
        <Alert>
          <Info aria-hidden="true" />
          <AlertTitle>
            <Text>You’re up to date</Text>
          </AlertTitle>
          <AlertDescription>
            <Text>All project changes have been saved.</Text>
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
            <A.AlertDialogContent>
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
            <D.DialogContent>
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
        <Drawer.Drawer showSwipeHandle>
          <Drawer.DrawerTrigger render={<Button variant="outline" />}>
            <Text>Open activity drawer</Text>
          </Drawer.DrawerTrigger>
          <Drawer.DrawerContent className="mx-auto max-w-md">
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
          <HoverCardContent>
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
          <PopoverContent>
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
          <Progress value={progress} aria-label="Sample import progress" />
          <Note>Import progress: {progress}%</Note>
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
            <S.SheetContent>
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
                <Skeleton className="h-9 w-9 rounded-full motion-reduce:animate-none" />
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
              title: "Preview saved",
              description: "Your sample action completed successfully.",
              type: "success",
            })
          }
        >
          <Text>Show success notification</Text>
        </Button>
      )
    case "tooltip":
      return (
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            <Text>Focus or hover for a hint</Text>
          </TooltipTrigger>
          <TooltipContent>
            <Text>Helpful context without interrupting your task.</Text>
          </TooltipContent>
        </Tooltip>
      )
    default:
      return null
  }
}
