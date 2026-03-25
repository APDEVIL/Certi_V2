import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { certificates } from "@/server/db/schema";
import { verifyCertificateSchema } from "@/server/utils/validators";

export const verificationRouter = createTRPCRouter({

  verify: publicProcedure
    .input(verifyCertificateSchema)
    .query(async ({ ctx, input }) => {
      const [certificate] = await ctx.db
        .select()
        .from(certificates)
        .where(eq(certificates.certificateId, input.certificateId));

      if (!certificate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No certificate found with this ID",
        });
      }

      // auto-expire if past expiry date
      if (
        certificate.expiresAt &&
        new Date() > certificate.expiresAt &&
        certificate.status === "active"
      ) {
        await ctx.db
          .update(certificates)
          .set({ status: "expired", updatedAt: new Date() })
          .where(eq(certificates.certificateId, input.certificateId));

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
    }),
});