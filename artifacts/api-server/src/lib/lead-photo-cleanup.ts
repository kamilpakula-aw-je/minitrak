import { logger } from "./logger";
import {
  deleteLeadPhotos,
  isLeadPhotoStorageConfigured,
} from "./lead-photos";
import { clearLeadPhotos, getSentLeadsWithPhotosOlderThan } from "./leads";

/** How often the photo retention cleanup runs (24 hours). */
const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;

/** Photos of "sent" leads older than this are deleted (6 months, ~183 days). */
const RETENTION_MS = 183 * 24 * 60 * 60 * 1000;

let cleanupRunning = false;

/**
 * Deletes stored trade-in photos of leads that were successfully handled
 * (emailStatus "sent") more than RETENTION_MS ago. Files are removed from
 * object storage first; only then is the DB `photos` metadata cleared, so
 * a partial failure leaves the lead eligible for the next cycle.
 */
export async function cleanupOldLeadPhotos(): Promise<void> {
  if (cleanupRunning) return;
  cleanupRunning = true;
  try {
    if (!isLeadPhotoStorageConfigured()) return;
    const cutoff = new Date(Date.now() - RETENTION_MS);
    const leads = await getSentLeadsWithPhotosOlderThan(cutoff);
    if (leads.length === 0) return;
    logger.info({ count: leads.length }, "cleaning up old lead photos");
    for (const lead of leads) {
      try {
        await deleteLeadPhotos(lead.photos ?? []);
        await clearLeadPhotos(lead.id);
        logger.info(
          { leadId: lead.id, photos: lead.photos?.length ?? 0 },
          "old lead photos deleted",
        );
      } catch (e) {
        logger.error(
          { leadId: lead.id, err: e },
          "lead photo cleanup failed — will retry next cycle",
        );
      }
    }
  } catch (e) {
    logger.error({ err: e }, "lead photo cleanup cycle error");
  } finally {
    cleanupRunning = false;
  }
}

/**
 * Starts the cleanup loop: one pass shortly after server start, then a
 * periodic pass every CLEANUP_INTERVAL_MS.
 */
export function startLeadPhotoCleanupLoop(): void {
  setTimeout(() => {
    void cleanupOldLeadPhotos();
  }, 30_000);
  const timer = setInterval(() => {
    void cleanupOldLeadPhotos();
  }, CLEANUP_INTERVAL_MS);
  timer.unref?.();
}
