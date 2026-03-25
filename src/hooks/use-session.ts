"use client";

import { authClient } from "@/server/better-auth/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSession = () => {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    session,
    user: session?.user ?? null,
    isPending,
    error,
  };
};

export const useRequireAuth = () => {
  const { user, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/sign-in");
    }
  }, [user, isPending, router]);

  return { user, isPending };
};

export const useRedirectIfAuth = () => {
  const { user, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && user) {
      router.push("/dashboard");
    }
  }, [user, isPending, router]);

  return { user, isPending };
};