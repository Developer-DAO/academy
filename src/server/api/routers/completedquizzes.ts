// Imports
// ========================================================
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const completedQuizzesRouter = createTRPCRouter({
  /**
   * Add completed Quizz belonging to the session user
   */
  add: protectedProcedure
    .input(z.object({ lesson: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.completedQuizzes.create({
        data: {
          lesson: input.lesson,
          userId: ctx.session.user.id,
          completed: true,
        },
      });
    }),
});
