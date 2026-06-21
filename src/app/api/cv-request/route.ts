import { NextResponse } from "next/server";
import {
  buildCvEmailHtml,
  buildCvEmailSubject,
} from "../../lib/cv-email-template";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CV_FROM_EMAIL || "onboarding@resend.dev";
    const cvUrl = process.env.CV_GDOCS_URL?.trim();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arsyadam.id";

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact me directly." },
        { status: 503 }
      );
    }

    if (!cvUrl) {
      console.error("CV_GDOCS_URL is not configured");
      return NextResponse.json(
        { error: "CV link is not available yet. Please try again later." },
        { status: 503 }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Arsyadam <${fromEmail}>`,
        to: [email.trim()],
        subject: buildCvEmailSubject(),
        html: buildCvEmailHtml({ cvUrl, siteUrl }),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CV request error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
