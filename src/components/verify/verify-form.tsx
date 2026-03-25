"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const verifyFormSchema = z.object({
  certificateId: z
    .string()
    .min(1, "Certificate ID is required")
    .regex(
      /^CERT-\d{4}-[A-Z0-9]{8}$/,
      "Invalid format — should look like CERT-2025-XK9P4R2A"
    ),
});

type VerifyFormValues = z.infer<typeof verifyFormSchema>;

export function VerifyForm() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      certificateId: "",
    },
  });

  const onSubmit = async (values: VerifyFormValues) => {
    try {
      setIsSearching(true);
      router.push(`/verify/${values.certificateId}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsSearching(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="certificateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300 text-sm">
                Certificate ID
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    {...field}
                    placeholder="CERT-2025-XK9P4R2A"
                    className="pl-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 h-11"
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase().trim())
                    }
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSearching}
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Verify Certificate
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}