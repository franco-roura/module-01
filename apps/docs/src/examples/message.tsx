import {
  Bubble,
  Button,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
  Panel,
} from "@franco_roura/module-01";
import { Copy, RefreshCw } from "lucide-react";

export function Exchange() {
  return (
    <Panel serial="E-01" notch="sm" className="max-w-lg" bodyClassName="flex flex-col gap-4">
      <Message align="end">
        <MessageContent>
          <Bubble>Which stations went quiet this week?</Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar fallback="AI" />
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <Bubble>Two: Harbor North stopped on Tuesday, and Ridge 4 on Thursday night.</Bubble>
        </MessageContent>
      </Message>
    </Panel>
  );
}

export function Conversation() {
  return (
    <div role="log" aria-label="Conversation with Mara" className="flex max-w-lg flex-col gap-4">
      <MessageGroup>
        <Message>
          <MessageAvatar />
          <MessageContent>
            <MessageHeader>Mara Quinn</MessageHeader>
            <Bubble>The export for the coast project failed again.</Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar fallback="MQ" />
          <MessageContent>
            <Bubble>Can you take a look before the review at three?</Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
      <Message align="end">
        <MessageContent>
          <Bubble>On it. Here is the line from the log:</Bubble>
          <Bubble tone="visor">export: 412 rows skipped (no timestamp)</Bubble>
          <MessageFooter>Read · 14:02</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  );
}

export function Actions() {
  return (
    <Message className="max-w-lg">
      <MessageAvatar fallback="AI" />
      <MessageContent>
        <Bubble>
          Rows without a timestamp are skipped. Turn on <a href="#fill">fill missing times</a> to
          keep them.
        </Bubble>
        <MessageFooter>
          <Button variant="ghost" size="icon-xs" aria-label="Copy">
            <Copy strokeWidth={1.25} />
          </Button>
          <Button variant="ghost" size="icon-xs" aria-label="Try again">
            <RefreshCw strokeWidth={1.25} />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  );
}
