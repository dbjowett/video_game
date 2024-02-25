import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { type PageTypes } from "~/components/Navbar";

import { type Game, type SimilarGame } from "~/pages/api/utils/types";
import { getApiSettings } from "./useApiSettings";

export const useFetchGames = (type: PageTypes) => {
  const apiOptions = useMemo(() => getApiSettings(type), [type]);

  return useQuery({
    queryKey: [type],
    queryFn: async () => {
      const res = await fetch("/api/games", apiOptions);
      return (await res.json()) as Game[];
    },
  });
};

export const useFetchSimilar = (ids: number[] | string[]) => {
  const gameIds = ids.join(",");
  const apiOptions = useMemo(
    () => getApiSettings("similar_games", gameIds),
    [gameIds]
  );

  return useQuery<SimilarGame[]>({
    queryKey: ["similar_games", ids.join()],
    queryFn: async () => {
      const res = await fetch("/api/games/similar_games", apiOptions);
      const games = (await res.json()) as SimilarGame[];
      return games;
    },
    enabled: ids[0] !== "",
  });
};
