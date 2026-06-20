import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CV_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact me directly." },
        { status: 503 }
      );
    }

    const cvFileName = process.env.CV_FILE_NAME || "Arsyadam-CV.pdf";
    const cvPath = path.join(process.cwd(), "public", cvFileName);

    let cvBase64: string;
    try {
      const buffer = await readFile(cvPath);
      cvBase64 = buffer.toString("base64");
    } catch {
      console.error(`CV file not found at public/${cvFileName}`);
      return NextResponse.json(
        { error: "CV file is not available yet. Please try again later." },
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
        subject: "CV - Arsyad Ali Mahardika (Arsyadam)",
        html: `
          <p>Hi,</p>
          <p>Thank you for your interest! Please find my CV attached.</p>
          <p>I'm an AI Engineer focused on <strong>AI &amp; IT in public transportation</strong>, currently building smart mobility solutions at Transjakarta.</p>
          <p>Best regards,<br/><strong>Arsyad Ali Mahardika</strong><br/>
          <a href="https://arsyadam.id">arsyadam.id</a> ·
          <a href="https://linkedin.com/in/arsyadam">LinkedIn</a></p>
        `,
        attachments: [
          {
            filename: cvFileName,
            content: cvBase64,
          },
        ],
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
