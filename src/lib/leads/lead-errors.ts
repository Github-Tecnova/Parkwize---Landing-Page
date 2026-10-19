/*
 * Copyright (c) 2025-2026. Tecnova
 */

export type LeadErrorCode =
  "required" | "email" | "tooLong" | "consent" | "invalid";

export type LeadErrors = Partial<Record<string, LeadErrorCode>>;

export function collectLeadErrors(
  issues: readonly { path: PropertyKey[]; message: string }[],
) {
  const errors: LeadErrors = {};

  for (const issue of issues) {
    const [field] = issue.path;
    if (typeof field !== "string" || errors[field]) continue;
    errors[field] = isLeadErrorCode(issue.message) ? issue.message : "invalid";
  }

  return errors;
}

function isLeadErrorCode(value: string): value is LeadErrorCode {
  return ["required", "email", "tooLong", "consent", "invalid"].includes(value);
}
