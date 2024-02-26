import { TRPCError } from "@trpc/server";
import { z } from "zod";
import igdb from "~/pages/api/utils/igdb";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { type SimilarGame } from "~/pages/api/utils/types";
import {
  constructQuery,
  type IGDBQueryOptions,
} from "~/utils/query_constructor";
import {
  GameValidator,
  SimilarGameValidator,
  type Game,
} from "../schemas/games";

export const igdbRouter = createTRPCRouter({
  // ** Get game by id. Returns a single game **
  getGameById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const query_data: IGDBQueryOptions = {
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
      };

      const { data }: { data: Game[] } = await igdb.post(
        "/games",
        constructQuery(query_data)
      );

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

  // ** Get Upcoming Games. Returns an array of similar games

  getSimilarGames: publicProcedure
    .input(
      z.object({
        ids: z.number().array(),
      })
    )
    .query(async ({ input }) => {
      const gameIds = input.ids.join(",");
      const query_data: IGDBQueryOptions = {
        fields: ["name", "cover.url"],
        where: `id=(${gameIds})`,
        sort: "rating desc",
        limit: 20,
      };

      const { data }: { data: SimilarGame[] } = await igdb.post(
        "/games",
        constructQuery(query_data)
      );
      if (!data) {
        throw new TRPCError({
          message: "No Game Data",
          code: "NOT_FOUND",
        });
      }
      // !!! This is causing errors
      console.log("This is the data:", data);
      const valid = SimilarGameValidator.array().safeParse(data);

      if (!valid.success) {
        console.error(valid.error);
        return null;
      }

      return valid.data;
    }),
});
