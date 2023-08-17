import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { type Game } from "~/pages/api/utils/types";
import { getApiSettings } from "./useApiSettings";

export type PageTypes = "popular" | "upcoming" | "toprated";

const useFetchGames = (type: PageTypes, small?: boolean) => {
  const apiOptions = useMemo(() => getApiSettings(type, small), [type, small]);

  const fetchGames = async () => {
    const response = await fetch("/api/games", apiOptions);
    const data = (await response.json()) as Game[];
    return data;
  };

  const { data: games, isLoading, error } = useQuery([type], fetchGames);

  return { games, isLoading, error };
};

export default useFetchGames;
