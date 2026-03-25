import { createHash } from "crypto";

export function hashCertificateId(certId: string): string {
  return createHash("sha256").update(certId).digest("hex");
}

export function generateVerificationToken(certId: string, createdAt: Date): string {
  const raw = `${certId}:${createdAt.toISOString()}`;
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}