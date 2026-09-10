import {
  pgTable,
  text,
  serial,
  boolean,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export type LeadPhoto = {
  /** Full object storage path, e.g. "/<bucket>/.private/lead-photos/<uuid>" */
  path: string;
  filename: string;
  contentType: string;
};

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  // Nullable for backwards compatibility with leads created before idempotency
  // was introduced. Every new public form submission supplies this value.
  idempotencyKey: text("idempotency_key").unique(),
  type: text("type").notNull(), // "contact" | "trade_in" | "order"
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message"),
  machineBrand: text("machine_brand"),
  machineModel: text("machine_model"),
  machineYear: text("machine_year"),
  photosCount: integer("photos_count").notNull().default(0),
  // Stored trade-in photos: object storage path + original filename + MIME type.
  photos: jsonb("photos").$type<LeadPhoto[]>().notNull().default([]),
  marketing: boolean("marketing").notNull().default(false),
  source: text("source"),
  emailStatus: text("email_status").notNull().default("pending"), // "pending" | "sent" | "failed" | "not_configured"
  emailError: text("email_error"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
