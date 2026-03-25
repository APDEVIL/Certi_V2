"use client";

import { api } from "@/trpc/react";
import { Award, FilePlus } from "lucide-react";
import Link from "next/link";
import { CertificateCard } from "./certificate-card";

interface CertificateListProps {
  initialData: any[]; // You can use your Certificate type here
}

export function CertificateList({ initialData }: CertificateListProps) {
  // Use tRPC on the client to allow for easy refetching
  const { data: certificates, refetch } = api.certificate.list.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
  });

  if (certificates.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {certificates.map((cert) => (
        <CertificateCard 
          key={cert.id} 
          certificate={cert} 
          onRefetch={() => void refetch()} 
        />
      ))}
    </div>
  );
}