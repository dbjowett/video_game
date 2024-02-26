import { TRPCError } from "@trpc/server";
import { z } from "zod";
import igdb from "~/pages/api/utils/igdb";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { constructQuery } from "~/utils/query_constructor";
import { GameValidator, type Game } from "../schemas/games";

export const igdbRouter = createTRPCRouter({
  // ** Get game by id. Returns a single game **
  getGameById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const query_data = constructQuery({
        fields: [
          "name",
          "rating",
          "rating_count",
          "release_dates.*",
          "summary",
          "similar_games",
          "screenshots.image_id",
          "cover.*",
          "rating",
          "genres.name",
          "platforms.*",
        ],
        where: `id=${input.id}`,
        limit: 1,
      });

      const reqOptions = {
        method: "POST",
        data: query_data,
        url: "/games/",
      };

      const { data }: { data: Game[] } = await igdb(reqOptions);

      if (!data) {
        throw new TRPCError({
          message: "No Game Data",
          code: "NOT_FOUND",
        });
      }

      const valid = GameValidator.safeParse(data[0]);

      if (!valid.success) {
        console.error(valid.error);
        return null;
      }
      return valid.data;
    }),

  // ** Get Upcoming Games. Returns an array of games
});
