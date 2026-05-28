import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  project?: string;
  quantity?: string;
  message?: string;
  locale?: string;
};

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function sendEmail(message: string, payload: Required<ContactPayload>) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_FROM) {
    return false;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO_EMAIL ?? "savvyversa@gmail.com",
    replyTo: payload.email || undefined,
    subject: `Stone order request from ${payload.name}`,
    text: message,
  });

  return true;
}

async function sendTelegram(message: string) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    return false;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Telegram send failed");
  }

  return true;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const payload = {
    name: normalize(body.name),
    phone: normalize(body.phone),
    email: normalize(body.email),
    country: normalize(body.country),
    project: normalize(body.project),
    quantity: normalize(body.quantity),
    message: normalize(body.message),
    locale: normalize(body.locale),
  };

  if (!payload.name || !payload.phone || !payload.project || !payload.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const composedMessage = [
    "New stone order request",
    `Locale: ${payload.locale || "unknown"}`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "not provided"}`,
    `Country: ${payload.country || "not provided"}`,
    `Project: ${payload.project}`,
    `Quantity: ${payload.quantity || "not provided"}`,
    "Message:",
    payload.message,
  ].join("\n");

  let delivered = false;

  try {
    delivered = (await sendEmail(composedMessage, payload)) || delivered;
  } catch {
    delivered = delivered || false;
  }

  try {
    delivered = (await sendTelegram(composedMessage)) || delivered;
  } catch {
    delivered = delivered || false;
  }

  if (!delivered) {
    return NextResponse.json(
      { error: "No delivery channel is configured. Set SMTP or Telegram environment variables." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}