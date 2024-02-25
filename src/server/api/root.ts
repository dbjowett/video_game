import { createTRPCRouter } from "~/server/api/trpc";
import { gamesRouter } from "./routers/games";
import { igdbRouter } from "./routers/igdb";

export const appRouter = createTRPCRouter({
  games: gamesRouter,
  igdb: igdbRouter,
});

export type AppRouter = typeof appRouter;
