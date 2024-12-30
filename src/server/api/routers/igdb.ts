import { TRPCError } from "@trpc/server";
import { z } from "zod";
import igdb from "~/pages/api/utils/igdb";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// import { Platforms } from "~/pages/api/utils/constants";
import {
  constructQuery,
  type IGDBQueryOptions,
} from "~/utils/query_constructor";
import {
  GameValidator,
  HomepageResponseValidator,
  DetailedGameValidator,
  SimilarGameValidator,
  type Game,
  type SimilarGame,
} from "../schemas/games";
import { queries } from "~/utils/igdb_queries";

// const { PS5, XBOX_SERIES, PS4, SWITCH, STEAM_OS, PC } = Platforms;

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

  getGames: publicProcedure
    .input(
      z.object({
        type: z.enum(["upcoming", "popular", "newReleases"]),
      })
    )
    .query(async ({ input }) => {
      const query_data = queries[input.type];

      const { data }: { data: Game[] } = await igdb.post("/games", query_data);

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

  getHomepageGames: publicProcedure.query(async () => {
    const now = Math.floor(Date.now() / 1000);

    const platformIds = [167, 169, 48, 6, 130, 92].join(","); // Xbox, PS4, Switch, PC, Steam, PS5

    const query = `
      query games "upcoming" {
        fields name, cover.url, genres.name, total_rating, first_release_date;
        where platforms != null & platforms = (${platformIds}) & cover != null & category = 0 & first_release_date > ${now};
        sort first_release_date asc;
        limit 20;
      };
  
      query games "popular" {
        fields name, cover.url, genres.name, total_rating, first_release_date;
        where platforms != null & platforms = (${platformIds}) & cover != null & category = 0 & total_rating > 9 & total_rating_count > 100;
        sort total_rating desc;
        limit 20;
      };
  
     query games "newReleases" {
      fields name, cover.url, genres.name, total_rating, first_release_date;
      where platforms != null & platforms = (${platformIds}) & cover != null & category = 0 & first_release_date <= ${now};
      sort first_release_date desc;
      limit 20;
};

    `;

    const response = await igdb.post("/multiquery", query);

    if (!response.data) {
      throw new TRPCError({
        message: "No Game Data",
        code: "NOT_FOUND",
      });
    }

    const valid = HomepageResponseValidator.safeParse(response.data);

    if (!valid.success || valid.data.length === 0) {
      console.error(valid.error ?? response);
    }

    const categoryMap = {
      upcoming: "upcoming",
      popular: "popular",
      newReleases: "newReleases",
    } as const;

    const dataMap = valid?.data?.reduce(
      (acc, curr) => {
        const categoryKey = categoryMap[curr.name];
        if (categoryKey) {
          acc[categoryKey] = curr.result;
        }
        return acc;
      },
      {
        upcoming: [] as Game[],
        popular: [] as Game[],
        newReleases: [] as Game[],
      }
    );

    return dataMap;
  }),
});
