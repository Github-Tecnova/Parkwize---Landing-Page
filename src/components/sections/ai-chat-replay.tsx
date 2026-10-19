/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ChatTurn = {
  q: string;
  a: string[];
};

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

type AiChatReplayProps = {
  conversation: ChatTurn[];
  assistant: string;
  you: string;
  placeholder: string;
  transcriptLabel: string;
  className?: string;
};

const TYPE_DELAY = 26;
const WORD_DELAY = 38;
const THINK_DELAY = 900;
const READ_DELAY = 2600;
const VISIBLE_MESSAGES = 4;

export function AiChatReplay({
  conversation,
  assistant,
  you,
  placeholder,
  transcriptLabel,
  className,
}: AiChatReplayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const nextTurn = useRef(1);
  const messageId = useRef(2);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    initialMessages(conversation),
  );
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let cancelled = false;
    const timers: number[] = [];
    const wait = (delay: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, delay));
      });
    const push = (message: Omit<ChatMessage, "id">) =>
      setMessages((current) => [
        ...current.slice(1 - VISIBLE_MESSAGES),
        { ...message, id: messageId.current++ },
      ]);

    const play = async () => {
      await wait(READ_DELAY / 2);

      while (!cancelled) {
        const turn = conversation[nextTurn.current % conversation.length];

        for (let length = 1; length <= turn.q.length && !cancelled; length++) {
          setDraft(turn.q.slice(0, length));
          await wait(TYPE_DELAY);
        }
        if (cancelled) return;

        setDraft("");
        push({ role: "user", text: turn.q });
        setThinking(true);
        await wait(THINK_DELAY);
        if (cancelled) return;

        setThinking(false);
        setStreaming(true);
        push({ role: "assistant", text: "" });
        const tokens = turn.a.join("\n").split(/(\s+)/);
        let streamed = "";

        for (const token of tokens) {
          if (cancelled) return;
          streamed += token;
          const text = streamed;
          setMessages((current) =>
            current.map((message, index) =>
              index === current.length - 1 ? { ...message, text } : message,
            ),
          );
          if (token.trim()) await wait(WORD_DELAY);
        }

        setStreaming(false);
        nextTurn.current += 1;
        await wait(READ_DELAY);
      }
    };

    play();

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      setDraft("");
      setThinking(false);
      setStreaming(false);
    };
  }, [inView, reducedMotion, conversation]);

  return (
    <div ref={ref} className={cn("min-w-0", className)}>
      <div
        role="log"
        aria-live="off"
        aria-label={transcriptLabel}
        className="flex h-[18.75rem] flex-col justify-end gap-2.5 overflow-hidden sm:h-[21.25rem]"
      >
        {messages.map((message, index) => (
          <ChatBubble
            key={message.id}
            message={message}
            label={message.role === "user" ? you : assistant}
            streaming={streaming && index === messages.length - 1}
          />
        ))}
        {thinking && (
          <div className="flex items-center gap-[5px] self-start rounded-[14px] rounded-bl-[4px] bg-deck px-[18px] py-4">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                style={{ animationDelay: `${dot * 0.16}s` }}
                className="size-1.5 animate-pulse rounded-full bg-white"
              />
            ))}
          </div>
        )}
      </div>
      <div aria-hidden className="mt-6 flex min-w-0 items-center gap-2.5">
        <span
          className={cn(
            "block h-12 min-w-0 flex-1 truncate rounded-full border border-hairline bg-surface px-5 text-sm leading-[3rem]",
            draft ? "text-ink" : "text-copy",
          )}
        >
          {draft || placeholder}
        </span>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-deck text-white">
          <ArrowRight className="size-[1.125rem]" />
        </span>
      </div>
    </div>
  );
}

function ChatBubble({
  message,
  label,
  streaming,
}: {
  message: ChatMessage;
  label: string;
  streaming: boolean;
}) {
  const fromUser = message.role === "user";

  return (
    <p
      className={cn(
        "max-w-[84%] whitespace-pre-line break-words px-4 py-[0.8125rem] text-sm leading-normal",
        fromUser
          ? "self-end rounded-[14px] rounded-br-[4px] border border-hairline bg-surface text-ink"
          : "self-start rounded-[14px] rounded-bl-[4px] bg-deck text-white",
      )}
    >
      <span className="sr-only">{label}: </span>
      {message.text}
      {streaming && (
        <span
          aria-hidden
          className="ml-[3px] inline-block h-[1em] w-0.5 animate-blink bg-white align-[-2px]"
        />
      )}
    </p>
  );
}

function initialMessages(conversation: ChatTurn[]): ChatMessage[] {
  const [first] = conversation;
  return [
    { id: 0, role: "user", text: first.q },
    { id: 1, role: "assistant", text: first.a.join("\n") },
  ];
}
