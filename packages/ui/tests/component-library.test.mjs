import assert from "node:assert/strict"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import test from "node:test"
import { shadcnComponents } from "../src/lib/component-catalog.ts"

test("every catalog component resolves through the public package exports", () => {
  assert.equal(new Set(shadcnComponents).size, shadcnComponents.length)
  for (const name of shadcnComponents) {
    const resolved = import.meta.resolve(`@workspace/ui/components/${name}`)
    assert.ok(
      existsSync(fileURLToPath(resolved)),
      `Unresolvable component: ${name}`
    )
  }
})

test("all internal imports resolve, including the TSX syntax highlighter", () => {
  for (const directory of ["components", "hooks", "lib"]) {
    const root = new URL(`../src/${directory}/`, import.meta.url)
    for (const file of readdirSync(root).filter((name) =>
      /\.tsx?$/.test(name)
    )) {
      const source = readFileSync(new URL(file, root), "utf8")
      for (const [, specifier] of source.matchAll(
        /from\s+["'](@workspace\/ui\/[^"']+)["']/g
      )) {
        assert.ok(
          existsSync(fileURLToPath(import.meta.resolve(specifier))),
          `${file}: ${specifier} does not resolve`
        )
      }
    }
  }
})

test("installed components use the configured semantic class merger", () => {
  for (const name of shadcnComponents) {
    const source = readFileSync(
      new URL(`../src/components/${name}.tsx`, import.meta.url),
      "utf8"
    )
    assert.ok(
      !/import\s+\{\s*cn\s*\}\s+from\s+["']cn["']/.test(source),
      `${name} bypasses the shared typography configuration`
    )
  }
})
