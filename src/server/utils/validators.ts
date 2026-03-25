import { z } from "zod";
import { CERTIFICATE_STATUS, TEMPLATE_IDS } from "./constants";

export const createCertificateSchema = z.object({
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientEmail: z.string().email("Valid email required"),
  courseName: z.string().min(2, "Course name is required"),
  issuedBy: z.string().min(2, "Issuer name is required"),
  issuedAt: z.date(),
  expiresAt: z.date().optional(),
  templateId: z.enum([
    TEMPLATE_IDS.CLASSIC,
    TEMPLATE_IDS.MODERN,
    TEMPLATE_IDS.MINIMAL,
  ]),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const verifyCertificateSchema = z.object({
  certificateId: z
    .string()
    .min(1, "Certificate ID is required")
    .regex(/^CERT-\d{4}-[A-Z0-9]{8}$/, "Invalid certificate ID format"),
});

export const updateCertificateStatusSchema = z.object({
  certificateId: z.string(),
  status: z.enum([
    CERTIFICATE_STATUS.ACTIVE,
    CERTIFICATE_STATUS.REVOKED,
    CERTIFICATE_STATUS.EXPIRED,
  ]),
});

export type CreateCertificateInput = z.infer<typeof createCertificateSchema>;
export type VerifyCertificateInput = z.infer<typeof verifyCertificateSchema>;
export type UpdateCertificateStatusInput = z.infer<typeof updateCertificateStatusSchema>;