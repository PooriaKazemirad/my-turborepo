import type { Linter } from "eslint"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"

import { config as baseConfig } from "@workspace/eslint-config/base"

export const config: Linter.Config[] = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  pluginReactHooks.configs.flat.recommended,
]
