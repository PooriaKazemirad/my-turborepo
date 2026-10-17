import { createCn } from "cn/config"
import type { CnFunction } from "cn"

// Custom typography utilities must be classified as sizes, not text colors.
export const cn: CnFunction = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "caption",
            "label",
            "body",
            "subtitle",
            "title",
            "heading",
            "metric",
          ],
        },
      ],
    },
  },
})
