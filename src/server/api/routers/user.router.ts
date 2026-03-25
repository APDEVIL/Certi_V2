import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, ctx.session.user.id));

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    return user;
  }),
});