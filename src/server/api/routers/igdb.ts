import { TRPCError } from "@trpc/server";
import { z } from "zod";
import igdb from "~/pages/api/utils/igdb";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { Platforms } from "~/pages/api/utils/constants";
import {
  constructQuery,
  type IGDBQueryOptions,
} from "~/utils/query_constructor";
import {
  GameValidator,
  DetailedGameValidator,
  SimilarGameValidator,
  type Game,
  type SimilarGame,
} from "../schemas/games";

const { PS5, XBOX_SERIES, PS4, SWITCH, STEAM_OS, PC } = Platforms;

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
          "storyline",
          "similar_games",
          "screenshots.image_id",
          "cover.*",
          "rating",
          "videos.*",
          "websites.*",
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

      const valid = DetailedGameValidator.safeParse(data[0]);

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

      const valid = SimilarGameValidator.array().safeParse(data);

      if (!valid.success) {
        console.error(valid.error);
        return [];
      }

      return valid.data;
    }),
  searchGame: publicProcedure
    .input(
      z.object({
        searchQuery: z.string().min(2),
      })
    )
    .query(async ({ input }) => {
      const query_data: IGDBQueryOptions = {
        fields: [
          "name",
          "cover.url",
          "genres.name",
          "total_rating",
          "first_release_date",
        ],
        search: input.searchQuery,
        where: "rating != null & category = 0",
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

      const {
        success,
        data: GameData,
        error,
      } = GameValidator.array().safeParse(data);

      if (!success) {
        console.error(error);
        return null;
      }

      return GameData;
    }),

  getUpcoming: publicProcedure.query(async () => {
    const query_data: IGDBQueryOptions = {
      fields: [
        "name",
        "cover.url",
        "genres.name",
        "total_rating",
        "first_release_date",
      ],
      where: `platforms= (${PS5},${XBOX_SERIES},${PS4},${PC},${SWITCH},${STEAM_OS}) & cover != null & category = 0  & first_release_date != n & first_release_date >${Math.floor(
        Date.now() / 1000
      )};`,
      sort: "first_release_date asc;",
      limit: 20,
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

    const valid = GameValidator.array().safeParse(data);

    if (!valid.success) {
      console.error(valid.error);
      return null;
    }
    return valid.data;
  }),
});
