import { type Lead, type LeadPhoto } from "@workspace/db";
import { logger } from "./logger";
import { isMailerConfigured, sendLeadMail, type LeadMail } from "./mailer";
import { getFailedLeads, updateLeadEmailStatus } from "./leads";
import { downloadLeadPhoto } from "./lead-photos";

/**
 * Injectable dependencies for the retry pass. Production uses the real
 * implementations; tests substitute a mock mailer (no real SMTP) and a
 * scoped lead query.
 */
export interface LeadRetryDeps {
  isMailerConfigured: () => boolean;
  getFailedLeads: () => Promise<Lead[]>;
  sendLeadMail: (mail: LeadMail) => Promise<void>;
  downloadLeadPhoto: (photo: LeadPhoto) => Promise<Buffer>;
  updateLeadEmailStatus: (
    id: number,
    status: "sent" | "failed" | "not_configured",
    error?: string,
  ) => Promise<void>;
}

const defaultDeps: LeadRetryDeps = {
  isMailerConfigured,
  getFailedLeads,
  sendLeadMail,
  downloadLeadPhoto,
  updateLeadEmailStatus,
};

/** How often failed leads are retried (15 minutes). */
const RETRY_INTERVAL_MS = 15 * 60 * 1000;

function buildLeadMailText(lead: Lead, attachedPhotos: number): string {
  if (lead.type === "trade_in") {
    // Legacy leads (photosCount > 0 but no stored photo metadata) still get
    // the explanatory note; leads with stored photos always attach them all.
    const photoNote =
      lead.photosCount > 0 && attachedPhotos === 0
        ? " (zdjęcia nie mogły zostać ponownie załączone — to ponowna wysyłka po awarii poczty)\n"
        : "\n";
    return (
      `Imię i nazwisko: ${lead.name}\n` +
      `Telefon: ${lead.phone}\n` +
      `E-mail: ${lead.email || "—"}\n` +
      `Marka maszyny: ${lead.machineBrand || "—"}\n` +
      `Model: ${lead.machineModel || "—"}\n` +
      `Rok produkcji: ${lead.machineYear || "—"}\n` +
      `Liczba zdjęć: ${lead.photosCount}` +
      photoNote +
      `Źródło: ${lead.source || "minitrak.pl/wymiana"}\n\n` +
      `Wiadomość:\n${lead.message || "—"}\n`
    );
  }
  return (
    `Imię/firma: ${lead.name}\n` +
    `Telefon: ${lead.phone}\n` +
    `E-mail: ${lead.email || "—"}\n` +
    `Źródło: ${lead.source || "formularz kontaktowy"}\n` +
    `Marketing: ${lead.marketing ? "tak" : "nie"}\n\n` +
    `Wiadomość:\n${lead.message || "—"}\n`
  );
}

function buildLeadMailSubject(lead: Lead): string {
  const base =
    lead.type === "trade_in"
      ? `Wycena maszyny w rozliczeniu — ${lead.name}`
      : `Nowe zapytanie ze stekro.pl — ${lead.name}`;
  return `[PONOWNA WYSYŁKA] ${base}`;
}

let retryRunning = false;

/**
 * Retries e-mail delivery for all leads with status "failed".
 * On success the lead status flips to "sent"; on failure it stays
 * "failed" (with the latest error) and will be retried next cycle.
 */
export async function retryFailedLeads(
  overrides: Partial<LeadRetryDeps> = {},
): Promise<void> {
  const deps: LeadRetryDeps = { ...defaultDeps, ...overrides };
  if (retryRunning) return;
  retryRunning = true;
  try {
    if (!deps.isMailerConfigured()) {
      return;
    }
    const failed = await deps.getFailedLeads();
    if (failed.length === 0) return;
    logger.info({ count: failed.length }, "retrying failed lead e-mails");
    for (const lead of failed) {
      try {
        // Re-attach stored trade-in photos from object storage. If any
        // download fails, throw so the lead stays "failed" and the next
        // cycle retries with the complete photo set — never send an
        // incomplete resend for a lead whose photos are persisted.
        const attachments: Array<{ filename: string; content: Buffer }> = [];
        for (const photo of lead.photos ?? []) {
          attachments.push({
            filename: photo.filename,
            content: await deps.downloadLeadPhoto(photo),
          });
        }
        await deps.sendLeadMail({
          subject: buildLeadMailSubject(lead),
          replyTo: lead.email || undefined,
          text: buildLeadMailText(lead, attachments.length),
          attachments: attachments.length > 0 ? attachments : undefined,
        });
        await deps.updateLeadEmailStatus(lead.id, "sent");
        logger.info({ leadId: lead.id }, "failed lead e-mail resent");
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        logger.error(
          { leadId: lead.id, err: e },
          "lead e-mail retry failed — will retry next cycle",
        );
        await deps.updateLeadEmailStatus(lead.id, "failed", message).catch((err) =>
          logger.error({ err }, "db email-status update error (retry)"),
        );
      }
    }
  } catch (e) {
    logger.error({ err: e }, "lead retry cycle error");
  } finally {
    retryRunning = false;
  }
}

/**
 * Starts the retry loop: one pass shortly after server start, then a
 * periodic pass every RETRY_INTERVAL_MS.
 */
export function startLeadRetryLoop(): void {
  setTimeout(() => {
    void retryFailedLeads();
  }, 5_000);
  const timer = setInterval(() => {
    void retryFailedLeads();
  }, RETRY_INTERVAL_MS);
  timer.unref?.();
}
