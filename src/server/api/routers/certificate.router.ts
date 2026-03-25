import { TRPCError } from "@trpc/server";
import { eq, desc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { certificates } from "@/server/db/schema";
import { certificateService } from "@/server/services/certificate.service";
import {
  createCertificateSchema,
  updateCertificateStatusSchema,
} from "@/server/utils/validators";
import { z } from "zod";

export const certificateRouter = createTRPCRouter({

  create: protectedProcedure
    .input(createCertificateSchema)
    .mutation(async ({ ctx, input }) => {
      const certificate = await certificateService.create({
        ...input,
        issuedById: ctx.session.user.id,
      });
      return certificate;
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(certificates)
      .where(eq(certificates.issuedById, ctx.session.user.id))
      .orderBy(desc(certificates.createdAt));
    return result;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [certificate] = await ctx.db
        .select()
        .from(certificates)
        .where(eq(certificates.id, input.id));

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

  updateStatus: protectedProcedure
    .input(updateCertificateStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db
        .select()
        .from(certificates)
        .where(eq(certificates.certificateId, input.certificateId));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Certificate not found",
        });
      }

      if (existing.issuedById !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only update your own certificates",
        });
      }

      const [updated] = await ctx.db
        .update(certificates)
        .set({ status: input.status, updatedAt: new Date() })
        .where(eq(certificates.certificateId, input.certificateId))
        .returning();

      return updated;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db
        .select()
        .from(certificates)
        .where(eq(certificates.id, input.id));

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Certificate not found" });
      }

      if (existing.issuedById !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Not your certificate" });
      }

      await ctx.db.delete(certificates).where(eq(certificates.id, input.id));
      return { success: true };
    }),
});