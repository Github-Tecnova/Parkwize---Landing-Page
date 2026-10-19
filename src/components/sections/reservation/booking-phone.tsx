/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ReactNode } from "react";
import { CalendarDays, CircleCheck, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DeviceFrame } from "@/components/media/device-frame";
import { QrGlyph } from "@/components/media/qr-glyph";
import { ReservationDictionary } from "@/content/dictionary";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PhoneDictionary = ReservationDictionary["demo"]["phone"];

type BookingPhoneProps = {
  label: string;
  dict: PhoneDictionary;
  step: number;
  animate: boolean;
};

export function BookingPhone({
  label,
  dict,
  step,
  animate,
}: BookingPhoneProps) {
  return (
    <DeviceFrame label={label}>
      <div className="flex items-center gap-2.5 border-b border-hairline px-5 pb-3 pt-12">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-deck font-display text-sm font-bold text-brand-foreground">
          P
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1 truncate text-sm font-bold text-ink">
            <MapPin aria-hidden className="size-3.5 shrink-0 text-deck" />
            {dict.lot}
          </span>
          <span className="block truncate text-[0.6875rem] text-copy">
            {dict.address}
          </span>
        </span>
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step}
            className="absolute inset-0 flex flex-col px-5 py-5"
            initial={animate ? { opacity: 0, x: 40 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={animate ? { opacity: 0, x: -40 } : undefined}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            {step === 0 && <SearchScreen dict={dict} />}
            {step === 1 && <PriceScreen dict={dict} />}
            {step === 2 && <PayScreen dict={dict} />}
            {step === 3 && <AccessScreen dict={dict} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </DeviceFrame>
  );
}

function SearchScreen({ dict }: { dict: PhoneDictionary }) {
  return (
    <>
      <p className="font-display text-xl font-bold uppercase leading-tight text-ink">
        {dict.heading}
      </p>
      <div className="mt-5 grid gap-3">
        <Field label={dict.arrivalLabel} value={dict.arrivalValue} />
        <Field label={dict.departureLabel} value={dict.departureValue} />
      </div>
      <PhoneButton className="mt-auto">{dict.getPrice}</PhoneButton>
    </>
  );
}

function PriceScreen({ dict }: { dict: PhoneDictionary }) {
  return (
    <>
      <p className="font-display text-5xl font-semibold tabular-nums text-deck">
        {dict.price}
      </p>
      <dl className="mt-6 divide-y divide-hairline border-y border-hairline text-sm">
        <Row label={dict.durationLabel} value={dict.durationValue} />
        <Row label={dict.validLabel} value={dict.validValue} />
      </dl>
      <PhoneButton className="mt-auto">{dict.continue}</PhoneButton>
    </>
  );
}

function PayScreen({ dict }: { dict: PhoneDictionary }) {
  return (
    <>
      <p className="font-display text-xl font-bold text-ink">{dict.payTitle}</p>
      <dl className="mt-4 border-y border-hairline text-sm">
        <Row label={dict.totalLabel} value={dict.price} />
      </dl>
      <div className="mt-auto grid gap-2.5">
        <span className="flex h-12 items-center justify-center rounded-xl bg-bezel text-sm font-semibold text-brand-foreground ring-2 ring-deck-bright ring-offset-2">
          {dict.applePay}
        </span>
        <span className="flex h-12 items-center justify-center rounded-xl border border-hairline text-sm font-semibold text-ink">
          {dict.googlePay}
        </span>
        <span className="flex h-12 items-center justify-center rounded-xl border border-hairline text-sm font-semibold text-copy">
          {dict.card}
        </span>
      </div>
    </>
  );
}

function AccessScreen({ dict }: { dict: PhoneDictionary }) {
  return (
    <>
      <p className="badge-positive flex items-center gap-2 self-start rounded-full px-3 py-1 text-xs font-bold">
        <CircleCheck aria-hidden className="size-3.5" />
        {dict.confirmed}
      </p>
      <QrGlyph className="mx-auto mt-5 w-40 text-ink" />
      <p className="mt-4 text-center text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-copy">
        {dict.ticketLabel}
      </p>
      <p className="text-center font-display text-2xl font-bold tracking-[0.12em] text-ink">
        {dict.ticketValue}
      </p>
      <p className="mt-auto rounded-xl bg-deck-tint py-3 text-center text-sm font-semibold text-deck">
        {dict.scanHint}
      </p>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-copy">
        {label}
      </p>
      <p className="mt-1.5 flex items-center gap-2 rounded-xl border border-hairline px-3 py-2.5 text-sm font-semibold text-ink">
        <CalendarDays aria-hidden className="size-4 shrink-0 text-deck" />
        {value}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <dt className="text-copy">{label}</dt>
      <dd className="font-bold text-ink">{value}</dd>
    </div>
  );
}

function PhoneButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-12 items-center justify-center rounded-full bg-deck text-sm font-semibold text-brand-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
