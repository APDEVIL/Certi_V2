import { CertificateForm } from "@/components/certificates/certifcate-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewCertificatePage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/certificates"
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors w-fit"
        >
          <ChevronLeft className="h-3 w-3" />
          Back to certificates
        </Link>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          New Certificate
        </h1>
        <p className="text-sm text-zinc-500">
          Fill in the details to generate and send a certificate
        </p>
      </div>

      <CertificateForm />
    </div>
  );
}