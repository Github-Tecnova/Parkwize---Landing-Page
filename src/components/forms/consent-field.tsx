/*
 * Copyright (c) 2025-2026. Tecnova
 */

type ConsentFieldProps = {
  id: string;
  label: string;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
};

export function ConsentField({
  id,
  label,
  checked,
  error,
  onChange,
}: ConsentFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="mt-6">
      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-0.5 size-5 shrink-0 rounded accent-deck"
        />
        {label}
      </label>
      {error && (
        <p
          id={errorId}
          className="ml-8 mt-1.5 text-xs font-semibold text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
