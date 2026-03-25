import { createTRPCRouter, createCallerFactory } from "./trpc";
import { certificateRouter } from "./routers/certificate.router";
import { verificationRouter } from "./routers/verification.router";
import { templateRouter } from "./routers/template.router";
import { userRouter } from "./routers/user.router";
import { issuerRouter } from "./routers/issuer.router";

export const appRouter = createTRPCRouter({
  certificate: certificateRouter,
  verification: verificationRouter,
  template: templateRouter,
  user: userRouter,
  issuer: issuerRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);