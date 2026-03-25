"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/server/better-auth/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signInSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    setIsPending(true);
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success("Signed in successfully");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? "Failed to sign in");
          setIsPending(false);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
            <span className="text-sm font-bold text-white">C</span>
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-500">
              Sign in to your CertGen account
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="john@example.com"
                        className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}