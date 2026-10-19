/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { NextResponse } from "next/server";
import { getDictionary } from "@/content/dictionary";
import { contactLeadSchema } from "@/lib/leads/contact-schema";
import { collectLeadErrors } from "@/lib/leads/lead-errors";
import { sendLeadEmail } from "@/lib/leads/send-lead-email";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = contactLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", fields: collectLeadErrors(parsed.error.issues) },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  const { contactPage } = await getDictionary("en");
  const topic = contactPage.form.topics[lead.topic];
  const name = `${lead.firstName} ${lead.lastName}`;

  const result = await sendLeadEmail({
    title: "New contact message",
    subject: `Contact · ${topic} · ${name}`,
    replyTo: lead.email,
    recipientsEnv: "CONTACT_TO",
    rows: [
      { label: "Name", value: name },
      { label: "Email", value: lead.email },
      { label: "Company", value: lead.company },
      { label: "Topic", value: topic },
      { label: "Message", value: lead.message },
    ],
  });

  if (result === "sent" || result === "skipped") {
    return NextResponse.json({ ok: true, delivered: result === "sent" });
  }

  return NextResponse.json(
    { error: result },
    { status: result === "unconfigured" ? 500 : 502 },
  );
}
