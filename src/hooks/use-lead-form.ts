/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";
import { collectLeadErrors, LeadErrors } from "@/lib/leads/lead-errors";

type LeadStatus = "idle" | "sending" | "success" | "error";

type LeadFormOptions<T> = {
  schema: z.ZodType;
  initial: T;
  endpoint: string;
  idPrefix: string;
};

export function useLeadForm<T extends Record<string, unknown>>({
  schema,
  initial,
  endpoint,
  idPrefix,
}: LeadFormOptions<T>) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<LeadStatus>("idle");

  const validate = (next: T) => {
    const result = schema.safeParse(next);
    return result.success ? {} : collectLeadErrors(result.error.issues);
  };

  const setField = <K extends keyof T & string>(field: K, value: T[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validate(next)[field] }));
    }
  };

  const blurField = (field: keyof T & string) => {
    if (values[field] === "") return;
    setErrors((current) => ({ ...current, [field]: validate(values)[field] }));
  };

  const focusFirstError = (found: LeadErrors) => {
    const first = Object.keys(initial).find((field) => found[field]);
    if (first) document.getElementById(`${idPrefix}-${first}`)?.focus();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      focusFirstError(found);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const payload: unknown = await response.json().catch(() => null);
      const fields = readFieldErrors(payload);

      if (fields) {
        setErrors(fields);
        setStatus("idle");
        focusFirstError(fields);
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
  };

  return { values, errors, status, setField, blurField, submit, reset };
}

const fieldErrorsSchema = z.object({
  fields: z.record(
    z.string(),
    z.enum(["required", "email", "tooLong", "consent", "invalid"]),
  ),
});

function readFieldErrors(payload: unknown): LeadErrors | null {
  const result = fieldErrorsSchema.safeParse(payload);
  return result.success ? result.data.fields : null;
}
