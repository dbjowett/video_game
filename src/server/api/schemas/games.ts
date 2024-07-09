import { z } from "zod";

const PlatformSchema = z.object({
  id: z.number(),
  abbreviation: z.string().optional(),
  alternative_name: z.string().optional(),
  category: z.number().optional(),
  created_at: z.number().optional(),
  name: z.string().optional(),
  platform_logo: z.number().optional(),
  slug: z.string().optional(),
  updated_at: z.number().optional(),
  url: z.string().optional(),
  versions: z.array(z.number()).optional(),
  websites: z.array(z.number()).optional(),
  checksum: z.string().optional(),
});

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const CoverSchema = z.object({
  id: z.number(),
  alpha_channel: z.boolean().optional(),
  animated: z.boolean().optional(),
  game: z.number().optional(),
  height: z.number().optional(),
  image_id: z.string().optional(),
  url: z.string(),
  width: z.number().optional(),
});

const ReleaseDateSchema = z.object({
  id: z.number(),
  category: z.number().optional(),
  created_at: z.number().optional(),
  date: z.number().optional(),
  game: z.number().optional(),
  human: z.string().optional(),
  m: z.number().optional(),
  platform: z.number().optional(),
  region: z.number().optional(),
  updated_at: z.number().optional(),
  y: z.number().optional(),
  checksum: z.string().optional(),
  status: z.number().optional(),
});

const ScreenshotSchema = z.object({
  id: z.number(),
  image_id: z.string(),
});

const VideoSchema = z.object({
  id: z.number(),
  game: z.number().optional(),
  name: z.string().optional(),
  video_id: z.string().optional(),
  checksum: z.string().optional(),
});

const WebsiteSchema = z.object({
  id: z.number(),
  category: z.number().optional(),
  game: z.number().optional(),
  trusted: z.boolean().optional(),
  url: z.string().url().optional(),
  checksum: z.string().optional(),
});

// Used in Single Game screen
export const DetailedGameValidator = z.object({
  id: z.number(),
  cover: CoverSchema,
  first_release_date: z.number().optional(),
  genres: z.array(GenreSchema).optional(),
  name: z.string(),
  platforms: z.array(PlatformSchema).optional(),
  rating: z.number().optional(),
  rating_count: z.number().optional(),
  release_dates: z.array(ReleaseDateSchema).optional(),
  screenshots: z.array(ScreenshotSchema).optional(),
  similar_games: z.array(z.number()).optional(),
  summary: z.string().optional(),
  storyline: z.string().optional(),
  total_rating: z.number().optional(),
  websites: z.array(WebsiteSchema).optional(),
  videos: z.array(VideoSchema).optional(),
});

// Used in Grid Item
export const GameValidator = z.object({
  id: z.number(),
  name: z.string(),
  cover: CoverSchema, // optional???
  genres: z.array(GenreSchema).optional(),
  total_rating: z.number().optional(),
  first_release_date: z.number(), // optional??
});

export const SimilarGameValidator = z.object({
  id: z.number(),
  name: z.string(),
  cover: z.object({
    id: z.number(),
    url: z.string(),
  }),
});

export const FaveGameValidator = z.object({
  id: z.number(),
  title: z.string(),
  imageUrl: z.string(),
  createdAt: z.date(),
  userId: z.string(),
});

export const HomepageResponseValidator = z.array(
  z.object({
    name: z.enum(["Upcoming", "Popular", "Top Rated"]),
    result: z.array(GameValidator),
  })
);

// ** Types ** //
export type Screenshot = z.infer<typeof ScreenshotSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Website = z.infer<typeof WebsiteSchema>;

export type SimilarGame = z.infer<typeof SimilarGameValidator>;
export type DetailedGame = z.infer<typeof DetailedGameValidator>;

export type Game = z.infer<typeof GameValidator>;
export type FaveGame = z.infer<typeof FaveGameValidator>;

export type HomepageGames = z.infer<typeof HomepageResponseValidator>;
