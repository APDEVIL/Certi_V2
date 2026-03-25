import { api } from "@/trpc/server";
import { FilePlus } from "lucide-react";
import Link from "next/link";
import { CertificateList } from "@/components/certificates/certificate-list";

export default async function CertificatesPage() {
  // Fetch initial data on the server
  const certificates = await api.certificate.list();

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Certificates
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage all your issued certificates
          </p>
        </div>
        <Link
          href="/certificates/new"
          className="flex items-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          <FilePlus className="h-4 w-4" />
          New Certificate
        </Link>
      </div>

      {/* Render the Client Component for the list */}
      <CertificateList initialData={certificates} />
    </div>
  );
}