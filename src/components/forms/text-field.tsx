/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { fieldControl, FormField } from "@/components/forms/form-field";
import { cn } from "@/lib/utils";

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
  type?: "text" | "email";
  autoComplete?: string;
  multiline?: boolean;
  maxLength?: number;
  className?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  hint,
  error,
  placeholder,
  type = "text",
  autoComplete,
  multiline = false,
  maxLength,
  className,
}: TextFieldProps) {
  return (
    <FormField
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      {(control) =>
        multiline ? (
          <textarea
            {...control}
            name={id}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={4}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            className={fieldControl({ kind: "textarea" })}
          />
        ) : (
          <input
            {...control}
            name={id}
            type={type}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            maxLength={maxLength}
            aria-required={required}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            className={cn(fieldControl({ kind: "input" }))}
          />
        )
      }
    </FormField>
  );
}
