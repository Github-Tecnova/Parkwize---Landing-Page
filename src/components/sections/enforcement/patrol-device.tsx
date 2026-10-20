/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { CircleAlert, CircleCheck, CloudUpload, ScanLine } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DeviceFrame } from "@/components/media/device-frame";
import { PlateScanner } from "@/components/sections/enforcement/plate-scanner";
import { EnforcementDictionary } from "@/content/dictionary";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type DeviceDictionary = EnforcementDictionary["demo"]["device"];

const STEP_PLATES = ["FKL 482", "FKL 482", "GHT 915", "GHT 915"];

type PatrolDeviceProps = {
  label: string;
  dict: DeviceDictionary;
  step: number;
  animate: boolean;
};

export function PatrolDevice({
  label,
  dict,
  step,
  animate,
}: PatrolDeviceProps) {
  const flagged = step >= 2;

  return (
    <DeviceFrame label={label}>
      <div className="flex items-center justify-between gap-3 bg-navy px-5 pb-4 pt-12 text-brand-foreground">
        <span className="min-w-0">
          <span className="block font-display text-lg font-semibold">
            {dict.title}
          </span>
          <span className="block truncate text-xs text-inverse-muted">
            {dict.zone}
          </span>
        </span>
        <span
          aria-hidden
          className={cn(
            "size-2.5 shrink-0 rounded-full bg-success",
            animate && "animate-pulse",
          )}
        />
      </div>

      <div className="px-5 pt-4">
        <PlateScanner
          plate={STEP_PLATES[step]}
          scanning={step === 0}
          animate={animate}
          scanningLabel={dict.scanning}
          confidence={dict.confidence}
        />
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step}
            className="absolute inset-0 flex flex-col px-5 py-4"
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={animate ? { opacity: 0, y: -12 } : undefined}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          >
            {step === 0 && (
              <p className="mx-auto flex items-center gap-2 text-sm font-semibold text-deck">
                <ScanLine aria-hidden className="size-4" />
                {dict.reading}
              </p>
            )}
            {step > 0 && step < 3 && (
              <SessionCard dict={dict} flagged={flagged} />
            )}
            {step === 3 && <ViolationCard dict={dict} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </DeviceFrame>
  );
}

function SessionCard({
  dict,
  flagged,
}: {
  dict: DeviceDictionary;
  flagged: boolean;
}) {
  const Icon = flagged ? CircleAlert : CircleCheck;

  return (
    <div className="rounded-2xl border border-hairline p-4">
      <p
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold",
          flagged ? "badge-negative" : "badge-positive",
        )}
      >
        <Icon aria-hidden className="size-3.5" />
        {flagged ? dict.flagged : dict.valid}
      </p>
      <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-copy">
        {dict.sessionLabel}
      </p>
      <p className="mt-1 font-bold text-ink">
        {flagged ? dict.noSession : dict.paidUntil}
      </p>
      {flagged && <p className="mt-1 text-sm text-copy">{dict.overstay}</p>}
    </div>
  );
}

function ViolationCard({ dict }: { dict: DeviceDictionary }) {
  const rows = [
    { label: dict.photoLabel, value: dict.photoValue },
    { label: dict.timeLabel, value: dict.timeValue },
    { label: dict.placeLabel, value: dict.placeValue },
  ];

  return (
    <>
      <div className="rounded-2xl border border-hairline p-4">
        <p className="flex items-center justify-between gap-2 font-bold text-ink">
          {dict.violation}
          <span className="text-xs font-semibold text-copy">
            {dict.violationId}
          </span>
        </p>
        <dl className="mt-3 divide-y divide-hairline text-sm">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 py-2"
            >
              <dt className="text-copy">{row.label}</dt>
              <dd className="font-semibold text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-auto flex items-center gap-2 rounded-xl bg-deck-tint px-3 py-3 text-xs font-semibold text-deck">
        <CloudUpload aria-hidden className="size-4 shrink-0" />
        {dict.synced}
      </p>
    </>
  );
}
