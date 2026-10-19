/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { z } from "zod";
import {
  BARRIER_OPTIONS,
  FACILITY_OPTIONS,
  SPACE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/leads/lead-options";
import { PRODUCT_LINKS } from "@/lib/navigation";

const PRODUCT_KEYS = PRODUCT_LINKS.map((link) => link.key);

const requiredText = (max: number) =>
  z.string().trim().min(1, "required").max(max, "tooLong");

const optionalText = (max: number) => z.string().trim().max(max, "tooLong");

const optionalChoice = <const T extends readonly [string, ...string[]]>(
  options: T,
) => z.union([z.enum(options, "invalid"), z.literal("")]);

export const demoLeadSchema = z.object({
  firstName: requiredText(80),
  lastName: requiredText(80),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(160, "tooLong")
    .pipe(z.email("email")),
  company: requiredText(120),
  jobTitle: optionalText(120),
  country: optionalText(80),
  facilities: optionalChoice(FACILITY_OPTIONS),
  spaces: optionalChoice(SPACE_OPTIONS),
  barriers: optionalChoice(BARRIER_OPTIONS),
  timeline: optionalChoice(TIMELINE_OPTIONS),
  interests: z
    .array(
      z
        .string()
        .refine(
          (value) => PRODUCT_KEYS.some((key) => key === value),
          "invalid",
        ),
    )
    .max(PRODUCT_KEYS.length, "invalid"),
  currentSetup: optionalText(500),
  message: optionalText(2000),
  consent: z.literal(true, "consent"),
  website: z.string().max(200, "invalid"),
});
