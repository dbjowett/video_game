import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const gamesRouter = createTRPCRouter({
  // ** Search **
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      // get from external api

      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // ** Popular **

  // ** Upcoming **

  // ** Latest Releases **

  // ** Comments **

  // ** Favourited Games **
  getLikedGames: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.likedGame.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
