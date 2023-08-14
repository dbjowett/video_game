import { useEffect, useMemo, useState } from "react";
import { type Game } from "~/pages/api/utils/types";
import { getApiSettings } from "./useApiSettings";

export type PageTypes = "popular" | "upcoming" | "toprated";

const useFetchGames = (type: PageTypes) => {
  const apiOptions = useMemo(() => getApiSettings(type), [type]); // Memoize options

  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/games", apiOptions);

        if (!isMounted) {
          return;
        }

        const data = (await response.json()) as Game[];
        setGames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData().catch((err) => console.log(err));

    return () => {
      isMounted = false;
    };
  }, [apiOptions]);

  return { games, isLoading };
};

export default useFetchGames;
