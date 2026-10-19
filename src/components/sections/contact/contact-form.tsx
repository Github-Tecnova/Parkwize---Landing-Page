/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { Info } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { ConsentField } from "@/components/forms/consent-field";
import { FormCard } from "@/components/forms/form-card";
import { FormSubmit } from "@/components/forms/form-submit";
import { FormSuccess } from "@/components/forms/form-success";
import { SelectField } from "@/components/forms/select-field";
import { TextField } from "@/components/forms/text-field";
import { ContactPageDictionary } from "@/content/dictionary";
import { useLeadForm } from "@/hooks/use-lead-form";
import { Locale } from "@/lib/i18n";
import { contactLeadSchema } from "@/lib/leads/contact-schema";
import { TOPIC_OPTIONS } from "@/lib/leads/lead-options";
import { DEMO_HREF } from "@/lib/navigation";

const ID = "contact";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  topic: "",
  message: "",
  consent: false,
  website: "",
};

type TextKey = "firstName" | "lastName" | "email" | "company";

const TEXT_FIELDS: { key: TextKey; required: boolean; autoComplete: string }[] =
  [
    { key: "firstName", required: true, autoComplete: "given-name" },
    { key: "lastName", required: true, autoComplete: "family-name" },
    { key: "email", required: true, autoComplete: "email" },
    { key: "company", required: false, autoComplete: "organization" },
  ];

type ContactFormProps = {
  locale: Locale;
  dict: ContactPageDictionary["form"];
};

export function ContactForm({ locale, dict }: ContactFormProps) {
  const { values, errors, status, setField, blurField, submit, reset } =
    useLeadForm({
      schema: contactLeadSchema,
      initial: INITIAL,
      endpoint: "/api/contact",
      idPrefix: ID,
    });
  const errorFor = (field: string) => {
    const code = errors[field];
    return code ? dict.errors[code] : undefined;
  };
  const hasErrors = Object.values(errors).some(Boolean);

  if (status === "success") {
    return (
      <FormCard>
        <FormSuccess
          title={dict.success.title}
          body={dict.success.body}
          again={dict.success.again}
          onAgain={reset}
        />
      </FormCard>
    );
  }

  return (
    <FormCard>
      <form noValidate onSubmit={submit} aria-labelledby={`${ID}-title`}>
        <h2
          id={`${ID}-title`}
          className="font-display text-2xl font-bold text-ink"
        >
          {dict.title}
        </h2>
        <p className="mt-2 text-sm text-copy">{dict.lead}</p>

        <div className="mt-7 grid gap-4 border-t border-hairline pt-6 sm:grid-cols-2">
          {TEXT_FIELDS.map(({ key, required, autoComplete }) => (
            <TextField
              key={key}
              id={`${ID}-${key}`}
              label={dict.fields[key]}
              required={required}
              hint={required ? undefined : dict.optional}
              type={key === "email" ? "email" : "text"}
              autoComplete={autoComplete}
              value={values[key]}
              error={errorFor(key)}
              onChange={(value) => setField(key, value)}
              onBlur={() => blurField(key)}
            />
          ))}
          <SelectField
            id={`${ID}-topic`}
            label={dict.fields.topic}
            placeholder={dict.selectPlaceholder}
            value={values.topic}
            options={TOPIC_OPTIONS}
            labels={dict.topics}
            error={errorFor("topic")}
            onChange={(value) => setField("topic", value)}
            className="sm:col-span-2"
            required
          />
          {values.topic === "demo" && (
            <p className="flex gap-2.5 rounded-xl bg-deck-tint px-4 py-3 text-sm text-ink sm:col-span-2">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-deck" />
              <span>
                {dict.demoHint}{" "}
                <Link
                  href={DEMO_HREF}
                  lang={locale}
                  className="font-semibold text-deck underline underline-offset-2"
                >
                  {dict.demoHintLink}
                </Link>
              </span>
            </p>
          )}
          <TextField
            id={`${ID}-message`}
            label={dict.fields.message}
            required
            placeholder={dict.messagePlaceholder}
            maxLength={4000}
            multiline
            value={values.message}
            error={errorFor("message")}
            onChange={(value) => setField("message", value)}
            onBlur={() => blurField("message")}
            className="sm:col-span-2"
          />
        </div>

        <div
          aria-hidden
          className="absolute -left-[9999px] size-px overflow-hidden"
        >
          <label htmlFor={`${ID}-website`}>{dict.honeypot}</label>
          <input
            id={`${ID}-website`}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setField("website", event.target.value)}
          />
        </div>

        <ConsentField
          id={`${ID}-consent`}
          label={dict.consent}
          checked={values.consent}
          error={errorFor("consent")}
          onChange={(checked) => setField("consent", checked)}
        />

        <FormSubmit
          message={
            status === "error"
              ? dict.sendError
              : hasErrors
                ? dict.errorSummary
                : undefined
          }
          sending={status === "sending"}
          label={dict.submit}
          sendingLabel={dict.sending}
        />
      </form>
    </FormCard>
  );
}
