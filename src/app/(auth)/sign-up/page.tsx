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

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Valid email required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    setIsPending(true);
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? "Failed to create account");
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
              Create an account
            </h1>
            <p className="text-sm text-zinc-500">
              Start issuing certificates with CertGen
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Smith"
                        className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">
                      Confirm password
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
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}