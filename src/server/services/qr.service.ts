import QRCode from "qrcode";

const getVerificationUrl = (certificateId: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${baseUrl}/verify/${certificateId}`;
};

export const qrService = {
  async generateBase64(certificateId: string): Promise<string> {
    const url = getVerificationUrl(certificateId);
    const base64 = await QRCode.toDataURL(url, {
      width: 150,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
    return base64;
  },
};