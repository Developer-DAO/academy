// Imports
// ========================================================
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const lessonsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const lessons = await ctx.prisma.lessons.findMany();
    return lessons;
  }),
});
