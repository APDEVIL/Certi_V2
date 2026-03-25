import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const storageService = {
  async uploadPdf(
    pdfBuffer: Buffer,
    fileName: string
  ): Promise<string> {
    // Force into a plain ArrayBuffer — avoids SharedArrayBuffer type conflict
    const arrayBuffer = pdfBuffer.buffer.slice(
      pdfBuffer.byteOffset,
      pdfBuffer.byteOffset + pdfBuffer.byteLength
    ) as ArrayBuffer;

    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const file = new File([blob], fileName, { type: "application/pdf" });

    const response = await utapi.uploadFiles(file);

    if (response.error) {
      throw new Error(`Upload failed: ${response.error.message}`);
    }

    // FIXED: Changed .url to .ufsUrl for Uploadthing v9 compatibility
    if (!response.data?.ufsUrl) {
      throw new Error("Upload succeeded but no URL returned");
    }

    return response.data.ufsUrl;
  },

  async deleteFile(url: string): Promise<void> {
    const key = url.split("/").pop();
    if (!key) throw new Error("Invalid file URL");
    await utapi.deleteFiles(key);
  },
};