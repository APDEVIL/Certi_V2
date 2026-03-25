"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { type Certificate } from "@/server/db/schema";
import { CertificateStatusBadge } from "./certificate-status-badge";
import { useCertificateDownload } from "@/hooks/use-certificate-download";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  MoreHorizontal,
  Eye,
  ShieldOff,
  Trash2,
  Copy,
  Loader2,
} from "lucide-react";

interface CertificateCardProps {
  certificate: Certificate;
  onRefetch: () => void;
}

export function CertificateCard({ certificate, onRefetch }: CertificateCardProps) {
  const router = useRouter();
  const { download, isDownloading } = useCertificateDownload();
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateStatus = api.certificate.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Certificate revoked");
      setShowRevokeDialog(false);
      onRefetch();
    },
    onError: () => toast.error("Failed to revoke certificate"),
  });

  const deleteCert = api.certificate.delete.useMutation({
    onSuccess: () => {
      toast.success("Certificate deleted");
      setShowDeleteDialog(false);
      onRefetch();
    },
    onError: () => toast.error("Failed to delete certificate"),
  });

  const handleCopyId = () => {
    void navigator.clipboard.writeText(certificate.certificateId);
    toast.success("Certificate ID copied");
  };

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            {/* Left */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <CertificateStatusBadge status={certificate.status} />
                <span className="text-xs text-zinc-500 font-mono">
                  {certificate.certificateId}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white truncate">
                  {certificate.recipientName}
                </p>
                <p className="text-xs text-zinc-400 truncate">
                  {certificate.recipientEmail}
                </p>
              </div>
              <p className="text-xs text-zinc-500 truncate">
                {certificate.courseName}
              </p>
            </div>

            {/* Right — actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-500 hover:text-white hover:bg-zinc-800 shrink-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-zinc-900 border-zinc-800 text-zinc-300"
              >
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-zinc-800 hover:text-white"
                  onClick={() => router.push(`/certificates/${certificate.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-zinc-800 hover:text-white"
                  onClick={handleCopyId}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy cert ID
                </DropdownMenuItem>
                {certificate.pdfUrl && (
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-zinc-800 hover:text-white"
                    onClick={() =>
                      download(certificate.pdfUrl!, certificate.certificateId)
                    }
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </DropdownMenuItem>
                )}
                {certificate.status === "active" && (
                  <>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-400 hover:bg-zinc-800 hover:text-red-300"
                      onClick={() => setShowRevokeDialog(true)}
                    >
                      <ShieldOff className="mr-2 h-4 w-4" />
                      Revoke
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-400 hover:bg-zinc-800 hover:text-red-300"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>

        <CardFooter className="px-5 py-3 border-t border-zinc-800 flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            Issued {formatDate(certificate.issuedAt)}
          </p>
          {certificate.pdfUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 gap-1.5"
              disabled={isDownloading}
              onClick={() =>
                download(certificate.pdfUrl!, certificate.certificateId)
              }
            >
              {isDownloading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Download className="h-3 w-3" />
              )}
              Download
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Revoke dialog */}
      <Dialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Revoke certificate?</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This will permanently revoke{" "}
              <span className="text-zinc-200 font-medium font-mono">
                {certificate.certificateId}
              </span>
              . The recipient will no longer be able to verify it. This cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              onClick={() => setShowRevokeDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              disabled={updateStatus.isPending}
              onClick={() =>
                updateStatus.mutate({
                  certificateId: certificate.certificateId,
                  status: "revoked",
                })
              }
            >
              {updateStatus.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Revoke"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Delete certificate?</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This will permanently delete this certificate and its PDF. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              disabled={deleteCert.isPending}
              onClick={() => deleteCert.mutate({ id: certificate.id })}
            >
              {deleteCert.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}