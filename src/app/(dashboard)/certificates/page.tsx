import { api } from "@/trpc/server";
import { Award, FilePlus } from "lucide-react";
import Link from "next/link";
import { CertificateCard } from "@/components/certificates/certificate-card";

export default async function CertificatesPage() {
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

      {/* List */}
      {certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 py-24 gap-4">
          <div className="rounded-full bg-zinc-800 p-4">
            <Award className="h-6 w-6 text-zinc-600" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-white">No certificates yet</p>
            <p className="text-xs text-zinc-500">
              Create your first certificate to get started
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} onRefetch={function (): void {
                  throw new Error("Function not implemented.");
              } } />
          ))}
        </div>
      )}
    </div>
  );
}