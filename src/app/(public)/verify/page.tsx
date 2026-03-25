import { VerifyForm } from "@/components/verify/verify-form";
import { ShieldCheck } from "lucide-react";

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="rounded-full bg-indigo-600/10 border border-indigo-600/20 p-4">
              <ShieldCheck className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Verify a Certificate
          </h1>
          <p className="text-sm text-zinc-500">
            Enter a certificate ID to verify its authenticity and current status
          </p>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <VerifyForm />
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-zinc-600">
          Certificate IDs look like{" "}
          <span className="text-zinc-400 font-mono">CERT-2025-XK9P4R2A</span>
        </p>
      </div>
    </div>
  );
}