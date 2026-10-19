/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Resend } from "resend";

export type LeadEmailRow = {
  label: string;
  value: string;
};

type LeadEmail = {
  title: string;
  subject: string;
  replyTo: string;
  recipientsEnv: string;
  rows: LeadEmailRow[];
};

export type LeadEmailResult = "sent" | "skipped" | "unconfigured" | "failed";

export async function sendLeadEmail({
  title,
  subject,
  replyTo,
  recipientsEnv,
  rows,
}: LeadEmail): Promise<LeadEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return process.env.NODE_ENV === "production" ? "unconfigured" : "skipped";
  }

  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";
  const to = (process.env[recipientsEnv] ?? process.env.RESEND_TO ?? from)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo,
      subject,
      html: renderLeadHtml(title, rows),
      text: rows.map((row) => `${row.label}: ${row.value}`).join("\n"),
    });

    return error ? "failed" : "sent";
  } catch {
    return "failed";
  }
}

function renderLeadHtml(title: string, rows: LeadEmailRow[]) {
  const body = rows
    .filter((row) => row.value)
    .map(
      (row) => `<tr>
        <td style="padding:8px 12px;font-weight:600;border:1px solid #e5e7eb;vertical-align:top;">${escapeHtml(row.label)}</td>
        <td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-line;">${escapeHtml(row.value)}</td>
      </tr>`,
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;color:#061329;">
    <h2 style="margin:0 0 16px;">${escapeHtml(title)}</h2>
    <table style="border-collapse:collapse;min-width:420px;">${body}</table>
  </div>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
