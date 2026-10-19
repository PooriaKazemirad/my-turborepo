"use client"

import { useId, useState } from "react"
import { Bold, Italic, Search, Underline, Plus } from "lucide-react"
import { Spinner } from "shadcn-ui/components/atomic/spinner"
import { Button } from "shadcn-ui/components/atomic/button"
import { ButtonGroup } from "shadcn-ui/components/atomic/button-group"
import { Checkbox } from "shadcn-ui/components/atomic/checkbox"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "shadcn-ui/components/atomic/combobox"
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "shadcn-ui/components/atomic/field"
import { Input } from "shadcn-ui/components/atomic/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupButton,
} from "shadcn-ui/components/atomic/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "shadcn-ui/components/atomic/input-otp"
import { Label } from "shadcn-ui/components/atomic/label"
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "shadcn-ui/components/atomic/native-select"
import {
  RadioGroup,
  RadioGroupItem,
} from "shadcn-ui/components/atomic/radio-group"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "shadcn-ui/components/atomic/select"
import { Slider } from "shadcn-ui/components/atomic/slider"
import { Switch } from "shadcn-ui/components/atomic/switch"
import { Textarea } from "shadcn-ui/components/atomic/textarea"
import { Toggle } from "shadcn-ui/components/atomic/toggle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "shadcn-ui/components/atomic/toggle-group"
import { Note, Text } from "./shared"
import type { ExampleProps } from "./registry"
import { choice as variantChoice } from "./variants"

