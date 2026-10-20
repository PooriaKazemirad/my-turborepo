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

function luminance(color) {
  let channels
  if (color.startsWith("oklch(")) {
    // OKLCH -> OKLab -> linear sRGB; clip to the sRGB display gamut.
    const [lightness, chroma, hue] = color.slice(6, -1).split(/\s+/).map(Number)
    const a = chroma * Math.cos((hue * Math.PI) / 180)
    const b = chroma * Math.sin((hue * Math.PI) / 180)
    const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
    const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
    const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
    channels = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ].map((value) => Math.max(0, Math.min(1, value)))
  } else {
    assert.match(
      color,
      /^#[0-9a-f]{6}$/i,
      `Unsupported contrast color: ${color}`
    )
    channels = color
      .slice(1)
      .match(/.{2}/g)
      .map((channel) => parseInt(channel, 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
      )
  }
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
    ["sidebar-muted-foreground", "sidebar"],
    ["sidebar-accent-foreground", "sidebar-accent"],
    ["sidebar-primary-foreground", "sidebar-primary"],
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
    for (const series of ["primary", "chart-2"]) {
      const a = luminance(resolve(tokens, series))
      const b = luminance(resolve(tokens, "card"))
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
      assert.ok(ratio >= 3, `${series} has contrast ${ratio.toFixed(2)}`)
    }
  }
})
