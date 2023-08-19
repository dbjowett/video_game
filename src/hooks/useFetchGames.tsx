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
