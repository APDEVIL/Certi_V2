"use client";

import { cn } from "@/lib/utils";
import { type TemplateId, TEMPLATE_IDS } from "@/server/utils/constants";
import { CheckCircle2 } from "lucide-react";

const templates = [
  {
    id: TEMPLATE_IDS.CLASSIC,
    name: "Classic",
    description: "Traditional with elegant gold borders",
    preview: (
      <div className="w-full h-full bg-amber-950/20 border border-amber-800/30 rounded flex flex-col items-center justify-center gap-1 p-3">
        <div className="w-8 h-0.5 bg-amber-600/60 rounded" />
        <div className="w-16 h-2 bg-amber-100/20 rounded mt-1" />
        <div className="w-12 h-1.5 bg-amber-100/10 rounded" />
        <div className="w-8 h-0.5 bg-amber-600/60 rounded mt-1" />
      </div>
    ),
  },
  {
    id: TEMPLATE_IDS.MODERN,
    name: "Modern",
    description: "Dark and bold with indigo accents",
    preview: (
      <div className="w-full h-full bg-zinc-900 rounded flex flex-col justify-between p-3">
        <div className="w-6 h-1 bg-indigo-500 rounded" />
        <div className="space-y-1">
          <div className="w-14 h-2 bg-white/20 rounded" />
          <div className="w-10 h-1.5 bg-white/10 rounded" />
        </div>
        <div className="flex justify-between items-end">
          <div className="w-8 h-1 bg-zinc-700 rounded" />
          <div className="w-5 h-5 bg-zinc-700 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: TEMPLATE_IDS.MINIMAL,
    name: "Minimal",
    description: "Clean white with focus on content",
    preview: (
      <div className="w-full h-full bg-white/5 rounded flex flex-col justify-between p-3">
        <div className="w-10 h-1 bg-zinc-500/40 rounded" />
        <div className="space-y-1">
          <div className="w-16 h-2 bg-white/20 rounded" />
          <div className="w-10 h-1.5 bg-white/10 rounded" />
          <div className="w-12 h-1 bg-white/10 rounded" />
        </div>
        <div className="w-full h-px bg-zinc-700" />
      </div>
    ),
  },
];

interface TemplatePickerProps {
  value: TemplateId;
  onChange: (value: TemplateId) => void;
}

export function TemplatePicker({ value, onChange }: TemplatePickerProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map((template) => {
        const isSelected = value === template.id;
        return (
          <button
            key={template.id}
            type="button"
            onClick={() => onChange(template.id as TemplateId)}
            className={cn(
              "relative flex flex-col gap-2 rounded-lg border p-2 text-left transition-all",
              isSelected
                ? "border-indigo-500 bg-indigo-500/5"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/50"
            )}
          >
            {/* Preview box */}
            <div className="h-20 w-full overflow-hidden rounded">
              {template.preview}
            </div>

            {/* Info */}
            <div className="space-y-0.5 px-1">
              <p className={cn(
                "text-xs font-medium",
                isSelected ? "text-indigo-400" : "text-zinc-300"
              )}>
                {template.name}
              </p>
              <p className="text-xs text-zinc-500 leading-tight">
                {template.description}
              </p>
            </div>

            {/* Selected indicator */}
            {isSelected && (
              <CheckCircle2 className="absolute right-2 top-2 h-4 w-4 text-indigo-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}