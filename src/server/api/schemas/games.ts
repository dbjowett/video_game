import { z } from "zod";

const PlatformSchema = z.object({
  id: z.number(),
  abbreviation: z.string(),
  alternative_name: z.string().optional(),
  category: z.number(),
  created_at: z.number(),
  name: z.string(),
  platform_logo: z.number(),
  slug: z.string(),
  updated_at: z.number(),
  url: z.string(),
  versions: z.array(z.number()).optional(),
  websites: z.array(z.number()).optional(),
  checksum: z.string(),
});

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const CoverSchema = z.object({
  id: z.number(),
  alpha_channel: z.boolean(),
  animated: z.boolean(),
  game: z.number(),
  height: z.number(),
  image_id: z.string(),
  url: z.string(),
  width: z.number(),
});

const ReleaseDateSchema = z.object({
  id: z.number(),
  category: z.number(),
  created_at: z.number(),
  date: z.number().optional(),
  game: z.number(),
  human: z.string(),
  m: z.number().optional(),
  platform: z.number(),
  region: z.number(),
  updated_at: z.number(),
  y: z.number().optional(),
  checksum: z.string(),
  status: z.number().optional(),
});

const ScreenshotSchema = z.object({
  id: z.number(),
  image_id: z.string(),
});

const VideoSchema = z.object({
  id: z.number(),
  game: z.number(),
  name: z.string(),
  video_id: z.string(),
  checksum: z.string(),
});

const WebsiteSchema = z.object({
  id: z.number(),
  category: z.number(),
  game: z.number(),
  trusted: z.boolean(),
  url: z.string().url(),
  checksum: z.string(),
});

export const GameValidator = z.object({
  id: z.number(),
  cover: CoverSchema,
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
  websites: z.array(WebsiteSchema).optional(),
  videos: z.array(VideoSchema).optional(),
});

export const SimilarGameValidator = z.object({
  id: z.number(),
  name: z.string(),
  cover: z.object({
    id: z.number(),
    url: z.string(),
  }),
});

// ** Types ** //
export type SimilarGame = z.infer<typeof SimilarGameValidator>;
export type Game = z.infer<typeof GameValidator>;
export type Video = z.infer<typeof VideoSchema>;
export type Screenshot = z.infer<typeof ScreenshotSchema>;
export type Website = z.infer<typeof WebsiteSchema>;
