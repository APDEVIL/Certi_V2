import { api } from "@/trpc/server";
import { Award, FilePlus, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { CERTIFICATE_STATUS } from "@/server/utils/constants";
import { CertificateStatusBadge } from "@/components/certificates/certificate-status-badge";

export default async function DashboardPage() {
  const certificates = await api.certificate.list();

  const total = certificates.length;
  const active = certificates.filter(
    (c) => c.status === CERTIFICATE_STATUS.ACTIVE
  ).length;
  const revoked = certificates.filter(
    (c) => c.status === CERTIFICATE_STATUS.REVOKED
  ).length;
  const expired = certificates.filter(
    (c) => c.status === CERTIFICATE_STATUS.EXPIRED
  ).length;

  const recent = certificates.slice(0, 5);

  const stats = [
    {
      label: "Total Certificates",
      value: total,
      icon: Award,
      color: "text-indigo-400",
      bg: "bg-indigo-600/10",
    },
    {
      label: "Active",
      value: active,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-600/10",
    },
    {
      label: "Revoked",
      value: revoked,
      icon: ShieldCheck,
      color: "text-red-400",
      bg: "bg-red-600/10",
    },
    {
      label: "Expired",
      value: expired,
      icon: ShieldCheck,
      color: "text-zinc-400",
      bg: "bg-zinc-600/10",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Overview of your certificate activity
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

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </p>
              <div className={`rounded-md p-1.5 ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent certificates */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-sm font-medium text-white">Recent Certificates</h2>
          <Link
            href="/certificates"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="rounded-full bg-zinc-800 p-4">
              <Award className="h-6 w-6 text-zinc-600" />
            </div>
            <p className="text-sm text-zinc-500">No certificates yet</p>
            <Link
              href="/certificates/new"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Create your first certificate →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {recent.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {cert.recipientName}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {cert.courseName}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="text-xs text-zinc-600 hidden sm:block">
                    {cert.issuedAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <CertificateStatusBadge status={cert.status} />
                  <Link
                    href={`/certificates/${cert.id}`}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}