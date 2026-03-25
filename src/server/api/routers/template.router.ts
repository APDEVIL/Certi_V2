import { createTRPCRouter, publicProcedure } from "../trpc";
import { TEMPLATE_IDS } from "@/server/utils/constants";

const templates = [
  {
    id: TEMPLATE_IDS.CLASSIC,
    name: "Classic",
    description: "Traditional certificate with elegant borders and serif typography",
    thumbnail: "/templates/classic.png",
  },
  {
    id: TEMPLATE_IDS.MODERN,
    name: "Modern",
    description: "Clean and minimal design with bold accents",
    thumbnail: "/templates/modern.png",
  },
  {
    id: TEMPLATE_IDS.MINIMAL,
    name: "Minimal",
    description: "Simple and professional with focus on content",
    thumbnail: "/templates/minimal.png",
  },
];

export const templateRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return templates;
  }),

  getById: publicProcedure
    .input(
      (val: unknown) => {
        if (typeof val === "string") return val;
        throw new Error("Invalid template id");
      }
    )
    .query(({ input }) => {
      const template = templates.find((t) => t.id === input);
      if (!template) throw new Error("Template not found");
      return template;
    }),
});