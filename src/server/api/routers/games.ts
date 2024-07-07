import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { FaveGameValidator } from "../schemas/games";

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

  deleteFavouriteGame: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.likedGame.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getFavourites: protectedProcedure.query(({ ctx }) => {
    const faveGames = ctx.prisma.likedGame.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    const { data: games, success } =
      FaveGameValidator.array().safeParse(faveGames);

    if (!success) return [];
    return games;
  }),
});
