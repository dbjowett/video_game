import { type NextApiRequest, type NextApiResponse } from "next";
import igdb from "../utils/igdb";
import { type RequestOptions, type SimilarGame } from "../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimilarGame[]>
) {
  const { data }: { data: SimilarGame[] } = await igdb(
    req.body as RequestOptions
  );
  res.status(200).json(data);
}
