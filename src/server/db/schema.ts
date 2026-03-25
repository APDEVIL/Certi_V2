import { pgTable, text, timestamp, jsonb, pgEnum, boolean } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { CERTIFICATE_STATUS, TEMPLATE_IDS } from "../utils/constants";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const certificateStatusEnum = pgEnum("certificate_status", [
  CERTIFICATE_STATUS.ACTIVE,
  CERTIFICATE_STATUS.REVOKED,
  CERTIFICATE_STATUS.EXPIRED,
]);

export const templateIdEnum = pgEnum("template_id", [
  TEMPLATE_IDS.CLASSIC,
  TEMPLATE_IDS.MODERN,
  TEMPLATE_IDS.MINIMAL,
]);

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable("generate_users", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// ─── Better-Auth required tables ──────────────────────────────────────────────

export const sessions = pgTable("generate_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const accounts = pgTable("generate_accounts", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: "string" }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: "string" }),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const verifications = pgTable("generate_verifications", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// ─── Certificates ─────────────────────────────────────────────────────────────

export const certificates = pgTable("generate_certificates", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  certificateId: text("certificate_id").notNull().unique(),
  issuedById: text("issued_by_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  recipientName: text("recipient_name").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  courseName: text("course_name").notNull(),
  issuedBy: text("issued_by").notNull(),
  issuedAt: timestamp("issued_at", { mode: "date" }).notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }),
  templateId: templateIdEnum("template_id").notNull(),
  status: certificateStatusEnum("status").notNull().default("active"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  pdfUrl: text("pdf_url"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Certificate = typeof certificates.$inferSelect;
export type NewCertificate = typeof certificates.$inferInsert;