export default function Controls({ name, variant }: ExampleProps) {
  const id = useId()
  const [message, setMessage] = useState("")
  const [checked, setChecked] = useState(
    variant === "Checked" || variant === "On" || variant === "Pressed"
  )
  const [text, setText] = useState(
    variant === "Read only" ? "Saved project notes" : ""
  )
  const [choice, setChoice] = useState("monthly")
  const [framework, setFramework] = useState<string | null>(null)
  const [formats, setFormats] = useState<string[]>(["bold"])
  const [amount, setAmount] = useState<number[]>(
    variant === "Range" ? [20, 70] : [40]
  )
  const [otp, setOtp] = useState("")
  const [touched, setTouched] = useState(variant === "Invalid")
  const disabled = variant === "Disabled"
  const invalid = variant === "Invalid"
  const size =
    variant === "Small" ? "sm" : variant === "Large" ? "lg" : "default"

  switch (name) {
    case "button":
      return (
        <>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={variantChoice(
                variant,
                [
                  "default",
                  "outline",
                  "secondary",
                  "ghost",
                  "destructive",
                  "link",
                ],
                "default"
              )}
              size={
                variant === "Extra small"
                  ? "xs"
                  : variant === "Icon extra small"
                    ? "icon-xs"
                    : variant === "Icon small"
                      ? "icon-sm"
                      : variant === "Icon large"
                        ? "icon-lg"
                        : variant === "Icon"
                          ? "icon"
                          : size
              }
              disabled={disabled || variant === "Loading"}
              aria-label={
                variant.startsWith("Icon") ? "Add project" : undefined
              }
              onClick={() => setMessage("Changes saved in this preview.")}
            >
              {variant === "Loading" && <Spinner />}
              {variant.startsWith("Icon") ? (
                <Plus />
              ) : (
                <Text>{variant === "Loading" ? "Saving…" : "Save"}</Text>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setMessage("Preview cancelled.")}
            >
              <Text>Cancel</Text>
            </Button>
            <Button disabled>
              <Text>Disabled</Text>
            </Button>
          </div>
          <Note>{message || "Choose an action to see its result."}</Note>
        </>
      )
    case "button-group":
      return (
        <>
          <ButtonGroup
            orientation={variant === "Vertical" ? "vertical" : "horizontal"}
            aria-label="Preview zoom"
          >
            <Button
              variant="outline"
              aria-label="Zoom out"
              onClick={() => setAmount([Math.max(10, (amount[0] ?? 40) - 10)])}
            >
              <Text>−</Text>
            </Button>
            <Button variant="outline" onClick={() => setAmount([100])}>
              <Text>Reset</Text>
            </Button>
            <Button
              variant="outline"
              aria-label="Zoom in"
              onClick={() => setAmount([Math.min(200, (amount[0] ?? 40) + 10)])}
            >
              <Text>+</Text>
            </Button>
          </ButtonGroup>
          <Note>Zoom: {amount[0]}%</Note>
        </>
      )
    case "checkbox":
      return (
        <>
          <div className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={setChecked}
              indeterminate={variant === "Indeterminate"}
              disabled={disabled}
              aria-invalid={invalid}
            />
            <Label htmlFor={id}>Receive project updates</Label>
          </div>
          <Note>
            {variant === "Indeterminate"
              ? "Some updates selected."
              : checked
                ? "Updates enabled."
                : "Updates disabled."}
          </Note>
        </>
      )
    case "combobox":
      if (variant === "Multiple")
        return (
          <Combobox multiple items={["React", "Vue", "Svelte"]}>
            <ComboboxInput
              aria-label="Choose frameworks"
              placeholder="Choose multiple frameworks"
            />
            <ComboboxContent>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )
      return (
        <>
          <Combobox
            disabled={disabled}
            items={
              variant === "Empty" ? [] : ["Next.js", "React", "Vue", "Svelte"]
            }
            value={framework}
            onValueChange={setFramework}
          >
            <ComboboxInput
              aria-invalid={invalid}
              aria-label="Choose a framework"
              placeholder="Find a framework…"
              showClear
            />
            <ComboboxContent>
              <ComboboxEmpty>
                <Text>No matching framework.</Text>
              </ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    <Text>{item}</Text>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Note>
            {framework
              ? `Selected: ${framework}`
              : "Search or open the list to choose."}
          </Note>
        </>
      )
    case "field":
      return (
        <FieldSet>
          <FieldLegend
            variant={variant === "Label legend" ? "label" : "legend"}
          >
            Workspace details
          </FieldLegend>
          <FieldGroup>
            <Field
              orientation={variantChoice(
                variant,
                ["vertical", "horizontal", "responsive"],
                "vertical"
              )}
              data-disabled={disabled || undefined}
              data-invalid={(touched && !text.trim()) || undefined}
            >
              <FieldLabel htmlFor={id}>
                <Text>Workspace name</Text>
              </FieldLabel>
              <Input
                id={id}
                disabled={disabled}
                value={text}
                onChange={(event) => setText(event.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={touched && !text.trim()}
                aria-describedby={`${id}-description${touched && !text.trim() ? ` ${id}-error` : ""}`}
                placeholder="e.g. Product team"
              />
              <FieldDescription id={`${id}-description`}>
                Choose a recognizable name.
              </FieldDescription>
              {touched && !text.trim() && (
                <FieldError id={`${id}-error`}>
                  <Text>A workspace name is required.</Text>
                </FieldError>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>
      )
    case "input":
      return (
        <>
          <Label htmlFor={id}>Project name</Label>
          <Input
            id={id}
            value={variant === "File" ? undefined : text}
            onChange={(event) => setText(event.target.value)}
            disabled={disabled}
            aria-invalid={invalid}
            readOnly={variant === "Read only"}
            type={variantChoice(
              variant,
              ["password", "email", "number", "file", "text"],
              "text"
            )}
            placeholder="Enter a project name"
          />
          <Note>{text ? `Draft: ${text}` : "Type to update the draft."}</Note>
        </>
      )
    case "input-group":
      if (variant === "Textarea")
        return (
          <InputGroup>
            <InputGroupTextarea
              aria-label="Project description"
              placeholder="Describe your project…"
            />
            <InputGroupAddon align="block-end">
              Markdown supported
            </InputGroupAddon>
          </InputGroup>
        )
      return (
        <>
          <InputGroup>
            <InputGroupAddon
              align={variantChoice(
                variant,
                ["inline-start", "inline-end", "block-start", "block-end"],
                "inline-start"
              )}
            >
              {variant.startsWith("Button ") ? (
                <InputGroupButton
                  size={variantChoice(
                    variant.slice(7),
                    ["xs", "sm", "icon-xs", "icon-sm"],
                    "xs"
                  )}
                  aria-label="Search projects"
                  onClick={() => setText("Design system")}
                >
                  {variant.includes("icon") ? <Search /> : "Search"}
                </InputGroupButton>
              ) : (
                <Search aria-hidden="true" />
              )}
            </InputGroupAddon>
            <InputGroupInput
              disabled={disabled}
              aria-invalid={invalid}
              aria-label="Search project names"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Search projects…"
            />
          </InputGroup>
          <Note>
            {text
              ? `Searching for “${text}”`
              : "An icon and input share one focus ring."}
          </Note>
        </>
      )
    case "input-otp":
      return (
        <>
          <Label htmlFor={id}>Verification code</Label>
          <InputOTP
            id={id}
            disabled={disabled}
            aria-invalid={invalid}
            maxLength={4}
            value={otp}
            onChange={setOtp}
            aria-describedby={`${id}-hint`}
          >
            <InputOTPGroup>
              {(variant === "Grouped" ? [0, 1] : [0, 1, 2, 3]).map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
            {variant === "Grouped" && (
              <>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </>
            )}
          </InputOTP>
          <Note id={`${id}-hint`}>
            {otp.length === 4
              ? "Code complete. This preview does not submit it."
              : "Enter a four-character sample code."}
          </Note>
        </>
      )
    case "label":
      return (
        <>
          <Label htmlFor={id}>
            Project name {variant === "Required" && "(required)"}
          </Label>
          <Input
            id={id}
            disabled={disabled}
            required={variant === "Required"}
            placeholder="Linked input"
          />
        </>
      )
    case "native-select":
      return (
        <>
          <Label htmlFor={id}>Report frequency</Label>
          <NativeSelect
            size={variant === "Small" ? "sm" : "default"}
            disabled={disabled}
            aria-invalid={invalid}
            id={id}
            value={choice}
            onChange={(event) => setChoice(event.target.value)}
          >
            {["monthly", "quarterly", "yearly"].map((value) => (
              <NativeSelectOption value={value} key={value}>
                {value}
              </NativeSelectOption>
            ))}
            {variant === "Grouped" && (
              <NativeSelectOptGroup label="Custom">
                <NativeSelectOption value="weekly">Weekly</NativeSelectOption>
                <NativeSelectOption value="daily">Daily</NativeSelectOption>
              </NativeSelectOptGroup>
            )}
          </NativeSelect>
          <Note>Frequency: {choice}</Note>
        </>
      )
    case "radio-group":
      return (
        <>
          <RadioGroup
            disabled={disabled}
            aria-invalid={invalid}
            className={
              variant === "Horizontal" ? "flex flex-wrap gap-4" : undefined
            }
            aria-label="Workspace plan"
            value={choice}
            onValueChange={(value) => setChoice(String(value))}
          >
            {["starter", "team"].map((value) => (
              <div key={value} className="flex items-center gap-2">
                <RadioGroupItem id={`${id}-${value}`} value={value} />
                <Label htmlFor={`${id}-${value}`}>
                  {value === "starter" ? "Starter" : "Team"}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Note>
            {choice === "monthly"
              ? "Choose a plan."
              : `Selected plan: ${choice}`}
          </Note>
        </>
      )
    case "select":
      return (
        <>
          <Select
            disabled={disabled}
            items={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
            value={choice}
            onValueChange={(value) => value && setChoice(value)}
          >
            <SelectTrigger
              size={variant === "Small" ? "sm" : "default"}
              aria-invalid={invalid}
              aria-label="Choose report period"
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">
                <Text>Monthly</Text>
              </SelectItem>
              <SelectItem value="yearly">
                <Text>Yearly</Text>
              </SelectItem>
            </SelectContent>
          </Select>
          <Note>Selected: {choice}</Note>
        </>
      )
    case "slider":
      return (
        <>
          <Label id={`${id}-label`}>Volume</Label>
          <Slider
            disabled={disabled}
            orientation={variant === "Vertical" ? "vertical" : "horizontal"}
            className={variant === "Vertical" ? "h-40" : undefined}
            aria-labelledby={`${id}-label`}
            value={amount}
            onValueChange={(value) =>
              setAmount(typeof value === "number" ? [value] : [...value])
            }
            min={0}
            max={100}
          />
          <Note>Volume: {amount.join(" – ")}%</Note>
        </>
      )
    case "switch":
      return (
        <>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={id}>Email notifications</Label>
            <Switch
              id={id}
              size={variant === "Small" ? "sm" : "default"}
              disabled={disabled}
              checked={checked}
              onCheckedChange={setChecked}
            />
          </div>
          <Note>Notifications {checked ? "on" : "off"}.</Note>
        </>
      )
    case "textarea":
      return (
        <>
          <Label htmlFor={id}>Project notes</Label>
          <Textarea
            id={id}
            value={text}
            disabled={disabled}
            aria-invalid={invalid}
            readOnly={variant === "Read only"}
            maxLength={160}
            onChange={(event) => setText(event.target.value)}
            placeholder="Add a few details…"
          />
          <Note>{text.length}/160 characters</Note>
        </>
      )
    case "toggle":
      return (
        <>
          <Toggle
            variant={variant === "Outline" ? "outline" : "default"}
            size={size}
            disabled={disabled}
            aria-label="Bold text"
            pressed={checked}
            onPressedChange={setChecked}
          >
            <Bold aria-hidden="true" />
          </Toggle>
          <Note>Bold {checked ? "enabled" : "disabled"}.</Note>
        </>
      )
    case "toggle-group":
      return (
        <>
          <ToggleGroup
            multiple={variant !== "Single"}
            variant={variant === "Outline" ? "outline" : "default"}
            size={size}
            orientation={variant === "Vertical" ? "vertical" : "horizontal"}
            spacing={variant === "No spacing" ? 0 : 2}
            disabled={disabled}
            aria-label="Text formatting"
            value={formats}
            onValueChange={setFormats}
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold aria-hidden="true" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic aria-hidden="true" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline aria-hidden="true" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Note>
            {formats.length
              ? `Enabled: ${formats.join(", ")}`
              : "No formatting selected."}
          </Note>
        </>
      )
    default:
      return null
  }
}
