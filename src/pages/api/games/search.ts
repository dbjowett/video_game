import type { NextApiRequest, NextApiResponse } from "next";
import igdb from "../utils/igdb";
import { type Game } from "../utils/types";

const getConfig = (input: string) => {
  return {
    method: "POST",
    data: `
        search "${input}";
        fields name, first_release_date, release_dates.human, genres.name, platforms.abbreviation, total_rating, summary, category, screenshots.image_id, videos.*, cover.url;
        where rating != null & category = 0;
        limit 20;
        `,
    url: "/games/",
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game[]>
) {
  let input: string | string[] | undefined;
  if (req.query?.input) {
    input = req.query.input.toString();
  } else {
    input = "";
  }
  const config = getConfig(input);
  const { data }: { data: Game[] } = await igdb(config);
  res.status(200).send(data);
}
