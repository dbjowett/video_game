import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "~/components/ui/Spinner";
import { useFetchGame } from "~/hooks/useFetchGames";

export default function Page() {
  const [query, setQuery] = useState<[string, string]>(["", ""]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    void setQuery(router.query.id as [string, string]);
  }, [router.query, router.isReady]);
  const { data: game, isLoading, isError } = useFetchGame(...query);

  if (isLoading || game?.length === 0) return <Spinner />;
  if (isError) return <div>Error...</div>;

  return <p>Game: {game ? game[0].name : ""}</p>;
}
