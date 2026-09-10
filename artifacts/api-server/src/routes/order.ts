import { Router, type IRouter } from "express";
import { z } from "zod";
import { isMailerConfigured, sendLeadMail } from "../lib/mailer";
import { claimLead, updateLeadEmailStatus } from "../lib/leads";

const router: IRouter = Router();

const products = {
  "lisicki-kb": "Kosiarka bijakowa LISICKI KB",
  "stark-kdl-profi": "Kosiarka bijakowa STARK KDL PROFI",
  "stark-rs-profi": "Glebogryzarka STARK RS PROFI",
} as const;
const productModels = {
  "lisicki-kb": ["KB 120", "KB 140", "KB 160", "KB 180", "KB 200"],
  "stark-kdl-profi": ["KDL 160 Profi", "KDL 180 Profi", "KDL 200 Profi", "KDL 220 Profi"],
  "stark-rs-profi": ["RS 95 Profi", "RS 105 Profi", "RS 115 Profi", "RS 125 Profi", "RS 135 Profi"],
} as const;
const lisickiPrices = {
  "KB 120": 5950,
  "KB 140": 6300,
  "KB 160": 6900,
  "KB 180": 8000,
  "KB 200": 9000,
} as const;
const lisickiWomPrices = { "WOM 75": 270, "WOM 80": 300, "WOM 90": 350 } as const;

const OrderSchema = z
  .object({
    idempotencyKey: z.string().uuid(),
    productSlug: z.enum(["lisicki-kb", "stark-kdl-profi", "stark-rs-profi"]),
    productName: z.enum([products["lisicki-kb"], products["stark-kdl-profi"], products["stark-rs-profi"]]),
    email: z.string().trim().email().max(160),
    phone: z.string().trim().min(7).max(40),
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    country: z.string().trim().min(1).max(100),
    city: z.string().trim().min(1).max(120),
    postalCode: z.string().trim().min(1).max(20),
    street: z.string().trim().min(1).max(200),
    companyName: z.string().trim().max(160).optional().or(z.literal("")),
    nip: z.string().trim().max(40).optional().or(z.literal("")),
    rodo: z.literal(true),
    website: z.string().max(500).optional(),
    selectedModel: z.string().trim().max(80).optional(),
    selectedAddOn: z.string().trim().max(80).optional(),
    configuredPrice: z.number().positive().optional(),
  })
  .refine((order) => products[order.productSlug] === order.productName, {
    message: "Product name does not match product slug",
    path: ["productName"],
  })
  .refine(
    (order) => (productModels[order.productSlug] as readonly string[]).includes(order.selectedModel ?? ""),
    { message: "Invalid or missing product model", path: ["selectedModel"] },
  )
  .refine(
    (order) => {
      if (order.productSlug !== "lisicki-kb") return true;
      const model = order.selectedModel as keyof typeof lisickiPrices;
      const wom = order.selectedAddOn as keyof typeof lisickiWomPrices;
      return Boolean(lisickiPrices[model] && lisickiWomPrices[wom]);
    },
    { message: "Invalid or missing LISICKI WOM option", path: ["selectedAddOn"] },
  )
  .refine(
    (order) => {
      if (order.productSlug !== "lisicki-kb") return order.configuredPrice === undefined;
      const model = order.selectedModel as keyof typeof lisickiPrices;
      const wom = order.selectedAddOn as keyof typeof lisickiWomPrices;
      return order.configuredPrice === lisickiPrices[model] + lisickiWomPrices[wom];
    },
    { message: "Configured price does not match selected options", path: ["configuredPrice"] },
  );

function orderMessage(order: z.infer<typeof OrderSchema>): string {
  return (
    `Produkt: ${order.productName} (${order.productSlug})\n` +
    `Model: ${order.selectedModel || "—"}\n\n` +
    `Opcja WOM: ${order.selectedAddOn || "—"}\n` +
    `Cena konfiguracji: ${order.configuredPrice ? `${order.configuredPrice.toFixed(2)} zł` : "—"}\n\n` +
    `Dane kupującego:\n` +
    `Imię i nazwisko: ${order.firstName} ${order.lastName}\n` +
    `E-mail: ${order.email}\n` +
    `Telefon: ${order.phone}\n` +
    `Firma: ${order.companyName || "—"}\n` +
    `NIP: ${order.nip || "—"}\n\n` +
    `Adres dostawy:\n` +
    `Kraj: ${order.country}\n` +
    `Miasto: ${order.city}\n` +
    `Kod pocztowy: ${order.postalCode}\n` +
    `Ulica i numer: ${order.street}\n`
  );
}

router.post("/order", async (req, res): Promise<void> => {
  const parsed = OrderSchema.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "order validation failed");
    res.status(400).json({ ok: false, error: "invalid_input" });
    return;
  }
  if (parsed.data.website && parsed.data.website.length > 0) {
    res.json({ ok: true });
    return;
  }

  const order = parsed.data;
  const name = `${order.firstName} ${order.lastName}`;
  const source = `zamówienie: ${order.productName} (${order.productSlug})`;
  const message = orderMessage(order);
  req.log.info(
    { productSlug: order.productSlug, productName: order.productName },
    "new physical product order",
  );

  // Save the order first, so an SMTP failure never loses it.
  let leadId: number | null = null;
  try {
    const claim = await claimLead({
      idempotencyKey: order.idempotencyKey,
      type: "order",
      name,
      phone: order.phone,
      email: order.email,
      message,
      source,
    });
    leadId = claim.id;
    if (!claim.isNew) {
      res.json({ ok: true });
      return;
    }
  } catch (e) {
    req.log.error({ err: e }, "db save error (order) — continuing to email");
  }

  if (isMailerConfigured()) {
    try {
      await sendLeadMail({
        subject: `Nowe zamówienie — ${order.productName}`,
        replyTo: order.email,
        text: `${message}\nŹródło: ${source}\n`,
      });
      if (leadId !== null) {
        await updateLeadEmailStatus(leadId, "sent").catch((err) =>
          req.log.error({ err }, "db email-status update error (order)"),
        );
      }
    } catch (e) {
      req.log.error({ err: e }, "smtp send error (order)");
      if (leadId !== null) {
        await updateLeadEmailStatus(
          leadId,
          "failed",
          e instanceof Error ? e.message : String(e),
        ).catch((err) =>
          req.log.error({ err }, "db email-status update error (order)"),
        );
      } else {
        res.status(502).json({ ok: false, error: "email_failed" });
        return;
      }
    }
  } else {
    req.log.warn("mailer not configured — order only logged");
    if (leadId !== null) {
      await updateLeadEmailStatus(leadId, "not_configured").catch((err) =>
        req.log.error({ err }, "db email-status update error (order)"),
      );
    }
  }

  res.json({ ok: true });
});

export default router;