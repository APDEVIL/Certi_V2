"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { createCertificateSchema, type CreateCertificateInput } from "@/server/utils/validators";
import { TEMPLATE_IDS } from "@/server/utils/constants";
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
import { TemplatePicker } from "./template-picker";
import { CertificatePreview } from "./certificate-preview";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function CertificateForm() {
  const router = useRouter();

  const form = useForm<CreateCertificateInput, any, CreateCertificateInput>({
    resolver: zodResolver(createCertificateSchema),
    defaultValues: {
      recipientName: "",
      recipientEmail: "",
      courseName: "",
      issuedBy: "",
      issuedAt: new Date(),
      templateId: TEMPLATE_IDS.CLASSIC,
      metadata: {},
    },
  });

  const watched = form.watch();

  const createCertificate = api.certificate.create.useMutation({
    onSuccess: () => {
      toast.success("Certificate created and sent to recipient");
      router.push("/certificates");
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to create certificate");
    },
  });

  const onSubmit = (values: CreateCertificateInput) => {
    createCertificate.mutate(values);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Form */}
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Recipient */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                Recipient
              </p>
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">Full name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Smith"
                        className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="john@example.com"
                        className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="bg-zinc-800" />

            {/* Certificate details */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                Certificate details
              </p>
              <FormField
                control={form.control}
                name="courseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">Course / Achievement</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Advanced React Development"
                        className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">Issued by</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Acme Academy"
                        className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="issuedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300 text-sm">Issue date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-indigo-500 h-10"
                          value={
                            field.value instanceof Date && !isNaN(field.value.getTime())
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(e.target.value ? new Date(e.target.value) : new Date())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300 text-sm">
                        Expiry date <span className="text-zinc-600">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-indigo-500 h-10"
                          value={
                            field.value instanceof Date && !isNaN(field.value.getTime())
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(e.target.value ? new Date(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Template */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                Template
              </p>
              <FormField
                control={form.control}
                name="templateId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TemplatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={createCertificate.isPending}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
            >
              {createCertificate.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating certificate...
                </>
              ) : (
                "Generate & Send Certificate"
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* Live preview */}
      <div className="space-y-4">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
          Live preview
        </p>
        <div className="sticky top-6">
          <CertificatePreview
            data={{
              recipientName: watched.recipientName || "Recipient Name",
              courseName: watched.courseName || "Course Name",
              issuedBy: watched.issuedBy || "Organization Name",
              issuedAt: watched.issuedAt ?? new Date(),
              expiresAt: watched.expiresAt,
              templateId: watched.templateId ?? TEMPLATE_IDS.CLASSIC,
            }}
          />
          <p className="text-xs text-zinc-600 text-center mt-3">
            This is a preview — the actual PDF may differ slightly
          </p>
        </div>
      </div>
    </div>
  );
}