import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import { cn } from "../src/lib/utils.ts"
import { tokenGroups } from "../src/lib/design-tokens.ts"

const css = readFileSync(
  new URL("../src/styles/tokens.css", import.meta.url),
  "utf8"
)
const parse = (block) =>
  Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].trim(),
    ])
  )
const light = parse(css.split(".dark")[0])
const dark = { ...light, ...parse(css.split(".dark")[1]) }

function resolve(tokens, name, visited = new Set()) {
  assert.ok(tokens[name], `Missing token: ${name}`)
  assert.ok(!visited.has(name), `Circular token: ${name}`)
  const nextVisited = new Set([...visited, name])
  return tokens[name].replace(/var\(--([\w-]+)\)/g, (_, reference) =>
    resolve(tokens, reference, nextVisited)
  )
}

function luminance(hex) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((channel) => parseInt(channel, 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    )
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

test("every catalog token resolves in both themes without circular references", () => {
  for (const tokens of [light, dark]) {
    for (const name of Object.values(tokenGroups).flat())
      assert.ok(resolve(tokens, name))
  }
})

test("every CSS token is included in the catalog and export", () => {
  assert.deepEqual(
    new Set(Object.values(tokenGroups).flat()),
    new Set(Object.keys(light))
  )
})

test("all small-text semantic pairs meet WCAG AA contrast", () => {
  const pairs = [
    ["foreground", "background"],
    ["muted-foreground", "card"],
    ["primary-foreground", "primary"],
    ["sidebar-foreground", "sidebar"],
    ["success", "success-soft"],
    ["warning", "warning-soft"],
    ["danger", "danger-soft"],
    ["info", "info-soft"],
  ]
  for (const [theme, tokens] of [
    ["light", light],
    ["dark", dark],
  ]) {
    for (const [foreground, background] of pairs) {
      const a = luminance(resolve(tokens, foreground))
      const b = luminance(resolve(tokens, background))
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
      assert.ok(
        ratio >= 4.5,
        `${theme}: ${foreground} on ${background} has contrast ${ratio.toFixed(2)}`
      )
    }
  }
})

test("semantic font sizes preserve text colors while overriding other sizes", () => {
  for (const size of [
    "caption",
    "label",
    "body",
    "subtitle",
    "title",
    "heading",
    "metric",
  ]) {
    const result = cn("text-sm text-primary-foreground", `text-${size}`)
    assert.ok(
      result.includes("text-primary-foreground"),
      `text-${size} removed the foreground color`
    )
    assert.ok(result.includes(`text-${size}`))
    assert.ok(!result.split(" ").includes("text-sm"))
  }
  assert.equal(cn("text-success", "text-danger"), "text-danger")
})

test("both sales chart lines have at least 3:1 contrast against their surface", () => {
  for (const tokens of [light, dark]) {
    for (const series of ["chart-1", "chart-2"]) {
      const a = luminance(resolve(tokens, series))
      const b = luminance(resolve(tokens, "card"))
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
      assert.ok(ratio >= 3, `${series} has contrast ${ratio.toFixed(2)}`)
    }
  }
})
