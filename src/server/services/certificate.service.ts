import { db } from "@/server/db";
import { certificates } from "@/server/db/schema";
import { generateCertificateId } from "@/server/utils/cart-id";
import { type CreateCertificateInput } from "@/server/utils/validators";
import { qrService } from "./qr.service";
import { pdfService } from "./pdf.service";
import { storageService } from "./storage.service";
import { emailService } from "./email.service";

type CreateCertificatePayload = CreateCertificateInput & {
  issuedById: string;
};

export const certificateService = {
  async create(input: CreateCertificatePayload) {
    // 1. generate unique human-readable certificate ID
    const certificateId = generateCertificateId();

    // 2. generate QR code pointing to the verification page
    const qrCodeBase64 = await qrService.generateBase64(certificateId);

    // 3. generate PDF with the chosen template + QR code
    const pdfBuffer = await pdfService.generate({
      certificateId,
      recipientName: input.recipientName,
      courseName: input.courseName,
      issuedBy: input.issuedBy,
      issuedAt: input.issuedAt,
      expiresAt: input.expiresAt,
      templateId: input.templateId,
      qrCodeBase64,
      metadata: input.metadata,
    });

    // 4. upload PDF to uploadthing — get back a permanent URL
    const pdfUrl = await storageService.uploadPdf(
      pdfBuffer,
      `${certificateId}.pdf`
    );

    // 5. save certificate to database
    const [certificate] = await db
      .insert(certificates)
      .values({
        certificateId,
        issuedById: input.issuedById,
        recipientName: input.recipientName,
        recipientEmail: input.recipientEmail,
        courseName: input.courseName,
        issuedBy: input.issuedBy,
        issuedAt: input.issuedAt,
        expiresAt: input.expiresAt,
        templateId: input.templateId,
        metadata: input.metadata ?? {},
        pdfUrl,
      })
      .returning();

    // 6. send certificate email to recipient
    await emailService.sendCertificate({
      recipientName: input.recipientName,
      recipientEmail: input.recipientEmail,
      courseName: input.courseName,
      issuedBy: input.issuedBy,
      certificateId,
      pdfUrl,
    });

    return certificate;
  },
};