import { type NextApiRequest, type NextApiResponse } from "next";
import igdb from "../utils/igdb";
import { type Game } from "../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game[]>
) {
  const { data }: { data: Game[] } = await igdb(req.body);
  res.status(200).json(data);
}
