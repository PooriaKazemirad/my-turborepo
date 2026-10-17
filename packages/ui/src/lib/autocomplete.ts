export type AutocompleteOption = {
  /** Stable, unique identifier. The label is inserted into the text field. */
  value: string
  label: string
  description?: string
  keywords?: readonly string[]
  disabled?: boolean
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
}

export function matchesAutocompleteOption(
  option: AutocompleteOption,
  query: string
) {
  const terms = normalize(query).trim().split(/\s+/)
  const text = normalize(
    [option.label, option.description, ...(option.keywords ?? [])]
      .filter(Boolean)
      .join(" ")
  )
  return terms.every((term) => text.includes(term))
}
