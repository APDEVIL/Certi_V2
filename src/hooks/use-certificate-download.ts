"use client";

import { useState } from "react";
import { toast } from "sonner";

export const useCertificateDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async (pdfUrl: string, certificateId: string) => {
    if (!pdfUrl) {
      toast.error("No PDF available for this certificate");
      return;
    }

    try {
      setIsDownloading(true);

      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      toast.success("Certificate downloaded successfully");
    } catch (error) {
      toast.error("Failed to download certificate");
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return { download, isDownloading };
};