/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { NextResponse } from "next/server";
import { getDictionary } from "@/content/dictionary";
import { demoLeadSchema } from "@/lib/leads/demo-schema";
import { collectLeadErrors } from "@/lib/leads/lead-errors";
import { isSameOrigin, isTooFast } from "@/lib/leads/lead-guard";
import { sendLeadEmail } from "@/lib/leads/send-lead-email";
import { PRODUCT_LINKS } from "@/lib/navigation";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = demoLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", fields: collectLeadErrors(parsed.error.issues) },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  if (lead.website || isTooFast(body)) {
    return NextResponse.json({ ok: true });
  }

  const { pages } = await getDictionary("en");
  const interests = PRODUCT_LINKS.filter((link) =>
    lead.interests.includes(link.key),
  )
    .map((link) => pages[link.key].name)
    .join(", ");
  const name = `${lead.firstName} ${lead.lastName}`;

  const result = await sendLeadEmail({
    title: "New demo request",
    subject: `Demo request · ${lead.company} · ${name}`,
    replyTo: lead.email,
    recipientsEnv: "DEMO_TO",
    rows: [
      { label: "Name", value: name },
      { label: "Email", value: lead.email },
      { label: "Company", value: lead.company },
      { label: "Job title", value: lead.jobTitle },
      { label: "Country", value: lead.country },
      { label: "Facilities", value: lead.facilities },
      { label: "Spaces", value: lead.spaces },
      { label: "Barrier model", value: lead.barriers },
      { label: "Timeline", value: lead.timeline },
      { label: "Interests", value: interests },
      { label: "Current setup", value: lead.currentSetup },
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
