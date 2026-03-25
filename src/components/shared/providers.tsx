"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      {children}
      <Toaster richColors position="top-right" theme="dark" />
    </TRPCReactProvider>
  );
}