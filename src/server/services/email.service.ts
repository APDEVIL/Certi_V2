import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailService = {
  async sendCertificate({
    recipientName,
    recipientEmail,
    courseName,
    issuedBy,
    certificateId,
    pdfUrl,
  }: {
    recipientName: string;
    recipientEmail: string;
    courseName: string;
    issuedBy: string;
    certificateId: string;
    pdfUrl: string;
  }): Promise<void> {
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify/${certificateId}`;

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME ?? "CertGen"}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: recipientEmail,
      subject: `Your certificate for ${courseName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Congratulations, ${recipientName}!</h2>
          <p>Your certificate for <strong>${courseName}</strong> issued by <strong>${issuedBy}</strong> is ready.</p>
          <p>
            <a href="${pdfUrl}" style="
              display: inline-block;
              padding: 12px 24px;
              background: #000;
              color: #fff;
              text-decoration: none;
              border-radius: 6px;
              margin-right: 12px;
            ">
              Download Certificate
            </a>
            <a href="${verifyUrl}" style="
              display: inline-block;
              padding: 12px 24px;
              background: #f5f5f5;
              color: #000;
              text-decoration: none;
              border-radius: 6px;
            ">
              Verify Certificate
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">
            Your certificate ID is: <strong>${certificateId}</strong><br/>
            You can use this ID to verify your certificate at any time.
          </p>
        </div>
      `,
    });
  },
};