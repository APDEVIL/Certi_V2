"use client";

import { useSession } from "@/hooks/use-session";
import { authClient } from "@/server/better-auth/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

export function Navbar() {
  const { user } = useSession();
  const router = useRouter();

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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
            <span className="text-xs font-bold text-white">C</span>
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">
            CertGen
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image ?? ""} alt={user.name} />
                    <AvatarFallback className="bg-indigo-600 text-xs text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-52 border-zinc-800 bg-zinc-900 text-zinc-100"
                align="end"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  className="cursor-pointer text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => router.push("/dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => router.push("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-400 hover:bg-zinc-800 hover:text-red-300"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white"
                onClick={() => router.push("/sign-in")}
              >
                Sign in
              </Button>
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={() => router.push("/sign-up")}
              >
                Get started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}