import { customAlphabet } from "nanoid";
import { CERT_ID_PREFIX, CERT_ID_LENGTH } from "./constants";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", CERT_ID_LENGTH);

export function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const unique = nanoid();
  return `${CERT_ID_PREFIX}-${year}-${unique}`;
  // e.g. CERT-2025-XK9P4R2A
}