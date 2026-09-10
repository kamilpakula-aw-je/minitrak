import { Router, type IRouter } from "express";
import { z } from "zod";
import { isMailerConfigured, sendLeadMail } from "../lib/mailer";
import { claimLead, updateLeadEmailStatus } from "../lib/leads";

const router: IRouter = Router();

const ContactSchema = z.object({
  idempotencyKey: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  rodo: z.literal(true),
  marketing: z.boolean().optional(),
  source: z.string().max(120).optional(),
  website: z.string().max(0).optional(),
});

router.post("/contact", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "contact validation failed");
    res.status(400).json({ ok: false, error: "invalid_input" });
    return;
  }
  if (parsed.data.website && parsed.data.website.length > 0) {
    res.json({ ok: true });
    return;
  }
  const lead = parsed.data;
  req.log.info({ lead }, "new contact lead from stekro landing");

  // Save the lead to the database first, so an SMTP failure never loses it.
  let leadId: number | null = null;
  try {
    const claim = await claimLead({
      idempotencyKey: lead.idempotencyKey,
      type: "contact",
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      message: lead.message || null,
      marketing: lead.marketing ?? false,
      source: lead.source || "formularz kontaktowy",
    });
    leadId = claim.id;
    if (!claim.isNew) {
      res.json({ ok: true });
      return;
    }
  } catch (e) {
    req.log.error({ err: e }, "db save error (contact) — continuing to email");
  }

  if (isMailerConfigured()) {
    try {
      await sendLeadMail({
        subject: `Nowe zapytanie ze stekro.pl — ${lead.name}`,
        replyTo: lead.email || undefined,
        text:
          `Imię/firma: ${lead.name}\n` +
          `Telefon: ${lead.phone}\n` +
          `E-mail: ${lead.email || "—"}\n` +
          `Źródło: ${lead.source || "formularz kontaktowy"}\n` +
          `Marketing: ${lead.marketing ? "tak" : "nie"}\n\n` +
          `Wiadomość:\n${lead.message || "—"}\n`,
      });
      if (leadId !== null) {
        await updateLeadEmailStatus(leadId, "sent").catch((err) =>
          req.log.error({ err }, "db email-status update error (contact)"),
        );
      }
    } catch (e) {
      req.log.error({ err: e }, "smtp send error (contact)");
      if (leadId !== null) {
        await updateLeadEmailStatus(
          leadId,
          "failed",
          e instanceof Error ? e.message : String(e),
        ).catch((err) =>
          req.log.error({ err }, "db email-status update error (contact)"),
        );
        // Lead is safely stored in the database — do not fail the request.
      } else {
        res.status(502).json({ ok: false, error: "email_failed" });
        return;
      }
    }
  } else {
    req.log.warn("mailer not configured — contact lead only logged");
    if (leadId !== null) {
      await updateLeadEmailStatus(leadId, "not_configured").catch((err) =>
        req.log.error({ err }, "db email-status update error (contact)"),
      );
    }
  }

  res.json({ ok: true });
});

export default router;
