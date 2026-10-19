/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ChipGroup } from "@/components/forms/chip-group";
import { ConsentField } from "@/components/forms/consent-field";
import { FormCard } from "@/components/forms/form-card";
import { FormGroup } from "@/components/forms/form-group";
import { FormSubmit } from "@/components/forms/form-submit";
import { FormSuccess } from "@/components/forms/form-success";
import { SelectField } from "@/components/forms/select-field";
import { TextField } from "@/components/forms/text-field";
import { DemoPageDictionary, PagesDictionary } from "@/content/dictionary";
import { useLeadForm } from "@/hooks/use-lead-form";
import { demoLeadSchema } from "@/lib/leads/demo-schema";
import {
  BARRIER_OPTIONS,
  FACILITY_OPTIONS,
  SPACE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/leads/lead-options";
import { PRODUCT_LINKS } from "@/lib/navigation";

const ID = "demo";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  jobTitle: "",
  country: "",
  facilities: "",
  spaces: "",
  barriers: "",
  timeline: "",
  interests: [] as string[],
  currentSetup: "",
  message: "",
  consent: false,
  website: "",
};

type TextKey =
  "firstName" | "lastName" | "email" | "company" | "jobTitle" | "country";
type ChoiceKey = "facilities" | "spaces" | "barriers" | "timeline";

const CONTACT_FIELDS: {
  key: TextKey;
  required: boolean;
  autoComplete: string;
}[] = [
  { key: "firstName", required: true, autoComplete: "given-name" },
  { key: "lastName", required: true, autoComplete: "family-name" },
  { key: "email", required: true, autoComplete: "email" },
  { key: "company", required: true, autoComplete: "organization" },
  { key: "jobTitle", required: false, autoComplete: "organization-title" },
  { key: "country", required: false, autoComplete: "country-name" },
];

const CHOICE_FIELDS: { key: ChoiceKey; options: readonly string[] }[] = [
  { key: "facilities", options: FACILITY_OPTIONS },
  { key: "spaces", options: SPACE_OPTIONS },
  { key: "barriers", options: BARRIER_OPTIONS },
  { key: "timeline", options: TIMELINE_OPTIONS },
];

type DemoFormProps = {
  dict: DemoPageDictionary["form"];
  pages: PagesDictionary;
};

export function DemoForm({ dict, pages }: DemoFormProps) {
  const { values, errors, status, setField, blurField, submit, reset } =
    useLeadForm({
      schema: demoLeadSchema,
      initial: INITIAL,
      endpoint: "/api/demo",
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

        <FormGroup legend={dict.groups.contact}>
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT_FIELDS.map(({ key, required, autoComplete }) => (
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
          </div>
        </FormGroup>

        <FormGroup legend={dict.groups.parking}>
          <div className="grid gap-4 sm:grid-cols-2">
            {CHOICE_FIELDS.map(({ key, options }) => (
              <SelectField
                key={key}
                id={`${ID}-${key}`}
                label={dict.fields[key]}
                hint={dict.optional}
                placeholder={dict.selectPlaceholder}
                value={values[key]}
                options={options}
                labels={dict.options[key]}
                error={errorFor(key)}
                onChange={(value) => setField(key, value)}
              />
            ))}
          </div>
        </FormGroup>

        <FormGroup legend={dict.groups.needs}>
          <div className="grid gap-5">
            <ChipGroup
              label={dict.fields.interests}
              hint={dict.interestsHint}
              options={PRODUCT_LINKS.map((link) => ({
                value: link.key,
                label: pages[link.key].name,
              }))}
              selected={values.interests}
              onToggle={(value) =>
                setField(
                  "interests",
                  values.interests.includes(value)
                    ? values.interests.filter((item) => item !== value)
                    : [...values.interests, value],
                )
              }
            />
            <TextField
              id={`${ID}-currentSetup`}
              label={dict.fields.currentSetup}
              hint={dict.optional}
              placeholder={dict.currentSetupPlaceholder}
              maxLength={500}
              value={values.currentSetup}
              error={errorFor("currentSetup")}
              onChange={(value) => setField("currentSetup", value)}
            />
            <TextField
              id={`${ID}-message`}
              label={dict.fields.message}
              hint={dict.optional}
              placeholder={dict.messagePlaceholder}
              maxLength={2000}
              multiline
              value={values.message}
              error={errorFor("message")}
              onChange={(value) => setField("message", value)}
            />
          </div>
        </FormGroup>

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
