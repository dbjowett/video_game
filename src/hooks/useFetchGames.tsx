import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { type PageTypes } from "~/components/Navbar";

import { type Game } from "~/pages/api/utils/types";
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

export const useFetchGame = (cacheKey: string, id: string) => {
  // const queryClient = useQueryClient();
  const apiOptions = useMemo(() => getApiSettings("game", id), [id]);
  return useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      const res = await fetch("/api/games/single_game", apiOptions);
      return (await res.json()) as Game[];
    },
    // initialData: () =>
    //   queryClient.getQueriesData([cacheKey])?.find((d) => d[0] === id),
  });
};
