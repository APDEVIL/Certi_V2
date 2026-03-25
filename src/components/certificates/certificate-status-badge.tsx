import { Badge } from "@/components/ui/badge";
import { type CertificateStatus } from "@/server/utils/constants";
import { cn } from "@/lib/utils";

interface CertificateStatusBadgeProps {
  status: CertificateStatus;
  className?: string;
}

export function CertificateStatusBadge({
  status,
  className,
}: CertificateStatusBadgeProps) {
  const config = {
    active: {
      label: "Active",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10",
    },
    revoked: {
      label: "Revoked",
      className: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/10",
    },
    expired: {
      label: "Expired",
      className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20 hover:bg-zinc-500/10",
    },
  };

  const { label, className: statusClassName } = config[status];

  return (
    <Badge
      variant="outline"
      className={cn(statusClassName, "text-xs font-medium", className)}
    >
      {label}
    </Badge>
  );
}