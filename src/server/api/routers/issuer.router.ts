import { TRPCError } from "@trpc/server";
import { eq, desc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { certificates } from "@/server/db/schema";
import { z } from "zod";

export const issuerRouter = createTRPCRouter({

  // get all certificates issued by the logged-in user with stats
  dashboard: protectedProcedure.query(async ({ ctx }) => {
    const allCerts = await ctx.db
      .select()
      .from(certificates)
      .where(eq(certificates.issuedById, ctx.session.user.id))
      .orderBy(desc(certificates.createdAt));

    const total = allCerts.length;
    const active = allCerts.filter((c) => c.status === "active").length;
    const revoked = allCerts.filter((c) => c.status === "revoked").length;
    const expired = allCerts.filter((c) => c.status === "expired").length;

    return {
      stats: { total, active, revoked, expired },
      recentCertificates: allCerts.slice(0, 5),
    };
  }),

  // get single certificate issued by this user by certificateId
  getByCertificateId: protectedProcedure
    .input(z.object({ certificateId: z.string() }))
    .query(async ({ ctx, input }) => {
      const [certificate] = await ctx.db
        .select()
        .from(certificates)
        .where(eq(certificates.certificateId, input.certificateId));

      if (!certificate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Certificate not found",
        });
      }

      if (certificate.issuedById !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have access to this certificate",
        });
      }

      return certificate;
    }),
});