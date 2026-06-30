import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getServiceBySlug } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

interface ContactPayload {
  name: string;
  email: string;
  service: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const service = (body.service ?? "").trim();

  if (!name || !email || !message || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const serviceLabel = getServiceBySlug(service)?.slug ?? service ?? "—";

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sitio web <onboarding@resend.dev>",
      to: siteConfig.contactEmail,
      replyTo: email,
      subject: `Nuevo contacto: ${name}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Servicio: ${serviceLabel}`,
        "",
        message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
