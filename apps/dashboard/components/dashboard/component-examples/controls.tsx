"use client"

import { useId, useState } from "react"
import { Bold, Italic, Search, Underline } from "lucide-react"
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
  FieldLabel,
  FieldDescription,
  FieldError,
} from "shadcn-ui/components/atomic/field"
import { Input } from "shadcn-ui/components/atomic/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "shadcn-ui/components/atomic/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "shadcn-ui/components/atomic/input-otp"
import { Label } from "shadcn-ui/components/atomic/label"
import {
  NativeSelect,
  NativeSelectOption,
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

export default function Controls({ name }: ExampleProps) {
  const id = useId()
  const [message, setMessage] = useState("")
  const [checked, setChecked] = useState(true)
  const [text, setText] = useState("")
  const [choice, setChoice] = useState("monthly")
  const [framework, setFramework] = useState<string | null>(null)
  const [formats, setFormats] = useState<string[]>(["bold"])
  const [amount, setAmount] = useState<number[]>([40])
  const [otp, setOtp] = useState("")
  const [touched, setTouched] = useState(false)

  switch (name) {
    case "button":
      return (
        <>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setMessage("Changes saved in this preview.")}
            >
              <Text>Save</Text>
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
          <ButtonGroup aria-label="Preview zoom">
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
            <Checkbox id={id} checked={checked} onCheckedChange={setChecked} />
            <Label htmlFor={id}>Receive project updates</Label>
          </div>
          <Note>{checked ? "Updates enabled." : "Updates disabled."}</Note>
        </>
      )
    case "combobox":
      return (
        <>
          <Combobox
            items={["Next.js", "React", "Vue", "Svelte"]}
            value={framework}
            onValueChange={setFramework}
          >
            <ComboboxInput
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
        <Field data-invalid={(touched && !text.trim()) || undefined}>
          <FieldLabel htmlFor={id}>
            <Text>Workspace name</Text>
          </FieldLabel>
          <Input
            id={id}
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
      )
    case "input":
      return (
        <>
          <Label htmlFor={id}>Project name</Label>
          <Input
            id={id}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter a project name"
          />
          <Note>{text ? `Draft: ${text}` : "Type to update the draft."}</Note>
        </>
      )
    case "input-group":
      return (
        <>
          <InputGroup>
            <InputGroupAddon>
              <Search aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
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
            maxLength={4}
            value={otp}
            onChange={setOtp}
            aria-describedby={`${id}-hint`}
          >
            <InputOTPGroup>
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
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
          <Label htmlFor={id}>Click this label to focus the input</Label>
          <Input id={id} placeholder="Linked input" />
        </>
      )
    case "native-select":
      return (
        <>
          <Label htmlFor={id}>Report frequency</Label>
          <NativeSelect
            id={id}
            value={choice}
            onChange={(event) => setChoice(event.target.value)}
          >
            {["monthly", "quarterly", "yearly"].map((value) => (
              <NativeSelectOption value={value} key={value}>
                {value}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <Note>Frequency: {choice}</Note>
        </>
      )
    case "radio-group":
      return (
        <>
          <RadioGroup
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
            items={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
            value={choice}
            onValueChange={(value) => value && setChoice(value)}
          >
            <SelectTrigger aria-label="Choose report period" className="w-full">
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
            aria-labelledby={`${id}-label`}
            value={amount}
            onValueChange={(value) =>
              setAmount(typeof value === "number" ? [value] : [...value])
            }
            min={0}
            max={100}
          />
          <Note>Volume: {amount[0]}%</Note>
        </>
      )
    case "switch":
      return (
        <>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={id}>Email notifications</Label>
            <Switch id={id} checked={checked} onCheckedChange={setChecked} />
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
            multiple
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
