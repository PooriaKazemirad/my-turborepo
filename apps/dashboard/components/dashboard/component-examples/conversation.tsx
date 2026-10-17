"use client"

import { useId, useState } from "react"
import { Check, FileText, ThumbsUp, X } from "lucide-react"
import * as A from "shadcn-ui/components/atomic/attachment"
import { Avatar, AvatarFallback } from "shadcn-ui/components/atomic/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "shadcn-ui/components/atomic/bubble"
import { Button } from "shadcn-ui/components/atomic/button"
import * as Code from "shadcn-ui/components/atomic/code-block"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "shadcn-ui/components/atomic/marker"
import * as M from "shadcn-ui/components/atomic/message"
import * as Scroller from "shadcn-ui/components/atomic/message-scroller"
import * as Q from "shadcn-ui/components/atomic/questionnaire"
import * as T from "shadcn-ui/components/atomic/trace"
import type { ExampleProps } from "./registry"
import { Note, Text } from "./shared"

const code = 'const greeting = "Hello, workspace!"\nconsole.log(greeting)'
const questions = [
  {
    name: "role",
    required: true,
    choices: [{ value: "design" }, { value: "engineering" }],
  },
  {
    name: "goal",
    required: true,
    choices: [{ value: "explore" }, { value: "build" }],
  },
]

function SampleMessage({ reply = false }: { reply?: boolean }) {
  return (
    <M.Message align={reply ? "end" : "start"}>
      <M.MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>
            <Text>{reply ? "YO" : "EC"}</Text>
          </AvatarFallback>
        </Avatar>
      </M.MessageAvatar>
      <M.MessageContent>
        <M.MessageHeader>
          <Text>{reply ? "You" : "Emily"}</Text>
        </M.MessageHeader>
        <Bubble
          variant={reply ? "default" : "secondary"}
          align={reply ? "end" : "start"}
        >
          <BubbleContent>
            <Text>
              {reply
                ? "Looks good. Ready for review!"
                : "The new components are ready."}
            </Text>
          </BubbleContent>
        </Bubble>
        <M.MessageFooter>
          <Text>{reply ? "Delivered" : "10:24 AM"}</Text>
        </M.MessageFooter>
      </M.MessageContent>
    </M.Message>
  )
}

