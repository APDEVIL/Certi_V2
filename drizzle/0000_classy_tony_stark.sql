CREATE TYPE "public"."certificate_status" AS ENUM('active', 'revoked', 'expired');--> statement-breakpoint
CREATE TYPE "public"."template_id" AS ENUM('classic', 'modern', 'minimal');--> statement-breakpoint
CREATE TABLE "generate_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"id_token" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generate_certificates" (
	"id" text PRIMARY KEY NOT NULL,
	"certificate_id" text NOT NULL,
	"issued_by_id" text NOT NULL,
	"recipient_name" text NOT NULL,
	"recipient_email" text NOT NULL,
	"course_name" text NOT NULL,
	"issued_by" text NOT NULL,
	"issued_at" timestamp NOT NULL,
	"expires_at" timestamp,
	"template_id" "template_id" NOT NULL,
	"status" "certificate_status" DEFAULT 'active' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"pdf_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "generate_certificates_certificate_id_unique" UNIQUE("certificate_id")
);
--> statement-breakpoint
CREATE TABLE "generate_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "generate_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "generate_users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "generate_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "generate_verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "generate_accounts" ADD CONSTRAINT "generate_accounts_user_id_generate_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."generate_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generate_certificates" ADD CONSTRAINT "generate_certificates_issued_by_id_generate_users_id_fk" FOREIGN KEY ("issued_by_id") REFERENCES "public"."generate_users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generate_sessions" ADD CONSTRAINT "generate_sessions_user_id_generate_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."generate_users"("id") ON DELETE cascade ON UPDATE no action;