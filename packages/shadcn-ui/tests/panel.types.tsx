import { createRef } from "react"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
} from "../src/components/molecules/panel"

export const panelUsage = (
  <Panel
    ref={createRef<HTMLElement>()}
    aria-labelledby="example-title"
    id="example"
  >
    <PanelHeader
      ref={createRef<HTMLDivElement>()}
      title={
        <>
          Revenue <span>2026</span>
        </>
      }
      description={
        <>
          Updated <strong>today</strong>.
        </>
      }
      headingAs="h3"
      titleProps={{
        id: "example-title",
        color: "muted-foreground",
        variant: "body",
        weight: "normal",
      }}
      descriptionProps={{ id: "example-description", color: "info" }}
      action={<button type="button">Export</button>}
      separator={false}
      className="py-5"
    />
    <PanelContent padding="none" aria-describedby="example-description">
      Content
    </PanelContent>
    <PanelFooter variant="muted">Footer</PanelFooter>
  </Panel>
)

// @ts-expect-error Header headings must preserve heading semantics.
export const invalidHeading = <PanelHeader title="Revenue" headingAs="p" />
export const invalidTitleColor = (
  // @ts-expect-error Title colors must come from the shared token catalog.
  <PanelHeader title="Revenue" titleProps={{ color: "made-up-color" }} />
)
// @ts-expect-error Content padding is an explicit choice, not an arbitrary CSS value.
export const invalidPadding = <PanelContent padding="48px" />
