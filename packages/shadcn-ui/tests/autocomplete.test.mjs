import assert from "node:assert/strict"
import test from "node:test"
import { matchesAutocompleteOption } from "../src/lib/autocomplete.ts"

const option = {
  value: "design",
  label: "Café Design",
  description: "Shared components and tokens",
  keywords: ["UI", "library"],
}

test("autocomplete matches labels, descriptions, and keywords without case or accent sensitivity", () => {
  for (const query of [
    "CAFE",
    "café",
    "tokens",
    "LIBRARY",
    "  design   ui  ",
    "",
  ])
    assert.ok(matchesAutocompleteOption(option, query), query)
})

test("autocomplete requires all search terms and handles missing optional metadata", () => {
  assert.equal(matchesAutocompleteOption(option, "design payroll"), false)
  assert.equal(
    matchesAutocompleteOption(
      { value: "1", label: "Modern Dashboard" },
      "dashboard"
    ),
    true
  )
  assert.equal(
    matchesAutocompleteOption(
      { value: "1", label: "Modern Dashboard" },
      "missing"
    ),
    false
  )
})
