/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { z } from "zod";
import { TOPIC_OPTIONS } from "@/lib/leads/lead-options";

export const contactLeadSchema = z.object({
  firstName: z.string().trim().min(1, "required").max(80, "tooLong"),
  lastName: z.string().trim().min(1, "required").max(80, "tooLong"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(160, "tooLong")
    .pipe(z.email("email")),
  company: z.string().trim().max(120, "tooLong"),
  topic: z.enum(TOPIC_OPTIONS, "required"),
  message: z.string().trim().min(1, "required").max(4000, "tooLong"),
  consent: z.literal(true, "consent"),
  website: z.string().max(200, "invalid"),
});