export default function Conversation({ name }: ExampleProps) {
  const id = useId()
  const [attached, setAttached] = useState(true)
  const [liked, setLiked] = useState(false)
  const [replied, setReplied] = useState(false)
  const [count, setCount] = useState(6)
  const [submitted, setSubmitted] = useState("")

  switch (name) {
    case "attachment":
      return attached ? (
        <A.Attachment state="done" className="w-full">
          <A.AttachmentMedia>
            <FileText aria-hidden="true" />
          </A.AttachmentMedia>
          <A.AttachmentContent>
            <A.AttachmentTitle>
              <Text>Design brief.pdf</Text>
            </A.AttachmentTitle>
            <A.AttachmentDescription>PDF · 240 KB</A.AttachmentDescription>
          </A.AttachmentContent>
          <A.AttachmentActions>
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label="Remove sample attachment"
              onClick={() => setAttached(false)}
            >
              <X aria-hidden="true" />
            </Button>
          </A.AttachmentActions>
        </A.Attachment>
      ) : (
        <div className="space-y-2">
          <Note>Sample attachment removed.</Note>
          <Button size="sm" variant="outline" onClick={() => setAttached(true)}>
            <Text>Restore attachment</Text>
          </Button>
        </div>
      )
    case "bubble":
      return (
        <div className="space-y-3">
          <BubbleGroup>
            <Bubble variant="secondary">
              <BubbleContent>
                <Text>Can you review the design?</Text>
              </BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>
                <Text>Ready when you are.</Text>
              </BubbleContent>
            </Bubble>
          </BubbleGroup>
          <Button
            size="sm"
            variant="outline"
            aria-pressed={liked}
            onClick={() => setLiked(!liked)}
          >
            <ThumbsUp aria-hidden="true" />
            <Text>{liked ? "Liked · 1" : "Like · 0"}</Text>
          </Button>
        </div>
      )
    case "code-block":
      return (
        <Code.CodeBlock size="sm">
          <Code.CodeBlockHeader>
            <Code.CodeBlockTitle>
              <Text>greeting.ts</Text>
            </Code.CodeBlockTitle>
            <Code.CodeBlockActions>
              <Code.CodeBlockCopyButton
                value={code}
                aria-label="Copy sample code"
              />
            </Code.CodeBlockActions>
          </Code.CodeBlockHeader>
          <Code.CodeBlockContent
            lineNumbers
            tabIndex={0}
            aria-label="TypeScript sample"
            dir="ltr"
          >
            {code}
          </Code.CodeBlockContent>
        </Code.CodeBlock>
      )
    case "marker":
      return (
        <div className="space-y-3">
          <Marker variant="separator">
            <MarkerContent>
              <Text>Today</Text>
            </MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerIcon>
              <Check aria-hidden="true" className="size-4" />
            </MarkerIcon>
            <MarkerContent>
              <Text>Design review completed</Text>
            </MarkerContent>
          </Marker>
          <Note>Markers separate conversation milestones.</Note>
        </div>
      )
    case "message":
      return (
        <div className="space-y-3">
          <M.MessageGroup className="gap-4">
            <SampleMessage />
            {replied && <SampleMessage reply />}
          </M.MessageGroup>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setReplied(!replied)}
          >
            <Text>{replied ? "Reset conversation" : "Send sample reply"}</Text>
          </Button>
        </div>
      )
    case "message-scroller":
      return (
        <div className="space-y-3">
          <Scroller.MessageScrollerProvider>
            <Scroller.MessageScroller className="h-56 rounded-lg border">
              <Scroller.MessageScrollerViewport
                aria-label="Sample conversation history"
                tabIndex={0}
              >
                <Scroller.MessageScrollerContent className="gap-3 p-3">
                  {Array.from({ length: count }, (_, index) => (
                    <Scroller.MessageScrollerItem
                      key={index}
                      messageId={`${id}-${index}`}
                    >
                      <Bubble
                        variant={index % 2 ? "default" : "secondary"}
                        align={index % 2 ? "end" : "start"}
                      >
                        <BubbleContent>
                          <Text>Sample message {index + 1}</Text>
                        </BubbleContent>
                      </Bubble>
                    </Scroller.MessageScrollerItem>
                  ))}
                </Scroller.MessageScrollerContent>
              </Scroller.MessageScrollerViewport>
              <Scroller.MessageScrollerButton
                direction="start"
                aria-label="Scroll to first sample message"
              />
              <Scroller.MessageScrollerButton aria-label="Scroll to latest sample message" />
            </Scroller.MessageScroller>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCount(count + 1)}
            >
              <Text>Add sample message</Text>
            </Button>
          </Scroller.MessageScrollerProvider>
          <Note>{count} messages. Scroll to explore the history.</Note>
        </div>
      )
    case "questionnaire":
      return submitted ? (
        <div className="space-y-3">
          <Note>{submitted}</Note>
          <Button size="sm" variant="outline" onClick={() => setSubmitted("")}>
            <Text>Start again</Text>
          </Button>
        </div>
      ) : (
        <Q.Questionnaire
          items={questions}
          shortcuts="letters"
          onSubmit={(event) => {
            event.preventDefault()
            const values = new FormData(event.currentTarget)
            setSubmitted(
              `Saved locally: ${values.get("role")} · ${values.get("goal")}.`
            )
          }}
        >
          <Q.QuestionnaireItem name="role" required>
            <Q.QuestionnaireTitle>
              <Text>What is your role?</Text>
            </Q.QuestionnaireTitle>
            <Q.QuestionnaireDescription>
              <Text>Step 1 of 2. Choose one option.</Text>
            </Q.QuestionnaireDescription>
            <Q.QuestionnaireChoices>
              <Q.QuestionnaireChoice value="design">
                <Text>Design</Text>
              </Q.QuestionnaireChoice>
              <Q.QuestionnaireChoice value="engineering">
                <Text>Engineering</Text>
              </Q.QuestionnaireChoice>
            </Q.QuestionnaireChoices>
            <Q.QuestionnaireError>
              <Text>Choose a role to continue.</Text>
            </Q.QuestionnaireError>
          </Q.QuestionnaireItem>
          <Q.QuestionnaireItem name="goal" required>
            <Q.QuestionnaireTitle>
              <Text>What is your goal?</Text>
            </Q.QuestionnaireTitle>
            <Q.QuestionnaireDescription>
              <Text>Step 2 of 2. Your answers stay in this preview.</Text>
            </Q.QuestionnaireDescription>
            <Q.QuestionnaireChoices>
              <Q.QuestionnaireChoice value="explore">
                <Text>Explore components</Text>
              </Q.QuestionnaireChoice>
              <Q.QuestionnaireChoice value="build">
                <Text>Build a project</Text>
              </Q.QuestionnaireChoice>
            </Q.QuestionnaireChoices>
            <Q.QuestionnaireError>
              <Text>Choose a goal to finish.</Text>
            </Q.QuestionnaireError>
          </Q.QuestionnaireItem>
          <Q.QuestionnaireActions>
            <Q.QuestionnairePrevious size="sm">
              <Text>Back</Text>
            </Q.QuestionnairePrevious>
            <Q.QuestionnaireNext size="sm">
              <Text>Next</Text>
            </Q.QuestionnaireNext>
            <Q.QuestionnaireSubmit size="sm">
              <Text>Finish</Text>
            </Q.QuestionnaireSubmit>
          </Q.QuestionnaireActions>
        </Q.Questionnaire>
      )
    case "trace":
      return (
        <T.Trace>
          <T.TraceLine>
            <T.TraceIcon>
              <Check />
            </T.TraceIcon>
            <T.TraceTitle>
              <Text>Loaded design tokens</Text>
            </T.TraceTitle>
          </T.TraceLine>
          <T.TraceCollapsible>
            <T.TraceCollapsibleTrigger>
              <T.TraceLine>
                <T.TraceTitle>
                  <Text>Review component checks</Text>
                </T.TraceTitle>
              </T.TraceLine>
            </T.TraceCollapsibleTrigger>
            <T.TraceCollapsibleContent>
              <Note>
                Colors, spacing, and typography are ready. All checks in this
                sample are complete.
              </Note>
            </T.TraceCollapsibleContent>
          </T.TraceCollapsible>
        </T.Trace>
      )
  }
}
