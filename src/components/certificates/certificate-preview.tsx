"use client";

import { type TemplateId, TEMPLATE_IDS } from "@/server/utils/constants";
import { cn } from "@/lib/utils";

export type PreviewData = {
  recipientName: string;
  courseName: string;
  issuedBy: string;
  issuedAt: Date;
  expiresAt?: Date | null;
  templateId: TemplateId;
};

interface CertificatePreviewProps {
  data: PreviewData;
  className?: string;
}

export function CertificatePreview({ data, className }: CertificatePreviewProps) {
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

  return (
    <div className={cn("w-full", className)}>
      {data.templateId === TEMPLATE_IDS.CLASSIC && (
        <ClassicPreview data={data} formatDate={formatDate} />
      )}
      {data.templateId === TEMPLATE_IDS.MODERN && (
        <ModernPreview data={data} formatDate={formatDate} />
      )}
      {data.templateId === TEMPLATE_IDS.MINIMAL && (
        <MinimalPreview data={data} formatDate={formatDate} />
      )}
    </div>
  );
}

type PreviewProps = {
  data: PreviewData;
  formatDate: (date: Date) => string;
};

function ClassicPreview({ data, formatDate }: PreviewProps) {
  return (
    <div className="relative w-full aspect-[1.414/1] bg-amber-950/10 border-2 border-amber-800/40 rounded-lg overflow-hidden flex flex-col items-center justify-center p-8 text-center">
      {/* Decorative corner borders */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600/50 rounded-tl" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600/50 rounded-tr" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600/50 rounded-bl" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600/50 rounded-br" />

      <div className="space-y-4 max-w-sm">
        <div className="space-y-1">
          <p className="text-xs tracking-[0.3em] text-amber-600/80 uppercase font-medium">
            Certificate
          </p>
          <p className="text-xs tracking-[0.2em] text-amber-700/60 uppercase">
            of Completion
          </p>
        </div>

        <div className="w-24 h-px bg-amber-600/40 mx-auto" />

        <div className="space-y-1">
          <p className="text-xs text-amber-100/40">This certificate is proudly presented to</p>
          <p className={cn(
            "font-semibold text-amber-100/90 leading-tight",
            data.recipientName.length > 20 ? "text-lg" : "text-2xl"
          )}>
            {data.recipientName || "Recipient Name"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-amber-100/40">for successfully completing</p>
          <p className="text-sm font-medium text-amber-200/80">
            {data.courseName || "Course Name"}
          </p>
        </div>

        <div className="w-24 h-px bg-amber-600/40 mx-auto" />

        <div className="space-y-0.5">
          <p className="text-xs text-amber-100/40">
            Issued by{" "}
            <span className="text-amber-200/70">
              {data.issuedBy || "Issuer"}
            </span>
          </p>
          <p className="text-xs text-amber-100/30">
            {formatDate(data.issuedAt)}
          </p>
          {data.expiresAt && (
            <p className="text-xs text-amber-100/20">
              Valid until {formatDate(data.expiresAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ModernPreview({ data, formatDate }: PreviewProps) {
  return (
    <div className="relative w-full aspect-[1.414/1] bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden flex flex-col justify-between p-8">
      {/* Top accent */}
      <div className="space-y-4">
        <div className="w-10 h-1 bg-indigo-500 rounded" />
        <p className="text-xs tracking-[0.3em] text-indigo-400 uppercase font-medium">
          Certificate of Completion
        </p>
      </div>

      {/* Main content */}
      <div className="space-y-2">
        <p className={cn(
          "font-bold text-white leading-tight",
          data.recipientName.length > 20 ? "text-2xl" : "text-4xl"
        )}>
          {data.recipientName || "Recipient Name"}
        </p>
        <p className="text-xs text-zinc-500">completed</p>
        <p className="text-lg text-zinc-300 font-medium">
          {data.courseName || "Course Name"}
        </p>
        <p className="text-xs text-zinc-500">
          Issued by{" "}
          <span className="text-zinc-400">{data.issuedBy || "Issuer"}</span>
          {" · "}
          {formatDate(data.issuedAt)}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-xs text-zinc-600">Certificate ID</p>
          <p className="text-xs text-zinc-500 font-mono">CERT-2025-••••••••</p>
        </div>
        <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-zinc-700 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

function MinimalPreview({ data, formatDate }: PreviewProps) {
  return (
    <div className="relative w-full aspect-[1.414/1] bg-white/[0.03] border border-zinc-800 rounded-lg overflow-hidden flex flex-col justify-between p-8">
      {/* Header */}
      <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
        Certificate of Completion
      </p>

      {/* Main content */}
      <div className="space-y-3">
        <p className={cn(
          "font-bold text-white leading-tight",
          data.recipientName.length > 20 ? "text-2xl" : "text-3xl"
        )}>
          {data.recipientName || "Recipient Name"}
        </p>
        <div className="space-y-1">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Course</p>
          <p className="text-base text-zinc-300">
            {data.courseName || "Course Name"}
          </p>
        </div>
        <p className="text-xs text-zinc-500">
          Issued by {data.issuedBy || "Issuer"} · {formatDate(data.issuedAt)}
        </p>
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <div className="w-full h-px bg-zinc-800" />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs text-zinc-600 font-mono">CERT-2025-••••••••</p>
            {data.expiresAt && (
              <p className="text-xs text-zinc-600">
                Valid until {formatDate(data.expiresAt)}
              </p>
            )}
          </div>
          <div className="w-8 h-8 bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}