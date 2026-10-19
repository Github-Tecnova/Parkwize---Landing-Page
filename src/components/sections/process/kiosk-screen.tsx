/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { Bike, CarFront, Nfc } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { QrGlyph } from "@/components/media/qr-glyph";
import { ProcessDictionary } from "@/content/dictionary";
import { EASE_OUT_EXPO } from "@/lib/motion";

type KioskDictionary = ProcessDictionary["demo"]["kiosk"];

const PLATE = "FKL 482";

type KioskScreenProps = {
  label: string;
  dict: KioskDictionary;
  step: number;
  animate: boolean;
};

export function KioskScreen({ label, dict, step, animate }: KioskScreenProps) {
  const titles = [
    dict.vehicleTitle,
    dict.entryTitle,
    dict.payTitle,
    dict.receiptTitle,
  ];

  return (
    <div
      role="group"
      aria-label={label}
      className="mx-auto w-full max-w-[19rem] rounded-[1.75rem] border border-hairline bg-surface-muted p-3 shadow-card-deep"
    >
      <div className="flex h-[30rem] flex-col overflow-hidden rounded-2xl border-4 border-ink bg-surface">
        <div className="bg-deck px-4 py-3 text-center text-white">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/70">
            {dict.lot}
          </p>
          <p className="font-display text-lg font-bold">{titles[step]}</p>
        </div>
        <div className="relative flex-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={step}
              className="absolute inset-0 flex flex-col p-5"
              initial={animate ? { opacity: 0, x: 32 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={animate ? { opacity: 0, x: -32 } : undefined}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            >
              {step === 0 && <VehicleScreen dict={dict} />}
              {step === 1 && <StayScreen dict={dict} />}
              {step === 2 && <PayScreen dict={dict} />}
              {step === 3 && <ReceiptScreen dict={dict} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div aria-hidden className="flex items-center justify-center gap-3 pt-3">
        <span className="h-2 w-14 rounded-full bg-hairline" />
        <span className="size-3 rounded-full bg-success" />
        <span className="h-2 w-8 rounded-full bg-hairline" />
      </div>
    </div>
  );
}

function VehicleScreen({ dict }: { dict: KioskDictionary }) {
  return (
    <>
      <p className="text-balance text-center font-bold text-ink">
        {dict.vehicleQuestion}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <span className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-deck text-sm font-bold text-white ring-2 ring-deck-bright ring-offset-2">
          <CarFront aria-hidden className="size-9" />
          {dict.car}
        </span>
        <span className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-hairline text-sm font-bold text-ink">
          <Bike aria-hidden className="size-9 text-deck" />
          {dict.motorcycle}
        </span>
      </div>
    </>
  );
}

function StayScreen({ dict }: { dict: KioskDictionary }) {
  return (
    <>
      <dl className="divide-y divide-hairline text-sm">
        <Row label={dict.plateLabel} value={PLATE} />
        <Row label={dict.entryLabel} value={dict.entryValue} />
        <Row label={dict.durationLabel} value={dict.durationValue} />
      </dl>
      <div className="mt-auto rounded-2xl bg-deck-tint p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-copy">
          {dict.amountLabel}
        </p>
        <p className="font-display text-4xl font-bold tabular-nums text-deck">
          {dict.amount}
        </p>
      </div>
    </>
  );
}

function PayScreen({ dict }: { dict: KioskDictionary }) {
  return (
    <>
      <p className="text-center font-display text-4xl font-bold tabular-nums text-ink">
        {dict.amount}
      </p>
      <p className="mt-3 text-balance text-center text-sm font-semibold text-ink">
        {dict.payHint}
      </p>
      <span className="mx-auto mt-6 flex h-28 w-20 flex-col items-center justify-center gap-2 rounded-xl bg-ink text-white shadow-media">
        <Nfc aria-hidden className="size-8 motion-safe:animate-pulse" />
      </span>
      <p className="mt-auto text-center text-xs font-semibold text-copy">
        {dict.payMethods}
      </p>
    </>
  );
}

function ReceiptScreen({ dict }: { dict: KioskDictionary }) {
  return (
    <>
      <dl className="divide-y divide-hairline text-sm">
        <Row label={dict.receiptLabel} value={dict.receiptValue} />
        <Row label={dict.paidLabel} value={dict.amount} />
      </dl>
      <QrGlyph className="mx-auto mt-4 w-28 text-ink" />
      <p className="mt-3 text-center text-xs font-semibold text-copy">
        {dict.exitHint}
      </p>
      <span className="mt-auto flex h-11 items-center justify-center rounded-xl bg-deck text-sm font-semibold text-white">
        {dict.done}
      </span>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <dt className="text-copy">{label}</dt>
      <dd className="font-bold text-ink">{value}</dd>
    </div>
  );
}
