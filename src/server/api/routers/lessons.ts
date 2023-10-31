// Imports
// ========================================================
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const lessonsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const lessons = await ctx.prisma.lessons.findMany();
    return lessons;
  }),
});
