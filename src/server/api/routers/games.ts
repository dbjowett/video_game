import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const gamesRouter = createTRPCRouter({
  favouriteGame: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        imageUrl: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.likedGame.create({
        data: {
          id: input.id,
          title: input.title,
          imageUrl: input.imageUrl,
          userId: ctx.session.user.id,
        },
      });
    }),

  getFavourites: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.likedGame.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
