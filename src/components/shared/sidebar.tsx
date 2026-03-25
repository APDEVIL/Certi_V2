"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/server/better-auth/client";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,Award,
  FilePlus,
  LayoutTemplate,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Certificates",
    href: "/certificates",
    icon: Award,
  },
  {
    label: "New Certificate",
    href: "/certificates/new",
    icon: FilePlus,
  },
  {
    label: "Templates",
    href: "/templates",
    icon: LayoutTemplate,
  },
  {
    label: "Verify",
    href: "/verify",
    icon: ShieldCheck,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/sign-in");
        },
      },
    });
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative flex h-screen flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center border-b border-zinc-800 px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-600">
              <span className="text-xs font-bold text-white">C</span>
            </div>
            {!collapsed && (
              <span className="text-sm font-semibold text-white tracking-tight whitespace-nowrap">
                CertGen
              </span>
            )}
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            const btn = (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  collapsed ? "justify-center" : "justify-start",
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-indigo-400" : "text-zinc-500"
                  )}
                />
                {!collapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{btn}</TooltipTrigger>
                  <TooltipContent side="right" className="bg-zinc-800 text-zinc-100 border-zinc-700">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return btn;
          })}
        </nav>

        <Separator className="bg-zinc-800" />

        {/* User section */}
        <div className="p-3">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center rounded-md px-3 py-2 text-zinc-400 hover:bg-zinc-800/60 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-zinc-800 text-zinc-100 border-zinc-700">
                Sign out
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={user?.image ?? ""} />
                <AvatarFallback className="bg-indigo-600 text-xs text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate text-xs font-medium text-white">
                  {user?.name}
                </span>
                <span className="truncate text-xs text-zinc-500">
                  {user?.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 text-zinc-500 hover:text-red-400 hover:bg-transparent"
                onClick={handleSignOut}
              >
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </aside>
    </TooltipProvider>
  );
}