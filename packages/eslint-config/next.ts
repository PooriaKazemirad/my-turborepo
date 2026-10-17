import type { Linter } from "eslint"
import { globalIgnores } from "eslint/config"
import pluginNext from "@next/eslint-plugin-next"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"

import { config as baseConfig } from "@workspace/eslint-config/base"

export const nextJsConfig: Linter.Config[] = [
  ...baseConfig,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  pluginReactHooks.configs.flat.recommended,
]
