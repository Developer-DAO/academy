// Imports
// ========================================================
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const todosRouter = createTRPCRouter({
  /**
   * All todos belonging to the session user
   */
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return todos;
  }),
  /**
   * Add todo belonging to the session user
   */
  add: protectedProcedure
    .input(z.object({ task: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.todo.create({
        data: {
          task: input.task,
          userId: ctx.session.user.id,
        },
      });
    }),
  /**
   * Remove todo belonging to the session user*
   */
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.todo.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
  /**
   * Update todo belonging to the session user
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        task: z.string().optional(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log({ input });
      const data: { task?: string; completed?: boolean } = {};
      if (input.task) {
        data.task = input.task;
      }
      if (typeof input.completed !== "undefined") {
        data.completed = input.completed;
      }

      return await ctx.prisma.todo.updateMany({
        data,
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
});
