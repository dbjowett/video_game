import { type NextApiRequest, type NextApiResponse } from "next";
import { type Game } from "~/server/api/schemas/games";
import igdb from "../utils/igdb";
import { type RequestOptions } from "../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game[]>
) {
  const { data }: { data: Game[] } = await igdb(req.body as RequestOptions);
  res.status(200).json(data);
}
