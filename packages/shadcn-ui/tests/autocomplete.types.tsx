import { createRef } from "react"
import {
  AutocompleteField,
  type AutocompleteFieldProps,
  type AutocompleteOption,
} from "../src/components/molecules/autocomplete-field"

const options = [
  { value: "dashboard", label: "Modern Dashboard", keywords: ["admin"] },
] as const satisfies readonly AutocompleteOption[]

export const controlledField = (
  <AutocompleteField
    label="Project"
    options={options}
    value="My custom project"
    onValueChange={(value: string) => value.toUpperCase()}
    onSelect={(option: AutocompleteOption) => option.value}
    ref={createRef<HTMLInputElement>()}
    name="project"
    required
    showOptionsOnFocus
    inputProps={{ onBlur: () => {}, "aria-describedby": "external-help" }}
  />
)
export const uncontrolledField = (
  <AutocompleteField
    label="Project"
    options={options}
    defaultValue="Dashboard"
    filter={null}
    readOnly
    showOptionsOnFocus={false}
    error="Required"
  />
)
export const invalidValue = (
  // @ts-expect-error The controlled value is input text, not an option object.
  <AutocompleteField label="Project" options={options} value={options[0]} />
)
export const invalidOption = (
  // @ts-expect-error Every option must have a label and stable value.
  <AutocompleteField label="Project" options={[{ label: "Incomplete" }]} />
)
export const invalidFocusSetting: Pick<
  AutocompleteFieldProps,
  "showOptionsOnFocus"
> = {
  // @ts-expect-error Opening suggestions on focus is a boolean setting.
  showOptionsOnFocus: "true",
}
