import express, { Router, type IRouter } from "express";
import multer from "multer";
import { z } from "zod";
import { isMailerConfigured, sendLeadMail } from "../lib/mailer";
import { claimLead, updateLeadEmailStatus, updateLeadPhotos } from "../lib/leads";
import {
  isLeadPhotoStorageConfigured,
  uploadLeadPhotos,
} from "../lib/lead-photos";
import type { LeadPhoto } from "@workspace/db";

const router: IRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 10, fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith("image/"));
  },
});

const TradeInSchema = z.object({
  idempotencyKey: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  machineBrand: z.string().trim().max(120).optional().or(z.literal("")),
  machineModel: z.string().trim().max(120).optional().or(z.literal("")),
  machineYear: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  rodo: z.literal("true"),
  source: z.string().max(120).optional(),
  website: z.string().optional(),
});

const MAX_TOTAL_ATTACHMENTS = 30 * 1024 * 1024;

const uploadPhotos: express.RequestHandler = (req, res, next) => {
  upload.array("photos", 10)(req, res, (err: unknown) => {
    if (err) {
      req.log.warn({ err }, "trade-in upload error");
      res.status(400).json({ ok: false, error: "upload_error" });
      return;
    }
    next();
  });
};

router.post("/trade-in", uploadPhotos, async (req, res) => {
  const parsed = TradeInSchema.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "trade-in validation failed");
    res.status(400).json({ ok: false, error: "invalid_input" });
    return;
  }
  if (parsed.data.website && parsed.data.website.length > 0) {
    res.json({ ok: true });
    return;
  }
  const lead = parsed.data;
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_TOTAL_ATTACHMENTS) {
    res.status(413).json({ ok: false, error: "attachments_too_large" });
    return;
  }
  req.log.info(
    { lead: { ...lead, website: undefined }, photos: files.length },
    "new trade-in lead from /wymiana landing",
  );

  // Claim the key before uploading photos or sending mail. Only the request
  // that inserted the row may perform those side effects.
  let leadId: number | null = null;
  try {
    const claim = await claimLead({
      idempotencyKey: lead.idempotencyKey,
      type: "trade_in",
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      message: lead.message || null,
      machineBrand: lead.machineBrand || null,
      machineModel: lead.machineModel || null,
      machineYear: lead.machineYear || null,
      photosCount: 0,
      photos: [],
      source: lead.source || "minitrak.pl/wymiana",
    });
    leadId = claim.id;
    if (!claim.isNew) {
      res.json({ ok: true });
      return;
    }
  } catch (e) {
    req.log.error({ err: e }, "db save error (trade-in) — continuing to email");
  }

  let storedPhotos: LeadPhoto[] = [];
  if (files.length > 0 && isLeadPhotoStorageConfigured()) {
    try {
      storedPhotos = await uploadLeadPhotos(files);
    } catch (e) {
      req.log.error(
        { err: e },
        "photo storage error (trade-in) — continuing without stored photos",
      );
    }
  }
  if (leadId !== null) {
    await updateLeadPhotos(leadId, storedPhotos, files.length).catch((err) =>
      req.log.error({ err }, "db photo metadata update error (trade-in)"),
    );
  }

  if (isMailerConfigured()) {
    try {
      const attachments = files.map((f, i) => ({
        filename: f.originalname || `zdjecie-${i + 1}.jpg`,
        content: f.buffer,
      }));
      await sendLeadMail({
        subject: `Wycena maszyny w rozliczeniu — ${lead.name}`,
        replyTo: lead.email || undefined,
        text:
          `Imię i nazwisko: ${lead.name}\n` +
          `Telefon: ${lead.phone}\n` +
          `E-mail: ${lead.email || "—"}\n` +
          `Marka maszyny: ${lead.machineBrand || "—"}\n` +
          `Model: ${lead.machineModel || "—"}\n` +
          `Rok produkcji: ${lead.machineYear || "—"}\n` +
          `Liczba zdjęć: ${files.length}\n` +
          `Źródło: ${lead.source || "minitrak.pl/wymiana"}\n\n` +
          `Wiadomość:\n${lead.message || "—"}\n`,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      if (leadId !== null) {
        await updateLeadEmailStatus(leadId, "sent").catch((err) =>
          req.log.error({ err }, "db email-status update error (trade-in)"),
        );
      }
    } catch (e) {
      req.log.error({ err: e }, "smtp send error (trade-in)");
      if (leadId !== null) {
        await updateLeadEmailStatus(
          leadId,
          "failed",
          e instanceof Error ? e.message : String(e),
        ).catch((err) =>
          req.log.error({ err }, "db email-status update error (trade-in)"),
        );
        // Lead is safely stored in the database — do not fail the request.
      } else {
        res.status(502).json({ ok: false, error: "email_failed" });
        return;
      }
    }
  } else {
    req.log.warn("mailer not configured — trade-in lead only logged");
    if (leadId !== null) {
      await updateLeadEmailStatus(leadId, "not_configured").catch((err) =>
        req.log.error({ err }, "db email-status update error (trade-in)"),
      );
    }
  }

  res.json({ ok: true });
});

export default router;
