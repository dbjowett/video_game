import { type NextApiRequest, type NextApiResponse } from "next";
import { Platforms } from "../utils/constants";
import igdb from "../utils/igdb";
import { type Game } from "../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { PS5, XBOX_SERIES, PS4, SWITCH, STEAM_OS, PC } = Platforms;

  const options = {
    method: "POST",
    data: `
                fields name, rating, rating_count, release_dates.*, summary, screenshots.image_id, cover.*, rating, genres.name, platforms.*;
                where platforms= (${PS5},${XBOX_SERIES},${PS4},${PC},${SWITCH},${STEAM_OS}) & cover != null & category = 0 & rating > 9 & rating_count > 100;
                sort rating desc;
                limit 20;
                    `,
    url: "/games/",
  };

  const { data }: { data: Game[] } = await igdb(options);
  res.status(200).json(data);
}
