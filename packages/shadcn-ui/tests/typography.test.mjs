import assert from "node:assert/strict"
import { Buffer } from "node:buffer"
import { readFileSync } from "node:fs"
import { stripTypeScriptTypes } from "node:module"
import test from "node:test"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { tokenGroups, typographyTokens } from "../src/lib/design-tokens.ts"
import { typographyVariants } from "../src/lib/typography.ts"
import { cn } from "../src/lib/utils.ts"

// The component deliberately uses createElement, so its server rendering can be
// exercised in Node without adding a JSX runtime or a client-only test runner.
const componentSource = readFileSync(
  new URL("../src/components/atomic/typography.tsx", import.meta.url),
  "utf8"
)
const source = stripTypeScriptTypes(componentSource).replace(
  /from "([^"]+)"/g,
  (_, specifier) => {
    const url = specifier.startsWith("shadcn-ui/lib/")
      ? new URL(`../src/lib/${specifier.split("/").at(-1)}.ts`, import.meta.url)
          .href
      : import.meta.resolve(specifier)
    return `from ${JSON.stringify(url)}`
  }
)
const { Typography } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
)

test("every documented typography size uses the matching semantic token", () => {
  for (const { name } of typographyTokens) {
    assert.ok(
      typographyVariants({ variant: name }).split(" ").includes(`text-${name}`)
    )
  }
  assert.equal(typographyVariants({ variant: "inherit" }), "")
  assert.ok(typographyVariants({ variant: "metric" }).includes("tabular-nums"))
})

test("typography preserves semantic HTML, native attributes, and escaped text", () => {
  assert.match(
    renderToStaticMarkup(createElement(Typography, { children: "A < B" })),
    /^<p.*A &lt; B<\/p>$/
  )
  const heading = renderToStaticMarkup(
    createElement(Typography, {
      as: "h1",
      variant: "heading",
      id: "page-title",
      children: "Overview",
    })
  )
  assert.match(heading, /^<h1 /)
  assert.match(heading, /id="page-title"/)
  assert.match(heading, /text-heading/)
  const label = renderToStaticMarkup(
    createElement(Typography, {
      as: "label",
      htmlFor: "email",
      children: "Email",
    })
  )
  assert.match(label, /^<label /)
  assert.match(label, /for="email"/)
  const table = renderToStaticMarkup(
    createElement(
      "table",
      null,
      createElement(
        "thead",
        null,
        createElement(
          "tr",
          null,
          createElement(Typography, {
            as: "th",
            scope: "col",
            "aria-sort": "ascending",
            "data-slot": "table-head",
            children: "Amount",
          })
        )
      )
    )
  )
  assert.match(table, /<tr><th /)
  assert.match(table, /scope="col"/)
  assert.match(table, /aria-sort="ascending"/)
  assert.match(table, /data-slot="table-head"/)
  assert.doesNotMatch(table, /<p|<span/)
})

test("inline text inherits control color and caller classes override defaults", () => {
  const button = renderToStaticMarkup(
    createElement(
      "button",
      { className: "text-primary-foreground" },
      createElement(Typography, {
        as: "span",
        variant: "inherit",
        children: "Save",
      })
    )
  )
  assert.match(button, /<button.*<span/)
  assert.doesNotMatch(button, /text-foreground/)
  const classes = cn(
    typographyVariants({ variant: "body", tone: "muted", weight: "normal" }),
    "text-heading font-semibold text-success"
  ).split(" ")
  for (const value of ["text-heading", "text-success", "font-semibold"])
    assert.ok(classes.includes(value))
  for (const value of ["text-body", "text-muted-foreground", "font-normal"])
    assert.ok(!classes.includes(value))
})

test("color accepts every catalog color and resolves it through a CSS variable", () => {
  for (const color of tokenGroups.color) {
    const element = Typography({ color, children: "Token color" })
    assert.equal(element.props.style["--typography-color"], `var(--${color})`)
    assert.ok(
      element.props.className.includes("text-[color:var(--typography-color)]")
    )
    assert.equal(element.props.color, undefined)
    const html = renderToStaticMarkup(element)
    assert.ok(html.includes(`--typography-color:var(--${color})`))
    assert.doesNotMatch(html, /\scolor="/)
  }
})

test("color overrides tone, keeps size and native styles, and permits class overrides", () => {
  const element = Typography({
    as: "span",
    variant: "label",
    tone: "danger",
    color: "success",
    style: { marginTop: 4 },
  })
  assert.ok(element.props.className.includes("text-label"))
  assert.ok(!element.props.className.includes("text-danger"))
  assert.equal(element.props.style.marginTop, 4)
  assert.equal(element.props.style["--typography-color"], "var(--success)")
  const overridden = Typography({ color: "success", className: "text-info" })
  assert.ok(overridden.props.className.includes("text-info"))
  assert.ok(!overridden.props.className.includes("text-[color:"))
  const inherited = Typography({ color: "inherit", tone: "danger" })
  assert.ok(inherited.props.className.includes("text-inherit"))
  assert.ok(!inherited.props.className.includes("text-danger"))
  assert.equal(inherited.props.style, undefined)
  assert.ok(
    Typography({ tone: "danger" }).props.className.includes("text-danger")
  )
})
