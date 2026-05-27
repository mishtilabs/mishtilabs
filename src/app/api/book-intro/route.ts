import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/** Where intro requests are routed. Both addresses receive every submission. */
const RECIPIENTS = ["enquiries@mishtilabs.com", "mishtilabs@gmail.com"];

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  description?: string;
  /** Honeypot field — bots will fill this; real users won't. */
  website?: string;
};

const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const description = body.description?.trim() ?? "";

  // Honeypot — silently succeed, never email anyone.
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true, id: "noop" });
  }

  if (!name) {
    return NextResponse.json(
      { ok: false, message: "Name is required." },
      { status: 400 },
    );
  }
  if (!phone || !PHONE_RE.test(phone)) {
    return NextResponse.json(
      { ok: false, message: "A valid phone number is required." },
      { status: 400 },
    );
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "That email looks off. Please double-check it." },
      { status: 400 },
    );
  }
  if (!description || description.length < 10) {
    return NextResponse.json(
      { ok: false, message: "Please share a bit about what you need (min 10 characters)." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[book-intro] RESEND_API_KEY not set — submission was received but no email was sent.",
      { name, phone, email, description },
    );
    // In dev we still return ok so the UI flow can be tested. In production
    // we surface the misconfiguration clearly.
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Our email pipeline isn't configured yet. Please email us at hello@mishtilabs.com — sorry for the friction!",
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true, id: "dev-no-resend" });
  }

  const fromAddress =
    process.env.RESEND_FROM_EMAIL ?? "MishtiLabs Intake <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from: fromAddress,
    to: RECIPIENTS,
    replyTo: email || undefined,
    subject: `New intro request — ${name}`,
    html: renderEmail({ name, phone, email, description }),
    text: renderText({ name, phone, email, description }),
  });

  if (result.error) {
    console.error("[book-intro] Resend error:", result.error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Sorry — we couldn't send your message. Please try again in a moment, or email hello@mishtilabs.com.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: result.data?.id ?? null });
}

/* -------------------------------------------------------------------- */
/* Email templates                                                      */
/* -------------------------------------------------------------------- */

type Lead = { name: string; phone: string; email: string; description: string };

function renderText(l: Lead) {
  return [
    "New intro request via mishtilabs.com",
    "",
    `Name:        ${l.name}`,
    `Phone:       ${l.phone}`,
    `Email:       ${l.email || "(not provided)"}`,
    "",
    "Ask:",
    l.description,
    "",
    "—",
    "Sent from the Book intro form on mishtilabs.com",
  ].join("\n");
}

function renderEmail(l: Lead) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f7f8fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0b1430;">
    <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
      <!-- Header -->
      <div style="background:linear-gradient(95deg,#2563eb 0%,#7e22ce 50%,#ea580c 100%);border-radius:20px 20px 0 0;padding:28px 32px;color:#fff;">
        <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;opacity:0.85;">MishtiLabs · Engineering the future</div>
        <div style="font-size:24px;font-weight:700;margin-top:8px;letter-spacing:-0.5px;">New intro request</div>
      </div>

      <!-- Body -->
      <div style="background:#ffffff;border-radius:0 0 20px 20px;padding:32px;border:1px solid #dde1ee;border-top:0;box-shadow:0 8px 28px rgba(11,20,48,0.06);">
        <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr>
            <td style="padding:10px 0;color:#5e6685;width:120px;vertical-align:top;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Name</td>
            <td style="padding:10px 0;color:#0b1430;font-weight:600;">${escape(l.name)}</td>
          </tr>
          <tr style="border-top:1px solid #eef1f9;">
            <td style="padding:10px 0;color:#5e6685;vertical-align:top;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Phone</td>
            <td style="padding:10px 0;"><a href="tel:${escape(l.phone)}" style="color:#2563eb;text-decoration:none;font-weight:500;">${escape(l.phone)}</a></td>
          </tr>
          ${
            l.email
              ? `<tr style="border-top:1px solid #eef1f9;">
                   <td style="padding:10px 0;color:#5e6685;vertical-align:top;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Email</td>
                   <td style="padding:10px 0;"><a href="mailto:${escape(l.email)}" style="color:#2563eb;text-decoration:none;font-weight:500;">${escape(l.email)}</a></td>
                 </tr>`
              : ""
          }
          <tr style="border-top:1px solid #eef1f9;">
            <td style="padding:10px 0;color:#5e6685;vertical-align:top;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Ask</td>
            <td style="padding:10px 0;color:#0b1430;line-height:1.55;white-space:pre-wrap;">${escape(l.description)}</td>
          </tr>
        </table>

        <div style="margin-top:24px;padding-top:20px;border-top:1px dashed #dde1ee;color:#5e6685;font-size:13px;">
          Reply directly to this email to respond to ${escape(l.name)}${l.email ? "" : " — just paste their phone number into your contacts to call back."}.
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align:center;color:#8a8aa0;font-size:11px;margin-top:20px;letter-spacing:0.5px;">
        Sent from the <strong style="color:#5e6685;">Book intro</strong> form on mishtilabs.com
      </div>
    </div>
  </body>
</html>`;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  );
}
