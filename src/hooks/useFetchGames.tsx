import { useEffect, useMemo, useState } from "react";
import { type Game } from "~/pages/api/utils/types";
import { getApiSettings } from "./useApiSettings";

export type PageTypes = "popular" | "upcoming" | "toprated";

const useFetchGames = (type: PageTypes, small?: boolean) => {
  const apiOptions = useMemo(() => getApiSettings(type, small), [type, small]);

  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/games", apiOptions);
        const data = (await response.json()) as Game[];
        setGames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData().catch((err) => console.log(err));
  }, [apiOptions]);

  return { games, isLoading };
};

export default useFetchGames;
