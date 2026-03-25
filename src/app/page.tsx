import Link from "next/link";
import { Award, ShieldCheck, FilePlus, LayoutTemplate } from "lucide-react";

const features = [
  {
    icon: FilePlus,
    title: "Issue Certificates",
    description: "Generate professional certificates in seconds with customizable templates.",
  },
  {
    icon: ShieldCheck,
    title: "Verify Instantly",
    description: "Anyone can verify a certificate's authenticity using its unique ID.",
  },
  {
    icon: LayoutTemplate,
    title: "Multiple Templates",
    description: "Choose from Classic, Modern, or Minimal designs to match your brand.",
  },
  {
    icon: Award,
    title: "PDF Export",
    description: "Every certificate is generated as a high-quality PDF and emailed automatically.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">

      {/* Nav */}
      <header className="border-b border-zinc-800 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
            <span className="text-xs font-bold text-white">C</span>
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">
            CertGen
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/verify"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Verify
          </Link>
          <Link
            href="/sign-in"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-sm font-medium text-white transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center space-y-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-700/40 bg-indigo-600/10 px-4 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300">
              Tamper-proof certificate verification
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
            Issue & verify certificates{" "}
            <span className="text-indigo-400">in seconds</span>
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed max-w-xl mx-auto">
            CertGen lets you create beautiful, verifiable certificates for your
            courses, events, and achievements — and share them with a single link.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-up"
            className="rounded-md bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors"
          >
            Get started free
          </Link>
          <Link
            href="/verify"
            className="rounded-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors"
          >
            Verify a certificate
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full pt-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-left space-y-3"
            >
              <div className="rounded-md bg-indigo-600/10 border border-indigo-600/20 p-2 w-fit">
                <feature.icon className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-white">{feature.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 h-12 flex items-center justify-center">
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} CertGen. All rights reserved.
        </p>
      </footer>
    </div>
  );
}