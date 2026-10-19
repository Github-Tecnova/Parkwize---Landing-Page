/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ChevronDown } from "lucide-react";
import { fieldControl, FormField } from "@/components/forms/form-field";

type SelectFieldProps = {
  id: string;
  label: string;
  hint?: string;
  placeholder: string;
  value: string;
  options: readonly string[];
  labels: Record<string, string>;
  error?: string;
  required?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export function SelectField({
  id,
  label,
  hint,
  placeholder,
  value,
  options,
  labels,
  error,
  required,
  className,
  onChange,
}: SelectFieldProps) {
  return (
    <FormField
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      {(control) => (
        <span className="relative block">
          <select
            {...control}
            name={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={fieldControl({ kind: "select" })}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {labels[option]}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-copy"
          />
        </span>
      )}
    </FormField>
  );
}
