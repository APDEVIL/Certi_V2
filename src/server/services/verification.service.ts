import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { certificates } from "@/server/db/schema";

export const verificationService = {
  async verify(certificateId: string) {
    const [certificate] = await db
      .select()
      .from(certificates)
      .where(eq(certificates.certificateId, certificateId));

    if (!certificate) return null;

    // auto-expire if past expiry date
    if (
      certificate.expiresAt &&
      new Date() > certificate.expiresAt &&
      certificate.status === "active"
    ) {
      await db
        .update(certificates)
        .set({ status: "expired", updatedAt: new Date() })
        .where(eq(certificates.certificateId, certificateId));

      certificate.status = "expired";
    }

    return {
      certificateId: certificate.certificateId,
      recipientName: certificate.recipientName,
      recipientEmail: certificate.recipientEmail,
      courseName: certificate.courseName,
      issuedBy: certificate.issuedBy,
      issuedAt: certificate.issuedAt,
      expiresAt: certificate.expiresAt,
      templateId: certificate.templateId,
      status: certificate.status,
      metadata: certificate.metadata,
      pdfUrl: certificate.pdfUrl,
    };
  },
};