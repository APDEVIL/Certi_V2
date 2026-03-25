import { verificationService } from "@/server/services/verification.service";
import { Building2, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CertificateStatusBadge } from "@/components/certificates/certificate-status-badge";

interface Props {
  params: Promise<{ certId: string }>;
}

export default async function PublicCertificatePage({ params }: Props) {
  const { certId } = await params;
  
  // This now runs securely on the server
  const cert = await verificationService.verify(certId);

  if (!cert) notFound();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-6">

        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
              <span className="text-xs font-bold text-white">C</span>
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">
              CertGen
            </span>
          </Link>
        </div>

        {/* Certificate card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600" />

          <div className="p-8 space-y-6">
            {/* Title */}
            <div className="text-center space-y-1">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                Certificate of Completion
              </p>
              <h1 className="text-2xl font-semibold text-white tracking-tight">
                {cert.courseName}
              </h1>
            </div>

            {/* Recipient */}
            <div className="text-center">
              <p className="text-xs text-zinc-500">Awarded to</p>
              <p className="text-xl font-semibold text-indigo-300 mt-1">
                {cert.recipientName}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-zinc-800" />

            {/* Details */}
            <div className="space-y-3">
              <DetailRow
                icon={Building2}
                label="Issued by"
                value={cert.issuedBy}
              />
              <DetailRow
                icon={Calendar}
                label="Issue date"
                value={cert.issuedAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              />
              {cert.expiresAt && (
                <DetailRow
                  icon={Calendar}
                  label="Expires"
                  value={cert.expiresAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                />
              )}
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-zinc-600 shrink-0" />
                <span className="text-xs text-zinc-500 w-24 shrink-0">Status</span>
                <CertificateStatusBadge status={cert.status} />
              </div>
            </div>

            {/* Certificate ID */}
            <div className="rounded-lg bg-zinc-950/60 border border-zinc-800 px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Certificate ID</span>
              <span className="text-xs font-mono text-zinc-300">
                {cert.certificateId}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {cert.pdfUrl && (
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-md bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Download PDF
            </a>
          )}
          <Link
            href={`/verify/${cert.certificateId}`}
            className="flex items-center justify-center gap-2 w-full rounded-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors"
          >
            <ShieldCheck className="h-4 w-4" />
            Verify Authenticity
          </Link>
        </div>

        <p className="text-center text-xs text-zinc-600">
          Powered by{" "}
          <Link href="/" className="text-zinc-500 hover:text-zinc-400 transition-colors">
            CertGen
          </Link>
        </p>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-zinc-600 shrink-0" />
      <span className="text-xs text-zinc-500 w-24 shrink-0">{label}</span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );
}