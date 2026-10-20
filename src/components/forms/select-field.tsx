/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { KeyboardEvent, useCallback, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { fieldControl, FormField } from "@/components/forms/form-field";
import { DismissReason, useDismiss } from "@/hooks/use-dismiss";
import { FADE_FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TYPEAHEAD_RESET = 500;

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
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const typeahead = useRef({ query: "", timer: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const items = [
    ...(required ? [] : [{ value: "", label: placeholder }]),
    ...options.map((option) => ({ value: option, label: labels[option] })),
  ];
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.value === value),
  );
  const optionId = (index: number) => `${listId}-option-${index}`;

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const handleDismiss = useCallback(
    (reason: DismissReason) => close(reason === "escape"),
    [close],
  );

  useDismiss(rootRef, open, handleDismiss);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    const item = items[index];
    if (item) onChange(item.value);
    close(true);
  };

  const moveTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), items.length - 1);
    setActive(next);
    document
      .getElementById(optionId(next))
      ?.scrollIntoView({ block: "nearest" });
  };

  const findByLetter = (key: string) => {
    window.clearTimeout(typeahead.current.timer);
    typeahead.current.query += key.toLowerCase();
    typeahead.current.timer = window.setTimeout(() => {
      typeahead.current.query = "";
    }, TYPEAHEAD_RESET);
    return items.findIndex((item) =>
      item.label.toLowerCase().startsWith(typeahead.current.query),
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const isLetter = event.key.length === 1 && /\S/.test(event.key);

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openList();
      } else if (isLetter) {
        const match = findByLetter(event.key);
        if (match >= 0) onChange(items[match].value);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveTo(active + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveTo(active - 1);
        break;
      case "Home":
        event.preventDefault();
        moveTo(0);
        break;
      case "End":
        event.preventDefault();
        moveTo(items.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(active);
        break;
      case "Tab":
        onChange(items[active].value);
        setOpen(false);
        break;
      default:
        if (isLetter) {
          const match = findByLetter(event.key);
          if (match >= 0) moveTo(match);
        }
    }
  };

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
        <div ref={rootRef} className="relative">
          <button
            {...control}
            ref={triggerRef}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={open ? optionId(active) : undefined}
            onClick={() => (open ? close(false) : openList())}
            onKeyDown={handleKeyDown}
            className={cn(
              fieldControl({ kind: "select" }),
              "flex items-center justify-between gap-3 text-left",
              open && "border-deck ring-4 ring-deck-tint",
            )}
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value ? labels[value] : placeholder}
            </span>
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 shrink-0 text-copy transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>
          <AnimatePresence>
            {open && (
              <motion.ul
                id={listId}
                role="listbox"
                data-lenis-prevent
                aria-label={label}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={FADE_FAST}
                className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-xl border border-hairline bg-surface p-1.5 shadow-media"
              >
                {items.map((item, index) => {
                  const selected = item.value === value;

                  return (
                    <li
                      key={item.value || "empty"}
                      id={optionId(index)}
                      role="option"
                      aria-selected={selected}
                      onPointerEnter={() => setActive(index)}
                      onPointerDown={(event) => event.preventDefault()}
                      onClick={() => choose(index)}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] transition-colors",
                        index === active && "bg-surface-muted",
                        selected ? "font-semibold text-ink" : "text-copy",
                        !item.value && "text-muted-foreground",
                      )}
                    >
                      {item.label}
                      {selected && item.value && (
                        <Check aria-hidden className="size-4 text-deck" />
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </FormField>
  );
}
