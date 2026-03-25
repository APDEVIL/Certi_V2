import { TEMPLATE_IDS } from "@/server/utils/constants";
import { CheckCircle2 } from "lucide-react";

const templates = [
  {
    id: TEMPLATE_IDS.CLASSIC,
    name: "Classic",
    description: "A timeless design with elegant typography and traditional certificate styling.",
    accent: "from-amber-900/30 to-yellow-900/20",
    border: "border-amber-800/40",
    tag: "Most Popular",
  },
  {
    id: TEMPLATE_IDS.MODERN,
    name: "Modern",
    description: "A clean, contemporary layout with bold accents and minimal ornamentation.",
    accent: "from-indigo-900/30 to-blue-900/20",
    border: "border-indigo-800/40",
    tag: "Recommended",
  },
  {
    id: TEMPLATE_IDS.MINIMAL,
    name: "Minimal",
    description: "A stripped-back design that lets the content speak for itself.",
    accent: "from-zinc-800/60 to-zinc-900/40",
    border: "border-zinc-700/40",
    tag: null,
  },
];

export default function TemplatesPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Templates
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Choose a template when creating a new certificate
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative rounded-xl border ${template.border} bg-gradient-to-br ${template.accent} p-6 space-y-4`}
          >
            {template.tag && (
              <span className="absolute top-4 right-4 text-xs font-medium text-indigo-300 bg-indigo-600/20 border border-indigo-700/40 rounded-full px-2.5 py-0.5">
                {template.tag}
              </span>
            )}

            {/* Preview mockup */}
            <div className="rounded-lg border border-zinc-700/50 bg-zinc-950/60 aspect-[4/3] flex flex-col items-center justify-center gap-2 px-6">
              <div className="h-1.5 w-16 rounded-full bg-zinc-700" />
              <div className="h-3 w-28 rounded-full bg-zinc-600" />
              <div className="h-1.5 w-20 rounded-full bg-zinc-700" />
              <div className="mt-2 h-px w-24 bg-zinc-700" />
              <div className="h-1.5 w-16 rounded-full bg-zinc-700 mt-2" />
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                <h3 className="text-sm font-semibold text-white">{template.name}</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                {template.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-600">
        Templates are selected during certificate creation. More templates coming soon.
      </p>
    </div>
  );
}