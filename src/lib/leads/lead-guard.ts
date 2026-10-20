/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { z } from "zod";

const MIN_FILL_MS = 2500;

const timingSchema = z.object({
  elapsed: z.number().int().nonnegative(),
});

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function isTooFast(body: unknown) {
  const timing = timingSchema.safeParse(body);
  return !timing.success || timing.data.elapsed < MIN_FILL_MS;
}
