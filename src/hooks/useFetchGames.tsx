import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { type Game } from "~/pages/api/utils/types";
import { getApiSettings } from "./useApiSettings";

export type PageTypes = "popular" | "upcoming" | "toprated";

const useFetchGames = (
  type: PageTypes,
  small?: boolean
): UseQueryResult<Game[], unknown> => {
  const apiOptions = useMemo(() => getApiSettings(type, small), [type, small]);

  const fetchGames = async () => {
    const res = await fetch("/api/games", apiOptions);
    return (await res.json()) as Game[];
  };

  return useQuery<Game[]>({ queryKey: [type], queryFn: fetchGames });
};

export default useFetchGames;
