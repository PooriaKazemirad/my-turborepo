"use client"

import {
  useId,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from "react"
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import { ChevronDown, LoaderCircle, X } from "lucide-react"
import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@workspace/ui/components/combobox"
import {
  Field,
  FieldDescription,
  FieldError,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Label } from "@workspace/ui/components/label"
import { Typography } from "@workspace/ui/components/typography"
import {
  matchesAutocompleteOption,
  type AutocompleteOption,
} from "@workspace/ui/lib/autocomplete"
import { cn } from "@workspace/ui/lib/utils"

type AutocompleteInputProps = Omit<
  ComponentPropsWithRef<"input">,
  | "id"
  | "ref"
  | "name"
  | "form"
  | "value"
  | "defaultValue"
  | "onChange"
  | "children"
  | "type"
  | "disabled"
  | "readOnly"
  | "required"
  | "aria-invalid"
>

export type AutocompleteFieldProps = {
  options: readonly AutocompleteOption[]
  label: ReactNode
  description?: ReactNode
  error?: ReactNode
  invalid?: boolean
  id?: string
  name?: string
  form?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSelect?: (option: AutocompleteOption) => void
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  clearable?: boolean
  /** Open suggestions on input focus or click. Defaults to false. */
  showOptionsOnFocus?: boolean
  loading?: boolean
  emptyMessage?: ReactNode
  loadingMessage?: ReactNode
  placeholder?: string
  className?: string
  inputProps?: AutocompleteInputProps
  ref?: Ref<HTMLInputElement>
  /** Use null for externally filtered suggestions, such as server search results. */
  filter?: ((option: AutocompleteOption, query: string) => boolean) | null
}

/** A free-text field with suggestions; form submission contains the typed label. */
export function AutocompleteField({
  options,
  label,
  description,
  error,
  invalid = false,
  id,
  name,
  form,
  value,
  defaultValue,
  onValueChange,
  onSelect,
  disabled = false,
  readOnly = false,
  required = false,
  clearable = true,
  showOptionsOnFocus = false,
  loading = false,
  emptyMessage = "No suggestions found. You can still enter your own value.",
  loadingMessage = "Loading suggestions…",
  placeholder = "Start typing…",
  className,
  inputProps,
  ref,
  filter = matchesAutocompleteOption,
}: AutocompleteFieldProps) {
  const generatedId = useId()
  const [open, setOpen] = useState(false)
  const anchor = useComboboxAnchor()
  const inputId = id ?? `autocomplete-${generatedId}`
  const hasDescription =
    description != null && description !== false && description !== ""
  const hasError = error != null && error !== false && error !== ""
  const isInvalid = invalid || hasError
  const { "aria-describedby": externalDescription, ...nativeInputProps } =
    inputProps ?? {}
  const describedBy =
    [
      hasDescription && `${inputId}-description`,
      hasError && `${inputId}-error`,
      externalDescription,
    ]
      .filter(Boolean)
      .join(" ") || undefined

  return (
    <Field
      data-slot="autocomplete-field"
      data-invalid={isInvalid || undefined}
      data-disabled={disabled || undefined}
      className={cn("gap-2", className)}
    >
      <Label color="foreground" id={`${inputId}-label`} htmlFor={inputId}>
        {label}
        {required && (
          <Typography
            color="danger"
            as="span"
            variant="inherit"
            aria-hidden="true"
          >
            *
          </Typography>
        )}
      </Label>
      <AutocompletePrimitive.Root<AutocompleteOption>
        open={open}
        onOpenChange={setOpen}
        items={loading ? [] : options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        itemToStringValue={(option) => option.label}
        filter={filter}
        name={name}
        form={form}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        openOnInputClick={showOptionsOnFocus && !readOnly}
      >
        <InputGroup ref={anchor}>
          <AutocompletePrimitive.Input
            render={<InputGroupInput />}
            autoComplete="off"
            {...nativeInputProps}
            onFocus={(event) => {
              nativeInputProps.onFocus?.(event)
              if (
                showOptionsOnFocus &&
                !disabled &&
                !readOnly &&
                !event.defaultPrevented
              ) {
                setOpen(true)
              }
            }}
            ref={ref}
            id={inputId}
            placeholder={placeholder}
            aria-describedby={describedBy}
            aria-invalid={isInvalid || undefined}
            aria-busy={loading || undefined}
          />
          <InputGroupAddon align="inline-end">
            {loading && (
              <LoaderCircle
                aria-hidden="true"
                className="size-4 animate-spin motion-reduce:animate-none"
              />
            )}
            {clearable && (
              <AutocompletePrimitive.Clear
                render={<InputGroupButton variant="ghost" size="icon-xs" />}
                aria-label="Clear input"
                disabled={disabled || readOnly}
              >
                <X aria-hidden="true" />
              </AutocompletePrimitive.Clear>
            )}
            <AutocompletePrimitive.Trigger
              render={<InputGroupButton variant="ghost" size="icon-xs" />}
              aria-label="Show suggestions"
              disabled={disabled || readOnly}
            >
              <ChevronDown aria-hidden="true" />
            </AutocompletePrimitive.Trigger>
          </InputGroupAddon>
        </InputGroup>
        <ComboboxContent anchor={anchor} className="min-w-(--anchor-width)">
          <ComboboxEmpty className="px-3 py-4">
            <Typography color="muted-foreground" as="span" variant="label">
              {loading ? loadingMessage : emptyMessage}
            </Typography>
          </ComboboxEmpty>
          <ComboboxList>
            {(option: AutocompleteOption) => (
              <ComboboxItem
                key={option.value}
                value={option}
                disabled={option.disabled}
                onClick={() => onSelect?.(option)}
              >
                <span className="min-w-0 py-1">
                  <Typography
                    color="inherit"
                    as="span"
                    variant="body"
                    className="block wrap-break-word"
                  >
                    {option.label}
                  </Typography>
                  {option.description && (
                    <Typography
                      color="muted-foreground"
                      as="span"
                      variant="caption"
                      className="mt-0.5 block wrap-break-word"
                    >
                      {option.description}
                    </Typography>
                  )}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
        <AutocompletePrimitive.Status className="sr-only">
          {loading ? loadingMessage : null}
        </AutocompletePrimitive.Status>
      </AutocompletePrimitive.Root>
      {hasDescription && (
        <FieldDescription id={`${inputId}-description`} className="text-label">
          {description}
        </FieldDescription>
      )}
      {hasError && (
        <FieldError id={`${inputId}-error`}>
          <Typography color="danger" as="span" variant="label">
            {error}
          </Typography>
        </FieldError>
      )}
    </Field>
  )
}

export type { AutocompleteOption }
