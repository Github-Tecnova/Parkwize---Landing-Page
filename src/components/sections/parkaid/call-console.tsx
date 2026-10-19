/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { Check, Lock, LockOpen, PhoneCall } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SwapValue } from "@/components/motion/swap-value";
import { ParkAidDictionary } from "@/content/dictionary";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type DemoDictionary = ParkAidDictionary["demo"];
type CallMessage = DemoDictionary["messages"][number];

const CALL_TIMES = ["0:02", "0:06", "0:15", "0:21", "0:24"];
const PLATE = "FKL 482";
const BARRIER_OPEN_STEP = 3;

type CallConsoleProps = {
  dict: DemoDictionary;
  step: number;
  animate: boolean;
};

export function CallConsole({ dict, step, animate }: CallConsoleProps) {
  const barrierOpen = step >= BARRIER_OPEN_STEP;
  const BarrierIcon = barrierOpen ? LockOpen : Lock;
  const messages = dict.messages.filter((message) => message.step <= step);

  return (
    <div
      role="group"
      aria-label={dict.consoleLabel}
      className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-surface shadow-card-deep"
    >
      <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-deck">
          <PhoneCall aria-hidden className="size-4" />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold">
          {dict.terminal}
        </span>
        <span className="flex shrink-0 items-center gap-2 text-xs font-bold tabular-nums text-white/70">
          <span
            aria-hidden
            className={cn(
              "size-2 rounded-full bg-success",
              animate && "animate-pulse",
            )}
          />
          <span className="sr-only">{dict.live}</span>
          <SwapValue value={CALL_TIMES[step]} animate={animate} />
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-3 border-b border-hairline p-4">
        <div className="relative flex aspect-video items-center justify-center rounded-xl bg-black">
          <span className="absolute left-2.5 top-2 flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-white/70">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-destructive"
            />
            {dict.cameraLabel}
          </span>
          <span className="rounded-md border-2 border-white bg-surface px-2 py-0.5 font-display text-sm font-bold tracking-[0.1em] text-ink">
            {PLATE}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-2 rounded-xl border border-hairline p-3">
          <span className="text-[0.625rem] font-bold uppercase tracking-[0.12em] text-copy">
            {dict.barrierLabel}
          </span>
          <span
            className={cn(
              "flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-bold transition-colors duration-500",
              barrierOpen ? "badge-positive" : "bg-surface-muted text-ink",
            )}
          >
            <BarrierIcon aria-hidden className="size-3.5" />
            {barrierOpen ? dict.barrierOpen : dict.barrierClosed}
          </span>
        </div>
      </div>

      <div className="flex h-[19rem] flex-col justify-end gap-2.5 overflow-hidden p-4 [mask-image:linear-gradient(to_bottom,transparent,black_3rem)]">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.text}
              layout={animate ? "position" : false}
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animate ? { opacity: 0 } : undefined}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="flex flex-col"
            >
              <CallLine message={message} dict={dict} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CallLine({
  message,
  dict,
}: {
  message: CallMessage;
  dict: DemoDictionary;
}) {
  if (message.role === "system") {
    return (
      <p className="self-center rounded-full bg-surface-muted px-3 py-1 text-center text-xs font-semibold text-copy">
        {message.text}
      </p>
    );
  }

  if (message.role === "action") {
    return (
      <p className="badge-positive flex items-center gap-1.5 self-center rounded-full px-3 py-1 text-xs font-bold">
        <Check aria-hidden className="size-3.5" />
        {message.text}
      </p>
    );
  }

  const fromVisitor = message.role === "visitor";

  return (
    <p
      className={cn(
        "max-w-[84%] px-4 py-3 text-sm leading-normal",
        fromVisitor
          ? "self-end rounded-[14px] rounded-br-[4px] border border-hairline bg-surface text-ink"
          : "self-start rounded-[14px] rounded-bl-[4px] bg-deck text-white",
      )}
    >
      <span className="sr-only">
        {fromVisitor ? dict.visitorName : dict.assistantName}:{" "}
      </span>
      {message.text}
    </p>
  );
}
