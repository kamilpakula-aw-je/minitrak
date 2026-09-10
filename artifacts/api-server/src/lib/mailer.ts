import nodemailer, { type Transporter } from "nodemailer";

export interface MailAttachment {
  filename: string;
  content: Buffer;
}

export interface LeadMail {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  if (!transporter) {
    // SMTP_HOST/SMTP_PORT override the default Gmail endpoint (also used by
    // integration tests to simulate a deterministic SMTP failure).
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10_000,
    });
  }
  return transporter;
}

export function isMailerConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendLeadMail(mail: LeadMail): Promise<void> {
  const t = getTransporter();
  if (!t) {
    throw new Error("mailer_not_configured");
  }
  const user = process.env.GMAIL_USER as string;
  const to = process.env.CONTACT_TO_EMAIL ?? "minitrak@stekro.pl";
  await t.sendMail({
    from: `Stekro Mini Trak <${user}>`,
    to,
    replyTo: mail.replyTo || undefined,
    subject: mail.subject,
    text: mail.text,
    attachments: mail.attachments,
  });
}
