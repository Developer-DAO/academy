import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
// import { todosRouter } from "@/server/api/routers/todos";
import { completedQuizzesRouter } from "@/server/api/routers/completedquizzes";
import { lessonsRouter } from "@/server/api/routers/lessons";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  lessons: lessonsRouter,
  completedQuizzes: completedQuizzesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
