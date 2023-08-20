import { type NextApiRequest, type NextApiResponse } from "next";
import igdb from "../utils/igdb";
import { type Game, type RequestOptions } from "../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game>
) {
  console.log("here");
  const { data }: { data: Game } = await igdb(req.body as RequestOptions);
  res.status(200).json(data);
}
