import { NextResponse } from "next/server";
import { Resend } from "resend";

type EarlyAccessPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  role?: string;
  roleOther?: string;
  phone?: string;
  consent?: boolean;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatRow = (label: string, value?: string) => {
  if (!value) {
    return "";
  }

  return `<tr>
    <td style="padding:8px 12px;font-weight:600;border:1px solid #e5e7eb;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
  </tr>`;
};

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured" },
      { status: 500 },
    );
  }

  let payload: EarlyAccessPayload;

  try {
    payload = (await request.json()) as EarlyAccessPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const firstName = payload.firstName?.trim() ?? "";
  const lastName = payload.lastName?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const role = payload.role?.trim() ?? "";
  const roleOther = payload.roleOther?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const consent = Boolean(payload.consent);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!firstName || !email || !isValidEmail) {
    return NextResponse.json(
      { error: "First name and a valid email are required" },
      { status: 400 },
    );
  }

  if (!consent) {
    return NextResponse.json({ error: "Consent is required" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";
  const toTargets = (
    process.env.EARLY_ACCESS_TO ??
    process.env.RESEND_TO ??
    from
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  try {
    const { error } = await resend.emails.send({
      from,
      to: toTargets,
      replyTo: email,
      subject: `New early access request - ${firstName} ${lastName}`.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;color:#111827;">
          <h2 style="margin-bottom:16px;">New Early Access Request</h2>
          <table style="border-collapse:collapse;min-width:420px;">
            ${formatRow("First name", firstName)}
            ${formatRow("Last name", lastName)}
            ${formatRow("Email", email)}
            ${formatRow("Company", company)}
            ${formatRow("Role", role)}
            ${formatRow("Other role", roleOther)}
            ${formatRow("Phone", phone)}
            ${formatRow("Consent", consent ? "Yes" : "No")}
          </table>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Failed to send email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while sending email" },
      { status: 500 },
    );
  }
}
