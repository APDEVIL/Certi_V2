export const CERT_ID_PREFIX = "CERT" as const;
export const CERT_ID_LENGTH = 8;

export const CERTIFICATE_STATUS = {
  ACTIVE: "active",
  REVOKED: "revoked",
  EXPIRED: "expired",
} as const;

export const TEMPLATE_IDS = {
  CLASSIC: "classic",
  MODERN: "modern",
  MINIMAL: "minimal",
} as const;

export type CertificateStatus =
  (typeof CERTIFICATE_STATUS)[keyof typeof CERTIFICATE_STATUS];

export type TemplateId = (typeof TEMPLATE_IDS)[keyof typeof TEMPLATE_IDS];