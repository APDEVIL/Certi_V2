import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // better auth
    BETTER_AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    BETTER_AUTH_URL: z.string().url().optional(),
    BETTER_AUTH_GITHUB_CLIENT_ID: z.string(),
    BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string(),

    // database
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // uploadthing
    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),

    // smtp
    SMTP_HOST: z.string(),
    SMTP_PORT: z.string().default("587"),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),
    SMTP_FROM_NAME: z.string().default("CertGen"),
    SMTP_FROM_EMAIL: z.string().email(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    // better auth
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_GITHUB_CLIENT_ID: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
    BETTER_AUTH_GITHUB_CLIENT_SECRET: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,

    // database
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    // uploadthing
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,

    // smtp
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,

    // client
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});