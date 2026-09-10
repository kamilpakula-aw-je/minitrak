import { db, leadsTable, type InsertLead, type Lead } from "@workspace/db";
import { and, asc, desc, eq, lt, sql } from "drizzle-orm";

/**
 * Saves the lead to the database. Returns the lead id, or null when the
 * insert failed (the caller decides how to proceed — the e-mail path must
 * still run so no lead is lost entirely).
 */
export type LeadClaim = {
  id: number;
  isNew: boolean;
};

/**
 * Atomically claims an idempotency key by inserting the lead. PostgreSQL's
 * unique constraint serializes concurrent requests with the same key.
 */
export async function claimLead(lead: InsertLead & { idempotencyKey: string }): Promise<LeadClaim> {
  const [inserted] = await db
    .insert(leadsTable)
    .values(lead)
    .onConflictDoNothing({ target: leadsTable.idempotencyKey })
    .returning({ id: leadsTable.id });
  if (inserted) return { id: inserted.id, isNew: true };

  const [existing] = await db
    .select({ id: leadsTable.id })
    .from(leadsTable)
    .where(eq(leadsTable.idempotencyKey, lead.idempotencyKey))
    .limit(1);
  if (!existing) {
    throw new Error("Idempotency key conflict did not resolve to an existing lead");
  }
  return { id: existing.id, isNew: false };
}

export async function updateLeadEmailStatus(
  id: number,
  emailStatus: "sent" | "failed" | "not_configured",
  emailError?: string,
): Promise<void> {
  await db
    .update(leadsTable)
    .set({ emailStatus, emailError: emailError ?? null })
    .where(eq(leadsTable.id, id));
}

export async function updateLeadPhotos(
  id: number,
  photos: Lead["photos"],
  photosCount: number,
): Promise<void> {
  await db
    .update(leadsTable)
    .set({ photos, photosCount })
    .where(eq(leadsTable.id, id));
}

/**
 * Returns leads with status "sent" created before the cutoff that still
 * have stored photos, oldest first.
 */
export async function getSentLeadsWithPhotosOlderThan(
  cutoff: Date,
): Promise<Lead[]> {
  return db
    .select()
    .from(leadsTable)
    .where(
      and(
        eq(leadsTable.emailStatus, "sent"),
        lt(leadsTable.createdAt, cutoff),
        sql`jsonb_array_length(${leadsTable.photos}) > 0`,
      ),
    )
    .orderBy(asc(leadsTable.createdAt));
}

/** Returns a single lead by id, or null when not found. */
export async function getLeadById(id: number): Promise<Lead | null> {
  const [row] = await db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.id, id))
    .limit(1);
  return row ?? null;
}

/** Returns all leads, newest first. */
export async function getAllLeads(): Promise<Lead[]> {
  return db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
}

/** Returns leads whose e-mail delivery failed, oldest first. */
export async function getFailedLeads(): Promise<Lead[]> {
  return db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.emailStatus, "failed"))
    .orderBy(asc(leadsTable.createdAt));
}

/** Clears the stored photo metadata after the files were deleted. */
export async function clearLeadPhotos(id: number): Promise<void> {
  await db
    .update(leadsTable)
    .set({ photos: [] })
    .where(eq(leadsTable.id, id));
}
